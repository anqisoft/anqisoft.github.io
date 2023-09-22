/*
  Author: anqisoft@gmail.com
  Date: 2023-09-22
*/

// ?top=4&left=3.5&landscape=false&a3=true
function draw(getPokerHtml, firstPageAppendHtml) {
  firstPageAppendHtml = firstPageAppendHtml || '';
  setF1Content('?top=4&left=3.5&landscape=false&a3=true');

  const url = window.location.href.replace('?', '&');
  parsePageParamsFromUrl(url);

  document.getElementById('style').innerHTML = getPageCss(
    A3,
    LANDSCAPE,
    PAGE_PADDING_TOP,
    PAGE_PADDING_LEFT,
  ).concat(
    // https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
    'page{display:-webkit-flex;display:flex;flex-flow:row wrap;justify-content:center;align-items:flex-start;align-content:flex-start;}',
    'page{font-size:36;font-family:"Times New Roman", "KaiTi";}',
    'topic,question, answer{height:18mm;}',
    'topic{display:flex;width:58mm;}',
    'question, answer{display:inline-flex;border-radius:5mm;border:1px solid #999;align-items:center;}',
    'question{width:40mm;justify-content:flex-end;}',
    'answer{width:18mm;justify-content: center;}',

    'page:nth-child(2n), page:nth-child(2n) topic{flex-direction:row-reverse;}',

    // AnQi, 2023-09-22
    // <en>Cancel the border lines on the back page, because printers often have deviations that make it difficult to align horizontally.</en>
    // <zh_cn>取消背面页的框线，因为打印机经常有偏差而导致横向难以对齐。</zh_cn>
    // <zh_tw>取消背面頁的框線，因為打印機經常有偏差而導致橫向難以對齊。</zh_tw>
    // 'page:nth-child(2n) question, page:nth-child(2n) answer{border-left-color:transparent;border-right-color:transparent;border-radius:0;}',
    'page:nth-child(2n) question, page:nth-child(2n) answer{border-color:transparent;border-radius:0;}',
    // AnQi, 2023-09-22
    // <en>In order to facilitate cutting the transparent edges after converting the PDF to the picture, the first question retains the upper border, and the last answer retains the lower border.</en>
    // <zh_cn>为方便pdf转图片后切透明边，第一个题目保留上边线，最后一个答案保留下边线。</zh_cn>
    // <zh_tw>為方便pdf轉圖片後切透明邊，第一個題目保留上邊線，最後一個答案保留下邊線。</zh_tw >
    'page:nth-child(2n) topic:first-of-type question{border-top-color:#999;}',
    'page:nth-child(2n) topic:last-of-type answer{border-bottom-color:#999;}',
  );

  const body = document.getElementsByTagName('body')[0];

  const POKER_HTML = getPokerHtml();
  for (let i = 0; i < 2; ++i) {
    const pageElement = createPageElement();
    pageElement.innerHTML = POKER_HTML.concat(i === 0 ? firstPageAppendHtml : '');
    body.appendChild(pageElement);
  }

  window.print();
}

function getFixedHtml(original) {
  if (!original || !original.length) {
    return '';
  }
  return original.replace(/([69])/g, `<span style="text-decoration:underline;">$1</span>`);
}

function getPokerHtmlOfCarryAdditionLessThan20() {
  // 9+1=10, 9+2=11, ..., 9+9=18, 8+2=10, 8+3=11, ..., 8+9=17, ..., 1+9=10
  let html = '';
  for (let i = 9; i > 0; --i) {
    for (let j = 10 - i; j < 10; ++j) {
      html += `<topic><question>${getFixedHtml(
        `${i}&nbsp;+&nbsp;${j}`,
      )}&nbsp;=&nbsp;</question><answer>${getFixedHtml(`${i + j}`)}</answer></topic>`;
    }
  }

  return `${html}${html}`;
}


