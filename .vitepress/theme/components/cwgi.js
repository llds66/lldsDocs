const Pt = (e, t) => e === t, ye = Symbol("solid-proxy"), it = Symbol("solid-track"), ze = {
  equals: Pt
};
let ht = $t;
const fe = 1, Fe = 2, pt = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var N = null;
let tt = null, Rt = null, B = null, q = null, ae = null, Qe = 0;
function Ne(e, t) {
  const n = B, i = N, r = e.length === 0, o = t === void 0 ? i : t, c = r ? pt : {
    owned: null,
    cleanups: null,
    context: o ? o.context : null,
    owner: o
  }, s = r ? e : () => e(() => ge(() => et(c)));
  N = c, B = null;
  try {
    return Se(s, !0);
  } finally {
    B = n, N = i;
  }
}
function je(e, t) {
  t = t ? Object.assign({}, ze, t) : ze;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, i = (r) => (typeof r == "function" && (r = r(n.value)), yt(n, r));
  return [bt.bind(n), i];
}
function F(e, t, n) {
  const i = ct(e, t, !1, fe);
  Re(i);
}
function Oe(e, t, n) {
  ht = Wt;
  const i = ct(e, t, !1, fe);
  i.user = !0, ae ? ae.push(i) : Re(i);
}
function L(e, t, n) {
  n = n ? Object.assign({}, ze, n) : ze;
  const i = ct(e, t, !0, 0);
  return i.observers = null, i.observerSlots = null, i.comparator = n.equals || void 0, Re(i), bt.bind(i);
}
function Ut(e) {
  return Se(e, !1);
}
function ge(e) {
  if (B === null) return e();
  const t = B;
  B = null;
  try {
    return e();
  } finally {
    B = t;
  }
}
function We(e, t, n) {
  const i = Array.isArray(e);
  let r;
  return (o) => {
    let c;
    if (i) {
      c = Array(e.length);
      for (let a = 0; a < e.length; a++) c[a] = e[a]();
    } else c = e();
    const s = ge(() => t(c, r, o));
    return r = c, s;
  };
}
function vt(e) {
  Oe(() => ge(e));
}
function Ht(e) {
  return N === null || (N.cleanups === null ? N.cleanups = [e] : N.cleanups.push(e)), e;
}
function rt() {
  return B;
}
function bt() {
  if (this.sources && this.state)
    if (this.state === fe) Re(this);
    else {
      const e = q;
      q = null, Se(() => Ye(this), !1), q = e;
    }
  if (B) {
    const e = this.observers ? this.observers.length : 0;
    B.sources ? (B.sources.push(this), B.sourceSlots.push(e)) : (B.sources = [this], B.sourceSlots = [e]), this.observers ? (this.observers.push(B), this.observerSlots.push(B.sources.length - 1)) : (this.observers = [B], this.observerSlots = [B.sources.length - 1]);
  }
  return this.value;
}
function yt(e, t, n) {
  let i = e.value;
  return (!e.comparator || !e.comparator(i, t)) && (e.value = t, e.observers && e.observers.length && Se(() => {
    for (let r = 0; r < e.observers.length; r += 1) {
      const o = e.observers[r], c = tt && tt.running;
      c && tt.disposed.has(o), (c ? !o.tState : !o.state) && (o.pure ? q.push(o) : ae.push(o), o.observers && xt(o)), c || (o.state = fe);
    }
    if (q.length > 1e6)
      throw q = [], new Error();
  }, !1)), t;
}
function Re(e) {
  if (!e.fn) return;
  et(e);
  const t = Qe;
  Bt(
    e,
    e.value,
    t
  );
}
function Bt(e, t, n) {
  let i;
  const r = N, o = B;
  B = N = e;
  try {
    i = e.fn(t);
  } catch (c) {
    return e.pure && (e.state = fe, e.owned && e.owned.forEach(et), e.owned = null), e.updatedAt = n + 1, kt(c);
  } finally {
    B = o, N = r;
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? yt(e, i) : e.value = i, e.updatedAt = n);
}
function ct(e, t, n, i = fe, r) {
  const o = {
    fn: e,
    state: i,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: N,
    context: N ? N.context : null,
    pure: n
  };
  return N === null || N !== pt && (N.owned ? N.owned.push(o) : N.owned = [o]), o;
}
function Ge(e) {
  if (e.state === 0) return;
  if (e.state === Fe) return Ye(e);
  if (e.suspense && ge(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Qe); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (e = t[n], e.state === fe)
      Re(e);
    else if (e.state === Fe) {
      const i = q;
      q = null, Se(() => Ye(e, t[0]), !1), q = i;
    }
}
function Se(e, t) {
  if (q) return e();
  let n = !1;
  t || (q = []), ae ? n = !0 : ae = [], Qe++;
  try {
    const i = e();
    return Nt(n), i;
  } catch (i) {
    n || (ae = null), q = null, kt(i);
  }
}
function Nt(e) {
  if (q && ($t(q), q = null), e) return;
  const t = ae;
  ae = null, t.length && Se(() => ht(t), !1);
}
function $t(e) {
  for (let t = 0; t < e.length; t++) Ge(e[t]);
}
function Wt(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const i = e[t];
    i.user ? e[n++] = i : Ge(i);
  }
  for (t = 0; t < n; t++) Ge(e[t]);
}
function Ye(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const i = e.sources[n];
    if (i.sources) {
      const r = i.state;
      r === fe ? i !== t && (!i.updatedAt || i.updatedAt < Qe) && Ge(i) : r === Fe && Ye(i, t);
    }
  }
}
function xt(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state || (n.state = Fe, n.pure ? q.push(n) : ae.push(n), n.observers && xt(n));
  }
}
function et(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), i = e.sourceSlots.pop(), r = n.observers;
      if (r && r.length) {
        const o = r.pop(), c = n.observerSlots.pop();
        i < r.length && (o.sourceSlots[c] = i, r[i] = o, n.observerSlots[i] = c);
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) et(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function zt(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function kt(e, t = N) {
  throw zt(e);
}
const Ft = Symbol("fallback");
function ut(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function Gt(e, t, n = {}) {
  let i = [], r = [], o = [], c = 0, s = t.length > 1 ? [] : null;
  return Ht(() => ut(o)), () => {
    let a = e() || [], u, l;
    return a[it], ge(() => {
      let g = a.length, v, x, M, p, W, S, O, E, C;
      if (g === 0)
        c !== 0 && (ut(o), o = [], i = [], r = [], c = 0, s && (s = [])), n.fallback && (i = [Ft], r[0] = Ne((j) => (o[0] = j, n.fallback())), c = 1);
      else if (c === 0) {
        for (r = new Array(g), l = 0; l < g; l++)
          i[l] = a[l], r[l] = Ne(d);
        c = g;
      } else {
        for (M = new Array(g), p = new Array(g), s && (W = new Array(g)), S = 0, O = Math.min(c, g); S < O && i[S] === a[S]; S++) ;
        for (O = c - 1, E = g - 1; O >= S && E >= S && i[O] === a[E]; O--, E--)
          M[E] = r[O], p[E] = o[O], s && (W[E] = s[O]);
        for (v = /* @__PURE__ */ new Map(), x = new Array(E + 1), l = E; l >= S; l--)
          C = a[l], u = v.get(C), x[l] = u === void 0 ? -1 : u, v.set(C, l);
        for (u = S; u <= O; u++)
          C = i[u], l = v.get(C), l !== void 0 && l !== -1 ? (M[l] = r[u], p[l] = o[u], s && (W[l] = s[u]), l = x[l], v.set(C, l)) : o[u]();
        for (l = S; l < g; l++)
          l in M ? (r[l] = M[l], o[l] = p[l], s && (s[l] = W[l], s[l](l))) : r[l] = Ne(d);
        r = r.slice(0, c = g), i = a.slice(0);
      }
      return r;
    });
    function d(g) {
      if (o[l] = g, s) {
        const [v, x] = je(l);
        return s[l] = x, t(a[l], v);
      }
      return t(a[l]);
    }
  };
}
let Yt = !1;
function R(e, t) {
  return ge(() => e(t || {}));
}
const Vt = (e) => `Stale read from <${e}>.`;
function Ct(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return L(Gt(() => e.each, e.children, t || void 0));
}
function qt(e) {
  const t = e.keyed, n = L(() => e.when, void 0, {
    equals: (i, r) => t ? i === r : !i == !r
  });
  return L(
    () => {
      const i = n();
      if (i) {
        const r = e.children;
        return typeof r == "function" && r.length > 0 ? ge(
          () => r(
            t ? i : () => {
              if (!ge(n)) throw Vt("Show");
              return e.when;
            }
          )
        ) : r;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
function Jt(e, t, n) {
  let i = n.length, r = t.length, o = i, c = 0, s = 0, a = t[r - 1].nextSibling, u = null;
  for (; c < r || s < o; ) {
    if (t[c] === n[s]) {
      c++, s++;
      continue;
    }
    for (; t[r - 1] === n[o - 1]; )
      r--, o--;
    if (r === c) {
      const l = o < i ? s ? n[s - 1].nextSibling : n[o - s] : a;
      for (; s < o; ) e.insertBefore(n[s++], l);
    } else if (o === s)
      for (; c < r; )
        (!u || !u.has(t[c])) && t[c].remove(), c++;
    else if (t[c] === n[o - 1] && n[s] === t[r - 1]) {
      const l = t[--r].nextSibling;
      e.insertBefore(n[s++], t[c++].nextSibling), e.insertBefore(n[--o], l), t[r] = n[o];
    } else {
      if (!u) {
        u = /* @__PURE__ */ new Map();
        let d = s;
        for (; d < o; ) u.set(n[d], d++);
      }
      const l = u.get(t[c]);
      if (l != null)
        if (s < l && l < o) {
          let d = c, g = 1, v;
          for (; ++d < r && d < o && !((v = u.get(t[d])) == null || v !== l + g); )
            g++;
          if (g > l - s) {
            const x = t[c];
            for (; s < l; ) e.insertBefore(n[s++], x);
          } else e.replaceChild(n[s++], t[c++]);
        } else c++;
      else t[c++].remove();
    }
  }
}
const dt = "_$DX_DELEGATE";
function Kt(e, t, n, i = {}) {
  let r;
  return Ne((o) => {
    r = o, t === document ? e() : k(t, e(), t.firstChild ? null : void 0, n);
  }, i.owner), () => {
    r(), t.textContent = "";
  };
}
function T(e, t, n) {
  let i;
  const r = () => {
    const c = document.createElement("template");
    return c.innerHTML = e, c.content.firstChild;
  }, o = () => (i || (i = r())).cloneNode(!0);
  return o.cloneNode = o, o;
}
function $e(e, t = window.document) {
  const n = t[dt] || (t[dt] = /* @__PURE__ */ new Set());
  for (let i = 0, r = e.length; i < r; i++) {
    const o = e[i];
    n.has(o) || (n.add(o), t.addEventListener(o, Xt));
  }
}
function ee(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function Ve(e, t, n = {}) {
  const i = Object.keys(t || {}), r = Object.keys(n);
  let o, c;
  for (o = 0, c = r.length; o < c; o++) {
    const s = r[o];
    !s || s === "undefined" || t[s] || (gt(e, s, !1), delete n[s]);
  }
  for (o = 0, c = i.length; o < c; o++) {
    const s = i[o], a = !!t[s];
    !s || s === "undefined" || n[s] === a || !a || (gt(e, s, !0), n[s] = a);
  }
  return n;
}
function k(e, t, n, i) {
  if (n !== void 0 && !i && (i = []), typeof t != "function") return qe(e, t, i, n);
  F((r) => qe(e, t(), r, n), i);
}
function gt(e, t, n) {
  const i = t.trim().split(/\s+/);
  for (let r = 0, o = i.length; r < o; r++)
    e.classList.toggle(i[r], n);
}
function Xt(e) {
  const t = `$$${e.type}`;
  let n = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== n && Object.defineProperty(e, "target", {
    configurable: !0,
    value: n
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return n || document;
    }
  }); n; ) {
    const i = n[t];
    if (i && !n.disabled) {
      const r = n[`${t}Data`];
      if (r !== void 0 ? i.call(n, r, e) : i.call(n, e), e.cancelBubble) return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function qe(e, t, n, i, r) {
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const o = typeof t, c = i !== void 0;
  if (e = c && n[0] && n[0].parentNode || e, o === "string" || o === "number")
    if (o === "number" && (t = t.toString()), c) {
      let s = n[0];
      s && s.nodeType === 3 ? s.data !== t && (s.data = t) : s = document.createTextNode(t), n = ke(e, n, i, s);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  else if (t == null || o === "boolean")
    n = ke(e, n, i);
  else {
    if (o === "function")
      return F(() => {
        let s = t();
        for (; typeof s == "function"; ) s = s();
        n = qe(e, s, n, i);
      }), () => n;
    if (Array.isArray(t)) {
      const s = [], a = n && Array.isArray(n);
      if (ot(s, t, n, r))
        return F(() => n = qe(e, s, n, i, !0)), () => n;
      if (s.length === 0) {
        if (n = ke(e, n, i), c) return n;
      } else a ? n.length === 0 ? ft(e, s, i) : Jt(e, n, s) : (n && ke(e), ft(e, s));
      n = s;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (c) return n = ke(e, n, i, t);
        ke(e, n, null, t);
      } else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function ot(e, t, n, i) {
  let r = !1;
  for (let o = 0, c = t.length; o < c; o++) {
    let s = t[o], a = n && n[e.length], u;
    if (!(s == null || s === !0 || s === !1)) if ((u = typeof s) == "object" && s.nodeType)
      e.push(s);
    else if (Array.isArray(s))
      r = ot(e, s, a) || r;
    else if (u === "function")
      if (i) {
        for (; typeof s == "function"; ) s = s();
        r = ot(
          e,
          Array.isArray(s) ? s : [s],
          Array.isArray(a) ? a : [a]
        ) || r;
      } else
        e.push(s), r = !0;
    else {
      const l = String(s);
      a && a.nodeType === 3 && a.data === l ? e.push(a) : e.push(document.createTextNode(l));
    }
  }
  return r;
}
function ft(e, t, n = null) {
  for (let i = 0, r = t.length; i < r; i++) e.insertBefore(t[i], n);
}
function ke(e, t, n, i) {
  if (n === void 0) return e.textContent = "";
  const r = i || document.createTextNode("");
  if (t.length) {
    let o = !1;
    for (let c = t.length - 1; c >= 0; c--) {
      const s = t[c];
      if (r !== s) {
        const a = s.parentNode === e;
        !o && !c ? a ? e.replaceChild(r, s) : e.insertBefore(r, n) : a && s.remove();
      } else o = !0;
    }
  } else e.insertBefore(r, n);
  return [r];
}
const Je = Symbol("store-raw"), Ce = Symbol("store-node"), le = Symbol("store-has"), It = Symbol("store-self");
function Mt(e) {
  let t = e[ye];
  if (!t && (Object.defineProperty(e, ye, {
    value: t = new Proxy(e, en)
  }), !Array.isArray(e))) {
    const n = Object.keys(e), i = Object.getOwnPropertyDescriptors(e);
    for (let r = 0, o = n.length; r < o; r++) {
      const c = n[r];
      i[c].get && Object.defineProperty(e, c, {
        enumerable: i[c].enumerable,
        get: i[c].get.bind(t)
      });
    }
  }
  return t;
}
function Ie(e) {
  let t;
  return e != null && typeof e == "object" && (e[ye] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function Me(e, t = /* @__PURE__ */ new Set()) {
  let n, i, r, o;
  if (n = e != null && e[Je]) return n;
  if (!Ie(e) || t.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
    for (let c = 0, s = e.length; c < s; c++)
      r = e[c], (i = Me(r, t)) !== r && (e[c] = i);
  } else {
    Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
    const c = Object.keys(e), s = Object.getOwnPropertyDescriptors(e);
    for (let a = 0, u = c.length; a < u; a++)
      o = c[a], !s[o].get && (r = e[o], (i = Me(r, t)) !== r && (e[o] = i));
  }
  return e;
}
function Ke(e, t) {
  let n = e[t];
  return n || Object.defineProperty(e, t, {
    value: n = /* @__PURE__ */ Object.create(null)
  }), n;
}
function Pe(e, t, n) {
  if (e[t]) return e[t];
  const [i, r] = je(n, {
    equals: !1,
    internal: !0
  });
  return i.$ = r, e[t] = i;
}
function Zt(e, t) {
  const n = Reflect.getOwnPropertyDescriptor(e, t);
  return !n || n.get || !n.configurable || t === ye || t === Ce || (delete n.value, delete n.writable, n.get = () => e[ye][t]), n;
}
function _t(e) {
  rt() && Pe(Ke(e, Ce), It)();
}
function Qt(e) {
  return _t(e), Reflect.ownKeys(e);
}
const en = {
  get(e, t, n) {
    if (t === Je) return e;
    if (t === ye) return n;
    if (t === it)
      return _t(e), n;
    const i = Ke(e, Ce), r = i[t];
    let o = r ? r() : e[t];
    if (t === Ce || t === le || t === "__proto__") return o;
    if (!r) {
      const c = Object.getOwnPropertyDescriptor(e, t);
      rt() && (typeof o != "function" || e.hasOwnProperty(t)) && !(c && c.get) && (o = Pe(i, t, o)());
    }
    return Ie(o) ? Mt(o) : o;
  },
  has(e, t) {
    return t === Je || t === ye || t === it || t === Ce || t === le || t === "__proto__" ? !0 : (rt() && Pe(Ke(e, le), t)(), t in e);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Qt,
  getOwnPropertyDescriptor: Zt
};
function _e(e, t, n, i = !1) {
  if (!i && e[t] === n) return;
  const r = e[t], o = e.length;
  n === void 0 ? (delete e[t], e[le] && e[le][t] && r !== void 0 && e[le][t].$()) : (e[t] = n, e[le] && e[le][t] && r === void 0 && e[le][t].$());
  let c = Ke(e, Ce), s;
  if ((s = Pe(c, t, r)) && s.$(() => n), Array.isArray(e) && e.length !== o) {
    for (let a = e.length; a < o; a++) (s = c[a]) && s.$();
    (s = Pe(c, "length", o)) && s.$(e.length);
  }
  (s = c[It]) && s.$();
}
function St(e, t) {
  const n = Object.keys(t);
  for (let i = 0; i < n.length; i += 1) {
    const r = n[i];
    _e(e, r, t[r]);
  }
}
function tn(e, t) {
  if (typeof t == "function" && (t = t(e)), t = Me(t), Array.isArray(t)) {
    if (e === t) return;
    let n = 0, i = t.length;
    for (; n < i; n++) {
      const r = t[n];
      e[n] !== r && _e(e, n, r);
    }
    _e(e, "length", i);
  } else St(e, t);
}
function Te(e, t, n = []) {
  let i, r = e;
  if (t.length > 1) {
    i = t.shift();
    const c = typeof i, s = Array.isArray(e);
    if (Array.isArray(i)) {
      for (let a = 0; a < i.length; a++)
        Te(e, [i[a]].concat(t), n);
      return;
    } else if (s && c === "function") {
      for (let a = 0; a < e.length; a++)
        i(e[a], a) && Te(e, [a].concat(t), n);
      return;
    } else if (s && c === "object") {
      const { from: a = 0, to: u = e.length - 1, by: l = 1 } = i;
      for (let d = a; d <= u; d += l)
        Te(e, [d].concat(t), n);
      return;
    } else if (t.length > 1) {
      Te(e[i], t, [i].concat(n));
      return;
    }
    r = e[i], n = [i].concat(n);
  }
  let o = t[0];
  typeof o == "function" && (o = o(r, n), o === r) || i === void 0 && o == null || (o = Me(o), i === void 0 || Ie(r) && Ie(o) && !Array.isArray(o) ? St(r, o) : _e(e, i, o));
}
function nn(...[e, t]) {
  const n = Me(e || {}), i = Array.isArray(n), r = Mt(n);
  function o(...c) {
    Ut(() => {
      i && c.length === 1 ? tn(n, c[0]) : Te(n, c);
    });
  }
  return [r, o];
}
const Xe = /* @__PURE__ */ new WeakMap(), At = {
  get(e, t) {
    if (t === Je) return e;
    const n = e[t];
    let i;
    return Ie(n) ? Xe.get(n) || (Xe.set(n, i = new Proxy(n, At)), i) : n;
  },
  set(e, t, n) {
    return _e(e, t, Me(n)), !0;
  },
  deleteProperty(e, t) {
    return _e(e, t, void 0, !0), !0;
  }
};
function Lt(e) {
  return (t) => {
    if (Ie(t)) {
      let n;
      (n = Xe.get(t)) || Xe.set(t, n = new Proxy(t, At)), e(n);
    }
    return t;
  };
}
const [rn, on] = nn({
  apiBase: "",
  mouseIsInsideWindow: !1,
  mouseIsInActionWindow: !1,
  sending_comment: !1,
  gettingComments: !1,
  userComment: "",
  user: {},
  gettingUser: !1,
  githubIssueId: "",
  comments: [],
  isUserLoggedIn: !1,
  proxy: "",
  reactingCommentID: [],
  listingReactionCommentIds: [],
  accessToken: "",
  deletingId: "",
  editingCommentId: "",
  editingCommentContent: "",
  commentActionDropdown: "",
  submittingEditedComment: !1,
  shouldUpdateCommentId: 0,
  commentReactionMap: {},
  reactingIds: [],
  shouldListReactionsForCommentId: 0,
  owner: "",
  repo: "",
  clientId: "",
  showReactions: !0,
  markdownRenderingEndpoint: void 0,
  renderMarkdown: void 0
});
function ce() {
  return [rn, on];
}
var sn = /* @__PURE__ */ T('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"stroke-width=2 stroke=currentColor fill=none stroke-linecap=round stroke-linejoin=round><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M12 3a9 9 0 1 0 9 9">');
function Ae(e = {}) {
  return (() => {
    var t = sn();
    return F((n) => {
      var i = "cwgi-animate-spin " + (e.class || " ") + (e.visible === !1 ? " cwgi-hidden" : ""), r = e.width || "24", o = e.height || "24";
      return i !== n.e && ee(t, "class", n.e = i), r !== n.t && ee(t, "width", n.t = r), o !== n.a && ee(t, "height", n.a = o), n;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), t;
  })();
}
var cn = /* @__PURE__ */ T('<section data-name="user loading"><div class="cwgi-flex cwgi-text-sm cwgi-justify-center cwgi-items-center cwgi-h-[32px]"><div>');
const [ln] = ce();
function an(e = {}) {
  return L(() => L(() => !!ln.gettingUser)() && (() => {
    var t = cn(), n = t.firstChild, i = n.firstChild;
    return k(i, R(Ae, {})), t;
  })());
}
var Dt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Et(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Tt = { exports: {} };
(function(e, t) {
  (function(n, i) {
    e.exports = i();
  })(Dt, function() {
    var n = 1e3, i = 6e4, r = 36e5, o = "millisecond", c = "second", s = "minute", a = "hour", u = "day", l = "week", d = "month", g = "quarter", v = "year", x = "date", M = "Invalid Date", p = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, W = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, S = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(b) {
      var m = ["th", "st", "nd", "rd"], f = b % 100;
      return "[" + b + (m[(f - 20) % 10] || m[f] || m[0]) + "]";
    } }, O = function(b, m, f) {
      var h = String(b);
      return !h || h.length >= m ? b : "" + Array(m + 1 - h.length).join(f) + b;
    }, E = { s: O, z: function(b) {
      var m = -b.utcOffset(), f = Math.abs(m), h = Math.floor(f / 60), w = f % 60;
      return (m <= 0 ? "+" : "-") + O(h, 2, "0") + ":" + O(w, 2, "0");
    }, m: function b(m, f) {
      if (m.date() < f.date()) return -b(f, m);
      var h = 12 * (f.year() - m.year()) + (f.month() - m.month()), w = m.clone().add(h, d), y = f - w < 0, $ = m.clone().add(h + (y ? -1 : 1), d);
      return +(-(h + (f - w) / (y ? w - $ : $ - w)) || 0);
    }, a: function(b) {
      return b < 0 ? Math.ceil(b) || 0 : Math.floor(b);
    }, p: function(b) {
      return { M: d, y: v, w: l, d: u, D: x, h: a, m: s, s: c, ms: o, Q: g }[b] || String(b || "").toLowerCase().replace(/s$/, "");
    }, u: function(b) {
      return b === void 0;
    } }, C = "en", j = {};
    j[C] = S;
    var te = "$isDayjsObject", Z = function(b) {
      return b instanceof Ue || !(!b || !b[te]);
    }, we = function b(m, f, h) {
      var w;
      if (!m) return C;
      if (typeof m == "string") {
        var y = m.toLowerCase();
        j[y] && (w = y), f && (j[y] = f, w = y);
        var $ = m.split("-");
        if (!w && $.length > 1) return b($[0]);
      } else {
        var A = m.name;
        j[A] = m, w = A;
      }
      return !h && w && (C = w), w || !h && C;
    }, U = function(b, m) {
      if (Z(b)) return b.clone();
      var f = typeof m == "object" ? m : {};
      return f.date = b, f.args = arguments, new Ue(f);
    }, I = E;
    I.l = we, I.i = Z, I.w = function(b, m) {
      return U(b, { locale: m.$L, utc: m.$u, x: m.$x, $offset: m.$offset });
    };
    var Ue = function() {
      function b(f) {
        this.$L = we(f.locale, null, !0), this.parse(f), this.$x = this.$x || f.x || {}, this[te] = !0;
      }
      var m = b.prototype;
      return m.parse = function(f) {
        this.$d = function(h) {
          var w = h.date, y = h.utc;
          if (w === null) return /* @__PURE__ */ new Date(NaN);
          if (I.u(w)) return /* @__PURE__ */ new Date();
          if (w instanceof Date) return new Date(w);
          if (typeof w == "string" && !/Z$/i.test(w)) {
            var $ = w.match(p);
            if ($) {
              var A = $[2] - 1 || 0, H = ($[7] || "0").substring(0, 3);
              return y ? new Date(Date.UTC($[1], A, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, H)) : new Date($[1], A, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, H);
            }
          }
          return new Date(w);
        }(f), this.init();
      }, m.init = function() {
        var f = this.$d;
        this.$y = f.getFullYear(), this.$M = f.getMonth(), this.$D = f.getDate(), this.$W = f.getDay(), this.$H = f.getHours(), this.$m = f.getMinutes(), this.$s = f.getSeconds(), this.$ms = f.getMilliseconds();
      }, m.$utils = function() {
        return I;
      }, m.isValid = function() {
        return this.$d.toString() !== M;
      }, m.isSame = function(f, h) {
        var w = U(f);
        return this.startOf(h) <= w && w <= this.endOf(h);
      }, m.isAfter = function(f, h) {
        return U(f) < this.startOf(h);
      }, m.isBefore = function(f, h) {
        return this.endOf(h) < U(f);
      }, m.$g = function(f, h, w) {
        return I.u(f) ? this[h] : this.set(w, f);
      }, m.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m.valueOf = function() {
        return this.$d.getTime();
      }, m.startOf = function(f, h) {
        var w = this, y = !!I.u(h) || h, $ = I.p(f), A = function(he, K) {
          var de = I.w(w.$u ? Date.UTC(w.$y, K, he) : new Date(w.$y, K, he), w);
          return y ? de : de.endOf(u);
        }, H = function(he, K) {
          return I.w(w.toDate()[he].apply(w.toDate("s"), (y ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(K)), w);
        }, z = this.$W, Y = this.$M, ne = this.$D, xe = "set" + (this.$u ? "UTC" : "");
        switch ($) {
          case v:
            return y ? A(1, 0) : A(31, 11);
          case d:
            return y ? A(1, Y) : A(0, Y + 1);
          case l:
            var me = this.$locale().weekStart || 0, Le = (z < me ? z + 7 : z) - me;
            return A(y ? ne - Le : ne + (6 - Le), Y);
          case u:
          case x:
            return H(xe + "Hours", 0);
          case a:
            return H(xe + "Minutes", 1);
          case s:
            return H(xe + "Seconds", 2);
          case c:
            return H(xe + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m.endOf = function(f) {
        return this.startOf(f, !1);
      }, m.$set = function(f, h) {
        var w, y = I.p(f), $ = "set" + (this.$u ? "UTC" : ""), A = (w = {}, w[u] = $ + "Date", w[x] = $ + "Date", w[d] = $ + "Month", w[v] = $ + "FullYear", w[a] = $ + "Hours", w[s] = $ + "Minutes", w[c] = $ + "Seconds", w[o] = $ + "Milliseconds", w)[y], H = y === u ? this.$D + (h - this.$W) : h;
        if (y === d || y === v) {
          var z = this.clone().set(x, 1);
          z.$d[A](H), z.init(), this.$d = z.set(x, Math.min(this.$D, z.daysInMonth())).$d;
        } else A && this.$d[A](H);
        return this.init(), this;
      }, m.set = function(f, h) {
        return this.clone().$set(f, h);
      }, m.get = function(f) {
        return this[I.p(f)]();
      }, m.add = function(f, h) {
        var w, y = this;
        f = Number(f);
        var $ = I.p(h), A = function(Y) {
          var ne = U(y);
          return I.w(ne.date(ne.date() + Math.round(Y * f)), y);
        };
        if ($ === d) return this.set(d, this.$M + f);
        if ($ === v) return this.set(v, this.$y + f);
        if ($ === u) return A(1);
        if ($ === l) return A(7);
        var H = (w = {}, w[s] = i, w[a] = r, w[c] = n, w)[$] || 1, z = this.$d.getTime() + f * H;
        return I.w(z, this);
      }, m.subtract = function(f, h) {
        return this.add(-1 * f, h);
      }, m.format = function(f) {
        var h = this, w = this.$locale();
        if (!this.isValid()) return w.invalidDate || M;
        var y = f || "YYYY-MM-DDTHH:mm:ssZ", $ = I.z(this), A = this.$H, H = this.$m, z = this.$M, Y = w.weekdays, ne = w.months, xe = w.meridiem, me = function(K, de, De, He) {
          return K && (K[de] || K(h, y)) || De[de].slice(0, He);
        }, Le = function(K) {
          return I.s(A % 12 || 12, K, "0");
        }, he = xe || function(K, de, De) {
          var He = K < 12 ? "AM" : "PM";
          return De ? He.toLowerCase() : He;
        };
        return y.replace(W, function(K, de) {
          return de || function(De) {
            switch (De) {
              case "YY":
                return String(h.$y).slice(-2);
              case "YYYY":
                return I.s(h.$y, 4, "0");
              case "M":
                return z + 1;
              case "MM":
                return I.s(z + 1, 2, "0");
              case "MMM":
                return me(w.monthsShort, z, ne, 3);
              case "MMMM":
                return me(ne, z);
              case "D":
                return h.$D;
              case "DD":
                return I.s(h.$D, 2, "0");
              case "d":
                return String(h.$W);
              case "dd":
                return me(w.weekdaysMin, h.$W, Y, 2);
              case "ddd":
                return me(w.weekdaysShort, h.$W, Y, 3);
              case "dddd":
                return Y[h.$W];
              case "H":
                return String(A);
              case "HH":
                return I.s(A, 2, "0");
              case "h":
                return Le(1);
              case "hh":
                return Le(2);
              case "a":
                return he(A, H, !0);
              case "A":
                return he(A, H, !1);
              case "m":
                return String(H);
              case "mm":
                return I.s(H, 2, "0");
              case "s":
                return String(h.$s);
              case "ss":
                return I.s(h.$s, 2, "0");
              case "SSS":
                return I.s(h.$ms, 3, "0");
              case "Z":
                return $;
            }
            return null;
          }(K) || $.replace(":", "");
        });
      }, m.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m.diff = function(f, h, w) {
        var y, $ = this, A = I.p(h), H = U(f), z = (H.utcOffset() - this.utcOffset()) * i, Y = this - H, ne = function() {
          return I.m($, H);
        };
        switch (A) {
          case v:
            y = ne() / 12;
            break;
          case d:
            y = ne();
            break;
          case g:
            y = ne() / 3;
            break;
          case l:
            y = (Y - z) / 6048e5;
            break;
          case u:
            y = (Y - z) / 864e5;
            break;
          case a:
            y = Y / r;
            break;
          case s:
            y = Y / i;
            break;
          case c:
            y = Y / n;
            break;
          default:
            y = Y;
        }
        return w ? y : I.a(y);
      }, m.daysInMonth = function() {
        return this.endOf(d).$D;
      }, m.$locale = function() {
        return j[this.$L];
      }, m.locale = function(f, h) {
        if (!f) return this.$L;
        var w = this.clone(), y = we(f, h, !0);
        return y && (w.$L = y), w;
      }, m.clone = function() {
        return I.w(this.$d, this);
      }, m.toDate = function() {
        return new Date(this.valueOf());
      }, m.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m.toISOString = function() {
        return this.$d.toISOString();
      }, m.toString = function() {
        return this.$d.toUTCString();
      }, b;
    }(), at = Ue.prototype;
    return U.prototype = at, [["$ms", o], ["$s", c], ["$m", s], ["$H", a], ["$W", u], ["$M", d], ["$y", v], ["$D", x]].forEach(function(b) {
      at[b[1]] = function(m) {
        return this.$g(m, b[0], b[1]);
      };
    }), U.extend = function(b, m) {
      return b.$i || (b(m, Ue, U), b.$i = !0), U;
    }, U.locale = we, U.isDayjs = Z, U.unix = function(b) {
      return U(1e3 * b);
    }, U.en = j[C], U.Ls = j, U.p = {}, U;
  });
})(Tt);
var un = Tt.exports;
const Ze = /* @__PURE__ */ Et(un), [ve] = ce(), dn = "https://github.com/login/oauth/authorize";
async function ue(e, t = {}) {
  let n = {
    Accept: "application/vnd.github+json",
    ...t.headers
  };
  (localStorage.getItem("access_token") && ve.isUserLoggedIn || e === "https://api.github.com/user") && (n.Authorization = "Bearer " + localStorage.getItem("access_token"));
  let i = {
    method: t.method || "GET",
    headers: n
  };
  t.body && (i.body = t.body);
  let r = new URL(e);
  r.search && r.search.startsWith("?") && r.search.length > 1 ? e = e + "&t=" + Date.now() : e = e + "?" + new URLSearchParams({
    t: Date.now()
  });
  let o = ve.apiBase ? ve.proxy : "";
  return await fetch(o + e, i);
}
function gn(e) {
  return e.split(`

`).map((t) => `<p>${t.replace(/\n/g, "<br>")}</p>`).join("");
}
function wt(e) {
  return gn(e);
}
async function st(e, t = -1, n = "") {
  if (ve.renderMarkdown === !1)
    return wt(e);
  let i = "";
  if (t && n) {
    let r = Ze(n).unix();
    i = `cache:markdown:comment:${t}:${r}`;
    let o = sessionStorage.getItem(i);
    if (o)
      return o;
  }
  try {
    let r = ve.markdownRenderingEndpoint, o = {
      "Content-Type": "plain/text"
    }, c = e, s = fetch;
    (!ve.markdownRenderingEndpoint || !ve.apiBase || !r.startsWith("https://")) && (r = "https://api.github.com/markdown", o = {
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28"
    }, s = ue, c = JSON.stringify({
      text: e
    }));
    let u = await (await s(r, {
      method: "POST",
      headers: o,
      body: c
    })).text();
    if (t && n) {
      let l = Ze(n).unix(), d = `cache:markdown:comment:${t}:${l}`, g = sessionStorage.getItem(`cache:markdown:comment:${t}`);
      g = g ? JSON.parse(g) : [], g.map(async (v) => {
        sessionStorage.removeItem(v);
      }), sessionStorage.setItem(d, u);
    }
    return u;
  } catch (r) {
    return console.log(r), wt(e);
  }
}
var fn = /* @__PURE__ */ T('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"stroke-width=2 stroke=currentColor fill=none stroke-linecap=round stroke-linejoin=round><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M18 6l-12 12"></path><path d="M6 6l12 12">');
function lt(e = {}) {
  return (() => {
    var t = fn();
    return F((n) => {
      var i = (e.classList || "") + " " + (e.visible === !1 ? " cwgi-hidden" : ""), r = e.width || "24", o = e.height || "24";
      return i !== n.e && ee(t, "class", n.e = i), r !== n.t && ee(t, "width", n.t = r), o !== n.a && ee(t, "height", n.a = o), n;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), t;
  })();
}
var wn = /* @__PURE__ */ T('<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><title>GitHub</title><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5">');
function mt(e) {
  return (() => {
    var t = wn();
    return F(() => ee(t, "class", e.class || "")), t;
  })();
}
var mn = /* @__PURE__ */ T('<section data-name=login><div class="cwgi-text-center cwgi-relative cwgi-h-[32px]"><div class="user-window dark:cwgi-bg-white/10 cwgi-backdrop-blur cwgi-bg-black/5 cwgi-h-[32px] cwgi-items-center cwgi-inline-block cwgi-border-none cwgi-relative cwgi-z-10 cwgi-rounded-full hover:cwgi-shadow-xl cwgi-transition-all">'), hn = /* @__PURE__ */ T('<div class="cwgi-border cwgi-absolute cwgi-w-[200px] cwgi-px-2 cwgi-py-2 cwgi-rounded-[1rem] dark:cwgi-bg-white/10 cwgi-bg-black/5 cwgi-backdrop-blur cwgi-left-1/2 cwgi-bottom-[37px] cwgi-popup-border hover:cwgi-shadow-xl cwgi-transition-shadow"><button class="cwgi-text-xs cwgi-px-2 cwgi-py-2 cwgi-text-center dark:hover:cwgi-bg-black/50 hover:cwgi-bg-white/90 cwgi-w-full cwgi-rounded-[.5rem] cwgi-flex cwgi-items-center cwgi-justify-center cwgi-transition-all">My GitHub Page</button><button class="cwgi-text-xs cwgi-px-2 cwgi-py-2 cwgi-text-center hover:cwgi-bg-red-500 hover:cwgi-text-white hover:cwgi-shadow focus:cwgi-bg-red-500 focus:cwgi-text-white cwgi-w-full cwgi-rounded-[.5rem] cwgi-flex cwgi-items-center cwgi-justify-center cwgi-transition-all"><svg xmlns=http://www.w3.org/2000/svg class="cwgi-w-4 cwgi-h-4 cwgi-mr-2"viewBox="0 0 24 24"stroke-width=2 stroke=currentColor fill=none stroke-linecap=round stroke-linejoin=round><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path><path d="M9 12h12l-3 -3"></path><path d="M18 15l3 -3"></path></svg>Logout'), pn = /* @__PURE__ */ T('<button class="cwgi-flex cwgi-h-[32px] cwgi-items-center cwgi-border-none cwgi-cursor-pointer cwgi-select-none cwgi-rounded-full"><span class="cwgi-w-[32px] cwgi-h-[32px] cwgi-overflow-hidden cwgi-rounded-full"><img alt="user avatar"class="cwgi-w-full cwgi-h-full"></span><span class="cwgi-text-sm cwgi-pl-2 cwgi-pr-2"></span><span class=cwgi-pr-2>'), vn = /* @__PURE__ */ T('<svg xmlns=http://www.w3.org/2000/svg class="cwgi-w-4 cwgi-h-4"viewBox="0 0 24 24"stroke-width=2 stroke=currentColor fill=none stroke-linecap=round stroke-linejoin=round><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M8 9l4 -4l4 4"></path><path d="M16 15l-4 4l-4 -4">'), bn = /* @__PURE__ */ T('<div class=cwgi-text-center><button id=loginWithGitHub class="cwgi-text-sm cwgi-px-8 cwgi-py-2 cwgi-rounded-full dark:cwgi-bg-white dark:cwgi-text-black cwgi-flex cwgi-items-center cwgi-mx-auto cwgi-bg-neutral-800 cwgi-text-white cwgi-shadow-2xl">Login with ');
const [G, X] = ce();
function yn() {
  const e = `${dn}?state=${Date.now()}&client_id=${G.clientId}&redirect_uri=${encodeURIComponent(`${G.apiBase || "https://cwgi.jw1.dev"}/callback?r=${location.href}`)}`;
  let [t, n] = je(!1);
  window.addEventListener("click", function() {
    G.mouseIsInsideWindow === !1 && n(!1), G.commentActionDropdown && !G.deletingId && X("commentActionDropdown", "");
  }), window.addEventListener("keydown", function(c) {
    c.key === "Escape" && (t() && n(!1), G.commentActionDropdown && !G.deletingId && X("commentActionDropdown", ""));
  });
  function i() {
    location.href = G.user.html_url;
  }
  function r() {
    location.href = e;
  }
  function o() {
    if (!confirm("Are you sure?😯"))
      return !1;
    localStorage.clear(), X("isUserLoggedIn", !1), X("user", {}), X("sending_comment", !1), n(!1), X("mouseIsInsideWindow", !1), X("reactingCommentID", []), X("listingReactionCommentId", null);
  }
  return L(() => L(() => !G.gettingUser)() && (() => {
    var c = mn(), s = c.firstChild, a = s.firstChild;
    return k(s, (() => {
      var u = L(() => !!t());
      return () => u() && (() => {
        var l = hn(), d = l.firstChild, g = d.firstChild, v = d.nextSibling;
        return l.addEventListener("mouseleave", () => X("mouseIsInsideWindow", !1)), l.addEventListener("mouseenter", () => X("mouseIsInsideWindow", !0)), l.style.setProperty("transform", "translateX(-50%)"), l.style.setProperty("animation", "slideUp_offset .15s ease"), d.$$click = i, k(d, R(mt, {
          class: "cwgi-w-4 cwgi-h-4 cwgi-mr-2"
        }), g), v.$$click = o, l;
      })();
    })(), a), a.addEventListener("mouseleave", () => X("mouseIsInsideWindow", !1)), a.addEventListener("mouseenter", () => X("mouseIsInsideWindow", !0)), k(a, (() => {
      var u = L(() => !!G.isUserLoggedIn);
      return () => u() && (() => {
        var l = pn(), d = l.firstChild, g = d.firstChild, v = d.nextSibling, x = v.nextSibling;
        return l.addEventListener("blur", () => X("mouseIsInsideWindow", !1)), l.addEventListener("focus", () => X("mouseIsInsideWindow", !0)), l.$$click = () => n(!t()), k(v, () => G.user.login), k(x, (() => {
          var M = L(() => !t());
          return () => M() && vn();
        })(), null), k(x, (() => {
          var M = L(() => !!t());
          return () => M() && R(lt, {
            classList: "cwgi-w-4 cwgi-h-4"
          });
        })(), null), F(() => ee(g, "src", G.apiBase ? G.apiBase + "/proxy/" + G.user.avatar_url + "&s=64" : G.user.avatar_url + "&s=64")), l;
      })();
    })()), k(c, (() => {
      var u = L(() => !G.isUserLoggedIn);
      return () => u() && (() => {
        var l = bn(), d = l.firstChild;
        return d.firstChild, d.$$click = r, k(d, R(mt, {
          class: "cwgi-ml-2 cwgi-h-5"
        }), null), l;
      })();
    })(), null), F(() => s.classList.toggle("cwgi-hidden", !G.isUserLoggedIn)), c;
  })());
}
$e(["click"]);
var $n = /* @__PURE__ */ T('<section data-name=textarea class=cwgi-pt-8><form action=javascript:><textarea id=comment_textarea class="cwgi-rounded-2xl cwgi-block cwgi-px-4 cwgi-py-4 cwgi-font-mono cwgi-border-none cwgi-appearance-none cwgi-shadow dark:cwgi-bg-white/10 cwgi-bg-[rgba(0,0,0,.05)] cwgi-w-full cwgi-resize-y cwgi-text-sm cwgi-min-h-[5rem] cwgi-rounded-br-[6px] cwgi-outline-0 focus:cwgi-outline-0 cwgi-ring-0 cwgi-ring-neutral-500 focus:cwgi-ring-offset-2 focus:cwgi-ring-offset-white focus:cwgi-ring-2 dark:focus:cwgi-ring-offset-neutral-900 dark:focus:cwgi-ring-neutral-400 dark:focus:cwgi-ring-2 cwgi-backdrop-blur cwgi-placeholder-neutral-500 dark:cwgi-placeholder-neutral-100"required name=comment></textarea><div class="cwgi-pt-2 cwgi-text-xs dark:cwgi-text-white/50 cwgi-text-black/50 cwgi-leading-5">Powered by <a href=https://cwgi-docs.jw1.dev/ target=_blank class="cwgi-text-black dark:cwgi-text-white">CWGI</a>, made with <a target=_blank class="cwgi-text-black dark:cwgi-text-white"href=https://github.com/features/issues>GitHub Issues</a>, please follow the <a target=_blank class="cwgi-text-black dark:cwgi-text-white"href=https://docs.github.com/en/site-policy/github-terms/github-community-code-of-conduct>GitHub Community Code of Conduct</a>.</div><div class="cwgi-text-center cwgi-mt-8 cwgi-flex cwgi-justify-center"><button type=submit class="cwgi-rounded-full cwgi-px-4 cwgi-py-2 cwgi-bg-neutral-800 cwgi-text-white dark:cwgi-bg-white dark:cwgi-text-black cwgi-text-sm cwgi-flex cwgi-items-center cwgi-group"><svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="cwgi-mr-2 cwgi-w-4 cwgi-h-4"><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M10 14l11 -11"></path><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path></svg>Send</button><button disabled class="cwgi-rounded-full disabled:cwgi-opacity-70 cwgi-px-4 cwgi-py-2 cwgi-bg-neutral-800 cwgi-text-white dark:cwgi-bg-white dark:cwgi-text-black cwgi-text-sm cwgi-flex cwgi-items-center cwgi-whitespace-nowrap"type=button>Send');
const [V, Ee] = ce();
function xn() {
  async function e() {
    if (V.sending_comment)
      return !1;
    Ee("sending_comment", !0);
    let n;
    try {
      n = await ue(`https://api.github.com/repos/${V.owner}/${V.repo}/issues/${V.githubIssueId}/comments`, {
        method: "POST",
        body: JSON.stringify({
          body: V.userComment
        })
      });
    } catch (r) {
      console.log(r), alert("发送评论失败，请稍后再试");
    } finally {
      Ee("sending_comment", !1);
    }
    if (!n.ok) {
      alert("发送评论失败，请稍后再试");
      return;
    }
    let i = await n.json();
    i.bodyHTML = await st(i.body, i.id, i.updated_at), Ee("comments", [...V.comments, i]), Ee("userComment", ""), setTimeout(function() {
      document.getElementById(i.id).scrollIntoView({
        behavior: "smooth"
      });
    }, 300);
  }
  let t = function() {
    return V.gettingUser ? "Loading..." : V.isUserLoggedIn ? "Leave a comment here :)" : "Please login first";
  };
  return (() => {
    var n = $n(), i = n.firstChild, r = i.firstChild, o = r.nextSibling, c = o.nextSibling, s = c.firstChild, a = s.nextSibling, u = a.firstChild;
    return i.addEventListener("submit", e), r.$$input = (l) => Ee("userComment", l.target.value), k(a, R(Ae, {
      width: 16,
      height: 16,
      class: "cwgi-mr-2"
    }), u), F((l) => {
      var d = V.gettingUser || !V.isUserLoggedIn, g = t(), v = !!V.gettingUser, x = !V.isUserLoggedIn, M = !!V.sending_comment, p = !V.isUserLoggedIn, W = !V.sending_comment;
      return d !== l.e && (r.disabled = l.e = d), g !== l.t && ee(r, "placeholder", l.t = g), v !== l.a && c.classList.toggle("cwgi-hidden", l.a = v), x !== l.o && (s.disabled = l.o = x), M !== l.i && s.classList.toggle("cwgi-hidden", l.i = M), p !== l.n && s.classList.toggle("cwgi-opacity-50", l.n = p), W !== l.s && a.classList.toggle("cwgi-hidden", l.s = W), l;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0,
      n: void 0,
      s: void 0
    }), F(() => r.value = V.userComment), n;
  })();
}
$e(["input"]);
var Ot = { exports: {} };
(function(e, t) {
  (function(n, i) {
    e.exports = i();
  })(Dt, function() {
    return function(n, i, r) {
      n = n || {};
      var o = i.prototype, c = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function s(u, l, d, g) {
        return o.fromToBase(u, l, d, g);
      }
      r.en.relativeTime = c, o.fromToBase = function(u, l, d, g, v) {
        for (var x, M, p, W = d.$locale().relativeTime || c, S = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], O = S.length, E = 0; E < O; E += 1) {
          var C = S[E];
          C.d && (x = g ? r(u).diff(d, C.d, !0) : d.diff(u, C.d, !0));
          var j = (n.rounding || Math.round)(Math.abs(x));
          if (p = x > 0, j <= C.r || !C.r) {
            j <= 1 && E > 0 && (C = S[E - 1]);
            var te = W[C.l];
            v && (j = v("" + j)), M = typeof te == "string" ? te.replace("%d", j) : te(j, l, C.l, p);
            break;
          }
        }
        if (l) return M;
        var Z = p ? W.future : W.past;
        return typeof Z == "function" ? Z(M) : Z.replace("%s", M);
      }, o.to = function(u, l) {
        return s(u, l, this, !0);
      }, o.from = function(u, l) {
        return s(u, l, this);
      };
      var a = function(u) {
        return u.$u ? r.utc() : r();
      };
      o.toNow = function(u) {
        return this.to(a(this), u);
      }, o.fromNow = function(u) {
        return this.from(a(this), u);
      };
    };
  });
})(Ot);
var kn = Ot.exports;
const Cn = /* @__PURE__ */ Et(kn);
var In = /* @__PURE__ */ T('<div data-name="more actions"class="cwgi-absolute cwgi-z-[500] cwgi-top-[2.25rem] cwgi-right-0 cwgi-rounded-[1rem] dark:cwgi-bg-white/20 cwgi-px-2 cwgi-py-2 cwgi-bg-black/5 cwgi-border-[1px] cwgi-shadow-xl cwgi-popup-border cwgi-backdrop-blur"><button class="cwgi-py-2 cwgi-px-4 cwgi-rounded-[.5rem] cwgi-w-full cwgi-text-xs cwgi-flex cwgi-transition-all dark:hover:cwgi-bg-black/50 hover:cwgi-bg-white/90"><svg xmlns=http://www.w3.org/2000/svg class="cwgi-w-4 cwgi-h-4 cwgi-mr-1"viewBox="0 0 24 24"stroke-width=2 stroke=currentColor fill=none stroke-linecap=round stroke-linejoin=round><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z"></path><path d="M16 5l3 3"></path><path d="M9 7.07a7 7 0 0 0 1 13.93a7 7 0 0 0 6.929 -6"></path></svg>Edit</button><button class="cwgi-py-2 cwgi-px-4 cwgi-rounded-[.5rem] cwgi-w-full hover:cwgi-bg-red-500 hover:cwgi-text-white dark:cwgi-text-white cwgi-text-xs cwgi-flex cwgi-transition-all"><svg xmlns=http://www.w3.org/2000/svg class="cwgi-w-4 cwgi-h-4 cwgi-mr-1"viewBox="0 0 24 24"stroke-width=2 stroke=currentColor fill=none stroke-linecap=round stroke-linejoin=round><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M4 7l16 0"></path><path d="M10 11l0 6"></path><path d="M14 11l0 6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path></svg>Delete');
const [oe, be] = ce();
async function Mn(e) {
  if (!confirm("Are you sure to delete this comment? 😯"))
    return;
  be("deletingId", e);
  let n;
  try {
    n = await ue(`https://api.github.com/repos/${oe.owner}/${oe.repo}/issues/comments/${e}`, {
      method: "DELETE"
    });
  } catch (i) {
    return alert("failed, please try again later"), console.log(i), !1;
  } finally {
    be("deletingId", "");
  }
  if (n.ok || n.status === 404) {
    let i = document.getElementById(e).offsetHeight, r = `<style id="${"del_" + e}">
@keyframes comment_delete_${e} {
  from {
    height: ${i}px;
    padding: 2rem 0;
    opacity: 0.3;
  }
  
  to {
    height: 0;
    padding: 0;
    opacity: 0.3;
  }
}
</style>`;
    document.head.insertAdjacentHTML("beforeend", r);
    let o = oe.comments.findIndex((c) => c.id === e);
    be("comments", o, "aboutToGetDeleted", !0), setTimeout(function() {
      be("comments", oe.comments.filter((c) => c.id !== e)), document.getElementById("del_" + e).remove();
    }, 300);
  }
}
function _n(e) {
  let {
    comment: t
  } = e;
  return L(() => L(() => oe.commentActionDropdown === t.id)() && (() => {
    var n = In(), i = n.firstChild, r = i.nextSibling, o = r.firstChild, c = o.nextSibling;
    return n.style.setProperty("animation", "0.15s ease 0s 1 normal none running slideUp"), i.$$click = () => {
      be("editingCommentId", t.id), be("editingCommentContent", t.body), be("commentActionDropdown", "");
    }, r.$$click = () => Mn(t.id), k(r, R(Ae, {
      get visible() {
        return oe.deletingId === t.id;
      },
      width: 16,
      height: 16,
      class: "cwgi-mr-1"
    }), c), F((s) => {
      var a = oe.deletingId === t.id, u = oe.deletingId === t.id, l = {
        "cwgi-bg-red-500 cwgi-text-white dark:cwgi-bg-red-500 dark:cwgi-text-white": oe.deletingId === t.id
      }, d = oe.deletingId === t.id;
      return a !== s.e && (i.disabled = s.e = a), u !== s.t && (r.disabled = s.t = u), s.a = Ve(r, l, s.a), d !== s.o && o.classList.toggle("cwgi-hidden", s.o = d), s;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), n;
  })());
}
$e(["click"]);
var Sn = /* @__PURE__ */ T('<div class=cwgi-mt-2 data-name="edit area"><form action=javascript:><div><textarea class="cwgi-rounded-2xl cwgi-block cwgi-px-4 cwgi-py-4 cwgi-font-mono cwgi-border-none focus:cwgi-shadow dark:cwgi-bg-white/10 cwgi-bg-black/5 cwgi-w-full cwgi-resize-y cwgi-min-h-[6rem] cwgi-text-sm cwgi-rounded-br-[6px] cwgi-outline-0 focus:cwgi-outline-0 cwgi-ring-0 cwgi-ring-neutral-500 focus:cwgi-ring-offset-2 focus:cwgi-ring-offset-white focus:cwgi-ring-2 dark:focus:cwgi-ring-offset-neutral-900 dark:focus:cwgi-ring-neutral-400 dark:focus:cwgi-ring-2 cwgi-backdrop-blur cwgi-placeholder-neutral-500 dark:cwgi-placeholder-neutral-100 cwgi-popup-border"required id=comment_editing_textarea></textarea></div><div class="cwgi-mt-2 cwgi-flex"><button type=button class="cwgi-rounded-full cwgi-text-sm dark:cwgi-bg-white/10 cwgi-bg-black/10 dark:cwgi-text-white cwgi-text-black/90 cwgi-backdrop-blur cwgi-px-4 cwgi-py-2 cwgi-flex cwgi-items-center disabled:cwgi-opacity-50">Cancel</button><button type=submit class="cwgi-rounded-full cwgi-text-sm dark:cwgi-bg-white/90 dark:cwgi-text-black cwgi-text-white cwgi-bg-black/70 cwgi-backdrop-blur cwgi-px-4 cwgi-py-2 cwgi-flex cwgi-items-center cwgi-ml-2 disabled:cwgi-opacity-50"><svg xmlns=http://www.w3.org/2000/svg class="icon icon-tabler icon-tabler-check cwgi-w-4 cwgi-h-4 cwgi-mr-1"viewBox="0 0 24 24"stroke-width=2 stroke=currentColor fill=none stroke-linecap=round stroke-linejoin=round><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M5 12l5 5l10 -10"></path></svg>Confirm');
const [Q, re] = ce();
function An(e) {
  const {
    comment: t
  } = e;
  async function n() {
    let i = Q.editingCommentId, r = Q.editingCommentContent;
    if (!i) {
      re("editingCommentId", ""), re("editingCommentContent", "");
      return;
    }
    if (!r) {
      alert("the content cannot be empty");
      return;
    }
    if (Q.submittingEditedComment)
      return;
    let o = `https://api.github.com/repos/${Q.owner}/${Q.repo}/issues/comments/${i}`, c;
    try {
      re("submittingEditedComment", !0), c = await ue(o, {
        method: "PATCH",
        body: JSON.stringify({
          body: r
        })
      });
    } catch (s) {
      console.log(s), alert("failed, please try again later");
    } finally {
      re("submittingEditedComment", !1);
    }
    if (!c.ok) {
      alert("failed, please try again later");
      return;
    }
    if (c.status === 200) {
      let s = await c.json();
      re("comments", Q.comments.map((a) => (a.id === i && (a = s), a))), re("editingCommentId", ""), re("shouldUpdateCommentId", i);
    }
  }
  return R(qt, {
    get when() {
      return Q.editingCommentId === t.id;
    },
    get children() {
      var i = Sn(), r = i.firstChild, o = r.firstChild, c = o.firstChild, s = o.nextSibling, a = s.firstChild, u = a.firstChild, l = a.nextSibling, d = l.firstChild;
      return r.addEventListener("submit", n), c.$$input = (g) => re("editingCommentContent", g.target.value), a.$$click = () => {
        re("editingCommentId", ""), re("editingCommentContent", "");
      }, k(a, R(lt, {
        classList: "cwgi-w-4 cwgi-h-4 cwgi-mr-1"
      }), u), k(l, R(Ae, {
        class: "cwgi-mr-1",
        width: 16,
        height: 16,
        get visible() {
          return Q.submittingEditedComment;
        }
      }), d), F((g) => {
        var v = Q.submittingEditedComment, x = Q.submittingEditedComment, M = !!Q.submittingEditedComment, p = !Q.submittingEditedComment;
        return v !== g.e && (a.disabled = g.e = v), x !== g.t && (l.disabled = g.t = x), M !== g.a && d.classList.toggle("cwgi-hidden", g.a = M), p !== g.o && d.classList.toggle("cwgi-inline", g.o = p), g;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      }), F(() => c.value = Q.editingCommentContent), i;
    }
  });
}
$e(["input", "click"]);
var Ln = /* @__PURE__ */ T('<div class="cwgi-mt-[-0.6rem] cwgi-relative cwgi-z-50 cwgi-flex cwgi-items-center"data-name=reactions>'), Dn = /* @__PURE__ */ T('<button class="cwgi-mr-1 disabled:cwgi-opacity-50 cwgi-text-xs cwgi-flex cwgi-items-center cwgi-rounded-full cwgi-px-2 cwgi-py-1 cwgi-max-h-[1.5rem] cwgi-group cwgi-text-neutral-800 dark:cwgi-text-neutral-50 dark:cwgi-bg-white/10 cwgi-bg-black/5 cwgi-backdrop-blur hover:cwgi-shadow dark:hover:cwgi-bg-white dark:hover:cwgi-text-neutral-900 hover:cwgi-bg-neutral-900 hover:cwgi-text-white"><span class="cwgi-transition-all cwgi-mr-1 cwgi-relative cwgi-top-0"></span><span class=cwgi-font-mono>');
const [P, se] = ce();
let En = [{
  label: "👍",
  content: "+1",
  means: "agree!"
}, {
  label: "👎",
  content: "-1",
  means: "disagree!"
}, {
  label: "❤️",
  content: "heart",
  means: "love it!"
}], jt = function(e, t) {
  if (!P.isUserLoggedIn)
    return null;
  let n = P.user.login;
  if (!P.commentReactionMap[e] || !P.commentReactionMap[e][t])
    return null;
  let i = P.commentReactionMap[e][t];
  for (let r = 0; r < i.length; r++)
    if (i[r].user.login === n)
      return i[r].id;
};
async function Tn(e, t, n) {
  let i = `https://api.github.com/repos/${P.owner}/${P.repo}/issues/comments/${e}/reactions/${t}`, r;
  try {
    se("reactingCommentID", [...P.reactingCommentID, e]), r = await ue(i, {
      method: "DELETE"
    });
  } catch (o) {
    console.log(o);
    return;
  } finally {
    se("reactingCommentID", P.reactingCommentID.filter((o) => o !== e));
  }
  r.ok && (se(Lt((o) => {
    o.comments = o.comments.map((c) => (c.id === e && c.reactions[n]--, c));
  })), se("commentReactionMap", e, n, P.commentReactionMap[e][n].filter((o) => o.id !== t)));
}
async function On(e, t) {
  if (!P.isUserLoggedIn)
    return alert("Please log in first"), !1;
  let n = jt(t, e);
  if (n)
    return se("reactingCommentID", [...P.reactingCommentID, t]), await Tn(t, n, e), se("reactingCommentID", P.reactingCommentID.filter((o) => o !== t)), !1;
  let i = `https://api.github.com/repos/${P.owner}/${P.repo}/issues/comments/${t}/reactions`, r;
  try {
    se("reactingCommentID", [...P.reactingCommentID, t]), r = await ue(i, {
      method: "POST",
      body: JSON.stringify({
        content: e
      })
    });
  } catch (o) {
    return console.log(o), alert("failed, please try again later"), !1;
  } finally {
    se("reactingCommentID", P.reactingCommentID.filter((o) => o !== t));
  }
  if (r.status === 200)
    return alert("you have already reacted to this comment, thx"), !1;
  if (!r.ok)
    return alert("failed, please try again later"), !1;
  se(Lt((o) => {
    o.comments = o.comments.map((c) => (c.id === t && c.reactions[e]++, c));
  })), se("shouldListReactionsForCommentId", t);
}
function jn(e) {
  const {
    comment: t
  } = e;
  return L(() => L(() => P.editingCommentId !== t.id)() && (() => {
    var n = Ln();
    return k(n, R(Ct, {
      each: En,
      children: (i, r) => (() => {
        var o = Dn(), c = o.firstChild, s = c.nextSibling;
        return o.$$click = () => On(i.content, t.id), k(c, () => i.label), k(s, () => P.commentReactionMap[t.id] && P.commentReactionMap[t.id][i.content] ? P.commentReactionMap[t.id][i.content].length : 0), F((a) => {
          var u = P.reactingCommentID.includes(t.id), l = i.means, d = {
            "cwgi-text-2xl cwgi-rotate-[-12deg] cwgi-top-[-.2rem]": jt(t.id, i.content)
          };
          return u !== a.e && (o.disabled = a.e = u), l !== a.t && ee(o, "title", a.t = l), a.a = Ve(c, d, a.a), a;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), o;
      })()
    })), F((i) => Ve(n, {
      "cwgi-opacity-50 cwgi-pointer-events-none": P.listingReactionCommentIds.includes(t.id)
    }, i)), n;
  })());
}
$e(["click"]);
var Pn = /* @__PURE__ */ T('<div class="item cwgi-transition-all cwgi-relative"><div class="user cwgi-flex cwgi-mt-2 cwgi-w-full cwgi-relative"><div class="outer-box cwgi-flex cwgi-justify-between cwgi-w-full"><a target=_blank class="user-info cwgi-flex cwgi-items-center cwgi-text-sm cwgi-group cwgi-text-black dark:cwgi-text-white cwgi-no-underline"><img alt="user avatar"class="cwgi-user-avatar cwgi-w-8 cwgi-h-8 cwgi-rounded-[10px] cwgi-mb-0 cwgi-mr-2 group-hover:cwgi-shadow cwgi-transition-shadow"><div><span class="cwgi-flex cwgi-items-center"></span><div class="datetime cwgi-text-[10px] cwgi-opacity-70"></div></div></a></div></div><div class="cwgi-mt-2 cwgi-flex cwgi-items-center cwgi-pb-8"></div><div class="cwgi-mt-2 cwgi-page-content cwgi-comment-content"style=padding-bottom:0>'), Rn = /* @__PURE__ */ T('<div class="cwgi-absolute -cwgi-left-0.5 cwgi-top-2.5"><svg xmlns=http://www.w3.org/2000/svg width=16 height=16 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="cwgi-opacity-50 cwgi-relative -cwgi-left-0.5 cwgi-top-0.5"><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M6 6v6a3 3 0 0 0 3 3h10l-4 -4m0 8l4 -4">'), Un = /* @__PURE__ */ T('<span class="author-tag cwgi-px-2 cwgi-text-xs cwgi-rounded-xl cwgi-relative cwgi-scale-90 dark:cwgi-bg-indigo-700 cwgi-bg-indigo-200 dark:cwgi-text-indigo-200 cwgi-text-indigo-800 cwgi-top-[-.03rem] cwgi-ml-1">Owner'), Hn = /* @__PURE__ */ T('<span class="author-tag cwgi-px-2 cwgi-text-xs cwgi-rounded-xl cwgi-relative cwgi-scale-90 dark:cwgi-bg-yellow-300 cwgi-bg-yellow-500 dark:cwgi-text-black cwgi-text-white cwgi-top-[-.03rem] cwgi-ml-1">Me'), Bn = /* @__PURE__ */ T('<div class="comment-actions cwgi-flex-shrink-0"><button aria-label="More actions"class="dark:cwgi-bg-white/10 cwgi-backdrop-blur cwgi-bg-black/5 cwgi-rounded-full cwgi-w-8 cwgi-h-8 cwgi-overflow-hidden cwgi-flex cwgi-items-center cwgi-justify-center"><svg xmlns=http://www.w3.org/2000/svg class="cwgi-w-4 cwgi-h-4"viewBox="0 0 24 24"stroke-width=2 stroke=currentColor fill=none stroke-linecap=round stroke-linejoin=round><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path></svg></button><button aria-label="Mention this user"class="cwgi-h-[30px] cwgi-leading-[28px] cwgi-px-2 cwgi-rounded-full cwgi-bg-black/5 cwgi-backdrop-blur dark:cwgi-bg-white/10 dark:cwgi-text-white cwgi-text-xs"><svg xmlns=http://www.w3.org/2000/svg class="cwgi-w-4 cwgi-h-4"viewBox="0 0 24 24"stroke-width=2 stroke=currentColor fill=none stroke-linecap=round stroke-linejoin=round><path stroke=none d="M0 0h24v24H0z"fill=none></path><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28">');
const [D, pe] = ce();
Ze.extend(Cn);
function Nn(e) {
  let t = D.comments[e.index()];
  function n(c) {
    D.commentActionDropdown ? pe("commentActionDropdown", "") : pe("commentActionDropdown", c);
  }
  function i(c) {
    let s = " ";
    if ((D.userComment[D.userComment.length - 1] === " " || D.userComment.length === 0) && (s = ""), D.editingCommentId) {
      pe("editingCommentContent", D.editingCommentContent + `${s}@${c} `), document.getElementById("comment_editing_textarea").focus();
      return;
    }
    pe("userComment", D.userComment + `${s}@${c} `), document.getElementById("comment_textarea").focus();
  }
  function r(c) {
    let s = c.match(/@[a-zA-Z0-9-]+/g);
    return s ? s.map((a) => a.replace("@", "")) : [];
  }
  function o(c) {
    let s = r(c);
    return !D.comments[e.index() - 1] || s.length === 0 ? !1 : s.includes(D.comments[e.index() - 1].user.login) ? (pe("comments", e.index() - 1, "has_reply", !0), !0) : !1;
  }
  return (() => {
    var c = Pn(), s = c.firstChild, a = s.firstChild, u = a.firstChild, l = u.firstChild, d = l.nextSibling, g = d.firstChild, v = g.nextSibling, x = s.nextSibling, M = x.nextSibling;
    return k(c, (() => {
      var p = L(() => !!o(t.body));
      return () => p() && Rn();
    })(), s), k(g, () => t.user.login, null), k(g, (() => {
      var p = L(() => t.author_association === "OWNER");
      return () => p() && Un();
    })(), null), k(g, (() => {
      var p = L(() => !!(t.user.login === D.user.login && D.isUserLoggedIn));
      return () => p() && Hn();
    })(), null), k(v, () => Ze(t.created_at).fromNow()), k(a, (() => {
      var p = L(() => !!(D.isUserLoggedIn && D.editingCommentId !== t.id));
      return () => p() && (() => {
        var W = Bn(), S = W.firstChild, O = S.firstChild, E = S.nextSibling;
        return S.addEventListener("mouseleave", () => pe("mouseIsInActionWindow", !1)), S.addEventListener("mouseenter", () => pe("mouseIsInActionWindow", !0)), S.$$click = (C) => {
          C.stopPropagation(), n(t.id);
        }, k(S, R(lt, {
          width: 16,
          height: 16,
          get visible() {
            return D.commentActionDropdown === t.id;
          }
        }), O), E.$$click = () => i(t.user.login), F((C) => {
          var j = D.user.login !== t.user.login, te = D.commentActionDropdown === t.id, Z = D.user.login === t.user.login;
          return j !== C.e && S.classList.toggle("cwgi-hidden", C.e = j), te !== C.t && O.classList.toggle("cwgi-hidden", C.t = te), Z !== C.a && E.classList.toggle("cwgi-hidden", C.a = Z), C;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), W;
      })();
    })(), null), k(s, R(_n, {
      comment: t
    }), null), k(x, R(Ae, {})), k(c, R(An, {
      comment: t
    }), null), k(c, (() => {
      var p = L(() => !!D.showReactions);
      return () => p() && R(jn, {
        comment: t
      });
    })(), null), F((p) => {
      var W = {
        "cwgi-py-8": !o(t.body),
        "cwgi-pt-0 cwgi-pl-6": o(t.body)
      }, S = t.id, O = D.showReactions ? t.has_reply ? "1rem" : "2rem" : "0", E = D.deletingId === t.id ? "none" : "auto", C = D.comments[e.index()].aboutToGetDeleted ? "hidden" : "visible", j = "comment_delete_" + t.id + " .3s ease forwards", te = t.html_url, Z = D.apiBase ? D.apiBase + "/proxy/" + t.user.avatar_url + "&s=64" : t.user.avatar_url + "&s=64", we = !!t.bodyHTML, U = t.bodyHTML ? t.bodyHTML : `<pre>${t.body}</pre>`, I = D.editingCommentId === t.id || !t.bodyHTML;
      return p.e = Ve(c, W, p.e), S !== p.t && ee(c, "id", p.t = S), O !== p.a && ((p.a = O) != null ? c.style.setProperty("padding-bottom", O) : c.style.removeProperty("padding-bottom")), E !== p.o && ((p.o = E) != null ? c.style.setProperty("pointer-events", E) : c.style.removeProperty("pointer-events")), C !== p.i && ((p.i = C) != null ? c.style.setProperty("overflow", C) : c.style.removeProperty("overflow")), j !== p.n && ((p.n = j) != null ? c.style.setProperty("animation", j) : c.style.removeProperty("animation")), te !== p.s && ee(u, "href", p.s = te), Z !== p.h && ee(l, "src", p.h = Z), we !== p.r && x.classList.toggle("cwgi-hidden", p.r = we), U !== p.d && (M.innerHTML = p.d = U), I !== p.l && M.classList.toggle("cwgi-hidden", p.l = I), p;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0,
      n: void 0,
      s: void 0,
      h: void 0,
      r: void 0,
      d: void 0,
      l: void 0
    }), c;
  })();
}
$e(["click"]);
var Wn = /* @__PURE__ */ T('<section data-name=comments class=cwgi-pt-8><div class="cwgi-text-center cwgi-text-base cwgi-font-black cwgi-italic"><span class="cwgi-font-normal cwgi-text-sm cwgi-opacity-80 cwgi-not-italic">No comments for now</span></div><div><button class="cwgi-bg-black/70 dark:cwgi-bg-white/90 cwgi-backdrop-blur cwgi-rounded-3xl cwgi-px-4 cwgi-py-2 cwgi-text-xs cwgi-text-white dark:cwgi-text-black cwgi-mx-auto cwgi-block">Load More'), zn = /* @__PURE__ */ T("<div class=comments-list>"), Fn = /* @__PURE__ */ T('<section data-name="loading screen"class=cwgi-pt-8><div class="cwgi-flex cwgi-text-sm cwgi-justify-center cwgi-items-center"><div>');
const [_, ie] = ce();
function Gn() {
  Oe(We(() => _.shouldListReactionsForCommentId, async (s) => {
    s && (await o(s), ie("shouldListReactionsForCommentId", 0));
  }));
  const e = 50, [t, n] = je(1), [i, r] = je(0);
  async function o(s, a = 3) {
    if (_.showReactions === !1 || a === 0)
      return !1;
    let u = `https://api.github.com/repos/${_.owner}/${_.repo}/issues/comments/${s}/reactions`, l;
    try {
      ie("listingReactionCommentIds", [..._.listingReactionCommentIds, s]), l = await ue(u);
    } catch (d) {
      return console.log(d), await o(s, a - 1), !1;
    } finally {
      ie("listingReactionCommentIds", _.listingReactionCommentIds.filter((d) => d !== s));
    }
    if (!l.ok)
      return console.log("failed to list reactions for comment"), await o(s, a - 1), !1;
    try {
      let d = await l.json(), g = {};
      d.forEach((v) => {
        g[v.content] ? g[v.content].push(v) : g[v.content] = [v];
      }), ie("commentReactionMap", s, g);
    } catch (d) {
      return console.log(d), await o(s, a - 1), !1;
    }
  }
  async function c(s) {
    if (_.gettingUser)
      return !1;
    if (s) {
      let l = _.comments.findIndex((d) => d.id === s);
      if (l !== -1) {
        let d = await st(_.comments[l].body, _.comments[l].id, _.comments[l].updated_at);
        ie("comments", l, "bodyHTML", d);
      }
      return !1;
    }
    ie("gettingComments", !0);
    let u = await (await ue(`https://api.github.com/repos/${_.owner}/${_.repo}/issues/${_.githubIssueId}/comments?per_page=${e}&page=${t()}`)).json();
    ie("gettingComments", !1), ie("comments", [..._.comments, ...u]), r(u.length);
    for (let l = _.comments.length - i(); l < _.comments.length; l++)
      ie("shouldListReactionsForCommentId", _.comments[l].id), _.comments[l].body && async function() {
        let g = await st(_.comments[l].body, _.comments[l].id, _.comments[l].updated_at);
        ie("comments", l, "bodyHTML", g);
      }();
  }
  return vt(async () => {
    await new Promise((s) => setTimeout(s, 20)), await c();
  }), Oe(We(() => _.shouldUpdateCommentId, async (s) => {
    s && (await c(s), ie("shouldUpdateCommentId", 0));
  })), Oe(We(() => t(), async (s) => {
    s !== 1 && (await c(), ie("shouldUpdateCommentId", 0));
  })), [(() => {
    var s = Wn(), a = s.firstChild, u = a.firstChild, l = a.nextSibling, d = l.firstChild;
    return k(s, (() => {
      var g = zn();
      return k(g, R(Ct, {
        get each() {
          return _.comments;
        },
        children: (v, x) => R(Nn, {
          index: x
        })
      })), g;
    })(), l), d.$$click = () => {
      n(() => t() + 1);
    }, F((g) => {
      var v = !!(_.gettingComments && _.comments.length === 0), x = _.comments.length !== 0, M = !!(_.gettingComments || i() < e);
      return v !== g.e && a.classList.toggle("cwgi-hidden", g.e = v), x !== g.t && u.classList.toggle("cwgi-hidden", g.t = x), M !== g.a && l.classList.toggle("cwgi-hidden", g.a = M), g;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), s;
  })(), L(() => L(() => !!_.gettingComments)() && (() => {
    var s = Fn(), a = s.firstChild, u = a.firstChild;
    return k(u, R(Ae, {})), s;
  })())];
}
$e(["click"]);
var Yn = /* @__PURE__ */ T('<div data-name=comments id=cwgi_comments data-version=2024-08-27 class="cwgi-mb-4 cwgi-max-w-[46rem] cwgi-mx-auto"><div class=cwgi-h-[1px]>');
const [Be, J] = ce();
function Vn(e) {
  if (J("githubIssueId", e.githubIssueId), !e.options.owner)
    return console.error("owner is required to init comment system"), !1;
  if (!e.options.repo)
    return console.error("repo is required to init comment system"), !1;
  if (!e.options.clientId)
    return console.error("clientId is required to init comment system"), !1;
  J("owner", e.options.owner), J("repo", e.options.repo), J("clientId", e.options.clientId), J("markdownRenderingEndpoint", e.options.markdownRenderingEndpoint || Be.apiBase + "/markdown"), Object.keys(e.options).includes("remoteMarkdownRendering") && e.options.remoteMarkdownRendering === !1 && J("renderMarkdown", !1), e.options.proxy && (J("apiBase", e.options.proxy), J("proxy", e.options.proxy + "/proxy/")), e.options.reactions === !1 && J("showReactions", !1), Oe(We(() => Be.githubIssueId, () => {
    J("comments", []);
  }));
  async function t() {
    if (J("accessToken", localStorage.getItem("access_token")), !Be.accessToken)
      return !1;
    let n;
    try {
      J("gettingUser", !0), n = await ue("https://api.github.com/user");
    } catch (i) {
      console.log(i);
    } finally {
      J("gettingUser", !1);
    }
    if (!n.ok)
      return !1;
    J("user", await n.json()), J("isUserLoggedIn", !0);
  }
  return vt(async () => {
    let n = new URLSearchParams(document.location.search), i = n.get("access_token"), r = n.get("token_type");
    if (i && r)
      return localStorage.setItem("access_token", i), localStorage.setItem("token_type", r), localStorage.setItem("token_timestamp", /* @__PURE__ */ new Date() + ""), location.href = location.protocol + "//" + location.host + location.pathname + "#comments", !1;
    location.hash === "#comments" && (document.getElementById("cwgi_comments").scrollIntoView({
      behavior: "instant"
    }), history.replaceState(null, "", location.href.split("#")[0])), await t();
  }), L(() => L(() => !!e.githubIssueId)() && (() => {
    var n = Yn();
    return n.firstChild, k(n, R(an, {}), null), k(n, R(yn, {}), null), k(n, R(xn, {}), null), k(n, (() => {
      var i = L(() => !Be.gettingUser);
      return () => i() && R(Gn, {});
    })(), null), n;
  })());
}
var qn = /* @__PURE__ */ T("<div id=cwgi_inner_box>");
let nt = null;
function Jn(e = !1, t = {}) {
  nt && nt();
  let n;
  try {
    n = document.getElementById("cwgi_box");
  } catch {
    return console.error("failed to get root element #cwgi_box, does it exist?"), !1;
  }
  nt = Kt(() => (() => {
    var i = qn();
    return k(i, R(Vn, {
      githubIssueId: e,
      options: t
    })), i;
  })(), n), t.darkMode === void 0 && (window.matchMedia("(prefers-color-scheme: dark)").matches && n.setAttribute("data-mode", "dark"), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (i) => {
    i.matches ? n.setAttribute("data-mode", "dark") : n.removeAttribute("data-mode");
  })), t.darkMode === !0 && n.setAttribute("data-mode", "dark"), t.darkMode === !1 && n.removeAttribute("data-mode");
}
document.addEventListener("DOMContentLoaded", () => {
});
export {
  Jn as init
};
//# sourceMappingURL=cwgi.js.map
