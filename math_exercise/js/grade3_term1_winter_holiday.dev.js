"use strict";

// const DEBUGGGING = true;
var MIN_OF_SUBTRAHEND = 11;
var QuestionCategoryType = {
  Oral: 0,
  Vertical: 1,
  OffTheShelf: 2
};
var LineCountMethodType = {
  LeftToRight: 0,
  // A+B+C
  RightToLeft: 1,
  // A+B*C
  LeftToRightByBrackets: 2,
  // (A+B)*C
  RightToLeftByBrackets: 3 // A*(B+C)

};
var DATA = {
  // 几个常量：口算题目数、竖式题目数、脱式题目数
  COUNT_ORAL_QUESTION_COUNT_PER_PAGE: 4,
  COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE: 3,
  COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE: 3,
  HORIZONTAL_SPACE: 10,
  // 8 A+B+C, A+B-C, A-B-C, A-B+C, A×B×C, A÷B÷C, A*B÷C, A÷B×C,
  // 8 A×B+C, A×B-C, A÷B+C, A÷B-C, A+B*C, A-B*C, A+B÷C, A-B÷C,
  // 4 A+(B+C), A-(B+C), A+(B-C), A-(B-C),
  // 4 A×(B+C), A÷(B+C), A×(B-C), A÷(B-C)
  QUESTION_TYPE_COUNT: 24,
  QUESTION_COVER_PAGE_SUBJECT_TEXT: '三年级寒假数学计算',
  ANSWER_COVER_PAGE_SUBJECT_TEXT: '三年级寒假数学计算答案',
  QUESTION_PAGE_FOOTER_TEXT: '三年级寒假数学',
  ANSWER_PAGE_FOOTER_TEXT: '',
  // '三年级寒假数学答案',
  COVER_PAGE_SUBJECT_FONT_SIZE: 12,
  CONTENT_PAGE_SUBJECT_Y: 0,
  CONTENT_PAGE_SUBJECT_HEIGHT: 8,
  CONTENT_PAGE_SUBJECT_FONT_SIZE: 5,
  CONTENT_PAGE_FOOTER_FONT_SIZE: 3,
  // CONTENT_PAGE_SUBJECT_FONT_SIZE: 7.5,
  CONTENT_PAGE_FOOTER_HEIGHT: 8,
  Y_POSITIONS_OF_QUESTION_ARRAY: [],
  A5_PAGE_SVG_END: '</g>',
  QUESTION_TEXT_PAGE_CONTENT_ARRAY: [],
  ANSWER_TEXT_PAGE_CONTENT_ARRAY: [],
  QUESTION_PAGE_CONTENT_ARRAY: [],
  ANSWER_PAGE_CONTENT_ARRAY: [],
  ORAL_QUESTION_ARRAY: [],
  VERTICAL_QUESTION_ARRAY: [],
  OFF_THE_SHELF_QUESTION_ARRAY: [],
  QUESTION_ROW_HEIGHT: 8,
  A5_PAGE_TOP_PADDING: 5,
  ORAL_QUESTION_AREA_BOTTOM_MARGIN: 2,
  VERTICAL_QUESTION_AREA_HEIGHT: 55.5,
  // 原来是45，现在调大些——可以在后续代码中动态增减
  OFF_THE_SHELF_QUESTION_AREA_HEIGHT: 8 * 3,
  // 原来是45，现在调小为QUESTION_ROW_HEIGHT * 3
  QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH: 40,
  CONTENT_PAGE_CONTENT_FONT_SIZE: 3.5,
  CHAR_WIDTH: 3.5 * 0.7,
  // CONTENT_PAGE_CONTENT_FONT_SIZE * 0.7
  CONTENT_PAGE_CONTENT_CHAR_WIDTH: 3.5 * 0.05,
  // 0.05,
  // CONTENT_PAGE_CONTENT_CHAR_WIDTH: 3.5 * 0.6, // tspan使用x而非dx时，原本右对齐的内容变成了左对齐
  // OFF_THE_SHELF_QUESTION_START_POSITION_SCALE: 2.15,
  OFF_THE_SHELF_LINE_STROKE_COLOR: '#000000',
  OFF_THE_SHELF_LINE_STROKE_WIDTH: '0.1',
  OFF_THE_SHELF_QUESTION_X: 3.5 * 2.15,
  // 3,
  BLUE_VERTIAL_LINE_STROKE_COLOR: '#008800',
  VERTIAL_LINE_STROKE_COLOR: '#000000',
  VERTIAL_LINE_STROKE_WIDTH: '0.1',
  VERTIAL_LINE_Y_MARGIN_TOP: 3,
  SECONDARY_NUMBER_COLOR: '#ff0000',
  SECONDARY_NUMBER_FONT_SIZE: 2,
  COVER_CONTENT_VERTICAL_ALIGN: 'middle',
  // top
  COVER_PAGE_SUBJECT_ROW_HEIGHT_EM: 1.4,
  BORDER_LINE_STROKE_COLOR: '#888888',
  BORDER_LINE_STROKE_WIDTH: '0.1',
  SEPERATOR_LINE_STROKE_COLOR: '#aaaaaa',
  SEPERATOR_LINE_STROKE_WIDTH: '0.1'
}; // 已去掉：1, 2, 3, 5, 7
// 4, 9
// 6, 8

var A_TIMES_B_VALUE_ARRAY = [// // 1
// {
//   Value: 1,
//   One: 1,
//   Two: 1,
// },
// // 2
// {
//   Value: 2,
//   One: 1,
//   Two: 2,
// },
// {
//   Value: 2,
//   One: 2,
//   Two: 1,
// },
// // 3
// {
//   Value: 3,
//   One: 1,
//   Two: 3,
// },
// {
//   Value: 3,
//   One: 3,
//   Two: 1,
// },
// // 5
// {
//   Value: 5,
//   One: 1,
//   Two: 5,
// },
// {
//   Value: 5,
//   One: 5,
//   Two: 1,
// },
// // 7
// {
//   Value: 7,
//   One: 1,
//   Two: 7,
// },
// {
//   Value: 7,
//   One: 5,
//   Two: 1,
// },
// 4
// {
//   Value: 4,
//   One: 1,
//   Two: 4,
// },
// {
//   Value: 4,
//   One: 4,
//   Two: 1,
// },
{
  Value: 4,
  One: 2,
  Two: 2
}, // 9
// {
//   Value: 9,
//   One: 1,
//   Two: 9,
// },
// {
//   Value: 9,
//   One: 9,
//   Two: 1,
// },
{
  Value: 9,
  One: 3,
  Two: 3
}, // 6
// {
//   Value: 6,
//   One: 1,
//   Two: 6,
// },
// {
//   Value: 6,
//   One: 6,
//   Two: 1,
// },
{
  Value: 6,
  One: 2,
  Two: 3
}, {
  Value: 6,
  One: 3,
  Two: 2
}, // 8
// {
//   Value: 8,
//   One: 1,
//   Two: 8,
// },
// {
//   Value: 8,
//   One: 8,
//   Two: 1,
// },
{
  Value: 8,
  One: 2,
  Two: 4
}, {
  Value: 8,
  One: 4,
  Two: 2
}];
var A_TIMES_B_VALUE_COUNT = A_TIMES_B_VALUE_ARRAY.length; // const SPACE_40 = ' '.repeat(40); // '                                        ';
// grade2_term2_summer_holiday.htm?start=20230703&end=20230830&left=10&right=10&top=15&bottom=20&notrim=true&removeCover=false&oralMax=100&verticalMax=200&offTheShelfMax=100
// 安启电脑 grade2_term2_summer_holiday.htm?start=20230703&end=20230830&left=4&right=4&top=4&bottom=4&notrim=true&removeCover=false&oralMax=200&verticalMax=1000&offTheShelfMax=200
// 测试 grade2_term2_summer_holiday.htm?start=20230703&end=20230830&left=4&right=4&top=4&bottom=4&notrim=true&removeCover=false&oralMax=100&verticalMax=200&offTheShelfMax=100

function parseUrl() {
  var DEFAULT_START_DATE = '20230127'; // 八位：4位年，2位月，2位日

  var DEFAULT_END_DATE = '20240225'; // 八位：4位年，2位月，2位日

  var DEFAULT_MARGIN_LEFT = 10; // 单位：毫米

  var DEFAULT_MARGIN_RIGHT = 10; // 单位：毫米

  var DEFAULT_MARGIN_TOP = 15; // 单位：毫米

  var DEFAULT_MARGIN_BOTTOM = 20; // 单位：毫米

  var DEFAULT_NO_TRIM = true; // true表示不用裁切，每张A4纸四页为连续页，4-1-2-3, 8-5-6-7；false表示需裁切但无需装订，60-1-2-59, 58-3-4-57这样的页序

  var DEFAULT_REMOVE_COVER = false;
  var DEFAULT_ORAL_MAX = 100;
  var DEFAULT_VERTICAL_MAX = 200;
  var DEFAULT_OFF_THE_SHELF_MAX = 100; // panic: end=20300225
  // maybe panic: end=20280225
  // ok: >= 8100
  // maybe error(less than 0): 20, 1000, 5000, ..., 8099

  var MIN_OF_MAX_VALUE = 8100; // <解析页面参数>

  var URL = window.location.href.replace('?', '&'); // start=20230703&end=20230830

  var INPUT_START_DATE = decodeURI(URL.concat("&start=".concat(DEFAULT_START_DATE)).replace('&start=', '厶').split('厶')[1].split('&')[0]);
  var INPUT_END_DATE = decodeURI(URL.concat("&end=".concat(DEFAULT_END_DATE)).replace('&end=', '厶').split('厶')[1].split('&')[0]); // left=3&right=3&top=3&bottom=3

  var MARGIN_LEFT = Math.max(0, parseInt(URL.concat("&left=".concat(DEFAULT_MARGIN_LEFT)).replace('&left=', '厶').split('厶')[1].split('&')[0], 10));
  var MARGIN_RIGHT = Math.max(0, parseInt(URL.concat("&right=".concat(DEFAULT_MARGIN_RIGHT)).replace('&right=', '厶').split('厶')[1].split('&')[0], 10));
  var MARGIN_TOP = Math.max(0, parseInt(URL.concat("&top=".concat(DEFAULT_MARGIN_TOP)).replace('&top=', '厶').split('厶')[1].split('&')[0], 10));
  var MARGIN_BOTTOM = Math.max(0, parseInt(URL.concat("&bottom=".concat(DEFAULT_MARGIN_BOTTOM)).replace('&bottom=', '厶').split('厶')[1].split('&')[0], 10)); // notrim=true

  var IS_NO_TRIM = URL.concat("&notrim=".concat(DEFAULT_NO_TRIM)).replace('&notrim=', '厶').split('厶')[1].split('&')[0] === 'true'; // &removeCover=false&oralMax=100&verticalMax=200&offTheShelfMax=100

  var REMOVE_COVER = URL.concat("&removeCover=".concat(DEFAULT_REMOVE_COVER)).replace('&removeCover=', '厶').split('厶')[1].split('&')[0] === 'true'; // console.log(REMOVE_COVER);

  var ORAL_MAX = Math.max(MIN_OF_MAX_VALUE, parseInt(URL.concat("&oralMax=".concat(DEFAULT_ORAL_MAX)).replace('&oralMax=', '厶').split('厶')[1].split('&')[0], 10));
  var VERTICAL_MAX = Math.max(MIN_OF_MAX_VALUE, parseInt(URL.concat("&verticalMax=".concat(DEFAULT_VERTICAL_MAX)).replace('&verticalMax=', '厶').split('厶')[1].split('&')[0], 10));
  var OFF_THE_SHELF_MAX = Math.max(MIN_OF_MAX_VALUE, parseInt(URL.concat("&offTheShelfMax=".concat(DEFAULT_OFF_THE_SHELF_MAX)).replace('&offTheShelfMax=', '厶').split('厶')[1].split('&')[0], 10)); // </解析页面参数>
  // <转为实际日期>

  var START_DATE = new Date(parseInt(INPUT_START_DATE.substr(0, 4)), parseInt(INPUT_START_DATE.substr(4, 2)) - 1, parseInt(INPUT_START_DATE.substr(6, 2)));
  var END_DATE = new Date(parseInt(INPUT_END_DATE.substr(0, 4)), parseInt(INPUT_END_DATE.substr(4, 2)) - 1, parseInt(INPUT_END_DATE.substr(6, 2)));
  var DAY_COUNT = (END_DATE - START_DATE) / 86400000 + 1; // </转为实际日期>

  DATA.MARGIN_LEFT = MARGIN_LEFT;
  DATA.MARGIN_RIGHT = MARGIN_RIGHT;
  DATA.MARGIN_TOP = MARGIN_TOP;
  DATA.MARGIN_BOTTOM = MARGIN_BOTTOM;
  DATA.IS_NO_TRIM = IS_NO_TRIM;
  DATA.START_DATE = START_DATE;
  DATA.END_DATE = END_DATE;
  DATA.DAY_COUNT = DAY_COUNT;
  DATA.DEFAULT_MARGIN_TOP = DEFAULT_MARGIN_TOP;
  DATA.DEFAULT_MARGIN_BOTTOM = DEFAULT_MARGIN_BOTTOM;
  DATA.DEFAULT_MARGIN_LEFT = DEFAULT_MARGIN_LEFT;
  DATA.DEFAULT_MARGIN_RIGHT = DEFAULT_MARGIN_RIGHT;
  DATA.REMOVE_COVER = REMOVE_COVER;
  DATA.ORAL_MAX = ORAL_MAX;
  DATA.VERTICAL_MAX = VERTICAL_MAX;
  DATA.OFF_THE_SHELF_MAX = OFF_THE_SHELF_MAX;
  return window;
}

function countPageCount() {
  var DAY_COUNT = DATA.DAY_COUNT,
      IS_NO_TRIM = DATA.IS_NO_TRIM,
      REMOVE_COVER = DATA.REMOVE_COVER; // 计算题目本、答案本各需多少张A4纸

  var PAPER_COUNT = Math.ceil((DAY_COUNT + (REMOVE_COVER ? 0 : 1)) / 4);
  var A5_PAGE_COUNT = 4 * PAPER_COUNT;
  var A5_PAGE_MAX_INDEX = A5_PAGE_COUNT - 1;
  var EMPTY_A5_PAGE_COUNT = A5_PAGE_COUNT - (DAY_COUNT + 1);
  var EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK = [];

  if (EMPTY_A5_PAGE_COUNT) {
    if (REMOVE_COVER) {
      // 无封面时，空白页为小册子最后几页
      // if (IS_NO_TRIM) {
      //   // 不裁切时，空白页为最后一张纸的最后几页
      //   for (let i = 0; i < EMPTY_A5_PAGE_COUNT; ++i) {
      //     EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(A5_PAGE_MAX_INDEX - i);
      //   }
      // } else {
      //   // 裁切时，空白页为第一张纸的第4、3、2页
      //   for (let i = 0; i < EMPTY_A5_PAGE_COUNT; ++i) {
      //     EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(3 - i);
      //   }
      // }
      var EMPTY_PAGE_END_INDEX = IS_NO_TRIM ? A5_PAGE_MAX_INDEX : 3;

      for (var i = 0; i < EMPTY_A5_PAGE_COUNT; ++i) {
        EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(EMPTY_PAGE_END_INDEX - i);
      }
    } else {
      // 有封面时，空白页优先使用封面页的背面
      EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(1);

      switch (EMPTY_A5_PAGE_COUNT) {
        case 1:
          break;

        case 2:
          EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(IS_NO_TRIM ? A5_PAGE_MAX_INDEX : 3);
          break;

        case 3:
          EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(IS_NO_TRIM ? A5_PAGE_MAX_INDEX : 3);
          EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(IS_NO_TRIM ? A5_PAGE_MAX_INDEX - 1 : 2);
          break;

        default:
          break;
      }
    }
  }

  EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.sort();
  DATA.PAPER_COUNT = PAPER_COUNT;
  DATA.A5_PAGE_MAX_INDEX = A5_PAGE_MAX_INDEX;
  DATA.EMPTY_A5_PAGE_COUNT = EMPTY_A5_PAGE_COUNT;
  DATA.EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK = EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK;
  return window;
}

