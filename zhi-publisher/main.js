"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const siyuan = require("siyuan");
var ee = Object.defineProperty;
var te = (r, e, t) => e in r ? ee(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
var M = (r, e, t) => (te(r, typeof e != "symbol" ? e + "" : e, t), t);
var ne = Object.defineProperty, oe = (r, e, t) => e in r ? ne(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, a = (r, e, t) => (oe(r, typeof e != "symbol" ? e + "" : e, t), t), ie = Object.defineProperty, se = (r, e, t) => e in r ? ie(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, U = (r, e, t) => (se(r, typeof e != "symbol" ? e + "" : e, t), t), X = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, x = {}, ae = {
  get exports() {
    return x;
  },
  set exports(r) {
    x = r;
  }
};
(function(r) {
  (function(e, t) {
    r.exports ? r.exports = t() : e.log = t();
  })(X, function() {
    var e = function() {
    }, t = "undefined", n = typeof window !== t && typeof window.navigator !== t && /Trident\/|MSIE /.test(window.navigator.userAgent), o = ["trace", "debug", "info", "warn", "error"];
    function i(l, m) {
      var L = l[m];
      if (typeof L.bind == "function")
        return L.bind(l);
      try {
        return Function.prototype.bind.call(L, l);
      } catch {
        return function() {
          return Function.prototype.apply.apply(L, [l, arguments]);
        };
      }
    }
    function s() {
      console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
    }
    function g(l) {
      return l === "debug" && (l = "log"), typeof console === t ? false : l === "trace" && n ? s : console[l] !== void 0 ? i(console, l) : console.log !== void 0 ? i(console, "log") : e;
    }
    function d(l, m) {
      for (var L = 0; L < o.length; L++) {
        var u = o[L];
        this[u] = L < l ? e : this.methodFactory(u, l, m);
      }
      this.log = this.debug;
    }
    function y(l, m, L) {
      return function() {
        typeof console !== t && (d.call(this, m, L), this[l].apply(this, arguments));
      };
    }
    function h(l, m, L) {
      return g(l) || y.apply(this, arguments);
    }
    function p(l, m, L) {
      var u = this, k;
      m = m ?? "WARN";
      var f = "loglevel";
      typeof l == "string" ? f += ":" + l : typeof l == "symbol" && (f = void 0);
      function C(c) {
        var E = (o[c] || "silent").toUpperCase();
        if (!(typeof window === t || !f)) {
          try {
            window.localStorage[f] = E;
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(f) + "=" + E + ";";
          } catch {
          }
        }
      }
      function A() {
        var c;
        if (!(typeof window === t || !f)) {
          try {
            c = window.localStorage[f];
          } catch {
          }
          if (typeof c === t)
            try {
              var E = window.document.cookie, T = E.indexOf(encodeURIComponent(f) + "=");
              T !== -1 && (c = /^([^;]+)/.exec(E.slice(T))[1]);
            } catch {
            }
          return u.levels[c] === void 0 && (c = void 0), c;
        }
      }
      function D() {
        if (!(typeof window === t || !f)) {
          try {
            window.localStorage.removeItem(f);
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(f) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch {
          }
        }
      }
      u.name = l, u.levels = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        SILENT: 5
      }, u.methodFactory = L || h, u.getLevel = function() {
        return k;
      }, u.setLevel = function(c, E) {
        if (typeof c == "string" && u.levels[c.toUpperCase()] !== void 0 && (c = u.levels[c.toUpperCase()]), typeof c == "number" && c >= 0 && c <= u.levels.SILENT) {
          if (k = c, E !== false && C(c), d.call(u, c, l), typeof console === t && c < u.levels.SILENT)
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
    var w = new p(), v = {};
    w.getLogger = function(l) {
      if (typeof l != "symbol" && typeof l != "string" || l === "")
        throw new TypeError("You must supply a name when creating a logger.");
      var m = v[l];
      return m || (m = v[l] = new p(l, w.getLevel(), w.methodFactory)), m;
    };
    var _ = typeof window !== t ? window.log : void 0;
    return w.noConflict = function() {
      return typeof window !== t && window.log === w && (window.log = _), w;
    }, w.getLoggers = function() {
      return v;
    }, w.default = w, w;
  });
})(ae);
var N = {}, le = {
  get exports() {
    return N;
  },
  set exports(r) {
    N = r;
  }
};
(function(r) {
  (function(e, t) {
    r.exports ? r.exports = t() : e.prefix = t(e);
  })(X, function(e) {
    var t = function(h) {
      for (var p = 1, w = arguments.length, v; p < w; p++)
        for (v in arguments[p])
          Object.prototype.hasOwnProperty.call(arguments[p], v) && (h[v] = arguments[p][v]);
      return h;
    }, n = {
      template: "[%t] %l:",
      levelFormatter: function(h) {
        return h.toUpperCase();
      },
      nameFormatter: function(h) {
        return h || "root";
      },
      timestampFormatter: function(h) {
        return h.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
      },
      format: void 0
    }, o, i = {}, s = function(h) {
      if (!h || !h.getLogger)
        throw new TypeError("Argument is not a root logger");
      o = h;
    }, g = function(h, p) {
      if (!h || !h.setLevel)
        throw new TypeError("Argument is not a logger");
      var w = h.methodFactory, v = h.name || "", _ = i[v] || i[""] || n;
      function l(m, L, u) {
        var k = w(m, L, u), f = i[u] || i[""], C = f.template.indexOf("%t") !== -1, A = f.template.indexOf("%l") !== -1, D = f.template.indexOf("%n") !== -1;
        return function() {
          for (var S = "", c = arguments.length, E = Array(c), T = 0; T < c; T++)
            E[T] = arguments[T];
          if (v || !i[u]) {
            var W = f.timestampFormatter(new Date()), q = f.levelFormatter(m), B = f.nameFormatter(u);
            f.format ? S += f.format(q, B, W) : (S += f.template, C && (S = S.replace(/%t/, W)), A && (S = S.replace(/%l/, q)), D && (S = S.replace(/%n/, B))), E.length && typeof E[0] == "string" ? E[0] = S + " " + E[0] : E.unshift(S);
          }
          k.apply(void 0, E);
        };
      }
      return i[v] || (h.methodFactory = l), p = p || {}, p.template && (p.format = void 0), i[v] = t({}, _, p), h.setLevel(h.getLevel()), o || h.warn(
        "It is necessary to call the function reg() of loglevel-plugin-prefix before calling apply. From the next release, it will throw an error. See more: https://github.com/kutuluk/loglevel-plugin-prefix/blob/master/README.md"
      ), h;
    }, d = {
      reg: s,
      apply: g
    }, y;
    return e && (y = e.prefix, d.noConflict = function() {
      return e.prefix === d && (e.prefix = y), d;
    }), d;
  });
})(le);
class F {
}
U(F, "LOG_LEVEL_KEY", "VITE_LOG_LEVEL"), U(F, "LOG_PREFIX_KEY", "VITE_LOG_PREFIX");
var O = /* @__PURE__ */ ((r) => (r.LOG_LEVEL_DEBUG = "DEBUG", r.LOG_LEVEL_INFO = "INFO", r.LOG_LEVEL_WARN = "WARN", r.LOG_LEVEL_ERROR = "ERROR", r))(O || {});
function ce() {
  const r = Error.prepareStackTrace;
  Error.prepareStackTrace = (t, n) => n;
  const e = new Error().stack.slice(1);
  return Error.prepareStackTrace = r, e;
}
class R {
  /**
   * 解析日志级别为枚举
   *
   * @param enumObj 枚举对象
   * @param value 配置的值
   */
  static stringToEnumValue(e, t) {
    return e[Object.keys(e).filter((n) => e[n].toString() === t)[0]];
  }
  /**
   * 获取配置的日志级别
   */
  static getEnvLevel(e) {
    if (!e)
      return;
    const t = e.getEnvOrDefault(F.LOG_LEVEL_KEY, O.LOG_LEVEL_INFO), n = R.stringToEnumValue(O, t.toUpperCase());
    return n || console.warn(
      "[zhi-log] LOG_LEVEL is invalid in you .env file.Must be either debug, info, warn or error, fallback to default info level"
    ), n;
  }
  /**
   * 获取默认日志
   */
  static getEnvLogger(e) {
    if (e)
      return e.getEnv(F.LOG_PREFIX_KEY);
  }
}
class ue {
  constructor(e, t, n) {
    U(this, "consoleLogger", "console"), U(this, "stackSize", 1), U(this, "getLogger", (s) => {
      let g;
      if (s)
        g = s;
      else {
        const d = this.getCallStack(), y = [], h = [];
        for (let p = 0; p < d.length; p++) {
          const w = d[p], v = w.getFileName() ?? "none";
          if (p > this.stackSize - 1)
            break;
          const _ = v + "-" + w.getLineNumber() + ":" + w.getColumnNumber();
          y.push(_);
        }
        h.length > 0 && (g = y.join(" -> "));
      }
      return (!g || g.trim().length === 0) && (g = this.consoleLogger), x.getLogger(g);
    }), this.stackSize = 1;
    let o;
    e ? o = e : o = R.getEnvLevel(n), o = o ?? O.LOG_LEVEL_INFO, x.setLevel(o);
    const i = {
      gray: (s) => s.toString(),
      green: (s) => s.toString(),
      yellow: (s) => s.toString(),
      red: (s) => s.toString()
    };
    N.reg(x), N.apply(x, {
      format(s, g, d) {
        const y = ["[" + (t ?? R.getEnvLogger(n) ?? "zhi") + "]"];
        switch (y.push(i.gray("[") + i.green(d).toString() + i.gray("]")), s) {
          case O.LOG_LEVEL_DEBUG:
            y.push(i.gray(s.toUpperCase().toString()));
            break;
          case O.LOG_LEVEL_INFO:
            y.push(i.green(s.toUpperCase().toString()));
            break;
          case O.LOG_LEVEL_WARN:
            y.push(i.yellow(s.toUpperCase().toString()));
            break;
          case O.LOG_LEVEL_ERROR:
            y.push(i.red(s.toUpperCase().toString()));
            break;
        }
        return y.push(i.green(g).toString()), y.push(i.gray(":")), y.join(" ");
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
      e = ce();
    } catch {
      e = [];
    }
    return e;
  }
}
class he {
  /**
   * 默认日志级别
   *
   * @param level - 可选，未设置默认INFO
   * @param sign - 可选前缀，默认zhi
   * @param env - 可选环境变量实例
   */
  constructor(e, t, n) {
    U(this, "logger"), this.logger = new ue(e, t, n);
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
}
class Z extends he {
  constructor(e, t, n) {
    super(e, t, n);
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
}
class V {
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
  static customLogFactory(e, t, n) {
    return new Z(e, t, n);
  }
  /**
   * 自定义日志工厂，自定义前缀
   */
  static customSignLogFactory(e, t) {
    return new Z(void 0, e, t);
  }
}
class J {
}
a(J, "LOG_STACK_SIZE", 1);
const Q = "1.0.12";
class ge {
  constructor() {
    a(this, "VERSION"), this.VERSION = Q;
  }
}
class pe {
  constructor() {
    a(this, "VERSION"), this.VERSION = Q;
  }
}
const I = class {
  constructor() {
    a(this, "getQueryString", (r) => {
      if (!I.isInBrowser)
        return "";
      const e = window.location.search.substring(1).split("&");
      for (let t = 0; t < e.length; t++) {
        const n = e[t].split("=");
        if (n[0] === r)
          return n[1];
      }
      return "";
    });
  }
  /**
   * 检测是否运行在Chrome插件中
   */
  static isInChromeExtension() {
    return I.isInBrowser ? window.location.href.indexOf("chrome-extension://") > -1 : false;
  }
};
let b = I;
a(b, "isInBrowser", typeof window < "u"), a(
  b,
  "isElectron",
  () => !I.isInBrowser || !window.navigator || !window.navigator.userAgent ? false : /Electron/.test(window.navigator.userAgent)
), a(b, "replaceUrlParam", (r, e, t) => {
  t == null && (t = "");
  const n = new RegExp("\\b(" + e + "=).*?(&|#|$)");
  return r.search(n) >= 0 ? r.replace(n, "$1" + t + "$2") : (r = r.replace(/[?#]$/, ""), r + (r.indexOf("?") > 0 ? "&" : "?") + e + "=" + t);
}), a(
  b,
  "setUrlParameter",
  (r, e, t) => I.isInBrowser ? r.includes(e) ? I.replaceUrlParam(r, e, t) : (r += (r.match(/[?]/g) != null ? "&" : "?") + e + "=" + t, r) : ""
), a(b, "reloadTabPage", (r) => {
  setTimeout(function() {
    if (I.isInBrowser) {
      const e = window.location.href;
      window.location.href = I.setUrlParameter(e, "tab", r);
    }
  }, 200);
}), a(b, "reloadPage", () => {
  setTimeout(function() {
    I.isInBrowser && window.location.reload();
  }, 200);
}), a(b, "reloadPageWithMessageCallback", (r, e) => {
  e && e(), setTimeout(function() {
    I.isInBrowser && window.location.reload();
  }, 200);
});
class G {
  constructor() {
    a(
      this,
      "isInSiyuanWidget",
      () => typeof window > "u" ? false : window.frameElement != null && window.frameElement.parentElement != null && window.frameElement.parentElement.parentElement != null && window.frameElement.parentElement.parentElement.getAttribute("data-node-id") !== ""
    ), a(this, "isInSiyuanNewWin", () => typeof window > "u" ? false : typeof window.terwer < "u"), a(this, "isInSiyuanOrSiyuanNewWin", () => b.isElectron);
  }
  /**
   * 思源笔记 window 对象
   */
  siyuanWindow() {
    let e;
    return this.isInSiyuanWidget() ? e = parent.window : this.isInSiyuanNewWin() || typeof window < "u" ? e = window : e = void 0, e;
  }
}
class de {
  constructor() {
    a(this, "serverApi"), a(this, "clientApi"), a(this, "siyuanUtil"), this.serverApi = new ge(), this.clientApi = new pe(), this.siyuanUtil = new G();
  }
}
class fe {
  constructor() {
    a(this, "VERSION"), this.VERSION = "1.0.0";
  }
}
class we {
  /**
   * 格式化字符串
   *
   * @param str - 字符串，可用占位符，例如：test\{0\}str
   * @param args - 按占位符顺序排列的参数
   * @author terwer
   * @since 0.0.1
   */
  f(e, ...t) {
    let n = e;
    for (let o = 0; o < t.length; o++) {
      const i = t[o];
      typeof i == "string" ? n = n.replace(`{${o}}`, i) : n = n.replace(`{${o}}`, i.toString());
    }
    return n;
  }
}
class ye {
  constructor() {
    a(this, "TIME_SPLIT", " "), a(this, "formatIsoToZhDate", (e, t, n) => {
      if (!e)
        return "";
      let o = e;
      const i = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(.\d{3})Z$/gm, s = o.match(i);
      if (s == null)
        return e;
      for (let g = 0; g < s.length; g++) {
        const d = s[g];
        let y = d;
        t && (y = this.addHoursToDate(new Date(d), 8).toISOString());
        const h = y.split("T"), p = h[0], w = h[1].split(".")[0];
        let v = p + this.TIME_SPLIT + w;
        n && (v = p), o = o.replace(d, v);
      }
      return o;
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
}
const z = (r, e) => {
  const t = $(r), n = $(e), o = t.pop(), i = n.pop(), s = H(t, n);
  return s !== 0 ? s : o && i ? H(o.split("."), i.split(".")) : o || i ? o ? -1 : 1 : 0;
}, me = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i, $ = (r) => {
  if (typeof r != "string")
    throw new TypeError("Invalid argument expected string");
  const e = r.match(me);
  if (!e)
    throw new Error(`Invalid argument not valid semver ('${r}' received)`);
  return e.shift(), e;
}, K = (r) => r === "*" || r === "x" || r === "X", Y = (r) => {
  const e = parseInt(r, 10);
  return isNaN(e) ? r : e;
}, ve = (r, e) => typeof r != typeof e ? [String(r), String(e)] : [r, e], Le = (r, e) => {
  if (K(r) || K(e))
    return 0;
  const [t, n] = ve(Y(r), Y(e));
  return t > n ? 1 : t < n ? -1 : 0;
}, H = (r, e) => {
  for (let t = 0; t < Math.max(r.length, e.length); t++) {
    const n = Le(r[t] || "0", e[t] || "0");
    if (n !== 0)
      return n;
  }
  return 0;
};
class Ee {
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is higher than v2
   */
  greater(e, t) {
    return z(e, t) > 0;
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
    return z(e, t) === 0;
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
    return z(e, t) < 0;
  }
}
class Se {
  /**
   * 获取当前设备
   */
  static getDevice() {
    const e = new G();
    return e.isInSiyuanWidget() ? "Siyuan_Widget" : e.isInSiyuanOrSiyuanNewWin() ? "Siyuan_NewWin" : b.isInChromeExtension() ? "Chrome_Extension" : "Chrome_Browser";
  }
}
class be {
  constructor() {
    a(this, "siyuanUtil"), a(this, "requireLib", (e) => {
      const t = this.siyuanUtil.siyuanWindow();
      return t ? t.require(e) : require(e);
    }), a(this, "getCrossPlatformAppDataFolder", () => {
      var e, t, n, o, i, s;
      const g = this.requireLib("path");
      let d;
      return ((e = this.syProcess()) == null ? void 0 : e.platform) === "darwin" ? d = g.join((t = this.syProcess()) == null ? void 0 : t.env.HOME, "/Library/Application Support") : ((n = this.syProcess()) == null ? void 0 : n.platform) === "win32" ? d = (o = this.syProcess()) == null ? void 0 : o.env.APPDATA : ((i = this.syProcess()) == null ? void 0 : i.platform) === "linux" && (d = (s = this.syProcess()) == null ? void 0 : s.env.HOME), d;
    }), this.siyuanUtil = new G();
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
    const n = this, o = this.requireLib("fs"), i = this.requireLib("path");
    o.existsSync(t) || o.mkdirSync(t), o.lstatSync(e).isDirectory() && o.readdirSync(e).forEach(function(s) {
      const g = i.join(e, s);
      o.lstatSync(g).isDirectory() ? n.copyFolderSync(g, i.join(t, s)) : o.copyFileSync(g, i.join(t, s));
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
    const t = this.requireLib("path"), n = this.dirname(e);
    return t.resolve(t.dirname(n), e);
  }
  // -----------------------------------------------------------------------------------------------
  /**
   * 思源笔记 process 对象
   */
  syProcess() {
    return b.isInBrowser ? window.process : process;
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
}
class Ie {
  constructor() {
    a(this, "strUtil"), a(this, "dateUtil"), a(this, "electronUtil"), a(this, "browserUtil"), a(this, "versionUtil"), a(this, "deviceUtil"), this.strUtil = new we(), this.dateUtil = new ye(), this.electronUtil = new be(), this.browserUtil = b, this.versionUtil = new Ee(), this.deviceUtil = Se;
  }
}
class Oe {
  /**
   * 构造 zhi-sdk 对象
   * @param env - 可选，环境变量对象
   */
  constructor(e) {
    a(this, "env"), a(this, "logger"), a(this, "siyuanApi"), a(this, "blogApi"), a(this, "common"), this.env = e, this.logger = V.defaultLogger(this.env, J.LOG_STACK_SIZE), this.siyuanApi = new de(), this.blogApi = new fe(), this.common = new Ie();
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
}
const P = class {
  /**
   * 获取 zhi-sdk 实例
   *
   * @param env - 可选，环境变量对象
   */
  static zhiSdk(e) {
    if (!P.zhiSdkObj) {
      P.zhiSdkObj = new Oe(e);
      const t = P.zhiSdkObj.getLogger(), n = P.zhiSdkObj.common;
      t.info(n.strUtil.f("ZhiSdk inited, components are available now,like logger, env and so on."));
    }
    return P.zhiSdkObj;
  }
};
let j = P;
M(j, "zhiSdkObj");
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_lib = __commonJS({
  "../../node_modules/.pnpm/zhi-env@1.8.2/node_modules/zhi-env/lib/index.js"(exports2) {
    var i = Object.defineProperty;
    var v = (n, e, t) => e in n ? i(n, e, { enumerable: true, configurable: true, writable: true, value: t }) : n[e] = t;
    var s = (n, e, t) => (v(n, typeof e != "symbol" ? e + "" : e, t), t);
    Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
    var r = class {
    };
    s(r, "NODE_ENV_KEY", "NODE_ENV"), s(r, "VITE_DEBUG_MODE_KEY", "VITE_DEBUG_MODE");
    var o = class {
      constructor(e) {
        s(this, "envMeta");
        this.envMeta = e;
      }
      isNodeDev() {
        return this.getEnv(r.NODE_ENV_KEY) === "development";
      }
      isDev() {
        return this.isNodeDev() || this.getBooleanEnv(r.VITE_DEBUG_MODE_KEY);
      }
      getEnv(e) {
        let t;
        try {
          this.envMeta[e] && (t = this.envMeta[e]);
        } catch (E) {
          console.error(E);
        }
        return t;
      }
      getStringEnv(e) {
        return this.getEnv(e) ?? "";
      }
      getBooleanEnv(e) {
        let t = false;
        return this.getEnv(e) && (t = this.getStringEnv(e).toLowerCase() === "true"), t;
      }
      getEnvOrDefault(e, t) {
        const E = this.getStringEnv(e);
        return E.trim().length == 0 ? t : E;
      }
    };
    exports2.EnvConstants = r;
    exports2.default = o;
  }
});
const __vite__cjsImport3_zhiEnv = require_lib();
const Env$1 = __vite__cjsImport3_zhiEnv.__esModule ? __vite__cjsImport3_zhiEnv.default : __vite__cjsImport3_zhiEnv;
class PublisherHook {
  constructor() {
    __publicField(this, "REPO_HASH", "1c968d1044aa4d0cfe9be1ad122c2ab5bc1e8e5e");
    __publicField(this, "logger");
    __publicField(this, "common");
    __publicField(this, "siyuanUtil");
    // 初始化方法统一定义
    __publicField(this, "initMethods", {
      /**
       * 初始化 sy-post-publisher 配置文件存储，适用于【iframe挂件模式】、【新窗口模式】以及【js片段模式】
       */
      initLocalStorageMethod: (entryName) => {
        const syWin = this.siyuanUtil.siyuanWindow();
        const dataDir = this.common.electronUtil.siyuanDataPath();
        if (syWin.JsonLocalStorage) {
          this.logger.warn("JsonLocalStorage loaded, ignore.", entryName);
          return;
        }
        const LocalStorage = this.common.electronUtil.requireLib(
          `${dataDir}/widgets/sy-post-publisher/lib/json-localstorage/json-localstorage.js`
        );
        LocalStorage.init("../../../../storage/syp/");
      },
      /**
       * 初始化插槽，仅【iframe挂件模式】、【自定义js片段模式】可用
       */
      initSlotMethod: () => {
        const dataDir = this.common.electronUtil.siyuanDataPath();
        const initSlot = this.common.electronUtil.requireLib(`${dataDir}/widgets/sy-post-publisher/lib/siyuan/silot.js`);
        initSlot();
      },
      /**
       * 初始化主题适配
       * @param entryName 入口名称
       */
      initThemeAdaptor: (entryName) => {
        const syWin = this.siyuanUtil.siyuanWindow();
        const dataDir = this.common.electronUtil.siyuanDataPath();
        if (syWin.customstyle) {
          this.logger.warn("customstyle loaded, ignore.", entryName);
          return;
        }
        const initTheme = this.common.electronUtil.requireLib(`${dataDir}/widgets/sy-post-publisher/lib/siyuan/theme.js`);
        setTimeout(initTheme, 3e3);
      },
      /**
       * 初始化初始化发布辅助功能
       * @param entryName 入口名称
       */
      initPublishHelper: (entryName) => {
        const syWin = this.siyuanUtil.siyuanWindow();
        const dataDir = this.common.electronUtil.siyuanDataPath();
        if (syWin.syp) {
          console.warn("syp已挂载，忽略", entryName);
          return;
        }
        const initPublishHelper = this.common.electronUtil.requireLib(
          `${dataDir}/widgets/sy-post-publisher/lib/siyuan/publish-helper.js`
        );
        initPublishHelper();
      },
      /**
       * 初始化 PicGO 配置
       * @param entryName 入口名称
       */
      initPicgoExtension: (entryName) => {
        const syWin = this.siyuanUtil.siyuanWindow();
        const dataDir = this.common.electronUtil.siyuanDataPath();
        if (syWin.SyPicgo) {
          console.warn("SyPicgo loaded, ignore.", entryName);
          return;
        }
        const picgoExtension = this.common.electronUtil.requireLib(
          `${dataDir}/widgets/sy-post-publisher/lib/picgo/syPicgo.js`
        ).default;
        const appDataFolder = this.common.electronUtil.getCrossPlatformAppDataFolder();
        const picgo_cfg_067 = `${dataDir}/widgets/sy-post-publisher/lib/picgo/picgo.cfg.json`;
        const picgo_cfg_folder_070 = picgoExtension.joinPath(appDataFolder, "sy-picgo");
        const picgo_cfg_070_file = "picgo.cfg.json";
        const picgo_cfg_070 = picgoExtension.joinPath(picgo_cfg_folder_070, picgo_cfg_070_file);
        picgoExtension.upgradeCfg(picgo_cfg_067, picgo_cfg_folder_070, picgo_cfg_070_file);
        this.logger.warn("PicGO配置文件初始化为=>", picgo_cfg_070);
        const syPicgo = picgoExtension.initPicgo(picgo_cfg_070);
        syWin.SyPicgo = syPicgo;
        this.logger.debug("syPicgo=>", syPicgo);
      },
      /**
       * 初始化 SyCmd 配置，适用于【iframe挂件模式】、【新窗口模式】以及【js片段模式】
       * @param entryName 入口名称
       */
      initCmder: (entryName) => {
        const syWin = this.siyuanUtil.siyuanWindow();
        const dataDir = this.common.electronUtil.siyuanDataPath();
        if (syWin.SyCmd) {
          this.logger.warn("SyCmd已挂载，忽略", entryName);
          return;
        }
        const syCmd = this.common.electronUtil.requireLib(`${dataDir}/widgets/sy-post-publisher/lib/cmd/syCmd.js`);
        syWin.SyCmd = syCmd;
        this.logger.debug("syCmd=>", syCmd);
      }
    });
    __publicField(this, "doInit", () => {
      this.initMethods.initLocalStorageMethod("PublisherHook");
      this.initMethods.initSlotMethod();
      this.initMethods.initThemeAdaptor("PublisherHook");
      this.initMethods.initPublishHelper("PublisherHook");
      this.initMethods.initPicgoExtension("PublisherHook");
      this.initMethods.initCmder("PublisherHook");
    });
    const env = new Env$1({ "VITE_LOG_LEVEL": "DEBUG", "VITE_DEBUG_MODE": "true", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false });
    const zhiSdk = j.zhiSdk(env);
    this.logger = zhiSdk.getLogger();
    this.common = zhiSdk.common;
    this.siyuanUtil = zhiSdk.siyuanApi.siyuanUtil;
    this.REPO_HASH = "1c968d1044aa4d0cfe9be1ad122c2ab5bc1e8e5e";
  }
  async doDownload() {
    this.logger.warn("Downloading sy-post-publisher from bazaar...");
    const url = "/api/bazaar/installBazaarWidget";
    const data = {
      repoURL: "https://github.com/terwer/sy-post-publisher",
      packageName: "sy-post-publisher",
      repoHash: this.REPO_HASH,
      mode: 0
    };
    const fetchOps = {
      body: JSON.stringify(data),
      method: "POST"
    };
    const res = await fetch(url, fetchOps);
    const resJson = await res.json();
    if (resJson.code == 0) {
      this.logger.info("Download sy-post-publisher from bazaar success");
    } else {
      throw new Error("Download sy-post-publisher error, this plugin will not work!");
    }
  }
  async init() {
    this.logger.info("Initiating sy-post-publisher ...");
    try {
      const dataDir = this.common.electronUtil.siyuanDataPath();
      const sypFolder = `${dataDir}/widgets/sy-post-publisher`;
      const fs = this.common.electronUtil.requireLib("fs");
      this.logger.info("Widget sy-post-publisher folder=>", sypFolder);
      if (!fs.existsSync(sypFolder)) {
        this.logger.warn("Widget sy-post-publisher not exist, downloading...");
        await this.doDownload();
        this.logger.warn("Widget sy-post-publisher downloaded");
      }
      this.doInit();
    } catch (e) {
      this.logger.warn("Failed to init sy-post-publisher，it may not work in some case.Error=>", e);
    }
  }
}
const Env = __vite__cjsImport3_zhiEnv.__esModule ? __vite__cjsImport3_zhiEnv.default : __vite__cjsImport3_zhiEnv;
class ZhiPublisherPlugin extends siyuan.Plugin {
  constructor() {
    super();
    __publicField(this, "logger");
    __publicField(this, "publisherHook");
    const env = new Env({ "VITE_LOG_LEVEL": "DEBUG", "VITE_DEBUG_MODE": "true", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false });
    const zhiSdk = j.zhiSdk(env);
    this.logger = zhiSdk.getLogger();
    this.publisherHook = new PublisherHook();
  }
  async onload() {
    await this.publisherHook.init();
    this.logger.info("ZhiPublisherPlugin loaded");
  }
  onunload() {
    this.logger.info("ZhiPublisherPlugin unloaded");
  }
}
module.exports = ZhiPublisherPlugin;
