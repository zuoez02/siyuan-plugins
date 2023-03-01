const { Plugin } = require('siyuan');

class HideVipFuncPlugin extends Plugin {
    constructor() {
        super();
    }

    onload() {
        for (const dockItem of document.getElementsByClassName('dock__item')) {
            if (dockItem.getAttribute("data-hotkeylangid") === 'inbox') {
                this.elInbox = dockItem;
                this.elInbox.style = 'display: none';
                break;
            }
        }

        this.elToolbarVip = document.getElementById('toolbarVIP');

        if (this.elToolbarVip) {
            this.elToolbarVip.style = 'display: none';
        }
    }

    onunload() {
        this.elInbox?.removeAttribute('style');
        this.elToolbarVip?.removeAttribute('style');
    }
}

module.exports = {
    default: HideVipFuncPlugin,
};
