const { Plugin, serverApi } = require('siyuan');

class MoreBackgroundPlugin extends Plugin {
    onload() {
        this.registerCommand({
            command: 'getAcgPic',
            shortcut: 'ctrl+alt+e,command+option+e',
            description: 'getAcgPic',
            callback: () => this.getAcgPic(),
        })
        this.registerCommand({
            command: 'getUnsplashPic',
            shortcut: 'ctrl+alt+r,command+option+r',
            description: 'getUnsplashPic',
            callback: () => this.getUnsplashPic(),
        })
    }

    async loadImgSetHeader(url) {
        const currentId = getFileID();
        const headers = document.querySelectorAll(`.protyle-background[data-node-id="${currentId}"] div.protyle-background__img img`)
        const img = await fetch(url)
        console.log(img)
        const imgurl = img.url
        headers.forEach(
            el => {
                el.setAttribute("style", "")
                el.setAttribute("src", imgurl)
            }
        )
        serverApi.setBlockAttrs(
            currentId,
            {
                "title-img": `background-image:url(${imgurl})`
            }
        )
    }

    async getAcgPic() {
        triggerRandomIfNoImg();
        this.loadImgSetHeader("https://img.xjh.me/random_img.php?return=302");
    }
    async getUnsplashPic() {
        triggerRandomIfNoImg();
        this.loadImgSetHeader("https://source.unsplash.com/random");
    }
}

function getFileID() {
    //获取当前页面
    const currentPage = getCurrentPage();
    //获取当前页面id
    const currentPageID = currentPage.querySelector(
        "span.protyle-breadcrumb__item--active"
    ).getAttribute("data-node-id");

    return currentPageID;
}

function triggerRandomIfNoImg() {
    const event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    const currentPage = getCurrentPage();
    const img = currentPage.getElementsByClassName('protyle-background__img')[0].getElementsByTagName('img')[0];
    if (img && img.classList.contains('fn__none')) {
        document.querySelectorAll('.protyle-icon[data-type=random]')[1].dispatchEvent(event)
    }
}

function getCurrentPage() {
    var currentScreen;
    var currentPage;
    try {
        //获取当前屏幕
        currentScreen = document.querySelector(".layout__wnd--active");
        //获取当前页面
        currentPage = currentScreen.querySelector(
            ".fn__flex-1.protyle:not(.fn__none)"
        );
        return currentPage;
    }
    catch (e) {
        showMessage(`未能获取到页面焦点！`)
    }
    throw new Error("未能获取到页面焦点！");
}

module.exports = MoreBackgroundPlugin;