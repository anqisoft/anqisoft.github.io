"use strict";

function draw() {
  setF1Content("?lang=en_us&landscape=true&no=1\nlang:en_us, zh_cn, zh_tw\nlandscape:true, false\nno:1,2");
  var t = window.location.href;
  parseExpressBoxParamsFromUrl(t);
  parsePageParamsFromUrl(t);
  var n = "&a3=true&landscape=false&lang=".concat(LANG, "&no=").concat(NO);
  parsePageParamsFromUrl(n);
  parseExpressBoxParamsFromUrl(n);
  document.getElementsByTagName("title")[0].innerText = "".concat([{
    en_us: "A3 D10 Landscape ",
    zh_cn: "A3_带正方形截面的长方体_横排",
    zh_tw: "A3_帶正方形截面的長方體_橫排"
  }, {
    en_us: "A3 D10 Portrait ",
    zh_cn: "A3_带正方形截面的长方体_竖排",
    zh_tw: "A3_帶正方形截面的長方體_豎排"
  }][LANDSCAPE ? 0 : 1][LANG]).concat(NO);
  document.getElementById("style").innerHTML = getPageCss(A3, LANDSCAPE, PAGE_PADDING_TOP, PAGE_PADDING_LEFT).concat("svg{}");
  var e = document.getElementsByTagName("body")[0];
  var o = createPageElement();
  e.appendChild(o);
  appendPortraitDices2(o);
}

function appendPortraitDices2(L) {
  var u = Math.floor,
      t = Math.ceil;
  var l = [[], [], [], "1,2,3,4,5,1,2,3,4,5".split(","), "甲、乙、丙、丁、戊、己、庚、辛、壬、癸".split("、"), "甲木、乙木、丙火、丁火、戊土、己土、庚金、辛金、壬水、癸水".split("、"), "阏逢、旃蒙、柔兆、强圉、著雍、屠维、上章、重光、玄黓、昭阳".split("、")];

  for (var _t2 = 0; _t2 < 10; ++_t2) {
    l[0].push((_t2 + 1).toString());
    l[1].push(_t2.toString());
    l[2].push((10 * _t2).toString());
  }

  var O = l.length;
  var d = 7;
  var n = 4;
  var p = d * n;
  var f = 0;
  [{
    SIDE: 10,
    PASTE_WIDTH: 6,
    COUNT: p + 3
  }].forEach(function (_ref, t) {
    var n = _ref.SIDE,
        e = _ref.PASTE_WIDTH,
        o = _ref.COUNT;

    for (var _t3 = 0; _t3 < o; ++_t3) {
      var _getSvgOfDice = getSvgOfDice10(n, e, l[_t3 % O]),
          s = _getSvgOfDice.html,
          c = _getSvgOfDice.width,
          i = _getSvgOfDice.height;

      var _createSvgElement = createSvgElement(s, c, i),
          r = _createSvgElement.svgElement;

      L.appendChild(r);
      r.widthMm = c;
      r.heightMm = i;
      r.setAttribute("id", "svg".concat(++f));
      var g = r.style;

      if (_t3 >= p) {
        g.position = "absolute";
        g.transform = "rotate(-90deg)";
        var a = "".concat(c * .5, "mm");
        g.transformOrigin = "".concat(a, " ").concat(a);
        var m = (i - c) * .5 * 1.7;
        g.bottom = "-".concat(PAGE_PADDING_TOP + m, "mm");
        g.left = "".concat(PAGE_PADDING_LEFT + i * (_t3 % p), "mm");
      } else {
        g.position = "absolute";
        g.left = "".concat(PAGE_PADDING_LEFT + (c - n * 1.3) * (_t3 % d), "mm");
        g.top = "".concat(PAGE_PADDING_TOP + i * u(_t3 / d), "mm");
      }
    }
  });
}

function appendPortraitDices1(u) {
  var l = 0;
  [{
    SIDE: 20,
    PASTE_WIDTH: 8,
    COUNT: 3
  }, {
    SIDE: 10,
    PASTE_WIDTH: 6,
    COUNT: 12
  }].forEach(function (_ref2, s) {
    var n = _ref2.SIDE,
        e = _ref2.PASTE_WIDTH,
        o = _ref2.COUNT;

    for (var t = 0; t < o; ++t) {
      var _getSvgOfDice2 = getSvgOfDice10(n, e, CONTENTS_ARRAY[t % CONTENTS_ARRAY_LENGTH]),
          c = _getSvgOfDice2.html,
          i = _getSvgOfDice2.width,
          r = _getSvgOfDice2.height;

      var _createSvgElement2 = createSvgElement(c, i, r),
          g = _createSvgElement2.svgElement;

      u.appendChild(g);
      g.widthMm = i;
      g.heightMm = r;
      g.setAttribute("id", "svg".concat(++l));

      if (t > 0) {
        var a = g.style;
        a.position = "relative";

        if (s === 0) {
          var m = "-".concat(n * .5 * t, "mm");
          a.left = m;
          a.marginLeft = m;
        } else {
          var L = 6;

          if (t % L) {
            var _m = "-".concat(n * .25 * (t % L), "mm");

            a.left = _m;
            a.marginLeft = _m;
          }
        }
      }
    }
  });
}

