"use strict";

/*
  Author: anqisoft@gmail.com
  Date: 2023-09-09
*/
function parseExpressBoxParamsFromUrl(url) {
  url = url.replace('?', '&').toLowerCase();
  var max = Math.max,
      min = Math.min;
  window.THICKESS = max(0, min(1, parseFloat(url.concat('&thickess=1').replace('&thickess=', '厶').split('厶')[1].split('&')[0])));
  window.NO = max(0, parseInt(url.concat('&no=1').replace('&no=', '厶').split('厶')[1].split('&')[0]));
  window.LANG = url.concat('&lang=en_us').replace('&lang=', '厶').split('厶')[1].split('&')[0];

  if (['en_us', 'zh_cn', 'zh_tw'].indexOf(window.LANG) === -1) {
    window.LANG = 'en_us';
  }
}

function getExpressBoxSvgHtml(_long, width, height, extend) {
  var max = Math.max,
      min = Math.min;
  _long = max(1, _long || 40);
  width = max(1, width || 30);
  height = max(1, height || 20);
  extend = max(2, extend || 5);
  var SVG_WIDTH = _long + height * 4 + extend * 2;
  var SVG_HEIGHT = height * 3 + width * 2;
  var HALF_LONG = _long * 0.5;
  var CENTER_X = HALF_LONG + height * 2 + extend * 1;
  var LONG_PX = mmToPxScale * _long;
  var WIDTH_PX = mmToPxScale * width;
  var HEIGHT_PX = mmToPxScale * height;
  var EXTEND_PX = mmToPxScale * extend;
  var THICKESS_PX = mmToPxScale * THICKESS;
  var HALF_HEIGHT = height * 0.5; // const SMALL_RADIUS = height * 0.125;
  // const BIG_RADIUS = width * 0.2;

  var SMALL_RADIUS = height * 0.25;
  var BIG_RADIUS = width * 0.25;
  var HALF_WIDTH = width * 0.5;
  var HALF_HEIGHT_PX = mmToPxScale * HALF_HEIGHT;
  var HALF_WIDTH_PX = mmToPxScale * HALF_WIDTH;
  var SMALL_RADIUS_PX = mmToPxScale * SMALL_RADIUS; // height * 0.25;

  var BIG_RADIUS_PX = mmToPxScale * BIG_RADIUS; // width * 0.25;

  var THIRD_RADIUS_PX = mmToPxScale * max(width, height) * 0.25;
  var FIRST_V_PX = HEIGHT_PX - SMALL_RADIUS_PX * 2 - THICKESS_PX * 2;
  var SECOND_V_PX = WIDTH_PX - BIG_RADIUS_PX * 2 - THICKESS_PX * 2;
  var THIRD_V_PX = HEIGHT_PX - THIRD_RADIUS_PX * 2 - THICKESS_PX * 2;
  var FOURTH_V_PX = WIDTH_PX - EXTEND_PX * 2 - THICKESS_PX * 2; // const HEIGHT_2_ADD_EXTEND_PX = mmToPxScale * (height * 2 + extend);
  // const HEIGHT_2TIMES_PX = mmToPxScale * height * 2;
  // let html = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="width:${SVG_WIDTH}mm;height:${SVG_HEIGHT}mm;">`;

  var html = '';
  var Y1 = 0;
  var Y2 = Y1 + height;
  var Y3 = Y2 + width;
  var Y4 = Y3 + height;
  var Y5 = Y4 + width;
  var Y6 = Y5 + height;
  var Y4_OFFSET = Y4 + THICKESS;
  var Y5_OFFSET = Y5 - THICKESS;
  var X4 = CENTER_X - HALF_LONG;
  var X3 = X4 - height;
  var X2 = X3 - height;
  var X1 = X2 - extend;
  var X5 = CENTER_X + HALF_LONG;
  var X6 = X5 + height;
  var X7 = X6 + height;
  var X8 = X7 + extend; // https://blog.csdn.net/cuixiping/article/details/79663611
  // (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+

  html += "<path fill=\"none\" stroke=\"#000000\" d=\"M ".concat(mmToPxScale * X4, ",0 h ").concat(LONG_PX, "\n\nv ").concat(THICKESS_PX, "\na ").concat(HALF_HEIGHT_PX, " ").concat(SMALL_RADIUS_PX, " 0 0 1 ").concat(HALF_HEIGHT_PX, ",").concat(SMALL_RADIUS_PX, "\nv ").concat(FIRST_V_PX, "\na ").concat(HALF_HEIGHT_PX, " ").concat(SMALL_RADIUS_PX, " 0 0 1 -").concat(HALF_HEIGHT_PX, ",").concat(SMALL_RADIUS_PX, "\nv ").concat(THICKESS_PX, "\n\nv ").concat(THICKESS_PX, "\na ").concat(HEIGHT_PX, " ").concat(BIG_RADIUS_PX, " 0 0 1 ").concat(HEIGHT_PX, ",").concat(BIG_RADIUS_PX, "\nv ").concat(SECOND_V_PX, "\na ").concat(HEIGHT_PX, " ").concat(BIG_RADIUS_PX, " 0 0 1 -").concat(HEIGHT_PX, ",").concat(BIG_RADIUS_PX, "\nv ").concat(THICKESS_PX, "\n\nv ").concat(THICKESS_PX, "\na ").concat(HALF_WIDTH_PX, " ").concat(THIRD_RADIUS_PX, " 0 0 1 ").concat(HALF_WIDTH_PX, ",").concat(THIRD_RADIUS_PX, "\nv ").concat(THIRD_V_PX, "\na ").concat(HALF_WIDTH_PX, " ").concat(THIRD_RADIUS_PX, " 0 0 1 -").concat(HALF_WIDTH_PX, ",").concat(THIRD_RADIUS_PX, "\nv ").concat(THICKESS_PX, "\n\nh ").concat(HEIGHT_PX, "\nv ").concat(THICKESS_PX, "\nh ").concat(HEIGHT_PX, "\na ").concat(EXTEND_PX, " ").concat(EXTEND_PX, " 0 0 1 ").concat(EXTEND_PX, ",").concat(EXTEND_PX, "\nv ").concat(FOURTH_V_PX, "\na ").concat(EXTEND_PX, " ").concat(EXTEND_PX, " 0 0 1 -").concat(EXTEND_PX, ",").concat(EXTEND_PX, "\nh -").concat(HEIGHT_PX, "\nv ").concat(THICKESS_PX, "\nh -").concat(HEIGHT_PX, "\n\nv ").concat(THICKESS_PX, "\na ").concat(HALF_WIDTH_PX, " ").concat(THIRD_RADIUS_PX, " 0 0 1 ").concat(HALF_WIDTH_PX, ",").concat(THIRD_RADIUS_PX, "\nv ").concat(THIRD_V_PX, "\na ").concat(HALF_WIDTH_PX, " ").concat(THIRD_RADIUS_PX, " 0 0 1 -").concat(HALF_WIDTH_PX, ",").concat(THIRD_RADIUS_PX, "\nv ").concat(THICKESS_PX, "\n\nh -").concat(LONG_PX, "\n\nv -").concat(THICKESS_PX, "\na ").concat(HALF_WIDTH_PX, " ").concat(THIRD_RADIUS_PX, " 0 0 1 -").concat(HALF_WIDTH_PX, ",-").concat(THIRD_RADIUS_PX, "\nv -").concat(THIRD_V_PX, "\na ").concat(HALF_WIDTH_PX, " ").concat(THIRD_RADIUS_PX, " 0 0 1 ").concat(HALF_WIDTH_PX, ",-").concat(THIRD_RADIUS_PX, "\nv -").concat(THICKESS_PX, "\n\nh -").concat(HEIGHT_PX, "\nv -").concat(THICKESS_PX, "\nh -").concat(HEIGHT_PX, "\na ").concat(EXTEND_PX, " ").concat(EXTEND_PX, " 0 0 1 -").concat(EXTEND_PX, ",-").concat(EXTEND_PX, "\nv -").concat(FOURTH_V_PX, "\na ").concat(EXTEND_PX, " ").concat(EXTEND_PX, " 0 0 1 ").concat(EXTEND_PX, ",-").concat(EXTEND_PX, "\nh ").concat(HEIGHT_PX, "\nv -").concat(THICKESS_PX, "\nh ").concat(HEIGHT_PX, "\n\nv -").concat(THICKESS_PX, "\na ").concat(HALF_WIDTH_PX, " ").concat(THIRD_RADIUS_PX, " 0 0 1 -").concat(HALF_WIDTH_PX, ",-").concat(THIRD_RADIUS_PX, "\nv -").concat(THIRD_V_PX, "\na ").concat(HALF_WIDTH_PX, " ").concat(THIRD_RADIUS_PX, " 0 0 1 ").concat(HALF_WIDTH_PX, ",-").concat(THIRD_RADIUS_PX, "\nv -").concat(THICKESS_PX, "\n\nv -").concat(THICKESS_PX, "\na ").concat(HEIGHT_PX, " ").concat(BIG_RADIUS_PX, " 0 0 1 -").concat(HEIGHT_PX, ",-").concat(BIG_RADIUS_PX, "\nv -").concat(SECOND_V_PX, "\na ").concat(HEIGHT_PX, " ").concat(BIG_RADIUS_PX, " 0 0 1 ").concat(HEIGHT_PX, ",-").concat(BIG_RADIUS_PX, "\nv -").concat(THICKESS_PX, "\n\nv -").concat(THICKESS_PX, "\na ").concat(HALF_HEIGHT_PX, " ").concat(SMALL_RADIUS_PX, " 0 0 1 -").concat(HALF_HEIGHT_PX, ",-").concat(SMALL_RADIUS_PX, "\nv -").concat(FIRST_V_PX, "\na ").concat(HALF_HEIGHT_PX, " ").concat(SMALL_RADIUS_PX, " 0 0 1 ").concat(HALF_HEIGHT_PX, ",-").concat(SMALL_RADIUS_PX, "\nv -").concat(THICKESS_PX, "\n\nz\"></path>\n\n").concat(getInlineVerticalLine(X4, 0, SVG_HEIGHT), "\n").concat(getInlineVerticalLine(X5, 0, SVG_HEIGHT), "\n\n").concat(getInlineVerticalLine(X2, Y4_OFFSET, Y5_OFFSET), "\n").concat(getInlineVerticalLine(X3, Y4_OFFSET, Y5_OFFSET), "\n\n").concat(getInlineVerticalLine(X6, Y4_OFFSET, Y5_OFFSET), "\n").concat(getInlineVerticalLine(X7, Y4_OFFSET, Y5_OFFSET), "\n\n").concat(getInnerHorizontalLine(X4, X5, Y2), "\n").concat(getInnerHorizontalLine(X4, X5, Y3), "\n").concat(getInnerHorizontalLine(X4, X5, Y4), "\n").concat(getInnerHorizontalLine(X4, X5, Y5), "\n\n");
  return {
    html: html,
    width: SVG_WIDTH,
    height: SVG_HEIGHT
  };
}

