const { Plugin, serverApi, clientApi, Notification, Menu } = require('siyuan');

const defaultConfig = {
    colorSchemeStyleId: 'color-scheme-plugin',
    current: 'default',
    colorSchemes: {
        'default': '系统默认',
    },
}

const defaultSchemes = {
    "name": "default",
    "schemes": {
        "light": {
            "color1": "rgb(97, 26, 21)",
            "color2": "rgb(102, 60, 0)",
            "color3": "rgb(13 60 97)",
            "color4": "rgb(30 70 32)",
            "color5": "#5f6368",
            "color6": "#3575f0",
            "color7": "#f3a92f",
            "color8": "#d23f31",
            "color9": "#f5539e",
            "color10": "#944194",
            "color11": "#65b84d",
            "color12": "#f5822e",
            "color13": "#ffffff",
            "background1": "#f5d1cf",
            "background2": "#ffe8c8",
            "background3": "#d6eaf9",
            "background4": "#d7eed8",
            "background5": "#e2e3e4",
            "background6": "#acd0fc",
            "background7": "#fdeed6",
            "background8": "rgba(255, 193, 153, 0.5)",
            "background9": "#fdd5e7",
            "background10": "#e6c7e6",
            "background11": "#def0d9",
            "background12": "rgba(253, 198, 200, 0.5)",
            "background13": "#202124"
        },
        "dark": {
            "color1": "rgb(243 153 147)",
            "color2": "rgb(255 213 153)",
            "color3": "rgb(166 213 250)",
            "color4": "rgb(183 223 185)",
            "color5": "#9aa0a6",
            "color6": "#3573f0",
            "color7": "#f3a92f",
            "color8": "#d23f31",
            "color9": "#f5539e",
            "color10": "#bc67bc",
            "color11": "#65b84d",
            "color12": "#f5822e",
            "color13": "#1e1f22",
            "background1": "#cc352d3d",
            "background2": "#be8b585d",
            "background3": "rgb(0 153 255 / 29%)",
            "background4": "#85d0a34d",
            "background5": "#4c5257",
            "background6": "#0c3d88",
            "background7": "#593905",
            "background8": "#541812",
            "background9": "#6a0634",
            "background10": "#6b2f6b",
            "background11": "#376629",
            "background12": "#803a06",
            "background13": "#c9d1d9"
        }
    }
}