function countPositionAndSize() {
  var MARGIN_LEFT = DATA.MARGIN_LEFT,
      MARGIN_RIGHT = DATA.MARGIN_RIGHT,
      MARGIN_TOP = DATA.MARGIN_TOP,
      MARGIN_BOTTOM = DATA.MARGIN_BOTTOM,
      HORIZONTAL_SPACE = DATA.HORIZONTAL_SPACE,
      DEFAULT_MARGIN_TOP = DATA.DEFAULT_MARGIN_TOP,
      DEFAULT_MARGIN_BOTTOM = DATA.DEFAULT_MARGIN_BOTTOM,
      DEFAULT_MARGIN_LEFT = DATA.DEFAULT_MARGIN_LEFT,
      DEFAULT_MARGIN_RIGHT = DATA.DEFAULT_MARGIN_RIGHT,
      CONTENT_PAGE_FOOTER_HEIGHT = DATA.CONTENT_PAGE_FOOTER_HEIGHT,
      COVER_PAGE_SUBJECT_FONT_SIZE = DATA.COVER_PAGE_SUBJECT_FONT_SIZE,
      ANSWER_COVER_PAGE_SUBJECT_TEXT = DATA.ANSWER_COVER_PAGE_SUBJECT_TEXT,
      COVER_PAGE_SUBJECT_ROW_HEIGHT_EM = DATA.COVER_PAGE_SUBJECT_ROW_HEIGHT_EM;
  var A5_PAGE_WIDTH = (297 - MARGIN_LEFT - MARGIN_RIGHT - HORIZONTAL_SPACE) / 2;
  var A5_PAGE_HEIGHT = 210 - MARGIN_TOP - MARGIN_BOTTOM;
  var LEFT_A5_PAGE_LEFT = MARGIN_LEFT;
  var RIGHT_A5_PAGE_LEFT = 297 - MARGIN_RIGHT - A5_PAGE_WIDTH;
  var A5_PAGE_WIDTH_HALF = A5_PAGE_WIDTH * 0.5;
  var A5_PAGE_HEIGHT_HALF = A5_PAGE_HEIGHT * 0.5;
  var LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG1 = '<g style="transform:translate(';
  var LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG2 = "mm, ".concat(MARGIN_TOP, "mm);width:").concat(A5_PAGE_WIDTH, "mm;height:").concat(A5_PAGE_HEIGHT, "mm;\">");
  var LEFT_A5_PAGE_SVG_START = "".concat(LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG1).concat(LEFT_A5_PAGE_LEFT).concat(LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG2);
  var RIGHT_A5_PAGE_SVG_START = "".concat(LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG1).concat(RIGHT_A5_PAGE_LEFT).concat(LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG2);
  var COVER_CONTENT_X = A5_PAGE_WIDTH_HALF; // const COVER_CONTENT_Y = 0; // A5_PAGE_HEIGHT_HALF;
  // const COVER_CONTENT_Y = COVER_PAGE_SUBJECT_FONT_SIZE * 2; // A5_PAGE_HEIGHT_HALF; // 0;

  var COVER_CONTENT_Y = A5_PAGE_HEIGHT_HALF - COVER_PAGE_SUBJECT_FONT_SIZE * ANSWER_COVER_PAGE_SUBJECT_TEXT.length * COVER_PAGE_SUBJECT_ROW_HEIGHT_EM * 0.5; // A5_PAGE_HEIGHT_HALF;

  var Y_POSITIONS_OF_QUESTION_ARRAY = DATA.Y_POSITIONS_OF_QUESTION_ARRAY,
      CONTENT_PAGE_SUBJECT_Y = DATA.CONTENT_PAGE_SUBJECT_Y,
      CONTENT_PAGE_SUBJECT_HEIGHT = DATA.CONTENT_PAGE_SUBJECT_HEIGHT,
      QUESTION_ROW_HEIGHT = DATA.QUESTION_ROW_HEIGHT,
      A5_PAGE_TOP_PADDING = DATA.A5_PAGE_TOP_PADDING,
      ORAL_QUESTION_AREA_BOTTOM_MARGIN = DATA.ORAL_QUESTION_AREA_BOTTOM_MARGIN,
      VERTICAL_QUESTION_AREA_HEIGHT = DATA.VERTICAL_QUESTION_AREA_HEIGHT,
      OFF_THE_SHELF_QUESTION_AREA_HEIGHT = DATA.OFF_THE_SHELF_QUESTION_AREA_HEIGHT,
      COUNT_ORAL_QUESTION_COUNT_PER_PAGE = DATA.COUNT_ORAL_QUESTION_COUNT_PER_PAGE,
      COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE = DATA.COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE,
      COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE = DATA.COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE;
  var y = CONTENT_PAGE_SUBJECT_Y + CONTENT_PAGE_SUBJECT_HEIGHT + A5_PAGE_TOP_PADDING;
  Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
  var ORAL_QUESTION_AREA_HEIGHT = QUESTION_ROW_HEIGHT + ORAL_QUESTION_AREA_BOTTOM_MARGIN;
  var ORAL_QUESTION_AREA_ROW_COUNT = Math.floor(COUNT_ORAL_QUESTION_COUNT_PER_PAGE / 2);

  for (var loopOfOral = 0; loopOfOral < ORAL_QUESTION_AREA_ROW_COUNT; ++loopOfOral) {
    y += ORAL_QUESTION_AREA_HEIGHT;
    Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
  }

  var VERTICAL_QUESTION_AREA_ROW_COUNT = Math.floor(COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE / 2);

  for (var loopOfVertical = 0; loopOfVertical < VERTICAL_QUESTION_AREA_ROW_COUNT; ++loopOfVertical) {
    y += VERTICAL_QUESTION_AREA_HEIGHT;
    Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
  }

  if (COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE % 2 === 1) {
    y += Math.max(VERTICAL_QUESTION_AREA_HEIGHT, OFF_THE_SHELF_QUESTION_AREA_HEIGHT);
    Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
  }

  var FIX_COUNT = COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE % 2 === 1 ? 1 : 0;
  var OFF_THE_SHELF_QUESTION_AREA_ROW_COUNT = Math.ceil((COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE - FIX_COUNT) / 2) - 1;

  for (var loopOfOffTheShelf = 0; loopOfOffTheShelf < OFF_THE_SHELF_QUESTION_AREA_ROW_COUNT; ++loopOfOffTheShelf) {
    y += OFF_THE_SHELF_QUESTION_AREA_HEIGHT;
    Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
  } // console.log({ Y_POSITIONS_OF_QUESTION_ARRAY });


  var OFF_THE_SHELF_LINE_Y = QUESTION_ROW_HEIGHT * 0.8; // 这里借用ORAL_QUESTION_AREA_HEIGHT（因脱式区域采用与口算题目区同样的行高，就不再定义相关常量了）

  var OFF_THE_SHELF_SECOND_ROW_Y = ORAL_QUESTION_AREA_HEIGHT + ORAL_QUESTION_AREA_BOTTOM_MARGIN;
  var OFF_THE_SHELF_THIRD_ROW_Y = OFF_THE_SHELF_SECOND_ROW_Y + QUESTION_ROW_HEIGHT;
  DATA.A5_PAGE_WIDTH = A5_PAGE_WIDTH;
  DATA.A5_PAGE_HEIGHT = A5_PAGE_HEIGHT;
  DATA.A5_PAGE_WIDTH_HALF = A5_PAGE_WIDTH_HALF;
  DATA.LEFT_A5_PAGE_SVG_START = LEFT_A5_PAGE_SVG_START;
  DATA.RIGHT_A5_PAGE_SVG_START = RIGHT_A5_PAGE_SVG_START;
  DATA.COVER_CONTENT_X = COVER_CONTENT_X;
  DATA.COVER_CONTENT_Y = COVER_CONTENT_Y;
  DATA.OFF_THE_SHELF_LINE_Y = OFF_THE_SHELF_LINE_Y;
  DATA.OFF_THE_SHELF_SECOND_ROW_Y = OFF_THE_SHELF_SECOND_ROW_Y;
  DATA.OFF_THE_SHELF_THIRD_ROW_Y = OFF_THE_SHELF_THIRD_ROW_Y; // 修正VERTICAL_QUESTION_AREA_HEIGHT

  if (MARGIN_TOP !== DEFAULT_MARGIN_TOP || MARGIN_BOTTOM !== DEFAULT_MARGIN_BOTTOM) {
    DATA.VERTICAL_QUESTION_AREA_HEIGHT += (DEFAULT_MARGIN_TOP - MARGIN_TOP + (DEFAULT_MARGIN_BOTTOM - MARGIN_BOTTOM)) / 2;
  } // 修正QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH


  if (MARGIN_LEFT !== DEFAULT_MARGIN_LEFT || MARGIN_RIGHT !== DEFAULT_MARGIN_RIGHT) {
    DATA.QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH += (DEFAULT_MARGIN_LEFT + DEFAULT_MARGIN_RIGHT - MARGIN_LEFT - MARGIN_RIGHT) / 2; // console.log({
    //   DEFAULT_MARGIN_LEFT,
    //   DEFAULT_MARGIN_RIGHT,
    //   MARGIN_LEFT,
    //   MARGIN_RIGHT,
    //   diff: DEFAULT_MARGIN_LEFT + DEFAULT_MARGIN_RIGHT - MARGIN_LEFT - MARGIN_RIGHT,
    // });
  }

  var STEP_ROW_SPACE = QUESTION_ROW_HEIGHT; // + ORAL_QUESTION_AREA_BOTTOM_MARGIN;

  DATA.STEP_ROW_SPACE = STEP_ROW_SPACE;
  DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN = A5_PAGE_WIDTH_HALF * 0.5;
  DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION1 = A5_PAGE_WIDTH_HALF * 0.25; // DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION2 = A5_PAGE_WIDTH_HALF * 0.75;
  // DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION1 = A5_PAGE_WIDTH_HALF * 0.2;

  DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION2 = A5_PAGE_WIDTH_HALF * 0.8;
  var VERTICAL_QUESTION_AREA_HEIGHT_HALF = DATA.VERTICAL_QUESTION_AREA_HEIGHT * 0.5;
  DATA.VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN = VERTICAL_QUESTION_AREA_HEIGHT_HALF + STEP_ROW_SPACE * 5 * 0.5;
  DATA.VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN = VERTICAL_QUESTION_AREA_HEIGHT_HALF + STEP_ROW_SPACE * 4 * 0.5; // console.log({
  //   VERTICAL_QUESTION_AREA_HEIGHT_HALF,
  //   VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN: DATA.VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN,
  //   VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN: DATA.VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN,
  // });

  var MM_TO_PX_SCALE = getMmToPxScale();
  DATA.MM_TO_PX_SCALE = MM_TO_PX_SCALE;
  var BIG_RADIUS_PX = MM_TO_PX_SCALE * QUESTION_ROW_HEIGHT;
  var SMALL_RADIUS_PX = MM_TO_PX_SCALE * DATA.CHAR_WIDTH; // DATA.DIVISION_PATH_HTML = `a ${BIG_RADIUS_PX} ${SMALL_RADIUS_PX} 0 0 1 ${BIG_RADIUS_PX},${SMALL_RADIUS_PX}`;
  // DATA.DIVISION_PATH_HTML = `a ${BIG_RADIUS_PX} ${SMALL_RADIUS_PX} 0 0 1 ${BIG_RADIUS_PX}, ${SMALL_RADIUS_PX}`;

  DATA.DIVISION_PATH_HTML = "a -".concat(SMALL_RADIUS_PX, " ").concat(BIG_RADIUS_PX, " 0 0 1 -").concat(SMALL_RADIUS_PX, ", ").concat(BIG_RADIUS_PX);
  var BORDER_LINE_STROKE_COLOR = DATA.BORDER_LINE_STROKE_COLOR,
      BORDER_LINE_STROKE_WIDTH = DATA.BORDER_LINE_STROKE_WIDTH,
      SEPERATOR_LINE_STROKE_COLOR = DATA.SEPERATOR_LINE_STROKE_COLOR,
      SEPERATOR_LINE_STROKE_WIDTH = DATA.SEPERATOR_LINE_STROKE_WIDTH;
  var TOP_BORDER_LINE_Y = CONTENT_PAGE_SUBJECT_HEIGHT;
  var BOTTOM_BORDER_LINE_Y = A5_PAGE_HEIGHT - CONTENT_PAGE_FOOTER_HEIGHT * 1.2;
  var BORDER_LINE_LEFT = 0;
  var BORDER_LINE_RIGHT = A5_PAGE_WIDTH;
  DATA.BORDER_LINE_HTML = "<line\n        x1=\"".concat(BORDER_LINE_LEFT, "mm\"\n        y1=\"").concat(TOP_BORDER_LINE_Y, "mm\"\n        x2=\"").concat(BORDER_LINE_RIGHT, "mm\"\n        y2=\"").concat(TOP_BORDER_LINE_Y, "mm\"\n        stroke=\"").concat(BORDER_LINE_STROKE_COLOR, "\"\n        stroke-width=\"").concat(BORDER_LINE_STROKE_WIDTH, "mm\"\n      /><line\n        x1=\"").concat(BORDER_LINE_LEFT, "mm\"\n        y1=\"").concat(BOTTOM_BORDER_LINE_Y, "mm\"\n        x2=\"").concat(BORDER_LINE_RIGHT, "mm\"\n        y2=\"").concat(BOTTOM_BORDER_LINE_Y, "mm\"\n        stroke=\"").concat(BORDER_LINE_STROKE_COLOR, "\"\n        stroke-width=\"").concat(BORDER_LINE_STROKE_WIDTH, "mm\"\n      />");
  var Y0 = Y_POSITIONS_OF_QUESTION_ARRAY[0];
  DATA.SEPERATOR_LINE_HTML = "<line\n        x1=\"".concat(A5_PAGE_WIDTH_HALF, "mm\"\n        y1=\"").concat(Y0, "mm\"\n        x2=\"").concat(A5_PAGE_WIDTH_HALF, "mm\"\n        y2=\"").concat(BOTTOM_BORDER_LINE_Y, "mm\"\n        stroke=\"").concat(SEPERATOR_LINE_STROKE_COLOR, "\"\n        stroke-width=\"").concat(SEPERATOR_LINE_STROKE_WIDTH, "mm\"\n      />\n      ");
  Y_POSITIONS_OF_QUESTION_ARRAY.forEach(function (y) {
    DATA.SEPERATOR_LINE_HTML += "<line\n        x1=\"".concat(0, "mm\"\n        y1=\"", y, "mm\"\n        x2=\"").concat(A5_PAGE_WIDTH, "mm\"\n        y2=\"").concat(y, "mm\"\n        stroke=\"").concat(SEPERATOR_LINE_STROKE_COLOR, "\"\n        stroke-width=\"").concat(SEPERATOR_LINE_STROKE_WIDTH, "mm\"\n      />");
  });
  return window;
}

function countCoverPageContent() {
  if (!DATA.REMOVE_COVER) {
    var RIGHT_A5_PAGE_SVG_START = DATA.RIGHT_A5_PAGE_SVG_START,
        A5_PAGE_WIDTH = DATA.A5_PAGE_WIDTH,
        A5_PAGE_HEIGHT = DATA.A5_PAGE_HEIGHT,
        COVER_CONTENT_X = DATA.COVER_CONTENT_X,
        COVER_CONTENT_Y = DATA.COVER_CONTENT_Y,
        COVER_PAGE_SUBJECT_FONT_SIZE = DATA.COVER_PAGE_SUBJECT_FONT_SIZE,
        QUESTION_COVER_PAGE_SUBJECT_TEXT = DATA.QUESTION_COVER_PAGE_SUBJECT_TEXT,
        ANSWER_COVER_PAGE_SUBJECT_TEXT = DATA.ANSWER_COVER_PAGE_SUBJECT_TEXT,
        A5_PAGE_SVG_END = DATA.A5_PAGE_SVG_END,
        COVER_CONTENT_VERTICAL_ALIGN = DATA.COVER_CONTENT_VERTICAL_ALIGN,
        COVER_PAGE_SUBJECT_ROW_HEIGHT_EM = DATA.COVER_PAGE_SUBJECT_ROW_HEIGHT_EM; // Error: <text> attribute transform: Expected number, "rotate(90, 66.75mm, 87.5mm)".
    // transform="rotate(90, ${COVER_CONTENT_X}mm, ${COVER_CONTENT_Y}mm)" rotate="-90"

    var COVER_PAGE_CONTENT_START = "".concat(RIGHT_A5_PAGE_SVG_START, "<text class=\"center ").concat(COVER_CONTENT_VERTICAL_ALIGN, "\" x=\"").concat(COVER_CONTENT_X, "mm\" y=\"").concat(COVER_CONTENT_Y, "mm\" style=\"font-size:").concat(COVER_PAGE_SUBJECT_FONT_SIZE, "mm;\">");
    var COVER_PAGE_CONTENT_END = "</text>".concat(A5_PAGE_SVG_END);

    var convertCoverTextToVertialHtml = function convertCoverTextToVertialHtml(content) {
      return content.split('').map(function (_char, char_index) {
        return "<tspan dx=\"".concat(char_index ? "-".concat(COVER_PAGE_SUBJECT_FONT_SIZE, "mm") : 0, "\" dy=\"").concat(char_index ? "".concat(COVER_PAGE_SUBJECT_FONT_SIZE * COVER_PAGE_SUBJECT_ROW_HEIGHT_EM, "mm") : 0, "\">").concat(_char, "</tspan>");
      }).join('');
    };

    var QUESTION_COVER_PAGE_CONTENT = "".concat(COVER_PAGE_CONTENT_START).concat(convertCoverTextToVertialHtml(DATA.QUESTION_COVER_PAGE_SUBJECT_TEXT)).concat(COVER_PAGE_CONTENT_END);
    var ANSWER_COVER_PAGE_CONTENT = "".concat(COVER_PAGE_CONTENT_START).concat(convertCoverTextToVertialHtml(DATA.ANSWER_COVER_PAGE_SUBJECT_TEXT)).concat(COVER_PAGE_CONTENT_END);
    DATA.QUESTION_COVER_PAGE_CONTENT = QUESTION_COVER_PAGE_CONTENT;
    DATA.ANSWER_COVER_PAGE_CONTENT = ANSWER_COVER_PAGE_CONTENT;
  }

  return window;
} // 限定脱式题型


