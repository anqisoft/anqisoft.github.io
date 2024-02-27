// TODO(@anqi) Complete it!
// // const DEBUGGGING = true;

// declare const TO_13: boolean;
// declare const parseUrlSpecial: undefined | (() => string);

// const DATA = Object.assign({
//   HORIZONTAL_SPACE: 10,

//   COVER_PAGE_SUBJECT_FONT_SIZE: 12,

//   CONTENT_PAGE_SUBJECT_Y: 0,
//   CONTENT_PAGE_SUBJECT_HEIGHT: 8,
//   CONTENT_PAGE_SUBJECT_FONT_SIZE: 5,

//   CONTENT_PAGE_FOOTER_FONT_SIZE: 3,
//   CONTENT_PAGE_FOOTER_HEIGHT: 8,

//   Y_POSITIONS_OF_QUESTION_ARRAY: [],

//   A5_PAGE_SVG_END: "</g>",

//   QUESTION_TEXT_PAGE_CONTENT_ARRAY: [],
//   ANSWER_TEXT_PAGE_CONTENT_ARRAY: [],

//   QUESTION_PAGE_CONTENT_ARRAY: [],
//   ANSWER_PAGE_CONTENT_ARRAY: [],

//   QUESTION_ROW_HEIGHT: 8,
//   A5_PAGE_TOP_PADDING: 5,
//   ORAL_QUESTION_AREA_BOTTOM_MARGIN: 2,
//   VERTICAL_QUESTION_AREA_HEIGHT: 55.5, // 原来是45，现在调大些——可以在后续代码中动态增减
//   OFF_THE_SHELF_QUESTION_AREA_HEIGHT: 8 * 3, // 原来是45，现在调小为QUESTION_ROW_HEIGHT * 3

//   QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH: 40,

//   CONTENT_PAGE_CONTENT_FONT_SIZE: 3.5,
//   CHAR_WIDTH: 3.5 * 0.7, // CONTENT_PAGE_CONTENT_FONT_SIZE * 0.7

//   CONTENT_PAGE_CONTENT_CHAR_WIDTH: 3.5 * 0.05, // 0.05,
//   // CONTENT_PAGE_CONTENT_CHAR_WIDTH: 3.5 * 0.6, // tspan使用x而非dx时，原本右对齐的内容变成了左对齐

//   // OFF_THE_SHELF_QUESTION_START_POSITION_SCALE: 2.15,

//   OFF_THE_SHELF_LINE_STROKE_COLOR: "#000000",
//   OFF_THE_SHELF_LINE_STROKE_WIDTH: "0.1",
//   OFF_THE_SHELF_QUESTION_X: 3.5 * 2.15, // 3,

//   BLUE_VERTIAL_LINE_STROKE_COLOR: "#008800",
//   VERTIAL_LINE_STROKE_COLOR: "#000000",
//   VERTIAL_LINE_STROKE_WIDTH: "0.1",
//   VERTIAL_LINE_Y_MARGIN_TOP: 3,

//   SECONDARY_NUMBER_COLOR: "#ff0000",
//   SECONDARY_NUMBER_FONT_SIZE: 2,

//   COVER_CONTENT_VERTICAL_ALIGN: "middle", // top
//   COVER_PAGE_SUBJECT_ROW_HEIGHT_EM: 1.4,

//   BORDER_LINE_STROKE_COLOR: "#888888",
//   BORDER_LINE_STROKE_WIDTH: "0.1",

//   SEPERATOR_LINE_STROKE_COLOR: "#aaaaaa",
//   SEPERATOR_LINE_STROKE_WIDTH: "0.1",

//   END_AT13: true,
//   REMOVE_COVER: true,
// });

// // ?start=20240204&end=20240225&endAt13=false&left=10&right=10&top=15&bottom=20&notrim=true
// function parseUrl(): void {
//   const DEFAULT_MARGIN_LEFT = 10; // 单位：毫米
//   const DEFAULT_MARGIN_RIGHT = 10; // 单位：毫米
//   const DEFAULT_MARGIN_TOP = 15; // 单位：毫米
//   const DEFAULT_MARGIN_BOTTOM = 20; // 单位：毫米
//   const DEFAULT_NO_TRIM = true; // true表示不用裁切，每张A4纸四页为连续页，4-1-2-3, 8-5-6-7；false表示需裁切但无需装订，60-1-2-59, 58-3-4-57这样的页序
//   const DEFAULT_START_DATE = 20240204;
//   const DEFAULT_END_DATE = 20240225;

//   // <解析页面参数>
//   const URL = window.location.href.replace("?", "&").toLowerCase();

//   // start=20240204&end=20240225
//   const INPUT_START_DATE = decodeURI(
//     URL.concat(`&start=${DEFAULT_START_DATE}`)
//       .replace("&start=", "厶")
//       .split("厶")[1]
//       .split("&")[0],
//   );
//   const INPUT_END_DATE = decodeURI(
//     URL.concat(`&end=${DEFAULT_END_DATE}`)
//       .replace("&end=", "厶")
//       .split("厶")[1]
//       .split("&")[0],
//   );
//   //   console.log({
//   //     DEFAULT_START_DATE,
//   //     DEFAULT_END_DATE,
//   //     INPUT_START_DATE,
//   //     INPUT_END_DATE,
//   //   });

//   // left=3&right=3&top=3&bottom=3
//   const MARGIN_LEFT = Math.max(
//     0,
//     parseInt(
//       URL.concat(`&left=${DEFAULT_MARGIN_LEFT}`)
//         .replace("&left=", "厶")
//         .split("厶")[1]
//         .split("&")[0],
//       10,
//     ),
//   );
//   const MARGIN_RIGHT = Math.max(
//     0,
//     parseInt(
//       URL.concat(`&right=${DEFAULT_MARGIN_RIGHT}`)
//         .replace("&right=", "厶")
//         .split("厶")[1]
//         .split("&")[0],
//       10,
//     ),
//   );
//   const MARGIN_TOP = Math.max(
//     0,
//     parseInt(
//       URL.concat(`&top=${DEFAULT_MARGIN_TOP}`)
//         .replace("&top=", "厶")
//         .split("厶")[1]
//         .split("&")[0],
//       10,
//     ),
//   );
//   const MARGIN_BOTTOM = Math.max(
//     0,
//     parseInt(
//       URL.concat(`&bottom=${DEFAULT_MARGIN_BOTTOM}`)
//         .replace("&bottom=", "厶")
//         .split("厶")[1]
//         .split("&")[0],
//       10,
//     ),
//   );

//   // notrim=true
//   const IS_NO_TRIM = URL.concat(`&notrim=${DEFAULT_NO_TRIM}`)
//     .replace("&notrim=", "厶")
//     .split("厶")[1]
//     .split("&")[0] === "true";

//   const REMOVE_COVER = true;
//   // console.log(REMOVE_COVER);

//   // </解析页面参数>

