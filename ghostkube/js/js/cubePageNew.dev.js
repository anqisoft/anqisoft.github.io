"use strict";

// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually
var COL_COUNT_PER_CUBE = 5;

globalThis.onload = function () {
  var DEFAULT_TEXT_COLOR = "#555";
  var INNER_LINE_CSS = "stroke:#888; stroke-width: 0.1mm; stroke-dasharray: 3 2;";
  var CUTTER_LINE_CSS = "stroke:#ff0000; stroke-width: 0.1mm;";
  var OUTER_LINE_WIDTH = 0.1;
  var OUTER_LINE_CSS = "stroke:#000; stroke-width: ".concat(OUTER_LINE_WIDTH, "mm;");
  getPageParameterByName("hide_face_text", "false") === "true";
  var FACE_FONT_SIZE = parseFloat(getPageParameterByName("face_font_size", "3"));
  var FACE_TEXT_COLOR = getPageParameterByName("face_text_color", DEFAULT_TEXT_COLOR).trim().length ? getPageParameterByName("face_text_color", DEFAULT_TEXT_COLOR).trim() : DEFAULT_TEXT_COLOR;
  var FACE_TEXT_CSS = "font-size:".concat(FACE_FONT_SIZE, "mm;stroke:").concat(FACE_TEXT_COLOR, ";");
  getPageParameterByName("hide_set_text", "false") === "true";
  var SET_FONT_SIZE = parseFloat(getPageParameterByName("set_font_size", "3"));
  var SET_TEXT_COLOR = getPageParameterByName("set_text_color", FACE_TEXT_COLOR);
  var SET_TEXT_CSS = "font-size:".concat(SET_FONT_SIZE, "mm;stroke:").concat(SET_TEXT_COLOR, ";");
  getPageParameterByName("set_text_use_mode_no", "false") === "true";
  getPageParameterByName("text_only_in_first_cell", "false") === "true";
  var HOLE_LINE_CSS = "stroke: #888; stroke-width: 0.1mm;";
  var SIDE_LENGTH = parseInt(getPageParameterByName("side", "10"));
  var THICKNESS = parseFloat(getPageParameterByName("thickness", "0.6"));
  var HOLE_RADIUS = parseFloat(getPageParameterByName("hole", "1.5"));
  var TEXT_VERTICAL_OFFSET = HOLE_RADIUS + parseFloat(getPageParameterByName("text_offset", "1.8"));
  var PAPER_WIDTH = parseFloat(getPageParameterByName("width", "420"));
  var PAPER_HEIGHT = parseFloat(getPageParameterByName("height", "297"));
  var PAGE_LEFT = parseFloat(getPageParameterByName("left", "5"));
  var PAGE_RIGHT = parseFloat(getPageParameterByName("right", "5"));
  var PAGE_TOP = parseFloat(getPageParameterByName("top", "3.5"));
  var PAGE_BOTTOM = parseFloat(getPageParameterByName("bottom", "3.5"));
  var HALF_SIDE_LENGTH = SIDE_LENGTH * 0.5;
  var PAGE_WIDTH = PAPER_WIDTH - PAGE_LEFT - PAGE_RIGHT;
  var PAGE_HEIGHT = PAPER_HEIGHT - PAGE_TOP - PAGE_BOTTOM;
  var ROW_COUNT = Math.floor(PAGE_HEIGHT / SIDE_LENGTH);
  var COL_COUNT = Math.floor(PAGE_WIDTH / SIDE_LENGTH);
  setDocumentTitle(PAPER_WIDTH, PAPER_HEIGHT, SIDE_LENGTH, PAGE_LEFT, PAGE_RIGHT, PAGE_TOP, PAGE_BOTTOM, "cube", FILE_NAME_POSTFIX);
  setDynamicCss(PAPER_WIDTH, PAPER_HEIGHT, PAGE_WIDTH, PAGE_HEIGHT, PAGE_LEFT, PAGE_TOP);

  var _createNewPage = createNewPage(PAGE_WIDTH, PAGE_HEIGHT, SIDE_LENGTH, HALF_SIDE_LENGTH, ROW_COUNT, COL_COUNT, HOLE_LINE_CSS, HOLE_RADIUS),
      page = _createNewPage.page,
      pageTopSvg = _createNewPage.pageTopSvg;

  function appendNewPage() {
    var RESULT = createNewPage(PAGE_WIDTH, PAGE_HEIGHT, SIDE_LENGTH, HALF_SIDE_LENGTH, ROW_COUNT, COL_COUNT, HOLE_LINE_CSS, HOLE_RADIUS);
    page = RESULT.page;
    pageTopSvg = RESULT.pageTopSvg;
  }

  var lastRowEmptyCellColIndexBillOfLastCube = "";
  var currentRowCount = 0;
  var currentColCount = 0;
  var svgId = 0;
  SET_ARRAY.forEach(function (_ref) {
    var name = _ref.name,
        cubes = _ref.cubes;
    cubes.forEach(function (no, cubeIndex) {
      var cube = CUBES.filter(function (o) {
        return o.no === no;
      })[0];
      var firstRowActCellColIndexBill = cube.firstRowActCellColIndexBill,
          lastRowEmptyCellColIndexBill = cube.lastRowEmptyCellColIndexBill,
          rowCount = cube.rowCount,
          colCount = cube.colCount;
      var JOIN_TO_LAST_CELL = firstRowActCellColIndexBill.length && firstRowActCellColIndexBill === lastRowEmptyCellColIndexBillOfLastCube;

      if (currentRowCount + rowCount + (JOIN_TO_LAST_CELL ? -1 : 0) > ROW_COUNT) {
        if (currentRowCount < ROW_COUNT) {
          appendBottomElementsToPageTopSvg(pageTopSvg, SIDE_LENGTH, ROW_COUNT, currentRowCount, currentColCount, INNER_LINE_CSS);
        }

        if (currentColCount + colCount > COL_COUNT) {
          if (currentColCount < COL_COUNT) {
            appendRightElementsToPageTopSvg(pageTopSvg, SIDE_LENGTH, COL_COUNT, currentColCount, ROW_COUNT, INNER_LINE_CSS);
          }

          appendNewPage();
          currentColCount = 0;
        }

        currentRowCount = 0;
      }

      if (!currentRowCount) {
        colCount;
        currentColCount += colCount;
      }

      lastRowEmptyCellColIndexBillOfLastCube = lastRowEmptyCellColIndexBill;
      var svg = getSvg({
        id: ++svgId,
        setName: name,
        setNo: cubeIndex + 1,
        cubeNo: no,
        sideLength: SIDE_LENGTH,
        circleRadius: HOLE_RADIUS,
        textOffset: TEXT_VERTICAL_OFFSET,
        thickness: THICKNESS,
        innerLineCss: INNER_LINE_CSS,
        outerLineCss: OUTER_LINE_CSS,
        cutterLineCss: CUTTER_LINE_CSS,
        faceTextCss: FACE_TEXT_CSS,
        setTextCss: SET_TEXT_CSS
      });
      var style = svg.style;

      if (JOIN_TO_LAST_CELL && currentRowCount > 0) {
        style.marginTop = "-".concat(SIDE_LENGTH, "mm");
        currentRowCount += rowCount - 1;
      } else {
        currentRowCount += rowCount;
      }

      page.appendChild(svg);
    });
  });

  if (currentRowCount < ROW_COUNT) {
    appendBottomElementsToPageTopSvg(pageTopSvg, SIDE_LENGTH, ROW_COUNT, currentRowCount, currentColCount, INNER_LINE_CSS);
  }

  if (currentColCount < COL_COUNT) {
    appendRightElementsToPageTopSvg(pageTopSvg, SIDE_LENGTH, COL_COUNT, currentColCount, ROW_COUNT, INNER_LINE_CSS);
  }

  globalThis.print();
};