function appendLandscapeDices1(t) {}

function appendLandscapeDices2(t) {}

function getInnerLine(t, n, e, o) {
  return "<line x1=\"".concat(t, "mm\" x2=\"").concat(n, "mm\" y1=\"").concat(e, "mm\" y2=\"").concat(o, "mm\" style=\"stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;\"></line>");
}

function getOuterLine(t, n, e, o) {
  return "<line x1=\"".concat(t, "mm\" x2=\"").concat(n, "mm\" y1=\"").concat(e, "mm\" y2=\"").concat(o, "mm\" style=\"stroke:#555;stroke-width:0.2mm;\"></line>");
}

function getSvgTextHtml(t, n, e, o, s) {
  var c = "<text x=\"".concat(t, "mm\" y=\"").concat(n, "mm\" style=\"dominant-baseline:middle;text-anchor:middle;font-size:3mm;font-family: 'Kaiti';").concat(s ? "transform: rotate(".concat(s, "deg);transform-origin: ").concat(t, "mm ").concat(n, "mm;") : "").concat(e, "\" >").concat(o.indexOf("<") > -1 ? o : o.split("").map(function (t) {
    return getSvgTsSpanHtml(e, t, 0, 0, 0);
  }).join(""), "</text>");
  return c;
}

function getSvgTsSpanHtml(t, n, e, o, s) {
  s = s || 0;
  return "<tspan dx=\"".concat(e, "mm\" dy=\"").concat(o, "mm\" rotate=\"").concat(s, "\" style=\"").concat(t, "dominant-baseline:middle;text-anchor:middle;").concat(n === "6" || n === "9" ? "text-decoration:underline;" : "").concat(n === "ü" ? "opacity:0.85;font-size:0.9em;" : "", "\">").concat(n, "</tspan>");
}