//   // <转为实际日期>
//   const START_DATE = new Date(
//     parseInt(INPUT_START_DATE.substring(0, 4)),
//     parseInt(INPUT_START_DATE.substring(4, 6)) - 1,
//     parseInt(INPUT_START_DATE.substring(6, 8)),
//   );
//   const END_DATE = new Date(
//     parseInt(INPUT_END_DATE.substring(0, 4)),
//     parseInt(INPUT_END_DATE.substring(4, 6)) - 1,
//     parseInt(INPUT_END_DATE.substring(6, 8)),
//   );
//   const DAY_COUNT = (END_DATE.getTime() - START_DATE.getTime()) / 86400000 + 1;
//   // </转为实际日期>

//   DATA.MARGIN_LEFT = MARGIN_LEFT;
//   DATA.MARGIN_RIGHT = MARGIN_RIGHT;
//   DATA.MARGIN_TOP = MARGIN_TOP;
//   DATA.MARGIN_BOTTOM = MARGIN_BOTTOM;
//   DATA.IS_NO_TRIM = IS_NO_TRIM;
//   DATA.START_DATE = START_DATE;
//   DATA.END_DATE = END_DATE;
//   DATA.DAY_COUNT = DAY_COUNT;

//   DATA.DEFAULT_MARGIN_TOP = DEFAULT_MARGIN_TOP;
//   DATA.DEFAULT_MARGIN_BOTTOM = DEFAULT_MARGIN_BOTTOM;
//   DATA.DEFAULT_MARGIN_LEFT = DEFAULT_MARGIN_LEFT;
//   DATA.DEFAULT_MARGIN_RIGHT = DEFAULT_MARGIN_RIGHT;

//   DATA.REMOVE_COVER = REMOVE_COVER;

//   parseUrlSpecial && parseUrlSpecial();

//   document.onkeyup = function (e: KeyboardEvent) {
//     // alert(e.code);
//     switch (e.code) {
//       case 'F1': // F1，112，实际需其它键辅助，如Shift或Ctrl或Alt，否则会被浏览器拦截
//         alert(
//           window.location.href.split("/").pop()?.concat(
//             `?start=${DEFAULT_START_DATE}&end=${DEFAULT_END_DATE}&left=${DEFAULT_MARGIN_RIGHT}&right=${DEFAULT_MARGIN_RIGHT}&top=${DEFAULT_MARGIN_TOP}&bottom=${DEFAULT_MARGIN_BOTTOM}&notrim=${DEFAULT_NO_TRIM}`,
//           ),
//         );
//         e.preventDefault();
//         e.stopPropagation();
//         break;
//       default:
//         break;
//     }

//     return false;
//   };
// }

// function countPageCount() {
//   const {
//     DAY_COUNT,
//     IS_NO_TRIM,
//     REMOVE_COVER,
//   } = DATA;

//   // 计算题目本、答案本各需多少张A4纸
//   const PAPER_COUNT = Math.ceil((DAY_COUNT + (REMOVE_COVER ? 0 : 1)) / 4);

//   const A5_PAGE_COUNT = 4 * PAPER_COUNT;
//   const A5_PAGE_MAX_INDEX = A5_PAGE_COUNT - 1;

//   const EMPTY_A5_PAGE_COUNT = A5_PAGE_COUNT - (DAY_COUNT + 1);
//   const EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK = [];

//   if (EMPTY_A5_PAGE_COUNT) {
//     if (REMOVE_COVER) {
//       // 无封面时，空白页为小册子最后几页
//       // if (IS_NO_TRIM) {
//       //   // 不裁切时，空白页为最后一张纸的最后几页
//       //   for (let i = 0; i < EMPTY_A5_PAGE_COUNT; ++i) {
//       //     EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(A5_PAGE_MAX_INDEX - i);
//       //   }
//       // } else {
//       //   // 裁切时，空白页为第一张纸的第4、3、2页
//       //   for (let i = 0; i < EMPTY_A5_PAGE_COUNT; ++i) {
//       //     EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(3 - i);
//       //   }
//       // }

//       const EMPTY_PAGE_END_INDEX = IS_NO_TRIM ? A5_PAGE_MAX_INDEX : 3;
//       for (let i = 0; i < EMPTY_A5_PAGE_COUNT; ++i) {
//         EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(EMPTY_PAGE_END_INDEX - i);
//       }
//     } else {
//       // 有封面时，空白页优先使用封面页的背面
//       EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(1);
//       switch (EMPTY_A5_PAGE_COUNT) {
//         case 1:
//           break;
//         case 2:
//           EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(
//             IS_NO_TRIM ? A5_PAGE_MAX_INDEX : 3,
//           );
//           break;
//         case 3:
//           EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(
//             IS_NO_TRIM ? A5_PAGE_MAX_INDEX : 3,
//           );
//           EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.push(
//             IS_NO_TRIM ? A5_PAGE_MAX_INDEX - 1 : 2,
//           );
//           break;
//         default:
//           break;
//       }
//     }
//   }
//   EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.sort();

//   DATA.PAPER_COUNT = PAPER_COUNT;
//   DATA.A5_PAGE_MAX_INDEX = A5_PAGE_MAX_INDEX;
//   DATA.EMPTY_A5_PAGE_COUNT = EMPTY_A5_PAGE_COUNT;
//   DATA.EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK = EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK;

//   return window;
// }

// function countPositionAndSize() {
//   const {
//     MARGIN_LEFT,
//     MARGIN_RIGHT,
//     MARGIN_TOP,
//     MARGIN_BOTTOM,
//     HORIZONTAL_SPACE,
//     DEFAULT_MARGIN_TOP,
//     DEFAULT_MARGIN_BOTTOM,
//     DEFAULT_MARGIN_LEFT,
//     DEFAULT_MARGIN_RIGHT,

//     CONTENT_PAGE_FOOTER_HEIGHT,
//     COVER_PAGE_SUBJECT_FONT_SIZE,
//     ANSWER_COVER_PAGE_SUBJECT_TEXT,
//     COVER_PAGE_SUBJECT_ROW_HEIGHT_EM,
//   } = DATA;
//   const A5_PAGE_WIDTH = (297 - MARGIN_LEFT - MARGIN_RIGHT - HORIZONTAL_SPACE) /
//     2;
//   const A5_PAGE_HEIGHT = 210 - MARGIN_TOP - MARGIN_BOTTOM;

//   const LEFT_A5_PAGE_LEFT = MARGIN_LEFT;
//   const RIGHT_A5_PAGE_LEFT = 297 - MARGIN_RIGHT - A5_PAGE_WIDTH;

//   const A5_PAGE_WIDTH_HALF = A5_PAGE_WIDTH * 0.5;
//   const A5_PAGE_HEIGHT_HALF = A5_PAGE_HEIGHT * 0.5;

//   const LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG1 = '<g style="transform:translate(';
//   const LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG2 =
//     `mm, ${MARGIN_TOP}mm);width:${A5_PAGE_WIDTH}mm;height:${A5_PAGE_HEIGHT}mm;">`;

//   const LEFT_A5_PAGE_SVG_START =
//     `${LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG1}${LEFT_A5_PAGE_LEFT}${LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG2}`;
//   const RIGHT_A5_PAGE_SVG_START =
//     `${LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG1}${RIGHT_A5_PAGE_LEFT}${LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG2}`;

