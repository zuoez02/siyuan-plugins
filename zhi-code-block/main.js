(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.id = "zhi-custom-style";
      elementStyle.appendChild(document.createTextNode('@font-face {\n  font-family: "Open Sans";\n  src: url("https://static-rs-terwer.oss-cn-beijing.aliyuncs.com/lib/fonts/opensans/OpenSans-Regular.woff2") format("woff2"), url("https://static-rs-terwer.oss-cn-beijing.aliyuncs.com/lib/fonts/opensans/OpenSans-Regular.woff") format("woff");\n  font-weight: normal;\n  font-style: normal;\n  font-display: swap;\n}\nhtml[data-theme-mode="light"] {\n  --zhi-body-bg: #f4f4f4;\n  --zhi-main-bg: #fff;\n  --zhi-sidebar-bg: rgba(255,255,255,0.8);\n  --zhi-primary-color: #00323c;\n  --zhi-text-color: #00323c;\n  --zhi-border-color: rgba(0,0,0,0.12);\n  --zhi-list-hover: rgba(153,153,153,0.15);\n}\nhtml[data-theme-mode="dark"] {\n  --zhi-body-bg: #27272b;\n  --zhi-main-bg: #1e1e22;\n  --zhi-sidebar-bg: rgba(30,30,34,0.8);\n  --zhi-primary-color: #3573f0;\n  --zhi-text-color: #9b9baa;\n  --zhi-border-color: #30363d;\n  --zhi-list-hover: rgba(153,153,153,0.15);\n}\nhtml[data-theme-mode="green"] {\n  --zhi-body-bg: #ececcc;\n  --zhi-main-bg: #f5f5d5;\n  --zhi-sidebar-bg: rgba(245,245,213,0.8);\n  --zhi-primary-color: #00323c;\n  --zhi-text-color: #704214;\n  --zhi-border-color: rgba(0,0,0,0.15);\n  --zhi-list-hover: rgba(153,153,153,0.15);\n}\n:root {\n  --zhi-font-family: "Open Sans", "LXGW WenKai", "JetBrains Mono", "-apple-system", "Microsoft YaHei", "Times New Roman", "方正北魏楷书_GBK";\n  --zhi-font-family-code: "Open Sans", "LXGW WenKai", "JetBrains Mono", "-apple-system", "Microsoft YaHei", "Times New Roman", "方正北魏楷书_GBK";\n  --zhi-border-radius-round: 50%;\n}\n:root {\n  --zhi-font-family-code: "Open Sans", "JetBrains Mono", "-apple-system", "Microsoft YaHei", "Times New Roman", , "LXGW WenKai", "方正北魏楷书_GBK";\n}\nhtml[data-theme-mode="light"] {\n  --zhi-code-tab-bg: #fff;\n  --zhi-code-content-bg: #f8f9fa;\n}\nhtml[data-theme-mode="dark"] {\n  --zhi-code-tab-bg: #1e1e22;\n  --zhi-code-content-bg: #1e1e1e;\n}\nhtml[data-theme-mode="green"] {\n  --zhi-code-tab-bg: #f5f5d5;\n  --zhi-code-content-bg: rgba(27,31,35,0.05);\n}\n#preview .protyle-action__language {\n  right: 0.2rem !important;\n}\n#preview .protyle-action__language::after {\n  display: none !important;\n}\n#preview .protyle-action__copy {\n  display: none !important;\n}\nhtml[data-light-theme="Rem Craft"] .b3-typography .code-block,\nhtml[data-light-theme="Rem Craft"] .protyle-wysiwyg .code-block {\n  background: var(--zhi-code-tab-bg);\n}\nhtml[data-light-theme="Rem Craft"] .b3-typography .code-block .protyle-action .protyle-action__language,\nhtml[data-light-theme="Rem Craft"] .protyle-wysiwyg .code-block .protyle-action .protyle-action__language {\n  right: 5rem;\n  top: -0.1rem;\n}\nhtml[data-theme-mode="light"][data-light-theme="Dark+"] .code-block {\n  overflow: auto;\n}\nhtml[data-theme-mode="light"][data-light-theme="Dark+"] .protyle-wysiwyg [data-node-id].code-block > .protyle-action {\n  position: absolute;\n  background-color: var(--custom-popover-function-menu-background-color);\n  backdrop-filter: var(--custom-backdrop-popover-filter);\n  height: 32px;\n}\nhtml[data-theme-mode="light"][data-light-theme="Dark+"] .b3-typography .code-block .protyle-action .protyle-action__language,\nhtml[data-theme-mode="light"][data-light-theme="Dark+"] .protyle-wysiwyg .code-block .protyle-action .protyle-action__language {\n  right: 2.5rem;\n  top: 0.2rem;\n}\nhtml[data-theme-mode="light"][data-light-theme="Dark+"] .protyle-wysiwyg .code-block .protyle-action .protyle-action__copy,\nhtml[data-theme-mode="light"][data-light-theme="Dark+"] .protyle-wysiwyg .code-block .protyle-action .protyle-action__menu {\n  margin-top: 0.3rem;\n}\nhtml[data-theme-mode="dark"][data-dark-theme="Dark+"] .code-block {\n  border-radius: 0 !important;\n}\nhtml[data-theme-mode="dark"][data-dark-theme="Dark+"] .protyle-wysiwyg [data-node-id].code-block > .protyle-action {\n  position: absolute;\n  background: var(--zhi-code-tab-bg);\n  height: 32px;\n}\nhtml[data-theme-mode="dark"][data-dark-theme="Dark+"] .b3-typography .code-block .protyle-action .protyle-action__language,\nhtml[data-theme-mode="dark"][data-dark-theme="Dark+"] .protyle-wysiwyg .code-block .protyle-action .protyle-action__language {\n  right: 2.5rem;\n  top: 0.2rem;\n}\nhtml[data-theme-mode="dark"][data-dark-theme="Dark+"] .protyle-wysiwyg .code-block .protyle-action .protyle-action__copy,\nhtml[data-theme-mode="dark"][data-dark-theme="Dark+"] .protyle-wysiwyg .code-block .protyle-action .protyle-action__menu {\n  margin-top: 0.3rem;\n}\nhtml[data-light-theme="HBuilderX-Light"] {\n  overflow: auto;\n}\nhtml[data-light-theme="HBuilderX-Light"] .code-block {\n  overflow: auto;\n}\nhtml[data-light-theme="HBuilderX-Light"] .protyle-wysiwyg [data-node-id].code-block > .protyle-action {\n  height: 28px;\n}\nhtml[data-light-theme="HBuilderX-Light"] .b3-typography .code-block .protyle-action .protyle-action__language,\nhtml[data-light-theme="HBuilderX-Light"] .protyle-wysiwyg .code-block .protyle-action .protyle-action__language {\n  top: 0.5rem;\n  right: 3rem;\n}\nhtml[data-light-theme="HBuilderX-Light"] .protyle-wysiwyg .code-block .protyle-action .protyle-action__copy,\nhtml[data-light-theme="HBuilderX-Light"] .protyle-wysiwyg .code-block .protyle-action .protyle-action__menu {\n  margin-top: 0.2rem;\n}\nhtml[data-light-theme="Savor"] .b3-typography .code-block .protyle-action .protyle-action__language,\nhtml[data-light-theme="Savor"] .protyle-wysiwyg .code-block .protyle-action .protyle-action__language {\n  top: 0.2rem;\n}\nhtml[data-light-theme="Sofill-"] .code-block::after {\n  top: 0.7rem !important;\n}\nhtml[data-light-theme="Sofill-"] .b3-typography .code-block .protyle-action .protyle-action__language,\nhtml[data-light-theme="Sofill-"] .protyle-wysiwyg .code-block .protyle-action .protyle-action__language {\n  top: -0.1rem;\n  left: unset !important;\n  right: 0.2rem;\n}\n.code-block {\n  border: 0.5px solid var(--zhi-border-color) !important;\n  border-radius: 5px !important;\n  padding-top: 32px !important;\n  background: var(--zhi-code-tab-bg);\n}\n.b3-typography div.hljs,\n.protyle-wysiwyg div.hljs {\n  padding: 8px;\n  font-family: var(--zhi-font-family-code);\n  border-top: 0.5px solid var(--zhi-border-color);\n  border-radius: 0 0 5px 5px !important;\n  background: var(--zhi-code-content-bg);\n}\n.code-block::after {\n  content: " ";\n  position: absolute;\n  background: #fa625c;\n  box-shadow: 23px 0 #fdbc40, 45px 0 #35cd4b;\n  border-radius: var(--zhi-border-radius-round);\n  top: 10px;\n  left: 8px;\n  height: 12px;\n  width: 12px;\n  z-index: 1;\n}\n.protyle-linenumber__rows {\n  margin-top: 32px !important;\n  padding: 4px;\n  background-color: var(--b3-theme-background) !important;\n  margin-bottom: 0;\n  font-family: var(--zhi-font-family-code);\n  border-top-left-radius: 4px;\n}\n.protyle-linenumber__rows span::before {\n  color: #808007;\n}\n.b3-typography .code-block .protyle-action .protyle-action__language,\n.protyle-wysiwyg .code-block .protyle-action .protyle-action__language {\n  margin-top: 0;\n  position: absolute;\n  right: 3.5em;\n  border-radius: 1px;\n  opacity: 1 !important;\n  font-family: var(--zhi-font-family-code);\n}\n.b3-typography .code-block .protyle-action .protyle-action__language::after,\n.protyle-wysiwyg .code-block .protyle-action .protyle-action__language::after {\n  content: "›";\n  font-family: var(--zhi-font-family-code);\n  color: rgba(128,128,128,0.502);\n  opacity: 1;\n}\ncode.hljs {\n  border: 1px solid var(--zhi-border-color1);\n}\n.b3-typography .code-block .protyle-action .protyle-icon,\n.b3-typography .code-block .protyle-action .protyle-action__language,\n.protyle-wysiwyg .code-block .protyle-action .protyle-icon,\n.protyle-wysiwyg .code-block .protyle-action .protyle-action__language {\n  opacity: 1 !important;\n  background-color: transparent !important;\n}\n.b3-typography .code-block .protyle-action .protyle-icon svg,\n.b3-typography .code-block .protyle-action .protyle-action__language svg,\n.protyle-wysiwyg .code-block .protyle-action .protyle-icon svg,\n.protyle-wysiwyg .code-block .protyle-action .protyle-action__language svg {\n  color: #808080;\n}'));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const siyuan = require("siyuan");
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b2) => (typeof require !== "undefined" ? require : a)[b2]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var H = Object.defineProperty;
var J = (n, e, t) => e in n ? H(n, e, { enumerable: true, configurable: true, writable: true, value: t }) : n[e] = t;
var s$1 = (n, e, t) => (J(n, typeof e != "symbol" ? e + "" : e, t), t);
var Q = Object.defineProperty;
var ee = (n, e, t) => e in n ? Q(n, e, { enumerable: true, configurable: true, writable: true, value: t }) : n[e] = t;
var _ = (n, e, t) => (ee(n, typeof e != "symbol" ? e + "" : e, t), t);
var K = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var P = {};
var te = {
  get exports() {
    return P;
  },
  set exports(n) {
    P = n;
  }
};
(function(n) {
  (function(e, t) {
    n.exports ? n.exports = t() : e.log = t();
  })(K, function() {
    var e = function() {
    }, t = "undefined", r2 = typeof window !== t && typeof window.navigator !== t && /Trident\/|MSIE /.test(window.navigator.userAgent), i2 = ["trace", "debug", "info", "warn", "error"];
    function o2(a, m) {
      var L = a[m];
      if (typeof L.bind == "function")
        return L.bind(a);
      try {
        return Function.prototype.bind.call(L, a);
      } catch {
        return function() {
          return Function.prototype.apply.apply(L, [a, arguments]);
        };
      }
    }
    function l() {
      console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
    }
    function h(a) {
      return a === "debug" && (a = "log"), typeof console === t ? false : a === "trace" && r2 ? l : console[a] !== void 0 ? o2(console, a) : console.log !== void 0 ? o2(console, "log") : e;
    }
    function g(a, m) {
      for (var L = 0; L < i2.length; L++) {
        var u = i2[L];
        this[u] = L < a ? e : this.methodFactory(u, a, m);
      }
      this.log = this.debug;
    }
    function y(a, m, L) {
      return function() {
        typeof console !== t && (g.call(this, m, L), this[a].apply(this, arguments));
      };
    }
    function p(a, m, L) {
      return h(a) || y.apply(this, arguments);
    }
    function f(a, m, L) {
      var u = this, U;
      m = m ?? "WARN";
      var d = "loglevel";
      typeof a == "string" ? d += ":" + a : typeof a == "symbol" && (d = void 0);
      function N(c) {
        var E = (i2[c] || "silent").toUpperCase();
        if (!(typeof window === t || !d)) {
          try {
            window.localStorage[d] = E;
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(d) + "=" + E + ";";
          } catch {
          }
        }
      }
      function A() {
        var c;
        if (!(typeof window === t || !d)) {
          try {
            c = window.localStorage[d];
          } catch {
          }
          if (typeof c === t)
            try {
              var E = window.document.cookie, O = E.indexOf(encodeURIComponent(d) + "=");
              O !== -1 && (c = /^([^;]+)/.exec(E.slice(O))[1]);
            } catch {
            }
          return u.levels[c] === void 0 && (c = void 0), c;
        }
      }
      function D() {
        if (!(typeof window === t || !d)) {
          try {
            window.localStorage.removeItem(d);
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(d) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch {
          }
        }
      }
      u.name = a, u.levels = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        SILENT: 5
      }, u.methodFactory = L || p, u.getLevel = function() {
        return U;
      }, u.setLevel = function(c, E) {
        if (typeof c == "string" && u.levels[c.toUpperCase()] !== void 0 && (c = u.levels[c.toUpperCase()]), typeof c == "number" && c >= 0 && c <= u.levels.SILENT) {
          if (U = c, E !== false && N(c), g.call(u, c, a), typeof console === t && c < u.levels.SILENT)
            return "No console available for logging";
        } else
          throw "log.setLevel() called with invalid level: " + c;
      }, u.setDefaultLevel = function(c) {
        m = c, A() || u.setLevel(c, false);
      }, u.resetLevel = function() {
        u.setLevel(m, false), D();
      }, u.enableAll = function(c) {
        u.setLevel(u.levels.TRACE, c);
      }, u.disableAll = function(c) {
        u.setLevel(u.levels.SILENT, c);
      };
      var S = A();
      S == null && (S = m), u.setLevel(S, false);
    }
    var w = new f(), v2 = {};
    w.getLogger = function(a) {
      if (typeof a != "symbol" && typeof a != "string" || a === "")
        throw new TypeError("You must supply a name when creating a logger.");
      var m = v2[a];
      return m || (m = v2[a] = new f(a, w.getLevel(), w.methodFactory)), m;
    };
    var x = typeof window !== t ? window.log : void 0;
    return w.noConflict = function() {
      return typeof window !== t && window.log === w && (window.log = x), w;
    }, w.getLoggers = function() {
      return v2;
    }, w.default = w, w;
  });
})(te);
var C = {};
var ne = {
  get exports() {
    return C;
  },
  set exports(n) {
    C = n;
  }
};
(function(n) {
  (function(e, t) {
    n.exports ? n.exports = t() : e.prefix = t(e);
  })(K, function(e) {
    var t = function(p) {
      for (var f = 1, w = arguments.length, v2; f < w; f++)
        for (v2 in arguments[f])
          Object.prototype.hasOwnProperty.call(arguments[f], v2) && (p[v2] = arguments[f][v2]);
      return p;
    }, r2 = {
      template: "[%t] %l:",
      levelFormatter: function(p) {
        return p.toUpperCase();
      },
      nameFormatter: function(p) {
        return p || "root";
      },
      timestampFormatter: function(p) {
        return p.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
      },
      format: void 0
    }, i2, o2 = {}, l = function(p) {
      if (!p || !p.getLogger)
        throw new TypeError("Argument is not a root logger");
      i2 = p;
    }, h = function(p, f) {
      if (!p || !p.setLevel)
        throw new TypeError("Argument is not a logger");
      var w = p.methodFactory, v2 = p.name || "", x = o2[v2] || o2[""] || r2;
      function a(m, L, u) {
        var U = w(m, L, u), d = o2[u] || o2[""], N = d.template.indexOf("%t") !== -1, A = d.template.indexOf("%l") !== -1, D = d.template.indexOf("%n") !== -1;
        return function() {
          for (var S = "", c = arguments.length, E = Array(c), O = 0; O < c; O++)
            E[O] = arguments[O];
          if (v2 || !o2[u]) {
            var G = d.timestampFormatter(new Date()), z = d.levelFormatter(m), j = d.nameFormatter(u);
            d.format ? S += d.format(z, j, G) : (S += d.template, N && (S = S.replace(/%t/, G)), A && (S = S.replace(/%l/, z)), D && (S = S.replace(/%n/, j))), E.length && typeof E[0] == "string" ? E[0] = S + " " + E[0] : E.unshift(S);
          }
          U.apply(void 0, E);
        };
      }
      return o2[v2] || (p.methodFactory = a), f = f || {}, f.template && (f.format = void 0), o2[v2] = t({}, x, f), p.setLevel(p.getLevel()), i2 || p.warn(
        "It is necessary to call the function reg() of loglevel-plugin-prefix before calling apply. From the next release, it will throw an error. See more: https://github.com/kutuluk/loglevel-plugin-prefix/blob/master/README.md"
      ), p;
    }, g = {
      reg: l,
      apply: h
    }, y;
    return e && (y = e.prefix, g.noConflict = function() {
      return e.prefix === g && (e.prefix = y), g;
    }), g;
  });
})(ne);
var R = class {
};
_(R, "LOG_LEVEL_KEY", "VITE_LOG_LEVEL"), _(R, "LOG_PREFIX_KEY", "VITE_LOG_PREFIX");
var T = /* @__PURE__ */ ((n) => (n.LOG_LEVEL_DEBUG = "DEBUG", n.LOG_LEVEL_INFO = "INFO", n.LOG_LEVEL_WARN = "WARN", n.LOG_LEVEL_ERROR = "ERROR", n))(T || {});
function re() {
  const n = Error.prepareStackTrace;
  Error.prepareStackTrace = (t, r2) => r2;
  const e = new Error().stack.slice(1);
  return Error.prepareStackTrace = n, e;
}
var F = class {
  /**
   * 解析日志级别为枚举
   *
   * @param enumObj 枚举对象
   * @param value 配置的值
   */
  static stringToEnumValue(e, t) {
    return e[Object.keys(e).filter((r2) => e[r2].toString() === t)[0]];
  }
  /**
   * 获取配置的日志级别
   */
  static getEnvLevel(e) {
    if (!e)
      return;
    const t = e.getEnvOrDefault(R.LOG_LEVEL_KEY, T.LOG_LEVEL_INFO), r2 = F.stringToEnumValue(T, t.toUpperCase());
    return r2 || console.warn(
      "[zhi-log] LOG_LEVEL is invalid in you .env file.Must be either debug, info, warn or error, fallback to default info level"
    ), r2;
  }
  /**
   * 获取默认日志
   */
  static getEnvLogger(e) {
    if (e)
      return e.getEnv(R.LOG_PREFIX_KEY);
  }
};
var ie = class {
  constructor(e, t, r2) {
    _(this, "consoleLogger", "console"), _(this, "stackSize", 1), _(this, "getLogger", (l) => {
      let h;
      if (l)
        h = l;
      else {
        const g = this.getCallStack(), y = [], p = [];
        for (let f = 0; f < g.length; f++) {
          const w = g[f], v2 = w.getFileName() ?? "none";
          if (f > this.stackSize - 1)
            break;
          const x = v2 + "-" + w.getLineNumber() + ":" + w.getColumnNumber();
          y.push(x);
        }
        p.length > 0 && (h = y.join(" -> "));
      }
      return (!h || h.trim().length === 0) && (h = this.consoleLogger), P.getLogger(h);
    }), this.stackSize = 1;
    let i2;
    e ? i2 = e : i2 = F.getEnvLevel(r2), i2 = i2 ?? T.LOG_LEVEL_INFO, P.setLevel(i2);
    const o2 = {
      gray: (l) => l.toString(),
      green: (l) => l.toString(),
      yellow: (l) => l.toString(),
      red: (l) => l.toString()
    };
    C.reg(P), C.apply(P, {
      format(l, h, g) {
        const y = ["[" + (t ?? F.getEnvLogger(r2) ?? "zhi") + "]"];
        switch (y.push(o2.gray("[") + o2.green(g).toString() + o2.gray("]")), l) {
          case T.LOG_LEVEL_DEBUG:
            y.push(o2.gray(l.toUpperCase().toString()));
            break;
          case T.LOG_LEVEL_INFO:
            y.push(o2.green(l.toUpperCase().toString()));
            break;
          case T.LOG_LEVEL_WARN:
            y.push(o2.yellow(l.toUpperCase().toString()));
            break;
          case T.LOG_LEVEL_ERROR:
            y.push(o2.red(l.toUpperCase().toString()));
            break;
        }
        return y.push(o2.green(h).toString()), y.push(o2.gray(":")), y.join(" ");
      }
    });
  }
  /**
   * 设置输出栈的深度，默认1
   *
   * @param stackSize - 栈的深度
   */
  setStackSize(e) {
    this.stackSize = e ?? 1;
  }
  /**
   * 获取调用堆栈，若未获取到直接返回空数组
   *
   * @author terwer
   * @since 1.6.0
   */
  getCallStack() {
    let e;
    try {
      e = re();
    } catch {
      e = [];
    }
    return e;
  }
};
var oe = class {
  /**
   * 默认日志级别
   *
   * @param level - 可选，未设置默认INFO
   * @param sign - 可选前缀，默认zhi
   * @param env - 可选环境变量实例
   */
  constructor(e, t, r2) {
    _(this, "logger"), this.logger = new ie(e, t, r2);
  }
  /**
   * 获取日志记录器
   *
   * @param loggerName - 日志记录器名称
   * @param stackSize - 打印栈的深度
   * @protected
   */
  getLogger(e, t) {
    return this.logger.setStackSize(t), this.logger.getLogger(e);
  }
};
var q = class extends oe {
  constructor(e, t, r2) {
    super(e, t, r2);
  }
  /**
   * 获取默认的日志记录器
   *
   * @param loggerName - 日志记录器名称
   * @param stackSize - 打印栈的深度
   */
  getLogger(e, t) {
    return super.getLogger(e, t);
  }
};
var V = class {
  /**
   * 默认日志记录器
   *
   * @param stackSize - 栈的深度
   * @param env - 环境变量实例
   */
  static defaultLogger(e, t) {
    return V.customLogFactory(void 0, void 0, e).getLogger(void 0, t);
  }
  /**
   * 自定义日志工厂
   */
  static customLogFactory(e, t, r2) {
    return new q(e, t, r2);
  }
  /**
   * 自定义日志工厂，自定义前缀
   */
  static customSignLogFactory(e, t) {
    return new q(void 0, e, t);
  }
};
var Y = class {
};
s$1(Y, "LOG_STACK_SIZE", 1);
var X = "1.0.12";
var se = class {
  constructor() {
    s$1(this, "VERSION");
    this.VERSION = X;
  }
};
var ae = class {
  constructor() {
    s$1(this, "VERSION");
    this.VERSION = X;
  }
};
var b = class {
  constructor() {
    s$1(this, "getQueryString", (e) => {
      if (!b.isInBrowser)
        return "";
      const r2 = window.location.search.substring(1).split("&");
      for (let i2 = 0; i2 < r2.length; i2++) {
        const o2 = r2[i2].split("=");
        if (o2[0] === e)
          return o2[1];
      }
      return "";
    });
  }
  /**
   * 检测是否运行在Chrome插件中
   */
  static isInChromeExtension() {
    return b.isInBrowser ? window.location.href.indexOf("chrome-extension://") > -1 : false;
  }
};
var I = b;
s$1(I, "isInBrowser", typeof window < "u"), s$1(
  I,
  "isElectron",
  () => !b.isInBrowser || !window.navigator || !window.navigator.userAgent ? false : /Electron/.test(window.navigator.userAgent)
), s$1(I, "replaceUrlParam", (e, t, r2) => {
  r2 == null && (r2 = "");
  const i2 = new RegExp("\\b(" + t + "=).*?(&|#|$)");
  return e.search(i2) >= 0 ? e.replace(i2, "$1" + r2 + "$2") : (e = e.replace(/[?#]$/, ""), e + (e.indexOf("?") > 0 ? "&" : "?") + t + "=" + r2);
}), s$1(
  I,
  "setUrlParameter",
  (e, t, r2) => b.isInBrowser ? e.includes(t) ? b.replaceUrlParam(e, t, r2) : (e += (e.match(/[?]/g) != null ? "&" : "?") + t + "=" + r2, e) : ""
), s$1(I, "reloadTabPage", (e) => {
  setTimeout(function() {
    if (b.isInBrowser) {
      const t = window.location.href;
      window.location.href = b.setUrlParameter(t, "tab", e);
    }
  }, 200);
}), s$1(I, "reloadPage", () => {
  setTimeout(function() {
    b.isInBrowser && window.location.reload();
  }, 200);
}), s$1(I, "reloadPageWithMessageCallback", (e, t) => {
  t && t(), setTimeout(function() {
    b.isInBrowser && window.location.reload();
  }, 200);
});
var W = class {
  constructor() {
    s$1(
      this,
      "isInSiyuanWidget",
      () => typeof window > "u" ? false : window.frameElement != null && window.frameElement.parentElement != null && window.frameElement.parentElement.parentElement != null && window.frameElement.parentElement.parentElement.getAttribute("data-node-id") !== ""
    );
    s$1(this, "isInSiyuanNewWin", () => typeof window > "u" ? false : typeof window.terwer < "u");
    s$1(this, "isInSiyuanOrSiyuanNewWin", () => I.isElectron);
  }
  /**
   * 思源笔记 window 对象
   */
  siyuanWindow() {
    let e;
    return this.isInSiyuanWidget() ? e = parent.window : this.isInSiyuanNewWin() || typeof window < "u" ? e = window : e = void 0, e;
  }
};
var le = class {
  constructor() {
    s$1(this, "serverApi");
    s$1(this, "clientApi");
    s$1(this, "siyuanUtil");
    this.serverApi = new se(), this.clientApi = new ae(), this.siyuanUtil = new W();
  }
};
var ce = class {
  constructor() {
    s$1(this, "VERSION");
    this.VERSION = "1.0.0";
  }
};
var ue = class {
  /**
   * 格式化字符串
   *
   * @param str - 字符串，可用占位符，例如：test\{0\}str
   * @param args - 按占位符顺序排列的参数
   * @author terwer
   * @since 0.0.1
   */
  f(e, ...t) {
    let r2 = e;
    for (let i2 = 0; i2 < t.length; i2++) {
      const o2 = t[i2];
      typeof o2 == "string" ? r2 = r2.replace(`{${i2}}`, o2) : r2 = r2.replace(`{${i2}}`, o2.toString());
    }
    return r2;
  }
};
var pe = class {
  constructor() {
    s$1(this, "TIME_SPLIT", " ");
    s$1(this, "formatIsoToZhDate", (e, t, r2) => {
      if (!e)
        return "";
      let i2 = e;
      const o2 = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(.\d{3})Z$/gm, l = i2.match(o2);
      if (l == null)
        return e;
      for (let h = 0; h < l.length; h++) {
        const g = l[h];
        let y = g;
        t && (y = this.addHoursToDate(new Date(g), 8).toISOString());
        const p = y.split("T"), f = p[0], w = p[1].split(".")[0];
        let v2 = f + this.TIME_SPLIT + w;
        r2 && (v2 = f), i2 = i2.replace(g, v2);
      }
      return i2;
    });
  }
  /**
   * 给日期添加小时
   *
   * @param date - Date
   * @param numOfHours - 数字
   * @author terwer
   * @since 1.0.0
   */
  addHoursToDate(e, t) {
    return e.setTime(e.getTime() + t * 60 * 60 * 1e3), e;
  }
  /**
   * 当前日期时间完整格式，格式：2023-03-10 02:03:43
   */
  nowZh() {
    return this.formatIsoToZhDate(new Date().toISOString());
  }
  /**
   * 当前日期，格式：2023-03-10
   */
  nowDateZh() {
    return this.formatIsoToZhDate(new Date().toISOString(), true, true);
  }
  /**
   * 当前时间，格式：02:03:43
   */
  nowTimeZh() {
    return this.formatIsoToZhDate(new Date().toISOString(), true).split(this.TIME_SPLIT)[1];
  }
};
var k = (n, e) => {
  const t = Z(n), r2 = Z(e), i2 = t.pop(), o2 = r2.pop(), l = $(t, r2);
  return l !== 0 ? l : i2 && o2 ? $(i2.split("."), o2.split(".")) : i2 || o2 ? i2 ? -1 : 1 : 0;
};
var he = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
var Z = (n) => {
  if (typeof n != "string")
    throw new TypeError("Invalid argument expected string");
  const e = n.match(he);
  if (!e)
    throw new Error(`Invalid argument not valid semver ('${n}' received)`);
  return e.shift(), e;
};
var B = (n) => n === "*" || n === "x" || n === "X";
var M = (n) => {
  const e = parseInt(n, 10);
  return isNaN(e) ? n : e;
};
var ge = (n, e) => typeof n != typeof e ? [String(n), String(e)] : [n, e];
var fe = (n, e) => {
  if (B(n) || B(e))
    return 0;
  const [t, r2] = ge(M(n), M(e));
  return t > r2 ? 1 : t < r2 ? -1 : 0;
};
var $ = (n, e) => {
  for (let t = 0; t < Math.max(n.length, e.length); t++) {
    const r2 = fe(n[t] || "0", e[t] || "0");
    if (r2 !== 0)
      return r2;
  }
  return 0;
};
var de = class {
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is higher than v2
   */
  greater(e, t) {
    return k(e, t) > 0;
  }
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is equal to v2
   */
  equal(e, t) {
    return k(e, t) === 0;
  }
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is lesser than v2
   */
  lesser(e, t) {
    return k(e, t) < 0;
  }
};
var ye = class {
  /**
   * 获取当前设备
   */
  static getDevice() {
    const e = new W();
    return e.isInSiyuanWidget() ? "Siyuan_Widget" : e.isInSiyuanOrSiyuanNewWin() ? "Siyuan_NewWin" : I.isInChromeExtension() ? "Chrome_Extension" : "Chrome_Browser";
  }
};
var me = class {
  constructor() {
    s$1(this, "siyuanUtil");
    s$1(this, "requireLib", (e) => {
      const t = this.siyuanUtil.siyuanWindow();
      return t ? t.require(e) : __require(e);
    });
    s$1(this, "getCrossPlatformAppDataFolder", () => {
      var r2, i2, o2, l, h, g;
      const e = this.requireLib("path");
      let t;
      return ((r2 = this.syProcess()) == null ? void 0 : r2.platform) === "darwin" ? t = e.join((i2 = this.syProcess()) == null ? void 0 : i2.env.HOME, "/Library/Application Support") : ((o2 = this.syProcess()) == null ? void 0 : o2.platform) === "win32" ? t = (l = this.syProcess()) == null ? void 0 : l.env.APPDATA : ((h = this.syProcess()) == null ? void 0 : h.platform) === "linux" && (t = (g = this.syProcess()) == null ? void 0 : g.env.HOME), t;
    });
    this.siyuanUtil = new W();
  }
  // ------------------------------------------------------------------------------------------------------
  /**
   *
   * 可以使用Node.js内置的fs模块中的`copyFileSync`或者`copyFile`方法来复制文件夹。不过需要注意，这两个方法只能复制单个文件，如果想要复制整个文件夹，需要自己编写递归函数实现。
   * 本方法用于复制一个文件夹以及其中所有子文件和子文件夹
   *
   * @param source - 源文件
   * @param target - 目标文件
   * @author terwer
   * @since 1.0.0
   */
  copyFolderSync(e, t) {
    const r2 = this, i2 = this.requireLib("fs"), o2 = this.requireLib("path");
    i2.existsSync(t) || i2.mkdirSync(t), i2.lstatSync(e).isDirectory() && i2.readdirSync(e).forEach(function(h) {
      const g = o2.join(e, h);
      i2.lstatSync(g).isDirectory() ? r2.copyFolderSync(g, o2.join(t, h)) : i2.copyFileSync(g, o2.join(t, h));
    });
  }
  /**
   * 删除文件夹
   *
   * @param folder - 文件夹
   */
  rmFolder(e) {
    const t = this.requireLib("fs");
    t.existsSync(e) && t.rmdirSync(e, { recursive: true });
  }
  /**
   * 路径拼接
   *
   * @param paths - 路径数组
   */
  joinPath(...e) {
    return this.requireLib("path").join(...e);
  }
  /**
   * 获取相对路径
   *
   * @param pathname - 路径名称
   */
  dirname(e) {
    return this.requireLib("path").dirname(e);
  }
  /**
   * 获取绝对路径
   *
   * @param pathname - 路径名称
   */
  absPath(e) {
    const t = this.requireLib("path"), r2 = this.dirname(e);
    return t.resolve(t.dirname(r2), e);
  }
  // -----------------------------------------------------------------------------------------------
  /**
   * 思源笔记 process 对象
   */
  syProcess() {
    return I.isInBrowser ? window.process : process;
  }
  /**
   * 思源笔记 conf 目录
   */
  siyuanConfPath() {
    const e = this.siyuanUtil.siyuanWindow();
    if (!e)
      throw new Error("Not in siyuan env");
    return e == null ? void 0 : e.siyuan.config.system.confDir;
  }
  /**
   * 思源笔记 data 目录
   */
  siyuanDataPath() {
    const e = this.siyuanUtil.siyuanWindow();
    if (!e)
      throw new Error("Not in siyuan env");
    return e.siyuan.config.system.dataDir;
  }
  /**
   * 思源笔记 appearance 目录
   */
  siyuanAppearancePath() {
    return this.requireLib("path").join(this.siyuanConfPath(), "appearance");
  }
  /**
   * 思源笔记 themes 目录
   */
  siyuanThemePath() {
    return this.requireLib("path").join(this.siyuanAppearancePath(), "themes");
  }
  /**
   * zhi 主题目录
   */
  zhiThemePath() {
    return this.requireLib("path").join(this.siyuanThemePath(), "zhi");
  }
  /**
   * zhi 主题构建目录
   */
  zhiThemeDistPath() {
    return this.requireLib("path").join(this.zhiThemePath(), "apps", "theme", "dist");
  }
  /**
   * zhi 博客构建目录
   */
  zhiBlogDistPath() {
    return this.requireLib("path").join(this.siyuanThemePath(), "apps", "blog", "dist");
  }
  /**
   * zhi-mini 目录
   */
  zhiMiniPath() {
    return this.requireLib("path").join(this.siyuanThemePath(), "zhi-mini");
  }
};
var ve = class {
  constructor() {
    s$1(this, "strUtil");
    s$1(this, "dateUtil");
    s$1(this, "electronUtil");
    s$1(this, "browserUtil");
    s$1(this, "versionUtil");
    s$1(this, "deviceUtil");
    this.strUtil = new ue(), this.dateUtil = new pe(), this.electronUtil = new me(), this.browserUtil = I, this.versionUtil = new de(), this.deviceUtil = ye;
  }
};
var Ee = class {
  /**
   * 构造 zhi-sdk 对象
   * @param env - 可选，环境变量对象
   */
  constructor(e) {
    s$1(this, "env");
    s$1(this, "logger");
    s$1(this, "siyuanApi");
    s$1(this, "blogApi");
    s$1(this, "common");
    this.env = e, this.logger = V.defaultLogger(this.env, Y.LOG_STACK_SIZE), this.siyuanApi = new le(), this.blogApi = new ce(), this.common = new ve();
  }
  /**
   * 获取配置环境变量
   */
  getEnv() {
    if (!this.env)
      throw new Error("env is not initiated, please use new ZhiSdk(env) create ZhiSdk object!");
    return this.env;
  }
  /**
   * 获取日志操作对象
   */
  getLogger() {
    return this.logger;
  }
};
var i = Object.defineProperty;
var v = (n, t, e) => t in n ? i(n, t, { enumerable: true, configurable: true, writable: true, value: e }) : n[t] = e;
var r = (n, t, e) => (v(n, typeof t != "symbol" ? t + "" : t, e), e);
var s = class {
};
r(s, "NODE_ENV_KEY", "NODE_ENV"), /**
* 是否处于调试模式
*/
r(s, "VITE_DEBUG_MODE_KEY", "VITE_DEBUG_MODE");
var o = class {
  /**
   * 环境初始化
   *
   * @param envMeta - 需要传入 {"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true,"SSR":false} 。特别提醒：此参数是静态元数据，取决于最终使用的项目。因此仅仅在最终使用的地方显示传递此值，中间项目请保持参数传递
   * @see {@link https://vitejs.dev/guide/env-and-mode.html#production-replacement}
   */
  constructor(t) {
    r(this, "envMeta");
    this.envMeta = t;
  }
  /**
   * 是否是开发阶段调试
   */
  isNodeDev() {
    return this.getEnv(s.NODE_ENV_KEY) === "development";
  }
  /**
   * 是否是调试阶段
   */
  isDev() {
    return this.isNodeDev() || this.getBooleanEnv(s.VITE_DEBUG_MODE_KEY);
  }
  /**
   * 获取环境变量，key不存在返回undefined
   * @param key - key
   */
  getEnv(t) {
    let e;
    try {
      this.envMeta[t] && (e = this.envMeta[t]);
    } catch (E) {
      console.error(E);
    }
    return e;
  }
  /**
   * 获取String类型的环境变量，key不存在直接返回空值
   * @param key - key
   */
  getStringEnv(t) {
    return this.getEnv(t) ?? "";
  }
  /**
   * 获取Boolean类型的环境变量，key不存在返回false
   * @param key - key
   */
  getBooleanEnv(t) {
    let e = false;
    return this.getEnv(t) && (e = this.getStringEnv(t).toLowerCase() === "true"), e;
  }
  /**
   * 获取环境变量，如果未定义或者为空值，用指定的默认值代替
   *
   * @param key - key
   * @param defaultValue - 默认值
   * @since 0.1.0
   * @author terwer
   */
  getEnvOrDefault(t, e) {
    const E = this.getStringEnv(t);
    return E.trim().length == 0 ? e : E;
  }
};
const _ZhiUtil = class {
  /**
   * 获取 zhi-sdk 实例
   */
  static zhiSdk() {
    if (!_ZhiUtil.zhiSdkObj) {
      const env = new o({ "VITE_LOG_LEVEL": "INFO", "VITE_DEBUG_MODE": "false", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false });
      _ZhiUtil.zhiSdkObj = new Ee(env);
    }
    return _ZhiUtil.zhiSdkObj;
  }
};
let ZhiUtil = _ZhiUtil;
__publicField(ZhiUtil, "zhiSdkObj");
const main = "";
class ZhiCodeBlockPlugin extends siyuan.Plugin {
  constructor() {
    super();
    __publicField(this, "logger");
    const zhiSdk = ZhiUtil.zhiSdk();
    this.logger = zhiSdk.getLogger();
  }
  onload() {
    this.logger.info("ZhiCodeBlockPlugin loaded");
  }
  onunload() {
    this.logger.info("ZhiCodeBlockPlugin unloaded");
  }
}
module.exports = ZhiCodeBlockPlugin;
