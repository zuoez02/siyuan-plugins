const siyuan = require('siyuan');
const { serverApi } = require("siyuan");
const { Plugin, Menu, MenuItem } = siyuan;

class FakeDocBreadcrumbPlugin extends Plugin {
    el = null;

    tabOpenObserver =  null;

    constructor() {
        super();
        try {
            g_tabbarElement = window.siyuan?.layout?.centerLayout?.element?.querySelectorAll("[data-type='wnd'] ul.layout-tab-bar");
        }catch(err) {
            console.warn(err);
            g_tabbarElement = undefined;
        }
        if (g_tabbarElement == undefined) {
            g_isMobile = true;
        }
        console.log('TestRemotePluginCreated');
    }

    async onload() {
        setObserver();
        console.log("TEST_LOADED", g_importApi);
        console.log("PLUGIN_API", siyuan, serverApi);
        setStyle();
    }

    onunload() {
        this.el && this.el.remove();
        removeObserver();
        removeStyle();
    }
}

module.exports = {
    default: FakeDocBreadcrumbPlugin,
};

/**
 * 全局变量
 */
let g_switchTabObserver; // 页签切换与新建监视器
let g_windowObserver; // 窗口监视器
let CONSTANTS = {
    RANDOM_DELAY: 300, // 插入挂件的延迟最大值，300（之后会乘以10）对应最大延迟3秒
    OBSERVER_RANDOM_DELAY: 500, // 插入链接、引用块和自定义时，在OBSERVER_RANDOM_DELAY_ADD的基础上增加延时，单位毫秒
    OBSERVER_RANDOM_DELAY_ADD: 100, // 插入链接、引用块和自定义时，延时最小值，单位毫秒
    OBSERVER_RETRY_INTERVAL: 1000, // 找不到页签时，重试间隔
}
let g_observerRetryInterval;
let g_observerStartupRefreshTimeout;
let g_TIMER_LABLE_NAME_COMPARE = "文档栏插件";
let g_importCommon = null;
let g_importApi = null;
let g_importUtils = null;
let g_tabbarElement = undefined;
let g_fontSize = "13px";
let g_isMobile = false;
/* API */


/**
 * 设置监视器Observer
 */
function setObserver() {
    if (g_isMobile) {
        g_switchTabObserver = new MutationObserver(async (mutationList) => {
            for (let mutation of mutationList) {
                // console.log("发现页签切换", mutation);
                setTimeout(async () => {
                    console.time(g_TIMER_LABLE_NAME_COMPARE);
                    try{
                        // TODO: 改为动态获取id
                        await main([mutation.target]);
                    }catch(err) {
                        console.error(err);
                    }
                    console.timeEnd(g_TIMER_LABLE_NAME_COMPARE);
                }, Math.round(Math.random() * CONSTANTS.OBSERVER_RANDOM_DELAY) + CONSTANTS.OBSERVER_RANDOM_DELAY_ADD);
            }
        });
        g_switchTabObserver.observe(window.document.querySelector(".protyle-background[data-node-id]"), {"attributes": true, "attributeFilter": ["data-node-id"]});
        console.log("MOBILE_LOADED");
        main();
        return;
    }
    g_switchTabObserver = new MutationObserver(async (mutationList) => {
        for (let mutation of mutationList) {
            // console.log("发现页签切换", mutation);
            setTimeout(async () => {
                console.time(g_TIMER_LABLE_NAME_COMPARE);
                try{
                    // TODO: 改为动态获取id
                    await main([mutation.target]);
                }catch(err) {
                    console.error(err);
                }
                console.timeEnd(g_TIMER_LABLE_NAME_COMPARE);
            }, Math.round(Math.random() * CONSTANTS.OBSERVER_RANDOM_DELAY) + CONSTANTS.OBSERVER_RANDOM_DELAY_ADD);
        }
    });
    g_windowObserver = new MutationObserver((mutationList) => {
        for (let mutation of mutationList) {
            // console.log("发现窗口变化", mutation);
            if (mutation.removedNodes.length > 0 || mutation.addedNodes.length > 0) {
                // console.log("断开Observer");
                // tabBarObserver.disconnect();
                g_switchTabObserver.disconnect();
                clearInterval(g_observerRetryInterval);
                g_observerRetryInterval = setInterval(observerRetry, CONSTANTS.OBSERVER_RETRY_INTERVAL);
            }
            
        }
        
    });
    g_observerRetryInterval = setInterval(observerRetry, CONSTANTS.OBSERVER_RETRY_INTERVAL);
    g_windowObserver.observe(window.siyuan.layout.centerLayout.element, {childList: true});
}
/**
 * 重试页签监听
 */