function getQuestionByKind(questionType, questionKind) {
  var question = '';
  var answer = '';
  var formula = '';
  var last_step_is_divide = false;
  var IS_ORAL = questionKind === QuestionCategoryType.Oral;
  var IS_VERTICAL = questionKind === QuestionCategoryType.Vertical;
  var IS_OFF_THE_SHELF = questionKind === QuestionCategoryType.OffTheShelf;
  var a = 0;
  var b = 0;
  var c = 0;
  var middleResult = 0;
  var result = 0; // 商, 余数

  var quotient = 0;
  var remainder = 0;
  var isOnlyOneColumn = false;
  var operator1 = '';
  var operator2 = '';
  var lineCountMethod = LineCountMethodType.LeftToRight; // A+B+C

  var secondRowFormula = '';
  var power = 0; // 4 * 59 = 236, 236 / 24 = 9.833333333333334

  switch (questionType) {
    case 0:
      // A+B+C
      var _getAdditionTupleByRe = getAdditionTupleByResultLimited(questionKind);

      a = _getAdditionTupleByRe.addend1;
      b = _getAdditionTupleByRe.addend2;
      middleResult = _getAdditionTupleByRe.sum;

      var _getAdditionTupleWith = getAdditionTupleWithAddendByResultLimited(questionKind, middleResult);

      c = _getAdditionTupleWith.addend;
      result = _getAdditionTupleWith.result;
      formula = "".concat(a, "+").concat(b, "+").concat(c);
      lineCountMethod = LineCountMethodType.LeftToRight;

      if (IS_VERTICAL) {
        isOnlyOneColumn = true;
        operator1 = '+';
        operator2 = '+';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(middleResult, "+").concat(c);
      }

      break;

    case 1:
      // A+B-C
      var _getAdditionTupleByRe2 = getAdditionTupleByResultLimited(questionKind);

      a = _getAdditionTupleByRe2.addend1;
      b = _getAdditionTupleByRe2.addend2;
      middleResult = _getAdditionTupleByRe2.sum;

      var _getSubtractionTupleW = getSubtractionTupleWithMinuendByResultLimited(questionKind, middleResult);

      c = _getSubtractionTupleW.subtrahend;
      result = _getSubtractionTupleW.result;
      formula = "".concat(a, "+").concat(b, "-").concat(c);
      lineCountMethod = LineCountMethodType.LeftToRight;

      if (IS_VERTICAL) {
        isOnlyOneColumn = true;
        operator1 = '+';
        operator2 = '-';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(middleResult, "-").concat(c);
      }

      break;

    case 2:
      // A-B-C
      var _getAdditionTupleByRe3 = getAdditionTupleByResultLimited(questionKind);

      b = _getAdditionTupleByRe3.addend1;
      c = _getAdditionTupleByRe3.addend2;
      middleResult = _getAdditionTupleByRe3.sum;

      var _getSubtractionTupleW2 = getSubtractionTupleWithSubtrahendByResultLimited(questionKind, middleResult);

      a = _getSubtractionTupleW2.minuend;
      result = _getSubtractionTupleW2.result;
      middleResult = a - b;
      formula = "".concat(a, "-").concat(b, "-").concat(c);
      lineCountMethod = LineCountMethodType.LeftToRight;

      if (IS_VERTICAL) {
        isOnlyOneColumn = true;
        operator1 = '-';
        operator2 = '-';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(middleResult, "-").concat(c);
      }

      break;

    case 3:
      // A-B+C
      var _getSubtractionTupleB = getSubtractionTupleByResultLimited(questionKind);

      a = _getSubtractionTupleB.minuend;
      b = _getSubtractionTupleB.subtrahend;
      middleResult = _getSubtractionTupleB.difference;

      var _getAdditionTupleWith2 = getAdditionTupleWithAddendByResultLimited(questionKind, middleResult);

      c = _getAdditionTupleWith2.addend;
      result = _getAdditionTupleWith2.result;
      formula = "".concat(a, "-").concat(b, "+").concat(c);
      lineCountMethod = LineCountMethodType.LeftToRight;

      if (IS_VERTICAL) {
        isOnlyOneColumn = true;
        operator1 = '-';
        operator2 = '+';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(middleResult, "+").concat(c);
      }

      break;

    case 4:
      // A×B×C
      var _getMultiplicationTup = getMultiplicationTupleByResultLimited9Advance();

      a = _getMultiplicationTup.multiplier1;
      b = _getMultiplicationTup.multiplier2;
      middleResult = _getMultiplicationTup.product;
      c = Math.ceil(Math.random() * 9);
      result = middleResult * c;
      formula = "".concat(a, "*").concat(b, "*").concat(c);
      lineCountMethod = LineCountMethodType.LeftToRight;

      if (IS_VERTICAL) {
        isOnlyOneColumn = true;
        operator1 = '*';
        operator2 = '*';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(middleResult, "*").concat(c);
      }

      break;

    case 5:
      // A÷B÷C
      var _getMultiplicationTup2 = getMultiplicationTupleByMultiplierLimited9Advance2();

      b = _getMultiplicationTup2.multiplier1;
      middleResult = _getMultiplicationTup2.multiplier2;
      a = _getMultiplicationTup2.product;
      // power = Math.pow(10, Math.floor(Math.random() * 2));
      // a *= power;
      c = Math.ceil(Math.random() * middleResult);

      var _getDivisionTupleMayC = getDivisionTupleMayContainRemainder(middleResult, c);

      quotient = _getDivisionTupleMayC.quotient;
      remainder = _getDivisionTupleMayC.remainder;
      last_step_is_divide = true;
      formula = "".concat(a, "/").concat(b, "/").concat(c);
      lineCountMethod = LineCountMethodType.LeftToRight;

      if (IS_VERTICAL) {
        // isOnlyOneColumn = false;
        operator1 = '/';
        operator2 = '/';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(middleResult, "/").concat(c);
      }

      break;

    case 6:
      // A*B÷C
      var _getMultiplicationTup3 = getMultiplicationTupleByMultiplierLimited9Advance();

      a = _getMultiplicationTup3.multiplier1;
      b = _getMultiplicationTup3.multiplier2;
      middleResult = _getMultiplicationTup3.product;
      c = Math.ceil(Math.random() * Math.min(9, middleResult));

      var _getDivisionTupleMayC2 = getDivisionTupleMayContainRemainder(middleResult, c);

      quotient = _getDivisionTupleMayC2.quotient;
      remainder = _getDivisionTupleMayC2.remainder;
      last_step_is_divide = true;
      formula = "".concat(a, "*").concat(b, "/").concat(c);
      lineCountMethod = LineCountMethodType.LeftToRight;

      if (IS_VERTICAL) {
        // isOnlyOneColumn = false;
        operator1 = '*';
        operator2 = '/';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(middleResult, "/").concat(c);
      }

      break;

    case 7:
      // A÷B×C
      // b = Math.ceil(Math.random() * 9);
      // c = Math.ceil(Math.random() * 9);
      // a = b * Math.ceil(Math.random() * 9);
      // if (DEBUGGGING) {
      //     // 240 ÷ 4 × 180 = 10800
      //     a = 360;
      //     b = 4;
      //     // c = 180;
      //     c = 88880;
      //     middleResult = a / b;
      //     result = middleResult * c;
      // } else {
      //     ({
      //         dividend: a,
      //         divisor: b,
      //         quotient: middleResult,
      //     } = getDivisionTupleWithoutRemainderByResultLimited9Advance());
      //     ({
      //             multiplier: c,
      //             product: result
      //         } =
      //         // getMultiplicationTupleWithMultiplieByMultiplierLimited9(middleResult));
      //         getMultiplicationTupleWithMultiplieByMultiplierLimited9Advance(middleResult));
      // }
      var _getDivisionTupleWith = getDivisionTupleWithoutRemainderByResultLimited9Advance();

      a = _getDivisionTupleWith.dividend;
      b = _getDivisionTupleWith.divisor;
      middleResult = _getDivisionTupleWith.quotient;

      var _getMultiplicationTup4 = // getMultiplicationTupleWithMultiplieByMultiplierLimited9(middleResult));
      getMultiplicationTupleWithMultiplieByMultiplierLimited9Advance(middleResult);

      c = _getMultiplicationTup4.multiplier;
      result = _getMultiplicationTup4.product;
      formula = "".concat(a, "/").concat(b, "*").concat(c);
      lineCountMethod = LineCountMethodType.LeftToRight;

      if (IS_VERTICAL) {
        // isOnlyOneColumn = false;
        operator1 = '/';
        operator2 = '*';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(middleResult, "*").concat(c);
      }

      break;

    case 8:
      // A×B+C
      var _getMultiplicationTup5 = getMultiplicationTupleByMultiplierLimited9Advance();

      a = _getMultiplicationTup5.multiplier1;
      b = _getMultiplicationTup5.multiplier2;
      middleResult = _getMultiplicationTup5.product;

      var _getAdditionTupleWith3 = getAdditionTupleWithAddendByResultLimited(questionKind, middleResult);

      c = _getAdditionTupleWith3.addend;
      result = _getAdditionTupleWith3.result;
      formula = "".concat(a, "*").concat(b, "+").concat(c);
      lineCountMethod = LineCountMethodType.LeftToRight;

      if (IS_VERTICAL) {
        isOnlyOneColumn = true;
        operator1 = '*';
        operator2 = '+';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(middleResult, "+").concat(c);
      }

      break;

    case 9:
      // A×B-C
      var _getMultiplicationTup6 = getMultiplicationTupleByMultiplierLimited9Advance();

      a = _getMultiplicationTup6.multiplier1;
      b = _getMultiplicationTup6.multiplier2;
      middleResult = _getMultiplicationTup6.product;

      var _getSubtractionTupleW3 = getSubtractionTupleWithMinuendByResultLimited(questionKind, middleResult);

      c = _getSubtractionTupleW3.subtrahend;
      result = _getSubtractionTupleW3.result;
      formula = "".concat(a, "*").concat(b, "-").concat(c);
      lineCountMethod = LineCountMethodType.LeftToRight;

      if (IS_VERTICAL) {
        isOnlyOneColumn = true;
        operator1 = '*';
        operator2 = '-';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(middleResult, "-").concat(c);
      }

      break;

    case 10:
      // A÷B+C
      // b = Math.ceil(Math.random() * 9);
      // a = b * Math.ceil(Math.random() * 9);
      // c = Math.ceil(Math.random() * (a / b));
      var _getDivisionTupleWith2 = getDivisionTupleWithoutRemainderByResultLimited9Advance();

      a = _getDivisionTupleWith2.dividend;
      b = _getDivisionTupleWith2.divisor;
      middleResult = _getDivisionTupleWith2.quotient;

      var _getAdditionTupleWith4 = getAdditionTupleWithAddendByResultLimited(questionKind, middleResult);

      c = _getAdditionTupleWith4.addend;
      result = _getAdditionTupleWith4.result;
      formula = "".concat(a, "/").concat(b, "+").concat(c);
      lineCountMethod = LineCountMethodType.LeftToRight;

      if (IS_VERTICAL) {
        // isOnlyOneColumn = false;
        operator1 = '/';
        operator2 = '+';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(middleResult, "+").concat(c);
      }

      break;

    case 11:
      // A÷B-C
      // b = Math.ceil(Math.random() * 9);
      // a = b * Math.ceil(Math.random() * 9);
      var _getDivisionTupleWith3 = getDivisionTupleWithoutRemainderByResultLimited9Advance();

      a = _getDivisionTupleWith3.dividend;
      b = _getDivisionTupleWith3.divisor;
      middleResult = _getDivisionTupleWith3.quotient;

      var _getSubtractionTupleW4 = getSubtractionTupleWithMinuendByResultLimited(questionKind, middleResult);

      c = _getSubtractionTupleW4.subtrahend;
      result = _getSubtractionTupleW4.result;
      formula = "".concat(a, "/").concat(b, "-").concat(c);
      lineCountMethod = LineCountMethodType.LeftToRight;

      if (IS_VERTICAL) {
        // isOnlyOneColumn = false;
        operator1 = '/';
        operator2 = '-';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(middleResult, "-").concat(c);
      }

      break;

    case 12:
      // A+B*C
      var _getMultiplicationTup7 = getMultiplicationTupleByMultiplierLimited9Advance();

      b = _getMultiplicationTup7.multiplier1;
      c = _getMultiplicationTup7.multiplier2;
      middleResult = _getMultiplicationTup7.product;

      var _getAdditionTupleWith5 = getAdditionTupleWithAddendByResultLimited(questionKind, middleResult);

      a = _getAdditionTupleWith5.addend;
      result = _getAdditionTupleWith5.result;
      formula = "".concat(a, "+").concat(b, "*").concat(c);
      lineCountMethod = LineCountMethodType.RightToLeft;

      if (IS_VERTICAL) {
        isOnlyOneColumn = true;
        operator1 = '*';
        operator2 = '+';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(a, "+").concat(middleResult);
      }

      break;

    case 13:
      // A-B*C
      var _getMultiplicationTup8 = getMultiplicationTupleByMultiplierLimited9Advance();

      b = _getMultiplicationTup8.multiplier1;
      c = _getMultiplicationTup8.multiplier2;
      middleResult = _getMultiplicationTup8.product;

      var _getSubtractionTupleW5 = getSubtractionTupleWithSubtrahendByResultLimited(questionKind, middleResult);

      a = _getSubtractionTupleW5.minuend;
      result = _getSubtractionTupleW5.result;
      formula = "".concat(a, "-").concat(b, "*").concat(c);
      lineCountMethod = LineCountMethodType.RightToLeft;

      if (IS_VERTICAL) {
        // isOnlyOneColumn = false;
        operator1 = '*';
        operator2 = '-';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(a, "-").concat(middleResult);
      }

      break;

    case 14:
      // A+B÷C
      // c = Math.ceil(Math.random() * 9);
      // b = c * Math.ceil(Math.random() * 9);
      // a = Math.ceil(Math.random() * (MAX_VALUE - b / c));
      var _getDivisionTupleWith4 = getDivisionTupleWithoutRemainderByResultLimited9Advance();

      b = _getDivisionTupleWith4.dividend;
      c = _getDivisionTupleWith4.divisor;
      middleResult = _getDivisionTupleWith4.quotient;

      var _getAdditionTupleWith6 = getAdditionTupleWithAddendByResultLimited(questionKind, middleResult);

      a = _getAdditionTupleWith6.addend;
      result = _getAdditionTupleWith6.result;
      formula = "".concat(a, "+").concat(b, "/").concat(c);
      lineCountMethod = LineCountMethodType.RightToLeft;

      if (IS_VERTICAL) {
        // isOnlyOneColumn = false;
        operator1 = '/';
        operator2 = '+';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(a, "+").concat(middleResult);
      }

      break;

    case 15:
      // A-B÷C
      // c = Math.ceil(Math.random() * 9);
      // b = c * Math.ceil(Math.random() * 9);
      var _getDivisionTupleWith5 = getDivisionTupleWithoutRemainderByResultLimited9Advance();

      b = _getDivisionTupleWith5.dividend;
      c = _getDivisionTupleWith5.divisor;
      middleResult = _getDivisionTupleWith5.quotient;

      var _getSubtractionTupleW6 = getSubtractionTupleWithSubtrahendByResultLimited(questionKind, middleResult);

      a = _getSubtractionTupleW6.minuend;
      result = _getSubtractionTupleW6.result;
      formula = "".concat(a, "-").concat(b, "/").concat(c);
      lineCountMethod = LineCountMethodType.RightToLeft;

      if (IS_VERTICAL) {
        // isOnlyOneColumn = false;
        operator1 = '/';
        operator2 = '-';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(a, "-").concat(middleResult);
      }

      break;

    case 16:
      // A+(B+C)
      var _getAdditionTupleByRe4 = getAdditionTupleByResultLimited(questionKind);

      b = _getAdditionTupleByRe4.addend1;
      c = _getAdditionTupleByRe4.addend2;
      middleResult = _getAdditionTupleByRe4.sum;

      var _getAdditionTupleWith7 = getAdditionTupleWithAddendByResultLimited(questionKind, middleResult);

      a = _getAdditionTupleWith7.addend;
      result = _getAdditionTupleWith7.result;
      formula = "".concat(a, "+(").concat(b, "+").concat(c, ")");
      lineCountMethod = LineCountMethodType.RightToLeftByBrackets;

      if (IS_VERTICAL) {
        isOnlyOneColumn = true;
        operator1 = '+';
        operator2 = '+';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(a, "+").concat(middleResult);
      }

      break;

    case 17:
      // A-(B+C)
      var _getAdditionTupleByRe5 = getAdditionTupleByResultLimited(questionKind);

      b = _getAdditionTupleByRe5.addend1;
      c = _getAdditionTupleByRe5.addend2;
      middleResult = _getAdditionTupleByRe5.sum;

      var _getSubtractionTupleW7 = getSubtractionTupleWithSubtrahendByResultLimited(questionKind, middleResult);

      a = _getSubtractionTupleW7.minuend;
      result = _getSubtractionTupleW7.result;
      formula = "".concat(a, "-(").concat(b, "+").concat(c, ")");
      lineCountMethod = LineCountMethodType.RightToLeftByBrackets;

      if (IS_VERTICAL) {
        // isOnlyOneColumn = false;
        operator1 = '+';
        operator2 = '-';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(a, "-").concat(middleResult);
      }

      break;

    case 18:
      // A+(B-C)
      var _getSubtractionTupleB2 = getSubtractionTupleByResultLimited(questionKind);

      b = _getSubtractionTupleB2.minuend;
      c = _getSubtractionTupleB2.subtrahend;
      middleResult = _getSubtractionTupleB2.difference;

      var _getAdditionTupleWith8 = getAdditionTupleWithAddendByResultLimited(questionKind, middleResult);

      a = _getAdditionTupleWith8.addend;
      result = _getAdditionTupleWith8.result;
      formula = "".concat(a, "+(").concat(b, "-").concat(c, ")");
      lineCountMethod = LineCountMethodType.RightToLeftByBrackets;

      if (IS_VERTICAL) {
        isOnlyOneColumn = true;
        operator1 = '-';
        operator2 = '+';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(a, "+").concat(middleResult);
      }

      break;

    case 19:
      // A-(B-C)
      // if (DEBUGGGING) {
      //     // 19818 － (15612 － 6940) = 11146
      //     a = 19818;
      //     b = 15612;
      //     c = 6940;
      //     result = 11146;
      //     middleResult = b - c;
      // } else {
      //     ({
      //         minuend: b,
      //         subtrahend: c,
      //         difference: middleResult,
      //     } = getSubtractionTupleByResultLimited(questionKind));
      //     ({
      //         minuend: a,
      //         result
      //     } = getSubtractionTupleWithSubtrahendByResultLimited(
      //         questionKind,
      //         middleResult,
      //     ));
      // }
      var _getSubtractionTupleB3 = getSubtractionTupleByResultLimited(questionKind);

      b = _getSubtractionTupleB3.minuend;
      c = _getSubtractionTupleB3.subtrahend;
      middleResult = _getSubtractionTupleB3.difference;

      var _getSubtractionTupleW8 = getSubtractionTupleWithSubtrahendByResultLimited(questionKind, middleResult);

      a = _getSubtractionTupleW8.minuend;
      result = _getSubtractionTupleW8.result;
      formula = "".concat(a, "-(").concat(b, "-").concat(c, ")");
      lineCountMethod = LineCountMethodType.RightToLeftByBrackets;

      if (IS_VERTICAL) {
        // isOnlyOneColumn = false;
        operator1 = '-';
        operator2 = '-';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(a, "-").concat(middleResult);
      }

      break;

    case 20:
      // A×(B+C)
      var _getAdditionTupleByRe6 = getAdditionTupleByResultLimited9();

      b = _getAdditionTupleByRe6.addend1;
      c = _getAdditionTupleByRe6.addend2;
      middleResult = _getAdditionTupleByRe6.sum;

      var _getMultiplicationTup9 = // getMultiplicationTupleWithMultiplieByMultiplierLimited9(middleResult));
      getMultiplicationTupleWithMultiplieByMultiplierLimited9Advance(middleResult);

      a = _getMultiplicationTup9.multiplier;
      result = _getMultiplicationTup9.product;
      formula = "".concat(a, "*(").concat(b, "+").concat(c, ")");
      lineCountMethod = LineCountMethodType.RightToLeftByBrackets;

      if (IS_VERTICAL) {
        isOnlyOneColumn = true;
        operator1 = '+';
        operator2 = '*';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(a, "*").concat(middleResult);
      }

      break;

    case 21:
      // A÷(B+C)
      var _getAdditionTupleByRe7 = getAdditionTupleByResultLimited9();

      b = _getAdditionTupleByRe7.addend1;
      c = _getAdditionTupleByRe7.addend2;
      middleResult = _getAdditionTupleByRe7.sum;

      var _getDivisionTupleMayC3 = getDivisionTupleMayContainRemainderWithDivisorByResultLimited9Advance(middleResult);

      a = _getDivisionTupleMayC3.dividend;
      quotient = _getDivisionTupleMayC3.quotient;
      remainder = _getDivisionTupleMayC3.remainder;
      last_step_is_divide = true;
      formula = "".concat(a, "/(").concat(b, "+").concat(c, ")");
      lineCountMethod = LineCountMethodType.RightToLeftByBrackets;

      if (IS_VERTICAL) {
        // isOnlyOneColumn = false;
        operator1 = '+';
        operator2 = '/';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(a, "/").concat(middleResult);
      }

      break;

    case 22:
      // A×(B-C)
      var _getSubtractionTupleB4 = getSubtractionTupleByResultLimited9(questionKind, 2);

      b = _getSubtractionTupleB4.minuend;
      c = _getSubtractionTupleB4.subtrahend;
      middleResult = _getSubtractionTupleB4.difference;

      var _getMultiplicationTup10 = // getMultiplicationTupleWithMultiplieByMultiplierLimited9(middleResult));
      getMultiplicationTupleWithMultiplieByMultiplierLimited9Advance(middleResult);

      a = _getMultiplicationTup10.multiplier;
      result = _getMultiplicationTup10.product;
      formula = "".concat(a, "*(").concat(b, "-").concat(c, ")");
      lineCountMethod = LineCountMethodType.RightToLeftByBrackets;

      if (IS_VERTICAL) {
        isOnlyOneColumn = true;
        operator1 = '-';
        operator2 = '*';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(a, "*").concat(middleResult);
      }

      break;

    case 23:
      // A÷(B-C)
      var _getSubtractionTupleB5 = getSubtractionTupleByResultLimited9(questionKind, 2);

      b = _getSubtractionTupleB5.minuend;
      c = _getSubtractionTupleB5.subtrahend;
      middleResult = _getSubtractionTupleB5.difference;

      var _getDivisionTupleMayC4 = getDivisionTupleMayContainRemainderWithDivisorByResultLimited9Advance(middleResult);

      a = _getDivisionTupleMayC4.dividend;
      quotient = _getDivisionTupleMayC4.quotient;
      remainder = _getDivisionTupleMayC4.remainder;
      last_step_is_divide = true;
      formula = "".concat(a, "/(").concat(b, "-").concat(c, ")");
      lineCountMethod = LineCountMethodType.RightToLeftByBrackets;

      if (IS_VERTICAL) {
        // isOnlyOneColumn = false;
        operator1 = '-';
        operator2 = '/';
      } else if (IS_OFF_THE_SHELF) {
        secondRowFormula = "".concat(a, "/").concat(middleResult);
      }

      break;

    default:
      break;
  }

  if (a < 0 || b < 0 || c < 0) {
    console.log('a', a, 'b', b, 'c', c);
  }

  var FORMULA_STRING = getMathFormula(formula);
  var QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH = DATA.QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH,
      QUESTION_ROW_HEIGHT = DATA.QUESTION_ROW_HEIGHT,
      CONTENT_PAGE_CONTENT_FONT_SIZE = DATA.CONTENT_PAGE_CONTENT_FONT_SIZE,
      OFF_THE_SHELF_QUESTION_X = DATA.OFF_THE_SHELF_QUESTION_X; // https://fex-team.github.io/blog/2014/06/svg-whitespace/

  var QUESTION_ROW_HEIGHT_HALF = QUESTION_ROW_HEIGHT * 0.5; // const QUESTION_ROW_HTML = `<text class="right middle" x="${QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH}mm" y="${QUESTION_ROW_HEIGHT_HALF}mm" style="height:${QUESTION_ROW_HEIGHT}mm">${FORMULA_STRING}${
  //   IS_OFF_THE_SHELF ? '&nbsp;&nbsp;&nbsp;' : ' =&nbsp;'
  // }</text>`;

  var QUESTION_ROW_HTML = IS_OFF_THE_SHELF ? "<text class=\"left middle\" x=\"".concat(OFF_THE_SHELF_QUESTION_X, "mm\" y=\"").concat(QUESTION_ROW_HEIGHT_HALF, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm;\">").concat(FORMULA_STRING.concat(IS_OFF_THE_SHELF ? '   ' : ' = '), "</text>") : "<text class=\"right middle\" x=\"".concat(QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH, "mm\" y=\"").concat(QUESTION_ROW_HEIGHT_HALF, "mm\" style=\"height:").concat(QUESTION_ROW_HEIGHT, "mm;font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm;\">").concat(getContentPageContentTextByChars(FORMULA_STRING.concat(IS_OFF_THE_SHELF ? '   ' : ' = ')), "</text>");
  var OFF_THE_SHELF_ANSWER_START_ROW_HTML = !IS_OFF_THE_SHELF ? '' : "<text class=\"left middle\" x=\"".concat(OFF_THE_SHELF_QUESTION_X, "mm\" y=\"").concat(QUESTION_ROW_HEIGHT_HALF, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm;\">").concat(getOffTheShelfMathFormula(formula, a, c, lineCountMethod), "</text>");

  if (last_step_is_divide) {
    result = "".concat(quotient).concat(remainder > 0 ? "......".concat(remainder) : '');
  } else {
    result = result.toString();
  }

  var ANSWER_HTML = IS_OFF_THE_SHELF ? '' : "<text class=\"left middle\" x=\"".concat(QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH, "mm\" y=\"").concat(QUESTION_ROW_HEIGHT_HALF, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm;\">&nbsp;").concat(result, "</text>");
  var STEP_HTML = IS_ORAL ? '' : IS_OFF_THE_SHELF ? getOffTheShelfQuestionStepHtml(lineCountMethod, a, b, c, secondRowFormula, result) : getVertialQuestionStepHtml(lineCountMethod, isOnlyOneColumn, operator1, operator2, a, b, c, middleResult, result, quotient, remainder);
  return {
    // 问题页，仅题目
    questionHtml: QUESTION_ROW_HTML,
    // 答案页：题目与答案、步骤
    answerHtml: "".concat(IS_OFF_THE_SHELF ? OFF_THE_SHELF_ANSWER_START_ROW_HTML : QUESTION_ROW_HTML).concat(ANSWER_HTML).concat(STEP_HTML)
  };
}

function getVertialQuestionStepHtml(lineCountMethod, isOnlyOneColumn, operator1, operator2, a, b, c, middleResult, result, quotient, remainder) {
  // const IS_SUBTRACTION_1 = operator1 === '-';
  // const IS_SUBTRACTION_2 = operator2 === '-';
  var IS_DIVISION_1 = operator1 === '/';
  var IS_DIVISION_2 = operator2 === '/';
  var IS_MULTIPLY_1 = operator1 === '*';
  var IS_MULTIPLY_2 = operator2 === '*';
  var IS_LEFT_TO_RIGHT = lineCountMethod === LineCountMethodType.LeftToRight || lineCountMethod === LineCountMethodType.LeftToRightByBrackets;
  var operand_1_1 = IS_LEFT_TO_RIGHT ? a : b;
  var operand_1_2 = IS_LEFT_TO_RIGHT ? b : c; // const operand_2_1 = isOnlyOneColumn ? 0 : IS_LEFT_TO_RIGHT ? middleResult : a;
  // const operand_2_1 = IS_LEFT_TO_RIGHT ? middleResult : a;
  // const operand_2_1 = IS_LEFT_TO_RIGHT ? middleResult : c;

  var operand_2_1 = IS_LEFT_TO_RIGHT ? middleResult : isOnlyOneColumn ? middleResult : a;
  var operand_2_2 = IS_LEFT_TO_RIGHT ? c : isOnlyOneColumn ? a : middleResult;
  var TRIM_RIGHT_ZERO_OPERAND_1_2 = trimRightZero(operand_1_2).length;
  var TRIM_RIGHT_ZERO_OPERAND_2_2 = trimRightZero(operand_2_2).length;
  var APPEND_ROW_COUNT_1 = IS_MULTIPLY_1 && TRIM_RIGHT_ZERO_OPERAND_1_2 > 1 ? TRIM_RIGHT_ZERO_OPERAND_1_2 : 0;
  var APPEND_ROW_COUNT_2 = IS_MULTIPLY_2 && TRIM_RIGHT_ZERO_OPERAND_2_2 > 1 ? TRIM_RIGHT_ZERO_OPERAND_2_2 : 0; // 目测当前行间空白区可放下退位减所需小圆点与借位、退位辅助数字
  // const STEP_ROW_COUNT = isOnlyOneColumn
  //   ? 5 + IS_SUBTRACTION_1
  //     ? 1
  //     : 0 + IS_SUBTRACTION_2
  //     ? 1
  //     : 0
  //   : 3 + (IS_SUBTRACTION_1 || IS_SUBTRACTION_2 ? 1 : 0);
  // const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 : IS_DIVISION_1 || IS_DIVISION_2 ? 4 : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);

  var STEP_ROW_COUNT = isOnlyOneColumn ? 5 + (APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 > 0 ? 0.5 : 0) : IS_DIVISION_1 || IS_DIVISION_2 ? 4 : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
  var ONE_COLUMN_MAX_LENGTH = isOnlyOneColumn ? 1 + Math.max(a.toString().length, b.toString().length, c.toString().length, middleResult.toString().length, result.toString().length) : 0; // 连加合一竖式

  if (operator1 === '+' && operator2 === '+') {
    return getVertialQuestionStepColumnHtmlOfPlusAndPlus( // ONE_COLUMN_MAX_LENGTH,
    // STEP_ROW_COUNT,
    a, b, c, result);
  }

  return "".concat(getVertialQuestionStepColumnHtml(isOnlyOneColumn, ONE_COLUMN_MAX_LENGTH, STEP_ROW_COUNT, 0, operator1, operand_1_1, operand_1_2, middleResult, IS_DIVISION_1 ? middleResult : 0, // quotient,
  0 // remainder,
  ), ", ").concat(getVertialQuestionStepColumnHtml(isOnlyOneColumn, ONE_COLUMN_MAX_LENGTH, isOnlyOneColumn ? STEP_ROW_COUNT : STEP_ROW_COUNT - APPEND_ROW_COUNT_1, 1, operator2, operand_2_1, operand_2_2, result, quotient, remainder));
}