function getCuboidWithSquareSectionSvgHtml(_long2, side, pasteWidth) {
  var max = Math.max,
      min = Math.min;
  _long2 = max(1, _long2 || 40);
  width = max(1, side || _long2 * 0.5);

  if (width > _long2) {
    width += _long2;
    _long2 -= width - _long2;
    width = width - _long2;
  }

  height = width;
  return getCuboidWithHalfExtend(_long2, width, height, pasteWidth);
}

function getCuboidWithHalfExtend(_long3, width, height, pasteWidth) {
  var max = Math.max,
      min = Math.min;
  _long3 = max(1, _long3 || 40);
  width = max(1, width || 40);
  height = max(1, height || 40);
  pasteWidth = max(1, pasteWidth || 40);
  extend = min(width, height) * 0.5;
  var SVG_WIDTH = _long3 * 2 + height * 2 + pasteWidth;
  var SVG_HEIGHT = width + extend * 2;
  var LONG_PX = mmToPxScale * _long3;
  var WIDTH_PX = mmToPxScale * width;
  var HEIGHT_PX = mmToPxScale * height;
  var EXTEND_PX = mmToPxScale * extend;
  var PASTE_WIDTH_PX = mmToPxScale * pasteWidth;
  var Y1 = 0;
  var Y2 = Y1 + extend;
  var Y3 = Y2 + width; // const Y4 = Y3 + extend;

  var X1 = 0;
  var X2 = X1 + height;
  var X3 = X2 + _long3;
  var X4 = X3 + height;
  var X5 = X4 + _long3; // const X6 = X5 + pasteWidth;

  var html = "<path fill=\"none\" stroke=\"#000000\"\nd=\"M 0, ".concat(EXTEND_PX, "\n\nv -").concat(EXTEND_PX, "\nh ").concat(HEIGHT_PX, "\nv ").concat(EXTEND_PX, "\n\nv -").concat(EXTEND_PX, "\nh ").concat(LONG_PX, "\nv ").concat(EXTEND_PX, "\n\nv -").concat(EXTEND_PX, "\nh ").concat(HEIGHT_PX, "\nv ").concat(EXTEND_PX, "\n\nv -").concat(EXTEND_PX, "\nh ").concat(LONG_PX, "\nv ").concat(EXTEND_PX, "\n\nh ").concat(PASTE_WIDTH_PX, "\n\nv ").concat(WIDTH_PX, "\nh -").concat(PASTE_WIDTH_PX, "\n\nv ").concat(EXTEND_PX, "\nh -").concat(LONG_PX, "\nv -").concat(EXTEND_PX, "\n\nv ").concat(EXTEND_PX, "\nh -").concat(HEIGHT_PX, "\nv -").concat(EXTEND_PX, "\n\nv ").concat(EXTEND_PX, "\nh -").concat(LONG_PX, "\nv -").concat(EXTEND_PX, "\n\nv ").concat(EXTEND_PX, "\nh -").concat(HEIGHT_PX, "\nv -").concat(EXTEND_PX, "\nz\"></path>\n\n").concat(getInnerHorizontalLine(X1, X5, Y2), "\n").concat(getInnerHorizontalLine(X1, X5, Y3), "\n\n").concat(getInlineVerticalLine(X2, Y2, Y3), "\n").concat(getInlineVerticalLine(X3, Y2, Y3), "\n").concat(getInlineVerticalLine(X4, Y2, Y3), "\n").concat(getInlineVerticalLine(X5, Y2, Y3), "\n");
  return {
    html: html,
    width: SVG_WIDTH,
    height: SVG_HEIGHT
  };
}