function getPokerHtmlOfCarryAdditionLessThan20() {
  // 9+1=10, 9+2=11, ..., 9+9=18, 8+2=10, 8+3=11, ..., 8+9=17, ..., 1+9=10
  let html = '';
  for (let i = 9; i > 0; --i) {
    for (let j = 10 - i; j < 10; ++j) {
      html += `<topic><question>${getFixedHtml(
        `${i}&nbsp;+&nbsp;${j}`,
      )}&nbsp;=&nbsp;</question><answer>${getFixedHtml(`${i + j}`)}</answer></topic>`;
    }
  }

  return `${html}${html}`;
}

function getPokerHtmlOfAbdicationMinusLessThan20() {
  // 10-1=9, 10-2=8, ..., 10-9=1, 11-2=9, 11-3=8, ..., 11-9=2, ..., 18-9=9
  let html = '';
  for (let i = 10; i < 19; ++i) {
    for (let j = i - 9; j < 10; ++j) {
      html += `<topic><question>${getFixedHtml(
        `${i}&nbsp;-&nbsp;${j}`,
      )}&nbsp;=&nbsp;</question><answer>${getFixedHtml(`${i - j}`)}</answer></topic>`;
    }
  }

  return `${html}${html}`;
}

function getPokerHtmlOfMultiplicationFormulasFullLessThan9() {
  let html = '';
  for (let i = 1; i < 10; ++i) {
    for (let j = 1; j < 10; ++j) {
      html += `<topic><question>${getFixedHtml(
        `${i}&nbsp;×&nbsp;${j}`,
      )}&nbsp;=&nbsp;</question><answer>${getFixedHtml(`${i * j}`)}</answer></topic>`;
    }
  }

  return `${html}`;
}

function getPokerHtmlOfDivisionTableLessThan9() {
  let html = '';
  for (let i = 1; i < 10; ++i) {
    for (let j = 1; j < 10; ++j) {
      html += `<topic><question>${getFixedHtml(
        `${i * j}&nbsp;÷&nbsp;${i}`,
      )}&nbsp;=&nbsp;</question><answer>${getFixedHtml(`${j}`)}</answer></topic>`;
    }
  }

  return `${html}`;
}


function getPokerHtmlOfMultiplicationFormulasSimpleLessThan9() {
  let html = '';
  for (let i = 1; i < 10; ++i) {
    for (let j = i; j < 10; ++j) {
      html += `<topic><question>${getFixedHtml(
        `${i}&nbsp;×&nbsp;${j}`,
      )}&nbsp;=&nbsp;</question><answer>${getFixedHtml(`${i * j}`)}</answer></topic>`;
    }
  }

  return `${html}${html}`;
}


