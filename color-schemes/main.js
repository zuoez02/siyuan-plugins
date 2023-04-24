const { Plugin, serverApi, clientApi, Notification } = require('siyuan');

const defaultConfig = {
    colorSchemeStyleId: 'color-scheme-plugin',
    current: 'default',
    colorSchemes: {
        'default': '系统默认',
    },
}

class ColorSchemePlugin extends Plugin {
    config = defaultConfig;

    async onload() {
            await this.loadConfig();
            this.saveConfig();
            this.registerSettingRender((el) => {
                        const options = Object.keys(this.config.colorSchemes);
                        el.innerHTML = `
            <div class="config__tab-container" data-name="common" style="height: unset !important;">
                <label class="fn__flex b3-label config__item">
                    <div class="fn__flex-1">
                        选择配色方案
                        <div class="b3-label__text">切换当前的文字配色方案</div>
                    </div> 
                    <span class="fn__space"></span>
                    <select class="b3-select fn__flex-center fn__size200" id="current">
                        ${options.map((o) => `<option value="${o}">${this.config.colorSchemes[o]}</option>`).join('\n')}
                    </select>
                </label>
                <label class="fn__flex b3-label config__item">
                    <div class="fn__flex-1">
                        上传配色方案
                        <div class="b3-label__text">导入社区提供的配色方案</div>
                    </div>
                    <span class="fn__space"></span>
                    <button class="b3-button b3-button--outline fn__flex-center fn__size200" id="upload-button">
                        点击上传
                        <input class="b3-file fn__flex-center" type="file" id="file" style="display:none"/>
                        </button>
                </label>
            </div>
            `;
            const uploadButton = el.querySelector('#upload-button');
            
            const select = el.querySelector('#current');
            select.value = this.config.current;
            select.addEventListener('change', (e) => {
                const selected = e.target.value;
                this.applyScheme(selected);
            });
            const file = el.querySelector('#file');
            uploadButton.addEventListener('click', () => {
                file.click();
            });
            file.addEventListener('change', async (e) => {
                const file = el.querySelector('#file').files[0];
                await this.upload(file);
                file.value = '';
                const select = el.querySelector('#current');
                const options = Object.keys(this.config.colorSchemes);
                const newOptionsHTML = options.map((o) => `<option value="${o}">${this.config.colorSchemes[o]}</option>`).join('\n');
                select.innerHTML = newOptionsHTML;
            });
        });
    }

    onunload() {

    }

    async loadConfig() {
        const config = await this.loadStorage('config.json');
        if (!config) {
            return;
        }
        this.config = JSON.parse(config);
        this.applyScheme(this.config.current);
    }

    async saveConfig() {
        this.writeStorage('config.json', JSON.stringify(this.config));
    }

    async upload(file) {
        return new Promise((resolve) => {
            let reader = new FileReader();
            reader.addEventListener('load', (e) => {
                let text = e.target.result;
                let scheme;
                try {
                    scheme = JSON.parse(text);
                } catch (e) {
                    new Notification({ type: 'error', message: 'Scheme parse failed' }).show();
                    return;
                }
                const name = scheme.name;
                if (!name) {
                    new Notification({ type: 'error', message: '配色方案无名称' }).show();
                    return;
                }
                if (name === 'config') {
                    new Notification({ type: 'error', message: '配色方案名称不能叫config' }).show();
                    return;
                }
                const schemes = scheme.schemes;
                this.saveScheme(name, schemes);
                new Notification({ type: 'info', message: `配色方案${name}上传成功` }).show();
                if (name === this.config.current) {
                    this.applyScheme(name);
                }
            });
            reader.readAsText(file);
            resolve();
        });

    }

    async saveScheme(name, schemes) {
        await this.writeStorage(`${name}.json`, JSON.stringify(schemes));
        this.config.colorSchemes[name] = name;
        this.saveConfig();
    }

    async applyScheme(name) {
        if (name === 'default') {
            const id = this.config.colorSchemeStyleId;
            let el = document.getElementById(id);
            if (el) {
                el.remove();
            }
            this.config.current = name;
            this.saveConfig();
            return;
        }
        const schemes = await this.loadSchemeFromFile(name);
        if (!schemes) {
            new Notification({ type: 'error', message: '未找到配色方案' }).show();
            return;
        }
        const result = [':root {'];
        for (const k in schemes) {
            result.push(`--b3-font-${k}: ${schemes[k]};`);
        }
        result.push('}');
        const id = this.config.colorSchemeStyleId;
        let el = document.getElementById(id);
        if (!el) {
            el = document.createElement('style');
            el.id = id;
            el.innerHTML = result.join('\n');
            document.head.appendChild(el);
        } else {
            el.innerHTML = result.join('\n');
        }
        
        this.config.current = name;
        this.saveConfig();
    }

    async loadSchemeFromFile(name) {
        const res = await this.loadStorage(`${name}.json`);
        if (!res) {
            return null;
        }
        try {
            return JSON.parse(res);
        } catch {
            new Notification({ type: 'error', message: '配色方案解析错误' }).show();
            return null;
        }
    }
}

module.exports = ColorSchemePlugin;