function appendRightElementsToPageTopSvg(pageTopSvg, SIDE_LENGTH, COL_COUNT, currentColCount, ROW_COUNT, INNER_LINE_CSS) {
  var SVG_COL_COUNT = COL_COUNT - currentColCount;
  var SVG_HEIGHT = SIDE_LENGTH * ROW_COUNT;
  var X1 = SIDE_LENGTH * currentColCount;
  var X2 = SIDE_LENGTH * COL_COUNT;

  for (var rowIndex = 0; rowIndex <= ROW_COUNT; ++rowIndex) {
    var Y = SIDE_LENGTH * rowIndex;
    SvgHelper.appendLine(pageTopSvg, INNER_LINE_CSS, X1, X2, Y, Y, null);
  }

  for (var colIndex = 0; colIndex < SVG_COL_COUNT; ++colIndex) {
    var X = X1 + SIDE_LENGTH * (colIndex + 1);
    SvgHelper.appendLine(pageTopSvg, INNER_LINE_CSS, X, X, 0, SVG_HEIGHT, null);
  }
}

function appendBottomElementsToPageTopSvg(pageTopSvg, SIDE_LENGTH, ROW_COUNT, currentRowCount, currentColCount, INNER_LINE_CSS) {
  var Y1 = SIDE_LENGTH * currentRowCount;
  var Y2 = SIDE_LENGTH * ROW_COUNT;

  for (var colIndex = currentColCount - 5; colIndex < currentColCount; ++colIndex) {
    var X = SIDE_LENGTH * (colIndex + 1);
    SvgHelper.appendLine(pageTopSvg, INNER_LINE_CSS, X, X, Y1, Y2, null);
  }

  var X2 = SIDE_LENGTH * currentColCount;
  var X1 = X2 - SIDE_LENGTH * 5;

  for (var rowIndex = currentRowCount; rowIndex < ROW_COUNT; ++rowIndex) {
    var Y = SIDE_LENGTH * (rowIndex + 1);
    SvgHelper.appendLine(pageTopSvg, INNER_LINE_CSS, X1, X2, Y, Y, null);
  }
}

function createNewPage(PAGE_WIDTH, PAGE_HEIGHT, SIDE_LENGTH, HALF_SIDE_LENGTH, ROW_COUNT, COL_COUNT, HOLE_LINE_CSS, HOLE_RADIUS) {
  var page = document.createElement("page");
  document.getElementsByTagName("body")[0].appendChild(page);
  var pageTopSvg = SvgHelper.createSvg();
  page.appendChild(pageTopSvg);
  var style = pageTopSvg.style;
  style.width = "".concat(PAGE_WIDTH, "mm");
  style.height = "".concat(PAGE_HEIGHT, "mm");
  style.zIndex = "1";
  style.position = "absolute";

  for (var colIndex = 0; colIndex < COL_COUNT; colIndex += COL_COUNT_PER_CUBE) {
    var X = SIDE_LENGTH * colIndex + HALF_SIDE_LENGTH;

    for (var rowIndex = 0; rowIndex <= ROW_COUNT; ++rowIndex) {
      var Y = SIDE_LENGTH * rowIndex;

      if (rowIndex < ROW_COUNT) {
        SvgHelper.appendCircle(pageTopSvg, HOLE_LINE_CSS, X, Y + HALF_SIDE_LENGTH, HOLE_RADIUS, null);
      }
    }
  }

  return {
    page: page,
    pageTopSvg: pageTopSvg
  };
}