//   const COVER_CONTENT_X = A5_PAGE_WIDTH_HALF;
//   // const COVER_CONTENT_Y = 0; // A5_PAGE_HEIGHT_HALF;
//   // const COVER_CONTENT_Y = COVER_PAGE_SUBJECT_FONT_SIZE * 2; // A5_PAGE_HEIGHT_HALF; // 0;
//   const COVER_CONTENT_Y = A5_PAGE_HEIGHT_HALF -
//     COVER_PAGE_SUBJECT_FONT_SIZE *
//       ANSWER_COVER_PAGE_SUBJECT_TEXT.length *
//       COVER_PAGE_SUBJECT_ROW_HEIGHT_EM *
//       0.5; // A5_PAGE_HEIGHT_HALF;

//   const {
//     Y_POSITIONS_OF_QUESTION_ARRAY,
//     CONTENT_PAGE_SUBJECT_Y,
//     CONTENT_PAGE_SUBJECT_HEIGHT,

//     QUESTION_ROW_HEIGHT,
//     A5_PAGE_TOP_PADDING,
//     ORAL_QUESTION_AREA_BOTTOM_MARGIN,
//     VERTICAL_QUESTION_AREA_HEIGHT,
//     OFF_THE_SHELF_QUESTION_AREA_HEIGHT,

//     COUNT_ORAL_QUESTION_COUNT_PER_PAGE,
//     COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE,
//     COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE,
//   } = DATA;

//   let y = CONTENT_PAGE_SUBJECT_Y + CONTENT_PAGE_SUBJECT_HEIGHT +
//     A5_PAGE_TOP_PADDING;
//   Y_POSITIONS_OF_QUESTION_ARRAY.push(y);

//   const ORAL_QUESTION_AREA_HEIGHT = QUESTION_ROW_HEIGHT +
//     ORAL_QUESTION_AREA_BOTTOM_MARGIN;
//   const ORAL_QUESTION_AREA_ROW_COUNT = Math.floor(
//     COUNT_ORAL_QUESTION_COUNT_PER_PAGE / 2,
//   );
//   for (
//     let loopOfOral = 0;
//     loopOfOral < ORAL_QUESTION_AREA_ROW_COUNT;
//     ++loopOfOral
//   ) {
//     y += ORAL_QUESTION_AREA_HEIGHT;
//     Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
//   }

//   const VERTICAL_QUESTION_AREA_ROW_COUNT = Math.floor(
//     COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE / 2,
//   );
//   for (
//     let loopOfVertical = 0;
//     loopOfVertical < VERTICAL_QUESTION_AREA_ROW_COUNT;
//     ++loopOfVertical
//   ) {
//     y += VERTICAL_QUESTION_AREA_HEIGHT;
//     Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
//   }

//   if (COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE % 2 === 1) {
//     y += Math.max(
//       VERTICAL_QUESTION_AREA_HEIGHT,
//       OFF_THE_SHELF_QUESTION_AREA_HEIGHT,
//     );
//     Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
//   }

//   const FIX_COUNT = COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE % 2 === 1 ? 1 : 0;
//   const OFF_THE_SHELF_QUESTION_AREA_ROW_COUNT =
//     Math.ceil((COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE - FIX_COUNT) / 2) -
//     1;
//   for (
//     let loopOfOffTheShelf = 0;
//     loopOfOffTheShelf < OFF_THE_SHELF_QUESTION_AREA_ROW_COUNT;
//     ++loopOfOffTheShelf
//   ) {
//     y += OFF_THE_SHELF_QUESTION_AREA_HEIGHT;
//     Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
//   }
//   // console.log({ Y_POSITIONS_OF_QUESTION_ARRAY });

//   const OFF_THE_SHELF_LINE_Y = QUESTION_ROW_HEIGHT * 0.8;
//   // 这里借用ORAL_QUESTION_AREA_HEIGHT（因脱式区域采用与口算题目区同样的行高，就不再定义相关常量了）
//   const OFF_THE_SHELF_SECOND_ROW_Y = ORAL_QUESTION_AREA_HEIGHT +
//     ORAL_QUESTION_AREA_BOTTOM_MARGIN;
//   const OFF_THE_SHELF_THIRD_ROW_Y = OFF_THE_SHELF_SECOND_ROW_Y +
//     QUESTION_ROW_HEIGHT;

//   DATA.A5_PAGE_WIDTH = A5_PAGE_WIDTH;
//   DATA.A5_PAGE_HEIGHT = A5_PAGE_HEIGHT;
//   DATA.A5_PAGE_WIDTH_HALF = A5_PAGE_WIDTH_HALF;
//   DATA.LEFT_A5_PAGE_SVG_START = LEFT_A5_PAGE_SVG_START;
//   DATA.RIGHT_A5_PAGE_SVG_START = RIGHT_A5_PAGE_SVG_START;
//   DATA.COVER_CONTENT_X = COVER_CONTENT_X;
//   DATA.COVER_CONTENT_Y = COVER_CONTENT_Y;

//   DATA.OFF_THE_SHELF_LINE_Y = OFF_THE_SHELF_LINE_Y;
//   DATA.OFF_THE_SHELF_SECOND_ROW_Y = OFF_THE_SHELF_SECOND_ROW_Y;
//   DATA.OFF_THE_SHELF_THIRD_ROW_Y = OFF_THE_SHELF_THIRD_ROW_Y;

//   // 修正VERTICAL_QUESTION_AREA_HEIGHT
//   if (
//     MARGIN_TOP !== DEFAULT_MARGIN_TOP || MARGIN_BOTTOM !== DEFAULT_MARGIN_BOTTOM
//   ) {
//     DATA.VERTICAL_QUESTION_AREA_HEIGHT += (DEFAULT_MARGIN_TOP - MARGIN_TOP +
//       (DEFAULT_MARGIN_BOTTOM - MARGIN_BOTTOM)) / 2;
//   }

//   // 修正QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH
//   if (
//     MARGIN_LEFT !== DEFAULT_MARGIN_LEFT || MARGIN_RIGHT !== DEFAULT_MARGIN_RIGHT
//   ) {
//     DATA.QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH +=
//       (DEFAULT_MARGIN_LEFT + DEFAULT_MARGIN_RIGHT - MARGIN_LEFT -
//         MARGIN_RIGHT) / 2;
//     // console.log({
//     //   DEFAULT_MARGIN_LEFT,
//     //   DEFAULT_MARGIN_RIGHT,
//     //   MARGIN_LEFT,
//     //   MARGIN_RIGHT,
//     //   diff: DEFAULT_MARGIN_LEFT + DEFAULT_MARGIN_RIGHT - MARGIN_LEFT - MARGIN_RIGHT,
//     // });
//   }

//   const STEP_ROW_SPACE = QUESTION_ROW_HEIGHT; // + ORAL_QUESTION_AREA_BOTTOM_MARGIN;
//   DATA.STEP_ROW_SPACE = STEP_ROW_SPACE;

//   DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN = A5_PAGE_WIDTH_HALF *
//     0.5;
//   DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION1 = A5_PAGE_WIDTH_HALF * 0.25;
//   // DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION2 = A5_PAGE_WIDTH_HALF * 0.75;
//   // DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION1 = A5_PAGE_WIDTH_HALF * 0.2;
//   DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION2 = A5_PAGE_WIDTH_HALF * 0.8;

