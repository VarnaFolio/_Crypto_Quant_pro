/* React 18 runtime bundled with the standalone artifact. */
var mf = Object.create;
var {
  getPrototypeOf: vf,
  defineProperty: Li,
  getOwnPropertyNames: gf,
} = Object;
var hf = Object.prototype.hasOwnProperty;
var je = (e, t, n) => {
  n = e != null ? mf(vf(e)) : {};
  let r =
    t || !e || !e.__esModule
      ? Li(n, "default", { value: e, enumerable: !0 })
      : n;
  for (let l of gf(e))
    if (!hf.call(r, l)) Li(r, l, { get: () => e[l], enumerable: !0 });
  return r;
};
var nl = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var yf = (e, t) => {
  for (var n in t)
    Li(e, n, {
      get: t[n],
      enumerable: !0,
      configurable: !0,
      set: (r) => (t[n] = () => r),
    });
};
var xf = (e, t) => () => (e && (t = e((e = 0))), t);
var $t = nl(($f) => {
  var Yn = Symbol.for("react.element"),
    wf = Symbol.for("react.portal"),
    Nf = Symbol.for("react.fragment"),
    kf = Symbol.for("react.strict_mode"),
    Sf = Symbol.for("react.profiler"),
    zf = Symbol.for("react.provider"),
    Ef = Symbol.for("react.context"),
    Cf = Symbol.for("react.forward_ref"),
    _f = Symbol.for("react.suspense"),
    Pf = Symbol.for("react.memo"),
    Tf = Symbol.for("react.lazy"),
    sa = Symbol.iterator;
  function Lf(e) {
    if (e === null || typeof e !== "object") return null;
    return (
      (e = (sa && e[sa]) || e["@@iterator"]),
      typeof e === "function" ? e : null
    );
  }
  var fa = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    pa = Object.assign,
    ma = {};
  function nn(e, t, n) {
    ((this.props = e),
      (this.context = t),
      (this.refs = ma),
      (this.updater = n || fa));
  }
  nn.prototype.isReactComponent = {};
  nn.prototype.setState = function (e, t) {
    if (typeof e !== "object" && typeof e !== "function" && e != null)
      throw Error(
        "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
      );
    this.updater.enqueueSetState(this, e, t, "setState");
  };
  nn.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  function va() {}
  va.prototype = nn.prototype;
  function Mi(e, t, n) {
    ((this.props = e),
      (this.context = t),
      (this.refs = ma),
      (this.updater = n || fa));
  }
  var Fi = (Mi.prototype = new va());
  Fi.constructor = Mi;
  pa(Fi, nn.prototype);
  Fi.isPureReactComponent = !0;
  var ca = Array.isArray,
    ga = Object.prototype.hasOwnProperty,
    Ii = { current: null },
    ha = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ya(e, t, n) {
    var r,
      l = {},
      i = null,
      o = null;
    if (t != null)
      for (r in (t.ref !== void 0 && (o = t.ref),
      t.key !== void 0 && (i = "" + t.key),
      t))
        ga.call(t, r) && !ha.hasOwnProperty(r) && (l[r] = t[r]);
    var u = arguments.length - 2;
    if (u === 1) l.children = n;
    else if (1 < u) {
      for (var s = Array(u), p = 0; p < u; p++) s[p] = arguments[p + 2];
      l.children = s;
    }
    if (e && e.defaultProps)
      for (r in ((u = e.defaultProps), u)) l[r] === void 0 && (l[r] = u[r]);
    return {
      $$typeof: Yn,
      type: e,
      key: i,
      ref: o,
      props: l,
      _owner: Ii.current,
    };
  }
  function bf(e, t) {
    return {
      $$typeof: Yn,
      type: e.type,
      key: t,
      ref: e.ref,
      props: e.props,
      _owner: e._owner,
    };
  }
  function $i(e) {
    return typeof e === "object" && e !== null && e.$$typeof === Yn;
  }
  function Mf(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
      "$" +
      e.replace(/[=:]/g, function (n) {
        return t[n];
      })
    );
  }
  var da = /\/+/g;
  function bi(e, t) {
    return typeof e === "object" && e !== null && e.key != null
      ? Mf("" + e.key)
      : t.toString(36);
  }
  function ll(e, t, n, r, l) {
    var i = typeof e;
    if (i === "undefined" || i === "boolean") e = null;
    var o = !1;
    if (e === null) o = !0;
    else
      switch (i) {
        case "string":
        case "number":
          o = !0;
          break;
        case "object":
          switch (e.$$typeof) {
            case Yn:
            case wf:
              o = !0;
          }
      }
    if (o)
      return (
        (o = e),
        (l = l(o)),
        (e = r === "" ? "." + bi(o, 0) : r),
        ca(l)
          ? ((n = ""),
            e != null && (n = e.replace(da, "$&/") + "/"),
            ll(l, t, n, "", function (p) {
              return p;
            }))
          : l != null &&
            ($i(l) &&
              (l = bf(
                l,
                n +
                  (!l.key || (o && o.key === l.key)
                    ? ""
                    : ("" + l.key).replace(da, "$&/") + "/") +
                  e,
              )),
            t.push(l)),
        1
      );
    if (((o = 0), (r = r === "" ? "." : r + ":"), ca(e)))
      for (var u = 0; u < e.length; u++) {
        i = e[u];
        var s = r + bi(i, u);
        o += ll(i, t, n, s, l);
      }
    else if (((s = Lf(e)), typeof s === "function"))
      for (e = s.call(e), u = 0; !(i = e.next()).done;)
        ((i = i.value), (s = r + bi(i, u++)), (o += ll(i, t, n, s, l)));
    else if (i === "object")
      throw (
        (t = String(e)),
        Error(
          "Objects are not valid as a React child (found: " +
            (t === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : t) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return o;
  }
  function rl(e, t, n) {
    if (e == null) return e;
    var r = [],
      l = 0;
    return (
      ll(e, r, "", "", function (i) {
        return t.call(n, i, l++);
      }),
      r
    );
  }
  function Ff(e) {
    if (e._status === -1) {
      var t = e._result;
      ((t = t()),
        t.then(
          function (n) {
            if (e._status === 0 || e._status === -1)
              ((e._status = 1), (e._result = n));
          },
          function (n) {
            if (e._status === 0 || e._status === -1)
              ((e._status = 2), (e._result = n));
          },
        ),
        e._status === -1 && ((e._status = 0), (e._result = t)));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
  }
  var me = { current: null },
    il = { transition: null },
    If = {
      ReactCurrentDispatcher: me,
      ReactCurrentBatchConfig: il,
      ReactCurrentOwner: Ii,
    };
  function xa() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  $f.Children = {
    map: rl,
    forEach: function (e, t, n) {
      rl(
        e,
        function () {
          t.apply(this, arguments);
        },
        n,
      );
    },
    count: function (e) {
      var t = 0;
      return (
        rl(e, function () {
          t++;
        }),
        t
      );
    },
    toArray: function (e) {
      return (
        rl(e, function (t) {
          return t;
        }) || []
      );
    },
    only: function (e) {
      if (!$i(e))
        throw Error(
          "React.Children.only expected to receive a single React element child.",
        );
      return e;
    },
  };
  $f.Component = nn;
  $f.Fragment = Nf;
  $f.Profiler = Sf;
  $f.PureComponent = Mi;
  $f.StrictMode = kf;
  $f.Suspense = _f;
  $f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = If;
  $f.act = xa;
  $f.cloneElement = function (e, t, n) {
    if (e === null || e === void 0)
      throw Error(
        "React.cloneElement(...): The argument must be a React element, but you passed " +
          e +
          ".",
      );
    var r = pa({}, e.props),
      l = e.key,
      i = e.ref,
      o = e._owner;
    if (t != null) {
      if (
        (t.ref !== void 0 && ((i = t.ref), (o = Ii.current)),
        t.key !== void 0 && (l = "" + t.key),
        e.type && e.type.defaultProps)
      )
        var u = e.type.defaultProps;
      for (s in t)
        ga.call(t, s) &&
          !ha.hasOwnProperty(s) &&
          (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
    }
    var s = arguments.length - 2;
    if (s === 1) r.children = n;
    else if (1 < s) {
      u = Array(s);
      for (var p = 0; p < s; p++) u[p] = arguments[p + 2];
      r.children = u;
    }
    return { $$typeof: Yn, type: e.type, key: l, ref: i, props: r, _owner: o };
  };
  $f.createContext = function (e) {
    return (
      (e = {
        $$typeof: Ef,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null,
      }),
      (e.Provider = { $$typeof: zf, _context: e }),
      (e.Consumer = e)
    );
  };
  $f.createElement = ya;
  $f.createFactory = function (e) {
    var t = ya.bind(null, e);
    return ((t.type = e), t);
  };
  $f.createRef = function () {
    return { current: null };
  };
  $f.forwardRef = function (e) {
    return { $$typeof: Cf, render: e };
  };
  $f.isValidElement = $i;
  $f.lazy = function (e) {
    return { $$typeof: Tf, _payload: { _status: -1, _result: e }, _init: Ff };
  };
  $f.memo = function (e, t) {
    return { $$typeof: Pf, type: e, compare: t === void 0 ? null : t };
  };
  $f.startTransition = function (e) {
    var t = il.transition;
    il.transition = {};
    try {
      e();
    } finally {
      il.transition = t;
    }
  };
  $f.unstable_act = xa;
  $f.useCallback = function (e, t) {
    return me.current.useCallback(e, t);
  };
  $f.useContext = function (e) {
    return me.current.useContext(e);
  };
  $f.useDebugValue = function () {};
  $f.useDeferredValue = function (e) {
    return me.current.useDeferredValue(e);
  };
  $f.useEffect = function (e, t) {
    return me.current.useEffect(e, t);
  };
  $f.useId = function () {
    return me.current.useId();
  };
  $f.useImperativeHandle = function (e, t, n) {
    return me.current.useImperativeHandle(e, t, n);
  };
  $f.useInsertionEffect = function (e, t) {
    return me.current.useInsertionEffect(e, t);
  };
  $f.useLayoutEffect = function (e, t) {
    return me.current.useLayoutEffect(e, t);
  };
  $f.useMemo = function (e, t) {
    return me.current.useMemo(e, t);
  };
  $f.useReducer = function (e, t, n) {
    return me.current.useReducer(e, t, n);
  };
  $f.useRef = function (e) {
    return me.current.useRef(e);
  };
  $f.useState = function (e) {
    return me.current.useState(e);
  };
  $f.useSyncExternalStore = function (e, t, n) {
    return me.current.useSyncExternalStore(e, t, n);
  };
  $f.useTransition = function () {
    return me.current.useTransition();
  };
  $f.version = "18.3.1";
});
var Ca = nl((xp) => {
  function Di(e, t) {
    var n = e.length;
    e.push(t);
    e: for (; 0 < n;) {
      var r = (n - 1) >>> 1,
        l = e[r];
      if (0 < ol(l, t)) ((e[r] = t), (e[n] = l), (n = r));
      else break e;
    }
  }
  function $e(e) {
    return e.length === 0 ? null : e[0];
  }
  function cl(e) {
    if (e.length === 0) return null;
    var t = e[0],
      n = e.pop();
    if (n !== t) {
      e[0] = n;
      e: for (var r = 0, l = e.length, i = l >>> 1; r < i;) {
        var o = 2 * (r + 1) - 1,
          u = e[o],
          s = o + 1,
          p = e[s];
        if (0 > ol(u, n))
          s < l && 0 > ol(p, u)
            ? ((e[r] = p), (e[s] = n), (r = s))
            : ((e[r] = u), (e[o] = n), (r = o));
        else if (s < l && 0 > ol(p, n)) ((e[r] = p), (e[s] = n), (r = s));
        else break e;
      }
    }
    return t;
  }
  function ol(e, t) {
    var n = e.sortIndex - t.sortIndex;
    return n !== 0 ? n : e.id - t.id;
  }
  if (typeof performance === "object" && typeof performance.now === "function")
    ((Oi = performance),
      (xp.unstable_now = function () {
        return Oi.now();
      }));
  else
    ((ul = Date),
      (Bi = ul.now()),
      (xp.unstable_now = function () {
        return ul.now() - Bi;
      }));
  var Oi,
    ul,
    Bi,
    Ye = [],
    dt = [],
    yp = 1,
    Pe = null,
    se = 3,
    dl = !1,
    Rt = !1,
    Xn = !1,
    Na = typeof setTimeout === "function" ? setTimeout : null,
    ka = typeof clearTimeout === "function" ? clearTimeout : null,
    wa = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function Ai(e) {
    for (var t = $e(dt); t !== null;) {
      if (t.callback === null) cl(dt);
      else if (t.startTime <= e)
        (cl(dt), (t.sortIndex = t.expirationTime), Di(Ye, t));
      else break;
      t = $e(dt);
    }
  }
  function Vi(e) {
    if (((Xn = !1), Ai(e), !Rt))
      if ($e(Ye) !== null) ((Rt = !0), Wi(Hi));
      else {
        var t = $e(dt);
        t !== null && Qi(Vi, t.startTime - e);
      }
  }
  function Hi(e, t) {
    ((Rt = !1), Xn && ((Xn = !1), ka(Zn), (Zn = -1)), (dl = !0));
    var n = se;
    try {
      Ai(t);
      for (
        Pe = $e(Ye);
        Pe !== null && (!(Pe.expirationTime > t) || (e && !Ea()));
      ) {
        var r = Pe.callback;
        if (typeof r === "function") {
          ((Pe.callback = null), (se = Pe.priorityLevel));
          var l = r(Pe.expirationTime <= t);
          ((t = xp.unstable_now()),
            typeof l === "function"
              ? (Pe.callback = l)
              : Pe === $e(Ye) && cl(Ye),
            Ai(t));
        } else cl(Ye);
        Pe = $e(Ye);
      }
      if (Pe !== null) var i = !0;
      else {
        var o = $e(dt);
        (o !== null && Qi(Vi, o.startTime - t), (i = !1));
      }
      return i;
    } finally {
      ((Pe = null), (se = n), (dl = !1));
    }
  }
  var fl = !1,
    al = null,
    Zn = -1,
    Sa = 5,
    za = -1;
  function Ea() {
    return xp.unstable_now() - za < Sa ? !1 : !0;
  }
  function Ri() {
    if (al !== null) {
      var e = xp.unstable_now();
      za = e;
      var t = !0;
      try {
        t = al(!0, e);
      } finally {
        t ? Gn() : ((fl = !1), (al = null));
      }
    } else fl = !1;
  }
  var Gn;
  if (typeof wa === "function")
    Gn = function () {
      wa(Ri);
    };
  else if (typeof MessageChannel < "u")
    ((sl = new MessageChannel()),
      (Ui = sl.port2),
      (sl.port1.onmessage = Ri),
      (Gn = function () {
        Ui.postMessage(null);
      }));
  else
    Gn = function () {
      Na(Ri, 0);
    };
  var sl, Ui;
  function Wi(e) {
    ((al = e), fl || ((fl = !0), Gn()));
  }
  function Qi(e, t) {
    Zn = Na(function () {
      e(xp.unstable_now());
    }, t);
  }
  xp.unstable_IdlePriority = 5;
  xp.unstable_ImmediatePriority = 1;
  xp.unstable_LowPriority = 4;
  xp.unstable_NormalPriority = 3;
  xp.unstable_Profiling = null;
  xp.unstable_UserBlockingPriority = 2;
  xp.unstable_cancelCallback = function (e) {
    e.callback = null;
  };
  xp.unstable_continueExecution = function () {
    Rt || dl || ((Rt = !0), Wi(Hi));
  };
  xp.unstable_forceFrameRate = function (e) {
    0 > e || 125 < e
      ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
        )
      : (Sa = 0 < e ? Math.floor(1000 / e) : 5);
  };
  xp.unstable_getCurrentPriorityLevel = function () {
    return se;
  };
  xp.unstable_getFirstCallbackNode = function () {
    return $e(Ye);
  };
  xp.unstable_next = function (e) {
    switch (se) {
      case 1:
      case 2:
      case 3:
        var t = 3;
        break;
      default:
        t = se;
    }
    var n = se;
    se = t;
    try {
      return e();
    } finally {
      se = n;
    }
  };
  xp.unstable_pauseExecution = function () {};
  xp.unstable_requestPaint = function () {};
  xp.unstable_runWithPriority = function (e, t) {
    switch (e) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        e = 3;
    }
    var n = se;
    se = e;
    try {
      return t();
    } finally {
      se = n;
    }
  };
  xp.unstable_scheduleCallback = function (e, t, n) {
    var r = xp.unstable_now();
    switch (
      (typeof n === "object" && n !== null
        ? ((n = n.delay), (n = typeof n === "number" && 0 < n ? r + n : r))
        : (n = r),
      e)
    ) {
      case 1:
        var l = -1;
        break;
      case 2:
        l = 250;
        break;
      case 5:
        l = 1073741823;
        break;
      case 4:
        l = 1e4;
        break;
      default:
        l = 5000;
    }
    return (
      (l = n + l),
      (e = {
        id: yp++,
        callback: t,
        priorityLevel: e,
        startTime: n,
        expirationTime: l,
        sortIndex: -1,
      }),
      n > r
        ? ((e.sortIndex = n),
          Di(dt, e),
          $e(Ye) === null &&
            e === $e(dt) &&
            (Xn ? (ka(Zn), (Zn = -1)) : (Xn = !0), Qi(Vi, n - r)))
        : ((e.sortIndex = l), Di(Ye, e), Rt || dl || ((Rt = !0), Wi(Hi))),
      e
    );
  };
  xp.unstable_shouldYield = Ea;
  xp.unstable_wrapCallback = function (e) {
    var t = se;
    return function () {
      var n = se;
      se = t;
      try {
        return e.apply(this, arguments);
      } finally {
        se = n;
      }
    };
  };
});
var qu = {};
yf(qu, {
  version: () => Ad,
  unstable_renderSubtreeIntoContainer: () => Bd,
  unstable_batchedUpdates: () => Od,
  unmountComponentAtNode: () => Dd,
  render: () => Rd,
  hydrateRoot: () => $d,
  hydrate: () => Id,
  flushSync: () => Fd,
  findDOMNode: () => Md,
  createRoot: () => bd,
  createPortal: () => Ld,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => Td,
});
function w(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function Zt(e, t) {
  (En(e, t), En(e + "Capture", t));
}
function En(e, t) {
  Nr[e] = t;
  for (e = 0; e < t.length; e++) Ms.add(t[e]);
}
function Bp(e) {
  if (mo.call(Pa, e)) return !0;
  if (mo.call(_a, e)) return !1;
  if (Op.test(e)) return (Pa[e] = !0);
  return ((_a[e] = !0), !1);
}
function Ap(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      if (r) return !1;
      if (n !== null) return !n.acceptsBooleans;
      return (
        (e = e.toLowerCase().slice(0, 5)),
        e !== "data-" && e !== "aria-"
      );
    default:
      return !1;
  }
}
function Up(e, t, n, r) {
  if (t === null || typeof t > "u" || Ap(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function he(e, t, n, r, l, i, o) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = o));
}
function su(e) {
  return e[1].toUpperCase();
}
function cu(e, t, n, r) {
  var l = ue.hasOwnProperty(t) ? ue[t] : null;
  if (
    l !== null
      ? l.type !== 0
      : r ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")
  )
    (Up(t, n, l, r) && (n = null),
      r || l === null
        ? Bp(t) &&
          (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        : l.mustUseProperty
          ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
          : ((t = l.attributeName),
            (r = l.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((l = l.type),
                (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
function Jn(e) {
  if (e === null || typeof e !== "object") return null;
  return (
    (e = (Ta && e[Ta]) || e["@@iterator"]),
    typeof e === "function" ? e : null
  );
}
function lr(e) {
  if (Ki === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Ki = (t && t[1]) || "";
    }
  return (
    `
` +
    Ki +
    e
  );
}
function Gi(e, t) {
  if (!e || Yi) return "";
  Yi = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect === "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (p) {
          var r = p;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (p) {
          r = p;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (p) {
        r = p;
      }
      e();
    }
  } catch (p) {
    if (p && r && typeof p.stack === "string") {
      for (
        var l = p.stack.split(`
`),
          i = r.stack.split(`
`),
          o = l.length - 1,
          u = i.length - 1;
        1 <= o && 0 <= u && l[o] !== i[u];
      )
        u--;
      for (; 1 <= o && 0 <= u; o--, u--)
        if (l[o] !== i[u]) {
          if (o !== 1 || u !== 1)
            do
              if ((o--, u--, 0 > u || l[o] !== i[u])) {
                var s =
                  `
` + l[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    s.includes("<anonymous>") &&
                    (s = s.replace("<anonymous>", e.displayName)),
                  s
                );
              }
            while (1 <= o && 0 <= u);
          break;
        }
    }
  } finally {
    ((Yi = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? lr(e) : "";
}
function Vp(e) {
  switch (e.tag) {
    case 5:
      return lr(e.type);
    case 16:
      return lr("Lazy");
    case 13:
      return lr("Suspense");
    case 19:
      return lr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = Gi(e.type, !1)), e);
    case 11:
      return ((e = Gi(e.type.render, !1)), e);
    case 1:
      return ((e = Gi(e.type, !0)), e);
    default:
      return "";
  }
}
function yo(e) {
  if (e == null) return null;
  if (typeof e === "function") return e.displayName || e.name || null;
  if (typeof e === "string") return e;
  switch (e) {
    case an:
      return "Fragment";
    case un:
      return "Portal";
    case vo:
      return "Profiler";
    case du:
      return "StrictMode";
    case go:
      return "Suspense";
    case ho:
      return "SuspenseList";
  }
  if (typeof e === "object")
    switch (e.$$typeof) {
      case Is:
        return (e.displayName || "Context") + ".Consumer";
      case Fs:
        return (e._context.displayName || "Context") + ".Provider";
      case fu:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case pu:
        return (
          (t = e.displayName || null),
          t !== null ? t : yo(e.type) || "Memo"
        );
      case pt:
        ((t = e._payload), (e = e._init));
        try {
          return yo(e(t));
        } catch (n) {}
    }
  return null;
}
function Hp(e) {
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
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
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
      return yo(t);
    case 8:
      return t === du ? "StrictMode" : "Mode";
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
      if (typeof t === "function") return t.displayName || t.name || null;
      if (typeof t === "string") return t;
  }
  return null;
}
function _t(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Rs(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Wp(e) {
  var t = Rs(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get === "function" &&
    typeof n.set === "function"
  ) {
    var { get: l, set: i } = n;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (o) {
          ((r = "" + o), i.call(this, o));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function ml(e) {
  e._valueTracker || (e._valueTracker = Wp(e));
}
function Ds(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Rs(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Bl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch (t) {
    return e.body;
  }
}
function xo(e, t) {
  var n = t.checked;
  return X({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n != null ? n : e._wrapperState.initialChecked,
  });
}
function La(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = _t(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function Os(e, t) {
  ((t = t.checked), t != null && cu(e, "checked", t, !1));
}
function wo(e, t) {
  Os(e, t);
  var n = _t(t.value),
    r = t.type;
  if (n != null)
    if (r === "number") {
      if ((n === 0 && e.value === "") || e.value != n) e.value = "" + n;
    } else e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? No(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && No(e, t.type, _t(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function ba(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(
      (r !== "submit" && r !== "reset") ||
      (t.value !== void 0 && t.value !== null)
    ))
      return;
    ((t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n));
}
function No(e, t, n) {
  if (t !== "number" || Bl(e.ownerDocument) !== e)
    n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n);
}
function xn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      ((l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0));
  } else {
    ((n = "" + _t(n)), (t = null));
    for (l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        ((e[l].selected = !0), r && (e[l].defaultSelected = !0));
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ko(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(w(91));
  return X({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Ma(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(w(92));
      if (ir(n)) {
        if (1 < n.length) throw Error(w(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: _t(n) };
}
function Bs(e, t) {
  var n = _t(t.value),
    r = _t(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function Fa(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function As(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function So(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? As(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
function kr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
function Vs(e, t, n) {
  return t == null || typeof t === "boolean" || t === ""
    ? ""
    : n || typeof t !== "number" || t === 0 || (fr.hasOwnProperty(e) && fr[e])
      ? ("" + t).trim()
      : t + "px";
}
function Hs(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = Vs(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l));
    }
}
function zo(e, t) {
  if (t) {
    if (Kp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(w(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(w(60));
      if (
        typeof t.dangerouslySetInnerHTML !== "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(w(61));
    }
    if (t.style != null && typeof t.style !== "object") throw Error(w(62));
  }
}
function Eo(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is === "string";
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
      return !0;
  }
}
function mu(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
function Ia(e) {
  if ((e = Ar(e))) {
    if (typeof _o !== "function") throw Error(w(280));
    var t = e.stateNode;
    t && ((t = pi(t)), _o(e.stateNode, e.type, t));
  }
}
function Ws(e) {
  wn ? (Nn ? Nn.push(e) : (Nn = [e])) : (wn = e);
}
function Qs() {
  if (wn) {
    var e = wn,
      t = Nn;
    if (((Nn = wn = null), Ia(e), t)) for (e = 0; e < t.length; e++) Ia(t[e]);
  }
}
function Ks(e, t) {
  return e(t);
}
function Ys() {}
function Gs(e, t, n) {
  if (Xi) return e(t, n);
  Xi = !0;
  try {
    return Ks(e, t, n);
  } finally {
    if (((Xi = !1), wn !== null || Nn !== null)) (Ys(), Qs());
  }
}
function Sr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = pi(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
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
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n !== "function") throw Error(w(231, t, typeof n));
  return n;
}
function Yp(e, t, n, r, l, i, o, u, s) {
  var p = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, p);
  } catch (h) {
    this.onError(h);
  }
}
function Xp(e, t, n, r, l, i, o, u, s) {
  ((pr = !1), (Al = null), Yp.apply(Gp, arguments));
}
function Zp(e, t, n, r, l, i, o, u, s) {
  if ((Xp.apply(this, arguments), pr)) {
    if (pr) {
      var p = Al;
      ((pr = !1), (Al = null));
    } else throw Error(w(198));
    Ul || ((Ul = !0), (To = p));
  }
}
function Jt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return;) t = t.return;
  else {
    e = t;
    do ((t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Xs(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function $a(e) {
  if (Jt(e) !== e) throw Error(w(188));
}
function Jp(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Jt(e)), t === null)) throw Error(w(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ;) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i;) {
        if (i === n) return ($a(l), e);
        if (i === r) return ($a(l), t);
        i = i.sibling;
      }
      throw Error(w(188));
    }
    if (n.return !== r.return) ((n = l), (r = i));
    else {
      for (var o = !1, u = l.child; u;) {
        if (u === n) {
          ((o = !0), (n = l), (r = i));
          break;
        }
        if (u === r) {
          ((o = !0), (r = l), (n = i));
          break;
        }
        u = u.sibling;
      }
      if (!o) {
        for (u = i.child; u;) {
          if (u === n) {
            ((o = !0), (n = i), (r = l));
            break;
          }
          if (u === r) {
            ((o = !0), (r = i), (n = l));
            break;
          }
          u = u.sibling;
        }
        if (!o) throw Error(w(189));
      }
    }
    if (n.alternate !== r) throw Error(w(190));
  }
  if (n.tag !== 3) throw Error(w(188));
  return n.stateNode.current === n ? e : t;
}
function Zs(e) {
  return ((e = Jp(e)), e !== null ? Js(e) : null);
}
function Js(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null;) {
    var t = Js(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
function n0(e) {
  if (Je && typeof Je.onCommitFiberRoot === "function")
    try {
      Je.onCommitFiberRoot(si, e, void 0, (e.current.flags & 128) === 128);
    } catch (t) {}
}
function i0(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((r0(e) / l0) | 0)) | 0);
}
function or(e) {
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
      return e;
  }
}
function Hl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    i = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var u = o & ~l;
    u !== 0 ? (r = or(u)) : ((i &= o), i !== 0 && (r = or(i)));
  } else ((o = n & ~l), o !== 0 ? (r = or(o)) : i !== 0 && (r = or(i)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    (t & l) === 0 &&
    ((l = r & -r), (i = t & -t), l >= i || (l === 16 && (i & 4194240) !== 0))
  )
    return t;
  if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t;)
      ((n = 31 - Ae(t)), (l = 1 << n), (r |= e[n]), (t &= ~l));
  return r;
}
function o0(e, t) {
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
      return t + 5000;
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
      return -1;
  }
}
function u0(e, t) {
  for (
    var {
      suspendedLanes: n,
      pingedLanes: r,
      expirationTimes: l,
      pendingLanes: i,
    } = e;
    0 < i;
  ) {
    var o = 31 - Ae(i),
      u = 1 << o,
      s = l[o];
    if (s === -1) {
      if ((u & n) === 0 || (u & r) !== 0) l[o] = o0(u, t);
    } else s <= t && (e.expiredLanes |= u);
    i &= ~u;
  }
}
function Lo(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function tc() {
  var e = gl;
  return ((gl <<= 1), (gl & 4194240) === 0 && (gl = 64), e);
}
function Zi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Or(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Ae(t)),
    (e[t] = n));
}
function a0(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n;) {
    var l = 31 - Ae(n),
      i = 1 << l;
    ((t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~i));
  }
}
function gu(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n;) {
    var r = 31 - Ae(n),
      l = 1 << r;
    ((l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l));
  }
}
function nc(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
  );
}
function Da(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      xt = null;
      break;
    case "dragenter":
    case "dragleave":
      wt = null;
      break;
    case "mouseover":
    case "mouseout":
      Nt = null;
      break;
    case "pointerover":
    case "pointerout":
      zr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Er.delete(t.pointerId);
  }
}
function qn(e, t, n, r, l, i) {
  if (e === null || e.nativeEvent !== i)
    return (
      (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l],
      }),
      t !== null && ((t = Ar(t)), t !== null && hu(t)),
      e
    );
  return (
    (e.eventSystemFlags |= r),
    (t = e.targetContainers),
    l !== null && t.indexOf(l) === -1 && t.push(l),
    e
  );
}
function c0(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ((xt = qn(xt, e, t, n, r, l)), !0);
    case "dragenter":
      return ((wt = qn(wt, e, t, n, r, l)), !0);
    case "mouseover":
      return ((Nt = qn(Nt, e, t, n, r, l)), !0);
    case "pointerover":
      var i = l.pointerId;
      return (zr.set(i, qn(zr.get(i) || null, e, t, n, r, l)), !0);
    case "gotpointercapture":
      return (
        (i = l.pointerId),
        Er.set(i, qn(Er.get(i) || null, e, t, n, r, l)),
        !0
      );
  }
  return !1;
}
function uc(e) {
  var t = At(e.target);
  if (t !== null) {
    var n = Jt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Xs(n)), t !== null)) {
          ((e.blockedOn = t),
            oc(e.priority, function () {
              lc(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Pl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length;) {
    var n = Mo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((Co = r), n.target.dispatchEvent(r), (Co = null));
    } else return ((t = Ar(n)), t !== null && hu(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function Oa(e, t, n) {
  Pl(e) && n.delete(t);
}
function d0() {
  ((bo = !1),
    xt !== null && Pl(xt) && (xt = null),
    wt !== null && Pl(wt) && (wt = null),
    Nt !== null && Pl(Nt) && (Nt = null),
    zr.forEach(Oa),
    Er.forEach(Oa));
}
function jn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    bo ||
      ((bo = !0), K.unstable_scheduleCallback(K.unstable_NormalPriority, d0)));
}
function Cr(e) {
  function t(l) {
    return jn(l, e);
  }
  if (0 < yl.length) {
    jn(yl[0], e);
    for (var n = 1; n < yl.length; n++) {
      var r = yl[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  (xt !== null && jn(xt, e),
    wt !== null && jn(wt, e),
    Nt !== null && jn(Nt, e),
    zr.forEach(t),
    Er.forEach(t));
  for (n = 0; n < vt.length; n++)
    ((r = vt[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < vt.length && ((n = vt[0]), n.blockedOn === null);)
    (uc(n), n.blockedOn === null && vt.shift());
}
function f0(e, t, n, r) {
  var l = B,
    i = kn.transition;
  kn.transition = null;
  try {
    ((B = 1), yu(e, t, n, r));
  } finally {
    ((B = l), (kn.transition = i));
  }
}
function p0(e, t, n, r) {
  var l = B,
    i = kn.transition;
  kn.transition = null;
  try {
    ((B = 4), yu(e, t, n, r));
  } finally {
    ((B = l), (kn.transition = i));
  }
}
function yu(e, t, n, r) {
  if (Wl) {
    var l = Mo(e, t, n, r);
    if (l === null) (no(e, t, r, Ql, n), Da(e, r));
    else if (c0(l, e, t, n, r)) r.stopPropagation();
    else if ((Da(e, r), t & 4 && -1 < s0.indexOf(e))) {
      for (; l !== null;) {
        var i = Ar(l);
        if (
          (i !== null && rc(i),
          (i = Mo(e, t, n, r)),
          i === null && no(e, t, r, Ql, n),
          i === l)
        )
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else no(e, t, r, null, n);
  }
}
function Mo(e, t, n, r) {
  if (((Ql = null), (e = mu(r)), (e = At(e)), e !== null))
    if (((t = Jt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Xs(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((Ql = e), null);
}
function ac(e) {
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
      switch (e0()) {
        case vu:
          return 1;
        case js:
          return 4;
        case Vl:
        case t0:
          return 16;
        case ec:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
function sc() {
  if (Tl) return Tl;
  var e,
    t = xu,
    n = t.length,
    r,
    l = "value" in ht ? ht.value : ht.textContent,
    i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++);
  return (Tl = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Ll(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function xl() {
  return !0;
}
function Ba() {
  return !1;
}
function _e(e) {
  function t(n, r, l, i, o) {
    ((this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = o),
      (this.currentTarget = null));
    for (var u in e)
      e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(i) : i[u]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? xl
        : Ba),
      (this.isPropagationStopped = Ba),
      this
    );
  }
  return (
    X(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue !== "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = xl));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble !== "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = xl));
      },
      persist: function () {},
      isPersistent: xl,
    }),
    t
  );
}
function C0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = E0[e]) ? !!t[e] : !1;
}
function Nu() {
  return C0;
}
function dc(e, t) {
  switch (e) {
    case "keyup":
      return R0.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function fc(e) {
  return ((e = e.detail), typeof e === "object" && "data" in e ? e.data : null);
}
function O0(e, t) {
  switch (e) {
    case "compositionend":
      return fc(t);
    case "keypress":
      if (t.which !== 32) return null;
      return ((Wa = !0), Ha);
    case "textInput":
      return ((e = t.data), e === Ha && Wa ? null : e);
    default:
      return null;
  }
}
function B0(e, t) {
  if (sn)
    return e === "compositionend" || (!ku && dc(e, t))
      ? ((e = sc()), (Tl = xu = ht = null), (sn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return cc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
function Qa(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!A0[e.type] : t === "textarea" ? !0 : !1;
}
function pc(e, t, n, r) {
  (Ws(r),
    (t = Kl(t, "onChange")),
    0 < t.length &&
      ((n = new wu("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
function U0(e) {
  zc(e, 0);
}
function di(e) {
  var t = fn(e);
  if (Ds(t)) return e;
}
function V0(e, t) {
  if (e === "change") return t;
}
function Ka() {
  vr && (vr.detachEvent("onpropertychange", vc), (_r = vr = null));
}
function vc(e) {
  if (e.propertyName === "value" && di(_r)) {
    var t = [];
    (pc(t, _r, e, mu(e)), Gs(U0, t));
  }
}
function H0(e, t, n) {
  e === "focusin"
    ? (Ka(), (vr = t), (_r = n), vr.attachEvent("onpropertychange", vc))
    : e === "focusout" && Ka();
}
function W0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return di(_r);
}
function Q0(e, t) {
  if (e === "click") return di(t);
}
function K0(e, t) {
  if (e === "input" || e === "change") return di(t);
}
function Y0(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
function Pr(e, t) {
  if (Ve(e, t)) return !0;
  if (
    typeof e !== "object" ||
    e === null ||
    typeof t !== "object" ||
    t === null
  )
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!mo.call(t, l) || !Ve(e[l], t[l])) return !1;
  }
  return !0;
}
function Ya(e) {
  for (; e && e.firstChild;) e = e.firstChild;
  return e;
}
function Ga(e, t) {
  var n = Ya(e);
  e = 0;
  for (var r; n;) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n;) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Ya(n);
  }
}
function gc(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? gc(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function hc() {
  for (var e = window, t = Bl(); t instanceof e.HTMLIFrameElement;) {
    try {
      var n = typeof t.contentWindow.location.href === "string";
    } catch (r) {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Bl(e.document);
  }
  return t;
}
function Su(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function G0(e) {
  var t = hc(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    gc(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Su(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          i = Math.min(r.start, l);
        ((r = r.end === void 0 ? i : Math.min(r.end, l)),
          !e.extend && i > r && ((l = r), (r = i), (i = l)),
          (l = Ga(n, i)));
        var o = Ga(n, r);
        l &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    t = [];
    for (e = n; (e = e.parentNode);)
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    typeof n.focus === "function" && n.focus();
    for (n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
function Xa(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Io ||
    cn == null ||
    cn !== Bl(r) ||
    ((r = cn),
    "selectionStart" in r && Su(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (gr && Pr(gr, r)) ||
      ((gr = r),
      (r = Kl(Fo, "onSelect")),
      0 < r.length &&
        ((t = new wu("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = cn))));
}
function wl(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
function fi(e) {
  if (eo[e]) return eo[e];
  if (!dn[e]) return e;
  var t = dn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in yc) return (eo[e] = t[n]);
  return e;
}
function Tt(e, t) {
  (Sc.set(e, t), Zt(t, [e]));
}
function Ja(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), Zp(r, t, void 0, e), (e.currentTarget = null));
}
function zc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var u = r[o],
            s = u.instance,
            p = u.currentTarget;
          if (((u = u.listener), s !== i && l.isPropagationStopped())) break e;
          (Ja(l, u, p), (i = s));
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((u = r[o]),
            (s = u.instance),
            (p = u.currentTarget),
            (u = u.listener),
            s !== i && l.isPropagationStopped())
          )
            break e;
          (Ja(l, u, p), (i = s));
        }
    }
  }
  if (Ul) throw ((e = To), (Ul = !1), (To = null), e);
}
function V(e, t) {
  var n = t[Uo];
  n === void 0 && (n = t[Uo] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Ec(t, e, 2, !1), n.add(r));
}
function to(e, t, n) {
  var r = 0;
  (t && (r |= 4), Ec(n, e, r, t));
}
function Tr(e) {
  if (!e[Nl]) {
    ((e[Nl] = !0),
      Ms.forEach(function (n) {
        n !== "selectionchange" && (Z0.has(n) || to(n, !1, e), to(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Nl] || ((t[Nl] = !0), to("selectionchange", !1, t));
  }
}
function Ec(e, t, n, r) {
  switch (ac(t)) {
    case 1:
      var l = f0;
      break;
    case 4:
      l = p0;
      break;
    default:
      l = yu;
  }
  ((n = l.bind(null, t, n, e)),
    (l = void 0),
    !Po ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1));
}
function no(e, t, n, r, l) {
  var i = r;
  if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var u = r.stateNode.containerInfo;
        if (u === l || (u.nodeType === 8 && u.parentNode === l)) break;
        if (o === 4)
          for (o = r.return; o !== null;) {
            var s = o.tag;
            if (s === 3 || s === 4) {
              if (
                ((s = o.stateNode.containerInfo),
                s === l || (s.nodeType === 8 && s.parentNode === l))
              )
                return;
            }
            o = o.return;
          }
        for (; u !== null;) {
          if (((o = At(u)), o === null)) return;
          if (((s = o.tag), s === 5 || s === 6)) {
            r = i = o;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
  Gs(function () {
    var p = i,
      h = mu(n),
      y = [];
    e: {
      var g = Sc.get(e);
      if (g !== void 0) {
        var S = wu,
          k = e;
        switch (e) {
          case "keypress":
            if (Ll(n) === 0) break e;
          case "keydown":
          case "keyup":
            S = P0;
            break;
          case "focusin":
            ((k = "focus"), (S = ji));
            break;
          case "focusout":
            ((k = "blur"), (S = ji));
            break;
          case "beforeblur":
          case "afterblur":
            S = ji;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            S = Aa;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            S = g0;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            S = b0;
            break;
          case xc:
          case wc:
          case Nc:
            S = x0;
            break;
          case kc:
            S = F0;
            break;
          case "scroll":
            S = m0;
            break;
          case "wheel":
            S = $0;
            break;
          case "copy":
          case "cut":
          case "paste":
            S = N0;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            S = Va;
        }
        var z = (t & 4) !== 0,
          M = !z && e === "scroll",
          m = z ? (g !== null ? g + "Capture" : null) : g;
        z = [];
        for (var d = p, v; d !== null;) {
          v = d;
          var x = v.stateNode;
          if (
            (v.tag === 5 &&
              x !== null &&
              ((v = x),
              m !== null && ((x = Sr(d, m)), x != null && z.push(Lr(d, x, v)))),
            M)
          )
            break;
          d = d.return;
        }
        0 < z.length &&
          ((g = new S(g, k, null, n, h)), y.push({ event: g, listeners: z }));
      }
    }
    if ((t & 7) === 0) {
      e: {
        if (
          ((g = e === "mouseover" || e === "pointerover"),
          (S = e === "mouseout" || e === "pointerout"),
          g &&
            n !== Co &&
            (k = n.relatedTarget || n.fromElement) &&
            (At(k) || k[ot]))
        )
          break e;
        if (S || g) {
          if (
            ((g =
              h.window === h
                ? h
                : (g = h.ownerDocument)
                  ? g.defaultView || g.parentWindow
                  : window),
            S)
          ) {
            if (
              ((k = n.relatedTarget || n.toElement),
              (S = p),
              (k = k ? At(k) : null),
              k !== null &&
                ((M = Jt(k)), k !== M || (k.tag !== 5 && k.tag !== 6)))
            )
              k = null;
          } else ((S = null), (k = p));
          if (S !== k) {
            if (
              ((z = Aa),
              (x = "onMouseLeave"),
              (m = "onMouseEnter"),
              (d = "mouse"),
              e === "pointerout" || e === "pointerover")
            )
              ((z = Va),
                (x = "onPointerLeave"),
                (m = "onPointerEnter"),
                (d = "pointer"));
            if (
              ((M = S == null ? g : fn(S)),
              (v = k == null ? g : fn(k)),
              (g = new z(x, d + "leave", S, n, h)),
              (g.target = M),
              (g.relatedTarget = v),
              (x = null),
              At(h) === p &&
                ((z = new z(m, d + "enter", k, n, h)),
                (z.target = v),
                (z.relatedTarget = M),
                (x = z)),
              (M = x),
              S && k)
            )
              t: {
                ((z = S), (m = k), (d = 0));
                for (v = z; v; v = ln(v)) d++;
                v = 0;
                for (x = m; x; x = ln(x)) v++;
                for (; 0 < d - v;) ((z = ln(z)), d--);
                for (; 0 < v - d;) ((m = ln(m)), v--);
                for (; d--;) {
                  if (z === m || (m !== null && z === m.alternate)) break t;
                  ((z = ln(z)), (m = ln(m)));
                }
                z = null;
              }
            else z = null;
            (S !== null && qa(y, g, S, z, !1),
              k !== null && M !== null && qa(y, M, k, z, !0));
          }
        }
      }
      e: {
        if (
          ((g = p ? fn(p) : window),
          (S = g.nodeName && g.nodeName.toLowerCase()),
          S === "select" || (S === "input" && g.type === "file"))
        )
          var C = V0;
        else if (Qa(g))
          if (mc) C = K0;
          else {
            C = W0;
            var _ = H0;
          }
        else
          (S = g.nodeName) &&
            S.toLowerCase() === "input" &&
            (g.type === "checkbox" || g.type === "radio") &&
            (C = Q0);
        if (C && (C = C(e, p))) {
          pc(y, C, n, h);
          break e;
        }
        (_ && _(e, g, p),
          e === "focusout" &&
            (_ = g._wrapperState) &&
            _.controlled &&
            g.type === "number" &&
            No(g, "number", g.value));
      }
      switch (((_ = p ? fn(p) : window), e)) {
        case "focusin":
          if (Qa(_) || _.contentEditable === "true")
            ((cn = _), (Fo = p), (gr = null));
          break;
        case "focusout":
          gr = Fo = cn = null;
          break;
        case "mousedown":
          Io = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Io = !1), Xa(y, n, h));
          break;
        case "selectionchange":
          if (X0) break;
        case "keydown":
        case "keyup":
          Xa(y, n, h);
      }
      var P;
      if (ku)
        e: {
          switch (e) {
            case "compositionstart":
              var T = "onCompositionStart";
              break e;
            case "compositionend":
              T = "onCompositionEnd";
              break e;
            case "compositionupdate":
              T = "onCompositionUpdate";
              break e;
          }
          T = void 0;
        }
      else
        sn
          ? dc(e, n) && (T = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      if (
        (T &&
          (cc &&
            n.locale !== "ko" &&
            (sn || T !== "onCompositionStart"
              ? T === "onCompositionEnd" && sn && (P = sc())
              : ((ht = h),
                (xu = "value" in ht ? ht.value : ht.textContent),
                (sn = !0))),
          (_ = Kl(p, T)),
          0 < _.length &&
            ((T = new Ua(T, e, null, n, h)),
            y.push({ event: T, listeners: _ }),
            P ? (T.data = P) : ((P = fc(n)), P !== null && (T.data = P)))),
        (P = D0 ? O0(e, n) : B0(e, n)))
      )
        ((p = Kl(p, "onBeforeInput")),
          0 < p.length &&
            ((h = new Ua("onBeforeInput", "beforeinput", null, n, h)),
            y.push({ event: h, listeners: p }),
            (h.data = P)));
    }
    zc(y, t);
  });
}
function Lr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Kl(e, t) {
  for (var n = t + "Capture", r = []; e !== null;) {
    var l = e,
      i = l.stateNode;
    (l.tag === 5 &&
      i !== null &&
      ((l = i),
      (i = Sr(e, n)),
      i != null && r.unshift(Lr(e, i, l)),
      (i = Sr(e, t)),
      i != null && r.push(Lr(e, i, l))),
      (e = e.return));
  }
  return r;
}
function ln(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e ? e : null;
}
function qa(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r;) {
    var u = n,
      s = u.alternate,
      p = u.stateNode;
    if (s !== null && s === r) break;
    (u.tag === 5 &&
      p !== null &&
      ((u = p),
      l
        ? ((s = Sr(n, i)), s != null && o.unshift(Lr(n, s, u)))
        : l || ((s = Sr(n, i)), s != null && o.push(Lr(n, s, u)))),
      (n = n.return));
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
function ja(e) {
  return (typeof e === "string" ? e : "" + e)
    .replace(
      J0,
      `
`,
    )
    .replace(q0, "");
}
function kl(e, t, n) {
  if (((t = ja(t)), ja(e) !== t && n)) throw Error(w(425));
}
function Yl() {}
function Bo(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children === "string" ||
    typeof t.children === "number" ||
    (typeof t.dangerouslySetInnerHTML === "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
function tm(e) {
  setTimeout(function () {
    throw e;
  });
}
function ro(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(l), Cr(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  Cr(t);
}
function kt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function ts(e) {
  e = e.previousSibling;
  for (var t = 0; e;) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
function At(e) {
  var t = e[Ze];
  if (t) return t;
  for (var n = e.parentNode; n;) {
    if ((t = n[ot] || n[Ze])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = ts(e); e !== null;) {
          if ((n = e[Ze])) return n;
          e = ts(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function Ar(e) {
  return (
    (e = e[Ze] || e[ot]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function fn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(w(33));
}
function pi(e) {
  return e[br] || null;
}
function Lt(e) {
  return { current: e };
}
function H(e) {
  0 > pn || ((e.current = Vo[pn]), (Vo[pn] = null), pn--);
}
function U(e, t) {
  (pn++, (Vo[pn] = e.current), (e.current = t));
}
function Cn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Pt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    i;
  for (i in n) l[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function ke(e) {
  return ((e = e.childContextTypes), e !== null && e !== void 0);
}
function Gl() {
  (H(Ne), H(pe));
}
function ns(e, t, n) {
  if (pe.current !== Pt) throw Error(w(168));
  (U(pe, t), U(Ne, n));
}
function Cc(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext !== "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(w(108, Hp(e) || "Unknown", l));
  return X({}, n, r);
}
function Xl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Pt),
    (Qt = pe.current),
    U(pe, e),
    U(Ne, Ne.current),
    !0
  );
}
function rs(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(w(169));
  (n
    ? ((e = Cc(e, t, Qt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      H(Ne),
      H(pe),
      U(pe, e))
    : H(Ne),
    U(Ne, n));
}
function _c(e) {
  tt === null ? (tt = [e]) : tt.push(e);
}
function lm(e) {
  ((mi = !0), _c(e));
}
function bt() {
  if (!lo && tt !== null) {
    lo = !0;
    var e = 0,
      t = B;
    try {
      var n = tt;
      for (B = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((tt = null), (mi = !1));
    } catch (l) {
      throw (tt !== null && (tt = tt.slice(e + 1)), qs(vu, bt), l);
    } finally {
      ((B = t), (lo = !1));
    }
  }
  return null;
}
function Ot(e, t) {
  ((mn[vn++] = Jl), (mn[vn++] = Zl), (Zl = e), (Jl = t));
}
function Pc(e, t, n) {
  ((Te[Le++] = nt), (Te[Le++] = rt), (Te[Le++] = Kt), (Kt = e));
  var r = nt;
  e = rt;
  var l = 32 - Ae(r) - 1;
  ((r &= ~(1 << l)), (n += 1));
  var i = 32 - Ae(t) + l;
  if (30 < i) {
    var o = l - (l % 5);
    ((i = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (l -= o),
      (nt = (1 << (32 - Ae(t) + l)) | (n << l) | r),
      (rt = i + e));
  } else ((nt = (1 << i) | (n << l) | r), (rt = e));
}
function zu(e) {
  e.return !== null && (Ot(e, 1), Pc(e, 1, 0));
}
function Eu(e) {
  for (; e === Zl;)
    ((Zl = mn[--vn]), (mn[vn] = null), (Jl = mn[--vn]), (mn[vn] = null));
  for (; e === Kt;)
    ((Kt = Te[--Le]),
      (Te[Le] = null),
      (rt = Te[--Le]),
      (Te[Le] = null),
      (nt = Te[--Le]),
      (Te[Le] = null));
}
function Tc(e, t) {
  var n = be(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function ls(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ce = e), (Ee = kt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ce = e), (Ee = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Kt !== null ? { id: nt, overflow: rt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = be(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ce = e),
            (Ee = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ho(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Wo(e) {
  if (Q) {
    var t = Ee;
    if (t) {
      var n = t;
      if (!ls(e, t)) {
        if (Ho(e)) throw Error(w(418));
        t = kt(n.nextSibling);
        var r = Ce;
        t && ls(e, t)
          ? Tc(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (Q = !1), (Ce = e));
      }
    } else {
      if (Ho(e)) throw Error(w(418));
      ((e.flags = (e.flags & -4097) | 2), (Q = !1), (Ce = e));
    }
  }
}
function is(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;)
    e = e.return;
  Ce = e;
}
function Sl(e) {
  if (e !== Ce) return !1;
  if (!Q) return (is(e), (Q = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Bo(e.type, e.memoizedProps))),
    t && (t = Ee))
  ) {
    if (Ho(e)) throw (Lc(), Error(w(418)));
    for (; t;) (Tc(e, t), (t = kt(t.nextSibling)));
  }
  if ((is(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(w(317));
    e: {
      e = e.nextSibling;
      for (t = 0; e;) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ee = kt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ee = null;
    }
  } else Ee = Ce ? kt(e.stateNode.nextSibling) : null;
  return !0;
}
function Lc() {
  for (var e = Ee; e;) e = kt(e.nextSibling);
}
function _n() {
  ((Ee = Ce = null), (Q = !1));
}
function Cu(e) {
  Be === null ? (Be = [e]) : Be.push(e);
}
function tr(e, t, n) {
  if (
    ((e = n.ref),
    e !== null && typeof e !== "function" && typeof e !== "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(w(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(w(147, e));
      var l = r,
        i = "" + e;
      if (
        t !== null &&
        t.ref !== null &&
        typeof t.ref === "function" &&
        t.ref._stringRef === i
      )
        return t.ref;
      return (
        (t = function (o) {
          var u = l.refs;
          o === null ? delete u[i] : (u[i] = o);
        }),
        (t._stringRef = i),
        t
      );
    }
    if (typeof e !== "string") throw Error(w(284));
    if (!n._owner) throw Error(w(290, e));
  }
  return e;
}
function zl(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      w(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    )
  );
}
function os(e) {
  var t = e._init;
  return t(e._payload);
}
function bc(e) {
  function t(m, d) {
    if (e) {
      var v = m.deletions;
      v === null ? ((m.deletions = [d]), (m.flags |= 16)) : v.push(d);
    }
  }
  function n(m, d) {
    if (!e) return null;
    for (; d !== null;) (t(m, d), (d = d.sibling));
    return null;
  }
  function r(m, d) {
    for (m = new Map(); d !== null;)
      (d.key !== null ? m.set(d.key, d) : m.set(d.index, d), (d = d.sibling));
    return m;
  }
  function l(m, d) {
    return ((m = Ct(m, d)), (m.index = 0), (m.sibling = null), m);
  }
  function i(m, d, v) {
    if (((m.index = v), !e)) return ((m.flags |= 1048576), d);
    if (((v = m.alternate), v !== null))
      return ((v = v.index), v < d ? ((m.flags |= 2), d) : v);
    return ((m.flags |= 2), d);
  }
  function o(m) {
    return (e && m.alternate === null && (m.flags |= 2), m);
  }
  function u(m, d, v, x) {
    if (d === null || d.tag !== 6)
      return ((d = fo(v, m.mode, x)), (d.return = m), d);
    return ((d = l(d, v)), (d.return = m), d);
  }
  function s(m, d, v, x) {
    var C = v.type;
    if (C === an) return h(m, d, v.props.children, x, v.key);
    if (
      d !== null &&
      (d.elementType === C ||
        (typeof C === "object" &&
          C !== null &&
          C.$$typeof === pt &&
          os(C) === d.type))
    )
      return ((x = l(d, v.props)), (x.ref = tr(m, d, v)), (x.return = m), x);
    return (
      (x = Ol(v.type, v.key, v.props, null, m.mode, x)),
      (x.ref = tr(m, d, v)),
      (x.return = m),
      x
    );
  }
  function p(m, d, v, x) {
    if (
      d === null ||
      d.tag !== 4 ||
      d.stateNode.containerInfo !== v.containerInfo ||
      d.stateNode.implementation !== v.implementation
    )
      return ((d = po(v, m.mode, x)), (d.return = m), d);
    return ((d = l(d, v.children || [])), (d.return = m), d);
  }
  function h(m, d, v, x, C) {
    if (d === null || d.tag !== 7)
      return ((d = Wt(v, m.mode, x, C)), (d.return = m), d);
    return ((d = l(d, v)), (d.return = m), d);
  }
  function y(m, d, v) {
    if ((typeof d === "string" && d !== "") || typeof d === "number")
      return ((d = fo("" + d, m.mode, v)), (d.return = m), d);
    if (typeof d === "object" && d !== null) {
      switch (d.$$typeof) {
        case pl:
          return (
            (v = Ol(d.type, d.key, d.props, null, m.mode, v)),
            (v.ref = tr(m, null, d)),
            (v.return = m),
            v
          );
        case un:
          return ((d = po(d, m.mode, v)), (d.return = m), d);
        case pt:
          var x = d._init;
          return y(m, x(d._payload), v);
      }
      if (ir(d) || Jn(d))
        return ((d = Wt(d, m.mode, v, null)), (d.return = m), d);
      zl(m, d);
    }
    return null;
  }
  function g(m, d, v, x) {
    var C = d !== null ? d.key : null;
    if ((typeof v === "string" && v !== "") || typeof v === "number")
      return C !== null ? null : u(m, d, "" + v, x);
    if (typeof v === "object" && v !== null) {
      switch (v.$$typeof) {
        case pl:
          return v.key === C ? s(m, d, v, x) : null;
        case un:
          return v.key === C ? p(m, d, v, x) : null;
        case pt:
          return ((C = v._init), g(m, d, C(v._payload), x));
      }
      if (ir(v) || Jn(v)) return C !== null ? null : h(m, d, v, x, null);
      zl(m, v);
    }
    return null;
  }
  function S(m, d, v, x, C) {
    if ((typeof x === "string" && x !== "") || typeof x === "number")
      return ((m = m.get(v) || null), u(d, m, "" + x, C));
    if (typeof x === "object" && x !== null) {
      switch (x.$$typeof) {
        case pl:
          return (
            (m = m.get(x.key === null ? v : x.key) || null),
            s(d, m, x, C)
          );
        case un:
          return (
            (m = m.get(x.key === null ? v : x.key) || null),
            p(d, m, x, C)
          );
        case pt:
          var _ = x._init;
          return S(m, d, v, _(x._payload), C);
      }
      if (ir(x) || Jn(x)) return ((m = m.get(v) || null), h(d, m, x, C, null));
      zl(d, x);
    }
    return null;
  }
  function k(m, d, v, x) {
    for (
      var C = null, _ = null, P = d, T = (d = 0), J = null;
      P !== null && T < v.length;
      T++
    ) {
      P.index > T ? ((J = P), (P = null)) : (J = P.sibling);
      var F = g(m, P, v[T], x);
      if (F === null) {
        P === null && (P = J);
        break;
      }
      (e && P && F.alternate === null && t(m, P),
        (d = i(F, d, T)),
        _ === null ? (C = F) : (_.sibling = F),
        (_ = F),
        (P = J));
    }
    if (T === v.length) return (n(m, P), Q && Ot(m, T), C);
    if (P === null) {
      for (; T < v.length; T++)
        ((P = y(m, v[T], x)),
          P !== null &&
            ((d = i(P, d, T)),
            _ === null ? (C = P) : (_.sibling = P),
            (_ = P)));
      return (Q && Ot(m, T), C);
    }
    for (P = r(m, P); T < v.length; T++)
      ((J = S(P, m, T, v[T], x)),
        J !== null &&
          (e && J.alternate !== null && P.delete(J.key === null ? T : J.key),
          (d = i(J, d, T)),
          _ === null ? (C = J) : (_.sibling = J),
          (_ = J)));
    return (
      e &&
        P.forEach(function (He) {
          return t(m, He);
        }),
      Q && Ot(m, T),
      C
    );
  }
  function z(m, d, v, x) {
    var C = Jn(v);
    if (typeof C !== "function") throw Error(w(150));
    if (((v = C.call(v)), v == null)) throw Error(w(151));
    for (
      var _ = (C = null), P = d, T = (d = 0), J = null, F = v.next();
      P !== null && !F.done;
      T++, F = v.next()
    ) {
      P.index > T ? ((J = P), (P = null)) : (J = P.sibling);
      var He = g(m, P, F.value, x);
      if (He === null) {
        P === null && (P = J);
        break;
      }
      (e && P && He.alternate === null && t(m, P),
        (d = i(He, d, T)),
        _ === null ? (C = He) : (_.sibling = He),
        (_ = He),
        (P = J));
    }
    if (F.done) return (n(m, P), Q && Ot(m, T), C);
    if (P === null) {
      for (; !F.done; T++, F = v.next())
        ((F = y(m, F.value, x)),
          F !== null &&
            ((d = i(F, d, T)),
            _ === null ? (C = F) : (_.sibling = F),
            (_ = F)));
      return (Q && Ot(m, T), C);
    }
    for (P = r(m, P); !F.done; T++, F = v.next())
      ((F = S(P, m, T, F.value, x)),
        F !== null &&
          (e && F.alternate !== null && P.delete(F.key === null ? T : F.key),
          (d = i(F, d, T)),
          _ === null ? (C = F) : (_.sibling = F),
          (_ = F)));
    return (
      e &&
        P.forEach(function (Un) {
          return t(m, Un);
        }),
      Q && Ot(m, T),
      C
    );
  }
  function M(m, d, v, x) {
    if (
      (typeof v === "object" &&
        v !== null &&
        v.type === an &&
        v.key === null &&
        (v = v.props.children),
      typeof v === "object" && v !== null)
    ) {
      switch (v.$$typeof) {
        case pl:
          e: {
            for (var C = v.key, _ = d; _ !== null;) {
              if (_.key === C) {
                if (((C = v.type), C === an)) {
                  if (_.tag === 7) {
                    (n(m, _.sibling),
                      (d = l(_, v.props.children)),
                      (d.return = m),
                      (m = d));
                    break e;
                  }
                } else if (
                  _.elementType === C ||
                  (typeof C === "object" &&
                    C !== null &&
                    C.$$typeof === pt &&
                    os(C) === _.type)
                ) {
                  (n(m, _.sibling),
                    (d = l(_, v.props)),
                    (d.ref = tr(m, _, v)),
                    (d.return = m),
                    (m = d));
                  break e;
                }
                n(m, _);
                break;
              } else t(m, _);
              _ = _.sibling;
            }
            v.type === an
              ? ((d = Wt(v.props.children, m.mode, x, v.key)),
                (d.return = m),
                (m = d))
              : ((x = Ol(v.type, v.key, v.props, null, m.mode, x)),
                (x.ref = tr(m, d, v)),
                (x.return = m),
                (m = x));
          }
          return o(m);
        case un:
          e: {
            for (_ = v.key; d !== null;) {
              if (d.key === _)
                if (
                  d.tag === 4 &&
                  d.stateNode.containerInfo === v.containerInfo &&
                  d.stateNode.implementation === v.implementation
                ) {
                  (n(m, d.sibling),
                    (d = l(d, v.children || [])),
                    (d.return = m),
                    (m = d));
                  break e;
                } else {
                  n(m, d);
                  break;
                }
              else t(m, d);
              d = d.sibling;
            }
            ((d = po(v, m.mode, x)), (d.return = m), (m = d));
          }
          return o(m);
        case pt:
          return ((_ = v._init), M(m, d, _(v._payload), x));
      }
      if (ir(v)) return k(m, d, v, x);
      if (Jn(v)) return z(m, d, v, x);
      zl(m, v);
    }
    return (typeof v === "string" && v !== "") || typeof v === "number"
      ? ((v = "" + v),
        d !== null && d.tag === 6
          ? (n(m, d.sibling), (d = l(d, v)), (d.return = m), (m = d))
          : (n(m, d), (d = fo(v, m.mode, x)), (d.return = m), (m = d)),
        o(m))
      : n(m, d);
  }
  return M;
}
function Pu() {
  _u = gn = jl = null;
}
function Tu(e) {
  var t = ql.current;
  (H(ql), (e._currentValue = t));
}
function Qo(e, t, n) {
  for (; e !== null;) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Sn(e, t) {
  ((jl = e),
    (_u = gn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      ((e.lanes & t) !== 0 && (we = !0), (e.firstContext = null)));
}
function Fe(e) {
  var t = e._currentValue;
  if (_u !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), gn === null)) {
      if (jl === null) throw Error(w(308));
      ((gn = e), (jl.dependencies = { lanes: 0, firstContext: e }));
    } else gn = gn.next = e;
  return t;
}
function Lu(e) {
  Ut === null ? (Ut = [e]) : Ut.push(e);
}
function Fc(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), Lu(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    ut(e, r)
  );
}
function ut(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  (n !== null && (n.lanes |= t), (n = e));
  for (e = e.return; e !== null;)
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
function bu(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Ic(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function lt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function St(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), (D & 2) !== 0)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      ut(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), Lu(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    ut(e, n)
  );
}
function Ml(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), gu(e, n));
  }
}
function us(e, t) {
  var { updateQueue: n, alternate: r } = e;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (i === null ? (l = i = o) : (i = i.next = o), (n = n.next));
      } while (n !== null);
      i === null ? (l = i = t) : (i = i.next = t);
    } else l = i = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function ei(e, t, n, r) {
  var l = e.updateQueue;
  mt = !1;
  var { firstBaseUpdate: i, lastBaseUpdate: o } = l,
    u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var s = u,
      p = s.next;
    ((s.next = null), o === null ? (i = p) : (o.next = p), (o = s));
    var h = e.alternate;
    h !== null &&
      ((h = h.updateQueue),
      (u = h.lastBaseUpdate),
      u !== o &&
        (u === null ? (h.firstBaseUpdate = p) : (u.next = p),
        (h.lastBaseUpdate = s)));
  }
  if (i !== null) {
    var y = l.baseState;
    ((o = 0), (h = p = s = null), (u = i));
    do {
      var { lane: g, eventTime: S } = u;
      if ((r & g) === g) {
        h !== null &&
          (h = h.next =
            {
              eventTime: S,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            });
        e: {
          var k = e,
            z = u;
          switch (((g = t), (S = n), z.tag)) {
            case 1:
              if (((k = z.payload), typeof k === "function")) {
                y = k.call(S, y, g);
                break e;
              }
              y = k;
              break e;
            case 3:
              k.flags = (k.flags & -65537) | 128;
            case 0:
              if (
                ((k = z.payload),
                (g = typeof k === "function" ? k.call(S, y, g) : k),
                g === null || g === void 0)
              )
                break e;
              y = X({}, y, g);
              break e;
            case 2:
              mt = !0;
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64),
          (g = l.effects),
          g === null ? (l.effects = [u]) : g.push(u));
      } else
        ((S = {
          eventTime: S,
          lane: g,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          h === null ? ((p = h = S), (s = y)) : (h = h.next = S),
          (o |= g));
      if (((u = u.next), u === null))
        if (((u = l.shared.pending), u === null)) break;
        else
          ((g = u),
            (u = g.next),
            (g.next = null),
            (l.lastBaseUpdate = g),
            (l.shared.pending = null));
    } while (1);
    if (
      (h === null && (s = y),
      (l.baseState = s),
      (l.firstBaseUpdate = p),
      (l.lastBaseUpdate = h),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do ((o |= l.lane), (l = l.next));
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    ((Gt |= o), (e.lanes = o), (e.memoizedState = y));
  }
}
function as(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l !== "function"))
          throw Error(w(191, l));
        l.call(r);
      }
    }
}
function Vt(e) {
  if (e === Ur) throw Error(w(174));
  return e;
}
function Mu(e, t) {
  switch ((U(Fr, t), U(Mr, e), U(qe, Ur), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : So(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = So(t, e)));
  }
  (H(qe), U(qe, t));
}
function Tn() {
  (H(qe), H(Mr), H(Fr));
}
function $c(e) {
  Vt(Fr.current);
  var t = Vt(qe.current),
    n = So(t, e.type);
  t !== n && (U(Mr, e), U(qe, n));
}
function Fu(e) {
  Mr.current === e && (H(qe), H(Mr));
}
function ti(e) {
  for (var t = e; t !== null;) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if ((t.flags & 128) !== 0) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null;) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
function Iu() {
  for (var e = 0; e < io.length; e++)
    io[e]._workInProgressVersionPrimary = null;
  io.length = 0;
}
function ce() {
  throw Error(w(321));
}
function $u(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Ve(e[n], t[n])) return !1;
  return !0;
}
function Ru(e, t, n, r, l, i) {
  if (
    ((Yt = i),
    (G = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Fl.current = e === null || e.memoizedState === null ? cm : dm),
    (e = n(r, l)),
    hr)
  ) {
    i = 0;
    do {
      if (((hr = !1), (Ir = 0), 25 <= i)) throw Error(w(301));
      ((i += 1),
        (re = ee = null),
        (t.updateQueue = null),
        (Fl.current = fm),
        (e = n(r, l)));
    } while (hr);
  }
  if (
    ((Fl.current = ri),
    (t = ee !== null && ee.next !== null),
    (Yt = 0),
    (re = ee = G = null),
    (ni = !1),
    t)
  )
    throw Error(w(300));
  return e;
}
function Du() {
  var e = Ir !== 0;
  return ((Ir = 0), e);
}
function Xe() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (re === null ? (G.memoizedState = re = e) : (re = re.next = e), re);
}
function Ie() {
  if (ee === null) {
    var e = G.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ee.next;
  var t = re === null ? G.memoizedState : re.next;
  if (t !== null) ((re = t), (ee = e));
  else {
    if (e === null) throw Error(w(310));
    ((ee = e),
      (e = {
        memoizedState: ee.memoizedState,
        baseState: ee.baseState,
        baseQueue: ee.baseQueue,
        queue: ee.queue,
        next: null,
      }),
      re === null ? (G.memoizedState = re = e) : (re = re.next = e));
  }
  return re;
}
function $r(e, t) {
  return typeof t === "function" ? t(e) : t;
}
function uo(e) {
  var t = Ie(),
    n = t.queue;
  if (n === null) throw Error(w(311));
  n.lastRenderedReducer = e;
  var r = ee,
    l = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      ((l.next = i.next), (i.next = o));
    }
    ((r.baseQueue = l = i), (n.pending = null));
  }
  if (l !== null) {
    ((i = l.next), (r = r.baseState));
    var u = (o = null),
      s = null,
      p = i;
    do {
      var h = p.lane;
      if ((Yt & h) === h)
        (s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null,
            }),
          (r = p.hasEagerState ? p.eagerState : e(r, p.action)));
      else {
        var y = {
          lane: h,
          action: p.action,
          hasEagerState: p.hasEagerState,
          eagerState: p.eagerState,
          next: null,
        };
        (s === null ? ((u = s = y), (o = r)) : (s = s.next = y),
          (G.lanes |= h),
          (Gt |= h));
      }
      p = p.next;
    } while (p !== null && p !== i);
    (s === null ? (o = r) : (s.next = u),
      Ve(r, t.memoizedState) || (we = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = s),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do ((i = l.lane), (G.lanes |= i), (Gt |= i), (l = l.next));
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ao(e) {
  var t = Ie(),
    n = t.queue;
  if (n === null) throw Error(w(311));
  n.lastRenderedReducer = e;
  var { dispatch: r, pending: l } = n,
    i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = (l = l.next);
    do ((i = e(i, o.action)), (o = o.next));
    while (o !== l);
    (Ve(i, t.memoizedState) || (we = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i));
  }
  return [i, r];
}
function Rc() {}
function Dc(e, t) {
  var n = G,
    r = Ie(),
    l = t(),
    i = !Ve(r.memoizedState, l);
  if (
    (i && ((r.memoizedState = l), (we = !0)),
    (r = r.queue),
    Ou(Ac.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (re !== null && re.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Rr(9, Bc.bind(null, n, r, l, t), void 0, null),
      le === null)
    )
      throw Error(w(349));
    (Yt & 30) !== 0 || Oc(n, t, l);
  }
  return l;
}
function Oc(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = G.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (G.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function Bc(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), Uc(t) && Vc(e));
}
function Ac(e, t, n) {
  return n(function () {
    Uc(t) && Vc(e);
  });
}
function Uc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ve(e, n);
  } catch (r) {
    return !0;
  }
}
function Vc(e) {
  var t = ut(e, 1);
  t !== null && Ue(t, e, 1, -1);
}
function ss(e) {
  var t = Xe();
  return (
    typeof e === "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: $r,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = sm.bind(null, G, e)),
    [t.memoizedState, e]
  );
}
function Rr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = G.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (G.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Hc() {
  return Ie().memoizedState;
}
function Il(e, t, n, r) {
  var l = Xe();
  ((G.flags |= e),
    (l.memoizedState = Rr(1 | t, n, void 0, r === void 0 ? null : r)));
}
function vi(e, t, n, r) {
  var l = Ie();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (ee !== null) {
    var o = ee.memoizedState;
    if (((i = o.destroy), r !== null && $u(r, o.deps))) {
      l.memoizedState = Rr(t, n, i, r);
      return;
    }
  }
  ((G.flags |= e), (l.memoizedState = Rr(1 | t, n, i, r)));
}
function cs(e, t) {
  return Il(8390656, 8, e, t);
}
function Ou(e, t) {
  return vi(2048, 8, e, t);
}
function Wc(e, t) {
  return vi(4, 2, e, t);
}
function Qc(e, t) {
  return vi(4, 4, e, t);
}
function Kc(e, t) {
  if (typeof t === "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t !== null && t !== void 0)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Yc(e, t, n) {
  return (
    (n = n !== null && n !== void 0 ? n.concat([e]) : null),
    vi(4, 4, Kc.bind(null, t, e), n)
  );
}
function Bu() {}
function Gc(e, t) {
  var n = Ie();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  if (r !== null && t !== null && $u(t, r[1])) return r[0];
  return ((n.memoizedState = [e, t]), e);
}
function Xc(e, t) {
  var n = Ie();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  if (r !== null && t !== null && $u(t, r[1])) return r[0];
  return ((e = e()), (n.memoizedState = [e, t]), e);
}
function Zc(e, t, n) {
  if ((Yt & 21) === 0)
    return (
      e.baseState && ((e.baseState = !1), (we = !0)),
      (e.memoizedState = n)
    );
  return (
    Ve(n, t) || ((n = tc()), (G.lanes |= n), (Gt |= n), (e.baseState = !0)),
    t
  );
}
function um(e, t) {
  var n = B;
  ((B = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = oo.transition;
  oo.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((B = n), (oo.transition = r));
  }
}
function Jc() {
  return Ie().memoizedState;
}
function am(e, t, n) {
  var r = Et(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    qc(e))
  )
    jc(t, n);
  else if (((n = Fc(e, t, n, r)), n !== null)) {
    var l = ge();
    (Ue(n, e, r, l), ed(n, t, r));
  }
}
function sm(e, t, n) {
  var r = Et(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (qc(e)) jc(t, l);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var o = t.lastRenderedState,
          u = i(o, n);
        if (((l.hasEagerState = !0), (l.eagerState = u), Ve(u, o))) {
          var s = t.interleaved;
          (s === null
            ? ((l.next = l), Lu(t))
            : ((l.next = s.next), (s.next = l)),
            (t.interleaved = l));
          return;
        }
      } catch (p) {
      } finally {
      }
    ((n = Fc(e, t, l, r)),
      n !== null && ((l = ge()), Ue(n, e, r, l), ed(n, t, r)));
  }
}
function qc(e) {
  var t = e.alternate;
  return e === G || (t !== null && t === G);
}
function jc(e, t) {
  hr = ni = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function ed(e, t, n) {
  if ((n & 4194240) !== 0) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), gu(e, n));
  }
}
function De(e, t) {
  if (e && e.defaultProps) {
    ((t = X({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ko(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n === null || n === void 0 ? t : X({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
function ds(e, t, n, r, l, i, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate === "function"
      ? e.shouldComponentUpdate(r, i, o)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Pr(n, r) || !Pr(l, i)
        : !0
  );
}
function td(e, t, n) {
  var r = !1,
    l = Pt,
    i = t.contextType;
  return (
    typeof i === "object" && i !== null
      ? (i = Fe(i))
      : ((l = ke(t) ? Qt : pe.current),
        (r = t.contextTypes),
        (i = (r = r !== null && r !== void 0) ? Cn(e, l) : Pt)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = gi),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function fs(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps === "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps === "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && gi.enqueueReplaceState(t, t.state, null));
}
function Yo(e, t, n, r) {
  var l = e.stateNode;
  ((l.props = n), (l.state = e.memoizedState), (l.refs = {}), bu(e));
  var i = t.contextType;
  (typeof i === "object" && i !== null
    ? (l.context = Fe(i))
    : ((i = ke(t) ? Qt : pe.current), (l.context = Cn(e, i))),
    (l.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i === "function" && (Ko(e, t, i, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps === "function" ||
      typeof l.getSnapshotBeforeUpdate === "function" ||
      (typeof l.UNSAFE_componentWillMount !== "function" &&
        typeof l.componentWillMount !== "function") ||
      ((t = l.state),
      typeof l.componentWillMount === "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount === "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && gi.enqueueReplaceState(l, l.state, null),
      ei(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount === "function" && (e.flags |= 4194308));
}
function Ln(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += Vp(r)), (r = r.return));
    while (r);
    var l = n;
  } catch (i) {
    l =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function so(e, t, n) {
  return {
    value: e,
    source: null,
    stack: n != null ? n : null,
    digest: t != null ? t : null,
  };
}
function Go(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
function nd(e, t, n) {
  ((n = lt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (ii || ((ii = !0), (lu = r)), Go(e, t));
    }),
    n
  );
}
function rd(e, t, n) {
  ((n = lt(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r === "function") {
    var l = t.value;
    ((n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Go(e, t);
      }));
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch === "function" &&
      (n.callback = function () {
        (Go(e, t),
          typeof r !== "function" &&
            (zt === null ? (zt = new Set([this])) : zt.add(this)));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function ps(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new pm();
    var l = new Set();
    r.set(t, l);
  } else ((l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l)));
  l.has(n) || (l.add(n), (e = _m.bind(null, e, t, n)), t.then(e, e));
}
function ms(e) {
  do {
    var t;
    if ((t = e.tag === 13))
      ((t = e.memoizedState),
        (t = t !== null ? (t.dehydrated !== null ? !0 : !1) : !0));
    if (t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function vs(e, t, n, r, l) {
  if ((e.mode & 1) === 0)
    return (
      e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = lt(-1, 1)), (t.tag = 2), St(n, t, 1))),
          (n.lanes |= 1)),
      e
    );
  return ((e.flags |= 65536), (e.lanes = l), e);
}
function ve(e, t, n, r) {
  t.child = e === null ? Mc(t, null, n, r) : Pn(t, e.child, n, r);
}
function gs(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  if ((Sn(t, l), (r = Ru(e, t, n, r, i, l)), (n = Du()), e !== null && !we))
    return (
      (t.updateQueue = e.updateQueue),
      (t.flags &= -2053),
      (e.lanes &= ~l),
      at(e, t, l)
    );
  return (Q && n && zu(t), (t.flags |= 1), ve(e, t, r, l), t.child);
}
function hs(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    if (
      typeof i === "function" &&
      !Yu(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
    )
      return ((t.tag = 15), (t.type = i), ld(e, t, i, r, l));
    return (
      (e = Ol(n.type, null, r, t, t.mode, l)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  if (((i = e.child), (e.lanes & l) === 0)) {
    var o = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Pr), n(o, r) && e.ref === t.ref)
    )
      return at(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = Ct(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function ld(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Pr(i, r) && e.ref === t.ref)
      if (((we = !1), (t.pendingProps = r = i), (e.lanes & l) !== 0))
        (e.flags & 131072) !== 0 && (we = !0);
      else return ((t.lanes = e.lanes), at(e, t, l));
  }
  return Xo(e, t, n, r, l);
}
function id(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if ((t.mode & 1) === 0)
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        U(yn, ze),
        (ze |= n));
    else {
      if ((n & 1073741824) === 0)
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          U(yn, ze),
          (ze |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        U(yn, ze),
        (ze |= r));
    }
  else
    (i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      U(yn, ze),
      (ze |= r));
  return (ve(e, t, l, n), t.child);
}
function od(e, t) {
  var n = t.ref;
  if ((e === null && n !== null) || (e !== null && e.ref !== n))
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Xo(e, t, n, r, l) {
  var i = ke(n) ? Qt : pe.current;
  if (
    ((i = Cn(t, i)),
    Sn(t, l),
    (n = Ru(e, t, n, r, i, l)),
    (r = Du()),
    e !== null && !we)
  )
    return (
      (t.updateQueue = e.updateQueue),
      (t.flags &= -2053),
      (e.lanes &= ~l),
      at(e, t, l)
    );
  return (Q && r && zu(t), (t.flags |= 1), ve(e, t, n, l), t.child);
}
function ys(e, t, n, r, l) {
  if (ke(n)) {
    var i = !0;
    Xl(t);
  } else i = !1;
  if ((Sn(t, l), t.stateNode === null))
    ($l(e, t), td(t, n, r), Yo(t, n, r, l), (r = !0));
  else if (e === null) {
    var { stateNode: o, memoizedProps: u } = t;
    o.props = u;
    var s = o.context,
      p = n.contextType;
    typeof p === "object" && p !== null
      ? (p = Fe(p))
      : ((p = ke(n) ? Qt : pe.current), (p = Cn(t, p)));
    var h = n.getDerivedStateFromProps,
      y =
        typeof h === "function" ||
        typeof o.getSnapshotBeforeUpdate === "function";
    (y ||
      (typeof o.UNSAFE_componentWillReceiveProps !== "function" &&
        typeof o.componentWillReceiveProps !== "function") ||
      ((u !== r || s !== p) && fs(t, o, r, p)),
      (mt = !1));
    var g = t.memoizedState;
    ((o.state = g),
      ei(t, r, o, l),
      (s = t.memoizedState),
      u !== r || g !== s || Ne.current || mt
        ? (typeof h === "function" && (Ko(t, n, h, r), (s = t.memoizedState)),
          (u = mt || ds(t, n, u, r, g, s, p))
            ? (y ||
                (typeof o.UNSAFE_componentWillMount !== "function" &&
                  typeof o.componentWillMount !== "function") ||
                (typeof o.componentWillMount === "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount === "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount === "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount === "function" &&
                (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = s)),
          (o.props = r),
          (o.state = s),
          (o.context = p),
          (r = u))
        : (typeof o.componentDidMount === "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((o = t.stateNode),
      Ic(e, t),
      (u = t.memoizedProps),
      (p = t.type === t.elementType ? u : De(t.type, u)),
      (o.props = p),
      (y = t.pendingProps),
      (g = o.context),
      (s = n.contextType),
      typeof s === "object" && s !== null
        ? (s = Fe(s))
        : ((s = ke(n) ? Qt : pe.current), (s = Cn(t, s))));
    var S = n.getDerivedStateFromProps;
    ((h =
      typeof S === "function" ||
      typeof o.getSnapshotBeforeUpdate === "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps !== "function" &&
        typeof o.componentWillReceiveProps !== "function") ||
      ((u !== y || g !== s) && fs(t, o, r, s)),
      (mt = !1),
      (g = t.memoizedState),
      (o.state = g),
      ei(t, r, o, l));
    var k = t.memoizedState;
    u !== y || g !== k || Ne.current || mt
      ? (typeof S === "function" && (Ko(t, n, S, r), (k = t.memoizedState)),
        (p = mt || ds(t, n, p, r, g, k, s) || !1)
          ? (h ||
              (typeof o.UNSAFE_componentWillUpdate !== "function" &&
                typeof o.componentWillUpdate !== "function") ||
              (typeof o.componentWillUpdate === "function" &&
                o.componentWillUpdate(r, k, s),
              typeof o.UNSAFE_componentWillUpdate === "function" &&
                o.UNSAFE_componentWillUpdate(r, k, s)),
            typeof o.componentDidUpdate === "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate === "function" &&
              (t.flags |= 1024))
          : (typeof o.componentDidUpdate !== "function" ||
              (u === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate !== "function" ||
              (u === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = k)),
        (o.props = r),
        (o.state = k),
        (o.context = s),
        (r = p))
      : (typeof o.componentDidUpdate !== "function" ||
          (u === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate !== "function" ||
          (u === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Zo(e, t, n, r, i, l);
}
function Zo(e, t, n, r, l, i) {
  od(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return (l && rs(t, n, !1), at(e, t, i));
  ((r = t.stateNode), (mm.current = t));
  var u =
    o && typeof n.getDerivedStateFromError !== "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = Pn(t, e.child, null, i)), (t.child = Pn(t, null, u, i)))
      : ve(e, t, u, i),
    (t.memoizedState = r.state),
    l && rs(t, n, !0),
    t.child
  );
}
function ud(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? ns(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && ns(e, t.context, !1),
    Mu(e, t.containerInfo));
}
function xs(e, t, n, r, l) {
  return (_n(), Cu(l), (t.flags |= 256), ve(e, t, n, r), t.child);
}
function qo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function ad(e, t, n) {
  var r = t.pendingProps,
    l = Y.current,
    i = !1,
    o = (t.flags & 128) !== 0,
    u;
  if (
    ((u = o) ||
      (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    u)
  )
    ((i = !0), (t.flags &= -129));
  else if (e === null || e.memoizedState !== null) l |= 1;
  if ((U(Y, l & 1), e === null)) {
    if (
      (Wo(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null))
    )
      return (
        (t.mode & 1) === 0
          ? (t.lanes = 1)
          : e.data === "$!"
            ? (t.lanes = 8)
            : (t.lanes = 1073741824),
        null
      );
    return (
      (o = r.children),
      (e = r.fallback),
      i
        ? ((r = t.mode),
          (i = t.child),
          (o = { mode: "hidden", children: o }),
          (r & 1) === 0 && i !== null
            ? ((i.childLanes = 0), (i.pendingProps = o))
            : (i = xi(o, r, 0, null)),
          (e = Wt(e, r, n, null)),
          (i.return = t),
          (e.return = t),
          (i.sibling = e),
          (t.child = i),
          (t.child.memoizedState = qo(n)),
          (t.memoizedState = Jo),
          e)
        : Au(t, o)
    );
  }
  if (((l = e.memoizedState), l !== null && ((u = l.dehydrated), u !== null)))
    return vm(e, t, o, r, u, l, n);
  if (i) {
    ((i = r.fallback), (o = t.mode), (l = e.child), (u = l.sibling));
    var s = { mode: "hidden", children: r.children };
    return (
      (o & 1) === 0 && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = s),
          (t.deletions = null))
        : ((r = Ct(l, s)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      u !== null ? (i = Ct(u, i)) : ((i = Wt(i, o, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? qo(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (i.memoizedState = o),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = Jo),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = Ct(i, { mode: "visible", children: r.children })),
    (t.mode & 1) === 0 && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Au(e, t) {
  return (
    (t = xi({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function El(e, t, n, r) {
  return (
    r !== null && Cu(r),
    Pn(t, e.child, null, n),
    (e = Au(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function vm(e, t, n, r, l, i, o) {
  if (n) {
    if (t.flags & 256)
      return ((t.flags &= -257), (r = so(Error(w(422)))), El(e, t, o, r));
    if (t.memoizedState !== null)
      return ((t.child = e.child), (t.flags |= 128), null);
    return (
      (i = r.fallback),
      (l = t.mode),
      (r = xi({ mode: "visible", children: r.children }, l, 0, null)),
      (i = Wt(i, l, o, null)),
      (i.flags |= 2),
      (r.return = t),
      (i.return = t),
      (r.sibling = i),
      (t.child = r),
      (t.mode & 1) !== 0 && Pn(t, e.child, null, o),
      (t.child.memoizedState = qo(o)),
      (t.memoizedState = Jo),
      i
    );
  }
  if ((t.mode & 1) === 0) return El(e, t, o, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var u = r.dgst;
    return (
      (r = u),
      (i = Error(w(419))),
      (r = so(i, r, void 0)),
      El(e, t, o, r)
    );
  }
  if (((u = (o & e.childLanes) !== 0), we || u)) {
    if (((r = le), r !== null)) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
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
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      ((l = (l & (r.suspendedLanes | o)) !== 0 ? 0 : l),
        l !== 0 &&
          l !== i.retryLane &&
          ((i.retryLane = l), ut(e, l), Ue(r, e, l, -1)));
    }
    return (Ku(), (r = so(Error(w(421)))), El(e, t, o, r));
  }
  if (l.data === "$?")
    return (
      (t.flags |= 128),
      (t.child = e.child),
      (t = Pm.bind(null, e)),
      (l._reactRetry = t),
      null
    );
  return (
    (e = i.treeContext),
    (Ee = kt(l.nextSibling)),
    (Ce = t),
    (Q = !0),
    (Be = null),
    e !== null &&
      ((Te[Le++] = nt),
      (Te[Le++] = rt),
      (Te[Le++] = Kt),
      (nt = e.id),
      (rt = e.overflow),
      (Kt = t)),
    (t = Au(t, r.children)),
    (t.flags |= 4096),
    t
  );
}
function ws(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), Qo(e.return, t, n));
}
function co(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = l));
}
function sd(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    i = r.tail;
  if ((ve(e, t, r.children, n), (r = Y.current), (r & 2) !== 0))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null;) {
        if (e.tag === 13) e.memoizedState !== null && ws(e, n, t);
        else if (e.tag === 19) ws(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null;) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((U(Y, r), (t.mode & 1) === 0)) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        n = t.child;
        for (l = null; n !== null;)
          ((e = n.alternate),
            e !== null && ti(e) === null && (l = n),
            (n = n.sibling));
        ((n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          co(t, !1, l, n, i));
        break;
      case "backwards":
        ((n = null), (l = t.child));
        for (t.child = null; l !== null;) {
          if (((e = l.alternate), e !== null && ti(e) === null)) {
            t.child = l;
            break;
          }
          ((e = l.sibling), (l.sibling = n), (n = l), (l = e));
        }
        co(t, !0, n, null, i);
        break;
      case "together":
        co(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function $l(e, t) {
  (t.mode & 1) === 0 &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function at(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Gt |= t.lanes),
    (n & t.childLanes) === 0)
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(w(153));
  if (t.child !== null) {
    ((e = t.child), (n = Ct(e, e.pendingProps)), (t.child = n));
    for (n.return = t; e.sibling !== null;)
      ((e = e.sibling),
        (n = n.sibling = Ct(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function gm(e, t, n) {
  switch (t.tag) {
    case 3:
      (ud(t), _n());
      break;
    case 5:
      $c(t);
      break;
    case 1:
      ke(t.type) && Xl(t);
      break;
    case 4:
      Mu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      (U(ql, r._currentValue), (r._currentValue = l));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null)) {
        if (r.dehydrated !== null)
          return (U(Y, Y.current & 1), (t.flags |= 128), null);
        if ((n & t.child.childLanes) !== 0) return ad(e, t, n);
        return (
          U(Y, Y.current & 1),
          (e = at(e, t, n)),
          e !== null ? e.sibling : null
        );
      }
      U(Y, Y.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
        if (r) return sd(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        U(Y, Y.current),
        r)
      )
        break;
      else return null;
    case 22:
    case 23:
      return ((t.lanes = 0), id(e, t, n));
  }
  return at(e, t, n);
}
function nr(e, t) {
  if (!Q)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null;)
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null;)
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function de(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null;)
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling));
  else
    for (l = e.child; l !== null;)
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function hm(e, t, n) {
  var r = t.pendingProps;
  switch ((Eu(t), t.tag)) {
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
      return (de(t), null);
    case 1:
      return (ke(t.type) && Gl(), de(t), null);
    case 3:
      if (
        ((r = t.stateNode),
        Tn(),
        H(Ne),
        H(pe),
        Iu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        e === null || e.child === null)
      )
        Sl(t)
          ? (t.flags |= 4)
          : e === null ||
            (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
            ((t.flags |= 1024), Be !== null && (uu(Be), (Be = null)));
      return (jo(e, t), de(t), null);
    case 5:
      Fu(t);
      var l = Vt(Fr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (dd(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(w(166));
          return (de(t), null);
        }
        if (((e = Vt(qe.current)), Sl(t))) {
          ((r = t.stateNode), (n = t.type));
          var i = t.memoizedProps;
          switch (((r[Ze] = t), (r[br] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (V("cancel", r), V("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              V("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < dr.length; l++) V(dr[l], r);
              break;
            case "source":
              V("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (V("error", r), V("load", r));
              break;
            case "details":
              V("toggle", r);
              break;
            case "input":
              (La(r, i), V("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!i.multiple }),
                V("invalid", r));
              break;
            case "textarea":
              (Ma(r, i), V("invalid", r));
          }
          (zo(n, i), (l = null));
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var u = i[o];
              o === "children"
                ? typeof u === "string"
                  ? r.textContent !== u &&
                    (i.suppressHydrationWarning !== !0 &&
                      kl(r.textContent, u, e),
                    (l = ["children", u]))
                  : typeof u === "number" &&
                    r.textContent !== "" + u &&
                    (i.suppressHydrationWarning !== !0 &&
                      kl(r.textContent, u, e),
                    (l = ["children", "" + u]))
                : Nr.hasOwnProperty(o) &&
                  u != null &&
                  o === "onScroll" &&
                  V("scroll", r);
            }
          switch (n) {
            case "input":
              (ml(r), ba(r, i, !0));
              break;
            case "textarea":
              (ml(r), Fa(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick === "function" && (r.onclick = Yl);
          }
          ((r = l), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((o = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = As(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is === "string"
                  ? (e = o.createElement(n, { is: r.is }))
                  : ((e = o.createElement(n)),
                    n === "select" &&
                      ((o = e),
                      r.multiple
                        ? (o.multiple = !0)
                        : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[Ze] = t),
            (e[br] = r),
            cd(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((o = Eo(n, r)), n)) {
              case "dialog":
                (V("cancel", e), V("close", e), (l = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (V("load", e), (l = r));
                break;
              case "video":
              case "audio":
                for (l = 0; l < dr.length; l++) V(dr[l], e);
                l = r;
                break;
              case "source":
                (V("error", e), (l = r));
                break;
              case "img":
              case "image":
              case "link":
                (V("error", e), V("load", e), (l = r));
                break;
              case "details":
                (V("toggle", e), (l = r));
                break;
              case "input":
                (La(e, r), (l = xo(e, r)), V("invalid", e));
                break;
              case "option":
                l = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = X({}, r, { value: void 0 })),
                  V("invalid", e));
                break;
              case "textarea":
                (Ma(e, r), (l = ko(e, r)), V("invalid", e));
                break;
              default:
                l = r;
            }
            (zo(n, l), (u = l));
            for (i in u)
              if (u.hasOwnProperty(i)) {
                var s = u[i];
                i === "style"
                  ? Hs(e, s)
                  : i === "dangerouslySetInnerHTML"
                    ? ((s = s ? s.__html : void 0), s != null && Us(e, s))
                    : i === "children"
                      ? typeof s === "string"
                        ? (n !== "textarea" || s !== "") && kr(e, s)
                        : typeof s === "number" && kr(e, "" + s)
                      : i !== "suppressContentEditableWarning" &&
                        i !== "suppressHydrationWarning" &&
                        i !== "autoFocus" &&
                        (Nr.hasOwnProperty(i)
                          ? s != null && i === "onScroll" && V("scroll", e)
                          : s != null && cu(e, i, s, o));
              }
            switch (n) {
              case "input":
                (ml(e), ba(e, r, !1));
                break;
              case "textarea":
                (ml(e), Fa(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + _t(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? xn(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      xn(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof l.onClick === "function" && (e.onclick = Yl);
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
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (de(t), null);
    case 6:
      if (e && t.stateNode != null) fd(e, t, e.memoizedProps, r);
      else {
        if (typeof r !== "string" && t.stateNode === null) throw Error(w(166));
        if (((n = Vt(Fr.current)), Vt(qe.current), Sl(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Ze] = t),
            (i = r.nodeValue !== n))
          ) {
            if (((e = Ce), e !== null))
              switch (e.tag) {
                case 3:
                  kl(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    kl(r.nodeValue, n, (e.mode & 1) !== 0);
              }
          }
          i && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Ze] = t),
            (t.stateNode = r));
      }
      return (de(t), null);
    case 13:
      if (
        (H(Y),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Q && Ee !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
          (Lc(), _n(), (t.flags |= 98560), (i = !1));
        else if (((i = Sl(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(w(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(w(317));
            i[Ze] = t;
          } else
            (_n(),
              (t.flags & 128) === 0 && (t.memoizedState = null),
              (t.flags |= 4));
          (de(t), (i = !1));
        } else (Be !== null && (uu(Be), (Be = null)), (i = !0));
        if (!i) return t.flags & 65536 ? t : null;
      }
      if ((t.flags & 128) !== 0) return ((t.lanes = n), t);
      return (
        (r = r !== null),
        r !== (e !== null && e.memoizedState !== null) &&
          r &&
          ((t.child.flags |= 8192),
          (t.mode & 1) !== 0 &&
            (e === null || (Y.current & 1) !== 0
              ? te === 0 && (te = 3)
              : Ku())),
        t.updateQueue !== null && (t.flags |= 4),
        de(t),
        null
      );
    case 4:
      return (
        Tn(),
        jo(e, t),
        e === null && Tr(t.stateNode.containerInfo),
        de(t),
        null
      );
    case 10:
      return (Tu(t.type._context), de(t), null);
    case 17:
      return (ke(t.type) && Gl(), de(t), null);
    case 19:
      if ((H(Y), (i = t.memoizedState), i === null)) return (de(t), null);
      if (((r = (t.flags & 128) !== 0), (o = i.rendering), o === null))
        if (r) nr(i, !1);
        else {
          if (te !== 0 || (e !== null && (e.flags & 128) !== 0))
            for (e = t.child; e !== null;) {
              if (((o = ti(e)), o !== null)) {
                ((t.flags |= 128),
                  nr(i, !1),
                  (r = o.updateQueue),
                  r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                  (t.subtreeFlags = 0),
                  (r = n));
                for (n = t.child; n !== null;)
                  ((i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (o = i.alternate),
                    o === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = o.childLanes),
                        (i.lanes = o.lanes),
                        (i.child = o.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = o.memoizedProps),
                        (i.memoizedState = o.memoizedState),
                        (i.updateQueue = o.updateQueue),
                        (i.type = o.type),
                        (e = o.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (U(Y, (Y.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          i.tail !== null &&
            q() > bn &&
            ((t.flags |= 128), (r = !0), nr(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ti(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              nr(i, !0),
              i.tail === null && i.tailMode === "hidden" && !o.alternate && !Q)
            )
              return (de(t), null);
          } else
            2 * q() - i.renderingStartTime > bn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), nr(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = i.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (i.last = o));
      }
      if (i.tail !== null)
        return (
          (t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = q()),
          (t.sibling = null),
          (n = Y.current),
          U(Y, r ? (n & 1) | 2 : n & 1),
          t
        );
      return (de(t), null);
    case 22:
    case 23:
      return (
        Qu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && (t.mode & 1) !== 0
          ? (ze & 1073741824) !== 0 &&
            (de(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : de(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(w(156, t.tag));
}
function ym(e, t) {
  switch ((Eu(t), t.tag)) {
    case 1:
      return (
        ke(t.type) && Gl(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Tn(),
        H(Ne),
        H(pe),
        Iu(),
        (e = t.flags),
        (e & 65536) !== 0 && (e & 128) === 0
          ? ((t.flags = (e & -65537) | 128), t)
          : null
      );
    case 5:
      return (Fu(t), null);
    case 13:
      if ((H(Y), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(w(340));
        _n();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (H(Y), null);
    case 4:
      return (Tn(), null);
    case 10:
      return (Tu(t.type._context), null);
    case 22:
    case 23:
      return (Qu(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
function hn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n === "function")
      try {
        n(null);
      } catch (r) {
        Z(e, t, r);
      }
    else n.current = null;
}
function eu(e, t, n) {
  try {
    n();
  } catch (r) {
    Z(e, t, r);
  }
}
function wm(e, t) {
  if (((Do = Wl), (e = hc()), Su(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var { anchorOffset: l, focusNode: i } = r;
          r = r.focusOffset;
          try {
            (n.nodeType, i.nodeType);
          } catch (x) {
            n = null;
            break e;
          }
          var o = 0,
            u = -1,
            s = -1,
            p = 0,
            h = 0,
            y = e,
            g = null;
          t: for (;;) {
            for (var S; ;) {
              if (
                (y !== n || (l !== 0 && y.nodeType !== 3) || (u = o + l),
                y !== i || (r !== 0 && y.nodeType !== 3) || (s = o + r),
                y.nodeType === 3 && (o += y.nodeValue.length),
                (S = y.firstChild) === null)
              )
                break;
              ((g = y), (y = S));
            }
            for (;;) {
              if (y === e) break t;
              if (
                (g === n && ++p === l && (u = o),
                g === i && ++h === r && (s = o),
                (S = y.nextSibling) !== null)
              )
                break;
              ((y = g), (g = y.parentNode));
            }
            y = S;
          }
          n = u === -1 || s === -1 ? null : { start: u, end: s };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  ((Oo = { focusedElem: e, selectionRange: n }), (Wl = !1));
  for (E = t; E !== null;)
    if (((t = E), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (E = e));
    else
      for (; E !== null;) {
        t = E;
        try {
          var k = t.alternate;
          if ((t.flags & 1024) !== 0)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (k !== null) {
                  var { memoizedProps: z, memoizedState: M } = k,
                    m = t.stateNode,
                    d = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? z : De(t.type, z),
                      M,
                    );
                  m.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var v = t.stateNode.containerInfo;
                v.nodeType === 1
                  ? (v.textContent = "")
                  : v.nodeType === 9 &&
                    v.documentElement &&
                    v.removeChild(v.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(w(163));
            }
        } catch (x) {
          Z(t, t.return, x);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (E = e));
          break;
        }
        E = t.return;
      }
  return ((k = Ns), (Ns = !1), k);
}
function yr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        ((l.destroy = void 0), i !== void 0 && eu(t, n, i));
      }
      l = l.next;
    } while (l !== r);
  }
}
function hi(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function tu(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t === "function" ? t(e) : (t.current = e);
  }
}
function pd(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), pd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Ze], delete t[br], delete t[Uo], delete t[nm], delete t[rm])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function md(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ks(e) {
  e: for (;;) {
    for (; e.sibling === null;) {
      if (e.return === null || md(e.return)) return null;
      e = e.return;
    }
    e.sibling.return = e.return;
    for (e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
      if (e.flags & 2) continue e;
      if (e.child === null || e.tag === 4) continue e;
      else ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function nu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          (n !== null && n !== void 0) ||
            t.onclick !== null ||
            (t.onclick = Yl)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (nu(e, t, n), e = e.sibling; e !== null;)
      (nu(e, t, n), (e = e.sibling));
}
function ru(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ru(e, t, n), e = e.sibling; e !== null;)
      (ru(e, t, n), (e = e.sibling));
}
function ft(e, t, n) {
  for (n = n.child; n !== null;) (vd(e, t, n), (n = n.sibling));
}
function vd(e, t, n) {
  if (Je && typeof Je.onCommitFiberUnmount === "function")
    try {
      Je.onCommitFiberUnmount(si, n);
    } catch (u) {}
  switch (n.tag) {
    case 5:
      fe || hn(n, t);
    case 6:
      var r = ie,
        l = Oe;
      ((ie = null),
        ft(e, t, n),
        (ie = r),
        (Oe = l),
        ie !== null &&
          (Oe
            ? ((e = ie),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ie.removeChild(n.stateNode)));
      break;
    case 18:
      ie !== null &&
        (Oe
          ? ((e = ie),
            (n = n.stateNode),
            e.nodeType === 8
              ? ro(e.parentNode, n)
              : e.nodeType === 1 && ro(e, n),
            Cr(e))
          : ro(ie, n.stateNode));
      break;
    case 4:
      ((r = ie),
        (l = Oe),
        (ie = n.stateNode.containerInfo),
        (Oe = !0),
        ft(e, t, n),
        (ie = r),
        (Oe = l));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !fe &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var i = l,
            o = i.destroy;
          ((i = i.tag),
            o !== void 0 &&
              ((i & 2) !== 0 ? eu(n, t, o) : (i & 4) !== 0 && eu(n, t, o)),
            (l = l.next));
        } while (l !== r);
      }
      ft(e, t, n);
      break;
    case 1:
      if (
        !fe &&
        (hn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount === "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (u) {
          Z(n, t, u);
        }
      ft(e, t, n);
      break;
    case 21:
      ft(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((fe = (r = fe) || n.memoizedState !== null), ft(e, t, n), (fe = r))
        : ft(e, t, n);
      break;
    default:
      ft(e, t, n);
  }
}
function Ss(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new xm()),
      t.forEach(function (r) {
        var l = Tm.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      }));
  }
}
function Re(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e,
          o = t,
          u = o;
        e: for (; u !== null;) {
          switch (u.tag) {
            case 5:
              ((ie = u.stateNode), (Oe = !1));
              break e;
            case 3:
              ((ie = u.stateNode.containerInfo), (Oe = !0));
              break e;
            case 4:
              ((ie = u.stateNode.containerInfo), (Oe = !0));
              break e;
          }
          u = u.return;
        }
        if (ie === null) throw Error(w(160));
        (vd(i, o, l), (ie = null), (Oe = !1));
        var s = l.alternate;
        (s !== null && (s.return = null), (l.return = null));
      } catch (p) {
        Z(l, t, p);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null;) (gd(t, e), (t = t.sibling));
}
function gd(e, t) {
  var { alternate: n, flags: r } = e;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Re(t, e), Ge(e), r & 4)) {
        try {
          (yr(3, e, e.return), hi(3, e));
        } catch (z) {
          Z(e, e.return, z);
        }
        try {
          yr(5, e, e.return);
        } catch (z) {
          Z(e, e.return, z);
        }
      }
      break;
    case 1:
      (Re(t, e), Ge(e), r & 512 && n !== null && hn(n, n.return));
      break;
    case 5:
      if (
        (Re(t, e),
        Ge(e),
        r & 512 && n !== null && hn(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          kr(l, "");
        } catch (z) {
          Z(e, e.return, z);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var i = e.memoizedProps,
          o = n !== null ? n.memoizedProps : i,
          u = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            (u === "input" && i.type === "radio" && i.name != null && Os(l, i),
              Eo(u, o));
            var p = Eo(u, i);
            for (o = 0; o < s.length; o += 2) {
              var h = s[o],
                y = s[o + 1];
              h === "style"
                ? Hs(l, y)
                : h === "dangerouslySetInnerHTML"
                  ? Us(l, y)
                  : h === "children"
                    ? kr(l, y)
                    : cu(l, h, y, p);
            }
            switch (u) {
              case "input":
                wo(l, i);
                break;
              case "textarea":
                Bs(l, i);
                break;
              case "select":
                var g = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var S = i.value;
                S != null
                  ? xn(l, !!i.multiple, S, !1)
                  : g !== !!i.multiple &&
                    (i.defaultValue != null
                      ? xn(l, !!i.multiple, i.defaultValue, !0)
                      : xn(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[br] = i;
          } catch (z) {
            Z(e, e.return, z);
          }
      }
      break;
    case 6:
      if ((Re(t, e), Ge(e), r & 4)) {
        if (e.stateNode === null) throw Error(w(162));
        ((l = e.stateNode), (i = e.memoizedProps));
        try {
          l.nodeValue = i;
        } catch (z) {
          Z(e, e.return, z);
        }
      }
      break;
    case 3:
      if (
        (Re(t, e), Ge(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Cr(t.containerInfo);
        } catch (z) {
          Z(e, e.return, z);
        }
      break;
    case 4:
      (Re(t, e), Ge(e));
      break;
    case 13:
      (Re(t, e),
        Ge(e),
        (l = e.child),
        l.flags & 8192 &&
          ((i = l.memoizedState !== null),
          (l.stateNode.isHidden = i),
          !i ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Hu = q())),
        r & 4 && Ss(e));
      break;
    case 22:
      if (
        ((h = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((fe = (p = fe) || h), Re(t, e), (fe = p)) : Re(t, e),
        Ge(e),
        r & 8192)
      ) {
        if (
          ((p = e.memoizedState !== null),
          (e.stateNode.isHidden = p) && !h && (e.mode & 1) !== 0)
        )
          for (E = e, h = e.child; h !== null;) {
            for (y = E = h; E !== null;) {
              switch (((g = E), (S = g.child), g.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  yr(4, g, g.return);
                  break;
                case 1:
                  hn(g, g.return);
                  var k = g.stateNode;
                  if (typeof k.componentWillUnmount === "function") {
                    ((r = g), (n = g.return));
                    try {
                      ((t = r),
                        (k.props = t.memoizedProps),
                        (k.state = t.memoizedState),
                        k.componentWillUnmount());
                    } catch (z) {
                      Z(r, n, z);
                    }
                  }
                  break;
                case 5:
                  hn(g, g.return);
                  break;
                case 22:
                  if (g.memoizedState !== null) {
                    Es(y);
                    continue;
                  }
              }
              S !== null ? ((S.return = g), (E = S)) : Es(y);
            }
            h = h.sibling;
          }
        e: for (h = null, y = e; ;) {
          if (y.tag === 5) {
            if (h === null) {
              h = y;
              try {
                ((l = y.stateNode),
                  p
                    ? ((i = l.style),
                      typeof i.setProperty === "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((u = y.stateNode),
                      (s = y.memoizedProps.style),
                      (o =
                        s !== void 0 &&
                        s !== null &&
                        s.hasOwnProperty("display")
                          ? s.display
                          : null),
                      (u.style.display = Vs("display", o))));
              } catch (z) {
                Z(e, e.return, z);
              }
            }
          } else if (y.tag === 6) {
            if (h === null)
              try {
                y.stateNode.nodeValue = p ? "" : y.memoizedProps;
              } catch (z) {
                Z(e, e.return, z);
              }
          } else if (
            ((y.tag !== 22 && y.tag !== 23) ||
              y.memoizedState === null ||
              y === e) &&
            y.child !== null
          ) {
            ((y.child.return = y), (y = y.child));
            continue;
          }
          if (y === e) break e;
          for (; y.sibling === null;) {
            if (y.return === null || y.return === e) break e;
            (h === y && (h = null), (y = y.return));
          }
          (h === y && (h = null),
            (y.sibling.return = y.return),
            (y = y.sibling));
        }
      }
      break;
    case 19:
      (Re(t, e), Ge(e), r & 4 && Ss(e));
      break;
    case 21:
      break;
    default:
      (Re(t, e), Ge(e));
  }
}
function Ge(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null;) {
          if (md(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(w(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (kr(l, ""), (r.flags &= -33));
          var i = ks(e);
          ru(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            u = ks(e);
          nu(e, u, o);
          break;
        default:
          throw Error(w(161));
      }
    } catch (s) {
      Z(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Nm(e, t, n) {
  ((E = e), hd(e, t, n));
}
function hd(e, t, n) {
  for (var r = (e.mode & 1) !== 0; E !== null;) {
    var l = E,
      i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || Cl;
      if (!o) {
        var u = l.alternate,
          s = (u !== null && u.memoizedState !== null) || fe;
        u = Cl;
        var p = fe;
        if (((Cl = o), (fe = s) && !p))
          for (E = l; E !== null;)
            ((o = E),
              (s = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? Cs(l)
                : s !== null
                  ? ((s.return = o), (E = s))
                  : Cs(l));
        for (; i !== null;) ((E = i), hd(i, t, n), (i = i.sibling));
        ((E = l), (Cl = u), (fe = p));
      }
      zs(e, t, n);
    } else
      (l.subtreeFlags & 8772) !== 0 && i !== null
        ? ((i.return = l), (E = i))
        : zs(e, t, n);
  }
}
function zs(e) {
  for (; E !== null;) {
    var t = E;
    if ((t.flags & 8772) !== 0) {
      var n = t.alternate;
      try {
        if ((t.flags & 8772) !== 0)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              fe || hi(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !fe)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : De(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var i = t.updateQueue;
              i !== null && as(t, i, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                as(t, o, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && n.focus();
                    break;
                  case "img":
                    s.src && (n.src = s.src);
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
                var p = t.alternate;
                if (p !== null) {
                  var h = p.memoizedState;
                  if (h !== null) {
                    var y = h.dehydrated;
                    y !== null && Cr(y);
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
              throw Error(w(163));
          }
        fe || (t.flags & 512 && tu(t));
      } catch (g) {
        Z(t, t.return, g);
      }
    }
    if (t === e) {
      E = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (E = n));
      break;
    }
    E = t.return;
  }
}
function Es(e) {
  for (; E !== null;) {
    var t = E;
    if (t === e) {
      E = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (E = n));
      break;
    }
    E = t.return;
  }
}
function Cs(e) {
  for (; E !== null;) {
    var t = E;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            hi(4, t);
          } catch (s) {
            Z(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount === "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              Z(t, l, s);
            }
          }
          var i = t.return;
          try {
            tu(t);
          } catch (s) {
            Z(t, i, s);
          }
          break;
        case 5:
          var o = t.return;
          try {
            tu(t);
          } catch (s) {
            Z(t, o, s);
          }
      }
    } catch (s) {
      Z(t, t.return, s);
    }
    if (t === e) {
      E = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      ((u.return = t.return), (E = u));
      break;
    }
    E = t.return;
  }
}
function ge() {
  return (D & 6) !== 0 ? q() : Rl !== -1 ? Rl : (Rl = q());
}
function Et(e) {
  if ((e.mode & 1) === 0) return 1;
  if ((D & 2) !== 0 && oe !== 0) return oe & -oe;
  if (im.transition !== null) return (Dl === 0 && (Dl = tc()), Dl);
  if (((e = B), e !== 0)) return e;
  return ((e = window.event), (e = e === void 0 ? 16 : ac(e.type)), e);
}
function Ue(e, t, n, r) {
  if (50 < wr) throw ((wr = 0), (iu = null), Error(w(185)));
  if ((Or(e, n, r), (D & 2) === 0 || e !== le))
    (e === le && ((D & 2) === 0 && (yi |= n), te === 4 && gt(e, oe)),
      Se(e, r),
      n === 1 &&
        D === 0 &&
        (t.mode & 1) === 0 &&
        ((bn = q() + 500), mi && bt()));
}
function Se(e, t) {
  var n = e.callbackNode;
  u0(e, t);
  var r = Hl(e, e === le ? oe : 0);
  if (r === 0)
    (n !== null && Ra(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ra(n), t === 1))
      (e.tag === 0 ? lm(_s.bind(null, e)) : _c(_s.bind(null, e)),
        em(function () {
          (D & 6) === 0 && bt();
        }),
        (n = null));
    else {
      switch (nc(r)) {
        case 1:
          n = vu;
          break;
        case 4:
          n = js;
          break;
        case 16:
          n = Vl;
          break;
        case 536870912:
          n = ec;
          break;
        default:
          n = Vl;
      }
      n = Ed(n, yd.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function yd(e, t) {
  if (((Rl = -1), (Dl = 0), (D & 6) !== 0)) throw Error(w(327));
  var n = e.callbackNode;
  if (zn() && e.callbackNode !== n) return null;
  var r = Hl(e, e === le ? oe : 0);
  if (r === 0) return null;
  if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = ui(e, r);
  else {
    t = r;
    var l = D;
    D |= 2;
    var i = wd();
    if (le !== e || oe !== t) ((et = null), (bn = q() + 500), Ht(e, t));
    do
      try {
        Em();
        break;
      } catch (u) {
        xd(e, u);
      }
    while (1);
    (Pu(),
      (li.current = i),
      (D = l),
      j !== null ? (t = 0) : ((le = null), (oe = 0), (t = te)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = Lo(e)), l !== 0 && ((r = l), (t = ou(e, l)))), t === 1)
    )
      throw ((n = Dr), Ht(e, 0), gt(e, r), Se(e, q()), n);
    if (t === 6) gt(e, r);
    else {
      if (
        ((l = e.current.alternate),
        (r & 30) === 0 &&
          !Sm(l) &&
          ((t = ui(e, r)),
          t === 2 && ((i = Lo(e)), i !== 0 && ((r = i), (t = ou(e, i)))),
          t === 1))
      )
        throw ((n = Dr), Ht(e, 0), gt(e, r), Se(e, q()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(w(345));
        case 2:
          Bt(e, xe, et);
          break;
        case 3:
          if (
            (gt(e, r), (r & 130023424) === r && ((t = Hu + 500 - q()), 10 < t))
          ) {
            if (Hl(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              (ge(), (e.pingedLanes |= e.suspendedLanes & l));
              break;
            }
            e.timeoutHandle = Ao(Bt.bind(null, e, xe, et), t);
            break;
          }
          Bt(e, xe, et);
          break;
        case 4:
          if ((gt(e, r), (r & 4194240) === r)) break;
          t = e.eventTimes;
          for (l = -1; 0 < r;) {
            var o = 31 - Ae(r);
            ((i = 1 << o), (o = t[o]), o > l && (l = o), (r &= ~i));
          }
          if (
            ((r = l),
            (r = q() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3000 > r
                        ? 3000
                        : 4320 > r
                          ? 4320
                          : 1960 * km(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Ao(Bt.bind(null, e, xe, et), r);
            break;
          }
          Bt(e, xe, et);
          break;
        case 5:
          Bt(e, xe, et);
          break;
        default:
          throw Error(w(329));
      }
    }
  }
  return (Se(e, q()), e.callbackNode === n ? yd.bind(null, e) : null);
}
function ou(e, t) {
  var n = xr;
  return (
    e.current.memoizedState.isDehydrated && (Ht(e, t).flags |= 256),
    (e = ui(e, t)),
    e !== 2 && ((t = xe), (xe = n), t !== null && uu(t)),
    e
  );
}
function uu(e) {
  xe === null ? (xe = e) : xe.push.apply(xe, e);
}
function Sm(e) {
  for (var t = e; ;) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!Ve(i(), l)) return !1;
          } catch (o) {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function gt(e, t) {
  ((t &= ~Vu), (t &= ~yi), (e.suspendedLanes |= t), (e.pingedLanes &= ~t));
  for (e = e.expirationTimes; 0 < t;) {
    var n = 31 - Ae(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function _s(e) {
  if ((D & 6) !== 0) throw Error(w(327));
  zn();
  var t = Hl(e, 0);
  if ((t & 1) === 0) return (Se(e, q()), null);
  var n = ui(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Lo(e);
    r !== 0 && ((t = r), (n = ou(e, r)));
  }
  if (n === 1) throw ((n = Dr), Ht(e, 0), gt(e, t), Se(e, q()), n);
  if (n === 6) throw Error(w(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Bt(e, xe, et),
    Se(e, q()),
    null
  );
}
function Wu(e, t) {
  var n = D;
  D |= 1;
  try {
    return e(t);
  } finally {
    ((D = n), D === 0 && ((bn = q() + 500), mi && bt()));
  }
}
function Xt(e) {
  yt !== null && yt.tag === 0 && (D & 6) === 0 && zn();
  var t = D;
  D |= 1;
  var n = Me.transition,
    r = B;
  try {
    if (((Me.transition = null), (B = 1), e)) return e();
  } finally {
    ((B = r), (Me.transition = n), (D = t), (D & 6) === 0 && bt());
  }
}
function Qu() {
  ((ze = yn.current), H(yn));
}
function Ht(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), j0(n)), j !== null))
    for (n = j.return; n !== null;) {
      var r = n;
      switch ((Eu(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r !== null && r !== void 0 && Gl());
          break;
        case 3:
          (Tn(), H(Ne), H(pe), Iu());
          break;
        case 5:
          Fu(r);
          break;
        case 4:
          Tn();
          break;
        case 13:
          H(Y);
          break;
        case 19:
          H(Y);
          break;
        case 10:
          Tu(r.type._context);
          break;
        case 22:
        case 23:
          Qu();
      }
      n = n.return;
    }
  if (
    ((le = e),
    (j = e = Ct(e.current, null)),
    (oe = ze = t),
    (te = 0),
    (Dr = null),
    (Vu = yi = Gt = 0),
    (xe = xr = null),
    Ut !== null)
  ) {
    for (t = 0; t < Ut.length; t++)
      if (((n = Ut[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          i = n.pending;
        if (i !== null) {
          var o = i.next;
          ((i.next = l), (r.next = o));
        }
        n.pending = r;
      }
    Ut = null;
  }
  return e;
}
function xd(e, t) {
  do {
    var n = j;
    try {
      if ((Pu(), (Fl.current = ri), ni)) {
        for (var r = G.memoizedState; r !== null;) {
          var l = r.queue;
          (l !== null && (l.pending = null), (r = r.next));
        }
        ni = !1;
      }
      if (
        ((Yt = 0),
        (re = ee = G = null),
        (hr = !1),
        (Ir = 0),
        (Uu.current = null),
        n === null || n.return === null)
      ) {
        ((te = 1), (Dr = t), (j = null));
        break;
      }
      e: {
        var i = e,
          o = n.return,
          u = n,
          s = t;
        if (
          ((t = oe),
          (u.flags |= 32768),
          s !== null && typeof s === "object" && typeof s.then === "function")
        ) {
          var p = s,
            h = u,
            y = h.tag;
          if ((h.mode & 1) === 0 && (y === 0 || y === 11 || y === 15)) {
            var g = h.alternate;
            g
              ? ((h.updateQueue = g.updateQueue),
                (h.memoizedState = g.memoizedState),
                (h.lanes = g.lanes))
              : ((h.updateQueue = null), (h.memoizedState = null));
          }
          var S = ms(o);
          if (S !== null) {
            ((S.flags &= -257),
              vs(S, o, u, i, t),
              S.mode & 1 && ps(i, p, t),
              (t = S),
              (s = p));
            var k = t.updateQueue;
            if (k === null) {
              var z = new Set();
              (z.add(s), (t.updateQueue = z));
            } else k.add(s);
            break e;
          } else {
            if ((t & 1) === 0) {
              (ps(i, p, t), Ku());
              break e;
            }
            s = Error(w(426));
          }
        } else if (Q && u.mode & 1) {
          var M = ms(o);
          if (M !== null) {
            ((M.flags & 65536) === 0 && (M.flags |= 256),
              vs(M, o, u, i, t),
              Cu(Ln(s, u)));
            break e;
          }
        }
        ((i = s = Ln(s, u)),
          te !== 4 && (te = 2),
          xr === null ? (xr = [i]) : xr.push(i),
          (i = o));
        do {
          switch (i.tag) {
            case 3:
              ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
              var m = nd(i, s, t);
              us(i, m);
              break e;
            case 1:
              u = s;
              var { type: d, stateNode: v } = i;
              if (
                (i.flags & 128) === 0 &&
                (typeof d.getDerivedStateFromError === "function" ||
                  (v !== null &&
                    typeof v.componentDidCatch === "function" &&
                    (zt === null || !zt.has(v))))
              ) {
                ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
                var x = rd(i, u, t);
                us(i, x);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      kd(n);
    } catch (C) {
      ((t = C), j === n && n !== null && (j = n = n.return));
      continue;
    }
    break;
  } while (1);
}
function wd() {
  var e = li.current;
  return ((li.current = ri), e === null ? ri : e);
}
function Ku() {
  if (te === 0 || te === 3 || te === 2) te = 4;
  le === null ||
    ((Gt & 268435455) === 0 && (yi & 268435455) === 0) ||
    gt(le, oe);
}
function ui(e, t) {
  var n = D;
  D |= 2;
  var r = wd();
  if (le !== e || oe !== t) ((et = null), Ht(e, t));
  do
    try {
      zm();
      break;
    } catch (l) {
      xd(e, l);
    }
  while (1);
  if ((Pu(), (D = n), (li.current = r), j !== null)) throw Error(w(261));
  return ((le = null), (oe = 0), te);
}
function zm() {
  for (; j !== null;) Nd(j);
}
function Em() {
  for (; j !== null && !qp();) Nd(j);
}
function Nd(e) {
  var t = zd(e.alternate, e, ze);
  ((e.memoizedProps = e.pendingProps),
    t === null ? kd(e) : (j = t),
    (Uu.current = null));
}
function kd(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), (t.flags & 32768) === 0)) {
      if (((n = hm(n, t, ze)), n !== null)) {
        j = n;
        return;
      }
    } else {
      if (((n = ym(n, t)), n !== null)) {
        ((n.flags &= 32767), (j = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((te = 6), (j = null));
        return;
      }
    }
    if (((t = t.sibling), t !== null)) {
      j = t;
      return;
    }
    j = t = e;
  } while (t !== null);
  te === 0 && (te = 5);
}
function Bt(e, t, n) {
  var r = B,
    l = Me.transition;
  try {
    ((Me.transition = null), (B = 1), Cm(e, t, n, r));
  } finally {
    ((Me.transition = l), (B = r));
  }
  return null;
}
function Cm(e, t, n, r) {
  do zn();
  while (yt !== null);
  if ((D & 6) !== 0) throw Error(w(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(w(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var i = n.lanes | n.childLanes;
  if (
    (a0(e, i),
    e === le && ((j = le = null), (oe = 0)),
    ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
      _l ||
      ((_l = !0),
      Ed(Vl, function () {
        return (zn(), null);
      })),
    (i = (n.flags & 15990) !== 0),
    (n.subtreeFlags & 15990) !== 0 || i)
  ) {
    ((i = Me.transition), (Me.transition = null));
    var o = B;
    B = 1;
    var u = D;
    ((D |= 4),
      (Uu.current = null),
      wm(e, n),
      gd(n, e),
      G0(Oo),
      (Wl = !!Do),
      (Oo = Do = null),
      (e.current = n),
      Nm(n, e, l),
      jp(),
      (D = u),
      (B = o),
      (Me.transition = i));
  } else e.current = n;
  if (
    (_l && ((_l = !1), (yt = e), (oi = l)),
    (i = e.pendingLanes),
    i === 0 && (zt = null),
    n0(n.stateNode, r),
    Se(e, q()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest }));
  if (ii) throw ((ii = !1), (e = lu), (lu = null), e);
  return (
    (oi & 1) !== 0 && e.tag !== 0 && zn(),
    (i = e.pendingLanes),
    (i & 1) !== 0 ? (e === iu ? wr++ : ((wr = 0), (iu = e))) : (wr = 0),
    bt(),
    null
  );
}
function zn() {
  if (yt !== null) {
    var e = nc(oi),
      t = Me.transition,
      n = B;
    try {
      if (((Me.transition = null), (B = 16 > e ? 16 : e), yt === null))
        var r = !1;
      else {
        if (((e = yt), (yt = null), (oi = 0), (D & 6) !== 0))
          throw Error(w(331));
        var l = D;
        D |= 4;
        for (E = e.current; E !== null;) {
          var i = E,
            o = i.child;
          if ((E.flags & 16) !== 0) {
            var u = i.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var p = u[s];
                for (E = p; E !== null;) {
                  var h = E;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      yr(8, h, i);
                  }
                  var y = h.child;
                  if (y !== null) ((y.return = h), (E = y));
                  else
                    for (; E !== null;) {
                      h = E;
                      var { sibling: g, return: S } = h;
                      if ((pd(h), h === p)) {
                        E = null;
                        break;
                      }
                      if (g !== null) {
                        ((g.return = S), (E = g));
                        break;
                      }
                      E = S;
                    }
                }
              }
              var k = i.alternate;
              if (k !== null) {
                var z = k.child;
                if (z !== null) {
                  k.child = null;
                  do {
                    var M = z.sibling;
                    ((z.sibling = null), (z = M));
                  } while (z !== null);
                }
              }
              E = i;
            }
          }
          if ((i.subtreeFlags & 2064) !== 0 && o !== null)
            ((o.return = i), (E = o));
          else
            e: for (; E !== null;) {
              if (((i = E), (i.flags & 2048) !== 0))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    yr(9, i, i.return);
                }
              var m = i.sibling;
              if (m !== null) {
                ((m.return = i.return), (E = m));
                break e;
              }
              E = i.return;
            }
        }
        var d = e.current;
        for (E = d; E !== null;) {
          o = E;
          var v = o.child;
          if ((o.subtreeFlags & 2064) !== 0 && v !== null)
            ((v.return = o), (E = v));
          else
            e: for (o = d; E !== null;) {
              if (((u = E), (u.flags & 2048) !== 0))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      hi(9, u);
                  }
                } catch (C) {
                  Z(u, u.return, C);
                }
              if (u === o) {
                E = null;
                break e;
              }
              var x = u.sibling;
              if (x !== null) {
                ((x.return = u.return), (E = x));
                break e;
              }
              E = u.return;
            }
        }
        if (
          ((D = l), bt(), Je && typeof Je.onPostCommitFiberRoot === "function")
        )
          try {
            Je.onPostCommitFiberRoot(si, e);
          } catch (C) {}
        r = !0;
      }
      return r;
    } finally {
      ((B = n), (Me.transition = t));
    }
  }
  return !1;
}
function Ps(e, t, n) {
  ((t = Ln(n, t)),
    (t = nd(e, t, 1)),
    (e = St(e, t, 1)),
    (t = ge()),
    e !== null && (Or(e, 1, t), Se(e, t)));
}
function Z(e, t, n) {
  if (e.tag === 3) Ps(e, e, n);
  else
    for (; t !== null;) {
      if (t.tag === 3) {
        Ps(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError === "function" ||
          (typeof r.componentDidCatch === "function" &&
            (zt === null || !zt.has(r)))
        ) {
          ((e = Ln(n, e)),
            (e = rd(t, e, 1)),
            (t = St(t, e, 1)),
            (e = ge()),
            t !== null && (Or(t, 1, e), Se(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function _m(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = ge()),
    (e.pingedLanes |= e.suspendedLanes & n),
    le === e &&
      (oe & n) === n &&
      (te === 4 || (te === 3 && (oe & 130023424) === oe && 500 > q() - Hu)
        ? Ht(e, 0)
        : (Vu |= n)),
    Se(e, t));
}
function Sd(e, t) {
  t === 0 &&
    ((e.mode & 1) === 0
      ? (t = 1)
      : ((t = hl), (hl <<= 1), (hl & 130023424) === 0 && (hl = 4194304)));
  var n = ge();
  ((e = ut(e, t)), e !== null && (Or(e, t, n), Se(e, n)));
}
function Pm(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), Sd(e, n));
}
function Tm(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var { stateNode: r, memoizedState: l } = e;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(w(314));
  }
  (r !== null && r.delete(t), Sd(e, n));
}
function Ed(e, t) {
  return qs(e, t);
}
function Lm(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function be(e, t, n, r) {
  return new Lm(e, t, n, r);
}
function Yu(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function bm(e) {
  if (typeof e === "function") return Yu(e) ? 1 : 0;
  if (e !== void 0 && e !== null) {
    if (((e = e.$$typeof), e === fu)) return 11;
    if (e === pu) return 14;
  }
  return 2;
}
function Ct(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = be(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Ol(e, t, n, r, l, i) {
  var o = 2;
  if (((r = e), typeof e === "function")) Yu(e) && (o = 1);
  else if (typeof e === "string") o = 5;
  else
    e: switch (e) {
      case an:
        return Wt(n.children, l, i, t);
      case du:
        ((o = 8), (l |= 8));
        break;
      case vo:
        return (
          (e = be(12, n, t, l | 2)),
          (e.elementType = vo),
          (e.lanes = i),
          e
        );
      case go:
        return ((e = be(13, n, t, l)), (e.elementType = go), (e.lanes = i), e);
      case ho:
        return ((e = be(19, n, t, l)), (e.elementType = ho), (e.lanes = i), e);
      case $s:
        return xi(n, l, i, t);
      default:
        if (typeof e === "object" && e !== null)
          switch (e.$$typeof) {
            case Fs:
              o = 10;
              break e;
            case Is:
              o = 9;
              break e;
            case fu:
              o = 11;
              break e;
            case pu:
              o = 14;
              break e;
            case pt:
              ((o = 16), (r = null));
              break e;
          }
        throw Error(w(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = be(o, n, t, l)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = i),
    t
  );
}
function Wt(e, t, n, r) {
  return ((e = be(7, e, r, t)), (e.lanes = n), e);
}
function xi(e, t, n, r) {
  return (
    (e = be(22, e, r, t)),
    (e.elementType = $s),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function fo(e, t, n) {
  return ((e = be(6, e, null, t)), (e.lanes = n), e);
}
function po(e, t, n) {
  return (
    (t = be(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Mm(e, t, n, r, l) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Zi(0)),
    (this.expirationTimes = Zi(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Zi(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null));
}
function Gu(e, t, n, r, l, i, o, u, s) {
  return (
    (e = new Mm(e, t, n, u, s)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = be(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    bu(i),
    e
  );
}
function Fm(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: un,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Cd(e) {
  if (!e) return Pt;
  e = e._reactInternals;
  e: {
    if (Jt(e) !== e || e.tag !== 1) throw Error(w(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ke(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(w(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ke(n)) return Cc(e, n, t);
  }
  return t;
}
function _d(e, t, n, r, l, i, o, u, s) {
  return (
    (e = Gu(n, r, !0, e, l, i, o, u, s)),
    (e.context = Cd(null)),
    (n = e.current),
    (r = ge()),
    (l = Et(n)),
    (i = lt(r, l)),
    (i.callback = t !== void 0 && t !== null ? t : null),
    St(n, i, l),
    (e.current.lanes = l),
    Or(e, l, r),
    Se(e, r),
    e
  );
}
function wi(e, t, n, r) {
  var l = t.current,
    i = ge(),
    o = Et(l);
  return (
    (n = Cd(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = lt(i, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = St(l, t, o)),
    e !== null && (Ue(e, l, o, i), Ml(e, l, o)),
    o
  );
}
function ai(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ts(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Xu(e, t) {
  (Ts(e, t), (e = e.alternate) && Ts(e, t));
}
function Im() {
  return null;
}
function Zu(e) {
  this._internalRoot = e;
}
function Ni(e) {
  this._internalRoot = e;
}
function Ju(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ki(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Ls() {}
function $m(e, t, n, r, l) {
  if (l) {
    if (typeof r === "function") {
      var i = r;
      r = function () {
        var p = ai(o);
        i.call(p);
      };
    }
    var o = _d(t, r, e, 0, null, !1, !1, "", Ls);
    return (
      (e._reactRootContainer = o),
      (e[ot] = o.current),
      Tr(e.nodeType === 8 ? e.parentNode : e),
      Xt(),
      o
    );
  }
  for (; (l = e.lastChild);) e.removeChild(l);
  if (typeof r === "function") {
    var u = r;
    r = function () {
      var p = ai(s);
      u.call(p);
    };
  }
  var s = Gu(e, 0, !1, null, null, !1, !1, "", Ls);
  return (
    (e._reactRootContainer = s),
    (e[ot] = s.current),
    Tr(e.nodeType === 8 ? e.parentNode : e),
    Xt(function () {
      wi(t, s, n, r);
    }),
    s
  );
}
function Si(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l === "function") {
      var u = l;
      l = function () {
        var s = ai(o);
        u.call(s);
      };
    }
    wi(t, o, e, l);
  } else o = $m(n, t, e, l, r);
  return ai(o);
}
var bs,
  K,
  Ms,
  Nr,
  it,
  mo,
  Op,
  _a,
  Pa,
  ue,
  au,
  st,
  pl,
  un,
  an,
  du,
  vo,
  Fs,
  Is,
  fu,
  go,
  ho,
  pu,
  pt,
  $s,
  Ta,
  X,
  Ki,
  Yi = !1,
  ir,
  vl,
  Us,
  fr,
  Qp,
  Kp,
  Co = null,
  _o = null,
  wn = null,
  Nn = null,
  Xi = !1,
  Po = !1,
  Dt,
  pr = !1,
  Al = null,
  Ul = !1,
  To = null,
  Gp,
  qs,
  Ra,
  qp,
  jp,
  q,
  e0,
  vu,
  js,
  Vl,
  t0,
  ec,
  si = null,
  Je = null,
  Ae,
  r0,
  l0,
  gl = 64,
  hl = 4194304,
  B = 0,
  rc,
  hu,
  lc,
  ic,
  oc,
  bo = !1,
  yl,
  xt = null,
  wt = null,
  Nt = null,
  zr,
  Er,
  vt,
  s0,
  kn,
  Wl = !0,
  Ql = null,
  ht = null,
  xu = null,
  Tl = null,
  Mn,
  wu,
  Br,
  m0,
  Ji,
  qi,
  er,
  ci,
  Aa,
  v0,
  g0,
  h0,
  ji,
  y0,
  x0,
  w0,
  N0,
  k0,
  Ua,
  S0,
  z0,
  E0,
  _0,
  P0,
  T0,
  Va,
  L0,
  b0,
  M0,
  F0,
  I0,
  $0,
  R0,
  ku,
  mr = null,
  D0,
  cc,
  Ha,
  Wa = !1,
  sn = !1,
  A0,
  vr = null,
  _r = null,
  mc = !1,
  ur,
  ar,
  bl,
  Ve,
  X0,
  cn = null,
  Fo = null,
  gr = null,
  Io = !1,
  dn,
  eo,
  yc,
  xc,
  wc,
  Nc,
  kc,
  Sc,
  Za,
  cr,
  $o,
  Ro,
  sr,
  dr,
  Z0,
  Nl,
  J0,
  q0,
  Do = null,
  Oo = null,
  Ao,
  j0,
  es,
  em,
  Fn,
  Ze,
  br,
  ot,
  Uo,
  nm,
  rm,
  Vo,
  pn = -1,
  Pt,
  pe,
  Ne,
  Qt,
  tt = null,
  mi = !1,
  lo = !1,
  mn,
  vn = 0,
  Zl = null,
  Jl = 0,
  Te,
  Le = 0,
  Kt = null,
  nt = 1,
  rt = "",
  Ce = null,
  Ee = null,
  Q = !1,
  Be = null,
  im,
  Pn,
  Mc,
  ql,
  jl = null,
  gn = null,
  _u = null,
  Ut = null,
  mt = !1,
  Ur,
  qe,
  Mr,
  Fr,
  Y,
  io,
  Fl,
  oo,
  Yt = 0,
  G = null,
  ee = null,
  re = null,
  ni = !1,
  hr = !1,
  Ir = 0,
  om = 0,
  ri,
  cm,
  dm,
  fm,
  gi,
  pm,
  mm,
  we = !1,
  Jo,
  cd,
  jo,
  dd,
  fd,
  Cl = !1,
  fe = !1,
  xm,
  E = null,
  Ns = !1,
  ie = null,
  Oe = !1,
  km,
  li,
  Uu,
  Me,
  D = 0,
  le = null,
  j = null,
  oe = 0,
  ze = 0,
  yn,
  te = 0,
  Dr = null,
  Gt = 0,
  yi = 0,
  Vu = 0,
  xr = null,
  xe = null,
  Hu = 0,
  bn = 1 / 0,
  et = null,
  ii = !1,
  lu = null,
  zt = null,
  _l = !1,
  yt = null,
  oi = 0,
  wr = 0,
  iu = null,
  Rl = -1,
  Dl = 0,
  zd,
  Pd,
  Rm,
  rr,
  Dm,
  on,
  Td,
  Ld = function (e, t) {
    var n =
      2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Ju(t)) throw Error(w(200));
    return Fm(e, t, null, n);
  },
  bd = function (e, t) {
    if (!Ju(e)) throw Error(w(299));
    var n = !1,
      r = "",
      l = Pd;
    return (
      t !== null &&
        t !== void 0 &&
        (t.unstable_strictMode === !0 && (n = !0),
        t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
        t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
      (t = Gu(e, 1, !1, null, null, n, !1, r, l)),
      (e[ot] = t.current),
      Tr(e.nodeType === 8 ? e.parentNode : e),
      new Zu(t)
    );
  },
  Md = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0) {
      if (typeof e.render === "function") throw Error(w(188));
      throw ((e = Object.keys(e).join(",")), Error(w(268, e)));
    }
    return ((e = Zs(t)), (e = e === null ? null : e.stateNode), e);
  },
  Fd = function (e) {
    return Xt(e);
  },
  Id = function (e, t, n) {
    if (!ki(t)) throw Error(w(200));
    return Si(null, e, t, !0, n);
  },
  $d = function (e, t, n) {
    if (!Ju(e)) throw Error(w(405));
    var r = (n != null && n.hydratedSources) || null,
      l = !1,
      i = "",
      o = Pd;
    if (
      (n !== null &&
        n !== void 0 &&
        (n.unstable_strictMode === !0 && (l = !0),
        n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
        n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
      (t = _d(t, null, e, 1, n != null ? n : null, l, !1, i, o)),
      (e[ot] = t.current),
      Tr(e),
      r)
    )
      for (e = 0; e < r.length; e++)
        ((n = r[e]),
          (l = n._getVersion),
          (l = l(n._source)),
          t.mutableSourceEagerHydrationData == null
            ? (t.mutableSourceEagerHydrationData = [n, l])
            : t.mutableSourceEagerHydrationData.push(n, l));
    return new Ni(t);
  },
  Rd = function (e, t, n) {
    if (!ki(t)) throw Error(w(200));
    return Si(null, e, t, !1, n);
  },
  Dd = function (e) {
    if (!ki(e)) throw Error(w(40));
    return e._reactRootContainer
      ? (Xt(function () {
          Si(null, null, e, !1, function () {
            ((e._reactRootContainer = null), (e[ot] = null));
          });
        }),
        !0)
      : !1;
  },
  Od,
  Bd = function (e, t, n, r) {
    if (!ki(n)) throw Error(w(200));
    if (e == null || e._reactInternals === void 0) throw Error(w(38));
    return Si(e, t, n, !1, r);
  },
  Ad = "18.3.1-next-f1338f8080-20240426";
var Ud = xf(() => {
  ((bs = je($t(), 1)), (K = je(Ca(), 1)));
  ((Ms = new Set()), (Nr = {}));
  ((it = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  )),
    (mo = Object.prototype.hasOwnProperty),
    (Op =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/),
    (_a = {}),
    (Pa = {}));
  ue = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      ue[e] = new he(e, 0, !1, e, null, !1, !1);
    });
  [
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
  ].forEach(function (e) {
    var t = e[0];
    ue[t] = new he(t, 1, !1, e[1], null, !1, !1);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    ue[e] = new he(e, 2, !1, e.toLowerCase(), null, !1, !1);
  });
  [
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
  ].forEach(function (e) {
    ue[e] = new he(e, 2, !1, e, null, !1, !1);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
      ue[e] = new he(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
  ["checked", "multiple", "muted", "selected"].forEach(function (e) {
    ue[e] = new he(e, 3, !0, e, null, !1, !1);
  });
  ["capture", "download"].forEach(function (e) {
    ue[e] = new he(e, 4, !1, e, null, !1, !1);
  });
  ["cols", "rows", "size", "span"].forEach(function (e) {
    ue[e] = new he(e, 6, !1, e, null, !1, !1);
  });
  ["rowSpan", "start"].forEach(function (e) {
    ue[e] = new he(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  au = /[\-:]([a-z])/g;
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(au, su);
      ue[t] = new he(t, 1, !1, e, null, !1, !1);
    });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(au, su);
      ue[t] = new he(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
  ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(au, su);
    ue[t] = new he(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  });
  ["tabIndex", "crossOrigin"].forEach(function (e) {
    ue[e] = new he(e, 1, !1, e.toLowerCase(), null, !1, !1);
  });
  ue.xlinkHref = new he(
    "xlinkHref",
    1,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1,
  );
  ["src", "href", "action", "formAction"].forEach(function (e) {
    ue[e] = new he(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  ((st = bs.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED),
    (pl = Symbol.for("react.element")),
    (un = Symbol.for("react.portal")),
    (an = Symbol.for("react.fragment")),
    (du = Symbol.for("react.strict_mode")),
    (vo = Symbol.for("react.profiler")),
    (Fs = Symbol.for("react.provider")),
    (Is = Symbol.for("react.context")),
    (fu = Symbol.for("react.forward_ref")),
    (go = Symbol.for("react.suspense")),
    (ho = Symbol.for("react.suspense_list")),
    (pu = Symbol.for("react.memo")),
    (pt = Symbol.for("react.lazy")),
    ($s = Symbol.for("react.offscreen")),
    (Ta = Symbol.iterator));
  X = Object.assign;
  ir = Array.isArray;
  Us = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      ((vl = vl || document.createElement("div")),
        (vl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>"));
      for (t = vl.firstChild; e.firstChild;) e.removeChild(e.firstChild);
      for (; t.firstChild;) e.appendChild(t.firstChild);
    }
  });
  ((fr = {
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
    strokeWidth: !0,
  }),
    (Qp = ["Webkit", "ms", "Moz", "O"]));
  Object.keys(fr).forEach(function (e) {
    Qp.forEach(function (t) {
      ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (fr[t] = fr[e]));
    });
  });
  Kp = X(
    { menuitem: !0 },
    {
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
      wbr: !0,
    },
  );
  if (it)
    try {
      ((Dt = {}),
        Object.defineProperty(Dt, "passive", {
          get: function () {
            Po = !0;
          },
        }),
        window.addEventListener("test", Dt, Dt),
        window.removeEventListener("test", Dt, Dt));
    } catch (e) {
      Po = !1;
    }
  Gp = {
    onError: function (e) {
      ((pr = !0), (Al = e));
    },
  };
  ((qs = K.unstable_scheduleCallback),
    (Ra = K.unstable_cancelCallback),
    (qp = K.unstable_shouldYield),
    (jp = K.unstable_requestPaint),
    (q = K.unstable_now),
    (e0 = K.unstable_getCurrentPriorityLevel),
    (vu = K.unstable_ImmediatePriority),
    (js = K.unstable_UserBlockingPriority),
    (Vl = K.unstable_NormalPriority),
    (t0 = K.unstable_LowPriority),
    (ec = K.unstable_IdlePriority));
  ((Ae = Math.clz32 ? Math.clz32 : i0), (r0 = Math.log), (l0 = Math.LN2));
  ((yl = []),
    (zr = new Map()),
    (Er = new Map()),
    (vt = []),
    (s0 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      )));
  kn = st.ReactCurrentBatchConfig;
  ((Mn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  }),
    (wu = _e(Mn)),
    (Br = X({}, Mn, { view: 0, detail: 0 })),
    (m0 = _e(Br)),
    (ci = X({}, Br, {
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
      getModifierState: Nu,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        if ("movementX" in e) return e.movementX;
        return (
          e !== er &&
            (er && e.type === "mousemove"
              ? ((Ji = e.screenX - er.screenX), (qi = e.screenY - er.screenY))
              : (qi = Ji = 0),
            (er = e)),
          Ji
        );
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : qi;
      },
    })),
    (Aa = _e(ci)),
    (v0 = X({}, ci, { dataTransfer: 0 })),
    (g0 = _e(v0)),
    (h0 = X({}, Br, { relatedTarget: 0 })),
    (ji = _e(h0)),
    (y0 = X({}, Mn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
    (x0 = _e(y0)),
    (w0 = X({}, Mn, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    })),
    (N0 = _e(w0)),
    (k0 = X({}, Mn, { data: 0 })),
    (Ua = _e(k0)),
    (S0 = {
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
      MozPrintableKey: "Unidentified",
    }),
    (z0 = {
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
      224: "Meta",
    }),
    (E0 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    }));
  ((_0 = X({}, Br, {
    key: function (e) {
      if (e.key) {
        var t = S0[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Ll(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? z0[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Nu,
    charCode: function (e) {
      return e.type === "keypress" ? Ll(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Ll(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  })),
    (P0 = _e(_0)),
    (T0 = X({}, ci, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    })),
    (Va = _e(T0)),
    (L0 = X({}, Br, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Nu,
    })),
    (b0 = _e(L0)),
    (M0 = X({}, Mn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
    (F0 = _e(M0)),
    (I0 = X({}, ci, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    })),
    ($0 = _e(I0)),
    (R0 = [9, 13, 27, 32]),
    (ku = it && "CompositionEvent" in window));
  it && "documentMode" in document && (mr = document.documentMode);
  ((D0 = it && "TextEvent" in window && !mr),
    (cc = it && (!ku || (mr && 8 < mr && 11 >= mr))),
    (Ha = String.fromCharCode(32)));
  A0 = {
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
    week: !0,
  };
  if (it) {
    if (it) {
      if (((ar = "oninput" in document), !ar))
        ((bl = document.createElement("div")),
          bl.setAttribute("oninput", "return;"),
          (ar = typeof bl.oninput === "function"));
      ur = ar;
    } else ur = !1;
    mc = ur && (!document.documentMode || 9 < document.documentMode);
  }
  Ve = typeof Object.is === "function" ? Object.is : Y0;
  X0 = it && "documentMode" in document && 11 >= document.documentMode;
  ((dn = {
    animationend: wl("Animation", "AnimationEnd"),
    animationiteration: wl("Animation", "AnimationIteration"),
    animationstart: wl("Animation", "AnimationStart"),
    transitionend: wl("Transition", "TransitionEnd"),
  }),
    (eo = {}),
    (yc = {}));
  it &&
    ((yc = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete dn.animationend.animation,
      delete dn.animationiteration.animation,
      delete dn.animationstart.animation),
    "TransitionEvent" in window || delete dn.transitionend.transition);
  ((xc = fi("animationend")),
    (wc = fi("animationiteration")),
    (Nc = fi("animationstart")),
    (kc = fi("transitionend")),
    (Sc = new Map()),
    (Za =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      )));
  for (sr = 0; sr < Za.length; sr++)
    ((cr = Za[sr]),
      ($o = cr.toLowerCase()),
      (Ro = cr[0].toUpperCase() + cr.slice(1)),
      Tt($o, "on" + Ro));
  Tt(xc, "onAnimationEnd");
  Tt(wc, "onAnimationIteration");
  Tt(Nc, "onAnimationStart");
  Tt("dblclick", "onDoubleClick");
  Tt("focusin", "onFocus");
  Tt("focusout", "onBlur");
  Tt(kc, "onTransitionEnd");
  En("onMouseEnter", ["mouseout", "mouseover"]);
  En("onMouseLeave", ["mouseout", "mouseover"]);
  En("onPointerEnter", ["pointerout", "pointerover"]);
  En("onPointerLeave", ["pointerout", "pointerover"]);
  Zt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(
      " ",
    ),
  );
  Zt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " ",
    ),
  );
  Zt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  Zt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" "),
  );
  Zt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" "),
  );
  Zt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
  );
  ((dr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    )),
    (Z0 = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(dr),
    )));
  Nl = "_reactListening" + Math.random().toString(36).slice(2);
  ((J0 = /\r\n?/g), (q0 = /\u0000|\uFFFD/g));
  ((Ao = typeof setTimeout === "function" ? setTimeout : void 0),
    (j0 = typeof clearTimeout === "function" ? clearTimeout : void 0),
    (es = typeof Promise === "function" ? Promise : void 0),
    (em =
      typeof queueMicrotask === "function"
        ? queueMicrotask
        : typeof es < "u"
          ? function (e) {
              return es.resolve(null).then(e).catch(tm);
            }
          : Ao));
  ((Fn = Math.random().toString(36).slice(2)),
    (Ze = "__reactFiber$" + Fn),
    (br = "__reactProps$" + Fn),
    (ot = "__reactContainer$" + Fn),
    (Uo = "__reactEvents$" + Fn),
    (nm = "__reactListeners$" + Fn),
    (rm = "__reactHandles$" + Fn));
  Vo = [];
  ((Pt = {}), (pe = Lt(Pt)), (Ne = Lt(!1)), (Qt = Pt));
  ((mn = []), (Te = []));
  im = st.ReactCurrentBatchConfig;
  ((Pn = bc(!0)), (Mc = bc(!1)), (ql = Lt(null)));
  ((Ur = {}), (qe = Lt(Ur)), (Mr = Lt(Ur)), (Fr = Lt(Ur)));
  Y = Lt(0);
  io = [];
  ((Fl = st.ReactCurrentDispatcher), (oo = st.ReactCurrentBatchConfig));
  ((ri = {
    readContext: Fe,
    useCallback: ce,
    useContext: ce,
    useEffect: ce,
    useImperativeHandle: ce,
    useInsertionEffect: ce,
    useLayoutEffect: ce,
    useMemo: ce,
    useReducer: ce,
    useRef: ce,
    useState: ce,
    useDebugValue: ce,
    useDeferredValue: ce,
    useTransition: ce,
    useMutableSource: ce,
    useSyncExternalStore: ce,
    useId: ce,
    unstable_isNewReconciler: !1,
  }),
    (cm = {
      readContext: Fe,
      useCallback: function (e, t) {
        return ((Xe().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Fe,
      useEffect: cs,
      useImperativeHandle: function (e, t, n) {
        return (
          (n = n !== null && n !== void 0 ? n.concat([e]) : null),
          Il(4194308, 4, Kc.bind(null, t, e), n)
        );
      },
      useLayoutEffect: function (e, t) {
        return Il(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return Il(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = Xe();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (n.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, n) {
        var r = Xe();
        return (
          (t = n !== void 0 ? n(t) : t),
          (r.memoizedState = r.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (r.queue = e),
          (e = e.dispatch = am.bind(null, G, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Xe();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: ss,
      useDebugValue: Bu,
      useDeferredValue: function (e) {
        return (Xe().memoizedState = e);
      },
      useTransition: function () {
        var e = ss(!1),
          t = e[0];
        return ((e = um.bind(null, e[1])), (Xe().memoizedState = e), [t, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = G,
          l = Xe();
        if (Q) {
          if (n === void 0) throw Error(w(407));
          n = n();
        } else {
          if (((n = t()), le === null)) throw Error(w(349));
          (Yt & 30) !== 0 || Oc(r, t, n);
        }
        l.memoizedState = n;
        var i = { value: n, getSnapshot: t };
        return (
          (l.queue = i),
          cs(Ac.bind(null, r, i, e), [e]),
          (r.flags |= 2048),
          Rr(9, Bc.bind(null, r, i, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = Xe(),
          t = le.identifierPrefix;
        if (Q) {
          var n = rt,
            r = nt;
          ((n = (r & ~(1 << (32 - Ae(r) - 1))).toString(32) + n),
            (t = ":" + t + "R" + n),
            (n = Ir++),
            0 < n && (t += "H" + n.toString(32)),
            (t += ":"));
        } else ((n = om++), (t = ":" + t + "r" + n.toString(32) + ":"));
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    }),
    (dm = {
      readContext: Fe,
      useCallback: Gc,
      useContext: Fe,
      useEffect: Ou,
      useImperativeHandle: Yc,
      useInsertionEffect: Wc,
      useLayoutEffect: Qc,
      useMemo: Xc,
      useReducer: uo,
      useRef: Hc,
      useState: function () {
        return uo($r);
      },
      useDebugValue: Bu,
      useDeferredValue: function (e) {
        var t = Ie();
        return Zc(t, ee.memoizedState, e);
      },
      useTransition: function () {
        var e = uo($r)[0],
          t = Ie().memoizedState;
        return [e, t];
      },
      useMutableSource: Rc,
      useSyncExternalStore: Dc,
      useId: Jc,
      unstable_isNewReconciler: !1,
    }),
    (fm = {
      readContext: Fe,
      useCallback: Gc,
      useContext: Fe,
      useEffect: Ou,
      useImperativeHandle: Yc,
      useInsertionEffect: Wc,
      useLayoutEffect: Qc,
      useMemo: Xc,
      useReducer: ao,
      useRef: Hc,
      useState: function () {
        return ao($r);
      },
      useDebugValue: Bu,
      useDeferredValue: function (e) {
        var t = Ie();
        return ee === null ? (t.memoizedState = e) : Zc(t, ee.memoizedState, e);
      },
      useTransition: function () {
        var e = ao($r)[0],
          t = Ie().memoizedState;
        return [e, t];
      },
      useMutableSource: Rc,
      useSyncExternalStore: Dc,
      useId: Jc,
      unstable_isNewReconciler: !1,
    }));
  gi = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? Jt(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = ge(),
        l = Et(e),
        i = lt(r, l);
      ((i.payload = t),
        n !== void 0 && n !== null && (i.callback = n),
        (t = St(e, i, l)),
        t !== null && (Ue(t, e, l, r), Ml(t, e, l)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = ge(),
        l = Et(e),
        i = lt(r, l);
      ((i.tag = 1),
        (i.payload = t),
        n !== void 0 && n !== null && (i.callback = n),
        (t = St(e, i, l)),
        t !== null && (Ue(t, e, l, r), Ml(t, e, l)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = ge(),
        r = Et(e),
        l = lt(n, r);
      ((l.tag = 2),
        t !== void 0 && t !== null && (l.callback = t),
        (t = St(e, l, r)),
        t !== null && (Ue(t, e, r, n), Ml(t, e, r)));
    },
  };
  pm = typeof WeakMap === "function" ? WeakMap : Map;
  mm = st.ReactCurrentOwner;
  Jo = { dehydrated: null, treeContext: null, retryLane: 0 };
  cd = function (e, t) {
    for (var n = t.child; n !== null;) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null;) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
  };
  jo = function () {};
  dd = function (e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
      ((e = t.stateNode), Vt(qe.current));
      var i = null;
      switch (n) {
        case "input":
          ((l = xo(e, l)), (r = xo(e, r)), (i = []));
          break;
        case "select":
          ((l = X({}, l, { value: void 0 })),
            (r = X({}, r, { value: void 0 })),
            (i = []));
          break;
        case "textarea":
          ((l = ko(e, l)), (r = ko(e, r)), (i = []));
          break;
        default:
          typeof l.onClick !== "function" &&
            typeof r.onClick === "function" &&
            (e.onclick = Yl);
      }
      zo(n, r);
      var o;
      n = null;
      for (p in l)
        if (!r.hasOwnProperty(p) && l.hasOwnProperty(p) && l[p] != null)
          if (p === "style") {
            var u = l[p];
            for (o in u) u.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
          } else
            p !== "dangerouslySetInnerHTML" &&
              p !== "children" &&
              p !== "suppressContentEditableWarning" &&
              p !== "suppressHydrationWarning" &&
              p !== "autoFocus" &&
              (Nr.hasOwnProperty(p)
                ? i || (i = [])
                : (i = i || []).push(p, null));
      for (p in r) {
        var s = r[p];
        if (
          ((u = l != null ? l[p] : void 0),
          r.hasOwnProperty(p) && s !== u && (s != null || u != null))
        )
          if (p === "style")
            if (u) {
              for (o in u)
                !u.hasOwnProperty(o) ||
                  (s && s.hasOwnProperty(o)) ||
                  (n || (n = {}), (n[o] = ""));
              for (o in s)
                s.hasOwnProperty(o) &&
                  u[o] !== s[o] &&
                  (n || (n = {}), (n[o] = s[o]));
            } else (n || (i || (i = []), i.push(p, n)), (n = s));
          else
            p === "dangerouslySetInnerHTML"
              ? ((s = s ? s.__html : void 0),
                (u = u ? u.__html : void 0),
                s != null && u !== s && (i = i || []).push(p, s))
              : p === "children"
                ? (typeof s !== "string" && typeof s !== "number") ||
                  (i = i || []).push(p, "" + s)
                : p !== "suppressContentEditableWarning" &&
                  p !== "suppressHydrationWarning" &&
                  (Nr.hasOwnProperty(p)
                    ? (s != null && p === "onScroll" && V("scroll", e),
                      i || u === s || (i = []))
                    : (i = i || []).push(p, s));
      }
      n && (i = i || []).push("style", n);
      var p = i;
      if ((t.updateQueue = p)) t.flags |= 4;
    }
  };
  fd = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  xm = typeof WeakSet === "function" ? WeakSet : Set;
  ((km = Math.ceil),
    (li = st.ReactCurrentDispatcher),
    (Uu = st.ReactCurrentOwner),
    (Me = st.ReactCurrentBatchConfig),
    (yn = Lt(0)));
  zd = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || Ne.current) we = !0;
      else {
        if ((e.lanes & n) === 0 && (t.flags & 128) === 0)
          return ((we = !1), gm(e, t, n));
        we = (e.flags & 131072) !== 0 ? !0 : !1;
      }
    else ((we = !1), Q && (t.flags & 1048576) !== 0 && Pc(t, Jl, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        ($l(e, t), (e = t.pendingProps));
        var l = Cn(t, pe.current);
        (Sn(t, n), (l = Ru(null, t, r, e, l, n)));
        var i = Du();
        return (
          (t.flags |= 1),
          typeof l === "object" &&
          l !== null &&
          typeof l.render === "function" &&
          l.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              ke(r) ? ((i = !0), Xl(t)) : (i = !1),
              (t.memoizedState =
                l.state !== null && l.state !== void 0 ? l.state : null),
              bu(t),
              (l.updater = gi),
              (t.stateNode = l),
              (l._reactInternals = t),
              Yo(t, r, e, n),
              (t = Zo(null, t, r, !0, i, n)))
            : ((t.tag = 0), Q && i && zu(t), ve(null, t, l, n), (t = t.child)),
          t
        );
      case 16:
        r = t.elementType;
        e: {
          switch (
            ($l(e, t),
            (e = t.pendingProps),
            (l = r._init),
            (r = l(r._payload)),
            (t.type = r),
            (l = t.tag = bm(r)),
            (e = De(r, e)),
            l)
          ) {
            case 0:
              t = Xo(null, t, r, e, n);
              break e;
            case 1:
              t = ys(null, t, r, e, n);
              break e;
            case 11:
              t = gs(null, t, r, e, n);
              break e;
            case 14:
              t = hs(null, t, r, De(r.type, e), n);
              break e;
          }
          throw Error(w(306, r, ""));
        }
        return t;
      case 0:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : De(r, l)),
          Xo(e, t, r, l, n)
        );
      case 1:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : De(r, l)),
          ys(e, t, r, l, n)
        );
      case 3:
        e: {
          if ((ud(t), e === null)) throw Error(w(387));
          ((r = t.pendingProps),
            (i = t.memoizedState),
            (l = i.element),
            Ic(e, t),
            ei(t, r, null, n));
          var o = t.memoizedState;
          if (((r = o.element), i.isDehydrated))
            if (
              ((i = {
                element: r,
                isDehydrated: !1,
                cache: o.cache,
                pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                transitions: o.transitions,
              }),
              (t.updateQueue.baseState = i),
              (t.memoizedState = i),
              t.flags & 256)
            ) {
              ((l = Ln(Error(w(423)), t)), (t = xs(e, t, r, n, l)));
              break e;
            } else if (r !== l) {
              ((l = Ln(Error(w(424)), t)), (t = xs(e, t, r, n, l)));
              break e;
            } else
              for (
                Ee = kt(t.stateNode.containerInfo.firstChild),
                  Ce = t,
                  Q = !0,
                  Be = null,
                  n = Mc(t, null, r, n),
                  t.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if ((_n(), r === l)) {
              t = at(e, t, n);
              break e;
            }
            ve(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          $c(t),
          e === null && Wo(t),
          (r = t.type),
          (l = t.pendingProps),
          (i = e !== null ? e.memoizedProps : null),
          (o = l.children),
          Bo(r, l) ? (o = null) : i !== null && Bo(r, i) && (t.flags |= 32),
          od(e, t),
          ve(e, t, o, n),
          t.child
        );
      case 6:
        return (e === null && Wo(t), null);
      case 13:
        return ad(e, t, n);
      case 4:
        return (
          Mu(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = Pn(t, null, r, n)) : ve(e, t, r, n),
          t.child
        );
      case 11:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : De(r, l)),
          gs(e, t, r, l, n)
        );
      case 7:
        return (ve(e, t, t.pendingProps, n), t.child);
      case 8:
        return (ve(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (ve(e, t, t.pendingProps.children, n), t.child);
      case 10:
        e: {
          if (
            ((r = t.type._context),
            (l = t.pendingProps),
            (i = t.memoizedProps),
            (o = l.value),
            U(ql, r._currentValue),
            (r._currentValue = o),
            i !== null)
          )
            if (Ve(i.value, o)) {
              if (i.children === l.children && !Ne.current) {
                t = at(e, t, n);
                break e;
              }
            } else
              for (i = t.child, i !== null && (i.return = t); i !== null;) {
                var u = i.dependencies;
                if (u !== null) {
                  o = i.child;
                  for (var s = u.firstContext; s !== null;) {
                    if (s.context === r) {
                      if (i.tag === 1) {
                        ((s = lt(-1, n & -n)), (s.tag = 2));
                        var p = i.updateQueue;
                        if (p !== null) {
                          p = p.shared;
                          var h = p.pending;
                          (h === null
                            ? (s.next = s)
                            : ((s.next = h.next), (h.next = s)),
                            (p.pending = s));
                        }
                      }
                      ((i.lanes |= n),
                        (s = i.alternate),
                        s !== null && (s.lanes |= n),
                        Qo(i.return, n, t),
                        (u.lanes |= n));
                      break;
                    }
                    s = s.next;
                  }
                } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
                else if (i.tag === 18) {
                  if (((o = i.return), o === null)) throw Error(w(341));
                  ((o.lanes |= n),
                    (u = o.alternate),
                    u !== null && (u.lanes |= n),
                    Qo(o, n, t),
                    (o = i.sibling));
                } else o = i.child;
                if (o !== null) o.return = i;
                else
                  for (o = i; o !== null;) {
                    if (o === t) {
                      o = null;
                      break;
                    }
                    if (((i = o.sibling), i !== null)) {
                      ((i.return = o.return), (o = i));
                      break;
                    }
                    o = o.return;
                  }
                i = o;
              }
          (ve(e, t, l.children, n), (t = t.child));
        }
        return t;
      case 9:
        return (
          (l = t.type),
          (r = t.pendingProps.children),
          Sn(t, n),
          (l = Fe(l)),
          (r = r(l)),
          (t.flags |= 1),
          ve(e, t, r, n),
          t.child
        );
      case 14:
        return (
          (r = t.type),
          (l = De(r, t.pendingProps)),
          (l = De(r.type, l)),
          hs(e, t, r, l, n)
        );
      case 15:
        return ld(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : De(r, l)),
          $l(e, t),
          (t.tag = 1),
          ke(r) ? ((e = !0), Xl(t)) : (e = !1),
          Sn(t, n),
          td(t, r, l),
          Yo(t, r, l, n),
          Zo(null, t, r, !0, e, n)
        );
      case 19:
        return sd(e, t, n);
      case 22:
        return id(e, t, n);
    }
    throw Error(w(156, t.tag));
  };
  Pd =
    typeof reportError === "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  Ni.prototype.render = Zu.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(w(409));
    wi(e, t, null, null);
  };
  Ni.prototype.unmount = Zu.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      (Xt(function () {
        wi(null, e, null, null);
      }),
        (t[ot] = null));
    }
  };
  Ni.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = ic();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < vt.length && t !== 0 && t < vt[n].priority; n++);
      (vt.splice(n, 0, e), n === 0 && uc(e));
    }
  };
  rc = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = or(t.pendingLanes);
          n !== 0 &&
            (gu(t, n | 1),
            Se(t, q()),
            (D & 6) === 0 && ((bn = q() + 500), bt()));
        }
        break;
      case 13:
        (Xt(function () {
          var r = ut(e, 1);
          if (r !== null) {
            var l = ge();
            Ue(r, e, 1, l);
          }
        }),
          Xu(e, 1));
    }
  };
  hu = function (e) {
    if (e.tag === 13) {
      var t = ut(e, 134217728);
      if (t !== null) {
        var n = ge();
        Ue(t, e, 134217728, n);
      }
      Xu(e, 134217728);
    }
  };
  lc = function (e) {
    if (e.tag === 13) {
      var t = Et(e),
        n = ut(e, t);
      if (n !== null) {
        var r = ge();
        Ue(n, e, t, r);
      }
      Xu(e, t);
    }
  };
  ic = function () {
    return B;
  };
  oc = function (e, t) {
    var n = B;
    try {
      return ((B = e), t());
    } finally {
      B = n;
    }
  };
  _o = function (e, t, n) {
    switch (t) {
      case "input":
        if ((wo(e, n), (t = n.name), n.type === "radio" && t != null)) {
          for (n = e; n.parentNode;) n = n.parentNode;
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          );
          for (t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var l = pi(r);
              if (!l) throw Error(w(90));
              (Ds(r), wo(r, l));
            }
          }
        }
        break;
      case "textarea":
        Bs(e, n);
        break;
      case "select":
        ((t = n.value), t != null && xn(e, !!n.multiple, t, !1));
    }
  };
  Ks = Wu;
  Ys = Xt;
  ((Rm = { usingClientEntryPoint: !1, Events: [Ar, fn, pi, Ws, Qs, Wu] }),
    (rr = {
      findFiberByHostInstance: At,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    }),
    (Dm = {
      bundleType: rr.bundleType,
      version: rr.version,
      rendererPackageName: rr.rendererPackageName,
      rendererConfig: rr.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: st.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = Zs(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: rr.findFiberByHostInstance || Im,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    }));
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    if (
      ((on = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !on.isDisabled && on.supportsFiber)
    )
      try {
        ((si = on.inject(Dm)), (Je = on));
      } catch (e) {}
  }
  ((Td = Rm), (Od = Wu));
});
var Wd = nl((Jm, Hd) => {
  Ud();
  function Vd() {
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function"
    )
      return;
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Vd);
    } catch (e) {
      console.error(e);
    }
  }
  (Vd(), (Hd.exports = qu));
});
var Qd = nl((Bm) => {
  var Vr = je(Wd(), 1);
  ((Bm.createRoot = Vr.createRoot), (Bm.hydrateRoot = Vr.hydrateRoot));
  var Om;
});
var Jd = je($t(), 1),
  qd = je(Qd(), 1);
var $ = je($t(), 1);
var Ei = je($t(), 1);
var Kd = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  zi = (...e) =>
    e
      .filter((t, n, r) => {
        return Boolean(t) && t.trim() !== "" && r.indexOf(t) === n;
      })
      .join(" ")
      .trim();
var Hr = je($t(), 1);
var Yd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
var Gd = Hr.forwardRef(
  (
    {
      color: e = "currentColor",
      size: t = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: r,
      className: l = "",
      children: i,
      iconNode: o,
      ...u
    },
    s,
  ) => {
    return Hr.createElement(
      "svg",
      {
        ref: s,
        ...Yd,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
        className: zi("lucide", l),
        ...u,
      },
      [
        ...o.map(([p, h]) => Hr.createElement(p, h)),
        ...(Array.isArray(i) ? i : [i]),
      ],
    );
  },
);
var I = (e, t) => {
  let n = Ei.forwardRef(({ className: r, ...l }, i) =>
    Ei.createElement(Gd, {
      ref: i,
      iconNode: t,
      className: zi(`lucide-${Kd(e)}`, r),
      ...l,
    }),
  );
  return ((n.displayName = `${e}`), n);
};
var In = I("Activity", [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse",
    },
  ],
]);
var Wr = I("ArrowDownRight", [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }],
]);
var $n = I("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }],
]);
var qt = I("Bell", [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi",
    },
  ],
]);
var Mt = I("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }],
]);
var Qr = I("ChevronRight", [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]);
var Rn = I("Cpu", [
  [
    "rect",
    { width: "16", height: "16", x: "4", y: "4", rx: "2", key: "14l7u7" },
  ],
  ["rect", { width: "6", height: "6", x: "9", y: "9", rx: "1", key: "5aljv4" }],
  ["path", { d: "M15 2v2", key: "13l42r" }],
  ["path", { d: "M15 20v2", key: "15mkzm" }],
  ["path", { d: "M2 15h2", key: "1gxd5l" }],
  ["path", { d: "M2 9h2", key: "1bbxkp" }],
  ["path", { d: "M20 15h2", key: "19e6y8" }],
  ["path", { d: "M20 9h2", key: "19tzq7" }],
  ["path", { d: "M9 2v2", key: "165o2o" }],
  ["path", { d: "M9 20v2", key: "i2bqo8" }],
]);
var Kr = I("EyeOff", [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f",
    },
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a",
    },
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
]);
var Yr = I("Eye", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0",
    },
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
]);
var Ft = I("Lock", [
  [
    "rect",
    {
      width: "18",
      height: "11",
      x: "3",
      y: "11",
      rx: "2",
      ry: "2",
      key: "1w4ew1",
    },
  ],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
]);
var Gr = I("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }],
]);
var Xr = I("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f",
    },
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
]);
var Dn = I("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
]);
var Zr = I("TrendingDown", [
  ["polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7", key: "1r2t7k" }],
  ["polyline", { points: "16 17 22 17 22 11", key: "11uiuu" }],
]);
var On = I("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }],
]);
var Bn = I("Wallet", [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6",
    },
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }],
]);
var jt = I("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
]);
var An = I("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db",
    },
  ],
]);
var Xd = je($t(), 1),
  Am = Symbol.for("react.element"),
  Um = Symbol.for("react.fragment"),
  Vm = Object.prototype.hasOwnProperty,
  Hm = Xd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Wm = { key: !0, ref: !0, __self: !0, __source: !0 };
function Zd(e, t, n) {
  var r,
    l = {},
    i = null,
    o = null;
  (n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (o = t.ref));
  for (r in t) Vm.call(t, r) && !Wm.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: Am,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: Hm.current,
  };
}
var Jr = Um,
  a = Zd,
  f = Zd;
/* Application data and UI state start here. */
var Qm = {
    BTC: {
      symbol: "BTC",
      name: "Bitcoin",
      price: 68420.5,
      change24h: 2.34,
      marketCap: "$1.35T",
      sparkline: [66, 68, 67, 69, 71, 70, 72, 74, 73, 75, 74, 76],
      color: "#f7931a",
    },
    ETH: {
      symbol: "ETH",
      name: "Ethereum",
      price: 3824.11,
      change24h: -1.12,
      marketCap: "$459B",
      sparkline: [40, 42, 41, 39, 38, 40, 42, 41, 43, 42, 44, 43],
      color: "#627eea",
    },
    SOL: {
      symbol: "SOL",
      name: "Solana",
      price: 178.45,
      change24h: 5.67,
      marketCap: "$83B",
      sparkline: [20, 22, 25, 23, 26, 28, 27, 30, 29, 32, 31, 33],
      color: "#9945ff",
    },
    AVAX: {
      symbol: "AVAX",
      name: "Avalanche",
      price: 38.92,
      change24h: 0.88,
      marketCap: "$15B",
      sparkline: [15, 16, 15, 17, 16, 18, 19, 18, 20, 19, 21, 20],
      color: "#e84142",
    },
    LINK: {
      symbol: "LINK",
      name: "Chainlink",
      price: 18.44,
      change24h: -0.42,
      marketCap: "$10.8B",
      sparkline: [30, 29, 31, 32, 30, 33, 32, 34, 33, 35, 34, 36],
      color: "#2a5ada",
    },
  },
  Km = [
    { symbol: "BTC", amount: 0.42, avgBuy: 62400 },
    { symbol: "ETH", amount: 8.5, avgBuy: 3450 },
    { symbol: "SOL", amount: 120, avgBuy: 142.3 },
    { symbol: "AVAX", amount: 450, avgBuy: 32.1 },
    { symbol: "LINK", amount: 800, avgBuy: 16.2 },
  ];
function ju() {
  let [e, t] = $.useState("portfolio"),
    [n, r] = $.useState(Qm),
    [l, i] = $.useState(Km),
    [o, u] = $.useState(12450.8),
    [s, p] = $.useState(!1),
    [h, y] = $.useState("Карта"),
    [g, S] = $.useState(500),
    [k, z] = $.useState("idle"),
    [M, m] = $.useState(null),
    [d, v] = $.useState("BTC"),
    [x, C] = $.useState("BUY"),
    [_, P] = $.useState("MARKET"),
    [T, J] = $.useState("1000"),
    [F, He] = $.useState(""),
    [Un, We] = $.useState([]),
    [en, jd] = $.useState("Balanced"),
    [ea, ef] = $.useState(25),
    [ta, tf] = $.useState(8),
    [Qe, nf] = $.useState(!1),
    [ct, rf] = $.useState(68),
    [lf, Ym] = $.useState([
      {
        id: "1",
        symbol: "BTC",
        side: "LONG",
        conf: 72,
        reason: "RSI дивергенция + обемен пробив",
        time: "14:32",
      },
      {
        id: "2",
        symbol: "ETH",
        side: "SHORT",
        conf: 65,
        reason: "Съпротива $3900, намаляващ OBV",
        time: "14:28",
      },
      {
        id: "3",
        symbol: "SOL",
        side: "LONG",
        conf: 81,
        reason: "Breakout от триъгълник, funding положителен",
        time: "14:15",
      },
    ]),
    [of, na] = $.useState(
      "Анализирам пазара в реално време... BTC показва сила над 20D EMA. Институционален поток +$420M през последните 24ч. Волатилност VIX крипто: 62. Препоръка: Изчакай потвърждение над $68,800 за агресивен лонг.",
    ),
    [aiLoading, setAiLoading] = $.useState(false),
    [Vn, uf] = $.useState(null),
    [walletAddress, setWalletAddress] = $.useState(null),
    [walletName, setWalletName] = $.useState(null),
    [walletChainId, setWalletChainId] = $.useState(null),
    [walletBalance, setWalletBalance] = $.useState(null),
    [walletCurrency, setWalletCurrency] = $.useState("ETH"),
    [walletError, setWalletError] = $.useState(""),
    [qr, ra] = $.useState(""),
    [la, af] = $.useState("1234"),
    [sf, Ci] = $.useState(!1),
    [Hn, Wn] = $.useState(""),
    [tn, _i] = $.useState([
      {
        id: "a1",
        symbol: "BTC",
        condition: "ABOVE",
        target: 70000,
        vol: 5,
        enabled: !0,
      },
      {
        id: "a2",
        symbol: "SOL",
        condition: "BELOW",
        target: 150,
        vol: 8,
        enabled: !0,
      },
    ]),
    [ye, Qn] = $.useState({
      symbol: "BTC",
      condition: "ABOVE",
      target: "",
      vol: "5",
    }),
    [jr, cf] = $.useState(!0),
    [timeframe, setTimeframe] = $.useState("15m"),
    [candlesBySymbol, setCandlesBySymbol] = $.useState({}),
    [candlesStatus, setCandlesStatus] = $.useState("LOADING"),
    [orderBooksBySymbol, setOrderBooksBySymbol] = $.useState({}),
    [orderBookStatus, setOrderBookStatus] = $.useState("LOADING"),
    [recentTradesBySymbol, setRecentTradesBySymbol] = $.useState({}),
    [marketStatus, setMarketStatus] = $.useState("CONNECTING"),
    [paperStatus, setPaperStatus] = $.useState("LOADING"),
    [paperOrders, setPaperOrders] = $.useState([]),
    [alertEvents, setAlertEvents] = $.useState([]),
    [paperMetrics, setPaperMetrics] = $.useState({
      realizedPnl: 0,
      totalFees: 0,
      reservedCash: 0,
      reservedAssets: {},
    }),
    [portfolioMetrics, setPortfolioMetrics] = $.useState(null),
    [marketOverview, setMarketOverview] = $.useState(null),
    [marketOverviewStatus, setMarketOverviewStatus] = $.useState("LOADING"),
    [futuresAnalysis, setFuturesAnalysis] = $.useState(null),
    [futuresAnalysisStatus, setFuturesAnalysisStatus] = $.useState("LOADING"),
    [analysisTimeframe, setAnalysisTimeframe] = $.useState("intraday"),
    [signalHistory, setSignalHistory] = $.useState([]),
    Pi = $.useRef(null),
    candleSocket = $.useRef(null),
    spotReconnectTimer = $.useRef(null),
    spotReconnectAttempt = $.useRef(0),
    lastSpotUpdate = $.useRef(0),
    toastTimers = $.useRef(new Map()),
    seenAlertEvents = $.useRef(null);
  const refreshWallet = (address) => {
    const provider = window.__cryptoQuantWalletProvider || window.ethereum;
    if (!provider || !address) {
      setWalletAddress(null);
      setWalletBalance(null);
      return;
    }
    Promise.all([
      provider.request({ method: "eth_chainId" }),
      provider.request({ method: "eth_getBalance", params: [address, "latest"] }),
    ]).then(([chainId, balance]) => {
      setWalletAddress(address);
      setWalletChainId(chainId);
      setWalletBalance((Number(BigInt(balance)) / 1e18).toFixed(6));
      setWalletCurrency("ETH");
      setWalletError("");
    }).catch(() => setWalletError("Неуспешно зареждане на wallet данните"));
  };
  const connectPhantom = () => {
    const provider = window.solana;
    if (!provider?.isPhantom) {
      setWalletError("Phantom не е инсталиран");
      return;
    }
    provider.connect().then(({ publicKey }) => {
      const address = publicKey?.toString();
      if (!address) throw new Error("No Solana account returned");
      window.__cryptoQuantWalletProvider = provider;
      uf("phantom");
      setWalletName("Phantom");
      setWalletAddress(address);
      setWalletChainId("Solana");
      setWalletBalance(null);
      setWalletCurrency("SOL");
      setWalletError("");
      provider.on?.("accountChanged", (nextPublicKey) => {
        const nextAddress = nextPublicKey?.toString();
        if (!nextAddress) {
          uf(null);
          setWalletAddress(null);
          return;
        }
        setWalletAddress(nextAddress);
      });
    }).catch((error) => setWalletError(error instanceof Error ? error.message : "Phantom connection failed"));
  };
  const connectMetaMask = () => {
    if (!window.ethereum) {
      setWalletError("MetaMask не е инсталиран");
      return;
    }
    window.ethereum.request({ method: "eth_requestAccounts" })
      .then(([address]) => {
        uf("metamask");
        setWalletName("MetaMask");
        refreshWallet(address);
      })
      .catch(() => setWalletError("Свързването с MetaMask беше отказано"));
  };
  const connectWalletConnect = async () => {
    const projectId = window.__WALLETCONNECT_PROJECT_ID__;
    if (!projectId) {
      setWalletError("WalletConnect project ID не е конфигуриран");
      return;
    }
    try {
      const { EthereumProvider } = await import("https://esm.sh/@walletconnect/ethereum-provider@2.21.5");
      const provider = await EthereumProvider.init({
        projectId,
        chains: [1],
        showQrModal: true,
        metadata: { name: "CryptoQuant Pro", description: "CryptoQuant Pro wallet", url: window.location.origin, icons: [] },
      });
      await provider.connect();
      provider.on?.("accountsChanged", ([address]) => refreshWallet(address));
      provider.on?.("chainChanged", () => refreshWallet(walletAddress));
      const accounts = await provider.request({ method: "eth_accounts" });
      const address = accounts?.[0];
      if (!address) throw new Error("No wallet account returned");
      window.__cryptoQuantWalletProvider = provider;
      uf("walletconnect");
      setWalletName("WalletConnect");
      refreshWallet(address);
    } catch (error) {
      setWalletError(error instanceof Error ? error.message : "WalletConnect connection failed");
    }
  };
  $.useEffect(() => {
    const provider = window.ethereum;
    if (!provider) return undefined;
    const handleAccountsChanged = ([address]) => {
      if (!address) {
        uf(null);
        refreshWallet(null);
        return;
      }
      uf("metamask");
      refreshWallet(address);
    };
    const handleChainChanged = () => {
      if (walletAddress) refreshWallet(walletAddress);
    };
    provider.request({ method: "eth_accounts" }).then(([address]) => {
      if (address) refreshWallet(address);
    }).catch(() => {});
    provider.on?.("accountsChanged", handleAccountsChanged);
    provider.on?.("chainChanged", handleChainChanged);
    return () => {
      provider.removeListener?.("accountsChanged", handleAccountsChanged);
      provider.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [walletAddress]);
  ($.useEffect(() => {
    fetch("/api/paper/state")
      .then((response) => {
        if (!response.ok) throw new Error("Paper state request failed");
        return response.json();
      })
      .then((state) => {
        u(Number(state.cash));
        i(state.positions || []);
        setPaperMetrics(state);
        setPaperStatus("READY");
      })
      .catch(() => setPaperStatus("ERROR"));
    fetch("/api/paper/orders")
      .then((response) => {
        if (!response.ok) throw new Error("Paper orders request failed");
        return response.json();
      })
      .then((result) => setPaperOrders(result.orders || []))
      .catch(() => {});
  }, []),
    $.useEffect(() => {
      const refreshFuturesAnalysis = () => {
        const accountSize = portfolioMetrics?.totalValue ?? o;
        fetch(`/api/analysis/${d}?timeframe=${analysisTimeframe}&accountSize=${accountSize}&riskPercent=1`)
          .then((response) => {
            if (!response.ok) throw new Error("Futures analysis request failed");
            return response.json();
          })
          .then((analysis) => {
            setFuturesAnalysis(analysis);
            setFuturesAnalysisStatus(analysis.status || "READY");
          })
          .catch(() => setFuturesAnalysisStatus("ERROR"));
      };
      refreshFuturesAnalysis();
      const analysisTimer = window.setInterval(refreshFuturesAnalysis, 10000);
      return () => window.clearInterval(analysisTimer);
    }, [d, analysisTimeframe, portfolioMetrics?.totalValue, o]),
    $.useEffect(() => {
      fetch("/api/analysis/history")
        .then((response) => response.json())
        .then((history) => setSignalHistory(Array.isArray(history) ? history : []))
        .catch(() => {});
    }, [futuresAnalysis]),
    $.useEffect(() => {
      const refreshMarketOverview = () => {
        setMarketOverviewStatus((current) => current === "READY" ? "REFRESHING" : "LOADING");
        fetch("/api/market/overview")
          .then((response) => {
            if (!response.ok) throw new Error("Market overview request failed");
            return response.json();
          })
          .then((overview) => {
            setMarketOverview(overview);
            setMarketOverviewStatus("READY");
            if (overview.fearGreed !== null) rf(overview.fearGreed);
            r((current) => {
              const updated = { ...current };
              Object.entries(overview.marketCaps || {}).forEach(([symbol, marketCap]) => {
                if (updated[symbol]) updated[symbol] = { ...updated[symbol], marketCap };
              });
              return updated;
            });
          })
          .catch(() => setMarketOverviewStatus("ERROR"));
      };

      refreshMarketOverview();
      const overviewTimer = window.setInterval(refreshMarketOverview, 30000);
      return () => window.clearInterval(overviewTimer);
    }, []),
    $.useEffect(() => {
      const refreshAlerts = () => {
        fetch("/api/alerts")
          .then((response) => {
            if (!response.ok) throw new Error("Alerts request failed");
            return response.json();
          })
          .then((result) => {
            const events = result.alertEvents || result.events || [];
            _i(result.alerts || []);
            setAlertEvents(events);
            const eventIds = new Set(events.map((event) => event.id));
            if (seenAlertEvents.current === null) {
              seenAlertEvents.current = eventIds;
              return;
            }
            events.filter((event) => !seenAlertEvents.current.has(event.id)).forEach((event) =>
              We((current) => [
                {
                  id: Date.now().toString() + event.id,
                  text: `Аларма ${event.symbol} ${event.type}: ${event.value.toFixed(2)}`,
                  type: "info",
                },
                ...current,
              ].slice(0, 5)),
            );
            seenAlertEvents.current = eventIds;
          })
          .catch(() => {});
      };
      refreshAlerts();
      const alertRefreshTimer = window.setInterval(refreshAlerts, 2000);
      return () => window.clearInterval(alertRefreshTimer);
    }, []),
    $.useEffect(() => {
      const refreshPaperState = () => {
        Promise.all([
          fetch("/api/paper/state").then((response) => response.json()),
          fetch("/api/paper/orders").then((response) => response.json()),
          fetch("/api/paper/portfolio").then((response) => response.json()),
        ])
          .then(([state, orders, portfolio]) => {
            u(Number(state.cash));
            i(state.positions || []);
            setPaperMetrics(state);
            setPaperOrders(orders.orders || []);
            if (portfolio.totalValue !== undefined) setPortfolioMetrics(portfolio);
            setPaperStatus("READY");
          })
          .catch(() => setPaperStatus("ERROR"));
      };

      const paperRefreshTimer = window.setInterval(refreshPaperState, 2000);
      return () => window.clearInterval(paperRefreshTimer);
    }, []),
    $.useEffect(() => {
    let symbols = Object.keys(Qm);
    let controller = new AbortController();

    fetch(
      `/api/market/ticker?symbols=${encodeURIComponent(JSON.stringify(symbols.map((symbol) => `${symbol}USDT`)))}`,
      { signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) throw new Error("Ticker request failed");
        return response.json();
      })
      .then((tickers) => {
        r((current) => {
          let updated = { ...current };
          tickers.forEach((ticker) => {
            let symbol = ticker.symbol.replace("USDT", "");
            if (!updated[symbol]) return;
            updated[symbol] = {
              ...updated[symbol],
              price: Number(ticker.lastPrice),
              change24h: Number(ticker.priceChangePercent),
            };
          });
          return updated;
        });
        setMarketStatus("LIVE");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setMarketStatus("ERROR");
      });

    let stream = symbols
      .flatMap((symbol) => [
        `${symbol.toLowerCase()}usdt@ticker`,
        `${symbol.toLowerCase()}usdt@depth5`,
        `${symbol.toLowerCase()}usdt@trade`,
      ])
      .join("/");
    let connectSpot = () => {
      setMarketStatus("CONNECTING");
      Pi.current = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${stream}`);
      Pi.current.onopen = () => {
        spotReconnectAttempt.current = 0;
        lastSpotUpdate.current = Date.now();
        setMarketStatus("LIVE");
      };
      Pi.current.onmessage = (event) => {
      lastSpotUpdate.current = Date.now();
      let ticker = JSON.parse(event.data).data;
      let symbol = ticker.s?.replace("USDT", "") || ticker.symbol?.replace("USDT", "");
      if (!symbol) return;
      if (ticker.e === "depthUpdate") {
        setOrderBooksBySymbol((current) => ({
          ...current,
          [symbol]: {
            bids: ticker.b || [],
            asks: ticker.a || [],
          },
        }));
        return;
      }
      if (ticker.e === "trade") {
        setRecentTradesBySymbol((current) => ({
          ...current,
          [symbol]: [
            {
              price: Number(ticker.p),
              quantity: Number(ticker.q),
              time: ticker.T,
              side: ticker.m ? "sell" : "buy",
            },
            ...(current[symbol] || []),
          ].slice(0, 12),
        }));
        return;
      }
      r((current) => {
        if (!current[symbol]) return current;
        return {
          ...current,
          [symbol]: {
            ...current[symbol],
            price: Number(ticker.c),
            change24h: Number(ticker.P),
          },
        };
      });
      setMarketStatus("LIVE");
      };
      Pi.current.onerror = () => setMarketStatus("ERROR");
      Pi.current.onclose = () => {
        setMarketStatus("DISCONNECTED");
        const delay = Math.min(30000, 1000 * 2 ** spotReconnectAttempt.current++);
        spotReconnectTimer.current = window.setTimeout(connectSpot, delay);
      };
    };
    connectSpot();
    const staleTimer = window.setInterval(() => {
      if (lastSpotUpdate.current && Date.now() - lastSpotUpdate.current > 15000) {
        setMarketStatus("STALE");
      }
    }, 5000);

    return () => {
      controller.abort();
      if (spotReconnectTimer.current) window.clearTimeout(spotReconnectTimer.current);
      window.clearInterval(staleTimer);
      if (Pi.current) Pi.current.onclose = null;
      Pi.current?.close();
    };
  }, []),
    $.useEffect(() => {
      let controller = new AbortController();
      let symbols = Object.keys(Qm);
      setCandlesStatus("LOADING");

      let intervalByTimeframe = {
        "1m": "1m",
        "15m": "15m",
        "1H": "1h",
        "4H": "4h",
        D: "1d",
      };

      Promise.all(
        symbols.map((symbol) =>
          fetch(
            `/api/market/klines?symbol=${symbol}USDT&interval=${intervalByTimeframe[timeframe]}&limit=48`,
            { signal: controller.signal },
          ).then((response) => {
            if (!response.ok) throw new Error("Candles request failed");
            return response.json();
          }).then((rows) => [
            symbol,
            rows.map((row) => ({
              o: Number(row[1]),
              h: Number(row[2]),
              l: Number(row[3]),
              c: Number(row[4]),
            })),
          ]),
        ),
      )
        .then((entries) => {
          setCandlesBySymbol(Object.fromEntries(entries));
          setCandlesStatus("READY");
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            setCandlesStatus("ERROR");
            setMarketStatus("ERROR");
          }
        });

      return () => controller.abort();
    }, [timeframe]),
    $.useEffect(() => {
      let intervalByTimeframe = {
        "1m": "1m",
        "15m": "15m",
        "1H": "1h",
        "4H": "4h",
        D: "1d",
      };
      let stream = Object.keys(Qm)
        .map(
          (symbol) =>
            `${symbol.toLowerCase()}usdt@kline_${intervalByTimeframe[timeframe]}`,
        )
        .join("/");

      candleSocket.current = new WebSocket(
        `wss://stream.binance.com:9443/stream?streams=${stream}`,
      );
      candleSocket.current.onmessage = (event) => {
        let candle = JSON.parse(event.data).data?.k;
        if (!candle) return;
        let symbol = candle.s.replace("USDT", "");
        let nextCandle = {
          o: Number(candle.o),
          h: Number(candle.h),
          l: Number(candle.l),
          c: Number(candle.c),
        };
        setCandlesBySymbol((current) => {
          let candles = current[symbol] || [];
          let lastCandle = candles[candles.length - 1];
          let updatedCandles = lastCandle
            ? [...candles.slice(0, -1), nextCandle]
            : [nextCandle];
          return { ...current, [symbol]: updatedCandles.slice(-48) };
        });
      };

      return () => candleSocket.current?.close();
    }, [timeframe]),
    $.useEffect(() => {
      let controller = new AbortController();
      setOrderBookStatus("LOADING");
      fetch(`/api/market/depth?symbol=${d}USDT&limit=5`, {
        signal: controller.signal,
      })
        .then((response) => {
          if (!response.ok) throw new Error("Order book request failed");
          return response.json();
        })
        .then((depth) => {
          setOrderBooksBySymbol((current) => ({
            ...current,
            [d]: { bids: depth.bids || [], asks: depth.asks || [] },
          }));
          setOrderBookStatus("READY");
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            setOrderBookStatus("ERROR");
            setMarketStatus("ERROR");
          }
        });

      return () => controller.abort();
    }, [d]),
  $.useEffect(() => {
    Un.forEach((notification) => {
      if (toastTimers.current.has(notification.id)) return;

      const timer = window.setTimeout(() => {
        We((current) =>
          current.filter((item) => item.id !== notification.id),
        );
        toastTimers.current.delete(notification.id);
      }, 3000);

      toastTimers.current.set(notification.id, timer);
    });
  }, [Un]));
  $.useEffect(() => {
    return () => {
      toastTimers.current.forEach((timer) => window.clearTimeout(timer));
      toastTimers.current.clear();
    };
  }, []);
  let Kn = l.reduce((c, N) => c + N.amount * (n[N.symbol]?.price || 0), 0),
    Ti = l.reduce((c, N) => c + N.amount * N.avgBuy, 0),
    el = Kn - Ti,
    df = Ti > 0 ? (el / Ti) * 100 : 0,
    ia = Kn + o,
    It = l.reduce((c, N) => {
      let L = n[N.symbol];
      if (!L) return c;
      let O = L.price / (1 + L.change24h / 100);
      return c + N.amount * (L.price - O);
    }, 0),
    currentOrderBook = orderBooksBySymbol[d] || { bids: [], asks: [] },
    currentRecentTrades = recentTradesBySymbol[d] || [],
    askGemini = (question) => {
      if (!question.trim() || aiLoading) return;
      setAiLoading(true);
      fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, symbol: d, timeframe: analysisTimeframe }),
      })
        .then((response) => response.json().then((result) => ({ response, result })))
        .then(({ response, result }) => {
          if (!response.ok) throw new Error(result.error || "AI анализът е недостъпен");
          na(result.answer);
        })
        .catch((error) => na(`Gemini error: ${error.message}`))
        .finally(() => setAiLoading(false));
    },
    ff = () => {
      (z("processing"),
        setTimeout(() => {
          (z("success"),
            setTimeout(() => {
              (u((c) => c + g),
                p(!1),
                z("idle"),
                We((c) =>
                  [
                    {
                      id: Date.now().toString(),
                      text: `Депозит $${g} успешен via ${h}`,
                      type: "info",
                    },
                    ...c,
                  ].slice(0, 5),
                ));
            }, 800));
        }, 1500));
    },
    pf = () => {
      let quoteAmount = parseFloat(T);
      if (!Number.isFinite(quoteAmount) || quoteAmount <= 0 || paperStatus !== "READY") return;
      fetch("/api/paper/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: d,
          side: x,
          type: _,
          quoteAmount,
          limitPrice: _ === "LIMIT" ? parseFloat(F) : undefined,
        }),
      })
        .then((response) => response.json().then((result) => ({ response, result })))
        .then(({ response, result }) => {
          if (!response.ok) throw new Error(result.error || "Paper order failed");
          u(Number(result.store.cash));
          i(result.store.positions || []);
          setPaperMetrics(result.store);
          setPaperOrders((current) => [result.order, ...current].slice(0, 100));
          We((current) => [
            {
              id: Date.now().toString(),
              text: `${x === "BUY" ? "Купи" : "Продай"} ${result.order.quantity.toFixed(5)} ${d} на $${result.order.price.toFixed(2)} • PAPER`,
              type: x === "BUY" ? "buy" : "sell",
            },
            ...current,
          ].slice(0, 5));
        })
        .catch((error) =>
          We((current) => [
            { id: Date.now().toString(), text: error.message, type: "info" },
            ...current,
          ].slice(0, 5)),
        );
    },
    oa = ({ data: c, color: N, up: L }) => {
      let b = Math.min(...c),
        ae = Math.max(...c),
        A = ae - b || 1,
        ne = c
          .map(
            (Ke, W) =>
              `${(W / (c.length - 1)) * 80},${24 - ((Ke - b) / A) * 24}`,
          )
          .join(" ");
      return f("svg", {
        width: 80,
        height: 24,
        className: "overflow-visible",
        children: [
          a("polyline", {
            fill: "none",
            stroke: N,
            strokeWidth: "1.6",
            points: ne,
            opacity: 0.9,
          }),
          a("polyline", {
            fill: "none",
            stroke: N,
            strokeWidth: "8",
            points: ne,
            opacity: 0.12,
            style: { filter: "blur(2px)" },
          }),
        ],
      });
    },
    ua = ({ symbol: c }) => {
      let N = candlesBySymbol[c] || [];
      if (N.length === 0)
        return f("div", {
          className:
            "w-full h-[240px] bg-[#0a0a0f] rounded-xl p-3 flex items-center justify-center border border-zinc-800 text-[12px] text-zinc-500",
          children:
            candlesStatus === "ERROR"
              ? "Свещите не са налични. Провери market връзката."
              : "Зареждам реални пазарни данни...",
        });
      let L = Math.min(...N.map((b) => b.l)),
        O = Math.max(...N.map((b) => b.h)),
        R = O - L || 1;
      return f("div", {
        className:
          "w-full h-[240px] bg-[#0a0a0f] rounded-xl p-3 relative overflow-hidden border border-zinc-800",
        children: [
          f("svg", {
            viewBox: "0 0 400 200",
            className: "w-full h-full",
            children: [
              [0, 1, 2, 3].map((b) =>
                a(
                  "line",
                  {
                    x1: "0",
                    y1: b * 50,
                    x2: "400",
                    y2: b * 50,
                    stroke: "#222",
                    strokeWidth: "0.5",
                    strokeDasharray: "2 4",
                  },
                  b,
                ),
              ),
              N.map((b, ae) => {
                let A = (ae / N.length) * 380 + 10,
                  ne = ((O - b.h) / R) * 180 + 10,
                  Ke = ((O - b.l) / R) * 180 + 10,
                  W = ((O - b.o) / R) * 180 + 10,
                  tl = ((O - b.c) / R) * 180 + 10,
                  aa = b.c > b.o;
                return f(
                  "g",
                  {
                    children: [
                      a("line", {
                        x1: A,
                        y1: ne,
                        x2: A,
                        y2: Ke,
                        stroke: aa ? "#10b981" : "#f43f5e",
                        strokeWidth: "1",
                      }),
                      a("rect", {
                        x: A - 3,
                        y: Math.min(W, tl),
                        width: "6",
                        height: Math.abs(W - tl) || 1,
                        fill: aa ? "#10b981" : "#f43f5e",
                        rx: "1",
                      }),
                    ],
                  },
                  ae,
                );
              }),
            ],
          }),
          f("div", {
            className: "absolute top-3 left-3 flex gap-2 text-[10px]",
            children: [
              ["1m", "15m", "1H", "4H", "D"].map((period) =>
                a(
                  "button",
                  {
                    type: "button",
                    onClick: () => setTimeframe(period),
                    className: `px-2 py-1 rounded ${timeframe === period ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`,
                    children: period,
                  },
                  period,
                ),
              ),
            ],
          }),
        ],
      });
    };
  return f("div", {
    className:
      "min-h-screen bg-[#050507] text-zinc-100 font-[Inter,system-ui,sans-serif] selection:bg-violet-500/30",
    children: [
      a("style", {
        children:
          "* { font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; } .font-mono { font-family: JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace; }",
      }),
      a("div", {
        className:
          "fixed top-3 right-3 z-[100] flex flex-col gap-1.5 w-[92%] sm:w-auto max-w-[320px]",
        children: Un.map((c) =>
          f(
            "div",
            {
              className: `px-3 py-2 rounded-xl backdrop-blur-xl border text-[12px] font-medium shadow-2xl animate-[slideIn_0.3s_ease] flex items-center gap-1.5 ${c.type === "buy" ? "bg-emerald-950/80 border-emerald-800 text-emerald-200" : c.type === "sell" ? "bg-rose-950/80 border-rose-800 text-rose-200" : "bg-zinc-900/90 border-zinc-700 text-zinc-200"}`,
              children: [
                a("div", {
                  className: `w-1.5 h-1.5 rounded-full ${c.type === "buy" ? "bg-emerald-400" : c.type === "sell" ? "bg-rose-400" : "bg-violet-400"} animate-pulse`,
                }),
                c.text,
              ],
            },
            c.id,
          ),
        ),
      }),
      sf &&
        a("div", {
          className:
            "fixed inset-0 z-[200] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6",
          children: f("div", {
            className:
              "w-full max-w-[360px] bg-zinc-900 border border-zinc-800 rounded-[28px] p-8 shadow-[0_0_80px_rgba(124,58,237,0.2)]",
            children: [
              a("div", {
                className:
                  "w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center mx-auto mb-6",
                children: a(Ft, { className: "w-7 h-7 text-white" }),
              }),
              a("h2", {
                className: "text-center text-xl font-semibold mb-1",
                children: "Приложението е заключено",
              }),
              a("p", {
                className: "text-center text-zinc-400 text-sm mb-6",
                children: "Въведи 4-цифрен ПИН за отключване",
              }),
              a("div", {
                className: "flex justify-center gap-3 mb-6",
                children: [0, 1, 2, 3].map((c) =>
                  a(
                    "div",
                    {
                      className: `w-12 h-14 rounded-xl border-2 flex items-center justify-center text-xl font-mono font-bold transition-all ${Hn.length > c ? "border-violet-500 bg-violet-500/10" : "border-zinc-700 bg-zinc-800"}`,
                      children: Hn[c] ? "•" : "",
                    },
                    c,
                  ),
                ),
              }),
              f("div", {
                className: "grid grid-cols-3 gap-3",
                children: [
                  [1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) =>
                    a(
                      "button",
                      {
                        onClick: () =>
                          Hn.length < 4 && Wn((N) => N + c.toString()),
                        className:
                          "h-14 rounded-2xl bg-zinc-800 border border-zinc-700 text-lg font-semibold hover:bg-zinc-700 active:scale-95 transition-all",
                        children: c,
                      },
                      c,
                    ),
                  ),
                  a("button", {
                    onClick: () => Wn(""),
                    className:
                      "h-14 rounded-2xl bg-zinc-800 border border-zinc-700 text-sm hover:bg-zinc-700",
                    children: "Изчисти",
                  }),
                  a("button", {
                    onClick: () => Hn.length < 4 && Wn((c) => c + "0"),
                    className:
                      "h-14 rounded-2xl bg-zinc-800 border border-zinc-700 text-lg font-semibold hover:bg-zinc-700",
                    children: "0",
                  }),
                  a("button", {
                    onClick: () => {
                      if (Hn === la) (Ci(!1), Wn(""));
                      else
                        (Wn(""),
                          We((c) =>
                            [
                              {
                                id: Date.now().toString(),
                                text: "Грешен ПИН",
                                type: "info",
                              },
                              ...c,
                            ].slice(0, 5),
                          ));
                    },
                    className:
                      "h-14 rounded-2xl bg-violet-600 text-white font-semibold hover:bg-violet-500",
                    children: "OK",
                  }),
                ],
              }),
            ],
          }),
        }),
      f("div", {
        className: "flex min-h-screen",
        children: [
          f("aside", {
            className:
              "hidden lg:flex w-[280px] shrink-0 flex-col border-r border-zinc-800/80 bg-[#0a0a0e] sticky top-0 h-screen",
            children: [
              a("div", {
                className: "p-6",
                children: f("div", {
                  className: "flex items-center gap-3",
                  children: [
                    a("div", {
                      className:
                        "w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-emerald-500 flex items-center justify-center font-bold text-[14px]",
                      children: "CQ",
                    }),
                    f("div", {
                      children: [
                        a("div", {
                          className:
                            "font-semibold tracking-tight leading-none",
                          children: "CryptoQuant Pro",
                        }),
                        a("div", {
                          className: "text-[11px] text-zinc-500 font-mono mt-1",
                          children: "TERMINAL v2.4 • LIVE",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              a("nav", {
                className: "px-3 flex-1 space-y-1",
                children: [
                  {
                    id: "portfolio",
                    label: "Портфолио",
                    icon: Bn,
                    desc: "Баланс & P&L",
                  },
                  {
                    id: "markets",
                    label: "Пазари",
                    icon: Mt,
                    desc: "Котировки Live",
                  },
                  {
                    id: "trade",
                    label: "Търговия",
                    icon: In,
                    desc: "Engine • Long/Short",
                  },
                  {
                    id: "signals",
                    label: "Futures Signals",
                    icon: Rn,
                    desc: "Quant • Risk Engine",
                  },
                  {
                    id: "ai",
                    label: "AI Quant",
                    icon: Rn,
                    desc: "Gemini • Бот",
                  },
                  {
                    id: "security",
                    label: "Сигурност",
                    icon: Dn,
                    desc: "Web3 & Аларми",
                  },
                ].map((c) =>
                  f(
                    "button",
                    {
                      onClick: () => {
                        if (e === c.id)
                          We((N) =>
                            [
                              {
                                id: Date.now().toString(),
                                text: `${c.label} вече е отворено`,
                                type: "info",
                              },
                              ...N,
                            ].slice(0, 5),
                          );
                        (t(c.id),
                          window.scrollTo({ top: 0, behavior: "smooth" }));
                      },
                      className: `w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left transition-all group ${e === c.id ? "bg-zinc-900 border border-zinc-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]" : "hover:bg-zinc-900/60 border border-transparent"}`,
                      children: [
                        a("div", {
                          className: `w-9 h-9 rounded-xl flex items-center justify-center ${e === c.id ? "bg-white text-black" : "bg-zinc-800 text-zinc-400 group-hover:text-zinc-200"}`,
                          children: a(c.icon, {
                            className: "w-[18px] h-[18px]",
                          }),
                        }),
                        f("div", {
                          className: "flex-1",
                          children: [
                            a("div", {
                              className: `text-[13.5px] font-medium leading-none ${e === c.id ? "text-white" : "text-zinc-300"}`,
                              children: c.label,
                            }),
                            a("div", {
                              className: "text-[11px] text-zinc-500 mt-1",
                              children: c.desc,
                            }),
                          ],
                        }),
                        a(Qr, {
                          className: `w-4 h-4 text-zinc-600 ${e === c.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition`,
                        }),
                      ],
                    },
                    c.id,
                  ),
                ),
              }),
              f("div", {
                className: "p-4",
                children: [
                  f("div", {
                    className:
                      "rounded-2xl bg-gradient-to-br from-violet-600/20 via-zinc-900 to-zinc-900 border border-violet-900/30 p-4",
                    children: [
                      f("div", {
                        className:
                          "flex items-center gap-2 text-[12px] font-semibold text-violet-300",
                        children: [
                          a(An, { className: "w-4 h-4" }),
                          " AI Авто Търговия",
                        ],
                      }),
                      f("div", {
                        className:
                          "mt-2 text-[12px] text-zinc-400 leading-relaxed",
                        children: [
                          "Ботът е ",
                          Qe ? "АКТИВЕН" : "спрял",
                          ". Конфигурирай в AI Quant секцията.",
                        ],
                      }),
                      f("div", {
                        className: "mt-3 flex items-center gap-2",
                        children: [
                          a("div", {
                            className: `w-2 h-2 rounded-full ${Qe ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"}`,
                          }),
                          a("span", {
                            className: "text-[11px] font-mono text-zinc-400",
                            children: Qe ? "LIVE EXECUTION" : "IDLE",
                          }),
                        ],
                      }),
                    ],
                  }),
                  f("div", {
                    className: "mt-4 flex items-center gap-3 px-2",
                    children: [
                      a("div", {
                        className:
                          "w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-emerald-500 flex items-center justify-center text-[11px] font-bold text-white",
                        children: "АП",
                      }),
                      f("div", {
                        className: "flex-1",
                        children: [
                          a("div", {
                            className: "text-[13px] font-medium",
                            children: "Александър П.",
                          }),
                          a("div", {
                            className: "text-[11px] text-zinc-500",
                            children: "Pro Trader • Level 7",
                          }),
                        ],
                      }),
                      a("button", {
                        onClick: () => Ci(!0),
                        className:
                          "w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700",
                        children: a(Ft, { className: "w-4 h-4" }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          f("div", {
            className: "flex-1 min-w-0 flex flex-col",
            children: [
              f("header", {
                className:
                  "sticky top-0 z-20 backdrop-blur-xl bg-[#050507]/80 border-b border-zinc-800/80",
                children: [
                  f("div", {
                    className:
                      "px-4 lg:px-8 h-[72px] flex items-center justify-between gap-4",
                    children: [
                      f("div", {
                        className: "flex items-center gap-3 lg:hidden",
                        children: [
                          a("div", {
                            className:
                              "w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-emerald-500 flex items-center justify-center font-bold text-xs",
                            children: "CQ",
                          }),
                          a("span", {
                            className: "font-semibold text-sm",
                            children: "CryptoQuant",
                          }),
                        ],
                      }),
                      a("div", {
                        className:
                          "flex items-center gap-4 flex-1 lg:flex-initial",
                        children: f("div", {
                          className:
                            "hidden lg:flex items-center gap-2 text-[11px] font-mono text-zinc-500",
                          children: [
                            a("span", {
                              className: `w-2 h-2 rounded-full ${marketStatus === "LIVE" ? "bg-emerald-500 animate-pulse" : marketStatus === "CONNECTING" ? "bg-amber-400 animate-pulse" : "bg-rose-500"}`,
                            }),
                            ` ${marketStatus} • BTC DOM ${marketOverview?.btcDominance?.toFixed(1) ?? "--"}% • FEAR & GREED ${marketOverview?.fearGreed ?? "--"}`,
                          ],
                        }),
                      }),
                      f("div", {
                        className: "flex items-center gap-2 sm:gap-4",
                        children: [
                          f("div", {
                            className: "text-right",
                            children: [
                              f("div", {
                                className:
                                  "flex items-center gap-2 justify-end",
                                children: [
                                  a("span", {
                                    className:
                                      "text-[11px] text-zinc-500 uppercase tracking-widest font-semibold hidden sm:block",
                                    children: "Нетна Стойност",
                                  }),
                                  a("button", {
                                    onClick: () => cf(!jr),
                                    className:
                                      "w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700",
                                    children: jr
                                      ? a(Yr, { className: "w-3.5 h-3.5" })
                                      : a(Kr, { className: "w-3.5 h-3.5" }),
                                  }),
                                ],
                              }),
                              a("div", {
                                className:
                                  "font-[JetBrains_Mono] font-bold text-[18px] sm:text-[20px] leading-none mt-1 tracking-tight",
                                children: jr
                                  ? `$${(portfolioMetrics?.totalValue ?? ia).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                  : "••••••",
                              }),
                              f("div", {
                                className: `text-[12px] font-mono flex items-center justify-end gap-1 mt-1 ${(portfolioMetrics?.dailyPnl ?? It) >= 0 ? "text-emerald-400" : "text-rose-400"}`,
                                children: [
                                    (portfolioMetrics?.dailyPnl ?? It) >= 0
                                    ? a($n, { className: "w-3 h-3" })
                                    : a(Wr, { className: "w-3 h-3" }),
                                  jr
                                    ? `${(portfolioMetrics?.dailyPnl ?? It) >= 0 ? "+" : ""}$${(portfolioMetrics?.dailyPnl ?? It).toFixed(2)} днес`
                                    : "••••",
                                ],
                              }),
                            ],
                          }),
                          f("div", {
                            className:
                              "hidden sm:flex items-center gap-2 pl-4 border-l border-zinc-800",
                            children: [
                              f("div", {
                                className: "text-right",
                                children: [
                                  a("div", {
                                    className:
                                      "text-[11px] text-zinc-500 uppercase tracking-widest",
                                    children: "USD Кеш",
                                  }),
                                  f("div", {
                                    className:
                                      "font-mono text-sm font-semibold",
                                    children: [
                                      "$",
                                      (portfolioMetrics?.cash ?? o).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              f("button", {
                                onClick: () => p(!0),
                                className:
                                  "h-9 px-4 rounded-xl bg-white text-black text-[13px] font-semibold hover:bg-zinc-200 flex items-center gap-1.5",
                                children: [
                                  a(Gr, { className: "w-4 h-4" }),
                                  " Депозит",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  a("div", {
                    className:
                      "lg:hidden flex gap-1 px-2 pb-2 overflow-x-auto scrollbar-none",
                    children: [
                      { id: "portfolio", l: "Портфолио" },
                      { id: "markets", l: "Пазари" },
                      { id: "trade", l: "Търговия" },
                      { id: "signals", l: "Futures Signals" },
                      { id: "ai", l: "AI Quant" },
                      { id: "security", l: "Сигурност" },
                    ].map((c) =>
                      a(
                        "button",
                        {
                          onClick: () => t(c.id),
                          className: `shrink-0 px-4 py-2.5 rounded-xl text-[13px] font-medium border ${e === c.id ? "bg-white text-black border-white" : "bg-zinc-900 text-zinc-400 border-zinc-800"}`,
                          children: c.l,
                        },
                        c.id,
                      ),
                    ),
                  }),
                ],
              }),
              f("main", {
                className:
                  "flex-1 px-4 lg:px-8 py-6 space-y-6 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(124,58,237,0.15),transparent),radial-gradient(900px_500px_at_90%_0%,rgba(16,185,129,0.12),transparent)]",
                children: [
                  e === "portfolio" &&
                    f(Jr, {
                      children: [
                        f("div", {
                          className:
                            "grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4",
                          children: [
                            f("div", {
                              className:
                                "col-span-2 lg:col-span-1 rounded-[20px] bg-zinc-900 border border-zinc-800 p-4 lg:p-5 relative overflow-hidden",
                              children: [
                                a("div", {
                                  className:
                                    "absolute top-0 right-0 w-24 h-24 bg-violet-600/20 blur-2xl rounded-full",
                                }),
                                a("div", {
                                  className:
                                    "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                  children: "Нетна Стойност",
                                }),
                                f("div", {
                                  className:
                                    "mt-2 font-mono text-[22px] font-bold tracking-tight",
                                  children: [
                                    "$",
                                    (portfolioMetrics?.totalValue ?? ia).toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                    }),
                                  ],
                                }),
                                f("div", {
                                  className: `mt-1 text-[12px] font-mono flex items-center gap-1 ${(portfolioMetrics?.unrealizedPnl ?? el) + (portfolioMetrics?.realizedPnl ?? 0) >= 0 ? "text-emerald-400" : "text-rose-400"}`,
                                  children: [
                                    a(On, { className: "w-3.5 h-3.5" }),
                                    " ",
                                    (portfolioMetrics?.unrealizedPnl ?? el) + (portfolioMetrics?.realizedPnl ?? 0) >= 0 ? "+" : "",
                                    "$",
                                    ((portfolioMetrics?.unrealizedPnl ?? el) + (portfolioMetrics?.realizedPnl ?? 0)).toFixed(2),
                                    " (",
                                    df.toFixed(2),
                                    "%) Общо P&L",
                                  ],
                                }),
                                f("div", {
                                  className:
                                    "mt-4 grid grid-cols-2 gap-2 text-[11px]",
                                  children: [
                                    f("div", {
                                      className: "rounded-xl bg-zinc-800 p-2.5",
                                      children: [
                                        a("div", {
                                          className: "text-zinc-500",
                                          children: "Крипто",
                                        }),
                                        f("div", {
                                          className:
                                            "font-mono font-semibold mt-1",
                                          children: ["$", (portfolioMetrics?.cryptoValue ?? Kn).toFixed(2)],
                                        }),
                                      ],
                                    }),
                                    f("div", {
                                      className: "rounded-xl bg-zinc-800 p-2.5",
                                      children: [
                                        a("div", {
                                          className: "text-zinc-500",
                                          children: "USD Кеш",
                                        }),
                                        f("div", {
                                          className:
                                            "font-mono font-semibold mt-1",
                                          children: ["$", (portfolioMetrics?.cash ?? o).toFixed(2)],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            f("div", {
                              className:
                                "rounded-[20px] bg-zinc-900 border border-zinc-800 p-4 lg:p-5",
                              children: [
                                a("div", {
                                  className:
                                    "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                  children: "Realized P&L",
                                }),
                                f("div", {
                                  className: `mt-2 font-mono text-xl font-bold ${paperMetrics.realizedPnl >= 0 ? "text-emerald-400" : "text-rose-400"}`,
                                  children: [
                                    paperMetrics.realizedPnl >= 0 ? "+" : "",
                                    "$",
                                    paperMetrics.realizedPnl.toFixed(2),
                                  ],
                                }),
                                a("div", {
                                  className:
                                    "mt-3 h-[36px] flex items-end gap-1",
                                  children: Array.from({ length: 14 }).map(
                                    (c, N) =>
                                      a(
                                        "div",
                                        {
                                          className: `flex-1 rounded-full ${N % 2 === 0 ? "bg-emerald-500/60" : "bg-zinc-700"}`,
                                          style: { height: `${20 + ((N * 17) % 80)}%` },
                                        },
                                        N,
                                      ),
                                  ),
                                }),
                              ],
                            }),
                            f("div", {
                              className:
                                "rounded-[20px] bg-zinc-900 border border-zinc-800 p-4 lg:p-5",
                              children: [
                                a("div", {
                                  className:
                                    "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                  children: "Paper Метрики",
                                }),
                                a("div", {
                                  className: "mt-3 flex gap-2",
                                  children: [
                                    { label: "Такси", value: paperMetrics.totalFees, color: "#f59e0b" },
                                    { label: "Резерв USD", value: paperMetrics.reservedCash, color: "#a78bfa" },
                                  ].map((metric) => {
                                    return f(
                                      "div",
                                      {
                                        className: "flex-1",
                                        children: [
                                          a("div", {
                                            className:
                                              "text-[11px] font-mono text-zinc-400",
                                            children: metric.label,
                                          }),
                                          a("div", {
                                            className:
                                              "mt-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden",
                                            children: a("div", {
                                              className: "h-full rounded-full",
                                              style: {
                                                width: "60%",
                                                background: metric.color,
                                              },
                                            }),
                                          }),
                                          f("div", {
                                            className:
                                              "mt-1 text-[10px] font-mono text-zinc-500",
                                            children: `$${metric.value.toFixed(2)}`,
                                          }),
                                        ],
                                      },
                                      metric.label,
                                    );
                                  }),
                                }),
                              ],
                            }),
                            a("div", {
                              className:
                                "rounded-[20px] bg-gradient-to-br from-violet-600 to-emerald-600 p-[1px]",
                              children: f("div", {
                                className:
                                  "rounded-[19px] bg-zinc-900 h-full p-4 lg:p-5 flex flex-col justify-between",
                                children: [
                                  f("div", {
                                    children: [
                                      a("div", {
                                        className:
                                          "text-[11px] uppercase tracking-widest text-zinc-400 font-semibold",
                                        children: "Бързи Действия",
                                      }),
                                      f("div", {
                                        className: "mt-3 flex gap-2",
                                        children: [
                                          a("button", {
                                            onClick: () => p(!0),
                                            className:
                                              "flex-1 h-9 rounded-xl bg-white text-black text-[12px] font-semibold",
                                            children: "Депозит",
                                          }),
                                          a("button", {
                                            onClick: () => t("trade"),
                                            className:
                                              "flex-1 h-9 rounded-xl bg-zinc-800 border border-zinc-700 text-[12px] font-medium",
                                            children: "Търгувай",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  a("div", {
                                    className:
                                      "mt-3 text-[11px] text-zinc-500 font-mono",
                                    children:
                                      "Лимит: $250k/ден • KYC Verified ✓",
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                        f("div", {
                          className: "grid lg:grid-cols-[1.2fr_0.8fr] gap-4",
                          children: [
                            f("div", {
                              className:
                                "rounded-[20px] bg-zinc-900 border border-zinc-800 overflow-hidden",
                              children: [
                                f("div", {
                                  className:
                                    "p-4 lg:p-5 flex items-center justify-between border-b border-zinc-800",
                                  children: [
                                    f("h3", {
                                      className: "font-semibold text-[14px]",
                                      children: [
                                        "Холдинги • ",
                                        l.length,
                                        " актива",
                                      ],
                                    }),
                                    f("div", {
                                      className:
                                        "flex items-center gap-2 text-[11px] text-zinc-500 font-mono",
                                      children: [
                                        a("div", {
                                          className:
                                            "w-2 h-2 rounded-full bg-emerald-500 animate-pulse",
                                        }),
                                        ` ${marketStatus === "LIVE" ? "LIVE PRICING" : `DATA ${marketStatus}`}`,
                                      ],
                                    }),
                                  ],
                                }),
                                a("div", {
                                  className: "divide-y divide-zinc-800/60",
                                  children: l.map((c) => {
                                    let N = n[c.symbol]?.price || 0,
                                      L = c.amount * N,
                                      O = c.amount * c.avgBuy,
                                      R = L - O,
                                      b = O > 0 ? (R / O) * 100 : 0,
                                      ae = n[c.symbol]?.change24h || 0;
                                    return f(
                                      "div",
                                      {
                                        className:
                                          "p-4 flex items-center gap-4 hover:bg-zinc-800/40 transition",
                                        children: [
                                          a("div", {
                                            className:
                                              "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold",
                                            style: {
                                              background: `${n[c.symbol].color}20`,
                                              color: n[c.symbol].color,
                                              border: `1px solid ${n[c.symbol].color}30`,
                                            },
                                            children: c.symbol[0],
                                          }),
                                          f("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                              f("div", {
                                                className:
                                                  "flex items-center gap-2",
                                                children: [
                                                  a("span", {
                                                    className:
                                                      "font-semibold text-[14px]",
                                                    children: c.symbol,
                                                  }),
                                                  a("span", {
                                                    className:
                                                      "text-[11px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono",
                                                    children:
                                                      c.amount.toFixed(5),
                                                  }),
                                                  f("span", {
                                                    className: `text-[11px] px-1.5 py-0.5 rounded font-mono ${ae >= 0 ? "bg-emerald-950 text-emerald-300" : "bg-rose-950 text-rose-300"}`,
                                                    children: [
                                                      ae >= 0 ? "+" : "",
                                                      ae.toFixed(2),
                                                      "%",
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              f("div", {
                                                className:
                                                  "text-[12px] text-zinc-500 font-mono mt-1",
                                                children: [
                                                  "Avg $",
                                                  c.avgBuy.toFixed(2),
                                                  " • Сега $",
                                                  N.toFixed(2),
                                                ],
                                              }),
                                            ],
                                          }),
                                          f("div", {
                                            className:
                                              "text-right hidden sm:block",
                                            children: [
                                              f("div", {
                                                className:
                                                  "font-mono text-[13px] font-semibold",
                                                children: ["$", L.toFixed(2)],
                                              }),
                                              f("div", {
                                                className: `text-[11px] font-mono ${R >= 0 ? "text-emerald-400" : "text-rose-400"}`,
                                                children: [
                                                  R >= 0 ? "+" : "",
                                                  "$",
                                                  R.toFixed(2),
                                                  " (",
                                                  b.toFixed(2),
                                                  "%)",
                                                ],
                                              }),
                                            ],
                                          }),
                                          a("div", {
                                            className: "hidden lg:block",
                                            children: a(oa, {
                                              data: n[c.symbol].sparkline,
                                              color: n[c.symbol].color,
                                              up: ae >= 0,
                                            }),
                                          }),
                                          a("button", {
                                            onClick: () => {
                                              (v(c.symbol), t("trade"));
                                            },
                                            className:
                                              "w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700",
                                            children: a($n, {
                                              className: "w-4 h-4",
                                            }),
                                          }),
                                        ],
                                      },
                                      c.symbol,
                                    );
                                  }),
                                }),
                              ],
                            }),
                            f("div", {
                              className: "space-y-4",
                              children: [
                                f("div", {
                                  className:
                                    "rounded-[20px] bg-zinc-900 border border-zinc-800 p-4 lg:p-5",
                                  children: [
                                    f("h4", {
                                      className:
                                        "text-[13px] font-semibold flex items-center gap-2",
                                      children: [
                                        a(qt, {
                                          className: "w-4 h-4 text-violet-400",
                                        }),
                                        " Активни Аларми",
                                      ],
                                    }),
                                    a("div", {
                                      className: "mt-3 space-y-2",
                                      children: tn.map((c) =>
                                        f(
                                          "div",
                                          {
                                            className:
                                              "flex items-center justify-between rounded-xl bg-zinc-800 border border-zinc-700/50 p-3",
                                            children: [
                                              f("div", {
                                                className:
                                                  "flex items-center gap-2",
                                                children: [
                                                  a("div", {
                                                    className:
                                                      "w-7 h-7 rounded-lg bg-zinc-700 flex items-center justify-center text-[11px] font-bold",
                                                    children: c.symbol,
                                                  }),
                                                  f("div", {
                                                    children: [
                                                      f("div", {
                                                        className:
                                                          "text-[12px] font-medium",
                                                        children: [
                                                          c.symbol,
                                                          " ",
                                                          c.condition,
                                                          " $",
                                                          c.target,
                                                        ],
                                                      }),
                                                      f("div", {
                                                        className:
                                                          "text-[10px] text-zinc-500",
                                                        children: [
                                                          "Волатилност ",
                                                          c.vol,
                                                          "%",
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              a("div", {
                                                className: `w-2 h-2 rounded-full ${c.enabled ? "bg-emerald-400" : "bg-zinc-600"}`,
                                              }),
                                            ],
                                          },
                                          c.id,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                                f("div", {
                                  className:
                                    "rounded-[20px] bg-[#0f0f12] border border-zinc-800 p-4",
                                  children: [
                                    a("div", {
                                      className:
                                        "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                      children: "Скорошни Транзакции",
                                    }),
                                    a("div", {
                                      className:
                                        "mt-3 space-y-2 font-mono text-[11px]",
                                      children: [
                                        {
                                          t: "14:22",
                                          a: "Купи 0.05 BTC",
                                          v: "$3,421",
                                          s: "buy",
                                        },
                                        {
                                          t: "13:10",
                                          a: "Продай 12 SOL",
                                          v: "$2,141",
                                          s: "sell",
                                        },
                                        {
                                          t: "11:48",
                                          a: "Депозит USD",
                                          v: "+$1,000",
                                          s: "info",
                                        },
                                      ].map((c, N) =>
                                        f(
                                          "div",
                                          {
                                            className:
                                              "flex items-center justify-between py-2 border-b border-zinc-800/60 last:border-0",
                                            children: [
                                              a("span", {
                                                className: "text-zinc-500",
                                                children: c.t,
                                              }),
                                              a("span", {
                                                className: "text-zinc-300",
                                                children: c.a,
                                              }),
                                              a("span", {
                                                className: `${c.s === "buy" ? "text-emerald-400" : c.s === "sell" ? "text-rose-400" : "text-zinc-300"}`,
                                                children: c.v,
                                              }),
                                            ],
                                          },
                                          N,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  e === "markets" &&
                    f(Jr, {
                      children: [
                        f("div", {
                          className:
                            "flex flex-col lg:flex-row lg:items-center justify-between gap-3",
                          children: [
                            a("h2", {
                              className: "text-[20px] font-bold tracking-tight",
                              children: "Пазари • Топ Крипто Активи",
                            }),
                            f("div", {
                              className:
                                "flex items-center gap-2 text-[11px] font-mono",
                              children: [
                                a("span", {
                                  className:
                                    "px-2.5 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300",
                                  children:
                                    marketOverviewStatus === "ERROR"
                                      ? "24ч Обем: грешка"
                                      : marketOverview
                                        ? `24ч Обем $${(marketOverview.volume24h / 1e9).toFixed(2)}B`
                                        : "24ч Обем: зареждане...",
                                }),
                                a("span", {
                                  className:
                                    "px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400",
                                  children:
                                    marketOverviewStatus === "ERROR"
                                      ? "BTC Dom: грешка"
                                      : `BTC Dom ${marketOverview?.btcDominance?.toFixed(1) ?? "--"}%`,
                                }),
                              ],
                            }),
                          ],
                        }),
                        f("div", {
                          className:
                            "rounded-[20px] bg-zinc-900 border border-zinc-800 overflow-hidden",
                          children: [
                            f("div", {
                              className:
                                "hidden lg:grid grid-cols-[1.2fr_0.8fr_0.6fr_0.8fr_0.6fr] gap-4 px-5 py-3 border-b border-zinc-800 text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                              children: [
                                a("span", { children: "Актив" }),
                                a("span", { children: "Цена" }),
                                a("span", { children: "24ч" }),
                                a("span", { children: "Капитализация" }),
                                a("span", { children: "Графика" }),
                              ],
                            }),
                            Object.values(n).map((c) => {
                              let N = c.change24h >= 0;
                              return f(
                                "button",
                                {
                                  onClick: () => m(c.symbol),
                                  className:
                                    "w-full grid grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.6fr_0.8fr_0.6fr] gap-3 lg:gap-4 px-4 lg:px-5 py-4 hover:bg-zinc-800/50 text-left items-center border-b border-zinc-800/50 last:border-0 transition",
                                  children: [
                                    f("div", {
                                      className: "flex items-center gap-3",
                                      children: [
                                        a("div", {
                                          className:
                                            "w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs",
                                          style: {
                                            background: `${c.color}18`,
                                            color: c.color,
                                            border: `1px solid ${c.color}30`,
                                          },
                                          children: c.symbol[0],
                                        }),
                                        f("div", {
                                          children: [
                                            f("div", {
                                              className:
                                                "font-semibold text-[13px] flex items-center gap-2",
                                              children: [
                                                c.symbol,
                                                " ",
                                                a("span", {
                                                  className:
                                                    "text-zinc-500 font-normal text-[11px] hidden sm:inline",
                                                  children: c.name,
                                                }),
                                              ],
                                            }),
                                            f("div", {
                                              className:
                                                "text-[11px] text-zinc-500 font-mono lg:hidden",
                                              children: [
                                                "$",
                                                c.price.toFixed(2),
                                                " • ",
                                                c.change24h >= 0 ? "+" : "",
                                                c.change24h.toFixed(2),
                                                "%",
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    f("div", {
                                      className:
                                        "hidden lg:block font-mono text-[13px] font-semibold",
                                      children: [
                                        "$",
                                        c.price.toLocaleString("en-US", {
                                          minimumFractionDigits: 2,
                                        }),
                                      ],
                                    }),
                                    f("div", {
                                      className: `hidden lg:flex items-center gap-1 font-mono text-[12px] ${N ? "text-emerald-400" : "text-rose-400"}`,
                                      children: [
                                        N
                                          ? a(On, { className: "w-3.5 h-3.5" })
                                          : a(Zr, { className: "w-3.5 h-3.5" }),
                                        " ",
                                        N ? "+" : "",
                                        c.change24h.toFixed(2),
                                        "%",
                                      ],
                                    }),
                                    a("div", {
                                      className:
                                        "hidden lg:block font-mono text-[12px] text-zinc-400",
                                      children:
                                        typeof c.marketCap === "number"
                                          ? `$${(c.marketCap / 1e9).toFixed(2)}B`
                                          : c.marketCap,
                                    }),
                                    a("div", {
                                      className:
                                        "flex justify-end lg:justify-start",
                                      children: a(oa, {
                                        data: c.sparkline,
                                        color: c.color,
                                        up: N,
                                      }),
                                    }),
                                  ],
                                },
                                c.symbol,
                              );
                            }),
                          ],
                        }),
                        M &&
                          a("div", {
                            className:
                              "fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex justify-end",
                            children: f("div", {
                              className:
                                "w-full sm:w-[520px] h-full bg-[#0c0c0f] border-l border-zinc-800 flex flex-col animate-[slideInRight_0.25s_ease]",
                              children: [
                                f("div", {
                                  className:
                                    "p-5 border-b border-zinc-800 flex items-center justify-between",
                                  children: [
                                    f("div", {
                                      className: "flex items-center gap-3",
                                      children: [
                                        a("div", {
                                          className:
                                            "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                                          style: {
                                            background: `${n[M].color}20`,
                                            color: n[M].color,
                                          },
                                          children: M,
                                        }),
                                        f("div", {
                                          children: [
                                            f("div", {
                                              className: "font-semibold",
                                              children: [
                                                n[M].name,
                                                " (",
                                                M,
                                                ")",
                                              ],
                                            }),
                                            f("div", {
                                              className:
                                                "text-[12px] font-mono text-zinc-400",
                                              children: [
                                                "$",
                                                n[M].price.toFixed(2),
                                                " • ",
                                                f("span", {
                                                  className:
                                                    n[M].change24h >= 0
                                                      ? "text-emerald-400"
                                                      : "text-rose-400",
                                                  children: [
                                                    n[M].change24h.toFixed(2),
                                                    "%",
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    a("button", {
                                      onClick: () => m(null),
                                      className:
                                        "w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700",
                                      children: a(jt, { className: "w-5 h-5" }),
                                    }),
                                  ],
                                }),
                                f("div", {
                                  className:
                                    "flex-1 overflow-y-auto p-5 space-y-5",
                                  children: [
                                    a(ua, { symbol: M }),
                                    a("div", {
                                      className: "grid grid-cols-2 gap-3",
                                      children: [
                                        {
                                          k: "Пазарна Кап.",
                                          v: n[M].marketCap,
                                        },
                                          {
                                            k: "24ч Обем",
                                            v: marketOverview
                                              ? `$${(marketOverview.volume24h / 1e9).toFixed(2)}B`
                                              : "--",
                                          },
                                        { k: "Върхова Цена", v: "$73,750" },
                                          {
                                            k: "Доминация",
                                            v: `${marketOverview?.btcDominance?.toFixed(1) ?? "--"}%`,
                                          },
                                      ].map((c) =>
                                        f(
                                          "div",
                                          {
                                            className:
                                              "rounded-xl bg-zinc-900 border border-zinc-800 p-3",
                                            children: [
                                              a("div", {
                                                className:
                                                  "text-[11px] text-zinc-500 uppercase tracking-widest",
                                                children: c.k,
                                              }),
                                              a("div", {
                                                className:
                                                  "mt-1 font-mono font-semibold text-[13px]",
                                                children: c.v,
                                              }),
                                            ],
                                          },
                                          c.k,
                                        ),
                                      ),
                                    }),
                                    f("div", {
                                      className:
                                        "rounded-xl bg-zinc-900 border border-zinc-800 p-4",
                                      children: [
                                        a("div", {
                                          className:
                                            "text-[12px] font-semibold mb-2",
                                          children: "Описание",
                                        }),
                                        f("p", {
                                          className:
                                            "text-[13px] leading-relaxed text-zinc-400",
                                          children: [
                                            M,
                                            " е водещ крипто актив с висока ликвидност. Идеален за количествени стратегии и арбитраж. Волатилност: средна. Корелация с BTC: висока.",
                                          ],
                                        }),
                                      ],
                                    }),
                                    f("button", {
                                      onClick: () => {
                                        (v(M), t("trade"), m(null));
                                      },
                                      className:
                                        "w-full h-12 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200",
                                      children: ["Търгувай ", M],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                      ],
                    }),
                  e === "trade" &&
                    f("div", {
                      className: "grid lg:grid-cols-[1.1fr_0.9fr] gap-4",
                      children: [
                        f("div", {
                          className: "space-y-4",
                          children: [
                            f("div", {
                              className:
                                "rounded-[20px] bg-zinc-900 border border-zinc-800 p-4 lg:p-5",
                              children: [
                                f("div", {
                                  className:
                                    "flex items-center justify-between",
                                  children: [
                                    f("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        a("select", {
                                          value: d,
                                          onChange: (c) => v(c.target.value),
                                          className:
                                            "bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm font-semibold outline-none",
                                          children: Object.keys(n).map((c) =>
                                            f(
                                              "option",
                                              {
                                                value: c,
                                                children: [c, "/USD"],
                                              },
                                              c,
                                            ),
                                          ),
                                        }),
                                        f("span", {
                                          className:
                                            "font-mono text-sm font-bold",
                                          children: [
                                            "$",
                                            n[d].price.toFixed(2),
                                          ],
                                        }),
                                        f("span", {
                                          className: `text-xs font-mono px-2 py-1 rounded-lg ${n[d].change24h >= 0 ? "bg-emerald-950 text-emerald-300" : "bg-rose-950 text-rose-300"}`,
                                          children: [
                                            n[d].change24h >= 0 ? "+" : "",
                                            n[d].change24h.toFixed(2),
                                            "%",
                                          ],
                                        }),
                                      ],
                                    }),
                                    a("div", {
                                      className:
                                        "flex gap-1 p-1 rounded-xl bg-zinc-800 border border-zinc-700",
                                      children: ["MARKET", "LIMIT"].map((c) =>
                                        a(
                                          "button",
                                          {
                                            onClick: () => P(c),
                                            className: `px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-widest ${_ === c ? "bg-white text-black" : "text-zinc-400"}`,
                                            children: c,
                                          },
                                          c,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                                a("div", {
                                  className: "mt-4",
                                  children: a(ua, { symbol: d }),
                                }),
                              ],
                            }),
                            f("div", {
                              className: "grid grid-cols-2 gap-4",
                              children: [
                                f("div", {
                                  className:
                                    "rounded-[20px] bg-zinc-900 border border-zinc-800 p-4",
                                  children: [
                                    f("div", {
                                      className:
                                        "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                      children: ["Order Book • ", d],
                                    }),
                                    f("div", {
                                      className:
                                        "mt-3 space-y-1 font-mono text-[11px]",
                                      children: [
                                        currentOrderBook.asks.length === 0 && currentOrderBook.bids.length === 0 &&
                                          a("div", {
                                            className: "py-4 text-center text-zinc-500",
                                            children:
                                              orderBookStatus === "ERROR"
                                                ? "Order book не е наличен."
                                                : "Зареждам order book...",
                                          }),
                                        currentOrderBook.asks
                                          .slice()
                                          .reverse()
                                          .map(([price, quantity], N) =>
                                            f(
                                              "div",
                                              {
                                                className:
                                                  "flex justify-between text-rose-300",
                                                children: [
                                                  a("span", {
                                                    children: Number(price).toFixed(2),
                                                  }),
                                                  a("span", {
                                                    className: "text-zinc-500",
                                                    children: Number(quantity).toFixed(5),
                                                  }),
                                                ],
                                              },
                                              `ask-${N}`,
                                            ),
                                          ),
                                        f("div", {
                                          className:
                                            "py-1.5 text-center text-[12px] font-bold text-zinc-200 border-y border-zinc-800 my-1",
                                          children: [
                                            "$",
                                            n[d].price.toFixed(2),
                                          ],
                                        }),
                                        currentOrderBook.bids.map(
                                          ([price, quantity], N) =>
                                            f(
                                              "div",
                                              {
                                                className:
                                                  "flex justify-between text-emerald-300",
                                                children: [
                                                  a("span", {
                                                    children: Number(price).toFixed(2),
                                                  }),
                                                  a("span", {
                                                    className: "text-zinc-500",
                                                    children: Number(quantity).toFixed(5),
                                                  }),
                                                ],
                                              },
                                              `bid-${N}`,
                                            ),
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
                                f("div", {
                                  className:
                                    "rounded-[20px] bg-zinc-900 border border-zinc-800 p-4",
                                  children: [
                                    a("div", {
                                      className:
                                        "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                      children: "Скорошни Сделки",
                                    }),
                                    a("div", {
                                      className:
                                        "mt-3 space-y-1.5 font-mono text-[11px]",
                                      children:
                                        currentRecentTrades.length === 0
                                          ? a("div", {
                                              className: "py-4 text-center text-zinc-500",
                                              children:
                                                marketStatus === "ERROR"
                                                  ? "Recent trades не са налични."
                                                  : "Изчаквам live сделки...",
                                            })
                                          : currentRecentTrades.map(
                                              (trade, N) =>
                                                f(
                                                  "div",
                                                  {
                                                    className: "flex justify-between",
                                                    children: [
                                                      a("span", {
                                                        className:
                                                          trade.side === "buy"
                                                            ? "text-emerald-400"
                                                            : "text-rose-400",
                                                        children: trade.price.toFixed(2),
                                                      }),
                                                      a("span", {
                                                        className: "text-zinc-500",
                                                        children: trade.quantity.toFixed(5),
                                                      }),
                                                      a("span", {
                                                        className: "text-zinc-600",
                                                        children: new Date(trade.time)
                                                          .toLocaleTimeString("bg-BG")
                                                          .slice(0, 5),
                                                      }),
                                                    ],
                                                  },
                                                  `${trade.time}-${N}`,
                                                ),
                                            ),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        f("div", {
                          className:
                            "rounded-[24px] bg-[#0f0f12] border border-zinc-800 p-5 lg:sticky lg:top-[88px] h-fit",
                          children: [
                            f("div", {
                              className:
                                "flex gap-2 p-1 rounded-2xl bg-zinc-900 border border-zinc-800",
                              children: [
                                a("button", {
                                  onClick: () => C("BUY"),
                                  className: `flex-1 h-11 rounded-xl font-bold text-[13px] tracking-widest transition flex items-center justify-center gap-2 ${x === "BUY" ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "text-zinc-400 hover:text-zinc-200"}`,
                                  children: "BUY / Long",
                                }),
                                a("button", {
                                  onClick: () => C("SELL"),
                                  className: `flex-1 h-11 rounded-xl font-bold text-[13px] tracking-widest transition flex items-center justify-center gap-2 ${x === "SELL" ? "bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]" : "text-zinc-400 hover:text-zinc-200"}`,
                                  children: "SELL / Short",
                                }),
                              ],
                            }),
                            f("div", {
                              className: "mt-5 space-y-4",
                              children: [
                                f("div", {
                                  className:
                                    "flex items-center justify-between text-[12px]",
                                  children: [
                                    a("span", {
                                      className: "text-zinc-500",
                                      children: "Наличен Баланс",
                                    }),
                                    f("span", {
                                      className: "font-mono font-semibold",
                                      children: [
                                        "$",
                                        x === "BUY"
                                          ? o.toFixed(2)
                                          : l
                                              .find((c) => c.symbol === d)
                                              ?.amount.toFixed(5) || "0.00000",
                                        " ",
                                        x === "BUY" ? "USD" : d,
                                      ],
                                    }),
                                  ],
                                }),
                                _ === "LIMIT" &&
                                  f("div", {
                                    children: [
                                      a("label", {
                                        className:
                                          "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                        children: "Лимит Цена (USD)",
                                      }),
                                      a("input", {
                                        value: F,
                                        onChange: (c) => He(c.target.value),
                                        placeholder: n[d].price.toFixed(2),
                                        className:
                                          "mt-2 w-full h-12 rounded-xl bg-zinc-900 border border-zinc-800 px-4 font-mono text-sm outline-none focus:border-violet-600",
                                      }),
                                    ],
                                  }),
                                f("div", {
                                  children: [
                                    a("label", {
                                      className:
                                        "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                      children: "Сума в USD",
                                    }),
                                    f("div", {
                                      className: "mt-2 relative",
                                      children: [
                                        a("input", {
                                          value: T,
                                          onChange: (c) => J(c.target.value),
                                          className:
                                            "w-full h-12 rounded-xl bg-zinc-900 border border-zinc-800 px-4 pr-16 font-mono text-sm outline-none focus:border-violet-600",
                                        }),
                                        a("span", {
                                          className:
                                            "absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded-lg",
                                          children: "USD",
                                        }),
                                      ],
                                    }),
                                    a("div", {
                                      className: "mt-2 grid grid-cols-4 gap-2",
                                      children: [25, 50, 75, 100].map((c) =>
                                        f(
                                          "button",
                                          {
                                            onClick: () =>
                                              J((o * (c / 100)).toFixed(0)),
                                            className:
                                              "h-8 rounded-lg bg-zinc-800 border border-zinc-700 text-[11px] font-mono hover:bg-zinc-700",
                                            children: [c, "%"],
                                          },
                                          c,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                                f("div", {
                                  className:
                                    "rounded-xl bg-zinc-900 border border-zinc-800 p-3 flex items-center justify-between",
                                  children: [
                                    a("span", {
                                      className: "text-[11px] text-zinc-500",
                                      children: "Ще получиш приблизително",
                                    }),
                                    a("span", {
                                      className:
                                        "font-mono text-[13px] font-bold",
                                      children: (() => {
                                        let c =
                                          _ === "MARKET"
                                            ? n[d].price
                                            : parseFloat(F) || n[d].price;
                                        return `${((parseFloat(T) || 0) / c).toFixed(6)} ${d}`;
                                      })(),
                                    }),
                                  ],
                                }),
                                a("div", {
                                  className:
                                    "flex items-center gap-2 text-[11px] font-mono text-zinc-500",
                                  children: a("span", {
                                    children:
                                      "Такса: 0.10% • Leverage: 1x • Long/Short визуализация",
                                  }),
                                }),
                                a("button", {
                                  onClick: pf,
                                  className: `w-full h-[52px] rounded-2xl font-bold text-[14px] tracking-widest transition active:scale-[0.98] ${x === "BUY" ? "bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)]" : "bg-rose-500 text-white hover:bg-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.35)]"}`,
                                  children:
                                    x === "BUY"
                                      ? `КУПИ / LONG ${d}`
                                      : `ПРОДАЙ / SHORT ${d}`,
                                }),
                                f("div", {
                                  className:
                                    "flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-mono",
                                  children: [
                                    a(Dn, { className: "w-3.5 h-3.5" }),
                                    " Сигурна търговия • Проверка на баланса преди изпълнение",
                                  ],
                                }),
                                f("div", {
                                  className:
                                    "mt-4 rounded-xl bg-zinc-900 border border-zinc-800 p-3",
                                  children: [
                                    a("div", {
                                      className:
                                        "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                      children: "Paper ордери",
                                    }),
                                    f("div", {
                                      className: "mt-2 space-y-2",
                                      children: paperOrders.slice(0, 5).map((order) =>
                                        f(
                                          "div",
                                          {
                                            className:
                                              "flex items-center gap-2 text-[11px] font-mono",
                                            children: [
                                              a("span", {
                                                className:
                                                  order.side === "BUY"
                                                    ? "text-emerald-400"
                                                    : "text-rose-400",
                                                children: `${order.side} ${order.symbol}`,
                                              }),
                                              a("span", {
                                                className: "text-zinc-500",
                                                children: `$${order.price.toFixed(2)}`,
                                              }),
                                              a("span", {
                                                className:
                                                  order.status === "FILLED"
                                                    ? "text-emerald-300"
                                                    : order.status === "OPEN"
                                                      ? "text-amber-300"
                                                      : "text-zinc-500",
                                                children: order.status,
                                              }),
                                              order.status === "OPEN" &&
                                                a("button", {
                                                  type: "button",
                                                  className:
                                                    "ml-auto text-zinc-400 hover:text-white",
                                                  onClick: () =>
                                                    fetch(`/api/paper/orders/${order.id}`, {
                                                      method: "DELETE",
                                                    })
                                                      .then((response) => response.json())
                                                      .then((result) => {
                                                        if (result.order) {
                                                          setPaperOrders((current) =>
                                                            current.map((item) =>
                                                              item.id === order.id
                                                                ? result.order
                                                                : item,
                                                            ),
                                                          );
                                                        }
                                                      }),
                                                  children: "Откажи",
                                                }),
                                            ],
                                          },
                                          order.id,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  e === "signals" &&
                    f(Jr, {
                      children: [
                        f("div", {
                          className: "flex flex-col lg:flex-row lg:items-center justify-between gap-3",
                          children: [
                            f("div", {
                              children: [
                                a("h2", { className: "text-[20px] font-bold", children: "Futures Signals" }),
                                a("div", { className: "text-[11px] text-zinc-500 font-mono mt-1", children: "BINANCE FUTURES • QUANT ANALYSIS • PAPER ONLY" }),
                              ],
                            }),
                            f("div", {
                              className: "flex items-center gap-2",
                              children: [
                                a("select", {
                                  value: d,
                                  onChange: (event) => v(event.target.value),
                                  className: "bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-[12px] font-semibold",
                                  children: Object.keys(n).map((symbol) => a("option", { value: symbol, children: symbol }, symbol)),
                                }),
                                ["scalp", "intraday", "swing"].map((period) =>
                                  a("button", {
                                    type: "button",
                                    onClick: () => setAnalysisTimeframe(period),
                                    className: `px-3 py-2 rounded-xl text-[11px] font-semibold ${analysisTimeframe === period ? "bg-violet-600 text-white" : "bg-zinc-900 text-zinc-400 border border-zinc-800"}`,
                                    children: period.toUpperCase(),
                                  }, period),
                                ),
                              ],
                            }),
                          ],
                        }),
                        !futuresAnalysis && a("div", { className: "rounded-[20px] bg-zinc-900 border border-zinc-800 p-6 text-zinc-500 text-sm", children: futuresAnalysisStatus === "ERROR" ? "Futures analysis unavailable" : "Loading real Futures analysis..." }),
                        futuresAnalysis && f("div", {
                          className: "space-y-4",
                          children: [
                            f("div", {
                              className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
                              children: [
                                { label: "Signal", value: futuresAnalysis.signal, color: futuresAnalysis.ready ? "text-emerald-400" : "text-amber-400" },
                                { label: "ATR(14)", value: futuresAnalysis.atr?.toFixed(2) || "--", color: "text-zinc-100" },
                                { label: "Funding", value: `${(futuresAnalysis.fundingPressure?.fundingPercent ?? 0).toFixed(4)}%`, color: futuresAnalysis.fundingPressure?.direction === "BULLISH" ? "text-emerald-400" : futuresAnalysis.fundingPressure?.direction === "BEARISH" ? "text-rose-400" : "text-zinc-100" },
                                { label: "OI Delta 5m", value: futuresAnalysis.oiDelta5m === null ? "COLLECTING" : `${futuresAnalysis.oiDelta5m.toFixed(2)}%`, color: "text-zinc-100" },
                              ].map((metric) => f("div", { className: "rounded-[20px] bg-zinc-900 border border-zinc-800 p-4", children: [a("div", { className: "text-[11px] uppercase tracking-widest text-zinc-500", children: metric.label }), a("div", { className: `mt-2 font-mono text-[18px] font-bold ${metric.color}`, children: metric.value })] }, metric.label)),
                            }),
                            f("div", {
                              className: "grid lg:grid-cols-[1fr_1fr] gap-4",
                              children: [
                                f("div", { className: "rounded-[20px] bg-zinc-900 border border-zinc-800 p-5", children: [a("h3", { className: "font-semibold text-[14px]", children: "Risk и Position Sizing" }), f("div", { className: "mt-4 grid grid-cols-2 gap-3 text-[12px]", children: [{ label: "Entry", value: futuresAnalysis.price }, { label: "Stop", value: futuresAnalysis.stop }, { label: "Target", value: futuresAnalysis.target }, { label: "Risk / Reward", value: futuresAnalysis.riskReward }].map((metric) => f("div", { className: "rounded-xl bg-zinc-800 p-3", children: [a("div", { className: "text-zinc-500", children: metric.label }), a("div", { className: "mt-1 font-mono font-semibold", children: metric.value == null ? "--" : typeof metric.value === "number" ? metric.value.toFixed(4) : metric.value })] }, metric.label)) }), a("div", { className: "mt-4 rounded-xl bg-violet-950/30 border border-violet-900/30 p-3 text-[11px] text-violet-200", children: `Risk capital $${futuresAnalysis.risk.riskCapital.toFixed(2)} • Position size $${futuresAnalysis.risk.positionSize.toFixed(2)} • ${futuresAnalysis.risk.riskPercent}% account risk` })] }),
                                f("div", { className: "rounded-[20px] bg-zinc-900 border border-zinc-800 p-5", children: [a("h3", { className: "font-semibold text-[14px]", children: "Indicator Checks" }), f("div", { className: "mt-3 space-y-2", children: futuresAnalysis.checks.map((check) => f("div", { className: "flex items-center justify-between text-[12px]", children: [a("span", { className: check.pass ? "text-emerald-300" : "text-rose-300", children: `${check.pass ? "PASS" : "BLOCKED"} • ${check.name}` }), a("span", { className: "font-mono text-zinc-500", children: check.value == null ? "--" : typeof check.value === "number" ? check.value.toFixed(4) : check.value })] }, check.name)) }), a("div", { className: "mt-4 text-[11px] text-zinc-500 font-mono", children: `Cluster: ${futuresAnalysis.cluster?.side || "--"} • Age: ${futuresAnalysis.cluster?.ageSeconds ?? "--"}s • Spoof risk: ${futuresAnalysis.spoofRisk?.risk || "--"}` })] }),
                              ],
                            }),
                            a("div", { className: "text-[10px] text-zinc-600 font-mono", children: `Source: ${futuresAnalysis.source} • Updated: ${futuresAnalysis.calculatedAt}` }),
                            f("div", {
                              className: "rounded-[20px] bg-zinc-900 border border-zinc-800 p-5",
                              children: [
                                a("h3", { className: "font-semibold text-[14px]", children: "Signal History" }),
                                f("div", {
                                  className: "mt-3 space-y-2 max-h-[220px] overflow-y-auto",
                                  children: signalHistory.filter((item) => item.symbol === d).slice(0, 10).map((item, index) =>
                                    f("div", {
                                      className: "flex items-center justify-between text-[11px] font-mono border-b border-zinc-800/60 pb-2",
                                      children: [
                                        a("span", { className: item.signal === "LONG" ? "text-emerald-400" : item.signal === "SHORT" ? "text-rose-400" : "text-amber-400", children: `${item.signal} • ${item.timeframe.toUpperCase()}` }),
                                        a("span", { className: "text-zinc-500", children: new Date(item.recordedAt || item.calculatedAt).toLocaleTimeString("bg-BG").slice(0, 5) }),
                                      ],
                                    }, `${item.recordedAt}-${index}`),
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  e === "ai" &&
                    f(Jr, {
                      children: [
                        f("div", {
                          className: "flex items-center gap-3",
                          children: [
                            a("div", {
                              className:
                                "w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center",
                              children: a(Rn, {
                                className: "w-5 h-5 text-white",
                              }),
                            }),
                            f("div", {
                              children: [
                                a("h2", {
                                  className:
                                    "text-[20px] font-bold tracking-tight leading-none",
                                  children: "Gemini AI • Количествен Асистент",
                                }),
                                a("div", {
                                  className:
                                    "text-[11px] font-mono text-zinc-500 mt-1",
                                  children:
                                    "LIVE SENTIMENT • AUTO-TRADING ENGINE • SIGNALS",
                                }),
                              ],
                            }),
                            a("div", {
                              className:
                                "ml-auto hidden lg:flex items-center gap-2",
                              children: a("span", {
                                className: `px-3 py-1.5 rounded-xl text-[11px] font-bold border ${Qe ? "bg-emerald-950 border-emerald-700 text-emerald-300" : "bg-zinc-900 border-zinc-800 text-zinc-500"}`,
                                children: Qe
                                  ? "АВТО ТЪРГОВИЯ: ВКЛ."
                                  : "АВТО ТЪРГОВИЯ: ИЗКЛ.",
                              }),
                            }),
                          ],
                        }),
                        f("div", {
                          className: "grid lg:grid-cols-[0.9fr_1.1fr] gap-4",
                          children: [
                            f("div", {
                              className: "space-y-4",
                              children: [
                                f("div", {
                                  className:
                                    "rounded-[20px] bg-zinc-900 border border-zinc-800 p-5",
                                  children: [
                                    f("div", {
                                      className:
                                        "flex items-center justify-between",
                                      children: [
                                        a("span", {
                                          className:
                                            "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                          children: "Пазарен Сентимент",
                                        }),
                                        f("span", {
                                          className: `text-[11px] font-bold px-2 py-1 rounded-lg ${ct > 60 ? "bg-emerald-950 text-emerald-300" : ct < 40 ? "bg-rose-950 text-rose-300" : "bg-zinc-800 text-zinc-400"}`,
                                          children: [
                                            ct > 60
                                              ? "BULLISH"
                                              : ct < 40
                                                ? "BEARISH"
                                                : "NEUTRAL",
                                            " ",
                                            ct.toFixed(0),
                                            "%",
                                          ],
                                        }),
                                      ],
                                    }),
                                    f("div", {
                                      className:
                                        "mt-4 h-3 rounded-full bg-zinc-800 overflow-hidden flex",
                                      children: [
                                        a("div", {
                                          className:
                                            "h-full bg-gradient-to-r from-rose-500 to-zinc-600",
                                          style: { width: `${100 - ct}%` },
                                        }),
                                        a("div", {
                                          className:
                                            "h-full bg-gradient-to-r from-zinc-600 to-emerald-500",
                                          style: { width: `${ct}%` },
                                        }),
                                      ],
                                    }),
                                    f("div", {
                                      className:
                                        "mt-2 flex justify-between text-[10px] font-mono text-zinc-500",
                                      children: [
                                        a("span", { children: "BEARISH" }),
                                        a("span", { children: "NEUTRAL" }),
                                        a("span", { children: "BULLISH" }),
                                      ],
                                    }),
                                    f("div", {
                                      className: "mt-6",
                                      children: [
                                        a("div", {
                                          className:
                                            "text-[12px] font-semibold",
                                          children: "AI Сигнали • Live",
                                        }),
                                        a("div", {
                                          className: "mt-3 space-y-2.5",
                                          children: lf.map((c) =>
                                            f(
                                              "div",
                                              {
                                                className:
                                                  "rounded-xl bg-[#101015] border border-zinc-800 p-3 flex gap-3",
                                                children: [
                                                  a("div", {
                                                    className: `w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[11px] ${c.side === "LONG" ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-rose-950 text-rose-300 border border-rose-800"}`,
                                                    children: c.side,
                                                  }),
                                                  f("div", {
                                                    className: "flex-1",
                                                    children: [
                                                      f("div", {
                                                        className:
                                                          "flex items-center gap-2",
                                                        children: [
                                                          f("span", {
                                                            className:
                                                              "font-semibold text-[13px]",
                                                            children: [
                                                              c.symbol,
                                                              " ",
                                                              c.side,
                                                            ],
                                                          }),
                                                          f("span", {
                                                            className:
                                                              "text-[11px] px-1.5 py-0.5 rounded bg-violet-950 text-violet-300 font-mono border border-violet-800",
                                                            children: [
                                                              c.conf,
                                                              "% увереност",
                                                            ],
                                                          }),
                                                          a("span", {
                                                            className:
                                                              "text-[10px] font-mono text-zinc-500 ml-auto",
                                                            children: c.time,
                                                          }),
                                                        ],
                                                      }),
                                                      a("div", {
                                                        className:
                                                          "text-[11px] text-zinc-400 mt-1 leading-relaxed",
                                                        children: c.reason,
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              },
                                              c.id,
                                            ),
                                          ),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                f("div", {
                                  className:
                                    "rounded-[20px] bg-zinc-900 border border-zinc-800 p-5",
                                  children: [
                                    f("div", {
                                      className:
                                        "text-[12px] font-semibold flex items-center gap-2",
                                      children: [
                                        a(In, {
                                          className: "w-4 h-4 text-violet-400",
                                        }),
                                        " Gemini Анализ • Чат",
                                      ],
                                    }),
                                    f("div", {
                                      className:
                                        "mt-3 rounded-xl bg-[#0a0a0f] border border-zinc-800 p-4 min-h-[120px]",
                                      children: [
                                        f("div", {
                                          className: "flex gap-2",
                                          children: [
                                            a("div", {
                                              className:
                                                "w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center text-[10px] font-bold",
                                              children: "G",
                                            }),
                                            a("div", {
                                              className:
                                                "flex-1 text-[12.5px] leading-relaxed text-zinc-300",
                                              children: of,
                                            }),
                                          ],
                                        }),
                                        f("div", {
                                          className: "mt-4 flex gap-2",
                                          children: [
                                            a("input", {
                                              id: "aiQuestion",
                                              placeholder:
                                                "Попитай Gemini за пазара...",
                                              className:
                                                "flex-1 h-9 rounded-xl bg-zinc-900 border border-zinc-800 px-3 text-[12px] outline-none focus:border-violet-700",
                                              onKeyDown: (c) => {
                                                if (c.key === "Enter") {
                                                  askGemini(c.target.value);
                                                  c.target.value = "";
                                                }
                                              },
                                            }),
                                            a("button", {
                                              onClick: () => {
                                                const input = document.getElementById("aiQuestion");
                                                if (input) {
                                                  askGemini(input.value);
                                                  input.value = "";
                                                }
                                              },
                                              className:
                                                "h-9 px-3 rounded-xl bg-violet-600 text-white text-[12px] font-semibold disabled:opacity-50",
                                              disabled: aiLoading,
                                              children: aiLoading ? "Анализ..." : "Изпрати",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            f("div", {
                              className:
                                "rounded-[24px] bg-[#0f0f12] border border-zinc-800 p-5 lg:p-6 space-y-6",
                              children: [
                                f("div", {
                                  className:
                                    "flex items-center justify-between",
                                  children: [
                                    f("h3", {
                                      className:
                                        "font-semibold text-[14px] flex items-center gap-2",
                                      children: [
                                        a(Xr, { className: "w-4 h-4" }),
                                        " Конфигурация на Бота",
                                      ],
                                    }),
                                    f("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        a("span", {
                                          className:
                                            "text-[11px] text-zinc-500 font-mono",
                                          children: "Автономна Търговия",
                                        }),
                                        a("button", {
                                                          disabled: true,
                                          className: `w-12 h-7 rounded-full p-1 transition ${Qe ? "bg-emerald-500" : "bg-zinc-700"}`,
                                          children: a("div", {
                                            className: `w-5 h-5 rounded-full bg-white shadow transition ${Qe ? "translate-x-5" : ""}`,
                                          }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                f("div", {
                                  children: [
                                    f("div", {
                                      className: "grid grid-cols-2 gap-3",
                                      children: [
                                        f("div", {
                                          className: "rounded-xl bg-zinc-900 border border-zinc-800 p-4",
                                          children: [
                                            a("div", {
                                              className: "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                              children: "Paper Win Rate",
                                            }),
                                            a("div", {
                                              className: "mt-2 font-mono text-xl font-bold text-emerald-300",
                                              children: portfolioMetrics?.winRate === null || portfolioMetrics?.winRate === undefined
                                                ? "--"
                                                : `${portfolioMetrics.winRate.toFixed(1)}%`,
                                            }),
                                            a("div", {
                                              className: "mt-1 text-[11px] text-zinc-500",
                                              children: portfolioMetrics
                                                ? `${portfolioMetrics.winningTrades} печеливши / ${portfolioMetrics.closedTrades} затворени`
                                                : "Зареждане на trade history...",
                                            }),
                                          ],
                                        }),
                                        f("div", {
                                          className: "rounded-xl bg-zinc-900 border border-zinc-800 p-4",
                                          children: [
                                            a("div", {
                                              className: "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                              children: "AI Execution",
                                            }),
                                            a("div", {
                                              className: "mt-2 font-mono text-xl font-bold text-zinc-400",
                                              children: "DISABLED",
                                            }),
                                            a("div", {
                                              className: "mt-1 text-[11px] text-zinc-500",
                                              children: "Само анализи и paper orders",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    f("div", {
                                      className:
                                        "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                      children: "Рисков Профил",
                                    }),
                                    a("div", {
                                      className: "mt-3 grid grid-cols-3 gap-2",
                                      children: [
                                        "Conservative",
                                        "Balanced",
                                        "Aggressive",
                                      ].map((c) =>
                                        a(
                                          "button",
                                          {
                                            onClick: () => jd(c),
                                            className: `h-12 rounded-xl border text-[12px] font-semibold transition ${en === c ? "bg-white text-black border-white" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"}`,
                                            children:
                                              c === "Conservative"
                                                ? "Консервативен"
                                                : c === "Balanced"
                                                  ? "Балансиран"
                                                  : "Агресивен",
                                          },
                                          c,
                                        ),
                                      ),
                                    }),
                                    f("div", {
                                      className:
                                        "mt-2 text-[11px] text-zinc-500",
                                      children: [
                                        en === "Conservative" &&
                                          "• Макс. 1% риск на сделка • Само BTC/ETH",
                                        en === "Balanced" &&
                                          "• Макс. 2.5% риск • Вкл. SOL/AVAX • TP 25%",
                                        en === "Aggressive" &&
                                          "• Макс. 5% риск • Всички активи + Short • Висока честота",
                                      ],
                                    }),
                                  ],
                                }),
                                f("div", {
                                  className: "grid grid-cols-2 gap-4",
                                  children: [
                                    f("div", {
                                      className:
                                        "rounded-xl bg-zinc-900 border border-zinc-800 p-4",
                                      children: [
                                        f("div", {
                                          className: "flex justify-between",
                                          children: [
                                            a("span", {
                                              className:
                                                "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                              children: "Целева Печалба",
                                            }),
                                            f("span", {
                                              className:
                                                "font-mono text-[12px] font-bold text-emerald-300",
                                              children: [ea, "%"],
                                            }),
                                          ],
                                        }),
                                        a("input", {
                                          type: "range",
                                          min: 5,
                                          max: 100,
                                          value: ea,
                                          onChange: (c) =>
                                            ef(parseInt(c.target.value)),
                                          className:
                                            "w-full mt-3 accent-emerald-500",
                                        }),
                                        f("div", {
                                          className:
                                            "flex justify-between text-[10px] font-mono text-zinc-600 mt-1",
                                          children: [
                                            a("span", { children: "5%" }),
                                            a("span", { children: "100%" }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    f("div", {
                                      className:
                                        "rounded-xl bg-zinc-900 border border-zinc-800 p-4",
                                      children: [
                                        f("div", {
                                          className: "flex justify-between",
                                          children: [
                                            a("span", {
                                              className:
                                                "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                              children: "Стоп Лос",
                                            }),
                                            f("span", {
                                              className:
                                                "font-mono text-[12px] font-bold text-rose-300",
                                              children: [ta, "%"],
                                            }),
                                          ],
                                        }),
                                        a("input", {
                                          type: "range",
                                          min: 1,
                                          max: 30,
                                          value: ta,
                                          onChange: (c) =>
                                            tf(parseInt(c.target.value)),
                                          className:
                                            "w-full mt-3 accent-rose-500",
                                        }),
                                        f("div", {
                                          className:
                                            "flex justify-between text-[10px] font-mono text-zinc-600 mt-1",
                                          children: [
                                            a("span", { children: "1%" }),
                                            a("span", { children: "30%" }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                f("div", {
                                  className:
                                    "rounded-xl bg-gradient-to-br from-violet-950/50 to-zinc-900 border border-violet-900/30 p-4",
                                  children: [
                                    f("div", {
                                      className:
                                        "text-[11px] uppercase tracking-widest text-violet-300 font-semibold flex items-center gap-2",
                                      children: [
                                        a(An, { className: "w-3.5 h-3.5" }),
                                        " Логове от Бота",
                                      ],
                                    }),
                                    f("div", {
                                      className:
                                        "mt-3 space-y-1.5 max-h-[180px] overflow-y-auto font-mono text-[11px]",
                                      children: [
                                        Un.length === 0 &&
                                          a("div", {
                                            className: "text-zinc-500",
                                            children:
                                              "Няма изпълнени сделки от AI. Автономното изпълнение е изключено.",
                                          }),
                                        Un.map((c) =>
                                          f(
                                            "div",
                                            {
                                              className:
                                                "py-1 border-b border-zinc-800/50 last:border-0 flex gap-2",
                                              children: [
                                                f("span", {
                                                  className: "text-zinc-600",
                                                  children: [
                                                    "[",
                                                    new Date().toLocaleTimeString(
                                                      "bg-BG",
                                                    ),
                                                    "]",
                                                  ],
                                                }),
                                                a("span", {
                                                  className:
                                                    c.type === "buy"
                                                      ? "text-emerald-300"
                                                      : c.type === "sell"
                                                        ? "text-rose-300"
                                                        : "text-zinc-300",
                                                  children: c.text,
                                                }),
                                              ],
                                            },
                                            c.id,
                                          ),
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
                                f("div", {
                                  className:
                                    "rounded-xl bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between",
                                  children: [
                                    f("div", {
                                      children: [
                                        a("div", {
                                          className:
                                            "text-[12px] font-semibold",
                                          children: "Gemini Модел",
                                        }),
                                        a("div", {
                                          className:
                                            "text-[11px] text-zinc-500",
                                          children:
                                            "gemini-1.5-pro • Quant • Temp 0.3",
                                        }),
                                      ],
                                    }),
                                    f("div", {
                                      className: "text-right",
                                      children: [
                                        a("div", {
                                          className:
                                            "text-[11px] text-zinc-500",
                                          children: "Win Rate",
                                        }),
                                        a("div", {
                                          className:
                                            "font-mono text-sm font-bold text-emerald-400",
                                          children: "Paper only",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  e === "security" &&
                    f("div", {
                      className: "grid lg:grid-cols-[1fr_1fr] gap-4",
                      children: [
                        f("div", {
                          className: "space-y-4",
                          children: [
                            f("div", {
                              className:
                                "rounded-[20px] bg-zinc-900 border border-zinc-800 p-5",
                              children: [
                                f("h3", {
                                  className:
                                    "font-semibold text-[14px] flex items-center gap-2",
                                  children: [
                                    a(Bn, {
                                      className: "w-4 h-4 text-violet-400",
                                    }),
                                    " Web3 Портфейл",
                                  ],
                                }),
                                a("p", {
                                  className: "text-[12px] text-zinc-500 mt-1",
                                  children:
                                    "Свържи децентрализиран портфейл за DeFi операции и директен трансфер.",
                                }),
                                a("div", {
                                  className: "mt-4 grid gap-2",
                                  children: [
                                    {
                                      id: "metamask",
                                      name: "MetaMask",
                                      icon: "\uD83E\uDD8A",
                                      color: "bg-orange-950 border-orange-800",
                                    },
                                    {
                                      id: "walletconnect",
                                      name: "WalletConnect",
                                      icon: "\uD83D\uDD17",
                                      color: "bg-blue-950 border-blue-800",
                                    },
                                    {
                                      id: "phantom",
                                      name: "Phantom",
                                      icon: "\uD83D\uDC7B",
                                      color: "bg-purple-950 border-purple-800",
                                    },
                                  ].map((c) =>
                                    f(
                                      "button",
                                      {
                                        onClick: c.id === "metamask" ? connectMetaMask : c.id === "walletconnect" ? connectWalletConnect : connectPhantom,
                                        className: `h-[56px] rounded-xl border flex items-center gap-3 px-4 text-left transition ${Vn === c.id ? `${c.color} text-white` : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"}`,
                                        children: [
                                          a("span", {
                                            className: "text-xl",
                                            children: c.icon,
                                          }),
                                          a("span", {
                                            className:
                                              "font-medium text-[13px]",
                                            children: c.name,
                                          }),
                                          a("span", {
                                            className:
                                              "ml-auto text-[11px] font-mono px-2 py-1 rounded-lg bg-black/20",
                                            children:
                                              Vn === c.id
                                                ? "Свързан ✓"
                                                : "Свържи",
                                          }),
                                        ],
                                      },
                                      c.id,
                                    ),
                                  ),
                                }),
                                walletAddress &&
                                  f("div", {
                                    className:
                                      "mt-4 rounded-xl bg-zinc-800 border border-zinc-700 p-3 font-mono text-[11px]",
                                    children: [
                                      a("div", {
                                        className: "text-zinc-400",
                                        children: "Адрес",
                                      }),
                                      f("div", {
                                        className:
                                          "mt-1 text-zinc-200 break-all",
                                        children: [
                                          `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)} • ${walletName || "Wallet"} • Chain ID: ${walletChainId || "--"}`,
                                        ],
                                      }),
                                      a("div", {
                                        className: "mt-2 flex gap-2",
                                        children: a("span", {
                                          className:
                                            "px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800",
                                          children: walletBalance ? `Баланс: ${walletBalance} ${walletCurrency}` : `Баланс: недостъпен от provider`,
                                        }),
                                      }),
                                      walletError && a("div", { className: "mt-2 text-rose-300", children: walletError }),
                                    ],
                                  }),
                              ],
                            }),
                            f("div", {
                              className:
                                "rounded-[20px] bg-zinc-900 border border-zinc-800 p-5",
                              children: [
                                f("h3", {
                                  className:
                                    "font-semibold text-[14px] flex items-center gap-2",
                                  children: [
                                    a(Ft, {
                                      className: "w-4 h-4 text-emerald-400",
                                    }),
                                    " App Lock & ПИН",
                                  ],
                                }),
                                a("p", {
                                  className: "text-[12px] text-zinc-500 mt-1",
                                  children:
                                    "Защита на личните финансови данни с 4-цифрен ПИН код.",
                                }),
                                f("div", {
                                  className: "mt-4",
                                  children: [
                                    a("label", {
                                      className:
                                        "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                      children: "Задай нов ПИН (4 цифри)",
                                    }),
                                    f("div", {
                                      className: "mt-2 flex gap-2",
                                      children: [
                                        a("input", {
                                          value: qr,
                                          onChange: (c) =>
                                            ra(
                                              c.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 4),
                                            ),
                                          placeholder: "••••",
                                          className:
                                            "flex-1 h-11 rounded-xl bg-zinc-800 border border-zinc-700 px-4 font-mono text-center tracking-[0.4em] text-lg outline-none focus:border-violet-600",
                                        }),
                                        a("button", {
                                          onClick: () => {
                                            if (qr.length === 4)
                                              (af(qr),
                                                ra(""),
                                                We((c) =>
                                                  [
                                                    {
                                                      id: Date.now().toString(),
                                                      text: `ПИН обновен на ${qr}`,
                                                      type: "info",
                                                    },
                                                    ...c,
                                                  ].slice(0, 5),
                                                ));
                                          },
                                          className:
                                            "h-11 px-5 rounded-xl bg-white text-black font-semibold text-[13px]",
                                          children: "Запази",
                                        }),
                                      ],
                                    }),
                                    f("div", {
                                      className: "mt-3 flex gap-2",
                                      children: [
                                        f("button", {
                                          onClick: () => Ci(!0),
                                          className:
                                            "flex-1 h-10 rounded-xl bg-zinc-800 border border-zinc-700 text-[12px] font-medium hover:bg-zinc-700 flex items-center justify-center gap-2",
                                          children: [
                                            a(Ft, { className: "w-4 h-4" }),
                                            " Заключи сега",
                                          ],
                                        }),
                                        f("span", {
                                          className:
                                            "flex items-center text-[11px] font-mono text-zinc-500",
                                          children: [
                                            "Текущ ПИН: ",
                                            la.replace(/./g, "•"),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        f("div", {
                          className:
                            "rounded-[20px] bg-[#0f0f12] border border-zinc-800 p-5",
                          children: [
                            f("h3", {
                              className:
                                "font-semibold text-[14px] flex items-center gap-2",
                              children: [
                                a(qt, { className: "w-4 h-4 text-amber-400" }),
                                " Аларми за Волатилност & Ценови Цели",
                              ],
                            }),
                            a("p", {
                              className: "text-[12px] text-zinc-500 mt-1",
                              children:
                                "Задай праг на волатилност (%) и персонализирани ценови известия (ABOVE / BELOW).",
                            }),
                            f("div", {
                              className:
                                "mt-5 rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-3",
                              children: [
                                f("div", {
                                  className: "grid grid-cols-2 gap-3",
                                  children: [
                                    f("div", {
                                      children: [
                                        a("label", {
                                          className:
                                            "text-[11px] text-zinc-500 uppercase tracking-widest font-semibold",
                                          children: "Актив",
                                        }),
                                        a("select", {
                                          value: ye.symbol,
                                          onChange: (c) =>
                                            Qn({
                                              ...ye,
                                              symbol: c.target.value,
                                            }),
                                          className:
                                            "mt-1 w-full h-10 rounded-xl bg-zinc-800 border border-zinc-700 px-3 text-[13px] outline-none",
                                          children: Object.keys(n).map((c) =>
                                            a(
                                              "option",
                                              { value: c, children: c },
                                              c,
                                            ),
                                          ),
                                        }),
                                      ],
                                    }),
                                    f("div", {
                                      children: [
                                        a("label", {
                                          className:
                                            "text-[11px] text-zinc-500 uppercase tracking-widest font-semibold",
                                          children: "Условие",
                                        }),
                                        f("select", {
                                          value: ye.condition,
                                          onChange: (c) =>
                                            Qn({
                                              ...ye,
                                              condition: c.target.value,
                                            }),
                                          className:
                                            "mt-1 w-full h-10 rounded-xl bg-zinc-800 border border-zinc-700 px-3 text-[13px] outline-none",
                                          children: [
                                            a("option", {
                                              value: "ABOVE",
                                              children: "ABOVE (над)",
                                            }),
                                            a("option", {
                                              value: "BELOW",
                                              children: "BELOW (под)",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                f("div", {
                                  className: "grid grid-cols-2 gap-3",
                                  children: [
                                    f("div", {
                                      children: [
                                        a("label", {
                                          className:
                                            "text-[11px] text-zinc-500 uppercase tracking-widest font-semibold",
                                          children: "Ценова цел $",
                                        }),
                                        a("input", {
                                          value: ye.target,
                                          onChange: (c) =>
                                            Qn({
                                              ...ye,
                                              target: c.target.value,
                                            }),
                                          placeholder: "70000",
                                          className:
                                            "mt-1 w-full h-10 rounded-xl bg-zinc-800 border border-zinc-700 px-3 font-mono text-[13px] outline-none",
                                        }),
                                      ],
                                    }),
                                    f("div", {
                                      children: [
                                        a("label", {
                                          className:
                                            "text-[11px] text-zinc-500 uppercase tracking-widest font-semibold",
                                          children: "Волатилност %",
                                        }),
                                        a("input", {
                                          value: ye.vol,
                                          onChange: (c) =>
                                            Qn({ ...ye, vol: c.target.value }),
                                          placeholder: "5",
                                          className:
                                            "mt-1 w-full h-10 rounded-xl bg-zinc-800 border border-zinc-700 px-3 font-mono text-[13px] outline-none",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                a("button", {
                                  onClick: () => {
                                    if (!ye.target) return;
                                    fetch("/api/alerts", {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({
                                        symbol: ye.symbol,
                                        type: "PRICE",
                                        condition: ye.condition,
                                        target: parseFloat(ye.target),
                                        volatilityThreshold: parseFloat(ye.vol) || 5,
                                      }),
                                    })
                                      .then((response) => response.json().then((result) => ({ response, result })))
                                      .then(({ response, result }) => {
                                        if (!response.ok) throw new Error(result.error || "Alert creation failed");
                                        _i(result.alerts || [...tn, result.alert]);
                                        Qn({ ...ye, target: "" });
                                        We((current) => [
                                          {
                                            id: Date.now().toString(),
                                            text: `Аларма ${result.alert.symbol} ${result.alert.condition} $${result.alert.target} създадена`,
                                            type: "info",
                                          },
                                          ...current,
                                        ].slice(0, 5));
                                      })
                                      .catch((error) => We((current) => [
                                        { id: Date.now().toString(), text: error.message, type: "info" },
                                        ...current,
                                      ].slice(0, 5)));
                                  },
                                  className:
                                    "w-full h-11 rounded-xl bg-violet-600 text-white font-semibold text-[13px] hover:bg-violet-500",
                                  children: "+ Добави Аларма",
                                }),
                              ],
                            }),
                            f("div", {
                              className: "mt-5 space-y-2",
                              children: [
                                f("div", {
                                  className:
                                    "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                  children: ["Активни Аларми • ", tn.length],
                                }),
                                tn.map((c) =>
                                  f(
                                    "div",
                                    {
                                      className:
                                        "flex items-center gap-3 rounded-xl bg-zinc-900 border border-zinc-800 p-3",
                                      children: [
                                        a("div", {
                                          className:
                                            "w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center font-bold text-[11px]",
                                          children: c.symbol,
                                        }),
                                        f("div", {
                                          className: "flex-1",
                                          children: [
                                            f("div", {
                                              className:
                                                "text-[13px] font-medium",
                                              children: [
                                                c.symbol,
                                                " ",
                                                c.condition,
                                                " $",
                                                c.target.toLocaleString(),
                                                " • Вол ",
                                                c.vol,
                                                "%",
                                              ],
                                            }),
                                            f("div", {
                                              className:
                                                "text-[11px] text-zinc-500 font-mono",
                                              children: [
                                                "Тригер: ",
                                                (c.target * 0.998).toFixed(2),
                                                " - ",
                                                (c.target * 1.002).toFixed(2),
                                              ],
                                            }),
                                          ],
                                        }),
                                        a("button", {
                                          onClick: () =>
                                            fetch(`/api/alerts/${c.id}`, {
                                              method: "PATCH",
                                              headers: { "Content-Type": "application/json" },
                                              body: JSON.stringify({ enabled: !c.enabled }),
                                            })
                                              .then((response) => response.json())
                                              .then((result) => {
                                                if (result.alert) _i(tn.map((item) => item.id === c.id ? result.alert : item));
                                              }),
                                          className: `w-10 h-6 rounded-full p-1 transition ${c.enabled ? "bg-emerald-500" : "bg-zinc-700"}`,
                                          children: a("div", {
                                            className: `w-4 h-4 rounded-full bg-white transition ${c.enabled ? "translate-x-4" : ""}`,
                                          }),
                                        }),
                                        a("button", {
                                          onClick: () =>
                                            fetch(`/api/alerts/${c.id}`, { method: "DELETE" })
                                              .then((response) => response.json())
                                              .then((result) => _i(result.alerts || tn.filter((item) => item.id !== c.id))),
                                          className:
                                            "w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700",
                                          children: a(jt, {
                                            className: "w-4 h-4",
                                          }),
                                        }),
                                      ],
                                    },
                                    c.id,
                                  ),
                                ),
                              ],
                            }),
                            f("div", {
                              className:
                                "mt-6 rounded-xl bg-amber-950/30 border border-amber-800/30 p-3 flex gap-2",
                              children: [
                                a(qt, {
                                  className:
                                    "w-4 h-4 text-amber-400 shrink-0 mt-0.5",
                                }),
                                a("div", {
                                  className:
                                    "text-[11px] leading-relaxed text-amber-200/80",
                                  children:
                                    "Алармите се проверяват от backend с реални Binance данни. In-app известията се показват при ново събитие; webhook може да се конфигурира през API.",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                ],
              }),
              s &&
                a("div", {
                  className:
                    "fixed inset-0 z-[80] bg-black/70 backdrop-blur-xl flex items-center justify-center p-4",
                  children: f("div", {
                    className:
                      "w-full max-w-[460px] rounded-[24px] bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden animate-[scaleIn_0.2s_ease]",
                    children: [
                      f("div", {
                        className:
                          "p-6 border-b border-zinc-800 flex items-center justify-between",
                        children: [
                          f("div", {
                            children: [
                              a("h3", {
                                className: "font-semibold text-[16px]",
                                children: "Депозит • USD",
                              }),
                              a("p", {
                                className: "text-[12px] text-zinc-500 mt-1",
                                children: "Добави средства към кеш баланса",
                              }),
                            ],
                          }),
                          a("button", {
                            onClick: () => p(!1),
                            className:
                              "w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center hover:bg-zinc-700",
                            children: a(jt, { className: "w-5 h-5" }),
                          }),
                        ],
                      }),
                      f("div", {
                        className: "p-6 space-y-5",
                        children: [
                          f("div", {
                            children: [
                              a("div", {
                                className:
                                  "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                children: "Метод на Плащане",
                              }),
                              a("div", {
                                className: "mt-3 grid grid-cols-2 gap-2",
                                children: [
                                  {
                                    name: "Кредитна/Дебитна Карта",
                                    icon: "\uD83D\uDCB3",
                                  },
                                  {
                                    name: "Банков Превод ACH/SEPA",
                                    icon: "\uD83C\uDFE6",
                                  },
                                  {
                                    name: "Apple/Google Pay",
                                    icon: "\uD83D\uDCF1",
                                  },
                                  { name: "Крипто Уайр USDT", icon: "₮" },
                                ].map((c) =>
                                  f(
                                    "button",
                                    {
                                      onClick: () => y(c.name),
                                      className: `h-[56px] rounded-xl border text-left px-3 flex items-center gap-2.5 transition ${h === c.name ? "bg-white text-black border-white" : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"}`,
                                      children: [
                                        a("span", {
                                          className: "text-lg",
                                          children: c.icon,
                                        }),
                                        a("span", {
                                          className:
                                            "text-[12px] font-medium leading-tight",
                                          children: c.name,
                                        }),
                                      ],
                                    },
                                    c.name,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          f("div", {
                            children: [
                              a("div", {
                                className:
                                  "text-[11px] uppercase tracking-widest text-zinc-500 font-semibold",
                                children: "Бързи Суми",
                              }),
                              a("div", {
                                className: "mt-3 grid grid-cols-4 gap-2",
                                children: [100, 500, 1000, 5000].map((c) =>
                                  f(
                                    "button",
                                    {
                                      onClick: () => S(c),
                                      className: `h-10 rounded-xl border font-mono text-[13px] font-semibold ${g === c ? "bg-violet-600 border-violet-500 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-300"}`,
                                      children: ["$", c],
                                    },
                                    c,
                                  ),
                                ),
                              }),
                              f("div", {
                                className: "mt-3 relative",
                                children: [
                                  a("input", {
                                    type: "number",
                                    value: g,
                                    onChange: (c) =>
                                      S(parseFloat(c.target.value) || 0),
                                    className:
                                      "w-full h-12 rounded-xl bg-zinc-800 border border-zinc-700 px-4 font-mono outline-none focus:border-violet-600",
                                  }),
                                  a("span", {
                                    className:
                                      "absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm",
                                    children: "USD",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          f("div", {
                            className:
                              "rounded-xl bg-[#0a0a0f] border border-zinc-800 p-3",
                            children: [
                              f("div", {
                                className:
                                  "flex items-center gap-2 text-[11px] font-mono text-zinc-500",
                                children: [
                                  a("div", {
                                    className: `w-2 h-2 rounded-full ${k === "processing" ? "bg-amber-400 animate-pulse" : k === "success" ? "bg-emerald-400" : "bg-zinc-600"}`,
                                  }),
                                  k === "idle" &&
                                    `Банка симулация • ${h} • Лимит $250k/ден`,
                                  k === "processing" &&
                                    "Обработка на плащането... Свързване с банката...",
                                  k === "success" &&
                                    "Успешно! Средствата са кредитирани.",
                                ],
                              }),
                              a("div", {
                                className:
                                  "mt-2 h-1.5 rounded-full bg-zinc-800 overflow-hidden",
                                children: a("div", {
                                  className: `h-full transition-all duration-1000 ${k === "processing" ? "w-[70%] bg-amber-500 animate-pulse" : k === "success" ? "w-full bg-emerald-500" : "w-[10%] bg-zinc-700"}`,
                                }),
                              }),
                            ],
                          }),
                          a("button", {
                            onClick: ff,
                            disabled: k !== "idle",
                            className:
                              "w-full h-12 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 disabled:opacity-50",
                            children:
                              k === "idle"
                                ? `Депозирай $${g}`
                                : k === "processing"
                                  ? "Обработка..."
                                  : "Завършено ✓",
                          }),
                          a("div", {
                            className: "text-[11px] text-zinc-500 text-center",
                            children:
                              "Сигурно криптиране • 3D Secure • Такса 0% за първи депозит",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
            ],
          }),
        ],
      }),
      a("style", {
        children: `
        @keyframes slideIn { from { transform: translateX(20px); opacity:0 } to { transform: translateX(0); opacity:1 } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes scaleIn { from { transform: scale(0.96); opacity:0 } to { transform: scale(1); opacity:1 } }
        .scrollbar-none::-webkit-scrollbar { display:none }
      `,
      }),
    ],
  });
}
qd.createRoot(document.getElementById("root")).render(
  a(Jd.default.StrictMode, { children: a(ju, {}) }),
);
