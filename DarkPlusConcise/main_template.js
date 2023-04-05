(function() {
    "use strict";
    try {
      if (typeof document != "undefined") {
        if (window.siyuan.config.appearance[window.siyuan.config.appearance.mode ? "themeDark" : "themeLight"] === "Dark+") {
          if (window.siyuan.config.appearance.mode === 1) {
            var elementStyle = document.createElement("style");
            elementStyle.id = "DarkPlusConcise";
            elementStyle.appendChild(document.createTextNode(''));
            document.head.appendChild(elementStyle);
          }
          if (window.siyuan.config.appearance.mode === 0) {
            var elementStyle = document.createElement("style");
            elementStyle.id = "DarkPlusConcise";
            elementStyle.appendChild(document.createTextNode(''));
            document.head.appendChild(elementStyle);
          }
        }
      }
    } catch (e) {
      console.error("vite-plugin-css-injected-by-js", e);
    }
  })();
  "use strict";
  const siyuan = require("siyuan");
  const main = "";
  class DarkPlusConcisePlugin extends siyuan.Plugin {
    // private readonly logger
    constructor() {
      super();
    }
    onload() {
      console.log("DarkPlusConcisePlugin loaded");
    }
    onunload() {
      console.log("DarkPlusConcisePlugin unloaded");
    }
  }
  module.exports = DarkPlusConcisePlugin;