function getTspanCharByChar(content, CHAR_WIDTH) {
  // return content.toString().split('').map(c => `<tspan style="display:inline-block;width:${CHAR_WIDTH * 10}mm;">${c}</tspan>`).join('');
  return content.toString().split('').map(function (c, i) {
    return "<tspan dx=\"".concat(CHAR_WIDTH, "mm\">").concat(c, "</tspan>");
  }).join('');
} // console.log(getTspanCharByChar(11937, 3.5));


function getTransparentTspanCharByChar(RIGHT_ZERO_COUNT, content, CHAR_WIDTH) {
  content = content.toString();
  return content.split('').map(function (c) {
    return "<tspan dx=\"".concat(CHAR_WIDTH, "mm\">").concat(c, "</tspan>");
  }).join('').concat(RIGHT_ZERO_COUNT > 0 ? '0'.repeat(RIGHT_ZERO_COUNT).split('').map(function (c) {
    return "<tspan dx=\"".concat(CHAR_WIDTH, "mm\" style=\"fill:transparent;\">").concat(c, "</tspan>");
  }).join('') : '');
} // console.log(getTspanCharByChar(11937, 3.5));


function getVertialQuestionStepColumnHtmlOfPlusAndPlus( // ONE_COLUMN_MAX_LENGTH,
// STEP_ROW_COUNT,
operand1, operand2, operand3, result) {
  var STRING_OPERAND1 = operand1.toString();
  var STRING_OPERAND2 = operand2.toString();
  var STRING_OPERAND3 = operand3.toString();
  var LENGTH_OF_OPERAND1 = STRING_OPERAND1.length;
  var LENGTH_OF_OPERAND2 = STRING_OPERAND2.length;
  var LENGTH_OF_OPERAND3 = STRING_OPERAND3.length; // 横向依于中线进行布局（最终折算成右线），纵向依于底线进行布局

  var LENGTH_OF_RESULT = result.toString().length;
  var MAX_LENGTH = LENGTH_OF_RESULT + 2;
  var VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN = DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN,
      VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN = DATA.VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN,
      STEP_ROW_SPACE = DATA.STEP_ROW_SPACE,
      CONTENT_PAGE_CONTENT_FONT_SIZE = DATA.CONTENT_PAGE_CONTENT_FONT_SIZE,
      CHAR_WIDTH = DATA.CHAR_WIDTH,
      VERTIAL_LINE_STROKE_COLOR = DATA.VERTIAL_LINE_STROKE_COLOR,
      VERTIAL_LINE_STROKE_WIDTH = DATA.VERTIAL_LINE_STROKE_WIDTH,
      VERTIAL_LINE_Y_MARGIN_TOP = DATA.VERTIAL_LINE_Y_MARGIN_TOP;
  var LINE_WIDTH = CHAR_WIDTH * 1.75 * MAX_LENGTH;
  var LINE_WIDTH_HALF = LINE_WIDTH * 0.5;
  var RIGHT_X = LINE_WIDTH_HALF + VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN;
  var VERTIAL_QUESTION_STEP_BOTTOM = VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN - STEP_ROW_SPACE * 1.6;
  var Y4 = VERTIAL_QUESTION_STEP_BOTTOM;
  var Y3 = Y4 - STEP_ROW_SPACE + CONTENT_PAGE_CONTENT_FONT_SIZE * 0.5 - STEP_ROW_SPACE * 0.2;
  var Y2 = Y3 - STEP_ROW_SPACE;
  var Y1 = Y2 - STEP_ROW_SPACE; // const Y0 = Y1 - STEP_ROW_SPACE;

  var X2 = RIGHT_X + CHAR_WIDTH * 2;
  var X1 = X2 - LINE_WIDTH;
  var TEXT_HTML_ARRAY = [];
  var SECONDARY_NUMBER_COLOR = DATA.SECONDARY_NUMBER_COLOR,
      SECONDARY_NUMBER_FONT_SIZE = DATA.SECONDARY_NUMBER_FONT_SIZE; // 最后一行都有一条上横线和一个数字
  // 加法可能有进位符

  TEXT_HTML_ARRAY.push( // `<text class="right bottom" x="${RIGHT_X}mm" y="${Y1}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${`${operand1}`}</text>`,
  "<text class=\"right bottom\" x=\"".concat(RIGHT_X, "mm\" y=\"").concat(Y1, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">", "".concat(getTspanCharByChar(operand1, CHAR_WIDTH)), "</text>"));
  TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(RIGHT_X, "mm\" y=\"").concat(Y2, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">").concat(getTspanCharByChar(operand2, CHAR_WIDTH), "</text>"));
  TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(RIGHT_X, "mm\" y=\"").concat(Y3, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">").concat(getTspanCharByChar('＋'.concat('　'.repeat(LENGTH_OF_RESULT - LENGTH_OF_OPERAND3), operand3), CHAR_WIDTH), "</text>")); // 计算进位加辅助数字

  for (var digitCount = 1; digitCount < LENGTH_OF_RESULT; ++digitCount) {
    var a = LENGTH_OF_OPERAND1 < digitCount ? operand1 : parseInt(STRING_OPERAND1.substr(-1 * digitCount), 0);
    var b = LENGTH_OF_OPERAND2 < digitCount ? operand2 : parseInt(STRING_OPERAND2.substr(-1 * digitCount), 0);
    var c = LENGTH_OF_OPERAND3 < digitCount ? operand3 : parseInt(STRING_OPERAND3.substr(-1 * digitCount), 0); // console.log({ a, b, digitCount, sum: a + b, sumLength: (a + b).length });

    if ((a + b + c).toString().length > digitCount) {
      // const X = RIGHT_X - CHAR_WIDTH * 1.75 * (digitCount - 1);
      var X = RIGHT_X - CHAR_WIDTH * 1.75 * digitCount + CHAR_WIDTH * 0.5; // console.log('ok');

      TEXT_HTML_ARRAY.push( //  - CHAR_WIDTH * 0.7
      "<text class=\"left bottom\" x=\"".concat(X, "mm\" y=\"").concat(Y3 + SECONDARY_NUMBER_FONT_SIZE, "mm\"\n        style=\"fill:").concat(SECONDARY_NUMBER_COLOR, ";font-size:").concat(SECONDARY_NUMBER_FONT_SIZE, "mm\">").concat((a + b + c).toString().substring(0, 1), "</text>"));
    }
  }

  TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(RIGHT_X, "mm\" y=\"").concat(Y4, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">").concat(getTspanCharByChar(result, CHAR_WIDTH), "</text>"));
  var LINE_Y3 = Y3 + VERTIAL_LINE_Y_MARGIN_TOP;
  return TEXT_HTML_ARRAY.join('').concat("<line\n        x1=\"".concat(X1, "mm\"\n        y1=\"").concat(LINE_Y3, "mm\"\n        x2=\"").concat(X2, "mm\"\n        y2=\"").concat(LINE_Y3, "mm\"\n        stroke=\"").concat(VERTIAL_LINE_STROKE_COLOR, "\"\n        stroke-width=\"").concat(VERTIAL_LINE_STROKE_WIDTH, "mm\"\n      />"));
}

function trimRightZero(original) {
  original = original.toString();
  var length = original.length;

  while (length && original.substring(length - 1) === '0') {
    original = original.substring(0, length - 1);
    --length;
  }

  return original;
}

function getVertialQuestionStepColumnHtml(isOnlyOneColumn, ONE_COLUMN_MAX_LENGTH, STEP_ROW_COUNT, columnIndex, operator, operand1, operand2, result, quotient, remainder) {
  // 最后一行都有一条上横线和一个数字
  // 除法：至少4行文字、2条横线、1条弧线
  // 加减乘：除操作符及三个数字外，乘法没有其它内容，加法可能有进位符，减法可能有借位符及相关辅助数字
  var STEP_ROW_SPACE = DATA.STEP_ROW_SPACE,
      CONTENT_PAGE_CONTENT_FONT_SIZE = DATA.CONTENT_PAGE_CONTENT_FONT_SIZE,
      CHAR_WIDTH = DATA.CHAR_WIDTH,
      VERTIAL_LINE_STROKE_COLOR = DATA.VERTIAL_LINE_STROKE_COLOR,
      VERTIAL_LINE_STROKE_WIDTH = DATA.VERTIAL_LINE_STROKE_WIDTH,
      VERTIAL_LINE_Y_MARGIN_TOP = DATA.VERTIAL_LINE_Y_MARGIN_TOP,
      DIVISION_PATH_HTML = DATA.DIVISION_PATH_HTML,
      MM_TO_PX_SCALE = DATA.MM_TO_PX_SCALE,
      BLUE_VERTIAL_LINE_STROKE_COLOR = DATA.BLUE_VERTIAL_LINE_STROKE_COLOR;

  var _prepairGetVertialQue = prepairGetVertialQuestionStepColumnHtml(operand1, operand2, result, quotient, operator, isOnlyOneColumn, ONE_COLUMN_MAX_LENGTH, CHAR_WIDTH, columnIndex, STEP_ROW_SPACE, STEP_ROW_COUNT),
      IS_SUBTRACTION = _prepairGetVertialQue.IS_SUBTRACTION,
      IS_DIVISION = _prepairGetVertialQue.IS_DIVISION,
      IS_MULTIPLY = _prepairGetVertialQue.IS_MULTIPLY,
      VERTIAL_QUESTION_STEP_BOTTOM = _prepairGetVertialQue.VERTIAL_QUESTION_STEP_BOTTOM,
      RIGHT_X = _prepairGetVertialQue.RIGHT_X,
      LENGTH_OF_RESULT = _prepairGetVertialQue.LENGTH_OF_RESULT,
      LENGTH_OF_OPERAND2 = _prepairGetVertialQue.LENGTH_OF_OPERAND2,
      LENGTH_OF_OPERAND1 = _prepairGetVertialQue.LENGTH_OF_OPERAND1,
      STRING_OPERAND1 = _prepairGetVertialQue.STRING_OPERAND1,
      STRING_OPERAND2 = _prepairGetVertialQue.STRING_OPERAND2,
      STRING_RESULT = _prepairGetVertialQue.STRING_RESULT,
      X1 = _prepairGetVertialQue.X1,
      X2 = _prepairGetVertialQue.X2;

  var TEXT_HTML_ARRAY = [];

  if (IS_DIVISION) {
    return getDivisionVertialQuestionStepColumnHtml(STEP_ROW_SPACE, quotient, operand1, VERTIAL_QUESTION_STEP_BOTTOM, VERTIAL_LINE_Y_MARGIN_TOP, RIGHT_X, CHAR_WIDTH, TEXT_HTML_ARRAY, CONTENT_PAGE_CONTENT_FONT_SIZE, operand2, remainder, X1, X2, VERTIAL_LINE_STROKE_COLOR, VERTIAL_LINE_STROKE_WIDTH, MM_TO_PX_SCALE, DIVISION_PATH_HTML);
  }

  var SECONDARY_NUMBER_COLOR = DATA.SECONDARY_NUMBER_COLOR,
      SECONDARY_NUMBER_FONT_SIZE = DATA.SECONDARY_NUMBER_FONT_SIZE;

  if (IS_MULTIPLY) {
    // && trimRightZero(operand2).length > 1
    return getMultiplyVertialQuestionStepColumnHtml(isOnlyOneColumn, columnIndex, operand1, operand2, result, STRING_OPERAND1, STRING_OPERAND2, STRING_RESULT, LENGTH_OF_OPERAND1, LENGTH_OF_OPERAND2, LENGTH_OF_RESULT, VERTIAL_QUESTION_STEP_BOTTOM, STEP_ROW_SPACE, CONTENT_PAGE_CONTENT_FONT_SIZE, RIGHT_X, X1, X2, CHAR_WIDTH, SECONDARY_NUMBER_FONT_SIZE, SECONDARY_NUMBER_COLOR, VERTIAL_LINE_Y_MARGIN_TOP, VERTIAL_LINE_STROKE_COLOR, VERTIAL_LINE_STROKE_WIDTH, BLUE_VERTIAL_LINE_STROKE_COLOR);
  }

  var Y3 = VERTIAL_QUESTION_STEP_BOTTOM;
  var Y2 = Y3 - STEP_ROW_SPACE;
  var Y1 = Y2 - STEP_ROW_SPACE + (isOnlyOneColumn ? CONTENT_PAGE_CONTENT_FONT_SIZE * (IS_SUBTRACTION ? 1 : 0.5) : 0);
  var Y0 = Y1 - STEP_ROW_SPACE;
  var LINE_Y2 = Y2 + VERTIAL_LINE_Y_MARGIN_TOP;
  var LINE_HTML_ARRAY = [];
  LINE_HTML_ARRAY.push("<line\n        x1=\"".concat(X1, "mm\"\n        y1=\"").concat(LINE_Y2, "mm\"\n        x2=\"").concat(X2, "mm\"\n        y2=\"").concat(LINE_Y2, "mm\"\n        stroke=\"").concat(VERTIAL_LINE_STROKE_COLOR, "\"\n        stroke-width=\"").concat(VERTIAL_LINE_STROKE_WIDTH, "mm\"\n      />"));
  TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(RIGHT_X, "mm\" y=\"").concat(Y1, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">", "".concat(getTspanCharByChar(operand1, CHAR_WIDTH)), "</text>"));
  TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(RIGHT_X, "mm\" y=\"").concat(Y2, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">").concat(getTransparentTspanCharByChar(1 + Math.max(LENGTH_OF_RESULT, LENGTH_OF_OPERAND2, LENGTH_OF_OPERAND1) - LENGTH_OF_OPERAND2 - (IS_SUBTRACTION ? 1 : 0), getMathFormula(operator).replace(/ /gi, ''), CHAR_WIDTH)).concat(getTspanCharByChar(operand2, CHAR_WIDTH), "</text>"));

  if (IS_SUBTRACTION) {
    var DIGIT_INFO_ARRAY = [];
    var OPERAND1_MAX_DIGIT_INDEX = LENGTH_OF_OPERAND1 - 1; // 计算退位减辅助数字及圆点

    for (var digitCount = 1; digitCount <= LENGTH_OF_OPERAND1; ++digitCount) {
      // const a =
      //   LENGTH_OF_OPERAND1 < digitCount
      //     ? operand1
      //     : parseInt(STRING_OPERAND1.substr(-1 * digitCount), 10);
      var b = LENGTH_OF_OPERAND2 <= digitCount ? operand2 : parseInt(STRING_OPERAND2.substr(-1 * digitCount), 10);
      var c = LENGTH_OF_RESULT <= digitCount ? parseInt(result, 10) : parseInt(STRING_RESULT.substr(-1 * digitCount), 10);
      var BORROWING = (b + c).toString().length > digitCount; // if (BORROWING) {
      //   console.log('has borrowing');
      // }

      DIGIT_INFO_ARRAY.push(BORROWING);
    }

    for (var digitIndex = 0; digitIndex <= OPERAND1_MAX_DIGIT_INDEX; ++digitIndex) {
      var _BORROWING = DIGIT_INFO_ARRAY[digitIndex]; // ${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">·

      if (_BORROWING && digitIndex !== OPERAND1_MAX_DIGIT_INDEX) {
        // 当前位有借入，则前一位需标记红点
        // TEXT_HTML_ARRAY.push(
        //   `<text class="center bottom" x="${RIGHT_X - CHAR_WIDTH * (digitIndex + 1.1)
        //   }mm" y="${Y1 - SECONDARY_NUMBER_FONT_SIZE * 1.75
        //   }mm" style="fill:${SECONDARY_NUMBER_COLOR};font-size:${SECONDARY_NUMBER_FONT_SIZE * 0.5
        //   }mm">●</text>`,
        // );
        var X = RIGHT_X - CHAR_WIDTH * 1.75 * (digitIndex + 1) + CHAR_WIDTH * 0.5;
        TEXT_HTML_ARRAY.push("<text class=\"center bottom\" x=\"".concat(X, "mm\" y=\"").concat(Y1 - SECONDARY_NUMBER_FONT_SIZE * 1.75, "mm\" style=\"fill:").concat(SECONDARY_NUMBER_COLOR, ";font-size:").concat(SECONDARY_NUMBER_FONT_SIZE * 0.5, "mm\">\u25CF</text>"));
      }

      var RIGHT_DIGIT_HAS_BORROWING = digitIndex > 0 && DIGIT_INFO_ARRAY[digitIndex - 1];
      var HAS_FLAG = _BORROWING || RIGHT_DIGIT_HAS_BORROWING;

      if (HAS_FLAG) {
        var digit = parseInt(STRING_OPERAND1.substr(OPERAND1_MAX_DIGIT_INDEX - digitIndex, 1), 10) + (_BORROWING ? 10 : 0) - (RIGHT_DIGIT_HAS_BORROWING ? 1 : 0);

        var _X = RIGHT_X - CHAR_WIDTH * 1.75 * digitIndex + CHAR_WIDTH * 0.5;

        TEXT_HTML_ARRAY.push("<text class=\"center top\" x=\"".concat(_X, "mm\" y=\"").concat(Y0 + SECONDARY_NUMBER_FONT_SIZE * 0.5, "mm\"\n                    style=\"fill:").concat(SECONDARY_NUMBER_COLOR, ";font-size:").concat(SECONDARY_NUMBER_FONT_SIZE, "mm\">").concat(digit, "</text>"));
      }
    }
  } else {
    // 计算进位加辅助数字
    for (var _digitCount = 1; _digitCount < LENGTH_OF_RESULT; ++_digitCount) {
      var a = LENGTH_OF_OPERAND1 < _digitCount ? operand1 : parseInt(STRING_OPERAND1.substr(-1 * _digitCount), 0);

      var _b = LENGTH_OF_OPERAND2 < _digitCount ? operand2 : parseInt(STRING_OPERAND2.substr(-1 * _digitCount), 0); // console.log({ a, b, digitCount, sum: a + b, sumLength: (a + b).length });


      if ((a + _b).toString().length > _digitCount) {
        // console.log('ok');
        var _X2 = RIGHT_X - CHAR_WIDTH * 1.75 * _digitCount + CHAR_WIDTH * 0.5; // TEXT_HTML_ARRAY.push(
        //   `<text class="left bottom" x="${RIGHT_X - CHAR_WIDTH * digitCount + SECONDARY_NUMBER_FONT_SIZE * 0.1
        //   }mm" y="${Y2 + SECONDARY_NUMBER_FONT_SIZE
        //   }mm" style="fill:${SECONDARY_NUMBER_COLOR};font-size:${SECONDARY_NUMBER_FONT_SIZE}mm">1</text>`,
        // );


        TEXT_HTML_ARRAY.push("<text class=\"left bottom\" x=\"".concat(_X2, "mm\" y=\"").concat(Y2 + SECONDARY_NUMBER_FONT_SIZE, "mm\" style=\"fill:").concat(SECONDARY_NUMBER_COLOR, ";font-size:").concat(SECONDARY_NUMBER_FONT_SIZE, "mm\">1</text>"));
      }
    }
  } // 仅一列时，第一个式子不写入结果


  if (!(isOnlyOneColumn && columnIndex === 0)) {
    TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(RIGHT_X, "mm\" y=\"").concat(Y3, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">\n        ").concat(getTspanCharByChar(result, CHAR_WIDTH), "</text>"));
  }

  return "".concat(TEXT_HTML_ARRAY.join('')).concat(LINE_HTML_ARRAY.join(''));
}

