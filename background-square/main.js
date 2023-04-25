const { Plugin } = require('siyuan');

const defaultConfig = {
    styleId: 'background-square-plugin',
    setting: {
        width: 20,
        color: 'rgba(187, 187, 187, 0.1)',
    },
}

class BackgroundSquarePlugin extends Plugin {
    config = defaultConfig;

    async onload() {
        await this.loadConfig();
        this.saveConfig();
        this.registerSettingRender((el) => {
            el.innerHTML = `
            <div class="config__tab-container" data-name="common" style="height: unset !important;">
                <label class="fn__flex b3-label config__item">
                    <div class="fn__flex-1">
                        方格大小
                        <div class="b3-label__text">切换当前的方格大小</div>
                    </div> 
                    <span class="fn__space"></span>
                    <input class="b3-text-field fn__flex-center fn__size200" id="current">
                </label>
                <label class="fn__flex b3-label config__item">
                    <div class="fn__flex-1">
                        方格颜色
                        <div class="b3-label__text">切换当前的方格边框颜色</div>
                    </div> 
                    <span class="fn__space"></span>
                    <input class="b3-text-field fn__flex-center fn__size200" id="color">
                </label>
            </div>
            `;

            const current = el.querySelector('#current');
            current.value = this.config.setting.width;
            current.addEventListener('blur', (e) => {
                const value = e.target.value;
                this.config.setting.width = parseInt(value, 10);
                this.apply();
            });
            const color = el.querySelector('#color');
            color.value = this.config.setting.color;
            color.addEventListener('blur', (e) => {
                const value = e.target.value;
                this.config.setting.color = value;
                this.apply();
            });
        });
    }

    onunload() {
        const id = this.config.styleId;
        const el = document.getElementById(id);
        if (el) {
            el.remove();
        }
    }

    async loadConfig() {
        const config = await this.loadStorage('config.json');
        if (!config) {
            return;
        }
        this.config = JSON.parse(config);
        this.apply();
    }

    async saveConfig() {
        this.writeStorage('config.json', JSON.stringify(this.config));
    }

    async apply(name) {
        const id = this.config.styleId;
        const result = `.protyle-wysiwyg {
            background: linear-gradient(90deg, ${this.config.setting.color} 3%, transparent 0), linear-gradient(${this.config.setting.color} 3%, transparent 0);
            background-size: ${this.config.setting.width}px ${this.config.setting.width}px;
        }`;

        let el = document.getElementById(id);
        if (!el) {
            el = document.createElement('style');
            el.id = id;
            el.innerHTML = result;
            document.head.appendChild(el);
        } else {
            el.innerHTML = result;
        }

        this.config.current = name;
        this.saveConfig();
    }
}

module.exports = BackgroundSquarePlugin;