function getInnerHorizontalLine(X1, X2, Y) {
  return "<line x1=\"".concat(X1, "mm\" x2=\"").concat(X2, "mm\" y1=\"").concat(Y, "mm\" y2=\"").concat(Y, "mm\" style=\"stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;\"></line>");
}

function getInlineVerticalLine(X, Y1, Y2) {
  return "<line x1=\"".concat(X, "mm\" x2=\"").concat(X, "mm\" y1=\"").concat(Y1, "mm\" y2=\"").concat(Y2, "mm\" style=\"stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;\"></line>");
}

function createAndAppendCuboids(PAGE_ELEMENT, LONG, SIDE, PASTE_WIDTH, COUNT) {
  var result = [];

  for (var i = 0; i < COUNT; ++i) {
    var _getCuboidWithSquareS = getCuboidWithSquareSectionSvgHtml(LONG, SIDE, PASTE_WIDTH),
        html = _getCuboidWithSquareS.html,
        _width = _getCuboidWithSquareS.width,
        _height = _getCuboidWithSquareS.height;

    var _createSvgElement = createSvgElement(html, _width, _height),
        svgElement = _createSvgElement.svgElement;

    PAGE_ELEMENT.appendChild(svgElement);
    svgElement.widthMm = _width;
    svgElement.heightMm = _height;
    result.push(svgElement);
  }

  return result;
}

function createAndAppendCuboid(PAGE_ELEMENT, LONG, SIDE, PASTE_WIDTH) {
  var _getCuboidWithSquareS2 = getCuboidWithSquareSectionSvgHtml(LONG, SIDE, PASTE_WIDTH),
      html = _getCuboidWithSquareS2.html,
      width = _getCuboidWithSquareS2.width,
      height = _getCuboidWithSquareS2.height;

  var _createSvgElement2 = createSvgElement(html, width, height),
      svgElement = _createSvgElement2.svgElement;

  PAGE_ELEMENT.appendChild(svgElement);
  svgElement.widthMm = width;
  svgElement.heightMm = height;
  return svgElement;
}

function rotate90(svgElement) {
  var svgStyle = svgElement.style;
  var HEIGHT = svgElement.heightMm;
  var HALF_HEIGHT = HEIGHT * 0.5;
  svgStyle.transform = 'rotate(90deg)';
  svgStyle.transformOrigin = "".concat(HALF_HEIGHT, "mm ").concat(HALF_HEIGHT, "mm");
}