function getMultiplyVertialQuestionStepColumnHtml(isOnlyOneColumn, columnIndex, operand1, operand2, result, STRING_OPERAND1, STRING_OPERAND2, STRING_RESULT, LENGTH_OF_OPERAND1, LENGTH_OF_OPERAND2, LENGTH_OF_RESULT, VERTIAL_QUESTION_STEP_BOTTOM, STEP_ROW_SPACE, CONTENT_PAGE_CONTENT_FONT_SIZE, RIGHT_X, X1, X2, CHAR_WIDTH, SECONDARY_NUMBER_FONT_SIZE, SECONDARY_NUMBER_COLOR, VERTIAL_LINE_Y_MARGIN_TOP, VERTIAL_LINE_STROKE_COLOR, VERTIAL_LINE_STROKE_WIDTH, BLUE_VERTIAL_LINE_STROKE_COLOR) {
  var TEXT_HTML_ARRAY = [];
  var LINE_HTML_ARRAY = [];
  var TRIMED_RIGHT_ZERO_1 = trimRightZero(STRING_OPERAND1);
  var TRIMED_RIGHT_ZERO_LENGTH_1 = TRIMED_RIGHT_ZERO_1.length;
  var RIGHT_ZERO_COUNT_1 = LENGTH_OF_OPERAND1 - TRIMED_RIGHT_ZERO_LENGTH_1;
  var TRIMED_RIGHT_ZERO_2 = trimRightZero(STRING_OPERAND2);
  var TRIMED_RIGHT_ZERO_LENGTH_2 = TRIMED_RIGHT_ZERO_2.length;
  var RIGHT_ZERO_COUNT_2 = LENGTH_OF_OPERAND2 - TRIMED_RIGHT_ZERO_LENGTH_2;
  var MORE_THAN_3_ROWS = TRIMED_RIGHT_ZERO_LENGTH_2 > 1;
  var RESULT_ROW_COUNT = 3 + (MORE_THAN_3_ROWS ? TRIMED_RIGHT_ZERO_LENGTH_2 : 0);
  var FIXED_STEP_ROW_SPACE = STEP_ROW_SPACE * (MORE_THAN_3_ROWS ? (isOnlyOneColumn ? 4 : 5) / RESULT_ROW_COUNT : 1); // const Y3 = VERTIAL_QUESTION_STEP_BOTTOM - FIXED_STEP_ROW_SPACE * ((isOnlyOneColumn || !MORE_THAN_3_ROWS) ? 0 : (RESULT_ROW_COUNT === 4 ? 1 : (RESULT_ROW_COUNT - 3) * 0.75));
  // const Y3 = VERTIAL_QUESTION_STEP_BOTTOM - FIXED_STEP_ROW_SPACE * ((isOnlyOneColumn || !MORE_THAN_3_ROWS) ? 0 : RESULT_ROW_COUNT - 3);
  // const Y3 = VERTIAL_QUESTION_STEP_BOTTOM - FIXED_STEP_ROW_SPACE * ((isOnlyOneColumn && columnIndex === 0) ? 0 : RESULT_ROW_COUNT - 3);

  var Y3 = VERTIAL_QUESTION_STEP_BOTTOM - FIXED_STEP_ROW_SPACE * (!MORE_THAN_3_ROWS ? 0 : isOnlyOneColumn ? columnIndex === 0 ? 0 : RESULT_ROW_COUNT - 4 : RESULT_ROW_COUNT - 3);
  var Y2 = Y3 - FIXED_STEP_ROW_SPACE;
  var Y1 = Y2 - FIXED_STEP_ROW_SPACE + (isOnlyOneColumn ? CONTENT_PAGE_CONTENT_FONT_SIZE * 0.5 : 0); // const APPEND_Y = STEP_ROW_SPACE * (TRIMED_RIGHT_ZERO_LENGTH_2 > 1 ? TRIMED_RIGHT_ZERO_LENGTH_2 : 0) / 2;

  var APPEND_Y = FIXED_STEP_ROW_SPACE * (TRIMED_RIGHT_ZERO_LENGTH_2 > 1 ? TRIMED_RIGHT_ZERO_LENGTH_2 : 0);
  var Y0 = Y1 - FIXED_STEP_ROW_SPACE; // - APPEND_Y;

  var RIGHT_ZERO_COUNT_SUMMARY = RIGHT_ZERO_COUNT_1 + RIGHT_ZERO_COUNT_2;
  var IS_MOVE_BY_FIRST = isOnlyOneColumn && columnIndex === 1;

  if (RIGHT_ZERO_COUNT_SUMMARY) {
    // 下一句的0.25已验证有效（当两式合并到同一列时，乘法的竖线必定在X2左侧半字符处），目前两式合并时第二式如果是乘法则第一个数必定只有一位，所以无法验证RIGHT_ZERO_COUNT_1
    // 未两式合并到同一列时，RIGHT_ZERO_COUNT_SUMMARY已验证有效！ TODO(@anqisoft) 扩展到“两式合并到同一列后第二式是乘法，且第一个数为整十数”的情况
    // const LINE_X = X2 - CHAR_WIDTH * 2 * (IS_MOVE_BY_FIRST ? (RIGHT_ZERO_COUNT_1 ? RIGHT_ZERO_COUNT_1 : 0.25) : RIGHT_ZERO_COUNT_SUMMARY - 0.25);
    var LINE_X = X2 - CHAR_WIDTH * 2 * (IS_MOVE_BY_FIRST ? RIGHT_ZERO_COUNT_1 ? RIGHT_ZERO_COUNT_1 : 0.25 : RIGHT_ZERO_COUNT_SUMMARY);
    var LINE_Y_OFFSET = FIXED_STEP_ROW_SPACE * 0.45; // LINE_HTML_ARRAY.push(`<line
    //     x1="${LINE_X}mm"
    //     y1="${Y0 + LINE_Y_OFFSET}mm"
    //     x2="${LINE_X}mm"
    //     y2="${Y3 + LINE_Y_OFFSET}mm"
    //     stroke="${BLUE_VERTIAL_LINE_STROKE_COLOR}"
    //     stroke-width="${VERTIAL_LINE_STROKE_WIDTH}mm"
    //     stroke-dasharray="6,3,2,2,2,3"
    //   />`);

    LINE_HTML_ARRAY.push("<line\n              x1=\"".concat(LINE_X, "mm\"\n              y1=\"").concat(Y0 + LINE_Y_OFFSET, "mm\"\n              x2=\"").concat(LINE_X, "mm\"\n              y2=\"").concat(Y3 + LINE_Y_OFFSET + APPEND_Y, "mm\"\n              stroke=\"").concat(BLUE_VERTIAL_LINE_STROKE_COLOR, "\"\n              stroke-width=\"").concat(VERTIAL_LINE_STROKE_WIDTH, "mm\"\n              stroke-dasharray=\"6,3,2,2,2,3\"\n            />"));
  }

  var REMOVE_RIGHT_ZERO_COUNT = IS_MOVE_BY_FIRST && RIGHT_ZERO_COUNT_2 > RIGHT_ZERO_COUNT_1 ? RIGHT_ZERO_COUNT_2 - RIGHT_ZERO_COUNT_1 : 0;
  var HORIZONTAL_LINE_X_OFFSET = CHAR_WIDTH * 2 * REMOVE_RIGHT_ZERO_COUNT;
  var LINE_Y2 = Y2 + VERTIAL_LINE_Y_MARGIN_TOP * 0.6;
  LINE_HTML_ARRAY.push("<line\n        x1=\"".concat(X1 + HORIZONTAL_LINE_X_OFFSET, "mm\"\n        y1=\"").concat(LINE_Y2, "mm\"\n        x2=\"").concat(X2 + HORIZONTAL_LINE_X_OFFSET, "mm\"\n        y2=\"").concat(LINE_Y2, "mm\"\n        stroke=\"").concat(VERTIAL_LINE_STROKE_COLOR, "\"\n        stroke-width=\"").concat(VERTIAL_LINE_STROKE_WIDTH, "mm\"\n      />"));
  var HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR = REMOVE_RIGHT_ZERO_COUNT ? getTransparentTspanCharByChar(REMOVE_RIGHT_ZERO_COUNT, '', CHAR_WIDTH) : ''; // if (REMOVE_RIGHT_ZERO_COUNT) {
  //     console.log('HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR', HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR, REMOVE_RIGHT_ZERO_COUNT, );
  // }
  // const RIGHT_X_OF_RESULT = RIGHT_X + CHAR_WIDTH * 2 * REMOVE_RIGHT_ZERO_COUNT;

  var RIGHT_X_OF_RESULT = RIGHT_X + CHAR_WIDTH * 2 * REMOVE_RIGHT_ZERO_COUNT - (REMOVE_RIGHT_ZERO_COUNT ? CHAR_WIDTH * 0.55 : 0); // if (REMOVE_RIGHT_ZERO_COUNT) {
  //     console.log(CHAR_WIDTH, REMOVE_RIGHT_ZERO_COUNT, REMOVE_RIGHT_ZERO_COUNT ? CHAR_WIDTH * 0.25 : 0, RIGHT_X + CHAR_WIDTH * 2 * REMOVE_RIGHT_ZERO_COUNT, RIGHT_X_OF_RESULT);
  // }

  TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(RIGHT_X, "mm\" y=\"").concat(Y1, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">").concat(HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR, "".concat(getTspanCharByChar(operand1, CHAR_WIDTH))).concat(getTransparentTspanCharByChar(RIGHT_ZERO_COUNT_SUMMARY - RIGHT_ZERO_COUNT_1 - REMOVE_RIGHT_ZERO_COUNT, '', CHAR_WIDTH), "</text>"));
  TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(RIGHT_X_OF_RESULT, "mm\" y=\"").concat(Y2, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">").concat(getTransparentTspanCharByChar(Math.max(LENGTH_OF_RESULT, LENGTH_OF_OPERAND2, LENGTH_OF_OPERAND1) - LENGTH_OF_OPERAND2 + REMOVE_RIGHT_ZERO_COUNT - (!isOnlyOneColumn && columnIndex === 1 && RIGHT_ZERO_COUNT_SUMMARY > 0 ? 1 : 0), '×', CHAR_WIDTH)).concat(getTspanCharByChar(operand2, CHAR_WIDTH)).concat(getTransparentTspanCharByChar(RIGHT_ZERO_COUNT_SUMMARY - RIGHT_ZERO_COUNT_2 - REMOVE_RIGHT_ZERO_COUNT, '', CHAR_WIDTH), "</text>"));
  var MIDDLE_PRODUCT_ARRAY = [];

  if (TRIMED_RIGHT_ZERO_LENGTH_2 > 1) {
    var PRODUCT_FIX_SCALE = Math.pow(10, RIGHT_ZERO_COUNT_1);

    for (var i = 0; i < TRIMED_RIGHT_ZERO_LENGTH_2; ++i) {
      var Y = Y2 + FIXED_STEP_ROW_SPACE * (i + 1 - (i === TRIMED_RIGHT_ZERO_LENGTH_2 - 1 ? 0.15 : 0));
      var POSITION = TRIMED_RIGHT_ZERO_LENGTH_2 - i - 1;
      var CURRENT_NUMBER = parseInt(TRIMED_RIGHT_ZERO_2.substring(POSITION, POSITION + 1));
      MIDDLE_PRODUCT_ARRAY.push((operand1 * CURRENT_NUMBER * Math.pow(10, i + RIGHT_ZERO_COUNT_2)).toString()); // TEXT_HTML_ARRAY.push(
      //     `<text class="right bottom" x="${RIGHT_X}mm" y="${Y}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR}${`${getTspanCharByChar(operand1 / PRODUCT_FIX_SCALE * CURRENT_NUMBER, CHAR_WIDTH)}`}${getTransparentTspanCharByChar(RIGHT_ZERO_COUNT_SUMMARY - RIGHT_ZERO_COUNT_1 - REMOVE_RIGHT_ZERO_COUNT + i, '',CHAR_WIDTH)}</text>`
      // );

      TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(RIGHT_X, "mm\" y=\"").concat(Y, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">").concat(HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR, "".concat(getTspanCharByChar(operand1 / PRODUCT_FIX_SCALE * CURRENT_NUMBER, CHAR_WIDTH))).concat(getTransparentTspanCharByChar(RIGHT_ZERO_COUNT_SUMMARY - REMOVE_RIGHT_ZERO_COUNT + i, '', CHAR_WIDTH), "</text>"));
    }

    var LINE_Y = Y2 + FIXED_STEP_ROW_SPACE * TRIMED_RIGHT_ZERO_LENGTH_2 + VERTIAL_LINE_Y_MARGIN_TOP * 0.6;
    LINE_HTML_ARRAY.push("<line\n            x1=\"".concat(X1 + HORIZONTAL_LINE_X_OFFSET, "mm\"\n            y1=\"").concat(LINE_Y, "mm\"\n            x2=\"").concat(X2 + HORIZONTAL_LINE_X_OFFSET, "mm\"\n            y2=\"").concat(LINE_Y, "mm\"\n            stroke=\"").concat(VERTIAL_LINE_STROKE_COLOR, "\"\n            stroke-width=\"").concat(VERTIAL_LINE_STROKE_WIDTH, "mm\"\n        />"));
  } // 计算进位辅助数字，须修正乘数带0的情况
  // 九九乘法口诀表对应的不需要标记进位辅助数字


  if (TRIMED_RIGHT_ZERO_LENGTH_1 + TRIMED_RIGHT_ZERO_LENGTH_2 > 2) {
    if (TRIMED_RIGHT_ZERO_LENGTH_2 === 1) {
      var _Y = Y2 + SECONDARY_NUMBER_FONT_SIZE - 0.75;

      for (var digitCount = 1; digitCount < LENGTH_OF_RESULT; ++digitCount) {
        var a = LENGTH_OF_OPERAND1 < digitCount ? operand1 : parseInt(STRING_OPERAND1.substr(-1 * digitCount), 0);
        var b = LENGTH_OF_OPERAND2 < digitCount ? operand2 : parseInt(STRING_OPERAND2.substr(-1 * digitCount), 0); // console.log({ a, b, digitCount, sum: a + b, sumLength: (a + b).length });

        var A_MULTIPLY_B_STRING = (a * b).toString();

        if (A_MULTIPLY_B_STRING.toString().length > digitCount) {
          var X = RIGHT_X - CHAR_WIDTH * 1.75 * digitCount + CHAR_WIDTH * 0.5;
          TEXT_HTML_ARRAY.push("<text class=\"left bottom\" x=\"".concat(X, "mm\" y=\"").concat(_Y, "mm\" style=\"fill:").concat(SECONDARY_NUMBER_COLOR, ";font-size:").concat(SECONDARY_NUMBER_FONT_SIZE, "mm\">").concat(A_MULTIPLY_B_STRING.substring(0, 1), "</text>"));
        }
      }
    } else {
      var _Y2 = Y3 + APPEND_Y - FIXED_STEP_ROW_SPACE * 0.9;

      var MAX_INDEX = LENGTH_OF_RESULT - RIGHT_ZERO_COUNT_SUMMARY - 1; // console.log('MIDDLE_PRODUCT_ARRAY', MIDDLE_PRODUCT_ARRAY, 'MAX_INDEX', MAX_INDEX);

      STRING_RESULT.split('').forEach(function (_c, index) {
        if (index > MAX_INDEX) {
          return;
        }

        var MAX_LENGTH = LENGTH_OF_RESULT - index - 1;
        var sum = 0; // MIDDLE_PRODUCT_ARRAY.map(str => parseInt(str.substring(index + 1, LENGTH_OF_RESULT))).forEach(n => sum += isNaN(n) ? 0 : n);

        MIDDLE_PRODUCT_ARRAY.map(function (str) {
          return parseInt(str.substring(str.length <= MAX_LENGTH ? 0 : str.length - MAX_LENGTH, LENGTH_OF_RESULT));
        }).forEach(function (n) {
          return sum += isNaN(n) ? 0 : n;
        });
        sum = Math.floor(sum / Math.pow(10, MAX_LENGTH));

        if (sum > 0) {
          var _X3 = RIGHT_X - CHAR_WIDTH * 1.75 * MAX_LENGTH + CHAR_WIDTH * 0.5; // console.log('MIDDLE_PRODUCT_ARRAY', MIDDLE_PRODUCT_ARRAY, 'MAX_INDEX', MAX_INDEX, 'sum', sum);
          // MIDDLE_PRODUCT_ARRAY.forEach((str, index) => {
          //     // console.log(index, `${str}.substring(${index + 1}, ${LENGTH_OF_RESULT})=>`, parseInt(str.substring(index + 1, LENGTH_OF_RESULT)));
          //     console.log(index, `'${str}'.substring('${str}'.length <= ${MAX_LENGTH} ? 0 : '${str}'.length - ${MAX_LENGTH}, ${LENGTH_OF_RESULT})=>`, parseInt(str.substring(str.length <= MAX_LENGTH ? 0 : str.length - MAX_LENGTH, LENGTH_OF_RESULT)));
          // });


          TEXT_HTML_ARRAY.push("<text class=\"left bottom\" x=\"".concat(_X3, "mm\" y=\"").concat(_Y2, "mm\" style=\"fill:").concat(SECONDARY_NUMBER_COLOR, ";font-size:").concat(SECONDARY_NUMBER_FONT_SIZE, "mm\">").concat(sum, "</text>"));
        }
      });
    }
  } // 仅一列时，第一个式子不写入结果


  if (!(isOnlyOneColumn && columnIndex === 0)) {
    // TEXT_HTML_ARRAY.push(
    //     `<text class="right bottom" x="${RIGHT_X_OF_RESULT}mm" y="${Y3}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">
    //     ${HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR}${getTspanCharByChar(result, CHAR_WIDTH)}</text>`
    // );
    TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(RIGHT_X_OF_RESULT, "mm\" y=\"").concat(Y3 + APPEND_Y, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">\n            ").concat(HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR).concat(getTspanCharByChar(result, CHAR_WIDTH), "</text>"));
  }

  return TEXT_HTML_ARRAY.join('').concat(LINE_HTML_ARRAY.join(''));
}

function prepairGetVertialQuestionStepColumnHtml(operand1, operand2, result, quotient, operator, isOnlyOneColumn, ONE_COLUMN_MAX_LENGTH, CHAR_WIDTH, columnIndex, STEP_ROW_SPACE, STEP_ROW_COUNT) {
  var VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN = DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN,
      VERTIAL_QUESTION_STEP_CENTER_POSITION1 = DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION1,
      VERTIAL_QUESTION_STEP_CENTER_POSITION2 = DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION2,
      VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN = DATA.VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN,
      VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN = DATA.VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN;
  var IS_SUBTRACTION = operator === '-';
  var IS_DIVISION = operator === '/';
  var IS_MULTIPLY = operator === '*';
  var STRING_OPERAND1 = operand1.toString();
  var STRING_OPERAND2 = operand2.toString();
  var STRING_RESULT = result.toString(); // 横向依于中线进行布局（最终折算成右线），纵向依于底线进行布局——除法布局与加减乘不同

  var LENGTH_OF_OPERAND1 = STRING_OPERAND1.length;
  var LENGTH_OF_OPERAND2 = STRING_OPERAND2.length;
  var LENGTH_OF_RESULT = STRING_RESULT.length;
  var MAX_LENGTH = IS_DIVISION ? LENGTH_OF_OPERAND1 + LENGTH_OF_OPERAND2 + 3 : 1 + (isOnlyOneColumn ? ONE_COLUMN_MAX_LENGTH // : Math.max(Math.max(LENGTH_OF_OPERAND1, LENGTH_OF_OPERAND2) + 2, LENGTH_OF_RESULT));
  : Math.max(Math.max(LENGTH_OF_OPERAND1, LENGTH_OF_OPERAND2), LENGTH_OF_RESULT));
  var LINE_WIDTH = CHAR_WIDTH * 1.75 * MAX_LENGTH;
  var LINE_WIDTH_HALF = LINE_WIDTH * 0.5;
  var LINE_WIDTH_DIVISION = CHAR_WIDTH * 1.75 * (LENGTH_OF_OPERAND1 + 1.25);
  var RIGHT_X = LINE_WIDTH_HALF + (isOnlyOneColumn ? VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN : columnIndex === 0 ? VERTIAL_QUESTION_STEP_CENTER_POSITION1 - CHAR_WIDTH * 1.75 - (IS_DIVISION ? MAX_LENGTH <= 7 ? MAX_LENGTH - 3.75 : 3.25 - (MAX_LENGTH - 7) : 0) : VERTIAL_QUESTION_STEP_CENTER_POSITION2 - CHAR_WIDTH * 1.75 - (IS_DIVISION ? MAX_LENGTH > 6 ? MAX_LENGTH - 3.75 : 0 : 0)); // const VERTIAL_QUESTION_STEP_BOTTOM = isOnlyOneColumn ?
  //     VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN - (columnIndex === 0 ? STEP_ROW_SPACE * 2 : 0) :
  //     VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN;

  var QUOTIENT_TRIM_RIGHT_ZERO_LENGTH = IS_DIVISION ? trimRightZero(quotient).length : 0;
  var FIX_ROW_COUNT_BY_DIVISION = IS_DIVISION && QUOTIENT_TRIM_RIGHT_ZERO_LENGTH > 1 ? 1 + (QUOTIENT_TRIM_RIGHT_ZERO_LENGTH === 2 ? 0 : QUOTIENT_TRIM_RIGHT_ZERO_LENGTH === 3 ? -0.5 : 0.75 * (3 - QUOTIENT_TRIM_RIGHT_ZERO_LENGTH)) : 0; // const VERTIAL_QUESTION_STEP_BOTTOM = isOnlyOneColumn ?
  //     VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN - STEP_ROW_SPACE * (columnIndex === 0 ? STEP_ROW_COUNT - 2 : STEP_ROW_COUNT - 4) :
  //     VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN - STEP_ROW_SPACE * (STEP_ROW_COUNT - 3 - FIX_ROW_COUNT_BY_DIVISION);
  // if (IS_DIVISION && QUOTIENT_TRIM_RIGHT_ZERO_LENGTH >= 3) {
  //     console.log(`${operand1} / ${operand2} = ${result}`);
  // }
  // if (IS_DIVISION && QUOTIENT_TRIM_RIGHT_ZERO_LENGTH >= 4) {
  //     console.log(`${operand1} / ${operand2} = ${result}`);
  // }

  var VERTIAL_QUESTION_STEP_BOTTOM = isOnlyOneColumn ? VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN - STEP_ROW_SPACE * (columnIndex === 0 ? STEP_ROW_COUNT - 2 : STEP_ROW_COUNT - 4) : VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN - STEP_ROW_SPACE * (STEP_ROW_COUNT - 3 - FIX_ROW_COUNT_BY_DIVISION);
  var X2 = RIGHT_X + CHAR_WIDTH * 2;
  var X1 = X2 - (IS_DIVISION ? LINE_WIDTH_DIVISION : LINE_WIDTH);
  return {
    IS_SUBTRACTION: IS_SUBTRACTION,
    IS_DIVISION: IS_DIVISION,
    IS_MULTIPLY: IS_MULTIPLY,
    VERTIAL_QUESTION_STEP_BOTTOM: VERTIAL_QUESTION_STEP_BOTTOM,
    RIGHT_X: RIGHT_X,
    // LINE_WIDTH_DIVISION,
    // LINE_WIDTH,
    LENGTH_OF_RESULT: LENGTH_OF_RESULT,
    LENGTH_OF_OPERAND2: LENGTH_OF_OPERAND2,
    LENGTH_OF_OPERAND1: LENGTH_OF_OPERAND1,
    STRING_OPERAND1: STRING_OPERAND1,
    STRING_OPERAND2: STRING_OPERAND2,
    STRING_RESULT: STRING_RESULT,
    X1: X1,
    X2: X2
  };
}