function observerRetry() {
    g_tabbarElement = window.siyuan.layout.centerLayout.element.querySelectorAll("[data-type='wnd'] ul.layout-tab-bar");
    if (g_tabbarElement.length > 0) {
        // console.log("重新监视页签变化");
        g_tabbarElement.forEach((element)=>{
            g_switchTabObserver.observe(element, {"attributes": true, "attributeFilter": ["data-activetime"], "subtree": true});
            
            // 重启监听后立刻执行检查
            if (element.children.length > 0) {
                g_observerStartupRefreshTimeout = setTimeout(async () => {
                    console.time(g_TIMER_LABLE_NAME_COMPARE);
                    try{
                        // TODO
                        await main(element.children);
                    }catch (err) {
                        console.error(err);
                    }
                    console.timeEnd(g_TIMER_LABLE_NAME_COMPARE);
                }, Math.round(Math.random() * CONSTANTS.OBSERVER_RANDOM_DELAY) + CONSTANTS.OBSERVER_RANDOM_DELAY_ADD);
            }
        });
        clearInterval(g_observerRetryInterval);
    }
}

function removeObserver() {
    g_switchTabObserver?.disconnect();
    g_windowObserver?.disconnect();
}

async function main(targets) {
    // 获取当前文档id
    const docId = getCurrentDocIdF();
    const docDetail = await getCurrentDocDetail(docId);
    console.warn('DETAIL', docDetail);
    // 检查是否重复插入
    if (window.top.document.querySelector(`.fn__flex-1.protyle:has(.protyle-background[data-node-id="${docId}"]) #fake-doc-breadcrumb`)) return;
    // 获取并解析hpath与path
    let pathObject = await parseDocPath(docDetail, docId);
    console.warn("OBJECT", pathObject);
    // 组合显示元素
    let element = await generateElement(pathObject, docId);
    console.warn("ELEMT", element);
    // 插入显示元素和设置监听
    setAndApply(element, docId);
}

async function parseDocPath(docDetail) {
    let pathArray = docDetail.path.substring(0, docDetail.path.length - 3).split("/");
    let hpathArray = docDetail.hpath.split("/");
    let resultArray = [];
    let notebooks = getNotebooks();
    let box;
    for (let notebook of notebooks) {
        if (notebook.id == docDetail.box) {
            box = notebook;
            break;
        }
    }
    let temp = {
        "name": box.name,
        "id": box.id,
        "icon": box.icon,
        "box": box.id,
        "path": "/",
        "type": "NOTEBOOK"
    }
    resultArray.push(temp);
    let temp_path = "";
    for (let i = 1; i < pathArray.length; i++) {
        let temp = {
            "name": hpathArray[i],
            "id": pathArray[i],
            "icon": "",
            "path": `${temp_path}/${pathArray[i]}.sy`,
            "box": box.id,
            "type": "FILE",
        }
        temp_path += "/" + pathArray[i];
        resultArray.push(temp);
    }
    return resultArray;
}

async function generateElement(pathObjects, docId) {
    const divideArrow = `<svg class="protyle-breadcrumb__arrow"><use xlink:href="#iconRight"></use></svg>`;
    const oneItem = `<span class="protyle-breadcrumb__item fake-breadcrumb-click" data-node-id="%0%" data-type="%3%">
    <span class="protyle-breadcrumb__text" title="%1%">%2%</span>
</span>`;
    let htmlStr = "";
    for (let i = 0; i < pathObjects.length; i++) {
        if (pathObjects.length > 5 && i >= 2 && i < pathObjects.length - 3) {
            htmlStr += oneItem
                .replaceAll("%0%", "")
                .replaceAll("%1%", "···")
                .replaceAll("%2%", `···`)
                .replaceAll("%3%", "...");
            htmlStr += divideArrow;
            i = pathObjects.length - 4;
            continue;
        }
        let onePathObject = pathObjects[i];
        htmlStr += oneItem
            .replaceAll("%0%", onePathObject.id)
            .replaceAll("%1%", onePathObject.name)
            .replaceAll("%2%", onePathObject.name.length > 20 ? 
                onePathObject.name.substring(0, 20) + "..."
                :onePathObject.name)
            .replaceAll("%3%", onePathObject.type);
        htmlStr += divideArrow;
    }
    let result = document.createElement("div");
    let barElement = document.createElement("div");
    barElement.classList.add("protyle-breadcrumb__bar");
    barElement.classList.add("protyle-breadcrumb__bar--nowrap");
    barElement.innerHTML = htmlStr;
    result.appendChild(barElement);
    result.setAttribute("id", "fake-doc-breadcrumb");
    result.classList.add("protyle-breadcrumb");
    result.style.top = (window.document.querySelector(`.fn__flex-1.protyle:has(.protyle-background[data-node-id="${docId}"]) .protyle-breadcrumb`).clientHeight) + "px";
    // 修改以使得内容下移30px .protyle-content
    return result;
    
}

