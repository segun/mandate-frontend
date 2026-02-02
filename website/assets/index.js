var kp = e => {
    throw TypeError(e)
};
var Tc = (e, t, n) => t.has(e) || kp("Cannot " + n);
var R = (e, t, n) => (Tc(e, t, "read from private field"), n ? n.call(e) : t.get(e)),
    se = (e, t, n) => t.has(e) ? kp("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n),
    Y = (e, t, n, r) => (Tc(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n),
    Ge = (e, t, n) => (Tc(e, t, "access private method"), n);
var Jo = (e, t, n, r) => ({
    set _(i) {
        Y(e, t, i, n)
    },
    get _() {
        return R(e, t, r)
    }
});
function QS(e, t) {
    for (var n = 0; n < t.length; n++) {
        const r = t[n];
        if (typeof r != "string" && !Array.isArray(r)) {
            for (const i in r)
                if (i !== "default" && !(i in e)) {
                    const s = Object.getOwnPropertyDescriptor(r, i);
                    s && Object.defineProperty(e, i, s.get ? s : {
                        enumerable: !0,
                        get: () => r[i]
                    })
                }
        }
    }
    return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
    }))
}
(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        r(i);
    new MutationObserver(i => {
        for (const s of i)
            if (s.type === "childList")
                for (const o of s.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && r(o)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(i) {
        const s = {};
        return i.integrity && (s.integrity = i.integrity), i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? s.credentials = "include" : i.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s
    }
    function r(i) {
        if (i.ep)
            return;
        i.ep = !0;
        const s = n(i);
        fetch(i.href, s)
    }
})();
function av(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var lv = {
        exports: {}
    },
    _l = {},
    cv = {
        exports: {}
    },
    J = {}; /**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */







var _o = Symbol.for("react.element"),
    YS = Symbol.for("react.portal"),
    XS = Symbol.for("react.fragment"),
    ZS = Symbol.for("react.strict_mode"),
    JS = Symbol.for("react.profiler"),
    eC = Symbol.for("react.provider"),
    tC = Symbol.for("react.context"),
    nC = Symbol.for("react.forward_ref"),
    rC = Symbol.for("react.suspense"),
    iC = Symbol.for("react.memo"),
    sC = Symbol.for("react.lazy"),
    Rp = Symbol.iterator;
function oC(e) {
    return e === null || typeof e != "object" ? null : (e = Rp && e[Rp] || e["@@iterator"], typeof e == "function" ? e : null)
}
var uv = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    },
    dv = Object.assign,
    fv = {};
function hs(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = fv,
    this.updater = n || uv
}
hs.prototype.isReactComponent = {};
hs.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
};
hs.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
};
function hv() {}
hv.prototype = hs.prototype;
function Ef(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = fv,
    this.updater = n || uv
}
var Nf = Ef.prototype = new hv;
Nf.constructor = Ef;
dv(Nf, hs.prototype);
Nf.isPureReactComponent = !0;
var Ap = Array.isArray,
    pv = Object.prototype.hasOwnProperty,
    Tf = {
        current: null
    },
    mv = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
function gv(e, t, n) {
    var r,
        i = {},
        s = null,
        o = null;
    if (t != null)
        for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (s = "" + t.key), t)
            pv.call(t, r) && !mv.hasOwnProperty(r) && (i[r] = t[r]);
    var a = arguments.length - 2;
    if (a === 1)
        i.children = n;
    else if (1 < a) {
        for (var l = Array(a), u = 0; u < a; u++)
            l[u] = arguments[u + 2];
        i.children = l
    }
    if (e && e.defaultProps)
        for (r in a = e.defaultProps, a)
            i[r] === void 0 && (i[r] = a[r]);
    return {
        $$typeof: _o,
        type: e,
        key: s,
        ref: o,
        props: i,
        _owner: Tf.current
    }
}
function aC(e, t) {
    return {
        $$typeof: _o,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}
function Pf(e) {
    return typeof e == "object" && e !== null && e.$$typeof === _o
}
function lC(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var Mp = /\/+/g;
function Pc(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? lC("" + e.key) : t.toString(36)
}
function Aa(e, t, n, r, i) {
    var s = typeof e;
    (s === "undefined" || s === "boolean") && (e = null);
    var o = !1;
    if (e === null)
        o = !0;
    else
        switch (s) {
        case "string":
        case "number":
            o = !0;
            break;
        case "object":
            switch (e.$$typeof) {
            case _o:
            case YS:
                o = !0
            }
        }
    if (o)
        return o = e, i = i(o), e = r === "" ? "." + Pc(o, 0) : r, Ap(i) ? (n = "", e != null && (n = e.replace(Mp, "$&/") + "/"), Aa(i, t, n, "", function(u) {
            return u
        })) : i != null && (Pf(i) && (i = aC(i, n + (!i.key || o && o.key === i.key ? "" : ("" + i.key).replace(Mp, "$&/") + "/") + e)), t.push(i)), 1;
    if (o = 0, r = r === "" ? "." : r + ":", Ap(e))
        for (var a = 0; a < e.length; a++) {
            s = e[a];
            var l = r + Pc(s, a);
            o += Aa(s, t, n, l, i)
        }
    else if (l = oC(e), typeof l == "function")
        for (e = l.call(e), a = 0; !(s = e.next()).done;)
            s = s.value,
            l = r + Pc(s, a++),
            o += Aa(s, t, n, l, i);
    else if (s === "object")
        throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return o
}
function ea(e, t, n) {
    if (e == null)
        return e;
    var r = [],
        i = 0;
    return Aa(e, r, "", "", function(s) {
        return t.call(n, s, i++)
    }), r
}
function cC(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(),
        t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n)
        }),
        e._status === -1 && (e._status = 0, e._result = t)
    }
    if (e._status === 1)
        return e._result.default;
    throw e._result
}
var at = {
        current: null
    },
    Ma = {
        transition: null
    },
    uC = {
        ReactCurrentDispatcher: at,
        ReactCurrentBatchConfig: Ma,
        ReactCurrentOwner: Tf
    };
function yv() {
    throw Error("act(...) is not supported in production builds of React.")
}
J.Children = {
    map: ea,
    forEach: function(e, t, n) {
        ea(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return ea(e, function() {
            t++
        }), t
    },
    toArray: function(e) {
        return ea(e, function(t) {
                return t
            }) || []
    },
    only: function(e) {
        if (!Pf(e))
            throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
J.Component = hs;
J.Fragment = XS;
J.Profiler = JS;
J.PureComponent = Ef;
J.StrictMode = ZS;
J.Suspense = rC;
J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = uC;
J.act = yv;
J.cloneElement = function(e, t, n) {
    if (e == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = dv({}, e.props),
        i = e.key,
        s = e.ref,
        o = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (s = t.ref, o = Tf.current), t.key !== void 0 && (i = "" + t.key), e.type && e.type.defaultProps)
            var a = e.type.defaultProps;
        for (l in t)
            pv.call(t, l) && !mv.hasOwnProperty(l) && (r[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l])
    }
    var l = arguments.length - 2;
    if (l === 1)
        r.children = n;
    else if (1 < l) {
        a = Array(l);
        for (var u = 0; u < l; u++)
            a[u] = arguments[u + 2];
        r.children = a
    }
    return {
        $$typeof: _o,
        type: e.type,
        key: i,
        ref: s,
        props: r,
        _owner: o
    }
};
J.createContext = function(e) {
    return e = {
        $$typeof: tC,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    }, e.Provider = {
        $$typeof: eC,
        _context: e
    }, e.Consumer = e
};
J.createElement = gv;
J.createFactory = function(e) {
    var t = gv.bind(null, e);
    return t.type = e, t
};
J.createRef = function() {
    return {
        current: null
    }
};
J.forwardRef = function(e) {
    return {
        $$typeof: nC,
        render: e
    }
};
J.isValidElement = Pf;
J.lazy = function(e) {
    return {
        $$typeof: sC,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: cC
    }
};
J.memo = function(e, t) {
    return {
        $$typeof: iC,
        type: e,
        compare: t === void 0 ? null : t
    }
};
J.startTransition = function(e) {
    var t = Ma.transition;
    Ma.transition = {};
    try {
        e()
    } finally {
        Ma.transition = t
    }
};
J.unstable_act = yv;
J.useCallback = function(e, t) {
    return at.current.useCallback(e, t)
};
J.useContext = function(e) {
    return at.current.useContext(e)
};
J.useDebugValue = function() {};
J.useDeferredValue = function(e) {
    return at.current.useDeferredValue(e)
};
J.useEffect = function(e, t) {
    return at.current.useEffect(e, t)
};
J.useId = function() {
    return at.current.useId()
};
J.useImperativeHandle = function(e, t, n) {
    return at.current.useImperativeHandle(e, t, n)
};
J.useInsertionEffect = function(e, t) {
    return at.current.useInsertionEffect(e, t)
};
J.useLayoutEffect = function(e, t) {
    return at.current.useLayoutEffect(e, t)
};
J.useMemo = function(e, t) {
    return at.current.useMemo(e, t)
};
J.useReducer = function(e, t, n) {
    return at.current.useReducer(e, t, n)
};
J.useRef = function(e) {
    return at.current.useRef(e)
};
J.useState = function(e) {
    return at.current.useState(e)
};
J.useSyncExternalStore = function(e, t, n) {
    return at.current.useSyncExternalStore(e, t, n)
};
J.useTransition = function() {
    return at.current.useTransition()
};
J.version = "18.3.1";
cv.exports = J;
var y = cv.exports;
const I = av(y),
    jf = QS({
        __proto__: null,
        default: I
    }, [y]); /**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */







var dC = y,
    fC = Symbol.for("react.element"),
    hC = Symbol.for("react.fragment"),
    pC = Object.prototype.hasOwnProperty,
    mC = dC.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    gC = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
function vv(e, t, n) {
    var r,
        i = {},
        s = null,
        o = null;
    n !== void 0 && (s = "" + n),
    t.key !== void 0 && (s = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
    for (r in t)
        pC.call(t, r) && !gC.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps, t)
            i[r] === void 0 && (i[r] = t[r]);
    return {
        $$typeof: fC,
        type: e,
        key: s,
        ref: o,
        props: i,
        _owner: mC.current
    }
}
_l.Fragment = hC;
_l.jsx = vv;
_l.jsxs = vv;
lv.exports = _l;
var c = lv.exports,
    xv = {
        exports: {}
    },
    bt = {},
    wv = {
        exports: {}
    },
    bv = {}; /**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */







(function(e) {
    function t(P, j) {
        var L = P.length;
        P.push(j);
        e:
        for (; 0 < L;) {
            var G = L - 1 >>> 1,
                W = P[G];
            if (0 < i(W, j))
                P[G] = j,
                P[L] = W,
                L = G;
            else
                break e
        }
    }
    function n(P) {
        return P.length === 0 ? null : P[0]
    }
    function r(P) {
        if (P.length === 0)
            return null;
        var j = P[0],
            L = P.pop();
        if (L !== j) {
            P[0] = L;
            e:
            for (var G = 0, W = P.length, X = W >>> 1; G < X;) {
                var q = 2 * (G + 1) - 1,
                    pe = P[q],
                    Te = q + 1,
                    _ = P[Te];
                if (0 > i(pe, L))
                    Te < W && 0 > i(_, pe) ? (P[G] = _, P[Te] = L, G = Te) : (P[G] = pe, P[q] = L, G = q);
                else if (Te < W && 0 > i(_, L))
                    P[G] = _,
                    P[Te] = L,
                    G = Te;
                else
                    break e
            }
        }
        return j
    }
    function i(P, j) {
        var L = P.sortIndex - j.sortIndex;
        return L !== 0 ? L : P.id - j.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var s = performance;
        e.unstable_now = function() {
            return s.now()
        }
    } else {
        var o = Date,
            a = o.now();
        e.unstable_now = function() {
            return o.now() - a
        }
    }
    var l = [],
        u = [],
        d = 1,
        f = null,
        h = 3,
        p = !1,
        b = !1,
        m = !1,
        w = typeof setTimeout == "function" ? setTimeout : null,
        v = typeof clearTimeout == "function" ? clearTimeout : null,
        g = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function x(P) {
        for (var j = n(u); j !== null;) {
            if (j.callback === null)
                r(u);
            else if (j.startTime <= P)
                r(u),
                j.sortIndex = j.expirationTime,
                t(l, j);
            else
                break;
            j = n(u)
        }
    }
    function S(P) {
        if (m = !1, x(P), !b)
            if (n(l) !== null)
                b = !0,
                U(C);
            else {
                var j = n(u);
                j !== null && V(S, j.startTime - P)
            }
    }
    function C(P, j) {
        b = !1,
        m && (m = !1, v(T), T = -1),
        p = !0;
        var L = h;
        try {
            for (x(j), f = n(l); f !== null && (!(f.expirationTime > j) || P && !z());) {
                var G = f.callback;
                if (typeof G == "function") {
                    f.callback = null,
                    h = f.priorityLevel;
                    var W = G(f.expirationTime <= j);
                    j = e.unstable_now(),
                    typeof W == "function" ? f.callback = W : f === n(l) && r(l),
                    x(j)
                } else
                    r(l);
                f = n(l)
            }
            if (f !== null)
                var X = !0;
            else {
                var q = n(u);
                q !== null && V(S, q.startTime - j),
                X = !1
            }
            return X
        } finally {
            f = null,
            h = L,
            p = !1
        }
    }
    var E = !1,
        N = null,
        T = -1,
        k = 5,
        A = -1;
    function z() {
        return !(e.unstable_now() - A < k)
    }
    function D() {
        if (N !== null) {
            var P = e.unstable_now();
            A = P;
            var j = !0;
            try {
                j = N(!0, P)
            } finally {
                j ? H() : (E = !1, N = null)
            }
        } else
            E = !1
    }
    var H;
    if (typeof g == "function")
        H = function() {
            g(D)
        };
    else if (typeof MessageChannel < "u") {
        var O = new MessageChannel,
            K = O.port2;
        O.port1.onmessage = D,
        H = function() {
            K.postMessage(null)
        }
    } else
        H = function() {
            w(D, 0)
        };
    function U(P) {
        N = P,
        E || (E = !0, H())
    }
    function V(P, j) {
        T = w(function() {
            P(e.unstable_now())
        }, j)
    }
    e.unstable_IdlePriority = 5,
    e.unstable_ImmediatePriority = 1,
    e.unstable_LowPriority = 4,
    e.unstable_NormalPriority = 3,
    e.unstable_Profiling = null,
    e.unstable_UserBlockingPriority = 2,
    e.unstable_cancelCallback = function(P) {
        P.callback = null
    },
    e.unstable_continueExecution = function() {
        b || p || (b = !0, U(C))
    },
    e.unstable_forceFrameRate = function(P) {
        0 > P || 125 < P ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : k = 0 < P ? Math.floor(1e3 / P) : 5
    },
    e.unstable_getCurrentPriorityLevel = function() {
        return h
    },
    e.unstable_getFirstCallbackNode = function() {
        return n(l)
    },
    e.unstable_next = function(P) {
        switch (h) {
        case 1:
        case 2:
        case 3:
            var j = 3;
            break;
        default:
            j = h
        }
        var L = h;
        h = j;
        try {
            return P()
        } finally {
            h = L
        }
    },
    e.unstable_pauseExecution = function() {},
    e.unstable_requestPaint = function() {},
    e.unstable_runWithPriority = function(P, j) {
        switch (P) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            P = 3
        }
        var L = h;
        h = P;
        try {
            return j()
        } finally {
            h = L
        }
    },
    e.unstable_scheduleCallback = function(P, j, L) {
        var G = e.unstable_now();
        switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? G + L : G) : L = G, P) {
        case 1:
            var W = -1;
            break;
        case 2:
            W = 250;
            break;
        case 5:
            W = 1073741823;
            break;
        case 4:
            W = 1e4;
            break;
        default:
            W = 5e3
        }
        return W = L + W, P = {
            id: d++,
            callback: j,
            priorityLevel: P,
            startTime: L,
            expirationTime: W,
            sortIndex: -1
        }, L > G ? (P.sortIndex = L, t(u, P), n(l) === null && P === n(u) && (m ? (v(T), T = -1) : m = !0, V(S, L - G))) : (P.sortIndex = W, t(l, P), b || p || (b = !0, U(C))), P
    },
    e.unstable_shouldYield = z,
    e.unstable_wrapCallback = function(P) {
        var j = h;
        return function() {
            var L = h;
            h = j;
            try {
                return P.apply(this, arguments)
            } finally {
                h = L
            }
        }
    }
})(bv);
wv.exports = bv;
var yC = wv.exports; /**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */







var vC = y,
    wt = yC;
function M(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var Sv = new Set,
    so = {};
function ai(e, t) {
    ts(e, t),
    ts(e + "Capture", t)
}
function ts(e, t) {
    for (so[e] = t, e = 0; e < t.length; e++)
        Sv.add(t[e])
}
var Rn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    Vu = Object.prototype.hasOwnProperty,
    xC = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Op = {},
    Ip = {};
function wC(e) {
    return Vu.call(Ip, e) ? !0 : Vu.call(Op, e) ? !1 : xC.test(e) ? Ip[e] = !0 : (Op[e] = !0, !1)
}
function bC(e, t, n, r) {
    if (n !== null && n.type === 0)
        return !1;
    switch (typeof t) {
    case "function":
    case "symbol":
        return !0;
    case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
        return !1
    }
}
function SC(e, t, n, r) {
    if (t === null || typeof t > "u" || bC(e, t, n, r))
        return !0;
    if (r)
        return !1;
    if (n !== null)
        switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
        }
    return !1
}
function lt(e, t, n, r, i, s, o) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4,
    this.attributeName = r,
    this.attributeNamespace = i,
    this.mustUseProperty = n,
    this.propertyName = e,
    this.type = t,
    this.sanitizeURL = s,
    this.removeEmptyString = o
}
var We = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    We[e] = new lt(e, 0, !1, e, null, !1, !1)
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    We[t] = new lt(t, 1, !1, e[1], null, !1, !1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    We[e] = new lt(e, 2, !1, e.toLowerCase(), null, !1, !1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    We[e] = new lt(e, 2, !1, e, null, !1, !1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    We[e] = new lt(e, 3, !1, e.toLowerCase(), null, !1, !1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    We[e] = new lt(e, 3, !0, e, null, !1, !1)
});
["capture", "download"].forEach(function(e) {
    We[e] = new lt(e, 4, !1, e, null, !1, !1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    We[e] = new lt(e, 6, !1, e, null, !1, !1)
});
["rowSpan", "start"].forEach(function(e) {
    We[e] = new lt(e, 5, !1, e.toLowerCase(), null, !1, !1)
});
var kf = /[\-:]([a-z])/g;
function Rf(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(kf, Rf);
    We[t] = new lt(t, 1, !1, e, null, !1, !1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(kf, Rf);
    We[t] = new lt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(kf, Rf);
    We[t] = new lt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    We[e] = new lt(e, 1, !1, e.toLowerCase(), null, !1, !1)
});
We.xlinkHref = new lt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
    We[e] = new lt(e, 1, !1, e.toLowerCase(), null, !0, !0)
});
function Af(e, t, n, r) {
    var i = We.hasOwnProperty(t) ? We[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (SC(t, n, i, r) && (n = null), r || i === null ? wC(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var _n = vC.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    ta = Symbol.for("react.element"),
    bi = Symbol.for("react.portal"),
    Si = Symbol.for("react.fragment"),
    Mf = Symbol.for("react.strict_mode"),
    Fu = Symbol.for("react.profiler"),
    Cv = Symbol.for("react.provider"),
    Ev = Symbol.for("react.context"),
    Of = Symbol.for("react.forward_ref"),
    zu = Symbol.for("react.suspense"),
    Bu = Symbol.for("react.suspense_list"),
    If = Symbol.for("react.memo"),
    qn = Symbol.for("react.lazy"),
    Nv = Symbol.for("react.offscreen"),
    Dp = Symbol.iterator;
function Ps(e) {
    return e === null || typeof e != "object" ? null : (e = Dp && e[Dp] || e["@@iterator"], typeof e == "function" ? e : null)
}
var Ne = Object.assign,
    jc;
function Vs(e) {
    if (jc === void 0)
        try {
            throw Error()
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            jc = t && t[1] || ""
        }
    return `
`
    + jc + e
}
var kc = !1;
function Rc(e, t) {
    if (!e || kc)
        return "";
    kc = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                throw Error()
            }, Object.defineProperty(t.prototype, "props", {
                set: function() {
                    throw Error()
                }
            }), typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (u) {
                    var r = u
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (u) {
                    r = u
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (u) {
                r = u
            }
            e()
        }
    } catch (u) {
        if (u && r && typeof u.stack == "string") {
            for (var i = u.stack.split(`
`
                ), s = r.stack.split(`
`
                ), o = i.length - 1, a = s.length - 1; 1 <= o && 0 <= a && i[o] !== s[a];)
                a--;
            for (; 1 <= o && 0 <= a; o--, a--)
                if (i[o] !== s[a]) {
                    if (o !== 1 || a !== 1)
                        do if (o--, a--, 0 > a || i[o] !== s[a]) {
                            var l = `
`
                            + i[o].replace(" at new ", " at ");
                            return e.displayName && l.includes("<anonymous>") && (l = l.replace("<anonymous>", e.displayName)), l
                        }
                        while (1 <= o && 0 <= a);
                    break
                }
        }
    } finally {
        kc = !1,
        Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? Vs(e) : ""
}
function CC(e) {
    switch (e.tag) {
    case 5:
        return Vs(e.type);
    case 16:
        return Vs("Lazy");
    case 13:
        return Vs("Suspense");
    case 19:
        return Vs("SuspenseList");
    case 0:
    case 2:
    case 15:
        return e = Rc(e.type, !1), e;
    case 11:
        return e = Rc(e.type.render, !1), e;
    case 1:
        return e = Rc(e.type, !0), e;
    default:
        return ""
    }
}
function $u(e) {
    if (e == null)
        return null;
    if (typeof e == "function")
        return e.displayName || e.name || null;
    if (typeof e == "string")
        return e;
    switch (e) {
    case Si:
        return "Fragment";
    case bi:
        return "Portal";
    case Fu:
        return "Profiler";
    case Mf:
        return "StrictMode";
    case zu:
        return "Suspense";
    case Bu:
        return "SuspenseList"
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
        case Ev:
            return (e.displayName || "Context") + ".Consumer";
        case Cv:
            return (e._context.displayName || "Context") + ".Provider";
        case Of:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case If:
            return t = e.displayName || null, t !== null ? t : $u(e.type) || "Memo";
        case qn:
            t = e._payload,
            e = e._init;
            try {
                return $u(e(t))
            } catch {}
        }
    return null
}
function EC(e) {
    var t = e.type;
    switch (e.tag) {
    case 24:
        return "Cache";
    case 9:
        return (t.displayName || "Context") + ".Consumer";
    case 10:
        return (t._context.displayName || "Context") + ".Provider";
    case 18:
        return "DehydratedFragment";
    case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
        return "Fragment";
    case 5:
        return t;
    case 4:
        return "Portal";
    case 3:
        return "Root";
    case 6:
        return "Text";
    case 16:
        return $u(t);
    case 8:
        return t === Mf ? "StrictMode" : "Mode";
    case 22:
        return "Offscreen";
    case 12:
        return "Profiler";
    case 21:
        return "Scope";
    case 13:
        return "Suspense";
    case 19:
        return "SuspenseList";
    case 25:
        return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
        if (typeof t == "function")
            return t.displayName || t.name || null;
        if (typeof t == "string")
            return t
    }
    return null
}
function gr(e) {
    switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
        return e;
    case "object":
        return e;
    default:
        return ""
    }
}
function Tv(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}
function NC(e) {
    var t = Tv(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var i = n.get,
            s = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return i.call(this)
            },
            set: function(o) {
                r = "" + o,
                s.call(this, o)
            }
        }), Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }), {
            getValue: function() {
                return r
            },
            setValue: function(o) {
                r = "" + o
            },
            stopTracking: function() {
                e._valueTracker = null,
                delete e[t]
            }
        }
    }
}
function na(e) {
    e._valueTracker || (e._valueTracker = NC(e))
}
function Pv(e) {
    if (!e)
        return !1;
    var t = e._valueTracker;
    if (!t)
        return !0;
    var n = t.getValue(),
        r = "";
    return e && (r = Tv(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
}
function Za(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}
function Uu(e, t) {
    var n = t.checked;
    return Ne({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}
function Lp(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    n = gr(t.value != null ? t.value : n),
    e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}
function jv(e, t) {
    t = t.checked,
    t != null && Af(e, "checked", t, !1)
}
function Wu(e, t) {
    jv(e, t);
    var n = gr(t.value),
        r = t.type;
    if (n != null)
        r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? Hu(e, t.type, n) : t.hasOwnProperty("defaultValue") && Hu(e, t.type, gr(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}
function _p(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
            return;
        t = "" + e._wrapperState.initialValue,
        n || t === e.value || (e.value = t),
        e.defaultValue = t
    }
    n = e.name,
    n !== "" && (e.name = ""),
    e.defaultChecked = !!e._wrapperState.initialChecked,
    n !== "" && (e.name = n)
}
function Hu(e, t, n) {
    (t !== "number" || Za(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var Fs = Array.isArray;
function _i(e, t, n, r) {
    if (e = e.options, t) {
        t = {};
        for (var i = 0; i < n.length; i++)
            t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++)
            i = t.hasOwnProperty("$" + e[n].value),
            e[n].selected !== i && (e[n].selected = i),
            i && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + gr(n), t = null, i = 0; i < e.length; i++) {
            if (e[i].value === n) {
                e[i].selected = !0,
                r && (e[i].defaultSelected = !0);
                return
            }
            t !== null || e[i].disabled || (t = e[i])
        }
        t !== null && (t.selected = !0)
    }
}
function Ku(e, t) {
    if (t.dangerouslySetInnerHTML != null)
        throw Error(M(91));
    return Ne({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}
function Vp(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children, t = t.defaultValue, n != null) {
            if (t != null)
                throw Error(M(92));
            if (Fs(n)) {
                if (1 < n.length)
                    throw Error(M(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""),
        n = t
    }
    e._wrapperState = {
        initialValue: gr(n)
    }
}
function kv(e, t) {
    var n = gr(t.value),
        r = gr(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r)
}
function Fp(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}
function Rv(e) {
    switch (e) {
    case "svg":
        return "http://www.w3.org/2000/svg";
    case "math":
        return "http://www.w3.org/1998/Math/MathML";
    default:
        return "http://www.w3.org/1999/xhtml"
    }
}
function Gu(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Rv(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var ra,
    Av = function(e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
            MSApp.execUnsafeLocalFunction(function() {
                return e(t, n, r, i)
            })
        } : e
    }(function(e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
            e.innerHTML = t;
        else {
            for (ra = ra || document.createElement("div"), ra.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ra.firstChild; e.firstChild;)
                e.removeChild(e.firstChild);
            for (; t.firstChild;)
                e.appendChild(t.firstChild)
        }
    });
function oo(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var Hs = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    },
    TC = ["Webkit", "ms", "Moz", "O"];
Object.keys(Hs).forEach(function(e) {
    TC.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1),
        Hs[t] = Hs[e]
    })
});
function Mv(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Hs.hasOwnProperty(e) && Hs[e] ? ("" + t).trim() : t + "px"
}
function Ov(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                i = Mv(n, t[n], r);
            n === "float" && (n = "cssFloat"),
            r ? e.setProperty(n, i) : e[n] = i
        }
}
var PC = Ne({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});
function qu(e, t) {
    if (t) {
        if (PC[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(M(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null)
                throw Error(M(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
                throw Error(M(61))
        }
        if (t.style != null && typeof t.style != "object")
            throw Error(M(62))
    }
}
function Qu(e, t) {
    if (e.indexOf("-") === -1)
        return typeof t.is == "string";
    switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
        return !1;
    default:
        return !0
    }
}
var Yu = null;
function Df(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
}
var Xu = null,
    Vi = null,
    Fi = null;
function zp(e) {
    if (e = zo(e)) {
        if (typeof Xu != "function")
            throw Error(M(280));
        var t = e.stateNode;
        t && (t = $l(t), Xu(e.stateNode, e.type, t))
    }
}
function Iv(e) {
    Vi ? Fi ? Fi.push(e) : Fi = [e] : Vi = e
}
function Dv() {
    if (Vi) {
        var e = Vi,
            t = Fi;
        if (Fi = Vi = null, zp(e), t)
            for (e = 0; e < t.length; e++)
                zp(t[e])
    }
}
function Lv(e, t) {
    return e(t)
}
function _v() {}
var Ac = !1;
function Vv(e, t, n) {
    if (Ac)
        return e(t, n);
    Ac = !0;
    try {
        return Lv(e, t, n)
    } finally {
        Ac = !1,
        (Vi !== null || Fi !== null) && (_v(), Dv())
    }
}
function ao(e, t) {
    var n = e.stateNode;
    if (n === null)
        return null;
    var r = $l(n);
    if (r === null)
        return null;
    n = r[t];
    e:
    switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
        e = !r;
        break e;
    default:
        e = !1
    }
    if (e)
        return null;
    if (n && typeof n != "function")
        throw Error(M(231, t, typeof n));
    return n
}
var Zu = !1;
if (Rn)
    try {
        var js = {};
        Object.defineProperty(js, "passive", {
            get: function() {
                Zu = !0
            }
        }),
        window.addEventListener("test", js, js),
        window.removeEventListener("test", js, js)
    } catch {
        Zu = !1
    }
function jC(e, t, n, r, i, s, o, a, l) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, u)
    } catch (d) {
        this.onError(d)
    }
}
var Ks = !1,
    Ja = null,
    el = !1,
    Ju = null,
    kC = {
        onError: function(e) {
            Ks = !0,
            Ja = e
        }
    };
function RC(e, t, n, r, i, s, o, a, l) {
    Ks = !1,
    Ja = null,
    jC.apply(kC, arguments)
}
function AC(e, t, n, r, i, s, o, a, l) {
    if (RC.apply(this, arguments), Ks) {
        if (Ks) {
            var u = Ja;
            Ks = !1,
            Ja = null
        } else
            throw Error(M(198));
        el || (el = !0, Ju = u)
    }
}
function li(e) {
    var t = e,
        n = e;
    if (e.alternate)
        for (; t.return;)
            t = t.return;
    else {
        e = t;
        do t = e,
        t.flags & 4098 && (n = t.return),
        e = t.return;
        while (e)
    }
    return t.tag === 3 ? n : null
}
function Fv(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null)
            return t.dehydrated
    }
    return null
}
function Bp(e) {
    if (li(e) !== e)
        throw Error(M(188))
}
function MC(e) {
    var t = e.alternate;
    if (!t) {
        if (t = li(e), t === null)
            throw Error(M(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t;;) {
        var i = n.return;
        if (i === null)
            break;
        var s = i.alternate;
        if (s === null) {
            if (r = i.return, r !== null) {
                n = r;
                continue
            }
            break
        }
        if (i.child === s.child) {
            for (s = i.child; s;) {
                if (s === n)
                    return Bp(i), e;
                if (s === r)
                    return Bp(i), t;
                s = s.sibling
            }
            throw Error(M(188))
        }
        if (n.return !== r.return)
            n = i,
            r = s;
        else {
            for (var o = !1, a = i.child; a;) {
                if (a === n) {
                    o = !0,
                    n = i,
                    r = s;
                    break
                }
                if (a === r) {
                    o = !0,
                    r = i,
                    n = s;
                    break
                }
                a = a.sibling
            }
            if (!o) {
                for (a = s.child; a;) {
                    if (a === n) {
                        o = !0,
                        n = s,
                        r = i;
                        break
                    }
                    if (a === r) {
                        o = !0,
                        r = s,
                        n = i;
                        break
                    }
                    a = a.sibling
                }
                if (!o)
                    throw Error(M(189))
            }
        }
        if (n.alternate !== r)
            throw Error(M(190))
    }
    if (n.tag !== 3)
        throw Error(M(188));
    return n.stateNode.current === n ? e : t
}
function zv(e) {
    return e = MC(e), e !== null ? Bv(e) : null
}
function Bv(e) {
    if (e.tag === 5 || e.tag === 6)
        return e;
    for (e = e.child; e !== null;) {
        var t = Bv(e);
        if (t !== null)
            return t;
        e = e.sibling
    }
    return null
}
var $v = wt.unstable_scheduleCallback,
    $p = wt.unstable_cancelCallback,
    OC = wt.unstable_shouldYield,
    IC = wt.unstable_requestPaint,
    Ae = wt.unstable_now,
    DC = wt.unstable_getCurrentPriorityLevel,
    Lf = wt.unstable_ImmediatePriority,
    Uv = wt.unstable_UserBlockingPriority,
    tl = wt.unstable_NormalPriority,
    LC = wt.unstable_LowPriority,
    Wv = wt.unstable_IdlePriority,
    Vl = null,
    pn = null;
function _C(e) {
    if (pn && typeof pn.onCommitFiberRoot == "function")
        try {
            pn.onCommitFiberRoot(Vl, e, void 0, (e.current.flags & 128) === 128)
        } catch {}
}
var Zt = Math.clz32 ? Math.clz32 : zC,
    VC = Math.log,
    FC = Math.LN2;
function zC(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (VC(e) / FC | 0) | 0
}
var ia = 64,
    sa = 4194304;
function zs(e) {
    switch (e & -e) {
    case 1:
        return 1;
    case 2:
        return 2;
    case 4:
        return 4;
    case 8:
        return 8;
    case 16:
        return 16;
    case 32:
        return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return e & 130023424;
    case 134217728:
        return 134217728;
    case 268435456:
        return 268435456;
    case 536870912:
        return 536870912;
    case 1073741824:
        return 1073741824;
    default:
        return e
    }
}
function nl(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
        return 0;
    var r = 0,
        i = e.suspendedLanes,
        s = e.pingedLanes,
        o = n & 268435455;
    if (o !== 0) {
        var a = o & ~i;
        a !== 0 ? r = zs(a) : (s &= o, s !== 0 && (r = zs(s)))
    } else
        o = n & ~i,
        o !== 0 ? r = zs(o) : s !== 0 && (r = zs(s));
    if (r === 0)
        return 0;
    if (t !== 0 && t !== r && !(t & i) && (i = r & -r, s = t & -t, i >= s || i === 16 && (s & 4194240) !== 0))
        return t;
    if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
        for (e = e.entanglements, t &= r; 0 < t;)
            n = 31 - Zt(t),
            i = 1 << n,
            r |= e[n],
            t &= ~i;
    return r
}
function BC(e, t) {
    switch (e) {
    case 1:
    case 2:
    case 4:
        return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
        return -1;
    default:
        return -1
    }
}
function $C(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, s = e.pendingLanes; 0 < s;) {
        var o = 31 - Zt(s),
            a = 1 << o,
            l = i[o];
        l === -1 ? (!(a & n) || a & r) && (i[o] = BC(a, t)) : l <= t && (e.expiredLanes |= a),
        s &= ~a
    }
}
function ed(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}
function Hv() {
    var e = ia;
    return ia <<= 1, !(ia & 4194240) && (ia = 64), e
}
function Mc(e) {
    for (var t = [], n = 0; 31 > n; n++)
        t.push(e);
    return t
}
function Vo(e, t, n) {
    e.pendingLanes |= t,
    t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0),
    e = e.eventTimes,
    t = 31 - Zt(t),
    e[t] = n
}
function UC(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t,
    e.suspendedLanes = 0,
    e.pingedLanes = 0,
    e.expiredLanes &= t,
    e.mutableReadLanes &= t,
    e.entangledLanes &= t,
    t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n;) {
        var i = 31 - Zt(n),
            s = 1 << i;
        t[i] = 0,
        r[i] = -1,
        e[i] = -1,
        n &= ~s
    }
}
function _f(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n;) {
        var r = 31 - Zt(n),
            i = 1 << r;
        i & t | e[r] & t && (e[r] |= t),
        n &= ~i
    }
}
var ce = 0;
function Kv(e) {
    return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var Gv,
    Vf,
    qv,
    Qv,
    Yv,
    td = !1,
    oa = [],
    ar = null,
    lr = null,
    cr = null,
    lo = new Map,
    co = new Map,
    Yn = [],
    WC = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Up(e, t) {
    switch (e) {
    case "focusin":
    case "focusout":
        ar = null;
        break;
    case "dragenter":
    case "dragleave":
        lr = null;
        break;
    case "mouseover":
    case "mouseout":
        cr = null;
        break;
    case "pointerover":
    case "pointerout":
        lo.delete(t.pointerId);
        break;
    case "gotpointercapture":
    case "lostpointercapture":
        co.delete(t.pointerId)
    }
}
function ks(e, t, n, r, i, s) {
    return e === null || e.nativeEvent !== s ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: s,
        targetContainers: [i]
    }, t !== null && (t = zo(t), t !== null && Vf(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e)
}
function HC(e, t, n, r, i) {
    switch (t) {
    case "focusin":
        return ar = ks(ar, e, t, n, r, i), !0;
    case "dragenter":
        return lr = ks(lr, e, t, n, r, i), !0;
    case "mouseover":
        return cr = ks(cr, e, t, n, r, i), !0;
    case "pointerover":
        var s = i.pointerId;
        return lo.set(s, ks(lo.get(s) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
        return s = i.pointerId, co.set(s, ks(co.get(s) || null, e, t, n, r, i)), !0
    }
    return !1
}
function Xv(e) {
    var t = Vr(e.target);
    if (t !== null) {
        var n = li(t);
        if (n !== null) {
            if (t = n.tag, t === 13) {
                if (t = Fv(n), t !== null) {
                    e.blockedOn = t,
                    Yv(e.priority, function() {
                        qv(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}
function Oa(e) {
    if (e.blockedOn !== null)
        return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
        var n = nd(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            Yu = r,
            n.target.dispatchEvent(r),
            Yu = null
        } else
            return t = zo(n), t !== null && Vf(t), e.blockedOn = n, !1;
        t.shift()
    }
    return !0
}
function Wp(e, t, n) {
    Oa(e) && n.delete(t)
}
function KC() {
    td = !1,
    ar !== null && Oa(ar) && (ar = null),
    lr !== null && Oa(lr) && (lr = null),
    cr !== null && Oa(cr) && (cr = null),
    lo.forEach(Wp),
    co.forEach(Wp)
}
function Rs(e, t) {
    e.blockedOn === t && (e.blockedOn = null, td || (td = !0, wt.unstable_scheduleCallback(wt.unstable_NormalPriority, KC)))
}
function uo(e) {
    function t(i) {
        return Rs(i, e)
    }
    if (0 < oa.length) {
        Rs(oa[0], e);
        for (var n = 1; n < oa.length; n++) {
            var r = oa[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (ar !== null && Rs(ar, e), lr !== null && Rs(lr, e), cr !== null && Rs(cr, e), lo.forEach(t), co.forEach(t), n = 0; n < Yn.length; n++)
        r = Yn[n],
        r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Yn.length && (n = Yn[0], n.blockedOn === null);)
        Xv(n),
        n.blockedOn === null && Yn.shift()
}
var zi = _n.ReactCurrentBatchConfig,
    rl = !0;
function GC(e, t, n, r) {
    var i = ce,
        s = zi.transition;
    zi.transition = null;
    try {
        ce = 1,
        Ff(e, t, n, r)
    } finally {
        ce = i,
        zi.transition = s
    }
}
function qC(e, t, n, r) {
    var i = ce,
        s = zi.transition;
    zi.transition = null;
    try {
        ce = 4,
        Ff(e, t, n, r)
    } finally {
        ce = i,
        zi.transition = s
    }
}
function Ff(e, t, n, r) {
    if (rl) {
        var i = nd(e, t, n, r);
        if (i === null)
            $c(e, t, r, il, n),
            Up(e, r);
        else if (HC(i, e, t, n, r))
            r.stopPropagation();
        else if (Up(e, r), t & 4 && -1 < WC.indexOf(e)) {
            for (; i !== null;) {
                var s = zo(i);
                if (s !== null && Gv(s), s = nd(e, t, n, r), s === null && $c(e, t, r, il, n), s === i)
                    break;
                i = s
            }
            i !== null && r.stopPropagation()
        } else
            $c(e, t, r, null, n)
    }
}
var il = null;
function nd(e, t, n, r) {
    if (il = null, e = Df(r), e = Vr(e), e !== null)
        if (t = li(e), t === null)
            e = null;
        else if (n = t.tag, n === 13) {
            if (e = Fv(t), e !== null)
                return e;
            e = null
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null
        } else
            t !== e && (e = null);
    return il = e, null
}
function Zv(e) {
    switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
        return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
        return 4;
    case "message":
        switch (DC()) {
        case Lf:
            return 1;
        case Uv:
            return 4;
        case tl:
        case LC:
            return 16;
        case Wv:
            return 536870912;
        default:
            return 16
        }
    default:
        return 16
    }
}
var rr = null,
    zf = null,
    Ia = null;
function Jv() {
    if (Ia)
        return Ia;
    var e,
        t = zf,
        n = t.length,
        r,
        i = "value" in rr ? rr.value : rr.textContent,
        s = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++)
        ;
    var o = n - e;
    for (r = 1; r <= o && t[n - r] === i[s - r]; r++)
        ;
    return Ia = i.slice(e, 1 < r ? 1 - r : void 0)
}
function Da(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
}
function aa() {
    return !0
}
function Hp() {
    return !1
}
function St(e) {
    function t(n, r, i, s, o) {
        this._reactName = n,
        this._targetInst = i,
        this.type = r,
        this.nativeEvent = s,
        this.target = o,
        this.currentTarget = null;
        for (var a in e)
            e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(s) : s[a]);
        return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? aa : Hp, this.isPropagationStopped = Hp, this
    }
    return Ne(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = aa)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = aa)
        },
        persist: function() {},
        isPersistent: aa
    }), t
}
var ps = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    },
    Bf = St(ps),
    Fo = Ne({}, ps, {
        view: 0,
        detail: 0
    }),
    QC = St(Fo),
    Oc,
    Ic,
    As,
    Fl = Ne({}, Fo, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: $f,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX" in e ? e.movementX : (e !== As && (As && e.type === "mousemove" ? (Oc = e.screenX - As.screenX, Ic = e.screenY - As.screenY) : Ic = Oc = 0, As = e), Oc)
        },
        movementY: function(e) {
            return "movementY" in e ? e.movementY : Ic
        }
    }),
    Kp = St(Fl),
    YC = Ne({}, Fl, {
        dataTransfer: 0
    }),
    XC = St(YC),
    ZC = Ne({}, Fo, {
        relatedTarget: 0
    }),
    Dc = St(ZC),
    JC = Ne({}, ps, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    eE = St(JC),
    tE = Ne({}, ps, {
        clipboardData: function(e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData
        }
    }),
    nE = St(tE),
    rE = Ne({}, ps, {
        data: 0
    }),
    Gp = St(rE),
    iE = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    },
    sE = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    },
    oE = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
function aE(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = oE[e]) ? !!t[e] : !1
}
function $f() {
    return aE
}
var lE = Ne({}, Fo, {
        key: function(e) {
            if (e.key) {
                var t = iE[e.key] || e.key;
                if (t !== "Unidentified")
                    return t
            }
            return e.type === "keypress" ? (e = Da(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? sE[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: $f,
        charCode: function(e) {
            return e.type === "keypress" ? Da(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? Da(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    }),
    cE = St(lE),
    uE = Ne({}, Fl, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    }),
    qp = St(uE),
    dE = Ne({}, Fo, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: $f
    }),
    fE = St(dE),
    hE = Ne({}, ps, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    pE = St(hE),
    mE = Ne({}, Fl, {
        deltaX: function(e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    }),
    gE = St(mE),
    yE = [9, 13, 27, 32],
    Uf = Rn && "CompositionEvent" in window,
    Gs = null;
Rn && "documentMode" in document && (Gs = document.documentMode);
var vE = Rn && "TextEvent" in window && !Gs,
    ex = Rn && (!Uf || Gs && 8 < Gs && 11 >= Gs),
    Qp = " ",
    Yp = !1;
function tx(e, t) {
    switch (e) {
    case "keyup":
        return yE.indexOf(t.keyCode) !== -1;
    case "keydown":
        return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
        return !0;
    default:
        return !1
    }
}
function nx(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
}
var Ci = !1;
function xE(e, t) {
    switch (e) {
    case "compositionend":
        return nx(t);
    case "keypress":
        return t.which !== 32 ? null : (Yp = !0, Qp);
    case "textInput":
        return e = t.data, e === Qp && Yp ? null : e;
    default:
        return null
    }
}
function wE(e, t) {
    if (Ci)
        return e === "compositionend" || !Uf && tx(e, t) ? (e = Jv(), Ia = zf = rr = null, Ci = !1, e) : null;
    switch (e) {
    case "paste":
        return null;
    case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
                return t.char;
            if (t.which)
                return String.fromCharCode(t.which)
        }
        return null;
    case "compositionend":
        return ex && t.locale !== "ko" ? null : t.data;
    default:
        return null
    }
}
var bE = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};
function Xp(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!bE[e.type] : t === "textarea"
}
function rx(e, t, n, r) {
    Iv(r),
    t = sl(t, "onChange"),
    0 < t.length && (n = new Bf("onChange", "change", null, n, r), e.push({
        event: n,
        listeners: t
    }))
}
var qs = null,
    fo = null;
function SE(e) {
    px(e, 0)
}
function zl(e) {
    var t = Ti(e);
    if (Pv(t))
        return e
}
function CE(e, t) {
    if (e === "change")
        return t
}
var ix = !1;
if (Rn) {
    var Lc;
    if (Rn) {
        var _c = "oninput" in document;
        if (!_c) {
            var Zp = document.createElement("div");
            Zp.setAttribute("oninput", "return;"),
            _c = typeof Zp.oninput == "function"
        }
        Lc = _c
    } else
        Lc = !1;
    ix = Lc && (!document.documentMode || 9 < document.documentMode)
}
function Jp() {
    qs && (qs.detachEvent("onpropertychange", sx), fo = qs = null)
}
function sx(e) {
    if (e.propertyName === "value" && zl(fo)) {
        var t = [];
        rx(t, fo, e, Df(e)),
        Vv(SE, t)
    }
}
function EE(e, t, n) {
    e === "focusin" ? (Jp(), qs = t, fo = n, qs.attachEvent("onpropertychange", sx)) : e === "focusout" && Jp()
}
function NE(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return zl(fo)
}
function TE(e, t) {
    if (e === "click")
        return zl(t)
}
function PE(e, t) {
    if (e === "input" || e === "change")
        return zl(t)
}
function jE(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var tn = typeof Object.is == "function" ? Object.is : jE;
function ho(e, t) {
    if (tn(e, t))
        return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length)
        return !1;
    for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!Vu.call(t, i) || !tn(e[i], t[i]))
            return !1
    }
    return !0
}
function em(e) {
    for (; e && e.firstChild;)
        e = e.firstChild;
    return e
}
function tm(e, t) {
    var n = em(e);
    e = 0;
    for (var r; n;) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length, e <= t && r >= t)
                return {
                    node: n,
                    offset: t - e
                };
            e = r
        }
        e:
        {
            for (; n;) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }n = em(n)
    }
}
function ox(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ox(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}
function ax() {
    for (var e = window, t = Za(); t instanceof e.HTMLIFrameElement;) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n)
            e = t.contentWindow;
        else
            break;
        t = Za(e.document)
    }
    return t
}
function Wf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}
function kE(e) {
    var t = ax(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && ox(n.ownerDocument.documentElement, n)) {
        if (r !== null && Wf(n)) {
            if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n)
                n.selectionStart = t,
                n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
                e = e.getSelection();
                var i = n.textContent.length,
                    s = Math.min(r.start, i);
                r = r.end === void 0 ? s : Math.min(r.end, i),
                !e.extend && s > r && (i = r, r = s, s = i),
                i = tm(n, s);
                var o = tm(n, r);
                i && o && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), s > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)))
            }
        }
        for (t = [], e = n; e = e.parentNode;)
            e.nodeType === 1 && t.push({
                element: e,
                left: e.scrollLeft,
                top: e.scrollTop
            });
        for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
            e = t[n],
            e.element.scrollLeft = e.left,
            e.element.scrollTop = e.top
    }
}
var RE = Rn && "documentMode" in document && 11 >= document.documentMode,
    Ei = null,
    rd = null,
    Qs = null,
    id = !1;
function nm(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    id || Ei == null || Ei !== Za(r) || (r = Ei, "selectionStart" in r && Wf(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }), Qs && ho(Qs, r) || (Qs = r, r = sl(rd, "onSelect"), 0 < r.length && (t = new Bf("onSelect", "select", null, t, n), e.push({
        event: t,
        listeners: r
    }), t.target = Ei)))
}
function la(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
}
var Ni = {
        animationend: la("Animation", "AnimationEnd"),
        animationiteration: la("Animation", "AnimationIteration"),
        animationstart: la("Animation", "AnimationStart"),
        transitionend: la("Transition", "TransitionEnd")
    },
    Vc = {},
    lx = {};
Rn && (lx = document.createElement("div").style, "AnimationEvent" in window || (delete Ni.animationend.animation, delete Ni.animationiteration.animation, delete Ni.animationstart.animation), "TransitionEvent" in window || delete Ni.transitionend.transition);
function Bl(e) {
    if (Vc[e])
        return Vc[e];
    if (!Ni[e])
        return e;
    var t = Ni[e],
        n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in lx)
            return Vc[e] = t[n];
    return e
}
var cx = Bl("animationend"),
    ux = Bl("animationiteration"),
    dx = Bl("animationstart"),
    fx = Bl("transitionend"),
    hx = new Map,
    rm = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Sr(e, t) {
    hx.set(e, t),
    ai(t, [e])
}
for (var Fc = 0; Fc < rm.length; Fc++) {
    var zc = rm[Fc],
        AE = zc.toLowerCase(),
        ME = zc[0].toUpperCase() + zc.slice(1);
    Sr(AE, "on" + ME)
}
Sr(cx, "onAnimationEnd");
Sr(ux, "onAnimationIteration");
Sr(dx, "onAnimationStart");
Sr("dblclick", "onDoubleClick");
Sr("focusin", "onFocus");
Sr("focusout", "onBlur");
Sr(fx, "onTransitionEnd");
ts("onMouseEnter", ["mouseout", "mouseover"]);
ts("onMouseLeave", ["mouseout", "mouseover"]);
ts("onPointerEnter", ["pointerout", "pointerover"]);
ts("onPointerLeave", ["pointerout", "pointerover"]);
ai("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
ai("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
ai("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ai("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
ai("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
ai("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Bs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    OE = new Set("cancel close invalid load scroll toggle".split(" ").concat(Bs));
function im(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n,
    AC(r, t, void 0, e),
    e.currentTarget = null
}
function px(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            i = r.event;
        r = r.listeners;
        e:
        {
            var s = void 0;
            if (t)
                for (var o = r.length - 1; 0 <= o; o--) {
                    var a = r[o],
                        l = a.instance,
                        u = a.currentTarget;
                    if (a = a.listener, l !== s && i.isPropagationStopped())
                        break e;
                    im(i, a, u),
                    s = l
                }
            else
                for (o = 0; o < r.length; o++) {
                    if (a = r[o], l = a.instance, u = a.currentTarget, a = a.listener, l !== s && i.isPropagationStopped())
                        break e;
                    im(i, a, u),
                    s = l
                }
        }
    }
    if (el)
        throw e = Ju, el = !1, Ju = null, e
}
function ge(e, t) {
    var n = t[cd];
    n === void 0 && (n = t[cd] = new Set);
    var r = e + "__bubble";
    n.has(r) || (mx(t, e, 2, !1), n.add(r))
}
function Bc(e, t, n) {
    var r = 0;
    t && (r |= 4),
    mx(n, e, r, t)
}
var ca = "_reactListening" + Math.random().toString(36).slice(2);
function po(e) {
    if (!e[ca]) {
        e[ca] = !0,
        Sv.forEach(function(n) {
            n !== "selectionchange" && (OE.has(n) || Bc(n, !1, e), Bc(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[ca] || (t[ca] = !0, Bc("selectionchange", !1, t))
    }
}
function mx(e, t, n, r) {
    switch (Zv(t)) {
    case 1:
        var i = GC;
        break;
    case 4:
        i = qC;
        break;
    default:
        i = Ff
    }
    n = i.bind(null, t, n, e),
    i = void 0,
    !Zu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0),
    r ? i !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: i
    }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, {
        passive: i
    }) : e.addEventListener(t, n, !1)
}
function $c(e, t, n, r, i) {
    var s = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e:
        for (;;) {
            if (r === null)
                return;
            var o = r.tag;
            if (o === 3 || o === 4) {
                var a = r.stateNode.containerInfo;
                if (a === i || a.nodeType === 8 && a.parentNode === i)
                    break;
                if (o === 4)
                    for (o = r.return; o !== null;) {
                        var l = o.tag;
                        if ((l === 3 || l === 4) && (l = o.stateNode.containerInfo, l === i || l.nodeType === 8 && l.parentNode === i))
                            return;
                        o = o.return
                    }
                for (; a !== null;) {
                    if (o = Vr(a), o === null)
                        return;
                    if (l = o.tag, l === 5 || l === 6) {
                        r = s = o;
                        continue e
                    }
                    a = a.parentNode
                }
            }
            r = r.return
        }
    Vv(function() {
        var u = s,
            d = Df(n),
            f = [];
        e:
        {
            var h = hx.get(e);
            if (h !== void 0) {
                var p = Bf,
                    b = e;
                switch (e) {
                case "keypress":
                    if (Da(n) === 0)
                        break e;
                case "keydown":
                case "keyup":
                    p = cE;
                    break;
                case "focusin":
                    b = "focus",
                    p = Dc;
                    break;
                case "focusout":
                    b = "blur",
                    p = Dc;
                    break;
                case "beforeblur":
                case "afterblur":
                    p = Dc;
                    break;
                case "click":
                    if (n.button === 2)
                        break e;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                    p = Kp;
                    break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                    p = XC;
                    break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                    p = fE;
                    break;
                case cx:
                case ux:
                case dx:
                    p = eE;
                    break;
                case fx:
                    p = pE;
                    break;
                case "scroll":
                    p = QC;
                    break;
                case "wheel":
                    p = gE;
                    break;
                case "copy":
                case "cut":
                case "paste":
                    p = nE;
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                    p = qp
                }
                var m = (t & 4) !== 0,
                    w = !m && e === "scroll",
                    v = m ? h !== null ? h + "Capture" : null : h;
                m = [];
                for (var g = u, x; g !== null;) {
                    x = g;
                    var S = x.stateNode;
                    if (x.tag === 5 && S !== null && (x = S, v !== null && (S = ao(g, v), S != null && m.push(mo(g, S, x)))), w)
                        break;
                    g = g.return
                }
                0 < m.length && (h = new p(h, b, null, n, d), f.push({
                    event: h,
                    listeners: m
                }))
            }
        }if (!(t & 7)) {
            e:
            {
                if (h = e === "mouseover" || e === "pointerover", p = e === "mouseout" || e === "pointerout", h && n !== Yu && (b = n.relatedTarget || n.fromElement) && (Vr(b) || b[An]))
                    break e;
                if ((p || h) && (h = d.window === d ? d : (h = d.ownerDocument) ? h.defaultView || h.parentWindow : window, p ? (b = n.relatedTarget || n.toElement, p = u, b = b ? Vr(b) : null, b !== null && (w = li(b), b !== w || b.tag !== 5 && b.tag !== 6) && (b = null)) : (p = null, b = u), p !== b)) {
                    if (m = Kp, S = "onMouseLeave", v = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (m = qp, S = "onPointerLeave", v = "onPointerEnter", g = "pointer"), w = p == null ? h : Ti(p), x = b == null ? h : Ti(b), h = new m(S, g + "leave", p, n, d), h.target = w, h.relatedTarget = x, S = null, Vr(d) === u && (m = new m(v, g + "enter", b, n, d), m.target = x, m.relatedTarget = w, S = m), w = S, p && b)
                        t:
                        {
                            for (m = p, v = b, g = 0, x = m; x; x = yi(x))
                                g++;
                            for (x = 0, S = v; S; S = yi(S))
                                x++;
                            for (; 0 < g - x;)
                                m = yi(m),
                                g--;
                            for (; 0 < x - g;)
                                v = yi(v),
                                x--;
                            for (; g--;) {
                                if (m === v || v !== null && m === v.alternate)
                                    break t;
                                m = yi(m),
                                v = yi(v)
                            }
                            m = null
                        } else
                        m = null;
                    p !== null && sm(f, h, p, m, !1),
                    b !== null && w !== null && sm(f, w, b, m, !0)
                }
            }e:
            {
                if (h = u ? Ti(u) : window, p = h.nodeName && h.nodeName.toLowerCase(), p === "select" || p === "input" && h.type === "file")
                    var C = CE;
                else if (Xp(h))
                    if (ix)
                        C = PE;
                    else {
                        C = NE;
                        var E = EE
                    }
                else
                    (p = h.nodeName) && p.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (C = TE);
                if (C && (C = C(e, u))) {
                    rx(f, C, n, d);
                    break e
                }
                E && E(e, h, u),
                e === "focusout" && (E = h._wrapperState) && E.controlled && h.type === "number" && Hu(h, "number", h.value)
            }switch (E = u ? Ti(u) : window, e) {
            case "focusin":
                (Xp(E) || E.contentEditable === "true") && (Ei = E, rd = u, Qs = null);
                break;
            case "focusout":
                Qs = rd = Ei = null;
                break;
            case "mousedown":
                id = !0;
                break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
                id = !1,
                nm(f, n, d);
                break;
            case "selectionchange":
                if (RE)
                    break;
            case "keydown":
            case "keyup":
                nm(f, n, d)
            }
            var N;
            if (Uf)
                e:
                {
                    switch (e) {
                    case "compositionstart":
                        var T = "onCompositionStart";
                        break e;
                    case "compositionend":
                        T = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        T = "onCompositionUpdate";
                        break e
                    }
                    T = void 0
                } else
                Ci ? tx(e, n) && (T = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
            T && (ex && n.locale !== "ko" && (Ci || T !== "onCompositionStart" ? T === "onCompositionEnd" && Ci && (N = Jv()) : (rr = d, zf = "value" in rr ? rr.value : rr.textContent, Ci = !0)), E = sl(u, T), 0 < E.length && (T = new Gp(T, e, null, n, d), f.push({
                event: T,
                listeners: E
            }), N ? T.data = N : (N = nx(n), N !== null && (T.data = N)))),
            (N = vE ? xE(e, n) : wE(e, n)) && (u = sl(u, "onBeforeInput"), 0 < u.length && (d = new Gp("onBeforeInput", "beforeinput", null, n, d), f.push({
                event: d,
                listeners: u
            }), d.data = N))
        }
        px(f, t)
    })
}
function mo(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}
function sl(e, t) {
    for (var n = t + "Capture", r = []; e !== null;) {
        var i = e,
            s = i.stateNode;
        i.tag === 5 && s !== null && (i = s, s = ao(e, n), s != null && r.unshift(mo(e, s, i)), s = ao(e, t), s != null && r.push(mo(e, s, i))),
        e = e.return
    }
    return r
}
function yi(e) {
    if (e === null)
        return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null
}
function sm(e, t, n, r, i) {
    for (var s = t._reactName, o = []; n !== null && n !== r;) {
        var a = n,
            l = a.alternate,
            u = a.stateNode;
        if (l !== null && l === r)
            break;
        a.tag === 5 && u !== null && (a = u, i ? (l = ao(n, s), l != null && o.unshift(mo(n, l, a))) : i || (l = ao(n, s), l != null && o.push(mo(n, l, a)))),
        n = n.return
    }
    o.length !== 0 && e.push({
        event: t,
        listeners: o
    })
}
var IE = /\r\n?/g,
    DE = /\u0000|\uFFFD/g;
function om(e) {
    return (typeof e == "string" ? e : "" + e).replace(IE, `
`
    ).replace(DE, "")
}
function ua(e, t, n) {
    if (t = om(t), om(e) !== t && n)
        throw Error(M(425))
}
function ol() {}
var sd = null,
    od = null;
function ad(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var ld = typeof setTimeout == "function" ? setTimeout : void 0,
    LE = typeof clearTimeout == "function" ? clearTimeout : void 0,
    am = typeof Promise == "function" ? Promise : void 0,
    _E = typeof queueMicrotask == "function" ? queueMicrotask : typeof am < "u" ? function(e) {
        return am.resolve(null).then(e).catch(VE)
    } : ld;
function VE(e) {
    setTimeout(function() {
        throw e
    })
}
function Uc(e, t) {
    var n = t,
        r = 0;
    do {
        var i = n.nextSibling;
        if (e.removeChild(n), i && i.nodeType === 8)
            if (n = i.data, n === "/$") {
                if (r === 0) {
                    e.removeChild(i),
                    uo(t);
                    return
                }
                r--
            } else
                n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = i
    } while (n);
    uo(t)
}
function ur(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3)
            break;
        if (t === 8) {
            if (t = e.data, t === "$" || t === "$!" || t === "$?")
                break;
            if (t === "/$")
                return null
        }
    }
    return e
}
function lm(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0)
                    return e;
                t--
            } else
                n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var ms = Math.random().toString(36).slice(2),
    dn = "__reactFiber$" + ms,
    go = "__reactProps$" + ms,
    An = "__reactContainer$" + ms,
    cd = "__reactEvents$" + ms,
    FE = "__reactListeners$" + ms,
    zE = "__reactHandles$" + ms;
function Vr(e) {
    var t = e[dn];
    if (t)
        return t;
    for (var n = e.parentNode; n;) {
        if (t = n[An] || n[dn]) {
            if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
                for (e = lm(e); e !== null;) {
                    if (n = e[dn])
                        return n;
                    e = lm(e)
                }
            return t
        }
        e = n,
        n = e.parentNode
    }
    return null
}
function zo(e) {
    return e = e[dn] || e[An], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}
function Ti(e) {
    if (e.tag === 5 || e.tag === 6)
        return e.stateNode;
    throw Error(M(33))
}
function $l(e) {
    return e[go] || null
}
var ud = [],
    Pi = -1;
function Cr(e) {
    return {
        current: e
    }
}
function ye(e) {
    0 > Pi || (e.current = ud[Pi], ud[Pi] = null, Pi--)
}
function he(e, t) {
    Pi++,
    ud[Pi] = e.current,
    e.current = t
}
var yr = {},
    Je = Cr(yr),
    ft = Cr(!1),
    Zr = yr;
function ns(e, t) {
    var n = e.type.contextTypes;
    if (!n)
        return yr;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var i = {},
        s;
    for (s in n)
        i[s] = t[s];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i
}
function ht(e) {
    return e = e.childContextTypes, e != null
}
function al() {
    ye(ft),
    ye(Je)
}
function cm(e, t, n) {
    if (Je.current !== yr)
        throw Error(M(168));
    he(Je, t),
    he(ft, n)
}
function gx(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function")
        return n;
    r = r.getChildContext();
    for (var i in r)
        if (!(i in t))
            throw Error(M(108, EC(e) || "Unknown", i));
    return Ne({}, n, r)
}
function ll(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || yr, Zr = Je.current, he(Je, e), he(ft, ft.current), !0
}
function um(e, t, n) {
    var r = e.stateNode;
    if (!r)
        throw Error(M(169));
    n ? (e = gx(e, t, Zr), r.__reactInternalMemoizedMergedChildContext = e, ye(ft), ye(Je), he(Je, e)) : ye(ft),
    he(ft, n)
}
var Nn = null,
    Ul = !1,
    Wc = !1;
function yx(e) {
    Nn === null ? Nn = [e] : Nn.push(e)
}
function BE(e) {
    Ul = !0,
    yx(e)
}
function Er() {
    if (!Wc && Nn !== null) {
        Wc = !0;
        var e = 0,
            t = ce;
        try {
            var n = Nn;
            for (ce = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0);
                while (r !== null)
            }
            Nn = null,
            Ul = !1
        } catch (i) {
            throw Nn !== null && (Nn = Nn.slice(e + 1)), $v(Lf, Er), i
        } finally {
            ce = t,
            Wc = !1
        }
    }
    return null
}
var ji = [],
    ki = 0,
    cl = null,
    ul = 0,
    kt = [],
    Rt = 0,
    Jr = null,
    Pn = 1,
    jn = "";
function Dr(e, t) {
    ji[ki++] = ul,
    ji[ki++] = cl,
    cl = e,
    ul = t
}
function vx(e, t, n) {
    kt[Rt++] = Pn,
    kt[Rt++] = jn,
    kt[Rt++] = Jr,
    Jr = e;
    var r = Pn;
    e = jn;
    var i = 32 - Zt(r) - 1;
    r &= ~(1 << i),
    n += 1;
    var s = 32 - Zt(t) + i;
    if (30 < s) {
        var o = i - i % 5;
        s = (r & (1 << o) - 1).toString(32),
        r >>= o,
        i -= o,
        Pn = 1 << 32 - Zt(t) + i | n << i | r,
        jn = s + e
    } else
        Pn = 1 << s | n << i | r,
        jn = e
}
function Hf(e) {
    e.return !== null && (Dr(e, 1), vx(e, 1, 0))
}
function Kf(e) {
    for (; e === cl;)
        cl = ji[--ki],
        ji[ki] = null,
        ul = ji[--ki],
        ji[ki] = null;
    for (; e === Jr;)
        Jr = kt[--Rt],
        kt[Rt] = null,
        jn = kt[--Rt],
        kt[Rt] = null,
        Pn = kt[--Rt],
        kt[Rt] = null
}
var vt = null,
    yt = null,
    we = !1,
    Yt = null;
function xx(e, t) {
    var n = At(5, null, null, 0);
    n.elementType = "DELETED",
    n.stateNode = t,
    n.return = e,
    t = e.deletions,
    t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n)
}
function dm(e, t) {
    switch (e.tag) {
    case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, vt = e, yt = ur(t.firstChild), !0) : !1;
    case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, vt = e, yt = null, !0) : !1;
    case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Jr !== null ? {
            id: Pn,
            overflow: jn
        } : null, e.memoizedState = {
            dehydrated: t,
            treeContext: n,
            retryLane: 1073741824
        }, n = At(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, vt = e, yt = null, !0) : !1;
    default:
        return !1
    }
}
function dd(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function fd(e) {
    if (we) {
        var t = yt;
        if (t) {
            var n = t;
            if (!dm(e, t)) {
                if (dd(e))
                    throw Error(M(418));
                t = ur(n.nextSibling);
                var r = vt;
                t && dm(e, t) ? xx(r, n) : (e.flags = e.flags & -4097 | 2, we = !1, vt = e)
            }
        } else {
            if (dd(e))
                throw Error(M(418));
            e.flags = e.flags & -4097 | 2,
            we = !1,
            vt = e
        }
    }
}
function fm(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;)
        e = e.return;
    vt = e
}
function da(e) {
    if (e !== vt)
        return !1;
    if (!we)
        return fm(e), we = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ad(e.type, e.memoizedProps)), t && (t = yt)) {
        if (dd(e))
            throw wx(), Error(M(418));
        for (; t;)
            xx(e, t),
            t = ur(t.nextSibling)
    }
    if (fm(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
            throw Error(M(317));
        e:
        {
            for (e = e.nextSibling, t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            yt = ur(e.nextSibling);
                            break e
                        }
                        t--
                    } else
                        n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            yt = null
        }
    } else
        yt = vt ? ur(e.stateNode.nextSibling) : null;
    return !0
}
function wx() {
    for (var e = yt; e;)
        e = ur(e.nextSibling)
}
function rs() {
    yt = vt = null,
    we = !1
}
function Gf(e) {
    Yt === null ? Yt = [e] : Yt.push(e)
}
var $E = _n.ReactCurrentBatchConfig;
function Ms(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner, n) {
                if (n.tag !== 1)
                    throw Error(M(309));
                var r = n.stateNode
            }
            if (!r)
                throw Error(M(147, e));
            var i = r,
                s = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === s ? t.ref : (t = function(o) {
                var a = i.refs;
                o === null ? delete a[s] : a[s] = o
            }, t._stringRef = s, t)
        }
        if (typeof e != "string")
            throw Error(M(284));
        if (!n._owner)
            throw Error(M(290, e))
    }
    return e
}
function fa(e, t) {
    throw e = Object.prototype.toString.call(t), Error(M(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}
function hm(e) {
    var t = e._init;
    return t(e._payload)
}
function bx(e) {
    function t(v, g) {
        if (e) {
            var x = v.deletions;
            x === null ? (v.deletions = [g], v.flags |= 16) : x.push(g)
        }
    }
    function n(v, g) {
        if (!e)
            return null;
        for (; g !== null;)
            t(v, g),
            g = g.sibling;
        return null
    }
    function r(v, g) {
        for (v = new Map; g !== null;)
            g.key !== null ? v.set(g.key, g) : v.set(g.index, g),
            g = g.sibling;
        return v
    }
    function i(v, g) {
        return v = pr(v, g), v.index = 0, v.sibling = null, v
    }
    function s(v, g, x) {
        return v.index = x, e ? (x = v.alternate, x !== null ? (x = x.index, x < g ? (v.flags |= 2, g) : x) : (v.flags |= 2, g)) : (v.flags |= 1048576, g)
    }
    function o(v) {
        return e && v.alternate === null && (v.flags |= 2), v
    }
    function a(v, g, x, S) {
        return g === null || g.tag !== 6 ? (g = Xc(x, v.mode, S), g.return = v, g) : (g = i(g, x), g.return = v, g)
    }
    function l(v, g, x, S) {
        var C = x.type;
        return C === Si ? d(v, g, x.props.children, S, x.key) : g !== null && (g.elementType === C || typeof C == "object" && C !== null && C.$$typeof === qn && hm(C) === g.type) ? (S = i(g, x.props), S.ref = Ms(v, g, x), S.return = v, S) : (S = $a(x.type, x.key, x.props, null, v.mode, S), S.ref = Ms(v, g, x), S.return = v, S)
    }
    function u(v, g, x, S) {
        return g === null || g.tag !== 4 || g.stateNode.containerInfo !== x.containerInfo || g.stateNode.implementation !== x.implementation ? (g = Zc(x, v.mode, S), g.return = v, g) : (g = i(g, x.children || []), g.return = v, g)
    }
    function d(v, g, x, S, C) {
        return g === null || g.tag !== 7 ? (g = Yr(x, v.mode, S, C), g.return = v, g) : (g = i(g, x), g.return = v, g)
    }
    function f(v, g, x) {
        if (typeof g == "string" && g !== "" || typeof g == "number")
            return g = Xc("" + g, v.mode, x), g.return = v, g;
        if (typeof g == "object" && g !== null) {
            switch (g.$$typeof) {
            case ta:
                return x = $a(g.type, g.key, g.props, null, v.mode, x), x.ref = Ms(v, null, g), x.return = v, x;
            case bi:
                return g = Zc(g, v.mode, x), g.return = v, g;
            case qn:
                var S = g._init;
                return f(v, S(g._payload), x)
            }
            if (Fs(g) || Ps(g))
                return g = Yr(g, v.mode, x, null), g.return = v, g;
            fa(v, g)
        }
        return null
    }
    function h(v, g, x, S) {
        var C = g !== null ? g.key : null;
        if (typeof x == "string" && x !== "" || typeof x == "number")
            return C !== null ? null : a(v, g, "" + x, S);
        if (typeof x == "object" && x !== null) {
            switch (x.$$typeof) {
            case ta:
                return x.key === C ? l(v, g, x, S) : null;
            case bi:
                return x.key === C ? u(v, g, x, S) : null;
            case qn:
                return C = x._init, h(v, g, C(x._payload), S)
            }
            if (Fs(x) || Ps(x))
                return C !== null ? null : d(v, g, x, S, null);
            fa(v, x)
        }
        return null
    }
    function p(v, g, x, S, C) {
        if (typeof S == "string" && S !== "" || typeof S == "number")
            return v = v.get(x) || null, a(g, v, "" + S, C);
        if (typeof S == "object" && S !== null) {
            switch (S.$$typeof) {
            case ta:
                return v = v.get(S.key === null ? x : S.key) || null, l(g, v, S, C);
            case bi:
                return v = v.get(S.key === null ? x : S.key) || null, u(g, v, S, C);
            case qn:
                var E = S._init;
                return p(v, g, x, E(S._payload), C)
            }
            if (Fs(S) || Ps(S))
                return v = v.get(x) || null, d(g, v, S, C, null);
            fa(g, S)
        }
        return null
    }
    function b(v, g, x, S) {
        for (var C = null, E = null, N = g, T = g = 0, k = null; N !== null && T < x.length; T++) {
            N.index > T ? (k = N, N = null) : k = N.sibling;
            var A = h(v, N, x[T], S);
            if (A === null) {
                N === null && (N = k);
                break
            }
            e && N && A.alternate === null && t(v, N),
            g = s(A, g, T),
            E === null ? C = A : E.sibling = A,
            E = A,
            N = k
        }
        if (T === x.length)
            return n(v, N), we && Dr(v, T), C;
        if (N === null) {
            for (; T < x.length; T++)
                N = f(v, x[T], S),
                N !== null && (g = s(N, g, T), E === null ? C = N : E.sibling = N, E = N);
            return we && Dr(v, T), C
        }
        for (N = r(v, N); T < x.length; T++)
            k = p(N, v, T, x[T], S),
            k !== null && (e && k.alternate !== null && N.delete(k.key === null ? T : k.key), g = s(k, g, T), E === null ? C = k : E.sibling = k, E = k);
        return e && N.forEach(function(z) {
            return t(v, z)
        }), we && Dr(v, T), C
    }
    function m(v, g, x, S) {
        var C = Ps(x);
        if (typeof C != "function")
            throw Error(M(150));
        if (x = C.call(x), x == null)
            throw Error(M(151));
        for (var E = C = null, N = g, T = g = 0, k = null, A = x.next(); N !== null && !A.done; T++, A = x.next()) {
            N.index > T ? (k = N, N = null) : k = N.sibling;
            var z = h(v, N, A.value, S);
            if (z === null) {
                N === null && (N = k);
                break
            }
            e && N && z.alternate === null && t(v, N),
            g = s(z, g, T),
            E === null ? C = z : E.sibling = z,
            E = z,
            N = k
        }
        if (A.done)
            return n(v, N), we && Dr(v, T), C;
        if (N === null) {
            for (; !A.done; T++, A = x.next())
                A = f(v, A.value, S),
                A !== null && (g = s(A, g, T), E === null ? C = A : E.sibling = A, E = A);
            return we && Dr(v, T), C
        }
        for (N = r(v, N); !A.done; T++, A = x.next())
            A = p(N, v, T, A.value, S),
            A !== null && (e && A.alternate !== null && N.delete(A.key === null ? T : A.key), g = s(A, g, T), E === null ? C = A : E.sibling = A, E = A);
        return e && N.forEach(function(D) {
            return t(v, D)
        }), we && Dr(v, T), C
    }
    function w(v, g, x, S) {
        if (typeof x == "object" && x !== null && x.type === Si && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
            switch (x.$$typeof) {
            case ta:
                e:
                {
                    for (var C = x.key, E = g; E !== null;) {
                        if (E.key === C) {
                            if (C = x.type, C === Si) {
                                if (E.tag === 7) {
                                    n(v, E.sibling),
                                    g = i(E, x.props.children),
                                    g.return = v,
                                    v = g;
                                    break e
                                }
                            } else if (E.elementType === C || typeof C == "object" && C !== null && C.$$typeof === qn && hm(C) === E.type) {
                                n(v, E.sibling),
                                g = i(E, x.props),
                                g.ref = Ms(v, E, x),
                                g.return = v,
                                v = g;
                                break e
                            }
                            n(v, E);
                            break
                        } else
                            t(v, E);
                        E = E.sibling
                    }
                    x.type === Si ? (g = Yr(x.props.children, v.mode, S, x.key), g.return = v, v = g) : (S = $a(x.type, x.key, x.props, null, v.mode, S), S.ref = Ms(v, g, x), S.return = v, v = S)
                }return o(v);
            case bi:
                e:
                {
                    for (E = x.key; g !== null;) {
                        if (g.key === E)
                            if (g.tag === 4 && g.stateNode.containerInfo === x.containerInfo && g.stateNode.implementation === x.implementation) {
                                n(v, g.sibling),
                                g = i(g, x.children || []),
                                g.return = v,
                                v = g;
                                break e
                            } else {
                                n(v, g);
                                break
                            }
                        else
                            t(v, g);
                        g = g.sibling
                    }
                    g = Zc(x, v.mode, S),
                    g.return = v,
                    v = g
                }return o(v);
            case qn:
                return E = x._init, w(v, g, E(x._payload), S)
            }
            if (Fs(x))
                return b(v, g, x, S);
            if (Ps(x))
                return m(v, g, x, S);
            fa(v, x)
        }
        return typeof x == "string" && x !== "" || typeof x == "number" ? (x = "" + x, g !== null && g.tag === 6 ? (n(v, g.sibling), g = i(g, x), g.return = v, v = g) : (n(v, g), g = Xc(x, v.mode, S), g.return = v, v = g), o(v)) : n(v, g)
    }
    return w
}
var is = bx(!0),
    Sx = bx(!1),
    dl = Cr(null),
    fl = null,
    Ri = null,
    qf = null;
function Qf() {
    qf = Ri = fl = null
}
function Yf(e) {
    var t = dl.current;
    ye(dl),
    e._currentValue = t
}
function hd(e, t, n) {
    for (; e !== null;) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)
            break;
        e = e.return
    }
}
function Bi(e, t) {
    fl = e,
    qf = Ri = null,
    e = e.dependencies,
    e !== null && e.firstContext !== null && (e.lanes & t && (dt = !0), e.firstContext = null)
}
function Dt(e) {
    var t = e._currentValue;
    if (qf !== e)
        if (e = {
            context: e,
            memoizedValue: t,
            next: null
        }, Ri === null) {
            if (fl === null)
                throw Error(M(308));
            Ri = e,
            fl.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else
            Ri = Ri.next = e;
    return t
}
var Fr = null;
function Xf(e) {
    Fr === null ? Fr = [e] : Fr.push(e)
}
function Cx(e, t, n, r) {
    var i = t.interleaved;
    return i === null ? (n.next = n, Xf(t)) : (n.next = i.next, i.next = n), t.interleaved = n, Mn(e, r)
}
function Mn(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;)
        e.childLanes |= t,
        n = e.alternate,
        n !== null && (n.childLanes |= t),
        n = e,
        e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var Qn = !1;
function Zf(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}
function Ex(e, t) {
    e = e.updateQueue,
    t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}
function kn(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}
function dr(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
        return null;
    if (r = r.shared, re & 2) {
        var i = r.pending;
        return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, Mn(e, n)
    }
    return i = r.interleaved, i === null ? (t.next = t, Xf(r)) : (t.next = i.next, i.next = t), r.interleaved = t, Mn(e, n)
}
function La(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        _f(e, n)
    }
}
function pm(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
        var i = null,
            s = null;
        if (n = n.firstBaseUpdate, n !== null) {
            do {
                var o = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                s === null ? i = s = o : s = s.next = o,
                n = n.next
            } while (n !== null);
            s === null ? i = s = t : s = s.next = t
        } else
            i = s = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: i,
            lastBaseUpdate: s,
            shared: r.shared,
            effects: r.effects
        },
        e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate,
    e === null ? n.firstBaseUpdate = t : e.next = t,
    n.lastBaseUpdate = t
}
function hl(e, t, n, r) {
    var i = e.updateQueue;
    Qn = !1;
    var s = i.firstBaseUpdate,
        o = i.lastBaseUpdate,
        a = i.shared.pending;
    if (a !== null) {
        i.shared.pending = null;
        var l = a,
            u = l.next;
        l.next = null,
        o === null ? s = u : o.next = u,
        o = l;
        var d = e.alternate;
        d !== null && (d = d.updateQueue, a = d.lastBaseUpdate, a !== o && (a === null ? d.firstBaseUpdate = u : a.next = u, d.lastBaseUpdate = l))
    }
    if (s !== null) {
        var f = i.baseState;
        o = 0,
        d = u = l = null,
        a = s;
        do {
            var h = a.lane,
                p = a.eventTime;
            if ((r & h) === h) {
                d !== null && (d = d.next = {
                    eventTime: p,
                    lane: 0,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null
                });
                e:
                {
                    var b = e,
                        m = a;
                    switch (h = t, p = n, m.tag) {
                    case 1:
                        if (b = m.payload, typeof b == "function") {
                            f = b.call(p, f, h);
                            break e
                        }
                        f = b;
                        break e;
                    case 3:
                        b.flags = b.flags & -65537 | 128;
                    case 0:
                        if (b = m.payload, h = typeof b == "function" ? b.call(p, f, h) : b, h == null)
                            break e;
                        f = Ne({}, f, h);
                        break e;
                    case 2:
                        Qn = !0
                    }
                }a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = i.effects, h === null ? i.effects = [a] : h.push(a))
            } else
                p = {
                    eventTime: p,
                    lane: h,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null
                },
                d === null ? (u = d = p, l = f) : d = d.next = p,
                o |= h;
            if (a = a.next, a === null) {
                if (a = i.shared.pending, a === null)
                    break;
                h = a,
                a = h.next,
                h.next = null,
                i.lastBaseUpdate = h,
                i.shared.pending = null
            }
        } while (!0);
        if (d === null && (l = f), i.baseState = l, i.firstBaseUpdate = u, i.lastBaseUpdate = d, t = i.shared.interleaved, t !== null) {
            i = t;
            do o |= i.lane,
            i = i.next;
            while (i !== t)
        } else
            s === null && (i.shared.lanes = 0);
        ti |= o,
        e.lanes = o,
        e.memoizedState = f
    }
}
function mm(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                i = r.callback;
            if (i !== null) {
                if (r.callback = null, r = n, typeof i != "function")
                    throw Error(M(191, i));
                i.call(r)
            }
        }
}
var Bo = {},
    mn = Cr(Bo),
    yo = Cr(Bo),
    vo = Cr(Bo);
function zr(e) {
    if (e === Bo)
        throw Error(M(174));
    return e
}
function Jf(e, t) {
    switch (he(vo, t), he(yo, e), he(mn, Bo), e = t.nodeType, e) {
    case 9:
    case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Gu(null, "");
        break;
    default:
        e = e === 8 ? t.parentNode : t,
        t = e.namespaceURI || null,
        e = e.tagName,
        t = Gu(t, e)
    }
    ye(mn),
    he(mn, t)
}
function ss() {
    ye(mn),
    ye(yo),
    ye(vo)
}
function Nx(e) {
    zr(vo.current);
    var t = zr(mn.current),
        n = Gu(t, e.type);
    t !== n && (he(yo, e), he(mn, n))
}
function eh(e) {
    yo.current === e && (ye(mn), ye(yo))
}
var Se = Cr(0);
function pl(e) {
    for (var t = e; t !== null;) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!"))
                return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128)
                return t
        } else if (t.child !== null) {
            t.child.return = t,
            t = t.child;
            continue
        }
        if (t === e)
            break;
        for (; t.sibling === null;) {
            if (t.return === null || t.return === e)
                return null;
            t = t.return
        }
        t.sibling.return = t.return,
        t = t.sibling
    }
    return null
}
var Hc = [];
function th() {
    for (var e = 0; e < Hc.length; e++)
        Hc[e]._workInProgressVersionPrimary = null;
    Hc.length = 0
}
var _a = _n.ReactCurrentDispatcher,
    Kc = _n.ReactCurrentBatchConfig,
    ei = 0,
    Ee = null,
    Le = null,
    Fe = null,
    ml = !1,
    Ys = !1,
    xo = 0,
    UE = 0;
function qe() {
    throw Error(M(321))
}
function nh(e, t) {
    if (t === null)
        return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!tn(e[n], t[n]))
            return !1;
    return !0
}
function rh(e, t, n, r, i, s) {
    if (ei = s, Ee = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _a.current = e === null || e.memoizedState === null ? GE : qE, e = n(r, i), Ys) {
        s = 0;
        do {
            if (Ys = !1, xo = 0, 25 <= s)
                throw Error(M(301));
            s += 1,
            Fe = Le = null,
            t.updateQueue = null,
            _a.current = QE,
            e = n(r, i)
        } while (Ys)
    }
    if (_a.current = gl, t = Le !== null && Le.next !== null, ei = 0, Fe = Le = Ee = null, ml = !1, t)
        throw Error(M(300));
    return e
}
function ih() {
    var e = xo !== 0;
    return xo = 0, e
}
function an() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return Fe === null ? Ee.memoizedState = Fe = e : Fe = Fe.next = e, Fe
}
function Lt() {
    if (Le === null) {
        var e = Ee.alternate;
        e = e !== null ? e.memoizedState : null
    } else
        e = Le.next;
    var t = Fe === null ? Ee.memoizedState : Fe.next;
    if (t !== null)
        Fe = t,
        Le = e;
    else {
        if (e === null)
            throw Error(M(310));
        Le = e,
        e = {
            memoizedState: Le.memoizedState,
            baseState: Le.baseState,
            baseQueue: Le.baseQueue,
            queue: Le.queue,
            next: null
        },
        Fe === null ? Ee.memoizedState = Fe = e : Fe = Fe.next = e
    }
    return Fe
}
function wo(e, t) {
    return typeof t == "function" ? t(e) : t
}
function Gc(e) {
    var t = Lt(),
        n = t.queue;
    if (n === null)
        throw Error(M(311));
    n.lastRenderedReducer = e;
    var r = Le,
        i = r.baseQueue,
        s = n.pending;
    if (s !== null) {
        if (i !== null) {
            var o = i.next;
            i.next = s.next,
            s.next = o
        }
        r.baseQueue = i = s,
        n.pending = null
    }
    if (i !== null) {
        s = i.next,
        r = r.baseState;
        var a = o = null,
            l = null,
            u = s;
        do {
            var d = u.lane;
            if ((ei & d) === d)
                l !== null && (l = l.next = {
                    lane: 0,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null
                }),
                r = u.hasEagerState ? u.eagerState : e(r, u.action);
            else {
                var f = {
                    lane: d,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null
                };
                l === null ? (a = l = f, o = r) : l = l.next = f,
                Ee.lanes |= d,
                ti |= d
            }
            u = u.next
        } while (u !== null && u !== s);
        l === null ? o = r : l.next = a,
        tn(r, t.memoizedState) || (dt = !0),
        t.memoizedState = r,
        t.baseState = o,
        t.baseQueue = l,
        n.lastRenderedState = r
    }
    if (e = n.interleaved, e !== null) {
        i = e;
        do s = i.lane,
        Ee.lanes |= s,
        ti |= s,
        i = i.next;
        while (i !== e)
    } else
        i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}
function qc(e) {
    var t = Lt(),
        n = t.queue;
    if (n === null)
        throw Error(M(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        i = n.pending,
        s = t.memoizedState;
    if (i !== null) {
        n.pending = null;
        var o = i = i.next;
        do s = e(s, o.action),
        o = o.next;
        while (o !== i);
        tn(s, t.memoizedState) || (dt = !0),
        t.memoizedState = s,
        t.baseQueue === null && (t.baseState = s),
        n.lastRenderedState = s
    }
    return [s, r]
}
function Tx() {}
function Px(e, t) {
    var n = Ee,
        r = Lt(),
        i = t(),
        s = !tn(r.memoizedState, i);
    if (s && (r.memoizedState = i, dt = !0), r = r.queue, sh(Rx.bind(null, n, r, e), [e]), r.getSnapshot !== t || s || Fe !== null && Fe.memoizedState.tag & 1) {
        if (n.flags |= 2048, bo(9, kx.bind(null, n, r, i, t), void 0, null), ze === null)
            throw Error(M(349));
        ei & 30 || jx(n, t, i)
    }
    return i
}
function jx(e, t, n) {
    e.flags |= 16384,
    e = {
        getSnapshot: t,
        value: n
    },
    t = Ee.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    }, Ee.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e))
}
function kx(e, t, n, r) {
    t.value = n,
    t.getSnapshot = r,
    Ax(t) && Mx(e)
}
function Rx(e, t, n) {
    return n(function() {
        Ax(t) && Mx(e)
    })
}
function Ax(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !tn(e, n)
    } catch {
        return !0
    }
}
function Mx(e) {
    var t = Mn(e, 1);
    t !== null && Jt(t, e, 1, -1)
}
function gm(e) {
    var t = an();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: wo,
        lastRenderedState: e
    }, t.queue = e, e = e.dispatch = KE.bind(null, Ee, e), [t.memoizedState, e]
}
function bo(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    }, t = Ee.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, Ee.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e
}
function Ox() {
    return Lt().memoizedState
}
function Va(e, t, n, r) {
    var i = an();
    Ee.flags |= e,
    i.memoizedState = bo(1 | t, n, void 0, r === void 0 ? null : r)
}
function Wl(e, t, n, r) {
    var i = Lt();
    r = r === void 0 ? null : r;
    var s = void 0;
    if (Le !== null) {
        var o = Le.memoizedState;
        if (s = o.destroy, r !== null && nh(r, o.deps)) {
            i.memoizedState = bo(t, n, s, r);
            return
        }
    }
    Ee.flags |= e,
    i.memoizedState = bo(1 | t, n, s, r)
}
function ym(e, t) {
    return Va(8390656, 8, e, t)
}
function sh(e, t) {
    return Wl(2048, 8, e, t)
}
function Ix(e, t) {
    return Wl(4, 2, e, t)
}
function Dx(e, t) {
    return Wl(4, 4, e, t)
}
function Lx(e, t) {
    if (typeof t == "function")
        return e = e(), t(e), function() {
            t(null)
        };
    if (t != null)
        return e = e(), t.current = e, function() {
            t.current = null
        }
}
function _x(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Wl(4, 4, Lx.bind(null, t, e), n)
}
function oh() {}
function Vx(e, t) {
    var n = Lt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && nh(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
}
function Fx(e, t) {
    var n = Lt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && nh(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
}
function zx(e, t, n) {
    return ei & 21 ? (tn(n, t) || (n = Hv(), Ee.lanes |= n, ti |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, dt = !0), e.memoizedState = n)
}
function WE(e, t) {
    var n = ce;
    ce = n !== 0 && 4 > n ? n : 4,
    e(!0);
    var r = Kc.transition;
    Kc.transition = {};
    try {
        e(!1),
        t()
    } finally {
        ce = n,
        Kc.transition = r
    }
}
function Bx() {
    return Lt().memoizedState
}
function HE(e, t, n) {
    var r = hr(e);
    if (n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    }, $x(e))
        Ux(t, n);
    else if (n = Cx(e, t, n, r), n !== null) {
        var i = ot();
        Jt(n, e, r, i),
        Wx(n, t, r)
    }
}
function KE(e, t, n) {
    var r = hr(e),
        i = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
    if ($x(e))
        Ux(t, i);
    else {
        var s = e.alternate;
        if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer, s !== null))
            try {
                var o = t.lastRenderedState,
                    a = s(o, n);
                if (i.hasEagerState = !0, i.eagerState = a, tn(a, o)) {
                    var l = t.interleaved;
                    l === null ? (i.next = i, Xf(t)) : (i.next = l.next, l.next = i),
                    t.interleaved = i;
                    return
                }
            } catch {} finally {}
        n = Cx(e, t, i, r),
        n !== null && (i = ot(), Jt(n, e, r, i), Wx(n, t, r))
    }
}
function $x(e) {
    var t = e.alternate;
    return e === Ee || t !== null && t === Ee
}
function Ux(e, t) {
    Ys = ml = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t),
    e.pending = t
}
function Wx(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        _f(e, n)
    }
}
var gl = {
        readContext: Dt,
        useCallback: qe,
        useContext: qe,
        useEffect: qe,
        useImperativeHandle: qe,
        useInsertionEffect: qe,
        useLayoutEffect: qe,
        useMemo: qe,
        useReducer: qe,
        useRef: qe,
        useState: qe,
        useDebugValue: qe,
        useDeferredValue: qe,
        useTransition: qe,
        useMutableSource: qe,
        useSyncExternalStore: qe,
        useId: qe,
        unstable_isNewReconciler: !1
    },
    GE = {
        readContext: Dt,
        useCallback: function(e, t) {
            return an().memoizedState = [e, t === void 0 ? null : t], e
        },
        useContext: Dt,
        useEffect: ym,
        useImperativeHandle: function(e, t, n) {
            return n = n != null ? n.concat([e]) : null, Va(4194308, 4, Lx.bind(null, t, e), n)
        },
        useLayoutEffect: function(e, t) {
            return Va(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            return Va(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var n = an();
            return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e
        },
        useReducer: function(e, t, n) {
            var r = an();
            return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t
            }, r.queue = e, e = e.dispatch = HE.bind(null, Ee, e), [r.memoizedState, e]
        },
        useRef: function(e) {
            var t = an();
            return e = {
                current: e
            }, t.memoizedState = e
        },
        useState: gm,
        useDebugValue: oh,
        useDeferredValue: function(e) {
            return an().memoizedState = e
        },
        useTransition: function() {
            var e = gm(!1),
                t = e[0];
            return e = WE.bind(null, e[1]), an().memoizedState = e, [t, e]
        },
        useMutableSource: function() {},
        useSyncExternalStore: function(e, t, n) {
            var r = Ee,
                i = an();
            if (we) {
                if (n === void 0)
                    throw Error(M(407));
                n = n()
            } else {
                if (n = t(), ze === null)
                    throw Error(M(349));
                ei & 30 || jx(r, t, n)
            }
            i.memoizedState = n;
            var s = {
                value: n,
                getSnapshot: t
            };
            return i.queue = s, ym(Rx.bind(null, r, s, e), [e]), r.flags |= 2048, bo(9, kx.bind(null, r, s, n, t), void 0, null), n
        },
        useId: function() {
            var e = an(),
                t = ze.identifierPrefix;
            if (we) {
                var n = jn,
                    r = Pn;
                n = (r & ~(1 << 32 - Zt(r) - 1)).toString(32) + n,
                t = ":" + t + "R" + n,
                n = xo++,
                0 < n && (t += "H" + n.toString(32)),
                t += ":"
            } else
                n = UE++,
                t = ":" + t + "r" + n.toString(32) + ":";
            return e.memoizedState = t
        },
        unstable_isNewReconciler: !1
    },
    qE = {
        readContext: Dt,
        useCallback: Vx,
        useContext: Dt,
        useEffect: sh,
        useImperativeHandle: _x,
        useInsertionEffect: Ix,
        useLayoutEffect: Dx,
        useMemo: Fx,
        useReducer: Gc,
        useRef: Ox,
        useState: function() {
            return Gc(wo)
        },
        useDebugValue: oh,
        useDeferredValue: function(e) {
            var t = Lt();
            return zx(t, Le.memoizedState, e)
        },
        useTransition: function() {
            var e = Gc(wo)[0],
                t = Lt().memoizedState;
            return [e, t]
        },
        useMutableSource: Tx,
        useSyncExternalStore: Px,
        useId: Bx,
        unstable_isNewReconciler: !1
    },
    QE = {
        readContext: Dt,
        useCallback: Vx,
        useContext: Dt,
        useEffect: sh,
        useImperativeHandle: _x,
        useInsertionEffect: Ix,
        useLayoutEffect: Dx,
        useMemo: Fx,
        useReducer: qc,
        useRef: Ox,
        useState: function() {
            return qc(wo)
        },
        useDebugValue: oh,
        useDeferredValue: function(e) {
            var t = Lt();
            return Le === null ? t.memoizedState = e : zx(t, Le.memoizedState, e)
        },
        useTransition: function() {
            var e = qc(wo)[0],
                t = Lt().memoizedState;
            return [e, t]
        },
        useMutableSource: Tx,
        useSyncExternalStore: Px,
        useId: Bx,
        unstable_isNewReconciler: !1
    };
function Ht(e, t) {
    if (e && e.defaultProps) {
        t = Ne({}, t),
        e = e.defaultProps;
        for (var n in e)
            t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}
function pd(e, t, n, r) {
    t = e.memoizedState,
    n = n(r, t),
    n = n == null ? t : Ne({}, t, n),
    e.memoizedState = n,
    e.lanes === 0 && (e.updateQueue.baseState = n)
}
var Hl = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? li(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = ot(),
            i = hr(e),
            s = kn(r, i);
        s.payload = t,
        n != null && (s.callback = n),
        t = dr(e, s, i),
        t !== null && (Jt(t, e, i, r), La(t, e, i))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = ot(),
            i = hr(e),
            s = kn(r, i);
        s.tag = 1,
        s.payload = t,
        n != null && (s.callback = n),
        t = dr(e, s, i),
        t !== null && (Jt(t, e, i, r), La(t, e, i))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = ot(),
            r = hr(e),
            i = kn(n, r);
        i.tag = 2,
        t != null && (i.callback = t),
        t = dr(e, i, r),
        t !== null && (Jt(t, e, r, n), La(t, e, r))
    }
};
function vm(e, t, n, r, i, s, o) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, s, o) : t.prototype && t.prototype.isPureReactComponent ? !ho(n, r) || !ho(i, s) : !0
}
function Hx(e, t, n) {
    var r = !1,
        i = yr,
        s = t.contextType;
    return typeof s == "object" && s !== null ? s = Dt(s) : (i = ht(t) ? Zr : Je.current, r = t.contextTypes, s = (r = r != null) ? ns(e, i) : yr), t = new t(n, s), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Hl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = s), t
}
function xm(e, t, n, r) {
    e = t.state,
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Hl.enqueueReplaceState(t, t.state, null)
}
function md(e, t, n, r) {
    var i = e.stateNode;
    i.props = n,
    i.state = e.memoizedState,
    i.refs = {},
    Zf(e);
    var s = t.contextType;
    typeof s == "object" && s !== null ? i.context = Dt(s) : (s = ht(t) ? Zr : Je.current, i.context = ns(e, s)),
    i.state = e.memoizedState,
    s = t.getDerivedStateFromProps,
    typeof s == "function" && (pd(e, t, s, n), i.state = e.memoizedState),
    typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && Hl.enqueueReplaceState(i, i.state, null), hl(e, n, i, r), i.state = e.memoizedState),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308)
}
function os(e, t) {
    try {
        var n = "",
            r = t;
        do n += CC(r),
        r = r.return;
        while (r);
        var i = n
    } catch (s) {
        i = `
Error generating stack: `
        + s.message + `
`
        + s.stack
    }
    return {
        value: e,
        source: t,
        stack: i,
        digest: null
    }
}
function Qc(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}
function gd(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var YE = typeof WeakMap == "function" ? WeakMap : Map;
function Kx(e, t, n) {
    n = kn(-1, n),
    n.tag = 3,
    n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        vl || (vl = !0, Td = r),
        gd(e, t)
    }, n
}
function Gx(e, t, n) {
    n = kn(-1, n),
    n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var i = t.value;
        n.payload = function() {
            return r(i)
        },
        n.callback = function() {
            gd(e, t)
        }
    }
    var s = e.stateNode;
    return s !== null && typeof s.componentDidCatch == "function" && (n.callback = function() {
        gd(e, t),
        typeof r != "function" && (fr === null ? fr = new Set([this]) : fr.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: o !== null ? o : ""
        })
    }), n
}
function wm(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new YE;
        var i = new Set;
        r.set(t, i)
    } else
        i = r.get(t),
        i === void 0 && (i = new Set, r.set(t, i));
    i.has(n) || (i.add(n), e = uN.bind(null, e, t, n), t.then(e, e))
}
function bm(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t)
            return e;
        e = e.return
    } while (e !== null);
    return null
}
function Sm(e, t, n, r, i) {
    return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = kn(-1, 1), t.tag = 2, dr(n, t, 1))), n.lanes |= 1), e)
}
var XE = _n.ReactCurrentOwner,
    dt = !1;
function tt(e, t, n, r) {
    t.child = e === null ? Sx(t, null, n, r) : is(t, e.child, n, r)
}
function Cm(e, t, n, r, i) {
    n = n.render;
    var s = t.ref;
    return Bi(t, i), r = rh(e, t, n, r, s, i), n = ih(), e !== null && !dt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, On(e, t, i)) : (we && n && Hf(t), t.flags |= 1, tt(e, t, r, i), t.child)
}
function Em(e, t, n, r, i) {
    if (e === null) {
        var s = n.type;
        return typeof s == "function" && !ph(s) && s.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = s, qx(e, t, s, r, i)) : (e = $a(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e)
    }
    if (s = e.child, !(e.lanes & i)) {
        var o = s.memoizedProps;
        if (n = n.compare, n = n !== null ? n : ho, n(o, r) && e.ref === t.ref)
            return On(e, t, i)
    }
    return t.flags |= 1, e = pr(s, r), e.ref = t.ref, e.return = t, t.child = e
}
function qx(e, t, n, r, i) {
    if (e !== null) {
        var s = e.memoizedProps;
        if (ho(s, r) && e.ref === t.ref)
            if (dt = !1, t.pendingProps = r = s, (e.lanes & i) !== 0)
                e.flags & 131072 && (dt = !0);
            else
                return t.lanes = e.lanes, On(e, t, i)
    }
    return yd(e, t, n, r, i)
}
function Qx(e, t, n) {
    var r = t.pendingProps,
        i = r.children,
        s = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            he(Mi, mt),
            mt |= n;
        else {
            if (!(n & 1073741824))
                return e = s !== null ? s.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null
                }, t.updateQueue = null, he(Mi, mt), mt |= e, null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            r = s !== null ? s.baseLanes : n,
            he(Mi, mt),
            mt |= r
        }
    else
        s !== null ? (r = s.baseLanes | n, t.memoizedState = null) : r = n,
        he(Mi, mt),
        mt |= r;
    return tt(e, t, i, n), t.child
}
function Yx(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152)
}
function yd(e, t, n, r, i) {
    var s = ht(n) ? Zr : Je.current;
    return s = ns(t, s), Bi(t, i), n = rh(e, t, n, r, s, i), r = ih(), e !== null && !dt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, On(e, t, i)) : (we && r && Hf(t), t.flags |= 1, tt(e, t, n, i), t.child)
}
function Nm(e, t, n, r, i) {
    if (ht(n)) {
        var s = !0;
        ll(t)
    } else
        s = !1;
    if (Bi(t, i), t.stateNode === null)
        Fa(e, t),
        Hx(t, n, r),
        md(t, n, r, i),
        r = !0;
    else if (e === null) {
        var o = t.stateNode,
            a = t.memoizedProps;
        o.props = a;
        var l = o.context,
            u = n.contextType;
        typeof u == "object" && u !== null ? u = Dt(u) : (u = ht(n) ? Zr : Je.current, u = ns(t, u));
        var d = n.getDerivedStateFromProps,
            f = typeof d == "function" || typeof o.getSnapshotBeforeUpdate == "function";
        f || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== r || l !== u) && xm(t, o, r, u),
        Qn = !1;
        var h = t.memoizedState;
        o.state = h,
        hl(t, r, o, i),
        l = t.memoizedState,
        a !== r || h !== l || ft.current || Qn ? (typeof d == "function" && (pd(t, n, d, r), l = t.memoizedState), (a = Qn || vm(t, n, a, r, h, l, u)) ? (f || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), o.props = r, o.state = l, o.context = u, r = a) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1)
    } else {
        o = t.stateNode,
        Ex(e, t),
        a = t.memoizedProps,
        u = t.type === t.elementType ? a : Ht(t.type, a),
        o.props = u,
        f = t.pendingProps,
        h = o.context,
        l = n.contextType,
        typeof l == "object" && l !== null ? l = Dt(l) : (l = ht(n) ? Zr : Je.current, l = ns(t, l));
        var p = n.getDerivedStateFromProps;
        (d = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== f || h !== l) && xm(t, o, r, l),
        Qn = !1,
        h = t.memoizedState,
        o.state = h,
        hl(t, r, o, i);
        var b = t.memoizedState;
        a !== f || h !== b || ft.current || Qn ? (typeof p == "function" && (pd(t, n, p, r), b = t.memoizedState), (u = Qn || vm(t, n, u, r, h, b, l) || !1) ? (d || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, b, l), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, b, l)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = b), o.props = r, o.state = b, o.context = l, r = u) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1)
    }
    return vd(e, t, n, r, s, i)
}
function vd(e, t, n, r, i, s) {
    Yx(e, t);
    var o = (t.flags & 128) !== 0;
    if (!r && !o)
        return i && um(t, n, !1), On(e, t, s);
    r = t.stateNode,
    XE.current = t;
    var a = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && o ? (t.child = is(t, e.child, null, s), t.child = is(t, null, a, s)) : tt(e, t, a, s), t.memoizedState = r.state, i && um(t, n, !0), t.child
}
function Xx(e) {
    var t = e.stateNode;
    t.pendingContext ? cm(e, t.pendingContext, t.pendingContext !== t.context) : t.context && cm(e, t.context, !1),
    Jf(e, t.containerInfo)
}
function Tm(e, t, n, r, i) {
    return rs(), Gf(i), t.flags |= 256, tt(e, t, n, r), t.child
}
var xd = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};
function wd(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}
function Zx(e, t, n) {
    var r = t.pendingProps,
        i = Se.current,
        s = !1,
        o = (t.flags & 128) !== 0,
        a;
    if ((a = o) || (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), a ? (s = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), he(Se, i & 1), e === null)
        return fd(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, s ? (r = t.mode, s = t.child, o = {
            mode: "hidden",
            children: o
        }, !(r & 1) && s !== null ? (s.childLanes = 0, s.pendingProps = o) : s = ql(o, r, 0, null), e = Yr(e, r, n, null), s.return = t, e.return = t, s.sibling = e, t.child = s, t.child.memoizedState = wd(n), t.memoizedState = xd, e) : ah(t, o));
    if (i = e.memoizedState, i !== null && (a = i.dehydrated, a !== null))
        return ZE(e, t, o, r, a, i, n);
    if (s) {
        s = r.fallback,
        o = t.mode,
        i = e.child,
        a = i.sibling;
        var l = {
            mode: "hidden",
            children: r.children
        };
        return !(o & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = l, t.deletions = null) : (r = pr(i, l), r.subtreeFlags = i.subtreeFlags & 14680064), a !== null ? s = pr(a, s) : (s = Yr(s, o, n, null), s.flags |= 2), s.return = t, r.return = t, r.sibling = s, t.child = r, r = s, s = t.child, o = e.child.memoizedState, o = o === null ? wd(n) : {
            baseLanes: o.baseLanes | n,
            cachePool: null,
            transitions: o.transitions
        }, s.memoizedState = o, s.childLanes = e.childLanes & ~n, t.memoizedState = xd, r
    }
    return s = e.child, e = s.sibling, r = pr(s, {
        mode: "visible",
        children: r.children
    }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r
}
function ah(e, t) {
    return t = ql({
        mode: "visible",
        children: t
    }, e.mode, 0, null), t.return = e, e.child = t
}
function ha(e, t, n, r) {
    return r !== null && Gf(r), is(t, e.child, null, n), e = ah(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
}
function ZE(e, t, n, r, i, s, o) {
    if (n)
        return t.flags & 256 ? (t.flags &= -257, r = Qc(Error(M(422))), ha(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (s = r.fallback, i = t.mode, r = ql({
            mode: "visible",
            children: r.children
        }, i, 0, null), s = Yr(s, i, o, null), s.flags |= 2, r.return = t, s.return = t, r.sibling = s, t.child = r, t.mode & 1 && is(t, e.child, null, o), t.child.memoizedState = wd(o), t.memoizedState = xd, s);
    if (!(t.mode & 1))
        return ha(e, t, o, null);
    if (i.data === "$!") {
        if (r = i.nextSibling && i.nextSibling.dataset, r)
            var a = r.dgst;
        return r = a, s = Error(M(419)), r = Qc(s, r, void 0), ha(e, t, o, r)
    }
    if (a = (o & e.childLanes) !== 0, dt || a) {
        if (r = ze, r !== null) {
            switch (o & -o) {
            case 4:
                i = 2;
                break;
            case 16:
                i = 8;
                break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
                i = 32;
                break;
            case 536870912:
                i = 268435456;
                break;
            default:
                i = 0
            }
            i = i & (r.suspendedLanes | o) ? 0 : i,
            i !== 0 && i !== s.retryLane && (s.retryLane = i, Mn(e, i), Jt(r, e, i, -1))
        }
        return hh(), r = Qc(Error(M(421))), ha(e, t, o, r)
    }
    return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = dN.bind(null, e), i._reactRetry = t, null) : (e = s.treeContext, yt = ur(i.nextSibling), vt = t, we = !0, Yt = null, e !== null && (kt[Rt++] = Pn, kt[Rt++] = jn, kt[Rt++] = Jr, Pn = e.id, jn = e.overflow, Jr = t), t = ah(t, r.children), t.flags |= 4096, t)
}
function Pm(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t),
    hd(e.return, t, n)
}
function Yc(e, t, n, r, i) {
    var s = e.memoizedState;
    s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i
    } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = r, s.tail = n, s.tailMode = i)
}
function Jx(e, t, n) {
    var r = t.pendingProps,
        i = r.revealOrder,
        s = r.tail;
    if (tt(e, t, r.children, n), r = Se.current, r & 2)
        r = r & 1 | 2,
        t.flags |= 128;
    else {
        if (e !== null && e.flags & 128)
            e:
            for (e = t.child; e !== null;) {
                if (e.tag === 13)
                    e.memoizedState !== null && Pm(e, n, t);
                else if (e.tag === 19)
                    Pm(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e,
                    e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null;) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                e = e.sibling
            }
        r &= 1
    }
    if (he(Se, r), !(t.mode & 1))
        t.memoizedState = null;
    else
        switch (i) {
        case "forwards":
            for (n = t.child, i = null; n !== null;)
                e = n.alternate,
                e !== null && pl(e) === null && (i = n),
                n = n.sibling;
            n = i,
            n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null),
            Yc(t, !1, i, n, s);
            break;
        case "backwards":
            for (n = null, i = t.child, t.child = null; i !== null;) {
                if (e = i.alternate, e !== null && pl(e) === null) {
                    t.child = i;
                    break
                }
                e = i.sibling,
                i.sibling = n,
                n = i,
                i = e
            }
            Yc(t, !0, n, null, s);
            break;
        case "together":
            Yc(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
        }
    return t.child
}
function Fa(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2)
}
function On(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), ti |= t.lanes, !(n & t.childLanes))
        return null;
    if (e !== null && t.child !== e.child)
        throw Error(M(153));
    if (t.child !== null) {
        for (e = t.child, n = pr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;)
            e = e.sibling,
            n = n.sibling = pr(e, e.pendingProps),
            n.return = t;
        n.sibling = null
    }
    return t.child
}
function JE(e, t, n) {
    switch (t.tag) {
    case 3:
        Xx(t),
        rs();
        break;
    case 5:
        Nx(t);
        break;
    case 1:
        ht(t.type) && ll(t);
        break;
    case 4:
        Jf(t, t.stateNode.containerInfo);
        break;
    case 10:
        var r = t.type._context,
            i = t.memoizedProps.value;
        he(dl, r._currentValue),
        r._currentValue = i;
        break;
    case 13:
        if (r = t.memoizedState, r !== null)
            return r.dehydrated !== null ? (he(Se, Se.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Zx(e, t, n) : (he(Se, Se.current & 1), e = On(e, t, n), e !== null ? e.sibling : null);
        he(Se, Se.current & 1);
        break;
    case 19:
        if (r = (n & t.childLanes) !== 0, e.flags & 128) {
            if (r)
                return Jx(e, t, n);
            t.flags |= 128
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), he(Se, Se.current), r)
            break;
        return null;
    case 22:
    case 23:
        return t.lanes = 0, Qx(e, t, n)
    }
    return On(e, t, n)
}
var e0,
    bd,
    t0,
    n0;
e0 = function(e, t) {
    for (var n = t.child; n !== null;) {
        if (n.tag === 5 || n.tag === 6)
            e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n,
            n = n.child;
            continue
        }
        if (n === t)
            break;
        for (; n.sibling === null;) {
            if (n.return === null || n.return === t)
                return;
            n = n.return
        }
        n.sibling.return = n.return,
        n = n.sibling
    }
};
bd = function() {};
t0 = function(e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
        e = t.stateNode,
        zr(mn.current);
        var s = null;
        switch (n) {
        case "input":
            i = Uu(e, i),
            r = Uu(e, r),
            s = [];
            break;
        case "select":
            i = Ne({}, i, {
                value: void 0
            }),
            r = Ne({}, r, {
                value: void 0
            }),
            s = [];
            break;
        case "textarea":
            i = Ku(e, i),
            r = Ku(e, r),
            s = [];
            break;
        default:
            typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ol)
        }
        qu(n, r);
        var o;
        n = null;
        for (u in i)
            if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
                if (u === "style") {
                    var a = i[u];
                    for (o in a)
                        a.hasOwnProperty(o) && (n || (n = {}), n[o] = "")
                } else
                    u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (so.hasOwnProperty(u) ? s || (s = []) : (s = s || []).push(u, null));
        for (u in r) {
            var l = r[u];
            if (a = i != null ? i[u] : void 0, r.hasOwnProperty(u) && l !== a && (l != null || a != null))
                if (u === "style")
                    if (a) {
                        for (o in a)
                            !a.hasOwnProperty(o) || l && l.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
                        for (o in l)
                            l.hasOwnProperty(o) && a[o] !== l[o] && (n || (n = {}), n[o] = l[o])
                    } else
                        n || (s || (s = []), s.push(u, n)),
                        n = l;
                else
                    u === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, a = a ? a.__html : void 0, l != null && a !== l && (s = s || []).push(u, l)) : u === "children" ? typeof l != "string" && typeof l != "number" || (s = s || []).push(u, "" + l) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (so.hasOwnProperty(u) ? (l != null && u === "onScroll" && ge("scroll", e), s || a === l || (s = [])) : (s = s || []).push(u, l))
        }
        n && (s = s || []).push("style", n);
        var u = s;
        (t.updateQueue = u) && (t.flags |= 4)
    }
};
n0 = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
};
function Os(e, t) {
    if (!we)
        switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null;)
                t.alternate !== null && (n = t),
                t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null;)
                n.alternate !== null && (r = n),
                n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
        }
}
function Qe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var i = e.child; i !== null;)
            n |= i.lanes | i.childLanes,
            r |= i.subtreeFlags & 14680064,
            r |= i.flags & 14680064,
            i.return = e,
            i = i.sibling;
    else
        for (i = e.child; i !== null;)
            n |= i.lanes | i.childLanes,
            r |= i.subtreeFlags,
            r |= i.flags,
            i.return = e,
            i = i.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t
}
function eN(e, t, n) {
    var r = t.pendingProps;
    switch (Kf(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
        return Qe(t), null;
    case 1:
        return ht(t.type) && al(), Qe(t), null;
    case 3:
        return r = t.stateNode, ss(), ye(ft), ye(Je), th(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (da(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Yt !== null && (kd(Yt), Yt = null))), bd(e, t), Qe(t), null;
    case 5:
        eh(t);
        var i = zr(vo.current);
        if (n = t.type, e !== null && t.stateNode != null)
            t0(e, t, n, r, i),
            e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
            if (!r) {
                if (t.stateNode === null)
                    throw Error(M(166));
                return Qe(t), null
            }
            if (e = zr(mn.current), da(t)) {
                r = t.stateNode,
                n = t.type;
                var s = t.memoizedProps;
                switch (r[dn] = t, r[go] = s, e = (t.mode & 1) !== 0, n) {
                case "dialog":
                    ge("cancel", r),
                    ge("close", r);
                    break;
                case "iframe":
                case "object":
                case "embed":
                    ge("load", r);
                    break;
                case "video":
                case "audio":
                    for (i = 0; i < Bs.length; i++)
                        ge(Bs[i], r);
                    break;
                case "source":
                    ge("error", r);
                    break;
                case "img":
                case "image":
                case "link":
                    ge("error", r),
                    ge("load", r);
                    break;
                case "details":
                    ge("toggle", r);
                    break;
                case "input":
                    Lp(r, s),
                    ge("invalid", r);
                    break;
                case "select":
                    r._wrapperState = {
                        wasMultiple: !!s.multiple
                    },
                    ge("invalid", r);
                    break;
                case "textarea":
                    Vp(r, s),
                    ge("invalid", r)
                }
                qu(n, s),
                i = null;
                for (var o in s)
                    if (s.hasOwnProperty(o)) {
                        var a = s[o];
                        o === "children" ? typeof a == "string" ? r.textContent !== a && (s.suppressHydrationWarning !== !0 && ua(r.textContent, a, e), i = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (s.suppressHydrationWarning !== !0 && ua(r.textContent, a, e), i = ["children", "" + a]) : so.hasOwnProperty(o) && a != null && o === "onScroll" && ge("scroll", r)
                    }
                switch (n) {
                case "input":
                    na(r),
                    _p(r, s, !0);
                    break;
                case "textarea":
                    na(r),
                    Fp(r);
                    break;
                case "select":
                case "option":
                    break;
                default:
                    typeof s.onClick == "function" && (r.onclick = ol)
                }
                r = i,
                t.updateQueue = r,
                r !== null && (t.flags |= 4)
            } else {
                o = i.nodeType === 9 ? i : i.ownerDocument,
                e === "http://www.w3.org/1999/xhtml" && (e = Rv(n)),
                e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, {
                    is: r.is
                }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n),
                e[dn] = t,
                e[go] = r,
                e0(e, t, !1, !1),
                t.stateNode = e;
                e:
                {
                    switch (o = Qu(n, r), n) {
                    case "dialog":
                        ge("cancel", e),
                        ge("close", e),
                        i = r;
                        break;
                    case "iframe":
                    case "object":
                    case "embed":
                        ge("load", e),
                        i = r;
                        break;
                    case "video":
                    case "audio":
                        for (i = 0; i < Bs.length; i++)
                            ge(Bs[i], e);
                        i = r;
                        break;
                    case "source":
                        ge("error", e),
                        i = r;
                        break;
                    case "img":
                    case "image":
                    case "link":
                        ge("error", e),
                        ge("load", e),
                        i = r;
                        break;
                    case "details":
                        ge("toggle", e),
                        i = r;
                        break;
                    case "input":
                        Lp(e, r),
                        i = Uu(e, r),
                        ge("invalid", e);
                        break;
                    case "option":
                        i = r;
                        break;
                    case "select":
                        e._wrapperState = {
                            wasMultiple: !!r.multiple
                        },
                        i = Ne({}, r, {
                            value: void 0
                        }),
                        ge("invalid", e);
                        break;
                    case "textarea":
                        Vp(e, r),
                        i = Ku(e, r),
                        ge("invalid", e);
                        break;
                    default:
                        i = r
                    }
                    qu(n, i),
                    a = i;
                    for (s in a)
                        if (a.hasOwnProperty(s)) {
                            var l = a[s];
                            s === "style" ? Ov(e, l) : s === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, l != null && Av(e, l)) : s === "children" ? typeof l == "string" ? (n !== "textarea" || l !== "") && oo(e, l) : typeof l == "number" && oo(e, "" + l) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (so.hasOwnProperty(s) ? l != null && s === "onScroll" && ge("scroll", e) : l != null && Af(e, s, l, o))
                        }
                    switch (n) {
                    case "input":
                        na(e),
                        _p(e, r, !1);
                        break;
                    case "textarea":
                        na(e),
                        Fp(e);
                        break;
                    case "option":
                        r.value != null && e.setAttribute("value", "" + gr(r.value));
                        break;
                    case "select":
                        e.multiple = !!r.multiple,
                        s = r.value,
                        s != null ? _i(e, !!r.multiple, s, !1) : r.defaultValue != null && _i(e, !!r.multiple, r.defaultValue, !0);
                        break;
                    default:
                        typeof i.onClick == "function" && (e.onclick = ol)
                    }
                    switch (n) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        r = !!r.autoFocus;
                        break e;
                    case "img":
                        r = !0;
                        break e;
                    default:
                        r = !1
                    }
                }r && (t.flags |= 4)
            }
            t.ref !== null && (t.flags |= 512, t.flags |= 2097152)
        }
        return Qe(t), null;
    case 6:
        if (e && t.stateNode != null)
            n0(e, t, e.memoizedProps, r);
        else {
            if (typeof r != "string" && t.stateNode === null)
                throw Error(M(166));
            if (n = zr(vo.current), zr(mn.current), da(t)) {
                if (r = t.stateNode, n = t.memoizedProps, r[dn] = t, (s = r.nodeValue !== n) && (e = vt, e !== null))
                    switch (e.tag) {
                    case 3:
                        ua(r.nodeValue, n, (e.mode & 1) !== 0);
                        break;
                    case 5:
                        e.memoizedProps.suppressHydrationWarning !== !0 && ua(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                s && (t.flags |= 4)
            } else
                r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r),
                r[dn] = t,
                t.stateNode = r
        }
        return Qe(t), null;
    case 13:
        if (ye(Se), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (we && yt !== null && t.mode & 1 && !(t.flags & 128))
                wx(),
                rs(),
                t.flags |= 98560,
                s = !1;
            else if (s = da(t), r !== null && r.dehydrated !== null) {
                if (e === null) {
                    if (!s)
                        throw Error(M(318));
                    if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s)
                        throw Error(M(317));
                    s[dn] = t
                } else
                    rs(),
                    !(t.flags & 128) && (t.memoizedState = null),
                    t.flags |= 4;
                Qe(t),
                s = !1
            } else
                Yt !== null && (kd(Yt), Yt = null),
                s = !0;
            if (!s)
                return t.flags & 65536 ? t : null
        }
        return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Se.current & 1 ? _e === 0 && (_e = 3) : hh())), t.updateQueue !== null && (t.flags |= 4), Qe(t), null);
    case 4:
        return ss(), bd(e, t), e === null && po(t.stateNode.containerInfo), Qe(t), null;
    case 10:
        return Yf(t.type._context), Qe(t), null;
    case 17:
        return ht(t.type) && al(), Qe(t), null;
    case 19:
        if (ye(Se), s = t.memoizedState, s === null)
            return Qe(t), null;
        if (r = (t.flags & 128) !== 0, o = s.rendering, o === null)
            if (r)
                Os(s, !1);
            else {
                if (_e !== 0 || e !== null && e.flags & 128)
                    for (e = t.child; e !== null;) {
                        if (o = pl(e), o !== null) {
                            for (t.flags |= 128, Os(s, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null;)
                                s = n,
                                e = r,
                                s.flags &= 14680066,
                                o = s.alternate,
                                o === null ? (s.childLanes = 0, s.lanes = e, s.child = null, s.subtreeFlags = 0, s.memoizedProps = null, s.memoizedState = null, s.updateQueue = null, s.dependencies = null, s.stateNode = null) : (s.childLanes = o.childLanes, s.lanes = o.lanes, s.child = o.child, s.subtreeFlags = 0, s.deletions = null, s.memoizedProps = o.memoizedProps, s.memoizedState = o.memoizedState, s.updateQueue = o.updateQueue, s.type = o.type, e = o.dependencies, s.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }),
                                n = n.sibling;
                            return he(Se, Se.current & 1 | 2), t.child
                        }
                        e = e.sibling
                    }
                s.tail !== null && Ae() > as && (t.flags |= 128, r = !0, Os(s, !1), t.lanes = 4194304)
            }
        else {
            if (!r)
                if (e = pl(o), e !== null) {
                    if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Os(s, !0), s.tail === null && s.tailMode === "hidden" && !o.alternate && !we)
                        return Qe(t), null
                } else
                    2 * Ae() - s.renderingStartTime > as && n !== 1073741824 && (t.flags |= 128, r = !0, Os(s, !1), t.lanes = 4194304);
            s.isBackwards ? (o.sibling = t.child, t.child = o) : (n = s.last, n !== null ? n.sibling = o : t.child = o, s.last = o)
        }
        return s.tail !== null ? (t = s.tail, s.rendering = t, s.tail = t.sibling, s.renderingStartTime = Ae(), t.sibling = null, n = Se.current, he(Se, r ? n & 1 | 2 : n & 1), t) : (Qe(t), null);
    case 22:
    case 23:
        return fh(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? mt & 1073741824 && (Qe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Qe(t), null;
    case 24:
        return null;
    case 25:
        return null
    }
    throw Error(M(156, t.tag))
}
function tN(e, t) {
    switch (Kf(t), t.tag) {
    case 1:
        return ht(t.type) && al(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
        return ss(), ye(ft), ye(Je), th(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
        return eh(t), null;
    case 13:
        if (ye(Se), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
                throw Error(M(340));
            rs()
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
        return ye(Se), null;
    case 4:
        return ss(), null;
    case 10:
        return Yf(t.type._context), null;
    case 22:
    case 23:
        return fh(), null;
    case 24:
        return null;
    default:
        return null
    }
}
var pa = !1,
    Xe = !1,
    nN = typeof WeakSet == "function" ? WeakSet : Set,
    B = null;
function Ai(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null)
            } catch (r) {
                ke(e, t, r)
            }
        else
            n.current = null
}
function Sd(e, t, n) {
    try {
        n()
    } catch (r) {
        ke(e, t, r)
    }
}
var jm = !1;
function rN(e, t) {
    if (sd = rl, e = ax(), Wf(e)) {
        if ("selectionStart" in e)
            var n = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
        else
            e:
            {
                n = (n = e.ownerDocument) && n.defaultView || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var i = r.anchorOffset,
                        s = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType,
                        s.nodeType
                    } catch {
                        n = null;
                        break e
                    }
                    var o = 0,
                        a = -1,
                        l = -1,
                        u = 0,
                        d = 0,
                        f = e,
                        h = null;
                    t:
                    for (;;) {
                        for (var p; f !== n || i !== 0 && f.nodeType !== 3 || (a = o + i), f !== s || r !== 0 && f.nodeType !== 3 || (l = o + r), f.nodeType === 3 && (o += f.nodeValue.length), (p = f.firstChild) !== null;)
                            h = f,
                            f = p;
                        for (;;) {
                            if (f === e)
                                break t;
                            if (h === n && ++u === i && (a = o), h === s && ++d === r && (l = o), (p = f.nextSibling) !== null)
                                break;
                            f = h,
                            h = f.parentNode
                        }
                        f = p
                    }
                    n = a === -1 || l === -1 ? null : {
                        start: a,
                        end: l
                    }
                } else
                    n = null
            }n = n || {
            start: 0,
            end: 0
        }
    } else
        n = null;
    for (od = {
        focusedElem: e,
        selectionRange: n
    }, rl = !1, B = t; B !== null;)
        if (t = B, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
            e.return = t,
            B = e;
        else
            for (; B !== null;) {
                t = B;
                try {
                    var b = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (b !== null) {
                                var m = b.memoizedProps,
                                    w = b.memoizedState,
                                    v = t.stateNode,
                                    g = v.getSnapshotBeforeUpdate(t.elementType === t.type ? m : Ht(t.type, m), w);
                                v.__reactInternalSnapshotBeforeUpdate = g
                            }
                            break;
                        case 3:
                            var x = t.stateNode.containerInfo;
                            x.nodeType === 1 ? x.textContent = "" : x.nodeType === 9 && x.documentElement && x.removeChild(x.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(M(163))
                        }
                } catch (S) {
                    ke(t, t.return, S)
                }
                if (e = t.sibling, e !== null) {
                    e.return = t.return,
                    B = e;
                    break
                }
                B = t.return
            }
    return b = jm, jm = !1, b
}
function Xs(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
        var i = r = r.next;
        do {
            if ((i.tag & e) === e) {
                var s = i.destroy;
                i.destroy = void 0,
                s !== void 0 && Sd(t, n, s)
            }
            i = i.next
        } while (i !== r)
    }
}
function Kl(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}
function Cd(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
        case 5:
            e = n;
            break;
        default:
            e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}
function r0(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, r0(t)),
    e.child = null,
    e.deletions = null,
    e.sibling = null,
    e.tag === 5 && (t = e.stateNode, t !== null && (delete t[dn], delete t[go], delete t[cd], delete t[FE], delete t[zE])),
    e.stateNode = null,
    e.return = null,
    e.dependencies = null,
    e.memoizedProps = null,
    e.memoizedState = null,
    e.pendingProps = null,
    e.stateNode = null,
    e.updateQueue = null
}
function i0(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function km(e) {
    e:
    for (;;) {
        for (; e.sibling === null;) {
            if (e.return === null || i0(e.return))
                return null;
            e = e.return
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
            if (e.flags & 2 || e.child === null || e.tag === 4)
                continue e;
            e.child.return = e,
            e = e.child
        }
        if (!(e.flags & 2))
            return e.stateNode
    }
}
function Ed(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ol));
    else if (r !== 4 && (e = e.child, e !== null))
        for (Ed(e, t, n), e = e.sibling; e !== null;)
            Ed(e, t, n),
            e = e.sibling
}
function Nd(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null))
        for (Nd(e, t, n), e = e.sibling; e !== null;)
            Nd(e, t, n),
            e = e.sibling
}
var Be = null,
    Qt = !1;
function $n(e, t, n) {
    for (n = n.child; n !== null;)
        s0(e, t, n),
        n = n.sibling
}
function s0(e, t, n) {
    if (pn && typeof pn.onCommitFiberUnmount == "function")
        try {
            pn.onCommitFiberUnmount(Vl, n)
        } catch {}
    switch (n.tag) {
    case 5:
        Xe || Ai(n, t);
    case 6:
        var r = Be,
            i = Qt;
        Be = null,
        $n(e, t, n),
        Be = r,
        Qt = i,
        Be !== null && (Qt ? (e = Be, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Be.removeChild(n.stateNode));
        break;
    case 18:
        Be !== null && (Qt ? (e = Be, n = n.stateNode, e.nodeType === 8 ? Uc(e.parentNode, n) : e.nodeType === 1 && Uc(e, n), uo(e)) : Uc(Be, n.stateNode));
        break;
    case 4:
        r = Be,
        i = Qt,
        Be = n.stateNode.containerInfo,
        Qt = !0,
        $n(e, t, n),
        Be = r,
        Qt = i;
        break;
    case 0:
    case 11:
    case 14:
    case 15:
        if (!Xe && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
            i = r = r.next;
            do {
                var s = i,
                    o = s.destroy;
                s = s.tag,
                o !== void 0 && (s & 2 || s & 4) && Sd(n, t, o),
                i = i.next
            } while (i !== r)
        }
        $n(e, t, n);
        break;
    case 1:
        if (!Xe && (Ai(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function"))
            try {
                r.props = n.memoizedProps,
                r.state = n.memoizedState,
                r.componentWillUnmount()
            } catch (a) {
                ke(n, t, a)
            }
        $n(e, t, n);
        break;
    case 21:
        $n(e, t, n);
        break;
    case 22:
        n.mode & 1 ? (Xe = (r = Xe) || n.memoizedState !== null, $n(e, t, n), Xe = r) : $n(e, t, n);
        break;
    default:
        $n(e, t, n)
    }
}
function Rm(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new nN),
        t.forEach(function(r) {
            var i = fN.bind(null, e, r);
            n.has(r) || (n.add(r), r.then(i, i))
        })
    }
}
function zt(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            try {
                var s = e,
                    o = t,
                    a = o;
                e:
                for (; a !== null;) {
                    switch (a.tag) {
                    case 5:
                        Be = a.stateNode,
                        Qt = !1;
                        break e;
                    case 3:
                        Be = a.stateNode.containerInfo,
                        Qt = !0;
                        break e;
                    case 4:
                        Be = a.stateNode.containerInfo,
                        Qt = !0;
                        break e
                    }
                    a = a.return
                }
                if (Be === null)
                    throw Error(M(160));
                s0(s, o, i),
                Be = null,
                Qt = !1;
                var l = i.alternate;
                l !== null && (l.return = null),
                i.return = null
            } catch (u) {
                ke(i, t, u)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null;)
            o0(t, e),
            t = t.sibling
}
function o0(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
        if (zt(t, e), on(e), r & 4) {
            try {
                Xs(3, e, e.return),
                Kl(3, e)
            } catch (m) {
                ke(e, e.return, m)
            }
            try {
                Xs(5, e, e.return)
            } catch (m) {
                ke(e, e.return, m)
            }
        }
        break;
    case 1:
        zt(t, e),
        on(e),
        r & 512 && n !== null && Ai(n, n.return);
        break;
    case 5:
        if (zt(t, e), on(e), r & 512 && n !== null && Ai(n, n.return), e.flags & 32) {
            var i = e.stateNode;
            try {
                oo(i, "")
            } catch (m) {
                ke(e, e.return, m)
            }
        }
        if (r & 4 && (i = e.stateNode, i != null)) {
            var s = e.memoizedProps,
                o = n !== null ? n.memoizedProps : s,
                a = e.type,
                l = e.updateQueue;
            if (e.updateQueue = null, l !== null)
                try {
                    a === "input" && s.type === "radio" && s.name != null && jv(i, s),
                    Qu(a, o);
                    var u = Qu(a, s);
                    for (o = 0; o < l.length; o += 2) {
                        var d = l[o],
                            f = l[o + 1];
                        d === "style" ? Ov(i, f) : d === "dangerouslySetInnerHTML" ? Av(i, f) : d === "children" ? oo(i, f) : Af(i, d, f, u)
                    }
                    switch (a) {
                    case "input":
                        Wu(i, s);
                        break;
                    case "textarea":
                        kv(i, s);
                        break;
                    case "select":
                        var h = i._wrapperState.wasMultiple;
                        i._wrapperState.wasMultiple = !!s.multiple;
                        var p = s.value;
                        p != null ? _i(i, !!s.multiple, p, !1) : h !== !!s.multiple && (s.defaultValue != null ? _i(i, !!s.multiple, s.defaultValue, !0) : _i(i, !!s.multiple, s.multiple ? [] : "", !1))
                    }
                    i[go] = s
                } catch (m) {
                    ke(e, e.return, m)
                }
        }
        break;
    case 6:
        if (zt(t, e), on(e), r & 4) {
            if (e.stateNode === null)
                throw Error(M(162));
            i = e.stateNode,
            s = e.memoizedProps;
            try {
                i.nodeValue = s
            } catch (m) {
                ke(e, e.return, m)
            }
        }
        break;
    case 3:
        if (zt(t, e), on(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
            try {
                uo(t.containerInfo)
            } catch (m) {
                ke(e, e.return, m)
            }
        break;
    case 4:
        zt(t, e),
        on(e);
        break;
    case 13:
        zt(t, e),
        on(e),
        i = e.child,
        i.flags & 8192 && (s = i.memoizedState !== null, i.stateNode.isHidden = s, !s || i.alternate !== null && i.alternate.memoizedState !== null || (uh = Ae())),
        r & 4 && Rm(e);
        break;
    case 22:
        if (d = n !== null && n.memoizedState !== null, e.mode & 1 ? (Xe = (u = Xe) || d, zt(t, e), Xe = u) : zt(t, e), on(e), r & 8192) {
            if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !d && e.mode & 1)
                for (B = e, d = e.child; d !== null;) {
                    for (f = B = d; B !== null;) {
                        switch (h = B, p = h.child, h.tag) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            Xs(4, h, h.return);
                            break;
                        case 1:
                            Ai(h, h.return);
                            var b = h.stateNode;
                            if (typeof b.componentWillUnmount == "function") {
                                r = h,
                                n = h.return;
                                try {
                                    t = r,
                                    b.props = t.memoizedProps,
                                    b.state = t.memoizedState,
                                    b.componentWillUnmount()
                                } catch (m) {
                                    ke(r, n, m)
                                }
                            }
                            break;
                        case 5:
                            Ai(h, h.return);
                            break;
                        case 22:
                            if (h.memoizedState !== null) {
                                Mm(f);
                                continue
                            }
                        }
                        p !== null ? (p.return = h, B = p) : Mm(f)
                    }
                    d = d.sibling
                }
            e:
            for (d = null, f = e;;) {
                if (f.tag === 5) {
                    if (d === null) {
                        d = f;
                        try {
                            i = f.stateNode,
                            u ? (s = i.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none") : (a = f.stateNode, l = f.memoizedProps.style, o = l != null && l.hasOwnProperty("display") ? l.display : null, a.style.display = Mv("display", o))
                        } catch (m) {
                            ke(e, e.return, m)
                        }
                    }
                } else if (f.tag === 6) {
                    if (d === null)
                        try {
                            f.stateNode.nodeValue = u ? "" : f.memoizedProps
                        } catch (m) {
                            ke(e, e.return, m)
                        }
                } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
                    f.child.return = f,
                    f = f.child;
                    continue
                }
                if (f === e)
                    break e;
                for (; f.sibling === null;) {
                    if (f.return === null || f.return === e)
                        break e;
                    d === f && (d = null),
                    f = f.return
                }
                d === f && (d = null),
                f.sibling.return = f.return,
                f = f.sibling
            }
        }
        break;
    case 19:
        zt(t, e),
        on(e),
        r & 4 && Rm(e);
        break;
    case 21:
        break;
    default:
        zt(t, e),
        on(e)
    }
}
function on(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e:
            {
                for (var n = e.return; n !== null;) {
                    if (i0(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(M(160))
            }switch (r.tag) {
            case 5:
                var i = r.stateNode;
                r.flags & 32 && (oo(i, ""), r.flags &= -33);
                var s = km(e);
                Nd(e, s, i);
                break;
            case 3:
            case 4:
                var o = r.stateNode.containerInfo,
                    a = km(e);
                Ed(e, a, o);
                break;
            default:
                throw Error(M(161))
            }
        } catch (l) {
            ke(e, e.return, l)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}
function iN(e, t, n) {
    B = e,
    a0(e)
}
function a0(e, t, n) {
    for (var r = (e.mode & 1) !== 0; B !== null;) {
        var i = B,
            s = i.child;
        if (i.tag === 22 && r) {
            var o = i.memoizedState !== null || pa;
            if (!o) {
                var a = i.alternate,
                    l = a !== null && a.memoizedState !== null || Xe;
                a = pa;
                var u = Xe;
                if (pa = o, (Xe = l) && !u)
                    for (B = i; B !== null;)
                        o = B,
                        l = o.child,
                        o.tag === 22 && o.memoizedState !== null ? Om(i) : l !== null ? (l.return = o, B = l) : Om(i);
                for (; s !== null;)
                    B = s,
                    a0(s),
                    s = s.sibling;
                B = i,
                pa = a,
                Xe = u
            }
            Am(e)
        } else
            i.subtreeFlags & 8772 && s !== null ? (s.return = i, B = s) : Am(e)
    }
}
function Am(e) {
    for (; B !== null;) {
        var t = B;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Xe || Kl(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !Xe)
                            if (n === null)
                                r.componentDidMount();
                            else {
                                var i = t.elementType === t.type ? n.memoizedProps : Ht(t.type, n.memoizedProps);
                                r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            }
                        var s = t.updateQueue;
                        s !== null && mm(t, s, r);
                        break;
                    case 3:
                        var o = t.updateQueue;
                        if (o !== null) {
                            if (n = null, t.child !== null)
                                switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                                }
                            mm(t, o, n)
                        }
                        break;
                    case 5:
                        var a = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = a;
                            var l = t.memoizedProps;
                            switch (t.type) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                l.autoFocus && n.focus();
                                break;
                            case "img":
                                l.src && (n.src = l.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var u = t.alternate;
                            if (u !== null) {
                                var d = u.memoizedState;
                                if (d !== null) {
                                    var f = d.dehydrated;
                                    f !== null && uo(f)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(M(163))
                    }
                Xe || t.flags & 512 && Cd(t)
            } catch (h) {
                ke(t, t.return, h)
            }
        }
        if (t === e) {
            B = null;
            break
        }
        if (n = t.sibling, n !== null) {
            n.return = t.return,
            B = n;
            break
        }
        B = t.return
    }
}
function Mm(e) {
    for (; B !== null;) {
        var t = B;
        if (t === e) {
            B = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return,
            B = n;
            break
        }
        B = t.return
    }
}
function Om(e) {
    for (; B !== null;) {
        var t = B;
        try {
            switch (t.tag) {
            case 0:
            case 11:
            case 15:
                var n = t.return;
                try {
                    Kl(4, t)
                } catch (l) {
                    ke(t, n, l)
                }
                break;
            case 1:
                var r = t.stateNode;
                if (typeof r.componentDidMount == "function") {
                    var i = t.return;
                    try {
                        r.componentDidMount()
                    } catch (l) {
                        ke(t, i, l)
                    }
                }
                var s = t.return;
                try {
                    Cd(t)
                } catch (l) {
                    ke(t, s, l)
                }
                break;
            case 5:
                var o = t.return;
                try {
                    Cd(t)
                } catch (l) {
                    ke(t, o, l)
                }
            }
        } catch (l) {
            ke(t, t.return, l)
        }
        if (t === e) {
            B = null;
            break
        }
        var a = t.sibling;
        if (a !== null) {
            a.return = t.return,
            B = a;
            break
        }
        B = t.return
    }
}
var sN = Math.ceil,
    yl = _n.ReactCurrentDispatcher,
    lh = _n.ReactCurrentOwner,
    Ot = _n.ReactCurrentBatchConfig,
    re = 0,
    ze = null,
    Oe = null,
    Ue = 0,
    mt = 0,
    Mi = Cr(0),
    _e = 0,
    So = null,
    ti = 0,
    Gl = 0,
    ch = 0,
    Zs = null,
    ut = null,
    uh = 0,
    as = 1 / 0,
    En = null,
    vl = !1,
    Td = null,
    fr = null,
    ma = !1,
    ir = null,
    xl = 0,
    Js = 0,
    Pd = null,
    za = -1,
    Ba = 0;
function ot() {
    return re & 6 ? Ae() : za !== -1 ? za : za = Ae()
}
function hr(e) {
    return e.mode & 1 ? re & 2 && Ue !== 0 ? Ue & -Ue : $E.transition !== null ? (Ba === 0 && (Ba = Hv()), Ba) : (e = ce, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Zv(e.type)), e) : 1
}
function Jt(e, t, n, r) {
    if (50 < Js)
        throw Js = 0, Pd = null, Error(M(185));
    Vo(e, n, r),
    (!(re & 2) || e !== ze) && (e === ze && (!(re & 2) && (Gl |= n), _e === 4 && Xn(e, Ue)), pt(e, r), n === 1 && re === 0 && !(t.mode & 1) && (as = Ae() + 500, Ul && Er()))
}
function pt(e, t) {
    var n = e.callbackNode;
    $C(e, t);
    var r = nl(e, e === ze ? Ue : 0);
    if (r === 0)
        n !== null && $p(n),
        e.callbackNode = null,
        e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
        if (n != null && $p(n), t === 1)
            e.tag === 0 ? BE(Im.bind(null, e)) : yx(Im.bind(null, e)),
            _E(function() {
                !(re & 6) && Er()
            }),
            n = null;
        else {
            switch (Kv(r)) {
            case 1:
                n = Lf;
                break;
            case 4:
                n = Uv;
                break;
            case 16:
                n = tl;
                break;
            case 536870912:
                n = Wv;
                break;
            default:
                n = tl
            }
            n = m0(n, l0.bind(null, e))
        }
        e.callbackPriority = t,
        e.callbackNode = n
    }
}
function l0(e, t) {
    if (za = -1, Ba = 0, re & 6)
        throw Error(M(327));
    var n = e.callbackNode;
    if ($i() && e.callbackNode !== n)
        return null;
    var r = nl(e, e === ze ? Ue : 0);
    if (r === 0)
        return null;
    if (r & 30 || r & e.expiredLanes || t)
        t = wl(e, r);
    else {
        t = r;
        var i = re;
        re |= 2;
        var s = u0();
        (ze !== e || Ue !== t) && (En = null, as = Ae() + 500, Qr(e, t));
        do try {
            lN();
            break
        } catch (a) {
            c0(e, a)
        }
        while (!0);
        Qf(),
        yl.current = s,
        re = i,
        Oe !== null ? t = 0 : (ze = null, Ue = 0, t = _e)
    }
    if (t !== 0) {
        if (t === 2 && (i = ed(e), i !== 0 && (r = i, t = jd(e, i))), t === 1)
            throw n = So, Qr(e, 0), Xn(e, r), pt(e, Ae()), n;
        if (t === 6)
            Xn(e, r);
        else {
            if (i = e.current.alternate, !(r & 30) && !oN(i) && (t = wl(e, r), t === 2 && (s = ed(e), s !== 0 && (r = s, t = jd(e, s))), t === 1))
                throw n = So, Qr(e, 0), Xn(e, r), pt(e, Ae()), n;
            switch (e.finishedWork = i, e.finishedLanes = r, t) {
            case 0:
            case 1:
                throw Error(M(345));
            case 2:
                Lr(e, ut, En);
                break;
            case 3:
                if (Xn(e, r), (r & 130023424) === r && (t = uh + 500 - Ae(), 10 < t)) {
                    if (nl(e, 0) !== 0)
                        break;
                    if (i = e.suspendedLanes, (i & r) !== r) {
                        ot(),
                        e.pingedLanes |= e.suspendedLanes & i;
                        break
                    }
                    e.timeoutHandle = ld(Lr.bind(null, e, ut, En), t);
                    break
                }
                Lr(e, ut, En);
                break;
            case 4:
                if (Xn(e, r), (r & 4194240) === r)
                    break;
                for (t = e.eventTimes, i = -1; 0 < r;) {
                    var o = 31 - Zt(r);
                    s = 1 << o,
                    o = t[o],
                    o > i && (i = o),
                    r &= ~s
                }
                if (r = i, r = Ae() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * sN(r / 1960)) - r, 10 < r) {
                    e.timeoutHandle = ld(Lr.bind(null, e, ut, En), r);
                    break
                }
                Lr(e, ut, En);
                break;
            case 5:
                Lr(e, ut, En);
                break;
            default:
                throw Error(M(329))
            }
        }
    }
    return pt(e, Ae()), e.callbackNode === n ? l0.bind(null, e) : null
}
function jd(e, t) {
    var n = Zs;
    return e.current.memoizedState.isDehydrated && (Qr(e, t).flags |= 256), e = wl(e, t), e !== 2 && (t = ut, ut = n, t !== null && kd(t)), e
}
function kd(e) {
    ut === null ? ut = e : ut.push.apply(ut, e)
}
function oN(e) {
    for (var t = e;;) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores, n !== null))
                for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                        s = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!tn(s(), i))
                            return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child, t.subtreeFlags & 16384 && n !== null)
            n.return = t,
            t = n;
        else {
            if (t === e)
                break;
            for (; t.sibling === null;) {
                if (t.return === null || t.return === e)
                    return !0;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
    }
    return !0
}
function Xn(e, t) {
    for (t &= ~ch, t &= ~Gl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
        var n = 31 - Zt(t),
            r = 1 << n;
        e[n] = -1,
        t &= ~r
    }
}
function Im(e) {
    if (re & 6)
        throw Error(M(327));
    $i();
    var t = nl(e, 0);
    if (!(t & 1))
        return pt(e, Ae()), null;
    var n = wl(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = ed(e);
        r !== 0 && (t = r, n = jd(e, r))
    }
    if (n === 1)
        throw n = So, Qr(e, 0), Xn(e, t), pt(e, Ae()), n;
    if (n === 6)
        throw Error(M(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Lr(e, ut, En), pt(e, Ae()), null
}
function dh(e, t) {
    var n = re;
    re |= 1;
    try {
        return e(t)
    } finally {
        re = n,
        re === 0 && (as = Ae() + 500, Ul && Er())
    }
}
function ni(e) {
    ir !== null && ir.tag === 0 && !(re & 6) && $i();
    var t = re;
    re |= 1;
    var n = Ot.transition,
        r = ce;
    try {
        if (Ot.transition = null, ce = 1, e)
            return e()
    } finally {
        ce = r,
        Ot.transition = n,
        re = t,
        !(re & 6) && Er()
    }
}
function fh() {
    mt = Mi.current,
    ye(Mi)
}
function Qr(e, t) {
    e.finishedWork = null,
    e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, LE(n)), Oe !== null)
        for (n = Oe.return; n !== null;) {
            var r = n;
            switch (Kf(r), r.tag) {
            case 1:
                r = r.type.childContextTypes,
                r != null && al();
                break;
            case 3:
                ss(),
                ye(ft),
                ye(Je),
                th();
                break;
            case 5:
                eh(r);
                break;
            case 4:
                ss();
                break;
            case 13:
                ye(Se);
                break;
            case 19:
                ye(Se);
                break;
            case 10:
                Yf(r.type._context);
                break;
            case 22:
            case 23:
                fh()
            }
            n = n.return
        }
    if (ze = e, Oe = e = pr(e.current, null), Ue = mt = t, _e = 0, So = null, ch = Gl = ti = 0, ut = Zs = null, Fr !== null) {
        for (t = 0; t < Fr.length; t++)
            if (n = Fr[t], r = n.interleaved, r !== null) {
                n.interleaved = null;
                var i = r.next,
                    s = n.pending;
                if (s !== null) {
                    var o = s.next;
                    s.next = i,
                    r.next = o
                }
                n.pending = r
            }
        Fr = null
    }
    return e
}
function c0(e, t) {
    do {
        var n = Oe;
        try {
            if (Qf(), _a.current = gl, ml) {
                for (var r = Ee.memoizedState; r !== null;) {
                    var i = r.queue;
                    i !== null && (i.pending = null),
                    r = r.next
                }
                ml = !1
            }
            if (ei = 0, Fe = Le = Ee = null, Ys = !1, xo = 0, lh.current = null, n === null || n.return === null) {
                _e = 1,
                So = t,
                Oe = null;
                break
            }
            e:
            {
                var s = e,
                    o = n.return,
                    a = n,
                    l = t;
                if (t = Ue, a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
                    var u = l,
                        d = a,
                        f = d.tag;
                    if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
                        var h = d.alternate;
                        h ? (d.updateQueue = h.updateQueue, d.memoizedState = h.memoizedState, d.lanes = h.lanes) : (d.updateQueue = null, d.memoizedState = null)
                    }
                    var p = bm(o);
                    if (p !== null) {
                        p.flags &= -257,
                        Sm(p, o, a, s, t),
                        p.mode & 1 && wm(s, u, t),
                        t = p,
                        l = u;
                        var b = t.updateQueue;
                        if (b === null) {
                            var m = new Set;
                            m.add(l),
                            t.updateQueue = m
                        } else
                            b.add(l);
                        break e
                    } else {
                        if (!(t & 1)) {
                            wm(s, u, t),
                            hh();
                            break e
                        }
                        l = Error(M(426))
                    }
                } else if (we && a.mode & 1) {
                    var w = bm(o);
                    if (w !== null) {
                        !(w.flags & 65536) && (w.flags |= 256),
                        Sm(w, o, a, s, t),
                        Gf(os(l, a));
                        break e
                    }
                }
                s = l = os(l, a),
                _e !== 4 && (_e = 2),
                Zs === null ? Zs = [s] : Zs.push(s),
                s = o;
                do {
                    switch (s.tag) {
                    case 3:
                        s.flags |= 65536,
                        t &= -t,
                        s.lanes |= t;
                        var v = Kx(s, l, t);
                        pm(s, v);
                        break e;
                    case 1:
                        a = l;
                        var g = s.type,
                            x = s.stateNode;
                        if (!(s.flags & 128) && (typeof g.getDerivedStateFromError == "function" || x !== null && typeof x.componentDidCatch == "function" && (fr === null || !fr.has(x)))) {
                            s.flags |= 65536,
                            t &= -t,
                            s.lanes |= t;
                            var S = Gx(s, a, t);
                            pm(s, S);
                            break e
                        }
                    }
                    s = s.return
                } while (s !== null)
            }f0(n)
        } catch (C) {
            t = C,
            Oe === n && n !== null && (Oe = n = n.return);
            continue
        }
        break
    } while (!0)
}
function u0() {
    var e = yl.current;
    return yl.current = gl, e === null ? gl : e
}
function hh() {
    (_e === 0 || _e === 3 || _e === 2) && (_e = 4),
    ze === null || !(ti & 268435455) && !(Gl & 268435455) || Xn(ze, Ue)
}
function wl(e, t) {
    var n = re;
    re |= 2;
    var r = u0();
    (ze !== e || Ue !== t) && (En = null, Qr(e, t));
    do try {
        aN();
        break
    } catch (i) {
        c0(e, i)
    }
    while (!0);
    if (Qf(), re = n, yl.current = r, Oe !== null)
        throw Error(M(261));
    return ze = null, Ue = 0, _e
}
function aN() {
    for (; Oe !== null;)
        d0(Oe)
}
function lN() {
    for (; Oe !== null && !OC();)
        d0(Oe)
}
function d0(e) {
    var t = p0(e.alternate, e, mt);
    e.memoizedProps = e.pendingProps,
    t === null ? f0(e) : Oe = t,
    lh.current = null
}
function f0(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return, t.flags & 32768) {
            if (n = tN(n, t), n !== null) {
                n.flags &= 32767,
                Oe = n;
                return
            }
            if (e !== null)
                e.flags |= 32768,
                e.subtreeFlags = 0,
                e.deletions = null;
            else {
                _e = 6,
                Oe = null;
                return
            }
        } else if (n = eN(n, t, mt), n !== null) {
            Oe = n;
            return
        }
        if (t = t.sibling, t !== null) {
            Oe = t;
            return
        }
        Oe = t = e
    } while (t !== null);
    _e === 0 && (_e = 5)
}
function Lr(e, t, n) {
    var r = ce,
        i = Ot.transition;
    try {
        Ot.transition = null,
        ce = 1,
        cN(e, t, n, r)
    } finally {
        Ot.transition = i,
        ce = r
    }
    return null
}
function cN(e, t, n, r) {
    do $i();
    while (ir !== null);
    if (re & 6)
        throw Error(M(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null)
        return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current)
        throw Error(M(177));
    e.callbackNode = null,
    e.callbackPriority = 0;
    var s = n.lanes | n.childLanes;
    if (UC(e, s), e === ze && (Oe = ze = null, Ue = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || ma || (ma = !0, m0(tl, function() {
        return $i(), null
    })), s = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || s) {
        s = Ot.transition,
        Ot.transition = null;
        var o = ce;
        ce = 1;
        var a = re;
        re |= 4,
        lh.current = null,
        rN(e, n),
        o0(n, e),
        kE(od),
        rl = !!sd,
        od = sd = null,
        e.current = n,
        iN(n),
        IC(),
        re = a,
        ce = o,
        Ot.transition = s
    } else
        e.current = n;
    if (ma && (ma = !1, ir = e, xl = i), s = e.pendingLanes, s === 0 && (fr = null), _C(n.stateNode), pt(e, Ae()), t !== null)
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
            i = t[n],
            r(i.value, {
                componentStack: i.stack,
                digest: i.digest
            });
    if (vl)
        throw vl = !1, e = Td, Td = null, e;
    return xl & 1 && e.tag !== 0 && $i(), s = e.pendingLanes, s & 1 ? e === Pd ? Js++ : (Js = 0, Pd = e) : Js = 0, Er(), null
}
function $i() {
    if (ir !== null) {
        var e = Kv(xl),
            t = Ot.transition,
            n = ce;
        try {
            if (Ot.transition = null, ce = 16 > e ? 16 : e, ir === null)
                var r = !1;
            else {
                if (e = ir, ir = null, xl = 0, re & 6)
                    throw Error(M(331));
                var i = re;
                for (re |= 4, B = e.current; B !== null;) {
                    var s = B,
                        o = s.child;
                    if (B.flags & 16) {
                        var a = s.deletions;
                        if (a !== null) {
                            for (var l = 0; l < a.length; l++) {
                                var u = a[l];
                                for (B = u; B !== null;) {
                                    var d = B;
                                    switch (d.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Xs(8, d, s)
                                    }
                                    var f = d.child;
                                    if (f !== null)
                                        f.return = d,
                                        B = f;
                                    else
                                        for (; B !== null;) {
                                            d = B;
                                            var h = d.sibling,
                                                p = d.return;
                                            if (r0(d), d === u) {
                                                B = null;
                                                break
                                            }
                                            if (h !== null) {
                                                h.return = p,
                                                B = h;
                                                break
                                            }
                                            B = p
                                        }
                                }
                            }
                            var b = s.alternate;
                            if (b !== null) {
                                var m = b.child;
                                if (m !== null) {
                                    b.child = null;
                                    do {
                                        var w = m.sibling;
                                        m.sibling = null,
                                        m = w
                                    } while (m !== null)
                                }
                            }
                            B = s
                        }
                    }
                    if (s.subtreeFlags & 2064 && o !== null)
                        o.return = s,
                        B = o;
                    else
                        e:
                        for (; B !== null;) {
                            if (s = B, s.flags & 2048)
                                switch (s.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    Xs(9, s, s.return)
                                }
                            var v = s.sibling;
                            if (v !== null) {
                                v.return = s.return,
                                B = v;
                                break e
                            }
                            B = s.return
                        }
                }
                var g = e.current;
                for (B = g; B !== null;) {
                    o = B;
                    var x = o.child;
                    if (o.subtreeFlags & 2064 && x !== null)
                        x.return = o,
                        B = x;
                    else
                        e:
                        for (o = g; B !== null;) {
                            if (a = B, a.flags & 2048)
                                try {
                                    switch (a.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Kl(9, a)
                                    }
                                } catch (C) {
                                    ke(a, a.return, C)
                                }
                            if (a === o) {
                                B = null;
                                break e
                            }
                            var S = a.sibling;
                            if (S !== null) {
                                S.return = a.return,
                                B = S;
                                break e
                            }
                            B = a.return
                        }
                }
                if (re = i, Er(), pn && typeof pn.onPostCommitFiberRoot == "function")
                    try {
                        pn.onPostCommitFiberRoot(Vl, e)
                    } catch {}
                r = !0
            }
            return r
        } finally {
            ce = n,
            Ot.transition = t
        }
    }
    return !1
}
function Dm(e, t, n) {
    t = os(n, t),
    t = Kx(e, t, 1),
    e = dr(e, t, 1),
    t = ot(),
    e !== null && (Vo(e, 1, t), pt(e, t))
}
function ke(e, t, n) {
    if (e.tag === 3)
        Dm(e, e, n);
    else
        for (; t !== null;) {
            if (t.tag === 3) {
                Dm(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (fr === null || !fr.has(r))) {
                    e = os(n, e),
                    e = Gx(t, e, 1),
                    t = dr(t, e, 1),
                    e = ot(),
                    t !== null && (Vo(t, 1, e), pt(t, e));
                    break
                }
            }
            t = t.return
        }
}
function uN(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
    t = ot(),
    e.pingedLanes |= e.suspendedLanes & n,
    ze === e && (Ue & n) === n && (_e === 4 || _e === 3 && (Ue & 130023424) === Ue && 500 > Ae() - uh ? Qr(e, 0) : ch |= n),
    pt(e, t)
}
function h0(e, t) {
    t === 0 && (e.mode & 1 ? (t = sa, sa <<= 1, !(sa & 130023424) && (sa = 4194304)) : t = 1);
    var n = ot();
    e = Mn(e, t),
    e !== null && (Vo(e, t, n), pt(e, n))
}
function dN(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane),
    h0(e, n)
}
function fN(e, t) {
    var n = 0;
    switch (e.tag) {
    case 13:
        var r = e.stateNode,
            i = e.memoizedState;
        i !== null && (n = i.retryLane);
        break;
    case 19:
        r = e.stateNode;
        break;
    default:
        throw Error(M(314))
    }
    r !== null && r.delete(t),
    h0(e, n)
}
var p0;
p0 = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || ft.current)
            dt = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return dt = !1, JE(e, t, n);
            dt = !!(e.flags & 131072)
        }
    else
        dt = !1,
        we && t.flags & 1048576 && vx(t, ul, t.index);
    switch (t.lanes = 0, t.tag) {
    case 2:
        var r = t.type;
        Fa(e, t),
        e = t.pendingProps;
        var i = ns(t, Je.current);
        Bi(t, n),
        i = rh(null, t, r, e, i, n);
        var s = ih();
        return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ht(r) ? (s = !0, ll(t)) : s = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, Zf(t), i.updater = Hl, t.stateNode = i, i._reactInternals = t, md(t, r, e, n), t = vd(null, t, r, !0, s, n)) : (t.tag = 0, we && s && Hf(t), tt(null, t, i, n), t = t.child), t;
    case 16:
        r = t.elementType;
        e:
        {
            switch (Fa(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = pN(r), e = Ht(r, e), i) {
            case 0:
                t = yd(null, t, r, e, n);
                break e;
            case 1:
                t = Nm(null, t, r, e, n);
                break e;
            case 11:
                t = Cm(null, t, r, e, n);
                break e;
            case 14:
                t = Em(null, t, r, Ht(r.type, e), n);
                break e
            }
            throw Error(M(306, r, ""))
        }return t;
    case 0:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Ht(r, i), yd(e, t, r, i, n);
    case 1:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Ht(r, i), Nm(e, t, r, i, n);
    case 3:
        e:
        {
            if (Xx(t), e === null)
                throw Error(M(387));
            r = t.pendingProps,
            s = t.memoizedState,
            i = s.element,
            Ex(e, t),
            hl(t, r, null, n);
            var o = t.memoizedState;
            if (r = o.element, s.isDehydrated)
                if (s = {
                    element: r,
                    isDehydrated: !1,
                    cache: o.cache,
                    pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                    transitions: o.transitions
                }, t.updateQueue.baseState = s, t.memoizedState = s, t.flags & 256) {
                    i = os(Error(M(423)), t),
                    t = Tm(e, t, r, n, i);
                    break e
                } else if (r !== i) {
                    i = os(Error(M(424)), t),
                    t = Tm(e, t, r, n, i);
                    break e
                } else
                    for (yt = ur(t.stateNode.containerInfo.firstChild), vt = t, we = !0, Yt = null, n = Sx(t, null, r, n), t.child = n; n;)
                        n.flags = n.flags & -3 | 4096,
                        n = n.sibling;
            else {
                if (rs(), r === i) {
                    t = On(e, t, n);
                    break e
                }
                tt(e, t, r, n)
            }
            t = t.child
        }return t;
    case 5:
        return Nx(t), e === null && fd(t), r = t.type, i = t.pendingProps, s = e !== null ? e.memoizedProps : null, o = i.children, ad(r, i) ? o = null : s !== null && ad(r, s) && (t.flags |= 32), Yx(e, t), tt(e, t, o, n), t.child;
    case 6:
        return e === null && fd(t), null;
    case 13:
        return Zx(e, t, n);
    case 4:
        return Jf(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = is(t, null, r, n) : tt(e, t, r, n), t.child;
    case 11:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Ht(r, i), Cm(e, t, r, i, n);
    case 7:
        return tt(e, t, t.pendingProps, n), t.child;
    case 8:
        return tt(e, t, t.pendingProps.children, n), t.child;
    case 12:
        return tt(e, t, t.pendingProps.children, n), t.child;
    case 10:
        e:
        {
            if (r = t.type._context, i = t.pendingProps, s = t.memoizedProps, o = i.value, he(dl, r._currentValue), r._currentValue = o, s !== null)
                if (tn(s.value, o)) {
                    if (s.children === i.children && !ft.current) {
                        t = On(e, t, n);
                        break e
                    }
                } else
                    for (s = t.child, s !== null && (s.return = t); s !== null;) {
                        var a = s.dependencies;
                        if (a !== null) {
                            o = s.child;
                            for (var l = a.firstContext; l !== null;) {
                                if (l.context === r) {
                                    if (s.tag === 1) {
                                        l = kn(-1, n & -n),
                                        l.tag = 2;
                                        var u = s.updateQueue;
                                        if (u !== null) {
                                            u = u.shared;
                                            var d = u.pending;
                                            d === null ? l.next = l : (l.next = d.next, d.next = l),
                                            u.pending = l
                                        }
                                    }
                                    s.lanes |= n,
                                    l = s.alternate,
                                    l !== null && (l.lanes |= n),
                                    hd(s.return, n, t),
                                    a.lanes |= n;
                                    break
                                }
                                l = l.next
                            }
                        } else if (s.tag === 10)
                            o = s.type === t.type ? null : s.child;
                        else if (s.tag === 18) {
                            if (o = s.return, o === null)
                                throw Error(M(341));
                            o.lanes |= n,
                            a = o.alternate,
                            a !== null && (a.lanes |= n),
                            hd(o, n, t),
                            o = s.sibling
                        } else
                            o = s.child;
                        if (o !== null)
                            o.return = s;
                        else
                            for (o = s; o !== null;) {
                                if (o === t) {
                                    o = null;
                                    break
                                }
                                if (s = o.sibling, s !== null) {
                                    s.return = o.return,
                                    o = s;
                                    break
                                }
                                o = o.return
                            }
                        s = o
                    }
            tt(e, t, i.children, n),
            t = t.child
        }return t;
    case 9:
        return i = t.type, r = t.pendingProps.children, Bi(t, n), i = Dt(i), r = r(i), t.flags |= 1, tt(e, t, r, n), t.child;
    case 14:
        return r = t.type, i = Ht(r, t.pendingProps), i = Ht(r.type, i), Em(e, t, r, i, n);
    case 15:
        return qx(e, t, t.type, t.pendingProps, n);
    case 17:
        return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Ht(r, i), Fa(e, t), t.tag = 1, ht(r) ? (e = !0, ll(t)) : e = !1, Bi(t, n), Hx(t, r, i), md(t, r, i, n), vd(null, t, r, !0, e, n);
    case 19:
        return Jx(e, t, n);
    case 22:
        return Qx(e, t, n)
    }
    throw Error(M(156, t.tag))
};
function m0(e, t) {
    return $v(e, t)
}
function hN(e, t, n, r) {
    this.tag = e,
    this.key = n,
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
    this.index = 0,
    this.ref = null,
    this.pendingProps = t,
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
    this.mode = r,
    this.subtreeFlags = this.flags = 0,
    this.deletions = null,
    this.childLanes = this.lanes = 0,
    this.alternate = null
}
function At(e, t, n, r) {
    return new hN(e, t, n, r)
}
function ph(e) {
    return e = e.prototype, !(!e || !e.isReactComponent)
}
function pN(e) {
    if (typeof e == "function")
        return ph(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof, e === Of)
            return 11;
        if (e === If)
            return 14
    }
    return 2
}
function pr(e, t) {
    var n = e.alternate;
    return n === null ? (n = At(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
}
function $a(e, t, n, r, i, s) {
    var o = 2;
    if (r = e, typeof e == "function")
        ph(e) && (o = 1);
    else if (typeof e == "string")
        o = 5;
    else
        e:
        switch (e) {
        case Si:
            return Yr(n.children, i, s, t);
        case Mf:
            o = 8,
            i |= 8;
            break;
        case Fu:
            return e = At(12, n, t, i | 2), e.elementType = Fu, e.lanes = s, e;
        case zu:
            return e = At(13, n, t, i), e.elementType = zu, e.lanes = s, e;
        case Bu:
            return e = At(19, n, t, i), e.elementType = Bu, e.lanes = s, e;
        case Nv:
            return ql(n, i, s, t);
        default:
            if (typeof e == "object" && e !== null)
                switch (e.$$typeof) {
                case Cv:
                    o = 10;
                    break e;
                case Ev:
                    o = 9;
                    break e;
                case Of:
                    o = 11;
                    break e;
                case If:
                    o = 14;
                    break e;
                case qn:
                    o = 16,
                    r = null;
                    break e
                }
            throw Error(M(130, e == null ? e : typeof e, ""))
        }
    return t = At(o, n, t, i), t.elementType = e, t.type = r, t.lanes = s, t
}
function Yr(e, t, n, r) {
    return e = At(7, e, r, t), e.lanes = n, e
}
function ql(e, t, n, r) {
    return e = At(22, e, r, t), e.elementType = Nv, e.lanes = n, e.stateNode = {
        isHidden: !1
    }, e
}
function Xc(e, t, n) {
    return e = At(6, e, null, t), e.lanes = n, e
}
function Zc(e, t, n) {
    return t = At(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    }, t
}
function mN(e, t, n, r, i) {
    this.tag = t,
    this.containerInfo = e,
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
    this.timeoutHandle = -1,
    this.callbackNode = this.pendingContext = this.context = null,
    this.callbackPriority = 0,
    this.eventTimes = Mc(0),
    this.expirationTimes = Mc(-1),
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
    this.entanglements = Mc(0),
    this.identifierPrefix = r,
    this.onRecoverableError = i,
    this.mutableSourceEagerHydrationData = null
}
function mh(e, t, n, r, i, s, o, a, l) {
    return e = new mN(e, t, n, a, l), t === 1 ? (t = 1, s === !0 && (t |= 8)) : t = 0, s = At(3, null, null, t), e.current = s, s.stateNode = e, s.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    }, Zf(s), e
}
function gN(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: bi,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}
function g0(e) {
    if (!e)
        return yr;
    e = e._reactInternals;
    e:
    {
        if (li(e) !== e || e.tag !== 1)
            throw Error(M(170));
        var t = e;
        do {
            switch (t.tag) {
            case 3:
                t = t.stateNode.context;
                break e;
            case 1:
                if (ht(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e
                }
            }
            t = t.return
        } while (t !== null);
        throw Error(M(171))
    }if (e.tag === 1) {
        var n = e.type;
        if (ht(n))
            return gx(e, n, t)
    }
    return t
}
function y0(e, t, n, r, i, s, o, a, l) {
    return e = mh(n, r, !0, e, i, s, o, a, l), e.context = g0(null), n = e.current, r = ot(), i = hr(n), s = kn(r, i), s.callback = t ?? null, dr(n, s, i), e.current.lanes = i, Vo(e, i, r), pt(e, r), e
}
function Ql(e, t, n, r) {
    var i = t.current,
        s = ot(),
        o = hr(i);
    return n = g0(n), t.context === null ? t.context = n : t.pendingContext = n, t = kn(s, o), t.payload = {
        element: e
    }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = dr(i, t, o), e !== null && (Jt(e, i, o, s), La(e, i, o)), o
}
function bl(e) {
    if (e = e.current, !e.child)
        return null;
    switch (e.child.tag) {
    case 5:
        return e.child.stateNode;
    default:
        return e.child.stateNode
    }
}
function Lm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}
function gh(e, t) {
    Lm(e, t),
    (e = e.alternate) && Lm(e, t)
}
function yN() {
    return null
}
var v0 = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
};
function yh(e) {
    this._internalRoot = e
}
Yl.prototype.render = yh.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
        throw Error(M(409));
    Ql(e, t, null, null)
};
Yl.prototype.unmount = yh.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        ni(function() {
            Ql(null, e, null, null)
        }),
        t[An] = null
    }
};
function Yl(e) {
    this._internalRoot = e
}
Yl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = Qv();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < Yn.length && t !== 0 && t < Yn[n].priority; n++)
            ;
        Yn.splice(n, 0, e),
        n === 0 && Xv(e)
    }
};
function vh(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}
function Xl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}
function _m() {}
function vN(e, t, n, r, i) {
    if (i) {
        if (typeof r == "function") {
            var s = r;
            r = function() {
                var u = bl(o);
                s.call(u)
            }
        }
        var o = y0(t, r, e, 0, null, !1, !1, "", _m);
        return e._reactRootContainer = o, e[An] = o.current, po(e.nodeType === 8 ? e.parentNode : e), ni(), o
    }
    for (; i = e.lastChild;)
        e.removeChild(i);
    if (typeof r == "function") {
        var a = r;
        r = function() {
            var u = bl(l);
            a.call(u)
        }
    }
    var l = mh(e, 0, !1, null, null, !1, !1, "", _m);
    return e._reactRootContainer = l, e[An] = l.current, po(e.nodeType === 8 ? e.parentNode : e), ni(function() {
        Ql(t, l, n, r)
    }), l
}
function Zl(e, t, n, r, i) {
    var s = n._reactRootContainer;
    if (s) {
        var o = s;
        if (typeof i == "function") {
            var a = i;
            i = function() {
                var l = bl(o);
                a.call(l)
            }
        }
        Ql(t, o, e, i)
    } else
        o = vN(n, t, e, i, r);
    return bl(o)
}
Gv = function(e) {
    switch (e.tag) {
    case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
            var n = zs(t.pendingLanes);
            n !== 0 && (_f(t, n | 1), pt(t, Ae()), !(re & 6) && (as = Ae() + 500, Er()))
        }
        break;
    case 13:
        ni(function() {
            var r = Mn(e, 1);
            if (r !== null) {
                var i = ot();
                Jt(r, e, 1, i)
            }
        }),
        gh(e, 1)
    }
};
Vf = function(e) {
    if (e.tag === 13) {
        var t = Mn(e, 134217728);
        if (t !== null) {
            var n = ot();
            Jt(t, e, 134217728, n)
        }
        gh(e, 134217728)
    }
};
qv = function(e) {
    if (e.tag === 13) {
        var t = hr(e),
            n = Mn(e, t);
        if (n !== null) {
            var r = ot();
            Jt(n, e, t, r)
        }
        gh(e, t)
    }
};
Qv = function() {
    return ce
};
Yv = function(e, t) {
    var n = ce;
    try {
        return ce = e, t()
    } finally {
        ce = n
    }
};
Xu = function(e, t, n) {
    switch (t) {
    case "input":
        if (Wu(e, n), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode;)
                n = n.parentNode;
            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                    var i = $l(r);
                    if (!i)
                        throw Error(M(90));
                    Pv(r),
                    Wu(r, i)
                }
            }
        }
        break;
    case "textarea":
        kv(e, n);
        break;
    case "select":
        t = n.value,
        t != null && _i(e, !!n.multiple, t, !1)
    }
};
Lv = dh;
_v = ni;
var xN = {
        usingClientEntryPoint: !1,
        Events: [zo, Ti, $l, Iv, Dv, dh]
    },
    Is = {
        findFiberByHostInstance: Vr,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom"
    },
    wN = {
        bundleType: Is.bundleType,
        version: Is.version,
        rendererPackageName: Is.rendererPackageName,
        rendererConfig: Is.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: _n.ReactCurrentDispatcher,
        findHostInstanceByFiber: function(e) {
            return e = zv(e), e === null ? null : e.stateNode
        },
        findFiberByHostInstance: Is.findFiberByHostInstance || yN,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ga = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ga.isDisabled && ga.supportsFiber)
        try {
            Vl = ga.inject(wN),
            pn = ga
        } catch {}
}
bt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xN;
bt.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!vh(t))
        throw Error(M(200));
    return gN(e, t, null, n)
};
bt.createRoot = function(e, t) {
    if (!vh(e))
        throw Error(M(299));
    var n = !1,
        r = "",
        i = v0;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = mh(e, 1, !1, null, null, n, !1, r, i), e[An] = t.current, po(e.nodeType === 8 ? e.parentNode : e), new yh(t)
};
bt.findDOMNode = function(e) {
    if (e == null)
        return null;
    if (e.nodeType === 1)
        return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function" ? Error(M(188)) : (e = Object.keys(e).join(","), Error(M(268, e)));
    return e = zv(t), e = e === null ? null : e.stateNode, e
};
bt.flushSync = function(e) {
    return ni(e)
};
bt.hydrate = function(e, t, n) {
    if (!Xl(t))
        throw Error(M(200));
    return Zl(null, e, t, !0, n)
};
bt.hydrateRoot = function(e, t, n) {
    if (!vh(e))
        throw Error(M(405));
    var r = n != null && n.hydratedSources || null,
        i = !1,
        s = "",
        o = v0;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = y0(t, null, e, 1, n ?? null, i, !1, s, o), e[An] = t.current, po(e), r)
        for (e = 0; e < r.length; e++)
            n = r[e],
            i = n._getVersion,
            i = i(n._source),
            t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(n, i);
    return new Yl(t)
};
bt.render = function(e, t, n) {
    if (!Xl(t))
        throw Error(M(200));
    return Zl(null, e, t, !1, n)
};
bt.unmountComponentAtNode = function(e) {
    if (!Xl(e))
        throw Error(M(40));
    return e._reactRootContainer ? (ni(function() {
        Zl(null, null, e, !1, function() {
            e._reactRootContainer = null,
            e[An] = null
        })
    }), !0) : !1
};
bt.unstable_batchedUpdates = dh;
bt.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Xl(n))
        throw Error(M(200));
    if (e == null || e._reactInternals === void 0)
        throw Error(M(38));
    return Zl(e, t, n, !1, r)
};
bt.version = "18.3.1-next-f1338f8080-20240426";
function x0() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(x0)
        } catch (e) {
            console.error(e)
        }
}
x0(),
xv.exports = bt;
var ci = xv.exports;
const w0 = av(ci);
var b0,
    Vm = ci;
b0 = Vm.createRoot,
Vm.hydrateRoot;
const bN = 1,
    SN = 1e6;
let Jc = 0;
function CN() {
    return Jc = (Jc + 1) % Number.MAX_SAFE_INTEGER, Jc.toString()
}
const eu = new Map,
    Fm = e => {
        if (eu.has(e))
            return;
        const t = setTimeout(() => {
            eu.delete(e),
            eo({
                type: "REMOVE_TOAST",
                toastId: e
            })
        }, SN);
        eu.set(e, t)
    },
    EN = (e, t) => {
        switch (t.type) {
        case "ADD_TOAST":
            return {
                ...e,
                toasts: [t.toast, ...e.toasts].slice(0, bN)
            };
        case "UPDATE_TOAST":
            return {
                ...e,
                toasts: e.toasts.map(n => n.id === t.toast.id ? {
                    ...n,
                    ...t.toast
                } : n)
            };
        case "DISMISS_TOAST":
            {
                const {toastId: n} = t;
                return n ? Fm(n) : e.toasts.forEach(r => {
                    Fm(r.id)
                }), {
                    ...e,
                    toasts: e.toasts.map(r => r.id === n || n === void 0 ? {
                        ...r,
                        open: !1
                    } : r)
                }
            }case "REMOVE_TOAST":
            return t.toastId === void 0 ? {
                ...e,
                toasts: []
            } : {
                ...e,
                toasts: e.toasts.filter(n => n.id !== t.toastId)
            }
        }
    },
    Ua = [];
let Wa = {
    toasts: []
};
function eo(e) {
    Wa = EN(Wa, e),
    Ua.forEach(t => {
        t(Wa)
    })
}
function NN({...e}) {
    const t = CN(),
        n = i => eo({
            type: "UPDATE_TOAST",
            toast: {
                ...i,
                id: t
            }
        }),
        r = () => eo({
            type: "DISMISS_TOAST",
            toastId: t
        });
    return eo({
        type: "ADD_TOAST",
        toast: {
            ...e,
            id: t,
            open: !0,
            onOpenChange: i => {
                i || r()
            }
        }
    }), {
        id: t,
        dismiss: r,
        update: n
    }
}
function Jl() {
    const [e, t] = y.useState(Wa);
    return y.useEffect(() => (Ua.push(t), () => {
        const n = Ua.indexOf(t);
        n > -1 && Ua.splice(n, 1)
    }), [e]), {
        ...e,
        toast: NN,
        dismiss: n => eo({
            type: "DISMISS_TOAST",
            toastId: n
        })
    }
}
function ee(e, t, {checkForDefaultPrevented: n=!0}={}) {
    return function(i) {
        if (e == null || e(i), n === !1 || !i.defaultPrevented)
            return t == null ? void 0 : t(i)
    }
}
function zm(e, t) {
    if (typeof e == "function")
        return e(t);
    e != null && (e.current = t)
}
function S0(...e) {
    return t => {
        let n = !1;
        const r = e.map(i => {
            const s = zm(i, t);
            return !n && typeof s == "function" && (n = !0), s
        });
        if (n)
            return () => {
                for (let i = 0; i < r.length; i++) {
                    const s = r[i];
                    typeof s == "function" ? s() : zm(e[i], null)
                }
            }
    }
}
function Re(...e) {
    return y.useCallback(S0(...e), e)
}
function $o(e, t=[]) {
    let n = [];
    function r(s, o) {
        const a = y.createContext(o),
            l = n.length;
        n = [...n, o];
        const u = f => {
            var v;
            const {scope: h, children: p, ...b} = f,
                m = ((v = h == null ? void 0 : h[e]) == null ? void 0 : v[l]) || a,
                w = y.useMemo(() => b, Object.values(b));
            return c.jsx(m.Provider, {
                value: w,
                children: p
            })
        };
        u.displayName = s + "Provider";
        function d(f, h) {
            var m;
            const p = ((m = h == null ? void 0 : h[e]) == null ? void 0 : m[l]) || a,
                b = y.useContext(p);
            if (b)
                return b;
            if (o !== void 0)
                return o;
            throw new Error(`\`${f}\` must be used within \`${s}\``)
        }
        return [u, d]
    }
    const i = () => {
        const s = n.map(o => y.createContext(o));
        return function(a) {
            const l = (a == null ? void 0 : a[e]) || s;
            return y.useMemo(() => ({
                [`__scope${e}`]: {
                    ...a,
                    [e]: l
                }
            }), [a, l])
        }
    };
    return i.scopeName = e, [r, TN(i, ...t)]
}
function TN(...e) {
    const t = e[0];
    if (e.length === 1)
        return t;
    const n = () => {
        const r = e.map(i => ({
            useScope: i(),
            scopeName: i.scopeName
        }));
        return function(s) {
            const o = r.reduce((a, {useScope: l, scopeName: u}) => {
                const f = l(s)[`__scope${u}`];
                return {
                    ...a,
                    ...f
                }
            }, {});
            return y.useMemo(() => ({
                [`__scope${t.scopeName}`]: o
            }), [o])
        }
    };
    return n.scopeName = t.scopeName, n
}
function Co(e) {
    const t = jN(e),
        n = y.forwardRef((r, i) => {
            const {children: s, ...o} = r,
                a = y.Children.toArray(s),
                l = a.find(RN);
            if (l) {
                const u = l.props.children,
                    d = a.map(f => f === l ? y.Children.count(u) > 1 ? y.Children.only(null) : y.isValidElement(u) ? u.props.children : null : f);
                return c.jsx(t, {
                    ...o,
                    ref: i,
                    children: y.isValidElement(u) ? y.cloneElement(u, void 0, d) : null
                })
            }
            return c.jsx(t, {
                ...o,
                ref: i,
                children: s
            })
        });
    return n.displayName = `${e}.Slot`, n
}
var PN = Co("Slot");
function jN(e) {
    const t = y.forwardRef((n, r) => {
        const {children: i, ...s} = n;
        if (y.isValidElement(i)) {
            const o = MN(i),
                a = AN(s, i.props);
            return i.type !== y.Fragment && (a.ref = r ? S0(r, o) : o), y.cloneElement(i, a)
        }
        return y.Children.count(i) > 1 ? y.Children.only(null) : null
    });
    return t.displayName = `${e}.SlotClone`, t
}
var C0 = Symbol("radix.slottable");
function kN(e) {
    const t = ({children: n}) => c.jsx(c.Fragment, {
        children: n
    });
    return t.displayName = `${e}.Slottable`, t.__radixId = C0, t
}
function RN(e) {
    return y.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === C0
}
function AN(e, t) {
    const n = {
        ...t
    };
    for (const r in t) {
        const i = e[r],
            s = t[r];
        /^on[A-Z]/.test(r) ? i && s ? n[r] = (...a) => {
            const l = s(...a);
            return i(...a), l
        } : i && (n[r] = i) : r === "style" ? n[r] = {
            ...i,
            ...s
        } : r === "className" && (n[r] = [i, s].filter(Boolean).join(" "))
    }
    return {
        ...e,
        ...n
    }
}
function MN(e) {
    var r,
        i;
    let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get,
        n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = (i = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : i.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}
function E0(e) {
    const t = e + "CollectionProvider",
        [n, r] = $o(t),
        [i, s] = n(t, {
            collectionRef: {
                current: null
            },
            itemMap: new Map
        }),
        o = m => {
            const {scope: w, children: v} = m,
                g = I.useRef(null),
                x = I.useRef(new Map).current;
            return c.jsx(i, {
                scope: w,
                itemMap: x,
                collectionRef: g,
                children: v
            })
        };
    o.displayName = t;
    const a = e + "CollectionSlot",
        l = Co(a),
        u = I.forwardRef((m, w) => {
            const {scope: v, children: g} = m,
                x = s(a, v),
                S = Re(w, x.collectionRef);
            return c.jsx(l, {
                ref: S,
                children: g
            })
        });
    u.displayName = a;
    const d = e + "CollectionItemSlot",
        f = "data-radix-collection-item",
        h = Co(d),
        p = I.forwardRef((m, w) => {
            const {scope: v, children: g, ...x} = m,
                S = I.useRef(null),
                C = Re(w, S),
                E = s(d, v);
            return I.useEffect(() => (E.itemMap.set(S, {
                ref: S,
                ...x
            }), () => void E.itemMap.delete(S))), c.jsx(h, {
                [f]: "",
                ref: C,
                children: g
            })
        });
    p.displayName = d;
    function b(m) {
        const w = s(e + "CollectionConsumer", m);
        return I.useCallback(() => {
            const g = w.collectionRef.current;
            if (!g)
                return [];
            const x = Array.from(g.querySelectorAll(`[${f}]`));
            return Array.from(w.itemMap.values()).sort((E, N) => x.indexOf(E.ref.current) - x.indexOf(N.ref.current))
        }, [w.collectionRef, w.itemMap])
    }
    return [{
        Provider: o,
        Slot: u,
        ItemSlot: p
    }, b, r]
}
var ON = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"],
    ue = ON.reduce((e, t) => {
        const n = Co(`Primitive.${t}`),
            r = y.forwardRef((i, s) => {
                const {asChild: o, ...a} = i,
                    l = o ? n : t;
                return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), c.jsx(l, {
                    ...a,
                    ref: s
                })
            });
        return r.displayName = `Primitive.${t}`, {
            ...e,
            [t]: r
        }
    }, {});
function N0(e, t) {
    e && ci.flushSync(() => e.dispatchEvent(t))
}
function nn(e) {
    const t = y.useRef(e);
    return y.useEffect(() => {
        t.current = e
    }), y.useMemo(() => (...n) => {
        var r;
        return (r = t.current) == null ? void 0 : r.call(t, ...n)
    }, [])
}
function IN(e, t=globalThis == null ? void 0 : globalThis.document) {
    const n = nn(e);
    y.useEffect(() => {
        const r = i => {
            i.key === "Escape" && n(i)
        };
        return t.addEventListener("keydown", r, {
            capture: !0
        }), () => t.removeEventListener("keydown", r, {
            capture: !0
        })
    }, [n, t])
}
var DN = "DismissableLayer",
    Rd = "dismissableLayer.update",
    LN = "dismissableLayer.pointerDownOutside",
    _N = "dismissableLayer.focusOutside",
    Bm,
    T0 = y.createContext({
        layers: new Set,
        layersWithOutsidePointerEventsDisabled: new Set,
        branches: new Set
    }),
    ec = y.forwardRef((e, t) => {
        const {disableOutsidePointerEvents: n=!1, onEscapeKeyDown: r, onPointerDownOutside: i, onFocusOutside: s, onInteractOutside: o, onDismiss: a, ...l} = e,
            u = y.useContext(T0),
            [d, f] = y.useState(null),
            h = (d == null ? void 0 : d.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document),
            [, p] = y.useState({}),
            b = Re(t, N => f(N)),
            m = Array.from(u.layers),
            [w] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1),
            v = m.indexOf(w),
            g = d ? m.indexOf(d) : -1,
            x = u.layersWithOutsidePointerEventsDisabled.size > 0,
            S = g >= v,
            C = FN(N => {
                const T = N.target,
                    k = [...u.branches].some(A => A.contains(T));
                !S || k || (i == null || i(N), o == null || o(N), N.defaultPrevented || a == null || a())
            }, h),
            E = zN(N => {
                const T = N.target;
                [...u.branches].some(A => A.contains(T)) || (s == null || s(N), o == null || o(N), N.defaultPrevented || a == null || a())
            }, h);
        return IN(N => {
            g === u.layers.size - 1 && (r == null || r(N), !N.defaultPrevented && a && (N.preventDefault(), a()))
        }, h), y.useEffect(() => {
            if (d)
                return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (Bm = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), $m(), () => {
                    n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = Bm)
                }
        }, [d, h, n, u]), y.useEffect(() => () => {
            d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), $m())
        }, [d, u]), y.useEffect(() => {
            const N = () => p({});
            return document.addEventListener(Rd, N), () => document.removeEventListener(Rd, N)
        }, []), c.jsx(ue.div, {
            ...l,
            ref: b,
            style: {
                pointerEvents: x ? S ? "auto" : "none" : void 0,
                ...e.style
            },
            onFocusCapture: ee(e.onFocusCapture, E.onFocusCapture),
            onBlurCapture: ee(e.onBlurCapture, E.onBlurCapture),
            onPointerDownCapture: ee(e.onPointerDownCapture, C.onPointerDownCapture)
        })
    });
ec.displayName = DN;
var VN = "DismissableLayerBranch",
    P0 = y.forwardRef((e, t) => {
        const n = y.useContext(T0),
            r = y.useRef(null),
            i = Re(t, r);
        return y.useEffect(() => {
            const s = r.current;
            if (s)
                return n.branches.add(s), () => {
                    n.branches.delete(s)
                }
        }, [n.branches]), c.jsx(ue.div, {
            ...e,
            ref: i
        })
    });
P0.displayName = VN;
function FN(e, t=globalThis == null ? void 0 : globalThis.document) {
    const n = nn(e),
        r = y.useRef(!1),
        i = y.useRef(() => {});
    return y.useEffect(() => {
        const s = a => {
                if (a.target && !r.current) {
                    let l = function() {
                        j0(LN, n, u, {
                            discrete: !0
                        })
                    };
                    const u = {
                        originalEvent: a
                    };
                    a.pointerType === "touch" ? (t.removeEventListener("click", i.current), i.current = l, t.addEventListener("click", i.current, {
                        once: !0
                    })) : l()
                } else
                    t.removeEventListener("click", i.current);
                r.current = !1
            },
            o = window.setTimeout(() => {
                t.addEventListener("pointerdown", s)
            }, 0);
        return () => {
            window.clearTimeout(o),
            t.removeEventListener("pointerdown", s),
            t.removeEventListener("click", i.current)
        }
    }, [t, n]), {
        onPointerDownCapture: () => r.current = !0
    }
}
function zN(e, t=globalThis == null ? void 0 : globalThis.document) {
    const n = nn(e),
        r = y.useRef(!1);
    return y.useEffect(() => {
        const i = s => {
            s.target && !r.current && j0(_N, n, {
                originalEvent: s
            }, {
                discrete: !1
            })
        };
        return t.addEventListener("focusin", i), () => t.removeEventListener("focusin", i)
    }, [t, n]), {
        onFocusCapture: () => r.current = !0,
        onBlurCapture: () => r.current = !1
    }
}
function $m() {
    const e = new CustomEvent(Rd);
    document.dispatchEvent(e)
}
function j0(e, t, n, {discrete: r}) {
    const i = n.originalEvent.target,
        s = new CustomEvent(e, {
            bubbles: !1,
            cancelable: !0,
            detail: n
        });
    t && i.addEventListener(e, t, {
        once: !0
    }),
    r ? N0(i, s) : i.dispatchEvent(s)
}
var BN = ec,
    $N = P0,
    He = globalThis != null && globalThis.document ? y.useLayoutEffect : () => {},
    UN = "Portal",
    xh = y.forwardRef((e, t) => {
        var a;
        const {container: n, ...r} = e,
            [i, s] = y.useState(!1);
        He(() => s(!0), []);
        const o = n || i && ((a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : a.body);
        return o ? w0.createPortal(c.jsx(ue.div, {
            ...r,
            ref: t
        }), o) : null
    });
xh.displayName = UN;
function WN(e, t) {
    return y.useReducer((n, r) => t[n][r] ?? n, e)
}
var wh = e => {
    const {present: t, children: n} = e,
        r = HN(t),
        i = typeof n == "function" ? n({
            present: r.isPresent
        }) : y.Children.only(n),
        s = Re(r.ref, KN(i));
    return typeof n == "function" || r.isPresent ? y.cloneElement(i, {
        ref: s
    }) : null
};
wh.displayName = "Presence";
function HN(e) {
    const [t, n] = y.useState(),
        r = y.useRef(null),
        i = y.useRef(e),
        s = y.useRef("none"),
        o = e ? "mounted" : "unmounted",
        [a, l] = WN(o, {
            mounted: {
                UNMOUNT: "unmounted",
                ANIMATION_OUT: "unmountSuspended"
            },
            unmountSuspended: {
                MOUNT: "mounted",
                ANIMATION_END: "unmounted"
            },
            unmounted: {
                MOUNT: "mounted"
            }
        });
    return y.useEffect(() => {
        const u = ya(r.current);
        s.current = a === "mounted" ? u : "none"
    }, [a]), He(() => {
        const u = r.current,
            d = i.current;
        if (d !== e) {
            const h = s.current,
                p = ya(u);
            e ? l("MOUNT") : p === "none" || (u == null ? void 0 : u.display) === "none" ? l("UNMOUNT") : l(d && h !== p ? "ANIMATION_OUT" : "UNMOUNT"),
            i.current = e
        }
    }, [e, l]), He(() => {
        if (t) {
            let u;
            const d = t.ownerDocument.defaultView ?? window,
                f = p => {
                    const m = ya(r.current).includes(p.animationName);
                    if (p.target === t && m && (l("ANIMATION_END"), !i.current)) {
                        const w = t.style.animationFillMode;
                        t.style.animationFillMode = "forwards",
                        u = d.setTimeout(() => {
                            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = w)
                        })
                    }
                },
                h = p => {
                    p.target === t && (s.current = ya(r.current))
                };
            return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
                d.clearTimeout(u),
                t.removeEventListener("animationstart", h),
                t.removeEventListener("animationcancel", f),
                t.removeEventListener("animationend", f)
            }
        } else
            l("ANIMATION_END")
    }, [t, l]), {
        isPresent: ["mounted", "unmountSuspended"].includes(a),
        ref: y.useCallback(u => {
            r.current = u ? getComputedStyle(u) : null,
            n(u)
        }, [])
    }
}
function ya(e) {
    return (e == null ? void 0 : e.animationName) || "none"
}
function KN(e) {
    var r,
        i;
    let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get,
        n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = (i = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : i.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}
var GN = jf[" useInsertionEffect ".trim().toString()] || He;
function Ad({prop: e, defaultProp: t, onChange: n=() => {}, caller: r}) {
    const [i, s, o] = qN({
            defaultProp: t,
            onChange: n
        }),
        a = e !== void 0,
        l = a ? e : i;
    {
        const d = y.useRef(e !== void 0);
        y.useEffect(() => {
            const f = d.current;
            f !== a && console.warn(`${r} is changing from ${f ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),
            d.current = a
        }, [a, r])
    }
    const u = y.useCallback(d => {
        var f;
        if (a) {
            const h = QN(d) ? d(e) : d;
            h !== e && ((f = o.current) == null || f.call(o, h))
        } else
            s(d)
    }, [a, e, s, o]);
    return [l, u]
}
function qN({defaultProp: e, onChange: t}) {
    const [n, r] = y.useState(e),
        i = y.useRef(n),
        s = y.useRef(t);
    return GN(() => {
        s.current = t
    }, [t]), y.useEffect(() => {
        var o;
        i.current !== n && ((o = s.current) == null || o.call(s, n), i.current = n)
    }, [n, i]), [n, r, s]
}
function QN(e) {
    return typeof e == "function"
}
var k0 = Object.freeze({
        position: "absolute",
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
    }),
    YN = "VisuallyHidden",
    tc = y.forwardRef((e, t) => c.jsx(ue.span, {
        ...e,
        ref: t,
        style: {
            ...k0,
            ...e.style
        }
    }));
tc.displayName = YN;
var XN = tc,
    bh = "ToastProvider",
    [Sh, ZN, JN] = E0("Toast"),
    [R0, XL] = $o("Toast", [JN]),
    [eT, nc] = R0(bh),
    A0 = e => {
        const {__scopeToast: t, label: n="Notification", duration: r=5e3, swipeDirection: i="right", swipeThreshold: s=50, children: o} = e,
            [a, l] = y.useState(null),
            [u, d] = y.useState(0),
            f = y.useRef(!1),
            h = y.useRef(!1);
        return n.trim() || console.error(`Invalid prop \`label\` supplied to \`${bh}\`. Expected non-empty \`string\`.`), c.jsx(Sh.Provider, {
            scope: t,
            children: c.jsx(eT, {
                scope: t,
                label: n,
                duration: r,
                swipeDirection: i,
                swipeThreshold: s,
                toastCount: u,
                viewport: a,
                onViewportChange: l,
                onToastAdd: y.useCallback(() => d(p => p + 1), []),
                onToastRemove: y.useCallback(() => d(p => p - 1), []),
                isFocusedToastEscapeKeyDownRef: f,
                isClosePausedRef: h,
                children: o
            })
        })
    };
A0.displayName = bh;
var M0 = "ToastViewport",
    tT = ["F8"],
    Md = "toast.viewportPause",
    Od = "toast.viewportResume",
    O0 = y.forwardRef((e, t) => {
        const {__scopeToast: n, hotkey: r=tT, label: i="Notifications ({hotkey})", ...s} = e,
            o = nc(M0, n),
            a = ZN(n),
            l = y.useRef(null),
            u = y.useRef(null),
            d = y.useRef(null),
            f = y.useRef(null),
            h = Re(t, f, o.onViewportChange),
            p = r.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
            b = o.toastCount > 0;
        y.useEffect(() => {
            const w = v => {
                var x;
                r.length !== 0 && r.every(S => v[S] || v.code === S) && ((x = f.current) == null || x.focus())
            };
            return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w)
        }, [r]),
        y.useEffect(() => {
            const w = l.current,
                v = f.current;
            if (b && w && v) {
                const g = () => {
                        if (!o.isClosePausedRef.current) {
                            const E = new CustomEvent(Md);
                            v.dispatchEvent(E),
                            o.isClosePausedRef.current = !0
                        }
                    },
                    x = () => {
                        if (o.isClosePausedRef.current) {
                            const E = new CustomEvent(Od);
                            v.dispatchEvent(E),
                            o.isClosePausedRef.current = !1
                        }
                    },
                    S = E => {
                        !w.contains(E.relatedTarget) && x()
                    },
                    C = () => {
                        w.contains(document.activeElement) || x()
                    };
                return w.addEventListener("focusin", g), w.addEventListener("focusout", S), w.addEventListener("pointermove", g), w.addEventListener("pointerleave", C), window.addEventListener("blur", g), window.addEventListener("focus", x), () => {
                    w.removeEventListener("focusin", g),
                    w.removeEventListener("focusout", S),
                    w.removeEventListener("pointermove", g),
                    w.removeEventListener("pointerleave", C),
                    window.removeEventListener("blur", g),
                    window.removeEventListener("focus", x)
                }
            }
        }, [b, o.isClosePausedRef]);
        const m = y.useCallback(({tabbingDirection: w}) => {
            const g = a().map(x => {
                const S = x.ref.current,
                    C = [S, ...pT(S)];
                return w === "forwards" ? C : C.reverse()
            });
            return (w === "forwards" ? g.reverse() : g).flat()
        }, [a]);
        return y.useEffect(() => {
            const w = f.current;
            if (w) {
                const v = g => {
                    var C,
                        E,
                        N;
                    const x = g.altKey || g.ctrlKey || g.metaKey;
                    if (g.key === "Tab" && !x) {
                        const T = document.activeElement,
                            k = g.shiftKey;
                        if (g.target === w && k) {
                            (C = u.current) == null || C.focus();
                            return
                        }
                        const D = m({
                                tabbingDirection: k ? "backwards" : "forwards"
                            }),
                            H = D.findIndex(O => O === T);
                        tu(D.slice(H + 1)) ? g.preventDefault() : k ? (E = u.current) == null || E.focus() : (N = d.current) == null || N.focus()
                    }
                };
                return w.addEventListener("keydown", v), () => w.removeEventListener("keydown", v)
            }
        }, [a, m]), c.jsxs($N, {
            ref: l,
            role: "region",
            "aria-label": i.replace("{hotkey}", p),
            tabIndex: -1,
            style: {
                pointerEvents: b ? void 0 : "none"
            },
            children: [b && c.jsx(Id, {
                ref: u,
                onFocusFromOutsideViewport: () => {
                    const w = m({
                        tabbingDirection: "forwards"
                    });
                    tu(w)
                }
            }), c.jsx(Sh.Slot, {
                scope: n,
                children: c.jsx(ue.ol, {
                    tabIndex: -1,
                    ...s,
                    ref: h
                })
            }), b && c.jsx(Id, {
                ref: d,
                onFocusFromOutsideViewport: () => {
                    const w = m({
                        tabbingDirection: "backwards"
                    });
                    tu(w)
                }
            })]
        })
    });
O0.displayName = M0;
var I0 = "ToastFocusProxy",
    Id = y.forwardRef((e, t) => {
        const {__scopeToast: n, onFocusFromOutsideViewport: r, ...i} = e,
            s = nc(I0, n);
        return c.jsx(tc, {
            "aria-hidden": !0,
            tabIndex: 0,
            ...i,
            ref: t,
            style: {
                position: "fixed"
            },
            onFocus: o => {
                var u;
                const a = o.relatedTarget;
                !((u = s.viewport) != null && u.contains(a)) && r()
            }
        })
    });
Id.displayName = I0;
var Uo = "Toast",
    nT = "toast.swipeStart",
    rT = "toast.swipeMove",
    iT = "toast.swipeCancel",
    sT = "toast.swipeEnd",
    D0 = y.forwardRef((e, t) => {
        const {forceMount: n, open: r, defaultOpen: i, onOpenChange: s, ...o} = e,
            [a, l] = Ad({
                prop: r,
                defaultProp: i ?? !0,
                onChange: s,
                caller: Uo
            });
        return c.jsx(wh, {
            present: n || a,
            children: c.jsx(lT, {
                open: a,
                ...o,
                ref: t,
                onClose: () => l(!1),
                onPause: nn(e.onPause),
                onResume: nn(e.onResume),
                onSwipeStart: ee(e.onSwipeStart, u => {
                    u.currentTarget.setAttribute("data-swipe", "start")
                }),
                onSwipeMove: ee(e.onSwipeMove, u => {
                    const {x: d, y: f} = u.detail.delta;
                    u.currentTarget.setAttribute("data-swipe", "move"),
                    u.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${d}px`),
                    u.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${f}px`)
                }),
                onSwipeCancel: ee(e.onSwipeCancel, u => {
                    u.currentTarget.setAttribute("data-swipe", "cancel"),
                    u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
                    u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
                    u.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),
                    u.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")
                }),
                onSwipeEnd: ee(e.onSwipeEnd, u => {
                    const {x: d, y: f} = u.detail.delta;
                    u.currentTarget.setAttribute("data-swipe", "end"),
                    u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
                    u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
                    u.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${d}px`),
                    u.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${f}px`),
                    l(!1)
                })
            })
        })
    });
D0.displayName = Uo;
var [oT, aT] = R0(Uo, {
        onClose() {}
    }),
    lT = y.forwardRef((e, t) => {
        const {__scopeToast: n, type: r="foreground", duration: i, open: s, onClose: o, onEscapeKeyDown: a, onPause: l, onResume: u, onSwipeStart: d, onSwipeMove: f, onSwipeCancel: h, onSwipeEnd: p, ...b} = e,
            m = nc(Uo, n),
            [w, v] = y.useState(null),
            g = Re(t, O => v(O)),
            x = y.useRef(null),
            S = y.useRef(null),
            C = i || m.duration,
            E = y.useRef(0),
            N = y.useRef(C),
            T = y.useRef(0),
            {onToastAdd: k, onToastRemove: A} = m,
            z = nn(() => {
                var K;
                (w == null ? void 0 : w.contains(document.activeElement)) && ((K = m.viewport) == null || K.focus()),
                o()
            }),
            D = y.useCallback(O => {
                !O || O === 1 / 0 || (window.clearTimeout(T.current), E.current = new Date().getTime(), T.current = window.setTimeout(z, O))
            }, [z]);
        y.useEffect(() => {
            const O = m.viewport;
            if (O) {
                const K = () => {
                        D(N.current),
                        u == null || u()
                    },
                    U = () => {
                        const V = new Date().getTime() - E.current;
                        N.current = N.current - V,
                        window.clearTimeout(T.current),
                        l == null || l()
                    };
                return O.addEventListener(Md, U), O.addEventListener(Od, K), () => {
                    O.removeEventListener(Md, U),
                    O.removeEventListener(Od, K)
                }
            }
        }, [m.viewport, C, l, u, D]),
        y.useEffect(() => {
            s && !m.isClosePausedRef.current && D(C)
        }, [s, C, m.isClosePausedRef, D]),
        y.useEffect(() => (k(), () => A()), [k, A]);
        const H = y.useMemo(() => w ? $0(w) : null, [w]);
        return m.viewport ? c.jsxs(c.Fragment, {
            children: [H && c.jsx(cT, {
                __scopeToast: n,
                role: "status",
                "aria-live": r === "foreground" ? "assertive" : "polite",
                "aria-atomic": !0,
                children: H
            }), c.jsx(oT, {
                scope: n,
                onClose: z,
                children: ci.createPortal(c.jsx(Sh.ItemSlot, {
                    scope: n,
                    children: c.jsx(BN, {
                        asChild: !0,
                        onEscapeKeyDown: ee(a, () => {
                            m.isFocusedToastEscapeKeyDownRef.current || z(),
                            m.isFocusedToastEscapeKeyDownRef.current = !1
                        }),
                        children: c.jsx(ue.li, {
                            role: "status",
                            "aria-live": "off",
                            "aria-atomic": !0,
                            tabIndex: 0,
                            "data-state": s ? "open" : "closed",
                            "data-swipe-direction": m.swipeDirection,
                            ...b,
                            ref: g,
                            style: {
                                userSelect: "none",
                                touchAction: "none",
                                ...e.style
                            },
                            onKeyDown: ee(e.onKeyDown, O => {
                                O.key === "Escape" && (a == null || a(O.nativeEvent), O.nativeEvent.defaultPrevented || (m.isFocusedToastEscapeKeyDownRef.current = !0, z()))
                            }),
                            onPointerDown: ee(e.onPointerDown, O => {
                                O.button === 0 && (x.current = {
                                    x: O.clientX,
                                    y: O.clientY
                                })
                            }),
                            onPointerMove: ee(e.onPointerMove, O => {
                                if (!x.current)
                                    return;
                                const K = O.clientX - x.current.x,
                                    U = O.clientY - x.current.y,
                                    V = !!S.current,
                                    P = ["left", "right"].includes(m.swipeDirection),
                                    j = ["left", "up"].includes(m.swipeDirection) ? Math.min : Math.max,
                                    L = P ? j(0, K) : 0,
                                    G = P ? 0 : j(0, U),
                                    W = O.pointerType === "touch" ? 10 : 2,
                                    X = {
                                        x: L,
                                        y: G
                                    },
                                    q = {
                                        originalEvent: O,
                                        delta: X
                                    };
                                V ? (S.current = X, va(rT, f, q, {
                                    discrete: !1
                                })) : Um(X, m.swipeDirection, W) ? (S.current = X, va(nT, d, q, {
                                    discrete: !1
                                }), O.target.setPointerCapture(O.pointerId)) : (Math.abs(K) > W || Math.abs(U) > W) && (x.current = null)
                            }),
                            onPointerUp: ee(e.onPointerUp, O => {
                                const K = S.current,
                                    U = O.target;
                                if (U.hasPointerCapture(O.pointerId) && U.releasePointerCapture(O.pointerId), S.current = null, x.current = null, K) {
                                    const V = O.currentTarget,
                                        P = {
                                            originalEvent: O,
                                            delta: K
                                        };
                                    Um(K, m.swipeDirection, m.swipeThreshold) ? va(sT, p, P, {
                                        discrete: !0
                                    }) : va(iT, h, P, {
                                        discrete: !0
                                    }),
                                    V.addEventListener("click", j => j.preventDefault(), {
                                        once: !0
                                    })
                                }
                            })
                        })
                    })
                }), m.viewport)
            })]
        }) : null
    }),
    cT = e => {
        const {__scopeToast: t, children: n, ...r} = e,
            i = nc(Uo, t),
            [s, o] = y.useState(!1),
            [a, l] = y.useState(!1);
        return fT(() => o(!0)), y.useEffect(() => {
            const u = window.setTimeout(() => l(!0), 1e3);
            return () => window.clearTimeout(u)
        }, []), a ? null : c.jsx(xh, {
            asChild: !0,
            children: c.jsx(tc, {
                ...r,
                children: s && c.jsxs(c.Fragment, {
                    children: [i.label, " ", n]
                })
            })
        })
    },
    uT = "ToastTitle",
    L0 = y.forwardRef((e, t) => {
        const {__scopeToast: n, ...r} = e;
        return c.jsx(ue.div, {
            ...r,
            ref: t
        })
    });
L0.displayName = uT;
var dT = "ToastDescription",
    _0 = y.forwardRef((e, t) => {
        const {__scopeToast: n, ...r} = e;
        return c.jsx(ue.div, {
            ...r,
            ref: t
        })
    });
_0.displayName = dT;
var V0 = "ToastAction",
    F0 = y.forwardRef((e, t) => {
        const {altText: n, ...r} = e;
        return n.trim() ? c.jsx(B0, {
            altText: n,
            asChild: !0,
            children: c.jsx(Ch, {
                ...r,
                ref: t
            })
        }) : (console.error(`Invalid prop \`altText\` supplied to \`${V0}\`. Expected non-empty \`string\`.`), null)
    });
F0.displayName = V0;
var z0 = "ToastClose",
    Ch = y.forwardRef((e, t) => {
        const {__scopeToast: n, ...r} = e,
            i = aT(z0, n);
        return c.jsx(B0, {
            asChild: !0,
            children: c.jsx(ue.button, {
                type: "button",
                ...r,
                ref: t,
                onClick: ee(e.onClick, i.onClose)
            })
        })
    });
Ch.displayName = z0;
var B0 = y.forwardRef((e, t) => {
    const {__scopeToast: n, altText: r, ...i} = e;
    return c.jsx(ue.div, {
        "data-radix-toast-announce-exclude": "",
        "data-radix-toast-announce-alt": r || void 0,
        ...i,
        ref: t
    })
});
function $0(e) {
    const t = [];
    return Array.from(e.childNodes).forEach(r => {
        if (r.nodeType === r.TEXT_NODE && r.textContent && t.push(r.textContent), hT(r)) {
            const i = r.ariaHidden || r.hidden || r.style.display === "none",
                s = r.dataset.radixToastAnnounceExclude === "";
            if (!i)
                if (s) {
                    const o = r.dataset.radixToastAnnounceAlt;
                    o && t.push(o)
                } else
                    t.push(...$0(r))
        }
    }), t
}
function va(e, t, n, {discrete: r}) {
    const i = n.originalEvent.currentTarget,
        s = new CustomEvent(e, {
            bubbles: !0,
            cancelable: !0,
            detail: n
        });
    t && i.addEventListener(e, t, {
        once: !0
    }),
    r ? N0(i, s) : i.dispatchEvent(s)
}
var Um = (e, t, n=0) => {
    const r = Math.abs(e.x),
        i = Math.abs(e.y),
        s = r > i;
    return t === "left" || t === "right" ? s && r > n : !s && i > n
};
function fT(e=() => {}) {
    const t = nn(e);
    He(() => {
        let n = 0,
            r = 0;
        return n = window.requestAnimationFrame(() => r = window.requestAnimationFrame(t)), () => {
            window.cancelAnimationFrame(n),
            window.cancelAnimationFrame(r)
        }
    }, [t])
}
function hT(e) {
    return e.nodeType === e.ELEMENT_NODE
}
function pT(e) {
    const t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: r => {
                const i = r.tagName === "INPUT" && r.type === "hidden";
                return r.disabled || r.hidden || i ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
            }
        });
    for (; n.nextNode();)
        t.push(n.currentNode);
    return t
}
function tu(e) {
    const t = document.activeElement;
    return e.some(n => n === t ? !0 : (n.focus(), document.activeElement !== t))
}
var mT = A0,
    U0 = O0,
    W0 = D0,
    H0 = L0,
    K0 = _0,
    G0 = F0,
    q0 = Ch;
function Q0(e) {
    var t,
        n,
        r = "";
    if (typeof e == "string" || typeof e == "number")
        r += e;
    else if (typeof e == "object")
        if (Array.isArray(e)) {
            var i = e.length;
            for (t = 0; t < i; t++)
                e[t] && (n = Q0(e[t])) && (r && (r += " "), r += n)
        } else
            for (n in e)
                e[n] && (r && (r += " "), r += n);
    return r
}
function Y0() {
    for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++)
        (e = arguments[n]) && (t = Q0(e)) && (r && (r += " "), r += t);
    return r
}
const Wm = e => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e,
    Hm = Y0,
    Eh = (e, t) => n => {
        var r;
        if ((t == null ? void 0 : t.variants) == null)
            return Hm(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
        const {variants: i, defaultVariants: s} = t,
            o = Object.keys(i).map(u => {
                const d = n == null ? void 0 : n[u],
                    f = s == null ? void 0 : s[u];
                if (d === null)
                    return null;
                const h = Wm(d) || Wm(f);
                return i[u][h]
            }),
            a = n && Object.entries(n).reduce((u, d) => {
                let [f, h] = d;
                return h === void 0 || (u[f] = h), u
            }, {}),
            l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, d) => {
                let {class: f, className: h, ...p} = d;
                return Object.entries(p).every(b => {
                    let [m, w] = b;
                    return Array.isArray(w) ? w.includes({
                        ...s,
                        ...a
                    }[m]) : {
                        ...s,
                        ...a
                    }[m] === w
                }) ? [...u, f, h] : u
            }, []);
        return Hm(e, o, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className)
    }; /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const gT = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
    X0 = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




var yT = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
}; /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const vT = y.forwardRef(({color: e="currentColor", size: t=24, strokeWidth: n=2, absoluteStrokeWidth: r, className: i="", children: s, iconNode: o, ...a}, l) => y.createElement("svg", {
    ref: l,
    ...yT,
    width: t,
    height: t,
    stroke: e,
    strokeWidth: r ? Number(n) * 24 / Number(t) : n,
    className: X0("lucide", i),
    ...a
}, [...o.map(([u, d]) => y.createElement(u, d)), ...Array.isArray(s) ? s : [s]])); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const te = (e, t) => {
    const n = y.forwardRef(({className: r, ...i}, s) => y.createElement(vT, {
        ref: s,
        iconNode: t,
        className: X0(`lucide-${gT(e)}`, r),
        ...i
    }));
    return n.displayName = `${e}`, n
}; /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const Z0 = te("Activity", [["path", {
    d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
    key: "169zse"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const en = te("ArrowRight", [["path", {
    d: "M5 12h14",
    key: "1ays0h"
}], ["path", {
    d: "m12 5 7 7-7 7",
    key: "xquz4c"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const xT = te("Bell", [["path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",
    key: "1qo2s2"
}], ["path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0",
    key: "qgo35s"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const wT = te("Briefcase", [["path", {
    d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
    key: "jecpp"
}], ["rect", {
    width: "20",
    height: "14",
    x: "2",
    y: "6",
    rx: "2",
    key: "i6l2r4"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const ui = te("Building2", [["path", {
    d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",
    key: "1b4qmf"
}], ["path", {
    d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",
    key: "i71pzd"
}], ["path", {
    d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",
    key: "10jefs"
}], ["path", {
    d: "M10 6h4",
    key: "1itunk"
}], ["path", {
    d: "M10 10h4",
    key: "tcdvrf"
}], ["path", {
    d: "M10 14h4",
    key: "kelpxr"
}], ["path", {
    d: "M10 18h4",
    key: "1ulq68"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const rc = te("ChartColumn", [["path", {
    d: "M3 3v16a2 2 0 0 0 2 2h16",
    key: "c24i48"
}], ["path", {
    d: "M18 17V9",
    key: "2bz60n"
}], ["path", {
    d: "M13 17V5",
    key: "1frdt8"
}], ["path", {
    d: "M8 17v-3",
    key: "17ska0"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const bT = te("Check", [["path", {
    d: "M20 6 9 17l-5-5",
    key: "1gmf2c"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const J0 = te("ChevronDown", [["path", {
    d: "m6 9 6 6 6-6",
    key: "qrunsl"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const ST = te("ChevronRight", [["path", {
    d: "m9 18 6-6-6-6",
    key: "mthhwq"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const CT = te("ChevronUp", [["path", {
    d: "m18 15-6-6-6 6",
    key: "153udz"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const ET = te("CircleAlert", [["circle", {
    cx: "12",
    cy: "12",
    r: "10",
    key: "1mglay"
}], ["line", {
    x1: "12",
    x2: "12",
    y1: "8",
    y2: "12",
    key: "1pkeuh"
}], ["line", {
    x1: "12",
    x2: "12.01",
    y1: "16",
    y2: "16",
    key: "4dfq90"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const ls = te("CircleCheck", [["circle", {
    cx: "12",
    cy: "12",
    r: "10",
    key: "1mglay"
}], ["path", {
    d: "m9 12 2 2 4-4",
    key: "dzmm74"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const NT = te("Cloud", [["path", {
    d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
    key: "p7xjir"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const TT = te("Database", [["ellipse", {
    cx: "12",
    cy: "5",
    rx: "9",
    ry: "3",
    key: "msslwz"
}], ["path", {
    d: "M3 5V19A9 3 0 0 0 21 19V5",
    key: "1wlel7"
}], ["path", {
    d: "M3 12A9 3 0 0 0 21 12",
    key: "mv7ke4"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const PT = te("EyeOff", [["path", {
    d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
    key: "ct8e1f"
}], ["path", {
    d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
    key: "151rxh"
}], ["path", {
    d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
    key: "13bj9a"
}], ["path", {
    d: "m2 2 20 20",
    key: "1ooewy"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const jT = te("Eye", [["path", {
    d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
    key: "1nclc0"
}], ["circle", {
    cx: "12",
    cy: "12",
    r: "3",
    key: "1v7zrd"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const kT = te("FileCheck", [["path", {
    d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
    key: "1rqfz7"
}], ["path", {
    d: "M14 2v4a2 2 0 0 0 2 2h4",
    key: "tnqrlb"
}], ["path", {
    d: "m9 15 2 2 4-4",
    key: "1grp1n"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const Wo = te("Globe", [["circle", {
    cx: "12",
    cy: "12",
    r: "10",
    key: "1mglay"
}], ["path", {
    d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
    key: "13o1zl"
}], ["path", {
    d: "M2 12h20",
    key: "9i4pu4"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const RT = te("Handshake", [["path", {
    d: "m11 17 2 2a1 1 0 1 0 3-3",
    key: "efffak"
}], ["path", {
    d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
    key: "9pr0kb"
}], ["path", {
    d: "m21 3 1 11h-2",
    key: "1tisrp"
}], ["path", {
    d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",
    key: "1uvwmv"
}], ["path", {
    d: "M3 4h8",
    key: "1ep09j"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const AT = te("Key", [["path", {
    d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",
    key: "g0fldk"
}], ["path", {
    d: "m21 2-9.6 9.6",
    key: "1j0ho8"
}], ["circle", {
    cx: "7.5",
    cy: "15.5",
    r: "5.5",
    key: "yqb3hr"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const Nh = te("Landmark", [["line", {
    x1: "3",
    x2: "21",
    y1: "22",
    y2: "22",
    key: "j8o0r"
}], ["line", {
    x1: "6",
    x2: "6",
    y1: "18",
    y2: "11",
    key: "10tf0k"
}], ["line", {
    x1: "10",
    x2: "10",
    y1: "18",
    y2: "11",
    key: "54lgf6"
}], ["line", {
    x1: "14",
    x2: "14",
    y1: "18",
    y2: "11",
    key: "380y"
}], ["line", {
    x1: "18",
    x2: "18",
    y1: "18",
    y2: "11",
    key: "1kevvc"
}], ["polygon", {
    points: "12 2 20 7 4 7",
    key: "jkujk7"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const ri = te("Lock", [["rect", {
    width: "18",
    height: "11",
    x: "3",
    y: "11",
    rx: "2",
    ry: "2",
    key: "1w4ew1"
}], ["path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4",
    key: "fwvmzm"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const MT = te("LogOut", [["path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
    key: "1uf3rs"
}], ["polyline", {
    points: "16 17 21 12 16 7",
    key: "1gabdz"
}], ["line", {
    x1: "21",
    x2: "9",
    y1: "12",
    y2: "12",
    key: "1uyos4"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const OT = te("Mail", [["rect", {
    width: "20",
    height: "16",
    x: "2",
    y: "4",
    rx: "2",
    key: "18n3k1"
}], ["path", {
    d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
    key: "1ocrg3"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const Th = te("MapPin", [["path", {
    d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
    key: "1r0f0z"
}], ["circle", {
    cx: "12",
    cy: "10",
    r: "3",
    key: "ilqhr7"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const IT = te("Menu", [["line", {
    x1: "4",
    x2: "20",
    y1: "12",
    y2: "12",
    key: "1e0a9i"
}], ["line", {
    x1: "4",
    x2: "20",
    y1: "6",
    y2: "6",
    key: "1owob3"
}], ["line", {
    x1: "4",
    x2: "20",
    y1: "18",
    y2: "18",
    key: "yk5zj1"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const ew = te("Network", [["rect", {
    x: "16",
    y: "16",
    width: "6",
    height: "6",
    rx: "1",
    key: "4q2zg0"
}], ["rect", {
    x: "2",
    y: "16",
    width: "6",
    height: "6",
    rx: "1",
    key: "8cvhb9"
}], ["rect", {
    x: "9",
    y: "2",
    width: "6",
    height: "6",
    rx: "1",
    key: "1egb70"
}], ["path", {
    d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",
    key: "1jsf9p"
}], ["path", {
    d: "M12 12V8",
    key: "2874zd"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const DT = te("Server", [["rect", {
    width: "20",
    height: "8",
    x: "2",
    y: "2",
    rx: "2",
    ry: "2",
    key: "ngkwjq"
}], ["rect", {
    width: "20",
    height: "8",
    x: "2",
    y: "14",
    rx: "2",
    ry: "2",
    key: "iecqi9"
}], ["line", {
    x1: "6",
    x2: "6.01",
    y1: "6",
    y2: "6",
    key: "16zg32"
}], ["line", {
    x1: "6",
    x2: "6.01",
    y1: "18",
    y2: "18",
    key: "nzw8ys"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const LT = te("Settings", [["path", {
    d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
    key: "1qme2f"
}], ["circle", {
    cx: "12",
    cy: "12",
    r: "3",
    key: "1v7zrd"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const Nr = te("Shield", [["path", {
    d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    key: "oel41y"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const ic = te("Target", [["circle", {
    cx: "12",
    cy: "12",
    r: "10",
    key: "1mglay"
}], ["circle", {
    cx: "12",
    cy: "12",
    r: "6",
    key: "1vlfrh"
}], ["circle", {
    cx: "12",
    cy: "12",
    r: "2",
    key: "1c9p78"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const _T = te("TrendingUp", [["polyline", {
    points: "22 7 13.5 15.5 8.5 10.5 2 17",
    key: "126l90"
}], ["polyline", {
    points: "16 7 22 7 22 13",
    key: "kwv8wd"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const VT = te("UsersRound", [["path", {
    d: "M18 21a8 8 0 0 0-16 0",
    key: "3ypg7q"
}], ["circle", {
    cx: "10",
    cy: "8",
    r: "5",
    key: "o932ke"
}], ["path", {
    d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",
    key: "10s06x"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const Ho = te("Users", [["path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    key: "1yyitq"
}], ["circle", {
    cx: "9",
    cy: "7",
    r: "4",
    key: "nufk8"
}], ["path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87",
    key: "kshegd"
}], ["path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75",
    key: "1da9ce"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const sc = te("Vote", [["path", {
    d: "m9 12 2 2 4-4",
    key: "dzmm74"
}], ["path", {
    d: "M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z",
    key: "1ezoue"
}], ["path", {
    d: "M22 19H2",
    key: "nuriw5"
}]]); /**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */




const tw = te("X", [["path", {
        d: "M18 6 6 18",
        key: "1bl5f8"
    }], ["path", {
        d: "m6 6 12 12",
        key: "d8bk6v"
    }]]),
    Ph = "-",
    FT = e => {
        const t = BT(e),
            {conflictingClassGroups: n, conflictingClassGroupModifiers: r} = e;
        return {
            getClassGroupId: o => {
                const a = o.split(Ph);
                return a[0] === "" && a.length !== 1 && a.shift(), nw(a, t) || zT(o)
            },
            getConflictingClassGroupIds: (o, a) => {
                const l = n[o] || [];
                return a && r[o] ? [...l, ...r[o]] : l
            }
        }
    },
    nw = (e, t) => {
        var o;
        if (e.length === 0)
            return t.classGroupId;
        const n = e[0],
            r = t.nextPart.get(n),
            i = r ? nw(e.slice(1), r) : void 0;
        if (i)
            return i;
        if (t.validators.length === 0)
            return;
        const s = e.join(Ph);
        return (o = t.validators.find(({validator: a}) => a(s))) == null ? void 0 : o.classGroupId
    },
    Km = /^\[(.+)\]$/,
    zT = e => {
        if (Km.test(e)) {
            const t = Km.exec(e)[1],
                n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
            if (n)
                return "arbitrary.." + n
        }
    },
    BT = e => {
        const {theme: t, prefix: n} = e,
            r = {
                nextPart: new Map,
                validators: []
            };
        return UT(Object.entries(e.classGroups), n).forEach(([s, o]) => {
            Dd(o, r, s, t)
        }), r
    },
    Dd = (e, t, n, r) => {
        e.forEach(i => {
            if (typeof i == "string") {
                const s = i === "" ? t : Gm(t, i);
                s.classGroupId = n;
                return
            }
            if (typeof i == "function") {
                if ($T(i)) {
                    Dd(i(r), t, n, r);
                    return
                }
                t.validators.push({
                    validator: i,
                    classGroupId: n
                });
                return
            }
            Object.entries(i).forEach(([s, o]) => {
                Dd(o, Gm(t, s), n, r)
            })
        })
    },
    Gm = (e, t) => {
        let n = e;
        return t.split(Ph).forEach(r => {
            n.nextPart.has(r) || n.nextPart.set(r, {
                nextPart: new Map,
                validators: []
            }),
            n = n.nextPart.get(r)
        }), n
    },
    $T = e => e.isThemeGetter,
    UT = (e, t) => t ? e.map(([n, r]) => {
        const i = r.map(s => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([o, a]) => [t + o, a])) : s);
        return [n, i]
    }) : e,
    WT = e => {
        if (e < 1)
            return {
                get: () => {},
                set: () => {}
            };
        let t = 0,
            n = new Map,
            r = new Map;
        const i = (s, o) => {
            n.set(s, o),
            t++,
            t > e && (t = 0, r = n, n = new Map)
        };
        return {
            get(s) {
                let o = n.get(s);
                if (o !== void 0)
                    return o;
                if ((o = r.get(s)) !== void 0)
                    return i(s, o), o
            },
            set(s, o) {
                n.has(s) ? n.set(s, o) : i(s, o)
            }
        }
    },
    rw = "!",
    HT = e => {
        const {separator: t, experimentalParseClassName: n} = e,
            r = t.length === 1,
            i = t[0],
            s = t.length,
            o = a => {
                const l = [];
                let u = 0,
                    d = 0,
                    f;
                for (let w = 0; w < a.length; w++) {
                    let v = a[w];
                    if (u === 0) {
                        if (v === i && (r || a.slice(w, w + s) === t)) {
                            l.push(a.slice(d, w)),
                            d = w + s;
                            continue
                        }
                        if (v === "/") {
                            f = w;
                            continue
                        }
                    }
                    v === "[" ? u++ : v === "]" && u--
                }
                const h = l.length === 0 ? a : a.substring(d),
                    p = h.startsWith(rw),
                    b = p ? h.substring(1) : h,
                    m = f && f > d ? f - d : void 0;
                return {
                    modifiers: l,
                    hasImportantModifier: p,
                    baseClassName: b,
                    maybePostfixModifierPosition: m
                }
            };
        return n ? a => n({
            className: a,
            parseClassName: o
        }) : o
    },
    KT = e => {
        if (e.length <= 1)
            return e;
        const t = [];
        let n = [];
        return e.forEach(r => {
            r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r)
        }), t.push(...n.sort()), t
    },
    GT = e => ({
        cache: WT(e.cacheSize),
        parseClassName: HT(e),
        ...FT(e)
    }),
    qT = /\s+/,
    QT = (e, t) => {
        const {parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i} = t,
            s = [],
            o = e.trim().split(qT);
        let a = "";
        for (let l = o.length - 1; l >= 0; l -= 1) {
            const u = o[l],
                {modifiers: d, hasImportantModifier: f, baseClassName: h, maybePostfixModifierPosition: p} = n(u);
            let b = !!p,
                m = r(b ? h.substring(0, p) : h);
            if (!m) {
                if (!b) {
                    a = u + (a.length > 0 ? " " + a : a);
                    continue
                }
                if (m = r(h), !m) {
                    a = u + (a.length > 0 ? " " + a : a);
                    continue
                }
                b = !1
            }
            const w = KT(d).join(":"),
                v = f ? w + rw : w,
                g = v + m;
            if (s.includes(g))
                continue;
            s.push(g);
            const x = i(m, b);
            for (let S = 0; S < x.length; ++S) {
                const C = x[S];
                s.push(v + C)
            }
            a = u + (a.length > 0 ? " " + a : a)
        }
        return a
    };
function YT() {
    let e = 0,
        t,
        n,
        r = "";
    for (; e < arguments.length;)
        (t = arguments[e++]) && (n = iw(t)) && (r && (r += " "), r += n);
    return r
}
const iw = e => {
    if (typeof e == "string")
        return e;
    let t,
        n = "";
    for (let r = 0; r < e.length; r++)
        e[r] && (t = iw(e[r])) && (n && (n += " "), n += t);
    return n
};
function XT(e, ...t) {
    let n,
        r,
        i,
        s = o;
    function o(l) {
        const u = t.reduce((d, f) => f(d), e());
        return n = GT(u), r = n.cache.get, i = n.cache.set, s = a, a(l)
    }
    function a(l) {
        const u = r(l);
        if (u)
            return u;
        const d = QT(l, n);
        return i(l, d), d
    }
    return function() {
        return s(YT.apply(null, arguments))
    }
}
const me = e => {
        const t = n => n[e] || [];
        return t.isThemeGetter = !0, t
    },
    sw = /^\[(?:([a-z-]+):)?(.+)\]$/i,
    ZT = /^\d+\/\d+$/,
    JT = new Set(["px", "full", "screen"]),
    e2 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    t2 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    n2 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
    r2 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    i2 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    Sn = e => Ui(e) || JT.has(e) || ZT.test(e),
    Un = e => gs(e, "length", f2),
    Ui = e => !!e && !Number.isNaN(Number(e)),
    nu = e => gs(e, "number", Ui),
    Ds = e => !!e && Number.isInteger(Number(e)),
    s2 = e => e.endsWith("%") && Ui(e.slice(0, -1)),
    Z = e => sw.test(e),
    Wn = e => e2.test(e),
    o2 = new Set(["length", "size", "percentage"]),
    a2 = e => gs(e, o2, ow),
    l2 = e => gs(e, "position", ow),
    c2 = new Set(["image", "url"]),
    u2 = e => gs(e, c2, p2),
    d2 = e => gs(e, "", h2),
    Ls = () => !0,
    gs = (e, t, n) => {
        const r = sw.exec(e);
        return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1
    },
    f2 = e => t2.test(e) && !n2.test(e),
    ow = () => !1,
    h2 = e => r2.test(e),
    p2 = e => i2.test(e),
    m2 = () => {
        const e = me("colors"),
            t = me("spacing"),
            n = me("blur"),
            r = me("brightness"),
            i = me("borderColor"),
            s = me("borderRadius"),
            o = me("borderSpacing"),
            a = me("borderWidth"),
            l = me("contrast"),
            u = me("grayscale"),
            d = me("hueRotate"),
            f = me("invert"),
            h = me("gap"),
            p = me("gradientColorStops"),
            b = me("gradientColorStopPositions"),
            m = me("inset"),
            w = me("margin"),
            v = me("opacity"),
            g = me("padding"),
            x = me("saturate"),
            S = me("scale"),
            C = me("sepia"),
            E = me("skew"),
            N = me("space"),
            T = me("translate"),
            k = () => ["auto", "contain", "none"],
            A = () => ["auto", "hidden", "clip", "visible", "scroll"],
            z = () => ["auto", Z, t],
            D = () => [Z, t],
            H = () => ["", Sn, Un],
            O = () => ["auto", Ui, Z],
            K = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"],
            U = () => ["solid", "dashed", "dotted", "double", "none"],
            V = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"],
            P = () => ["start", "end", "center", "between", "around", "evenly", "stretch"],
            j = () => ["", "0", Z],
            L = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
            G = () => [Ui, Z];
        return {
            cacheSize: 500,
            separator: ":",
            theme: {
                colors: [Ls],
                spacing: [Sn, Un],
                blur: ["none", "", Wn, Z],
                brightness: G(),
                borderColor: [e],
                borderRadius: ["none", "", "full", Wn, Z],
                borderSpacing: D(),
                borderWidth: H(),
                contrast: G(),
                grayscale: j(),
                hueRotate: G(),
                invert: j(),
                gap: D(),
                gradientColorStops: [e],
                gradientColorStopPositions: [s2, Un],
                inset: z(),
                margin: z(),
                opacity: G(),
                padding: D(),
                saturate: G(),
                scale: G(),
                sepia: j(),
                skew: G(),
                space: D(),
                translate: D()
            },
            classGroups: {
                aspect: [{
                    aspect: ["auto", "square", "video", Z]
                }],
                container: ["container"],
                columns: [{
                    columns: [Wn]
                }],
                "break-after": [{
                    "break-after": L()
                }],
                "break-before": [{
                    "break-before": L()
                }],
                "break-inside": [{
                    "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
                }],
                "box-decoration": [{
                    "box-decoration": ["slice", "clone"]
                }],
                box: [{
                    box: ["border", "content"]
                }],
                display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
                float: [{
                    float: ["right", "left", "none", "start", "end"]
                }],
                clear: [{
                    clear: ["left", "right", "both", "none", "start", "end"]
                }],
                isolation: ["isolate", "isolation-auto"],
                "object-fit": [{
                    object: ["contain", "cover", "fill", "none", "scale-down"]
                }],
                "object-position": [{
                    object: [...K(), Z]
                }],
                overflow: [{
                    overflow: A()
                }],
                "overflow-x": [{
                    "overflow-x": A()
                }],
                "overflow-y": [{
                    "overflow-y": A()
                }],
                overscroll: [{
                    overscroll: k()
                }],
                "overscroll-x": [{
                    "overscroll-x": k()
                }],
                "overscroll-y": [{
                    "overscroll-y": k()
                }],
                position: ["static", "fixed", "absolute", "relative", "sticky"],
                inset: [{
                    inset: [m]
                }],
                "inset-x": [{
                    "inset-x": [m]
                }],
                "inset-y": [{
                    "inset-y": [m]
                }],
                start: [{
                    start: [m]
                }],
                end: [{
                    end: [m]
                }],
                top: [{
                    top: [m]
                }],
                right: [{
                    right: [m]
                }],
                bottom: [{
                    bottom: [m]
                }],
                left: [{
                    left: [m]
                }],
                visibility: ["visible", "invisible", "collapse"],
                z: [{
                    z: ["auto", Ds, Z]
                }],
                basis: [{
                    basis: z()
                }],
                "flex-direction": [{
                    flex: ["row", "row-reverse", "col", "col-reverse"]
                }],
                "flex-wrap": [{
                    flex: ["wrap", "wrap-reverse", "nowrap"]
                }],
                flex: [{
                    flex: ["1", "auto", "initial", "none", Z]
                }],
                grow: [{
                    grow: j()
                }],
                shrink: [{
                    shrink: j()
                }],
                order: [{
                    order: ["first", "last", "none", Ds, Z]
                }],
                "grid-cols": [{
                    "grid-cols": [Ls]
                }],
                "col-start-end": [{
                    col: ["auto", {
                        span: ["full", Ds, Z]
                    }, Z]
                }],
                "col-start": [{
                    "col-start": O()
                }],
                "col-end": [{
                    "col-end": O()
                }],
                "grid-rows": [{
                    "grid-rows": [Ls]
                }],
                "row-start-end": [{
                    row: ["auto", {
                        span: [Ds, Z]
                    }, Z]
                }],
                "row-start": [{
                    "row-start": O()
                }],
                "row-end": [{
                    "row-end": O()
                }],
                "grid-flow": [{
                    "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
                }],
                "auto-cols": [{
                    "auto-cols": ["auto", "min", "max", "fr", Z]
                }],
                "auto-rows": [{
                    "auto-rows": ["auto", "min", "max", "fr", Z]
                }],
                gap: [{
                    gap: [h]
                }],
                "gap-x": [{
                    "gap-x": [h]
                }],
                "gap-y": [{
                    "gap-y": [h]
                }],
                "justify-content": [{
                    justify: ["normal", ...P()]
                }],
                "justify-items": [{
                    "justify-items": ["start", "end", "center", "stretch"]
                }],
                "justify-self": [{
                    "justify-self": ["auto", "start", "end", "center", "stretch"]
                }],
                "align-content": [{
                    content: ["normal", ...P(), "baseline"]
                }],
                "align-items": [{
                    items: ["start", "end", "center", "baseline", "stretch"]
                }],
                "align-self": [{
                    self: ["auto", "start", "end", "center", "stretch", "baseline"]
                }],
                "place-content": [{
                    "place-content": [...P(), "baseline"]
                }],
                "place-items": [{
                    "place-items": ["start", "end", "center", "baseline", "stretch"]
                }],
                "place-self": [{
                    "place-self": ["auto", "start", "end", "center", "stretch"]
                }],
                p: [{
                    p: [g]
                }],
                px: [{
                    px: [g]
                }],
                py: [{
                    py: [g]
                }],
                ps: [{
                    ps: [g]
                }],
                pe: [{
                    pe: [g]
                }],
                pt: [{
                    pt: [g]
                }],
                pr: [{
                    pr: [g]
                }],
                pb: [{
                    pb: [g]
                }],
                pl: [{
                    pl: [g]
                }],
                m: [{
                    m: [w]
                }],
                mx: [{
                    mx: [w]
                }],
                my: [{
                    my: [w]
                }],
                ms: [{
                    ms: [w]
                }],
                me: [{
                    me: [w]
                }],
                mt: [{
                    mt: [w]
                }],
                mr: [{
                    mr: [w]
                }],
                mb: [{
                    mb: [w]
                }],
                ml: [{
                    ml: [w]
                }],
                "space-x": [{
                    "space-x": [N]
                }],
                "space-x-reverse": ["space-x-reverse"],
                "space-y": [{
                    "space-y": [N]
                }],
                "space-y-reverse": ["space-y-reverse"],
                w: [{
                    w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", Z, t]
                }],
                "min-w": [{
                    "min-w": [Z, t, "min", "max", "fit"]
                }],
                "max-w": [{
                    "max-w": [Z, t, "none", "full", "min", "max", "fit", "prose", {
                        screen: [Wn]
                    }, Wn]
                }],
                h: [{
                    h: [Z, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
                }],
                "min-h": [{
                    "min-h": [Z, t, "min", "max", "fit", "svh", "lvh", "dvh"]
                }],
                "max-h": [{
                    "max-h": [Z, t, "min", "max", "fit", "svh", "lvh", "dvh"]
                }],
                size: [{
                    size: [Z, t, "auto", "min", "max", "fit"]
                }],
                "font-size": [{
                    text: ["base", Wn, Un]
                }],
                "font-smoothing": ["antialiased", "subpixel-antialiased"],
                "font-style": ["italic", "not-italic"],
                "font-weight": [{
                    font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", nu]
                }],
                "font-family": [{
                    font: [Ls]
                }],
                "fvn-normal": ["normal-nums"],
                "fvn-ordinal": ["ordinal"],
                "fvn-slashed-zero": ["slashed-zero"],
                "fvn-figure": ["lining-nums", "oldstyle-nums"],
                "fvn-spacing": ["proportional-nums", "tabular-nums"],
                "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
                tracking: [{
                    tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", Z]
                }],
                "line-clamp": [{
                    "line-clamp": ["none", Ui, nu]
                }],
                leading: [{
                    leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Sn, Z]
                }],
                "list-image": [{
                    "list-image": ["none", Z]
                }],
                "list-style-type": [{
                    list: ["none", "disc", "decimal", Z]
                }],
                "list-style-position": [{
                    list: ["inside", "outside"]
                }],
                "placeholder-color": [{
                    placeholder: [e]
                }],
                "placeholder-opacity": [{
                    "placeholder-opacity": [v]
                }],
                "text-alignment": [{
                    text: ["left", "center", "right", "justify", "start", "end"]
                }],
                "text-color": [{
                    text: [e]
                }],
                "text-opacity": [{
                    "text-opacity": [v]
                }],
                "text-decoration": ["underline", "overline", "line-through", "no-underline"],
                "text-decoration-style": [{
                    decoration: [...U(), "wavy"]
                }],
                "text-decoration-thickness": [{
                    decoration: ["auto", "from-font", Sn, Un]
                }],
                "underline-offset": [{
                    "underline-offset": ["auto", Sn, Z]
                }],
                "text-decoration-color": [{
                    decoration: [e]
                }],
                "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
                "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
                "text-wrap": [{
                    text: ["wrap", "nowrap", "balance", "pretty"]
                }],
                indent: [{
                    indent: D()
                }],
                "vertical-align": [{
                    align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", Z]
                }],
                whitespace: [{
                    whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
                }],
                break: [{
                    break: ["normal", "words", "all", "keep"]
                }],
                hyphens: [{
                    hyphens: ["none", "manual", "auto"]
                }],
                content: [{
                    content: ["none", Z]
                }],
                "bg-attachment": [{
                    bg: ["fixed", "local", "scroll"]
                }],
                "bg-clip": [{
                    "bg-clip": ["border", "padding", "content", "text"]
                }],
                "bg-opacity": [{
                    "bg-opacity": [v]
                }],
                "bg-origin": [{
                    "bg-origin": ["border", "padding", "content"]
                }],
                "bg-position": [{
                    bg: [...K(), l2]
                }],
                "bg-repeat": [{
                    bg: ["no-repeat", {
                        repeat: ["", "x", "y", "round", "space"]
                    }]
                }],
                "bg-size": [{
                    bg: ["auto", "cover", "contain", a2]
                }],
                "bg-image": [{
                    bg: ["none", {
                        "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
                    }, u2]
                }],
                "bg-color": [{
                    bg: [e]
                }],
                "gradient-from-pos": [{
                    from: [b]
                }],
                "gradient-via-pos": [{
                    via: [b]
                }],
                "gradient-to-pos": [{
                    to: [b]
                }],
                "gradient-from": [{
                    from: [p]
                }],
                "gradient-via": [{
                    via: [p]
                }],
                "gradient-to": [{
                    to: [p]
                }],
                rounded: [{
                    rounded: [s]
                }],
                "rounded-s": [{
                    "rounded-s": [s]
                }],
                "rounded-e": [{
                    "rounded-e": [s]
                }],
                "rounded-t": [{
                    "rounded-t": [s]
                }],
                "rounded-r": [{
                    "rounded-r": [s]
                }],
                "rounded-b": [{
                    "rounded-b": [s]
                }],
                "rounded-l": [{
                    "rounded-l": [s]
                }],
                "rounded-ss": [{
                    "rounded-ss": [s]
                }],
                "rounded-se": [{
                    "rounded-se": [s]
                }],
                "rounded-ee": [{
                    "rounded-ee": [s]
                }],
                "rounded-es": [{
                    "rounded-es": [s]
                }],
                "rounded-tl": [{
                    "rounded-tl": [s]
                }],
                "rounded-tr": [{
                    "rounded-tr": [s]
                }],
                "rounded-br": [{
                    "rounded-br": [s]
                }],
                "rounded-bl": [{
                    "rounded-bl": [s]
                }],
                "border-w": [{
                    border: [a]
                }],
                "border-w-x": [{
                    "border-x": [a]
                }],
                "border-w-y": [{
                    "border-y": [a]
                }],
                "border-w-s": [{
                    "border-s": [a]
                }],
                "border-w-e": [{
                    "border-e": [a]
                }],
                "border-w-t": [{
                    "border-t": [a]
                }],
                "border-w-r": [{
                    "border-r": [a]
                }],
                "border-w-b": [{
                    "border-b": [a]
                }],
                "border-w-l": [{
                    "border-l": [a]
                }],
                "border-opacity": [{
                    "border-opacity": [v]
                }],
                "border-style": [{
                    border: [...U(), "hidden"]
                }],
                "divide-x": [{
                    "divide-x": [a]
                }],
                "divide-x-reverse": ["divide-x-reverse"],
                "divide-y": [{
                    "divide-y": [a]
                }],
                "divide-y-reverse": ["divide-y-reverse"],
                "divide-opacity": [{
                    "divide-opacity": [v]
                }],
                "divide-style": [{
                    divide: U()
                }],
                "border-color": [{
                    border: [i]
                }],
                "border-color-x": [{
                    "border-x": [i]
                }],
                "border-color-y": [{
                    "border-y": [i]
                }],
                "border-color-s": [{
                    "border-s": [i]
                }],
                "border-color-e": [{
                    "border-e": [i]
                }],
                "border-color-t": [{
                    "border-t": [i]
                }],
                "border-color-r": [{
                    "border-r": [i]
                }],
                "border-color-b": [{
                    "border-b": [i]
                }],
                "border-color-l": [{
                    "border-l": [i]
                }],
                "divide-color": [{
                    divide: [i]
                }],
                "outline-style": [{
                    outline: ["", ...U()]
                }],
                "outline-offset": [{
                    "outline-offset": [Sn, Z]
                }],
                "outline-w": [{
                    outline: [Sn, Un]
                }],
                "outline-color": [{
                    outline: [e]
                }],
                "ring-w": [{
                    ring: H()
                }],
                "ring-w-inset": ["ring-inset"],
                "ring-color": [{
                    ring: [e]
                }],
                "ring-opacity": [{
                    "ring-opacity": [v]
                }],
                "ring-offset-w": [{
                    "ring-offset": [Sn, Un]
                }],
                "ring-offset-color": [{
                    "ring-offset": [e]
                }],
                shadow: [{
                    shadow: ["", "inner", "none", Wn, d2]
                }],
                "shadow-color": [{
                    shadow: [Ls]
                }],
                opacity: [{
                    opacity: [v]
                }],
                "mix-blend": [{
                    "mix-blend": [...V(), "plus-lighter", "plus-darker"]
                }],
                "bg-blend": [{
                    "bg-blend": V()
                }],
                filter: [{
                    filter: ["", "none"]
                }],
                blur: [{
                    blur: [n]
                }],
                brightness: [{
                    brightness: [r]
                }],
                contrast: [{
                    contrast: [l]
                }],
                "drop-shadow": [{
                    "drop-shadow": ["", "none", Wn, Z]
                }],
                grayscale: [{
                    grayscale: [u]
                }],
                "hue-rotate": [{
                    "hue-rotate": [d]
                }],
                invert: [{
                    invert: [f]
                }],
                saturate: [{
                    saturate: [x]
                }],
                sepia: [{
                    sepia: [C]
                }],
                "backdrop-filter": [{
                    "backdrop-filter": ["", "none"]
                }],
                "backdrop-blur": [{
                    "backdrop-blur": [n]
                }],
                "backdrop-brightness": [{
                    "backdrop-brightness": [r]
                }],
                "backdrop-contrast": [{
                    "backdrop-contrast": [l]
                }],
                "backdrop-grayscale": [{
                    "backdrop-grayscale": [u]
                }],
                "backdrop-hue-rotate": [{
                    "backdrop-hue-rotate": [d]
                }],
                "backdrop-invert": [{
                    "backdrop-invert": [f]
                }],
                "backdrop-opacity": [{
                    "backdrop-opacity": [v]
                }],
                "backdrop-saturate": [{
                    "backdrop-saturate": [x]
                }],
                "backdrop-sepia": [{
                    "backdrop-sepia": [C]
                }],
                "border-collapse": [{
                    border: ["collapse", "separate"]
                }],
                "border-spacing": [{
                    "border-spacing": [o]
                }],
                "border-spacing-x": [{
                    "border-spacing-x": [o]
                }],
                "border-spacing-y": [{
                    "border-spacing-y": [o]
                }],
                "table-layout": [{
                    table: ["auto", "fixed"]
                }],
                caption: [{
                    caption: ["top", "bottom"]
                }],
                transition: [{
                    transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", Z]
                }],
                duration: [{
                    duration: G()
                }],
                ease: [{
                    ease: ["linear", "in", "out", "in-out", Z]
                }],
                delay: [{
                    delay: G()
                }],
                animate: [{
                    animate: ["none", "spin", "ping", "pulse", "bounce", Z]
                }],
                transform: [{
                    transform: ["", "gpu", "none"]
                }],
                scale: [{
                    scale: [S]
                }],
                "scale-x": [{
                    "scale-x": [S]
                }],
                "scale-y": [{
                    "scale-y": [S]
                }],
                rotate: [{
                    rotate: [Ds, Z]
                }],
                "translate-x": [{
                    "translate-x": [T]
                }],
                "translate-y": [{
                    "translate-y": [T]
                }],
                "skew-x": [{
                    "skew-x": [E]
                }],
                "skew-y": [{
                    "skew-y": [E]
                }],
                "transform-origin": [{
                    origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", Z]
                }],
                accent: [{
                    accent: ["auto", e]
                }],
                appearance: [{
                    appearance: ["none", "auto"]
                }],
                cursor: [{
                    cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", Z]
                }],
                "caret-color": [{
                    caret: [e]
                }],
                "pointer-events": [{
                    "pointer-events": ["none", "auto"]
                }],
                resize: [{
                    resize: ["none", "y", "x", ""]
                }],
                "scroll-behavior": [{
                    scroll: ["auto", "smooth"]
                }],
                "scroll-m": [{
                    "scroll-m": D()
                }],
                "scroll-mx": [{
                    "scroll-mx": D()
                }],
                "scroll-my": [{
                    "scroll-my": D()
                }],
                "scroll-ms": [{
                    "scroll-ms": D()
                }],
                "scroll-me": [{
                    "scroll-me": D()
                }],
                "scroll-mt": [{
                    "scroll-mt": D()
                }],
                "scroll-mr": [{
                    "scroll-mr": D()
                }],
                "scroll-mb": [{
                    "scroll-mb": D()
                }],
                "scroll-ml": [{
                    "scroll-ml": D()
                }],
                "scroll-p": [{
                    "scroll-p": D()
                }],
                "scroll-px": [{
                    "scroll-px": D()
                }],
                "scroll-py": [{
                    "scroll-py": D()
                }],
                "scroll-ps": [{
                    "scroll-ps": D()
                }],
                "scroll-pe": [{
                    "scroll-pe": D()
                }],
                "scroll-pt": [{
                    "scroll-pt": D()
                }],
                "scroll-pr": [{
                    "scroll-pr": D()
                }],
                "scroll-pb": [{
                    "scroll-pb": D()
                }],
                "scroll-pl": [{
                    "scroll-pl": D()
                }],
                "snap-align": [{
                    snap: ["start", "end", "center", "align-none"]
                }],
                "snap-stop": [{
                    snap: ["normal", "always"]
                }],
                "snap-type": [{
                    snap: ["none", "x", "y", "both"]
                }],
                "snap-strictness": [{
                    snap: ["mandatory", "proximity"]
                }],
                touch: [{
                    touch: ["auto", "none", "manipulation"]
                }],
                "touch-x": [{
                    "touch-pan": ["x", "left", "right"]
                }],
                "touch-y": [{
                    "touch-pan": ["y", "up", "down"]
                }],
                "touch-pz": ["touch-pinch-zoom"],
                select: [{
                    select: ["none", "text", "all", "auto"]
                }],
                "will-change": [{
                    "will-change": ["auto", "scroll", "contents", "transform", Z]
                }],
                fill: [{
                    fill: [e, "none"]
                }],
                "stroke-w": [{
                    stroke: [Sn, Un, nu]
                }],
                stroke: [{
                    stroke: [e, "none"]
                }],
                sr: ["sr-only", "not-sr-only"],
                "forced-color-adjust": [{
                    "forced-color-adjust": ["auto", "none"]
                }]
            },
            conflictingClassGroups: {
                overflow: ["overflow-x", "overflow-y"],
                overscroll: ["overscroll-x", "overscroll-y"],
                inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
                "inset-x": ["right", "left"],
                "inset-y": ["top", "bottom"],
                flex: ["basis", "grow", "shrink"],
                gap: ["gap-x", "gap-y"],
                p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
                px: ["pr", "pl"],
                py: ["pt", "pb"],
                m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
                mx: ["mr", "ml"],
                my: ["mt", "mb"],
                size: ["w", "h"],
                "font-size": ["leading"],
                "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
                "fvn-ordinal": ["fvn-normal"],
                "fvn-slashed-zero": ["fvn-normal"],
                "fvn-figure": ["fvn-normal"],
                "fvn-spacing": ["fvn-normal"],
                "fvn-fraction": ["fvn-normal"],
                "line-clamp": ["display", "overflow"],
                rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
                "rounded-s": ["rounded-ss", "rounded-es"],
                "rounded-e": ["rounded-se", "rounded-ee"],
                "rounded-t": ["rounded-tl", "rounded-tr"],
                "rounded-r": ["rounded-tr", "rounded-br"],
                "rounded-b": ["rounded-br", "rounded-bl"],
                "rounded-l": ["rounded-tl", "rounded-bl"],
                "border-spacing": ["border-spacing-x", "border-spacing-y"],
                "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
                "border-w-x": ["border-w-r", "border-w-l"],
                "border-w-y": ["border-w-t", "border-w-b"],
                "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
                "border-color-x": ["border-color-r", "border-color-l"],
                "border-color-y": ["border-color-t", "border-color-b"],
                "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
                "scroll-mx": ["scroll-mr", "scroll-ml"],
                "scroll-my": ["scroll-mt", "scroll-mb"],
                "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
                "scroll-px": ["scroll-pr", "scroll-pl"],
                "scroll-py": ["scroll-pt", "scroll-pb"],
                touch: ["touch-x", "touch-y", "touch-pz"],
                "touch-x": ["touch"],
                "touch-y": ["touch"],
                "touch-pz": ["touch"]
            },
            conflictingClassGroupModifiers: {
                "font-size": ["leading"]
            }
        }
    },
    g2 = XT(m2);
function Ve(...e) {
    return g2(Y0(e))
}
const y2 = mT,
    aw = y.forwardRef(({className: e, ...t}, n) => c.jsx(U0, {
        ref: n,
        className: Ve("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", e),
        ...t
    }));
aw.displayName = U0.displayName;
const v2 = Eh("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
        variants: {
            variant: {
                default: "border bg-background text-foreground",
                destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }),
    lw = y.forwardRef(({className: e, variant: t, ...n}, r) => c.jsx(W0, {
        ref: r,
        className: Ve(v2({
            variant: t
        }), e),
        ...n
    }));
lw.displayName = W0.displayName;
const x2 = y.forwardRef(({className: e, ...t}, n) => c.jsx(G0, {
    ref: n,
    className: Ve("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50", e),
    ...t
}));
x2.displayName = G0.displayName;
const cw = y.forwardRef(({className: e, ...t}, n) => c.jsx(q0, {
    ref: n,
    className: Ve("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", e),
    "toast-close": "",
    ...t,
    children: c.jsx(tw, {
        className: "h-4 w-4"
    })
}));
cw.displayName = q0.displayName;
const uw = y.forwardRef(({className: e, ...t}, n) => c.jsx(H0, {
    ref: n,
    className: Ve("text-sm font-semibold", e),
    ...t
}));
uw.displayName = H0.displayName;
const dw = y.forwardRef(({className: e, ...t}, n) => c.jsx(K0, {
    ref: n,
    className: Ve("text-sm opacity-90", e),
    ...t
}));
dw.displayName = K0.displayName;
function w2() {
    const {toasts: e} = Jl();
    return c.jsxs(y2, {
        children: [e.map(function({id: t, title: n, description: r, action: i, ...s}) {
            return c.jsxs(lw, {
                ...s,
                children: [c.jsxs("div", {
                    className: "grid gap-1",
                    children: [n && c.jsx(uw, {
                        children: n
                    }), r && c.jsx(dw, {
                        children: r
                    })]
                }), i, c.jsx(cw, {})]
            }, t)
        }), c.jsx(aw, {})]
    })
}
var qm = ["light", "dark"],
    b2 = "(prefers-color-scheme: dark)",
    S2 = y.createContext(void 0),
    C2 = {
        setTheme: e => {},
        themes: []
    },
    E2 = () => {
        var e;
        return (e = y.useContext(S2)) != null ? e : C2
    };
y.memo(({forcedTheme: e, storageKey: t, attribute: n, enableSystem: r, enableColorScheme: i, defaultTheme: s, value: o, attrs: a, nonce: l}) => {
    let u = s === "system",
        d = n === "class" ? `var d=document.documentElement,c=d.classList;${`c.remove(${a.map(b => `'${b}'`).join(",")})`};` : `var d=document.documentElement,n='${n}',s='setAttribute';`,
        f = i ? qm.includes(s) && s ? `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${s}'` : "if(e==='light'||e==='dark')d.style.colorScheme=e" : "",
        h = (b, m=!1, w=!0) => {
            let v = o ? o[b] : b,
                g = m ? b + "|| ''" : `'${v}'`,
                x = "";
            return i && w && !m && qm.includes(b) && (x += `d.style.colorScheme = '${b}';`), n === "class" ? m || v ? x += `c.add(${g})` : x += "null" : v && (x += `d[s](n,${g})`), x
        },
        p = e ? `!function(){${d}${h(e)}}()` : r ? `!function(){try{${d}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${u})){var t='${b2}',m=window.matchMedia(t);if(m.media!==t||m.matches){${h("dark")}}else{${h("light")}}}else if(e){${o ? `var x=${JSON.stringify(o)};` : ""}${h(o ? "x[e]" : "e", !0)}}${u ? "" : "else{" + h(s, !1, !1) + "}"}${f}}catch(e){}}()` : `!function(){try{${d}var e=localStorage.getItem('${t}');if(e){${o ? `var x=${JSON.stringify(o)};` : ""}${h(o ? "x[e]" : "e", !0)}}else{${h(s, !1, !1)};}${f}}catch(t){}}();`;
    return y.createElement("script", {
        nonce: l,
        dangerouslySetInnerHTML: {
            __html: p
        }
    })
});
var N2 = e => {
        switch (e) {
        case "success":
            return j2;
        case "info":
            return R2;
        case "warning":
            return k2;
        case "error":
            return A2;
        default:
            return null
        }
    },
    T2 = Array(12).fill(0),
    P2 = ({visible: e, className: t}) => I.createElement("div", {
        className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
        "data-visible": e
    }, I.createElement("div", {
        className: "sonner-spinner"
    }, T2.map((n, r) => I.createElement("div", {
        className: "sonner-loading-bar",
        key: `spinner-bar-${r}`
    })))),
    j2 = I.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, I.createElement("path", {
        fillRule: "evenodd",
        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
        clipRule: "evenodd"
    })),
    k2 = I.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, I.createElement("path", {
        fillRule: "evenodd",
        d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
        clipRule: "evenodd"
    })),
    R2 = I.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, I.createElement("path", {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
        clipRule: "evenodd"
    })),
    A2 = I.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, I.createElement("path", {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
        clipRule: "evenodd"
    })),
    M2 = I.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "12",
        height: "12",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, I.createElement("line", {
        x1: "18",
        y1: "6",
        x2: "6",
        y2: "18"
    }), I.createElement("line", {
        x1: "6",
        y1: "6",
        x2: "18",
        y2: "18"
    })),
    O2 = () => {
        let [e, t] = I.useState(document.hidden);
        return I.useEffect(() => {
            let n = () => {
                t(document.hidden)
            };
            return document.addEventListener("visibilitychange", n), () => window.removeEventListener("visibilitychange", n)
        }, []), e
    },
    Ld = 1,
    I2 = class {
        constructor()
        {
            this.subscribe = e => (this.subscribers.push(e), () => {
                let t = this.subscribers.indexOf(e);
                this.subscribers.splice(t, 1)
            }),
            this.publish = e => {
                this.subscribers.forEach(t => t(e))
            },
            this.addToast = e => {
                this.publish(e),
                this.toasts = [...this.toasts, e]
            },
            this.create = e => {
                var t;
                let {message: n, ...r} = e,
                    i = typeof (e == null ? void 0 : e.id) == "number" || ((t = e.id) == null ? void 0 : t.length) > 0 ? e.id : Ld++,
                    s = this.toasts.find(a => a.id === i),
                    o = e.dismissible === void 0 ? !0 : e.dismissible;
                return this.dismissedToasts.has(i) && this.dismissedToasts.delete(i), s ? this.toasts = this.toasts.map(a => a.id === i ? (this.publish({
                    ...a,
                    ...e,
                    id: i,
                    title: n
                }), {
                    ...a,
                    ...e,
                    id: i,
                    dismissible: o,
                    title: n
                }) : a) : this.addToast({
                    title: n,
                    ...r,
                    dismissible: o,
                    id: i
                }), i
            },
            this.dismiss = e => (this.dismissedToasts.add(e), e || this.toasts.forEach(t => {
                this.subscribers.forEach(n => n({
                    id: t.id,
                    dismiss: !0
                }))
            }), this.subscribers.forEach(t => t({
                id: e,
                dismiss: !0
            })), e),
            this.message = (e, t) => this.create({
                ...t,
                message: e
            }),
            this.error = (e, t) => this.create({
                ...t,
                message: e,
                type: "error"
            }),
            this.success = (e, t) => this.create({
                ...t,
                type: "success",
                message: e
            }),
            this.info = (e, t) => this.create({
                ...t,
                type: "info",
                message: e
            }),
            this.warning = (e, t) => this.create({
                ...t,
                type: "warning",
                message: e
            }),
            this.loading = (e, t) => this.create({
                ...t,
                type: "loading",
                message: e
            }),
            this.promise = (e, t) => {
                if (!t)
                    return;
                let n;
                t.loading !== void 0 && (n = this.create({
                    ...t,
                    promise: e,
                    type: "loading",
                    message: t.loading,
                    description: typeof t.description != "function" ? t.description : void 0
                }));
                let r = e instanceof Promise ? e : e(),
                    i = n !== void 0,
                    s,
                    o = r.then(async l => {
                        if (s = ["resolve", l], I.isValidElement(l))
                            i = !1,
                            this.create({
                                id: n,
                                type: "default",
                                message: l
                            });
                        else if (L2(l) && !l.ok) {
                            i = !1;
                            let u = typeof t.error == "function" ? await t.error(`HTTP error! status: ${l.status}`) : t.error,
                                d = typeof t.description == "function" ? await t.description(`HTTP error! status: ${l.status}`) : t.description;
                            this.create({
                                id: n,
                                type: "error",
                                message: u,
                                description: d
                            })
                        } else if (t.success !== void 0) {
                            i = !1;
                            let u = typeof t.success == "function" ? await t.success(l) : t.success,
                                d = typeof t.description == "function" ? await t.description(l) : t.description;
                            this.create({
                                id: n,
                                type: "success",
                                message: u,
                                description: d
                            })
                        }
                    }).catch(async l => {
                        if (s = ["reject", l], t.error !== void 0) {
                            i = !1;
                            let u = typeof t.error == "function" ? await t.error(l) : t.error,
                                d = typeof t.description == "function" ? await t.description(l) : t.description;
                            this.create({
                                id: n,
                                type: "error",
                                message: u,
                                description: d
                            })
                        }
                    }).finally(() => {
                        var l;
                        i && (this.dismiss(n), n = void 0),
                        (l = t.finally) == null || l.call(t)
                    }),
                    a = () => new Promise((l, u) => o.then(() => s[0] === "reject" ? u(s[1]) : l(s[1])).catch(u));
                return typeof n != "string" && typeof n != "number" ? {
                    unwrap: a
                } : Object.assign(n, {
                    unwrap: a
                })
            },
            this.custom = (e, t) => {
                let n = (t == null ? void 0 : t.id) || Ld++;
                return this.create({
                    jsx: e(n),
                    id: n,
                    ...t
                }), n
            },
            this.getActiveToasts = () => this.toasts.filter(e => !this.dismissedToasts.has(e.id)),
            this.subscribers = [],
            this.toasts = [],
            this.dismissedToasts = new Set
        }
    }
    ,
    ct = new I2,
    D2 = (e, t) => {
        let n = (t == null ? void 0 : t.id) || Ld++;
        return ct.addToast({
            title: e,
            ...t,
            id: n
        }), n
    },
    L2 = e => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number",
    _2 = D2,
    V2 = () => ct.toasts,
    F2 = () => ct.getActiveToasts();
Object.assign(_2, {
    success: ct.success,
    info: ct.info,
    warning: ct.warning,
    error: ct.error,
    custom: ct.custom,
    message: ct.message,
    promise: ct.promise,
    dismiss: ct.dismiss,
    loading: ct.loading
}, {
    getHistory: V2,
    getToasts: F2
});
function z2(e, {insertAt: t}={}) {
    if (typeof document > "u")
        return;
    let n = document.head || document.getElementsByTagName("head")[0],
        r = document.createElement("style");
    r.type = "text/css",
    t === "top" && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r),
    r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e))
}
z2(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`
);
function xa(e) {
    return e.label !== void 0
}
var B2 = 3,
    $2 = "32px",
    U2 = "16px",
    Qm = 4e3,
    W2 = 356,
    H2 = 14,
    K2 = 20,
    G2 = 200;
function Bt(...e) {
    return e.filter(Boolean).join(" ")
}
function q2(e) {
    let [t, n] = e.split("-"),
        r = [];
    return t && r.push(t), n && r.push(n), r
}
var Q2 = e => {
    var t,
        n,
        r,
        i,
        s,
        o,
        a,
        l,
        u,
        d,
        f;
    let {invert: h, toast: p, unstyled: b, interacting: m, setHeights: w, visibleToasts: v, heights: g, index: x, toasts: S, expanded: C, removeToast: E, defaultRichColors: N, closeButton: T, style: k, cancelButtonStyle: A, actionButtonStyle: z, className: D="", descriptionClassName: H="", duration: O, position: K, gap: U, loadingIcon: V, expandByDefault: P, classNames: j, icons: L, closeButtonAriaLabel: G="Close toast", pauseWhenPageIsHidden: W} = e,
        [X, q] = I.useState(null),
        [pe, Te] = I.useState(null),
        [_, le] = I.useState(!1),
        [Pe, oe] = I.useState(!1),
        [ne, ie] = I.useState(!1),
        [Ke, Ct] = I.useState(!1),
        [Rr, Vn] = I.useState(!1),
        [Ar, Ns] = I.useState(0),
        [hi, Cp] = I.useState(0),
        Ts = I.useRef(p.duration || O || Qm),
        Ep = I.useRef(null),
        Mr = I.useRef(null),
        zS = x === 0,
        BS = x + 1 <= v,
        Et = p.type,
        pi = p.dismissible !== !1,
        $S = p.className || "",
        US = p.descriptionClassName || "",
        Zo = I.useMemo(() => g.findIndex(Q => Q.toastId === p.id) || 0, [g, p.id]),
        WS = I.useMemo(() => {
            var Q;
            return (Q = p.closeButton) != null ? Q : T
        }, [p.closeButton, T]),
        Np = I.useMemo(() => p.duration || O || Qm, [p.duration, O]),
        Ec = I.useRef(0),
        mi = I.useRef(0),
        Tp = I.useRef(0),
        gi = I.useRef(null),
        [HS, KS] = K.split("-"),
        Pp = I.useMemo(() => g.reduce((Q, de, xe) => xe >= Zo ? Q : Q + de.height, 0), [g, Zo]),
        jp = O2(),
        GS = p.invert || h,
        Nc = Et === "loading";
    mi.current = I.useMemo(() => Zo * U + Pp, [Zo, Pp]),
    I.useEffect(() => {
        Ts.current = Np
    }, [Np]),
    I.useEffect(() => {
        le(!0)
    }, []),
    I.useEffect(() => {
        let Q = Mr.current;
        if (Q) {
            let de = Q.getBoundingClientRect().height;
            return Cp(de), w(xe => [{
                toastId: p.id,
                height: de,
                position: p.position
            }, ...xe]), () => w(xe => xe.filter(_t => _t.toastId !== p.id))
        }
    }, [w, p.id]),
    I.useLayoutEffect(() => {
        if (!_)
            return;
        let Q = Mr.current,
            de = Q.style.height;
        Q.style.height = "auto";
        let xe = Q.getBoundingClientRect().height;
        Q.style.height = de,
        Cp(xe),
        w(_t => _t.find(Vt => Vt.toastId === p.id) ? _t.map(Vt => Vt.toastId === p.id ? {
            ...Vt,
            height: xe
        } : Vt) : [{
            toastId: p.id,
            height: xe,
            position: p.position
        }, ..._t])
    }, [_, p.title, p.description, w, p.id]);
    let Fn = I.useCallback(() => {
        oe(!0),
        Ns(mi.current),
        w(Q => Q.filter(de => de.toastId !== p.id)),
        setTimeout(() => {
            E(p)
        }, G2)
    }, [p, E, w, mi]);
    I.useEffect(() => {
        if (p.promise && Et === "loading" || p.duration === 1 / 0 || p.type === "loading")
            return;
        let Q;
        return C || m || W && jp ? (() => {
            if (Tp.current < Ec.current) {
                let de = new Date().getTime() - Ec.current;
                Ts.current = Ts.current - de
            }
            Tp.current = new Date().getTime()
        })() : Ts.current !== 1 / 0 && (Ec.current = new Date().getTime(), Q = setTimeout(() => {
            var de;
            (de = p.onAutoClose) == null || de.call(p, p),
            Fn()
        }, Ts.current)), () => clearTimeout(Q)
    }, [C, m, p, Et, W, jp, Fn]),
    I.useEffect(() => {
        p.delete && Fn()
    }, [Fn, p.delete]);
    function qS() {
        var Q,
            de,
            xe;
        return L != null && L.loading ? I.createElement("div", {
            className: Bt(j == null ? void 0 : j.loader, (Q = p == null ? void 0 : p.classNames) == null ? void 0 : Q.loader, "sonner-loader"),
            "data-visible": Et === "loading"
        }, L.loading) : V ? I.createElement("div", {
            className: Bt(j == null ? void 0 : j.loader, (de = p == null ? void 0 : p.classNames) == null ? void 0 : de.loader, "sonner-loader"),
            "data-visible": Et === "loading"
        }, V) : I.createElement(P2, {
            className: Bt(j == null ? void 0 : j.loader, (xe = p == null ? void 0 : p.classNames) == null ? void 0 : xe.loader),
            visible: Et === "loading"
        })
    }
    return I.createElement("li", {
        tabIndex: 0,
        ref: Mr,
        className: Bt(D, $S, j == null ? void 0 : j.toast, (t = p == null ? void 0 : p.classNames) == null ? void 0 : t.toast, j == null ? void 0 : j.default, j == null ? void 0 : j[Et], (n = p == null ? void 0 : p.classNames) == null ? void 0 : n[Et]),
        "data-sonner-toast": "",
        "data-rich-colors": (r = p.richColors) != null ? r : N,
        "data-styled": !(p.jsx || p.unstyled || b),
        "data-mounted": _,
        "data-promise": !!p.promise,
        "data-swiped": Rr,
        "data-removed": Pe,
        "data-visible": BS,
        "data-y-position": HS,
        "data-x-position": KS,
        "data-index": x,
        "data-front": zS,
        "data-swiping": ne,
        "data-dismissible": pi,
        "data-type": Et,
        "data-invert": GS,
        "data-swipe-out": Ke,
        "data-swipe-direction": pe,
        "data-expanded": !!(C || P && _),
        style: {
            "--index": x,
            "--toasts-before": x,
            "--z-index": S.length - x,
            "--offset": `${Pe ? Ar : mi.current}px`,
            "--initial-height": P ? "auto" : `${hi}px`,
            ...k,
            ...p.style
        },
        onDragEnd: () => {
            ie(!1),
            q(null),
            gi.current = null
        },
        onPointerDown: Q => {
            Nc || !pi || (Ep.current = new Date, Ns(mi.current), Q.target.setPointerCapture(Q.pointerId), Q.target.tagName !== "BUTTON" && (ie(!0), gi.current = {
                x: Q.clientX,
                y: Q.clientY
            }))
        },
        onPointerUp: () => {
            var Q,
                de,
                xe,
                _t;
            if (Ke || !pi)
                return;
            gi.current = null;
            let Vt = Number(((Q = Mr.current) == null ? void 0 : Q.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0),
                zn = Number(((de = Mr.current) == null ? void 0 : de.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0),
                Or = new Date().getTime() - ((xe = Ep.current) == null ? void 0 : xe.getTime()),
                Ft = X === "x" ? Vt : zn,
                Bn = Math.abs(Ft) / Or;
            if (Math.abs(Ft) >= K2 || Bn > .11) {
                Ns(mi.current),
                (_t = p.onDismiss) == null || _t.call(p, p),
                Te(X === "x" ? Vt > 0 ? "right" : "left" : zn > 0 ? "down" : "up"),
                Fn(),
                Ct(!0),
                Vn(!1);
                return
            }
            ie(!1),
            q(null)
        },
        onPointerMove: Q => {
            var de,
                xe,
                _t,
                Vt;
            if (!gi.current || !pi || ((de = window.getSelection()) == null ? void 0 : de.toString().length) > 0)
                return;
            let zn = Q.clientY - gi.current.y,
                Or = Q.clientX - gi.current.x,
                Ft = (xe = e.swipeDirections) != null ? xe : q2(K);
            !X && (Math.abs(Or) > 1 || Math.abs(zn) > 1) && q(Math.abs(Or) > Math.abs(zn) ? "x" : "y");
            let Bn = {
                x: 0,
                y: 0
            };
            X === "y" ? (Ft.includes("top") || Ft.includes("bottom")) && (Ft.includes("top") && zn < 0 || Ft.includes("bottom") && zn > 0) && (Bn.y = zn) : X === "x" && (Ft.includes("left") || Ft.includes("right")) && (Ft.includes("left") && Or < 0 || Ft.includes("right") && Or > 0) && (Bn.x = Or),
            (Math.abs(Bn.x) > 0 || Math.abs(Bn.y) > 0) && Vn(!0),
            (_t = Mr.current) == null || _t.style.setProperty("--swipe-amount-x", `${Bn.x}px`),
            (Vt = Mr.current) == null || Vt.style.setProperty("--swipe-amount-y", `${Bn.y}px`)
        }
    }, WS && !p.jsx ? I.createElement("button", {
        "aria-label": G,
        "data-disabled": Nc,
        "data-close-button": !0,
        onClick: Nc || !pi ? () => {} : () => {
            var Q;
            Fn(),
            (Q = p.onDismiss) == null || Q.call(p, p)
        },
        className: Bt(j == null ? void 0 : j.closeButton, (i = p == null ? void 0 : p.classNames) == null ? void 0 : i.closeButton)
    }, (s = L == null ? void 0 : L.close) != null ? s : M2) : null, p.jsx || y.isValidElement(p.title) ? p.jsx ? p.jsx : typeof p.title == "function" ? p.title() : p.title : I.createElement(I.Fragment, null, Et || p.icon || p.promise ? I.createElement("div", {
        "data-icon": "",
        className: Bt(j == null ? void 0 : j.icon, (o = p == null ? void 0 : p.classNames) == null ? void 0 : o.icon)
    }, p.promise || p.type === "loading" && !p.icon ? p.icon || qS() : null, p.type !== "loading" ? p.icon || (L == null ? void 0 : L[Et]) || N2(Et) : null) : null, I.createElement("div", {
        "data-content": "",
        className: Bt(j == null ? void 0 : j.content, (a = p == null ? void 0 : p.classNames) == null ? void 0 : a.content)
    }, I.createElement("div", {
        "data-title": "",
        className: Bt(j == null ? void 0 : j.title, (l = p == null ? void 0 : p.classNames) == null ? void 0 : l.title)
    }, typeof p.title == "function" ? p.title() : p.title), p.description ? I.createElement("div", {
        "data-description": "",
        className: Bt(H, US, j == null ? void 0 : j.description, (u = p == null ? void 0 : p.classNames) == null ? void 0 : u.description)
    }, typeof p.description == "function" ? p.description() : p.description) : null), y.isValidElement(p.cancel) ? p.cancel : p.cancel && xa(p.cancel) ? I.createElement("button", {
        "data-button": !0,
        "data-cancel": !0,
        style: p.cancelButtonStyle || A,
        onClick: Q => {
            var de,
                xe;
            xa(p.cancel) && pi && ((xe = (de = p.cancel).onClick) == null || xe.call(de, Q), Fn())
        },
        className: Bt(j == null ? void 0 : j.cancelButton, (d = p == null ? void 0 : p.classNames) == null ? void 0 : d.cancelButton)
    }, p.cancel.label) : null, y.isValidElement(p.action) ? p.action : p.action && xa(p.action) ? I.createElement("button", {
        "data-button": !0,
        "data-action": !0,
        style: p.actionButtonStyle || z,
        onClick: Q => {
            var de,
                xe;
            xa(p.action) && ((xe = (de = p.action).onClick) == null || xe.call(de, Q), !Q.defaultPrevented && Fn())
        },
        className: Bt(j == null ? void 0 : j.actionButton, (f = p == null ? void 0 : p.classNames) == null ? void 0 : f.actionButton)
    }, p.action.label) : null))
};
function Ym() {
    if (typeof window > "u" || typeof document > "u")
        return "ltr";
    let e = document.documentElement.getAttribute("dir");
    return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e
}
function Y2(e, t) {
    let n = {};
    return [e, t].forEach((r, i) => {
        let s = i === 1,
            o = s ? "--mobile-offset" : "--offset",
            a = s ? U2 : $2;
        function l(u) {
            ["top", "right", "bottom", "left"].forEach(d => {
                n[`${o}-${d}`] = typeof u == "number" ? `${u}px` : u
            })
        }
        typeof r == "number" || typeof r == "string" ? l(r) : typeof r == "object" ? ["top", "right", "bottom", "left"].forEach(u => {
            r[u] === void 0 ? n[`${o}-${u}`] = a : n[`${o}-${u}`] = typeof r[u] == "number" ? `${r[u]}px` : r[u]
        }) : l(a)
    }), n
}
var X2 = y.forwardRef(function(e, t) {
    let {invert: n, position: r="bottom-right", hotkey: i=["altKey", "KeyT"], expand: s, closeButton: o, className: a, offset: l, mobileOffset: u, theme: d="light", richColors: f, duration: h, style: p, visibleToasts: b=B2, toastOptions: m, dir: w=Ym(), gap: v=H2, loadingIcon: g, icons: x, containerAriaLabel: S="Notifications", pauseWhenPageIsHidden: C} = e,
        [E, N] = I.useState([]),
        T = I.useMemo(() => Array.from(new Set([r].concat(E.filter(W => W.position).map(W => W.position)))), [E, r]),
        [k, A] = I.useState([]),
        [z, D] = I.useState(!1),
        [H, O] = I.useState(!1),
        [K, U] = I.useState(d !== "system" ? d : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
        V = I.useRef(null),
        P = i.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
        j = I.useRef(null),
        L = I.useRef(!1),
        G = I.useCallback(W => {
            N(X => {
                var q;
                return (q = X.find(pe => pe.id === W.id)) != null && q.delete || ct.dismiss(W.id), X.filter(({id: pe}) => pe !== W.id)
            })
        }, []);
    return I.useEffect(() => ct.subscribe(W => {
        if (W.dismiss) {
            N(X => X.map(q => q.id === W.id ? {
                ...q,
                delete: !0
            } : q));
            return
        }
        setTimeout(() => {
            w0.flushSync(() => {
                N(X => {
                    let q = X.findIndex(pe => pe.id === W.id);
                    return q !== -1 ? [...X.slice(0, q), {
                        ...X[q],
                        ...W
                    }, ...X.slice(q + 1)] : [W, ...X]
                })
            })
        })
    }), []), I.useEffect(() => {
        if (d !== "system") {
            U(d);
            return
        }
        if (d === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? U("dark") : U("light")), typeof window > "u")
            return;
        let W = window.matchMedia("(prefers-color-scheme: dark)");
        try {
            W.addEventListener("change", ({matches: X}) => {
                U(X ? "dark" : "light")
            })
        } catch {
            W.addListener(({matches: q}) => {
                try {
                    U(q ? "dark" : "light")
                } catch (pe) {
                    console.error(pe)
                }
            })
        }
    }, [d]), I.useEffect(() => {
        E.length <= 1 && D(!1)
    }, [E]), I.useEffect(() => {
        let W = X => {
            var q,
                pe;
            i.every(Te => X[Te] || X.code === Te) && (D(!0), (q = V.current) == null || q.focus()),
            X.code === "Escape" && (document.activeElement === V.current || (pe = V.current) != null && pe.contains(document.activeElement)) && D(!1)
        };
        return document.addEventListener("keydown", W), () => document.removeEventListener("keydown", W)
    }, [i]), I.useEffect(() => {
        if (V.current)
            return () => {
                j.current && (j.current.focus({
                    preventScroll: !0
                }), j.current = null, L.current = !1)
            }
    }, [V.current]), I.createElement("section", {
        ref: t,
        "aria-label": `${S} ${P}`,
        tabIndex: -1,
        "aria-live": "polite",
        "aria-relevant": "additions text",
        "aria-atomic": "false",
        suppressHydrationWarning: !0
    }, T.map((W, X) => {
        var q;
        let [pe, Te] = W.split("-");
        return E.length ? I.createElement("ol", {
            key: W,
            dir: w === "auto" ? Ym() : w,
            tabIndex: -1,
            ref: V,
            className: a,
            "data-sonner-toaster": !0,
            "data-theme": K,
            "data-y-position": pe,
            "data-lifted": z && E.length > 1 && !s,
            "data-x-position": Te,
            style: {
                "--front-toast-height": `${((q = k[0]) == null ? void 0 : q.height) || 0}px`,
                "--width": `${W2}px`,
                "--gap": `${v}px`,
                ...p,
                ...Y2(l, u)
            },
            onBlur: _ => {
                L.current && !_.currentTarget.contains(_.relatedTarget) && (L.current = !1, j.current && (j.current.focus({
                    preventScroll: !0
                }), j.current = null))
            },
            onFocus: _ => {
                _.target instanceof HTMLElement && _.target.dataset.dismissible === "false" || L.current || (L.current = !0, j.current = _.relatedTarget)
            },
            onMouseEnter: () => D(!0),
            onMouseMove: () => D(!0),
            onMouseLeave: () => {
                H || D(!1)
            },
            onDragEnd: () => D(!1),
            onPointerDown: _ => {
                _.target instanceof HTMLElement && _.target.dataset.dismissible === "false" || O(!0)
            },
            onPointerUp: () => O(!1)
        }, E.filter(_ => !_.position && X === 0 || _.position === W).map((_, le) => {
            var Pe,
                oe;
            return I.createElement(Q2, {
                key: _.id,
                icons: x,
                index: le,
                toast: _,
                defaultRichColors: f,
                duration: (Pe = m == null ? void 0 : m.duration) != null ? Pe : h,
                className: m == null ? void 0 : m.className,
                descriptionClassName: m == null ? void 0 : m.descriptionClassName,
                invert: n,
                visibleToasts: b,
                closeButton: (oe = m == null ? void 0 : m.closeButton) != null ? oe : o,
                interacting: H,
                position: W,
                style: m == null ? void 0 : m.style,
                unstyled: m == null ? void 0 : m.unstyled,
                classNames: m == null ? void 0 : m.classNames,
                cancelButtonStyle: m == null ? void 0 : m.cancelButtonStyle,
                actionButtonStyle: m == null ? void 0 : m.actionButtonStyle,
                removeToast: G,
                toasts: E.filter(ne => ne.position == _.position),
                heights: k.filter(ne => ne.position == _.position),
                setHeights: A,
                expandByDefault: s,
                gap: v,
                loadingIcon: g,
                expanded: z,
                pauseWhenPageIsHidden: C,
                swipeDirections: e.swipeDirections
            })
        })) : null
    }))
});
const Z2 = ({...e}) => {
    const {theme: t="system"} = E2();
    return c.jsx(X2, {
        theme: t,
        className: "toaster group",
        toastOptions: {
            classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
            }
        },
        ...e
    })
};
var J2 = jf[" useId ".trim().toString()] || (() => {}),
    eP = 0;
function jh(e) {
    const [t, n] = y.useState(J2());
    return He(() => {
        n(r => r ?? String(eP++))
    }, [e]), t ? `radix-${t}` : ""
}
const tP = ["top", "right", "bottom", "left"],
    vr = Math.min,
    gt = Math.max,
    Sl = Math.round,
    wa = Math.floor,
    gn = e => ({
        x: e,
        y: e
    }),
    nP = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    },
    rP = {
        start: "end",
        end: "start"
    };
function _d(e, t, n) {
    return gt(e, vr(t, n))
}
function In(e, t) {
    return typeof e == "function" ? e(t) : e
}
function Dn(e) {
    return e.split("-")[0]
}
function ys(e) {
    return e.split("-")[1]
}
function kh(e) {
    return e === "x" ? "y" : "x"
}
function Rh(e) {
    return e === "y" ? "height" : "width"
}
const iP = new Set(["top", "bottom"]);
function hn(e) {
    return iP.has(Dn(e)) ? "y" : "x"
}
function Ah(e) {
    return kh(hn(e))
}
function sP(e, t, n) {
    n === void 0 && (n = !1);
    const r = ys(e),
        i = Ah(e),
        s = Rh(i);
    let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
    return t.reference[s] > t.floating[s] && (o = Cl(o)), [o, Cl(o)]
}
function oP(e) {
    const t = Cl(e);
    return [Vd(e), t, Vd(t)]
}
function Vd(e) {
    return e.replace(/start|end/g, t => rP[t])
}
const Xm = ["left", "right"],
    Zm = ["right", "left"],
    aP = ["top", "bottom"],
    lP = ["bottom", "top"];
function cP(e, t, n) {
    switch (e) {
    case "top":
    case "bottom":
        return n ? t ? Zm : Xm : t ? Xm : Zm;
    case "left":
    case "right":
        return t ? aP : lP;
    default:
        return []
    }
}
function uP(e, t, n, r) {
    const i = ys(e);
    let s = cP(Dn(e), n === "start", r);
    return i && (s = s.map(o => o + "-" + i), t && (s = s.concat(s.map(Vd)))), s
}
function Cl(e) {
    return e.replace(/left|right|bottom|top/g, t => nP[t])
}
function dP(e) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...e
    }
}
function fw(e) {
    return typeof e != "number" ? dP(e) : {
        top: e,
        right: e,
        bottom: e,
        left: e
    }
}
function El(e) {
    const {x: t, y: n, width: r, height: i} = e;
    return {
        width: r,
        height: i,
        top: n,
        left: t,
        right: t + r,
        bottom: n + i,
        x: t,
        y: n
    }
}
function Jm(e, t, n) {
    let {reference: r, floating: i} = e;
    const s = hn(t),
        o = Ah(t),
        a = Rh(o),
        l = Dn(t),
        u = s === "y",
        d = r.x + r.width / 2 - i.width / 2,
        f = r.y + r.height / 2 - i.height / 2,
        h = r[a] / 2 - i[a] / 2;
    let p;
    switch (l) {
    case "top":
        p = {
            x: d,
            y: r.y - i.height
        };
        break;
    case "bottom":
        p = {
            x: d,
            y: r.y + r.height
        };
        break;
    case "right":
        p = {
            x: r.x + r.width,
            y: f
        };
        break;
    case "left":
        p = {
            x: r.x - i.width,
            y: f
        };
        break;
    default:
        p = {
            x: r.x,
            y: r.y
        }
    }
    switch (ys(t)) {
    case "start":
        p[o] -= h * (n && u ? -1 : 1);
        break;
    case "end":
        p[o] += h * (n && u ? -1 : 1);
        break
    }
    return p
}
const fP = async (e, t, n) => {
    const {placement: r="bottom", strategy: i="absolute", middleware: s=[], platform: o} = n,
        a = s.filter(Boolean),
        l = await (o.isRTL == null ? void 0 : o.isRTL(t));
    let u = await o.getElementRects({
            reference: e,
            floating: t,
            strategy: i
        }),
        {x: d, y: f} = Jm(u, r, l),
        h = r,
        p = {},
        b = 0;
    for (let m = 0; m < a.length; m++) {
        const {name: w, fn: v} = a[m],
            {x: g, y: x, data: S, reset: C} = await v({
                x: d,
                y: f,
                initialPlacement: r,
                placement: h,
                strategy: i,
                middlewareData: p,
                rects: u,
                platform: o,
                elements: {
                    reference: e,
                    floating: t
                }
            });
        d = g ?? d,
        f = x ?? f,
        p = {
            ...p,
            [w]: {
                ...p[w],
                ...S
            }
        },
        C && b <= 50 && (b++, typeof C == "object" && (C.placement && (h = C.placement), C.rects && (u = C.rects === !0 ? await o.getElementRects({
            reference: e,
            floating: t,
            strategy: i
        }) : C.rects), {x: d, y: f} = Jm(u, h, l)), m = -1)
    }
    return {
        x: d,
        y: f,
        placement: h,
        strategy: i,
        middlewareData: p
    }
};
async function Eo(e, t) {
    var n;
    t === void 0 && (t = {});
    const {x: r, y: i, platform: s, rects: o, elements: a, strategy: l} = e,
        {boundary: u="clippingAncestors", rootBoundary: d="viewport", elementContext: f="floating", altBoundary: h=!1, padding: p=0} = In(t, e),
        b = fw(p),
        w = a[h ? f === "floating" ? "reference" : "floating" : f],
        v = El(await s.getClippingRect({
            element: (n = await (s.isElement == null ? void 0 : s.isElement(w))) == null || n ? w : w.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
            boundary: u,
            rootBoundary: d,
            strategy: l
        })),
        g = f === "floating" ? {
            x: r,
            y: i,
            width: o.floating.width,
            height: o.floating.height
        } : o.reference,
        x = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)),
        S = await (s.isElement == null ? void 0 : s.isElement(x)) ? await (s.getScale == null ? void 0 : s.getScale(x)) || {
            x: 1,
            y: 1
        } : {
            x: 1,
            y: 1
        },
        C = El(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: a,
            rect: g,
            offsetParent: x,
            strategy: l
        }) : g);
    return {
        top: (v.top - C.top + b.top) / S.y,
        bottom: (C.bottom - v.bottom + b.bottom) / S.y,
        left: (v.left - C.left + b.left) / S.x,
        right: (C.right - v.right + b.right) / S.x
    }
}
const hP = e => ({
        name: "arrow",
        options: e,
        async fn(t) {
            const {x: n, y: r, placement: i, rects: s, platform: o, elements: a, middlewareData: l} = t,
                {element: u, padding: d=0} = In(e, t) || {};
            if (u == null)
                return {};
            const f = fw(d),
                h = {
                    x: n,
                    y: r
                },
                p = Ah(i),
                b = Rh(p),
                m = await o.getDimensions(u),
                w = p === "y",
                v = w ? "top" : "left",
                g = w ? "bottom" : "right",
                x = w ? "clientHeight" : "clientWidth",
                S = s.reference[b] + s.reference[p] - h[p] - s.floating[b],
                C = h[p] - s.reference[p],
                E = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(u));
            let N = E ? E[x] : 0;
            (!N || !await (o.isElement == null ? void 0 : o.isElement(E))) && (N = a.floating[x] || s.floating[b]);
            const T = S / 2 - C / 2,
                k = N / 2 - m[b] / 2 - 1,
                A = vr(f[v], k),
                z = vr(f[g], k),
                D = A,
                H = N - m[b] - z,
                O = N / 2 - m[b] / 2 + T,
                K = _d(D, O, H),
                U = !l.arrow && ys(i) != null && O !== K && s.reference[b] / 2 - (O < D ? A : z) - m[b] / 2 < 0,
                V = U ? O < D ? O - D : O - H : 0;
            return {
                [p]: h[p] + V,
                data: {
                    [p]: K,
                    centerOffset: O - K - V,
                    ...U && {
                        alignmentOffset: V
                    }
                },
                reset: U
            }
        }
    }),
    pP = function(e) {
        return e === void 0 && (e = {}), {
            name: "flip",
            options: e,
            async fn(t) {
                var n,
                    r;
                const {placement: i, middlewareData: s, rects: o, initialPlacement: a, platform: l, elements: u} = t,
                    {mainAxis: d=!0, crossAxis: f=!0, fallbackPlacements: h, fallbackStrategy: p="bestFit", fallbackAxisSideDirection: b="none", flipAlignment: m=!0, ...w} = In(e, t);
                if ((n = s.arrow) != null && n.alignmentOffset)
                    return {};
                const v = Dn(i),
                    g = hn(a),
                    x = Dn(a) === a,
                    S = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)),
                    C = h || (x || !m ? [Cl(a)] : oP(a)),
                    E = b !== "none";
                !h && E && C.push(...uP(a, m, b, S));
                const N = [a, ...C],
                    T = await Eo(t, w),
                    k = [];
                let A = ((r = s.flip) == null ? void 0 : r.overflows) || [];
                if (d && k.push(T[v]), f) {
                    const O = sP(i, o, S);
                    k.push(T[O[0]], T[O[1]])
                }
                if (A = [...A, {
                    placement: i,
                    overflows: k
                }], !k.every(O => O <= 0)) {
                    var z,
                        D;
                    const O = (((z = s.flip) == null ? void 0 : z.index) || 0) + 1,
                        K = N[O];
                    if (K && (!(f === "alignment" ? g !== hn(K) : !1) || A.every(P => P.overflows[0] > 0 && hn(P.placement) === g)))
                        return {
                            data: {
                                index: O,
                                overflows: A
                            },
                            reset: {
                                placement: K
                            }
                        };
                    let U = (D = A.filter(V => V.overflows[0] <= 0).sort((V, P) => V.overflows[1] - P.overflows[1])[0]) == null ? void 0 : D.placement;
                    if (!U)
                        switch (p) {
                        case "bestFit":
                            {
                                var H;
                                const V = (H = A.filter(P => {
                                    if (E) {
                                        const j = hn(P.placement);
                                        return j === g || j === "y"
                                    }
                                    return !0
                                }).map(P => [P.placement, P.overflows.filter(j => j > 0).reduce((j, L) => j + L, 0)]).sort((P, j) => P[1] - j[1])[0]) == null ? void 0 : H[0];
                                V && (U = V);
                                break
                            }case "initialPlacement":
                            U = a;
                            break
                        }
                    if (i !== U)
                        return {
                            reset: {
                                placement: U
                            }
                        }
                }
                return {}
            }
        }
    };
function eg(e, t) {
    return {
        top: e.top - t.height,
        right: e.right - t.width,
        bottom: e.bottom - t.height,
        left: e.left - t.width
    }
}
function tg(e) {
    return tP.some(t => e[t] >= 0)
}
const mP = function(e) {
        return e === void 0 && (e = {}), {
            name: "hide",
            options: e,
            async fn(t) {
                const {rects: n} = t,
                    {strategy: r="referenceHidden", ...i} = In(e, t);
                switch (r) {
                case "referenceHidden":
                    {
                        const s = await Eo(t, {
                                ...i,
                                elementContext: "reference"
                            }),
                            o = eg(s, n.reference);
                        return {
                            data: {
                                referenceHiddenOffsets: o,
                                referenceHidden: tg(o)
                            }
                        }
                    }case "escaped":
                    {
                        const s = await Eo(t, {
                                ...i,
                                altBoundary: !0
                            }),
                            o = eg(s, n.floating);
                        return {
                            data: {
                                escapedOffsets: o,
                                escaped: tg(o)
                            }
                        }
                    }default:
                    return {}
                }
            }
        }
    },
    hw = new Set(["left", "top"]);
async function gP(e, t) {
    const {placement: n, platform: r, elements: i} = e,
        s = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)),
        o = Dn(n),
        a = ys(n),
        l = hn(n) === "y",
        u = hw.has(o) ? -1 : 1,
        d = s && l ? -1 : 1,
        f = In(t, e);
    let {mainAxis: h, crossAxis: p, alignmentAxis: b} = typeof f == "number" ? {
        mainAxis: f,
        crossAxis: 0,
        alignmentAxis: null
    } : {
        mainAxis: f.mainAxis || 0,
        crossAxis: f.crossAxis || 0,
        alignmentAxis: f.alignmentAxis
    };
    return a && typeof b == "number" && (p = a === "end" ? b * -1 : b), l ? {
        x: p * d,
        y: h * u
    } : {
        x: h * u,
        y: p * d
    }
}
const yP = function(e) {
        return e === void 0 && (e = 0), {
            name: "offset",
            options: e,
            async fn(t) {
                var n,
                    r;
                const {x: i, y: s, placement: o, middlewareData: a} = t,
                    l = await gP(t, e);
                return o === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
                    x: i + l.x,
                    y: s + l.y,
                    data: {
                        ...l,
                        placement: o
                    }
                }
            }
        }
    },
    vP = function(e) {
        return e === void 0 && (e = {}), {
            name: "shift",
            options: e,
            async fn(t) {
                const {x: n, y: r, placement: i} = t,
                    {mainAxis: s=!0, crossAxis: o=!1, limiter: a={
                        fn: w => {
                            let {x: v, y: g} = w;
                            return {
                                x: v,
                                y: g
                            }
                        }
                    }, ...l} = In(e, t),
                    u = {
                        x: n,
                        y: r
                    },
                    d = await Eo(t, l),
                    f = hn(Dn(i)),
                    h = kh(f);
                let p = u[h],
                    b = u[f];
                if (s) {
                    const w = h === "y" ? "top" : "left",
                        v = h === "y" ? "bottom" : "right",
                        g = p + d[w],
                        x = p - d[v];
                    p = _d(g, p, x)
                }
                if (o) {
                    const w = f === "y" ? "top" : "left",
                        v = f === "y" ? "bottom" : "right",
                        g = b + d[w],
                        x = b - d[v];
                    b = _d(g, b, x)
                }
                const m = a.fn({
                    ...t,
                    [h]: p,
                    [f]: b
                });
                return {
                    ...m,
                    data: {
                        x: m.x - n,
                        y: m.y - r,
                        enabled: {
                            [h]: s,
                            [f]: o
                        }
                    }
                }
            }
        }
    },
    xP = function(e) {
        return e === void 0 && (e = {}), {
            options: e,
            fn(t) {
                const {x: n, y: r, placement: i, rects: s, middlewareData: o} = t,
                    {offset: a=0, mainAxis: l=!0, crossAxis: u=!0} = In(e, t),
                    d = {
                        x: n,
                        y: r
                    },
                    f = hn(i),
                    h = kh(f);
                let p = d[h],
                    b = d[f];
                const m = In(a, t),
                    w = typeof m == "number" ? {
                        mainAxis: m,
                        crossAxis: 0
                    } : {
                        mainAxis: 0,
                        crossAxis: 0,
                        ...m
                    };
                if (l) {
                    const x = h === "y" ? "height" : "width",
                        S = s.reference[h] - s.floating[x] + w.mainAxis,
                        C = s.reference[h] + s.reference[x] - w.mainAxis;
                    p < S ? p = S : p > C && (p = C)
                }
                if (u) {
                    var v,
                        g;
                    const x = h === "y" ? "width" : "height",
                        S = hw.has(Dn(i)),
                        C = s.reference[f] - s.floating[x] + (S && ((v = o.offset) == null ? void 0 : v[f]) || 0) + (S ? 0 : w.crossAxis),
                        E = s.reference[f] + s.reference[x] + (S ? 0 : ((g = o.offset) == null ? void 0 : g[f]) || 0) - (S ? w.crossAxis : 0);
                    b < C ? b = C : b > E && (b = E)
                }
                return {
                    [h]: p,
                    [f]: b
                }
            }
        }
    },
    wP = function(e) {
        return e === void 0 && (e = {}), {
            name: "size",
            options: e,
            async fn(t) {
                var n,
                    r;
                const {placement: i, rects: s, platform: o, elements: a} = t,
                    {apply: l=() => {}, ...u} = In(e, t),
                    d = await Eo(t, u),
                    f = Dn(i),
                    h = ys(i),
                    p = hn(i) === "y",
                    {width: b, height: m} = s.floating;
                let w,
                    v;
                f === "top" || f === "bottom" ? (w = f, v = h === (await (o.isRTL == null ? void 0 : o.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (v = f, w = h === "end" ? "top" : "bottom");
                const g = m - d.top - d.bottom,
                    x = b - d.left - d.right,
                    S = vr(m - d[w], g),
                    C = vr(b - d[v], x),
                    E = !t.middlewareData.shift;
                let N = S,
                    T = C;
                if ((n = t.middlewareData.shift) != null && n.enabled.x && (T = x), (r = t.middlewareData.shift) != null && r.enabled.y && (N = g), E && !h) {
                    const A = gt(d.left, 0),
                        z = gt(d.right, 0),
                        D = gt(d.top, 0),
                        H = gt(d.bottom, 0);
                    p ? T = b - 2 * (A !== 0 || z !== 0 ? A + z : gt(d.left, d.right)) : N = m - 2 * (D !== 0 || H !== 0 ? D + H : gt(d.top, d.bottom))
                }
                await l({
                    ...t,
                    availableWidth: T,
                    availableHeight: N
                });
                const k = await o.getDimensions(a.floating);
                return b !== k.width || m !== k.height ? {
                    reset: {
                        rects: !0
                    }
                } : {}
            }
        }
    };
function oc() {
    return typeof window < "u"
}
function vs(e) {
    return pw(e) ? (e.nodeName || "").toLowerCase() : "#document"
}
function xt(e) {
    var t;
    return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}
function bn(e) {
    var t;
    return (t = (pw(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement
}
function pw(e) {
    return oc() ? e instanceof Node || e instanceof xt(e).Node : !1
}
function rn(e) {
    return oc() ? e instanceof Element || e instanceof xt(e).Element : !1
}
function xn(e) {
    return oc() ? e instanceof HTMLElement || e instanceof xt(e).HTMLElement : !1
}
function ng(e) {
    return !oc() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof xt(e).ShadowRoot
}
const bP = new Set(["inline", "contents"]);
function Ko(e) {
    const {overflow: t, overflowX: n, overflowY: r, display: i} = sn(e);
    return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !bP.has(i)
}
const SP = new Set(["table", "td", "th"]);
function CP(e) {
    return SP.has(vs(e))
}
const EP = [":popover-open", ":modal"];
function ac(e) {
    return EP.some(t => {
        try {
            return e.matches(t)
        } catch {
            return !1
        }
    })
}
const NP = ["transform", "translate", "scale", "rotate", "perspective"],
    TP = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
    PP = ["paint", "layout", "strict", "content"];
function Mh(e) {
    const t = Oh(),
        n = rn(e) ? sn(e) : e;
    return NP.some(r => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || TP.some(r => (n.willChange || "").includes(r)) || PP.some(r => (n.contain || "").includes(r))
}
function jP(e) {
    let t = xr(e);
    for (; xn(t) && !cs(t);) {
        if (Mh(t))
            return t;
        if (ac(t))
            return null;
        t = xr(t)
    }
    return null
}
function Oh() {
    return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none")
}
const kP = new Set(["html", "body", "#document"]);
function cs(e) {
    return kP.has(vs(e))
}
function sn(e) {
    return xt(e).getComputedStyle(e)
}
function lc(e) {
    return rn(e) ? {
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop
    } : {
        scrollLeft: e.scrollX,
        scrollTop: e.scrollY
    }
}
function xr(e) {
    if (vs(e) === "html")
        return e;
    const t = e.assignedSlot || e.parentNode || ng(e) && e.host || bn(e);
    return ng(t) ? t.host : t
}
function mw(e) {
    const t = xr(e);
    return cs(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : xn(t) && Ko(t) ? t : mw(t)
}
function No(e, t, n) {
    var r;
    t === void 0 && (t = []),
    n === void 0 && (n = !0);
    const i = mw(e),
        s = i === ((r = e.ownerDocument) == null ? void 0 : r.body),
        o = xt(i);
    if (s) {
        const a = Fd(o);
        return t.concat(o, o.visualViewport || [], Ko(i) ? i : [], a && n ? No(a) : [])
    }
    return t.concat(i, No(i, [], n))
}
function Fd(e) {
    return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
}
function gw(e) {
    const t = sn(e);
    let n = parseFloat(t.width) || 0,
        r = parseFloat(t.height) || 0;
    const i = xn(e),
        s = i ? e.offsetWidth : n,
        o = i ? e.offsetHeight : r,
        a = Sl(n) !== s || Sl(r) !== o;
    return a && (n = s, r = o), {
        width: n,
        height: r,
        $: a
    }
}
function Ih(e) {
    return rn(e) ? e : e.contextElement
}
function Wi(e) {
    const t = Ih(e);
    if (!xn(t))
        return gn(1);
    const n = t.getBoundingClientRect(),
        {width: r, height: i, $: s} = gw(t);
    let o = (s ? Sl(n.width) : n.width) / r,
        a = (s ? Sl(n.height) : n.height) / i;
    return (!o || !Number.isFinite(o)) && (o = 1), (!a || !Number.isFinite(a)) && (a = 1), {
        x: o,
        y: a
    }
}
const RP = gn(0);
function yw(e) {
    const t = xt(e);
    return !Oh() || !t.visualViewport ? RP : {
        x: t.visualViewport.offsetLeft,
        y: t.visualViewport.offsetTop
    }
}
function AP(e, t, n) {
    return t === void 0 && (t = !1), !n || t && n !== xt(e) ? !1 : t
}
function ii(e, t, n, r) {
    t === void 0 && (t = !1),
    n === void 0 && (n = !1);
    const i = e.getBoundingClientRect(),
        s = Ih(e);
    let o = gn(1);
    t && (r ? rn(r) && (o = Wi(r)) : o = Wi(e));
    const a = AP(s, n, r) ? yw(s) : gn(0);
    let l = (i.left + a.x) / o.x,
        u = (i.top + a.y) / o.y,
        d = i.width / o.x,
        f = i.height / o.y;
    if (s) {
        const h = xt(s),
            p = r && rn(r) ? xt(r) : r;
        let b = h,
            m = Fd(b);
        for (; m && r && p !== b;) {
            const w = Wi(m),
                v = m.getBoundingClientRect(),
                g = sn(m),
                x = v.left + (m.clientLeft + parseFloat(g.paddingLeft)) * w.x,
                S = v.top + (m.clientTop + parseFloat(g.paddingTop)) * w.y;
            l *= w.x,
            u *= w.y,
            d *= w.x,
            f *= w.y,
            l += x,
            u += S,
            b = xt(m),
            m = Fd(b)
        }
    }
    return El({
        width: d,
        height: f,
        x: l,
        y: u
    })
}
function Dh(e, t) {
    const n = lc(e).scrollLeft;
    return t ? t.left + n : ii(bn(e)).left + n
}
function vw(e, t, n) {
    n === void 0 && (n = !1);
    const r = e.getBoundingClientRect(),
        i = r.left + t.scrollLeft - (n ? 0 : Dh(e, r)),
        s = r.top + t.scrollTop;
    return {
        x: i,
        y: s
    }
}
function MP(e) {
    let {elements: t, rect: n, offsetParent: r, strategy: i} = e;
    const s = i === "fixed",
        o = bn(r),
        a = t ? ac(t.floating) : !1;
    if (r === o || a && s)
        return n;
    let l = {
            scrollLeft: 0,
            scrollTop: 0
        },
        u = gn(1);
    const d = gn(0),
        f = xn(r);
    if ((f || !f && !s) && ((vs(r) !== "body" || Ko(o)) && (l = lc(r)), xn(r))) {
        const p = ii(r);
        u = Wi(r),
        d.x = p.x + r.clientLeft,
        d.y = p.y + r.clientTop
    }
    const h = o && !f && !s ? vw(o, l, !0) : gn(0);
    return {
        width: n.width * u.x,
        height: n.height * u.y,
        x: n.x * u.x - l.scrollLeft * u.x + d.x + h.x,
        y: n.y * u.y - l.scrollTop * u.y + d.y + h.y
    }
}
function OP(e) {
    return Array.from(e.getClientRects())
}
function IP(e) {
    const t = bn(e),
        n = lc(e),
        r = e.ownerDocument.body,
        i = gt(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
        s = gt(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
    let o = -n.scrollLeft + Dh(e);
    const a = -n.scrollTop;
    return sn(r).direction === "rtl" && (o += gt(t.clientWidth, r.clientWidth) - i), {
        width: i,
        height: s,
        x: o,
        y: a
    }
}
function DP(e, t) {
    const n = xt(e),
        r = bn(e),
        i = n.visualViewport;
    let s = r.clientWidth,
        o = r.clientHeight,
        a = 0,
        l = 0;
    if (i) {
        s = i.width,
        o = i.height;
        const u = Oh();
        (!u || u && t === "fixed") && (a = i.offsetLeft, l = i.offsetTop)
    }
    return {
        width: s,
        height: o,
        x: a,
        y: l
    }
}
const LP = new Set(["absolute", "fixed"]);
function _P(e, t) {
    const n = ii(e, !0, t === "fixed"),
        r = n.top + e.clientTop,
        i = n.left + e.clientLeft,
        s = xn(e) ? Wi(e) : gn(1),
        o = e.clientWidth * s.x,
        a = e.clientHeight * s.y,
        l = i * s.x,
        u = r * s.y;
    return {
        width: o,
        height: a,
        x: l,
        y: u
    }
}
function rg(e, t, n) {
    let r;
    if (t === "viewport")
        r = DP(e, n);
    else if (t === "document")
        r = IP(bn(e));
    else if (rn(t))
        r = _P(t, n);
    else {
        const i = yw(e);
        r = {
            x: t.x - i.x,
            y: t.y - i.y,
            width: t.width,
            height: t.height
        }
    }
    return El(r)
}
function xw(e, t) {
    const n = xr(e);
    return n === t || !rn(n) || cs(n) ? !1 : sn(n).position === "fixed" || xw(n, t)
}
function VP(e, t) {
    const n = t.get(e);
    if (n)
        return n;
    let r = No(e, [], !1).filter(a => rn(a) && vs(a) !== "body"),
        i = null;
    const s = sn(e).position === "fixed";
    let o = s ? xr(e) : e;
    for (; rn(o) && !cs(o);) {
        const a = sn(o),
            l = Mh(o);
        !l && a.position === "fixed" && (i = null),
        (s ? !l && !i : !l && a.position === "static" && !!i && LP.has(i.position) || Ko(o) && !l && xw(e, o)) ? r = r.filter(d => d !== o) : i = a,
        o = xr(o)
    }
    return t.set(e, r), r
}
function FP(e) {
    let {element: t, boundary: n, rootBoundary: r, strategy: i} = e;
    const o = [...n === "clippingAncestors" ? ac(t) ? [] : VP(t, this._c) : [].concat(n), r],
        a = o[0],
        l = o.reduce((u, d) => {
            const f = rg(t, d, i);
            return u.top = gt(f.top, u.top), u.right = vr(f.right, u.right), u.bottom = vr(f.bottom, u.bottom), u.left = gt(f.left, u.left), u
        }, rg(t, a, i));
    return {
        width: l.right - l.left,
        height: l.bottom - l.top,
        x: l.left,
        y: l.top
    }
}
function zP(e) {
    const {width: t, height: n} = gw(e);
    return {
        width: t,
        height: n
    }
}
function BP(e, t, n) {
    const r = xn(t),
        i = bn(t),
        s = n === "fixed",
        o = ii(e, !0, s, t);
    let a = {
        scrollLeft: 0,
        scrollTop: 0
    };
    const l = gn(0);
    function u() {
        l.x = Dh(i)
    }
    if (r || !r && !s)
        if ((vs(t) !== "body" || Ko(i)) && (a = lc(t)), r) {
            const p = ii(t, !0, s, t);
            l.x = p.x + t.clientLeft,
            l.y = p.y + t.clientTop
        } else
            i && u();
    s && !r && i && u();
    const d = i && !r && !s ? vw(i, a) : gn(0),
        f = o.left + a.scrollLeft - l.x - d.x,
        h = o.top + a.scrollTop - l.y - d.y;
    return {
        x: f,
        y: h,
        width: o.width,
        height: o.height
    }
}
function ru(e) {
    return sn(e).position === "static"
}
function ig(e, t) {
    if (!xn(e) || sn(e).position === "fixed")
        return null;
    if (t)
        return t(e);
    let n = e.offsetParent;
    return bn(e) === n && (n = n.ownerDocument.body), n
}
function ww(e, t) {
    const n = xt(e);
    if (ac(e))
        return n;
    if (!xn(e)) {
        let i = xr(e);
        for (; i && !cs(i);) {
            if (rn(i) && !ru(i))
                return i;
            i = xr(i)
        }
        return n
    }
    let r = ig(e, t);
    for (; r && CP(r) && ru(r);)
        r = ig(r, t);
    return r && cs(r) && ru(r) && !Mh(r) ? n : r || jP(e) || n
}
const $P = async function(e) {
    const t = this.getOffsetParent || ww,
        n = this.getDimensions,
        r = await n(e.floating);
    return {
        reference: BP(e.reference, await t(e.floating), e.strategy),
        floating: {
            x: 0,
            y: 0,
            width: r.width,
            height: r.height
        }
    }
};
function UP(e) {
    return sn(e).direction === "rtl"
}
const WP = {
    convertOffsetParentRelativeRectToViewportRelativeRect: MP,
    getDocumentElement: bn,
    getClippingRect: FP,
    getOffsetParent: ww,
    getElementRects: $P,
    getClientRects: OP,
    getDimensions: zP,
    getScale: Wi,
    isElement: rn,
    isRTL: UP
};
function bw(e, t) {
    return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
}
function HP(e, t) {
    let n = null,
        r;
    const i = bn(e);
    function s() {
        var a;
        clearTimeout(r),
        (a = n) == null || a.disconnect(),
        n = null
    }
    function o(a, l) {
        a === void 0 && (a = !1),
        l === void 0 && (l = 1),
        s();
        const u = e.getBoundingClientRect(),
            {left: d, top: f, width: h, height: p} = u;
        if (a || t(), !h || !p)
            return;
        const b = wa(f),
            m = wa(i.clientWidth - (d + h)),
            w = wa(i.clientHeight - (f + p)),
            v = wa(d),
            x = {
                rootMargin: -b + "px " + -m + "px " + -w + "px " + -v + "px",
                threshold: gt(0, vr(1, l)) || 1
            };
        let S = !0;
        function C(E) {
            const N = E[0].intersectionRatio;
            if (N !== l) {
                if (!S)
                    return o();
                N ? o(!1, N) : r = setTimeout(() => {
                    o(!1, 1e-7)
                }, 1e3)
            }
            N === 1 && !bw(u, e.getBoundingClientRect()) && o(),
            S = !1
        }
        try {
            n = new IntersectionObserver(C, {
                ...x,
                root: i.ownerDocument
            })
        } catch {
            n = new IntersectionObserver(C, x)
        }
        n.observe(e)
    }
    return o(!0), s
}
function KP(e, t, n, r) {
    r === void 0 && (r = {});
    const {ancestorScroll: i=!0, ancestorResize: s=!0, elementResize: o=typeof ResizeObserver == "function", layoutShift: a=typeof IntersectionObserver == "function", animationFrame: l=!1} = r,
        u = Ih(e),
        d = i || s ? [...u ? No(u) : [], ...No(t)] : [];
    d.forEach(v => {
        i && v.addEventListener("scroll", n, {
            passive: !0
        }),
        s && v.addEventListener("resize", n)
    });
    const f = u && a ? HP(u, n) : null;
    let h = -1,
        p = null;
    o && (p = new ResizeObserver(v => {
        let [g] = v;
        g && g.target === u && p && (p.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
            var x;
            (x = p) == null || x.observe(t)
        })),
        n()
    }), u && !l && p.observe(u), p.observe(t));
    let b,
        m = l ? ii(e) : null;
    l && w();
    function w() {
        const v = ii(e);
        m && !bw(m, v) && n(),
        m = v,
        b = requestAnimationFrame(w)
    }
    return n(), () => {
        var v;
        d.forEach(g => {
            i && g.removeEventListener("scroll", n),
            s && g.removeEventListener("resize", n)
        }),
        f == null || f(),
        (v = p) == null || v.disconnect(),
        p = null,
        l && cancelAnimationFrame(b)
    }
}
const GP = yP,
    qP = vP,
    QP = pP,
    YP = wP,
    XP = mP,
    sg = hP,
    ZP = xP,
    JP = (e, t, n) => {
        const r = new Map,
            i = {
                platform: WP,
                ...n
            },
            s = {
                ...i.platform,
                _c: r
            };
        return fP(e, t, {
            ...i,
            platform: s
        })
    };
var ej = typeof document < "u",
    tj = function() {},
    Ha = ej ? y.useLayoutEffect : tj;
function Nl(e, t) {
    if (e === t)
        return !0;
    if (typeof e != typeof t)
        return !1;
    if (typeof e == "function" && e.toString() === t.toString())
        return !0;
    let n,
        r,
        i;
    if (e && t && typeof e == "object") {
        if (Array.isArray(e)) {
            if (n = e.length, n !== t.length)
                return !1;
            for (r = n; r-- !== 0;)
                if (!Nl(e[r], t[r]))
                    return !1;
            return !0
        }
        if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length)
            return !1;
        for (r = n; r-- !== 0;)
            if (!{}.hasOwnProperty.call(t, i[r]))
                return !1;
        for (r = n; r-- !== 0;) {
            const s = i[r];
            if (!(s === "_owner" && e.$$typeof) && !Nl(e[s], t[s]))
                return !1
        }
        return !0
    }
    return e !== e && t !== t
}
function Sw(e) {
    return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1
}
function og(e, t) {
    const n = Sw(e);
    return Math.round(t * n) / n
}
function iu(e) {
    const t = y.useRef(e);
    return Ha(() => {
        t.current = e
    }), t
}
function nj(e) {
    e === void 0 && (e = {});
    const {placement: t="bottom", strategy: n="absolute", middleware: r=[], platform: i, elements: {reference: s, floating: o}={}, transform: a=!0, whileElementsMounted: l, open: u} = e,
        [d, f] = y.useState({
            x: 0,
            y: 0,
            strategy: n,
            placement: t,
            middlewareData: {},
            isPositioned: !1
        }),
        [h, p] = y.useState(r);
    Nl(h, r) || p(r);
    const [b, m] = y.useState(null),
        [w, v] = y.useState(null),
        g = y.useCallback(P => {
            P !== E.current && (E.current = P, m(P))
        }, []),
        x = y.useCallback(P => {
            P !== N.current && (N.current = P, v(P))
        }, []),
        S = s || b,
        C = o || w,
        E = y.useRef(null),
        N = y.useRef(null),
        T = y.useRef(d),
        k = l != null,
        A = iu(l),
        z = iu(i),
        D = iu(u),
        H = y.useCallback(() => {
            if (!E.current || !N.current)
                return;
            const P = {
                placement: t,
                strategy: n,
                middleware: h
            };
            z.current && (P.platform = z.current),
            JP(E.current, N.current, P).then(j => {
                const L = {
                    ...j,
                    isPositioned: D.current !== !1
                };
                O.current && !Nl(T.current, L) && (T.current = L, ci.flushSync(() => {
                    f(L)
                }))
            })
        }, [h, t, n, z, D]);
    Ha(() => {
        u === !1 && T.current.isPositioned && (T.current.isPositioned = !1, f(P => ({
            ...P,
            isPositioned: !1
        })))
    }, [u]);
    const O = y.useRef(!1);
    Ha(() => (O.current = !0, () => {
        O.current = !1
    }), []),
    Ha(() => {
        if (S && (E.current = S), C && (N.current = C), S && C) {
            if (A.current)
                return A.current(S, C, H);
            H()
        }
    }, [S, C, H, A, k]);
    const K = y.useMemo(() => ({
            reference: E,
            floating: N,
            setReference: g,
            setFloating: x
        }), [g, x]),
        U = y.useMemo(() => ({
            reference: S,
            floating: C
        }), [S, C]),
        V = y.useMemo(() => {
            const P = {
                position: n,
                left: 0,
                top: 0
            };
            if (!U.floating)
                return P;
            const j = og(U.floating, d.x),
                L = og(U.floating, d.y);
            return a ? {
                ...P,
                transform: "translate(" + j + "px, " + L + "px)",
                ...Sw(U.floating) >= 1.5 && {
                    willChange: "transform"
                }
            } : {
                position: n,
                left: j,
                top: L
            }
        }, [n, a, U.floating, d.x, d.y]);
    return y.useMemo(() => ({
        ...d,
        update: H,
        refs: K,
        elements: U,
        floatingStyles: V
    }), [d, H, K, U, V])
}
const rj = e => {
        function t(n) {
            return {}.hasOwnProperty.call(n, "current")
        }
        return {
            name: "arrow",
            options: e,
            fn(n) {
                const {element: r, padding: i} = typeof e == "function" ? e(n) : e;
                return r && t(r) ? r.current != null ? sg({
                    element: r.current,
                    padding: i
                }).fn(n) : {} : r ? sg({
                    element: r,
                    padding: i
                }).fn(n) : {}
            }
        }
    },
    ij = (e, t) => ({
        ...GP(e),
        options: [e, t]
    }),
    sj = (e, t) => ({
        ...qP(e),
        options: [e, t]
    }),
    oj = (e, t) => ({
        ...ZP(e),
        options: [e, t]
    }),
    aj = (e, t) => ({
        ...QP(e),
        options: [e, t]
    }),
    lj = (e, t) => ({
        ...YP(e),
        options: [e, t]
    }),
    cj = (e, t) => ({
        ...XP(e),
        options: [e, t]
    }),
    uj = (e, t) => ({
        ...rj(e),
        options: [e, t]
    });
var dj = "Arrow",
    Cw = y.forwardRef((e, t) => {
        const {children: n, width: r=10, height: i=5, ...s} = e;
        return c.jsx(ue.svg, {
            ...s,
            ref: t,
            width: r,
            height: i,
            viewBox: "0 0 30 10",
            preserveAspectRatio: "none",
            children: e.asChild ? n : c.jsx("polygon", {
                points: "0,0 30,0 15,10"
            })
        })
    });
Cw.displayName = dj;
var fj = Cw;
function hj(e) {
    const [t, n] = y.useState(void 0);
    return He(() => {
        if (e) {
            n({
                width: e.offsetWidth,
                height: e.offsetHeight
            });
            const r = new ResizeObserver(i => {
                if (!Array.isArray(i) || !i.length)
                    return;
                const s = i[0];
                let o,
                    a;
                if ("borderBoxSize" in s) {
                    const l = s.borderBoxSize,
                        u = Array.isArray(l) ? l[0] : l;
                    o = u.inlineSize,
                    a = u.blockSize
                } else
                    o = e.offsetWidth,
                    a = e.offsetHeight;
                n({
                    width: o,
                    height: a
                })
            });
            return r.observe(e, {
                box: "border-box"
            }), () => r.unobserve(e)
        } else
            n(void 0)
    }, [e]), t
}
var Lh = "Popper",
    [Ew, cc] = $o(Lh),
    [pj, Nw] = Ew(Lh),
    Tw = e => {
        const {__scopePopper: t, children: n} = e,
            [r, i] = y.useState(null);
        return c.jsx(pj, {
            scope: t,
            anchor: r,
            onAnchorChange: i,
            children: n
        })
    };
Tw.displayName = Lh;
var Pw = "PopperAnchor",
    jw = y.forwardRef((e, t) => {
        const {__scopePopper: n, virtualRef: r, ...i} = e,
            s = Nw(Pw, n),
            o = y.useRef(null),
            a = Re(t, o);
        return y.useEffect(() => {
            s.onAnchorChange((r == null ? void 0 : r.current) || o.current)
        }), r ? null : c.jsx(ue.div, {
            ...i,
            ref: a
        })
    });
jw.displayName = Pw;
var _h = "PopperContent",
    [mj, gj] = Ew(_h),
    kw = y.forwardRef((e, t) => {
        var _,
            le,
            Pe,
            oe,
            ne,
            ie;
        const {__scopePopper: n, side: r="bottom", sideOffset: i=0, align: s="center", alignOffset: o=0, arrowPadding: a=0, avoidCollisions: l=!0, collisionBoundary: u=[], collisionPadding: d=0, sticky: f="partial", hideWhenDetached: h=!1, updatePositionStrategy: p="optimized", onPlaced: b, ...m} = e,
            w = Nw(_h, n),
            [v, g] = y.useState(null),
            x = Re(t, Ke => g(Ke)),
            [S, C] = y.useState(null),
            E = hj(S),
            N = (E == null ? void 0 : E.width) ?? 0,
            T = (E == null ? void 0 : E.height) ?? 0,
            k = r + (s !== "center" ? "-" + s : ""),
            A = typeof d == "number" ? d : {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                ...d
            },
            z = Array.isArray(u) ? u : [u],
            D = z.length > 0,
            H = {
                padding: A,
                boundary: z.filter(vj),
                altBoundary: D
            },
            {refs: O, floatingStyles: K, placement: U, isPositioned: V, middlewareData: P} = nj({
                strategy: "fixed",
                placement: k,
                whileElementsMounted: (...Ke) => KP(...Ke, {
                    animationFrame: p === "always"
                }),
                elements: {
                    reference: w.anchor
                },
                middleware: [ij({
                    mainAxis: i + T,
                    alignmentAxis: o
                }), l && sj({
                    mainAxis: !0,
                    crossAxis: !1,
                    limiter: f === "partial" ? oj() : void 0,
                    ...H
                }), l && aj({
                    ...H
                }), lj({
                    ...H,
                    apply: ({elements: Ke, rects: Ct, availableWidth: Rr, availableHeight: Vn}) => {
                        const {width: Ar, height: Ns} = Ct.reference,
                            hi = Ke.floating.style;
                        hi.setProperty("--radix-popper-available-width", `${Rr}px`),
                        hi.setProperty("--radix-popper-available-height", `${Vn}px`),
                        hi.setProperty("--radix-popper-anchor-width", `${Ar}px`),
                        hi.setProperty("--radix-popper-anchor-height", `${Ns}px`)
                    }
                }), S && uj({
                    element: S,
                    padding: a
                }), xj({
                    arrowWidth: N,
                    arrowHeight: T
                }), h && cj({
                    strategy: "referenceHidden",
                    ...H
                })]
            }),
            [j, L] = Mw(U),
            G = nn(b);
        He(() => {
            V && (G == null || G())
        }, [V, G]);
        const W = (_ = P.arrow) == null ? void 0 : _.x,
            X = (le = P.arrow) == null ? void 0 : le.y,
            q = ((Pe = P.arrow) == null ? void 0 : Pe.centerOffset) !== 0,
            [pe, Te] = y.useState();
        return He(() => {
            v && Te(window.getComputedStyle(v).zIndex)
        }, [v]), c.jsx("div", {
            ref: O.setFloating,
            "data-radix-popper-content-wrapper": "",
            style: {
                ...K,
                transform: V ? K.transform : "translate(0, -200%)",
                minWidth: "max-content",
                zIndex: pe,
                "--radix-popper-transform-origin": [(oe = P.transformOrigin) == null ? void 0 : oe.x, (ne = P.transformOrigin) == null ? void 0 : ne.y].join(" "),
                ...((ie = P.hide) == null ? void 0 : ie.referenceHidden) && {
                    visibility: "hidden",
                    pointerEvents: "none"
                }
            },
            dir: e.dir,
            children: c.jsx(mj, {
                scope: n,
                placedSide: j,
                onArrowChange: C,
                arrowX: W,
                arrowY: X,
                shouldHideArrow: q,
                children: c.jsx(ue.div, {
                    "data-side": j,
                    "data-align": L,
                    ...m,
                    ref: x,
                    style: {
                        ...m.style,
                        animation: V ? void 0 : "none"
                    }
                })
            })
        })
    });
kw.displayName = _h;
var Rw = "PopperArrow",
    yj = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
    },
    Aw = y.forwardRef(function(t, n) {
        const {__scopePopper: r, ...i} = t,
            s = gj(Rw, r),
            o = yj[s.placedSide];
        return c.jsx("span", {
            ref: s.onArrowChange,
            style: {
                position: "absolute",
                left: s.arrowX,
                top: s.arrowY,
                [o]: 0,
                transformOrigin: {
                    top: "",
                    right: "0 0",
                    bottom: "center 0",
                    left: "100% 0"
                }[s.placedSide],
                transform: {
                    top: "translateY(100%)",
                    right: "translateY(50%) rotate(90deg) translateX(-50%)",
                    bottom: "rotate(180deg)",
                    left: "translateY(50%) rotate(-90deg) translateX(50%)"
                }[s.placedSide],
                visibility: s.shouldHideArrow ? "hidden" : void 0
            },
            children: c.jsx(fj, {
                ...i,
                ref: n,
                style: {
                    ...i.style,
                    display: "block"
                }
            })
        })
    });
Aw.displayName = Rw;
function vj(e) {
    return e !== null
}
var xj = e => ({
    name: "transformOrigin",
    options: e,
    fn(t) {
        var w,
            v,
            g;
        const {placement: n, rects: r, middlewareData: i} = t,
            o = ((w = i.arrow) == null ? void 0 : w.centerOffset) !== 0,
            a = o ? 0 : e.arrowWidth,
            l = o ? 0 : e.arrowHeight,
            [u, d] = Mw(n),
            f = {
                start: "0%",
                center: "50%",
                end: "100%"
            }[d],
            h = (((v = i.arrow) == null ? void 0 : v.x) ?? 0) + a / 2,
            p = (((g = i.arrow) == null ? void 0 : g.y) ?? 0) + l / 2;
        let b = "",
            m = "";
        return u === "bottom" ? (b = o ? f : `${h}px`, m = `${-l}px`) : u === "top" ? (b = o ? f : `${h}px`, m = `${r.floating.height + l}px`) : u === "right" ? (b = `${-l}px`, m = o ? f : `${p}px`) : u === "left" && (b = `${r.floating.width + l}px`, m = o ? f : `${p}px`), {
            data: {
                x: b,
                y: m
            }
        }
    }
});
function Mw(e) {
    const [t, n="center"] = e.split("-");
    return [t, n]
}
var wj = Tw,
    Ow = jw,
    Iw = kw,
    Dw = Aw,
    [uc, ZL] = $o("Tooltip", [cc]),
    Vh = cc(),
    Lw = "TooltipProvider",
    bj = 700,
    ag = "tooltip.open",
    [Sj, _w] = uc(Lw),
    Vw = e => {
        const {__scopeTooltip: t, delayDuration: n=bj, skipDelayDuration: r=300, disableHoverableContent: i=!1, children: s} = e,
            o = y.useRef(!0),
            a = y.useRef(!1),
            l = y.useRef(0);
        return y.useEffect(() => {
            const u = l.current;
            return () => window.clearTimeout(u)
        }, []), c.jsx(Sj, {
            scope: t,
            isOpenDelayedRef: o,
            delayDuration: n,
            onOpen: y.useCallback(() => {
                window.clearTimeout(l.current),
                o.current = !1
            }, []),
            onClose: y.useCallback(() => {
                window.clearTimeout(l.current),
                l.current = window.setTimeout(() => o.current = !0, r)
            }, [r]),
            isPointerInTransitRef: a,
            onPointerInTransitChange: y.useCallback(u => {
                a.current = u
            }, []),
            disableHoverableContent: i,
            children: s
        })
    };
Vw.displayName = Lw;
var Fw = "Tooltip",
    [JL, dc] = uc(Fw),
    zd = "TooltipTrigger",
    Cj = y.forwardRef((e, t) => {
        const {__scopeTooltip: n, ...r} = e,
            i = dc(zd, n),
            s = _w(zd, n),
            o = Vh(n),
            a = y.useRef(null),
            l = Re(t, a, i.onTriggerChange),
            u = y.useRef(!1),
            d = y.useRef(!1),
            f = y.useCallback(() => u.current = !1, []);
        return y.useEffect(() => () => document.removeEventListener("pointerup", f), [f]), c.jsx(Ow, {
            asChild: !0,
            ...o,
            children: c.jsx(ue.button, {
                "aria-describedby": i.open ? i.contentId : void 0,
                "data-state": i.stateAttribute,
                ...r,
                ref: l,
                onPointerMove: ee(e.onPointerMove, h => {
                    h.pointerType !== "touch" && !d.current && !s.isPointerInTransitRef.current && (i.onTriggerEnter(), d.current = !0)
                }),
                onPointerLeave: ee(e.onPointerLeave, () => {
                    i.onTriggerLeave(),
                    d.current = !1
                }),
                onPointerDown: ee(e.onPointerDown, () => {
                    i.open && i.onClose(),
                    u.current = !0,
                    document.addEventListener("pointerup", f, {
                        once: !0
                    })
                }),
                onFocus: ee(e.onFocus, () => {
                    u.current || i.onOpen()
                }),
                onBlur: ee(e.onBlur, i.onClose),
                onClick: ee(e.onClick, i.onClose)
            })
        })
    });
Cj.displayName = zd;
var Ej = "TooltipPortal",
    [e4, Nj] = uc(Ej, {
        forceMount: void 0
    }),
    us = "TooltipContent",
    zw = y.forwardRef((e, t) => {
        const n = Nj(us, e.__scopeTooltip),
            {forceMount: r=n.forceMount, side: i="top", ...s} = e,
            o = dc(us, e.__scopeTooltip);
        return c.jsx(wh, {
            present: r || o.open,
            children: o.disableHoverableContent ? c.jsx(Bw, {
                side: i,
                ...s,
                ref: t
            }) : c.jsx(Tj, {
                side: i,
                ...s,
                ref: t
            })
        })
    }),
    Tj = y.forwardRef((e, t) => {
        const n = dc(us, e.__scopeTooltip),
            r = _w(us, e.__scopeTooltip),
            i = y.useRef(null),
            s = Re(t, i),
            [o, a] = y.useState(null),
            {trigger: l, onClose: u} = n,
            d = i.current,
            {onPointerInTransitChange: f} = r,
            h = y.useCallback(() => {
                a(null),
                f(!1)
            }, [f]),
            p = y.useCallback((b, m) => {
                const w = b.currentTarget,
                    v = {
                        x: b.clientX,
                        y: b.clientY
                    },
                    g = Aj(v, w.getBoundingClientRect()),
                    x = Mj(v, g),
                    S = Oj(m.getBoundingClientRect()),
                    C = Dj([...x, ...S]);
                a(C),
                f(!0)
            }, [f]);
        return y.useEffect(() => () => h(), [h]), y.useEffect(() => {
            if (l && d) {
                const b = w => p(w, d),
                    m = w => p(w, l);
                return l.addEventListener("pointerleave", b), d.addEventListener("pointerleave", m), () => {
                    l.removeEventListener("pointerleave", b),
                    d.removeEventListener("pointerleave", m)
                }
            }
        }, [l, d, p, h]), y.useEffect(() => {
            if (o) {
                const b = m => {
                    const w = m.target,
                        v = {
                            x: m.clientX,
                            y: m.clientY
                        },
                        g = (l == null ? void 0 : l.contains(w)) || (d == null ? void 0 : d.contains(w)),
                        x = !Ij(v, o);
                    g ? h() : x && (h(), u())
                };
                return document.addEventListener("pointermove", b), () => document.removeEventListener("pointermove", b)
            }
        }, [l, d, o, u, h]), c.jsx(Bw, {
            ...e,
            ref: s
        })
    }),
    [Pj, jj] = uc(Fw, {
        isInside: !1
    }),
    kj = kN("TooltipContent"),
    Bw = y.forwardRef((e, t) => {
        const {__scopeTooltip: n, children: r, "aria-label": i, onEscapeKeyDown: s, onPointerDownOutside: o, ...a} = e,
            l = dc(us, n),
            u = Vh(n),
            {onClose: d} = l;
        return y.useEffect(() => (document.addEventListener(ag, d), () => document.removeEventListener(ag, d)), [d]), y.useEffect(() => {
            if (l.trigger) {
                const f = h => {
                    const p = h.target;
                    p != null && p.contains(l.trigger) && d()
                };
                return window.addEventListener("scroll", f, {
                    capture: !0
                }), () => window.removeEventListener("scroll", f, {
                    capture: !0
                })
            }
        }, [l.trigger, d]), c.jsx(ec, {
            asChild: !0,
            disableOutsidePointerEvents: !1,
            onEscapeKeyDown: s,
            onPointerDownOutside: o,
            onFocusOutside: f => f.preventDefault(),
            onDismiss: d,
            children: c.jsxs(Iw, {
                "data-state": l.stateAttribute,
                ...u,
                ...a,
                ref: t,
                style: {
                    ...a.style,
                    "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                    "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                    "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                    "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                    "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
                },
                children: [c.jsx(kj, {
                    children: r
                }), c.jsx(Pj, {
                    scope: n,
                    isInside: !0,
                    children: c.jsx(XN, {
                        id: l.contentId,
                        role: "tooltip",
                        children: i || r
                    })
                })]
            })
        })
    });
zw.displayName = us;
var $w = "TooltipArrow",
    Rj = y.forwardRef((e, t) => {
        const {__scopeTooltip: n, ...r} = e,
            i = Vh(n);
        return jj($w, n).isInside ? null : c.jsx(Dw, {
            ...i,
            ...r,
            ref: t
        })
    });
Rj.displayName = $w;
function Aj(e, t) {
    const n = Math.abs(t.top - e.y),
        r = Math.abs(t.bottom - e.y),
        i = Math.abs(t.right - e.x),
        s = Math.abs(t.left - e.x);
    switch (Math.min(n, r, i, s)) {
    case s:
        return "left";
    case i:
        return "right";
    case n:
        return "top";
    case r:
        return "bottom";
    default:
        throw new Error("unreachable")
    }
}
function Mj(e, t, n=5) {
    const r = [];
    switch (t) {
    case "top":
        r.push({
            x: e.x - n,
            y: e.y + n
        }, {
            x: e.x + n,
            y: e.y + n
        });
        break;
    case "bottom":
        r.push({
            x: e.x - n,
            y: e.y - n
        }, {
            x: e.x + n,
            y: e.y - n
        });
        break;
    case "left":
        r.push({
            x: e.x + n,
            y: e.y - n
        }, {
            x: e.x + n,
            y: e.y + n
        });
        break;
    case "right":
        r.push({
            x: e.x - n,
            y: e.y - n
        }, {
            x: e.x - n,
            y: e.y + n
        });
        break
    }
    return r
}
function Oj(e) {
    const {top: t, right: n, bottom: r, left: i} = e;
    return [{
        x: i,
        y: t
    }, {
        x: n,
        y: t
    }, {
        x: n,
        y: r
    }, {
        x: i,
        y: r
    }]
}
function Ij(e, t) {
    const {x: n, y: r} = e;
    let i = !1;
    for (let s = 0, o = t.length - 1; s < t.length; o = s++) {
        const a = t[s],
            l = t[o],
            u = a.x,
            d = a.y,
            f = l.x,
            h = l.y;
        d > r != h > r && n < (f - u) * (r - d) / (h - d) + u && (i = !i)
    }
    return i
}
function Dj(e) {
    const t = e.slice();
    return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Lj(t)
}
function Lj(e) {
    if (e.length <= 1)
        return e.slice();
    const t = [];
    for (let r = 0; r < e.length; r++) {
        const i = e[r];
        for (; t.length >= 2;) {
            const s = t[t.length - 1],
                o = t[t.length - 2];
            if ((s.x - o.x) * (i.y - o.y) >= (s.y - o.y) * (i.x - o.x))
                t.pop();
            else
                break
        }
        t.push(i)
    }
    t.pop();
    const n = [];
    for (let r = e.length - 1; r >= 0; r--) {
        const i = e[r];
        for (; n.length >= 2;) {
            const s = n[n.length - 1],
                o = n[n.length - 2];
            if ((s.x - o.x) * (i.y - o.y) >= (s.y - o.y) * (i.x - o.x))
                n.pop();
            else
                break
        }
        n.push(i)
    }
    return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n)
}
var _j = Vw,
    Uw = zw;
const Vj = _j,
    Fj = y.forwardRef(({className: e, sideOffset: t=4, ...n}, r) => c.jsx(Uw, {
        ref: r,
        sideOffset: t,
        className: Ve("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", e),
        ...n
    }));
Fj.displayName = Uw.displayName;
var fc = class {
        constructor()
        {
            this.listeners = new Set,
            this.subscribe = this.subscribe.bind(this)
        }
        subscribe(e)
        {
            return this.listeners.add(e), this.onSubscribe(), () => {
                this.listeners.delete(e),
                this.onUnsubscribe()
            }
        }
        hasListeners()
        {
            return this.listeners.size > 0
        }
        onSubscribe() {}
        onUnsubscribe() {}
    }
    ,
    hc = typeof window > "u" || "Deno" in globalThis;
function Kt() {}
function zj(e, t) {
    return typeof e == "function" ? e(t) : e
}
function Bj(e) {
    return typeof e == "number" && e >= 0 && e !== 1 / 0
}
function $j(e, t) {
    return Math.max(e + (t || 0) - Date.now(), 0)
}
function Bd(e, t) {
    return typeof e == "function" ? e(t) : e
}
function Uj(e, t) {
    return typeof e == "function" ? e(t) : e
}
function lg(e, t) {
    const {type: n="all", exact: r, fetchStatus: i, predicate: s, queryKey: o, stale: a} = e;
    if (o) {
        if (r) {
            if (t.queryHash !== Fh(o, t.options))
                return !1
        } else if (!Po(t.queryKey, o))
            return !1
    }
    if (n !== "all") {
        const l = t.isActive();
        if (n === "active" && !l || n === "inactive" && l)
            return !1
    }
    return !(typeof a == "boolean" && t.isStale() !== a || i && i !== t.state.fetchStatus || s && !s(t))
}
function cg(e, t) {
    const {exact: n, status: r, predicate: i, mutationKey: s} = e;
    if (s) {
        if (!t.options.mutationKey)
            return !1;
        if (n) {
            if (To(t.options.mutationKey) !== To(s))
                return !1
        } else if (!Po(t.options.mutationKey, s))
            return !1
    }
    return !(r && t.state.status !== r || i && !i(t))
}
function Fh(e, t) {
    return ((t == null ? void 0 : t.queryKeyHashFn) || To)(e)
}
function To(e) {
    return JSON.stringify(e, (t, n) => $d(n) ? Object.keys(n).sort().reduce((r, i) => (r[i] = n[i], r), {}) : n)
}
function Po(e, t) {
    return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" && typeof t == "object" ? Object.keys(t).every(n => Po(e[n], t[n])) : !1
}
function Ww(e, t) {
    if (e === t)
        return e;
    const n = ug(e) && ug(t);
    if (n || $d(e) && $d(t)) {
        const r = n ? e : Object.keys(e),
            i = r.length,
            s = n ? t : Object.keys(t),
            o = s.length,
            a = n ? [] : {},
            l = new Set(r);
        let u = 0;
        for (let d = 0; d < o; d++) {
            const f = n ? d : s[d];
            (!n && l.has(f) || n) && e[f] === void 0 && t[f] === void 0 ? (a[f] = void 0, u++) : (a[f] = Ww(e[f], t[f]), a[f] === e[f] && e[f] !== void 0 && u++)
        }
        return i === o && u === i ? e : a
    }
    return t
}
function ug(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length
}
function $d(e) {
    if (!dg(e))
        return !1;
    const t = e.constructor;
    if (t === void 0)
        return !0;
    const n = t.prototype;
    return !(!dg(n) || !n.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype)
}
function dg(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
}
function Wj(e) {
    return new Promise(t => {
        setTimeout(t, e)
    })
}
function Hj(e, t, n) {
    return typeof n.structuralSharing == "function" ? n.structuralSharing(e, t) : n.structuralSharing !== !1 ? Ww(e, t) : t
}
function Kj(e, t, n=0) {
    const r = [...e, t];
    return n && r.length > n ? r.slice(1) : r
}
function Gj(e, t, n=0) {
    const r = [t, ...e];
    return n && r.length > n ? r.slice(0, -1) : r
}
var zh = Symbol();
function Hw(e, t) {
    return !e.queryFn && (t != null && t.initialPromise) ? () => t.initialPromise : !e.queryFn || e.queryFn === zh ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn
}
var Ur,
    Zn,
    Gi,
    Jy,
    qj = (Jy = class  extends fc{
        constructor()
        {
            super();
            se(this, Ur);
            se(this, Zn);
            se(this, Gi);
            Y(this, Gi, t => {
                if (!hc && window.addEventListener) {
                    const n = () => t();
                    return window.addEventListener("visibilitychange", n, !1), () => {
                        window.removeEventListener("visibilitychange", n)
                    }
                }
            })
        }
        onSubscribe()
        {
            R(this, Zn) || this.setEventListener(R(this, Gi))
        }
        onUnsubscribe()
        {
            var t;
            this.hasListeners() || ((t = R(this, Zn)) == null || t.call(this), Y(this, Zn, void 0))
        }
        setEventListener(t)
        {
            var n;
            Y(this, Gi, t),
            (n = R(this, Zn)) == null || n.call(this),
            Y(this, Zn, t(r => {
                typeof r == "boolean" ? this.setFocused(r) : this.onFocus()
            }))
        }
        setFocused(t)
        {
            R(this, Ur) !== t && (Y(this, Ur, t), this.onFocus())
        }
        onFocus()
        {
            const t = this.isFocused();
            this.listeners.forEach(n => {
                n(t)
            })
        }
        isFocused()
        {
            var t;
            return typeof R(this, Ur) == "boolean" ? R(this, Ur) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden"
        }
    }
    , Ur = new WeakMap, Zn = new WeakMap, Gi = new WeakMap, Jy),
    Kw = new qj,
    qi,
    Jn,
    Qi,
    ev,
    Qj = (ev = class  extends fc{
        constructor()
        {
            super();
            se(this, qi, !0);
            se(this, Jn);
            se(this, Qi);
            Y(this, Qi, t => {
                if (!hc && window.addEventListener) {
                    const n = () => t(!0),
                        r = () => t(!1);
                    return window.addEventListener("online", n, !1), window.addEventListener("offline", r, !1), () => {
                        window.removeEventListener("online", n),
                        window.removeEventListener("offline", r)
                    }
                }
            })
        }
        onSubscribe()
        {
            R(this, Jn) || this.setEventListener(R(this, Qi))
        }
        onUnsubscribe()
        {
            var t;
            this.hasListeners() || ((t = R(this, Jn)) == null || t.call(this), Y(this, Jn, void 0))
        }
        setEventListener(t)
        {
            var n;
            Y(this, Qi, t),
            (n = R(this, Jn)) == null || n.call(this),
            Y(this, Jn, t(this.setOnline.bind(this)))
        }
        setOnline(t)
        {
            R(this, qi) !== t && (Y(this, qi, t), this.listeners.forEach(r => {
                r(t)
            }))
        }
        isOnline()
        {
            return R(this, qi)
        }
    }
    , qi = new WeakMap, Jn = new WeakMap, Qi = new WeakMap, ev),
    Tl = new Qj;
function Yj() {
    let e,
        t;
    const n = new Promise((i, s) => {
        e = i,
        t = s
    });
    n.status = "pending",
    n.catch(() => {});
    function r(i) {
        Object.assign(n, i),
        delete n.resolve,
        delete n.reject
    }
    return n.resolve = i => {
        r({
            status: "fulfilled",
            value: i
        }),
        e(i)
    }, n.reject = i => {
        r({
            status: "rejected",
            reason: i
        }),
        t(i)
    }, n
}
function Xj(e) {
    return Math.min(1e3 * 2 ** e, 3e4)
}
function Gw(e) {
    return (e ?? "online") === "online" ? Tl.isOnline() : !0
}
var qw = class  extends Error{
    constructor(e)
    {
        super("CancelledError"),
        this.revert = e == null ? void 0 : e.revert,
        this.silent = e == null ? void 0 : e.silent
    }
}
;
function su(e) {
    return e instanceof qw
}
function Qw(e) {
    let t = !1,
        n = 0,
        r = !1,
        i;
    const s = Yj(),
        o = m => {
            var w;
            r || (h(new qw(m)), (w = e.abort) == null || w.call(e))
        },
        a = () => {
            t = !0
        },
        l = () => {
            t = !1
        },
        u = () => Kw.isFocused() && (e.networkMode === "always" || Tl.isOnline()) && e.canRun(),
        d = () => Gw(e.networkMode) && e.canRun(),
        f = m => {
            var w;
            r || (r = !0, (w = e.onSuccess) == null || w.call(e, m), i == null || i(), s.resolve(m))
        },
        h = m => {
            var w;
            r || (r = !0, (w = e.onError) == null || w.call(e, m), i == null || i(), s.reject(m))
        },
        p = () => new Promise(m => {
            var w;
            i = v => {
                (r || u()) && m(v)
            },
            (w = e.onPause) == null || w.call(e)
        }).then(() => {
            var m;
            i = void 0,
            r || (m = e.onContinue) == null || m.call(e)
        }),
        b = () => {
            if (r)
                return;
            let m;
            const w = n === 0 ? e.initialPromise : void 0;
            try {
                m = w ?? e.fn()
            } catch (v) {
                m = Promise.reject(v)
            }
            Promise.resolve(m).then(f).catch(v => {
                var E;
                if (r)
                    return;
                const g = e.retry ?? (hc ? 0 : 3),
                    x = e.retryDelay ?? Xj,
                    S = typeof x == "function" ? x(n, v) : x,
                    C = g === !0 || typeof g == "number" && n < g || typeof g == "function" && g(n, v);
                if (t || !C) {
                    h(v);
                    return
                }
                n++,
                (E = e.onFail) == null || E.call(e, n, v),
                Wj(S).then(() => u() ? void 0 : p()).then(() => {
                    t ? h(v) : b()
                })
            })
        };
    return {
        promise: s,
        cancel: o,
        continue: () => (i == null || i(), s),
        cancelRetry: a,
        continueRetry: l,
        canStart: d,
        start: () => (d() ? b() : p().then(b), s)
    }
}
var Zj = e => setTimeout(e, 0);
function Jj() {
    let e = [],
        t = 0,
        n = a => {
            a()
        },
        r = a => {
            a()
        },
        i = Zj;
    const s = a => {
            t ? e.push(a) : i(() => {
                n(a)
            })
        },
        o = () => {
            const a = e;
            e = [],
            a.length && i(() => {
                r(() => {
                    a.forEach(l => {
                        n(l)
                    })
                })
            })
        };
    return {
        batch: a => {
            let l;
            t++;
            try {
                l = a()
            } finally {
                t--,
                t || o()
            }
            return l
        },
        batchCalls: a => (...l) => {
            s(() => {
                a(...l)
            })
        },
        schedule: s,
        setNotifyFunction: a => {
            n = a
        },
        setBatchNotifyFunction: a => {
            r = a
        },
        setScheduler: a => {
            i = a
        }
    }
}
var rt = Jj(),
    Wr,
    tv,
    Yw = (tv = class {
        constructor()
        {
            se(this, Wr)
        }
        destroy()
        {
            this.clearGcTimeout()
        }
        scheduleGc()
        {
            this.clearGcTimeout(),
            Bj(this.gcTime) && Y(this, Wr, setTimeout(() => {
                this.optionalRemove()
            }, this.gcTime))
        }
        updateGcTime(e)
        {
            this.gcTime = Math.max(this.gcTime || 0, e ?? (hc ? 1 / 0 : 5 * 60 * 1e3))
        }
        clearGcTimeout()
        {
            R(this, Wr) && (clearTimeout(R(this, Wr)), Y(this, Wr, void 0))
        }
    }
    , Wr = new WeakMap, tv),
    Yi,
    Hr,
    jt,
    Kr,
    Ye,
    Do,
    Gr,
    Gt,
    Cn,
    nv,
    ek = (nv = class  extends Yw{
        constructor(t)
        {
            super();
            se(this, Gt);
            se(this, Yi);
            se(this, Hr);
            se(this, jt);
            se(this, Kr);
            se(this, Ye);
            se(this, Do);
            se(this, Gr);
            Y(this, Gr, !1),
            Y(this, Do, t.defaultOptions),
            this.setOptions(t.options),
            this.observers = [],
            Y(this, Kr, t.client),
            Y(this, jt, R(this, Kr).getQueryCache()),
            this.queryKey = t.queryKey,
            this.queryHash = t.queryHash,
            Y(this, Yi, nk(this.options)),
            this.state = t.state ?? R(this, Yi),
            this.scheduleGc()
        }
        get meta()
        {
            return this.options.meta
        }
        get promise()
        {
            var t;
            return (t = R(this, Ye)) == null ? void 0 : t.promise
        }
        setOptions(t)
        {
            this.options = {
                ...R(this, Do),
                ...t
            },
            this.updateGcTime(this.options.gcTime)
        }
        optionalRemove()
        {
            !this.observers.length && this.state.fetchStatus === "idle" && R(this, jt).remove(this)
        }
        setData(t, n)
        {
            const r = Hj(this.state.data, t, this.options);
            return Ge(this, Gt, Cn).call(this, {
                data: r,
                type: "success",
                dataUpdatedAt: n == null ? void 0 : n.updatedAt,
                manual: n == null ? void 0 : n.manual
            }), r
        }
        setState(t, n)
        {
            Ge(this, Gt, Cn).call(this, {
                type: "setState",
                state: t,
                setStateOptions: n
            })
        }
        cancel(t)
        {
            var r,
                i;
            const n = (r = R(this, Ye)) == null ? void 0 : r.promise;
            return (i = R(this, Ye)) == null || i.cancel(t), n ? n.then(Kt).catch(Kt) : Promise.resolve()
        }
        destroy()
        {
            super.destroy(),
            this.cancel({
                silent: !0
            })
        }
        reset()
        {
            this.destroy(),
            this.setState(R(this, Yi))
        }
        isActive()
        {
            return this.observers.some(t => Uj(t.options.enabled, this) !== !1)
        }
        isDisabled()
        {
            return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === zh || this.state.dataUpdateCount + this.state.errorUpdateCount === 0
        }
        isStatic()
        {
            return this.getObserversCount() > 0 ? this.observers.some(t => Bd(t.options.staleTime, this) === "static") : !1
        }
        isStale()
        {
            return this.getObserversCount() > 0 ? this.observers.some(t => t.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated
        }
        isStaleByTime(t=0)
        {
            return this.state.data === void 0 ? !0 : t === "static" ? !1 : this.state.isInvalidated ? !0 : !$j(this.state.dataUpdatedAt, t)
        }
        onFocus()
        {
            var n;
            const t = this.observers.find(r => r.shouldFetchOnWindowFocus());
            t == null || t.refetch({
                cancelRefetch: !1
            }),
            (n = R(this, Ye)) == null || n.continue()
        }
        onOnline()
        {
            var n;
            const t = this.observers.find(r => r.shouldFetchOnReconnect());
            t == null || t.refetch({
                cancelRefetch: !1
            }),
            (n = R(this, Ye)) == null || n.continue()
        }
        addObserver(t)
        {
            this.observers.includes(t) || (this.observers.push(t), this.clearGcTimeout(), R(this, jt).notify({
                type: "observerAdded",
                query: this,
                observer: t
            }))
        }
        removeObserver(t)
        {
            this.observers.includes(t) && (this.observers = this.observers.filter(n => n !== t), this.observers.length || (R(this, Ye) && (R(this, Gr) ? R(this, Ye).cancel({
                revert: !0
            }) : R(this, Ye).cancelRetry()), this.scheduleGc()), R(this, jt).notify({
                type: "observerRemoved",
                query: this,
                observer: t
            }))
        }
        getObserversCount()
        {
            return this.observers.length
        }
        invalidate()
        {
            this.state.isInvalidated || Ge(this, Gt, Cn).call(this, {
                type: "invalidate"
            })
        }
        fetch(t, n)
        {
            var u,
                d,
                f;
            if (this.state.fetchStatus !== "idle") {
                if (this.state.data !== void 0 && (n != null && n.cancelRefetch))
                    this.cancel({
                        silent: !0
                    });
                else if (R(this, Ye))
                    return R(this, Ye).continueRetry(), R(this, Ye).promise
            }
            if (t && this.setOptions(t), !this.options.queryFn) {
                const h = this.observers.find(p => p.options.queryFn);
                h && this.setOptions(h.options)
            }
            const r = new AbortController,
                i = h => {
                    Object.defineProperty(h, "signal", {
                        enumerable: !0,
                        get: () => (Y(this, Gr, !0), r.signal)
                    })
                },
                s = () => {
                    const h = Hw(this.options, n),
                        b = (() => {
                            const m = {
                                client: R(this, Kr),
                                queryKey: this.queryKey,
                                meta: this.meta
                            };
                            return i(m), m
                        })();
                    return Y(this, Gr, !1), this.options.persister ? this.options.persister(h, b, this) : h(b)
                },
                a = (() => {
                    const h = {
                        fetchOptions: n,
                        options: this.options,
                        queryKey: this.queryKey,
                        client: R(this, Kr),
                        state: this.state,
                        fetchFn: s
                    };
                    return i(h), h
                })();
            (u = this.options.behavior) == null || u.onFetch(a, this),
            Y(this, Hr, this.state),
            (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((d = a.fetchOptions) == null ? void 0 : d.meta)) && Ge(this, Gt, Cn).call(this, {
                type: "fetch",
                meta: (f = a.fetchOptions) == null ? void 0 : f.meta
            });
            const l = h => {
                var p,
                    b,
                    m,
                    w;
                su(h) && h.silent || Ge(this, Gt, Cn).call(this, {
                    type: "error",
                    error: h
                }),
                su(h) || ((b = (p = R(this, jt).config).onError) == null || b.call(p, h, this), (w = (m = R(this, jt).config).onSettled) == null || w.call(m, this.state.data, h, this)),
                this.scheduleGc()
            };
            return Y(this, Ye, Qw({
                initialPromise: n == null ? void 0 : n.initialPromise,
                fn: a.fetchFn,
                abort: r.abort.bind(r),
                onSuccess: h => {
                    var p,
                        b,
                        m,
                        w;
                    if (h === void 0) {
                        l(new Error(`${this.queryHash} data is undefined`));
                        return
                    }
                    try {
                        this.setData(h)
                    } catch (v) {
                        l(v);
                        return
                    }
                    (b = (p = R(this, jt).config).onSuccess) == null || b.call(p, h, this),
                    (w = (m = R(this, jt).config).onSettled) == null || w.call(m, h, this.state.error, this),
                    this.scheduleGc()
                },
                onError: l,
                onFail: (h, p) => {
                    Ge(this, Gt, Cn).call(this, {
                        type: "failed",
                        failureCount: h,
                        error: p
                    })
                },
                onPause: () => {
                    Ge(this, Gt, Cn).call(this, {
                        type: "pause"
                    })
                },
                onContinue: () => {
                    Ge(this, Gt, Cn).call(this, {
                        type: "continue"
                    })
                },
                retry: a.options.retry,
                retryDelay: a.options.retryDelay,
                networkMode: a.options.networkMode,
                canRun: () => !0
            })), R(this, Ye).start()
        }
    }
    , Yi = new WeakMap, Hr = new WeakMap, jt = new WeakMap, Kr = new WeakMap, Ye = new WeakMap, Do = new WeakMap, Gr = new WeakMap, Gt = new WeakSet, Cn = function(t) {
        const n = r => {
            switch (t.type) {
            case "failed":
                return {
                    ...r,
                    fetchFailureCount: t.failureCount,
                    fetchFailureReason: t.error
                };
            case "pause":
                return {
                    ...r,
                    fetchStatus: "paused"
                };
            case "continue":
                return {
                    ...r,
                    fetchStatus: "fetching"
                };
            case "fetch":
                return {
                    ...r,
                    ...tk(r.data, this.options),
                    fetchMeta: t.meta ?? null
                };
            case "success":
                return Y(this, Hr, void 0), {
                    ...r,
                    data: t.data,
                    dataUpdateCount: r.dataUpdateCount + 1,
                    dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
                    error: null,
                    isInvalidated: !1,
                    status: "success",
                    ...!t.manual && {
                        fetchStatus: "idle",
                        fetchFailureCount: 0,
                        fetchFailureReason: null
                    }
                };
            case "error":
                const i = t.error;
                return su(i) && i.revert && R(this, Hr) ? {
                    ...R(this, Hr),
                    fetchStatus: "idle"
                } : {
                    ...r,
                    error: i,
                    errorUpdateCount: r.errorUpdateCount + 1,
                    errorUpdatedAt: Date.now(),
                    fetchFailureCount: r.fetchFailureCount + 1,
                    fetchFailureReason: i,
                    fetchStatus: "idle",
                    status: "error"
                };
            case "invalidate":
                return {
                    ...r,
                    isInvalidated: !0
                };
            case "setState":
                return {
                    ...r,
                    ...t.state
                }
            }
        };
        this.state = n(this.state),
        rt.batch(() => {
            this.observers.forEach(r => {
                r.onQueryUpdate()
            }),
            R(this, jt).notify({
                query: this,
                type: "updated",
                action: t
            })
        })
    }, nv);
function tk(e, t) {
    return {
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchStatus: Gw(t.networkMode) ? "fetching" : "paused",
        ...e === void 0 && {
            error: null,
            status: "pending"
        }
    }
}
function nk(e) {
    const t = typeof e.initialData == "function" ? e.initialData() : e.initialData,
        n = t !== void 0,
        r = n ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
    return {
        data: t,
        dataUpdateCount: 0,
        dataUpdatedAt: n ? r ?? Date.now() : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: !1,
        status: n ? "success" : "pending",
        fetchStatus: "idle"
    }
}
var ln,
    rv,
    rk = (rv = class  extends fc{
        constructor(t={})
        {
            super();
            se(this, ln);
            this.config = t,
            Y(this, ln, new Map)
        }
        build(t, n, r)
        {
            const i = n.queryKey,
                s = n.queryHash ?? Fh(i, n);
            let o = this.get(s);
            return o || (o = new ek({
                client: t,
                queryKey: i,
                queryHash: s,
                options: t.defaultQueryOptions(n),
                state: r,
                defaultOptions: t.getQueryDefaults(i)
            }), this.add(o)), o
        }
        add(t)
        {
            R(this, ln).has(t.queryHash) || (R(this, ln).set(t.queryHash, t), this.notify({
                type: "added",
                query: t
            }))
        }
        remove(t)
        {
            const n = R(this, ln).get(t.queryHash);
            n && (t.destroy(), n === t && R(this, ln).delete(t.queryHash), this.notify({
                type: "removed",
                query: t
            }))
        }
        clear()
        {
            rt.batch(() => {
                this.getAll().forEach(t => {
                    this.remove(t)
                })
            })
        }
        get(t)
        {
            return R(this, ln).get(t)
        }
        getAll()
        {
            return [...R(this, ln).values()]
        }
        find(t)
        {
            const n = {
                exact: !0,
                ...t
            };
            return this.getAll().find(r => lg(n, r))
        }
        findAll(t={})
        {
            const n = this.getAll();
            return Object.keys(t).length > 0 ? n.filter(r => lg(t, r)) : n
        }
        notify(t)
        {
            rt.batch(() => {
                this.listeners.forEach(n => {
                    n(t)
                })
            })
        }
        onFocus()
        {
            rt.batch(() => {
                this.getAll().forEach(t => {
                    t.onFocus()
                })
            })
        }
        onOnline()
        {
            rt.batch(() => {
                this.getAll().forEach(t => {
                    t.onOnline()
                })
            })
        }
    }
    , ln = new WeakMap, rv),
    cn,
    et,
    qr,
    un,
    Hn,
    iv,
    ik = (iv = class  extends Yw{
        constructor(t)
        {
            super();
            se(this, un);
            se(this, cn);
            se(this, et);
            se(this, qr);
            this.mutationId = t.mutationId,
            Y(this, et, t.mutationCache),
            Y(this, cn, []),
            this.state = t.state || sk(),
            this.setOptions(t.options),
            this.scheduleGc()
        }
        setOptions(t)
        {
            this.options = t,
            this.updateGcTime(this.options.gcTime)
        }
        get meta()
        {
            return this.options.meta
        }
        addObserver(t)
        {
            R(this, cn).includes(t) || (R(this, cn).push(t), this.clearGcTimeout(), R(this, et).notify({
                type: "observerAdded",
                mutation: this,
                observer: t
            }))
        }
        removeObserver(t)
        {
            Y(this, cn, R(this, cn).filter(n => n !== t)),
            this.scheduleGc(),
            R(this, et).notify({
                type: "observerRemoved",
                mutation: this,
                observer: t
            })
        }
        optionalRemove()
        {
            R(this, cn).length || (this.state.status === "pending" ? this.scheduleGc() : R(this, et).remove(this))
        }
        continue()
        {
            var t;
            return ((t = R(this, qr)) == null ? void 0 : t.continue()) ?? this.execute(this.state.variables)
        }
        async execute(t)
        {
            var s,
                o,
                a,
                l,
                u,
                d,
                f,
                h,
                p,
                b,
                m,
                w,
                v,
                g,
                x,
                S,
                C,
                E,
                N,
                T;
            const n = () => {
                Ge(this, un, Hn).call(this, {
                    type: "continue"
                })
            };
            Y(this, qr, Qw({
                fn: () => this.options.mutationFn ? this.options.mutationFn(t) : Promise.reject(new Error("No mutationFn found")),
                onFail: (k, A) => {
                    Ge(this, un, Hn).call(this, {
                        type: "failed",
                        failureCount: k,
                        error: A
                    })
                },
                onPause: () => {
                    Ge(this, un, Hn).call(this, {
                        type: "pause"
                    })
                },
                onContinue: n,
                retry: this.options.retry ?? 0,
                retryDelay: this.options.retryDelay,
                networkMode: this.options.networkMode,
                canRun: () => R(this, et).canRun(this)
            }));
            const r = this.state.status === "pending",
                i = !R(this, qr).canStart();
            try {
                if (r)
                    n();
                else {
                    Ge(this, un, Hn).call(this, {
                        type: "pending",
                        variables: t,
                        isPaused: i
                    }),
                    await ((o = (s = R(this, et).config).onMutate) == null ? void 0 : o.call(s, t, this));
                    const A = await ((l = (a = this.options).onMutate) == null ? void 0 : l.call(a, t));
                    A !== this.state.context && Ge(this, un, Hn).call(this, {
                        type: "pending",
                        context: A,
                        variables: t,
                        isPaused: i
                    })
                }
                const k = await R(this, qr).start();
                return await ((d = (u = R(this, et).config).onSuccess) == null ? void 0 : d.call(u, k, t, this.state.context, this)), await ((h = (f = this.options).onSuccess) == null ? void 0 : h.call(f, k, t, this.state.context)), await ((b = (p = R(this, et).config).onSettled) == null ? void 0 : b.call(p, k, null, this.state.variables, this.state.context, this)), await ((w = (m = this.options).onSettled) == null ? void 0 : w.call(m, k, null, t, this.state.context)), Ge(this, un, Hn).call(this, {
                    type: "success",
                    data: k
                }), k
            } catch (k) {
                try {
                    throw await ((g = (v = R(this, et).config).onError) == null ? void 0 : g.call(v, k, t, this.state.context, this)), await ((S = (x = this.options).onError) == null ? void 0 : S.call(x, k, t, this.state.context)), await ((E = (C = R(this, et).config).onSettled) == null ? void 0 : E.call(C, void 0, k, this.state.variables, this.state.context, this)), await ((T = (N = this.options).onSettled) == null ? void 0 : T.call(N, void 0, k, t, this.state.context)), k
                } finally {
                    Ge(this, un, Hn).call(this, {
                        type: "error",
                        error: k
                    })
                }
            } finally {
                R(this, et).runNext(this)
            }
        }
    }
    , cn = new WeakMap, et = new WeakMap, qr = new WeakMap, un = new WeakSet, Hn = function(t) {
        const n = r => {
            switch (t.type) {
            case "failed":
                return {
                    ...r,
                    failureCount: t.failureCount,
                    failureReason: t.error
                };
            case "pause":
                return {
                    ...r,
                    isPaused: !0
                };
            case "continue":
                return {
                    ...r,
                    isPaused: !1
                };
            case "pending":
                return {
                    ...r,
                    context: t.context,
                    data: void 0,
                    failureCount: 0,
                    failureReason: null,
                    error: null,
                    isPaused: t.isPaused,
                    status: "pending",
                    variables: t.variables,
                    submittedAt: Date.now()
                };
            case "success":
                return {
                    ...r,
                    data: t.data,
                    failureCount: 0,
                    failureReason: null,
                    error: null,
                    status: "success",
                    isPaused: !1
                };
            case "error":
                return {
                    ...r,
                    data: void 0,
                    error: t.error,
                    failureCount: r.failureCount + 1,
                    failureReason: t.error,
                    isPaused: !1,
                    status: "error"
                }
            }
        };
        this.state = n(this.state),
        rt.batch(() => {
            R(this, cn).forEach(r => {
                r.onMutationUpdate(t)
            }),
            R(this, et).notify({
                mutation: this,
                type: "updated",
                action: t
            })
        })
    }, iv);
function sk() {
    return {
        context: void 0,
        data: void 0,
        error: null,
        failureCount: 0,
        failureReason: null,
        isPaused: !1,
        status: "idle",
        variables: void 0,
        submittedAt: 0
    }
}
var Tn,
    qt,
    Lo,
    sv,
    ok = (sv = class  extends fc{
        constructor(t={})
        {
            super();
            se(this, Tn);
            se(this, qt);
            se(this, Lo);
            this.config = t,
            Y(this, Tn, new Set),
            Y(this, qt, new Map),
            Y(this, Lo, 0)
        }
        build(t, n, r)
        {
            const i = new ik({
                mutationCache: this,
                mutationId: ++Jo(this, Lo)._,
                options: t.defaultMutationOptions(n),
                state: r
            });
            return this.add(i), i
        }
        add(t)
        {
            R(this, Tn).add(t);
            const n = ba(t);
            if (typeof n == "string") {
                const r = R(this, qt).get(n);
                r ? r.push(t) : R(this, qt).set(n, [t])
            }
            this.notify({
                type: "added",
                mutation: t
            })
        }
        remove(t)
        {
            if (R(this, Tn).delete(t)) {
                const n = ba(t);
                if (typeof n == "string") {
                    const r = R(this, qt).get(n);
                    if (r)
                        if (r.length > 1) {
                            const i = r.indexOf(t);
                            i !== -1 && r.splice(i, 1)
                        } else
                            r[0] === t && R(this, qt).delete(n)
                }
            }
            this.notify({
                type: "removed",
                mutation: t
            })
        }
        canRun(t)
        {
            const n = ba(t);
            if (typeof n == "string") {
                const r = R(this, qt).get(n),
                    i = r == null ? void 0 : r.find(s => s.state.status === "pending");
                return !i || i === t
            } else
                return !0
        }
        runNext(t)
        {
            var r;
            const n = ba(t);
            if (typeof n == "string") {
                const i = (r = R(this, qt).get(n)) == null ? void 0 : r.find(s => s !== t && s.state.isPaused);
                return (i == null ? void 0 : i.continue()) ?? Promise.resolve()
            } else
                return Promise.resolve()
        }
        clear()
        {
            rt.batch(() => {
                R(this, Tn).forEach(t => {
                    this.notify({
                        type: "removed",
                        mutation: t
                    })
                }),
                R(this, Tn).clear(),
                R(this, qt).clear()
            })
        }
        getAll()
        {
            return Array.from(R(this, Tn))
        }
        find(t)
        {
            const n = {
                exact: !0,
                ...t
            };
            return this.getAll().find(r => cg(n, r))
        }
        findAll(t={})
        {
            return this.getAll().filter(n => cg(t, n))
        }
        notify(t)
        {
            rt.batch(() => {
                this.listeners.forEach(n => {
                    n(t)
                })
            })
        }
        resumePausedMutations()
        {
            const t = this.getAll().filter(n => n.state.isPaused);
            return rt.batch(() => Promise.all(t.map(n => n.continue().catch(Kt))))
        }
    }
    , Tn = new WeakMap, qt = new WeakMap, Lo = new WeakMap, sv);
function ba(e) {
    var t;
    return (t = e.options.scope) == null ? void 0 : t.id
}
function fg(e) {
    return {
        onFetch: (t, n) => {
            var d,
                f,
                h,
                p,
                b;
            const r = t.options,
                i = (h = (f = (d = t.fetchOptions) == null ? void 0 : d.meta) == null ? void 0 : f.fetchMore) == null ? void 0 : h.direction,
                s = ((p = t.state.data) == null ? void 0 : p.pages) || [],
                o = ((b = t.state.data) == null ? void 0 : b.pageParams) || [];
            let a = {
                    pages: [],
                    pageParams: []
                },
                l = 0;
            const u = async () => {
                let m = !1;
                const w = x => {
                        Object.defineProperty(x, "signal", {
                            enumerable: !0,
                            get: () => (t.signal.aborted ? m = !0 : t.signal.addEventListener("abort", () => {
                                m = !0
                            }), t.signal)
                        })
                    },
                    v = Hw(t.options, t.fetchOptions),
                    g = async (x, S, C) => {
                        if (m)
                            return Promise.reject();
                        if (S == null && x.pages.length)
                            return Promise.resolve(x);
                        const N = (() => {
                                const z = {
                                    client: t.client,
                                    queryKey: t.queryKey,
                                    pageParam: S,
                                    direction: C ? "backward" : "forward",
                                    meta: t.options.meta
                                };
                                return w(z), z
                            })(),
                            T = await v(N),
                            {maxPages: k} = t.options,
                            A = C ? Gj : Kj;
                        return {
                            pages: A(x.pages, T, k),
                            pageParams: A(x.pageParams, S, k)
                        }
                    };
                if (i && s.length) {
                    const x = i === "backward",
                        S = x ? ak : hg,
                        C = {
                            pages: s,
                            pageParams: o
                        },
                        E = S(r, C);
                    a = await g(C, E, x)
                } else {
                    const x = e ?? s.length;
                    do {
                        const S = l === 0 ? o[0] ?? r.initialPageParam : hg(r, a);
                        if (l > 0 && S == null)
                            break;
                        a = await g(a, S),
                        l++
                    } while (l < x)
                }
                return a
            };
            t.options.persister ? t.fetchFn = () => {
                var m,
                    w;
                return (w = (m = t.options).persister) == null ? void 0 : w.call(m, u, {
                    client: t.client,
                    queryKey: t.queryKey,
                    meta: t.options.meta,
                    signal: t.signal
                }, n)
            } : t.fetchFn = u
        }
    }
}
function hg(e, {pages: t, pageParams: n}) {
    const r = t.length - 1;
    return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0
}
function ak(e, {pages: t, pageParams: n}) {
    var r;
    return t.length > 0 ? (r = e.getPreviousPageParam) == null ? void 0 : r.call(e, t[0], t, n[0], n) : void 0
}
var je,
    er,
    tr,
    Xi,
    Zi,
    nr,
    Ji,
    es,
    ov,
    lk = (ov = class {
        constructor(e={})
        {
            se(this, je);
            se(this, er);
            se(this, tr);
            se(this, Xi);
            se(this, Zi);
            se(this, nr);
            se(this, Ji);
            se(this, es);
            Y(this, je, e.queryCache || new rk),
            Y(this, er, e.mutationCache || new ok),
            Y(this, tr, e.defaultOptions || {}),
            Y(this, Xi, new Map),
            Y(this, Zi, new Map),
            Y(this, nr, 0)
        }
        mount()
        {
            Jo(this, nr)._++,
            R(this, nr) === 1 && (Y(this, Ji, Kw.subscribe(async e => {
                e && (await this.resumePausedMutations(), R(this, je).onFocus())
            })), Y(this, es, Tl.subscribe(async e => {
                e && (await this.resumePausedMutations(), R(this, je).onOnline())
            })))
        }
        unmount()
        {
            var e,
                t;
            Jo(this, nr)._--,
            R(this, nr) === 0 && ((e = R(this, Ji)) == null || e.call(this), Y(this, Ji, void 0), (t = R(this, es)) == null || t.call(this), Y(this, es, void 0))
        }
        isFetching(e)
        {
            return R(this, je).findAll({
                ...e,
                fetchStatus: "fetching"
            }).length
        }
        isMutating(e)
        {
            return R(this, er).findAll({
                ...e,
                status: "pending"
            }).length
        }
        getQueryData(e)
        {
            var n;
            const t = this.defaultQueryOptions({
                queryKey: e
            });
            return (n = R(this, je).get(t.queryHash)) == null ? void 0 : n.state.data
        }
        ensureQueryData(e)
        {
            const t = this.defaultQueryOptions(e),
                n = R(this, je).build(this, t),
                r = n.state.data;
            return r === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && n.isStaleByTime(Bd(t.staleTime, n)) && this.prefetchQuery(t), Promise.resolve(r))
        }
        getQueriesData(e)
        {
            return R(this, je).findAll(e).map(({queryKey: t, state: n}) => {
                const r = n.data;
                return [t, r]
            })
        }
        setQueryData(e, t, n)
        {
            const r = this.defaultQueryOptions({
                    queryKey: e
                }),
                i = R(this, je).get(r.queryHash),
                s = i == null ? void 0 : i.state.data,
                o = zj(t, s);
            if (o !== void 0)
                return R(this, je).build(this, r).setData(o, {
                    ...n,
                    manual: !0
                })
        }
        setQueriesData(e, t, n)
        {
            return rt.batch(() => R(this, je).findAll(e).map(({queryKey: r}) => [r, this.setQueryData(r, t, n)]))
        }
        getQueryState(e)
        {
            var n;
            const t = this.defaultQueryOptions({
                queryKey: e
            });
            return (n = R(this, je).get(t.queryHash)) == null ? void 0 : n.state
        }
        removeQueries(e)
        {
            const t = R(this, je);
            rt.batch(() => {
                t.findAll(e).forEach(n => {
                    t.remove(n)
                })
            })
        }
        resetQueries(e, t)
        {
            const n = R(this, je);
            return rt.batch(() => (n.findAll(e).forEach(r => {
                r.reset()
            }), this.refetchQueries({
                type: "active",
                ...e
            }, t)))
        }
        cancelQueries(e, t={})
        {
            const n = {
                    revert: !0,
                    ...t
                },
                r = rt.batch(() => R(this, je).findAll(e).map(i => i.cancel(n)));
            return Promise.all(r).then(Kt).catch(Kt)
        }
        invalidateQueries(e, t={})
        {
            return rt.batch(() => (R(this, je).findAll(e).forEach(n => {
                n.invalidate()
            }), (e == null ? void 0 : e.refetchType) === "none" ? Promise.resolve() : this.refetchQueries({
                ...e,
                type: (e == null ? void 0 : e.refetchType) ?? (e == null ? void 0 : e.type) ?? "active"
            }, t)))
        }
        refetchQueries(e, t={})
        {
            const n = {
                    ...t,
                    cancelRefetch: t.cancelRefetch ?? !0
                },
                r = rt.batch(() => R(this, je).findAll(e).filter(i => !i.isDisabled() && !i.isStatic()).map(i => {
                    let s = i.fetch(void 0, n);
                    return n.throwOnError || (s = s.catch(Kt)), i.state.fetchStatus === "paused" ? Promise.resolve() : s
                }));
            return Promise.all(r).then(Kt)
        }
        fetchQuery(e)
        {
            const t = this.defaultQueryOptions(e);
            t.retry === void 0 && (t.retry = !1);
            const n = R(this, je).build(this, t);
            return n.isStaleByTime(Bd(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data)
        }
        prefetchQuery(e)
        {
            return this.fetchQuery(e).then(Kt).catch(Kt)
        }
        fetchInfiniteQuery(e)
        {
            return e.behavior = fg(e.pages), this.fetchQuery(e)
        }
        prefetchInfiniteQuery(e)
        {
            return this.fetchInfiniteQuery(e).then(Kt).catch(Kt)
        }
        ensureInfiniteQueryData(e)
        {
            return e.behavior = fg(e.pages), this.ensureQueryData(e)
        }
        resumePausedMutations()
        {
            return Tl.isOnline() ? R(this, er).resumePausedMutations() : Promise.resolve()
        }
        getQueryCache()
        {
            return R(this, je)
        }
        getMutationCache()
        {
            return R(this, er)
        }
        getDefaultOptions()
        {
            return R(this, tr)
        }
        setDefaultOptions(e)
        {
            Y(this, tr, e)
        }
        setQueryDefaults(e, t)
        {
            R(this, Xi).set(To(e), {
                queryKey: e,
                defaultOptions: t
            })
        }
        getQueryDefaults(e)
        {
            const t = [...R(this, Xi).values()],
                n = {};
            return t.forEach(r => {
                Po(e, r.queryKey) && Object.assign(n, r.defaultOptions)
            }), n
        }
        setMutationDefaults(e, t)
        {
            R(this, Zi).set(To(e), {
                mutationKey: e,
                defaultOptions: t
            })
        }
        getMutationDefaults(e)
        {
            const t = [...R(this, Zi).values()],
                n = {};
            return t.forEach(r => {
                Po(e, r.mutationKey) && Object.assign(n, r.defaultOptions)
            }), n
        }
        defaultQueryOptions(e)
        {
            if (e._defaulted)
                return e;
            const t = {
                ...R(this, tr).queries,
                ...this.getQueryDefaults(e.queryKey),
                ...e,
                _defaulted: !0
            };
            return t.queryHash || (t.queryHash = Fh(t.queryKey, t)), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === zh && (t.enabled = !1), t
        }
        defaultMutationOptions(e)
        {
            return e != null && e._defaulted ? e : {
                ...R(this, tr).mutations,
                ...(e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey),
                ...e,
                _defaulted: !0
            }
        }
        clear()
        {
            R(this, je).clear(),
            R(this, er).clear()
        }
    }
    , je = new WeakMap, er = new WeakMap, tr = new WeakMap, Xi = new WeakMap, Zi = new WeakMap, nr = new WeakMap, Ji = new WeakMap, es = new WeakMap, ov),
    ck = y.createContext(void 0),
    uk = ({client: e, children: t}) => (y.useEffect(() => (e.mount(), () => {
        e.unmount()
    }), [e]), c.jsx(ck.Provider, {
        value: e,
        children: t
    })); /**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */








function jo() {
    return jo = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, jo.apply(this, arguments)
}
var sr;
(function(e) {
    e.Pop = "POP",
    e.Push = "PUSH",
    e.Replace = "REPLACE"
})(sr || (sr = {}));
const pg = "popstate";
function dk(e) {
    e === void 0 && (e = {});
    function t(r, i) {
        let {pathname: s, search: o, hash: a} = r.location;
        return Ud("", {
            pathname: s,
            search: o,
            hash: a
        }, i.state && i.state.usr || null, i.state && i.state.key || "default")
    }
    function n(r, i) {
        return typeof i == "string" ? i : Pl(i)
    }
    return hk(t, n, null, e)
}
function Ie(e, t) {
    if (e === !1 || e === null || typeof e > "u")
        throw new Error(t)
}
function Xw(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t)
        } catch {}
    }
}
function fk() {
    return Math.random().toString(36).substr(2, 8)
}
function mg(e, t) {
    return {
        usr: e.state,
        key: e.key,
        idx: t
    }
}
function Ud(e, t, n, r) {
    return n === void 0 && (n = null), jo({
        pathname: typeof e == "string" ? e : e.pathname,
        search: "",
        hash: ""
    }, typeof t == "string" ? xs(t) : t, {
        state: n,
        key: t && t.key || r || fk()
    })
}
function Pl(e) {
    let {pathname: t="/", search: n="", hash: r=""} = e;
    return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r), t
}
function xs(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
        let r = e.indexOf("?");
        r >= 0 && (t.search = e.substr(r), e = e.substr(0, r)),
        e && (t.pathname = e)
    }
    return t
}
function hk(e, t, n, r) {
    r === void 0 && (r = {});
    let {window: i=document.defaultView, v5Compat: s=!1} = r,
        o = i.history,
        a = sr.Pop,
        l = null,
        u = d();
    u == null && (u = 0, o.replaceState(jo({}, o.state, {
        idx: u
    }), ""));
    function d() {
        return (o.state || {
            idx: null
        }).idx
    }
    function f() {
        a = sr.Pop;
        let w = d(),
            v = w == null ? null : w - u;
        u = w,
        l && l({
            action: a,
            location: m.location,
            delta: v
        })
    }
    function h(w, v) {
        a = sr.Push;
        let g = Ud(m.location, w, v);
        u = d() + 1;
        let x = mg(g, u),
            S = m.createHref(g);
        try {
            o.pushState(x, "", S)
        } catch (C) {
            if (C instanceof DOMException && C.name === "DataCloneError")
                throw C;
            i.location.assign(S)
        }
        s && l && l({
            action: a,
            location: m.location,
            delta: 1
        })
    }
    function p(w, v) {
        a = sr.Replace;
        let g = Ud(m.location, w, v);
        u = d();
        let x = mg(g, u),
            S = m.createHref(g);
        o.replaceState(x, "", S),
        s && l && l({
            action: a,
            location: m.location,
            delta: 0
        })
    }
    function b(w) {
        let v = i.location.origin !== "null" ? i.location.origin : i.location.href,
            g = typeof w == "string" ? w : Pl(w);
        return g = g.replace(/ $/, "%20"), Ie(v, "No window.location.(origin|href) available to create URL for href: " + g), new URL(g, v)
    }
    let m = {
        get action() {
            return a
        },
        get location() {
            return e(i, o)
        },
        listen(w) {
            if (l)
                throw new Error("A history only accepts one active listener");
            return i.addEventListener(pg, f), l = w, () => {
                i.removeEventListener(pg, f),
                l = null
            }
        },
        createHref(w) {
            return t(i, w)
        },
        createURL: b,
        encodeLocation(w) {
            let v = b(w);
            return {
                pathname: v.pathname,
                search: v.search,
                hash: v.hash
            }
        },
        push: h,
        replace: p,
        go(w) {
            return o.go(w)
        }
    };
    return m
}
var gg;
(function(e) {
    e.data = "data",
    e.deferred = "deferred",
    e.redirect = "redirect",
    e.error = "error"
})(gg || (gg = {}));
function pk(e, t, n) {
    return n === void 0 && (n = "/"), mk(e, t, n, !1)
}
function mk(e, t, n, r) {
    let i = typeof t == "string" ? xs(t) : t,
        s = Bh(i.pathname || "/", n);
    if (s == null)
        return null;
    let o = Zw(e);
    gk(o);
    let a = null;
    for (let l = 0; a == null && l < o.length; ++l) {
        let u = Pk(s);
        a = Nk(o[l], u, r)
    }
    return a
}
function Zw(e, t, n, r) {
    t === void 0 && (t = []),
    n === void 0 && (n = []),
    r === void 0 && (r = "");
    let i = (s, o, a) => {
        let l = {
            relativePath: a === void 0 ? s.path || "" : a,
            caseSensitive: s.caseSensitive === !0,
            childrenIndex: o,
            route: s
        };
        l.relativePath.startsWith("/") && (Ie(l.relativePath.startsWith(r), 'Absolute route path "' + l.relativePath + '" nested under path ' + ('"' + r + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), l.relativePath = l.relativePath.slice(r.length));
        let u = mr([r, l.relativePath]),
            d = n.concat(l);
        s.children && s.children.length > 0 && (Ie(s.index !== !0, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + u + '".')), Zw(s.children, t, d, u)),
        !(s.path == null && !s.index) && t.push({
            path: u,
            score: Ck(u, s.index),
            routesMeta: d
        })
    };
    return e.forEach((s, o) => {
        var a;
        if (s.path === "" || !((a = s.path) != null && a.includes("?")))
            i(s, o);
        else
            for (let l of Jw(s.path))
                i(s, o, l)
    }), t
}
function Jw(e) {
    let t = e.split("/");
    if (t.length === 0)
        return [];
    let [n, ...r] = t,
        i = n.endsWith("?"),
        s = n.replace(/\?$/, "");
    if (r.length === 0)
        return i ? [s, ""] : [s];
    let o = Jw(r.join("/")),
        a = [];
    return a.push(...o.map(l => l === "" ? s : [s, l].join("/"))), i && a.push(...o), a.map(l => e.startsWith("/") && l === "" ? "/" : l)
}
function gk(e) {
    e.sort((t, n) => t.score !== n.score ? n.score - t.score : Ek(t.routesMeta.map(r => r.childrenIndex), n.routesMeta.map(r => r.childrenIndex)))
}
const yk = /^:[\w-]+$/,
    vk = 3,
    xk = 2,
    wk = 1,
    bk = 10,
    Sk = -2,
    yg = e => e === "*";
function Ck(e, t) {
    let n = e.split("/"),
        r = n.length;
    return n.some(yg) && (r += Sk), t && (r += xk), n.filter(i => !yg(i)).reduce((i, s) => i + (yk.test(s) ? vk : s === "" ? wk : bk), r)
}
function Ek(e, t) {
    return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i]) ? e[e.length - 1] - t[t.length - 1] : 0
}
function Nk(e, t, n) {
    let {routesMeta: r} = e,
        i = {},
        s = "/",
        o = [];
    for (let a = 0; a < r.length; ++a) {
        let l = r[a],
            u = a === r.length - 1,
            d = s === "/" ? t : t.slice(s.length) || "/",
            f = vg({
                path: l.relativePath,
                caseSensitive: l.caseSensitive,
                end: u
            }, d),
            h = l.route;
        if (!f && u && n && !r[r.length - 1].route.index && (f = vg({
            path: l.relativePath,
            caseSensitive: l.caseSensitive,
            end: !1
        }, d)), !f)
            return null;
        Object.assign(i, f.params),
        o.push({
            params: i,
            pathname: mr([s, f.pathname]),
            pathnameBase: Ak(mr([s, f.pathnameBase])),
            route: h
        }),
        f.pathnameBase !== "/" && (s = mr([s, f.pathnameBase]))
    }
    return o
}
function vg(e, t) {
    typeof e == "string" && (e = {
        path: e,
        caseSensitive: !1,
        end: !0
    });
    let [n, r] = Tk(e.path, e.caseSensitive, e.end),
        i = t.match(n);
    if (!i)
        return null;
    let s = i[0],
        o = s.replace(/(.)\/+$/, "$1"),
        a = i.slice(1);
    return {
        params: r.reduce((u, d, f) => {
            let {paramName: h, isOptional: p} = d;
            if (h === "*") {
                let m = a[f] || "";
                o = s.slice(0, s.length - m.length).replace(/(.)\/+$/, "$1")
            }
            const b = a[f];
            return p && !b ? u[h] = void 0 : u[h] = (b || "").replace(/%2F/g, "/"), u
        }, {}),
        pathname: s,
        pathnameBase: o,
        pattern: e
    }
}
function Tk(e, t, n) {
    t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Xw(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
    let r = [],
        i = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (o, a, l) => (r.push({
            paramName: a,
            isOptional: l != null
        }), l ? "/?([^\\/]+)?" : "/([^\\/]+)"));
    return e.endsWith("*") ? (r.push({
        paramName: "*"
    }), i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? i += "\\/*$" : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"), [new RegExp(i, t ? void 0 : "i"), r]
}
function Pk(e) {
    try {
        return e.split("/").map(t => decodeURIComponent(t).replace(/\//g, "%2F")).join("/")
    } catch (t) {
        return Xw(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e
    }
}
function Bh(e, t) {
    if (t === "/")
        return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase()))
        return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length,
        r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/"
}
function jk(e, t) {
    t === void 0 && (t = "/");
    let {pathname: n, search: r="", hash: i=""} = typeof e == "string" ? xs(e) : e;
    return {
        pathname: n ? n.startsWith("/") ? n : kk(n, t) : t,
        search: Mk(r),
        hash: Ok(i)
    }
}
function kk(e, t) {
    let n = t.replace(/\/+$/, "").split("/");
    return e.split("/").forEach(i => {
        i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i)
    }), n.length > 1 ? n.join("/") : "/"
}
function ou(e, t, n, r) {
    return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.'
}
function Rk(e) {
    return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0)
}
function e1(e, t) {
    let n = Rk(e);
    return t ? n.map((r, i) => i === n.length - 1 ? r.pathname : r.pathnameBase) : n.map(r => r.pathnameBase)
}
function t1(e, t, n, r) {
    r === void 0 && (r = !1);
    let i;
    typeof e == "string" ? i = xs(e) : (i = jo({}, e), Ie(!i.pathname || !i.pathname.includes("?"), ou("?", "pathname", "search", i)), Ie(!i.pathname || !i.pathname.includes("#"), ou("#", "pathname", "hash", i)), Ie(!i.search || !i.search.includes("#"), ou("#", "search", "hash", i)));
    let s = e === "" || i.pathname === "",
        o = s ? "/" : i.pathname,
        a;
    if (o == null)
        a = n;
    else {
        let f = t.length - 1;
        if (!r && o.startsWith("..")) {
            let h = o.split("/");
            for (; h[0] === "..";)
                h.shift(),
                f -= 1;
            i.pathname = h.join("/")
        }
        a = f >= 0 ? t[f] : "/"
    }
    let l = jk(i, a),
        u = o && o !== "/" && o.endsWith("/"),
        d = (s || o === ".") && n.endsWith("/");
    return !l.pathname.endsWith("/") && (u || d) && (l.pathname += "/"), l
}
const mr = e => e.join("/").replace(/\/\/+/g, "/"),
    Ak = e => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
    Mk = e => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e,
    Ok = e => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function Ik(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e
}
const n1 = ["post", "put", "patch", "delete"];
new Set(n1);
const Dk = ["get", ...n1];
new Set(Dk); /**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */








function ko() {
    return ko = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, ko.apply(this, arguments)
}
const $h = y.createContext(null),
    Lk = y.createContext(null),
    di = y.createContext(null),
    pc = y.createContext(null),
    fi = y.createContext({
        outlet: null,
        matches: [],
        isDataRoute: !1
    }),
    r1 = y.createContext(null);
function _k(e, t) {
    let {relative: n} = t === void 0 ? {} : t;
    Go() || Ie(!1);
    let {basename: r, navigator: i} = y.useContext(di),
        {hash: s, pathname: o, search: a} = s1(e, {
            relative: n
        }),
        l = o;
    return r !== "/" && (l = o === "/" ? r : mr([r, o])), i.createHref({
        pathname: l,
        search: a,
        hash: s
    })
}
function Go() {
    return y.useContext(pc) != null
}
function ws() {
    return Go() || Ie(!1), y.useContext(pc).location
}
function i1(e) {
    y.useContext(di).static || y.useLayoutEffect(e)
}
function Uh() {
    let {isDataRoute: e} = y.useContext(fi);
    return e ? Yk() : Vk()
}
function Vk() {
    Go() || Ie(!1);
    let e = y.useContext($h),
        {basename: t, future: n, navigator: r} = y.useContext(di),
        {matches: i} = y.useContext(fi),
        {pathname: s} = ws(),
        o = JSON.stringify(e1(i, n.v7_relativeSplatPath)),
        a = y.useRef(!1);
    return i1(() => {
        a.current = !0
    }), y.useCallback(function(u, d) {
        if (d === void 0 && (d = {}), !a.current)
            return;
        if (typeof u == "number") {
            r.go(u);
            return
        }
        let f = t1(u, JSON.parse(o), s, d.relative === "path");
        e == null && t !== "/" && (f.pathname = f.pathname === "/" ? t : mr([t, f.pathname])),
        (d.replace ? r.replace : r.push)(f, d.state, d)
    }, [t, r, o, s, e])
}
function s1(e, t) {
    let {relative: n} = t === void 0 ? {} : t,
        {future: r} = y.useContext(di),
        {matches: i} = y.useContext(fi),
        {pathname: s} = ws(),
        o = JSON.stringify(e1(i, r.v7_relativeSplatPath));
    return y.useMemo(() => t1(e, JSON.parse(o), s, n === "path"), [e, o, s, n])
}
function Fk(e, t) {
    return zk(e, t)
}
function zk(e, t, n, r) {
    Go() || Ie(!1);
    let {navigator: i} = y.useContext(di),
        {matches: s} = y.useContext(fi),
        o = s[s.length - 1],
        a = o ? o.params : {};
    o && o.pathname;
    let l = o ? o.pathnameBase : "/";
    o && o.route;
    let u = ws(),
        d;
    if (t) {
        var f;
        let w = typeof t == "string" ? xs(t) : t;
        l === "/" || (f = w.pathname) != null && f.startsWith(l) || Ie(!1),
        d = w
    } else
        d = u;
    let h = d.pathname || "/",
        p = h;
    if (l !== "/") {
        let w = l.replace(/^\//, "").split("/");
        p = "/" + h.replace(/^\//, "").split("/").slice(w.length).join("/")
    }
    let b = pk(e, {
            pathname: p
        }),
        m = Hk(b && b.map(w => Object.assign({}, w, {
            params: Object.assign({}, a, w.params),
            pathname: mr([l, i.encodeLocation ? i.encodeLocation(w.pathname).pathname : w.pathname]),
            pathnameBase: w.pathnameBase === "/" ? l : mr([l, i.encodeLocation ? i.encodeLocation(w.pathnameBase).pathname : w.pathnameBase])
        })), s, n, r);
    return t && m ? y.createElement(pc.Provider, {
        value: {
            location: ko({
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default"
            }, d),
            navigationType: sr.Pop
        }
    }, m) : m
}
function Bk() {
    let e = Qk(),
        t = Ik(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
        n = e instanceof Error ? e.stack : null,
        i = {
            padding: "0.5rem",
            backgroundColor: "rgba(200,200,200, 0.5)"
        };
    return y.createElement(y.Fragment, null, y.createElement("h2", null, "Unexpected Application Error!"), y.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, t), n ? y.createElement("pre", {
        style: i
    }, n) : null, null)
}
const $k = y.createElement(Bk, null);
class Uk extends y.Component {
    constructor(t)
    {
        super(t),
        this.state = {
            location: t.location,
            revalidation: t.revalidation,
            error: t.error
        }
    }
    static getDerivedStateFromError(t)
    {
        return {
            error: t
        }
    }
    static getDerivedStateFromProps(t, n)
    {
        return n.location !== t.location || n.revalidation !== "idle" && t.revalidation === "idle" ? {
            error: t.error,
            location: t.location,
            revalidation: t.revalidation
        } : {
            error: t.error !== void 0 ? t.error : n.error,
            location: n.location,
            revalidation: t.revalidation || n.revalidation
        }
    }
    componentDidCatch(t, n)
    {
        console.error("React Router caught the following error during render", t, n)
    }
    render()
    {
        return this.state.error !== void 0 ? y.createElement(fi.Provider, {
            value: this.props.routeContext
        }, y.createElement(r1.Provider, {
            value: this.state.error,
            children: this.props.component
        })) : this.props.children
    }
}
function Wk(e) {
    let {routeContext: t, match: n, children: r} = e,
        i = y.useContext($h);
    return i && i.static && i.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = n.route.id), y.createElement(fi.Provider, {
        value: t
    }, r)
}
function Hk(e, t, n, r) {
    var i;
    if (t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null) {
        var s;
        if (!n)
            return null;
        if (n.errors)
            e = n.matches;
        else if ((s = r) != null && s.v7_partialHydration && t.length === 0 && !n.initialized && n.matches.length > 0)
            e = n.matches;
        else
            return null
    }
    let o = e,
        a = (i = n) == null ? void 0 : i.errors;
    if (a != null) {
        let d = o.findIndex(f => f.route.id && (a == null ? void 0 : a[f.route.id]) !== void 0);
        d >= 0 || Ie(!1),
        o = o.slice(0, Math.min(o.length, d + 1))
    }
    let l = !1,
        u = -1;
    if (n && r && r.v7_partialHydration)
        for (let d = 0; d < o.length; d++) {
            let f = o[d];
            if ((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (u = d), f.route.id) {
                let {loaderData: h, errors: p} = n,
                    b = f.route.loader && h[f.route.id] === void 0 && (!p || p[f.route.id] === void 0);
                if (f.route.lazy || b) {
                    l = !0,
                    u >= 0 ? o = o.slice(0, u + 1) : o = [o[0]];
                    break
                }
            }
        }
    return o.reduceRight((d, f, h) => {
        let p,
            b = !1,
            m = null,
            w = null;
        n && (p = a && f.route.id ? a[f.route.id] : void 0, m = f.route.errorElement || $k, l && (u < 0 && h === 0 ? (b = !0, w = null) : u === h && (b = !0, w = f.route.hydrateFallbackElement || null)));
        let v = t.concat(o.slice(0, h + 1)),
            g = () => {
                let x;
                return p ? x = m : b ? x = w : f.route.Component ? x = y.createElement(f.route.Component, null) : f.route.element ? x = f.route.element : x = d, y.createElement(Wk, {
                    match: f,
                    routeContext: {
                        outlet: d,
                        matches: v,
                        isDataRoute: n != null
                    },
                    children: x
                })
            };
        return n && (f.route.ErrorBoundary || f.route.errorElement || h === 0) ? y.createElement(Uk, {
            location: n.location,
            revalidation: n.revalidation,
            component: m,
            error: p,
            children: g(),
            routeContext: {
                outlet: null,
                matches: v,
                isDataRoute: !0
            }
        }) : g()
    }, null)
}
var o1 = function(e) {
        return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e
    }(o1 || {}),
    jl = function(e) {
        return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e
    }(jl || {});
function Kk(e) {
    let t = y.useContext($h);
    return t || Ie(!1), t
}
function Gk(e) {
    let t = y.useContext(Lk);
    return t || Ie(!1), t
}
function qk(e) {
    let t = y.useContext(fi);
    return t || Ie(!1), t
}
function a1(e) {
    let t = qk(),
        n = t.matches[t.matches.length - 1];
    return n.route.id || Ie(!1), n.route.id
}
function Qk() {
    var e;
    let t = y.useContext(r1),
        n = Gk(jl.UseRouteError),
        r = a1(jl.UseRouteError);
    return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r]
}
function Yk() {
    let {router: e} = Kk(o1.UseNavigateStable),
        t = a1(jl.UseNavigateStable),
        n = y.useRef(!1);
    return i1(() => {
        n.current = !0
    }), y.useCallback(function(i, s) {
        s === void 0 && (s = {}),
        n.current && (typeof i == "number" ? e.navigate(i) : e.navigate(i, ko({
            fromRouteId: t
        }, s)))
    }, [e, t])
}
function Xk(e, t) {
    e == null || e.v7_startTransition,
    e == null || e.v7_relativeSplatPath
}
function Nt(e) {
    Ie(!1)
}
function Zk(e) {
    let {basename: t="/", children: n=null, location: r, navigationType: i=sr.Pop, navigator: s, static: o=!1, future: a} = e;
    Go() && Ie(!1);
    let l = t.replace(/^\/*/, "/"),
        u = y.useMemo(() => ({
            basename: l,
            navigator: s,
            static: o,
            future: ko({
                v7_relativeSplatPath: !1
            }, a)
        }), [l, a, s, o]);
    typeof r == "string" && (r = xs(r));
    let {pathname: d="/", search: f="", hash: h="", state: p=null, key: b="default"} = r,
        m = y.useMemo(() => {
            let w = Bh(d, l);
            return w == null ? null : {
                location: {
                    pathname: w,
                    search: f,
                    hash: h,
                    state: p,
                    key: b
                },
                navigationType: i
            }
        }, [l, d, f, h, p, b, i]);
    return m == null ? null : y.createElement(di.Provider, {
        value: u
    }, y.createElement(pc.Provider, {
        children: n,
        value: m
    }))
}
function Jk(e) {
    let {children: t, location: n} = e;
    return Fk(Wd(t), n)
}
new Promise(() => {});
function Wd(e, t) {
    t === void 0 && (t = []);
    let n = [];
    return y.Children.forEach(e, (r, i) => {
        if (!y.isValidElement(r))
            return;
        let s = [...t, i];
        if (r.type === y.Fragment) {
            n.push.apply(n, Wd(r.props.children, s));
            return
        }
        r.type !== Nt && Ie(!1),
        !r.props.index || !r.props.children || Ie(!1);
        let o = {
            id: r.props.id || s.join("-"),
            caseSensitive: r.props.caseSensitive,
            element: r.props.element,
            Component: r.props.Component,
            index: r.props.index,
            path: r.props.path,
            loader: r.props.loader,
            action: r.props.action,
            errorElement: r.props.errorElement,
            ErrorBoundary: r.props.ErrorBoundary,
            hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
            shouldRevalidate: r.props.shouldRevalidate,
            handle: r.props.handle,
            lazy: r.props.lazy
        };
        r.props.children && (o.children = Wd(r.props.children, s)),
        n.push(o)
    }), n
} /**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */








function Hd() {
    return Hd = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, Hd.apply(this, arguments)
}
function eR(e, t) {
    if (e == null)
        return {};
    var n = {},
        r = Object.keys(e),
        i,
        s;
    for (s = 0; s < r.length; s++)
        i = r[s],
        !(t.indexOf(i) >= 0) && (n[i] = e[i]);
    return n
}
function tR(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}
function nR(e, t) {
    return e.button === 0 && (!t || t === "_self") && !tR(e)
}
const rR = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"],
    iR = "6";
try {
    window.__reactRouterVersion = iR
} catch {}
const sR = "startTransition",
    xg = jf[sR];
function oR(e) {
    let {basename: t, children: n, future: r, window: i} = e,
        s = y.useRef();
    s.current == null && (s.current = dk({
        window: i,
        v5Compat: !0
    }));
    let o = s.current,
        [a, l] = y.useState({
            action: o.action,
            location: o.location
        }),
        {v7_startTransition: u} = r || {},
        d = y.useCallback(f => {
            u && xg ? xg(() => l(f)) : l(f)
        }, [l, u]);
    return y.useLayoutEffect(() => o.listen(d), [o, d]), y.useEffect(() => Xk(r), [r]), y.createElement(Zk, {
        basename: t,
        children: n,
        location: a.location,
        navigationType: a.action,
        navigator: o,
        future: r
    })
}
const aR = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u",
    lR = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    ae = y.forwardRef(function(t, n) {
        let {onClick: r, relative: i, reloadDocument: s, replace: o, state: a, target: l, to: u, preventScrollReset: d, viewTransition: f} = t,
            h = eR(t, rR),
            {basename: p} = y.useContext(di),
            b,
            m = !1;
        if (typeof u == "string" && lR.test(u) && (b = u, aR))
            try {
                let x = new URL(window.location.href),
                    S = u.startsWith("//") ? new URL(x.protocol + u) : new URL(u),
                    C = Bh(S.pathname, p);
                S.origin === x.origin && C != null ? u = C + S.search + S.hash : m = !0
            } catch {}
        let w = _k(u, {
                relative: i
            }),
            v = cR(u, {
                replace: o,
                state: a,
                target: l,
                preventScrollReset: d,
                relative: i,
                viewTransition: f
            });
        function g(x) {
            r && r(x),
            x.defaultPrevented || v(x)
        }
        return y.createElement("a", Hd({}, h, {
            href: b || w,
            onClick: m || s ? r : g,
            ref: n,
            target: l
        }))
    });
var wg;
(function(e) {
    e.UseScrollRestoration = "useScrollRestoration",
    e.UseSubmit = "useSubmit",
    e.UseSubmitFetcher = "useSubmitFetcher",
    e.UseFetcher = "useFetcher",
    e.useViewTransitionState = "useViewTransitionState"
})(wg || (wg = {}));
var bg;
(function(e) {
    e.UseFetcher = "useFetcher",
    e.UseFetchers = "useFetchers",
    e.UseScrollRestoration = "useScrollRestoration"
})(bg || (bg = {}));
function cR(e, t) {
    let {target: n, replace: r, state: i, preventScrollReset: s, relative: o, viewTransition: a} = t === void 0 ? {} : t,
        l = Uh(),
        u = ws(),
        d = s1(e, {
            relative: o
        });
    return y.useCallback(f => {
        if (nR(f, n)) {
            f.preventDefault();
            let h = r !== void 0 ? r : Pl(u) === Pl(d);
            l(e, {
                replace: h,
                state: i,
                preventScrollReset: s,
                relative: o,
                viewTransition: a
            })
        }
    }, [u, l, d, r, i, n, e, s, o, a])
}
const Wh = y.createContext({});
function Hh(e) {
    const t = y.useRef(null);
    return t.current === null && (t.current = e()), t.current
}
const l1 = typeof window < "u",
    c1 = l1 ? y.useLayoutEffect : y.useEffect,
    mc = y.createContext(null);
function Kh(e, t) {
    e.indexOf(t) === -1 && e.push(t)
}
function Gh(e, t) {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}
const wn = (e, t, n) => n > t ? t : n < e ? e : n;
let gc = () => {},
    ds = () => {};
const Ln = {},
    u1 = e => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function d1(e) {
    return typeof e == "object" && e !== null
}
const f1 = e => /^0[^.\s]+$/u.test(e);
function qh(e) {
    let t;
    return () => (t === void 0 && (t = e()), t)
}
const It = e => e,
    uR = (e, t) => n => t(e(n)),
    qo = (...e) => e.reduce(uR),
    Ro = (e, t, n) => {
        const r = t - e;
        return r === 0 ? 1 : (n - e) / r
    };
class Qh {
    constructor()
    {
        this.subscriptions = []
    }
    add(t)
    {
        return Kh(this.subscriptions, t), () => Gh(this.subscriptions, t)
    }
    notify(t, n, r)
    {
        const i = this.subscriptions.length;
        if (i)
            if (i === 1)
                this.subscriptions[0](t, n, r);
            else
                for (let s = 0; s < i; s++) {
                    const o = this.subscriptions[s];
                    o && o(t, n, r)
                }
    }
    getSize()
    {
        return this.subscriptions.length
    }
    clear()
    {
        this.subscriptions.length = 0
    }
}
const yn = e => e * 1e3,
    Mt = e => e / 1e3;
function h1(e, t) {
    return t ? e * (1e3 / t) : 0
}
const p1 = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
    dR = 1e-7,
    fR = 12;
function hR(e, t, n, r, i) {
    let s,
        o,
        a = 0;
    do o = t + (n - t) / 2,
    s = p1(o, r, i) - e,
    s > 0 ? n = o : t = o;
    while (Math.abs(s) > dR && ++a < fR);
    return o
}
function Qo(e, t, n, r) {
    if (e === t && n === r)
        return It;
    const i = s => hR(s, 0, 1, e, n);
    return s => s === 0 || s === 1 ? s : p1(i(s), t, r)
}
const m1 = e => t => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2,
    g1 = e => t => 1 - e(1 - t),
    y1 = Qo(.33, 1.53, .69, .99),
    Yh = g1(y1),
    v1 = m1(Yh),
    x1 = e => (e *= 2) < 1 ? .5 * Yh(e) : .5 * (2 - Math.pow(2, -10 * (e - 1))),
    Xh = e => 1 - Math.sin(Math.acos(e)),
    w1 = g1(Xh),
    b1 = m1(Xh),
    pR = Qo(.42, 0, 1, 1),
    mR = Qo(0, 0, .58, 1),
    S1 = Qo(.42, 0, .58, 1),
    gR = e => Array.isArray(e) && typeof e[0] != "number",
    C1 = e => Array.isArray(e) && typeof e[0] == "number",
    Sg = {
        linear: It,
        easeIn: pR,
        easeInOut: S1,
        easeOut: mR,
        circIn: Xh,
        circInOut: b1,
        circOut: w1,
        backIn: Yh,
        backInOut: v1,
        backOut: y1,
        anticipate: x1
    },
    yR = e => typeof e == "string",
    Cg = e => {
        if (C1(e)) {
            ds(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
            const [t, n, r, i] = e;
            return Qo(t, n, r, i)
        } else if (yR(e))
            return ds(Sg[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), Sg[e];
        return e
    },
    Sa = ["setup", "read", "resolveKeyframes", "preUpdate", "update", "preRender", "render", "postRender"],
    Eg = {
        value: null,
        addProjectionMetrics: null
    };
function vR(e, t) {
    let n = new Set,
        r = new Set,
        i = !1,
        s = !1;
    const o = new WeakSet;
    let a = {
            delta: 0,
            timestamp: 0,
            isProcessing: !1
        },
        l = 0;
    function u(f) {
        o.has(f) && (d.schedule(f), e()),
        l++,
        f(a)
    }
    const d = {
        schedule: (f, h=!1, p=!1) => {
            const m = p && i ? n : r;
            return h && o.add(f), m.has(f) || m.add(f), f
        },
        cancel: f => {
            r.delete(f),
            o.delete(f)
        },
        process: f => {
            if (a = f, i) {
                s = !0;
                return
            }
            i = !0,
            [n, r] = [r, n],
            n.forEach(u),
            t && Eg.value && Eg.value.frameloop[t].push(l),
            l = 0,
            n.clear(),
            i = !1,
            s && (s = !1, d.process(f))
        }
    };
    return d
}
const xR = 40;
function E1(e, t) {
    let n = !1,
        r = !0;
    const i = {
            delta: 0,
            timestamp: 0,
            isProcessing: !1
        },
        s = () => n = !0,
        o = Sa.reduce((x, S) => (x[S] = vR(s, t ? S : void 0), x), {}),
        {setup: a, read: l, resolveKeyframes: u, preUpdate: d, update: f, preRender: h, render: p, postRender: b} = o,
        m = () => {
            const x = Ln.useManualTiming ? i.timestamp : performance.now();
            n = !1,
            Ln.useManualTiming || (i.delta = r ? 1e3 / 60 : Math.max(Math.min(x - i.timestamp, xR), 1)),
            i.timestamp = x,
            i.isProcessing = !0,
            a.process(i),
            l.process(i),
            u.process(i),
            d.process(i),
            f.process(i),
            h.process(i),
            p.process(i),
            b.process(i),
            i.isProcessing = !1,
            n && t && (r = !1, e(m))
        },
        w = () => {
            n = !0,
            r = !0,
            i.isProcessing || e(m)
        };
    return {
        schedule: Sa.reduce((x, S) => {
            const C = o[S];
            return x[S] = (E, N=!1, T=!1) => (n || w(), C.schedule(E, N, T)), x
        }, {}),
        cancel: x => {
            for (let S = 0; S < Sa.length; S++)
                o[Sa[S]].cancel(x)
        },
        state: i,
        steps: o
    }
}
const {schedule: ve, cancel: wr, state: $e, steps: au} = E1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : It, !0);
let Ka;
function wR() {
    Ka = void 0
}
const it = {
        now: () => (Ka === void 0 && it.set($e.isProcessing || Ln.useManualTiming ? $e.timestamp : performance.now()), Ka),
        set: e => {
            Ka = e,
            queueMicrotask(wR)
        }
    },
    N1 = e => t => typeof t == "string" && t.startsWith(e),
    T1 = N1("--"),
    bR = N1("var(--"),
    Zh = e => bR(e) ? SR.test(e.split("/*")[0].trim()) : !1,
    SR = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Ng(e) {
    return typeof e != "string" ? !1 : e.split("/*")[0].includes("var(--")
}
const bs = {
        test: e => typeof e == "number",
        parse: parseFloat,
        transform: e => e
    },
    Ao = {
        ...bs,
        transform: e => wn(0, 1, e)
    },
    Ca = {
        ...bs,
        default: 1
    },
    to = e => Math.round(e * 1e5) / 1e5,
    Jh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function CR(e) {
    return e == null
}
const ER = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
    ep = (e, t) => n => !!(typeof n == "string" && ER.test(n) && n.startsWith(e) || t && !CR(n) && Object.prototype.hasOwnProperty.call(n, t)),
    P1 = (e, t, n) => r => {
        if (typeof r != "string")
            return r;
        const [i, s, o, a] = r.match(Jh);
        return {
            [e]: parseFloat(i),
            [t]: parseFloat(s),
            [n]: parseFloat(o),
            alpha: a !== void 0 ? parseFloat(a) : 1
        }
    },
    NR = e => wn(0, 255, e),
    lu = {
        ...bs,
        transform: e => Math.round(NR(e))
    },
    Br = {
        test: ep("rgb", "red"),
        parse: P1("red", "green", "blue"),
        transform: ({red: e, green: t, blue: n, alpha: r=1}) => "rgba(" + lu.transform(e) + ", " + lu.transform(t) + ", " + lu.transform(n) + ", " + to(Ao.transform(r)) + ")"
    };
function TR(e) {
    let t = "",
        n = "",
        r = "",
        i = "";
    return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
        red: parseInt(t, 16),
        green: parseInt(n, 16),
        blue: parseInt(r, 16),
        alpha: i ? parseInt(i, 16) / 255 : 1
    }
}
const Kd = {
        test: ep("#"),
        parse: TR,
        transform: Br.transform
    },
    Yo = e => ({
        test: t => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
        parse: parseFloat,
        transform: t => `${t}${e}`
    }),
    Kn = Yo("deg"),
    vn = Yo("%"),
    $ = Yo("px"),
    PR = Yo("vh"),
    jR = Yo("vw"),
    Tg = {
        ...vn,
        parse: e => vn.parse(e) / 100,
        transform: e => vn.transform(e * 100)
    },
    Oi = {
        test: ep("hsl", "hue"),
        parse: P1("hue", "saturation", "lightness"),
        transform: ({hue: e, saturation: t, lightness: n, alpha: r=1}) => "hsla(" + Math.round(e) + ", " + vn.transform(to(t)) + ", " + vn.transform(to(n)) + ", " + to(Ao.transform(r)) + ")"
    },
    Me = {
        test: e => Br.test(e) || Kd.test(e) || Oi.test(e),
        parse: e => Br.test(e) ? Br.parse(e) : Oi.test(e) ? Oi.parse(e) : Kd.parse(e),
        transform: e => typeof e == "string" ? e : e.hasOwnProperty("red") ? Br.transform(e) : Oi.transform(e),
        getAnimatableNone: e => {
            const t = Me.parse(e);
            return t.alpha = 0, Me.transform(t)
        }
    },
    kR = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function RR(e) {
    var t,
        n;
    return isNaN(e) && typeof e == "string" && (((t = e.match(Jh)) == null ? void 0 : t.length) || 0) + (((n = e.match(kR)) == null ? void 0 : n.length) || 0) > 0
}
const j1 = "number",
    k1 = "color",
    AR = "var",
    MR = "var(",
    Pg = "${}",
    OR = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Mo(e) {
    const t = e.toString(),
        n = [],
        r = {
            color: [],
            number: [],
            var: []
        },
        i = [];
    let s = 0;
    const a = t.replace(OR, l => (Me.test(l) ? (r.color.push(s), i.push(k1), n.push(Me.parse(l))) : l.startsWith(MR) ? (r.var.push(s), i.push(AR), n.push(l)) : (r.number.push(s), i.push(j1), n.push(parseFloat(l))), ++s, Pg)).split(Pg);
    return {
        values: n,
        split: a,
        indexes: r,
        types: i
    }
}
function R1(e) {
    return Mo(e).values
}
function A1(e) {
    const {split: t, types: n} = Mo(e),
        r = t.length;
    return i => {
        let s = "";
        for (let o = 0; o < r; o++)
            if (s += t[o], i[o] !== void 0) {
                const a = n[o];
                a === j1 ? s += to(i[o]) : a === k1 ? s += Me.transform(i[o]) : s += i[o]
            }
        return s
    }
}
const IR = e => typeof e == "number" ? 0 : Me.test(e) ? Me.getAnimatableNone(e) : e;
function DR(e) {
    const t = R1(e);
    return A1(e)(t.map(IR))
}
const br = {
    test: RR,
    parse: R1,
    createTransformer: A1,
    getAnimatableNone: DR
};
function cu(e, t, n) {
    return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
}
function LR({hue: e, saturation: t, lightness: n, alpha: r}) {
    e /= 360,
    t /= 100,
    n /= 100;
    let i = 0,
        s = 0,
        o = 0;
    if (!t)
        i = s = o = n;
    else {
        const a = n < .5 ? n * (1 + t) : n + t - n * t,
            l = 2 * n - a;
        i = cu(l, a, e + 1 / 3),
        s = cu(l, a, e),
        o = cu(l, a, e - 1 / 3)
    }
    return {
        red: Math.round(i * 255),
        green: Math.round(s * 255),
        blue: Math.round(o * 255),
        alpha: r
    }
}
function kl(e, t) {
    return n => n > 0 ? t : e
}
const Ce = (e, t, n) => e + (t - e) * n,
    uu = (e, t, n) => {
        const r = e * e,
            i = n * (t * t - r) + r;
        return i < 0 ? 0 : Math.sqrt(i)
    },
    _R = [Kd, Br, Oi],
    VR = e => _R.find(t => t.test(e));
function jg(e) {
    const t = VR(e);
    if (gc(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
        return !1;
    let n = t.parse(e);
    return t === Oi && (n = LR(n)), n
}
const kg = (e, t) => {
        const n = jg(e),
            r = jg(t);
        if (!n || !r)
            return kl(e, t);
        const i = {
            ...n
        };
        return s => (i.red = uu(n.red, r.red, s), i.green = uu(n.green, r.green, s), i.blue = uu(n.blue, r.blue, s), i.alpha = Ce(n.alpha, r.alpha, s), Br.transform(i))
    },
    Gd = new Set(["none", "hidden"]);
function FR(e, t) {
    return Gd.has(e) ? n => n <= 0 ? e : t : n => n >= 1 ? t : e
}
function zR(e, t) {
    return n => Ce(e, t, n)
}
function tp(e) {
    return typeof e == "number" ? zR : typeof e == "string" ? Zh(e) ? kl : Me.test(e) ? kg : UR : Array.isArray(e) ? M1 : typeof e == "object" ? Me.test(e) ? kg : BR : kl
}
function M1(e, t) {
    const n = [...e],
        r = n.length,
        i = e.map((s, o) => tp(s)(s, t[o]));
    return s => {
        for (let o = 0; o < r; o++)
            n[o] = i[o](s);
        return n
    }
}
function BR(e, t) {
    const n = {
            ...e,
            ...t
        },
        r = {};
    for (const i in n)
        e[i] !== void 0 && t[i] !== void 0 && (r[i] = tp(e[i])(e[i], t[i]));
    return i => {
        for (const s in r)
            n[s] = r[s](i);
        return n
    }
}
function $R(e, t) {
    const n = [],
        r = {
            color: 0,
            var: 0,
            number: 0
        };
    for (let i = 0; i < t.values.length; i++) {
        const s = t.types[i],
            o = e.indexes[s][r[s]],
            a = e.values[o] ?? 0;
        n[i] = a,
        r[s]++
    }
    return n
}
const UR = (e, t) => {
    const n = br.createTransformer(t),
        r = Mo(e),
        i = Mo(t);
    return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? Gd.has(e) && !i.values.length || Gd.has(t) && !r.values.length ? FR(e, t) : qo(M1($R(r, i), i.values), n) : (gc(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), kl(e, t))
};
function O1(e, t, n) {
    return typeof e == "number" && typeof t == "number" && typeof n == "number" ? Ce(e, t, n) : tp(e)(e, t)
}
const WR = e => {
        const t = ({timestamp: n}) => e(n);
        return {
            start: (n=!0) => ve.update(t, n),
            stop: () => wr(t),
            now: () => $e.isProcessing ? $e.timestamp : it.now()
        }
    },
    I1 = (e, t, n=10) => {
        let r = "";
        const i = Math.max(Math.round(t / n), 2);
        for (let s = 0; s < i; s++)
            r += Math.round(e(s / (i - 1)) * 1e4) / 1e4 + ", ";
        return `linear(${r.substring(0, r.length - 2)})`
    },
    Rl = 2e4;
function np(e) {
    let t = 0;
    const n = 50;
    let r = e.next(t);
    for (; !r.done && t < Rl;)
        t += n,
        r = e.next(t);
    return t >= Rl ? 1 / 0 : t
}
function HR(e, t=100, n) {
    const r = n({
            ...e,
            keyframes: [0, t]
        }),
        i = Math.min(np(r), Rl);
    return {
        type: "keyframes",
        ease: s => r.next(i * s).value / t,
        duration: Mt(i)
    }
}
const KR = 5;
function D1(e, t, n) {
    const r = Math.max(t - KR, 0);
    return h1(n - e(r), t - r)
}
const be = {
        stiffness: 100,
        damping: 10,
        mass: 1,
        velocity: 0,
        duration: 800,
        bounce: .3,
        visualDuration: .3,
        restSpeed: {
            granular: .01,
            default: 2
        },
        restDelta: {
            granular: .005,
            default: .5
        },
        minDuration: .01,
        maxDuration: 10,
        minDamping: .05,
        maxDamping: 1
    },
    du = .001;
function GR({duration: e=be.duration, bounce: t=be.bounce, velocity: n=be.velocity, mass: r=be.mass}) {
    let i,
        s;
    gc(e <= yn(be.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
    let o = 1 - t;
    o = wn(be.minDamping, be.maxDamping, o),
    e = wn(be.minDuration, be.maxDuration, Mt(e)),
    o < 1 ? (i = u => {
        const d = u * o,
            f = d * e,
            h = d - n,
            p = qd(u, o),
            b = Math.exp(-f);
        return du - h / p * b
    }, s = u => {
        const f = u * o * e,
            h = f * n + n,
            p = Math.pow(o, 2) * Math.pow(u, 2) * e,
            b = Math.exp(-f),
            m = qd(Math.pow(u, 2), o);
        return (-i(u) + du > 0 ? -1 : 1) * ((h - p) * b) / m
    }) : (i = u => {
        const d = Math.exp(-u * e),
            f = (u - n) * e + 1;
        return -du + d * f
    }, s = u => {
        const d = Math.exp(-u * e),
            f = (n - u) * (e * e);
        return d * f
    });
    const a = 5 / e,
        l = QR(i, s, a);
    if (e = yn(e), isNaN(l))
        return {
            stiffness: be.stiffness,
            damping: be.damping,
            duration: e
        };
    {
        const u = Math.pow(l, 2) * r;
        return {
            stiffness: u,
            damping: o * 2 * Math.sqrt(r * u),
            duration: e
        }
    }
}
const qR = 12;
function QR(e, t, n) {
    let r = n;
    for (let i = 1; i < qR; i++)
        r = r - e(r) / t(r);
    return r
}
function qd(e, t) {
    return e * Math.sqrt(1 - t * t)
}
const YR = ["duration", "bounce"],
    XR = ["stiffness", "damping", "mass"];
function Rg(e, t) {
    return t.some(n => e[n] !== void 0)
}
function ZR(e) {
    let t = {
        velocity: be.velocity,
        stiffness: be.stiffness,
        damping: be.damping,
        mass: be.mass,
        isResolvedFromDuration: !1,
        ...e
    };
    if (!Rg(e, XR) && Rg(e, YR))
        if (e.visualDuration) {
            const n = e.visualDuration,
                r = 2 * Math.PI / (n * 1.2),
                i = r * r,
                s = 2 * wn(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
            t = {
                ...t,
                mass: be.mass,
                stiffness: i,
                damping: s
            }
        } else {
            const n = GR(e);
            t = {
                ...t,
                ...n,
                mass: be.mass
            },
            t.isResolvedFromDuration = !0
        }
    return t
}
function Al(e=be.visualDuration, t=be.bounce) {
    const n = typeof e != "object" ? {
        visualDuration: e,
        keyframes: [0, 1],
        bounce: t
    } : e;
    let {restSpeed: r, restDelta: i} = n;
    const s = n.keyframes[0],
        o = n.keyframes[n.keyframes.length - 1],
        a = {
            done: !1,
            value: s
        },
        {stiffness: l, damping: u, mass: d, duration: f, velocity: h, isResolvedFromDuration: p} = ZR({
            ...n,
            velocity: -Mt(n.velocity || 0)
        }),
        b = h || 0,
        m = u / (2 * Math.sqrt(l * d)),
        w = o - s,
        v = Mt(Math.sqrt(l / d)),
        g = Math.abs(w) < 5;
    r || (r = g ? be.restSpeed.granular : be.restSpeed.default),
    i || (i = g ? be.restDelta.granular : be.restDelta.default);
    let x;
    if (m < 1) {
        const C = qd(v, m);
        x = E => {
            const N = Math.exp(-m * v * E);
            return o - N * ((b + m * v * w) / C * Math.sin(C * E) + w * Math.cos(C * E))
        }
    } else if (m === 1)
        x = C => o - Math.exp(-v * C) * (w + (b + v * w) * C);
    else {
        const C = v * Math.sqrt(m * m - 1);
        x = E => {
            const N = Math.exp(-m * v * E),
                T = Math.min(C * E, 300);
            return o - N * ((b + m * v * w) * Math.sinh(T) + C * w * Math.cosh(T)) / C
        }
    }
    const S = {
        calculatedDuration: p && f || null,
        next: C => {
            const E = x(C);
            if (p)
                a.done = C >= f;
            else {
                let N = C === 0 ? b : 0;
                m < 1 && (N = C === 0 ? yn(b) : D1(x, C, E));
                const T = Math.abs(N) <= r,
                    k = Math.abs(o - E) <= i;
                a.done = T && k
            }
            return a.value = a.done ? o : E, a
        },
        toString: () => {
            const C = Math.min(np(S), Rl),
                E = I1(N => S.next(C * N).value, C, 30);
            return C + "ms " + E
        },
        toTransition: () => {}
    };
    return S
}
Al.applyToOptions = e => {
    const t = HR(e, 100, Al);
    return e.ease = t.ease, e.duration = yn(t.duration), e.type = "keyframes", e
};
function Qd({keyframes: e, velocity: t=0, power: n=.8, timeConstant: r=325, bounceDamping: i=10, bounceStiffness: s=500, modifyTarget: o, min: a, max: l, restDelta: u=.5, restSpeed: d}) {
    const f = e[0],
        h = {
            done: !1,
            value: f
        },
        p = T => a !== void 0 && T < a || l !== void 0 && T > l,
        b = T => a === void 0 ? l : l === void 0 || Math.abs(a - T) < Math.abs(l - T) ? a : l;
    let m = n * t;
    const w = f + m,
        v = o === void 0 ? w : o(w);
    v !== w && (m = v - f);
    const g = T => -m * Math.exp(-T / r),
        x = T => v + g(T),
        S = T => {
            const k = g(T),
                A = x(T);
            h.done = Math.abs(k) <= u,
            h.value = h.done ? v : A
        };
    let C,
        E;
    const N = T => {
        p(h.value) && (C = T, E = Al({
            keyframes: [h.value, b(h.value)],
            velocity: D1(x, T, h.value),
            damping: i,
            stiffness: s,
            restDelta: u,
            restSpeed: d
        }))
    };
    return N(0), {
        calculatedDuration: null,
        next: T => {
            let k = !1;
            return !E && C === void 0 && (k = !0, S(T), N(T)), C !== void 0 && T >= C ? E.next(T - C) : (!k && S(T), h)
        }
    }
}
function JR(e, t, n) {
    const r = [],
        i = n || Ln.mix || O1,
        s = e.length - 1;
    for (let o = 0; o < s; o++) {
        let a = i(e[o], e[o + 1]);
        if (t) {
            const l = Array.isArray(t) ? t[o] || It : t;
            a = qo(l, a)
        }
        r.push(a)
    }
    return r
}
function eA(e, t, {clamp: n=!0, ease: r, mixer: i}={}) {
    const s = e.length;
    if (ds(s === t.length, "Both input and output ranges must be the same length", "range-length"), s === 1)
        return () => t[0];
    if (s === 2 && t[0] === t[1])
        return () => t[1];
    const o = e[0] === e[1];
    e[0] > e[s - 1] && (e = [...e].reverse(), t = [...t].reverse());
    const a = JR(t, r, i),
        l = a.length,
        u = d => {
            if (o && d < e[0])
                return t[0];
            let f = 0;
            if (l > 1)
                for (; f < e.length - 2 && !(d < e[f + 1]); f++)
                    ;
            const h = Ro(e[f], e[f + 1], d);
            return a[f](h)
        };
    return n ? d => u(wn(e[0], e[s - 1], d)) : u
}
function tA(e, t) {
    const n = e[e.length - 1];
    for (let r = 1; r <= t; r++) {
        const i = Ro(0, t, r);
        e.push(Ce(n, 1, i))
    }
}
function nA(e) {
    const t = [0];
    return tA(t, e.length - 1), t
}
function rA(e, t) {
    return e.map(n => n * t)
}
function iA(e, t) {
    return e.map(() => t || S1).splice(0, e.length - 1)
}
function no({duration: e=300, keyframes: t, times: n, ease: r="easeInOut"}) {
    const i = gR(r) ? r.map(Cg) : Cg(r),
        s = {
            done: !1,
            value: t[0]
        },
        o = rA(n && n.length === t.length ? n : nA(t), e),
        a = eA(o, t, {
            ease: Array.isArray(i) ? i : iA(t, i)
        });
    return {
        calculatedDuration: e,
        next: l => (s.value = a(l), s.done = l >= e, s)
    }
}
const sA = e => e !== null;
function rp(e, {repeat: t, repeatType: n="loop"}, r, i=1) {
    const s = e.filter(sA),
        a = i < 0 || t && n !== "loop" && t % 2 === 1 ? 0 : s.length - 1;
    return !a || r === void 0 ? s[a] : r
}
const oA = {
    decay: Qd,
    inertia: Qd,
    tween: no,
    keyframes: no,
    spring: Al
};
function L1(e) {
    typeof e.type == "string" && (e.type = oA[e.type])
}
class ip {
    constructor()
    {
        this.updateFinished()
    }
    get finished()
    {
        return this._finished
    }
    updateFinished()
    {
        this._finished = new Promise(t => {
            this.resolve = t
        })
    }
    notifyFinished()
    {
        this.resolve()
    }
    then(t, n)
    {
        return this.finished.then(t, n)
    }
}
const aA = e => e / 100;
class sp extends ip {
    constructor(t)
    {
        super(),
        this.state = "idle",
        this.startTime = null,
        this.isStopped = !1,
        this.currentTime = 0,
        this.holdTime = null,
        this.playbackSpeed = 1,
        this.stop = () => {
            var r,
                i;
            const {motionValue: n} = this.options;
            n && n.updatedAt !== it.now() && this.tick(it.now()),
            this.isStopped = !0,
            this.state !== "idle" && (this.teardown(), (i = (r = this.options).onStop) == null || i.call(r))
        },
        this.options = t,
        this.initAnimation(),
        this.play(),
        t.autoplay === !1 && this.pause()
    }
    initAnimation()
    {
        const {options: t} = this;
        L1(t);
        const {type: n=no, repeat: r=0, repeatDelay: i=0, repeatType: s, velocity: o=0} = t;
        let {keyframes: a} = t;
        const l = n || no;
        l !== no && typeof a[0] != "number" && (this.mixKeyframes = qo(aA, O1(a[0], a[1])), a = [0, 100]);
        const u = l({
            ...t,
            keyframes: a
        });
        s === "mirror" && (this.mirroredGenerator = l({
            ...t,
            keyframes: [...a].reverse(),
            velocity: -o
        })),
        u.calculatedDuration === null && (u.calculatedDuration = np(u));
        const {calculatedDuration: d} = u;
        this.calculatedDuration = d,
        this.resolvedDuration = d + i,
        this.totalDuration = this.resolvedDuration * (r + 1) - i,
        this.generator = u
    }
    updateTime(t)
    {
        const n = Math.round(t - this.startTime) * this.playbackSpeed;
        this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n
    }
    tick(t, n=!1)
    {
        const {generator: r, totalDuration: i, mixKeyframes: s, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l} = this;
        if (this.startTime === null)
            return r.next(0);
        const {delay: u=0, keyframes: d, repeat: f, repeatType: h, repeatDelay: p, type: b, onUpdate: m, finalKeyframe: w} = this.options;
        this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - i / this.speed, this.startTime)),
        n ? this.currentTime = t : this.updateTime(t);
        const v = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1),
            g = this.playbackSpeed >= 0 ? v < 0 : v > i;
        this.currentTime = Math.max(v, 0),
        this.state === "finished" && this.holdTime === null && (this.currentTime = i);
        let x = this.currentTime,
            S = r;
        if (f) {
            const T = Math.min(this.currentTime, i) / a;
            let k = Math.floor(T),
                A = T % 1;
            !A && T >= 1 && (A = 1),
            A === 1 && k--,
            k = Math.min(k, f + 1),
            !!(k % 2) && (h === "reverse" ? (A = 1 - A, p && (A -= p / a)) : h === "mirror" && (S = o)),
            x = wn(0, 1, A) * a
        }
        const C = g ? {
            done: !1,
            value: d[0]
        } : S.next(x);
        s && (C.value = s(C.value));
        let {done: E} = C;
        !g && l !== null && (E = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
        const N = this.holdTime === null && (this.state === "finished" || this.state === "running" && E);
        return N && b !== Qd && (C.value = rp(d, this.options, w, this.speed)), m && m(C.value), N && this.finish(), C
    }
    then(t, n)
    {
        return this.finished.then(t, n)
    }
    get duration()
    {
        return Mt(this.calculatedDuration)
    }
    get iterationDuration()
    {
        const {delay: t=0} = this.options || {};
        return this.duration + Mt(t)
    }
    get time()
    {
        return Mt(this.currentTime)
    }
    set time(t)
    {
        var n;
        t = yn(t),
        this.currentTime = t,
        this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed),
        (n = this.driver) == null || n.start(!1)
    }
    get speed()
    {
        return this.playbackSpeed
    }
    set speed(t)
    {
        this.updateTime(it.now());
        const n = this.playbackSpeed !== t;
        this.playbackSpeed = t,
        n && (this.time = Mt(this.currentTime))
    }
    play()
    {
        var i,
            s;
        if (this.isStopped)
            return;
        const {driver: t=WR, startTime: n} = this.options;
        this.driver || (this.driver = t(o => this.tick(o))),
        (s = (i = this.options).onPlay) == null || s.call(i);
        const r = this.driver.now();
        this.state === "finished" ? (this.updateFinished(), this.startTime = r) : this.holdTime !== null ? this.startTime = r - this.holdTime : this.startTime || (this.startTime = n ?? r),
        this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration),
        this.holdTime = null,
        this.state = "running",
        this.driver.start()
    }
    pause()
    {
        this.state = "paused",
        this.updateTime(it.now()),
        this.holdTime = this.currentTime
    }
    complete()
    {
        this.state !== "running" && this.play(),
        this.state = "finished",
        this.holdTime = null
    }
    finish()
    {
        var t,
            n;
        this.notifyFinished(),
        this.teardown(),
        this.state = "finished",
        (n = (t = this.options).onComplete) == null || n.call(t)
    }
    cancel()
    {
        var t,
            n;
        this.holdTime = null,
        this.startTime = 0,
        this.tick(0),
        this.teardown(),
        (n = (t = this.options).onCancel) == null || n.call(t)
    }
    teardown()
    {
        this.state = "idle",
        this.stopDriver(),
        this.startTime = this.holdTime = null
    }
    stopDriver()
    {
        this.driver && (this.driver.stop(), this.driver = void 0)
    }
    sample(t)
    {
        return this.startTime = 0, this.tick(t, !0)
    }
    attachTimeline(t)
    {
        var n;
        return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (n = this.driver) == null || n.stop(), t.observe(this)
    }
}
function lA(e) {
    for (let t = 1; t < e.length; t++)
        e[t] ?? (e[t] = e[t - 1])
}
const $r = e => e * 180 / Math.PI,
    Yd = e => {
        const t = $r(Math.atan2(e[1], e[0]));
        return Xd(t)
    },
    cA = {
        x: 4,
        y: 5,
        translateX: 4,
        translateY: 5,
        scaleX: 0,
        scaleY: 3,
        scale: e => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
        rotate: Yd,
        rotateZ: Yd,
        skewX: e => $r(Math.atan(e[1])),
        skewY: e => $r(Math.atan(e[2])),
        skew: e => (Math.abs(e[1]) + Math.abs(e[2])) / 2
    },
    Xd = e => (e = e % 360, e < 0 && (e += 360), e),
    Ag = Yd,
    Mg = e => Math.sqrt(e[0] * e[0] + e[1] * e[1]),
    Og = e => Math.sqrt(e[4] * e[4] + e[5] * e[5]),
    uA = {
        x: 12,
        y: 13,
        z: 14,
        translateX: 12,
        translateY: 13,
        translateZ: 14,
        scaleX: Mg,
        scaleY: Og,
        scale: e => (Mg(e) + Og(e)) / 2,
        rotateX: e => Xd($r(Math.atan2(e[6], e[5]))),
        rotateY: e => Xd($r(Math.atan2(-e[2], e[0]))),
        rotateZ: Ag,
        rotate: Ag,
        skewX: e => $r(Math.atan(e[4])),
        skewY: e => $r(Math.atan(e[1])),
        skew: e => (Math.abs(e[1]) + Math.abs(e[4])) / 2
    };
function Zd(e) {
    return e.includes("scale") ? 1 : 0
}
function Jd(e, t) {
    if (!e || e === "none")
        return Zd(t);
    const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let r,
        i;
    if (n)
        r = uA,
        i = n;
    else {
        const a = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        r = cA,
        i = a
    }
    if (!i)
        return Zd(t);
    const s = r[t],
        o = i[1].split(",").map(fA);
    return typeof s == "function" ? s(o) : o[s]
}
const dA = (e, t) => {
    const {transform: n="none"} = getComputedStyle(e);
    return Jd(n, t)
};
function fA(e) {
    return parseFloat(e.trim())
}
const Ss = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"],
    Cs = new Set(Ss),
    Ig = e => e === bs || e === $,
    hA = new Set(["x", "y", "z"]),
    pA = Ss.filter(e => !hA.has(e));
function mA(e) {
    const t = [];
    return pA.forEach(n => {
        const r = e.getValue(n);
        r !== void 0 && (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0))
    }), t
}
const or = {
    width: ({x: e}, {paddingLeft: t="0", paddingRight: n="0"}) => e.max - e.min - parseFloat(t) - parseFloat(n),
    height: ({y: e}, {paddingTop: t="0", paddingBottom: n="0"}) => e.max - e.min - parseFloat(t) - parseFloat(n),
    top: (e, {top: t}) => parseFloat(t),
    left: (e, {left: t}) => parseFloat(t),
    bottom: ({y: e}, {top: t}) => parseFloat(t) + (e.max - e.min),
    right: ({x: e}, {left: t}) => parseFloat(t) + (e.max - e.min),
    x: (e, {transform: t}) => Jd(t, "x"),
    y: (e, {transform: t}) => Jd(t, "y")
};
or.translateX = or.x;
or.translateY = or.y;
const Xr = new Set;
let ef = !1,
    tf = !1,
    nf = !1;
function _1() {
    if (tf) {
        const e = Array.from(Xr).filter(r => r.needsMeasurement),
            t = new Set(e.map(r => r.element)),
            n = new Map;
        t.forEach(r => {
            const i = mA(r);
            i.length && (n.set(r, i), r.render())
        }),
        e.forEach(r => r.measureInitialState()),
        t.forEach(r => {
            r.render();
            const i = n.get(r);
            i && i.forEach(([s, o]) => {
                var a;
                (a = r.getValue(s)) == null || a.set(o)
            })
        }),
        e.forEach(r => r.measureEndState()),
        e.forEach(r => {
            r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY)
        })
    }
    tf = !1,
    ef = !1,
    Xr.forEach(e => e.complete(nf)),
    Xr.clear()
}
function V1() {
    Xr.forEach(e => {
        e.readKeyframes(),
        e.needsMeasurement && (tf = !0)
    })
}
function gA() {
    nf = !0,
    V1(),
    _1(),
    nf = !1
}
class op {
    constructor(t, n, r, i, s, o=!1)
    {
        this.state = "pending",
        this.isAsync = !1,
        this.needsMeasurement = !1,
        this.unresolvedKeyframes = [...t],
        this.onComplete = n,
        this.name = r,
        this.motionValue = i,
        this.element = s,
        this.isAsync = o
    }
    scheduleResolve()
    {
        this.state = "scheduled",
        this.isAsync ? (Xr.add(this), ef || (ef = !0, ve.read(V1), ve.resolveKeyframes(_1))) : (this.readKeyframes(), this.complete())
    }
    readKeyframes()
    {
        const {unresolvedKeyframes: t, name: n, element: r, motionValue: i} = this;
        if (t[0] === null) {
            const s = i == null ? void 0 : i.get(),
                o = t[t.length - 1];
            if (s !== void 0)
                t[0] = s;
            else if (r && n) {
                const a = r.readValue(n, o);
                a != null && (t[0] = a)
            }
            t[0] === void 0 && (t[0] = o),
            i && s === void 0 && i.set(t[0])
        }
        lA(t)
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete(t=!1)
    {
        this.state = "complete",
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t),
        Xr.delete(this)
    }
    cancel()
    {
        this.state === "scheduled" && (Xr.delete(this), this.state = "pending")
    }
    resume()
    {
        this.state === "pending" && this.scheduleResolve()
    }
}
const yA = e => e.startsWith("--");
function vA(e, t, n) {
    yA(t) ? e.style.setProperty(t, n) : e.style[t] = n
}
const xA = qh(() => window.ScrollTimeline !== void 0),
    wA = {};
function bA(e, t) {
    const n = qh(e);
    return () => wA[t] ?? n()
}
const F1 = bA(() => {
        try {
            document.createElement("div").animate({
                opacity: 0
            }, {
                easing: "linear(0, 1)"
            })
        } catch {
            return !1
        }
        return !0
    }, "linearEasing"),
    $s = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
    Dg = {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
        circIn: $s([0, .65, .55, 1]),
        circOut: $s([.55, 0, 1, .45]),
        backIn: $s([.31, .01, .66, -.59]),
        backOut: $s([.33, 1.53, .69, .99])
    };
function z1(e, t) {
    if (e)
        return typeof e == "function" ? F1() ? I1(e, t) : "ease-out" : C1(e) ? $s(e) : Array.isArray(e) ? e.map(n => z1(n, t) || Dg.easeOut) : Dg[e]
}
function SA(e, t, n, {delay: r=0, duration: i=300, repeat: s=0, repeatType: o="loop", ease: a="easeOut", times: l}={}, u=void 0) {
    const d = {
        [t]: n
    };
    l && (d.offset = l);
    const f = z1(a, i);
    Array.isArray(f) && (d.easing = f);
    const h = {
        delay: r,
        duration: i,
        easing: Array.isArray(f) ? "linear" : f,
        fill: "both",
        iterations: s + 1,
        direction: o === "reverse" ? "alternate" : "normal"
    };
    return u && (h.pseudoElement = u), e.animate(d, h)
}
function B1(e) {
    return typeof e == "function" && "applyToOptions" in e
}
function CA({type: e, ...t}) {
    return B1(e) && F1() ? e.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t)
}
class EA extends ip {
    constructor(t)
    {
        if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !t)
            return;
        const {element: n, name: r, keyframes: i, pseudoElement: s, allowFlatten: o=!1, finalKeyframe: a, onComplete: l} = t;
        this.isPseudoElement = !!s,
        this.allowFlatten = o,
        this.options = t,
        ds(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
        const u = CA(t);
        this.animation = SA(n, r, i, u, s),
        u.autoplay === !1 && this.animation.pause(),
        this.animation.onfinish = () => {
            if (this.finishedTime = this.time, !s) {
                const d = rp(i, this.options, a, this.speed);
                this.updateMotionValue ? this.updateMotionValue(d) : vA(n, r, d),
                this.animation.cancel()
            }
            l == null || l(),
            this.notifyFinished()
        }
    }
    play()
    {
        this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished())
    }
    pause()
    {
        this.animation.pause()
    }
    complete()
    {
        var t,
            n;
        (n = (t = this.animation).finish) == null || n.call(t)
    }
    cancel()
    {
        try {
            this.animation.cancel()
        } catch {}
    }
    stop()
    {
        if (this.isStopped)
            return;
        this.isStopped = !0;
        const {state: t} = this;
        t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel())
    }
    commitStyles()
    {
        var t,
            n;
        this.isPseudoElement || (n = (t = this.animation).commitStyles) == null || n.call(t)
    }
    get duration()
    {
        var n,
            r;
        const t = ((r = (n = this.animation.effect) == null ? void 0 : n.getComputedTiming) == null ? void 0 : r.call(n).duration) || 0;
        return Mt(Number(t))
    }
    get iterationDuration()
    {
        const {delay: t=0} = this.options || {};
        return this.duration + Mt(t)
    }
    get time()
    {
        return Mt(Number(this.animation.currentTime) || 0)
    }
    set time(t)
    {
        this.manualStartTime = null,
        this.finishedTime = null,
        this.animation.currentTime = yn(t)
    }
    get speed()
    {
        return this.animation.playbackRate
    }
    set speed(t)
    {
        t < 0 && (this.finishedTime = null),
        this.animation.playbackRate = t
    }
    get state()
    {
        return this.finishedTime !== null ? "finished" : this.animation.playState
    }
    get startTime()
    {
        return this.manualStartTime ?? Number(this.animation.startTime)
    }
    set startTime(t)
    {
        this.manualStartTime = this.animation.startTime = t
    }
    attachTimeline({timeline: t, observe: n})
    {
        var r;
        return this.allowFlatten && ((r = this.animation.effect) == null || r.updateTiming({
            easing: "linear"
        })), this.animation.onfinish = null, t && xA() ? (this.animation.timeline = t, It) : n(this)
    }
}
const $1 = {
    anticipate: x1,
    backInOut: v1,
    circInOut: b1
};
function NA(e) {
    return e in $1
}
function TA(e) {
    typeof e.ease == "string" && NA(e.ease) && (e.ease = $1[e.ease])
}
const fu = 10;
class PA extends EA {
    constructor(t)
    {
        TA(t),
        L1(t),
        super(t),
        t.startTime !== void 0 && (this.startTime = t.startTime),
        this.options = t
    }
    updateMotionValue(t)
    {
        const {motionValue: n, onUpdate: r, onComplete: i, element: s, ...o} = this.options;
        if (!n)
            return;
        if (t !== void 0) {
            n.set(t);
            return
        }
        const a = new sp({
                ...o,
                autoplay: !1
            }),
            l = Math.max(fu, it.now() - this.startTime),
            u = wn(0, fu, l - fu);
        n.setWithVelocity(a.sample(Math.max(0, l - u)).value, a.sample(l).value, u),
        a.stop()
    }
}
const Lg = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (br.test(e) || e === "0") && !e.startsWith("url("));
function jA(e) {
    const t = e[0];
    if (e.length === 1)
        return !0;
    for (let n = 0; n < e.length; n++)
        if (e[n] !== t)
            return !0
}
function kA(e, t, n, r) {
    const i = e[0];
    if (i === null)
        return !1;
    if (t === "display" || t === "visibility")
        return !0;
    const s = e[e.length - 1],
        o = Lg(i, t),
        a = Lg(s, t);
    return gc(o === a, `You are trying to animate ${t} from "${i}" to "${s}". "${o ? s : i}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : jA(e) || (n === "spring" || B1(n)) && r
}
function rf(e) {
    e.duration = 0,
    e.type = "keyframes"
}
const RA = new Set(["opacity", "clipPath", "filter", "transform"]),
    AA = qh(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function MA(e) {
    var d;
    const {motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: s, type: o} = e;
    if (!(((d = t == null ? void 0 : t.owner) == null ? void 0 : d.current) instanceof HTMLElement))
        return !1;
    const {onUpdate: l, transformTemplate: u} = t.owner.getProps();
    return AA() && n && RA.has(n) && (n !== "transform" || !u) && !l && !r && i !== "mirror" && s !== 0 && o !== "inertia"
}
const OA = 40;
class IA extends ip {
    constructor({autoplay: t=!0, delay: n=0, type: r="keyframes", repeat: i=0, repeatDelay: s=0, repeatType: o="loop", keyframes: a, name: l, motionValue: u, element: d, ...f})
    {
        var b;
        super(),
        this.stop = () => {
            var m,
                w;
            this._animation && (this._animation.stop(), (m = this.stopTimeline) == null || m.call(this)),
            (w = this.keyframeResolver) == null || w.cancel()
        },
        this.createdAt = it.now();
        const h = {
                autoplay: t,
                delay: n,
                type: r,
                repeat: i,
                repeatDelay: s,
                repeatType: o,
                name: l,
                motionValue: u,
                element: d,
                ...f
            },
            p = (d == null ? void 0 : d.KeyframeResolver) || op;
        this.keyframeResolver = new p(a, (m, w, v) => this.onKeyframesResolved(m, w, h, !v), l, u, d),
        (b = this.keyframeResolver) == null || b.scheduleResolve()
    }
    onKeyframesResolved(t, n, r, i)
    {
        var w,
            v;
        this.keyframeResolver = void 0;
        const {name: s, type: o, velocity: a, delay: l, isHandoff: u, onUpdate: d} = r;
        this.resolvedAt = it.now(),
        kA(t, s, o, a) || ((Ln.instantAnimations || !l) && (d == null || d(rp(t, r, n))), t[0] = t[t.length - 1], rf(r), r.repeat = 0);
        const h = {
                startTime: i ? this.resolvedAt ? this.resolvedAt - this.createdAt > OA ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
                finalKeyframe: n,
                ...r,
                keyframes: t
            },
            p = !u && MA(h),
            b = (v = (w = h.motionValue) == null ? void 0 : w.owner) == null ? void 0 : v.current,
            m = p ? new PA({
                ...h,
                element: b
            }) : new sp(h);
        m.finished.then(() => {
            this.notifyFinished()
        }).catch(It),
        this.pendingTimeline && (this.stopTimeline = m.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0),
        this._animation = m
    }
    get finished()
    {
        return this._animation ? this.animation.finished : this._finished
    }
    then(t, n)
    {
        return this.finished.finally(t).then(() => {})
    }
    get animation()
    {
        var t;
        return this._animation || ((t = this.keyframeResolver) == null || t.resume(), gA()), this._animation
    }
    get duration()
    {
        return this.animation.duration
    }
    get iterationDuration()
    {
        return this.animation.iterationDuration
    }
    get time()
    {
        return this.animation.time
    }
    set time(t)
    {
        this.animation.time = t
    }
    get speed()
    {
        return this.animation.speed
    }
    get state()
    {
        return this.animation.state
    }
    set speed(t)
    {
        this.animation.speed = t
    }
    get startTime()
    {
        return this.animation.startTime
    }
    attachTimeline(t)
    {
        return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop()
    }
    play()
    {
        this.animation.play()
    }
    pause()
    {
        this.animation.pause()
    }
    complete()
    {
        this.animation.complete()
    }
    cancel()
    {
        var t;
        this._animation && this.animation.cancel(),
        (t = this.keyframeResolver) == null || t.cancel()
    }
}
function U1(e, t, n, r=0, i=1) {
    const s = Array.from(e).sort((u, d) => u.sortNodePosition(d)).indexOf(t),
        o = e.size,
        a = (o - 1) * r;
    return typeof n == "function" ? n(s, o) : i === 1 ? s * r : a - s * r
}
const DA = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function LA(e) {
    const t = DA.exec(e);
    if (!t)
        return [, ];
    const [, n, r, i] = t;
    return [`--${n ?? r}`, i]
}
const _A = 4;
function W1(e, t, n=1) {
    ds(n <= _A, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
    const [r, i] = LA(e);
    if (!r)
        return;
    const s = window.getComputedStyle(t).getPropertyValue(r);
    if (s) {
        const o = s.trim();
        return u1(o) ? parseFloat(o) : o
    }
    return Zh(i) ? W1(i, t, n + 1) : i
}
const VA = {
        type: "spring",
        stiffness: 500,
        damping: 25,
        restSpeed: 10
    },
    FA = e => ({
        type: "spring",
        stiffness: 550,
        damping: e === 0 ? 2 * Math.sqrt(550) : 30,
        restSpeed: 10
    }),
    zA = {
        type: "keyframes",
        duration: .8
    },
    BA = {
        type: "keyframes",
        ease: [.25, .1, .35, 1],
        duration: .3
    },
    $A = (e, {keyframes: t}) => t.length > 2 ? zA : Cs.has(e) ? e.startsWith("scale") ? FA(t[1]) : VA : BA,
    UA = e => e !== null;
function WA(e, {repeat: t, repeatType: n="loop"}, r) {
    const i = e.filter(UA),
        s = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
    return !s || r === void 0 ? i[s] : r
}
function ap(e, t) {
    return (e == null ? void 0 : e[t]) ?? (e == null ? void 0 : e.default) ?? e
}
function HA({when: e, delay: t, delayChildren: n, staggerChildren: r, staggerDirection: i, repeat: s, repeatType: o, repeatDelay: a, from: l, elapsed: u, ...d}) {
    return !!Object.keys(d).length
}
const lp = (e, t, n, r={}, i, s) => o => {
    const a = ap(r, e) || {},
        l = a.delay || r.delay || 0;
    let {elapsed: u=0} = r;
    u = u - yn(l);
    const d = {
        keyframes: Array.isArray(n) ? n : [null, n],
        ease: "easeOut",
        velocity: t.getVelocity(),
        ...a,
        delay: -u,
        onUpdate: h => {
            t.set(h),
            a.onUpdate && a.onUpdate(h)
        },
        onComplete: () => {
            o(),
            a.onComplete && a.onComplete()
        },
        name: e,
        motionValue: t,
        element: s ? void 0 : i
    };
    HA(a) || Object.assign(d, $A(e, d)),
    d.duration && (d.duration = yn(d.duration)),
    d.repeatDelay && (d.repeatDelay = yn(d.repeatDelay)),
    d.from !== void 0 && (d.keyframes[0] = d.from);
    let f = !1;
    if ((d.type === !1 || d.duration === 0 && !d.repeatDelay) && (rf(d), d.delay === 0 && (f = !0)), (Ln.instantAnimations || Ln.skipAnimations) && (f = !0, rf(d), d.delay = 0), d.allowFlatten = !a.type && !a.ease, f && !s && t.get() !== void 0) {
        const h = WA(d.keyframes, a);
        if (h !== void 0) {
            ve.update(() => {
                d.onUpdate(h),
                d.onComplete()
            });
            return
        }
    }
    return a.isSync ? new sp(d) : new IA(d)
};
function _g(e) {
    const t = [{}, {}];
    return e == null || e.values.forEach((n, r) => {
        t[0][r] = n.get(),
        t[1][r] = n.getVelocity()
    }), t
}
function cp(e, t, n, r) {
    if (typeof t == "function") {
        const [i, s] = _g(r);
        t = t(n !== void 0 ? n : e.custom, i, s)
    }
    if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
        const [i, s] = _g(r);
        t = t(n !== void 0 ? n : e.custom, i, s)
    }
    return t
}
function Hi(e, t, n) {
    const r = e.getProps();
    return cp(r, t, n !== void 0 ? n : r.custom, e)
}
const H1 = new Set(["width", "height", "top", "left", "right", "bottom", ...Ss]),
    Vg = 30,
    KA = e => !isNaN(parseFloat(e));
class GA {
    constructor(t, n={})
    {
        this.canTrackVelocity = null,
        this.events = {},
        this.updateAndNotify = r => {
            var s;
            const i = it.now();
            if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(r), this.current !== this.prev && ((s = this.events.change) == null || s.notify(this.current), this.dependents))
                for (const o of this.dependents)
                    o.dirty()
        },
        this.hasAnimated = !1,
        this.setCurrent(t),
        this.owner = n.owner
    }
    setCurrent(t)
    {
        this.current = t,
        this.updatedAt = it.now(),
        this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = KA(this.current))
    }
    setPrevFrameValue(t=this.current)
    {
        this.prevFrameValue = t,
        this.prevUpdatedAt = this.updatedAt
    }
    onChange(t)
    {
        return this.on("change", t)
    }
    on(t, n)
    {
        this.events[t] || (this.events[t] = new Qh);
        const r = this.events[t].add(n);
        return t === "change" ? () => {
            r(),
            ve.read(() => {
                this.events.change.getSize() || this.stop()
            })
        } : r
    }
    clearListeners()
    {
        for (const t in this.events)
            this.events[t].clear()
    }
    attach(t, n)
    {
        this.passiveEffect = t,
        this.stopPassiveEffect = n
    }
    set(t)
    {
        this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t)
    }
    setWithVelocity(t, n, r)
    {
        this.set(n),
        this.prev = void 0,
        this.prevFrameValue = t,
        this.prevUpdatedAt = this.updatedAt - r
    }
    jump(t, n=!0)
    {
        this.updateAndNotify(t),
        this.prev = t,
        this.prevUpdatedAt = this.prevFrameValue = void 0,
        n && this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect()
    }
    dirty()
    {
        var t;
        (t = this.events.change) == null || t.notify(this.current)
    }
    addDependent(t)
    {
        this.dependents || (this.dependents = new Set),
        this.dependents.add(t)
    }
    removeDependent(t)
    {
        this.dependents && this.dependents.delete(t)
    }
    get()
    {
        return this.current
    }
    getPrevious()
    {
        return this.prev
    }
    getVelocity()
    {
        const t = it.now();
        if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Vg)
            return 0;
        const n = Math.min(this.updatedAt - this.prevUpdatedAt, Vg);
        return h1(parseFloat(this.current) - parseFloat(this.prevFrameValue), n)
    }
    start(t)
    {
        return this.stop(), new Promise(n => {
            this.hasAnimated = !0,
            this.animation = t(n),
            this.events.animationStart && this.events.animationStart.notify()
        }).then(() => {
            this.events.animationComplete && this.events.animationComplete.notify(),
            this.clearAnimation()
        })
    }
    stop()
    {
        this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation()
    }
    isAnimating()
    {
        return !!this.animation
    }
    clearAnimation()
    {
        delete this.animation
    }
    destroy()
    {
        var t,
            n;
        (t = this.dependents) == null || t.clear(),
        (n = this.events.destroy) == null || n.notify(),
        this.clearListeners(),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect()
    }
}
function fs(e, t) {
    return new GA(e, t)
}
const sf = e => Array.isArray(e);
function qA(e, t, n) {
    e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, fs(n))
}
function QA(e) {
    return sf(e) ? e[e.length - 1] || 0 : e
}
function YA(e, t) {
    const n = Hi(e, t);
    let {transitionEnd: r={}, transition: i={}, ...s} = n || {};
    s = {
        ...s,
        ...r
    };
    for (const o in s) {
        const a = QA(s[o]);
        qA(e, o, a)
    }
}
const Ze = e => !!(e && e.getVelocity);
function XA(e) {
    return !!(Ze(e) && e.add)
}
function of(e, t) {
    const n = e.getValue("willChange");
    if (XA(n))
        return n.add(t);
    if (!n && Ln.WillChange) {
        const r = new Ln.WillChange("auto");
        e.addValue("willChange", r),
        r.add(t)
    }
}
function up(e) {
    return e.replace(/([A-Z])/g, t => `-${t.toLowerCase()}`)
}
const ZA = "framerAppearId",
    K1 = "data-" + up(ZA);
function G1(e) {
    return e.props[K1]
}
function JA({protectedKeys: e, needsAnimating: t}, n) {
    const r = e.hasOwnProperty(n) && t[n] !== !0;
    return t[n] = !1, r
}
function q1(e, t, {delay: n=0, transitionOverride: r, type: i}={}) {
    let {transition: s=e.getDefaultTransition(), transitionEnd: o, ...a} = t;
    const l = s == null ? void 0 : s.reduceMotion;
    r && (s = r);
    const u = [],
        d = i && e.animationState && e.animationState.getState()[i];
    for (const f in a) {
        const h = e.getValue(f, e.latestValues[f] ?? null),
            p = a[f];
        if (p === void 0 || d && JA(d, f))
            continue;
        const b = {
                delay: n,
                ...ap(s || {}, f)
            },
            m = h.get();
        if (m !== void 0 && !h.isAnimating && !Array.isArray(p) && p === m && !b.velocity)
            continue;
        let w = !1;
        if (window.MotionHandoffAnimation) {
            const x = G1(e);
            if (x) {
                const S = window.MotionHandoffAnimation(x, f, ve);
                S !== null && (b.startTime = S, w = !0)
            }
        }
        of(e, f);
        const v = l ?? e.shouldReduceMotion;
        h.start(lp(f, h, p, v && H1.has(f) ? {
            type: !1
        } : b, e, w));
        const g = h.animation;
        g && u.push(g)
    }
    return o && Promise.all(u).then(() => {
        ve.update(() => {
            o && YA(e, o)
        })
    }), u
}
function af(e, t, n={}) {
    var l;
    const r = Hi(e, t, n.type === "exit" ? (l = e.presenceContext) == null ? void 0 : l.custom : void 0);
    let {transition: i=e.getDefaultTransition() || {}} = r || {};
    n.transitionOverride && (i = n.transitionOverride);
    const s = r ? () => Promise.all(q1(e, r, n)) : () => Promise.resolve(),
        o = e.variantChildren && e.variantChildren.size ? (u=0) => {
            const {delayChildren: d=0, staggerChildren: f, staggerDirection: h} = i;
            return eM(e, t, u, d, f, h, n)
        } : () => Promise.resolve(),
        {when: a} = i;
    if (a) {
        const [u, d] = a === "beforeChildren" ? [s, o] : [o, s];
        return u().then(() => d())
    } else
        return Promise.all([s(), o(n.delay)])
}
function eM(e, t, n=0, r=0, i=0, s=1, o) {
    const a = [];
    for (const l of e.variantChildren)
        l.notify("AnimationStart", t),
        a.push(af(l, t, {
            ...o,
            delay: n + (typeof r == "function" ? 0 : r) + U1(e.variantChildren, l, r, i, s)
        }).then(() => l.notify("AnimationComplete", t)));
    return Promise.all(a)
}
function tM(e, t, n={}) {
    e.notify("AnimationStart", t);
    let r;
    if (Array.isArray(t)) {
        const i = t.map(s => af(e, s, n));
        r = Promise.all(i)
    } else if (typeof t == "string")
        r = af(e, t, n);
    else {
        const i = typeof t == "function" ? Hi(e, t, n.custom) : t;
        r = Promise.all(q1(e, i, n))
    }
    return r.then(() => {
        e.notify("AnimationComplete", t)
    })
}
const nM = {
        test: e => e === "auto",
        parse: e => e
    },
    Q1 = e => t => t.test(e),
    Y1 = [bs, $, vn, Kn, jR, PR, nM],
    Fg = e => Y1.find(Q1(e));
function rM(e) {
    return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || f1(e) : !0
}
const iM = new Set(["brightness", "contrast", "saturate", "opacity"]);
function sM(e) {
    const [t, n] = e.slice(0, -1).split("(");
    if (t === "drop-shadow")
        return e;
    const [r] = n.match(Jh) || [];
    if (!r)
        return e;
    const i = n.replace(r, "");
    let s = iM.has(t) ? 1 : 0;
    return r !== n && (s *= 100), t + "(" + s + i + ")"
}
const oM = /\b([a-z-]*)\(.*?\)/gu,
    lf = {
        ...br,
        getAnimatableNone: e => {
            const t = e.match(oM);
            return t ? t.map(sM).join(" ") : e
        }
    },
    zg = {
        ...bs,
        transform: Math.round
    },
    aM = {
        rotate: Kn,
        rotateX: Kn,
        rotateY: Kn,
        rotateZ: Kn,
        scale: Ca,
        scaleX: Ca,
        scaleY: Ca,
        scaleZ: Ca,
        skew: Kn,
        skewX: Kn,
        skewY: Kn,
        distance: $,
        translateX: $,
        translateY: $,
        translateZ: $,
        x: $,
        y: $,
        z: $,
        perspective: $,
        transformPerspective: $,
        opacity: Ao,
        originX: Tg,
        originY: Tg,
        originZ: $
    },
    dp = {
        borderWidth: $,
        borderTopWidth: $,
        borderRightWidth: $,
        borderBottomWidth: $,
        borderLeftWidth: $,
        borderRadius: $,
        borderTopLeftRadius: $,
        borderTopRightRadius: $,
        borderBottomRightRadius: $,
        borderBottomLeftRadius: $,
        width: $,
        maxWidth: $,
        height: $,
        maxHeight: $,
        top: $,
        right: $,
        bottom: $,
        left: $,
        inset: $,
        insetBlock: $,
        insetBlockStart: $,
        insetBlockEnd: $,
        insetInline: $,
        insetInlineStart: $,
        insetInlineEnd: $,
        padding: $,
        paddingTop: $,
        paddingRight: $,
        paddingBottom: $,
        paddingLeft: $,
        paddingBlock: $,
        paddingBlockStart: $,
        paddingBlockEnd: $,
        paddingInline: $,
        paddingInlineStart: $,
        paddingInlineEnd: $,
        margin: $,
        marginTop: $,
        marginRight: $,
        marginBottom: $,
        marginLeft: $,
        marginBlock: $,
        marginBlockStart: $,
        marginBlockEnd: $,
        marginInline: $,
        marginInlineStart: $,
        marginInlineEnd: $,
        fontSize: $,
        backgroundPositionX: $,
        backgroundPositionY: $,
        ...aM,
        zIndex: zg,
        fillOpacity: Ao,
        strokeOpacity: Ao,
        numOctaves: zg
    },
    lM = {
        ...dp,
        color: Me,
        backgroundColor: Me,
        outlineColor: Me,
        fill: Me,
        stroke: Me,
        borderColor: Me,
        borderTopColor: Me,
        borderRightColor: Me,
        borderBottomColor: Me,
        borderLeftColor: Me,
        filter: lf,
        WebkitFilter: lf
    },
    X1 = e => lM[e];
function Z1(e, t) {
    let n = X1(e);
    return n !== lf && (n = br), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
}
const cM = new Set(["auto", "none", "0"]);
function uM(e, t, n) {
    let r = 0,
        i;
    for (; r < e.length && !i;) {
        const s = e[r];
        typeof s == "string" && !cM.has(s) && Mo(s).values.length && (i = e[r]),
        r++
    }
    if (i && n)
        for (const s of t)
            e[s] = Z1(n, i)
}
class dM extends op {
    constructor(t, n, r, i, s)
    {
        super(t, n, r, i, s, !0)
    }
    readKeyframes()
    {
        const {unresolvedKeyframes: t, element: n, name: r} = this;
        if (!n || !n.current)
            return;
        super.readKeyframes();
        for (let d = 0; d < t.length; d++) {
            let f = t[d];
            if (typeof f == "string" && (f = f.trim(), Zh(f))) {
                const h = W1(f, n.current);
                h !== void 0 && (t[d] = h),
                d === t.length - 1 && (this.finalKeyframe = f)
            }
        }
        if (this.resolveNoneKeyframes(), !H1.has(r) || t.length !== 2)
            return;
        const [i, s] = t,
            o = Fg(i),
            a = Fg(s),
            l = Ng(i),
            u = Ng(s);
        if (l !== u && or[r]) {
            this.needsMeasurement = !0;
            return
        }
        if (o !== a)
            if (Ig(o) && Ig(a))
                for (let d = 0; d < t.length; d++) {
                    const f = t[d];
                    typeof f == "string" && (t[d] = parseFloat(f))
                }
            else
                or[r] && (this.needsMeasurement = !0)
    }
    resolveNoneKeyframes()
    {
        const {unresolvedKeyframes: t, name: n} = this,
            r = [];
        for (let i = 0; i < t.length; i++)
            (t[i] === null || rM(t[i])) && r.push(i);
        r.length && uM(t, r, n)
    }
    measureInitialState()
    {
        const {element: t, unresolvedKeyframes: n, name: r} = this;
        if (!t || !t.current)
            return;
        r === "height" && (this.suspendedScrollY = window.pageYOffset),
        this.measuredOrigin = or[r](t.measureViewportBox(), window.getComputedStyle(t.current)),
        n[0] = this.measuredOrigin;
        const i = n[n.length - 1];
        i !== void 0 && t.getValue(r, i).jump(i, !1)
    }
    measureEndState()
    {
        var a;
        const {element: t, name: n, unresolvedKeyframes: r} = this;
        if (!t || !t.current)
            return;
        const i = t.getValue(n);
        i && i.jump(this.measuredOrigin, !1);
        const s = r.length - 1,
            o = r[s];
        r[s] = or[n](t.measureViewportBox(), window.getComputedStyle(t.current)),
        o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o),
        (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, u]) => {
            t.getValue(l).set(u)
        }),
        this.resolveNoneKeyframes()
    }
}
function fM(e, t, n) {
    if (e == null)
        return [];
    if (e instanceof EventTarget)
        return [e];
    if (typeof e == "string") {
        const i = document.querySelectorAll(e);
        return i ? Array.from(i) : []
    }
    return Array.from(e).filter(r => r != null)
}
const J1 = (e, t) => t && typeof e == "number" ? t.transform(e) : e;
function cf(e) {
    return d1(e) && "offsetHeight" in e
}
const {schedule: fp, cancel: t4} = E1(queueMicrotask, !1),
    Ut = {
        x: !1,
        y: !1
    };
function eb() {
    return Ut.x || Ut.y
}
function hM(e) {
    return e === "x" || e === "y" ? Ut[e] ? null : (Ut[e] = !0, () => {
        Ut[e] = !1
    }) : Ut.x || Ut.y ? null : (Ut.x = Ut.y = !0, () => {
        Ut.x = Ut.y = !1
    })
}
function tb(e, t) {
    const n = fM(e),
        r = new AbortController,
        i = {
            passive: !0,
            ...t,
            signal: r.signal
        };
    return [n, i, () => r.abort()]
}
function Bg(e) {
    return !(e.pointerType === "touch" || eb())
}
function pM(e, t, n={}) {
    const [r, i, s] = tb(e, n),
        o = a => {
            if (!Bg(a))
                return;
            const {target: l} = a,
                u = t(l, a);
            if (typeof u != "function" || !l)
                return;
            const d = f => {
                Bg(f) && (u(f), l.removeEventListener("pointerleave", d))
            };
            l.addEventListener("pointerleave", d, i)
        };
    return r.forEach(a => {
        a.addEventListener("pointerenter", o, i)
    }), s
}
const nb = (e, t) => t ? e === t ? !0 : nb(e, t.parentElement) : !1,
    hp = e => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1,
    mM = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function rb(e) {
    return mM.has(e.tagName) || e.isContentEditable === !0
}
const Ga = new WeakSet;
function $g(e) {
    return t => {
        t.key === "Enter" && e(t)
    }
}
function hu(e, t) {
    e.dispatchEvent(new PointerEvent("pointer" + t, {
        isPrimary: !0,
        bubbles: !0
    }))
}
const gM = (e, t) => {
    const n = e.currentTarget;
    if (!n)
        return;
    const r = $g(() => {
        if (Ga.has(n))
            return;
        hu(n, "down");
        const i = $g(() => {
                hu(n, "up")
            }),
            s = () => hu(n, "cancel");
        n.addEventListener("keyup", i, t),
        n.addEventListener("blur", s, t)
    });
    n.addEventListener("keydown", r, t),
    n.addEventListener("blur", () => n.removeEventListener("keydown", r), t)
};
function Ug(e) {
    return hp(e) && !eb()
}
function yM(e, t, n={}) {
    const [r, i, s] = tb(e, n),
        o = a => {
            const l = a.currentTarget;
            if (!Ug(a))
                return;
            Ga.add(l);
            const u = t(l, a),
                d = (p, b) => {
                    window.removeEventListener("pointerup", f),
                    window.removeEventListener("pointercancel", h),
                    Ga.has(l) && Ga.delete(l),
                    Ug(p) && typeof u == "function" && u(p, {
                        success: b
                    })
                },
                f = p => {
                    d(p, l === window || l === document || n.useGlobalTarget || nb(l, p.target))
                },
                h = p => {
                    d(p, !1)
                };
            window.addEventListener("pointerup", f, i),
            window.addEventListener("pointercancel", h, i)
        };
    return r.forEach(a => {
        (n.useGlobalTarget ? window : a).addEventListener("pointerdown", o, i),
        cf(a) && (a.addEventListener("focus", u => gM(u, i)), !rb(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0))
    }), s
}
function ib(e) {
    return d1(e) && "ownerSVGElement" in e
}
function vM(e) {
    return ib(e) && e.tagName === "svg"
}
const xM = [...Y1, Me, br],
    wM = e => xM.find(Q1(e)),
    Wg = () => ({
        translate: 0,
        scale: 1,
        origin: 0,
        originPoint: 0
    }),
    Ii = () => ({
        x: Wg(),
        y: Wg()
    }),
    Hg = () => ({
        min: 0,
        max: 0
    }),
    De = () => ({
        x: Hg(),
        y: Hg()
    }),
    uf = {
        current: null
    },
    sb = {
        current: !1
    },
    bM = typeof window < "u";
function SM() {
    if (sb.current = !0, !!bM)
        if (window.matchMedia) {
            const e = window.matchMedia("(prefers-reduced-motion)"),
                t = () => uf.current = e.matches;
            e.addEventListener("change", t),
            t()
        } else
            uf.current = !1
}
const CM = new WeakMap;
function yc(e) {
    return e !== null && typeof e == "object" && typeof e.start == "function"
}
function Oo(e) {
    return typeof e == "string" || Array.isArray(e)
}
const pp = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"],
    mp = ["initial", ...pp];
function vc(e) {
    return yc(e.animate) || mp.some(t => Oo(e[t]))
}
function ob(e) {
    return !!(vc(e) || e.variants)
}
function EM(e, t, n) {
    for (const r in t) {
        const i = t[r],
            s = n[r];
        if (Ze(i))
            e.addValue(r, i);
        else if (Ze(s))
            e.addValue(r, fs(i, {
                owner: e
            }));
        else if (s !== i)
            if (e.hasValue(r)) {
                const o = e.getValue(r);
                o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i)
            } else {
                const o = e.getStaticValue(r);
                e.addValue(r, fs(o !== void 0 ? o : i, {
                    owner: e
                }))
            }
    }
    for (const r in n)
        t[r] === void 0 && e.removeValue(r);
    return t
}
const Kg = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"];
let Ml = {};
function ab(e) {
    Ml = e
}
function NM() {
    return Ml
}
class TM {
    scrapeMotionValuesFromProps(t, n, r)
    {
        return {}
    }
    constructor({parent: t, props: n, presenceContext: r, reducedMotionConfig: i, blockInitialAnimation: s, visualState: o}, a={})
    {
        this.current = null,
        this.children = new Set,
        this.isVariantNode = !1,
        this.isControllingVariants = !1,
        this.shouldReduceMotion = null,
        this.values = new Map,
        this.KeyframeResolver = op,
        this.features = {},
        this.valueSubscriptions = new Map,
        this.prevMotionValues = {},
        this.events = {},
        this.propEventSubscriptions = {},
        this.notifyUpdate = () => this.notify("Update", this.latestValues),
        this.render = () => {
            this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
        },
        this.renderScheduledAt = 0,
        this.scheduleRender = () => {
            const h = it.now();
            this.renderScheduledAt < h && (this.renderScheduledAt = h, ve.render(this.render, !1, !0))
        };
        const {latestValues: l, renderState: u} = o;
        this.latestValues = l,
        this.baseTarget = {
            ...l
        },
        this.initialValues = n.initial ? {
            ...l
        } : {},
        this.renderState = u,
        this.parent = t,
        this.props = n,
        this.presenceContext = r,
        this.depth = t ? t.depth + 1 : 0,
        this.reducedMotionConfig = i,
        this.options = a,
        this.blockInitialAnimation = !!s,
        this.isControllingVariants = vc(n),
        this.isVariantNode = ob(n),
        this.isVariantNode && (this.variantChildren = new Set),
        this.manuallyAnimateOnMount = !!(t && t.current);
        const {willChange: d, ...f} = this.scrapeMotionValuesFromProps(n, {}, this);
        for (const h in f) {
            const p = f[h];
            l[h] !== void 0 && Ze(p) && p.set(l[h])
        }
    }
    mount(t)
    {
        var n;
        this.current = t,
        CM.set(t, this),
        this.projection && !this.projection.instance && this.projection.mount(t),
        this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach((r, i) => this.bindToMotionValue(i, r)),
        this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (sb.current || SM(), this.shouldReduceMotion = uf.current),
        (n = this.parent) == null || n.addChild(this),
        this.update(this.props, this.presenceContext)
    }
    unmount()
    {
        var t;
        this.projection && this.projection.unmount(),
        wr(this.notifyUpdate),
        wr(this.render),
        this.valueSubscriptions.forEach(n => n()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        (t = this.parent) == null || t.removeChild(this);
        for (const n in this.events)
            this.events[n].clear();
        for (const n in this.features) {
            const r = this.features[n];
            r && (r.unmount(), r.isMounted = !1)
        }
        this.current = null
    }
    addChild(t)
    {
        this.children.add(t),
        this.enteringChildren ?? (this.enteringChildren = new Set),
        this.enteringChildren.add(t)
    }
    removeChild(t)
    {
        this.children.delete(t),
        this.enteringChildren && this.enteringChildren.delete(t)
    }
    bindToMotionValue(t, n)
    {
        this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
        const r = Cs.has(t);
        r && this.onBindTransform && this.onBindTransform();
        const i = n.on("change", o => {
            this.latestValues[t] = o,
            this.props.onUpdate && ve.preRender(this.notifyUpdate),
            r && this.projection && (this.projection.isTransformDirty = !0),
            this.scheduleRender()
        });
        let s;
        typeof window < "u" && window.MotionCheckAppearSync && (s = window.MotionCheckAppearSync(this, t, n)),
        this.valueSubscriptions.set(t, () => {
            i(),
            s && s(),
            n.owner && n.stop()
        })
    }
    sortNodePosition(t)
    {
        return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current)
    }
    updateFeatures()
    {
        let t = "animation";
        for (t in Ml) {
            const n = Ml[t];
            if (!n)
                continue;
            const {isEnabled: r, Feature: i} = n;
            if (!this.features[t] && i && r(this.props) && (this.features[t] = new i(this)), this.features[t]) {
                const s = this.features[t];
                s.isMounted ? s.update() : (s.mount(), s.isMounted = !0)
            }
        }
    }
    triggerBuild()
    {
        this.build(this.renderState, this.latestValues, this.props)
    }
    measureViewportBox()
    {
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : De()
    }
    getStaticValue(t)
    {
        return this.latestValues[t]
    }
    setStaticValue(t, n)
    {
        this.latestValues[t] = n
    }
    update(t, n)
    {
        (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
        this.prevProps = this.props,
        this.props = t,
        this.prevPresenceContext = this.presenceContext,
        this.presenceContext = n;
        for (let r = 0; r < Kg.length; r++) {
            const i = Kg[r];
            this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
            const s = "on" + i,
                o = t[s];
            o && (this.propEventSubscriptions[i] = this.on(i, o))
        }
        this.prevMotionValues = EM(this, this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this), this.prevMotionValues),
        this.handleChildMotionValue && this.handleChildMotionValue()
    }
    getProps()
    {
        return this.props
    }
    getVariant(t)
    {
        return this.props.variants ? this.props.variants[t] : void 0
    }
    getDefaultTransition()
    {
        return this.props.transition
    }
    getTransformPagePoint()
    {
        return this.props.transformPagePoint
    }
    getClosestVariantNode()
    {
        return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
    }
    addVariantChild(t)
    {
        const n = this.getClosestVariantNode();
        if (n)
            return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t)
    }
    addValue(t, n)
    {
        const r = this.values.get(t);
        n !== r && (r && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] = n.get())
    }
    removeValue(t)
    {
        this.values.delete(t);
        const n = this.valueSubscriptions.get(t);
        n && (n(), this.valueSubscriptions.delete(t)),
        delete this.latestValues[t],
        this.removeValueFromRenderState(t, this.renderState)
    }
    hasValue(t)
    {
        return this.values.has(t)
    }
    getValue(t, n)
    {
        if (this.props.values && this.props.values[t])
            return this.props.values[t];
        let r = this.values.get(t);
        return r === void 0 && n !== void 0 && (r = fs(n === null ? void 0 : n, {
            owner: this
        }), this.addValue(t, r)), r
    }
    readValue(t, n)
    {
        let r = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
        return r != null && (typeof r == "string" && (u1(r) || f1(r)) ? r = parseFloat(r) : !wM(r) && br.test(n) && (r = Z1(t, n)), this.setBaseTarget(t, Ze(r) ? r.get() : r)), Ze(r) ? r.get() : r
    }
    setBaseTarget(t, n)
    {
        this.baseTarget[t] = n
    }
    getBaseTarget(t)
    {
        var s;
        const {initial: n} = this.props;
        let r;
        if (typeof n == "string" || typeof n == "object") {
            const o = cp(this.props, n, (s = this.presenceContext) == null ? void 0 : s.custom);
            o && (r = o[t])
        }
        if (n && r !== void 0)
            return r;
        const i = this.getBaseTargetFromProps(this.props, t);
        return i !== void 0 && !Ze(i) ? i : this.initialValues[t] !== void 0 && r === void 0 ? void 0 : this.baseTarget[t]
    }
    on(t, n)
    {
        return this.events[t] || (this.events[t] = new Qh), this.events[t].add(n)
    }
    notify(t, ...n)
    {
        this.events[t] && this.events[t].notify(...n)
    }
    scheduleRenderMicrotask()
    {
        fp.render(this.render)
    }
}
class lb extends TM {
    constructor()
    {
        super(...arguments),
        this.KeyframeResolver = dM
    }
    sortInstanceNodePosition(t, n)
    {
        return t.compareDocumentPosition(n) & 2 ? 1 : -1
    }
    getBaseTargetFromProps(t, n)
    {
        const r = t.style;
        return r ? r[n] : void 0
    }
    removeValueFromRenderState(t, {vars: n, style: r})
    {
        delete n[t],
        delete r[t]
    }
    handleChildMotionValue()
    {
        this.childSubscription && (this.childSubscription(), delete this.childSubscription);
        const {children: t} = this.props;
        Ze(t) && (this.childSubscription = t.on("change", n => {
            this.current && (this.current.textContent = `${n}`)
        }))
    }
}
class Tr {
    constructor(t)
    {
        this.isMounted = !1,
        this.node = t
    }
    update() {}
}
function cb({top: e, left: t, right: n, bottom: r}) {
    return {
        x: {
            min: t,
            max: n
        },
        y: {
            min: e,
            max: r
        }
    }
}
function PM({x: e, y: t}) {
    return {
        top: t.min,
        right: e.max,
        bottom: t.max,
        left: e.min
    }
}
function jM(e, t) {
    if (!t)
        return e;
    const n = t({
            x: e.left,
            y: e.top
        }),
        r = t({
            x: e.right,
            y: e.bottom
        });
    return {
        top: n.y,
        left: n.x,
        bottom: r.y,
        right: r.x
    }
}
function pu(e) {
    return e === void 0 || e === 1
}
function df({scale: e, scaleX: t, scaleY: n}) {
    return !pu(e) || !pu(t) || !pu(n)
}
function _r(e) {
    return df(e) || ub(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY
}
function ub(e) {
    return Gg(e.x) || Gg(e.y)
}
function Gg(e) {
    return e && e !== "0%"
}
function Ol(e, t, n) {
    const r = e - n,
        i = t * r;
    return n + i
}
function qg(e, t, n, r, i) {
    return i !== void 0 && (e = Ol(e, i, r)), Ol(e, n, r) + t
}
function ff(e, t=0, n=1, r, i) {
    e.min = qg(e.min, t, n, r, i),
    e.max = qg(e.max, t, n, r, i)
}
function db(e, {x: t, y: n}) {
    ff(e.x, t.translate, t.scale, t.originPoint),
    ff(e.y, n.translate, n.scale, n.originPoint)
}
const Qg = .999999999999,
    Yg = 1.0000000000001;
function kM(e, t, n, r=!1) {
    const i = n.length;
    if (!i)
        return;
    t.x = t.y = 1;
    let s,
        o;
    for (let a = 0; a < i; a++) {
        s = n[a],
        o = s.projectionDelta;
        const {visualElement: l} = s.options;
        l && l.props.style && l.props.style.display === "contents" || (r && s.options.layoutScroll && s.scroll && s !== s.root && Li(e, {
            x: -s.scroll.offset.x,
            y: -s.scroll.offset.y
        }), o && (t.x *= o.x.scale, t.y *= o.y.scale, db(e, o)), r && _r(s.latestValues) && Li(e, s.latestValues))
    }
    t.x < Yg && t.x > Qg && (t.x = 1),
    t.y < Yg && t.y > Qg && (t.y = 1)
}
function Di(e, t) {
    e.min = e.min + t,
    e.max = e.max + t
}
function Xg(e, t, n, r, i=.5) {
    const s = Ce(e.min, e.max, i);
    ff(e, t, n, s, r)
}
function Li(e, t) {
    Xg(e.x, t.x, t.scaleX, t.scale, t.originX),
    Xg(e.y, t.y, t.scaleY, t.scale, t.originY)
}
function fb(e, t) {
    return cb(jM(e.getBoundingClientRect(), t))
}
function RM(e, t, n) {
    const r = fb(e, n),
        {scroll: i} = t;
    return i && (Di(r.x, i.offset.x), Di(r.y, i.offset.y)), r
}
const AM = {
        x: "translateX",
        y: "translateY",
        z: "translateZ",
        transformPerspective: "perspective"
    },
    MM = Ss.length;
function OM(e, t, n) {
    let r = "",
        i = !0;
    for (let s = 0; s < MM; s++) {
        const o = Ss[s],
            a = e[o];
        if (a === void 0)
            continue;
        let l = !0;
        if (typeof a == "number")
            l = a === (o.startsWith("scale") ? 1 : 0);
        else {
            const u = parseFloat(a);
            l = o.startsWith("scale") ? u === 1 : u === 0
        }
        if (!l || n) {
            const u = J1(a, dp[o]);
            if (!l) {
                i = !1;
                const d = AM[o] || o;
                r += `${d}(${u}) `
            }
            n && (t[o] = u)
        }
    }
    return r = r.trim(), n ? r = n(t, i ? "" : r) : i && (r = "none"), r
}
function gp(e, t, n) {
    const {style: r, vars: i, transformOrigin: s} = e;
    let o = !1,
        a = !1;
    for (const l in t) {
        const u = t[l];
        if (Cs.has(l)) {
            o = !0;
            continue
        } else if (T1(l)) {
            i[l] = u;
            continue
        } else {
            const d = J1(u, dp[l]);
            l.startsWith("origin") ? (a = !0, s[l] = d) : r[l] = d
        }
    }
    if (t.transform || (o || n ? r.transform = OM(t, e.transform, n) : r.transform && (r.transform = "none")), a) {
        const {originX: l="50%", originY: u="50%", originZ: d=0} = s;
        r.transformOrigin = `${l} ${u} ${d}`
    }
}
function hb(e, {style: t, vars: n}, r, i) {
    const s = e.style;
    let o;
    for (o in t)
        s[o] = t[o];
    i == null || i.applyProjectionStyles(s, r);
    for (o in n)
        s.setProperty(o, n[o])
}
function Zg(e, t) {
    return t.max === t.min ? 0 : e / (t.max - t.min) * 100
}
const _s = {
        correct: (e, t) => {
            if (!t.target)
                return e;
            if (typeof e == "string")
                if ($.test(e))
                    e = parseFloat(e);
                else
                    return e;
            const n = Zg(e, t.target.x),
                r = Zg(e, t.target.y);
            return `${n}% ${r}%`
        }
    },
    IM = {
        correct: (e, {treeScale: t, projectionDelta: n}) => {
            const r = e,
                i = br.parse(e);
            if (i.length > 5)
                return r;
            const s = br.createTransformer(e),
                o = typeof i[0] != "number" ? 1 : 0,
                a = n.x.scale * t.x,
                l = n.y.scale * t.y;
            i[0 + o] /= a,
            i[1 + o] /= l;
            const u = Ce(a, l, .5);
            return typeof i[2 + o] == "number" && (i[2 + o] /= u), typeof i[3 + o] == "number" && (i[3 + o] /= u), s(i)
        }
    },
    hf = {
        borderRadius: {
            ..._s,
            applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
        },
        borderTopLeftRadius: _s,
        borderTopRightRadius: _s,
        borderBottomLeftRadius: _s,
        borderBottomRightRadius: _s,
        boxShadow: IM
    };
function pb(e, {layout: t, layoutId: n}) {
    return Cs.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!hf[e] || e === "opacity")
}
function yp(e, t, n) {
    var o;
    const r = e.style,
        i = t == null ? void 0 : t.style,
        s = {};
    if (!r)
        return s;
    for (const a in r)
        (Ze(r[a]) || i && Ze(i[a]) || pb(a, e) || ((o = n == null ? void 0 : n.getValue(a)) == null ? void 0 : o.liveStyle) !== void 0) && (s[a] = r[a]);
    return s
}
function DM(e) {
    return window.getComputedStyle(e)
}
class LM extends lb {
    constructor()
    {
        super(...arguments),
        this.type = "html",
        this.renderInstance = hb
    }
    readValueFromInstance(t, n)
    {
        var r;
        if (Cs.has(n))
            return (r = this.projection) != null && r.isProjecting ? Zd(n) : dA(t, n);
        {
            const i = DM(t),
                s = (T1(n) ? i.getPropertyValue(n) : i[n]) || 0;
            return typeof s == "string" ? s.trim() : s
        }
    }
    measureInstanceViewportBox(t, {transformPagePoint: n})
    {
        return fb(t, n)
    }
    build(t, n, r)
    {
        gp(t, n, r.transformTemplate)
    }
    scrapeMotionValuesFromProps(t, n, r)
    {
        return yp(t, n, r)
    }
}
const _M = {
        offset: "stroke-dashoffset",
        array: "stroke-dasharray"
    },
    VM = {
        offset: "strokeDashoffset",
        array: "strokeDasharray"
    };
function FM(e, t, n=1, r=0, i=!0) {
    e.pathLength = 1;
    const s = i ? _M : VM;
    e[s.offset] = `${-r}`,
    e[s.array] = `${t} ${n}`
}
const zM = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];
function mb(e, {attrX: t, attrY: n, attrScale: r, pathLength: i, pathSpacing: s=1, pathOffset: o=0, ...a}, l, u, d) {
    if (gp(e, a, u), l) {
        e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
        return
    }
    e.attrs = e.style,
    e.style = {};
    const {attrs: f, style: h} = e;
    f.transform && (h.transform = f.transform, delete f.transform),
    (h.transform || f.transformOrigin) && (h.transformOrigin = f.transformOrigin ?? "50% 50%", delete f.transformOrigin),
    h.transform && (h.transformBox = (d == null ? void 0 : d.transformBox) ?? "fill-box", delete f.transformBox);
    for (const p of zM)
        f[p] !== void 0 && (h[p] = f[p], delete f[p]);
    t !== void 0 && (f.x = t),
    n !== void 0 && (f.y = n),
    r !== void 0 && (f.scale = r),
    i !== void 0 && FM(f, i, s, o, !1)
}
const gb = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"]),
    yb = e => typeof e == "string" && e.toLowerCase() === "svg";
function BM(e, t, n, r) {
    hb(e, t, void 0, r);
    for (const i in t.attrs)
        e.setAttribute(gb.has(i) ? i : up(i), t.attrs[i])
}
function vb(e, t, n) {
    const r = yp(e, t, n);
    for (const i in e)
        if (Ze(e[i]) || Ze(t[i])) {
            const s = Ss.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
            r[s] = e[i]
        }
    return r
}
class $M extends lb {
    constructor()
    {
        super(...arguments),
        this.type = "svg",
        this.isSVGTag = !1,
        this.measureInstanceViewportBox = De
    }
    getBaseTargetFromProps(t, n)
    {
        return t[n]
    }
    readValueFromInstance(t, n)
    {
        if (Cs.has(n)) {
            const r = X1(n);
            return r && r.default || 0
        }
        return n = gb.has(n) ? n : up(n), t.getAttribute(n)
    }
    scrapeMotionValuesFromProps(t, n, r)
    {
        return vb(t, n, r)
    }
    build(t, n, r)
    {
        mb(t, n, this.isSVGTag, r.transformTemplate, r.style)
    }
    renderInstance(t, n, r, i)
    {
        BM(t, n, r, i)
    }
    mount(t)
    {
        this.isSVGTag = yb(t.tagName),
        super.mount(t)
    }
}
const UM = mp.length;
function xb(e) {
    if (!e)
        return;
    if (!e.isControllingVariants) {
        const n = e.parent ? xb(e.parent) || {} : {};
        return e.props.initial !== void 0 && (n.initial = e.props.initial), n
    }
    const t = {};
    for (let n = 0; n < UM; n++) {
        const r = mp[n],
            i = e.props[r];
        (Oo(i) || i === !1) && (t[r] = i)
    }
    return t
}
function wb(e, t) {
    if (!Array.isArray(t))
        return !1;
    const n = t.length;
    if (n !== e.length)
        return !1;
    for (let r = 0; r < n; r++)
        if (t[r] !== e[r])
            return !1;
    return !0
}
const WM = [...pp].reverse(),
    HM = pp.length;
function KM(e) {
    return t => Promise.all(t.map(({animation: n, options: r}) => tM(e, n, r)))
}
function GM(e) {
    let t = KM(e),
        n = Jg(),
        r = !0;
    const i = l => (u, d) => {
        var h;
        const f = Hi(e, d, l === "exit" ? (h = e.presenceContext) == null ? void 0 : h.custom : void 0);
        if (f) {
            const {transition: p, transitionEnd: b, ...m} = f;
            u = {
                ...u,
                ...m,
                ...b
            }
        }
        return u
    };
    function s(l) {
        t = l(e)
    }
    function o(l) {
        const {props: u} = e,
            d = xb(e.parent) || {},
            f = [],
            h = new Set;
        let p = {},
            b = 1 / 0;
        for (let w = 0; w < HM; w++) {
            const v = WM[w],
                g = n[v],
                x = u[v] !== void 0 ? u[v] : d[v],
                S = Oo(x),
                C = v === l ? g.isActive : null;
            C === !1 && (b = w);
            let E = x === d[v] && x !== u[v] && S;
            if (E && r && e.manuallyAnimateOnMount && (E = !1), g.protectedKeys = {
                ...p
            }, !g.isActive && C === null || !x && !g.prevProp || yc(x) || typeof x == "boolean")
                continue;
            const N = qM(g.prevProp, x);
            let T = N || v === l && g.isActive && !E && S || w > b && S,
                k = !1;
            const A = Array.isArray(x) ? x : [x];
            let z = A.reduce(i(v), {});
            C === !1 && (z = {});
            const {prevResolvedValues: D={}} = g,
                H = {
                    ...D,
                    ...z
                },
                O = V => {
                    T = !0,
                    h.has(V) && (k = !0, h.delete(V)),
                    g.needsAnimating[V] = !0;
                    const P = e.getValue(V);
                    P && (P.liveStyle = !1)
                };
            for (const V in H) {
                const P = z[V],
                    j = D[V];
                if (p.hasOwnProperty(V))
                    continue;
                let L = !1;
                sf(P) && sf(j) ? L = !wb(P, j) : L = P !== j,
                L ? P != null ? O(V) : h.add(V) : P !== void 0 && h.has(V) ? O(V) : g.protectedKeys[V] = !0
            }
            g.prevProp = x,
            g.prevResolvedValues = z,
            g.isActive && (p = {
                ...p,
                ...z
            }),
            r && e.blockInitialAnimation && (T = !1);
            const K = E && N;
            T && (!K || k) && f.push(...A.map(V => {
                const P = {
                    type: v
                };
                if (typeof V == "string" && r && !K && e.manuallyAnimateOnMount && e.parent) {
                    const {parent: j} = e,
                        L = Hi(j, V);
                    if (j.enteringChildren && L) {
                        const {delayChildren: G} = L.transition || {};
                        P.delay = U1(j.enteringChildren, e, G)
                    }
                }
                return {
                    animation: V,
                    options: P
                }
            }))
        }
        if (h.size) {
            const w = {};
            if (typeof u.initial != "boolean") {
                const v = Hi(e, Array.isArray(u.initial) ? u.initial[0] : u.initial);
                v && v.transition && (w.transition = v.transition)
            }
            h.forEach(v => {
                const g = e.getBaseTarget(v),
                    x = e.getValue(v);
                x && (x.liveStyle = !0),
                w[v] = g ?? null
            }),
            f.push({
                animation: w
            })
        }
        let m = !!f.length;
        return r && (u.initial === !1 || u.initial === u.animate) && !e.manuallyAnimateOnMount && (m = !1), r = !1, m ? t(f) : Promise.resolve()
    }
    function a(l, u) {
        var f;
        if (n[l].isActive === u)
            return Promise.resolve();
        (f = e.variantChildren) == null || f.forEach(h => {
            var p;
            return (p = h.animationState) == null ? void 0 : p.setActive(l, u)
        }),
        n[l].isActive = u;
        const d = o(l);
        for (const h in n)
            n[h].protectedKeys = {};
        return d
    }
    return {
        animateChanges: o,
        setActive: a,
        setAnimateFunction: s,
        getState: () => n,
        reset: () => {
            n = Jg()
        }
    }
}
function qM(e, t) {
    return typeof t == "string" ? t !== e : Array.isArray(t) ? !wb(t, e) : !1
}
function Ir(e=!1) {
    return {
        isActive: e,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    }
}
function Jg() {
    return {
        animate: Ir(!0),
        whileInView: Ir(),
        whileHover: Ir(),
        whileTap: Ir(),
        whileDrag: Ir(),
        whileFocus: Ir(),
        exit: Ir()
    }
}
function ey(e, t) {
    e.min = t.min,
    e.max = t.max
}
function $t(e, t) {
    ey(e.x, t.x),
    ey(e.y, t.y)
}
function ty(e, t) {
    e.translate = t.translate,
    e.scale = t.scale,
    e.originPoint = t.originPoint,
    e.origin = t.origin
}
const bb = 1e-4,
    QM = 1 - bb,
    YM = 1 + bb,
    Sb = .01,
    XM = 0 - Sb,
    ZM = 0 + Sb;
function st(e) {
    return e.max - e.min
}
function JM(e, t, n) {
    return Math.abs(e - t) <= n
}
function ny(e, t, n, r=.5) {
    e.origin = r,
    e.originPoint = Ce(t.min, t.max, e.origin),
    e.scale = st(n) / st(t),
    e.translate = Ce(n.min, n.max, e.origin) - e.originPoint,
    (e.scale >= QM && e.scale <= YM || isNaN(e.scale)) && (e.scale = 1),
    (e.translate >= XM && e.translate <= ZM || isNaN(e.translate)) && (e.translate = 0)
}
function ro(e, t, n, r) {
    ny(e.x, t.x, n.x, r ? r.originX : void 0),
    ny(e.y, t.y, n.y, r ? r.originY : void 0)
}
function ry(e, t, n) {
    e.min = n.min + t.min,
    e.max = e.min + st(t)
}
function eO(e, t, n) {
    ry(e.x, t.x, n.x),
    ry(e.y, t.y, n.y)
}
function iy(e, t, n) {
    e.min = t.min - n.min,
    e.max = e.min + st(t)
}
function Il(e, t, n) {
    iy(e.x, t.x, n.x),
    iy(e.y, t.y, n.y)
}
function sy(e, t, n, r, i) {
    return e -= t, e = Ol(e, 1 / n, r), i !== void 0 && (e = Ol(e, 1 / i, r)), e
}
function tO(e, t=0, n=1, r=.5, i, s=e, o=e) {
    if (vn.test(t) && (t = parseFloat(t), t = Ce(o.min, o.max, t / 100) - o.min), typeof t != "number")
        return;
    let a = Ce(s.min, s.max, r);
    e === s && (a -= t),
    e.min = sy(e.min, t, n, a, i),
    e.max = sy(e.max, t, n, a, i)
}
function oy(e, t, [n, r, i], s, o) {
    tO(e, t[n], t[r], t[i], t.scale, s, o)
}
const nO = ["x", "scaleX", "originX"],
    rO = ["y", "scaleY", "originY"];
function ay(e, t, n, r) {
    oy(e.x, t, nO, n ? n.x : void 0, r ? r.x : void 0),
    oy(e.y, t, rO, n ? n.y : void 0, r ? r.y : void 0)
}
function ly(e) {
    return e.translate === 0 && e.scale === 1
}
function Cb(e) {
    return ly(e.x) && ly(e.y)
}
function cy(e, t) {
    return e.min === t.min && e.max === t.max
}
function iO(e, t) {
    return cy(e.x, t.x) && cy(e.y, t.y)
}
function uy(e, t) {
    return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max)
}
function Eb(e, t) {
    return uy(e.x, t.x) && uy(e.y, t.y)
}
function dy(e) {
    return st(e.x) / st(e.y)
}
function fy(e, t) {
    return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint
}
function Pt(e) {
    return [e("x"), e("y")]
}
function sO(e, t, n) {
    let r = "";
    const i = e.x.translate / t.x,
        s = e.y.translate / t.y,
        o = (n == null ? void 0 : n.z) || 0;
    if ((i || s || o) && (r = `translate3d(${i}px, ${s}px, ${o}px) `), (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `), n) {
        const {transformPerspective: u, rotate: d, rotateX: f, rotateY: h, skewX: p, skewY: b} = n;
        u && (r = `perspective(${u}px) ${r}`),
        d && (r += `rotate(${d}deg) `),
        f && (r += `rotateX(${f}deg) `),
        h && (r += `rotateY(${h}deg) `),
        p && (r += `skewX(${p}deg) `),
        b && (r += `skewY(${b}deg) `)
    }
    const a = e.x.scale * t.x,
        l = e.y.scale * t.y;
    return (a !== 1 || l !== 1) && (r += `scale(${a}, ${l})`), r || "none"
}
const Nb = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
    oO = Nb.length,
    hy = e => typeof e == "string" ? parseFloat(e) : e,
    py = e => typeof e == "number" || $.test(e);
function aO(e, t, n, r, i, s) {
    i ? (e.opacity = Ce(0, n.opacity ?? 1, lO(r)), e.opacityExit = Ce(t.opacity ?? 1, 0, cO(r))) : s && (e.opacity = Ce(t.opacity ?? 1, n.opacity ?? 1, r));
    for (let o = 0; o < oO; o++) {
        const a = `border${Nb[o]}Radius`;
        let l = my(t, a),
            u = my(n, a);
        if (l === void 0 && u === void 0)
            continue;
        l || (l = 0),
        u || (u = 0),
        l === 0 || u === 0 || py(l) === py(u) ? (e[a] = Math.max(Ce(hy(l), hy(u), r), 0), (vn.test(u) || vn.test(l)) && (e[a] += "%")) : e[a] = u
    }
    (t.rotate || n.rotate) && (e.rotate = Ce(t.rotate || 0, n.rotate || 0, r))
}
function my(e, t) {
    return e[t] !== void 0 ? e[t] : e.borderRadius
}
const lO = Tb(0, .5, w1),
    cO = Tb(.5, .95, It);
function Tb(e, t, n) {
    return r => r < e ? 0 : r > t ? 1 : n(Ro(e, t, r))
}
function uO(e, t, n) {
    const r = Ze(e) ? e : fs(e);
    return r.start(lp("", r, t, n)), r.animation
}
function Io(e, t, n, r={
    passive: !0
}) {
    return e.addEventListener(t, n, r), () => e.removeEventListener(t, n)
}
const dO = (e, t) => e.depth - t.depth;
class fO {
    constructor()
    {
        this.children = [],
        this.isDirty = !1
    }
    add(t)
    {
        Kh(this.children, t),
        this.isDirty = !0
    }
    remove(t)
    {
        Gh(this.children, t),
        this.isDirty = !0
    }
    forEach(t)
    {
        this.isDirty && this.children.sort(dO),
        this.isDirty = !1,
        this.children.forEach(t)
    }
}
function hO(e, t) {
    const n = it.now(),
        r = ({timestamp: i}) => {
            const s = i - n;
            s >= t && (wr(r), e(s - t))
        };
    return ve.setup(r, !0), () => wr(r)
}
function qa(e) {
    return Ze(e) ? e.get() : e
}
class pO {
    constructor()
    {
        this.members = []
    }
    add(t)
    {
        Kh(this.members, t),
        t.scheduleRender()
    }
    remove(t)
    {
        if (Gh(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
            const n = this.members[this.members.length - 1];
            n && this.promote(n)
        }
    }
    relegate(t)
    {
        const n = this.members.findIndex(i => t === i);
        if (n === 0)
            return !1;
        let r;
        for (let i = n; i >= 0; i--) {
            const s = this.members[i];
            if (s.isPresent !== !1) {
                r = s;
                break
            }
        }
        return r ? (this.promote(r), !0) : !1
    }
    promote(t, n)
    {
        const r = this.lead;
        if (t !== r && (this.prevLead = r, this.lead = t, t.show(), r)) {
            r.instance && r.scheduleRender(),
            t.scheduleRender();
            const i = r.options.layoutDependency,
                s = t.options.layoutDependency;
            i !== void 0 && s !== void 0 && i === s || (t.resumeFrom = r, n && (t.resumeFrom.preserveOpacity = !0), r.snapshot && (t.snapshot = r.snapshot, t.snapshot.latestValues = r.animationValues || r.latestValues), t.root && t.root.isUpdating && (t.isLayoutDirty = !0));
            const {crossfade: a} = t.options;
            a === !1 && r.hide()
        }
    }
    exitAnimationComplete()
    {
        this.members.forEach(t => {
            const {options: n, resumingFrom: r} = t;
            n.onExitComplete && n.onExitComplete(),
            r && r.options.onExitComplete && r.options.onExitComplete()
        })
    }
    scheduleRender()
    {
        this.members.forEach(t => {
            t.instance && t.scheduleRender(!1)
        })
    }
    removeLeadSnapshot()
    {
        this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
    }
}
const Qa = {
        hasAnimatedSinceResize: !0,
        hasEverUpdated: !1
    },
    mu = ["", "X", "Y", "Z"],
    mO = 1e3;
let gO = 0;
function gu(e, t, n, r) {
    const {latestValues: i} = t;
    i[e] && (n[e] = i[e], t.setStaticValue(e, 0), r && (r[e] = 0))
}
function Pb(e) {
    if (e.hasCheckedOptimisedAppear = !0, e.root === e)
        return;
    const {visualElement: t} = e.options;
    if (!t)
        return;
    const n = G1(t);
    if (window.MotionHasOptimisedAnimation(n, "transform")) {
        const {layout: i, layoutId: s} = e.options;
        window.MotionCancelOptimisedAnimation(n, "transform", ve, !(i || s))
    }
    const {parent: r} = e;
    r && !r.hasCheckedOptimisedAppear && Pb(r)
}
function jb({attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: r, resetTransform: i}) {
    return class {
        constructor(o={}, a=t == null ? void 0 : t())
        {
            this.id = gO++,
            this.animationId = 0,
            this.animationCommitId = 0,
            this.children = new Set,
            this.options = {},
            this.isTreeAnimating = !1,
            this.isAnimationBlocked = !1,
            this.isLayoutDirty = !1,
            this.isProjectionDirty = !1,
            this.isSharedProjectionDirty = !1,
            this.isTransformDirty = !1,
            this.updateManuallyBlocked = !1,
            this.updateBlockedByResize = !1,
            this.isUpdating = !1,
            this.isSVG = !1,
            this.needsReset = !1,
            this.shouldResetTransform = !1,
            this.hasCheckedOptimisedAppear = !1,
            this.treeScale = {
                x: 1,
                y: 1
            },
            this.eventHandlers = new Map,
            this.hasTreeAnimated = !1,
            this.layoutVersion = 0,
            this.updateScheduled = !1,
            this.scheduleUpdate = () => this.update(),
            this.projectionUpdateScheduled = !1,
            this.checkUpdateFailed = () => {
                this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots())
            },
            this.updateProjection = () => {
                this.projectionUpdateScheduled = !1,
                this.nodes.forEach(xO),
                this.nodes.forEach(CO),
                this.nodes.forEach(EO),
                this.nodes.forEach(wO)
            },
            this.resolvedRelativeTargetAt = 0,
            this.linkedParentVersion = 0,
            this.hasProjected = !1,
            this.isVisible = !0,
            this.animationProgress = 0,
            this.sharedNodes = new Map,
            this.latestValues = o,
            this.root = a ? a.root || a : this,
            this.path = a ? [...a.path, a] : [],
            this.parent = a,
            this.depth = a ? a.depth + 1 : 0;
            for (let l = 0; l < this.path.length; l++)
                this.path[l].shouldResetTransform = !0;
            this.root === this && (this.nodes = new fO)
        }
        addEventListener(o, a)
        {
            return this.eventHandlers.has(o) || this.eventHandlers.set(o, new Qh), this.eventHandlers.get(o).add(a)
        }
        notifyListeners(o, ...a)
        {
            const l = this.eventHandlers.get(o);
            l && l.notify(...a)
        }
        hasListeners(o)
        {
            return this.eventHandlers.has(o)
        }
        mount(o)
        {
            if (this.instance)
                return;
            this.isSVG = ib(o) && !vM(o),
            this.instance = o;
            const {layoutId: a, layout: l, visualElement: u} = this.options;
            if (u && !u.current && u.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), e) {
                let d,
                    f = 0;
                const h = () => this.root.updateBlockedByResize = !1;
                ve.read(() => {
                    f = window.innerWidth
                }),
                e(o, () => {
                    const p = window.innerWidth;
                    p !== f && (f = p, this.root.updateBlockedByResize = !0, d && d(), d = hO(h, 250), Qa.hasAnimatedSinceResize && (Qa.hasAnimatedSinceResize = !1, this.nodes.forEach(vy)))
                })
            }
            a && this.root.registerSharedNode(a, this),
            this.options.animate !== !1 && u && (a || l) && this.addEventListener("didUpdate", ({delta: d, hasLayoutChanged: f, hasRelativeLayoutChanged: h, layout: p}) => {
                if (this.isTreeAnimationBlocked()) {
                    this.target = void 0,
                    this.relativeTarget = void 0;
                    return
                }
                const b = this.options.transition || u.getDefaultTransition() || kO,
                    {onLayoutAnimationStart: m, onLayoutAnimationComplete: w} = u.getProps(),
                    v = !this.targetLayout || !Eb(this.targetLayout, p),
                    g = !f && h;
                if (this.options.layoutRoot || this.resumeFrom || g || f && (v || !this.currentAnimation)) {
                    this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
                    const x = {
                        ...ap(b, "layout"),
                        onPlay: m,
                        onComplete: w
                    };
                    (u.shouldReduceMotion || this.options.layoutRoot) && (x.delay = 0, x.type = !1),
                    this.startAnimation(x),
                    this.setAnimationOrigin(d, g)
                } else
                    f || vy(this),
                    this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
                this.targetLayout = p
            })
        }
        unmount()
        {
            this.options.layoutId && this.willUpdate(),
            this.root.nodes.remove(this);
            const o = this.getStack();
            o && o.remove(this),
            this.parent && this.parent.children.delete(this),
            this.instance = void 0,
            this.eventHandlers.clear(),
            wr(this.updateProjection)
        }
        blockUpdate()
        {
            this.updateManuallyBlocked = !0
        }
        unblockUpdate()
        {
            this.updateManuallyBlocked = !1
        }
        isUpdateBlocked()
        {
            return this.updateManuallyBlocked || this.updateBlockedByResize
        }
        isTreeAnimationBlocked()
        {
            return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1
        }
        startUpdate()
        {
            this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(NO), this.animationId++)
        }
        getTransformTemplate()
        {
            const {visualElement: o} = this.options;
            return o && o.getProps().transformTemplate
        }
        willUpdate(o=!0)
        {
            if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
                this.options.onExitComplete && this.options.onExitComplete();
                return
            }
            if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Pb(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
                return;
            this.isLayoutDirty = !0;
            for (let d = 0; d < this.path.length; d++) {
                const f = this.path[d];
                f.shouldResetTransform = !0,
                f.updateScroll("snapshot"),
                f.options.layoutRoot && f.willUpdate(!1)
            }
            const {layoutId: a, layout: l} = this.options;
            if (a === void 0 && !l)
                return;
            const u = this.getTransformTemplate();
            this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0,
            this.updateSnapshot(),
            o && this.notifyListeners("willUpdate")
        }
        update()
        {
            if (this.updateScheduled = !1, this.isUpdateBlocked()) {
                this.unblockUpdate(),
                this.clearAllSnapshots(),
                this.nodes.forEach(gy);
                return
            }
            if (this.animationId <= this.animationCommitId) {
                this.nodes.forEach(yy);
                return
            }
            this.animationCommitId = this.animationId,
            this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(SO), this.nodes.forEach(yO), this.nodes.forEach(vO)) : this.nodes.forEach(yy),
            this.clearAllSnapshots();
            const a = it.now();
            $e.delta = wn(0, 1e3 / 60, a - $e.timestamp),
            $e.timestamp = a,
            $e.isProcessing = !0,
            au.update.process($e),
            au.preRender.process($e),
            au.render.process($e),
            $e.isProcessing = !1
        }
        didUpdate()
        {
            this.updateScheduled || (this.updateScheduled = !0, fp.read(this.scheduleUpdate))
        }
        clearAllSnapshots()
        {
            this.nodes.forEach(bO),
            this.sharedNodes.forEach(TO)
        }
        scheduleUpdateProjection()
        {
            this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, ve.preRender(this.updateProjection, !1, !0))
        }
        scheduleCheckAfterUnmount()
        {
            ve.postRender(() => {
                this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
            })
        }
        updateSnapshot()
        {
            this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !st(this.snapshot.measuredBox.x) && !st(this.snapshot.measuredBox.y) && (this.snapshot = void 0))
        }
        updateLayout()
        {
            if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
                return;
            if (this.resumeFrom && !this.resumeFrom.instance)
                for (let l = 0; l < this.path.length; l++)
                    this.path[l].updateScroll();
            const o = this.layout;
            this.layout = this.measure(!1),
            this.layoutVersion++,
            this.layoutCorrected = De(),
            this.isLayoutDirty = !1,
            this.projectionDelta = void 0,
            this.notifyListeners("measure", this.layout.layoutBox);
            const {visualElement: a} = this.options;
            a && a.notify("LayoutMeasure", this.layout.layoutBox, o ? o.layoutBox : void 0)
        }
        updateScroll(o="measure")
        {
            let a = !!(this.options.layoutScroll && this.instance);
            if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === o && (a = !1), a && this.instance) {
                const l = r(this.instance);
                this.scroll = {
                    animationId: this.root.animationId,
                    phase: o,
                    isRoot: l,
                    offset: n(this.instance),
                    wasRoot: this.scroll ? this.scroll.isRoot : l
                }
            }
        }
        resetTransform()
        {
            if (!i)
                return;
            const o = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
                a = this.projectionDelta && !Cb(this.projectionDelta),
                l = this.getTransformTemplate(),
                u = l ? l(this.latestValues, "") : void 0,
                d = u !== this.prevTransformTemplateValue;
            o && this.instance && (a || _r(this.latestValues) || d) && (i(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender())
        }
        measure(o=!0)
        {
            const a = this.measurePageBox();
            let l = this.removeElementScroll(a);
            return o && (l = this.removeTransform(l)), RO(l), {
                animationId: this.root.animationId,
                measuredBox: a,
                layoutBox: l,
                latestValues: {},
                source: this.id
            }
        }
        measurePageBox()
        {
            var u;
            const {visualElement: o} = this.options;
            if (!o)
                return De();
            const a = o.measureViewportBox();
            if (!(((u = this.scroll) == null ? void 0 : u.wasRoot) || this.path.some(AO))) {
                const {scroll: d} = this.root;
                d && (Di(a.x, d.offset.x), Di(a.y, d.offset.y))
            }
            return a
        }
        removeElementScroll(o)
        {
            var l;
            const a = De();
            if ($t(a, o), (l = this.scroll) != null && l.wasRoot)
                return a;
            for (let u = 0; u < this.path.length; u++) {
                const d = this.path[u],
                    {scroll: f, options: h} = d;
                d !== this.root && f && h.layoutScroll && (f.wasRoot && $t(a, o), Di(a.x, f.offset.x), Di(a.y, f.offset.y))
            }
            return a
        }
        applyTransform(o, a=!1)
        {
            const l = De();
            $t(l, o);
            for (let u = 0; u < this.path.length; u++) {
                const d = this.path[u];
                !a && d.options.layoutScroll && d.scroll && d !== d.root && Li(l, {
                    x: -d.scroll.offset.x,
                    y: -d.scroll.offset.y
                }),
                _r(d.latestValues) && Li(l, d.latestValues)
            }
            return _r(this.latestValues) && Li(l, this.latestValues), l
        }
        removeTransform(o)
        {
            const a = De();
            $t(a, o);
            for (let l = 0; l < this.path.length; l++) {
                const u = this.path[l];
                if (!u.instance || !_r(u.latestValues))
                    continue;
                df(u.latestValues) && u.updateSnapshot();
                const d = De(),
                    f = u.measurePageBox();
                $t(d, f),
                ay(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, d)
            }
            return _r(this.latestValues) && ay(a, this.latestValues), a
        }
        setTargetDelta(o)
        {
            this.targetDelta = o,
            this.root.scheduleUpdateProjection(),
            this.isProjectionDirty = !0
        }
        setOptions(o)
        {
            this.options = {
                ...this.options,
                ...o,
                crossfade: o.crossfade !== void 0 ? o.crossfade : !0
            }
        }
        clearMeasurements()
        {
            this.scroll = void 0,
            this.layout = void 0,
            this.snapshot = void 0,
            this.prevTransformTemplateValue = void 0,
            this.targetDelta = void 0,
            this.target = void 0,
            this.isLayoutDirty = !1
        }
        forceRelativeParentToResolveTarget()
        {
            this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== $e.timestamp && this.relativeParent.resolveTargetDelta(!0)
        }
        resolveTargetDelta(o=!1)
        {
            var p;
            const a = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty),
            this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty),
            this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
            const l = !!this.resumingFrom || this !== a;
            if (!(o || l && this.isSharedProjectionDirty || this.isProjectionDirty || (p = this.parent) != null && p.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
                return;
            const {layout: d, layoutId: f} = this.options;
            if (!this.layout || !(d || f))
                return;
            this.resolvedRelativeTargetAt = $e.timestamp;
            const h = this.getClosestProjectingParent();
            h && this.linkedParentVersion !== h.layoutVersion && !h.options.layoutRoot && this.removeRelativeTarget(),
            !this.targetDelta && !this.relativeTarget && (h && h.layout ? this.createRelativeTarget(h, this.layout.layoutBox, h.layout.layoutBox) : this.removeRelativeTarget()),
            !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = De(), this.targetWithTransforms = De()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), eO(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : $t(this.target, this.layout.layoutBox), db(this.target, this.targetDelta)) : $t(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, h && !!h.resumingFrom == !!this.resumingFrom && !h.options.layoutScroll && h.target && this.animationProgress !== 1 ? this.createRelativeTarget(h, this.target, h.target) : this.relativeParent = this.relativeTarget = void 0))
        }
        getClosestProjectingParent()
        {
            if (!(!this.parent || df(this.parent.latestValues) || ub(this.parent.latestValues)))
                return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
        }
        isProjecting()
        {
            return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
        }
        createRelativeTarget(o, a, l)
        {
            this.relativeParent = o,
            this.linkedParentVersion = o.layoutVersion,
            this.forceRelativeParentToResolveTarget(),
            this.relativeTarget = De(),
            this.relativeTargetOrigin = De(),
            Il(this.relativeTargetOrigin, a, l),
            $t(this.relativeTarget, this.relativeTargetOrigin)
        }
        removeRelativeTarget()
        {
            this.relativeParent = this.relativeTarget = void 0
        }
        calcProjection()
        {
            var b;
            const o = this.getLead(),
                a = !!this.resumingFrom || this !== o;
            let l = !0;
            if ((this.isProjectionDirty || (b = this.parent) != null && b.isProjectionDirty) && (l = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === $e.timestamp && (l = !1), l)
                return;
            const {layout: u, layoutId: d} = this.options;
            if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || d))
                return;
            $t(this.layoutCorrected, this.layout.layoutBox);
            const f = this.treeScale.x,
                h = this.treeScale.y;
            kM(this.layoutCorrected, this.treeScale, this.path, a),
            o.layout && !o.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (o.target = o.layout.layoutBox, o.targetWithTransforms = De());
            const {target: p} = o;
            if (!p) {
                this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
                return
            }
            !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (ty(this.prevProjectionDelta.x, this.projectionDelta.x), ty(this.prevProjectionDelta.y, this.projectionDelta.y)),
            ro(this.projectionDelta, this.layoutCorrected, p, this.latestValues),
            (this.treeScale.x !== f || this.treeScale.y !== h || !fy(this.projectionDelta.x, this.prevProjectionDelta.x) || !fy(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", p))
        }
        hide()
        {
            this.isVisible = !1
        }
        show()
        {
            this.isVisible = !0
        }
        scheduleRender(o=!0)
        {
            var a;
            if ((a = this.options.visualElement) == null || a.scheduleRender(), o) {
                const l = this.getStack();
                l && l.scheduleRender()
            }
            this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
        }
        createProjectionDeltas()
        {
            this.prevProjectionDelta = Ii(),
            this.projectionDelta = Ii(),
            this.projectionDeltaWithTransform = Ii()
        }
        setAnimationOrigin(o, a=!1)
        {
            const l = this.snapshot,
                u = l ? l.latestValues : {},
                d = {
                    ...this.latestValues
                },
                f = Ii();
            (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0),
            this.attemptToResolveRelativeTarget = !a;
            const h = De(),
                p = l ? l.source : void 0,
                b = this.layout ? this.layout.source : void 0,
                m = p !== b,
                w = this.getStack(),
                v = !w || w.members.length <= 1,
                g = !!(m && !v && this.options.crossfade === !0 && !this.path.some(jO));
            this.animationProgress = 0;
            let x;
            this.mixTargetDelta = S => {
                const C = S / 1e3;
                xy(f.x, o.x, C),
                xy(f.y, o.y, C),
                this.setTargetDelta(f),
                this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Il(h, this.layout.layoutBox, this.relativeParent.layout.layoutBox), PO(this.relativeTarget, this.relativeTargetOrigin, h, C), x && iO(this.relativeTarget, x) && (this.isProjectionDirty = !1), x || (x = De()), $t(x, this.relativeTarget)),
                m && (this.animationValues = d, aO(d, u, this.latestValues, C, g, v)),
                this.root.scheduleUpdateProjection(),
                this.scheduleRender(),
                this.animationProgress = C
            },
            this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0)
        }
        startAnimation(o)
        {
            var a,
                l,
                u;
            this.notifyListeners("animationStart"),
            (a = this.currentAnimation) == null || a.stop(),
            (u = (l = this.resumingFrom) == null ? void 0 : l.currentAnimation) == null || u.stop(),
            this.pendingAnimation && (wr(this.pendingAnimation), this.pendingAnimation = void 0),
            this.pendingAnimation = ve.update(() => {
                Qa.hasAnimatedSinceResize = !0,
                this.motionValue || (this.motionValue = fs(0)),
                this.currentAnimation = uO(this.motionValue, [0, 1e3], {
                    ...o,
                    velocity: 0,
                    isSync: !0,
                    onUpdate: d => {
                        this.mixTargetDelta(d),
                        o.onUpdate && o.onUpdate(d)
                    },
                    onStop: () => {},
                    onComplete: () => {
                        o.onComplete && o.onComplete(),
                        this.completeAnimation()
                    }
                }),
                this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
                this.pendingAnimation = void 0
            })
        }
        completeAnimation()
        {
            this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
            const o = this.getStack();
            o && o.exitAnimationComplete(),
            this.resumingFrom = this.currentAnimation = this.animationValues = void 0,
            this.notifyListeners("animationComplete")
        }
        finishAnimation()
        {
            this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(mO), this.currentAnimation.stop()),
            this.completeAnimation()
        }
        applyTransformsToTarget()
        {
            const o = this.getLead();
            let {targetWithTransforms: a, target: l, layout: u, latestValues: d} = o;
            if (!(!a || !l || !u)) {
                if (this !== o && this.layout && u && kb(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
                    l = this.target || De();
                    const f = st(this.layout.layoutBox.x);
                    l.x.min = o.target.x.min,
                    l.x.max = l.x.min + f;
                    const h = st(this.layout.layoutBox.y);
                    l.y.min = o.target.y.min,
                    l.y.max = l.y.min + h
                }
                $t(a, l),
                Li(a, d),
                ro(this.projectionDeltaWithTransform, this.layoutCorrected, a, d)
            }
        }
        registerSharedNode(o, a)
        {
            this.sharedNodes.has(o) || this.sharedNodes.set(o, new pO),
            this.sharedNodes.get(o).add(a);
            const u = a.options.initialPromotionConfig;
            a.promote({
                transition: u ? u.transition : void 0,
                preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0
            })
        }
        isLead()
        {
            const o = this.getStack();
            return o ? o.lead === this : !0
        }
        getLead()
        {
            var a;
            const {layoutId: o} = this.options;
            return o ? ((a = this.getStack()) == null ? void 0 : a.lead) || this : this
        }
        getPrevLead()
        {
            var a;
            const {layoutId: o} = this.options;
            return o ? (a = this.getStack()) == null ? void 0 : a.prevLead : void 0
        }
        getStack()
        {
            const {layoutId: o} = this.options;
            if (o)
                return this.root.sharedNodes.get(o)
        }
        promote({needsReset: o, transition: a, preserveFollowOpacity: l}={})
        {
            const u = this.getStack();
            u && u.promote(this, l),
            o && (this.projectionDelta = void 0, this.needsReset = !0),
            a && this.setOptions({
                transition: a
            })
        }
        relegate()
        {
            const o = this.getStack();
            return o ? o.relegate(this) : !1
        }
        resetSkewAndRotation()
        {
            const {visualElement: o} = this.options;
            if (!o)
                return;
            let a = !1;
            const {latestValues: l} = o;
            if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a)
                return;
            const u = {};
            l.z && gu("z", o, u, this.animationValues);
            for (let d = 0; d < mu.length; d++)
                gu(`rotate${mu[d]}`, o, u, this.animationValues),
                gu(`skew${mu[d]}`, o, u, this.animationValues);
            o.render();
            for (const d in u)
                o.setStaticValue(d, u[d]),
                this.animationValues && (this.animationValues[d] = u[d]);
            o.scheduleRender()
        }
        applyProjectionStyles(o, a)
        {
            if (!this.instance || this.isSVG)
                return;
            if (!this.isVisible) {
                o.visibility = "hidden";
                return
            }
            const l = this.getTransformTemplate();
            if (this.needsReset) {
                this.needsReset = !1,
                o.visibility = "",
                o.opacity = "",
                o.pointerEvents = qa(a == null ? void 0 : a.pointerEvents) || "",
                o.transform = l ? l(this.latestValues, "") : "none";
                return
            }
            const u = this.getLead();
            if (!this.projectionDelta || !this.layout || !u.target) {
                this.options.layoutId && (o.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, o.pointerEvents = qa(a == null ? void 0 : a.pointerEvents) || ""),
                this.hasProjected && !_r(this.latestValues) && (o.transform = l ? l({}, "") : "none", this.hasProjected = !1);
                return
            }
            o.visibility = "";
            const d = u.animationValues || u.latestValues;
            this.applyTransformsToTarget();
            let f = sO(this.projectionDeltaWithTransform, this.treeScale, d);
            l && (f = l(d, f)),
            o.transform = f;
            const {x: h, y: p} = this.projectionDelta;
            o.transformOrigin = `${h.origin * 100}% ${p.origin * 100}% 0`,
            u.animationValues ? o.opacity = u === this ? d.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : d.opacityExit : o.opacity = u === this ? d.opacity !== void 0 ? d.opacity : "" : d.opacityExit !== void 0 ? d.opacityExit : 0;
            for (const b in hf) {
                if (d[b] === void 0)
                    continue;
                const {correct: m, applyTo: w, isCSSVariable: v} = hf[b],
                    g = f === "none" ? d[b] : m(d[b], u);
                if (w) {
                    const x = w.length;
                    for (let S = 0; S < x; S++)
                        o[w[S]] = g
                } else
                    v ? this.options.visualElement.renderState.vars[b] = g : o[b] = g
            }
            this.options.layoutId && (o.pointerEvents = u === this ? qa(a == null ? void 0 : a.pointerEvents) || "" : "none")
        }
        clearSnapshot()
        {
            this.resumeFrom = this.snapshot = void 0
        }
        resetTree()
        {
            this.root.nodes.forEach(o => {
                var a;
                return (a = o.currentAnimation) == null ? void 0 : a.stop()
            }),
            this.root.nodes.forEach(gy),
            this.root.sharedNodes.clear()
        }
    }
}
function yO(e) {
    e.updateLayout()
}
function vO(e) {
    var n;
    const t = ((n = e.resumeFrom) == null ? void 0 : n.snapshot) || e.snapshot;
    if (e.isLead() && e.layout && t && e.hasListeners("didUpdate")) {
        const {layoutBox: r, measuredBox: i} = e.layout,
            {animationType: s} = e.options,
            o = t.source !== e.layout.source;
        s === "size" ? Pt(f => {
            const h = o ? t.measuredBox[f] : t.layoutBox[f],
                p = st(h);
            h.min = r[f].min,
            h.max = h.min + p
        }) : kb(s, t.layoutBox, r) && Pt(f => {
            const h = o ? t.measuredBox[f] : t.layoutBox[f],
                p = st(r[f]);
            h.max = h.min + p,
            e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[f].max = e.relativeTarget[f].min + p)
        });
        const a = Ii();
        ro(a, r, t.layoutBox);
        const l = Ii();
        o ? ro(l, e.applyTransform(i, !0), t.measuredBox) : ro(l, r, t.layoutBox);
        const u = !Cb(a);
        let d = !1;
        if (!e.resumeFrom) {
            const f = e.getClosestProjectingParent();
            if (f && !f.resumeFrom) {
                const {snapshot: h, layout: p} = f;
                if (h && p) {
                    const b = De();
                    Il(b, t.layoutBox, h.layoutBox);
                    const m = De();
                    Il(m, r, p.layoutBox),
                    Eb(b, m) || (d = !0),
                    f.options.layoutRoot && (e.relativeTarget = m, e.relativeTargetOrigin = b, e.relativeParent = f)
                }
            }
        }
        e.notifyListeners("didUpdate", {
            layout: r,
            snapshot: t,
            delta: l,
            layoutDelta: a,
            hasLayoutChanged: u,
            hasRelativeLayoutChanged: d
        })
    } else if (e.isLead()) {
        const {onExitComplete: r} = e.options;
        r && r()
    }
    e.options.transition = void 0
}
function xO(e) {
    e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty))
}
function wO(e) {
    e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1
}
function bO(e) {
    e.clearSnapshot()
}
function gy(e) {
    e.clearMeasurements()
}
function yy(e) {
    e.isLayoutDirty = !1
}
function SO(e) {
    const {visualElement: t} = e.options;
    t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"),
    e.resetTransform()
}
function vy(e) {
    e.finishAnimation(),
    e.targetDelta = e.relativeTarget = e.target = void 0,
    e.isProjectionDirty = !0
}
function CO(e) {
    e.resolveTargetDelta()
}
function EO(e) {
    e.calcProjection()
}
function NO(e) {
    e.resetSkewAndRotation()
}
function TO(e) {
    e.removeLeadSnapshot()
}
function xy(e, t, n) {
    e.translate = Ce(t.translate, 0, n),
    e.scale = Ce(t.scale, 1, n),
    e.origin = t.origin,
    e.originPoint = t.originPoint
}
function wy(e, t, n, r) {
    e.min = Ce(t.min, n.min, r),
    e.max = Ce(t.max, n.max, r)
}
function PO(e, t, n, r) {
    wy(e.x, t.x, n.x, r),
    wy(e.y, t.y, n.y, r)
}
function jO(e) {
    return e.animationValues && e.animationValues.opacityExit !== void 0
}
const kO = {
        duration: .45,
        ease: [.4, 0, .1, 1]
    },
    by = e => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e),
    Sy = by("applewebkit/") && !by("chrome/") ? Math.round : It;
function Cy(e) {
    e.min = Sy(e.min),
    e.max = Sy(e.max)
}
function RO(e) {
    Cy(e.x),
    Cy(e.y)
}
function kb(e, t, n) {
    return e === "position" || e === "preserve-aspect" && !JM(dy(t), dy(n), .2)
}
function AO(e) {
    var t;
    return e !== e.root && ((t = e.scroll) == null ? void 0 : t.wasRoot)
}
const MO = jb({
        attachResizeListener: (e, t) => Io(e, "resize", t),
        measureScroll: () => {
            var e,
                t;
            return {
                x: document.documentElement.scrollLeft || ((e = document.body) == null ? void 0 : e.scrollLeft) || 0,
                y: document.documentElement.scrollTop || ((t = document.body) == null ? void 0 : t.scrollTop) || 0
            }
        },
        checkIsScrollRoot: () => !0
    }),
    yu = {
        current: void 0
    },
    Rb = jb({
        measureScroll: e => ({
            x: e.scrollLeft,
            y: e.scrollTop
        }),
        defaultParent: () => {
            if (!yu.current) {
                const e = new MO({});
                e.mount(window),
                e.setOptions({
                    layoutScroll: !0
                }),
                yu.current = e
            }
            return yu.current
        },
        resetTransform: (e, t) => {
            e.style.transform = t !== void 0 ? t : "none"
        },
        checkIsScrollRoot: e => window.getComputedStyle(e).position === "fixed"
    }),
    vp = y.createContext({
        transformPagePoint: e => e,
        isStatic: !1,
        reducedMotion: "never"
    });
function Ey(e, t) {
    if (typeof e == "function")
        return e(t);
    e != null && (e.current = t)
}
function OO(...e) {
    return t => {
        let n = !1;
        const r = e.map(i => {
            const s = Ey(i, t);
            return !n && typeof s == "function" && (n = !0), s
        });
        if (n)
            return () => {
                for (let i = 0; i < r.length; i++) {
                    const s = r[i];
                    typeof s == "function" ? s() : Ey(e[i], null)
                }
            }
    }
}
function IO(...e) {
    return y.useCallback(OO(...e), e)
}
class DO extends y.Component {
    getSnapshotBeforeUpdate(t)
    {
        const n = this.props.childRef.current;
        if (n && t.isPresent && !this.props.isPresent) {
            const r = n.offsetParent,
                i = cf(r) && r.offsetWidth || 0,
                s = cf(r) && r.offsetHeight || 0,
                o = this.props.sizeRef.current;
            o.height = n.offsetHeight || 0,
            o.width = n.offsetWidth || 0,
            o.top = n.offsetTop,
            o.left = n.offsetLeft,
            o.right = i - o.width - o.left,
            o.bottom = s - o.height - o.top
        }
        return null
    }
    componentDidUpdate() {}
    render()
    {
        return this.props.children
    }
}
function LO({children: e, isPresent: t, anchorX: n, anchorY: r, root: i}) {
    var f;
    const s = y.useId(),
        o = y.useRef(null),
        a = y.useRef({
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }),
        {nonce: l} = y.useContext(vp),
        u = ((f = e.props) == null ? void 0 : f.ref) ?? (e == null ? void 0 : e.ref),
        d = IO(o, u);
    return y.useInsertionEffect(() => {
        const {width: h, height: p, top: b, left: m, right: w, bottom: v} = a.current;
        if (t || !o.current || !h || !p)
            return;
        const g = n === "left" ? `left: ${m}` : `right: ${w}`,
            x = r === "bottom" ? `bottom: ${v}` : `top: ${b}`;
        o.current.dataset.motionPopId = s;
        const S = document.createElement("style");
        l && (S.nonce = l);
        const C = i ?? document.head;
        return C.appendChild(S), S.sheet && S.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${
        h}px !important;
            height: ${p}px !important;
            ${g}px !important;
            ${x}px !important;
          }
        `

        ), () => {
            C.contains(S) && C.removeChild(S)
        }
    }, [t]), c.jsx(DO, {
        isPresent: t,
        childRef: o,
        sizeRef: a,
        children: y.cloneElement(e, {
            ref: d
        })
    })
}
const _O = ({children: e, initial: t, isPresent: n, onExitComplete: r, custom: i, presenceAffectsLayout: s, mode: o, anchorX: a, anchorY: l, root: u}) => {
    const d = Hh(VO),
        f = y.useId();
    let h = !0,
        p = y.useMemo(() => (h = !1, {
            id: f,
            initial: t,
            isPresent: n,
            custom: i,
            onExitComplete: b => {
                d.set(b, !0);
                for (const m of d.values())
                    if (!m)
                        return;
                r && r()
            },
            register: b => (d.set(b, !1), () => d.delete(b))
        }), [n, d, r]);
    return s && h && (p = {
        ...p
    }), y.useMemo(() => {
        d.forEach((b, m) => d.set(m, !1))
    }, [n]), y.useEffect(() => {
        !n && !d.size && r && r()
    }, [n]), o === "popLayout" && (e = c.jsx(LO, {
        isPresent: n,
        anchorX: a,
        anchorY: l,
        root: u,
        children: e
    })), c.jsx(mc.Provider, {
        value: p,
        children: e
    })
};
function VO() {
    return new Map
}
function Ab(e=!0) {
    const t = y.useContext(mc);
    if (t === null)
        return [!0, null];
    const {isPresent: n, onExitComplete: r, register: i} = t,
        s = y.useId();
    y.useEffect(() => {
        if (e)
            return i(s)
    }, [e]);
    const o = y.useCallback(() => e && r && r(s), [s, r, e]);
    return !n && r ? [!1, o] : [!0]
}
const Ea = e => e.key || "";
function Ny(e) {
    const t = [];
    return y.Children.forEach(e, n => {
        y.isValidElement(n) && t.push(n)
    }), t
}
const FO = ({children: e, custom: t, initial: n=!0, onExitComplete: r, presenceAffectsLayout: i=!0, mode: s="sync", propagate: o=!1, anchorX: a="left", anchorY: l="top", root: u}) => {
        const [d, f] = Ab(o),
            h = y.useMemo(() => Ny(e), [e]),
            p = o && !d ? [] : h.map(Ea),
            b = y.useRef(!0),
            m = y.useRef(h),
            w = Hh(() => new Map),
            v = y.useRef(new Set),
            [g, x] = y.useState(h),
            [S, C] = y.useState(h);
        c1(() => {
            b.current = !1,
            m.current = h;
            for (let T = 0; T < S.length; T++) {
                const k = Ea(S[T]);
                p.includes(k) ? (w.delete(k), v.current.delete(k)) : w.get(k) !== !0 && w.set(k, !1)
            }
        }, [S, p.length, p.join("-")]);
        const E = [];
        if (h !== g) {
            let T = [...h];
            for (let k = 0; k < S.length; k++) {
                const A = S[k],
                    z = Ea(A);
                p.includes(z) || (T.splice(k, 0, A), E.push(A))
            }
            return s === "wait" && E.length && (T = E), C(Ny(T)), x(h), null
        }
        const {forceRender: N} = y.useContext(Wh);
        return c.jsx(c.Fragment, {
            children: S.map(T => {
                const k = Ea(T),
                    A = o && !d ? !1 : h === S || p.includes(k),
                    z = () => {
                        if (v.current.has(k))
                            return;
                        if (v.current.add(k), w.has(k))
                            w.set(k, !0);
                        else
                            return;
                        let D = !0;
                        w.forEach(H => {
                            H || (D = !1)
                        }),
                        D && (N == null || N(), C(m.current), o && (f == null || f()), r && r())
                    };
                return c.jsx(_O, {
                    isPresent: A,
                    initial: !b.current || n ? void 0 : !1,
                    custom: t,
                    presenceAffectsLayout: i,
                    mode: s,
                    root: u,
                    onExitComplete: A ? void 0 : z,
                    anchorX: a,
                    anchorY: l,
                    children: T
                }, k)
            })
        })
    },
    Mb = y.createContext({
        strict: !1
    }),
    Ty = {
        animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"],
        exit: ["exit"],
        drag: ["drag", "dragControls"],
        focus: ["whileFocus"],
        hover: ["whileHover", "onHoverStart", "onHoverEnd"],
        tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
        pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
        inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
        layout: ["layout", "layoutId"]
    };
let Py = !1;
function zO() {
    if (Py)
        return;
    const e = {};
    for (const t in Ty)
        e[t] = {
            isEnabled: n => Ty[t].some(r => !!n[r])
        };
    ab(e),
    Py = !0
}
function Ob() {
    return zO(), NM()
}
function BO(e) {
    const t = Ob();
    for (const n in e)
        t[n] = {
            ...t[n],
            ...e[n]
        };
    ab(t)
}
const $O = new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "ignoreStrict", "viewport"]);
function Dl(e) {
    return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || $O.has(e)
}
let Ib = e => !Dl(e);
function UO(e) {
    typeof e == "function" && (Ib = t => t.startsWith("on") ? !Dl(t) : e(t))
}
try {
    UO(require("@emotion/is-prop-valid").default)
} catch {}
function WO(e, t, n) {
    const r = {};
    for (const i in e)
        i === "values" && typeof e.values == "object" || (Ib(i) || n === !0 && Dl(i) || !t && !Dl(i) || e.draggable && i.startsWith("onDrag")) && (r[i] = e[i]);
    return r
}
const xc = y.createContext({});
function HO(e, t) {
    if (vc(e)) {
        const {initial: n, animate: r} = e;
        return {
            initial: n === !1 || Oo(n) ? n : void 0,
            animate: Oo(r) ? r : void 0
        }
    }
    return e.inherit !== !1 ? t : {}
}
function KO(e) {
    const {initial: t, animate: n} = HO(e, y.useContext(xc));
    return y.useMemo(() => ({
        initial: t,
        animate: n
    }), [jy(t), jy(n)])
}
function jy(e) {
    return Array.isArray(e) ? e.join(" ") : e
}
const xp = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {}
});
function Db(e, t, n) {
    for (const r in t)
        !Ze(t[r]) && !pb(r, n) && (e[r] = t[r])
}
function GO({transformTemplate: e}, t) {
    return y.useMemo(() => {
        const n = xp();
        return gp(n, t, e), Object.assign({}, n.vars, n.style)
    }, [t])
}
function qO(e, t) {
    const n = e.style || {},
        r = {};
    return Db(r, n, e), Object.assign(r, GO(e, t)), r
}
function QO(e, t) {
    const n = {},
        r = qO(e, t);
    return e.drag && e.dragListener !== !1 && (n.draggable = !1, r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none", r.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0), n.style = r, n
}
const Lb = () => ({
    ...xp(),
    attrs: {}
});
function YO(e, t, n, r) {
    const i = y.useMemo(() => {
        const s = Lb();
        return mb(s, t, yb(r), e.transformTemplate, e.style), {
            ...s.attrs,
            style: {
                ...s.style
            }
        }
    }, [t]);
    if (e.style) {
        const s = {};
        Db(s, e.style, e),
        i.style = {
            ...s,
            ...i.style
        }
    }
    return i
}
const XO = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];
function wp(e) {
    return typeof e != "string" || e.includes("-") ? !1 : !!(XO.indexOf(e) > -1 || /[A-Z]/u.test(e))
}
function ZO(e, t, n, {latestValues: r}, i, s=!1, o) {
    const l = (o ?? wp(e) ? YO : QO)(t, r, i, e),
        u = WO(t, typeof e == "string", s),
        d = e !== y.Fragment ? {
            ...u,
            ...l,
            ref: n
        } : {},
        {children: f} = t,
        h = y.useMemo(() => Ze(f) ? f.get() : f, [f]);
    return y.createElement(e, {
        ...d,
        children: h
    })
}
function JO({scrapeMotionValuesFromProps: e, createRenderState: t}, n, r, i) {
    return {
        latestValues: eI(n, r, i, e),
        renderState: t()
    }
}
function eI(e, t, n, r) {
    const i = {},
        s = r(e, {});
    for (const h in s)
        i[h] = qa(s[h]);
    let {initial: o, animate: a} = e;
    const l = vc(e),
        u = ob(e);
    t && u && !l && e.inherit !== !1 && (o === void 0 && (o = t.initial), a === void 0 && (a = t.animate));
    let d = n ? n.initial === !1 : !1;
    d = d || o === !1;
    const f = d ? a : o;
    if (f && typeof f != "boolean" && !yc(f)) {
        const h = Array.isArray(f) ? f : [f];
        for (let p = 0; p < h.length; p++) {
            const b = cp(e, h[p]);
            if (b) {
                const {transitionEnd: m, transition: w, ...v} = b;
                for (const g in v) {
                    let x = v[g];
                    if (Array.isArray(x)) {
                        const S = d ? x.length - 1 : 0;
                        x = x[S]
                    }
                    x !== null && (i[g] = x)
                }
                for (const g in m)
                    i[g] = m[g]
            }
        }
    }
    return i
}
const _b = e => (t, n) => {
        const r = y.useContext(xc),
            i = y.useContext(mc),
            s = () => JO(e, t, r, i);
        return n ? s() : Hh(s)
    },
    tI = _b({
        scrapeMotionValuesFromProps: yp,
        createRenderState: xp
    }),
    nI = _b({
        scrapeMotionValuesFromProps: vb,
        createRenderState: Lb
    }),
    rI = Symbol.for("motionComponentSymbol");
function iI(e, t, n) {
    const r = y.useRef(n);
    y.useInsertionEffect(() => {
        r.current = n
    });
    const i = y.useRef(null);
    return y.useCallback(s => {
        var a;
        s && ((a = e.onMount) == null || a.call(e, s)),
        t && (s ? t.mount(s) : t.unmount());
        const o = r.current;
        if (typeof o == "function")
            if (s) {
                const l = o(s);
                typeof l == "function" && (i.current = l)
            } else
                i.current ? (i.current(), i.current = null) : o(s);
        else
            o && (o.current = s)
    }, [t])
}
const Vb = y.createContext({});
function Us(e) {
    return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current")
}
function sI(e, t, n, r, i, s) {
    var v,
        g;
    const {visualElement: o} = y.useContext(xc),
        a = y.useContext(Mb),
        l = y.useContext(mc),
        u = y.useContext(vp).reducedMotion,
        d = y.useRef(null),
        f = y.useRef(!1);
    r = r || a.renderer,
    !d.current && r && (d.current = r(e, {
        visualState: t,
        parent: o,
        props: n,
        presenceContext: l,
        blockInitialAnimation: l ? l.initial === !1 : !1,
        reducedMotionConfig: u,
        isSVG: s
    }), f.current && d.current && (d.current.manuallyAnimateOnMount = !0));
    const h = d.current,
        p = y.useContext(Vb);
    h && !h.projection && i && (h.type === "html" || h.type === "svg") && oI(d.current, n, i, p);
    const b = y.useRef(!1);
    y.useInsertionEffect(() => {
        h && b.current && h.update(n, l)
    });
    const m = n[K1],
        w = y.useRef(!!m && !((v = window.MotionHandoffIsComplete) != null && v.call(window, m)) && ((g = window.MotionHasOptimisedAnimation) == null ? void 0 : g.call(window, m)));
    return c1(() => {
        f.current = !0,
        h && (b.current = !0, window.MotionIsMounted = !0, h.updateFeatures(), h.scheduleRenderMicrotask(), w.current && h.animationState && h.animationState.animateChanges())
    }), y.useEffect(() => {
        h && (!w.current && h.animationState && h.animationState.animateChanges(), w.current && (queueMicrotask(() => {
            var x;
            (x = window.MotionHandoffMarkAsComplete) == null || x.call(window, m)
        }), w.current = !1), h.enteringChildren = void 0)
    }), h
}
function oI(e, t, n, r) {
    const {layoutId: i, layout: s, drag: o, dragConstraints: a, layoutScroll: l, layoutRoot: u, layoutCrossfade: d} = t;
    e.projection = new n(e.latestValues, t["data-framer-portal-id"] ? void 0 : Fb(e.parent)),
    e.projection.setOptions({
        layoutId: i,
        layout: s,
        alwaysMeasureLayout: !!o || a && Us(a),
        visualElement: e,
        animationType: typeof s == "string" ? s : "both",
        initialPromotionConfig: r,
        crossfade: d,
        layoutScroll: l,
        layoutRoot: u
    })
}
function Fb(e) {
    if (e)
        return e.options.allowProjection !== !1 ? e.projection : Fb(e.parent)
}
function vu(e, {forwardMotionProps: t=!1, type: n}={}, r, i) {
    r && BO(r);
    const s = n ? n === "svg" : wp(e),
        o = s ? nI : tI;
    function a(u, d) {
        let f;
        const h = {
                ...y.useContext(vp),
                ...u,
                layoutId: aI(u)
            },
            {isStatic: p} = h,
            b = KO(u),
            m = o(u, p);
        if (!p && l1) {
            lI();
            const w = cI(h);
            f = w.MeasureLayout,
            b.visualElement = sI(e, m, h, i, w.ProjectionNode, s)
        }
        return c.jsxs(xc.Provider, {
            value: b,
            children: [f && b.visualElement ? c.jsx(f, {
                visualElement: b.visualElement,
                ...h
            }) : null, ZO(e, u, iI(m, b.visualElement, d), m, p, t, s)]
        })
    }
    a.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
    const l = y.forwardRef(a);
    return l[rI] = e, l
}
function aI({layoutId: e}) {
    const t = y.useContext(Wh).id;
    return t && e !== void 0 ? t + "-" + e : e
}
function lI(e, t) {
    y.useContext(Mb).strict
}
function cI(e) {
    const t = Ob(),
        {drag: n, layout: r} = t;
    if (!n && !r)
        return {};
    const i = {
        ...n,
        ...r
    };
    return {
        MeasureLayout: n != null && n.isEnabled(e) || r != null && r.isEnabled(e) ? i.MeasureLayout : void 0,
        ProjectionNode: i.ProjectionNode
    }
}
function uI(e, t) {
    if (typeof Proxy > "u")
        return vu;
    const n = new Map,
        r = (s, o) => vu(s, o, e, t),
        i = (s, o) => r(s, o);
    return new Proxy(i, {
        get: (s, o) => o === "create" ? r : (n.has(o) || n.set(o, vu(o, void 0, e, t)), n.get(o))
    })
}
const dI = (e, t) => t.isSVG ?? wp(e) ? new $M(t) : new LM(t, {
    allowProjection: e !== y.Fragment
});
class fI extends Tr {
    constructor(t)
    {
        super(t),
        t.animationState || (t.animationState = GM(t))
    }
    updateAnimationControlsSubscription()
    {
        const {animate: t} = this.node.getProps();
        yc(t) && (this.unmountControls = t.subscribe(this.node))
    }
    mount()
    {
        this.updateAnimationControlsSubscription()
    }
    update()
    {
        const {animate: t} = this.node.getProps(),
            {animate: n} = this.node.prevProps || {};
        t !== n && this.updateAnimationControlsSubscription()
    }
    unmount()
    {
        var t;
        this.node.animationState.reset(),
        (t = this.unmountControls) == null || t.call(this)
    }
}
let hI = 0;
class pI extends Tr {
    constructor()
    {
        super(...arguments),
        this.id = hI++
    }
    update()
    {
        if (!this.node.presenceContext)
            return;
        const {isPresent: t, onExitComplete: n} = this.node.presenceContext,
            {isPresent: r} = this.node.prevPresenceContext || {};
        if (!this.node.animationState || t === r)
            return;
        const i = this.node.animationState.setActive("exit", !t);
        n && !t && i.then(() => {
            n(this.id)
        })
    }
    mount()
    {
        const {register: t, onExitComplete: n} = this.node.presenceContext || {};
        n && n(this.id),
        t && (this.unmount = t(this.id))
    }
    unmount() {}
}
const mI = {
    animation: {
        Feature: fI
    },
    exit: {
        Feature: pI
    }
};
function Xo(e) {
    return {
        point: {
            x: e.pageX,
            y: e.pageY
        }
    }
}
const gI = e => t => hp(t) && e(t, Xo(t));
function io(e, t, n, r) {
    return Io(e, t, gI(n), r)
}
const zb = ({current: e}) => e ? e.ownerDocument.defaultView : null,
    ky = (e, t) => Math.abs(e - t);
function yI(e, t) {
    const n = ky(e.x, t.x),
        r = ky(e.y, t.y);
    return Math.sqrt(n ** 2 + r ** 2)
}
const Ry = new Set(["auto", "scroll"]);
class Bb {
    constructor(t, n, {transformPagePoint: r, contextWindow: i=window, dragSnapToOrigin: s=!1, distanceThreshold: o=3, element: a}={})
    {
        if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = new Map, this.removeScrollListeners = null, this.onElementScroll = p => {
            this.handleScroll(p.target)
        }, this.onWindowScroll = () => {
            this.handleScroll(window)
        }, this.updatePoint = () => {
            if (!(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const p = wu(this.lastMoveEventInfo, this.history),
                b = this.startEvent !== null,
                m = yI(p.offset, {
                    x: 0,
                    y: 0
                }) >= this.distanceThreshold;
            if (!b && !m)
                return;
            const {point: w} = p,
                {timestamp: v} = $e;
            this.history.push({
                ...w,
                timestamp: v
            });
            const {onStart: g, onMove: x} = this.handlers;
            b || (g && g(this.lastMoveEvent, p), this.startEvent = this.lastMoveEvent),
            x && x(this.lastMoveEvent, p)
        }, this.handlePointerMove = (p, b) => {
            this.lastMoveEvent = p,
            this.lastMoveEventInfo = xu(b, this.transformPagePoint),
            ve.update(this.updatePoint, !0)
        }, this.handlePointerUp = (p, b) => {
            this.end();
            const {onEnd: m, onSessionEnd: w, resumeAnimation: v} = this.handlers;
            if ((this.dragSnapToOrigin || !this.startEvent) && v && v(), !(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const g = wu(p.type === "pointercancel" ? this.lastMoveEventInfo : xu(b, this.transformPagePoint), this.history);
            this.startEvent && m && m(p, g),
            w && w(p, g)
        }, !hp(t))
            return;
        this.dragSnapToOrigin = s,
        this.handlers = n,
        this.transformPagePoint = r,
        this.distanceThreshold = o,
        this.contextWindow = i || window;
        const l = Xo(t),
            u = xu(l, this.transformPagePoint),
            {point: d} = u,
            {timestamp: f} = $e;
        this.history = [{
            ...d,
            timestamp: f
        }];
        const {onSessionStart: h} = n;
        h && h(t, wu(u, this.history)),
        this.removeListeners = qo(io(this.contextWindow, "pointermove", this.handlePointerMove), io(this.contextWindow, "pointerup", this.handlePointerUp), io(this.contextWindow, "pointercancel", this.handlePointerUp)),
        a && this.startScrollTracking(a)
    }
    startScrollTracking(t)
    {
        let n = t.parentElement;
        for (; n;) {
            const r = getComputedStyle(n);
            (Ry.has(r.overflowX) || Ry.has(r.overflowY)) && this.scrollPositions.set(n, {
                x: n.scrollLeft,
                y: n.scrollTop
            }),
            n = n.parentElement
        }
        this.scrollPositions.set(window, {
            x: window.scrollX,
            y: window.scrollY
        }),
        window.addEventListener("scroll", this.onElementScroll, {
            capture: !0,
            passive: !0
        }),
        window.addEventListener("scroll", this.onWindowScroll, {
            passive: !0
        }),
        this.removeScrollListeners = () => {
            window.removeEventListener("scroll", this.onElementScroll, {
                capture: !0
            }),
            window.removeEventListener("scroll", this.onWindowScroll)
        }
    }
    handleScroll(t)
    {
        const n = this.scrollPositions.get(t);
        if (!n)
            return;
        const r = t === window,
            i = r ? {
                x: window.scrollX,
                y: window.scrollY
            } : {
                x: t.scrollLeft,
                y: t.scrollTop
            },
            s = {
                x: i.x - n.x,
                y: i.y - n.y
            };
        s.x === 0 && s.y === 0 || (r ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += s.x, this.lastMoveEventInfo.point.y += s.y) : this.history.length > 0 && (this.history[0].x -= s.x, this.history[0].y -= s.y), this.scrollPositions.set(t, i), ve.update(this.updatePoint, !0))
    }
    updateHandlers(t)
    {
        this.handlers = t
    }
    end()
    {
        this.removeListeners && this.removeListeners(),
        this.removeScrollListeners && this.removeScrollListeners(),
        this.scrollPositions.clear(),
        wr(this.updatePoint)
    }
}
function xu(e, t) {
    return t ? {
        point: t(e.point)
    } : e
}
function Ay(e, t) {
    return {
        x: e.x - t.x,
        y: e.y - t.y
    }
}
function wu({point: e}, t) {
    return {
        point: e,
        delta: Ay(e, $b(t)),
        offset: Ay(e, vI(t)),
        velocity: xI(t, .1)
    }
}
function vI(e) {
    return e[0]
}
function $b(e) {
    return e[e.length - 1]
}
function xI(e, t) {
    if (e.length < 2)
        return {
            x: 0,
            y: 0
        };
    let n = e.length - 1,
        r = null;
    const i = $b(e);
    for (; n >= 0 && (r = e[n], !(i.timestamp - r.timestamp > yn(t)));)
        n--;
    if (!r)
        return {
            x: 0,
            y: 0
        };
    const s = Mt(i.timestamp - r.timestamp);
    if (s === 0)
        return {
            x: 0,
            y: 0
        };
    const o = {
        x: (i.x - r.x) / s,
        y: (i.y - r.y) / s
    };
    return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o
}
function wI(e, {min: t, max: n}, r) {
    return t !== void 0 && e < t ? e = r ? Ce(t, e, r.min) : Math.max(e, t) : n !== void 0 && e > n && (e = r ? Ce(n, e, r.max) : Math.min(e, n)), e
}
function My(e, t, n) {
    return {
        min: t !== void 0 ? e.min + t : void 0,
        max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0
    }
}
function bI(e, {top: t, left: n, bottom: r, right: i}) {
    return {
        x: My(e.x, n, i),
        y: My(e.y, t, r)
    }
}
function Oy(e, t) {
    let n = t.min - e.min,
        r = t.max - e.max;
    return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), {
        min: n,
        max: r
    }
}
function SI(e, t) {
    return {
        x: Oy(e.x, t.x),
        y: Oy(e.y, t.y)
    }
}
function CI(e, t) {
    let n = .5;
    const r = st(e),
        i = st(t);
    return i > r ? n = Ro(t.min, t.max - r, e.min) : r > i && (n = Ro(e.min, e.max - i, t.min)), wn(0, 1, n)
}
function EI(e, t) {
    const n = {};
    return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n
}
const pf = .35;
function NI(e=pf) {
    return e === !1 ? e = 0 : e === !0 && (e = pf), {
        x: Iy(e, "left", "right"),
        y: Iy(e, "top", "bottom")
    }
}
function Iy(e, t, n) {
    return {
        min: Dy(e, t),
        max: Dy(e, n)
    }
}
function Dy(e, t) {
    return typeof e == "number" ? e : e[t] || 0
}
const TI = new WeakMap;
class PI {
    constructor(t)
    {
        this.openDragLock = null,
        this.isDragging = !1,
        this.currentDirection = null,
        this.originPoint = {
            x: 0,
            y: 0
        },
        this.constraints = !1,
        this.hasMutatedConstraints = !1,
        this.elastic = De(),
        this.latestPointerEvent = null,
        this.latestPanInfo = null,
        this.visualElement = t
    }
    start(t, {snapToCursor: n=!1, distanceThreshold: r}={})
    {
        const {presenceContext: i} = this.visualElement;
        if (i && i.isPresent === !1)
            return;
        const s = f => {
                n ? (this.stopAnimation(), this.snapToCursor(Xo(f).point)) : this.pauseAnimation()
            },
            o = (f, h) => {
                this.stopAnimation();
                const {drag: p, dragPropagation: b, onDragStart: m} = this.getProps();
                if (p && !b && (this.openDragLock && this.openDragLock(), this.openDragLock = hM(p), !this.openDragLock))
                    return;
                this.latestPointerEvent = f,
                this.latestPanInfo = h,
                this.isDragging = !0,
                this.currentDirection = null,
                this.resolveConstraints(),
                this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0),
                Pt(v => {
                    let g = this.getAxisMotionValue(v).get() || 0;
                    if (vn.test(g)) {
                        const {projection: x} = this.visualElement;
                        if (x && x.layout) {
                            const S = x.layout.layoutBox[v];
                            S && (g = st(S) * (parseFloat(g) / 100))
                        }
                    }
                    this.originPoint[v] = g
                }),
                m && ve.postRender(() => m(f, h)),
                of(this.visualElement, "transform");
                const {animationState: w} = this.visualElement;
                w && w.setActive("whileDrag", !0)
            },
            a = (f, h) => {
                this.latestPointerEvent = f,
                this.latestPanInfo = h;
                const {dragPropagation: p, dragDirectionLock: b, onDirectionLock: m, onDrag: w} = this.getProps();
                if (!p && !this.openDragLock)
                    return;
                const {offset: v} = h;
                if (b && this.currentDirection === null) {
                    this.currentDirection = jI(v),
                    this.currentDirection !== null && m && m(this.currentDirection);
                    return
                }
                this.updateAxis("x", h.point, v),
                this.updateAxis("y", h.point, v),
                this.visualElement.render(),
                w && w(f, h)
            },
            l = (f, h) => {
                this.latestPointerEvent = f,
                this.latestPanInfo = h,
                this.stop(f, h),
                this.latestPointerEvent = null,
                this.latestPanInfo = null
            },
            u = () => Pt(f => {
                var h;
                return this.getAnimationState(f) === "paused" && ((h = this.getAxisMotionValue(f).animation) == null ? void 0 : h.play())
            }),
            {dragSnapToOrigin: d} = this.getProps();
        this.panSession = new Bb(t, {
            onSessionStart: s,
            onStart: o,
            onMove: a,
            onSessionEnd: l,
            resumeAnimation: u
        }, {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin: d,
            distanceThreshold: r,
            contextWindow: zb(this.visualElement),
            element: this.visualElement.current
        })
    }
    stop(t, n)
    {
        const r = t || this.latestPointerEvent,
            i = n || this.latestPanInfo,
            s = this.isDragging;
        if (this.cancel(), !s || !i || !r)
            return;
        const {velocity: o} = i;
        this.startAnimation(o);
        const {onDragEnd: a} = this.getProps();
        a && ve.postRender(() => a(r, i))
    }
    cancel()
    {
        this.isDragging = !1;
        const {projection: t, animationState: n} = this.visualElement;
        t && (t.isAnimationBlocked = !1),
        this.endPanSession();
        const {dragPropagation: r} = this.getProps();
        !r && this.openDragLock && (this.openDragLock(), this.openDragLock = null),
        n && n.setActive("whileDrag", !1)
    }
    endPanSession()
    {
        this.panSession && this.panSession.end(),
        this.panSession = void 0
    }
    updateAxis(t, n, r)
    {
        const {drag: i} = this.getProps();
        if (!r || !Na(t, i, this.currentDirection))
            return;
        const s = this.getAxisMotionValue(t);
        let o = this.originPoint[t] + r[t];
        this.constraints && this.constraints[t] && (o = wI(o, this.constraints[t], this.elastic[t])),
        s.set(o)
    }
    resolveConstraints()
    {
        var s;
        const {dragConstraints: t, dragElastic: n} = this.getProps(),
            r = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (s = this.visualElement.projection) == null ? void 0 : s.layout,
            i = this.constraints;
        t && Us(t) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t && r ? this.constraints = bI(r.layoutBox, t) : this.constraints = !1,
        this.elastic = NI(n),
        i !== this.constraints && r && this.constraints && !this.hasMutatedConstraints && Pt(o => {
            this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = EI(r.layoutBox[o], this.constraints[o]))
        })
    }
    resolveRefConstraints()
    {
        const {dragConstraints: t, onMeasureDragConstraints: n} = this.getProps();
        if (!t || !Us(t))
            return !1;
        const r = t.current;
        ds(r !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
        const {projection: i} = this.visualElement;
        if (!i || !i.layout)
            return !1;
        const s = RM(r, i.root, this.visualElement.getTransformPagePoint());
        let o = SI(i.layout.layoutBox, s);
        if (n) {
            const a = n(PM(o));
            this.hasMutatedConstraints = !!a,
            a && (o = cb(a))
        }
        return o
    }
    startAnimation(t)
    {
        const {drag: n, dragMomentum: r, dragElastic: i, dragTransition: s, dragSnapToOrigin: o, onDragTransitionEnd: a} = this.getProps(),
            l = this.constraints || {},
            u = Pt(d => {
                if (!Na(d, n, this.currentDirection))
                    return;
                let f = l && l[d] || {};
                o && (f = {
                    min: 0,
                    max: 0
                });
                const h = i ? 200 : 1e6,
                    p = i ? 40 : 1e7,
                    b = {
                        type: "inertia",
                        velocity: r ? t[d] : 0,
                        bounceStiffness: h,
                        bounceDamping: p,
                        timeConstant: 750,
                        restDelta: 1,
                        restSpeed: 10,
                        ...s,
                        ...f
                    };
                return this.startAxisValueAnimation(d, b)
            });
        return Promise.all(u).then(a)
    }
    startAxisValueAnimation(t, n)
    {
        const r = this.getAxisMotionValue(t);
        return of(this.visualElement, t), r.start(lp(t, r, 0, n, this.visualElement, !1))
    }
    stopAnimation()
    {
        Pt(t => this.getAxisMotionValue(t).stop())
    }
    pauseAnimation()
    {
        Pt(t => {
            var n;
            return (n = this.getAxisMotionValue(t).animation) == null ? void 0 : n.pause()
        })
    }
    getAnimationState(t)
    {
        var n;
        return (n = this.getAxisMotionValue(t).animation) == null ? void 0 : n.state
    }
    getAxisMotionValue(t)
    {
        const n = `_drag${t.toUpperCase()}`,
            r = this.visualElement.getProps(),
            i = r[n];
        return i || this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0)
    }
    snapToCursor(t)
    {
        Pt(n => {
            const {drag: r} = this.getProps();
            if (!Na(n, r, this.currentDirection))
                return;
            const {projection: i} = this.visualElement,
                s = this.getAxisMotionValue(n);
            if (i && i.layout) {
                const {min: o, max: a} = i.layout.layoutBox[n],
                    l = s.get() || 0;
                s.set(t[n] - Ce(o, a, .5) + l)
            }
        })
    }
    scalePositionWithinConstraints()
    {
        if (!this.visualElement.current)
            return;
        const {drag: t, dragConstraints: n} = this.getProps(),
            {projection: r} = this.visualElement;
        if (!Us(n) || !r || !this.constraints)
            return;
        this.stopAnimation();
        const i = {
            x: 0,
            y: 0
        };
        Pt(o => {
            const a = this.getAxisMotionValue(o);
            if (a && this.constraints !== !1) {
                const l = a.get();
                i[o] = CI({
                    min: l,
                    max: l
                }, this.constraints[o])
            }
        });
        const {transformTemplate: s} = this.visualElement.getProps();
        this.visualElement.current.style.transform = s ? s({}, "") : "none",
        r.root && r.root.updateScroll(),
        r.updateLayout(),
        this.resolveConstraints(),
        Pt(o => {
            if (!Na(o, t, null))
                return;
            const a = this.getAxisMotionValue(o),
                {min: l, max: u} = this.constraints[o];
            a.set(Ce(l, u, i[o]))
        })
    }
    addListeners()
    {
        if (!this.visualElement.current)
            return;
        TI.set(this.visualElement, this);
        const t = this.visualElement.current,
            n = io(t, "pointerdown", l => {
                const {drag: u, dragListener: d=!0} = this.getProps(),
                    f = l.target,
                    h = f !== t && rb(f);
                u && d && !h && this.start(l)
            }),
            r = () => {
                const {dragConstraints: l} = this.getProps();
                Us(l) && l.current && (this.constraints = this.resolveRefConstraints())
            },
            {projection: i} = this.visualElement,
            s = i.addEventListener("measure", r);
        i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()),
        ve.read(r);
        const o = Io(window, "resize", () => this.scalePositionWithinConstraints()),
            a = i.addEventListener("didUpdate", ({delta: l, hasLayoutChanged: u}) => {
                this.isDragging && u && (Pt(d => {
                    const f = this.getAxisMotionValue(d);
                    f && (this.originPoint[d] += l[d].translate, f.set(f.get() + l[d].translate))
                }), this.visualElement.render())
            });
        return () => {
            o(),
            n(),
            s(),
            a && a()
        }
    }
    getProps()
    {
        const t = this.visualElement.getProps(),
            {drag: n=!1, dragDirectionLock: r=!1, dragPropagation: i=!1, dragConstraints: s=!1, dragElastic: o=pf, dragMomentum: a=!0} = t;
        return {
            ...t,
            drag: n,
            dragDirectionLock: r,
            dragPropagation: i,
            dragConstraints: s,
            dragElastic: o,
            dragMomentum: a
        }
    }
}
function Na(e, t, n) {
    return (t === !0 || t === e) && (n === null || n === e)
}
function jI(e, t=10) {
    let n = null;
    return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n
}
class kI extends Tr {
    constructor(t)
    {
        super(t),
        this.removeGroupControls = It,
        this.removeListeners = It,
        this.controls = new PI(t)
    }
    mount()
    {
        const {dragControls: t} = this.node.getProps();
        t && (this.removeGroupControls = t.subscribe(this.controls)),
        this.removeListeners = this.controls.addListeners() || It
    }
    update()
    {
        const {dragControls: t} = this.node.getProps(),
            {dragControls: n} = this.node.prevProps || {};
        t !== n && (this.removeGroupControls(), t && (this.removeGroupControls = t.subscribe(this.controls)))
    }
    unmount()
    {
        this.removeGroupControls(),
        this.removeListeners(),
        this.controls.isDragging || this.controls.endPanSession()
    }
}
const Ly = e => (t, n) => {
    e && ve.postRender(() => e(t, n))
};
class RI extends Tr {
    constructor()
    {
        super(...arguments),
        this.removePointerDownListener = It
    }
    onPointerDown(t)
    {
        this.session = new Bb(t, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: zb(this.node)
        })
    }
    createPanHandlers()
    {
        const {onPanSessionStart: t, onPanStart: n, onPan: r, onPanEnd: i} = this.node.getProps();
        return {
            onSessionStart: Ly(t),
            onStart: Ly(n),
            onMove: r,
            onEnd: (s, o) => {
                delete this.session,
                i && ve.postRender(() => i(s, o))
            }
        }
    }
    mount()
    {
        this.removePointerDownListener = io(this.node.current, "pointerdown", t => this.onPointerDown(t))
    }
    update()
    {
        this.session && this.session.updateHandlers(this.createPanHandlers())
    }
    unmount()
    {
        this.removePointerDownListener(),
        this.session && this.session.end()
    }
}
let bu = !1;
class AI extends y.Component {
    componentDidMount()
    {
        const {visualElement: t, layoutGroup: n, switchLayoutGroup: r, layoutId: i} = this.props,
            {projection: s} = t;
        s && (n.group && n.group.add(s), r && r.register && i && r.register(s), bu && s.root.didUpdate(), s.addEventListener("animationComplete", () => {
            this.safeToRemove()
        }), s.setOptions({
            ...s.options,
            layoutDependency: this.props.layoutDependency,
            onExitComplete: () => this.safeToRemove()
        })),
        Qa.hasEverUpdated = !0
    }
    getSnapshotBeforeUpdate(t)
    {
        const {layoutDependency: n, visualElement: r, drag: i, isPresent: s} = this.props,
            {projection: o} = r;
        return o && (o.isPresent = s, t.layoutDependency !== n && o.setOptions({
            ...o.options,
            layoutDependency: n
        }), bu = !0, i || t.layoutDependency !== n || n === void 0 || t.isPresent !== s ? o.willUpdate() : this.safeToRemove(), t.isPresent !== s && (s ? o.promote() : o.relegate() || ve.postRender(() => {
            const a = o.getStack();
            (!a || !a.members.length) && this.safeToRemove()
        }))), null
    }
    componentDidUpdate()
    {
        const {projection: t} = this.props.visualElement;
        t && (t.root.didUpdate(), fp.postRender(() => {
            !t.currentAnimation && t.isLead() && this.safeToRemove()
        }))
    }
    componentWillUnmount()
    {
        const {visualElement: t, layoutGroup: n, switchLayoutGroup: r} = this.props,
            {projection: i} = t;
        bu = !0,
        i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), r && r.deregister && r.deregister(i))
    }
    safeToRemove()
    {
        const {safeToRemove: t} = this.props;
        t && t()
    }
    render()
    {
        return null
    }
}
function Ub(e) {
    const [t, n] = Ab(),
        r = y.useContext(Wh);
    return c.jsx(AI, {
        ...e,
        layoutGroup: r,
        switchLayoutGroup: y.useContext(Vb),
        isPresent: t,
        safeToRemove: n
    })
}
const MI = {
    pan: {
        Feature: RI
    },
    drag: {
        Feature: kI,
        ProjectionNode: Rb,
        MeasureLayout: Ub
    }
};
function _y(e, t, n) {
    const {props: r} = e;
    e.animationState && r.whileHover && e.animationState.setActive("whileHover", n === "Start");
    const i = "onHover" + n,
        s = r[i];
    s && ve.postRender(() => s(t, Xo(t)))
}
class OI extends Tr {
    mount()
    {
        const {current: t} = this.node;
        t && (this.unmount = pM(t, (n, r) => (_y(this.node, r, "Start"), i => _y(this.node, i, "End"))))
    }
    unmount() {}
}
class II extends Tr {
    constructor()
    {
        super(...arguments),
        this.isActive = !1
    }
    onFocus()
    {
        let t = !1;
        try {
            t = this.node.current.matches(":focus-visible")
        } catch {
            t = !0
        }
        !t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0)
    }
    onBlur()
    {
        !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1)
    }
    mount()
    {
        this.unmount = qo(Io(this.node.current, "focus", () => this.onFocus()), Io(this.node.current, "blur", () => this.onBlur()))
    }
    unmount() {}
}
function Vy(e, t, n) {
    const {props: r} = e;
    if (e.current instanceof HTMLButtonElement && e.current.disabled)
        return;
    e.animationState && r.whileTap && e.animationState.setActive("whileTap", n === "Start");
    const i = "onTap" + (n === "End" ? "" : n),
        s = r[i];
    s && ve.postRender(() => s(t, Xo(t)))
}
class DI extends Tr {
    mount()
    {
        const {current: t} = this.node;
        t && (this.unmount = yM(t, (n, r) => (Vy(this.node, r, "Start"), (i, {success: s}) => Vy(this.node, i, s ? "End" : "Cancel")), {
            useGlobalTarget: this.node.props.globalTapTarget
        }))
    }
    unmount() {}
}
const mf = new WeakMap,
    Su = new WeakMap,
    LI = e => {
        const t = mf.get(e.target);
        t && t(e)
    },
    _I = e => {
        e.forEach(LI)
    };
function VI({root: e, ...t}) {
    const n = e || document;
    Su.has(n) || Su.set(n, {});
    const r = Su.get(n),
        i = JSON.stringify(t);
    return r[i] || (r[i] = new IntersectionObserver(_I, {
        root: e,
        ...t
    })), r[i]
}
function FI(e, t, n) {
    const r = VI(t);
    return mf.set(e, n), r.observe(e), () => {
        mf.delete(e),
        r.unobserve(e)
    }
}
const zI = {
    some: 0,
    all: 1
};
class BI extends Tr {
    constructor()
    {
        super(...arguments),
        this.hasEnteredView = !1,
        this.isInView = !1
    }
    startObserver()
    {
        this.unmount();
        const {viewport: t={}} = this.node.getProps(),
            {root: n, margin: r, amount: i="some", once: s} = t,
            o = {
                root: n ? n.current : void 0,
                rootMargin: r,
                threshold: typeof i == "number" ? i : zI[i]
            },
            a = l => {
                const {isIntersecting: u} = l;
                if (this.isInView === u || (this.isInView = u, s && !u && this.hasEnteredView))
                    return;
                u && (this.hasEnteredView = !0),
                this.node.animationState && this.node.animationState.setActive("whileInView", u);
                const {onViewportEnter: d, onViewportLeave: f} = this.node.getProps(),
                    h = u ? d : f;
                h && h(l)
            };
        return FI(this.node.current, o, a)
    }
    mount()
    {
        this.startObserver()
    }
    update()
    {
        if (typeof IntersectionObserver > "u")
            return;
        const {props: t, prevProps: n} = this.node;
        ["amount", "margin", "root"].some($I(t, n)) && this.startObserver()
    }
    unmount() {}
}
function $I({viewport: e={}}, {viewport: t={}}={}) {
    return n => e[n] !== t[n]
}
const UI = {
        inView: {
            Feature: BI
        },
        tap: {
            Feature: DI
        },
        focus: {
            Feature: II
        },
        hover: {
            Feature: OI
        }
    },
    WI = {
        layout: {
            ProjectionNode: Rb,
            MeasureLayout: Ub
        }
    },
    HI = {
        ...mI,
        ...UI,
        ...MI,
        ...WI
    },
    F = uI(HI, dI),
    KI = Eh("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-body", {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                gold: "bg-gold text-charcoal font-semibold hover:bg-gold-light shadow-lg hover:shadow-xl transition-all duration-300",
                goldOutline: "border-2 border-gold text-gold hover:bg-gold hover:text-charcoal font-semibold transition-all duration-300",
                institutional: "bg-charcoal-light border border-border text-foreground hover:bg-charcoal-medium hover:border-gold/50 transition-all duration-300",
                hero: "bg-gold text-charcoal font-semibold text-base px-8 py-6 hover:bg-gold-light shadow-lg hover:shadow-[0_0_40px_-10px_hsl(43_74%_49%_/_0.4)] transition-all duration-300",
                heroOutline: "border-2 border-gold/60 text-foreground hover:border-gold hover:bg-gold/10 font-semibold text-base px-8 py-6 transition-all duration-300",
                nav: "text-neutral-300 hover:text-foreground font-medium transition-colors duration-200",
                navActive: "text-gold font-medium"
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                xl: "h-14 rounded-md px-10 text-base",
                icon: "h-10 w-10"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }),
    fe = y.forwardRef(({className: e, variant: t, size: n, asChild: r=!1, ...i}, s) => {
        const o = r ? PN : "button";
        return c.jsx(o, {
            className: Ve(KI({
                variant: t,
                size: n,
                className: e
            })),
            ref: s,
            ...i
        })
    });
fe.displayName = "Button";
const Fy = [{
        label: "About",
        href: "/about"
    }, {
        label: "Product",
        href: "/product"
    }, {
        label: "Solutions",
        href: "/solutions"
    }, {
        label: "Platform",
        href: "/platform"
    }, {
        label: "Partnerships",
        href: "/partnerships"
    }, {
        label: "Contact",
        href: "/contact"
    }],
    GI = () => {
        const [e, t] = y.useState(!1),
            n = ws();
        return c.jsxs("header", {
            className: "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border",
            children: [c.jsx("div", {
                className: "section-container",
                children: c.jsxs("div", {
                    className: "flex items-center justify-between h-16 lg:h-20",
                    children: [c.jsxs(ae, {
                        to: "/",
                        className: "flex items-center gap-3",
                        children: [c.jsx("div", {
                            className: "w-10 h-10 bg-gold rounded-sm flex items-center justify-center",
                            children: c.jsx("span", {
                                className: "font-heading font-bold text-charcoal text-lg",
                                children: "C"
                            })
                        }), c.jsxs("span", {
                            className: "font-heading font-bold text-xl tracking-tight text-foreground",
                            children: ["CONTROL", c.jsx("span", {
                                className: "text-gold",
                                children: "HQ"
                            })]
                        })]
                    }), c.jsx("nav", {
                        className: "hidden lg:flex items-center gap-1",
                        children: Fy.map(r => c.jsx(ae, {
                            to: r.href,
                            children: c.jsx(fe, {
                                variant: n.pathname === r.href ? "navActive" : "nav",
                                size: "sm",
                                children: r.label
                            })
                        }, r.href))
                    }), c.jsxs("div", {
                        className: "hidden lg:flex items-center gap-3",
                        children: [c.jsx(ae, {
                            to: "/app",
                            children: c.jsxs(fe, {
                                variant: "institutional",
                                size: "sm",
                                className: "gap-2",
                                children: [c.jsx(ri, {
                                    className: "w-4 h-4"
                                }), "Secure Login"]
                            })
                        }), c.jsx(ae, {
                            to: "/request-access",
                            children: c.jsx(fe, {
                                variant: "gold",
                                size: "sm",
                                children: "Request Access"
                            })
                        })]
                    }), c.jsx("button", {
                        className: "lg:hidden p-2 text-foreground",
                        onClick: () => t(!e),
                        children: e ? c.jsx(tw, {
                            className: "w-6 h-6"
                        }) : c.jsx(IT, {
                            className: "w-6 h-6"
                        })
                    })]
                })
            }), c.jsx(FO, {
                children: e && c.jsx(F.div, {
                    initial: {
                        opacity: 0,
                        height: 0
                    },
                    animate: {
                        opacity: 1,
                        height: "auto"
                    },
                    exit: {
                        opacity: 0,
                        height: 0
                    },
                    className: "lg:hidden bg-card border-b border-border",
                    children: c.jsxs("div", {
                        className: "section-container py-4 space-y-2",
                        children: [Fy.map(r => c.jsx(ae, {
                            to: r.href,
                            onClick: () => t(!1),
                            className: "block",
                            children: c.jsx(fe, {
                                variant: n.pathname === r.href ? "navActive" : "nav",
                                className: "w-full justify-start",
                                children: r.label
                            })
                        }, r.href)), c.jsxs("div", {
                            className: "pt-4 space-y-2 border-t border-border mt-4",
                            children: [c.jsx(ae, {
                                to: "/app",
                                onClick: () => t(!1),
                                children: c.jsxs(fe, {
                                    variant: "institutional",
                                    className: "w-full gap-2",
                                    children: [c.jsx(ri, {
                                        className: "w-4 h-4"
                                    }), "Secure Login"]
                                })
                            }), c.jsx(ae, {
                                to: "/request-access",
                                onClick: () => t(!1),
                                children: c.jsx(fe, {
                                    variant: "gold",
                                    className: "w-full",
                                    children: "Request Access"
                                })
                            })]
                        })]
                    })
                })
            })]
        })
    },
    Cu = {
        platform: [{
            label: "Product",
            href: "/product"
        }, {
            label: "Solutions",
            href: "/solutions"
        }, {
            label: "Platform",
            href: "/platform"
        }, {
            label: "Partnerships",
            href: "/partnerships"
        }],
        institution: [{
            label: "About",
            href: "/about"
        }, {
            label: "Contact",
            href: "/contact"
        }, {
            label: "Request Access",
            href: "/request-access"
        }, {
            label: "Secure Login",
            href: "/login"
        }],
        legal: [{
            label: "Privacy Policy",
            href: "/privacy"
        }, {
            label: "Terms of Service",
            href: "/terms"
        }, {
            label: "Security",
            href: "/security"
        }]
    },
    qI = () => c.jsx("footer", {
        className: "bg-charcoal-light border-t border-border",
        children: c.jsxs("div", {
            className: "section-container py-16",
            children: [c.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12",
                children: [c.jsxs("div", {
                    className: "lg:col-span-2",
                    children: [c.jsxs(ae, {
                        to: "/",
                        className: "flex items-center gap-3 mb-6",
                        children: [c.jsx("div", {
                            className: "w-10 h-10 bg-gold rounded-sm flex items-center justify-center",
                            children: c.jsx("span", {
                                className: "font-heading font-bold text-charcoal text-lg",
                                children: "C"
                            })
                        }), c.jsxs("span", {
                            className: "font-heading font-bold text-xl tracking-tight text-foreground",
                            children: ["CONTROL", c.jsx("span", {
                                className: "text-gold",
                                children: "HQ"
                            })]
                        })]
                    }), c.jsx("p", {
                        className: "text-muted-foreground text-sm leading-relaxed max-w-sm mb-6",
                        children: "Institutional political infrastructure for modern governance. Building structure, enforcing governance, commanding control."
                    }), c.jsxs("div", {
                        className: "flex items-center gap-4",
                        children: [c.jsxs("div", {
                            className: "flex items-center gap-2 text-xs text-muted-foreground",
                            children: [c.jsx(Nr, {
                                className: "w-4 h-4 text-gold"
                            }), c.jsx("span", {
                                children: "Enterprise Security"
                            })]
                        }), c.jsxs("div", {
                            className: "flex items-center gap-2 text-xs text-muted-foreground",
                            children: [c.jsx(ri, {
                                className: "w-4 h-4 text-gold"
                            }), c.jsx("span", {
                                children: "Private Deployments"
                            })]
                        }), c.jsxs("div", {
                            className: "flex items-center gap-2 text-xs text-muted-foreground",
                            children: [c.jsx(Wo, {
                                className: "w-4 h-4 text-gold"
                            }), c.jsx("span", {
                                children: "Africa-Focused"
                            })]
                        })]
                    })]
                }), c.jsxs("div", {
                    children: [c.jsx("h4", {
                        className: "font-heading font-semibold text-foreground mb-4",
                        children: "Platform"
                    }), c.jsx("ul", {
                        className: "space-y-3",
                        children: Cu.platform.map(e => c.jsx("li", {
                            children: c.jsx(ae, {
                                to: e.href,
                                className: "text-sm text-muted-foreground hover:text-gold transition-colors",
                                children: e.label
                            })
                        }, e.href))
                    })]
                }), c.jsxs("div", {
                    children: [c.jsx("h4", {
                        className: "font-heading font-semibold text-foreground mb-4",
                        children: "Institution"
                    }), c.jsx("ul", {
                        className: "space-y-3",
                        children: Cu.institution.map(e => c.jsx("li", {
                            children: c.jsx(ae, {
                                to: e.href,
                                className: "text-sm text-muted-foreground hover:text-gold transition-colors",
                                children: e.label
                            })
                        }, e.href))
                    })]
                }), c.jsxs("div", {
                    children: [c.jsx("h4", {
                        className: "font-heading font-semibold text-foreground mb-4",
                        children: "Legal"
                    }), c.jsx("ul", {
                        className: "space-y-3",
                        children: Cu.legal.map(e => c.jsx("li", {
                            children: c.jsx(ae, {
                                to: e.href,
                                className: "text-sm text-muted-foreground hover:text-gold transition-colors",
                                children: e.label
                            })
                        }, e.href))
                    })]
                })]
            }), c.jsxs("div", {
                className: "mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4",
                children: [c.jsxs("p", {
                    className: "text-xs text-muted-foreground",
                    children: ["© ", new Date().getFullYear(), " CONTROLHQ. Political Infrastructure for Modern Governance."]
                }), c.jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: "controlhq.ng • Institutional Grade • Private Deployments"
                })]
            })]
        })
    }),
    Pr = ({children: e, showFooter: t=!0}) => c.jsxs("div", {
        className: "min-h-screen flex flex-col bg-background",
        children: [c.jsx(GI, {}), c.jsx("main", {
            className: "flex-1 pt-16 lg:pt-20",
            children: e
        }), t && c.jsx(qI, {})]
    }),
    Ta = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: .6
        }
    },
    QI = {
        animate: {
            transition: {
                staggerChildren: .1
            }
        }
    },
    YI = [{
        icon: Nr,
        title: "Structure",
        description: "Institutional frameworks for political organization and governance hierarchy."
    }, {
        icon: Nh,
        title: "Governance",
        description: "Accountability systems and democratic process enforcement at every level."
    }, {
        icon: rc,
        title: "Intelligence",
        description: "Data-driven insights for strategic decision-making and operational awareness."
    }, {
        icon: Ho,
        title: "Mobilization",
        description: "Coordinated field operations and grassroots engagement at scale."
    }],
    XI = [{
        icon: ui,
        name: "Governance Structure Manager",
        desc: "Hierarchical organization and role management"
    }, {
        icon: ic,
        name: "Field Operations Engine",
        desc: "Ground-level coordination and task management"
    }, {
        icon: sc,
        name: "Voter Registry System",
        desc: "Secure electoral data management"
    }, {
        icon: Ho,
        name: "Mobilization Engine",
        desc: "Grassroots engagement and volunteer coordination"
    }, {
        icon: ew,
        name: "Command Center",
        desc: "Real-time operational oversight and control"
    }, {
        icon: rc,
        name: "Analytics Platform",
        desc: "Performance metrics and strategic insights"
    }],
    ZI = [{
        icon: sc,
        label: "Political Campaigns"
    }, {
        icon: ui,
        label: "Political Parties"
    }, {
        icon: Wo,
        label: "NGOs & Civil Society"
    }, {
        icon: Nh,
        label: "Government Institutions"
    }],
    JI = () => c.jsxs(Pr, {
        children: [c.jsxs("section", {
            className: "relative min-h-[90vh] flex items-center hero-gradient overflow-hidden",
            children: [c.jsx("div", {
                className: "absolute inset-0 opacity-5",
                children: c.jsx("div", {
                    className: "absolute inset-0",
                    style: {
                        backgroundImage: `linear-gradient(hsl(var(--gold) / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--gold) / 0.3) 1px, transparent 1px)`
                        ,
                        backgroundSize: "60px 60px"
                    }
                })
            }), c.jsx("div", {
                className: "section-container relative z-10",
                children: c.jsxs(F.div, {
                    className: "max-w-4xl",
                    initial: "initial",
                    animate: "animate",
                    variants: QI,
                    children: [c.jsxs(F.div, {
                        variants: Ta,
                        className: "flex items-center gap-2 mb-6",
                        children: [c.jsx("span", {
                            className: "h-px w-12 bg-gold"
                        }), c.jsx("span", {
                            className: "text-gold text-sm font-medium tracking-widest uppercase",
                            children: "Political Infrastructure"
                        })]
                    }), c.jsxs(F.h1, {
                        variants: Ta,
                        className: "font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6",
                        children: ["Political Infrastructure for", " ", c.jsx("span", {
                            className: "text-gradient-gold",
                            children: "Modern Governance"
                        })]
                    }), c.jsx(F.p, {
                        variants: Ta,
                        className: "text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-3xl mb-10",
                        children: "CONTROLHQ is an institutional political operations platform designed to bring structure, accountability, and governance into grassroots mobilization, democratic organization, and electoral processes."
                    }), c.jsxs(F.div, {
                        variants: Ta,
                        className: "flex flex-col sm:flex-row gap-4",
                        children: [c.jsx(ae, {
                            to: "/request-access",
                            children: c.jsxs(fe, {
                                variant: "hero",
                                size: "xl",
                                className: "w-full sm:w-auto",
                                children: ["Request Access", c.jsx(en, {
                                    className: "w-5 h-5 ml-2"
                                })]
                            })
                        }), c.jsx(ae, {
                            to: "/partnerships",
                            children: c.jsx(fe, {
                                variant: "heroOutline",
                                size: "xl",
                                className: "w-full sm:w-auto",
                                children: "Partner With Us"
                            })
                        })]
                    })]
                })
            }), c.jsx("div", {
                className: "absolute right-0 top-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
            }), c.jsx("div", {
                className: "absolute right-1/4 bottom-1/4 w-64 h-64 bg-gold/10 rounded-full blur-2xl"
            })]
        }), c.jsx("section", {
            className: "py-12 bg-charcoal-light border-y border-border",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs("div", {
                    className: "flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12",
                    children: [c.jsx("p", {
                        className: "text-muted-foreground text-sm tracking-wide",
                        children: "Trusted by political movements, institutions, and governance stakeholders"
                    }), c.jsx("div", {
                        className: "flex items-center gap-3",
                        children: [1, 2, 3, 4].map(e => c.jsx("div", {
                            className: "w-20 h-8 bg-charcoal-medium rounded flex items-center justify-center",
                            children: c.jsxs("span", {
                                className: "text-xs text-muted-foreground",
                                children: ["Partner ", e]
                            })
                        }, e))
                    })]
                })
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32",
            children: c.jsxs("div", {
                className: "section-container",
                children: [c.jsxs(F.div, {
                    className: "text-center mb-16",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    transition: {
                        duration: .6
                    },
                    children: [c.jsx("span", {
                        className: "text-gold text-sm font-medium tracking-widest uppercase mb-4 block",
                        children: "Core Pillars"
                    }), c.jsx("h2", {
                        className: "font-heading text-3xl lg:text-4xl font-bold mb-4",
                        children: "The Foundation of Political Infrastructure"
                    }), c.jsx("p", {
                        className: "text-muted-foreground max-w-2xl mx-auto",
                        children: "CONTROLHQ provides the institutional framework for effective political organization"
                    })]
                }), c.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
                    children: YI.map((e, t) => c.jsxs(F.div, {
                        className: "card-elevated p-8 group hover:border-gold/30 transition-all duration-300",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .5,
                            delay: t * .1
                        },
                        children: [c.jsx("div", {
                            className: "w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors",
                            children: c.jsx(e.icon, {
                                className: "w-7 h-7 text-gold"
                            })
                        }), c.jsx("h3", {
                            className: "font-heading text-xl font-semibold mb-3",
                            children: e.title
                        }), c.jsx("p", {
                            className: "text-muted-foreground text-sm leading-relaxed",
                            children: e.description
                        })]
                    }, e.title))
                })]
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32 bg-charcoal-light",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs(F.div, {
                    className: "grid lg:grid-cols-2 gap-16 items-center",
                    initial: {
                        opacity: 0
                    },
                    whileInView: {
                        opacity: 1
                    },
                    viewport: {
                        once: !0
                    },
                    children: [c.jsxs("div", {
                        children: [c.jsx("span", {
                            className: "text-gold text-sm font-medium tracking-widest uppercase mb-4 block",
                            children: "Product Overview"
                        }), c.jsx("h2", {
                            className: "font-heading text-3xl lg:text-4xl font-bold mb-6",
                            children: "The Political Operating System"
                        }), c.jsx("p", {
                            className: "text-muted-foreground leading-relaxed mb-8",
                            children: "A comprehensive suite of integrated modules designed to power every aspect of political operations—from governance structure to field mobilization, from voter management to real-time analytics."
                        }), c.jsx(ae, {
                            to: "/product",
                            children: c.jsxs(fe, {
                                variant: "goldOutline",
                                children: ["Explore the Platform", c.jsx(en, {
                                    className: "w-4 h-4 ml-2"
                                })]
                            })
                        })]
                    }), c.jsx("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                        children: XI.map((e, t) => c.jsxs(F.div, {
                            className: "p-5 bg-card border border-border rounded-lg hover:border-gold/30 transition-all duration-300",
                            initial: {
                                opacity: 0,
                                x: 20
                            },
                            whileInView: {
                                opacity: 1,
                                x: 0
                            },
                            viewport: {
                                once: !0
                            },
                            transition: {
                                duration: .5,
                                delay: t * .1
                            },
                            children: [c.jsx(e.icon, {
                                className: "w-5 h-5 text-gold mb-3"
                            }), c.jsx("h4", {
                                className: "font-heading font-semibold text-sm mb-1",
                                children: e.name
                            }), c.jsx("p", {
                                className: "text-xs text-muted-foreground",
                                children: e.desc
                            })]
                        }, e.name))
                    })]
                })
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32",
            children: c.jsxs("div", {
                className: "section-container",
                children: [c.jsxs(F.div, {
                    className: "text-center mb-16",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    children: [c.jsx("span", {
                        className: "text-gold text-sm font-medium tracking-widest uppercase mb-4 block",
                        children: "Built For Institutions"
                    }), c.jsx("h2", {
                        className: "font-heading text-3xl lg:text-4xl font-bold mb-4",
                        children: "Who CONTROLHQ Serves"
                    })]
                }), c.jsx("div", {
                    className: "grid grid-cols-2 lg:grid-cols-4 gap-6",
                    children: ZI.map((e, t) => c.jsxs(F.div, {
                        className: "text-center p-8 border border-border rounded-lg hover:border-gold/30 transition-all duration-300",
                        initial: {
                            opacity: 0,
                            scale: .95
                        },
                        whileInView: {
                            opacity: 1,
                            scale: 1
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .5,
                            delay: t * .1
                        },
                        children: [c.jsx(e.icon, {
                            className: "w-10 h-10 text-gold mx-auto mb-4"
                        }), c.jsx("span", {
                            className: "font-heading font-medium",
                            children: e.label
                        })]
                    }, e.label))
                })]
            })
        }), c.jsxs("section", {
            className: "py-24 lg:py-32 bg-gradient-to-b from-charcoal-light to-background relative overflow-hidden",
            children: [c.jsx("div", {
                className: "absolute inset-0 opacity-5",
                children: c.jsx("div", {
                    className: "absolute inset-0",
                    style: {
                        backgroundImage: "radial-gradient(circle at 50% 50%, hsl(var(--gold) / 0.4) 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }
                })
            }), c.jsx("div", {
                className: "section-container relative z-10",
                children: c.jsxs(F.div, {
                    className: "max-w-3xl mx-auto text-center",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    children: [c.jsxs("h2", {
                        className: "font-heading text-3xl lg:text-5xl font-bold mb-6",
                        children: ["Build structure. Enforce governance.", " ", c.jsx("span", {
                            className: "text-gradient-gold",
                            children: "Command your control."
                        })]
                    }), c.jsx("p", {
                        className: "text-muted-foreground text-lg mb-10",
                        children: "Join the institutions already transforming their political operations with CONTROLHQ infrastructure."
                    }), c.jsxs("div", {
                        className: "flex flex-col sm:flex-row gap-4 justify-center",
                        children: [c.jsx(ae, {
                            to: "/request-access",
                            children: c.jsxs(fe, {
                                variant: "hero",
                                size: "xl",
                                children: ["Request Access", c.jsx(en, {
                                    className: "w-5 h-5 ml-2"
                                })]
                            })
                        }), c.jsx(ae, {
                            to: "/partnerships",
                            children: c.jsx(fe, {
                                variant: "heroOutline",
                                size: "xl",
                                children: "Institutional Partnerships"
                            })
                        })]
                    })]
                })
            })]
        })]
    }),
    Eu = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: .6
        }
    },
    eD = () => c.jsxs(Pr, {
        children: [c.jsx("section", {
            className: "py-24 lg:py-32 hero-gradient",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs(F.div, {
                    className: "max-w-4xl",
                    initial: "initial",
                    animate: "animate",
                    variants: {
                        animate: {
                            transition: {
                                staggerChildren: .1
                            }
                        }
                    },
                    children: [c.jsxs(F.div, {
                        variants: Eu,
                        className: "flex items-center gap-2 mb-6",
                        children: [c.jsx("span", {
                            className: "h-px w-12 bg-gold"
                        }), c.jsx("span", {
                            className: "text-gold text-sm font-medium tracking-widest uppercase",
                            children: "About CONTROLHQ"
                        })]
                    }), c.jsxs(F.h1, {
                        variants: Eu,
                        className: "font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6",
                        children: ["Institutional Infrastructure for", " ", c.jsx("span", {
                            className: "text-gradient-gold",
                            children: "Democracy"
                        })]
                    }), c.jsx(F.p, {
                        variants: Eu,
                        className: "text-lg sm:text-xl text-neutral-300 leading-relaxed",
                        children: "We are not a campaign tool. We are political infrastructure."
                    })]
                })
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs("div", {
                    className: "grid lg:grid-cols-2 gap-16 items-start",
                    children: [c.jsxs(F.div, {
                        initial: {
                            opacity: 0,
                            x: -20
                        },
                        whileInView: {
                            opacity: 1,
                            x: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .6
                        },
                        children: [c.jsx("h2", {
                            className: "font-heading text-3xl lg:text-4xl font-bold mb-8",
                            children: "Our Mission"
                        }), c.jsxs("div", {
                            className: "space-y-6 text-neutral-300 leading-relaxed",
                            children: [c.jsx("p", {
                                children: "CONTROLHQ was designed to solve a foundational problem in African democracies: the absence of institutional infrastructure for political organization. Across the continent, political parties, advocacy movements, and governance structures operate without the operational systems they need to scale, coordinate, and sustain."
                            }), c.jsx("p", {
                                children: "We are building the operating system for political governance—an institutional platform that enables structure, accountability, and coordination at every level of democratic activity."
                            }), c.jsx("p", {
                                children: "CONTROLHQ is not a consumer product. It is institutional-grade infrastructure built for political parties, campaign operations, civil society organizations, and governance stakeholders who require enterprise-level capabilities to operate effectively."
                            })]
                        })]
                    }), c.jsxs(F.div, {
                        initial: {
                            opacity: 0,
                            x: 20
                        },
                        whileInView: {
                            opacity: 1,
                            x: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .6,
                            delay: .2
                        },
                        className: "space-y-6",
                        children: [c.jsxs("div", {
                            className: "card-elevated p-8",
                            children: [c.jsx(ic, {
                                className: "w-8 h-8 text-gold mb-4"
                            }), c.jsx("h3", {
                                className: "font-heading text-xl font-semibold mb-3",
                                children: "Purpose-Built"
                            }), c.jsx("p", {
                                className: "text-muted-foreground text-sm leading-relaxed",
                                children: "Every feature is designed specifically for political operations—not adapted from generic business tools. We understand the unique requirements of democratic organization."
                            })]
                        }), c.jsxs("div", {
                            className: "card-elevated p-8",
                            children: [c.jsx(Nr, {
                                className: "w-8 h-8 text-gold mb-4"
                            }), c.jsx("h3", {
                                className: "font-heading text-xl font-semibold mb-3",
                                children: "Sovereign Technology"
                            }), c.jsx("p", {
                                className: "text-muted-foreground text-sm leading-relaxed",
                                children: "Built with data sovereignty in mind. Private deployments, local data residency, and institutional-grade security for sensitive political operations."
                            })]
                        }), c.jsxs("div", {
                            className: "card-elevated p-8",
                            children: [c.jsx(Wo, {
                                className: "w-8 h-8 text-gold mb-4"
                            }), c.jsx("h3", {
                                className: "font-heading text-xl font-semibold mb-3",
                                children: "Africa-Focused"
                            }), c.jsx("p", {
                                className: "text-muted-foreground text-sm leading-relaxed",
                                children: "Designed for the unique context of African democracies—accounting for infrastructure constraints, regulatory environments, and operational realities."
                            })]
                        })]
                    })]
                })
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32 bg-charcoal-light",
            children: c.jsxs("div", {
                className: "section-container",
                children: [c.jsxs(F.div, {
                    className: "text-center mb-16",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    children: [c.jsx("h2", {
                        className: "font-heading text-3xl lg:text-4xl font-bold mb-4",
                        children: "Institutional Principles"
                    }), c.jsx("p", {
                        className: "text-muted-foreground max-w-2xl mx-auto",
                        children: "The foundational values that guide every decision we make"
                    })]
                }), c.jsx("div", {
                    className: "grid md:grid-cols-3 gap-8",
                    children: [{
                        title: "Structure Over Chaos",
                        description: "Political success requires institutional discipline. We build systems that enforce structure and prevent organizational entropy."
                    }, {
                        title: "Accountability by Design",
                        description: "Every action is tracked, every role is defined, every process is documented. Governance is not optional—it's architectural."
                    }, {
                        title: "Scale With Integrity",
                        description: "From local chapters to national operations, our infrastructure maintains consistency, security, and accountability at any scale."
                    }].map((e, t) => c.jsxs(F.div, {
                        className: "text-center p-8",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .5,
                            delay: t * .1
                        },
                        children: [c.jsx("div", {
                            className: "w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-6",
                            children: c.jsx("span", {
                                className: "font-heading font-bold text-gold",
                                children: t + 1
                            })
                        }), c.jsx("h3", {
                            className: "font-heading text-xl font-semibold mb-3",
                            children: e.title
                        }), c.jsx("p", {
                            className: "text-muted-foreground text-sm leading-relaxed",
                            children: e.description
                        })]
                    }, e.title))
                })]
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs(F.div, {
                    className: "max-w-3xl mx-auto text-center",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    children: [c.jsx("h2", {
                        className: "font-heading text-3xl lg:text-4xl font-bold mb-6",
                        children: "Ready to build institutional infrastructure?"
                    }), c.jsx("p", {
                        className: "text-muted-foreground text-lg mb-10",
                        children: "Engage with CONTROLHQ to transform your political operations."
                    }), c.jsxs("div", {
                        className: "flex flex-col sm:flex-row gap-4 justify-center",
                        children: [c.jsx(ae, {
                            to: "/request-access",
                            children: c.jsxs(fe, {
                                variant: "hero",
                                size: "xl",
                                children: ["Request Access", c.jsx(en, {
                                    className: "w-5 h-5 ml-2"
                                })]
                            })
                        }), c.jsx(ae, {
                            to: "/contact",
                            children: c.jsx(fe, {
                                variant: "heroOutline",
                                size: "xl",
                                children: "Contact Us"
                            })
                        })]
                    })]
                })
            })
        })]
    }),
    Nu = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: .6
        }
    },
    tD = [{
        icon: ui,
        name: "Governance Structure Manager",
        description: "Define and enforce organizational hierarchies across all levels of political operation.",
        features: ["Role-based access control", "Hierarchical org charts", "Chapter & ward management", "Leadership succession protocols"]
    }, {
        icon: ic,
        name: "Field Operations Engine",
        description: "Coordinate ground-level activities with precision and accountability.",
        features: ["Task assignment & tracking", "Geospatial deployment", "Real-time field updates", "Resource allocation"]
    }, {
        icon: sc,
        name: "Voter Registry System",
        description: "Secure, compliant electoral data management with institutional-grade controls.",
        features: ["Voter data management", "Constituency mapping", "Turnout modeling", "Compliance frameworks"]
    }, {
        icon: Ho,
        name: "Mobilization Engine",
        description: "Scale grassroots engagement with structured volunteer coordination.",
        features: ["Volunteer management", "Event coordination", "Outreach campaigns", "Engagement tracking"]
    }, {
        icon: ew,
        name: "Command Center",
        description: "Real-time operational oversight with institutional command and control capabilities.",
        features: ["Live dashboards", "Incident management", "Communication hub", "Decision support"]
    }, {
        icon: rc,
        name: "Analytics Platform",
        description: "Data-driven insights for strategic decision-making across all operations.",
        features: ["Performance metrics", "Trend analysis", "Predictive modeling", "Custom reporting"]
    }],
    nD = () => c.jsxs(Pr, {
        children: [c.jsx("section", {
            className: "py-24 lg:py-32 hero-gradient",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs(F.div, {
                    className: "max-w-4xl",
                    initial: "initial",
                    animate: "animate",
                    variants: {
                        animate: {
                            transition: {
                                staggerChildren: .1
                            }
                        }
                    },
                    children: [c.jsxs(F.div, {
                        variants: Nu,
                        className: "flex items-center gap-2 mb-6",
                        children: [c.jsx("span", {
                            className: "h-px w-12 bg-gold"
                        }), c.jsx("span", {
                            className: "text-gold text-sm font-medium tracking-widest uppercase",
                            children: "Product"
                        })]
                    }), c.jsxs(F.h1, {
                        variants: Nu,
                        className: "font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6",
                        children: ["The Political", " ", c.jsx("span", {
                            className: "text-gradient-gold",
                            children: "Operating System"
                        })]
                    }), c.jsx(F.p, {
                        variants: Nu,
                        className: "text-lg sm:text-xl text-neutral-300 leading-relaxed",
                        children: "A comprehensive suite of integrated modules designed to power every aspect of political operations—from governance structure to field mobilization."
                    })]
                })
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32",
            children: c.jsxs("div", {
                className: "section-container",
                children: [c.jsxs(F.div, {
                    className: "text-center mb-16",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    children: [c.jsx("span", {
                        className: "text-gold text-sm font-medium tracking-widest uppercase mb-4 block",
                        children: "Core Modules"
                    }), c.jsx("h2", {
                        className: "font-heading text-3xl lg:text-4xl font-bold mb-4",
                        children: "Integrated Political Infrastructure"
                    }), c.jsx("p", {
                        className: "text-muted-foreground max-w-2xl mx-auto",
                        children: "Six core modules working in concert to deliver institutional-grade capabilities for political operations."
                    })]
                }), c.jsx("div", {
                    className: "space-y-8",
                    children: tD.map((e, t) => c.jsx(F.div, {
                        className: "card-elevated p-8 lg:p-12",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .5,
                            delay: t * .1
                        },
                        children: c.jsxs("div", {
                            className: "grid lg:grid-cols-3 gap-8 items-start",
                            children: [c.jsxs("div", {
                                className: "lg:col-span-2",
                                children: [c.jsxs("div", {
                                    className: "flex items-center gap-4 mb-4",
                                    children: [c.jsx("div", {
                                        className: "w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center",
                                        children: c.jsx(e.icon, {
                                            className: "w-6 h-6 text-gold"
                                        })
                                    }), c.jsx("h3", {
                                        className: "font-heading text-2xl font-semibold",
                                        children: e.name
                                    })]
                                }), c.jsx("p", {
                                    className: "text-muted-foreground leading-relaxed",
                                    children: e.description
                                })]
                            }), c.jsx("div", {
                                children: c.jsx("ul", {
                                    className: "space-y-3",
                                    children: e.features.map(n => c.jsxs("li", {
                                        className: "flex items-center gap-3 text-sm",
                                        children: [c.jsx(ls, {
                                            className: "w-4 h-4 text-gold flex-shrink-0"
                                        }), c.jsx("span", {
                                            className: "text-neutral-300",
                                            children: n
                                        })]
                                    }, n))
                                })
                            })]
                        })
                    }, e.name))
                })]
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32 bg-charcoal-light",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs(F.div, {
                    className: "max-w-3xl mx-auto text-center",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    children: [c.jsx("h2", {
                        className: "font-heading text-3xl lg:text-4xl font-bold mb-6",
                        children: "Deploy the complete political operating system"
                    }), c.jsx("p", {
                        className: "text-muted-foreground text-lg mb-10",
                        children: "Request institutional access to explore how CONTROLHQ can transform your political operations."
                    }), c.jsxs("div", {
                        className: "flex flex-col sm:flex-row gap-4 justify-center",
                        children: [c.jsx(ae, {
                            to: "/request-access",
                            children: c.jsxs(fe, {
                                variant: "hero",
                                size: "xl",
                                children: ["Request Access", c.jsx(en, {
                                    className: "w-5 h-5 ml-2"
                                })]
                            })
                        }), c.jsx(ae, {
                            to: "/platform",
                            children: c.jsx(fe, {
                                variant: "heroOutline",
                                size: "xl",
                                children: "View Platform Architecture"
                            })
                        })]
                    })]
                })
            })
        })]
    }),
    Tu = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: .6
        }
    },
    rD = [{
        icon: sc,
        title: "For Political Campaigns",
        description: "Institutional infrastructure for electoral operations at any scale.",
        capabilities: ["Unified campaign command structure", "Field team coordination and deployment", "Voter outreach management", "Real-time operational dashboards", "Volunteer mobilization at scale", "Data-driven strategic planning"]
    }, {
        icon: ui,
        title: "For Political Parties",
        description: "Governance infrastructure for sustained organizational effectiveness.",
        capabilities: ["Party hierarchy management", "Chapter and ward coordination", "Membership registry systems", "Internal governance protocols", "Leadership accountability frameworks", "Institutional memory preservation"]
    }, {
        icon: Wo,
        title: "For NGOs & Civil Society",
        description: "Operational infrastructure for advocacy movements and civic organizations.",
        capabilities: ["Campaign coordination tools", "Grassroots engagement systems", "Coalition management", "Impact tracking and reporting", "Volunteer network management", "Community mobilization frameworks"]
    }, {
        icon: Nh,
        title: "For Government Institutions",
        description: "Administrative infrastructure for governance operations and public engagement.",
        capabilities: ["Constituent engagement platforms", "Service delivery coordination", "Inter-agency collaboration", "Public program management", "Stakeholder communication", "Governance transparency tools"]
    }],
    iD = () => c.jsxs(Pr, {
        children: [c.jsx("section", {
            className: "py-24 lg:py-32 hero-gradient",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs(F.div, {
                    className: "max-w-4xl",
                    initial: "initial",
                    animate: "animate",
                    variants: {
                        animate: {
                            transition: {
                                staggerChildren: .1
                            }
                        }
                    },
                    children: [c.jsxs(F.div, {
                        variants: Tu,
                        className: "flex items-center gap-2 mb-6",
                        children: [c.jsx("span", {
                            className: "h-px w-12 bg-gold"
                        }), c.jsx("span", {
                            className: "text-gold text-sm font-medium tracking-widest uppercase",
                            children: "Solutions"
                        })]
                    }), c.jsxs(F.h1, {
                        variants: Tu,
                        className: "font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6",
                        children: ["Infrastructure for", " ", c.jsx("span", {
                            className: "text-gradient-gold",
                            children: "Every Institution"
                        })]
                    }), c.jsx(F.p, {
                        variants: Tu,
                        className: "text-lg sm:text-xl text-neutral-300 leading-relaxed",
                        children: "Purpose-built solutions for campaigns, parties, civil society, and governance stakeholders operating at any scale."
                    })]
                })
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsx("div", {
                    className: "space-y-16",
                    children: rD.map((e, t) => c.jsxs(F.div, {
                        className: "grid lg:grid-cols-2 gap-12 items-start",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .5
                        },
                        children: [c.jsxs("div", {
                            className: t % 2 === 1 ? "lg:order-2" : "",
                            children: [c.jsxs("div", {
                                className: "flex items-center gap-4 mb-6",
                                children: [c.jsx("div", {
                                    className: "w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center",
                                    children: c.jsx(e.icon, {
                                        className: "w-7 h-7 text-gold"
                                    })
                                }), c.jsx("h2", {
                                    className: "font-heading text-2xl lg:text-3xl font-bold",
                                    children: e.title
                                })]
                            }), c.jsx("p", {
                                className: "text-muted-foreground text-lg leading-relaxed mb-8",
                                children: e.description
                            }), c.jsx(ae, {
                                to: "/request-access",
                                children: c.jsxs(fe, {
                                    variant: "goldOutline",
                                    children: ["Learn More", c.jsx(en, {
                                        className: "w-4 h-4 ml-2"
                                    })]
                                })
                            })]
                        }), c.jsxs("div", {
                            className: `card-elevated p-8 ${t % 2 === 1 ? "lg:order-1" : ""}`,
                            children: [c.jsx("h3", {
                                className: "font-heading font-semibold text-sm text-gold mb-6 uppercase tracking-wide",
                                children: "Key Capabilities"
                            }), c.jsx("ul", {
                                className: "space-y-4",
                                children: e.capabilities.map(n => c.jsxs("li", {
                                    className: "flex items-start gap-3",
                                    children: [c.jsx(ls, {
                                        className: "w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                                    }), c.jsx("span", {
                                        className: "text-neutral-300",
                                        children: n
                                    })]
                                }, n))
                            })]
                        })]
                    }, e.title))
                })
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32 bg-charcoal-light",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs(F.div, {
                    className: "max-w-3xl mx-auto text-center",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    children: [c.jsx("h2", {
                        className: "font-heading text-3xl lg:text-4xl font-bold mb-6",
                        children: "Find the right solution for your institution"
                    }), c.jsx("p", {
                        className: "text-muted-foreground text-lg mb-10",
                        children: "Our team will work with you to configure CONTROLHQ for your specific operational requirements."
                    }), c.jsxs("div", {
                        className: "flex flex-col sm:flex-row gap-4 justify-center",
                        children: [c.jsx(ae, {
                            to: "/request-access",
                            children: c.jsxs(fe, {
                                variant: "hero",
                                size: "xl",
                                children: ["Request Access", c.jsx(en, {
                                    className: "w-5 h-5 ml-2"
                                })]
                            })
                        }), c.jsx(ae, {
                            to: "/contact",
                            children: c.jsx(fe, {
                                variant: "heroOutline",
                                size: "xl",
                                children: "Contact Us"
                            })
                        })]
                    })]
                })
            })
        })]
    }),
    Pu = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: .6
        }
    },
    sD = [{
        icon: DT,
        title: "Secure Infrastructure",
        description: "Enterprise-grade cloud infrastructure with regional deployment options and high availability guarantees."
    }, {
        icon: TT,
        title: "Scalable Architecture",
        description: "Built to scale from local chapters to national operations without performance degradation."
    }, {
        icon: VT,
        title: "Multi-tenant Platform",
        description: "Isolated environments for each organization with shared infrastructure efficiency."
    }, {
        icon: ui,
        title: "Institutional-grade",
        description: "Designed for the operational requirements of political institutions and governance organizations."
    }],
    oD = [{
        icon: AT,
        title: "Role-based Access Control",
        description: "Granular permissions system aligned with organizational hierarchies and operational roles."
    }, {
        icon: ri,
        title: "End-to-end Encryption",
        description: "Data encrypted in transit and at rest with institutional-grade encryption standards."
    }, {
        icon: NT,
        title: "Private Deployments",
        description: "Option for dedicated infrastructure with complete data isolation and sovereignty."
    }, {
        icon: Nr,
        title: "Audit Logging",
        description: "Comprehensive activity logs for compliance, accountability, and governance requirements."
    }],
    aD = ["Full data ownership retained by institutions", "Privacy-first architecture and data handling", "Compliance frameworks for electoral regulations", "Configurable data retention policies", "GDPR-aligned data protection capabilities", "Transparent data processing agreements"],
    lD = () => c.jsxs(Pr, {
        children: [c.jsx("section", {
            className: "py-24 lg:py-32 hero-gradient",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs(F.div, {
                    className: "max-w-4xl",
                    initial: "initial",
                    animate: "animate",
                    variants: {
                        animate: {
                            transition: {
                                staggerChildren: .1
                            }
                        }
                    },
                    children: [c.jsxs(F.div, {
                        variants: Pu,
                        className: "flex items-center gap-2 mb-6",
                        children: [c.jsx("span", {
                            className: "h-px w-12 bg-gold"
                        }), c.jsx("span", {
                            className: "text-gold text-sm font-medium tracking-widest uppercase",
                            children: "Platform"
                        })]
                    }), c.jsxs(F.h1, {
                        variants: Pu,
                        className: "font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6",
                        children: ["Institutional-grade", " ", c.jsx("span", {
                            className: "text-gradient-gold",
                            children: "Platform Architecture"
                        })]
                    }), c.jsx(F.p, {
                        variants: Pu,
                        className: "text-lg sm:text-xl text-neutral-300 leading-relaxed",
                        children: "Built for security, scale, and sovereignty. CONTROLHQ's platform architecture meets the rigorous requirements of political institutions."
                    })]
                })
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32",
            children: c.jsxs("div", {
                className: "section-container",
                children: [c.jsxs(F.div, {
                    className: "text-center mb-16",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    children: [c.jsx("span", {
                        className: "text-gold text-sm font-medium tracking-widest uppercase mb-4 block",
                        children: "Architecture"
                    }), c.jsx("h2", {
                        className: "font-heading text-3xl lg:text-4xl font-bold mb-4",
                        children: "Built for Political Operations"
                    }), c.jsx("p", {
                        className: "text-muted-foreground max-w-2xl mx-auto",
                        children: "Enterprise infrastructure designed specifically for the demands of political organizations and governance institutions."
                    })]
                }), c.jsx("div", {
                    className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
                    children: sD.map((e, t) => c.jsxs(F.div, {
                        className: "card-elevated p-8",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .5,
                            delay: t * .1
                        },
                        children: [c.jsx(e.icon, {
                            className: "w-10 h-10 text-gold mb-6"
                        }), c.jsx("h3", {
                            className: "font-heading text-lg font-semibold mb-3",
                            children: e.title
                        }), c.jsx("p", {
                            className: "text-muted-foreground text-sm leading-relaxed",
                            children: e.description
                        })]
                    }, e.title))
                })]
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32 bg-charcoal-light",
            children: c.jsxs("div", {
                className: "section-container",
                children: [c.jsxs(F.div, {
                    className: "text-center mb-16",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    children: [c.jsx("span", {
                        className: "text-gold text-sm font-medium tracking-widest uppercase mb-4 block",
                        children: "Security"
                    }), c.jsx("h2", {
                        className: "font-heading text-3xl lg:text-4xl font-bold mb-4",
                        children: "Enterprise Security Standards"
                    }), c.jsx("p", {
                        className: "text-muted-foreground max-w-2xl mx-auto",
                        children: "Security architecture built for the sensitivity of political operations and electoral data."
                    })]
                }), c.jsx("div", {
                    className: "grid md:grid-cols-2 gap-6",
                    children: oD.map((e, t) => c.jsxs(F.div, {
                        className: "card-elevated p-8 flex gap-6",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .5,
                            delay: t * .1
                        },
                        children: [c.jsx("div", {
                            className: "w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0",
                            children: c.jsx(e.icon, {
                                className: "w-6 h-6 text-gold"
                            })
                        }), c.jsxs("div", {
                            children: [c.jsx("h3", {
                                className: "font-heading text-lg font-semibold mb-2",
                                children: e.title
                            }), c.jsx("p", {
                                className: "text-muted-foreground text-sm leading-relaxed",
                                children: e.description
                            })]
                        })]
                    }, e.title))
                })]
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs("div", {
                    className: "grid lg:grid-cols-2 gap-16 items-center",
                    children: [c.jsxs(F.div, {
                        initial: {
                            opacity: 0,
                            x: -20
                        },
                        whileInView: {
                            opacity: 1,
                            x: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .6
                        },
                        children: [c.jsx("span", {
                            className: "text-gold text-sm font-medium tracking-widest uppercase mb-4 block",
                            children: "Data Governance"
                        }), c.jsx("h2", {
                            className: "font-heading text-3xl lg:text-4xl font-bold mb-6",
                            children: "Sovereignty & Compliance"
                        }), c.jsx("p", {
                            className: "text-muted-foreground leading-relaxed mb-8",
                            children: "CONTROLHQ is designed with data sovereignty as a foundational principle. Institutions retain complete ownership and control of their data, with configurable governance frameworks to meet regulatory requirements."
                        }), c.jsx(ae, {
                            to: "/contact",
                            children: c.jsxs(fe, {
                                variant: "goldOutline",
                                children: ["Discuss Compliance Requirements", c.jsx(en, {
                                    className: "w-4 h-4 ml-2"
                                })]
                            })
                        })]
                    }), c.jsxs(F.div, {
                        initial: {
                            opacity: 0,
                            x: 20
                        },
                        whileInView: {
                            opacity: 1,
                            x: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .6,
                            delay: .2
                        },
                        className: "card-elevated p-8",
                        children: [c.jsx(kT, {
                            className: "w-8 h-8 text-gold mb-6"
                        }), c.jsx("h3", {
                            className: "font-heading text-xl font-semibold mb-6",
                            children: "Governance Framework"
                        }), c.jsx("ul", {
                            className: "space-y-4",
                            children: aD.map(e => c.jsxs("li", {
                                className: "flex items-start gap-3",
                                children: [c.jsx(ls, {
                                    className: "w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                                }), c.jsx("span", {
                                    className: "text-neutral-300 text-sm",
                                    children: e
                                })]
                            }, e))
                        })]
                    })]
                })
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32 bg-charcoal-light",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs(F.div, {
                    className: "max-w-3xl mx-auto text-center",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    children: [c.jsx("h2", {
                        className: "font-heading text-3xl lg:text-4xl font-bold mb-6",
                        children: "Ready to deploy institutional infrastructure?"
                    }), c.jsx("p", {
                        className: "text-muted-foreground text-lg mb-10",
                        children: "Request access to learn more about deployment options and security configurations."
                    }), c.jsxs("div", {
                        className: "flex flex-col sm:flex-row gap-4 justify-center",
                        children: [c.jsx(ae, {
                            to: "/request-access",
                            children: c.jsxs(fe, {
                                variant: "hero",
                                size: "xl",
                                children: ["Request Access", c.jsx(en, {
                                    className: "w-5 h-5 ml-2"
                                })]
                            })
                        }), c.jsx(ae, {
                            to: "/contact",
                            children: c.jsx(fe, {
                                variant: "heroOutline",
                                size: "xl",
                                children: "Contact Security Team"
                            })
                        })]
                    })]
                })
            })
        })]
    }),
    ju = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: .6
        }
    },
    cD = [{
        icon: ui,
        title: "Institutional Partners",
        description: "Political parties, government agencies, and large-scale civic organizations seeking enterprise deployments.",
        benefits: ["Dedicated implementation support", "Custom configuration and integration", "Priority feature development", "Direct engineering access"]
    }, {
        icon: Wo,
        title: "Regional Partners",
        description: "Organizations expanding CONTROLHQ infrastructure across regions and territories.",
        benefits: ["Regional deployment support", "Localization assistance", "Training and capacity building", "Market development collaboration"]
    }, {
        icon: wT,
        title: "Implementation Partners",
        description: "Consultancies and firms providing political operations and governance advisory services.",
        benefits: ["Partner certification program", "Technical training resources", "Revenue sharing opportunities", "Co-marketing initiatives"]
    }],
    uD = () => c.jsxs(Pr, {
        children: [c.jsx("section", {
            className: "py-24 lg:py-32 hero-gradient",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs(F.div, {
                    className: "max-w-4xl",
                    initial: "initial",
                    animate: "animate",
                    variants: {
                        animate: {
                            transition: {
                                staggerChildren: .1
                            }
                        }
                    },
                    children: [c.jsxs(F.div, {
                        variants: ju,
                        className: "flex items-center gap-2 mb-6",
                        children: [c.jsx("span", {
                            className: "h-px w-12 bg-gold"
                        }), c.jsx("span", {
                            className: "text-gold text-sm font-medium tracking-widest uppercase",
                            children: "Partnerships"
                        })]
                    }), c.jsxs(F.h1, {
                        variants: ju,
                        className: "font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6",
                        children: ["Institutional", " ", c.jsx("span", {
                            className: "text-gradient-gold",
                            children: "Partnerships"
                        })]
                    }), c.jsx(F.p, {
                        variants: ju,
                        className: "text-lg sm:text-xl text-neutral-300 leading-relaxed",
                        children: "Join the ecosystem of institutions building political infrastructure for democratic governance across Africa."
                    })]
                })
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32",
            children: c.jsxs("div", {
                className: "section-container",
                children: [c.jsxs("div", {
                    className: "grid lg:grid-cols-2 gap-16 items-center mb-20",
                    children: [c.jsxs(F.div, {
                        initial: {
                            opacity: 0,
                            x: -20
                        },
                        whileInView: {
                            opacity: 1,
                            x: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .6
                        },
                        children: [c.jsx(RT, {
                            className: "w-16 h-16 text-gold mb-6"
                        }), c.jsx("h2", {
                            className: "font-heading text-3xl lg:text-4xl font-bold mb-6",
                            children: "Build With CONTROLHQ"
                        }), c.jsx("p", {
                            className: "text-muted-foreground leading-relaxed mb-6",
                            children: "CONTROLHQ partners with institutions committed to strengthening democratic infrastructure across Africa. Our partnership model is designed for organizations that share our mission of bringing governance, structure, and accountability to political operations."
                        }), c.jsx("p", {
                            className: "text-muted-foreground leading-relaxed",
                            children: "Whether you're a political institution seeking enterprise deployment, a regional organization expanding infrastructure, or a consultancy advising governance stakeholders—there's a partnership pathway for you."
                        })]
                    }), c.jsxs(F.div, {
                        initial: {
                            opacity: 0,
                            x: 20
                        },
                        whileInView: {
                            opacity: 1,
                            x: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .6,
                            delay: .2
                        },
                        className: "card-elevated p-8",
                        children: [c.jsx("h3", {
                            className: "font-heading text-xl font-semibold mb-6",
                            children: "Partnership Principles"
                        }), c.jsx("ul", {
                            className: "space-y-4",
                            children: ["Mutual commitment to democratic governance", "Long-term institutional relationship focus", "Shared investment in infrastructure success", "Alignment on data sovereignty and privacy", "Collaborative approach to challenges"].map(e => c.jsxs("li", {
                                className: "flex items-start gap-3",
                                children: [c.jsx(ls, {
                                    className: "w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                                }), c.jsx("span", {
                                    className: "text-neutral-300",
                                    children: e
                                })]
                            }, e))
                        })]
                    })]
                }), c.jsx("div", {
                    className: "space-y-8",
                    children: cD.map((e, t) => c.jsx(F.div, {
                        className: "card-elevated p-8 lg:p-12",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .5,
                            delay: t * .1
                        },
                        children: c.jsxs("div", {
                            className: "grid lg:grid-cols-3 gap-8 items-start",
                            children: [c.jsxs("div", {
                                className: "lg:col-span-2",
                                children: [c.jsxs("div", {
                                    className: "flex items-center gap-4 mb-4",
                                    children: [c.jsx("div", {
                                        className: "w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center",
                                        children: c.jsx(e.icon, {
                                            className: "w-6 h-6 text-gold"
                                        })
                                    }), c.jsx("h3", {
                                        className: "font-heading text-2xl font-semibold",
                                        children: e.title
                                    })]
                                }), c.jsx("p", {
                                    className: "text-muted-foreground leading-relaxed",
                                    children: e.description
                                })]
                            }), c.jsxs("div", {
                                children: [c.jsx("h4", {
                                    className: "font-heading font-semibold text-sm text-gold mb-4 uppercase tracking-wide",
                                    children: "Partner Benefits"
                                }), c.jsx("ul", {
                                    className: "space-y-3",
                                    children: e.benefits.map(n => c.jsxs("li", {
                                        className: "flex items-center gap-3 text-sm",
                                        children: [c.jsx(ls, {
                                            className: "w-4 h-4 text-gold flex-shrink-0"
                                        }), c.jsx("span", {
                                            className: "text-neutral-300",
                                            children: n
                                        })]
                                    }, n))
                                })]
                            })]
                        })
                    }, e.title))
                })]
            })
        }), c.jsx("section", {
            className: "py-24 lg:py-32 bg-charcoal-light",
            children: c.jsx("div", {
                className: "section-container",
                children: c.jsxs(F.div, {
                    className: "max-w-3xl mx-auto text-center",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    children: [c.jsx("h2", {
                        className: "font-heading text-3xl lg:text-4xl font-bold mb-6",
                        children: "Partner With CONTROLHQ"
                    }), c.jsx("p", {
                        className: "text-muted-foreground text-lg mb-10",
                        children: "Connect with our partnerships team to discuss collaboration opportunities and institutional alignment."
                    }), c.jsx(ae, {
                        to: "/contact",
                        children: c.jsxs(fe, {
                            variant: "hero",
                            size: "xl",
                            children: ["Partner With Us", c.jsx(en, {
                                className: "w-5 h-5 ml-2"
                            })]
                        })
                    })]
                })
            })
        })]
    }),
    Xt = y.forwardRef(({className: e, type: t, ...n}, r) => c.jsx("input", {
        type: t,
        className: Ve("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", e),
        ref: r,
        ...n
    }));
Xt.displayName = "Input";
const bp = y.forwardRef(({className: e, ...t}, n) => c.jsx("textarea", {
    className: Ve("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", e),
    ref: n,
    ...t
}));
bp.displayName = "Textarea";
var dD = "Label",
    Wb = y.forwardRef((e, t) => c.jsx(ue.label, {
        ...e,
        ref: t,
        onMouseDown: n => {
            var i;
            n.target.closest("button, input, select, textarea") || ((i = e.onMouseDown) == null || i.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault())
        }
    }));
Wb.displayName = dD;
var Hb = Wb;
const fD = Eh("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),
    nt = y.forwardRef(({className: e, ...t}, n) => c.jsx(Hb, {
        ref: n,
        className: Ve(fD(), e),
        ...t
    }));
nt.displayName = Hb.displayName;
const ku = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: .6
        }
    },
    hD = () => {
        const {toast: e} = Jl(),
            [t, n] = y.useState(!1),
            [r, i] = y.useState({
                name: "",
                organization: "",
                role: "",
                email: "",
                purpose: ""
            }),
            s = async o => {
                o.preventDefault(),
                n(!0),
                await new Promise(a => setTimeout(a, 1500)),
                e({
                    title: "Inquiry Received",
                    description: "Our institutional engagement team will respond within 48 hours."
                }),
                i({
                    name: "",
                    organization: "",
                    role: "",
                    email: "",
                    purpose: ""
                }),
                n(!1)
            };
        return c.jsxs(Pr, {
            children: [c.jsx("section", {
                className: "py-24 lg:py-32 hero-gradient",
                children: c.jsx("div", {
                    className: "section-container",
                    children: c.jsxs(F.div, {
                        className: "max-w-4xl",
                        initial: "initial",
                        animate: "animate",
                        variants: {
                            animate: {
                                transition: {
                                    staggerChildren: .1
                                }
                            }
                        },
                        children: [c.jsxs(F.div, {
                            variants: ku,
                            className: "flex items-center gap-2 mb-6",
                            children: [c.jsx("span", {
                                className: "h-px w-12 bg-gold"
                            }), c.jsx("span", {
                                className: "text-gold text-sm font-medium tracking-widest uppercase",
                                children: "Contact"
                            })]
                        }), c.jsxs(F.h1, {
                            variants: ku,
                            className: "font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6",
                            children: ["Engage the", " ", c.jsx("span", {
                                className: "text-gradient-gold",
                                children: "Institution"
                            })]
                        }), c.jsx(F.p, {
                            variants: ku,
                            className: "text-lg sm:text-xl text-neutral-300 leading-relaxed",
                            children: "Connect with CONTROLHQ for institutional inquiries, partnership discussions, or platform demonstrations."
                        })]
                    })
                })
            }), c.jsx("section", {
                className: "py-24 lg:py-32",
                children: c.jsx("div", {
                    className: "section-container",
                    children: c.jsxs("div", {
                        className: "grid lg:grid-cols-3 gap-16",
                        children: [c.jsx(F.div, {
                            className: "lg:col-span-2",
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            viewport: {
                                once: !0
                            },
                            transition: {
                                duration: .6
                            },
                            children: c.jsxs("form", {
                                onSubmit: s,
                                className: "space-y-6",
                                children: [c.jsxs("div", {
                                    className: "grid md:grid-cols-2 gap-6",
                                    children: [c.jsxs("div", {
                                        className: "space-y-2",
                                        children: [c.jsx(nt, {
                                            htmlFor: "name",
                                            children: "Full Name"
                                        }), c.jsx(Xt, {
                                            id: "name",
                                            placeholder: "Your full name",
                                            value: r.name,
                                            onChange: o => i({
                                                ...r,
                                                name: o.target.value
                                            }),
                                            required: !0,
                                            className: "bg-card border-border focus:border-gold"
                                        })]
                                    }), c.jsxs("div", {
                                        className: "space-y-2",
                                        children: [c.jsx(nt, {
                                            htmlFor: "organization",
                                            children: "Organization"
                                        }), c.jsx(Xt, {
                                            id: "organization",
                                            placeholder: "Organization name",
                                            value: r.organization,
                                            onChange: o => i({
                                                ...r,
                                                organization: o.target.value
                                            }),
                                            required: !0,
                                            className: "bg-card border-border focus:border-gold"
                                        })]
                                    })]
                                }), c.jsxs("div", {
                                    className: "grid md:grid-cols-2 gap-6",
                                    children: [c.jsxs("div", {
                                        className: "space-y-2",
                                        children: [c.jsx(nt, {
                                            htmlFor: "role",
                                            children: "Role / Title"
                                        }), c.jsx(Xt, {
                                            id: "role",
                                            placeholder: "Your role",
                                            value: r.role,
                                            onChange: o => i({
                                                ...r,
                                                role: o.target.value
                                            }),
                                            required: !0,
                                            className: "bg-card border-border focus:border-gold"
                                        })]
                                    }), c.jsxs("div", {
                                        className: "space-y-2",
                                        children: [c.jsx(nt, {
                                            htmlFor: "email",
                                            children: "Email Address"
                                        }), c.jsx(Xt, {
                                            id: "email",
                                            type: "email",
                                            placeholder: "institutional@email.com",
                                            value: r.email,
                                            onChange: o => i({
                                                ...r,
                                                email: o.target.value
                                            }),
                                            required: !0,
                                            className: "bg-card border-border focus:border-gold"
                                        })]
                                    })]
                                }), c.jsxs("div", {
                                    className: "space-y-2",
                                    children: [c.jsx(nt, {
                                        htmlFor: "purpose",
                                        children: "Purpose of Inquiry"
                                    }), c.jsx(bp, {
                                        id: "purpose",
                                        placeholder: "Describe your institutional requirements or inquiry purpose...",
                                        value: r.purpose,
                                        onChange: o => i({
                                            ...r,
                                            purpose: o.target.value
                                        }),
                                        required: !0,
                                        rows: 6,
                                        className: "bg-card border-border focus:border-gold resize-none"
                                    })]
                                }), c.jsx(fe, {
                                    type: "submit",
                                    variant: "gold",
                                    size: "lg",
                                    disabled: t,
                                    className: "w-full md:w-auto",
                                    children: t ? "Submitting..." : "Submit Inquiry"
                                })]
                            })
                        }), c.jsxs(F.div, {
                            initial: {
                                opacity: 0,
                                x: 20
                            },
                            whileInView: {
                                opacity: 1,
                                x: 0
                            },
                            viewport: {
                                once: !0
                            },
                            transition: {
                                duration: .6,
                                delay: .2
                            },
                            className: "space-y-8",
                            children: [c.jsxs("div", {
                                className: "card-elevated p-8",
                                children: [c.jsx("h3", {
                                    className: "font-heading text-lg font-semibold mb-6",
                                    children: "Institutional Contact"
                                }), c.jsxs("div", {
                                    className: "space-y-6",
                                    children: [c.jsxs("div", {
                                        className: "flex items-start gap-4",
                                        children: [c.jsx(OT, {
                                            className: "w-5 h-5 text-gold mt-1"
                                        }), c.jsxs("div", {
                                            children: [c.jsx("p", {
                                                className: "font-medium text-sm",
                                                children: "Email"
                                            }), c.jsx("p", {
                                                className: "text-muted-foreground text-sm",
                                                children: "contact@controlhq.ng"
                                            })]
                                        })]
                                    }), c.jsxs("div", {
                                        className: "flex items-start gap-4",
                                        children: [c.jsx(Th, {
                                            className: "w-5 h-5 text-gold mt-1"
                                        }), c.jsxs("div", {
                                            children: [c.jsx("p", {
                                                className: "font-medium text-sm",
                                                children: "Headquarters"
                                            }), c.jsx("p", {
                                                className: "text-muted-foreground text-sm",
                                                children: "Lagos, Nigeria"
                                            })]
                                        })]
                                    })]
                                })]
                            }), c.jsxs("div", {
                                className: "card-elevated p-8",
                                children: [c.jsx(Nr, {
                                    className: "w-8 h-8 text-gold mb-4"
                                }), c.jsx("h3", {
                                    className: "font-heading font-semibold mb-3",
                                    children: "Secure Communications"
                                }), c.jsx("p", {
                                    className: "text-muted-foreground text-sm leading-relaxed",
                                    children: "For sensitive institutional matters requiring encrypted communication, please indicate this in your inquiry and we will provide secure communication channels."
                                })]
                            }), c.jsx("div", {
                                className: "p-6 border border-gold/20 rounded-lg bg-gold/5",
                                children: c.jsxs("p", {
                                    className: "text-sm text-neutral-300",
                                    children: [c.jsx("strong", {
                                        className: "text-gold",
                                        children: "Response Time:"
                                    }), " Our institutional engagement team responds to all inquiries within 48 business hours."]
                                })
                            })]
                        })]
                    })
                })
            })]
        })
    };
function zy(e, [t, n]) {
    return Math.min(n, Math.max(t, e))
}
var pD = y.createContext(void 0);
function mD(e) {
    const t = y.useContext(pD);
    return e || t || "ltr"
}
var Ru = 0;
function gD() {
    y.useEffect(() => {
        const e = document.querySelectorAll("[data-radix-focus-guard]");
        return document.body.insertAdjacentElement("afterbegin", e[0] ?? By()), document.body.insertAdjacentElement("beforeend", e[1] ?? By()), Ru++, () => {
            Ru === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach(t => t.remove()),
            Ru--
        }
    }, [])
}
function By() {
    const e = document.createElement("span");
    return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e
}
var Au = "focusScope.autoFocusOnMount",
    Mu = "focusScope.autoFocusOnUnmount",
    $y = {
        bubbles: !1,
        cancelable: !0
    },
    yD = "FocusScope",
    Kb = y.forwardRef((e, t) => {
        const {loop: n=!1, trapped: r=!1, onMountAutoFocus: i, onUnmountAutoFocus: s, ...o} = e,
            [a, l] = y.useState(null),
            u = nn(i),
            d = nn(s),
            f = y.useRef(null),
            h = Re(t, m => l(m)),
            p = y.useRef({
                paused: !1,
                pause() {
                    this.paused = !0
                },
                resume() {
                    this.paused = !1
                }
            }).current;
        y.useEffect(() => {
            if (r) {
                let m = function(x) {
                        if (p.paused || !a)
                            return;
                        const S = x.target;
                        a.contains(S) ? f.current = S : Gn(f.current, {
                            select: !0
                        })
                    },
                    w = function(x) {
                        if (p.paused || !a)
                            return;
                        const S = x.relatedTarget;
                        S !== null && (a.contains(S) || Gn(f.current, {
                            select: !0
                        }))
                    },
                    v = function(x) {
                        if (document.activeElement === document.body)
                            for (const C of x)
                                C.removedNodes.length > 0 && Gn(a)
                    };
                document.addEventListener("focusin", m),
                document.addEventListener("focusout", w);
                const g = new MutationObserver(v);
                return a && g.observe(a, {
                    childList: !0,
                    subtree: !0
                }), () => {
                    document.removeEventListener("focusin", m),
                    document.removeEventListener("focusout", w),
                    g.disconnect()
                }
            }
        }, [r, a, p.paused]),
        y.useEffect(() => {
            if (a) {
                Wy.add(p);
                const m = document.activeElement;
                if (!a.contains(m)) {
                    const v = new CustomEvent(Au, $y);
                    a.addEventListener(Au, u),
                    a.dispatchEvent(v),
                    v.defaultPrevented || (vD(CD(Gb(a)), {
                        select: !0
                    }), document.activeElement === m && Gn(a))
                }
                return () => {
                    a.removeEventListener(Au, u),
                    setTimeout(() => {
                        const v = new CustomEvent(Mu, $y);
                        a.addEventListener(Mu, d),
                        a.dispatchEvent(v),
                        v.defaultPrevented || Gn(m ?? document.body, {
                            select: !0
                        }),
                        a.removeEventListener(Mu, d),
                        Wy.remove(p)
                    }, 0)
                }
            }
        }, [a, u, d, p]);
        const b = y.useCallback(m => {
            if (!n && !r || p.paused)
                return;
            const w = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey,
                v = document.activeElement;
            if (w && v) {
                const g = m.currentTarget,
                    [x, S] = xD(g);
                x && S ? !m.shiftKey && v === S ? (m.preventDefault(), n && Gn(x, {
                    select: !0
                })) : m.shiftKey && v === x && (m.preventDefault(), n && Gn(S, {
                    select: !0
                })) : v === g && m.preventDefault()
            }
        }, [n, r, p.paused]);
        return c.jsx(ue.div, {
            tabIndex: -1,
            ...o,
            ref: h,
            onKeyDown: b
        })
    });
Kb.displayName = yD;
function vD(e, {select: t=!1}={}) {
    const n = document.activeElement;
    for (const r of e)
        if (Gn(r, {
            select: t
        }), document.activeElement !== n)
            return
}
function xD(e) {
    const t = Gb(e),
        n = Uy(t, e),
        r = Uy(t.reverse(), e);
    return [n, r]
}
function Gb(e) {
    const t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: r => {
                const i = r.tagName === "INPUT" && r.type === "hidden";
                return r.disabled || r.hidden || i ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
            }
        });
    for (; n.nextNode();)
        t.push(n.currentNode);
    return t
}
function Uy(e, t) {
    for (const n of e)
        if (!wD(n, {
            upTo: t
        }))
            return n
}
function wD(e, {upTo: t}) {
    if (getComputedStyle(e).visibility === "hidden")
        return !0;
    for (; e;) {
        if (t !== void 0 && e === t)
            return !1;
        if (getComputedStyle(e).display === "none")
            return !0;
        e = e.parentElement
    }
    return !1
}
function bD(e) {
    return e instanceof HTMLInputElement && "select" in e
}
function Gn(e, {select: t=!1}={}) {
    if (e && e.focus) {
        const n = document.activeElement;
        e.focus({
            preventScroll: !0
        }),
        e !== n && bD(e) && t && e.select()
    }
}
var Wy = SD();
function SD() {
    let e = [];
    return {
        add(t) {
            const n = e[0];
            t !== n && (n == null || n.pause()),
            e = Hy(e, t),
            e.unshift(t)
        },
        remove(t) {
            var n;
            e = Hy(e, t),
            (n = e[0]) == null || n.resume()
        }
    }
}
function Hy(e, t) {
    const n = [...e],
        r = n.indexOf(t);
    return r !== -1 && n.splice(r, 1), n
}
function CD(e) {
    return e.filter(t => t.tagName !== "A")
}
function ED(e) {
    const t = y.useRef({
        value: e,
        previous: e
    });
    return y.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e])
}
var ND = function(e) {
        if (typeof document > "u")
            return null;
        var t = Array.isArray(e) ? e[0] : e;
        return t.ownerDocument.body
    },
    vi = new WeakMap,
    Pa = new WeakMap,
    ja = {},
    Ou = 0,
    qb = function(e) {
        return e && (e.host || qb(e.parentNode))
    },
    TD = function(e, t) {
        return t.map(function(n) {
            if (e.contains(n))
                return n;
            var r = qb(n);
            return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null)
        }).filter(function(n) {
            return !!n
        })
    },
    PD = function(e, t, n, r) {
        var i = TD(t, Array.isArray(e) ? e : [e]);
        ja[n] || (ja[n] = new WeakMap);
        var s = ja[n],
            o = [],
            a = new Set,
            l = new Set(i),
            u = function(f) {
                !f || a.has(f) || (a.add(f), u(f.parentNode))
            };
        i.forEach(u);
        var d = function(f) {
            !f || l.has(f) || Array.prototype.forEach.call(f.children, function(h) {
                if (a.has(h))
                    d(h);
                else
                    try {
                        var p = h.getAttribute(r),
                            b = p !== null && p !== "false",
                            m = (vi.get(h) || 0) + 1,
                            w = (s.get(h) || 0) + 1;
                        vi.set(h, m),
                        s.set(h, w),
                        o.push(h),
                        m === 1 && b && Pa.set(h, !0),
                        w === 1 && h.setAttribute(n, "true"),
                        b || h.setAttribute(r, "true")
                    } catch (v) {
                        console.error("aria-hidden: cannot operate on ", h, v)
                    }
            })
        };
        return d(t), a.clear(), Ou++, function() {
            o.forEach(function(f) {
                var h = vi.get(f) - 1,
                    p = s.get(f) - 1;
                vi.set(f, h),
                s.set(f, p),
                h || (Pa.has(f) || f.removeAttribute(r), Pa.delete(f)),
                p || f.removeAttribute(n)
            }),
            Ou--,
            Ou || (vi = new WeakMap, vi = new WeakMap, Pa = new WeakMap, ja = {})
        }
    },
    jD = function(e, t, n) {
        n === void 0 && (n = "data-aria-hidden");
        var r = Array.from(Array.isArray(e) ? e : [e]),
            i = ND(e);
        return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live]"))), PD(r, i, n, "aria-hidden")) : function() {
            return null
        }
    },
    fn = function() {
        return fn = Object.assign || function(t) {
            for (var n, r = 1, i = arguments.length; r < i; r++) {
                n = arguments[r];
                for (var s in n)
                    Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s])
            }
            return t
        }, fn.apply(this, arguments)
    };
function Qb(e, t) {
    var n = {};
    for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == "function")
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
            t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n
}
function kD(e, t, n) {
    if (n || arguments.length === 2)
        for (var r = 0, i = t.length, s; r < i; r++)
            (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
    return e.concat(s || Array.prototype.slice.call(t))
}
var Ya = "right-scroll-bar-position",
    Xa = "width-before-scroll-bar",
    RD = "with-scroll-bars-hidden",
    AD = "--removed-body-scroll-bar-size";
function Iu(e, t) {
    return typeof e == "function" ? e(t) : e && (e.current = t), e
}
function MD(e, t) {
    var n = y.useState(function() {
        return {
            value: e,
            callback: t,
            facade: {
                get current() {
                    return n.value
                },
                set current(r) {
                    var i = n.value;
                    i !== r && (n.value = r, n.callback(r, i))
                }
            }
        }
    })[0];
    return n.callback = t, n.facade
}
var OD = typeof window < "u" ? y.useLayoutEffect : y.useEffect,
    Ky = new WeakMap;
function ID(e, t) {
    var n = MD(null, function(r) {
        return e.forEach(function(i) {
            return Iu(i, r)
        })
    });
    return OD(function() {
        var r = Ky.get(n);
        if (r) {
            var i = new Set(r),
                s = new Set(e),
                o = n.current;
            i.forEach(function(a) {
                s.has(a) || Iu(a, null)
            }),
            s.forEach(function(a) {
                i.has(a) || Iu(a, o)
            })
        }
        Ky.set(n, e)
    }, [e]), n
}
function DD(e) {
    return e
}
function LD(e, t) {
    t === void 0 && (t = DD);
    var n = [],
        r = !1,
        i = {
            read: function() {
                if (r)
                    throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
                return n.length ? n[n.length - 1] : e
            },
            useMedium: function(s) {
                var o = t(s, r);
                return n.push(o), function() {
                    n = n.filter(function(a) {
                        return a !== o
                    })
                }
            },
            assignSyncMedium: function(s) {
                for (r = !0; n.length;) {
                    var o = n;
                    n = [],
                    o.forEach(s)
                }
                n = {
                    push: function(a) {
                        return s(a)
                    },
                    filter: function() {
                        return n
                    }
                }
            },
            assignMedium: function(s) {
                r = !0;
                var o = [];
                if (n.length) {
                    var a = n;
                    n = [],
                    a.forEach(s),
                    o = n
                }
                var l = function() {
                        var d = o;
                        o = [],
                        d.forEach(s)
                    },
                    u = function() {
                        return Promise.resolve().then(l)
                    };
                u(),
                n = {
                    push: function(d) {
                        o.push(d),
                        u()
                    },
                    filter: function(d) {
                        return o = o.filter(d), n
                    }
                }
            }
        };
    return i
}
function _D(e) {
    e === void 0 && (e = {});
    var t = LD(null);
    return t.options = fn({
        async: !0,
        ssr: !1
    }, e), t
}
var Yb = function(e) {
    var t = e.sideCar,
        n = Qb(e, ["sideCar"]);
    if (!t)
        throw new Error("Sidecar: please provide `sideCar` property to import the right car");
    var r = t.read();
    if (!r)
        throw new Error("Sidecar medium not found");
    return y.createElement(r, fn({}, n))
};
Yb.isSideCarExport = !0;
function VD(e, t) {
    return e.useMedium(t), Yb
}
var Xb = _D(),
    Du = function() {},
    wc = y.forwardRef(function(e, t) {
        var n = y.useRef(null),
            r = y.useState({
                onScrollCapture: Du,
                onWheelCapture: Du,
                onTouchMoveCapture: Du
            }),
            i = r[0],
            s = r[1],
            o = e.forwardProps,
            a = e.children,
            l = e.className,
            u = e.removeScrollBar,
            d = e.enabled,
            f = e.shards,
            h = e.sideCar,
            p = e.noRelative,
            b = e.noIsolation,
            m = e.inert,
            w = e.allowPinchZoom,
            v = e.as,
            g = v === void 0 ? "div" : v,
            x = e.gapMode,
            S = Qb(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]),
            C = h,
            E = ID([n, t]),
            N = fn(fn({}, S), i);
        return y.createElement(y.Fragment, null, d && y.createElement(C, {
            sideCar: Xb,
            removeScrollBar: u,
            shards: f,
            noRelative: p,
            noIsolation: b,
            inert: m,
            setCallbacks: s,
            allowPinchZoom: !!w,
            lockRef: n,
            gapMode: x
        }), o ? y.cloneElement(y.Children.only(a), fn(fn({}, N), {
            ref: E
        })) : y.createElement(g, fn({}, N, {
            className: l,
            ref: E
        }), a))
    });
wc.defaultProps = {
    enabled: !0,
    removeScrollBar: !0,
    inert: !1
};
wc.classNames = {
    fullWidth: Xa,
    zeroRight: Ya
};
var FD = function() {
    if (typeof __webpack_nonce__ < "u")
        return __webpack_nonce__
};
function zD() {
    if (!document)
        return null;
    var e = document.createElement("style");
    e.type = "text/css";
    var t = FD();
    return t && e.setAttribute("nonce", t), e
}
function BD(e, t) {
    e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t))
}
function $D(e) {
    var t = document.head || document.getElementsByTagName("head")[0];
    t.appendChild(e)
}
var UD = function() {
        var e = 0,
            t = null;
        return {
            add: function(n) {
                e == 0 && (t = zD()) && (BD(t, n), $D(t)),
                e++
            },
            remove: function() {
                e--,
                !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null)
            }
        }
    },
    WD = function() {
        var e = UD();
        return function(t, n) {
            y.useEffect(function() {
                return e.add(t), function() {
                    e.remove()
                }
            }, [t && n])
        }
    },
    Zb = function() {
        var e = WD(),
            t = function(n) {
                var r = n.styles,
                    i = n.dynamic;
                return e(r, i), null
            };
        return t
    },
    HD = {
        left: 0,
        top: 0,
        right: 0,
        gap: 0
    },
    Lu = function(e) {
        return parseInt(e || "", 10) || 0
    },
    KD = function(e) {
        var t = window.getComputedStyle(document.body),
            n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
            r = t[e === "padding" ? "paddingTop" : "marginTop"],
            i = t[e === "padding" ? "paddingRight" : "marginRight"];
        return [Lu(n), Lu(r), Lu(i)]
    },
    GD = function(e) {
        if (e === void 0 && (e = "margin"), typeof window > "u")
            return HD;
        var t = KD(e),
            n = document.documentElement.clientWidth,
            r = window.innerWidth;
        return {
            left: t[0],
            top: t[1],
            right: t[2],
            gap: Math.max(0, r - n + t[2] - t[0])
        }
    },
    qD = Zb(),
    Ki = "data-scroll-locked",
    QD = function(e, t, n, r) {
        var i = e.left,
            s = e.top,
            o = e.right,
            a = e.gap;
        return n === void 0 && (n = "margin"), `
  .`
        .concat(RD, ` {
   overflow: hidden `
        ).concat(r, `;
   padding-right: `
        ).concat(a, "px ").concat(r, `;
  }
  body[`

        ).concat(Ki, `] {
    overflow: hidden `
        ).concat(r, `;
    overscroll-behavior: contain;
    `

        ).concat([t && "position: relative ".concat(r, ";"), n === "margin" && `
    padding-left: `
        .concat(i, `px;
    padding-top: `
        ).concat(s, `px;
    padding-right: `
        ).concat(o, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `


        ).concat(a, "px ").concat(r, `;
    `
        ), n === "padding" && "padding-right: ".concat(a, "px ").concat(r, ";")].filter(Boolean).join(""), `
  }
  
  .`


        ).concat(Ya, ` {
    right: `
        ).concat(a, "px ").concat(r, `;
  }
  
  .`


        ).concat(Xa, ` {
    margin-right: `
        ).concat(a, "px ").concat(r, `;
  }
  
  .`


        ).concat(Ya, " .").concat(Ya, ` {
    right: 0 `
        ).concat(r, `;
  }
  
  .`


        ).concat(Xa, " .").concat(Xa, ` {
    margin-right: 0 `
        ).concat(r, `;
  }
  
  body[`


        ).concat(Ki, `] {
    `
        ).concat(AD, ": ").concat(a, `px;
  }
`

        )
    },
    Gy = function() {
        var e = parseInt(document.body.getAttribute(Ki) || "0", 10);
        return isFinite(e) ? e : 0
    },
    YD = function() {
        y.useEffect(function() {
            return document.body.setAttribute(Ki, (Gy() + 1).toString()), function() {
                var e = Gy() - 1;
                e <= 0 ? document.body.removeAttribute(Ki) : document.body.setAttribute(Ki, e.toString())
            }
        }, [])
    },
    XD = function(e) {
        var t = e.noRelative,
            n = e.noImportant,
            r = e.gapMode,
            i = r === void 0 ? "margin" : r;
        YD();
        var s = y.useMemo(function() {
            return GD(i)
        }, [i]);
        return y.createElement(qD, {
            styles: QD(s, !t, i, n ? "" : "!important")
        })
    },
    gf = !1;
if (typeof window < "u")
    try {
        var ka = Object.defineProperty({}, "passive", {
            get: function() {
                return gf = !0, !0
            }
        });
        window.addEventListener("test", ka, ka),
        window.removeEventListener("test", ka, ka)
    } catch {
        gf = !1
    }
var xi = gf ? {
        passive: !1
    } : !1,
    ZD = function(e) {
        return e.tagName === "TEXTAREA"
    },
    Jb = function(e, t) {
        if (!(e instanceof Element))
            return !1;
        var n = window.getComputedStyle(e);
        return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !ZD(e) && n[t] === "visible")
    },
    JD = function(e) {
        return Jb(e, "overflowY")
    },
    eL = function(e) {
        return Jb(e, "overflowX")
    },
    qy = function(e, t) {
        var n = t.ownerDocument,
            r = t;
        do {
            typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
            var i = eS(e, r);
            if (i) {
                var s = tS(e, r),
                    o = s[1],
                    a = s[2];
                if (o > a)
                    return !0
            }
            r = r.parentNode
        } while (r && r !== n.body);
        return !1
    },
    tL = function(e) {
        var t = e.scrollTop,
            n = e.scrollHeight,
            r = e.clientHeight;
        return [t, n, r]
    },
    nL = function(e) {
        var t = e.scrollLeft,
            n = e.scrollWidth,
            r = e.clientWidth;
        return [t, n, r]
    },
    eS = function(e, t) {
        return e === "v" ? JD(t) : eL(t)
    },
    tS = function(e, t) {
        return e === "v" ? tL(t) : nL(t)
    },
    rL = function(e, t) {
        return e === "h" && t === "rtl" ? -1 : 1
    },
    iL = function(e, t, n, r, i) {
        var s = rL(e, window.getComputedStyle(t).direction),
            o = s * r,
            a = n.target,
            l = t.contains(a),
            u = !1,
            d = o > 0,
            f = 0,
            h = 0;
        do {
            if (!a)
                break;
            var p = tS(e, a),
                b = p[0],
                m = p[1],
                w = p[2],
                v = m - w - s * b;
            (b || v) && eS(e, a) && (f += v, h += b);
            var g = a.parentNode;
            a = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g
        } while (!l && a !== document.body || l && (t.contains(a) || t === a));
        return (d && (Math.abs(f) < 1 || !i) || !d && (Math.abs(h) < 1 || !i)) && (u = !0), u
    },
    Ra = function(e) {
        return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0]
    },
    Qy = function(e) {
        return [e.deltaX, e.deltaY]
    },
    Yy = function(e) {
        return e && "current" in e ? e.current : e
    },
    sL = function(e, t) {
        return e[0] === t[0] && e[1] === t[1]
    },
    oL = function(e) {
        return `
  .block-interactivity-`
        .concat(e, ` {pointer-events: none;}
  .allow-interactivity-`
        ).concat(e, ` {pointer-events: all;}
`
        )
    },
    aL = 0,
    wi = [];
function lL(e) {
    var t = y.useRef([]),
        n = y.useRef([0, 0]),
        r = y.useRef(),
        i = y.useState(aL++)[0],
        s = y.useState(Zb)[0],
        o = y.useRef(e);
    y.useEffect(function() {
        o.current = e
    }, [e]),
    y.useEffect(function() {
        if (e.inert) {
            document.body.classList.add("block-interactivity-".concat(i));
            var m = kD([e.lockRef.current], (e.shards || []).map(Yy), !0).filter(Boolean);
            return m.forEach(function(w) {
                return w.classList.add("allow-interactivity-".concat(i))
            }), function() {
                document.body.classList.remove("block-interactivity-".concat(i)),
                m.forEach(function(w) {
                    return w.classList.remove("allow-interactivity-".concat(i))
                })
            }
        }
    }, [e.inert, e.lockRef.current, e.shards]);
    var a = y.useCallback(function(m, w) {
            if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
                return !o.current.allowPinchZoom;
            var v = Ra(m),
                g = n.current,
                x = "deltaX" in m ? m.deltaX : g[0] - v[0],
                S = "deltaY" in m ? m.deltaY : g[1] - v[1],
                C,
                E = m.target,
                N = Math.abs(x) > Math.abs(S) ? "h" : "v";
            if ("touches" in m && N === "h" && E.type === "range")
                return !1;
            var T = qy(N, E);
            if (!T)
                return !0;
            if (T ? C = N : (C = N === "v" ? "h" : "v", T = qy(N, E)), !T)
                return !1;
            if (!r.current && "changedTouches" in m && (x || S) && (r.current = C), !C)
                return !0;
            var k = r.current || C;
            return iL(k, w, m, k === "h" ? x : S, !0)
        }, []),
        l = y.useCallback(function(m) {
            var w = m;
            if (!(!wi.length || wi[wi.length - 1] !== s)) {
                var v = "deltaY" in w ? Qy(w) : Ra(w),
                    g = t.current.filter(function(C) {
                        return C.name === w.type && (C.target === w.target || w.target === C.shadowParent) && sL(C.delta, v)
                    })[0];
                if (g && g.should) {
                    w.cancelable && w.preventDefault();
                    return
                }
                if (!g) {
                    var x = (o.current.shards || []).map(Yy).filter(Boolean).filter(function(C) {
                            return C.contains(w.target)
                        }),
                        S = x.length > 0 ? a(w, x[0]) : !o.current.noIsolation;
                    S && w.cancelable && w.preventDefault()
                }
            }
        }, []),
        u = y.useCallback(function(m, w, v, g) {
            var x = {
                name: m,
                delta: w,
                target: v,
                should: g,
                shadowParent: cL(v)
            };
            t.current.push(x),
            setTimeout(function() {
                t.current = t.current.filter(function(S) {
                    return S !== x
                })
            }, 1)
        }, []),
        d = y.useCallback(function(m) {
            n.current = Ra(m),
            r.current = void 0
        }, []),
        f = y.useCallback(function(m) {
            u(m.type, Qy(m), m.target, a(m, e.lockRef.current))
        }, []),
        h = y.useCallback(function(m) {
            u(m.type, Ra(m), m.target, a(m, e.lockRef.current))
        }, []);
    y.useEffect(function() {
        return wi.push(s), e.setCallbacks({
            onScrollCapture: f,
            onWheelCapture: f,
            onTouchMoveCapture: h
        }), document.addEventListener("wheel", l, xi), document.addEventListener("touchmove", l, xi), document.addEventListener("touchstart", d, xi), function() {
            wi = wi.filter(function(m) {
                return m !== s
            }),
            document.removeEventListener("wheel", l, xi),
            document.removeEventListener("touchmove", l, xi),
            document.removeEventListener("touchstart", d, xi)
        }
    }, []);
    var p = e.removeScrollBar,
        b = e.inert;
    return y.createElement(y.Fragment, null, b ? y.createElement(s, {
        styles: oL(i)
    }) : null, p ? y.createElement(XD, {
        noRelative: e.noRelative,
        gapMode: e.gapMode
    }) : null)
}
function cL(e) {
    for (var t = null; e !== null;)
        e instanceof ShadowRoot && (t = e.host, e = e.host),
        e = e.parentNode;
    return t
}
const uL = VD(Xb, lL);
var nS = y.forwardRef(function(e, t) {
    return y.createElement(wc, fn({}, e, {
        ref: t,
        sideCar: uL
    }))
});
nS.classNames = wc.classNames;
var dL = [" ", "Enter", "ArrowUp", "ArrowDown"],
    fL = [" ", "Enter"],
    si = "Select",
    [bc, Sc, hL] = E0(si),
    [Es, r4] = $o(si, [hL, cc]),
    Cc = cc(),
    [pL, jr] = Es(si),
    [mL, gL] = Es(si),
    rS = e => {
        const {__scopeSelect: t, children: n, open: r, defaultOpen: i, onOpenChange: s, value: o, defaultValue: a, onValueChange: l, dir: u, name: d, autoComplete: f, disabled: h, required: p, form: b} = e,
            m = Cc(t),
            [w, v] = y.useState(null),
            [g, x] = y.useState(null),
            [S, C] = y.useState(!1),
            E = mD(u),
            [N, T] = Ad({
                prop: r,
                defaultProp: i ?? !1,
                onChange: s,
                caller: si
            }),
            [k, A] = Ad({
                prop: o,
                defaultProp: a,
                onChange: l,
                caller: si
            }),
            z = y.useRef(null),
            D = w ? b || !!w.closest("form") : !0,
            [H, O] = y.useState(new Set),
            K = Array.from(H).map(U => U.props.value).join(";");
        return c.jsx(wj, {
            ...m,
            children: c.jsxs(pL, {
                required: p,
                scope: t,
                trigger: w,
                onTriggerChange: v,
                valueNode: g,
                onValueNodeChange: x,
                valueNodeHasChildren: S,
                onValueNodeHasChildrenChange: C,
                contentId: jh(),
                value: k,
                onValueChange: A,
                open: N,
                onOpenChange: T,
                dir: E,
                triggerPointerDownPosRef: z,
                disabled: h,
                children: [c.jsx(bc.Provider, {
                    scope: t,
                    children: c.jsx(mL, {
                        scope: e.__scopeSelect,
                        onNativeOptionAdd: y.useCallback(U => {
                            O(V => new Set(V).add(U))
                        }, []),
                        onNativeOptionRemove: y.useCallback(U => {
                            O(V => {
                                const P = new Set(V);
                                return P.delete(U), P
                            })
                        }, []),
                        children: n
                    })
                }), D ? c.jsxs(PS, {
                    "aria-hidden": !0,
                    required: p,
                    tabIndex: -1,
                    name: d,
                    autoComplete: f,
                    value: k,
                    onChange: U => A(U.target.value),
                    disabled: h,
                    form: b,
                    children: [k === void 0 ? c.jsx("option", {
                        value: ""
                    }) : null, Array.from(H)]
                }, K) : null]
            })
        })
    };
rS.displayName = si;
var iS = "SelectTrigger",
    sS = y.forwardRef((e, t) => {
        const {__scopeSelect: n, disabled: r=!1, ...i} = e,
            s = Cc(n),
            o = jr(iS, n),
            a = o.disabled || r,
            l = Re(t, o.onTriggerChange),
            u = Sc(n),
            d = y.useRef("touch"),
            [f, h, p] = kS(m => {
                const w = u().filter(x => !x.disabled),
                    v = w.find(x => x.value === o.value),
                    g = RS(w, m, v);
                g !== void 0 && o.onValueChange(g.value)
            }),
            b = m => {
                a || (o.onOpenChange(!0), p()),
                m && (o.triggerPointerDownPosRef.current = {
                    x: Math.round(m.pageX),
                    y: Math.round(m.pageY)
                })
            };
        return c.jsx(Ow, {
            asChild: !0,
            ...s,
            children: c.jsx(ue.button, {
                type: "button",
                role: "combobox",
                "aria-controls": o.contentId,
                "aria-expanded": o.open,
                "aria-required": o.required,
                "aria-autocomplete": "none",
                dir: o.dir,
                "data-state": o.open ? "open" : "closed",
                disabled: a,
                "data-disabled": a ? "" : void 0,
                "data-placeholder": jS(o.value) ? "" : void 0,
                ...i,
                ref: l,
                onClick: ee(i.onClick, m => {
                    m.currentTarget.focus(),
                    d.current !== "mouse" && b(m)
                }),
                onPointerDown: ee(i.onPointerDown, m => {
                    d.current = m.pointerType;
                    const w = m.target;
                    w.hasPointerCapture(m.pointerId) && w.releasePointerCapture(m.pointerId),
                    m.button === 0 && m.ctrlKey === !1 && m.pointerType === "mouse" && (b(m), m.preventDefault())
                }),
                onKeyDown: ee(i.onKeyDown, m => {
                    const w = f.current !== "";
                    !(m.ctrlKey || m.altKey || m.metaKey) && m.key.length === 1 && h(m.key),
                    !(w && m.key === " ") && dL.includes(m.key) && (b(), m.preventDefault())
                })
            })
        })
    });
sS.displayName = iS;
var oS = "SelectValue",
    aS = y.forwardRef((e, t) => {
        const {__scopeSelect: n, className: r, style: i, children: s, placeholder: o="", ...a} = e,
            l = jr(oS, n),
            {onValueNodeHasChildrenChange: u} = l,
            d = s !== void 0,
            f = Re(t, l.onValueNodeChange);
        return He(() => {
            u(d)
        }, [u, d]), c.jsx(ue.span, {
            ...a,
            ref: f,
            style: {
                pointerEvents: "none"
            },
            children: jS(l.value) ? c.jsx(c.Fragment, {
                children: o
            }) : s
        })
    });
aS.displayName = oS;
var yL = "SelectIcon",
    lS = y.forwardRef((e, t) => {
        const {__scopeSelect: n, children: r, ...i} = e;
        return c.jsx(ue.span, {
            "aria-hidden": !0,
            ...i,
            ref: t,
            children: r || "▼"
        })
    });
lS.displayName = yL;
var vL = "SelectPortal",
    cS = e => c.jsx(xh, {
        asChild: !0,
        ...e
    });
cS.displayName = vL;
var oi = "SelectContent",
    uS = y.forwardRef((e, t) => {
        const n = jr(oi, e.__scopeSelect),
            [r, i] = y.useState();
        if (He(() => {
            i(new DocumentFragment)
        }, []), !n.open) {
            const s = r;
            return s ? ci.createPortal(c.jsx(dS, {
                scope: e.__scopeSelect,
                children: c.jsx(bc.Slot, {
                    scope: e.__scopeSelect,
                    children: c.jsx("div", {
                        children: e.children
                    })
                })
            }), s) : null
        }
        return c.jsx(fS, {
            ...e,
            ref: t
        })
    });
uS.displayName = oi;
var Wt = 10,
    [dS, kr] = Es(oi),
    xL = "SelectContentImpl",
    wL = Co("SelectContent.RemoveScroll"),
    fS = y.forwardRef((e, t) => {
        const {__scopeSelect: n, position: r="item-aligned", onCloseAutoFocus: i, onEscapeKeyDown: s, onPointerDownOutside: o, side: a, sideOffset: l, align: u, alignOffset: d, arrowPadding: f, collisionBoundary: h, collisionPadding: p, sticky: b, hideWhenDetached: m, avoidCollisions: w, ...v} = e,
            g = jr(oi, n),
            [x, S] = y.useState(null),
            [C, E] = y.useState(null),
            N = Re(t, _ => S(_)),
            [T, k] = y.useState(null),
            [A, z] = y.useState(null),
            D = Sc(n),
            [H, O] = y.useState(!1),
            K = y.useRef(!1);
        y.useEffect(() => {
            if (x)
                return jD(x)
        }, [x]),
        gD();
        const U = y.useCallback(_ => {
                const [le, ...Pe] = D().map(ie => ie.ref.current),
                    [oe] = Pe.slice(-1),
                    ne = document.activeElement;
                for (const ie of _)
                    if (ie === ne || (ie == null || ie.scrollIntoView({
                        block: "nearest"
                    }), ie === le && C && (C.scrollTop = 0), ie === oe && C && (C.scrollTop = C.scrollHeight), ie == null || ie.focus(), document.activeElement !== ne))
                        return
            }, [D, C]),
            V = y.useCallback(() => U([T, x]), [U, T, x]);
        y.useEffect(() => {
            H && V()
        }, [H, V]);
        const {onOpenChange: P, triggerPointerDownPosRef: j} = g;
        y.useEffect(() => {
            if (x) {
                let _ = {
                    x: 0,
                    y: 0
                };
                const le = oe => {
                        var ne,
                            ie;
                        _ = {
                            x: Math.abs(Math.round(oe.pageX) - (((ne = j.current) == null ? void 0 : ne.x) ?? 0)),
                            y: Math.abs(Math.round(oe.pageY) - (((ie = j.current) == null ? void 0 : ie.y) ?? 0))
                        }
                    },
                    Pe = oe => {
                        _.x <= 10 && _.y <= 10 ? oe.preventDefault() : x.contains(oe.target) || P(!1),
                        document.removeEventListener("pointermove", le),
                        j.current = null
                    };
                return j.current !== null && (document.addEventListener("pointermove", le), document.addEventListener("pointerup", Pe, {
                    capture: !0,
                    once: !0
                })), () => {
                    document.removeEventListener("pointermove", le),
                    document.removeEventListener("pointerup", Pe, {
                        capture: !0
                    })
                }
            }
        }, [x, P, j]),
        y.useEffect(() => {
            const _ = () => P(!1);
            return window.addEventListener("blur", _), window.addEventListener("resize", _), () => {
                window.removeEventListener("blur", _),
                window.removeEventListener("resize", _)
            }
        }, [P]);
        const [L, G] = kS(_ => {
                const le = D().filter(ne => !ne.disabled),
                    Pe = le.find(ne => ne.ref.current === document.activeElement),
                    oe = RS(le, _, Pe);
                oe && setTimeout(() => oe.ref.current.focus())
            }),
            W = y.useCallback((_, le, Pe) => {
                const oe = !K.current && !Pe;
                (g.value !== void 0 && g.value === le || oe) && (k(_), oe && (K.current = !0))
            }, [g.value]),
            X = y.useCallback(() => x == null ? void 0 : x.focus(), [x]),
            q = y.useCallback((_, le, Pe) => {
                const oe = !K.current && !Pe;
                (g.value !== void 0 && g.value === le || oe) && z(_)
            }, [g.value]),
            pe = r === "popper" ? yf : hS,
            Te = pe === yf ? {
                side: a,
                sideOffset: l,
                align: u,
                alignOffset: d,
                arrowPadding: f,
                collisionBoundary: h,
                collisionPadding: p,
                sticky: b,
                hideWhenDetached: m,
                avoidCollisions: w
            } : {};
        return c.jsx(dS, {
            scope: n,
            content: x,
            viewport: C,
            onViewportChange: E,
            itemRefCallback: W,
            selectedItem: T,
            onItemLeave: X,
            itemTextRefCallback: q,
            focusSelectedItem: V,
            selectedItemText: A,
            position: r,
            isPositioned: H,
            searchRef: L,
            children: c.jsx(nS, {
                as: wL,
                allowPinchZoom: !0,
                children: c.jsx(Kb, {
                    asChild: !0,
                    trapped: g.open,
                    onMountAutoFocus: _ => {
                        _.preventDefault()
                    },
                    onUnmountAutoFocus: ee(i, _ => {
                        var le;
                        (le = g.trigger) == null || le.focus({
                            preventScroll: !0
                        }),
                        _.preventDefault()
                    }),
                    children: c.jsx(ec, {
                        asChild: !0,
                        disableOutsidePointerEvents: !0,
                        onEscapeKeyDown: s,
                        onPointerDownOutside: o,
                        onFocusOutside: _ => _.preventDefault(),
                        onDismiss: () => g.onOpenChange(!1),
                        children: c.jsx(pe, {
                            role: "listbox",
                            id: g.contentId,
                            "data-state": g.open ? "open" : "closed",
                            dir: g.dir,
                            onContextMenu: _ => _.preventDefault(),
                            ...v,
                            ...Te,
                            onPlaced: () => O(!0),
                            ref: N,
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                outline: "none",
                                ...v.style
                            },
                            onKeyDown: ee(v.onKeyDown, _ => {
                                const le = _.ctrlKey || _.altKey || _.metaKey;
                                if (_.key === "Tab" && _.preventDefault(), !le && _.key.length === 1 && G(_.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(_.key)) {
                                    let oe = D().filter(ne => !ne.disabled).map(ne => ne.ref.current);
                                    if (["ArrowUp", "End"].includes(_.key) && (oe = oe.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(_.key)) {
                                        const ne = _.target,
                                            ie = oe.indexOf(ne);
                                        oe = oe.slice(ie + 1)
                                    }
                                    setTimeout(() => U(oe)),
                                    _.preventDefault()
                                }
                            })
                        })
                    })
                })
            })
        })
    });
fS.displayName = xL;
var bL = "SelectItemAlignedPosition",
    hS = y.forwardRef((e, t) => {
        const {__scopeSelect: n, onPlaced: r, ...i} = e,
            s = jr(oi, n),
            o = kr(oi, n),
            [a, l] = y.useState(null),
            [u, d] = y.useState(null),
            f = Re(t, N => d(N)),
            h = Sc(n),
            p = y.useRef(!1),
            b = y.useRef(!0),
            {viewport: m, selectedItem: w, selectedItemText: v, focusSelectedItem: g} = o,
            x = y.useCallback(() => {
                if (s.trigger && s.valueNode && a && u && m && w && v) {
                    const N = s.trigger.getBoundingClientRect(),
                        T = u.getBoundingClientRect(),
                        k = s.valueNode.getBoundingClientRect(),
                        A = v.getBoundingClientRect();
                    if (s.dir !== "rtl") {
                        const ne = A.left - T.left,
                            ie = k.left - ne,
                            Ke = N.left - ie,
                            Ct = N.width + Ke,
                            Rr = Math.max(Ct, T.width),
                            Vn = window.innerWidth - Wt,
                            Ar = zy(ie, [Wt, Math.max(Wt, Vn - Rr)]);
                        a.style.minWidth = Ct + "px",
                        a.style.left = Ar + "px"
                    } else {
                        const ne = T.right - A.right,
                            ie = window.innerWidth - k.right - ne,
                            Ke = window.innerWidth - N.right - ie,
                            Ct = N.width + Ke,
                            Rr = Math.max(Ct, T.width),
                            Vn = window.innerWidth - Wt,
                            Ar = zy(ie, [Wt, Math.max(Wt, Vn - Rr)]);
                        a.style.minWidth = Ct + "px",
                        a.style.right = Ar + "px"
                    }
                    const z = h(),
                        D = window.innerHeight - Wt * 2,
                        H = m.scrollHeight,
                        O = window.getComputedStyle(u),
                        K = parseInt(O.borderTopWidth, 10),
                        U = parseInt(O.paddingTop, 10),
                        V = parseInt(O.borderBottomWidth, 10),
                        P = parseInt(O.paddingBottom, 10),
                        j = K + U + H + P + V,
                        L = Math.min(w.offsetHeight * 5, j),
                        G = window.getComputedStyle(m),
                        W = parseInt(G.paddingTop, 10),
                        X = parseInt(G.paddingBottom, 10),
                        q = N.top + N.height / 2 - Wt,
                        pe = D - q,
                        Te = w.offsetHeight / 2,
                        _ = w.offsetTop + Te,
                        le = K + U + _,
                        Pe = j - le;
                    if (le <= q) {
                        const ne = z.length > 0 && w === z[z.length - 1].ref.current;
                        a.style.bottom = "0px";
                        const ie = u.clientHeight - m.offsetTop - m.offsetHeight,
                            Ke = Math.max(pe, Te + (ne ? X : 0) + ie + V),
                            Ct = le + Ke;
                        a.style.height = Ct + "px"
                    } else {
                        const ne = z.length > 0 && w === z[0].ref.current;
                        a.style.top = "0px";
                        const Ke = Math.max(q, K + m.offsetTop + (ne ? W : 0) + Te) + Pe;
                        a.style.height = Ke + "px",
                        m.scrollTop = le - q + m.offsetTop
                    }
                    a.style.margin = `${Wt}px 0`,
                    a.style.minHeight = L + "px",
                    a.style.maxHeight = D + "px",
                    r == null || r(),
                    requestAnimationFrame(() => p.current = !0)
                }
            }, [h, s.trigger, s.valueNode, a, u, m, w, v, s.dir, r]);
        He(() => x(), [x]);
        const [S, C] = y.useState();
        He(() => {
            u && C(window.getComputedStyle(u).zIndex)
        }, [u]);
        const E = y.useCallback(N => {
            N && b.current === !0 && (x(), g == null || g(), b.current = !1)
        }, [x, g]);
        return c.jsx(CL, {
            scope: n,
            contentWrapper: a,
            shouldExpandOnScrollRef: p,
            onScrollButtonChange: E,
            children: c.jsx("div", {
                ref: l,
                style: {
                    display: "flex",
                    flexDirection: "column",
                    position: "fixed",
                    zIndex: S
                },
                children: c.jsx(ue.div, {
                    ...i,
                    ref: f,
                    style: {
                        boxSizing: "border-box",
                        maxHeight: "100%",
                        ...i.style
                    }
                })
            })
        })
    });
hS.displayName = bL;
var SL = "SelectPopperPosition",
    yf = y.forwardRef((e, t) => {
        const {__scopeSelect: n, align: r="start", collisionPadding: i=Wt, ...s} = e,
            o = Cc(n);
        return c.jsx(Iw, {
            ...o,
            ...s,
            ref: t,
            align: r,
            collisionPadding: i,
            style: {
                boxSizing: "border-box",
                ...s.style,
                "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-select-content-available-width": "var(--radix-popper-available-width)",
                "--radix-select-content-available-height": "var(--radix-popper-available-height)",
                "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
            }
        })
    });
yf.displayName = SL;
var [CL, Sp] = Es(oi, {}),
    vf = "SelectViewport",
    pS = y.forwardRef((e, t) => {
        const {__scopeSelect: n, nonce: r, ...i} = e,
            s = kr(vf, n),
            o = Sp(vf, n),
            a = Re(t, s.onViewportChange),
            l = y.useRef(0);
        return c.jsxs(c.Fragment, {
            children: [c.jsx("style", {
                dangerouslySetInnerHTML: {
                    __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
                },
                nonce: r
            }), c.jsx(bc.Slot, {
                scope: n,
                children: c.jsx(ue.div, {
                    "data-radix-select-viewport": "",
                    role: "presentation",
                    ...i,
                    ref: a,
                    style: {
                        position: "relative",
                        flex: 1,
                        overflow: "hidden auto",
                        ...i.style
                    },
                    onScroll: ee(i.onScroll, u => {
                        const d = u.currentTarget,
                            {contentWrapper: f, shouldExpandOnScrollRef: h} = o;
                        if (h != null && h.current && f) {
                            const p = Math.abs(l.current - d.scrollTop);
                            if (p > 0) {
                                const b = window.innerHeight - Wt * 2,
                                    m = parseFloat(f.style.minHeight),
                                    w = parseFloat(f.style.height),
                                    v = Math.max(m, w);
                                if (v < b) {
                                    const g = v + p,
                                        x = Math.min(b, g),
                                        S = g - x;
                                    f.style.height = x + "px",
                                    f.style.bottom === "0px" && (d.scrollTop = S > 0 ? S : 0, f.style.justifyContent = "flex-end")
                                }
                            }
                        }
                        l.current = d.scrollTop
                    })
                })
            })]
        })
    });
pS.displayName = vf;
var mS = "SelectGroup",
    [EL, NL] = Es(mS),
    TL = y.forwardRef((e, t) => {
        const {__scopeSelect: n, ...r} = e,
            i = jh();
        return c.jsx(EL, {
            scope: n,
            id: i,
            children: c.jsx(ue.div, {
                role: "group",
                "aria-labelledby": i,
                ...r,
                ref: t
            })
        })
    });
TL.displayName = mS;
var gS = "SelectLabel",
    yS = y.forwardRef((e, t) => {
        const {__scopeSelect: n, ...r} = e,
            i = NL(gS, n);
        return c.jsx(ue.div, {
            id: i.id,
            ...r,
            ref: t
        })
    });
yS.displayName = gS;
var Ll = "SelectItem",
    [PL, vS] = Es(Ll),
    xS = y.forwardRef((e, t) => {
        const {__scopeSelect: n, value: r, disabled: i=!1, textValue: s, ...o} = e,
            a = jr(Ll, n),
            l = kr(Ll, n),
            u = a.value === r,
            [d, f] = y.useState(s ?? ""),
            [h, p] = y.useState(!1),
            b = Re(t, g => {
                var x;
                return (x = l.itemRefCallback) == null ? void 0 : x.call(l, g, r, i)
            }),
            m = jh(),
            w = y.useRef("touch"),
            v = () => {
                i || (a.onValueChange(r), a.onOpenChange(!1))
            };
        if (r === "")
            throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
        return c.jsx(PL, {
            scope: n,
            value: r,
            disabled: i,
            textId: m,
            isSelected: u,
            onItemTextChange: y.useCallback(g => {
                f(x => x || ((g == null ? void 0 : g.textContent) ?? "").trim())
            }, []),
            children: c.jsx(bc.ItemSlot, {
                scope: n,
                value: r,
                disabled: i,
                textValue: d,
                children: c.jsx(ue.div, {
                    role: "option",
                    "aria-labelledby": m,
                    "data-highlighted": h ? "" : void 0,
                    "aria-selected": u && h,
                    "data-state": u ? "checked" : "unchecked",
                    "aria-disabled": i || void 0,
                    "data-disabled": i ? "" : void 0,
                    tabIndex: i ? void 0 : -1,
                    ...o,
                    ref: b,
                    onFocus: ee(o.onFocus, () => p(!0)),
                    onBlur: ee(o.onBlur, () => p(!1)),
                    onClick: ee(o.onClick, () => {
                        w.current !== "mouse" && v()
                    }),
                    onPointerUp: ee(o.onPointerUp, () => {
                        w.current === "mouse" && v()
                    }),
                    onPointerDown: ee(o.onPointerDown, g => {
                        w.current = g.pointerType
                    }),
                    onPointerMove: ee(o.onPointerMove, g => {
                        var x;
                        w.current = g.pointerType,
                        i ? (x = l.onItemLeave) == null || x.call(l) : w.current === "mouse" && g.currentTarget.focus({
                            preventScroll: !0
                        })
                    }),
                    onPointerLeave: ee(o.onPointerLeave, g => {
                        var x;
                        g.currentTarget === document.activeElement && ((x = l.onItemLeave) == null || x.call(l))
                    }),
                    onKeyDown: ee(o.onKeyDown, g => {
                        var S;
                        ((S = l.searchRef) == null ? void 0 : S.current) !== "" && g.key === " " || (fL.includes(g.key) && v(), g.key === " " && g.preventDefault())
                    })
                })
            })
        })
    });
xS.displayName = Ll;
var Ws = "SelectItemText",
    wS = y.forwardRef((e, t) => {
        const {__scopeSelect: n, className: r, style: i, ...s} = e,
            o = jr(Ws, n),
            a = kr(Ws, n),
            l = vS(Ws, n),
            u = gL(Ws, n),
            [d, f] = y.useState(null),
            h = Re(t, v => f(v), l.onItemTextChange, v => {
                var g;
                return (g = a.itemTextRefCallback) == null ? void 0 : g.call(a, v, l.value, l.disabled)
            }),
            p = d == null ? void 0 : d.textContent,
            b = y.useMemo(() => c.jsx("option", {
                value: l.value,
                disabled: l.disabled,
                children: p
            }, l.value), [l.disabled, l.value, p]),
            {onNativeOptionAdd: m, onNativeOptionRemove: w} = u;
        return He(() => (m(b), () => w(b)), [m, w, b]), c.jsxs(c.Fragment, {
            children: [c.jsx(ue.span, {
                id: l.textId,
                ...s,
                ref: h
            }), l.isSelected && o.valueNode && !o.valueNodeHasChildren ? ci.createPortal(s.children, o.valueNode) : null]
        })
    });
wS.displayName = Ws;
var bS = "SelectItemIndicator",
    SS = y.forwardRef((e, t) => {
        const {__scopeSelect: n, ...r} = e;
        return vS(bS, n).isSelected ? c.jsx(ue.span, {
            "aria-hidden": !0,
            ...r,
            ref: t
        }) : null
    });
SS.displayName = bS;
var xf = "SelectScrollUpButton",
    CS = y.forwardRef((e, t) => {
        const n = kr(xf, e.__scopeSelect),
            r = Sp(xf, e.__scopeSelect),
            [i, s] = y.useState(!1),
            o = Re(t, r.onScrollButtonChange);
        return He(() => {
            if (n.viewport && n.isPositioned) {
                let a = function() {
                    const u = l.scrollTop > 0;
                    s(u)
                };
                const l = n.viewport;
                return a(), l.addEventListener("scroll", a), () => l.removeEventListener("scroll", a)
            }
        }, [n.viewport, n.isPositioned]), i ? c.jsx(NS, {
            ...e,
            ref: o,
            onAutoScroll: () => {
                const {viewport: a, selectedItem: l} = n;
                a && l && (a.scrollTop = a.scrollTop - l.offsetHeight)
            }
        }) : null
    });
CS.displayName = xf;
var wf = "SelectScrollDownButton",
    ES = y.forwardRef((e, t) => {
        const n = kr(wf, e.__scopeSelect),
            r = Sp(wf, e.__scopeSelect),
            [i, s] = y.useState(!1),
            o = Re(t, r.onScrollButtonChange);
        return He(() => {
            if (n.viewport && n.isPositioned) {
                let a = function() {
                    const u = l.scrollHeight - l.clientHeight,
                        d = Math.ceil(l.scrollTop) < u;
                    s(d)
                };
                const l = n.viewport;
                return a(), l.addEventListener("scroll", a), () => l.removeEventListener("scroll", a)
            }
        }, [n.viewport, n.isPositioned]), i ? c.jsx(NS, {
            ...e,
            ref: o,
            onAutoScroll: () => {
                const {viewport: a, selectedItem: l} = n;
                a && l && (a.scrollTop = a.scrollTop + l.offsetHeight)
            }
        }) : null
    });
ES.displayName = wf;
var NS = y.forwardRef((e, t) => {
        const {__scopeSelect: n, onAutoScroll: r, ...i} = e,
            s = kr("SelectScrollButton", n),
            o = y.useRef(null),
            a = Sc(n),
            l = y.useCallback(() => {
                o.current !== null && (window.clearInterval(o.current), o.current = null)
            }, []);
        return y.useEffect(() => () => l(), [l]), He(() => {
            var d;
            const u = a().find(f => f.ref.current === document.activeElement);
            (d = u == null ? void 0 : u.ref.current) == null || d.scrollIntoView({
                block: "nearest"
            })
        }, [a]), c.jsx(ue.div, {
            "aria-hidden": !0,
            ...i,
            ref: t,
            style: {
                flexShrink: 0,
                ...i.style
            },
            onPointerDown: ee(i.onPointerDown, () => {
                o.current === null && (o.current = window.setInterval(r, 50))
            }),
            onPointerMove: ee(i.onPointerMove, () => {
                var u;
                (u = s.onItemLeave) == null || u.call(s),
                o.current === null && (o.current = window.setInterval(r, 50))
            }),
            onPointerLeave: ee(i.onPointerLeave, () => {
                l()
            })
        })
    }),
    jL = "SelectSeparator",
    TS = y.forwardRef((e, t) => {
        const {__scopeSelect: n, ...r} = e;
        return c.jsx(ue.div, {
            "aria-hidden": !0,
            ...r,
            ref: t
        })
    });
TS.displayName = jL;
var bf = "SelectArrow",
    kL = y.forwardRef((e, t) => {
        const {__scopeSelect: n, ...r} = e,
            i = Cc(n),
            s = jr(bf, n),
            o = kr(bf, n);
        return s.open && o.position === "popper" ? c.jsx(Dw, {
            ...i,
            ...r,
            ref: t
        }) : null
    });
kL.displayName = bf;
var RL = "SelectBubbleInput",
    PS = y.forwardRef(({__scopeSelect: e, value: t, ...n}, r) => {
        const i = y.useRef(null),
            s = Re(r, i),
            o = ED(t);
        return y.useEffect(() => {
            const a = i.current;
            if (!a)
                return;
            const l = window.HTMLSelectElement.prototype,
                d = Object.getOwnPropertyDescriptor(l, "value").set;
            if (o !== t && d) {
                const f = new Event("change", {
                    bubbles: !0
                });
                d.call(a, t),
                a.dispatchEvent(f)
            }
        }, [o, t]), c.jsx(ue.select, {
            ...n,
            style: {
                ...k0,
                ...n.style
            },
            ref: s,
            defaultValue: t
        })
    });
PS.displayName = RL;
function jS(e) {
    return e === "" || e === void 0
}
function kS(e) {
    const t = nn(e),
        n = y.useRef(""),
        r = y.useRef(0),
        i = y.useCallback(o => {
            const a = n.current + o;
            t(a),
            function l(u) {
                n.current = u,
                window.clearTimeout(r.current),
                u !== "" && (r.current = window.setTimeout(() => l(""), 1e3))
            }(a)
        }, [t]),
        s = y.useCallback(() => {
            n.current = "",
            window.clearTimeout(r.current)
        }, []);
    return y.useEffect(() => () => window.clearTimeout(r.current), []), [n, i, s]
}
function RS(e, t, n) {
    const i = t.length > 1 && Array.from(t).every(u => u === t[0]) ? t[0] : t,
        s = n ? e.indexOf(n) : -1;
    let o = AL(e, Math.max(s, 0));
    i.length === 1 && (o = o.filter(u => u !== n));
    const l = o.find(u => u.textValue.toLowerCase().startsWith(i.toLowerCase()));
    return l !== n ? l : void 0
}
function AL(e, t) {
    return e.map((n, r) => e[(t + r) % e.length])
}
var ML = rS,
    AS = sS,
    OL = aS,
    IL = lS,
    DL = cS,
    MS = uS,
    LL = pS,
    OS = yS,
    IS = xS,
    _L = wS,
    VL = SS,
    DS = CS,
    LS = ES,
    _S = TS;
const Xy = ML,
    Zy = OL,
    Sf = y.forwardRef(({className: e, children: t, ...n}, r) => c.jsxs(AS, {
        ref: r,
        className: Ve("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", e),
        ...n,
        children: [t, c.jsx(IL, {
            asChild: !0,
            children: c.jsx(J0, {
                className: "h-4 w-4 opacity-50"
            })
        })]
    }));
Sf.displayName = AS.displayName;
const VS = y.forwardRef(({className: e, ...t}, n) => c.jsx(DS, {
    ref: n,
    className: Ve("flex cursor-default items-center justify-center py-1", e),
    ...t,
    children: c.jsx(CT, {
        className: "h-4 w-4"
    })
}));
VS.displayName = DS.displayName;
const FS = y.forwardRef(({className: e, ...t}, n) => c.jsx(LS, {
    ref: n,
    className: Ve("flex cursor-default items-center justify-center py-1", e),
    ...t,
    children: c.jsx(J0, {
        className: "h-4 w-4"
    })
}));
FS.displayName = LS.displayName;
const Cf = y.forwardRef(({className: e, children: t, position: n="popper", ...r}, i) => c.jsx(DL, {
    children: c.jsxs(MS, {
        ref: i,
        className: Ve("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", e),
        position: n,
        ...r,
        children: [c.jsx(VS, {}), c.jsx(LL, {
            className: Ve("p-1", n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
            children: t
        }), c.jsx(FS, {})]
    })
}));
Cf.displayName = MS.displayName;
const FL = y.forwardRef(({className: e, ...t}, n) => c.jsx(OS, {
    ref: n,
    className: Ve("py-1.5 pl-8 pr-2 text-sm font-semibold", e),
    ...t
}));
FL.displayName = OS.displayName;
const Tt = y.forwardRef(({className: e, children: t, ...n}, r) => c.jsxs(IS, {
    ref: r,
    className: Ve("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground", e),
    ...n,
    children: [c.jsx("span", {
        className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: c.jsx(VL, {
            children: c.jsx(bT, {
                className: "h-4 w-4"
            })
        })
    }), c.jsx(_L, {
        children: t
    })]
}));
Tt.displayName = IS.displayName;
const zL = y.forwardRef(({className: e, ...t}, n) => c.jsx(_S, {
    ref: n,
    className: Ve("-mx-1 my-1 h-px bg-muted", e),
    ...t
}));
zL.displayName = _S.displayName;
const _u = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: .6
        }
    },
    BL = () => {
        const {toast: e} = Jl(),
            [t, n] = y.useState(!1),
            [r, i] = y.useState(""),
            [s, o] = y.useState({
                name: "",
                email: "",
                organization: "",
                role: "",
                teamSize: "",
                requirements: ""
            }),
            a = async l => {
                l.preventDefault(),
                n(!0),
                await new Promise(u => setTimeout(u, 1500)),
                e({
                    title: "Access Request Submitted",
                    description: "Our team will review your application and respond within 72 hours."
                }),
                o({
                    name: "",
                    email: "",
                    organization: "",
                    role: "",
                    teamSize: "",
                    requirements: ""
                }),
                i(""),
                n(!1)
            };
        return c.jsxs(Pr, {
            children: [c.jsx("section", {
                className: "py-24 lg:py-32 hero-gradient",
                children: c.jsx("div", {
                    className: "section-container",
                    children: c.jsxs(F.div, {
                        className: "max-w-4xl",
                        initial: "initial",
                        animate: "animate",
                        variants: {
                            animate: {
                                transition: {
                                    staggerChildren: .1
                                }
                            }
                        },
                        children: [c.jsxs(F.div, {
                            variants: _u,
                            className: "flex items-center gap-2 mb-6",
                            children: [c.jsx("span", {
                                className: "h-px w-12 bg-gold"
                            }), c.jsx("span", {
                                className: "text-gold text-sm font-medium tracking-widest uppercase",
                                children: "Get Started"
                            })]
                        }), c.jsxs(F.h1, {
                            variants: _u,
                            className: "font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6",
                            children: ["Request", " ", c.jsx("span", {
                                className: "text-gradient-gold",
                                children: "Institutional Access"
                            })]
                        }), c.jsx(F.p, {
                            variants: _u,
                            className: "text-lg sm:text-xl text-neutral-300 leading-relaxed",
                            children: "Apply for access to CONTROLHQ's political infrastructure platform. All applications are reviewed by our institutional engagement team."
                        })]
                    })
                })
            }), c.jsx("section", {
                className: "py-24 lg:py-32",
                children: c.jsx("div", {
                    className: "section-container",
                    children: c.jsxs("div", {
                        className: "grid lg:grid-cols-3 gap-16",
                        children: [c.jsx(F.div, {
                            className: "lg:col-span-2",
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            viewport: {
                                once: !0
                            },
                            transition: {
                                duration: .6
                            },
                            children: c.jsxs("form", {
                                onSubmit: a,
                                className: "space-y-6",
                                children: [c.jsxs("div", {
                                    className: "grid md:grid-cols-2 gap-6",
                                    children: [c.jsxs("div", {
                                        className: "space-y-2",
                                        children: [c.jsx(nt, {
                                            htmlFor: "name",
                                            children: "Full Name"
                                        }), c.jsx(Xt, {
                                            id: "name",
                                            placeholder: "Your full name",
                                            value: s.name,
                                            onChange: l => o({
                                                ...s,
                                                name: l.target.value
                                            }),
                                            required: !0,
                                            className: "bg-card border-border focus:border-gold"
                                        })]
                                    }), c.jsxs("div", {
                                        className: "space-y-2",
                                        children: [c.jsx(nt, {
                                            htmlFor: "email",
                                            children: "Institutional Email"
                                        }), c.jsx(Xt, {
                                            id: "email",
                                            type: "email",
                                            placeholder: "you@organization.org",
                                            value: s.email,
                                            onChange: l => o({
                                                ...s,
                                                email: l.target.value
                                            }),
                                            required: !0,
                                            className: "bg-card border-border focus:border-gold"
                                        })]
                                    })]
                                }), c.jsxs("div", {
                                    className: "grid md:grid-cols-2 gap-6",
                                    children: [c.jsxs("div", {
                                        className: "space-y-2",
                                        children: [c.jsx(nt, {
                                            htmlFor: "organization",
                                            children: "Organization Name"
                                        }), c.jsx(Xt, {
                                            id: "organization",
                                            placeholder: "Your organization",
                                            value: s.organization,
                                            onChange: l => o({
                                                ...s,
                                                organization: l.target.value
                                            }),
                                            required: !0,
                                            className: "bg-card border-border focus:border-gold"
                                        })]
                                    }), c.jsxs("div", {
                                        className: "space-y-2",
                                        children: [c.jsx(nt, {
                                            htmlFor: "orgType",
                                            children: "Organization Type"
                                        }), c.jsxs(Xy, {
                                            value: r,
                                            onValueChange: i,
                                            children: [c.jsx(Sf, {
                                                className: "bg-card border-border focus:border-gold",
                                                children: c.jsx(Zy, {
                                                    placeholder: "Select type"
                                                })
                                            }), c.jsxs(Cf, {
                                                children: [c.jsx(Tt, {
                                                    value: "campaign",
                                                    children: "Political Campaign"
                                                }), c.jsx(Tt, {
                                                    value: "party",
                                                    children: "Political Party"
                                                }), c.jsx(Tt, {
                                                    value: "ngo",
                                                    children: "NGO / Civil Society"
                                                }), c.jsx(Tt, {
                                                    value: "government",
                                                    children: "Government Institution"
                                                }), c.jsx(Tt, {
                                                    value: "advocacy",
                                                    children: "Advocacy Movement"
                                                }), c.jsx(Tt, {
                                                    value: "other",
                                                    children: "Other"
                                                })]
                                            })]
                                        })]
                                    })]
                                }), c.jsxs("div", {
                                    className: "grid md:grid-cols-2 gap-6",
                                    children: [c.jsxs("div", {
                                        className: "space-y-2",
                                        children: [c.jsx(nt, {
                                            htmlFor: "role",
                                            children: "Your Role / Title"
                                        }), c.jsx(Xt, {
                                            id: "role",
                                            placeholder: "e.g., Director of Operations",
                                            value: s.role,
                                            onChange: l => o({
                                                ...s,
                                                role: l.target.value
                                            }),
                                            required: !0,
                                            className: "bg-card border-border focus:border-gold"
                                        })]
                                    }), c.jsxs("div", {
                                        className: "space-y-2",
                                        children: [c.jsx(nt, {
                                            htmlFor: "teamSize",
                                            children: "Expected Team Size"
                                        }), c.jsxs(Xy, {
                                            value: s.teamSize,
                                            onValueChange: l => o({
                                                ...s,
                                                teamSize: l
                                            }),
                                            children: [c.jsx(Sf, {
                                                className: "bg-card border-border focus:border-gold",
                                                children: c.jsx(Zy, {
                                                    placeholder: "Select size"
                                                })
                                            }), c.jsxs(Cf, {
                                                children: [c.jsx(Tt, {
                                                    value: "1-10",
                                                    children: "1-10 users"
                                                }), c.jsx(Tt, {
                                                    value: "11-50",
                                                    children: "11-50 users"
                                                }), c.jsx(Tt, {
                                                    value: "51-200",
                                                    children: "51-200 users"
                                                }), c.jsx(Tt, {
                                                    value: "201-500",
                                                    children: "201-500 users"
                                                }), c.jsx(Tt, {
                                                    value: "500+",
                                                    children: "500+ users"
                                                })]
                                            })]
                                        })]
                                    })]
                                }), c.jsxs("div", {
                                    className: "space-y-2",
                                    children: [c.jsx(nt, {
                                        htmlFor: "requirements",
                                        children: "Operational Requirements"
                                    }), c.jsx(bp, {
                                        id: "requirements",
                                        placeholder: "Describe your operational requirements, use cases, and what you hope to achieve with CONTROLHQ...",
                                        value: s.requirements,
                                        onChange: l => o({
                                            ...s,
                                            requirements: l.target.value
                                        }),
                                        required: !0,
                                        rows: 6,
                                        className: "bg-card border-border focus:border-gold resize-none"
                                    })]
                                }), c.jsx(fe, {
                                    type: "submit",
                                    variant: "gold",
                                    size: "lg",
                                    disabled: t,
                                    className: "w-full md:w-auto",
                                    children: t ? "Submitting..." : "Submit Access Request"
                                })]
                            })
                        }), c.jsxs(F.div, {
                            initial: {
                                opacity: 0,
                                x: 20
                            },
                            whileInView: {
                                opacity: 1,
                                x: 0
                            },
                            viewport: {
                                once: !0
                            },
                            transition: {
                                duration: .6,
                                delay: .2
                            },
                            className: "space-y-6",
                            children: [c.jsxs("div", {
                                className: "card-elevated p-8",
                                children: [c.jsx("h3", {
                                    className: "font-heading text-lg font-semibold mb-6",
                                    children: "Access Includes"
                                }), c.jsx("ul", {
                                    className: "space-y-4",
                                    children: ["Full platform access during evaluation", "Dedicated onboarding support", "Implementation consultation", "Technical documentation access", "Direct support channel"].map(l => c.jsxs("li", {
                                        className: "flex items-start gap-3 text-sm",
                                        children: [c.jsx(ls, {
                                            className: "w-4 h-4 text-gold flex-shrink-0 mt-0.5"
                                        }), c.jsx("span", {
                                            className: "text-neutral-300",
                                            children: l
                                        })]
                                    }, l))
                                })]
                            }), c.jsxs("div", {
                                className: "card-elevated p-8",
                                children: [c.jsx(Nr, {
                                    className: "w-8 h-8 text-gold mb-4"
                                }), c.jsx("h3", {
                                    className: "font-heading font-semibold mb-3",
                                    children: "Institutional Vetting"
                                }), c.jsx("p", {
                                    className: "text-muted-foreground text-sm leading-relaxed",
                                    children: "All access requests undergo institutional review to ensure alignment with CONTROLHQ's mission and appropriate organizational capacity."
                                })]
                            }), c.jsxs("div", {
                                className: "flex items-center gap-4 p-6 border border-border rounded-lg",
                                children: [c.jsx(ri, {
                                    className: "w-5 h-5 text-gold"
                                }), c.jsx("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: "All information submitted is encrypted and handled according to institutional data protection protocols."
                                })]
                            })]
                        })]
                    })
                })
            })]
        })
    },
    $L = () => {
        const e = Uh(),
            {toast: t} = Jl(),
            [n, r] = y.useState(!1),
            [i, s] = y.useState(!1),
            [o, a] = y.useState({
                email: "",
                password: ""
            }),
            l = async u => {
                u.preventDefault(),
                s(!0),
                await new Promise(d => setTimeout(d, 1500)),
                t({
                    title: "Authentication Successful",
                    description: "Redirecting to your dashboard..."
                }),
                e("/dashboard"),
                s(!1)
            };
        return c.jsxs("div", {
            className: "min-h-screen bg-background flex",
            children: [c.jsxs("div", {
                className: "hidden lg:flex lg:w-1/2 bg-charcoal-light flex-col justify-between p-12 relative overflow-hidden",
                children: [c.jsx("div", {
                    className: "absolute inset-0 opacity-5",
                    children: c.jsx("div", {
                        className: "absolute inset-0",
                        style: {
                            backgroundImage: `linear-gradient(hsl(var(--gold) / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--gold) / 0.3) 1px, transparent 1px)`
                            ,
                            backgroundSize: "60px 60px"
                        }
                    })
                }), c.jsx("div", {
                    className: "relative z-10",
                    children: c.jsxs(ae, {
                        to: "/",
                        className: "flex items-center gap-3",
                        children: [c.jsx("div", {
                            className: "w-10 h-10 bg-gold rounded-sm flex items-center justify-center",
                            children: c.jsx("span", {
                                className: "font-heading font-bold text-charcoal text-lg",
                                children: "C"
                            })
                        }), c.jsxs("span", {
                            className: "font-heading font-bold text-xl tracking-tight text-foreground",
                            children: ["CONTROL", c.jsx("span", {
                                className: "text-gold",
                                children: "HQ"
                            })]
                        })]
                    })
                }), c.jsx("div", {
                    className: "relative z-10",
                    children: c.jsxs(F.div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: .6
                        },
                        children: [c.jsxs("h1", {
                            className: "font-heading text-4xl font-bold mb-6",
                            children: ["Private Instance", " ", c.jsx("span", {
                                className: "text-gradient-gold",
                                children: "Access"
                            })]
                        }), c.jsx("p", {
                            className: "text-neutral-400 leading-relaxed max-w-md",
                            children: "Secure login to your organization's CONTROLHQ deployment. All sessions are encrypted and monitored for institutional security."
                        })]
                    })
                }), c.jsxs("div", {
                    className: "relative z-10 flex items-center gap-6",
                    children: [c.jsxs("div", {
                        className: "flex items-center gap-2 text-xs text-muted-foreground",
                        children: [c.jsx(Nr, {
                            className: "w-4 h-4 text-gold"
                        }), c.jsx("span", {
                            children: "Enterprise Security"
                        })]
                    }), c.jsxs("div", {
                        className: "flex items-center gap-2 text-xs text-muted-foreground",
                        children: [c.jsx(ri, {
                            className: "w-4 h-4 text-gold"
                        }), c.jsx("span", {
                            children: "End-to-end Encrypted"
                        })]
                    })]
                }), c.jsx("div", {
                    className: "absolute right-0 top-1/3 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
                }), c.jsx("div", {
                    className: "absolute left-1/4 bottom-1/4 w-48 h-48 bg-gold/10 rounded-full blur-2xl"
                })]
            }), c.jsx("div", {
                className: "flex-1 flex items-center justify-center p-8",
                children: c.jsxs(F.div, {
                    initial: {
                        opacity: 0,
                        x: 20
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    transition: {
                        duration: .6
                    },
                    className: "w-full max-w-md",
                    children: [c.jsx("div", {
                        className: "lg:hidden mb-8",
                        children: c.jsxs(ae, {
                            to: "/",
                            className: "flex items-center gap-3",
                            children: [c.jsx("div", {
                                className: "w-10 h-10 bg-gold rounded-sm flex items-center justify-center",
                                children: c.jsx("span", {
                                    className: "font-heading font-bold text-charcoal text-lg",
                                    children: "C"
                                })
                            }), c.jsxs("span", {
                                className: "font-heading font-bold text-xl tracking-tight text-foreground",
                                children: ["CONTROL", c.jsx("span", {
                                    className: "text-gold",
                                    children: "HQ"
                                })]
                            })]
                        })
                    }), c.jsxs("div", {
                        className: "mb-8",
                        children: [c.jsx("h2", {
                            className: "font-heading text-2xl font-bold mb-2",
                            children: "Secure Login"
                        }), c.jsx("p", {
                            className: "text-muted-foreground text-sm",
                            children: "Access your organization's private deployment"
                        })]
                    }), c.jsxs("form", {
                        onSubmit: l,
                        className: "space-y-6",
                        children: [c.jsxs("div", {
                            className: "space-y-2",
                            children: [c.jsx(nt, {
                                htmlFor: "email",
                                children: "Institutional Email"
                            }), c.jsx(Xt, {
                                id: "email",
                                type: "email",
                                placeholder: "you@organization.org",
                                value: o.email,
                                onChange: u => a({
                                    ...o,
                                    email: u.target.value
                                }),
                                required: !0,
                                className: "bg-card border-border focus:border-gold h-12"
                            })]
                        }), c.jsxs("div", {
                            className: "space-y-2",
                            children: [c.jsxs("div", {
                                className: "flex items-center justify-between",
                                children: [c.jsx(nt, {
                                    htmlFor: "password",
                                    children: "Password"
                                }), c.jsx("button", {
                                    type: "button",
                                    className: "text-xs text-gold hover:underline",
                                    children: "Forgot password?"
                                })]
                            }), c.jsxs("div", {
                                className: "relative",
                                children: [c.jsx(Xt, {
                                    id: "password",
                                    type: n ? "text" : "password",
                                    placeholder: "Enter your password",
                                    value: o.password,
                                    onChange: u => a({
                                        ...o,
                                        password: u.target.value
                                    }),
                                    required: !0,
                                    className: "bg-card border-border focus:border-gold h-12 pr-12"
                                }), c.jsx("button", {
                                    type: "button",
                                    onClick: () => r(!n),
                                    className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                    children: n ? c.jsx(PT, {
                                        className: "w-5 h-5"
                                    }) : c.jsx(jT, {
                                        className: "w-5 h-5"
                                    })
                                })]
                            })]
                        }), c.jsxs(fe, {
                            type: "submit",
                            variant: "gold",
                            className: "w-full h-12",
                            disabled: i,
                            children: [i ? "Authenticating..." : "Access Platform", !i && c.jsx(en, {
                                className: "w-5 h-5 ml-2"
                            })]
                        })]
                    }), c.jsx("div", {
                        className: "mt-8 pt-8 border-t border-border",
                        children: c.jsxs("div", {
                            className: "flex items-center gap-3 p-4 bg-charcoal-light rounded-lg",
                            children: [c.jsx(ri, {
                                className: "w-5 h-5 text-gold flex-shrink-0"
                            }), c.jsx("p", {
                                className: "text-xs text-muted-foreground",
                                children: "This is a secure, private instance. Unauthorized access attempts are logged and may result in institutional review."
                            })]
                        })
                    }), c.jsx("div", {
                        className: "mt-6 text-center",
                        children: c.jsx(ae, {
                            to: "/",
                            className: "text-sm text-muted-foreground hover:text-gold transition-colors",
                            children: "← Return to public site"
                        })
                    })]
                })
            })]
        })
    },
    UL = [{
        label: "Total Members",
        value: "24,847",
        change: "+12.3%",
        icon: Ho
    }, {
        label: "Active Wards",
        value: "847",
        change: "+5.2%",
        icon: Th
    }, {
        label: "Field Operations",
        value: "156",
        change: "+8.7%",
        icon: ic
    }, {
        label: "System Health",
        value: "99.9%",
        change: "Stable",
        icon: Z0
    }],
    WL = [{
        action: "New member registration",
        location: "Lagos Ward 12",
        time: "2 min ago",
        type: "member"
    }, {
        action: "Field operation completed",
        location: "Abuja Central",
        time: "15 min ago",
        type: "operation"
    }, {
        action: "Governance meeting scheduled",
        location: "National HQ",
        time: "1 hour ago",
        type: "governance"
    }, {
        action: "Analytics report generated",
        location: "System",
        time: "2 hours ago",
        type: "report"
    }, {
        action: "New ward coordinator assigned",
        location: "Kano State",
        time: "3 hours ago",
        type: "member"
    }],
    HL = [{
        title: "Pending Approvals",
        count: 12,
        priority: "high"
    }, {
        title: "Unread Messages",
        count: 34,
        priority: "medium"
    }, {
        title: "System Updates",
        count: 2,
        priority: "low"
    }],
    KL = () => {
        const e = Uh(),
            t = () => {
                e("/login")
            };
        return c.jsxs("div", {
            className: "min-h-screen bg-background flex",
            children: [c.jsxs("aside", {
                className: "hidden lg:flex w-64 bg-charcoal-light border-r border-border flex-col",
                children: [c.jsx("div", {
                    className: "p-6 border-b border-border",
                    children: c.jsxs(ae, {
                        to: "/",
                        className: "flex items-center gap-3",
                        children: [c.jsx("div", {
                            className: "w-8 h-8 bg-gold rounded-sm flex items-center justify-center",
                            children: c.jsx("span", {
                                className: "font-heading font-bold text-charcoal text-sm",
                                children: "C"
                            })
                        }), c.jsxs("span", {
                            className: "font-heading font-bold text-lg tracking-tight text-foreground",
                            children: ["CONTROL", c.jsx("span", {
                                className: "text-gold",
                                children: "HQ"
                            })]
                        })]
                    })
                }), c.jsx("div", {
                    className: "px-6 py-4 border-b border-border",
                    children: c.jsxs("div", {
                        className: "bg-gold/10 rounded-lg p-3",
                        children: [c.jsx("p", {
                            className: "text-xs text-gold font-medium",
                            children: "Private Instance"
                        }), c.jsx("p", {
                            className: "text-sm font-heading font-semibold",
                            children: "Mr Walter 2027"
                        })]
                    })
                }), c.jsx("nav", {
                    className: "flex-1 p-4 space-y-1",
                    children: [{
                        icon: Z0,
                        label: "Command Center",
                        active: !0
                    }, {
                        icon: Ho,
                        label: "Membership",
                        active: !1
                    }, {
                        icon: Th,
                        label: "Field Operations",
                        active: !1
                    }, {
                        icon: ui,
                        label: "Governance",
                        active: !1
                    }, {
                        icon: rc,
                        label: "Analytics",
                        active: !1
                    }, {
                        icon: Nr,
                        label: "Administration",
                        active: !1
                    }].map(n => c.jsxs("button", {
                        className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${n.active ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-charcoal-medium hover:text-foreground"}`,
                        children: [c.jsx(n.icon, {
                            className: "w-5 h-5"
                        }), n.label]
                    }, n.label))
                }), c.jsxs("div", {
                    className: "p-4 border-t border-border space-y-1",
                    children: [c.jsxs("button", {
                        className: "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:bg-charcoal-medium hover:text-foreground transition-colors",
                        children: [c.jsx(LT, {
                            className: "w-5 h-5"
                        }), "Settings"]
                    }), c.jsxs("button", {
                        onClick: t,
                        className: "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
                        children: [c.jsx(MT, {
                            className: "w-5 h-5"
                        }), "Logout"]
                    })]
                })]
            }), c.jsxs("div", {
                className: "flex-1 flex flex-col",
                children: [c.jsxs("header", {
                    className: "h-16 border-b border-border bg-card flex items-center justify-between px-6",
                    children: [c.jsxs("div", {
                        children: [c.jsx("h1", {
                            className: "font-heading font-semibold text-lg",
                            children: "Command Center"
                        }), c.jsx("p", {
                            className: "text-xs text-muted-foreground",
                            children: "Real-time operational overview"
                        })]
                    }), c.jsxs("div", {
                        className: "flex items-center gap-4",
                        children: [c.jsxs("button", {
                            className: "relative p-2 text-muted-foreground hover:text-foreground transition-colors",
                            children: [c.jsx(xT, {
                                className: "w-5 h-5"
                            }), c.jsx("span", {
                                className: "absolute top-1 right-1 w-2 h-2 bg-gold rounded-full"
                            })]
                        }), c.jsx("div", {
                            className: "w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center",
                            children: c.jsx("span", {
                                className: "text-sm font-medium text-gold",
                                children: "JD"
                            })
                        })]
                    })]
                }), c.jsxs("main", {
                    className: "flex-1 p-6 overflow-auto",
                    children: [c.jsx("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
                        children: UL.map((n, r) => c.jsxs(F.div, {
                            className: "card-elevated p-6",
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: .4,
                                delay: r * .1
                            },
                            children: [c.jsxs("div", {
                                className: "flex items-start justify-between mb-4",
                                children: [c.jsx(n.icon, {
                                    className: "w-5 h-5 text-gold"
                                }), c.jsxs("span", {
                                    className: "text-xs text-green-500 flex items-center gap-1",
                                    children: [c.jsx(_T, {
                                        className: "w-3 h-3"
                                    }), n.change]
                                })]
                            }), c.jsx("p", {
                                className: "font-heading text-2xl font-bold mb-1",
                                children: n.value
                            }), c.jsx("p", {
                                className: "text-xs text-muted-foreground",
                                children: n.label
                            })]
                        }, n.label))
                    }), c.jsxs("div", {
                        className: "grid lg:grid-cols-3 gap-6",
                        children: [c.jsxs(F.div, {
                            className: "lg:col-span-2 card-elevated p-6",
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: .4,
                                delay: .4
                            },
                            children: [c.jsxs("div", {
                                className: "flex items-center justify-between mb-6",
                                children: [c.jsx("h2", {
                                    className: "font-heading font-semibold",
                                    children: "Recent Activity"
                                }), c.jsxs("button", {
                                    className: "text-xs text-gold hover:underline flex items-center gap-1",
                                    children: ["View All ", c.jsx(ST, {
                                        className: "w-3 h-3"
                                    })]
                                })]
                            }), c.jsx("div", {
                                className: "space-y-4",
                                children: WL.map((n, r) => c.jsxs("div", {
                                    className: "flex items-start gap-4 p-4 rounded-lg bg-charcoal-light/50 hover:bg-charcoal-light transition-colors",
                                    children: [c.jsx("div", {
                                        className: "w-2 h-2 rounded-full bg-gold mt-2"
                                    }), c.jsxs("div", {
                                        className: "flex-1",
                                        children: [c.jsx("p", {
                                            className: "text-sm font-medium",
                                            children: n.action
                                        }), c.jsx("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: n.location
                                        })]
                                    }), c.jsx("span", {
                                        className: "text-xs text-muted-foreground",
                                        children: n.time
                                    })]
                                }, r))
                            })]
                        }), c.jsxs(F.div, {
                            className: "card-elevated p-6",
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: .4,
                                delay: .5
                            },
                            children: [c.jsxs("div", {
                                className: "flex items-center justify-between mb-6",
                                children: [c.jsx("h2", {
                                    className: "font-heading font-semibold",
                                    children: "Alerts"
                                }), c.jsx(ET, {
                                    className: "w-4 h-4 text-gold"
                                })]
                            }), c.jsx("div", {
                                className: "space-y-3",
                                children: HL.map((n, r) => c.jsxs("div", {
                                    className: "flex items-center justify-between p-4 rounded-lg bg-charcoal-light/50 hover:bg-charcoal-light transition-colors cursor-pointer",
                                    children: [c.jsxs("div", {
                                        children: [c.jsx("p", {
                                            className: "text-sm font-medium",
                                            children: n.title
                                        }), c.jsx("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: n.priority === "high" ? "Requires attention" : "Can wait"
                                        })]
                                    }), c.jsx("span", {
                                        className: `text-lg font-heading font-bold ${n.priority === "high" ? "text-destructive" : n.priority === "medium" ? "text-gold" : "text-muted-foreground"}`,
                                        children: n.count
                                    })]
                                }, r))
                            }), c.jsx(fe, {
                                variant: "goldOutline",
                                className: "w-full mt-6",
                                size: "sm",
                                children: "View All Alerts"
                            })]
                        })]
                    })]
                })]
            })]
        })
    },
    GL = () => {
        const e = ws();
        return y.useEffect(() => {
            console.error("404 Error: User attempted to access non-existent route:", e.pathname)
        }, [e.pathname]), c.jsx("div", {
            className: "flex min-h-screen items-center justify-center bg-muted",
            children: c.jsxs("div", {
                className: "text-center",
                children: [c.jsx("h1", {
                    className: "mb-4 text-4xl font-bold",
                    children: "404"
                }), c.jsx("p", {
                    className: "mb-4 text-xl text-muted-foreground",
                    children: "Oops! Page not found"
                }), c.jsx("a", {
                    href: "/",
                    className: "text-primary underline hover:text-primary/90",
                    children: "Return to Home"
                })]
            })
        })
    },
    qL = new lk,
    QL = () => c.jsx(uk, {
        client: qL,
        children: c.jsxs(Vj, {
            children: [c.jsx(w2, {}), c.jsx(Z2, {}), c.jsx(oR, {
                children: c.jsxs(Jk, {
                    children: [c.jsx(Nt, {
                        path: "/",
                        element: c.jsx(JI, {})
                    }), c.jsx(Nt, {
                        path: "/about",
                        element: c.jsx(eD, {})
                    }), c.jsx(Nt, {
                        path: "/product",
                        element: c.jsx(nD, {})
                    }), c.jsx(Nt, {
                        path: "/solutions",
                        element: c.jsx(iD, {})
                    }), c.jsx(Nt, {
                        path: "/platform",
                        element: c.jsx(lD, {})
                    }), c.jsx(Nt, {
                        path: "/partnerships",
                        element: c.jsx(uD, {})
                    }), c.jsx(Nt, {
                        path: "/contact",
                        element: c.jsx(hD, {})
                    }), c.jsx(Nt, {
                        path: "/request-access",
                        element: c.jsx(BL, {})
                    }), c.jsx(Nt, {
                        path: "/login",
                        element: c.jsx($L, {})
                    }), c.jsx(Nt, {
                        path: "/dashboard",
                        element: c.jsx(KL, {})
                    }), c.jsx(Nt, {
                        path: "*",
                        element: c.jsx(GL, {})
                    })]
                })
            })]
        })
    });
b0(document.getElementById("root")).render(c.jsx(QL, {}));