function getDivisionVertialQuestionStepColumnHtml(STEP_ROW_SPACE, quotient, operand1, VERTIAL_QUESTION_STEP_BOTTOM, VERTIAL_LINE_Y_MARGIN_TOP, RIGHT_X, CHAR_WIDTH, TEXT_HTML_ARRAY, CONTENT_PAGE_CONTENT_FONT_SIZE, operand2, remainder, X1, X2, VERTIAL_LINE_STROKE_COLOR, VERTIAL_LINE_STROKE_WIDTH, MM_TO_PX_SCALE, DIVISION_PATH_HTML) {
  var QUOTIENT_STRING = quotient.toString();
  var OPERAND1_STRING = operand1.toString();
  var QUOTIENT_LENGTH = QUOTIENT_STRING.length;
  var QUOTIENT_TRIMED_RIGHT_ZERO = trimRightZero(QUOTIENT_STRING);
  var QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH = QUOTIENT_TRIMED_RIGHT_ZERO.length;
  var QUOTIENT_RIGHT_ZERO_COUNT = QUOTIENT_LENGTH - QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH;
  var STEP_ROW_SPACE_SMALL = STEP_ROW_SPACE * (QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH === 1 ? 1 : 6.2 / (2 * (QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH + 1)));
  var Y3 = VERTIAL_QUESTION_STEP_BOTTOM - (QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH === 1 ? 0 : STEP_ROW_SPACE_SMALL * QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH);
  var Y2 = Y3 - STEP_ROW_SPACE_SMALL;
  var Y1 = Y2 - STEP_ROW_SPACE_SMALL;
  var Y0 = Y1 - STEP_ROW_SPACE_SMALL;
  var LINE_Y2 = Y2 + VERTIAL_LINE_Y_MARGIN_TOP * 0.6;
  var LINE_Y0 = Y0 + VERTIAL_LINE_Y_MARGIN_TOP * 0.6;
  var LINE_HTML_ARRAY = [];
  var X = RIGHT_X - CHAR_WIDTH * 0.75;
  TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(X, "mm\" y=\"").concat(Y0, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">").concat(getTspanCharByChar(quotient, CHAR_WIDTH), "</text>"));
  TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(X, "mm\" y=\"").concat(Y1, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">", "".concat(getTspanCharByChar(operand2.toString().concat('　'.repeat(1), operand1), CHAR_WIDTH)), "</text>"));

  if (QUOTIENT_LENGTH === 1) {
    TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(X, "mm\" y=\"").concat(Y2, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">").concat(getTspanCharByChar(operand2 * quotient, CHAR_WIDTH), "</text>"));
    TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(X, "mm\" y=\"").concat(Y3, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">\n        ").concat(getTspanCharByChar(remainder, CHAR_WIDTH), "</text>"));
  } else {
    var oldQuotient = 0;
    var FIXED_OPERAND1_STRING = (operand1 / Math.pow(10, QUOTIENT_RIGHT_ZERO_COUNT)).toString();
    var FIXED_OPERAND1_LENGTH = OPERAND1_STRING.length;
    QUOTIENT_TRIMED_RIGHT_ZERO.split('').forEach(function (c, index) {
      var CURRENT_QUOTIENT = parseInt(c);
      var DIGIT = QUOTIENT_RIGHT_ZERO_COUNT + (QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH - index);
      var Y_OFFSET = STEP_ROW_SPACE_SMALL * (index + 1) * 2;
      var LINE_Y = LINE_Y0 + Y_OFFSET;
      var Y = Y0 + Y_OFFSET;
      TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(X, "mm\" y=\"").concat(Y, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">\n                ").concat(getTransparentTspanCharByChar(DIGIT - 1, operand2 * CURRENT_QUOTIENT, CHAR_WIDTH), "</text>"));
      var used = FIXED_OPERAND1_STRING.substring(0, FIXED_OPERAND1_LENGTH - DIGIT + 1);
      var next = FIXED_OPERAND1_STRING.substring(FIXED_OPERAND1_LENGTH - DIGIT + 1, FIXED_OPERAND1_LENGTH - DIGIT + 2);

      if (next.length) {
        var REMAINING = parseInt(used) - operand2 * (oldQuotient * 10 + CURRENT_QUOTIENT);
        TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(X, "mm\" y=\"").concat(Y + STEP_ROW_SPACE_SMALL, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">\n                    ").concat(getTransparentTspanCharByChar(DIGIT - 2, REMAINING * 10 + parseInt(next), CHAR_WIDTH), "</text>")); // } else if (!next.length) {
      } else {
        var _REMAINING = parseInt(used) - operand2 * (oldQuotient * 10 + CURRENT_QUOTIENT);

        TEXT_HTML_ARRAY.push("<text class=\"right bottom\" x=\"".concat(X, "mm\" y=\"").concat(Y + STEP_ROW_SPACE_SMALL, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\">\n                    ").concat(getTransparentTspanCharByChar(DIGIT - 1, _REMAINING, CHAR_WIDTH), "</text>"));
      }

      LINE_HTML_ARRAY.push("<line\n          x1=\"".concat(X1, "mm\"\n          y1=\"").concat(LINE_Y, "mm\"\n          x2=\"").concat(X2, "mm\"\n          y2=\"").concat(LINE_Y, "mm\"\n          stroke=\"").concat(VERTIAL_LINE_STROKE_COLOR, "\"\n          stroke-width=\"").concat(VERTIAL_LINE_STROKE_WIDTH, "mm\"\n        />"));
      oldQuotient *= 10;
      oldQuotient += CURRENT_QUOTIENT;
    });
  }

  var RESULT = TEXT_HTML_ARRAY.join('').concat("<line\n        x1=\"".concat(X1, "mm\"\n        y1=\"").concat(LINE_Y2, "mm\"\n        x2=\"").concat(X2, "mm\"\n        y2=\"").concat(LINE_Y2, "mm\"\n        stroke=\"").concat(VERTIAL_LINE_STROKE_COLOR, "\"\n        stroke-width=\"").concat(VERTIAL_LINE_STROKE_WIDTH, "mm\"\n      />"), "<line\n            x1=\"".concat(X1, "mm\"\n            y1=\"").concat(LINE_Y0, "mm\"\n            x2=\"").concat(X2, "mm\"\n            y2=\"").concat(LINE_Y0, "mm\"\n            stroke=\"").concat(VERTIAL_LINE_STROKE_COLOR, "\"\n            stroke-width=\"").concat(VERTIAL_LINE_STROKE_WIDTH, "mm\"\n          /><path fill=\"none\" stroke=\"#000000\" d=\"M ").concat(MM_TO_PX_SCALE * X1 //  - MM_TO_PX_SCALE * DATA.CHAR_WIDTH
  , ", ").concat(MM_TO_PX_SCALE * LINE_Y0, " ").concat(DIVISION_PATH_HTML, "\" />"), LINE_HTML_ARRAY.join(''));
  return RESULT;
}

function getMmToPxScale() {
  // https://blog.csdn.net/baidu_25343343/article/details/84950269
  var screen = window.screen; // (window.screen as unknown as { deviceXDPI?: number; deviceYDPI: number });

  var dpiArray = []; // : Array<number>

  if (screen.deviceXDPI) {
    dpiArray.push(screen.deviceXDPI);
    dpiArray.push(screen.deviceYDPI);
  } else {
    var div = document.createElement('div');
    div.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
    document.body.appendChild(div);
    dpiArray.push(parseInt(div.offsetWidth.toString()));
    dpiArray.push(parseInt(div.offsetHeight.toString()));
    document.body.removeChild(div);
  }

  var dpiX = dpiArray[0];
  var mmToPxScale = dpiX / 25.4;
  return mmToPxScale;
}

function getOffTheShelfQuestionStepHtml(lineCountMethod, a, b, c, secondRowFormula, result) {
  // let lineRightEndCharCount = 3;
  // let lineCharCount = 3 + b.toString().length;
  // let thirdCharCount = 0;
  // switch (lineCountMethod) {
  //   case LineCountMethodType.LeftToRight:
  //   case LineCountMethodType.LeftToRightByBrackets:
  //     lineRightEndCharCount += c.toString().length + 3;
  //     break;
  //   default:
  //     break;
  // }
  // switch (lineCountMethod) {
  //   case LineCountMethodType.LeftToRight:
  //   case LineCountMethodType.LeftToRightByBrackets:
  //     lineCharCount += a.toString().length;
  //     thirdCharCount = c.toString().length;
  //     break;
  //   case LineCountMethodType.RightToLeft:
  //   case LineCountMethodType.RightToLeftByBrackets:
  //     lineCharCount += c.toString().length;
  //     thirdCharCount = a.toString().length;
  //     break;
  //   default:
  //     break;
  // }
  // switch (lineCountMethod) {
  //   case LineCountMethodType.LeftToRightByBrackets:
  //   case LineCountMethodType.RightToLeftByBrackets:
  //     lineCharCount += 1;
  //     break;
  //   default:
  //     break;
  // }
  // let lineStartCharCount = 0;
  // switch (lineCountMethod) {
  //   case LineCountMethodType.RightToLeft:
  //   case LineCountMethodType.RightToLeftByBrackets:
  //     lineStartCharCount += a.toString().length + 2.5;
  //     break;
  //   default:
  //     break;
  // }
  // const FULL_CHAR_COUNT = lineCharCount + thirdCharCount + 3 + 3 + 1;
  var SECOND_ROW_CONTENT = getMathFormula(secondRowFormula);
  var QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH = DATA.QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH,
      CONTENT_PAGE_CONTENT_FONT_SIZE = DATA.CONTENT_PAGE_CONTENT_FONT_SIZE,
      OFF_THE_SHELF_LINE_Y = DATA.OFF_THE_SHELF_LINE_Y,
      OFF_THE_SHELF_SECOND_ROW_Y = DATA.OFF_THE_SHELF_SECOND_ROW_Y,
      OFF_THE_SHELF_THIRD_ROW_Y = DATA.OFF_THE_SHELF_THIRD_ROW_Y,
      OFF_THE_SHELF_LINE_STROKE_COLOR = DATA.OFF_THE_SHELF_LINE_STROKE_COLOR,
      OFF_THE_SHELF_LINE_STROKE_WIDTH = DATA.OFF_THE_SHELF_LINE_STROKE_WIDTH,
      CONTENT_PAGE_CONTENT_CHAR_WIDTH = DATA.CONTENT_PAGE_CONTENT_CHAR_WIDTH,
      OFF_THE_SHELF_QUESTION_X = DATA.OFF_THE_SHELF_QUESTION_X,
      CHAR_WIDTH = DATA.CHAR_WIDTH; // // const CHAR_WIDTH = CONTENT_PAGE_CONTENT_FONT_SIZE * 0.7;
  // const LINE_LENGTH = CHAR_WIDTH * lineCharCount;
  // // const X1 = OFF_THE_SHELF_QUESTION_X + CHAR_WIDTH * (lineStartCharCount - 0.25);
  // const X1 = OFF_THE_SHELF_QUESTION_X + CHAR_WIDTH * (lineStartCharCount - 2);
  // const X2 = X1 + LINE_LENGTH;
  // // const X2 = QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH - CHAR_WIDTH * lineRightEndCharCount;
  // const X2 = CHAR_WIDTH * (FULL_CHAR_COUNT - lineRightEndCharCount);
  // const X1 = X2 - CONTENT_PAGE_CONTENT_FONT_SIZE * 0.6 * lineCharCount;
  // const LINE_HTML = `
  //           <line
  //             x1="${X1}mm"
  //             y1="${OFF_THE_SHELF_LINE_Y}mm"
  //             x2="${X2}mm"
  //             y2="${OFF_THE_SHELF_LINE_Y}mm"
  //             stroke="${OFF_THE_SHELF_LINE_STROKE_COLOR}"
  //             stroke-width="${OFF_THE_SHELF_LINE_STROKE_WIDTH}mm"
  //           />`;

  var OFF_THE_SHELF_SECOND_ROW_HTML = "<text\n              class=\"left middle\"\n              x=\"".concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\"\n              y=\"").concat(OFF_THE_SHELF_SECOND_ROW_Y, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm;\"\n            > = ").concat(SECOND_ROW_CONTENT, "</text>");
  var OFF_THE_SHELF_THIRD_ROW_HTML = "<text\n              class=\"left middle\"\n              x=\"".concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm\"\n              y=\"").concat(OFF_THE_SHELF_THIRD_ROW_Y, "mm\" style=\"font-size:").concat(CONTENT_PAGE_CONTENT_FONT_SIZE, "mm;\"\n            > = ").concat(result, "</text>"); // return `${LINE_HTML}${OFF_THE_SHELF_SECOND_ROW_HTML}${OFF_THE_SHELF_THIRD_ROW_HTML}`;

  return "".concat(OFF_THE_SHELF_SECOND_ROW_HTML).concat(OFF_THE_SHELF_THIRD_ROW_HTML);
}