//   const VERTICAL_QUESTION_AREA_HEIGHT_HALF =
//     DATA.VERTICAL_QUESTION_AREA_HEIGHT * 0.5;
//   DATA.VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN =
//     VERTICAL_QUESTION_AREA_HEIGHT_HALF + STEP_ROW_SPACE * 5 * 0.5;
//   DATA.VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN =
//     VERTICAL_QUESTION_AREA_HEIGHT_HALF + STEP_ROW_SPACE * 4 * 0.5;
//   // console.log({
//   //   VERTICAL_QUESTION_AREA_HEIGHT_HALF,
//   //   VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN: DATA.VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN,
//   //   VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN: DATA.VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN,
//   // });

//   const MM_TO_PX_SCALE = getMmToPxScale();
//   DATA.MM_TO_PX_SCALE = MM_TO_PX_SCALE;

//   const BIG_RADIUS_PX = MM_TO_PX_SCALE * QUESTION_ROW_HEIGHT;
//   const SMALL_RADIUS_PX = MM_TO_PX_SCALE * DATA.CHAR_WIDTH;
//   // DATA.DIVISION_PATH_HTML = `a ${BIG_RADIUS_PX} ${SMALL_RADIUS_PX} 0 0 1 ${BIG_RADIUS_PX},${SMALL_RADIUS_PX}`;
//   // DATA.DIVISION_PATH_HTML = `a ${BIG_RADIUS_PX} ${SMALL_RADIUS_PX} 0 0 1 ${BIG_RADIUS_PX}, ${SMALL_RADIUS_PX}`;
//   DATA.DIVISION_PATH_HTML =
//     `a -${SMALL_RADIUS_PX} ${BIG_RADIUS_PX} 0 0 1 -${SMALL_RADIUS_PX}, ${BIG_RADIUS_PX}`;

//   const {
//     BORDER_LINE_STROKE_COLOR,
//     BORDER_LINE_STROKE_WIDTH,

//     SEPERATOR_LINE_STROKE_COLOR,
//     SEPERATOR_LINE_STROKE_WIDTH,
//   } = DATA;

//   const TOP_BORDER_LINE_Y = CONTENT_PAGE_SUBJECT_HEIGHT;
//   const BOTTOM_BORDER_LINE_Y = A5_PAGE_HEIGHT -
//     CONTENT_PAGE_FOOTER_HEIGHT * 1.2;
//   const BORDER_LINE_LEFT = 0;
//   const BORDER_LINE_RIGHT = A5_PAGE_WIDTH;

//   DATA.BORDER_LINE_HTML = `<line
//         x1="${BORDER_LINE_LEFT}mm"
//         y1="${TOP_BORDER_LINE_Y}mm"
//         x2="${BORDER_LINE_RIGHT}mm"
//         y2="${TOP_BORDER_LINE_Y}mm"
//         stroke="${BORDER_LINE_STROKE_COLOR}"
//         stroke-width="${BORDER_LINE_STROKE_WIDTH}mm"
//       /><line
//         x1="${BORDER_LINE_LEFT}mm"
//         y1="${BOTTOM_BORDER_LINE_Y}mm"
//         x2="${BORDER_LINE_RIGHT}mm"
//         y2="${BOTTOM_BORDER_LINE_Y}mm"
//         stroke="${BORDER_LINE_STROKE_COLOR}"
//         stroke-width="${BORDER_LINE_STROKE_WIDTH}mm"
//       />`;

//   const Y0 = Y_POSITIONS_OF_QUESTION_ARRAY[0];

//   DATA.SEPERATOR_LINE_HTML = `<line
//         x1="${A5_PAGE_WIDTH_HALF}mm"
//         y1="${Y0}mm"
//         x2="${A5_PAGE_WIDTH_HALF}mm"
//         y2="${BOTTOM_BORDER_LINE_Y}mm"
//         stroke="${SEPERATOR_LINE_STROKE_COLOR}"
//         stroke-width="${SEPERATOR_LINE_STROKE_WIDTH}mm"
//       />
//       `;
//   Y_POSITIONS_OF_QUESTION_ARRAY.forEach((y) => {
//     DATA.SEPERATOR_LINE_HTML += `<line
//         x1="${0}mm"
//         y1="${y}mm"
//         x2="${A5_PAGE_WIDTH}mm"
//         y2="${y}mm"
//         stroke="${SEPERATOR_LINE_STROKE_COLOR}"
//         stroke-width="${SEPERATOR_LINE_STROKE_WIDTH}mm"
//       />`;
//   });

//   return window;
// }

// function countCoverPageContent() {
//   if (!DATA.REMOVE_COVER) {
//     const {
//       RIGHT_A5_PAGE_SVG_START,
//       A5_PAGE_WIDTH,
//       A5_PAGE_HEIGHT,
//       COVER_CONTENT_X,
//       COVER_CONTENT_Y,
//       COVER_PAGE_SUBJECT_FONT_SIZE,
//       QUESTION_COVER_PAGE_SUBJECT_TEXT,
//       ANSWER_COVER_PAGE_SUBJECT_TEXT,
//       A5_PAGE_SVG_END,
//       COVER_CONTENT_VERTICAL_ALIGN,
//       COVER_PAGE_SUBJECT_ROW_HEIGHT_EM,
//     } = DATA;
//     // Error: <text> attribute transform: Expected number, "rotate(90, 66.75mm, 87.5mm)".
//     // transform="rotate(90, ${COVER_CONTENT_X}mm, ${COVER_CONTENT_Y}mm)" rotate="-90"
//     const COVER_PAGE_CONTENT_START =
//       `${RIGHT_A5_PAGE_SVG_START}<text class="center ${COVER_CONTENT_VERTICAL_ALIGN}" x="${COVER_CONTENT_X}mm" y="${COVER_CONTENT_Y}mm" style="font-size:${COVER_PAGE_SUBJECT_FONT_SIZE}mm;">`;
//     const COVER_PAGE_CONTENT_END = `</text>${A5_PAGE_SVG_END}`;

//     const convertCoverTextToVertialHtml = (content) =>
//       content
//         .split("")
//         .map(
//           (char, char_index) =>
//             `<tspan dx="${
//               char_index ? `-${COVER_PAGE_SUBJECT_FONT_SIZE}mm` : 0
//             }" dy="${
//               char_index
//                 ? `${
//                   COVER_PAGE_SUBJECT_FONT_SIZE *
//                   COVER_PAGE_SUBJECT_ROW_HEIGHT_EM
//                 }mm`
//                 : 0
//             }">${char}</tspan>`,
//         )
//         .join("");

//     const QUESTION_COVER_PAGE_CONTENT = `${COVER_PAGE_CONTENT_START}${
//       convertCoverTextToVertialHtml(
//         DATA.QUESTION_COVER_PAGE_SUBJECT_TEXT,
//       )
//     }${COVER_PAGE_CONTENT_END}`;
//     const ANSWER_COVER_PAGE_CONTENT = `${COVER_PAGE_CONTENT_START}${
//       convertCoverTextToVertialHtml(
//         DATA.ANSWER_COVER_PAGE_SUBJECT_TEXT,
//       )
//     }${COVER_PAGE_CONTENT_END}`;