// use ./anqi_mini_poker.js
function getFirstPageAppendHtml(BIG_COVER_TEXT, SMALL_COVER_TEXT) {
  const { BoxGenerator, BoxKind } = boxSpace.edu.sonya.cc;
  const boxGenerator = new BoxGenerator();

  const ROTATE = false;
  const MOVE = false;
  const TOP_WITHOUT_HALF_CIRCLE = false;
  const OUTER_LINE_STYLE = 'stroke:#555;stroke-width:0.2mm;';
  const INNER_LINE_STYLE = 'stroke:#888;stroke-width:0.1mm;stroke-dasharray:3 2;';
  const TEXT_STYLE = 'font-size:4.5mm;font-family:"Times New Roman", "Kaiti";';

  let svgId = 0;
  let html = '';

  const OPTIONS = {};
  [
    { WIDTH: 58, POKER_COVER_TEXT: BIG_COVER_TEXT },
    { WIDTH: 20, POKER_COVER_TEXT: SMALL_COVER_TEXT },
  ].forEach(({ WIDTH, POKER_COVER_TEXT }, n) => {
    // const LENGTHS = [WIDTH, 30, 20]; // 206*100、130*100
    // const LENGTHS = [30, WIDTH, 20]; // 234*156、120*80
    // const LENGTHS = [WIDTH, 20, 30]; // 176*90, 100*90
    // const LENGTHS = [WIDTH, 20, 28];
    const ADDITIONAL_SPACE = 0.5 * (n === 0 ? 2 : 1);
    const LENGTHS = [WIDTH + ADDITIONAL_SPACE, 20 + ADDITIONAL_SPACE, 24 + ADDITIONAL_SPACE];
    const CONTENTS = [
      POKER_COVER_TEXT,
      POKER_COVER_TEXT,
      POKER_COVER_TEXT,
      POKER_COVER_TEXT,
      POKER_COVER_TEXT,
      POKER_COVER_TEXT,
    ];

    // boxGenerator.create() => { id, svg: nested ? outerSvg : svg, css }
    html += boxGenerator.create({
      id: `svg_${++svgId}`,
      boxKind: BoxKind.cuboid,
      lengths: LENGTHS,
      contents: CONTENTS,
      outerLineStyle: OUTER_LINE_STYLE,
      innerLineStyle: INNER_LINE_STYLE,
      textStyle: TEXT_STYLE,
      rotate: ROTATE,
      move: MOVE,
      topWithoutHalfCircle: TOP_WITHOUT_HALF_CIRCLE,
      options: OPTIONS,
    }).svg.outerHTML;
  });

  for (let i = 0; i < 6; ++i) {
    const SIDE = (i > 0 && i < 4) ? 7.5 : 8;  // i === 0 ? 8 : 7;
    const LENGTHS = [SIDE, SIDE, SIDE];
    const CONTENTS = i % 2 === 0 ? ['1', '2', '3', '4', '5', '6'] : ['0', '1', '2', '3', '4', '5'];
    html += boxGenerator.create({
      id: `svg_${++svgId}`,
      boxKind: BoxKind.cuboid,
      lengths: LENGTHS,
      contents: CONTENTS,
      outerLineStyle: OUTER_LINE_STYLE,
      innerLineStyle: INNER_LINE_STYLE,
      textStyle: TEXT_STYLE,
      rotate: ROTATE,
      move: MOVE,
      topWithoutHalfCircle: TOP_WITHOUT_HALF_CIRCLE,
      options: OPTIONS,
    }).svg.outerHTML;
  }

  return `<div style="margin-top:0.5mm;position:relative;">${html}</div>`.concat(
    '<style>',
    '#svg_3,#svg_4,#svg_5,#svg_6,#svg_7,#svg_8{position:absolute;}',
    '#svg_3,#svg_5,#svg_6{ top: 0;}',
    '#svg_4,#svg_7,#svg_8{ bottom: -0.5mm;}',

    '#svg_3{right:45mm; }',
    '#svg_4{right:0mm; }',
    '#svg_5{left:0mm;}',
    '#svg_6{left:42mm;}',
    '#svg_7{left:100mm;}',
    '#svg_8{left:142mm;}',
    '</style>'
  );
}



function getPokerHtmlOfCarryAdditionAndAbdicationMinusLessThan20() {
  // 9+1=10, 9+2=11, ..., 9+9=18, 8+2=10, 8+3=11, ..., 8+9=17, ..., 1+9=10
  let htmlA = '';
  for (let i = 9; i > 0; --i) {
    for (let j = 10 - i; j < 10; ++j) {
      htmlA += `<topic><question>${getFixedHtml(
        `${i}&nbsp;+&nbsp;${j}`,
      )}&nbsp;=&nbsp;</question><answer>${getFixedHtml(`${i + j}`)}</answer></topic>`;
    }
  }
  htmlA += htmlA;

  // 10-1=9, 10-2=8, ..., 10-9=1, 11-2=9, 11-3=8, ..., 11-9=2, ..., 18-9=9
  // Changed the order.
  let htmlB = '';
  for (let i = 18; i >= 10; --i) {
    for (let j = 9; j >= i - 9; --j) {
      htmlB += `<topic><question>${getFixedHtml(
        `${i}&nbsp;-&nbsp;${j}`,
      )}&nbsp;=&nbsp;</question><answer>${getFixedHtml(`${i - j}`)}</answer></topic>`;
    }
  }
  htmlB += htmlB;

  return { htmlA, htmlB };
}