function getMathFormula(computerFormula) {
  return computerFormula.replace(/\*/g, ' × ').replace(/\//g, ' ÷ ').replace(/\+/g, ' ＋ ').replace(/\-/g, ' － ');
}

function getOffTheShelfMathFormula(computerFormula, a, c, lineCountMethod) {
  var FORMULA = computerFormula.replace(/\*/g, ' × ').replace(/\//g, ' ÷ ').replace(/\+/g, ' ＋ ').replace(/\-/g, ' － ');
  var LEFT_BRACKET_POSITION = FORMULA.indexOf('(');
  var RIGHT_BRACKET_POSITION = FORMULA.indexOf(')');

  if (LEFT_BRACKET_POSITION === 0) {
    return "<tspan style=\"text-decoration:underline;\">".concat(FORMULA.substring(0, RIGHT_BRACKET_POSITION + 1), "</tspan><tspan>").concat(FORMULA.substring(RIGHT_BRACKET_POSITION + 1), "</tspan>");
  } else if (LEFT_BRACKET_POSITION > -1) {
    return "<tspan>".concat(FORMULA.substring(0, LEFT_BRACKET_POSITION), "</tspan><tspan style=\"text-decoration:underline;\">").concat(FORMULA.substring(LEFT_BRACKET_POSITION), "</tspan>");
  }

  var FORMULA_LENGTH = FORMULA.length;
  var seperatorPosition = 0;

  switch (lineCountMethod) {
    case LineCountMethodType.LeftToRight:
      // case LineCountMethodType.LeftToRightByBrackets:
      seperatorPosition = FORMULA_LENGTH - c.toString().length - 4;
      return "<tspan style=\"text-decoration:underline;\">".concat(FORMULA.substring(0, seperatorPosition + 1), "</tspan><tspan>").concat(FORMULA.substring(seperatorPosition + 1), "</tspan>");

    case LineCountMethodType.RightToLeft:
      // case LineCountMethodType.RightToLeftByBrackets:
      seperatorPosition = a.toString().length + 3;
      return "<tspan>".concat(FORMULA.substring(0, seperatorPosition), "</tspan><tspan style=\"text-decoration:underline;\">").concat(FORMULA.substring(seperatorPosition), "</tspan>");

    default:
      return FORMULA;
  }
} // console.log(getOffTheShelfMathFormula('(10+5)*5', 10, 5, LineCountMethodType.LeftToRight));
// console.log(getOffTheShelfMathFormula('10*(5+5)', 10, 5, LineCountMethodType.RightToLeft));
// console.log(getOffTheShelfMathFormula('10+5+5', 10, 5, LineCountMethodType.LeftToRight));
// console.log(getOffTheShelfMathFormula('10+5-5', 10, 5, LineCountMethodType.LeftToRight));
// console.log(getOffTheShelfMathFormula('10+5*5', 10, 5, LineCountMethodType.RightToLeft));
// console.log(getOffTheShelfMathFormula('10+5/5', 10, 5, LineCountMethodType.RightToLeft));
// console.log(getOffTheShelfMathFormula('10-5+5', 10, 5, LineCountMethodType.LeftToRight));
// console.log(getOffTheShelfMathFormula('10-5-5', 10, 5, LineCountMethodType.LeftToRight));
// console.log(getOffTheShelfMathFormula('10-5*5', 10, 5, LineCountMethodType.RightToLeft));
// console.log(getOffTheShelfMathFormula('10-5/5', 10, 5, LineCountMethodType.RightToLeft));
// console.log(getOffTheShelfMathFormula('10*5+5', 10, 5, LineCountMethodType.LeftToRight));
// console.log(getOffTheShelfMathFormula('10*5-5', 10, 5, LineCountMethodType.LeftToRight));
// console.log(getOffTheShelfMathFormula('10*5*5', 10, 5, LineCountMethodType.LeftToRight));
// console.log(getOffTheShelfMathFormula('10*5/5', 10, 5, LineCountMethodType.LeftToRight));
// console.log(getOffTheShelfMathFormula('10/5+5', 10, 5, LineCountMethodType.LeftToRight));
// console.log(getOffTheShelfMathFormula('10/5-5', 10, 5, LineCountMethodType.LeftToRight));
// console.log(getOffTheShelfMathFormula('10/5*5', 10, 5, LineCountMethodType.LeftToRight));
// console.log(getOffTheShelfMathFormula('10/5/5', 10, 5, LineCountMethodType.LeftToRight));


function getContentPageContentTextByChars(content) {
  var CONTENT_PAGE_CONTENT_CHAR_WIDTH = DATA.CONTENT_PAGE_CONTENT_CHAR_WIDTH; // return content
  //   .split('')
  //   .map(
  //     (char, char_index) =>
  //       `<tspan x="${
  //         char_index ? `${CONTENT_PAGE_CONTENT_CHAR_WIDTH * char_index}mm` : 0
  //       }">${char}</tspan>`,
  //   )
  //   .join('');
  // return content
  //   .split('')
  //   .map(
  //     (char, char_index) =>
  //       `<tspan dx="${
  //         char_index ? `${CONTENT_PAGE_CONTENT_CHAR_WIDTH}mm` : 0
  //       }">${char}</tspan>`,
  //   )
  //   .join('');

  return content.split('').map(function (_char2, char_index) {
    return "<tspan>".concat(_char2, "</tspan>");
  }).join(''); // return content
  //   .split('')
  //   .map(
  //     (char, char_index) =>
  //       `<tspan dx="${char_index ? `${CONTENT_PAGE_CONTENT_CHAR_WIDTH}mm` : 0}">${
  //         char === ' ' ? 'nbsp;' : char
  //       }</tspan>`,
  //   )
  //   .join('');
  // return content
  //   .split('')
  //   .map(
  //     (char, char_index) =>
  //       `<tspan dx="${
  //         char_index ? `${CONTENT_PAGE_CONTENT_CHAR_WIDTH}mm` : 0
  //       }" textLength="${CONTENT_PAGE_CONTENT_CHAR_WIDTH}mm">${char}</tspan>`,
  //   )
  //   .join('');
  // // 首末空格（只考虑第一个和最后一个）替换成全角空格
  // const MAX_INDEX = content.length - 1;
  // return content
  //   .split('')
  //   .map(
  //     (char, char_index) =>
  //       `<tspan dx="${
  //         char_index ? `${CONTENT_PAGE_CONTENT_CHAR_WIDTH}mm` : 0
  //       }" textLength="${CONTENT_PAGE_CONTENT_CHAR_WIDTH}mm">${
  //         char === ' ' && (char_index === 0 || char_index === MAX_INDEX) ? '　' : char
  //       }</tspan>`,
  //   )
  //   .join('');
}

function getMaxAndRandSeed(questionKind) {
  var MAX_VALUE = questionKind === QuestionCategoryType.Oral ? DATA.ORAL_MAX : questionKind === QuestionCategoryType.Vertical ? DATA.VERTICAL_MAX : DATA.OFF_THE_SHELF_MAX;
  var RANDOM_SEED_OF_SUBTRAHEND = MAX_VALUE + 1 - MIN_OF_SUBTRAHEND;
  return {
    MAX_VALUE: MAX_VALUE,
    RANDOM_SEED_OF_SUBTRAHEND: RANDOM_SEED_OF_SUBTRAHEND
  };
} // 加减乘除: addition, subtraction, multiplication and division
// 加数, 加法之和: addend, sum,
// 被减数, 减数, 差: minuend, subtrahend, difference,
// 乘数, 积: multiplier, product
// 被除数, 除数, 商, 余数: dividend, divisor, quotient, remainder
// 获取结果限定于1-9的加法（各加数范围0-9）


function getAdditionTupleByResultLimited9() {
  var addend1 = Math.floor(Math.random() * 10);
  var addend2 = addend1 === 9 ? 0 : Math.ceil(Math.random() * (9 - addend1));
  var sum = addend1 + addend2;
  return {
    addend1: addend1,
    addend2: addend2,
    sum: sum
  };
} // 获取结果限定于1-9的减法（被减数、减数范围0-MAX）


function getSubtractionTupleByResultLimited9(questionKind, min) {
  min = min || 1;

  var _getMaxAndRandSeed = getMaxAndRandSeed(questionKind),
      MAX_VALUE = _getMaxAndRandSeed.MAX_VALUE,
      RANDOM_SEED_OF_SUBTRAHEND = _getMaxAndRandSeed.RANDOM_SEED_OF_SUBTRAHEND;

  var subtrahend = MIN_OF_SUBTRAHEND + Math.floor(Math.random() * RANDOM_SEED_OF_SUBTRAHEND);
  var difference = Math.min(MAX_VALUE - subtrahend, min + Math.floor(Math.random() * (9 - min)));
  var minuend = subtrahend + difference;
  return {
    minuend: minuend,
    subtrahend: subtrahend,
    difference: difference
  };
} // 获取结果限定于1-9的乘法


function getMultiplicationTupleByResultLimited9() {
  var tuple = A_TIMES_B_VALUE_ARRAY[Math.floor(Math.random() * A_TIMES_B_VALUE_COUNT)];
  var multiplier1 = tuple.One; // Math.ceil(Math.random() * 9);

  var multiplier2 = tuple.Two;
  var product = tuple.Value;
  return {
    multiplier1: multiplier1,
    multiplier2: multiplier2,
    product: product
  };
}

function getMultiplicationTupleByResultLimited9Advance() {
  var multiplier1 = Math.ceil(Math.random() * 100) * Math.pow(10, Math.floor(Math.random() * 2));
  var multiplier2 = Math.ceil(Math.random() * 9);
  var product = multiplier1 * multiplier2; // console.log({ multiplier1, multiplier2, product });

  return {
    multiplier1: multiplier1,
    multiplier2: multiplier2,
    product: product
  };
} // 获取结果限定于1-9的无余数除法（限定于九九乘法口诀表表内除法）


function getDivisionTupleWithoutRemainderByResultLimited9() {
  // dividend, divisor, quotient, remainder
  var divisor = Math.ceil(Math.random() * 9);
  var quotient = Math.ceil(Math.random() * 9);
  var dividend = divisor * quotient;
  return {
    dividend: dividend,
    divisor: divisor,
    quotient: quotient
  };
} // 获取结果限定于1-9的无余数除法（限定于九九乘法口诀表表内除法）升级版


function getDivisionTupleWithoutRemainderByResultLimited9Advance() {
  // dividend, divisor, quotient, remainder
  var divisor = Math.ceil(Math.random() * 9); // * Math.pow(10, Math.floor(Math.random() * 2));

  var quotient = Math.ceil(Math.random() * 9) * Math.pow(10, Math.floor(Math.random() * 2));
  var dividend = divisor * quotient;
  return {
    dividend: dividend,
    divisor: divisor,
    quotient: quotient
  };
} // 获取结果限定于1-9的可能有余数的除法（限定于九九乘法口诀表表内除法）


function getDivisionTupleMayContainRemainderByResultLimited9() {
  // dividend, divisor, quotient, remainder
  var divisor = Math.ceil(Math.random() * 9);
  var quotient = Math.ceil(Math.random() * 9);
  var remainder = Math.floor(Math.random() * divisor);
  var dividend = divisor * quotient + remainder;
  return {
    dividend: dividend,
    divisor: divisor,
    quotient: quotient,
    remainder: remainder
  };
} // 获取结果限定于1-9的可能有余数的除法（限定于九九乘法口诀表表内除法）升级版


function getDivisionTupleMayContainRemainderByResultLimited9Advance() {
  // dividend, divisor, quotient, remainder
  var divisor = Math.ceil(Math.random() * 9);
  var quotient = Math.ceil(Math.random() * 9) * Math.pow(10, Math.floor(Math.random() * 2));
  var remainder = Math.floor(Math.random() * divisor);
  var dividend = divisor * quotient + remainder;
  return {
    dividend: dividend,
    divisor: divisor,
    quotient: quotient,
    remainder: remainder
  };
} // 获取结果限定于1-MAX的加法（各加数范围0-MAX）


function getAdditionTupleByResultLimited(questionKind) {
  var _getMaxAndRandSeed2 = getMaxAndRandSeed(questionKind),
      MAX_VALUE = _getMaxAndRandSeed2.MAX_VALUE;

  var addend1 = Math.floor(Math.random() * MAX_VALUE);
  var addend2 = addend1 === MAX_VALUE ? 0 : Math.ceil(Math.random() * (MAX_VALUE - addend1));
  var sum = addend1 + addend2;
  return {
    addend1: addend1,
    addend2: addend2,
    sum: sum
  };
} // 获取结果限定于1-MAX的减法（被减数、减数范围0-MAX）


function getSubtractionTupleByResultLimited(questionKind) {
  var _getMaxAndRandSeed3 = getMaxAndRandSeed(questionKind),
      MAX_VALUE = _getMaxAndRandSeed3.MAX_VALUE,
      RANDOM_SEED_OF_SUBTRAHEND = _getMaxAndRandSeed3.RANDOM_SEED_OF_SUBTRAHEND;

  var subtrahend = MIN_OF_SUBTRAHEND + Math.floor(Math.random() * RANDOM_SEED_OF_SUBTRAHEND);
  var difference = subtrahend === MAX_VALUE ? 0 : Math.ceil(Math.random() * (MAX_VALUE - subtrahend));
  var minuend = subtrahend + difference;
  return {
    minuend: minuend,
    subtrahend: subtrahend,
    difference: difference
  };
} // 获取乘数限定于1-9的乘法


function getMultiplicationTupleByMultiplierLimited9() {
  var multiplier1 = Math.ceil(Math.random() * 9);
  var multiplier2 = Math.ceil(Math.random() * 9);
  var product = multiplier1 * multiplier2;
  return {
    multiplier1: multiplier1,
    multiplier2: multiplier2,
    product: product
  };
} // 获取乘数限定于1-9的整十、整百、整千倍的乘法


function getMultiplicationTupleByMultiplierLimited9Advance() {
  var POWER1 = Math.pow(10, Math.floor(Math.random() * 2));
  var multiplier1 = Math.ceil(Math.random() * 9) * POWER1;
  var multiplier2 = Math.ceil(Math.random() * 9) * (10 * Math.pow(10, Math.floor(Math.random() * 2)) / POWER1);
  var product = multiplier1 * multiplier2;
  return {
    multiplier1: multiplier1,
    multiplier2: multiplier2,
    product: product
  };
} // 获取第一个乘数限定于1-9的整十、整百、整千倍的乘法，第二个乘数限定于1-9的乘法


function getMultiplicationTupleByMultiplierLimited9Advance2() {
  var POWER1 = Math.pow(10, Math.floor(Math.random() * 2));
  var multiplier1 = Math.ceil(Math.random() * 9) * 10 * POWER1;
  var multiplier2 = Math.ceil(Math.random() * 9); // * (10 * Math.pow(10, Math.floor(Math.random() * 2)) / POWER1);

  var product = multiplier1 * multiplier2;
  return {
    multiplier1: multiplier1,
    multiplier2: multiplier2,
    product: product
  };
} // 获取已知一个乘数的乘数限定于1-9的乘法


function getMultiplicationTupleWithMultiplieByMultiplierLimited9(multiplier1) {
  var multiplier = Math.ceil(Math.random() * 9);
  var product = multiplier1 * multiplier;
  return {
    multiplier: multiplier,
    product: product
  };
}

function getMultiplicationTupleWithMultiplieByMultiplierLimited9Advance(multiplier1) {
  // const multiplier = Math.ceil(Math.random() * 9);
  var multiplier = Math.ceil(Math.random() * 100) * Math.pow(10, Math.floor(Math.random() * 2));
  var product = multiplier1 * multiplier;
  return {
    multiplier: multiplier,
    product: product
  };
} // 获取已知其中一个加数的结果限定于1-MAX的第二步加法（各加数范围0-MAX）


function getAdditionTupleWithAddendByResultLimited(questionKind, addend1) {
  var _getMaxAndRandSeed4 = getMaxAndRandSeed(questionKind),
      MAX_VALUE = _getMaxAndRandSeed4.MAX_VALUE;

  var addend = addend1 === MAX_VALUE ? 0 : Math.ceil(Math.random() * (MAX_VALUE - addend1)); // let MAX = MAX_VALUE;
  // while (MAX < addend1) {
  //     MAX *= 10;
  // }
  // const addend = addend1 === MAX ? 0 : Math.ceil(Math.random() * (MAX - addend1));

  var result = addend1 + addend;
  return {
    addend: addend,
    result: result
  };
} // 获取已知减数的结果限定于1-MAX的第二步减法（被减数、减数范围0-MAX）


function getSubtractionTupleWithSubtrahendByResultLimited(questionKind, subtrahend) {
  var _getMaxAndRandSeed5 = getMaxAndRandSeed(questionKind),
      MAX_VALUE = _getMaxAndRandSeed5.MAX_VALUE;

  var result = subtrahend === MAX_VALUE ? 0 : Math.ceil(Math.random() * (MAX_VALUE - subtrahend));
  var minuend = subtrahend + result;
  return {
    minuend: minuend,
    result: result
  };
} // 获取已知被减数的结果限定于1-MAX的第二步减法（被减数、减数范围0-MAX）


function getSubtractionTupleWithMinuendByResultLimited(questionKind, minuend) {
  // const { MAX_VALUE, RANDOM_SEED_OF_SUBTRAHEND } = getMaxAndRandSeed(questionKind);
  var subtrahend = Math.ceil(Math.random() * minuend);
  var result = minuend - subtrahend;
  return {
    subtrahend: subtrahend,
    result: result
  };
} // 根据被除数与除数，获取可能有余数的除法的商与余数


function getDivisionTupleMayContainRemainder(dividend, divisor) {
  var quotient = Math.floor(dividend / divisor);
  var remainder = dividend % divisor;
  return {
    quotient: quotient,
    remainder: remainder
  };
} // 获取结果限定于1-9的可能有余数的除法的被除数、商与余数（限定于九九乘法口诀表表内除法）


function getDivisionTupleMayContainRemainderWithDivisorByResultLimited9(divisor) {
  var quotient = Math.ceil(Math.random() * 9);
  var remainder = Math.floor(Math.random() * divisor);
  var dividend = divisor * quotient + remainder;
  return {
    dividend: dividend,
    quotient: quotient,
    remainder: remainder
  };
} // 获取结果限定于1-9的可能有余数的除法的被除数、商与余数（限定于九九乘法口诀表表内除法）升级版


function getDivisionTupleMayContainRemainderWithDivisorByResultLimited9Advance(divisor) {
  var quotient = Math.ceil(Math.random() * 9);
  var remainder = Math.floor(Math.random() * divisor);
  var dividend = divisor * quotient + remainder;
  return {
    dividend: dividend,
    quotient: quotient,
    remainder: remainder
  };
}

function fillOralQuestions() {
  var COUNT_ORAL_QUESTION_COUNT_PER_PAGE = DATA.COUNT_ORAL_QUESTION_COUNT_PER_PAGE,
      ORAL_QUESTION_ARRAY = DATA.ORAL_QUESTION_ARRAY,
      DAY_COUNT = DATA.DAY_COUNT,
      QUESTION_TYPE_COUNT = DATA.QUESTION_TYPE_COUNT;
  var COUNT = COUNT_ORAL_QUESTION_COUNT_PER_PAGE * DAY_COUNT;

  for (var i = 0; i < COUNT; ++i) {
    ORAL_QUESTION_ARRAY.push(getQuestionByKind(i % QUESTION_TYPE_COUNT, 0));
  }
}

function fillVerticalQuestions() {
  var COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE = DATA.COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE,
      VERTICAL_QUESTION_ARRAY = DATA.VERTICAL_QUESTION_ARRAY,
      DAY_COUNT = DATA.DAY_COUNT,
      QUESTION_TYPE_COUNT = DATA.QUESTION_TYPE_COUNT;
  var COUNT = COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE * DAY_COUNT;

  for (var i = 0; i < COUNT; ++i) {
    VERTICAL_QUESTION_ARRAY.push(getQuestionByKind(i % QUESTION_TYPE_COUNT, 1));
  }
}

function fillOffTheShelfQuestions() {
  var COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE = DATA.COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE,
      OFF_THE_SHELF_QUESTION_ARRAY = DATA.OFF_THE_SHELF_QUESTION_ARRAY,
      DAY_COUNT = DATA.DAY_COUNT,
      OFF_THE_SHELF_QUESTION_TYPE_ARRAY = DATA.OFF_THE_SHELF_QUESTION_TYPE_ARRAY,
      OFF_THE_SHELF_QUESTION_TYPE_COUNT = DATA.OFF_THE_SHELF_QUESTION_TYPE_COUNT;
  var COUNT = COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE * DAY_COUNT;

  for (var i = 0; i < COUNT; ++i) {
    // OFF_THE_SHELF_QUESTION_ARRAY.push(getQuestionByKind(i % QUESTION_TYPE_COUNT, 2));
    OFF_THE_SHELF_QUESTION_ARRAY.push(getQuestionByKind(OFF_THE_SHELF_QUESTION_TYPE_ARRAY[i % OFF_THE_SHELF_QUESTION_TYPE_COUNT], 2));
  }
}

function fillContentPageContents() {
  var QUESTION_TEXT_PAGE_CONTENT_ARRAY = DATA.QUESTION_TEXT_PAGE_CONTENT_ARRAY,
      ANSWER_TEXT_PAGE_CONTENT_ARRAY = DATA.ANSWER_TEXT_PAGE_CONTENT_ARRAY,
      START_DATE = DATA.START_DATE,
      DAY_COUNT = DATA.DAY_COUNT,
      A5_PAGE_WIDTH = DATA.A5_PAGE_WIDTH,
      A5_PAGE_WIDTH_HALF = DATA.A5_PAGE_WIDTH_HALF,
      A5_PAGE_HEIGHT = DATA.A5_PAGE_HEIGHT,
      EMPTY_A5_PAGE_COUNT = DATA.EMPTY_A5_PAGE_COUNT,
      LEFT_A5_PAGE_SVG_START = DATA.LEFT_A5_PAGE_SVG_START,
      RIGHT_A5_PAGE_SVG_START = DATA.RIGHT_A5_PAGE_SVG_START,
      A5_PAGE_SVG_END = DATA.A5_PAGE_SVG_END,
      ORAL_QUESTION_ARRAY = DATA.ORAL_QUESTION_ARRAY,
      VERTICAL_QUESTION_ARRAY = DATA.VERTICAL_QUESTION_ARRAY,
      OFF_THE_SHELF_QUESTION_ARRAY = DATA.OFF_THE_SHELF_QUESTION_ARRAY,
      COUNT_ORAL_QUESTION_COUNT_PER_PAGE = DATA.COUNT_ORAL_QUESTION_COUNT_PER_PAGE,
      COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE = DATA.COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE,
      COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE = DATA.COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE,
      CONTENT_PAGE_SUBJECT_Y = DATA.CONTENT_PAGE_SUBJECT_Y,
      CONTENT_PAGE_SUBJECT_HEIGHT = DATA.CONTENT_PAGE_SUBJECT_HEIGHT,
      CONTENT_PAGE_SUBJECT_FONT_SIZE = DATA.CONTENT_PAGE_SUBJECT_FONT_SIZE,
      CONTENT_PAGE_FOOTER_HEIGHT = DATA.CONTENT_PAGE_FOOTER_HEIGHT,
      CONTENT_PAGE_FOOTER_FONT_SIZE = DATA.CONTENT_PAGE_FOOTER_FONT_SIZE,
      QUESTION_PAGE_FOOTER_TEXT = DATA.QUESTION_PAGE_FOOTER_TEXT,
      ANSWER_PAGE_FOOTER_TEXT = DATA.ANSWER_PAGE_FOOTER_TEXT,
      Y_POSITIONS_OF_QUESTION_ARRAY = DATA.Y_POSITIONS_OF_QUESTION_ARRAY,
      BORDER_LINE_HTML = DATA.BORDER_LINE_HTML,
      SEPERATOR_LINE_HTML = DATA.SEPERATOR_LINE_HTML,
      REMOVE_COVER = DATA.REMOVE_COVER; // 正文第一页是否从奇数页开始（A4页右半页）——奇偶odd-even

  var IS_ODD_PAGE_OF_FIRST_CONTENT_PAGE = REMOVE_COVER || EMPTY_A5_PAGE_COUNT === 2 || EMPTY_A5_PAGE_COUNT % 2 === 1;
  var YEAR_OF_START_DATE = START_DATE.getFullYear();
  var MONTH_OF_START_DATE = START_DATE.getMonth(); // + 1;

  var DATE_OF_START_DATE = START_DATE.getDate(); // 正文页标题行y坐标

  var CONTENT_PAGE_SUBJECT_X = A5_PAGE_WIDTH_HALF; // // 几个常量：口算题目总数、竖式题目总数、脱式题目总数
  // const COUNT_ORAL_QUESTION_COUNT = COUNT_ORAL_QUESTION_COUNT_PER_PAGE * DAY_COUNT;
  // const COUNT_VERTICAL_QUESTION_COUNT = COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE * DAY_COUNT;
  // const COUNT_OFF_THE_SHELF_QUESTION_COUNT =
  //   COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE * DAY_COUNT;

  var options = {};
  fillOralQuestions();
  fillVerticalQuestions();
  fillOffTheShelfQuestions(); // console.log({
  //   ORAL_QUESTION_ARRAY,
  //   VERTICAL_QUESTION_ARRAY,
  //   OFF_THE_SHELF_QUESTION_ARRAY,
  // });

  var FOOTER_TOP = A5_PAGE_HEIGHT - CONTENT_PAGE_FOOTER_HEIGHT;
  var Y0 = Y_POSITIONS_OF_QUESTION_ARRAY[0];
  var Y1 = Y_POSITIONS_OF_QUESTION_ARRAY[1];
  var Y2 = Y_POSITIONS_OF_QUESTION_ARRAY[2];
  var Y3 = Y_POSITIONS_OF_QUESTION_ARRAY[3];
  var Y4 = Y_POSITIONS_OF_QUESTION_ARRAY[4]; // 计算正文每页内容

  for (var loop_of_day = 0; loop_of_day < DAY_COUNT; ++loop_of_day) {
    var CURRENT_DATE = new Date(YEAR_OF_START_DATE, MONTH_OF_START_DATE, DATE_OF_START_DATE + loop_of_day); // const CURRENT_DATE_FLAG = `${CURRENT_DATE.getFullYear()}年${
    //   CURRENT_DATE.getMonth() + 1
    // }月${CURRENT_DATE.getDate()}日`;

    var CURRENT_DATE_FLAG = "".concat(CURRENT_DATE.getMonth() + 1, "\u6708").concat(CURRENT_DATE.getDate(), "\u65E5");
    var CURRENT_DATE_ORAL_QUESTIONS = ORAL_QUESTION_ARRAY.slice(loop_of_day * COUNT_ORAL_QUESTION_COUNT_PER_PAGE, (loop_of_day + 1) * COUNT_ORAL_QUESTION_COUNT_PER_PAGE);
    var CURRENT_DATE_VERTICAL_QUESTIONS = VERTICAL_QUESTION_ARRAY.slice(loop_of_day * COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE, (loop_of_day + 1) * COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE);
    var CURRENT_DATE_OFF_THE_SHELF_QUESTIONS = OFF_THE_SHELF_QUESTION_ARRAY.slice(loop_of_day * COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE, (loop_of_day + 1) * COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE); // console.log({ CURRENT_DATE_ORAL_QUESTIONS });
    // 如使用这句，将生成从后向前翻页的小册子
    // const IS_LEFT_PAGE =
    //   REMOVE_COVER ^
    //   (IS_ODD_PAGE_OF_FIRST_CONTENT_PAGE ? loop_of_day % 2 === 1 : loop_of_day % 2 === 0);

    var IS_LEFT_PAGE = IS_ODD_PAGE_OF_FIRST_CONTENT_PAGE ? loop_of_day % 2 === 1 : loop_of_day % 2 === 0;
    var CURRENT_PAGE_SVG_G_START = IS_LEFT_PAGE ? LEFT_A5_PAGE_SVG_START : RIGHT_A5_PAGE_SVG_START; // const CURRENT_PAGE_CONTENT_SUBJECT = `<text class="center middle" x="${CONTENT_PAGE_SUBJECT_X}mm" y="${CONTENT_PAGE_SUBJECT_Y}mm" style="width:${A5_PAGE_WIDTH}mm;height:${CONTENT_PAGE_SUBJECT_HEIGHT}mm;font-size:${CONTENT_PAGE_SUBJECT_FONT_SIZE}mm;">${CURRENT_DATE_FLAG}</text>`;

    var CURRENT_PAGE_CONTENT_SUBJECT = IS_LEFT_PAGE ? "<text class=\"left top\" x=\"0mm\" y=\"".concat(CONTENT_PAGE_SUBJECT_Y, "mm\" style=\"width:").concat(A5_PAGE_WIDTH, "mm;height:").concat(CONTENT_PAGE_SUBJECT_HEIGHT, "mm;font-size:").concat(CONTENT_PAGE_SUBJECT_FONT_SIZE, "mm;\">").concat(CURRENT_DATE_FLAG, "</text>") : "<text class=\"right top\" x=\"".concat(A5_PAGE_WIDTH, "mm\" y=\"").concat(CONTENT_PAGE_SUBJECT_Y, "mm\" style=\"width:").concat(A5_PAGE_WIDTH, "mm;height:").concat(CONTENT_PAGE_SUBJECT_HEIGHT, "mm;font-size:").concat(CONTENT_PAGE_SUBJECT_FONT_SIZE, "mm;\">").concat(CURRENT_DATE_FLAG, "</text>");
    var PAGE_NO = loop_of_day + 1;
    var CURRENT_PAGE_CONTENT_PAGE_NO = IS_LEFT_PAGE ? "<text class=\"left top\" x=\"0mm\" y=\"".concat(FOOTER_TOP, "mm\" style=\"font-size:").concat(CONTENT_PAGE_FOOTER_FONT_SIZE, "mm;\">").concat(PAGE_NO, "</text>") : "<text class=\"right top\" x=\"".concat(A5_PAGE_WIDTH, "mm\" y=\"").concat(FOOTER_TOP, "mm\" style=\"font-size:").concat(CONTENT_PAGE_FOOTER_FONT_SIZE, "mm;\">").concat(PAGE_NO, "</text>");
    QUESTION_TEXT_PAGE_CONTENT_ARRAY.push("".concat(CURRENT_PAGE_SVG_G_START, "\n              ").concat(CURRENT_PAGE_CONTENT_SUBJECT, "\n              ").concat(CURRENT_PAGE_CONTENT_PAGE_NO, "\n              ").concat(IS_LEFT_PAGE ? "<text class=\"right top\" x=\"".concat(A5_PAGE_WIDTH, "mm\" y=\"").concat(FOOTER_TOP, "mm\" style=\"font-size:").concat(CONTENT_PAGE_FOOTER_FONT_SIZE, "mm;\">").concat(QUESTION_PAGE_FOOTER_TEXT, "</text>") : "<text class=\"left top\" x=\"0mm\" y=\"".concat(FOOTER_TOP, "mm\" style=\"font-size:").concat(CONTENT_PAGE_FOOTER_FONT_SIZE, "mm;\">").concat(QUESTION_PAGE_FOOTER_TEXT, "</text>"), "\n\n              // \u53E3\u7B974\u9898 Y0\u5DE6\u53F3\uFF0CY1\u5DE6\u53F3\n              <g style=\"transform:translate(0mm, ").concat(Y0, "mm);\">").concat(CURRENT_DATE_ORAL_QUESTIONS[0].questionHtml, "</g>\n                    <g style=\"transform:translate(").concat(A5_PAGE_WIDTH_HALF, "mm, ").concat(Y0, "mm);\">").concat(CURRENT_DATE_ORAL_QUESTIONS[1].questionHtml, "</g>\n                    <g style=\"transform:translate(0mm, ").concat(Y1, "mm);\">").concat(CURRENT_DATE_ORAL_QUESTIONS[2].questionHtml, "</g>\n                    <g style=\"transform:translate(").concat(A5_PAGE_WIDTH_HALF, "mm, ").concat(Y1, "mm);\">").concat(CURRENT_DATE_ORAL_QUESTIONS[3].questionHtml, "</g>\n\n\n              // \u7AD6\u5F0F Y2\u5DE6\u53F3, Y3\u5DE6\n              <g style=\"transform:translate(0mm, ").concat(Y2, "mm);\">").concat(CURRENT_DATE_VERTICAL_QUESTIONS[0].questionHtml, "</g>\n                    <g style=\"transform:translate(").concat(A5_PAGE_WIDTH_HALF, "mm, ").concat(Y2, "mm);\">").concat(CURRENT_DATE_VERTICAL_QUESTIONS[1].questionHtml, "</g>\n                    <g style=\"transform:translate(0mm, ").concat(Y3, "mm);\">").concat(CURRENT_DATE_VERTICAL_QUESTIONS[2].questionHtml, "</g>\n\n              // \u8131\u5F0F Y3\u53F3, Y4\u5DE6\u53F3\n              <g style=\"transform:translate(").concat(A5_PAGE_WIDTH_HALF, "mm, ").concat(Y3, "mm);\">").concat(CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[0].questionHtml, "</g>\n                    <g style=\"transform:translate(0mm, ").concat(Y4, "mm);\">").concat(CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[1].questionHtml, "</g>\n                    <g style=\"transform:translate(").concat(A5_PAGE_WIDTH_HALF, "mm, ").concat(Y4, "mm);\">").concat(CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[2].questionHtml, "</g>\n\n              ").concat(BORDER_LINE_HTML, "\n              ").concat(SEPERATOR_LINE_HTML, "\n\n              ").concat(A5_PAGE_SVG_END));
    ANSWER_TEXT_PAGE_CONTENT_ARRAY.push("".concat(CURRENT_PAGE_SVG_G_START, "\n              ").concat(CURRENT_PAGE_CONTENT_SUBJECT, "\n              ").concat(CURRENT_PAGE_CONTENT_PAGE_NO, "\n              ").concat(IS_LEFT_PAGE ? "<text class=\"right top\" x=\"".concat(A5_PAGE_WIDTH, "mm\" y=\"").concat(FOOTER_TOP, "mm\" style=\"font-size:").concat(CONTENT_PAGE_FOOTER_FONT_SIZE, "mm;\">").concat(ANSWER_PAGE_FOOTER_TEXT, "</text>") : "<text class=\"left top\" x=\"0mm\" y=\"".concat(FOOTER_TOP, "mm\" style=\"font-size:").concat(CONTENT_PAGE_FOOTER_FONT_SIZE, "mm;\">").concat(ANSWER_PAGE_FOOTER_TEXT, "</text>"), "\n\n              // \u53E3\u7B974\u9898 Y0\u5DE6\u53F3\uFF0CY1\u5DE6\u53F3\n              <g style=\"transform:translate(0mm, ").concat(Y0, "mm);\">").concat(CURRENT_DATE_ORAL_QUESTIONS[0].answerHtml, "</g>\n              <g style=\"transform:translate(").concat(A5_PAGE_WIDTH_HALF, "mm, ").concat(Y0, "mm);\">").concat(CURRENT_DATE_ORAL_QUESTIONS[1].answerHtml, "</g>\n              <g style=\"transform:translate(0mm, ").concat(Y1, "mm);\">").concat(CURRENT_DATE_ORAL_QUESTIONS[2].answerHtml, "</g>\n              <g style=\"transform:translate(").concat(A5_PAGE_WIDTH_HALF, "mm, ").concat(Y1, "mm);\">").concat(CURRENT_DATE_ORAL_QUESTIONS[3].answerHtml, "</g>\n\n              // \u7AD6\u5F0F Y2\u5DE6\u53F3, Y3\u5DE6\n              <g style=\"transform:translate(0mm, ").concat(Y2, "mm);\">").concat(CURRENT_DATE_VERTICAL_QUESTIONS[0].answerHtml, "</g>\n              <g style=\"transform:translate(").concat(A5_PAGE_WIDTH_HALF, "mm, ").concat(Y2, "mm);\">").concat(CURRENT_DATE_VERTICAL_QUESTIONS[1].answerHtml, "</g>\n              <g style=\"transform:translate(0mm, ").concat(Y3, "mm);\">").concat(CURRENT_DATE_VERTICAL_QUESTIONS[2].answerHtml, "</g>\n\n              // \u8131\u5F0F Y3\u53F3, Y4\u5DE6\u53F3\n              <g style=\"transform:translate(").concat(A5_PAGE_WIDTH_HALF, "mm, ").concat(Y3, "mm);\">").concat(CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[0].answerHtml, "</g>\n              <g style=\"transform:translate(0mm, ").concat(Y4, "mm);\">").concat(CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[1].answerHtml, "</g>\n              <g style=\"transform:translate(").concat(A5_PAGE_WIDTH_HALF, "mm, ").concat(Y4, "mm);\">").concat(CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[2].answerHtml, "</g>\n\n              ").concat(BORDER_LINE_HTML, "\n              ").concat(SEPERATOR_LINE_HTML, "\n\n              ").concat(A5_PAGE_SVG_END));
  }

  return window;
}

function fillPageContents() {
  var QUESTION_PAGE_CONTENT_ARRAY = DATA.QUESTION_PAGE_CONTENT_ARRAY,
      ANSWER_PAGE_CONTENT_ARRAY = DATA.ANSWER_PAGE_CONTENT_ARRAY,
      QUESTION_COVER_PAGE_CONTENT = DATA.QUESTION_COVER_PAGE_CONTENT,
      ANSWER_COVER_PAGE_CONTENT = DATA.ANSWER_COVER_PAGE_CONTENT,
      QUESTION_TEXT_PAGE_CONTENT_ARRAY = DATA.QUESTION_TEXT_PAGE_CONTENT_ARRAY,
      ANSWER_TEXT_PAGE_CONTENT_ARRAY = DATA.ANSWER_TEXT_PAGE_CONTENT_ARRAY,
      COVER_CONTENT_X = DATA.COVER_CONTENT_X,
      COVER_CONTENT_Y = DATA.COVER_CONTENT_Y,
      A5_PAGE_WIDTH = DATA.A5_PAGE_WIDTH,
      A5_PAGE_HEIGHT = DATA.A5_PAGE_HEIGHT,
      COVER_PAGE_SUBJECT_FONT_SIZE = DATA.COVER_PAGE_SUBJECT_FONT_SIZE,
      A5_PAGE_SVG_END = DATA.A5_PAGE_SVG_END,
      LEFT_A5_PAGE_SVG_START = DATA.LEFT_A5_PAGE_SVG_START,
      RIGHT_A5_PAGE_SVG_START = DATA.RIGHT_A5_PAGE_SVG_START,
      EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK = DATA.EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK,
      COVER_CONTENT_VERTICAL_ALIGN = DATA.COVER_CONTENT_VERTICAL_ALIGN,
      DAY_COUNT = DATA.DAY_COUNT,
      REMOVE_COVER = DATA.REMOVE_COVER,
      IS_NO_TRIM = DATA.IS_NO_TRIM;

  if (!REMOVE_COVER) {
    QUESTION_PAGE_CONTENT_ARRAY.push(QUESTION_COVER_PAGE_CONTENT);
    ANSWER_PAGE_CONTENT_ARRAY.push(ANSWER_COVER_PAGE_CONTENT);
  }

  QUESTION_TEXT_PAGE_CONTENT_ARRAY.forEach(function (page_content) {
    QUESTION_PAGE_CONTENT_ARRAY.push(page_content);
  });
  ANSWER_TEXT_PAGE_CONTENT_ARRAY.forEach(function (page_content) {
    ANSWER_PAGE_CONTENT_ARRAY.push(page_content);
  }); // 算法简化版

  var QUESTION_PAGE_CONTENT = '';
  var ANSWER_PAGE_CONTENT = '';

  if (REMOVE_COVER) {
    if (DAY_COUNT < 4 || IS_NO_TRIM) {
      // 不足4天或不裁切时，必定追加空白页
      EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.forEach(function (empty_page_index) {
        QUESTION_PAGE_CONTENT_ARRAY.push(QUESTION_PAGE_CONTENT);
        ANSWER_PAGE_CONTENT_ARRAY.push(ANSWER_PAGE_CONTENT);
      });
    } else {
      EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.forEach(function (empty_page_index, index) {
        QUESTION_PAGE_CONTENT_ARRAY.splice(empty_page_index, 0, QUESTION_PAGE_CONTENT);
        ANSWER_PAGE_CONTENT_ARRAY.splice(empty_page_index, 0, ANSWER_PAGE_CONTENT);
      });
    }
  } else {
    EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.forEach(function (empty_page_index, index) {
      // const IS_BACK_COVER = index === 2;
      var IS_PUSH = DAY_COUNT > 1 && index > 0; // const CURRENT_A5_PAGE_SVG_START =
      //   index % 2 === 0 ? LEFT_A5_PAGE_SVG_START : RIGHT_A5_PAGE_SVG_START;

      if (IS_PUSH) {
        QUESTION_PAGE_CONTENT_ARRAY.push(QUESTION_PAGE_CONTENT);
        ANSWER_PAGE_CONTENT_ARRAY.push(ANSWER_PAGE_CONTENT);
      } else {
        QUESTION_PAGE_CONTENT_ARRAY.splice(empty_page_index, 0, QUESTION_PAGE_CONTENT);
        ANSWER_PAGE_CONTENT_ARRAY.splice(empty_page_index, 0, ANSWER_PAGE_CONTENT);
      }
    });
  }

  return window;
}

function getBodyHtml() {
  var PAPER_COUNT = DATA.PAPER_COUNT,
      IS_NO_TRIM = DATA.IS_NO_TRIM,
      A5_PAGE_MAX_INDEX = DATA.A5_PAGE_MAX_INDEX,
      QUESTION_PAGE_CONTENT_ARRAY = DATA.QUESTION_PAGE_CONTENT_ARRAY,
      ANSWER_PAGE_CONTENT_ARRAY = DATA.ANSWER_PAGE_CONTENT_ARRAY;
  var html_question = '';
  var html_answer = ''; // 计算每张A4纸的内容，合并为两个A5小册子——每页正反面各一个svg，于svg内自动补充页眉页脚
  // EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK

  for (var loop_of_paper = 0; loop_of_paper < PAPER_COUNT; ++loop_of_paper) {
    var PAGE_INDEX_START = IS_NO_TRIM ? loop_of_paper * 4 : loop_of_paper * 2;
    var PAGE_INDEX_END = IS_NO_TRIM ? PAGE_INDEX_START + 3 : A5_PAGE_MAX_INDEX - PAGE_INDEX_START;
    var PAGE_INDEX_1 = PAGE_INDEX_START + 0;
    var PAGE_INDEX_2 = PAGE_INDEX_START + 1;
    var PAGE_INDEX_3 = PAGE_INDEX_END - 1;
    var PAGE_INDEX_4 = PAGE_INDEX_END;
    var QUESTION_PAGE_CONTENT_1 = QUESTION_PAGE_CONTENT_ARRAY[PAGE_INDEX_1];
    var QUESTION_PAGE_CONTENT_2 = QUESTION_PAGE_CONTENT_ARRAY[PAGE_INDEX_2];
    var QUESTION_PAGE_CONTENT_3 = QUESTION_PAGE_CONTENT_ARRAY[PAGE_INDEX_3];
    var QUESTION_PAGE_CONTENT_4 = QUESTION_PAGE_CONTENT_ARRAY[PAGE_INDEX_4];
    var ANSWER_PAGE_CONTENT_1 = ANSWER_PAGE_CONTENT_ARRAY[PAGE_INDEX_1];
    var ANSWER_PAGE_CONTENT_2 = ANSWER_PAGE_CONTENT_ARRAY[PAGE_INDEX_2];
    var ANSWER_PAGE_CONTENT_3 = ANSWER_PAGE_CONTENT_ARRAY[PAGE_INDEX_3];
    var ANSWER_PAGE_CONTENT_4 = ANSWER_PAGE_CONTENT_ARRAY[PAGE_INDEX_4];
    var PAGE_CONTENT_HTML_START = '<page><svg xmlns="http://www.w3.org/2000/svg">';
    var PAGE_CONTENT_HTML_END = '</svg></page>';
    var QUESTION_PAGE_CONTENT = "\n              ".concat(PAGE_CONTENT_HTML_START, "\n                ").concat(QUESTION_PAGE_CONTENT_4, "\n                ").concat(QUESTION_PAGE_CONTENT_1, "\n              ").concat(PAGE_CONTENT_HTML_END, "\n\n              ").concat(PAGE_CONTENT_HTML_START, "\n                ").concat(QUESTION_PAGE_CONTENT_2, "\n                ").concat(QUESTION_PAGE_CONTENT_3, "\n              ").concat(PAGE_CONTENT_HTML_END, "\n            ");
    var ANSWER_PAGE_CONTENT = "\n              ".concat(PAGE_CONTENT_HTML_START, "\n                ").concat(ANSWER_PAGE_CONTENT_4, "\n                ").concat(ANSWER_PAGE_CONTENT_1, "\n              ").concat(PAGE_CONTENT_HTML_END, "\n\n              ").concat(PAGE_CONTENT_HTML_START, "\n                ").concat(ANSWER_PAGE_CONTENT_2, "\n                ").concat(ANSWER_PAGE_CONTENT_3, "\n              ").concat(PAGE_CONTENT_HTML_END, "\n            ");
    html_question = html_question.concat(QUESTION_PAGE_CONTENT);
    html_answer = html_answer.concat(ANSWER_PAGE_CONTENT);
  }

  return html_question.concat(html_answer);
}

function main() {
  // 8 A+B+C, A+B-C, A-B-C, A-B+C, A×B×C, A÷B÷C, A*B÷C, A÷B×C,
  // 8 A×B+C, A×B-C, A÷B+C, A÷B-C, A+B*C, A-B*C, A+B÷C, A-B÷C,
  // 4 A+(B+C), A-(B+C), A+(B-C), A-(B-C),
  // 4 A×(B+C), A÷(B+C), A×(B-C), A÷(B-C)
  var OFF_THE_SHELF_QUESTION_TYPE_ARRAY = []; // 跳过了以下项：A+B+C, A-B+C, A×B×C, A÷B÷C, A×B+C, A×B-C, A÷B+C, A÷B-C, A+B*C

  OFF_THE_SHELF_QUESTION_TYPE_ARRAY.push(1);
  OFF_THE_SHELF_QUESTION_TYPE_ARRAY.push(3);
  OFF_THE_SHELF_QUESTION_TYPE_ARRAY.push(6);
  OFF_THE_SHELF_QUESTION_TYPE_ARRAY.push(7);

  for (var i = 12; i < 24; ++i) {
    OFF_THE_SHELF_QUESTION_TYPE_ARRAY.push(i);
  }

  var OFF_THE_SHELF_QUESTION_TYPE_COUNT = OFF_THE_SHELF_QUESTION_TYPE_ARRAY.length;
  DATA.OFF_THE_SHELF_QUESTION_TYPE_ARRAY = OFF_THE_SHELF_QUESTION_TYPE_ARRAY;
  DATA.OFF_THE_SHELF_QUESTION_TYPE_COUNT = OFF_THE_SHELF_QUESTION_TYPE_COUNT;
  parseUrl().countPageCount().countPositionAndSize().countCoverPageContent().fillContentPageContents().fillPageContents();
  document.getElementsByTagName('body')[0].innerHTML = getBodyHtml(); // // window.print();
}

window.onload = main;

document.onkeyup = function (e) {
  // alert(e.keyCode);
  switch (e.keyCode) {
    case 112:
      // F1，实际需其它键辅助，如Shift或Ctrl或Alt，否则会被浏览器拦截
      alert('grade2_term2_summer_holiday.htm?start=20230703&end=20230830&left=4&right=4&top=4&bottom=4&notrim=true&removeCover=false&oralMax=200&verticalMax=1000&offTheShelfMax=200');
      e.preventDefault();
      e.stopPropagation();
      break;

    default:
      break;
  }

  return false;
};