//     DATA.QUESTION_COVER_PAGE_CONTENT = QUESTION_COVER_PAGE_CONTENT;
//     DATA.ANSWER_COVER_PAGE_CONTENT = ANSWER_COVER_PAGE_CONTENT;
//   }

//   return window;
// }

// function getVertialQuestionStepHtml(
//   lineCountMethod,
//   isOnlyOneColumn,
//   operator1,
//   operator2,
//   a,
//   b,
//   c,
//   middleResult,
//   result,
//   quotient,
//   remainder,
// ) {
//   // const IS_SUBTRACTION_1 = operator1 === '-';
//   // const IS_SUBTRACTION_2 = operator2 === '-';
//   const IS_DIVISION_1 = operator1 === "/";
//   const IS_DIVISION_2 = operator2 === "/";

//   const IS_MULTIPLY_1 = operator1 === "*";
//   const IS_MULTIPLY_2 = operator2 === "*";

//   const IS_LEFT_TO_RIGHT =
//     lineCountMethod === LineCountMethodType.LeftToRight ||
//     lineCountMethod === LineCountMethodType.LeftToRightByBrackets;
//   const operand_1_1 = IS_LEFT_TO_RIGHT ? a : b;
//   const operand_1_2 = IS_LEFT_TO_RIGHT ? b : c;
//   // const operand_2_1 = isOnlyOneColumn ? 0 : IS_LEFT_TO_RIGHT ? middleResult : a;
//   // const operand_2_1 = IS_LEFT_TO_RIGHT ? middleResult : a;
//   // const operand_2_1 = IS_LEFT_TO_RIGHT ? middleResult : c;
//   const operand_2_1 = IS_LEFT_TO_RIGHT
//     ? middleResult
//     : isOnlyOneColumn
//     ? middleResult
//     : a;
//   const operand_2_2 = IS_LEFT_TO_RIGHT ? c : isOnlyOneColumn ? a : middleResult;

//   const TRIM_RIGHT_ZERO_OPERAND_1_2 = trimRightZero(operand_1_2).length;
//   const TRIM_RIGHT_ZERO_OPERAND_2_2 = trimRightZero(operand_2_2).length;
//   const APPEND_ROW_COUNT_1 = IS_MULTIPLY_1 && TRIM_RIGHT_ZERO_OPERAND_1_2 > 1
//     ? TRIM_RIGHT_ZERO_OPERAND_1_2
//     : 0;
//   const APPEND_ROW_COUNT_2 = IS_MULTIPLY_2 && TRIM_RIGHT_ZERO_OPERAND_2_2 > 1
//     ? TRIM_RIGHT_ZERO_OPERAND_2_2
//     : 0;

//   // 目测当前行间空白区可放下退位减所需小圆点与借位、退位辅助数字
//   // const STEP_ROW_COUNT = isOnlyOneColumn
//   //   ? 5 + IS_SUBTRACTION_1
//   //     ? 1
//   //     : 0 + IS_SUBTRACTION_2
//   //     ? 1
//   //     : 0
//   //   : 3 + (IS_SUBTRACTION_1 || IS_SUBTRACTION_2 ? 1 : 0);
//   // const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 : IS_DIVISION_1 || IS_DIVISION_2 ? 4 : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
//   const STEP_ROW_COUNT = isOnlyOneColumn
//     ? 5 + (APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 > 0 ? 0.5 : 0)
//     : IS_DIVISION_1 || IS_DIVISION_2
//     ? 4
//     : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);

//   const ONE_COLUMN_MAX_LENGTH = isOnlyOneColumn
//     ? 1 +
//       Math.max(
//         a.toString().length,
//         b.toString().length,
//         c.toString().length,
//         middleResult.toString().length,
//         result.toString().length,
//       )
//     : 0;

//   // 连加合一竖式
//   if (operator1 === "+" && operator2 === "+") {
//     return getVertialQuestionStepColumnHtmlOfPlusAndPlus(
//       // ONE_COLUMN_MAX_LENGTH,
//       // STEP_ROW_COUNT,
//       a,
//       b,
//       c,
//       result,
//     );
//   }

//   return `${
//     getVertialQuestionStepColumnHtml(
//       isOnlyOneColumn,
//       ONE_COLUMN_MAX_LENGTH,
//       STEP_ROW_COUNT,
//       0,
//       operator1,
//       operand_1_1,
//       operand_1_2,
//       middleResult,
//       IS_DIVISION_1 ? middleResult : 0, // quotient,
//       0, // remainder,
//     )
//   }, ${
//     getVertialQuestionStepColumnHtml(
//       isOnlyOneColumn,
//       ONE_COLUMN_MAX_LENGTH,
//       isOnlyOneColumn ? STEP_ROW_COUNT : STEP_ROW_COUNT - APPEND_ROW_COUNT_1,
//       1,
//       operator2,
//       operand_2_1,
//       operand_2_2,
//       result,
//       quotient,
//       remainder,
//     )
//   }`;
// }

// function getTspanCharByChar(content: string | number, CHAR_WIDTH: number) {
//   return content.toString().split("").map((c) =>
//     `<tspan dx="${CHAR_WIDTH}mm">${c}</tspan>`
//   ).join("");
// }

// function getTransparentTspanCharByChar(
//   RIGHT_ZERO_COUNT: number,
//   content: string | number,
//   CHAR_WIDTH: number,
// ) {
//   content = content.toString();
//   return content.split("").map((c) =>
//     `<tspan dx="${CHAR_WIDTH}mm">${c}</tspan>`
//   ).join("").concat(
//     RIGHT_ZERO_COUNT > 0
//       ? "0".repeat(RIGHT_ZERO_COUNT).split("").map((c) =>
//         `<tspan dx="${CHAR_WIDTH}mm" style="fill:transparent;">${c}</tspan>`
//       ).join("")
//       : "",
//   );
// }

// function getMmToPxScale() {
//   // https://blog.csdn.net/baidu_25343343/article/details/84950269
//   const { screen } = window as unknown as {
//     screen: {
//       deviceXDPI?: number;
//       deviceYDPI: number;
//     };
//   };

//   const dpiArray = []; // : Array<number>
//   if (screen.deviceXDPI) {
//     dpiArray.push(screen.deviceXDPI);
//     dpiArray.push(screen.deviceYDPI);
//   } else {
//     const div = document.createElement("div");
//     div.style.cssText =
//       "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
//     document.body.appendChild(div);
//     dpiArray.push(parseInt(div.offsetWidth.toString()));
//     dpiArray.push(parseInt(div.offsetHeight.toString()));
//     document.body.removeChild(div);
//   }

//   const dpiX = dpiArray[0];
//   const mmToPxScale = dpiX / 25.4;
//   return mmToPxScale;
// }

// function getMathFormula(computerFormula: string) {
//   return computerFormula
//     .replace(/\*/g, " × ")
//     .replace(/\//g, " ÷ ")
//     .replace(/\+/g, " ＋ ")
//     .replace(/\-/g, " － ");
// }