function getPokerHtmlOfMultiplicationTableAndDivisionTableLessThan9() {
  let htmlA = '';
  for (let i = 1; i < 10; ++i) {
    for (let j = i; j < 10; ++j) {
      htmlA += `<topic><question>${getFixedHtml(
        `${i}&nbsp;×&nbsp;${j}`,
      )}&nbsp;=&nbsp;</question><answer>${getFixedHtml(`${i * j}`)}</answer></topic>`;
    }
  }
  htmlA += htmlA;

  // Changed the order.
  let htmlB = '';
  // for (let i = 9; i >= 1; --i) {
  //   for (let j = 9; j >= i; --j) {
  //     htmlB += `<topic><question>${getFixedHtml(
  //       `${i * j}&nbsp;÷&nbsp;${i}`,
  //     )}&nbsp;=&nbsp;</question><answer>${getFixedHtml(`${j}`)}</answer></topic>`;
  //   }
  // }
  // htmlB += htmlB;
  for (let i = 9; i >= 1; --i) {
    for (let j = 9; j >= 1; --j) {
      if (i === 1 && j === 1) { continue; }

      htmlB += `<topic><question>${getFixedHtml(
        `${i * j}&nbsp;÷&nbsp;${i}`,
      )}&nbsp;=&nbsp;</question><answer>${getFixedHtml(`${j}`)}</answer></topic>`;
    }
  }

  return { htmlA, htmlB };
}

// ?top=4&left=3.5&landscape=false&a3=true
function drawMixed(getPokerHtml, firstPageAppendHtml, sameColor) {
  firstPageAppendHtml = firstPageAppendHtml || '';
  setF1Content('?top=4&left=3.5&landscape=false&a3=true');

  const url = window.location.href.replace('?', '&');
  parsePageParamsFromUrl(url);

  document.getElementById('style').innerHTML = getPageCss(
    A3,
    LANDSCAPE,
    PAGE_PADDING_TOP,
    PAGE_PADDING_LEFT,
  ).concat(
    // https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
    'page{display:-webkit-flex;display:flex;flex-flow:row wrap;justify-content:center;align-items:flex-start;align-content:flex-start;}',
    'page{font-size:36;font-family:"Times New Roman", "KaiTi";}',
    sameColor ? '' : 'page:nth-child(2n){color:#F00;}',
    'topic,question, answer{height:18mm;}',
    'topic{display:flex;width:58mm;}',
    'question, answer{display:inline-flex;border-radius:5mm;border:1px solid #999;align-items:center;}',
    'question{width:40mm;justify-content:flex-end;}',
    'answer{width:18mm;justify-content: center;}',

    'page:nth-child(2n), page:nth-child(2n) topic{flex-direction:row-reverse;}',

    // AnQi, 2023-09-22
    // <en>Cancel the border lines on the back page, because printers often have deviations that make it difficult to align horizontally.</en>
    // <zh_cn>取消背面页的框线，因为打印机经常有偏差而导致横向难以对齐。</zh_cn>
    // <zh_tw>取消背面頁的框線，因為打印機經常有偏差而導致橫向難以對齊。</zh_tw>
    // 'page:nth-child(2n) question, page:nth-child(2n) answer{border-left-color:transparent;border-right-color:transparent;border-radius:0;}',
    'page:nth-child(2n) question, page:nth-child(2n) answer{border-color:transparent;border-radius:0;}',
    // AnQi, 2023-09-22
    // <en>In order to facilitate cutting the transparent edges after converting the PDF to the picture, the first question retains the upper border, and the last answer retains the lower border.</en>
    // <zh_cn>为方便pdf转图片后切透明边，第一个题目保留上边线，最后一个答案保留下边线。</zh_cn>
    // <zh_tw>為方便pdf轉圖片後切透明邊，第一個題目保留上邊線，最後一個答案保留下邊線。</zh_tw >
    'page:nth-child(2n) topic:first-of-type question{border-top-color:#999;}',
    'page:nth-child(2n) topic:last-of-type answer{border-bottom-color:#999;}',
  );

  const body = document.getElementsByTagName('body')[0];

  const { htmlA, htmlB } = getPokerHtml();
  for (let i = 0; i < 2; ++i) {
    const pageElement = createPageElement();
    pageElement.innerHTML = i === 0 ? htmlA.concat(firstPageAppendHtml) : htmlB;
    body.appendChild(pageElement);
  }

  window.print();
}
