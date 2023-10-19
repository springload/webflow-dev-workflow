(() => {
  var Ce = Object.create;
  var re = Object.defineProperty;
  var Le = Object.getOwnPropertyDescriptor;
  var xe = Object.getOwnPropertyNames;
  var Ae = Object.getPrototypeOf,
    Ie = Object.prototype.hasOwnProperty;
  var Oe = (n, r) => () => (
    r || n((r = { exports: {} }).exports, r), r.exports
  );
  var He = (n, r, i, a) => {
    if ((r && typeof r == "object") || typeof r == "function")
      for (let f of xe(r))
        !Ie.call(n, f) &&
          f !== i &&
          re(n, f, {
            get: () => r[f],
            enumerable: !(a = Le(r, f)) || a.enumerable,
          });
    return n;
  };
  var oe = (n, r, i) => (
    (i = n != null ? Ce(Ae(n)) : {}),
    He(
      r || !n || !n.__esModule
        ? re(i, "default", { value: n, enumerable: !0 })
        : i,
      n,
    )
  );
  var j = Oe((K, V) => {
    (function (n, r) {
      typeof K == "object" && typeof V < "u"
        ? (V.exports = r())
        : typeof define == "function" && define.amd
        ? define(r)
        : (n.Splitting = r());
    })(K, function () {
      "use strict";
      var n = document,
        r = n.createTextNode.bind(n);
      function i(e, t, o) {
        e.style.setProperty(t, o);
      }
      function a(e, t) {
        return e.appendChild(t);
      }
      function f(e, t, o, l) {
        var c = n.createElement("span");
        return (
          t && (c.className = t),
          o && (!l && c.setAttribute("data-" + t, o), (c.textContent = o)),
          (e && a(e, c)) || c
        );
      }
      function p(e, t) {
        return e.getAttribute("data-" + t);
      }
      function w(e, t) {
        return !e || e.length == 0
          ? []
          : e.nodeName
          ? [e]
          : [].slice.call(e[0].nodeName ? e : (t || n).querySelectorAll(e));
      }
      function h(e) {
        for (var t = []; e--; ) t[e] = [];
        return t;
      }
      function u(e, t) {
        e && e.some(t);
      }
      function I(e) {
        return function (t) {
          return e[t];
        };
      }
      function R(e, t, o) {
        var l = "--" + t,
          c = l + "-index";
        u(o, function (y, E) {
          Array.isArray(y)
            ? u(y, function (_) {
                i(_, c, E);
              })
            : i(y, c, E);
        }),
          i(e, l + "-total", o.length);
      }
      var L = {};
      function d(e, t, o) {
        var l = o.indexOf(e);
        if (l == -1)
          o.unshift(e),
            u(L[e].depends, function (y) {
              d(y, e, o);
            });
        else {
          var c = o.indexOf(t);
          o.splice(l, 1), o.splice(c, 0, e);
        }
        return o;
      }
      function s(e, t, o, l) {
        return { by: e, depends: t, key: o, split: l };
      }
      function g(e) {
        return d(e, 0, []).map(I(L));
      }
      function v(e) {
        L[e.by] = e;
      }
      function x(e, t, o, l, c) {
        e.normalize();
        var y = [],
          E = document.createDocumentFragment();
        l && y.push(e.previousSibling);
        var _ = [];
        return (
          w(e.childNodes).some(function (b) {
            if (b.tagName && !b.hasChildNodes()) {
              _.push(b);
              return;
            }
            if (b.childNodes && b.childNodes.length) {
              _.push(b), y.push.apply(y, x(b, t, o, l, c));
              return;
            }
            var P = b.wholeText || "",
              te = P.trim();
            te.length &&
              (P[0] === " " && _.push(r(" ")),
              u(te.split(o), function (_e, be) {
                be && c && _.push(f(E, "whitespace", " ", c));
                var ne = f(E, t, _e);
                y.push(ne), _.push(ne);
              }),
              P[P.length - 1] === " " && _.push(r(" ")));
          }),
          u(_, function (b) {
            a(E, b);
          }),
          (e.innerHTML = ""),
          a(e, E),
          y
        );
      }
      var C = 0;
      function H(e, t) {
        for (var o in t) e[o] = t[o];
        return e;
      }
      var A = "words",
        B = s(A, C, "word", function (e) {
          return x(e, "word", /\s+/, 0, 1);
        }),
        k = "chars",
        N = s(k, [A], "char", function (e, t, o) {
          var l = [];
          return (
            u(o[A], function (c, y) {
              l.push.apply(l, x(c, "char", "", t.whitespace && y));
            }),
            l
          );
        });
      function O(e) {
        e = e || {};
        var t = e.key;
        return w(e.target || "[data-splitting]").map(function (o) {
          var l = o["\u{1F34C}"];
          if (!e.force && l) return l;
          l = o["\u{1F34C}"] = { el: o };
          var c = g(e.by || p(o, "splitting") || k),
            y = H({}, e);
          return (
            u(c, function (E) {
              if (E.split) {
                var _ = E.by,
                  b = (t ? "-" + t : "") + E.key,
                  P = E.split(o, y, l);
                b && R(o, b, P), (l[_] = P), o.classList.add(_);
              }
            }),
            o.classList.add("splitting"),
            l
          );
        });
      }
      function M(e) {
        e = e || {};
        var t = (e.target = f());
        return (t.innerHTML = e.content), O(e), t.outerHTML;
      }
      (O.html = M), (O.add = v);
      function T(e, t, o) {
        var l = w(t.matching || e.children, e),
          c = {};
        return (
          u(l, function (y) {
            var E = Math.round(y[o]);
            (c[E] || (c[E] = [])).push(y);
          }),
          Object.keys(c).map(Number).sort(m).map(I(c))
        );
      }
      function m(e, t) {
        return e - t;
      }
      var S = s("lines", [A], "line", function (e, t, o) {
          return T(e, { matching: o[A] }, "offsetTop");
        }),
        he = s("items", C, "item", function (e, t) {
          return w(t.matching || e.children, e);
        }),
        ge = s("rows", C, "row", function (e, t) {
          return T(e, t, "offsetTop");
        }),
        ye = s("cols", C, "col", function (e, t) {
          return T(e, t, "offsetLeft");
        }),
        Ee = s("grid", ["rows", "cols"]),
        D = "layout",
        ve = s(D, C, C, function (e, t) {
          var o = (t.rows = +(t.rows || p(e, "rows") || 1)),
            l = (t.columns = +(t.columns || p(e, "columns") || 1));
          if (
            ((t.image = t.image || p(e, "image") || e.currentSrc || e.src),
            t.image)
          ) {
            var c = w("img", e)[0];
            t.image = c && (c.currentSrc || c.src);
          }
          t.image && i(e, "background-image", "url(" + t.image + ")");
          for (var y = o * l, E = [], _ = f(C, "cell-grid"); y--; ) {
            var b = f(_, "cell");
            f(b, "cell-inner"), E.push(b);
          }
          return a(e, _), E;
        }),
        we = s("cellRows", [D], "row", function (e, t, o) {
          var l = t.rows,
            c = h(l);
          return (
            u(o[D], function (y, E, _) {
              c[Math.floor(E / (_.length / l))].push(y);
            }),
            c
          );
        }),
        Te = s("cellColumns", [D], "col", function (e, t, o) {
          var l = t.columns,
            c = h(l);
          return (
            u(o[D], function (y, E) {
              c[E % l].push(y);
            }),
            c
          );
        }),
        Se = s(
          "cells",
          ["cellRows", "cellColumns"],
          "cell",
          function (e, t, o) {
            return o[D];
          },
        );
      return (
        v(B),
        v(N),
        v(S),
        v(he),
        v(ge),
        v(ye),
        v(Ee),
        v(ve),
        v(we),
        v(Te),
        v(Se),
        O
      );
    });
  });
  var U = oe(j());
  var F = ".hero-animation__trigger--heading",
    X = ".hero-animation__trigger--section",
    z = ".hero-animation__target",
    G = ".changing-taglines__container",
    ie = ".changing-taglines__tagline",
    q = ".typing__link",
    ae = ".typing__text",
    Y = ".ticker-tape__link",
    se = ".ytdefer";
  function le() {
    let r = Array.from(document.querySelectorAll(ie))
      .map((d) => ({ value: d, sort: Math.random() }))
      .sort((d, s) => d.sort - s.sort)
      .map(({ value: d }) => d);
    document.querySelector(G)?.replaceChildren(...r);
    let a = 1e3,
      f = 600,
      p = 600,
      w = 200,
      h = 3e3,
      u = "both",
      I = [
        {
          offset: 0,
          transform: "translateY(100%)",
          filter: "blur(2px)",
          easing: "cubic-bezier(.26,.39,.31,1)",
        },
        { offset: 0, opacity: 0, easing: "linear" },
        { offset: 1, transform: "translateY(0)", filter: "blur(0)" },
        { offset: 1, opacity: 1 },
      ],
      R = [
        {
          offset: 0,
          transform: "translateY(0)",
          filter: "blur(0)",
          easing: "cubic-bezier(.69,.1,.74,.61)",
        },
        { offset: 0, opacity: 1, easing: "linear" },
        { offset: 0.75, opacity: 0 },
        { offset: 1, transform: "translateY(-100%)", filter: "blur(2px)" },
        { offset: 1, opacity: 0 },
      ],
      L = (d, s) => {
        let g = (d + 1) % s.length,
          v = s[d],
          x = s[g];
        v.animate(R, { delay: h, duration: p, fill: u }),
          x
            .animate(I, { delay: h + w, duration: f, fill: u })
            .finished.then(() => L(g, s));
      };
    r[0]
      .animate(I, { duration: f, delay: a, fill: u })
      .finished.then(() => L(0, r));
  }
  function W(n) {
    document
      .querySelector(n)
      ?.getAnimations({ subtree: !0 })
      .filter((i) => i.playState === "running")
      .map((i) => i.pause());
  }
  function $(n) {
    document
      .querySelector(n)
      ?.getAnimations({ subtree: !0 })
      .filter((i) => i.playState === "paused")
      .map((i) => i.play());
  }
  function Q(n) {
    let r = (f) => {
        f.forEach((p) => {
          p.isIntersecting ? $(n) : W(n);
        });
      },
      i = new IntersectionObserver(r),
      a = document.querySelector(n);
    a && i.observe(a);
  }
  function J() {
    let n = document.querySelector(X),
      r = document.querySelector(F);
    if (!n || !r)
      throw new Error(
        "Cannot find heading or hero section for header animation",
      );
    let i = () => (r.style.opacity = "0");
    i();
    let a = document.querySelector(G),
      f = !1,
      p = !1,
      w = !0,
      h = (s) => {
        s.forEach((g) => {
          g.target.className.includes(X) &&
            (p && !f && i(), g.isIntersecting || ((w = !0), a && p && W(G)));
        });
      },
      u = (s) => {
        s.forEach((g) => {
          g.target.className.includes(F) &&
            g.isIntersecting &&
            w &&
            (L(), (f = !0), (w = !1), a && (p ? $(G) : le()));
        });
      },
      I = new IntersectionObserver(h, { threshold: 0.25 }),
      R = new IntersectionObserver(u, { threshold: 0.5 });
    I.observe(n), R.observe(r);
    function L() {
      let s = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (!s || s.matches) return;
      let g = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "x",
          "y",
          "z",
        ],
        v = [
          "!",
          "@",
          "(",
          ")",
          "-",
          "+",
          "=",
          "[",
          "]",
          "{",
          "}",
          ";",
          ":",
          "<",
          ">",
          ",",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
        ],
        x = [...g, ...g, ...v],
        { targetEl: C, cloneOfOriginalEl: H, lines: A, totalChars: B } = d(z),
        k = 20,
        N = ({ spanEl: m }) =>
          m.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 100,
            fill: "forwards",
          }),
        O = ({ spanEl: m }) =>
          (m.innerHTML = x[Math.floor(Math.random() * x.length)]),
        M = B,
        T = (m, S = 0) => {
          S === k - 1 ? ((m.spanEl.innerHTML = m.originalChar), --M) : O(m),
            S === 0 && N(m),
            M === 0 && (C.replaceWith(H), (f = !1), (p = !0)),
            ++S,
            S < k && setTimeout(() => T(m, S), 40);
        };
      A.forEach((m) =>
        m.cells.forEach((S) => setTimeout(() => T(S), (S.position + 1) * 30)),
      );
    }
    function d(s = z) {
      let g = document.querySelector(s);
      if (!g) throw new Error(`Heading element to animate not found: ${z}`);
      let v = g.cloneNode(!0),
        x = (0, U.default)({ target: g, by: "lines" }),
        C = x.map((N) => (0, U.default)({ target: N.words })),
        H = x[0].lines.map((N, O) => {
          let T = C[0]
            .filter(({ el: m }) => N.includes(m))
            .map((m) => m.chars)
            .flat()
            .map((m, S) => ({
              spanEl: m,
              position: S,
              originalChar: m.innerHTML,
            }));
          return { position: O, cells: T };
        }),
        A = document.querySelector(F);
      if (A) A.style.opacity = "1";
      else throw new Error("Heading wrapper not found");
      let B = H.reduce((N, O) => N + O.cells.length, 0);
      return (
        (() => {
          let M = Array.from(g.children)
            .reduce((T, m) => {
              let S = parseInt(
                getComputedStyle(m).getPropertyValue("--line-index"),
              );
              return m.tagName === "BR"
                ? T
                : m.className === "whitespace"
                ? (T[T.length - 1].push(m), T)
                : (T[S] || (T[S] = []), T[S].push(m), T);
            }, [])
            .map((T) => {
              let m = document.createElement("span");
              return (
                m.setAttribute("class", "no-wrap"),
                m.setAttribute("aria-hidden", "true"),
                T.forEach((S) => m.appendChild(S)),
                m
              );
            });
          g.replaceChildren(...M);
        })(),
        { targetEl: g, cloneOfOriginalEl: v, lines: H, totalChars: B }
      );
    }
  }
  var ce = oe(j());
  function ue() {
    let n = document.querySelector(ae);
    if (!n) throw new Error("Text to animate not found");
    let r = n?.dataset?.color === "white" ? "0, 0%, 100%" : "0, 0%, 11.8%",
      i = `hsla(${r}, 0)`,
      a = `hsla(${r}, 1)`,
      f = "2px",
      p = `${f} 0 0 ${i}`,
      w = "-" + p,
      h = `${f} 0 0 ${a}`,
      u = "-" + h,
      I = [
        { offset: 0.4, boxShadow: w },
        { offset: 0.5, boxShadow: u },
        { offset: 0.9, boxShadow: u },
      ],
      R = [
        { offset: 0.2, boxShadow: p },
        { offset: 0.3, boxShadow: h },
        { offset: 0.7, boxShadow: h },
        { offset: 0.8, boxShadow: p },
      ],
      L = [
        { boxShadow: p, color: a, offset: 0.2 },
        { boxShadow: h, offset: 0.3 },
        { boxShadow: h, offset: 0.99 },
        { boxShadow: p, color: a },
      ],
      d = 1200,
      s = 2e3;
    (0, ce.default)({ target: n, by: "chars", key: null });
    let g = n?.querySelectorAll(`${q} .char, ${q} .whitespace`);
    g[0].animate(I, d);
    let v = d;
    g?.forEach((H) => {
      let A = C();
      H.animate(L, { delay: v, duration: A, fill: "forwards" }), (v += A);
    });
    let x = g[g.length - 1];
    Promise.all(n.getAnimations({ subtree: !0 }).map((H) => H.finished)).then(
      () => {
        x.animate(R, { duration: s, iterations: 1 / 0 });
      },
    );
    function C() {
      return Math.random() * (200 - 60) + 60;
    }
  }
  var Z = 73,
    ee = 52,
    de =
      'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48" width="100%" height="100%"><path class="ytp-large-play-button-bg" d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.6C4 2.3 2.3 4.8 1.5 7.7.1 13.1 0 24 0 24s.1 10.9 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.6c2.9-.8 4.6-3.3 5.4-6.2C67.9 35 68 24 68 24S67.9 13.1 66.5 7.7z"></path><path d="M 45,24 27,14 27,34" fill="#fff" fill-opacity="1"></path></svg>',
    Ne = '<svg fill="#eb3223" ' + de,
    me = '<svg fill="#212121" fill-opacity="0.8"' + de;
  function pe() {
    for (
      var n = document, r = n.getElementsByClassName("ytdefer"), i = 0;
      i < r.length;
      i++
    ) {
      var a = r[i],
        f = a.getAttribute("data-src");
      if (!f) {
        alert("data-src missing for video");
        return;
      }
      var p = a.clientWidth,
        w = a.clientHeight,
        h = n.createElement("div");
      (h.id = "ytdefer_vid" + i),
        (h.style.width = p + "px"),
        (h.style.height = w + "px"),
        (h.style.position = "relative"),
        (h.onresize = fe),
        a.appendChild(h);
      var u = n.createElement("img");
      if (a.hasAttribute("data-alt")) {
        var I = a.getAttribute("data-alt");
        u.alt = I;
      }
      if (a.hasAttribute("data-title")) {
        var R = a.getAttribute("data-title");
        u.title = R;
      }
      var L = "0";
      p > 480 && (L = "maxresdefault"),
        (u.src = "https://img.youtube.com/vi/" + f + "/" + L + ".jpg"),
        (u.id = "ytdefer_img" + i),
        (u.style.width = "100%"),
        (u.style.height = "100%"),
        (u.style.objectFit = "cover"),
        (u.style.position = "absolute"),
        (u.onclick = Pe(i)),
        h.appendChild(u);
      var d = n.createElement("button");
      (d.style.backgroundImage =
        "url(data:image/svg+xml;base64," + window.btoa(me) + ")"),
        (d.id = "ytdefer_icon" + i),
        d.setAttribute("aria-label", "Play"),
        (d.style.position = "absolute"),
        (d.style.border = "0"),
        (d.style.backgroundColor = "transparent"),
        (d.style.left = p / 2 - Z / 2 + "px"),
        (d.style.top = w / 2 - ee / 2 + "px"),
        (d.style.width = Z + "px"),
        (d.style.height = ee + "px"),
        (d.style.pointerEvents = "none"),
        h.appendChild(d),
        (u.onmouseover = Me(d)),
        (u.onmouseout = Re(d));
    }
    if (typeof YT > "u") {
      var s = n.createElement("script");
      (s.type = "text/javascript"),
        (s.src = "https://www.youtube.com/player_api"),
        n.body.appendChild(s);
    }
    window.addEventListener("resize", fe);
  }
  function fe() {
    for (
      var n = document, r = n.getElementsByClassName("ytdefer"), i = 0;
      i < r.length;
      i++
    ) {
      var a = r[i],
        f = a.clientWidth,
        p = a.clientHeight,
        w = n.getElementById("ytdefer_vid" + i);
      (w.style.width = f + "px"), (w.style.height = p + "px");
      var h = n.getElementById("ytdefer_icon" + i);
      h != null &&
        ((h.style.left = f / 2 - Z / 2 + "px"),
        (h.style.top = p / 2 - ee / 2 + "px"));
    }
  }
  function Re(n) {
    return function () {
      n.style.backgroundImage =
        "url(data:image/svg+xml;base64," + window.btoa(me) + ")";
    };
  }
  function Me(n) {
    return function () {
      n.style.backgroundImage =
        "url(data:image/svg+xml;base64," + window.btoa(Ne) + ")";
    };
  }
  function Pe(n) {
    return function () {
      var r = document,
        i = r.getElementById("ytdefer_vid" + n),
        a = i.parentNode.getAttribute("data-src"),
        f = new YT.Player(i.id, {
          height: i.style.height,
          width: i.style.width,
          videoId: a,
          events: {
            onReady: function (p) {
              p.target.playVideo();
            },
          },
        });
    };
  }
  document.addEventListener("DOMContentLoaded", () => {
    J(), document.querySelector(q) && (ue(), Q(q));
    let r = document.querySelector(Y);
    r &&
      (Q(Y),
      r?.addEventListener("mouseover", () => W(Y)),
      r?.addEventListener("mouseout", () => $(Y))),
      document.querySelector(se) && pe();
  });
})();
//# sourceMappingURL=index.js.map
//