class ColorSchemePlugin extends Plugin {
    config = defaultConfig;
    schemes = null;
    pickr = null;
    snippetCSS = `
/* 请使用在线工具获取颜色HEX色值 */


/* 此段代码为所有在思源中设置了字色的文字设置共同的属性 */
[style*="color: var(--b3-font-color"] {
font-weight: 500;
/* 略微调高字重 */
font-size: 1em;
/* 如果你想让标注了的文字的字号有变化的话，可以修改数值 */
opacity: 100% !important;
/* 不透明度 */
vertical-align: inherit;
text-shadow: none !important;
/* 无文字阴影！ */
}


[style*="var(--b3-font-color1);"] {
color: var(--diy-color1) !important;
}

[style*="var(--b3-font-color2);"] {
color: var(--diy-color2) !important;
}

[style*="var(--b3-font-color3);"] {
color: var(--diy-color3) !important;
}

[style*="var(--b3-font-color4);"] {
color: var(--diy-color4) !important;
}

[style*="var(--b3-font-color5);"] {
color: var(--diy-color5) !important;
}

[style*="var(--b3-font-color6);"] {
color: var(--diy-color6) !important;
}

[style*="var(--b3-font-color7);"] {
color: var(--diy-color7) !important;
}

[style*="var(--b3-font-color8);"] {
color: var(--diy-color8) !important;
}

[style*="var(--b3-font-color9);"] {
color: var(--diy-color9) !important;
}

[style*="var(--b3-font-color10);"] {
color: var(--diy-color10) !important;
}

[style*="var(--b3-font-color11);"] {
color: var(--diy-color11) !important;
}

[style*="var(--b3-font-color12);"] {
color: var(--diy-color12) !important;
}

[style*="var(--b3-font-color13);"] {
color: var(--diy-color13) !important;
}


/* 修改字色菜单中的图标颜色 */
/* 不显示那个A字 */
.color__square[style*="color:var(--b3-font-color"] {
color: transparent !important;
}

.color__square[style*="color:var(--b3-font-color1)"] {
background-color: var(--diy-color1) !important;
}

.color__square[style*="color:var(--b3-font-color2)"] {
background-color: var(--diy-color2) !important;
}

.color__square[style*="color:var(--b3-font-color3)"] {
background-color: var(--diy-color3) !important;
}

.color__square[style*="color:var(--b3-font-color4)"] {
background-color: var(--diy-color4) !important;
}

.color__square[style*="color:var(--b3-font-color5)"] {
background-color: var(--diy-color5) !important;
}

.color__square[style*="color:var(--b3-font-color6)"] {
background-color: var(--diy-color6) !important;
}

.color__square[style*="color:var(--b3-font-color7)"] {
background-color: var(--diy-color7) !important;
}

.color__square[style*="color:var(--b3-font-color8)"] {
background-color: var(--diy-color8) !important;
}

.color__square[style*="color:var(--b3-font-color9)"] {
background-color: var(--diy-color9) !important;
}

.color__square[style*="color:var(--b3-font-color10)"] {
background-color: var(--diy-color10) !important;
}

.color__square[style*="color:var(--b3-font-color11)"] {
background-color: var(--diy-color11) !important;
}

.color__square[style*="color:var(--b3-font-color12)"] {
background-color: var(--diy-color12) !important;
}

.color__square[style*="color:var(--b3-font-color13)"] {
background-color: var(--diy-color13) !important;
}



/* 针对不同底色，修改其底色 */
[style*="background-color: var(--b3-font-background1);"] {
background-color: var(--diy-background1) !important;
}

[style*="background-color: var(--b3-font-background2);"] {
background-color: var(--diy-background2) !important;
}

[style*="background-color: var(--b3-font-background3);"] {
background-color: var(--diy-background3) !important;
}

[style*="background-color: var(--b3-font-background4);"] {
background-color: var(--diy-background4) !important;
}

[style*="background-color: var(--b3-font-background5);"] {
background-color: var(--diy-background5) !important;
}

[style*="background-color: var(--b3-font-background6);"] {
background-color: var(--diy-background6) !important;
}

[style*="background-color: var(--b3-font-background7);"] {
background-color: var(--diy-background7) !important;
}

[style*="background-color: var(--b3-font-background8);"] {
background-color: var(--diy-background8) !important;
}

[style*="background-color: var(--b3-font-background9);"] {
background-color: var(--diy-background9) !important;
}

[style*="background-color: var(--b3-font-background10);"] {
background-color: var(--diy-background10) !important;
}

[style*="background-color: var(--b3-font-background11);"] {
background-color: var(--diy-background11) !important;
}

[style*="background-color: var(--b3-font-background12);"] {
background-color: var(--diy-background12) !important;
}

[style*="background-color: var(--b3-font-background13);"] {
background-color: var(--diy-background13) !important;

}


.color__square[style*="background-color:var(--b3-font-background1)"] {
background-color: var(--diy-background1) !important;
}

.color__square[style*="background-color:var(--b3-font-background2)"] {
background-color: var(--diy-background2) !important;
}

.color__square[style*="background-color:var(--b3-font-background3)"] {
background-color: var(--diy-background3) !important;
}

.color__square[style*="background-color:var(--b3-font-background4)"] {
background-color: var(--diy-background4) !important;
}

.color__square[style*="background-color:var(--b3-font-background5)"] {
background-color: var(--diy-background5) !important;
}

.color__square[style*="background-color:var(--b3-font-background6)"] {
background-color: var(--diy-background6) !important;
}

.color__square[style*="background-color:var(--b3-font-background7)"] {
background-color: var(--diy-background7) !important;
}

.color__square[style*="background-color:var(--b3-font-background8)"] {
background-color: var(--diy-background8) !important;
}

.color__square[style*="background-color:var(--b3-font-background9)"] {
background-color: var(--diy-background9) !important;
}

.color__square[style*="background-color:var(--b3-font-background10)"] {
background-color: var(--diy-background10) !important;
}

.color__square[style*="background-color:var(--b3-font-background11)"] {
background-color: var(--diy-background11) !important;
}

.color__square[style*="background-color:var(--b3-font-background12)"] {
background-color: var(--diy-background12) !important;
}
.color__square[style*="background-color:var(--b3-font-background13)"] {
background-color: var(--diy-background13) !important;
}`
    pickClassic = `
    /*! Pickr 1.8.2 MIT | https://github.com/Simonwep/pickr */
    .pickr{position:relative;overflow:visible;transform:translateY(0)}.pickr *{box-sizing:border-box;outline:none;border:none;-webkit-appearance:none}.pickr .pcr-button{position:relative;height:2em;width:2em;padding:0.5em;cursor:pointer;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;border-radius:.15em;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" stroke="%2342445A" stroke-width="5px" stroke-linecap="round"><path d="M45,45L5,5"></path><path d="M45,5L5,45"></path></svg>') no-repeat center;background-size:0;transition:all 0.3s}.pickr .pcr-button::before{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:.5em;border-radius:.15em;z-index:-1}.pickr .pcr-button::before{z-index:initial}.pickr .pcr-button::after{position:absolute;content:'';top:0;left:0;height:100%;width:100%;transition:background 0.3s;background:var(--pcr-color);border-radius:.15em}.pickr .pcr-button.clear{background-size:70%}.pickr .pcr-button.clear::before{opacity:0}.pickr .pcr-button.clear:focus{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px var(--pcr-color)}.pickr .pcr-button.disabled{cursor:not-allowed}.pickr *,.pcr-app *{box-sizing:border-box;outline:none;border:none;-webkit-appearance:none}.pickr input:focus,.pickr input.pcr-active,.pickr button:focus,.pickr button.pcr-active,.pcr-app input:focus,.pcr-app input.pcr-active,.pcr-app button:focus,.pcr-app button.pcr-active{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px var(--pcr-color)}.pickr .pcr-palette,.pickr .pcr-slider,.pcr-app .pcr-palette,.pcr-app .pcr-slider{transition:box-shadow 0.3s}.pickr .pcr-palette:focus,.pickr .pcr-slider:focus,.pcr-app .pcr-palette:focus,.pcr-app .pcr-slider:focus{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px rgba(0,0,0,0.25)}.pcr-app{position:fixed;display:flex;flex-direction:column;z-index:10000;border-radius:0.1em;background:#fff;opacity:0;visibility:hidden;transition:opacity 0.3s, visibility 0s 0.3s;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;box-shadow:0 0.15em 1.5em 0 rgba(0,0,0,0.1),0 0 1em 0 rgba(0,0,0,0.03);left:0;top:0}.pcr-app.visible{transition:opacity 0.3s;visibility:visible;opacity:1}.pcr-app .pcr-swatches{display:flex;flex-wrap:wrap;margin-top:0.75em}.pcr-app .pcr-swatches.pcr-last{margin:0}@supports (display: grid){.pcr-app .pcr-swatches{display:grid;align-items:center;grid-template-columns:repeat(auto-fit, 1.75em)}}.pcr-app .pcr-swatches>button{font-size:1em;position:relative;width:calc(1.75em - 5px);height:calc(1.75em - 5px);border-radius:0.15em;cursor:pointer;margin:2.5px;flex-shrink:0;justify-self:center;transition:all 0.15s;overflow:hidden;background:transparent;z-index:1}.pcr-app .pcr-swatches>button::before{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:6px;border-radius:.15em;z-index:-1}.pcr-app .pcr-swatches>button::after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:var(--pcr-color);border:1px solid rgba(0,0,0,0.05);border-radius:0.15em;box-sizing:border-box}.pcr-app .pcr-swatches>button:hover{filter:brightness(1.05)}.pcr-app .pcr-swatches>button:not(.pcr-active){box-shadow:none}.pcr-app .pcr-interaction{display:flex;flex-wrap:wrap;align-items:center;margin:0 -0.2em 0 -0.2em}.pcr-app .pcr-interaction>*{margin:0 0.2em}.pcr-app .pcr-interaction input{letter-spacing:0.07em;font-size:0.75em;text-align:center;cursor:pointer;color:#75797e;background:#f1f3f4;border-radius:.15em;transition:all 0.15s;padding:0.45em 0.5em;margin-top:0.75em}.pcr-app .pcr-interaction input:hover{filter:brightness(0.975)}.pcr-app .pcr-interaction input:focus{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px rgba(66,133,244,0.75)}.pcr-app .pcr-interaction .pcr-result{color:#75797e;text-align:left;flex:1 1 8em;min-width:8em;transition:all 0.2s;border-radius:.15em;background:#f1f3f4;cursor:text}.pcr-app .pcr-interaction .pcr-result::-moz-selection{background:#4285f4;color:#fff}.pcr-app .pcr-interaction .pcr-result::selection{background:#4285f4;color:#fff}.pcr-app .pcr-interaction .pcr-type.active{color:#fff;background:#4285f4}.pcr-app .pcr-interaction .pcr-save,.pcr-app .pcr-interaction .pcr-cancel,.pcr-app .pcr-interaction .pcr-clear{color:#fff;width:auto}.pcr-app .pcr-interaction .pcr-save,.pcr-app .pcr-interaction .pcr-cancel,.pcr-app .pcr-interaction .pcr-clear{color:#fff}.pcr-app .pcr-interaction .pcr-save:hover,.pcr-app .pcr-interaction .pcr-cancel:hover,.pcr-app .pcr-interaction .pcr-clear:hover{filter:brightness(0.925)}.pcr-app .pcr-interaction .pcr-save{background:#4285f4}.pcr-app .pcr-interaction .pcr-clear,.pcr-app .pcr-interaction .pcr-cancel{background:#f44250}.pcr-app .pcr-interaction .pcr-clear:focus,.pcr-app .pcr-interaction .pcr-cancel:focus{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px rgba(244,66,80,0.75)}.pcr-app .pcr-selection .pcr-picker{position:absolute;height:18px;width:18px;border:2px solid #fff;border-radius:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pcr-app .pcr-selection .pcr-color-palette,.pcr-app .pcr-selection .pcr-color-chooser,.pcr-app .pcr-selection .pcr-color-opacity{position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;flex-direction:column;cursor:grab;cursor:-webkit-grab}.pcr-app .pcr-selection .pcr-color-palette:active,.pcr-app .pcr-selection .pcr-color-chooser:active,.pcr-app .pcr-selection .pcr-color-opacity:active{cursor:grabbing;cursor:-webkit-grabbing}.pcr-app[data-theme='monolith']{width:14.25em;max-width:95vw;padding:0.8em}.pcr-app[data-theme='monolith'] .pcr-selection{display:flex;flex-direction:column;justify-content:space-between;flex-grow:1}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-preview{position:relative;z-index:1;width:100%;height:1em;display:flex;flex-direction:row;justify-content:space-between;margin-bottom:0.5em}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-preview::before{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:.5em;border-radius:.15em;z-index:-1}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-preview .pcr-last-color{cursor:pointer;transition:background-color 0.3s, box-shadow 0.3s;border-radius:0.15em 0 0 0.15em;z-index:2}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-preview .pcr-current-color{border-radius:0 0.15em 0.15em 0}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-preview .pcr-last-color,.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-preview .pcr-current-color{background:var(--pcr-color);width:50%;height:100%}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-palette{width:100%;height:8em;z-index:1}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-palette .pcr-palette{border-radius:.15em;width:100%;height:100%}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-palette .pcr-palette::before{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:.5em;border-radius:.15em;z-index:-1}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-chooser,.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-opacity{height:0.5em;margin-top:0.75em}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-chooser .pcr-picker,.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-opacity .pcr-picker{top:50%;transform:translateY(-50%)}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-chooser .pcr-slider,.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-opacity .pcr-slider{flex-grow:1;border-radius:50em}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-chooser .pcr-slider{background:linear-gradient(to right, red, #ff0, lime, cyan, blue, #f0f, red)}.pcr-app[data-theme='monolith'] .pcr-selection .pcr-color-opacity .pcr-slider{background:linear-gradient(to right, transparent, black),url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:100%, 0.25em}
    
`;

