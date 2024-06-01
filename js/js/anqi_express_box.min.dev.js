"use strict";

function parseExpressBoxParamsFromUrl(t) {
  t = t.replace("?", "&").toLowerCase();
  var n = Math.max,
      e = Math.min;
  window.THICKESS = n(0, e(1, parseFloat(t.concat("&thickess=1").replace("&thickess=", "厶").split("厶")[1].split("&")[0])));
  window.NO = n(0, parseInt(t.concat("&no=1").replace("&no=", "厶").split("厶")[1].split("&")[0]));
  window.LANG = t.concat("&lang=en_us").replace("&lang=", "厶").split("厶")[1].split("&")[0];

  if (["en_us", "zh_cn", "zh_tw"].indexOf(window.LANG) === -1) {
    window.LANG = "en_us";
  }
}

function getExpressBoxSvgHtml(t, n, e, $) {
  var o = Math.max,
      W = Math.min;
  t = o(1, t || 40);
  n = o(1, n || 30);
  e = o(1, e || 20);
  $ = o(2, $ || 5);
  var i = t + e * 4 + $ * 2;
  var c = e * 3 + n * 2;
  var s = t * .5;
  var a = s + e * 2 + $ * 1;
  var l = mmToPxScale * t;
  var m = mmToPxScale * n;
  var h = mmToPxScale * e;
  var r = mmToPxScale * $;
  var v = mmToPxScale * THICKESS;
  var K = e * .5;
  var N = e * .25;
  var q = n * .25;
  var G = n * .5;
  var d = mmToPxScale * K;
  var g = mmToPxScale * G;
  var S = mmToPxScale * N;
  var x = mmToPxScale * q;
  var p = mmToPxScale * o(n, e) * .25;
  var w = h - S * 2 - v * 2;
  var u = m - x * 2 - v * 2;
  var I = h - p * 2 - v * 2;
  var L = m - r * 2 - v * 2;
  var T = "";
  var O = 0;
  var f = O + e;
  var H = f + n;
  var P = H + e;
  var C = P + n;
  var B = C + e;
  var E = P + THICKESS;
  var z = C - THICKESS;
  var M = a - s;
  var V = M - e;
  var k = V - e;
  var F = k - $;
  var y = a + s;
  var b = y + e;
  var A = b + e;

  var _ = A + $;

  T += "<path fill=\"none\" stroke=\"#000000\" d=\"M ".concat(mmToPxScale * M, ",0 h ").concat(l, "\n\nv ").concat(v, "\na ").concat(d, " ").concat(S, " 0 0 1 ").concat(d, ",").concat(S, "\nv ").concat(w, "\na ").concat(d, " ").concat(S, " 0 0 1 -").concat(d, ",").concat(S, "\nv ").concat(v, "\n\nv ").concat(v, "\na ").concat(h, " ").concat(x, " 0 0 1 ").concat(h, ",").concat(x, "\nv ").concat(u, "\na ").concat(h, " ").concat(x, " 0 0 1 -").concat(h, ",").concat(x, "\nv ").concat(v, "\n\nv ").concat(v, "\na ").concat(g, " ").concat(p, " 0 0 1 ").concat(g, ",").concat(p, "\nv ").concat(I, "\na ").concat(g, " ").concat(p, " 0 0 1 -").concat(g, ",").concat(p, "\nv ").concat(v, "\n\nh ").concat(h, "\nv ").concat(v, "\nh ").concat(h, "\na ").concat(r, " ").concat(r, " 0 0 1 ").concat(r, ",").concat(r, "\nv ").concat(L, "\na ").concat(r, " ").concat(r, " 0 0 1 -").concat(r, ",").concat(r, "\nh -").concat(h, "\nv ").concat(v, "\nh -").concat(h, "\n\nv ").concat(v, "\na ").concat(g, " ").concat(p, " 0 0 1 ").concat(g, ",").concat(p, "\nv ").concat(I, "\na ").concat(g, " ").concat(p, " 0 0 1 -").concat(g, ",").concat(p, "\nv ").concat(v, "\n\nh -").concat(l, "\n\nv -").concat(v, "\na ").concat(g, " ").concat(p, " 0 0 1 -").concat(g, ",-").concat(p, "\nv -").concat(I, "\na ").concat(g, " ").concat(p, " 0 0 1 ").concat(g, ",-").concat(p, "\nv -").concat(v, "\n\nh -").concat(h, "\nv -").concat(v, "\nh -").concat(h, "\na ").concat(r, " ").concat(r, " 0 0 1 -").concat(r, ",-").concat(r, "\nv -").concat(L, "\na ").concat(r, " ").concat(r, " 0 0 1 ").concat(r, ",-").concat(r, "\nh ").concat(h, "\nv -").concat(v, "\nh ").concat(h, "\n\nv -").concat(v, "\na ").concat(g, " ").concat(p, " 0 0 1 -").concat(g, ",-").concat(p, "\nv -").concat(I, "\na ").concat(g, " ").concat(p, " 0 0 1 ").concat(g, ",-").concat(p, "\nv -").concat(v, "\n\nv -").concat(v, "\na ").concat(h, " ").concat(x, " 0 0 1 -").concat(h, ",-").concat(x, "\nv -").concat(u, "\na ").concat(h, " ").concat(x, " 0 0 1 ").concat(h, ",-").concat(x, "\nv -").concat(v, "\n\nv -").concat(v, "\na ").concat(d, " ").concat(S, " 0 0 1 -").concat(d, ",-").concat(S, "\nv -").concat(w, "\na ").concat(d, " ").concat(S, " 0 0 1 ").concat(d, ",-").concat(S, "\nv -").concat(v, "\n\nz\"></path>\n\n").concat(getInlineVerticalLine(M, 0, c), "\n").concat(getInlineVerticalLine(y, 0, c), "\n\n").concat(getInlineVerticalLine(k, E, z), "\n").concat(getInlineVerticalLine(V, E, z), "\n\n").concat(getInlineVerticalLine(b, E, z), "\n").concat(getInlineVerticalLine(A, E, z), "\n\n").concat(getInnerHorizontalLine(M, y, f), "\n").concat(getInnerHorizontalLine(M, y, H), "\n").concat(getInnerHorizontalLine(M, y, P), "\n").concat(getInnerHorizontalLine(M, y, C), "\n\n");
  return {
    html: T,
    width: i,
    height: c
  };
}