function getSvgOfDice10(t, n, b, z) {
  var U = Math.max,
      F = Math.min,
      e = Math.sin,
      o = Math.cos,
      M = Math.tan,
      k = Math.atan,
      s = Math.PI,
      B = Math.abs;
  t = U(1, t || 10);
  n = U(1, n || 5);

  if (!b) {
    b = "1,2,3,4,5,6,7,8,9,10".split(",");
  }

  if (!z) {
    z = "".concat(5 * t / 10, "mm");
  }

  var c = t * 2.55;
  var i = t * 2.55;
  var r = 50.22;
  var g = r * s / 180;
  var a = g * .5;
  var W = 94.7 * s / 180;
  var R = (s - a - W) * 2;
  var m = s * .5;
  var L = 45 * s / 180;
  var j = m - a;
  var Y = W - j;
  var K = t * e(Y);
  var q = t * o(Y);
  var u = q / e(a);
  var J = u * e(j);
  var l = K + J;
  var Q = a;
  var V = c,
      X = i + l;
  var Z = u * e(Q);
  var tt = u * o(Q);
  var O = c - Z,
      d = c + Z;
  var p = i + tt,
      f = i + tt;
  var nt = g;
  var h = c + l * e(nt);
  var I = i + l * o(nt);
  var et = g * 1.5;
  var $ = c + u * e(et);
  var A = i + u * o(et);
  var ot = g * 2 - m;
  var E = c + l * o(ot);
  var P = i - l * e(ot);
  var st = g * 2.5 - m;
  var D = c + u * o(st);
  var T = i - u * e(st);
  var ct = g * 3 - m;

  var _ = c + l * o(ct);

  var x = i - l * e(ct);
  var it = s - g * 3.5;
  var y = c + u * e(it);
  var S = i - u * o(it);
  var rt = g * 4 - s;
  var N = c - l * e(rt);
  var v = i - l * o(rt);
  var gt = g * 4.5 - s;
  var G = c - u * e(gt);
  var w = i - u * o(gt);
  var C = O + V - c;
  var H = p + X - i;
  var at = O,
      mt = p;
  var Lt = V,
      ut = X;
  var lt = C * 2 - Lt,
      Ot = ut;
  var dt = g;
  var pt = C + l * e(dt);
  var ft = H - l * o(dt);
  var ht = g * 1.5;
  var It = C + u * e(ht);
  var $t = H - u * o(ht);
  var At = g * 2 - m;
  var Et = C + l * o(At);
  var Pt = H + l * e(At);
  var Dt = g * 2.5 - m;
  var Tt = C + u * o(Dt);

  var _t = H + u * e(Dt);

  var xt = g * 3 - m;
  var yt = C + l * o(xt);
  var St = H + l * e(xt);
  var Nt = s - g * 3.5;
  var vt = C + u * e(Nt);
  var Gt = H + u * o(Nt);
  var wt = g * 4 - s;
  var Ct = C - l * e(wt);
  var Ht = H + l * o(wt);
  var bt = g * 4.5 - s;
  var zt = C - u * e(bt);
  var Ut = H + u * o(bt);
  var Ft = L - a;
  var Mt = lt - n * e(Ft);
  var kt = Ot + n * o(Ft);
  var Bt = L + a;
  var Wt = C - n * e(Bt);
  var Rt = H - n * o(Bt);
  var jt = L + a;
  var Yt = c - n * e(jt);
  var Kt = i + n * o(jt);
  var qt = s - (L + W + g * 4.5 - s);
  var Jt = G + n * e(qt);
  var Qt = w - n * o(qt);
  var Vt = L - a;
  var Xt = O - n * e(Vt);
  var Zt = p - n * o(Vt);
  var tn = R * .5 + L - m;
  var nn = V + n * o(tn);
  var en_us = X + n * e(tn);
  var on = s - (L + W + a);
  var sn = d - n * e(on);
  var cn = f + n * o(on);
  var rn = s - (L + W - a);
  var gn = d + n * e(rn);
  var an = f + n * o(rn);
  var mn = k((h - d) / (f - I)) - L;
  var Ln = h - n * e(mn);
  var un = I + n * o(mn);
  var ln = k(($ - h) / (I - A));
  var On = ln - L;
  var dn = h + n * o(On);
  var pn = I + n * e(On);
  var fn = L - ln;
  var hn = $ + n * e(fn);
  var In = A + n * o(fn);
  var $n = k((E - $) / (A - P));
  var An = L - $n;
  var En = $ + n * o(An);
  var Pn = A - n * e(An);
  var Dn = m - ($n + L);
  var Tn = E + n * e(Dn);

  var _n = P + n * o(Dn);

  var xn = k((E - D) / (P - T));
  var yn = m - (xn + L);
  var Sn = E + n * e(yn);
  var Nn = P - n * o(yn);
  var vn = xn - L;
  var Gn = D + n * o(vn);
  var wn = T - n * e(vn);
  var Cn = k((D - _) / (T - x));
  var Hn = m - (Cn + L);
  var bn = D + n * e(Hn);
  var zn = T - n * o(Hn);
  var Un = L - Cn;

  var Fn = _ + n * o(Un);

  var Mn = x + n * e(Un);
  var kn = k((_ - y) / (x - S));
  var Bn = L + kn;

  var Wn = _ - n * o(Bn);

  var Rn = x + n * e(Bn);
  var jn = L + kn;
  var Yn = y + n * o(jn);
  var Kn = S + n * e(jn);
  var qn = k((y - N) / (S - v));
  var Jn = L + qn;
  var Qn = y + n * o(Jn);
  var Vn = S - n * e(Jn);
  var Xn = qn - L;
  var Zn = N + n * o(Xn);
  var te = v - n * e(Xn);
  var ne = k((N - G) / (w - v));
  var ee = ne - L;
  var oe = N - n * o(ee);
  var se = v - n * e(ee);
  var ce = "font-size:".concat(z);
  var ie = "".concat([{
    x: (lt + Lt) * .5,
    y: (Ot + ut) * .5,
    rotate: 0
  }, {
    x: (D + y) * .5,
    y: (T + S) * .5,
    rotate: 360 - r * 3
  }, {
    x: (It + Tt) * .5,
    y: ($t + _t) * .5,
    rotate: r * 2
  }, {
    x: (O + d) * .5,
    y: (p + f) * .5,
    rotate: 0
  }, {
    x: (vt + zt) * .5,
    y: (Gt + Ut) * .5,
    rotate: r * 4
  }, {
    x: (d + $) * .5,
    y: (f + A) * .5,
    rotate: -r
  }, {
    x: (Tt + vt) * .5,
    y: (_t + Gt) * .5,
    rotate: r * 3
  }, {
    x: (y + G) * .5,
    y: (S + w) * .5,
    rotate: 360 - r * 4
  }, {
    x: (Lt + It) * .5,
    y: (ut + $t) * .5,
    rotate: r
  }, {
    x: ($ + D) * .5,
    y: (A + T) * .5,
    rotate: 360 - r * 2
  }].map(function (_ref3, o) {
    var t = _ref3.x,
        n = _ref3.y,
        e = _ref3.rotate;
    var s = t,
        c = n;
    return getSvgTextHtml(s, c, ce, b[o], e);
  }).join(""), getOuterLine(nn, V, en_us, X), getOuterLine(nn, sn, en_us, cn), getOuterLine(sn, d, cn, f), getOuterLine(d, gn, f, an), getOuterLine(gn, Ln, an, un), getOuterLine(Ln, h, un, I), getOuterLine(h, dn, I, pn), getOuterLine(dn, hn, pn, In), getOuterLine(hn, $, In, A), getOuterLine($, En, A, Pn), getOuterLine(En, Tn, Pn, _n), getOuterLine(Tn, E, _n, P), getOuterLine(E, Sn, P, Nn), getOuterLine(Sn, Gn, Nn, wn), getOuterLine(Gn, D, wn, T), getOuterLine(D, bn, T, zn), getOuterLine(bn, Fn, zn, Mn), getOuterLine(Fn, _, Mn, x), getOuterLine(_, Wn, x, Rn), getOuterLine(Wn, Yn, Rn, Kn), getOuterLine(Yn, y, Kn, S), getOuterLine(y, Qn, S, Vn), getOuterLine(Qn, Zn, Vn, te), getOuterLine(Zn, N, te, v), getOuterLine(N, oe, v, se), getOuterLine(oe, Jt, se, Qt), getOuterLine(Jt, G, Qt, w), getOuterLine(c, G, i, w), getInnerLine(G, N, w, v), getInnerLine(N, y, v, S), getInnerLine(y, _, S, x), getInnerLine(_, D, x, T), getInnerLine(D, E, T, P), getInnerLine(E, $, P, A), getInnerLine($, h, A, I), getInnerLine(h, d, I, f), getInnerLine(d, V, f, X), getInnerLine(V, O, X, p), getInnerLine(c, y, i, S), getInnerLine(c, D, i, T), getInnerLine(c, $, i, A), getInnerLine(c, d, i, f), getInnerLine(c, O, i, p), getOuterLine(C, zt, H, Ut), getOuterLine(zt, Ct, Ut, Ht), getOuterLine(Ct, vt, Ht, Gt), getOuterLine(vt, yt, Gt, St), getOuterLine(yt, Tt, St, _t), getOuterLine(Tt, Et, _t, Pt), getOuterLine(Et, It, Pt, $t), getOuterLine(It, pt, $t, ft), getOuterLine(pt, Lt, ft, ut), getInnerLine(Lt, at, ut, mt), getOuterLine(at, lt, mt, Ot), getInnerLine(C, vt, H, Gt), getInnerLine(C, Tt, H, _t), getInnerLine(C, It, H, $t), getInnerLine(C, Lt, H, ut), getInnerLine(C, lt, H, Ot), getOuterLine(c, Yt, i, Kt), getOuterLine(Yt, Xt, Kt, Zt), getOuterLine(Xt, O, Zt, p), getOuterLine(Jt, G, Qt, w), getOuterLine(C, Wt, H, Rt), getOuterLine(Wt, Mt, Rt, kt), getOuterLine(Mt, lt, kt, Ot));
  var re = U(O, V, d, h, $, E, D, _, y, N, G, lt, at, Lt, pt, It, Et, Tt, yt, vt, Ct, zt, Sn, Tn, En, hn) + t * .1;
  var ge = F(O, V, d, h, $, E, D, _, y, N, G, lt, at, Lt, pt, It, Et, Tt, yt, vt, Ct, zt);
  var ae = U(p, X, f, I, A, P, T, x, S, v, w, Ot, mt, ut, ft, $t, Pt, _t, St, Gt, Ht, Ut);
  var me = F(p, X, f, I, A, P, T, x, S, v, w, Ot, mt, ut, ft, $t, Pt, _t, St, Gt, Ht, Ut);
  var Le = re;
  var ue = ae;
  return {
    html: ie,
    width: Le,
    height: ue
  };
}

draw();