    async onload() {
        this.pickr = await import("https://esm.sh/v117/@simonwep/pickr@1.8.2/es2022/pickr.mjs")
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
                    <select class="b3-select fn__flex-center fn__size200" id="color-schemes-current">
                        ${options.map((o) => `<option value="${o}">${this.config.colorSchemes[o]}</option>`).join('\n')}
                    </select>
                </label>
                <label class="fn__flex b3-label config__item">
                    <div class="fn__flex-1">
                        上传配色方案
                        <div class="b3-label__text">导入社区提供的配色方案</div>
                    </div>
                    <span class="fn__space"></span>
                    <button class="b3-button b3-button--outline fn__flex-center fn__size200" id="color-schemes-upload-button">
                        点击上传
                        <input class="b3-file fn__flex-center" type="file" id="color-schemes-file" style="display:none"/>
                        </button>
                </label>
            </div>
            `;
            const uploadButton = el.querySelector('#color-schemes-upload-button');

            const select = el.querySelector('#color-schemes-current');
            select.value = this.config.current;
            select.addEventListener('change', (e) => {
                const selected = e.target.value;
                this.applyScheme(selected);
            });
            const file = el.querySelector('#color-schemes-file');
            uploadButton.addEventListener('click', () => {
                file.click();
            });
            file.addEventListener('change', async (e) => {
                const file = el.querySelector('#color-schemes-file').files[0];
                await this.upload(file);
                file.value = '';
                const select = el.querySelector('#color-schemes-current');
                const options = Object.keys(this.config.colorSchemes);
                const newOptionsHTML = options.map((o) => `<option value="${o}">${this.config.colorSchemes[o]}</option>`).join('\n');
                select.innerHTML = newOptionsHTML;
            });
        });
        let that = this
        document.addEventListener("contextmenu", function (event) {
            var target = event.target;
            if (target.className === "color__square") {
                console.log("yanse")
                // 确定字体颜色还是背景
                let colorStyle = target.style.color === "" ? target.style.backgroundColor : target.style.color
                let colorName = colorStyle.slice(14, -1)


                console.log(colorName)
                const id = that.config.colorSchemeStyleId;
                let el = document.getElementById(id);
                console.log(that.getColor(el, "--diy-" + colorName))
                console.log(that.schemes)


                // 创建调色盘
                const menu = document.createElement('div')
                that.createPickr(menu, colorName)
                new Menu('ColorSchemePlugin').addItem({ element: menu }).showAtMouseEvent(event)
            }
        })
    }

    onunload() {

    }

    createPickr(element, colorName) {
        const id = this.config.colorSchemeStyleId;
        let el = document.getElementById(id);
        let currentColor = this.getColor(el, "--diy-" + colorName)
        element.attachShadow({ mode: "open" });
        element.shadowRoot.innerHTML = `
            <style>
            ${this.pickClassic}
            .pickrCheck div{
                border-radius: 4px;
            }
                    </style>
                    <span class="pickr"></span>
                    <span class="pickrCheck"></span>

            
            `;
        let pickrInit = this.pickr.default.create({
            container: element.shadowRoot.querySelector(".pickrCheck"),
            el: element.shadowRoot.querySelector(".pickr"),
            theme: 'monolith', // or 'monolith', or 'nano'
            default: currentColor,
            swatches: [
                'rgba(244, 67, 54, 1)',
                'rgba(233, 30, 99, 0.95)',
                'rgba(156, 39, 176, 0.9)',
                'rgba(103, 58, 183, 0.85)',
                'rgba(63, 81, 181, 0.8)',
                'rgba(33, 150, 243, 0.75)',
                'rgba(3, 169, 244, 0.7)',
                'rgba(0, 188, 212, 0.7)',
                'rgba(0, 150, 136, 0.75)',
                'rgba(76, 175, 80, 0.8)',
                'rgba(139, 195, 74, 0.85)',
                'rgba(205, 220, 57, 0.9)',
                'rgba(255, 235, 59, 0.95)',
                'rgba(255, 193, 7, 1)'
            ],

            components: {

                // Main components
                preview: true,
                opacity: true,
                hue: true,

                // Input / output Options
                interaction: {
                    hex: true,
                    rgba: true,
                    hsla: true,
                    hsva: true,
                    cmyk: true,
                    input: true,
                    clear: false,
                    save: true
                }
            }
        });
        let that = this;
        pickrInit.on("save", (color) => {
            let colorValue = color ? color.toHEXA() : "";
            console.log(color)
            console.log(colorValue)
            window.tempColor = color
            that.setColor(el, colorName, colorValue)
            console.log(that.schemes)
            that.saveScheme(that.config.current, that.schemes)
        });
        return pickrInit;
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
        // if (name === 'default') {
        //     const id = this.config.colorSchemeStyleId;
        //     let el = document.getElementById(id);
        //     if (el) {
        //         el.remove();
        //     }
        //     this.config.current = name;
        //     this.saveConfig();
        //     return;
        // }
        let schemes
        //如果this.schemes不存在，则读取json并初始化 schemes
        // if (this.schemes === null) {
        //     schemes = await this.loadSchemeFromFile(name);
        //     if (!schemes && name === 'default') {
        //         schemes = defaultSchemes["schemes"]
        //         this.saveScheme("default",schemes)
        //     }
        //     else if (!schemes) {
        //         new Notification({ type: 'error', message: '未找到配色方案' }).show();
        //         return;
        //     }
        //     this.schemes = schemes
        // }
        // else {
        //     schemes = this.schemes
        // }

        schemes = await this.loadSchemeFromFile(name);
        if (!schemes && name === 'default') {
            schemes = defaultSchemes["schemes"]
            this.saveScheme("default", schemes)
        }
        else if (!schemes) {
            new Notification({ type: 'error', message: '未找到配色方案' }).show();
            return;
        }
        this.schemes = schemes


        const lightSchemes = schemes["light"]
        const darkSchemes = schemes["dark"]

        const result = [':root[data-theme-mode="light"]{'];
        for (const k in lightSchemes) {
            result.push(`--diy-${k}: ${lightSchemes[k]};`);
        }
        result.push('}');

        result.push(':root[data-theme-mode="dark"]{');
        for (const k in darkSchemes) {
            result.push(`--diy-${k}: ${darkSchemes[k]};`);
        }
        result.push('}');

        const id = this.config.colorSchemeStyleId;
        let el = document.getElementById(id);
        if (!el) {
            el = document.createElement('style');
            el.id = id;
            el.innerHTML = result.join('\n') + this.snippetCSS;
            document.head.appendChild(el);
        } else {
            el.innerHTML = result.join('\n') + this.snippetCSS;
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
    getColor(element, name) {
        let mode = document.querySelector("html").getAttribute("data-theme-mode")
        console.log(element.sheet)
        let rootRuleLight;
        let rootRuleDark;
        for (let i = 0; i < element.sheet.cssRules.length; i++) {
            if (element.sheet.cssRules[i].selectorText === ":root[data-theme-mode=\"light\"]") {
                rootRuleLight = element.sheet.cssRules[i];
            }
            if (element.sheet.cssRules[i].selectorText === ":root[data-theme-mode=\"dark\"]") {
                rootRuleDark = element.sheet.cssRules[i];
            }
        }
        let namedColor;
        switch (mode) {
            case 'light':
                namedColor = rootRuleLight.style.getPropertyValue(name);
                namedColor = namedColor ? namedColor.trim() : null;
                break;
            case 'dark':
                namedColor = rootRuleDark.style.getPropertyValue(name);
                namedColor = namedColor ? namedColor.trim() : null;
                break;
        }
        return namedColor
    }

    setColor(element, name, value) {
        value = value.toString();
        let mode = document.querySelector("html").getAttribute("data-theme-mode")
        console.log(element.sheet)
        let rootRuleLight;
        let rootRuleDark;
        for (let i = 0; i < element.sheet.cssRules.length; i++) {
            if (element.sheet.cssRules[i].selectorText === ":root[data-theme-mode=\"light\"]") {
                rootRuleLight = element.sheet.cssRules[i];
            }
            if (element.sheet.cssRules[i].selectorText === ":root[data-theme-mode=\"dark\"]") {
                rootRuleDark = element.sheet.cssRules[i];
            }
        }
        switch (mode) {
            case 'light':
                rootRuleLight.style.setProperty("--diy-" + name, value);
                this.schemes['light'][name] = value;
                break;
            case 'dark':
                rootRuleDark.style.setProperty("--diy-" + name, value);
                this.schemes['dary'][name] = value;
                break;
        }
        return
    }
}

module.exports = ColorSchemePlugin;