function setAndApply(element, docId) {
    window.top.document.querySelector(`.fn__flex-1.protyle:has(.protyle-background[data-node-id="${docId}"]) .protyle-breadcrumb`).insertAdjacentElement("afterend",element);
    [].forEach.call(window.document.querySelectorAll(`.fake-breadcrumb-click[data-type="FILE"]`), (elem)=>{
        elem.addEventListener("click", openRefLink);
    });
}

function setStyle() {
    let contentElem = window.top.document.querySelector(`.fn__flex-1.protyle .protyle-content`);
    let contentPaddingTop = parseFloat(window.getComputedStyle(contentElem)?.getPropertyValue("padding-top")?.replace("px")??30);
    console.log(contentPaddingTop);
    let newPaddingTop = contentPaddingTop + window.document.querySelector(`.fn__flex-1.protyle .protyle-breadcrumb`)?.clientHeight ?? 30;
    console.log("new padding top", newPaddingTop);
    const head = document.getElementsByTagName('head')[0];

    // 创建 <style> 标签
    const style = document.createElement('style');
    style.type = 'text/css';
    style.setAttribute("id", "fake-breadcrumb-style");
    style.innerHTML = `
    .profile-content { 
        padding-top: ${newPaddingTop}px; 
    }
    #fake-doc-breadcrumb {}
    `;
    head.appendChild(style);
    // contentElem.style.paddingTop = newPaddingTop + "px";

    // console.log(contentElem.style.paddingTop);

}

function removeStyle() {
    document.getElementById("fake-breadcrumb-style")?.remove();
}

function getNotebooks() {
    let notebooks = window.top.siyuan.notebooks;
    return notebooks;
}


async function getCurrentDocDetail(docId) {
    let sqlResult = await serverApi.sql(`SELECT * FROM blocks WHERE id = "${docId}"`);
    return sqlResult[0];
}

/**
 * 获取文档相关信息：父文档、同级文档、子文档
 */
async function getDocumentRelations(docId) {
    let sqlResult = await serverApi.sql(`SELECT * FROM blocks WHERE id = "${docId}"`);
     // 获取父文档
    const parentDoc = await getParentDocument(docId, sqlResult);
    
    // 获取子文档
    const childDocs = await getChildDocuments(docId, sqlResult);

    let noParentFlag = false;
    if (parentDoc.length == 0) {
        noParentFlag = true;
    }
    console.log(parentDoc);
    // 获取同级文档
    const siblingDocs = await getSiblingDocuments(docId, parentDoc, sqlResult, noParentFlag);

    // 返回结果
    return [ parentDoc, childDocs, siblingDocs ];
}

async function getParentDocument(docId, sqlResult) {
    let splitText = sqlResult[0].path.split("/");
    if (splitText.length <= 2) return [];
    let parentSqlResult = await serverApi.sql(`SELECT * FROM blocks WHERE id = "${splitText[splitText.length - 2]}"`);
    return parentSqlResult;
}

async function getChildDocuments(docId, sqlResult) {
    let childDocs = await listDocsByPath(sqlResult[0].path, sqlResult[0].box, );
    return childDocs.files;
}

async function getSiblingDocuments(docId, parentSqlResult, sqlResult, noParentFlag) {
    let siblingDocs = await listDocsByPath(noParentFlag ? "/" : parentSqlResult[0].path, sqlResult[0].box);
    return siblingDocs.files;
}