// function getContentPageContentTextByChars(content: string) {
//   return content
//     .split("")
//     .map((char: string, _char_index: number) => `<tspan>${char}</tspan>`)
//     .join("");
// }

// function fillContentPageContents() {
//   const {
//     QUESTION_TEXT_PAGE_CONTENT_ARRAY,
//     ANSWER_TEXT_PAGE_CONTENT_ARRAY,
//     START_DATE,
//     DAY_COUNT,
//     A5_PAGE_WIDTH,
//     A5_PAGE_WIDTH_HALF,
//     A5_PAGE_HEIGHT,
//     EMPTY_A5_PAGE_COUNT,
//     LEFT_A5_PAGE_SVG_START,
//     RIGHT_A5_PAGE_SVG_START,
//     A5_PAGE_SVG_END,
//     ORAL_QUESTION_ARRAY,
//     VERTICAL_QUESTION_ARRAY,
//     OFF_THE_SHELF_QUESTION_ARRAY,
//     COUNT_ORAL_QUESTION_COUNT_PER_PAGE,
//     COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE,
//     COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE,
//     CONTENT_PAGE_SUBJECT_Y,
//     CONTENT_PAGE_SUBJECT_HEIGHT,
//     CONTENT_PAGE_SUBJECT_FONT_SIZE,
//     CONTENT_PAGE_FOOTER_HEIGHT,
//     CONTENT_PAGE_FOOTER_FONT_SIZE,
//     QUESTION_PAGE_FOOTER_TEXT,
//     ANSWER_PAGE_FOOTER_TEXT,
//     Y_POSITIONS_OF_QUESTION_ARRAY,

//     BORDER_LINE_HTML,
//     SEPERATOR_LINE_HTML,

//     REMOVE_COVER,
//   } = DATA;

//   // 正文第一页是否从奇数页开始（A4页右半页）——奇偶odd-even
//   const IS_ODD_PAGE_OF_FIRST_CONTENT_PAGE = REMOVE_COVER ||
//     EMPTY_A5_PAGE_COUNT === 2 || EMPTY_A5_PAGE_COUNT % 2 === 1;

//   const YEAR_OF_START_DATE = START_DATE.getFullYear();
//   const MONTH_OF_START_DATE = START_DATE.getMonth(); // + 1;
//   const DATE_OF_START_DATE = START_DATE.getDate();

//   // 正文页标题行y坐标
//   const CONTENT_PAGE_SUBJECT_X = A5_PAGE_WIDTH_HALF;

//   // // 几个常量：口算题目总数、竖式题目总数、脱式题目总数
//   // const COUNT_ORAL_QUESTION_COUNT = COUNT_ORAL_QUESTION_COUNT_PER_PAGE * DAY_COUNT;
//   // const COUNT_VERTICAL_QUESTION_COUNT = COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE * DAY_COUNT;
//   // const COUNT_OFF_THE_SHELF_QUESTION_COUNT =
//   //   COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE * DAY_COUNT;

//   const options = {};

//   fillOralQuestions();
//   fillVerticalQuestions();
//   fillOffTheShelfQuestions();
//   // console.log({
//   //   ORAL_QUESTION_ARRAY,
//   //   VERTICAL_QUESTION_ARRAY,
//   //   OFF_THE_SHELF_QUESTION_ARRAY,
//   // });

//   const FOOTER_TOP = A5_PAGE_HEIGHT - CONTENT_PAGE_FOOTER_HEIGHT;

//   const Y0 = Y_POSITIONS_OF_QUESTION_ARRAY[0];
//   const Y1 = Y_POSITIONS_OF_QUESTION_ARRAY[1];
//   const Y2 = Y_POSITIONS_OF_QUESTION_ARRAY[2];
//   const Y3 = Y_POSITIONS_OF_QUESTION_ARRAY[3];
//   const Y4 = Y_POSITIONS_OF_QUESTION_ARRAY[4];

//   // 计算正文每页内容
//   for (let loop_of_day = 0; loop_of_day < DAY_COUNT; ++loop_of_day) {
//     const CURRENT_DATE = new Date(
//       YEAR_OF_START_DATE,
//       MONTH_OF_START_DATE,
//       DATE_OF_START_DATE + loop_of_day,
//     );
//     // const CURRENT_DATE_FLAG = `${CURRENT_DATE.getFullYear()}年${
//     //   CURRENT_DATE.getMonth() + 1
//     // }月${CURRENT_DATE.getDate()}日`;
//     const CURRENT_DATE_FLAG = `${
//       CURRENT_DATE.getMonth() + 1
//     }月${CURRENT_DATE.getDate()}日`;

//     const CURRENT_DATE_ORAL_QUESTIONS = ORAL_QUESTION_ARRAY.slice(
//       loop_of_day * COUNT_ORAL_QUESTION_COUNT_PER_PAGE,
//       (loop_of_day + 1) * COUNT_ORAL_QUESTION_COUNT_PER_PAGE,
//     );
//     const CURRENT_DATE_VERTICAL_QUESTIONS = VERTICAL_QUESTION_ARRAY.slice(
//       loop_of_day * COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE,
//       (loop_of_day + 1) * COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE,
//     );
//     const CURRENT_DATE_OFF_THE_SHELF_QUESTIONS = OFF_THE_SHELF_QUESTION_ARRAY
//       .slice(
//         loop_of_day * COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE,
//         (loop_of_day + 1) * COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE,
//       );
//     // console.log({ CURRENT_DATE_ORAL_QUESTIONS });

//     // 如使用这句，将生成从后向前翻页的小册子
//     // const IS_LEFT_PAGE =
//     //   REMOVE_COVER ^
//     //   (IS_ODD_PAGE_OF_FIRST_CONTENT_PAGE ? loop_of_day % 2 === 1 : loop_of_day % 2 === 0);
//     const IS_LEFT_PAGE = IS_ODD_PAGE_OF_FIRST_CONTENT_PAGE
//       ? loop_of_day % 2 === 1
//       : loop_of_day % 2 === 0;
//     const CURRENT_PAGE_SVG_G_START = IS_LEFT_PAGE
//       ? LEFT_A5_PAGE_SVG_START
//       : RIGHT_A5_PAGE_SVG_START;

//     // const CURRENT_PAGE_CONTENT_SUBJECT = `<text class="center middle" x="${CONTENT_PAGE_SUBJECT_X}mm" y="${CONTENT_PAGE_SUBJECT_Y}mm" style="width:${A5_PAGE_WIDTH}mm;height:${CONTENT_PAGE_SUBJECT_HEIGHT}mm;font-size:${CONTENT_PAGE_SUBJECT_FONT_SIZE}mm;">${CURRENT_DATE_FLAG}</text>`;

