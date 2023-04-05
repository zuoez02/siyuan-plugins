const { Plugin } = require('siyuan');

// --- globals ---

let interval = null;


class HideVipFuncPlugin extends Plugin {
    constructor() {
        super();
    }

    onload() {
        this.registerCommand({
            command: 'toggleHideWhenOutOfWindow',
            description: '切换隐藏模式',
            callback: () => {
                hideWhenOutOfWindow = !hideWhenOutOfWindow
            },
        })
        this.registerCommand({
            command: 'disableHideWhenOutOfWindow',
            description: '禁用隐藏模式',
            callback: () => {
                hideWhenOutOfWindow = false
            },
        })
        this.registerCommand({
            command: 'enableHideWhenOutOfWindow',
            description: '启用隐藏模式',
            callback: () => {
                hideWhenOutOfWindow = true
            },
        })


        if (interval) {
            clearInterval(interval);
        }
        // 设置一个定时器，每隔1秒执行一次checkWindowFocus函数
        interval = setInterval(checkWindowFocus, 1000);
    }

    onunload() {
        if (interval) {
            clearInterval(interval);
        }
    }
}

// --- utils ---

// 窗口没有焦点的时候，隐藏主体内容
let hideWhenOutOfWindow = false

// 来检测窗口是否具有焦点
function checkWindowFocus() {
  // 获取body元素
  let body = document.body;
  // 如果窗口具有焦点
  if (document.hasFocus()) {
    // 给body加上in-window类
    body.classList.add("in-window");
  } else {
    // 否则移除in-window类
	if(hideWhenOutOfWindow){
		body.classList.remove("in-window");
	}
  }
}

module.exports = HideVipFuncPlugin;
