const siyuan = require('siyuan');
const Plugin = siyuan.Plugin

module.exports = class SavePlugin extends Plugin {
    constructor() {
        super();
    }

    onload() {
        this.registerCommand({
            key: 'Save and Sync',
            description: 'Trigger Sync function on toolbar',
            callback: () => this.save(),
            shortcut: 'command+s,ctrl+s',
        });
    }

    save() {
        document.getElementById('barSync').click();
    }
}