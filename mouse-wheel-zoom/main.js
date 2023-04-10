const { Plugin } = require('siyuan');

class MouseWheelZoomPlugin extends Plugin {
    /* 全局配置 */
    static CONFIG = {
        threshold: 100, // 滚轮缩放阈值
        min: 9, // 最小字号(px)
        max: 72, // 最大字号(px)
        key: {
            // 鼠标滚轮缩放(Ctrl + wheel)
            CtrlCmd: true,
            WinCtrl: false,
            Shift: false,
            Alt: false,
            type: 'mousewheel',
        }, // 事件配置
        options: {
            capture: true,
            passive: true,
        }, // 监听器配置
    };

    /* 判断是否为指定的事件 */
    static isEvent(event, key = MouseWheelZoomPlugin.CONFIG.key) {
        return (event.type === key.type
            && event.altKey === key.Alt
            && event.shiftKey === key.Shift
            && (event.ctrlKey || event.metaKey) === key.CtrlCmd
            && (event.ctrlKey && event.metaKey) === key.WinCtrl
        )
    }

    /**
     * 设置编辑器字号
     * REF https://github.com/siyuan-note/siyuan/blame/dev/app/src/util/assets.ts
     * @update-date 2022-12-30
     * @param {number} fontSize 字号
     * @return {number} 设置后的字号
     * @return {null} 没有找到字号
     */
    static setFontSize(fontSize) {
        let style = document.getElementById('editorFontSize');
        if (style) {
            const height = Math.floor(fontSize * 1.625);
            style.innerHTML = `
.b3-typography, .protyle-wysiwyg, .protyle-title {font-size:${fontSize}px !important}
.b3-typography code:not(.hljs), .protyle-wysiwyg span[data-type~=code] { font-variant-ligatures: ${globalThis.siyuan.config.editor.codeLigatures ? "normal" : "none"} }
.li > .protyle-action {height:${height + 8}px;line-height: ${height + 8}px}
.protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h1, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h2, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h3, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h4, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h5, .protyle-wysiwyg [data-node-id].li > .protyle-action ~ .h6 {line-height:${height + 8}px;}
.protyle-wysiwyg [data-node-id].li > .protyle-action:after {height: ${fontSize}px;width: ${fontSize}px;margin:-${fontSize / 2}px 0 0 -${fontSize / 2}px}
.protyle-wysiwyg [data-node-id].li > .protyle-action svg {height: ${Math.max(14, fontSize - 8)}px}
.protyle-wysiwyg [data-node-id] [spellcheck] {min-height:${height}px}
.protyle-wysiwyg [data-node-id] {${globalThis.siyuan.config.editor.rtl ? " direction: rtl;" : ""}${globalThis.siyuan.config.editor.justify ? " text-align: justify;" : ""}}
.protyle-wysiwyg .li {min-height:${height + 8}px}
.protyle-gutters button svg {height:${height}px}
.protyle-wysiwyg img.emoji, .b3-typography img.emoji {width:${height - 8}px}
.protyle-wysiwyg .h1 img.emoji, .b3-typography h1 img.emoji {width:${Math.floor(fontSize * 1.75 * 1.25)}px}
.protyle-wysiwyg .h2 img.emoji, .b3-typography h2 img.emoji {width:${Math.floor(fontSize * 1.55 * 1.25)}px}
.protyle-wysiwyg .h3 img.emoji, .b3-typography h3 img.emoji {width:${Math.floor(fontSize * 1.38 * 1.25)}px}
.protyle-wysiwyg .h4 img.emoji, .b3-typography h4 img.emoji {width:${Math.floor(fontSize * 1.25 * 1.25)}px}
.protyle-wysiwyg .h5 img.emoji, .b3-typography h5 img.emoji {width:${Math.floor(fontSize * 1.13 * 1.25)}px}
.protyle-wysiwyg .h6 img.emoji, .b3-typography h6 img.emoji {width:${Math.floor(fontSize * 1.25)}px}
.b3-typography:not(.b3-typography--default), .protyle-wysiwyg, .protyle-title, .protyle-title__input{font-family: "${globalThis.siyuan.config.editor.fontFamily}", "quote", "Helvetica Neue", "Luxi Sans", "DejaVu Sans", "Hiragino Sans GB", "Microsoft Yahei", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", "EmojiSymbols" !important;}
`;
            return fontSize;
        }
        return null;
    }

    /* 字号更改 */
    static changeFontSize(delta) {
        let size = delta / MouseWheelZoomPlugin.CONFIG.threshold | 0;
        let old_size = globalThis.siyuan.config.editor.fontSize;
        let new_size = Math.max(Math.min(old_size + size, MouseWheelZoomPlugin.CONFIG.max), MouseWheelZoomPlugin.CONFIG.min);
        new_size = MouseWheelZoomPlugin.setFontSize(new_size);
        if (new_size) globalThis.siyuan.config.editor.fontSize = new_size;
    }

    /* 事件监听器 */
    static listener(event) {
        if (MouseWheelZoomPlugin.isEvent(event)) {
            setTimeout(() => MouseWheelZoomPlugin.changeFontSize(event.wheelDeltaY), 0);
        }
    };

    element = globalThis; // 监听器绑定的元素

    constructor() {
        super();
    }

    onload() {
        /* 添加监听器 */
        this.element.addEventListener(
            MouseWheelZoomPlugin.CONFIG.key.type,
            MouseWheelZoomPlugin.listener,
            MouseWheelZoomPlugin.CONFIG.options,
        );
    }

    onunload() {
        /* 移除监听器 */
        this.element.removeEventListener(
            MouseWheelZoomPlugin.CONFIG.key.type,
            MouseWheelZoomPlugin.listener,
            MouseWheelZoomPlugin.CONFIG.options,
        );
    }
}

module.exports = {
    default: MouseWheelZoomPlugin,
};
