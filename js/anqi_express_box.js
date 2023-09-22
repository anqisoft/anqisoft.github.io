/*
  Author: anqisoft@gmail.com
  Date: 2023-09-09
*/

function parseExpressBoxParamsFromUrl(url) {
  window.THICKESS = Math.min(
    1,
    parseInt(
      url.concat('&thickess=1').replace('&thickess=', '厶').split('厶')[1].split('&')[0],
    ),
  );
}

function getExpressBoxSvgHtml(long, width, height, extend) {
  long = Math.max(1, long || 40);
  width = Math.max(1, width || 30);
  height = Math.max(1, height || 20);
  extend = Math.max(2, extend || 5);

  const SVG_WIDTH = long + height * 4 + extend * 2;
  const SVG_HEIGHT = height * 3 + width * 2;

  const HELF_LONG = long * 0.5;
  const CENTER_X = HELF_LONG + height * 2 + extend * 1;

  const LONG_PX = mmToPxScale * long;
  const WIDTH_PX = mmToPxScale * width;
  const HEIGHT_PX = mmToPxScale * height;
  const EXTEND_PX = mmToPxScale * extend;
  const THICKESS_PX = mmToPxScale * THICKESS;

  const HALF_HEIGHT = height * 0.5;
  // const SMALL_RADIUS = height * 0.125;
  // const BIG_RADIUS = width * 0.2;
  const SMALL_RADIUS = height * 0.25;
  const BIG_RADIUS = width * 0.25;
  const HALF_WIDTH = width * 0.5;

  const HALF_HEIGHT_PX = mmToPxScale * HALF_HEIGHT;
  const HALF_WIDTH_PX = mmToPxScale * HALF_WIDTH;

  const SMALL_RADIUS_PX = mmToPxScale * SMALL_RADIUS;  // height * 0.25;
  const BIG_RADIUS_PX = mmToPxScale * BIG_RADIUS;  // width * 0.25;
  const THIRD_RADIUS_PX = mmToPxScale * Math.max(width, height) * 0.25;

  const FIRST_V_PX = HEIGHT_PX - SMALL_RADIUS_PX * 2 - THICKESS_PX * 2;
  const SECOND_V_PX = WIDTH_PX - BIG_RADIUS_PX * 2 - THICKESS_PX * 2;
  const THIRD_V_PX = HEIGHT_PX - THIRD_RADIUS_PX * 2 - THICKESS_PX * 2;
  const FOURTH_V_PX = WIDTH_PX - EXTEND_PX * 2 - THICKESS_PX * 2;

  // const HEIGHT_2_ADD_EXTEND_PX = mmToPxScale * (height * 2 + extend);
  // const HEIGHT_2TIMES_PX = mmToPxScale * height * 2;

  // let html = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="width:${SVG_WIDTH}mm;height:${SVG_HEIGHT}mm;">`;

  let html = '';

  const Y1 = 0;
  const Y2 = Y1 + height;
  const Y3 = Y2 + width;
  const Y4 = Y3 + height;
  const Y5 = Y4 + width;
  const Y6 = Y5 + height;
  const Y4_OFFSET = Y4 + THICKESS;
  const Y5_OFFSET = Y5 - THICKESS;

  const X4 = CENTER_X - HELF_LONG;
  const X3 = X4 - height;
  const X2 = X3 - height;
  const X1 = X2 - extend;

  const X5 = CENTER_X + HELF_LONG;
  const X6 = X5 + height;
  const X7 = X6 + height;
  const X8 = X7 + extend;

  // https://blog.csdn.net/cuixiping/article/details/79663611
  // (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+

  html += `<path fill="none" stroke="#000000" d="M ${mmToPxScale * X4},0 h ${LONG_PX}

v ${THICKESS_PX}
a ${HALF_HEIGHT_PX} ${SMALL_RADIUS_PX} 0 0 1 ${HALF_HEIGHT_PX},${SMALL_RADIUS_PX}
v ${FIRST_V_PX}
a ${HALF_HEIGHT_PX} ${SMALL_RADIUS_PX} 0 0 1 -${HALF_HEIGHT_PX},${SMALL_RADIUS_PX}
v ${THICKESS_PX}

v ${THICKESS_PX}
a ${HEIGHT_PX} ${BIG_RADIUS_PX} 0 0 1 ${HEIGHT_PX},${BIG_RADIUS_PX}
v ${SECOND_V_PX}
a ${HEIGHT_PX} ${BIG_RADIUS_PX} 0 0 1 -${HEIGHT_PX},${BIG_RADIUS_PX}
v ${THICKESS_PX}

v ${THICKESS_PX}
a ${HALF_WIDTH_PX} ${THIRD_RADIUS_PX} 0 0 1 ${HALF_WIDTH_PX},${THIRD_RADIUS_PX}
v ${THIRD_V_PX}
a ${HALF_WIDTH_PX} ${THIRD_RADIUS_PX} 0 0 1 -${HALF_WIDTH_PX},${THIRD_RADIUS_PX}
v ${THICKESS_PX}

h ${HEIGHT_PX}
v ${THICKESS_PX}
h ${HEIGHT_PX}
a ${EXTEND_PX} ${EXTEND_PX} 0 0 1 ${EXTEND_PX},${EXTEND_PX}
v ${FOURTH_V_PX}
a ${EXTEND_PX} ${EXTEND_PX} 0 0 1 -${EXTEND_PX},${EXTEND_PX}
h -${HEIGHT_PX}
v ${THICKESS_PX}
h -${HEIGHT_PX}

v ${THICKESS_PX}
a ${HALF_WIDTH_PX} ${THIRD_RADIUS_PX} 0 0 1 ${HALF_WIDTH_PX},${THIRD_RADIUS_PX}
v ${THIRD_V_PX}
a ${HALF_WIDTH_PX} ${THIRD_RADIUS_PX} 0 0 1 -${HALF_WIDTH_PX},${THIRD_RADIUS_PX}
v ${THICKESS_PX}

h -${LONG_PX}

v -${THICKESS_PX}
a ${HALF_WIDTH_PX} ${THIRD_RADIUS_PX} 0 0 1 -${HALF_WIDTH_PX},-${THIRD_RADIUS_PX}
v -${THIRD_V_PX}
a ${HALF_WIDTH_PX} ${THIRD_RADIUS_PX} 0 0 1 ${HALF_WIDTH_PX},-${THIRD_RADIUS_PX}
v -${THICKESS_PX}

h -${HEIGHT_PX}
v -${THICKESS_PX}
h -${HEIGHT_PX}
a ${EXTEND_PX} ${EXTEND_PX} 0 0 1 -${EXTEND_PX},-${EXTEND_PX}
v -${FOURTH_V_PX}
a ${EXTEND_PX} ${EXTEND_PX} 0 0 1 ${EXTEND_PX},-${EXTEND_PX}
h ${HEIGHT_PX}
v -${THICKESS_PX}
h ${HEIGHT_PX}

v -${THICKESS_PX}
a ${HALF_WIDTH_PX} ${THIRD_RADIUS_PX} 0 0 1 -${HALF_WIDTH_PX},-${THIRD_RADIUS_PX}
v -${THIRD_V_PX}
a ${HALF_WIDTH_PX} ${THIRD_RADIUS_PX} 0 0 1 ${HALF_WIDTH_PX},-${THIRD_RADIUS_PX}
v -${THICKESS_PX}

v -${THICKESS_PX}
a ${HEIGHT_PX} ${BIG_RADIUS_PX} 0 0 1 -${HEIGHT_PX},-${BIG_RADIUS_PX}
v -${SECOND_V_PX}
a ${HEIGHT_PX} ${BIG_RADIUS_PX} 0 0 1 ${HEIGHT_PX},-${BIG_RADIUS_PX}
v -${THICKESS_PX}

v -${THICKESS_PX}
a ${HALF_HEIGHT_PX} ${SMALL_RADIUS_PX} 0 0 1 -${HALF_HEIGHT_PX},-${SMALL_RADIUS_PX}
v -${FIRST_V_PX}
a ${HALF_HEIGHT_PX} ${SMALL_RADIUS_PX} 0 0 1 ${HALF_HEIGHT_PX},-${SMALL_RADIUS_PX}
v -${THICKESS_PX}

z"></path>`;
  html += `<line x1="${X4}mm" x2="${X4}mm" y1="0mm" y2="${SVG_HEIGHT}mm" style="stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;"></line>`;
  html += `<line x1="${X5}mm" x2="${X5}mm" y1="0mm" y2="${SVG_HEIGHT}mm" style="stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;"></line>`;

  html += `<line x1="${X2}mm" x2="${X2}mm" y1="${Y4_OFFSET}mm" y2="${Y5_OFFSET}mm" style="stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;"></line>`;
  html += `<line x1="${X3}mm" x2="${X3}mm" y1="${Y4_OFFSET}mm" y2="${Y5_OFFSET}mm" style="stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;"></line>`;

  html += `<line x1="${X6}mm" x2="${X6}mm" y1="${Y4_OFFSET}mm" y2="${Y5_OFFSET}mm" style="stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;"></line>`;
  html += `<line x1="${X7}mm" x2="${X7}mm" y1="${Y4_OFFSET}mm" y2="${Y5_OFFSET}mm" style="stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;"></line>`;

  html += `<line x1="${X4}mm" x2="${X5}mm" y1="${Y2}mm" y2="${Y2}mm" style="stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;"></line>`;
  html += `<line x1="${X4}mm" x2="${X5}mm" y1="${Y3}mm" y2="${Y3}mm" style="stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;"></line>`;
  html += `<line x1="${X4}mm" x2="${X5}mm" y1="${Y4}mm" y2="${Y4}mm" style="stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;"></line>`;
  html += `<line x1="${X4}mm" x2="${X5}mm" y1="${Y5}mm" y2="${Y5}mm" style="stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;"></line>`;

  // html += '</svg>';

  return {
    html: html,
    width: SVG_WIDTH,
    height: SVG_HEIGHT,
  };
}
