const { Plugin, serverApi } = require('siyuan');

const noteBookName = '快速笔记';

class OpenMd extends Plugin {
    noteBookId = '';

    async onload() {
        this.initNoteBook();
        const electron = window.require('@electron/remote');
        const app = electron.app;

        app.setAsDefaultProtocolClient('md');
        app.on('second-instance', async(event, commandLine, workingDirectory) => {
            if (Array.isArray(commandLine) && commandLine.length > 0) {
                const file = commandLine[commandLine.length - 1];
                if (file && file.endsWith('.md')) {
                    const data = await this.loadFile(file);
                    const path = window.require('path');
                    const name = path.basename(file);
                    this.createFile(name, data);
                }
            }
        });
    }

    async createFile(name, data) {
        const newPath = '/' + name;
        const fileId = await serverApi.createDocWithMd(this.noteBookId, newPath, data);
        this.openFileById(fileId);
    }

    async openFileById(id) {
        window.open(`siyuan://blocks/${id}`);
    }


    async loadFile(file) {
        return new Promise((resolve, reject) => {
            const fs = window.require('fs');
            fs.readFile(file, 'utf-8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data.toString());
            });
        })
    }

    async initNoteBook() {
        const res = await serverApi.lsNotebooks();
        const notebooks = res.notebooks;
        for (const notebook of notebooks) {
            if (notebook.name === noteBookName) {
                this.noteBookId = notebook.id;
                return notebook.id;
            }
        }
        const data = await serverApi.createNoteBook(noteBookName);
        this.noteBookId = data.notebook.id;
        return data.notebook.id;
    }

}

module.exports = OpenMd;