/**
 * 生成插入文本
 */
function generateText(parentDoc, childDoc, siblingDoc, docId) {
    let STYLE = `style="margin-right: 3px; "`;
    let htmlElem = document.createElement("div");
    htmlElem.setAttribute("id", "heading-docs-container");
    htmlElem.style.fontSize = g_fontSize;
    let parentElem = document.createElement("div");
    parentElem.setAttribute("id", "parent-doc-container");
    parentElem.style.borderBottom = "1px solid";
    let parentElemInnerText = `<span class="heading-docs-indicator">父：</span>`;
    for (let doc of parentDoc) {
        parentElemInnerText += `<a data-id="${doc.id}" class="refLinks childDocLinks" style="color: var(--b3-protyle-inline-link-color)" >${doc.content}</a>`;
    }
    let siblingElem = document.createElement("div");
    siblingElem.setAttribute("id", "parent-doc-container");
    siblingElem.style.borderBottom = "1px dotted gray";
    let siblingElemInnerText = `<span class="heading-docs-indicator">兄：</span>`;

    if (parentElemInnerText != `<span class="heading-docs-indicator">父：</span>`) {
        parentElem.innerHTML = parentElemInnerText;
        htmlElem.appendChild(parentElem);
    }else{
        
        for (let doc of siblingDoc) {
            let emojiStr = getEmojiHtmlStr(doc.icon, true);
            siblingElemInnerText += `<a class="refLinks childDocLinks" data-type='block-ref' data-subtype="d" style="color: var(--b3-protyle-inline-link-color)" data-id="${doc.id}">${emojiStr}${doc.name.substring(0, doc.name.length - 3)}</a>   `;
        }
        if (siblingElemInnerText != `<span class="heading-docs-indicator">兄：</span>`) {
            siblingElem.innerHTML = siblingElemInnerText;
            htmlElem.appendChild(siblingElem);
        }else{
            siblingElem.innerHTML = siblingElemInnerText + "无";
            htmlElem.appendChild(siblingElem);
        }
    }

    let childElem = document.createElement("div");
    childElem.setAttribute("id", "parent-doc-container");
    childElem.style.borderBottom = "1px solid gray";
    let childElemInnerText = `<span class="heading-docs-indicator">子：</span>`;
    for (let doc of childDoc) {
        let emojiStr = getEmojiHtmlStr(doc.icon, true);
        childElemInnerText += `<a class="refLinks childDocLinks" data-type='block-ref' data-subtype="d" style="color: var(--b3-protyle-inline-link-color)" data-id="${doc.id}">${emojiStr}${doc.name.substring(0, doc.name.length - 3)}</a>   `;
    }
    if (childElemInnerText != `<span class="heading-docs-indicator">子：</span>`) {
        childElem.innerHTML = childElemInnerText;
        htmlElem.appendChild(childElem);
    }else{
        childElem.innerHTML = childElemInnerText + "无";
        htmlElem.appendChild(childElem);
    }

    console.log(parentElemInnerText, childElemInnerText, siblingElemInnerText);
    return htmlElem;
}

// function setAndApply(htmlElem, docId) {
//     if (g_isMobile) {
//         window.document.querySelector(`.protyle-background ~ #heading-docs-container`)?.remove();
//         // if (window.document.querySelector(`.protyle-background[data-node-id="${docId}"] #heading-docs-container`) != null) return;
//         htmlElem.style.paddingLeft = "24px";
//         htmlElem.style.paddingRight = "16px";
//         htmlElem.style.paddingTop = "16px";
//         window.document.querySelector(`.fn__flex-column .protyle-background[data-node-id="${docId}"]`).insertAdjacentElement("afterend", htmlElem);
//         [].forEach.call(window.document.querySelectorAll(`#heading-docs-container  a.refLinks`), (elem)=>{
//             elem.addEventListener("click", g_importUtils.openRefLink);
//             elem.style.marginRight = "10px";
//         });
//         return;
//     }
//     if (window.document.querySelector(`.protyle-title[data-node-id="${docId}"] #heading-docs-container`) != null) return;
//     // if (window.document.querySelector(`.protyle-title[data-node-id="${docId}"] #heading-docs-container`) != null) return;
//     window.document.querySelector(`.layout__wnd--active .protyle.fn__flex-1:not(.fn__none) .protyle-title`)?.append(htmlElem);
//     [].forEach.call(window.document.querySelectorAll(`#heading-docs-container  a.refLinks`), (elem)=>{
//         elem.addEventListener("click", g_importUtils.openRefLink);
//         elem.style.marginRight = "10px";
//     });
// }