//     const CURRENT_PAGE_CONTENT_SUBJECT = IS_LEFT_PAGE
//       ? `<text class="left top" x="0mm" y="${CONTENT_PAGE_SUBJECT_Y}mm" style="width:${A5_PAGE_WIDTH}mm;height:${CONTENT_PAGE_SUBJECT_HEIGHT}mm;font-size:${CONTENT_PAGE_SUBJECT_FONT_SIZE}mm;">${CURRENT_DATE_FLAG}</text>`
//       : `<text class="right top" x="${A5_PAGE_WIDTH}mm" y="${CONTENT_PAGE_SUBJECT_Y}mm" style="width:${A5_PAGE_WIDTH}mm;height:${CONTENT_PAGE_SUBJECT_HEIGHT}mm;font-size:${CONTENT_PAGE_SUBJECT_FONT_SIZE}mm;">${CURRENT_DATE_FLAG}</text>`;

//     const PAGE_NO = loop_of_day + 1;
//     const CURRENT_PAGE_CONTENT_PAGE_NO = IS_LEFT_PAGE
//       ? `<text class="left top" x="0mm" y="${FOOTER_TOP}mm" style="font-size:${CONTENT_PAGE_FOOTER_FONT_SIZE}mm;">${PAGE_NO}</text>`
//       : `<text class="right top" x="${A5_PAGE_WIDTH}mm" y="${FOOTER_TOP}mm" style="font-size:${CONTENT_PAGE_FOOTER_FONT_SIZE}mm;">${PAGE_NO}</text>`;

//     QUESTION_TEXT_PAGE_CONTENT_ARRAY.push(
//       `${CURRENT_PAGE_SVG_G_START}
//               ${CURRENT_PAGE_CONTENT_SUBJECT}
//               ${CURRENT_PAGE_CONTENT_PAGE_NO}
//               ${
//         IS_LEFT_PAGE
//           ? `<text class="right top" x="${A5_PAGE_WIDTH}mm" y="${FOOTER_TOP}mm" style="font-size:${CONTENT_PAGE_FOOTER_FONT_SIZE}mm;">${QUESTION_PAGE_FOOTER_TEXT}</text>`
//           : `<text class="left top" x="0mm" y="${FOOTER_TOP}mm" style="font-size:${CONTENT_PAGE_FOOTER_FONT_SIZE}mm;">${QUESTION_PAGE_FOOTER_TEXT}</text>`
//       }

//               // 口算4题 Y0左右，Y1左右
//               <g style="transform:translate(0mm, ${Y0}mm);">${
//         CURRENT_DATE_ORAL_QUESTIONS[0].questionHtml
//       }</g>
//                     <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y0}mm);">${
//         CURRENT_DATE_ORAL_QUESTIONS[1].questionHtml
//       }</g>
//                     <g style="transform:translate(0mm, ${Y1}mm);">${
//         CURRENT_DATE_ORAL_QUESTIONS[2].questionHtml
//       }</g>
//                     <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y1}mm);">${
//         CURRENT_DATE_ORAL_QUESTIONS[3].questionHtml
//       }</g>


//               // 竖式 Y2左右, Y3左
//               <g style="transform:translate(0mm, ${Y2}mm);">${
//         CURRENT_DATE_VERTICAL_QUESTIONS[0].questionHtml
//       }</g>
//                     <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y2}mm);">${
//         CURRENT_DATE_VERTICAL_QUESTIONS[1].questionHtml
//       }</g>
//                     <g style="transform:translate(0mm, ${Y3}mm);">${
//         CURRENT_DATE_VERTICAL_QUESTIONS[2].questionHtml
//       }</g>

//               // 脱式 Y3右, Y4左右
//               <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y3}mm);">${
//         CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[0].questionHtml
//       }</g>
//                     <g style="transform:translate(0mm, ${Y4}mm);">${
//         CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[1].questionHtml
//       }</g>
//                     <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y4}mm);">${
//         CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[2].questionHtml
//       }</g>

//               ${BORDER_LINE_HTML}
//               ${SEPERATOR_LINE_HTML}

//               ${A5_PAGE_SVG_END}`,
//     );
//     ANSWER_TEXT_PAGE_CONTENT_ARRAY.push(
//       `${CURRENT_PAGE_SVG_G_START}
//               ${CURRENT_PAGE_CONTENT_SUBJECT}
//               ${CURRENT_PAGE_CONTENT_PAGE_NO}
//               ${
//         IS_LEFT_PAGE
//           ? `<text class="right top" x="${A5_PAGE_WIDTH}mm" y="${FOOTER_TOP}mm" style="font-size:${CONTENT_PAGE_FOOTER_FONT_SIZE}mm;">${ANSWER_PAGE_FOOTER_TEXT}</text>`
//           : `<text class="left top" x="0mm" y="${FOOTER_TOP}mm" style="font-size:${CONTENT_PAGE_FOOTER_FONT_SIZE}mm;">${ANSWER_PAGE_FOOTER_TEXT}</text>`
//       }

//               // 口算4题 Y0左右，Y1左右
//               <g style="transform:translate(0mm, ${Y0}mm);">${
//         CURRENT_DATE_ORAL_QUESTIONS[0].answerHtml
//       }</g>
//               <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y0}mm);">${
//         CURRENT_DATE_ORAL_QUESTIONS[1].answerHtml
//       }</g>
//               <g style="transform:translate(0mm, ${Y1}mm);">${
//         CURRENT_DATE_ORAL_QUESTIONS[2].answerHtml
//       }</g>
//               <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y1}mm);">${
//         CURRENT_DATE_ORAL_QUESTIONS[3].answerHtml
//       }</g>

//               // 竖式 Y2左右, Y3左
//               <g style="transform:translate(0mm, ${Y2}mm);">${
//         CURRENT_DATE_VERTICAL_QUESTIONS[0].answerHtml
//       }</g>
//               <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y2}mm);">${
//         CURRENT_DATE_VERTICAL_QUESTIONS[1].answerHtml
//       }</g>
//               <g style="transform:translate(0mm, ${Y3}mm);">${
//         CURRENT_DATE_VERTICAL_QUESTIONS[2].answerHtml
//       }</g>

//               // 脱式 Y3右, Y4左右
//               <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y3}mm);">${
//         CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[0].answerHtml
//       }</g>
//               <g style="transform:translate(0mm, ${Y4}mm);">${
//         CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[1].answerHtml
//       }</g>
//               <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y4}mm);">${
//         CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[2].answerHtml
//       }</g>

//               ${BORDER_LINE_HTML}
//               ${SEPERATOR_LINE_HTML}

//               ${A5_PAGE_SVG_END}`,
//     );
//   }

//   return window;
// }

// function fillPageContents() {
//   const {
//     QUESTION_PAGE_CONTENT_ARRAY,
//     ANSWER_PAGE_CONTENT_ARRAY,
//     QUESTION_COVER_PAGE_CONTENT,
//     ANSWER_COVER_PAGE_CONTENT,
//     QUESTION_TEXT_PAGE_CONTENT_ARRAY,
//     ANSWER_TEXT_PAGE_CONTENT_ARRAY,
//     COVER_CONTENT_X,
//     COVER_CONTENT_Y,
//     A5_PAGE_WIDTH,
//     A5_PAGE_HEIGHT,
//     COVER_PAGE_SUBJECT_FONT_SIZE,
//     A5_PAGE_SVG_END,
//     LEFT_A5_PAGE_SVG_START,
//     RIGHT_A5_PAGE_SVG_START,
//     EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK,
//     COVER_CONTENT_VERTICAL_ALIGN,

