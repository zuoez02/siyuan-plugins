const { Plugin } = require('siyuan');

// --- globals ---

let observer = null;
let color_config = null;

class ColorFolderPlugin extends Plugin {
  constructor() {
    super();
  }

  onload() {
    observer = onFileTreeUpdate()
  }

  onunload() {
    if (observer) {
      observer.disconnect()
    }
  }
}

module.exports = ColorFolderPlugin;

async function render(mutations) {
  if (!mutations[0].addedNodes) {
    return
  }

  let config = await loadConfig()

  mutations[0].addedNodes.forEach(element => {
    const nodes = element.getElementsByTagName("li")

    Array.from(nodes).forEach(li => {
      const li_id = li.getAttribute("data-node-id")

      if (li_id in config) {
        console.log("Add", li_id, config)
        li.getElementsByClassName("b3-list-item__text")[0].style.setProperty('color', config[li_id], 'important');
      }
    })
  });
}

function onFileTreeUpdate() {
  var target = document.getElementsByClassName('file-tree')[0];
  var observe = new MutationObserver(function (mutations, observe) {
    render(mutations)
  });
  observe.observe(target, { subtree: true, childList: true });
  return observe
}

function MenuSeparator(className = 'b3-menu__separator') {
  let node = document.createElement('button');
  node.className = className;
  return node;
}

function generateFontStyle() {
  let node = document.createElement('div');
  node.className = "b3-menu__submenu b3-menu__submenu--row";
  for (let i = 1; i <= 13; i++) {
    let item = document.createElement('button');
    item.className = "b3-menu__item";
    item.innerHTML = `&ZeroWidthSpace;<span class="b3-menu__label"><div class="fn__flex" data-type="a" aria-label="字体颜色 ${i}">
<span style="color:var(--b3-font-color${i});" class="color__square fn__flex-center">A</span>
</div></span>`
    node.appendChild(item)
    node.onclick = handleSetColor
  }
  return node;
}

async function handleSetColor(event) {
  let color = event.target.style.color || event.target.querySelector(".color__square").style.color;
  let node = document.querySelectorAll('.b3-list-item--focus')[0];
  let id = node.getAttribute("data-node-id")
  // save
  let config = await loadConfig()
  config[id] = color
  saveConfig(config)
  // render
  node.getElementsByClassName("b3-list-item__text")[0].style.setProperty('color', color, 'important');
}

setTimeout(() => ClickMonitor(), 1000)

function ClickMonitor() {
  window.addEventListener('mouseup', MenuShow)
}

function MenuShow() {
  setTimeout(() => {
    let node = document.querySelectorAll('.b3-list-item--focus')[0];
    if (node.getAttribute("data-type") === "navigation-file") {
      addFileTreeButton()
    }
  }, 0);
}

function addFileTreeButton() {
  let button = document.createElement("button")
  button.id = "color-select"
  button.className = "b3-menu__item"
  button.innerHTML = '<svg class="b3-menu__icon" style="null"></svg><span class="b3-menu__label" style="">修改颜色</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>'
  button.appendChild(generateFontStyle())

  let commonMenu = document.getElementById("commonMenu")
  let readonly = commonMenu.querySelector(".b3-menu__item--readonly")
  let colorselectel = commonMenu.querySelector('[id="color-select"]')
  if (!readonly && !colorselectel) {
    commonMenu.insertAdjacentElement("beforeend", MenuSeparator())
    commonMenu.insertAdjacentElement("beforeend", button)
  }
}

// config: {id: color}

function saveConfig(config) {
  color_config = config
  
  // POST /api/storage/setLocalStorageVal
  // payload {"app":"color-folder","key":"color-folder-config","val":config}
  fetch('/api/storage/setLocalStorageVal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      app: 'color-folder',
      key: 'color-folder-config',
      val: JSON.stringify(config)
    })
  })
}

async function loadConfig() {
  if (color_config) {
    return color_config
  }

  // POST /api/storage/getLocalStorage
  const res = await fetch('/api/storage/getLocalStorage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const data = await res.json()
  if (data.code === 0) {
    const localConfig = data.data['color-folder-config']
    if (localConfig) {
      return JSON.parse(localConfig)
    } else {
      saveConfig({})
      return {}
    }
  }
}