/**
 * 在html中显示文档icon
 * @param {*} iconString files[x].icon
 * @param {*} hasChild 
 * @returns 
 */
function getEmojiHtmlStr(iconString, hasChild) {
    if (iconString == undefined || iconString == null) return "";//没有icon属性，不是文档类型，不返回emoji
    if (iconString == "") return hasChild ? "📑" : "📄";//无icon默认值
    let result = iconString;
    // emoji地址判断逻辑为出现.，但请注意之后的补全
    if (iconString.indexOf(".") != -1) {
        // if (!setting.customEmojiEnable) return hasChild ? "📑" : "📄";//禁用自定义emoji时
        // emoji为网络地址时，不再补全/emojis路径
        result = `<img class="iconpic" style="width: ${g_fontSize}" src="/emojis/${iconString}"/>`;
    } else {
        result = `<span class="emojitext">${emojiIconHandler(iconString, hasChild)}</span>`;
    }
    return result;
}
let emojiIconHandler = function (iconString, hasChild = false) {
    //确定是emojiIcon 再调用，printer自己加判断
    try {
        let result = "";
        iconString.split("-").forEach(element => {
            result += String.fromCodePoint("0x" + element);
        });
        return result;
    } catch (err) {
        console.error("emoji处理时发生错误", iconString, err);
        return hasChild ? "📑" : "📄";
    }

}



async function request(url, data) {
    let resData = null;
    await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            Authorization: `Token ${config().token}`,
        },
    }).then(function (response) {
        resData = response.json();
    });
    return resData;
}

async function parseBody(response) {
    let r = await response;
    return r.code === 0 ? r.data : null;
}

async function listDocsByPath(path, notebook = undefined, sort = undefined) {
    let data = {
        path: path
    };
    if (notebook) data["notebook"] = notebook;
    if (sort) data["sort"] = sort;
    let url = '/api/filetree/listDocsByPath';
    return parseBody(request(url, data));
    //文档hepath与Markdown 内容
}

function getCurrentDocIdF() {
    let thisDocId;
    thisDocId = window.top.document.querySelector(".layout__wnd--active .protyle.fn__flex-1:not(.fn__none) .protyle-background")?.getAttribute("data-node-id");
    if (!thisDocId) {
        thisDocId = window.top.document.querySelector(".protyle-background")?.getAttribute("data-node-id");
    }
    return thisDocId;
}

/**
 * 在点击<span data-type="block-ref">时打开思源块/文档
 * 为引入本项目，和原代码相比有更改
 * @refer https://github.com/leolee9086/cc-template/blob/6909dac169e720d3354d77685d6cc705b1ae95be/baselib/src/commonFunctionsForSiyuan.js#L118-L141
 * @license 木兰宽松许可证
 * @param {点击事件} event 
 */
let openRefLink = function(event, paramId = ""){
    
    let 主界面= window.parent.document
    let id = event?.currentTarget?.getAttribute("data-id") ??
        event?.currentTarget?.getAttribute("data-node-id") ?? paramId;
    // 处理笔记本等无法跳转的情况
    if (!isValidStr(id)) {return;}
    event?.preventDefault();
    event?.stopPropagation();
    let 虚拟链接 =  主界面.createElement("span")
    虚拟链接.setAttribute("data-type","block-ref")
    虚拟链接.setAttribute("data-id",id)
    虚拟链接.style.display = "none";//不显示虚拟链接，防止视觉干扰
    let 临时目标 = 主界面.querySelector(".protyle-wysiwyg div[data-node-id] div[contenteditable]")
    临时目标.appendChild(虚拟链接);
    let clickEvent = new MouseEvent("click", {
        ctrlKey: event?.ctrlKey,
        shiftKey: event?.shiftKey,
        altKey: event?.altKey,
        bubbles: true
    });
    虚拟链接.dispatchEvent(clickEvent);
    虚拟链接.remove();
}

function isValidStr(s){
    if (s == undefined || s == null || s === '') {
		return false;
	}
	return true;
}