//     DAY_COUNT,
//     REMOVE_COVER,
//     IS_NO_TRIM,
//   } = DATA;

//   if (!REMOVE_COVER) {
//     QUESTION_PAGE_CONTENT_ARRAY.push(QUESTION_COVER_PAGE_CONTENT);
//     ANSWER_PAGE_CONTENT_ARRAY.push(ANSWER_COVER_PAGE_CONTENT);
//   }
//   QUESTION_TEXT_PAGE_CONTENT_ARRAY.forEach((page_content) => {
//     QUESTION_PAGE_CONTENT_ARRAY.push(page_content);
//   });
//   ANSWER_TEXT_PAGE_CONTENT_ARRAY.forEach((page_content) => {
//     ANSWER_PAGE_CONTENT_ARRAY.push(page_content);
//   });

//   // 算法简化版
//   const QUESTION_PAGE_CONTENT = "";
//   const ANSWER_PAGE_CONTENT = "";
//   if (REMOVE_COVER) {
//     if (DAY_COUNT < 4 || IS_NO_TRIM) {
//       // 不足4天或不裁切时，必定追加空白页
//       EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.forEach((empty_page_index) => {
//         QUESTION_PAGE_CONTENT_ARRAY.push(QUESTION_PAGE_CONTENT);
//         ANSWER_PAGE_CONTENT_ARRAY.push(ANSWER_PAGE_CONTENT);
//       });
//     } else {
//       EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.forEach((empty_page_index, index) => {
//         QUESTION_PAGE_CONTENT_ARRAY.splice(
//           empty_page_index,
//           0,
//           QUESTION_PAGE_CONTENT,
//         );
//         ANSWER_PAGE_CONTENT_ARRAY.splice(
//           empty_page_index,
//           0,
//           ANSWER_PAGE_CONTENT,
//         );
//       });
//     }
//   } else {
//     EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.forEach((empty_page_index, index) => {
//       // const IS_BACK_COVER = index === 2;
//       const IS_PUSH = DAY_COUNT > 1 && index > 0;
//       // const CURRENT_A5_PAGE_SVG_START =
//       //   index % 2 === 0 ? LEFT_A5_PAGE_SVG_START : RIGHT_A5_PAGE_SVG_START;

//       if (IS_PUSH) {
//         QUESTION_PAGE_CONTENT_ARRAY.push(QUESTION_PAGE_CONTENT);
//         ANSWER_PAGE_CONTENT_ARRAY.push(ANSWER_PAGE_CONTENT);
//       } else {
//         QUESTION_PAGE_CONTENT_ARRAY.splice(
//           empty_page_index,
//           0,
//           QUESTION_PAGE_CONTENT,
//         );
//         ANSWER_PAGE_CONTENT_ARRAY.splice(
//           empty_page_index,
//           0,
//           ANSWER_PAGE_CONTENT,
//         );
//       }
//     });
//   }

//   return window;
// }

// function getBodyHtml() {
//   const {
//     PAPER_COUNT,
//     IS_NO_TRIM,
//     A5_PAGE_MAX_INDEX,
//     QUESTION_PAGE_CONTENT_ARRAY,
//     ANSWER_PAGE_CONTENT_ARRAY,
//   } = DATA;

//   let html_question = "";
//   let html_answer = "";

//   // 计算每张A4纸的内容，合并为两个A5小册子——每页正反面各一个svg，于svg内自动补充页眉页脚
//   // EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK
//   for (let loop_of_paper = 0; loop_of_paper < PAPER_COUNT; ++loop_of_paper) {
//     const PAGE_INDEX_START = IS_NO_TRIM ? loop_of_paper * 4 : loop_of_paper * 2;
//     const PAGE_INDEX_END = IS_NO_TRIM
//       ? PAGE_INDEX_START + 3
//       : A5_PAGE_MAX_INDEX - PAGE_INDEX_START;
//     const PAGE_INDEX_1 = PAGE_INDEX_START + 0;
//     const PAGE_INDEX_2 = PAGE_INDEX_START + 1;
//     const PAGE_INDEX_3 = PAGE_INDEX_END - 1;
//     const PAGE_INDEX_4 = PAGE_INDEX_END;

//     const QUESTION_PAGE_CONTENT_1 = QUESTION_PAGE_CONTENT_ARRAY[PAGE_INDEX_1];
//     const QUESTION_PAGE_CONTENT_2 = QUESTION_PAGE_CONTENT_ARRAY[PAGE_INDEX_2];
//     const QUESTION_PAGE_CONTENT_3 = QUESTION_PAGE_CONTENT_ARRAY[PAGE_INDEX_3];
//     const QUESTION_PAGE_CONTENT_4 = QUESTION_PAGE_CONTENT_ARRAY[PAGE_INDEX_4];

//     const ANSWER_PAGE_CONTENT_1 = ANSWER_PAGE_CONTENT_ARRAY[PAGE_INDEX_1];
//     const ANSWER_PAGE_CONTENT_2 = ANSWER_PAGE_CONTENT_ARRAY[PAGE_INDEX_2];
//     const ANSWER_PAGE_CONTENT_3 = ANSWER_PAGE_CONTENT_ARRAY[PAGE_INDEX_3];
//     const ANSWER_PAGE_CONTENT_4 = ANSWER_PAGE_CONTENT_ARRAY[PAGE_INDEX_4];

//     const PAGE_CONTENT_HTML_START =
//       '<page><svg xmlns="http://www.w3.org/2000/svg">';
//     const PAGE_CONTENT_HTML_END = "</svg></page>";
//     const QUESTION_PAGE_CONTENT = `
//               ${PAGE_CONTENT_HTML_START}
//                 ${QUESTION_PAGE_CONTENT_4}
//                 ${QUESTION_PAGE_CONTENT_1}
//               ${PAGE_CONTENT_HTML_END}

//               ${PAGE_CONTENT_HTML_START}
//                 ${QUESTION_PAGE_CONTENT_2}
//                 ${QUESTION_PAGE_CONTENT_3}
//               ${PAGE_CONTENT_HTML_END}
//             `;
//     const ANSWER_PAGE_CONTENT = `
//               ${PAGE_CONTENT_HTML_START}
//                 ${ANSWER_PAGE_CONTENT_4}
//                 ${ANSWER_PAGE_CONTENT_1}
//               ${PAGE_CONTENT_HTML_END}

//               ${PAGE_CONTENT_HTML_START}
//                 ${ANSWER_PAGE_CONTENT_2}
//                 ${ANSWER_PAGE_CONTENT_3}
//               ${PAGE_CONTENT_HTML_END}
//             `;

//     html_question = html_question.concat(QUESTION_PAGE_CONTENT);
//     html_answer = html_answer.concat(ANSWER_PAGE_CONTENT);
//   }

//   return html_question.concat(html_answer);
// }

// function main() {
//   parseUrl();
//   countPageCount();
//   countPositionAndSize();
//   countCoverPageContent();
//   fillContentPageContents();
//   fillPageContents();

//   document.getElementsByTagName("body")[0].innerHTML = getBodyHtml();

//   // window.print();
// }

// window.onload = main;