function getCuboidWithSquareSectionSvgHtml(t, n, e) {
  var $ = Math.max,
      o = Math.min;
  t = $(1, t || 40);
  width = $(1, n || t * .5);

  if (width > t) {
    width += t;
    t -= width - t;
    width = width - t;
  }

  height = width;
  return getCuboidWithHalfExtend(t, width, height, e);
}

function getCuboidWithHalfExtend(t, n, e, $) {
  var o = Math.max,
      i = Math.min;
  t = o(1, t || 40);
  n = o(1, n || 40);
  e = o(1, e || 40);
  $ = o(1, $ || 40);
  extend = i(n, e) * .5;
  var c = t * 2 + e * 2 + $;
  var s = n + extend * 2;
  var a = mmToPxScale * t;
  var l = mmToPxScale * n;
  var m = mmToPxScale * e;
  var h = mmToPxScale * extend;
  var r = mmToPxScale * $;
  var v = 0;
  var d = v + extend;
  var g = d + n;
  var S = 0;
  var x = S + e;
  var p = x + t;
  var w = p + e;
  var u = w + t;
  var I = "<path fill=\"none\" stroke=\"#000000\"\nd=\"M 0, ".concat(h, "\n\nv -").concat(h, "\nh ").concat(m, "\nv ").concat(h, "\n\nv -").concat(h, "\nh ").concat(a, "\nv ").concat(h, "\n\nv -").concat(h, "\nh ").concat(m, "\nv ").concat(h, "\n\nv -").concat(h, "\nh ").concat(a, "\nv ").concat(h, "\n\nh ").concat(r, "\n\nv ").concat(l, "\nh -").concat(r, "\n\nv ").concat(h, "\nh -").concat(a, "\nv -").concat(h, "\n\nv ").concat(h, "\nh -").concat(m, "\nv -").concat(h, "\n\nv ").concat(h, "\nh -").concat(a, "\nv -").concat(h, "\n\nv ").concat(h, "\nh -").concat(m, "\nv -").concat(h, "\nz\"></path>\n\n").concat(getInnerHorizontalLine(S, u, d), "\n").concat(getInnerHorizontalLine(S, u, g), "\n\n").concat(getInlineVerticalLine(x, d, g), "\n").concat(getInlineVerticalLine(p, d, g), "\n").concat(getInlineVerticalLine(w, d, g), "\n").concat(getInlineVerticalLine(u, d, g), "\n");
  return {
    html: I,
    width: c,
    height: s
  };
}

function getInnerHorizontalLine(t, n, e) {
  return "<line x1=\"".concat(t, "mm\" x2=\"").concat(n, "mm\" y1=\"").concat(e, "mm\" y2=\"").concat(e, "mm\" style=\"stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;\"></line>");
}

function getInlineVerticalLine(t, n, e) {
  return "<line x1=\"".concat(t, "mm\" x2=\"").concat(t, "mm\" y1=\"").concat(n, "mm\" y2=\"").concat(e, "mm\" style=\"stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;\"></line>");
}

function createAndAppendCuboids(n, e, $, o, i) {
  var c = [];

  for (var t = 0; t < i; ++t) {
    var _getCuboidWithSquareS = getCuboidWithSquareSectionSvgHtml(e, $, o),
        s = _getCuboidWithSquareS.html,
        a = _getCuboidWithSquareS.width,
        l = _getCuboidWithSquareS.height;

    var _createSvgElement = createSvgElement(s, a, l),
        m = _createSvgElement.svgElement;

    n.appendChild(m);
    m.widthMm = a;
    m.heightMm = l;
    c.push(m);
  }

  return c;
}

function createAndAppendCuboid(t, n, e, $) {
  var _getCuboidWithSquareS2 = getCuboidWithSquareSectionSvgHtml(n, e, $),
      o = _getCuboidWithSquareS2.html,
      i = _getCuboidWithSquareS2.width,
      c = _getCuboidWithSquareS2.height;

  var _createSvgElement2 = createSvgElement(o, i, c),
      s = _createSvgElement2.svgElement;

  t.appendChild(s);
  s.widthMm = i;
  s.heightMm = c;
  return s;
}

function rotate90(t) {
  var n = t.style;
  var e = t.heightMm;
  var $ = e * .5;
  n.transform = "rotate(90deg)";
  n.transformOrigin = "".concat($, "mm ").concat($, "mm");
}