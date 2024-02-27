// ①②③④⑤⑥⑦⑧⑨⑩
// const DEBUGGGING = true;
const DEBUGGGING = false;
const MIN_OF_SUBTRAHEND = 11;

const QuestionCategoryType = {
    Oral: 0,
    Vertical: 1,
    OffTheShelf: 2,
};

const LineCountMethodType = {
    LeftToRight: 0, // A+B+C
    RightToLeft: 1, // A+B*C
    LeftToRightByBrackets: 2, // (A+B)*C
    RightToLeftByBrackets: 3, // A*(B+C)
};

const DATA = Object.assign({
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
    VERTICAL_QUESTION_AREA_HEIGHT: 55.5, // 原来是45，现在调大些——可以在后续代码中动态增减
    OFF_THE_SHELF_QUESTION_AREA_HEIGHT: 8 * 3, // 原来是45，现在调小为QUESTION_ROW_HEIGHT * 3

    QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH: 40,

    CONTENT_PAGE_CONTENT_FONT_SIZE: 3.5,
    CHAR_WIDTH: 3.5 * 0.7, // CONTENT_PAGE_CONTENT_FONT_SIZE * 0.7

    CONTENT_PAGE_CONTENT_CHAR_WIDTH: 3.5 * 0.05, // 0.05,
    // CONTENT_PAGE_CONTENT_CHAR_WIDTH: 3.5 * 0.6, // tspan使用x而非dx时，原本右对齐的内容变成了左对齐

    // OFF_THE_SHELF_QUESTION_START_POSITION_SCALE: 2.15,

    OFF_THE_SHELF_LINE_STROKE_COLOR: '#000000',
    OFF_THE_SHELF_LINE_STROKE_WIDTH: '0.1',
    OFF_THE_SHELF_QUESTION_X: 3.5 * 2.15, // 3,

    BLUE_VERTIAL_LINE_STROKE_COLOR: '#008800',
    VERTIAL_LINE_STROKE_COLOR: '#000000',
    VERTIAL_LINE_STROKE_WIDTH: '0.1',
    VERTIAL_LINE_Y_MARGIN_TOP: 3,

    SECONDARY_NUMBER_COLOR: '#ff0000',
    SECONDARY_NUMBER_FONT_SIZE: 2,

    COVER_CONTENT_VERTICAL_ALIGN: 'middle', // top
    COVER_PAGE_SUBJECT_ROW_HEIGHT_EM: 1.4,

    BORDER_LINE_STROKE_COLOR: '#888888',
    BORDER_LINE_STROKE_WIDTH: '0.1',

    SEPERATOR_LINE_STROKE_COLOR: '#aaaaaa',
    SEPERATOR_LINE_STROKE_WIDTH: '0.1',
}, COVER_INFO);

// 已去掉：1, 2, 3, 5, 7
// 4, 9
// 6, 8
const A_TIMES_B_VALUE_ARRAY = [
    // // 1
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
        Two: 2,
    },
    // 9
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
        Two: 3,
    },
    // 6
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
        Two: 3,
    },
    {
        Value: 6,
        One: 3,
        Two: 2,
    },
    // 8
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
        Two: 4,
    },
    {
        Value: 8,
        One: 4,
        Two: 2,
    },
];
const A_TIMES_B_VALUE_COUNT = A_TIMES_B_VALUE_ARRAY.length;

// const SPACE_40 = ' '.repeat(40); // '                                        ';

// grade2_term2_summer_holiday.htm?start=20230703&end=20230830&left=10&right=10&top=15&bottom=20&notrim=true&removeCover=false&oralMax=100&verticalMax=200&offTheShelfMax=100

// 安启电脑 grade2_term2_summer_holiday.htm?start=20230703&end=20230830&left=4&right=4&top=4&bottom=4&notrim=true&removeCover=false&oralMax=200&verticalMax=1000&offTheShelfMax=200

// 测试 grade2_term2_summer_holiday.htm?start=20230703&end=20230830&left=4&right=4&top=4&bottom=4&notrim=true&removeCover=false&oralMax=100&verticalMax=200&offTheShelfMax=100

function parseUrl() {
    const DEFAULT_MARGIN_LEFT = 10; // 单位：毫米
    const DEFAULT_MARGIN_RIGHT = 10; // 单位：毫米
    const DEFAULT_MARGIN_TOP = 15; // 单位：毫米
    const DEFAULT_MARGIN_BOTTOM = 20; // 单位：毫米
    const DEFAULT_NO_TRIM = true; // true表示不用裁切，每张A4纸四页为连续页，4-1-2-3, 8-5-6-7；false表示需裁切但无需装订，60-1-2-59, 58-3-4-57这样的页序
    const DEFAULT_REMOVE_COVER = false;
    const DEFAULT_ORAL_MAX = 100;
    const DEFAULT_VERTICAL_MAX = 200;
    const DEFAULT_OFF_THE_SHELF_MAX = 100;

    // <解析页面参数>
    const URL = window.location.href.replace('?', '&');

    // start=20230703&end=20230830
    const INPUT_START_DATE = decodeURI(
        URL.concat(`&start=${DEFAULT_START_DATE}`)
        .replace('&start=', '厶')
        .split('厶')[1]
        .split('&')[0],
    );
    const INPUT_END_DATE = decodeURI(
        URL.concat(`&end=${DEFAULT_END_DATE}`)
        .replace('&end=', '厶')
        .split('厶')[1]
        .split('&')[0],
    );
    // console.log({
    //     DEFAULT_START_DATE,
    //     DEFAULT_END_DATE,
    //     INPUT_START_DATE,
    //     INPUT_END_DATE
    // });

    // left=3&right=3&top=3&bottom=3
    const MARGIN_LEFT = Math.max(
        0,
        parseInt(
            URL.concat(`&left=${DEFAULT_MARGIN_LEFT}`)
            .replace('&left=', '厶')
            .split('厶')[1]
            .split('&')[0],
            10,
        ),
    );
    const MARGIN_RIGHT = Math.max(
        0,
        parseInt(
            URL.concat(`&right=${DEFAULT_MARGIN_RIGHT}`)
            .replace('&right=', '厶')
            .split('厶')[1]
            .split('&')[0],
            10,
        ),
    );
    const MARGIN_TOP = Math.max(
        0,
        parseInt(
            URL.concat(`&top=${DEFAULT_MARGIN_TOP}`)
            .replace('&top=', '厶')
            .split('厶')[1]
            .split('&')[0],
            10,
        ),
    );
    const MARGIN_BOTTOM = Math.max(
        0,
        parseInt(
            URL.concat(`&bottom=${DEFAULT_MARGIN_BOTTOM}`)
            .replace('&bottom=', '厶')
            .split('厶')[1]
            .split('&')[0],
            10,
        ),
    );

    // notrim=true
    const IS_NO_TRIM =
        URL.concat(`&notrim=${DEFAULT_NO_TRIM}`)
        .replace('&notrim=', '厶')
        .split('厶')[1]
        .split('&')[0] === 'true';

    // &removeCover=false&oralMax=100&verticalMax=200&offTheShelfMax=100
    const REMOVE_COVER =
        URL.concat(`&removeCover=${DEFAULT_REMOVE_COVER}`)
        .replace('&removeCover=', '厶')
        .split('厶')[1]
        .split('&')[0] === 'true';
    // console.log(REMOVE_COVER);
    const ORAL_MAX = Math.max(
        MIN_OF_MAX_VALUE,
        parseInt(
            URL.concat(`&oralMax=${DEFAULT_ORAL_MAX}`)
            .replace('&oralMax=', '厶')
            .split('厶')[1]
            .split('&')[0],
            10,
        ),
    );
    const VERTICAL_MAX = Math.max(
        MIN_OF_MAX_VALUE,
        parseInt(
            URL.concat(`&verticalMax=${DEFAULT_VERTICAL_MAX}`)
            .replace('&verticalMax=', '厶')
            .split('厶')[1]
            .split('&')[0],
            10,
        ),
    );
    const OFF_THE_SHELF_MAX = Math.max(
        MIN_OF_MAX_VALUE,
        parseInt(
            URL.concat(`&offTheShelfMax=${DEFAULT_OFF_THE_SHELF_MAX}`)
            .replace('&offTheShelfMax=', '厶')
            .split('厶')[1]
            .split('&')[0],
            10,
        ),
    );

    // </解析页面参数>

    // <转为实际日期>
    const START_DATE = new Date(
        parseInt(INPUT_START_DATE.substring(0, 4)),
        parseInt(INPUT_START_DATE.substring(4, 6)) - 1,
        parseInt(INPUT_START_DATE.substring(6, 8)),
    );
    const END_DATE = new Date(
        parseInt(INPUT_END_DATE.substring(0, 4)),
        parseInt(INPUT_END_DATE.substring(4, 6)) - 1,
        parseInt(INPUT_END_DATE.substring(6, 8)),
    );
    const DAY_COUNT = (END_DATE - START_DATE) / 86400000 + 1;
    // </转为实际日期>

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

    document.onkeyup = function (e) {
        // alert(e.keyCode);
        switch (e.keyCode) {
            case 112: // F1，实际需其它键辅助，如Shift或Ctrl或Alt，否则会被浏览器拦截
                alert(
                    window.location.href.split('/').pop().concat(
                        `?start=${DEFAULT_START_DATE}&end=${DEFAULT_END_DATE}&left=${DEFAULT_MARGIN_RIGHT}&right=${DEFAULT_MARGIN_RIGHT}&top=${DEFAULT_MARGIN_TOP}&bottom=${DEFAULT_MARGIN_BOTTOM}&notrim=${DEFAULT_NO_TRIM}&removeCover=${DEFAULT_REMOVE_COVER}&oralMax=${ORAL_MAX}&verticalMax=${VERTICAL_MAX}&offTheShelfMax=${OFF_THE_SHELF_MAX}`
                    ),
                );
                e.preventDefault();
                e.stopPropagation();
                break;
            default:
                break;
        }

        return false;
    };

    return window;
}

function countPageCount() {
    const {
        DAY_COUNT,
        IS_NO_TRIM,
        REMOVE_COVER
    } = DATA;

    // 计算题目本、答案本各需多少张A4纸
    const PAPER_COUNT = Math.ceil((DAY_COUNT + (REMOVE_COVER ? 0 : 1)) / 4);

    const A5_PAGE_COUNT = 4 * PAPER_COUNT;
    const A5_PAGE_MAX_INDEX = A5_PAGE_COUNT - 1;

    const EMPTY_A5_PAGE_COUNT = A5_PAGE_COUNT - (DAY_COUNT + 1);
    const EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK = [];

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

            const EMPTY_PAGE_END_INDEX = IS_NO_TRIM ? A5_PAGE_MAX_INDEX : 3;
            for (let i = 0; i < EMPTY_A5_PAGE_COUNT; ++i) {
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
    const {
        MARGIN_LEFT,
        MARGIN_RIGHT,
        MARGIN_TOP,
        MARGIN_BOTTOM,
        HORIZONTAL_SPACE,
        DEFAULT_MARGIN_TOP,
        DEFAULT_MARGIN_BOTTOM,
        DEFAULT_MARGIN_LEFT,
        DEFAULT_MARGIN_RIGHT,

        CONTENT_PAGE_FOOTER_HEIGHT,
        COVER_PAGE_SUBJECT_FONT_SIZE,
        ANSWER_COVER_PAGE_SUBJECT_TEXT,
        COVER_PAGE_SUBJECT_ROW_HEIGHT_EM,
    } = DATA;
    const A5_PAGE_WIDTH = (297 - MARGIN_LEFT - MARGIN_RIGHT - HORIZONTAL_SPACE) / 2;
    const A5_PAGE_HEIGHT = 210 - MARGIN_TOP - MARGIN_BOTTOM;

    const LEFT_A5_PAGE_LEFT = MARGIN_LEFT;
    const RIGHT_A5_PAGE_LEFT = 297 - MARGIN_RIGHT - A5_PAGE_WIDTH;

    const A5_PAGE_WIDTH_HALF = A5_PAGE_WIDTH * 0.5;
    const A5_PAGE_HEIGHT_HALF = A5_PAGE_HEIGHT * 0.5;

    const LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG1 = '<g style="transform:translate(';
    const LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG2 = `mm, ${MARGIN_TOP}mm);width:${A5_PAGE_WIDTH}mm;height:${A5_PAGE_HEIGHT}mm;">`;

    const LEFT_A5_PAGE_SVG_START = `${LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG1}${LEFT_A5_PAGE_LEFT}${LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG2}`;
    const RIGHT_A5_PAGE_SVG_START = `${LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG1}${RIGHT_A5_PAGE_LEFT}${LEFT_OR_RIGHT_A5_PAGE_SVG_START_SEG2}`;

    const COVER_CONTENT_X = A5_PAGE_WIDTH_HALF;
    // const COVER_CONTENT_Y = 0; // A5_PAGE_HEIGHT_HALF;
    // const COVER_CONTENT_Y = COVER_PAGE_SUBJECT_FONT_SIZE * 2; // A5_PAGE_HEIGHT_HALF; // 0;
    const COVER_CONTENT_Y =
        A5_PAGE_HEIGHT_HALF -
        COVER_PAGE_SUBJECT_FONT_SIZE *
        ANSWER_COVER_PAGE_SUBJECT_TEXT.length *
        COVER_PAGE_SUBJECT_ROW_HEIGHT_EM *
        0.5; // A5_PAGE_HEIGHT_HALF;

    const {
        Y_POSITIONS_OF_QUESTION_ARRAY,
        CONTENT_PAGE_SUBJECT_Y,
        CONTENT_PAGE_SUBJECT_HEIGHT,

        QUESTION_ROW_HEIGHT,
        A5_PAGE_TOP_PADDING,
        ORAL_QUESTION_AREA_BOTTOM_MARGIN,
        VERTICAL_QUESTION_AREA_HEIGHT,
        OFF_THE_SHELF_QUESTION_AREA_HEIGHT,

        COUNT_ORAL_QUESTION_COUNT_PER_PAGE,
        COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE,
        COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE,
    } = DATA;

    let y = CONTENT_PAGE_SUBJECT_Y + CONTENT_PAGE_SUBJECT_HEIGHT + A5_PAGE_TOP_PADDING;
    Y_POSITIONS_OF_QUESTION_ARRAY.push(y);

    const ORAL_QUESTION_AREA_HEIGHT = QUESTION_ROW_HEIGHT + ORAL_QUESTION_AREA_BOTTOM_MARGIN;
    const ORAL_QUESTION_AREA_ROW_COUNT = Math.floor(COUNT_ORAL_QUESTION_COUNT_PER_PAGE / 2);
    for (let loopOfOral = 0; loopOfOral < ORAL_QUESTION_AREA_ROW_COUNT; ++loopOfOral) {
        y += ORAL_QUESTION_AREA_HEIGHT;
        Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
    }

    const VERTICAL_QUESTION_AREA_ROW_COUNT = Math.floor(
        COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE / 2,
    );
    for (
        let loopOfVertical = 0; loopOfVertical < VERTICAL_QUESTION_AREA_ROW_COUNT;
        ++loopOfVertical
    ) {
        y += VERTICAL_QUESTION_AREA_HEIGHT;
        Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
    }

    if (COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE % 2 === 1) {
        y += Math.max(VERTICAL_QUESTION_AREA_HEIGHT, OFF_THE_SHELF_QUESTION_AREA_HEIGHT);
        Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
    }

    const FIX_COUNT = COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE % 2 === 1 ? 1 : 0;
    const OFF_THE_SHELF_QUESTION_AREA_ROW_COUNT =
        Math.ceil((COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE - FIX_COUNT) / 2) - 1;
    for (
        let loopOfOffTheShelf = 0; loopOfOffTheShelf < OFF_THE_SHELF_QUESTION_AREA_ROW_COUNT;
        ++loopOfOffTheShelf
    ) {
        y += OFF_THE_SHELF_QUESTION_AREA_HEIGHT;
        Y_POSITIONS_OF_QUESTION_ARRAY.push(y);
    }
    // console.log({ Y_POSITIONS_OF_QUESTION_ARRAY });

    const OFF_THE_SHELF_LINE_Y = QUESTION_ROW_HEIGHT * 0.8;
    // 这里借用ORAL_QUESTION_AREA_HEIGHT（因脱式区域采用与口算题目区同样的行高，就不再定义相关常量了）
    const OFF_THE_SHELF_SECOND_ROW_Y =
        ORAL_QUESTION_AREA_HEIGHT + ORAL_QUESTION_AREA_BOTTOM_MARGIN;
    const OFF_THE_SHELF_THIRD_ROW_Y = OFF_THE_SHELF_SECOND_ROW_Y + QUESTION_ROW_HEIGHT;

    DATA.A5_PAGE_WIDTH = A5_PAGE_WIDTH;
    DATA.A5_PAGE_HEIGHT = A5_PAGE_HEIGHT;
    DATA.A5_PAGE_WIDTH_HALF = A5_PAGE_WIDTH_HALF;
    DATA.LEFT_A5_PAGE_SVG_START = LEFT_A5_PAGE_SVG_START;
    DATA.RIGHT_A5_PAGE_SVG_START = RIGHT_A5_PAGE_SVG_START;
    DATA.COVER_CONTENT_X = COVER_CONTENT_X;
    DATA.COVER_CONTENT_Y = COVER_CONTENT_Y;

    DATA.OFF_THE_SHELF_LINE_Y = OFF_THE_SHELF_LINE_Y;
    DATA.OFF_THE_SHELF_SECOND_ROW_Y = OFF_THE_SHELF_SECOND_ROW_Y;
    DATA.OFF_THE_SHELF_THIRD_ROW_Y = OFF_THE_SHELF_THIRD_ROW_Y;

    // 修正VERTICAL_QUESTION_AREA_HEIGHT
    if (MARGIN_TOP !== DEFAULT_MARGIN_TOP || MARGIN_BOTTOM !== DEFAULT_MARGIN_BOTTOM) {
        DATA.VERTICAL_QUESTION_AREA_HEIGHT +=
            (DEFAULT_MARGIN_TOP - MARGIN_TOP + (DEFAULT_MARGIN_BOTTOM - MARGIN_BOTTOM)) / 2;
    }

    // 修正QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH
    if (MARGIN_LEFT !== DEFAULT_MARGIN_LEFT || MARGIN_RIGHT !== DEFAULT_MARGIN_RIGHT) {
        DATA.QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH +=
            (DEFAULT_MARGIN_LEFT + DEFAULT_MARGIN_RIGHT - MARGIN_LEFT - MARGIN_RIGHT) / 2;
        // console.log({
        //   DEFAULT_MARGIN_LEFT,
        //   DEFAULT_MARGIN_RIGHT,
        //   MARGIN_LEFT,
        //   MARGIN_RIGHT,
        //   diff: DEFAULT_MARGIN_LEFT + DEFAULT_MARGIN_RIGHT - MARGIN_LEFT - MARGIN_RIGHT,
        // });
    }

    const STEP_ROW_SPACE = QUESTION_ROW_HEIGHT; // + ORAL_QUESTION_AREA_BOTTOM_MARGIN;
    DATA.STEP_ROW_SPACE = STEP_ROW_SPACE;

    DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN = A5_PAGE_WIDTH_HALF * 0.5;
    DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION1 = A5_PAGE_WIDTH_HALF * 0.25;
    // DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION2 = A5_PAGE_WIDTH_HALF * 0.75;
    // DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION1 = A5_PAGE_WIDTH_HALF * 0.2;
    DATA.VERTIAL_QUESTION_STEP_CENTER_POSITION2 = A5_PAGE_WIDTH_HALF * 0.8;

    const VERTICAL_QUESTION_AREA_HEIGHT_HALF = DATA.VERTICAL_QUESTION_AREA_HEIGHT * 0.5;
    DATA.VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN =
        VERTICAL_QUESTION_AREA_HEIGHT_HALF + STEP_ROW_SPACE * 5 * 0.5;
    DATA.VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN =
        VERTICAL_QUESTION_AREA_HEIGHT_HALF + STEP_ROW_SPACE * 4 * 0.5;
    // console.log({
    //   VERTICAL_QUESTION_AREA_HEIGHT_HALF,
    //   VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN: DATA.VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN,
    //   VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN: DATA.VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN,
    // });

    const MM_TO_PX_SCALE = getMmToPxScale();
    DATA.MM_TO_PX_SCALE = MM_TO_PX_SCALE;

    const BIG_RADIUS_PX = MM_TO_PX_SCALE * QUESTION_ROW_HEIGHT;
    const SMALL_RADIUS_PX = MM_TO_PX_SCALE * DATA.CHAR_WIDTH;
    // DATA.DIVISION_PATH_HTML = `a ${BIG_RADIUS_PX} ${SMALL_RADIUS_PX} 0 0 1 ${BIG_RADIUS_PX},${SMALL_RADIUS_PX}`;
    // DATA.DIVISION_PATH_HTML = `a ${BIG_RADIUS_PX} ${SMALL_RADIUS_PX} 0 0 1 ${BIG_RADIUS_PX}, ${SMALL_RADIUS_PX}`;
    DATA.DIVISION_PATH_HTML = `a -${SMALL_RADIUS_PX} ${BIG_RADIUS_PX} 0 0 1 -${SMALL_RADIUS_PX}, ${BIG_RADIUS_PX}`;

    const {
        BORDER_LINE_STROKE_COLOR,
        BORDER_LINE_STROKE_WIDTH,

        SEPERATOR_LINE_STROKE_COLOR,
        SEPERATOR_LINE_STROKE_WIDTH,
    } = DATA;

    const TOP_BORDER_LINE_Y = CONTENT_PAGE_SUBJECT_HEIGHT;
    const BOTTOM_BORDER_LINE_Y = A5_PAGE_HEIGHT - CONTENT_PAGE_FOOTER_HEIGHT * 1.2;
    const BORDER_LINE_LEFT = 0;
    const BORDER_LINE_RIGHT = A5_PAGE_WIDTH;

    DATA.BORDER_LINE_HTML = `<line
        x1="${BORDER_LINE_LEFT}mm"
        y1="${TOP_BORDER_LINE_Y}mm"
        x2="${BORDER_LINE_RIGHT}mm"
        y2="${TOP_BORDER_LINE_Y}mm"
        stroke="${BORDER_LINE_STROKE_COLOR}"
        stroke-width="${BORDER_LINE_STROKE_WIDTH}mm"
      /><line
        x1="${BORDER_LINE_LEFT}mm"
        y1="${BOTTOM_BORDER_LINE_Y}mm"
        x2="${BORDER_LINE_RIGHT}mm"
        y2="${BOTTOM_BORDER_LINE_Y}mm"
        stroke="${BORDER_LINE_STROKE_COLOR}"
        stroke-width="${BORDER_LINE_STROKE_WIDTH}mm"
      />`;

    const Y0 = Y_POSITIONS_OF_QUESTION_ARRAY[0];

    DATA.SEPERATOR_LINE_HTML = `<line
        x1="${A5_PAGE_WIDTH_HALF}mm"
        y1="${Y0}mm"
        x2="${A5_PAGE_WIDTH_HALF}mm"
        y2="${BOTTOM_BORDER_LINE_Y}mm"
        stroke="${SEPERATOR_LINE_STROKE_COLOR}"
        stroke-width="${SEPERATOR_LINE_STROKE_WIDTH}mm"
      />
      `;
    Y_POSITIONS_OF_QUESTION_ARRAY.forEach(y => {
        DATA.SEPERATOR_LINE_HTML += `<line
        x1="${0}mm"
        y1="${y}mm"
        x2="${A5_PAGE_WIDTH}mm"
        y2="${y}mm"
        stroke="${SEPERATOR_LINE_STROKE_COLOR}"
        stroke-width="${SEPERATOR_LINE_STROKE_WIDTH}mm"
      />`;
    });

    return window;
}


function countCoverPageContent() {
    if (!DATA.REMOVE_COVER) {
        const {
            RIGHT_A5_PAGE_SVG_START,
            A5_PAGE_WIDTH,
            A5_PAGE_HEIGHT,
            COVER_CONTENT_X,
            COVER_CONTENT_Y,
            COVER_PAGE_SUBJECT_FONT_SIZE,
            QUESTION_COVER_PAGE_SUBJECT_TEXT,
            ANSWER_COVER_PAGE_SUBJECT_TEXT,
            A5_PAGE_SVG_END,
            COVER_CONTENT_VERTICAL_ALIGN,
            COVER_PAGE_SUBJECT_ROW_HEIGHT_EM,
        } = DATA;
        // Error: <text> attribute transform: Expected number, "rotate(90, 66.75mm, 87.5mm)".
        // transform="rotate(90, ${COVER_CONTENT_X}mm, ${COVER_CONTENT_Y}mm)" rotate="-90"
        const COVER_PAGE_CONTENT_START = `${RIGHT_A5_PAGE_SVG_START}<text class="center ${COVER_CONTENT_VERTICAL_ALIGN}" x="${COVER_CONTENT_X}mm" y="${COVER_CONTENT_Y}mm" style="font-size:${COVER_PAGE_SUBJECT_FONT_SIZE}mm;">`;
        const COVER_PAGE_CONTENT_END = `</text>${A5_PAGE_SVG_END}`;

        const convertCoverTextToVertialHtml = content =>
            content
            .split('')
            .map(
                (char, char_index) =>
                `<tspan dx="${char_index ? `-${COVER_PAGE_SUBJECT_FONT_SIZE}mm` : 0}" dy="${char_index
                  ? `${COVER_PAGE_SUBJECT_FONT_SIZE * COVER_PAGE_SUBJECT_ROW_HEIGHT_EM}mm`
                  : 0
                }">${char}</tspan>`,
            )
            .join('');

        const QUESTION_COVER_PAGE_CONTENT = `${COVER_PAGE_CONTENT_START}${convertCoverTextToVertialHtml(
          DATA.QUESTION_COVER_PAGE_SUBJECT_TEXT,
        )}${COVER_PAGE_CONTENT_END}`;
        const ANSWER_COVER_PAGE_CONTENT = `${COVER_PAGE_CONTENT_START}${convertCoverTextToVertialHtml(
          DATA.ANSWER_COVER_PAGE_SUBJECT_TEXT,
        )}${COVER_PAGE_CONTENT_END}`;

        DATA.QUESTION_COVER_PAGE_CONTENT = QUESTION_COVER_PAGE_CONTENT;
        DATA.ANSWER_COVER_PAGE_CONTENT = ANSWER_COVER_PAGE_CONTENT;
    }

    return window;
}


function getVertialQuestionStepHtml(
    lineCountMethod,
    isOnlyOneColumn,
    operator1,
    operator2,
    a,
    b,
    c,
    middleResult,
    result,
    quotient,
    remainder,
) {
    // const IS_SUBTRACTION_1 = operator1 === '-';
    // const IS_SUBTRACTION_2 = operator2 === '-';
    const IS_DIVISION_1 = operator1 === '/';
    const IS_DIVISION_2 = operator2 === '/';

    const IS_MULTIPLY_1 = operator1 === '*';
    const IS_MULTIPLY_2 = operator2 === '*';

    const IS_LEFT_TO_RIGHT =
        lineCountMethod === LineCountMethodType.LeftToRight ||
        lineCountMethod === LineCountMethodType.LeftToRightByBrackets;
    const operand_1_1 = IS_LEFT_TO_RIGHT ? a : b;
    const operand_1_2 = IS_LEFT_TO_RIGHT ? b : c;
    // const operand_2_1 = isOnlyOneColumn ? 0 : IS_LEFT_TO_RIGHT ? middleResult : a;
    // const operand_2_1 = IS_LEFT_TO_RIGHT ? middleResult : a;
    // const operand_2_1 = IS_LEFT_TO_RIGHT ? middleResult : c;
    const operand_2_1 = IS_LEFT_TO_RIGHT ? middleResult : isOnlyOneColumn ? middleResult : a;
    const operand_2_2 = IS_LEFT_TO_RIGHT ? c : isOnlyOneColumn ? a : middleResult;

    const TRIM_RIGHT_ZERO_OPERAND_1_2 = trimRightZero(operand_1_2).length;
    const TRIM_RIGHT_ZERO_OPERAND_2_2 = trimRightZero(operand_2_2).length;
    const APPEND_ROW_COUNT_1 = (IS_MULTIPLY_1 && TRIM_RIGHT_ZERO_OPERAND_1_2 > 1) ? TRIM_RIGHT_ZERO_OPERAND_1_2 : 0;
    const APPEND_ROW_COUNT_2 = (IS_MULTIPLY_2 && TRIM_RIGHT_ZERO_OPERAND_2_2 > 1) ? TRIM_RIGHT_ZERO_OPERAND_2_2 : 0;

    // 目测当前行间空白区可放下退位减所需小圆点与借位、退位辅助数字
    // const STEP_ROW_COUNT = isOnlyOneColumn
    //   ? 5 + IS_SUBTRACTION_1
    //     ? 1
    //     : 0 + IS_SUBTRACTION_2
    //     ? 1
    //     : 0
    //   : 3 + (IS_SUBTRACTION_1 || IS_SUBTRACTION_2 ? 1 : 0);
    // const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 : IS_DIVISION_1 || IS_DIVISION_2 ? 4 : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
    // const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + (APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 > 0 ? 0.5 : 0) : IS_DIVISION_1 || IS_DIVISION_2 ? 4 : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
    // const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + (APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 > 0 ? 0.5 : 0) : IS_DIVISION_1 || IS_DIVISION_2 ? 4 + (APPEND_ROW_COUNT_1 > 1 ? APPEND_ROW_COUNT_1 : 0) : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
    // const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + 2 * (APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 > 0 ? 0.5 : 0) : IS_DIVISION_1 || IS_DIVISION_2 ? 4 + (APPEND_ROW_COUNT_1 > 1 ? APPEND_ROW_COUNT_1 : 0) : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
    // const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + 2 * (APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 > 0 ? 0.5 * APPEND_ROW_COUNT_2 : 0) : IS_DIVISION_1 || IS_DIVISION_2 ? 4 + (APPEND_ROW_COUNT_1 > 1 ? APPEND_ROW_COUNT_1 : 0) : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
    // const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + 2 * (APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 > 0 ? 0.5 * APPEND_ROW_COUNT_2 : 0) : IS_DIVISION_1 || IS_DIVISION_2 ? 4 + (APPEND_ROW_COUNT_1 > 1 ? APPEND_ROW_COUNT_1 : 0) : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
    // const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + 2 * (APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 > 0 ? ) : IS_DIVISION_1 || IS_DIVISION_2 ? 4 + (APPEND_ROW_COUNT_1 > 1 ? APPEND_ROW_COUNT_1 : 0) : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
    // const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + 2 * (APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 > 0 ? (APPEND_ROW_COUNT_2 - 0.5) : 0) : IS_DIVISION_1 || IS_DIVISION_2 ? 4 + (APPEND_ROW_COUNT_1 > 1 ? APPEND_ROW_COUNT_1 : 0) : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
    // const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + 2 * (APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2 > 0 ? (APPEND_ROW_COUNT_2 - 0.5) : 0) : IS_DIVISION_1 || IS_DIVISION_2 ? 4 + (APPEND_ROW_COUNT_1 > 1 ? APPEND_ROW_COUNT_1 : 0) : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
    // const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + 2 * (APPEND_ROW_COUNT_1 + (APPEND_ROW_COUNT_2 > 0 ? APPEND_ROW_COUNT_2 : 0)) : IS_DIVISION_1 || IS_DIVISION_2 ? 4 + (APPEND_ROW_COUNT_1 > 1 ? APPEND_ROW_COUNT_1 : 0) : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
    const STEP_ROW_COUNT = isOnlyOneColumn ? 5 + (APPEND_ROW_COUNT_1 + APPEND_ROW_COUNT_2) : IS_DIVISION_1 || IS_DIVISION_2 ? 4 + (APPEND_ROW_COUNT_1 > 1 ? APPEND_ROW_COUNT_1 : 0) : 3 + Math.max(APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);

    // if (IS_MULTIPLY_1 && IS_MULTIPLY_2) { //  && a === 54 && b === 32
    //     console.log(isOnlyOneColumn, STEP_ROW_COUNT, APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2, a, b);
    // }
    if (IS_MULTIPLY_1 && operator2 === '+') {
        console.log(a, b, c, isOnlyOneColumn, STEP_ROW_COUNT, APPEND_ROW_COUNT_1, APPEND_ROW_COUNT_2);
    }

    const ONE_COLUMN_MAX_LENGTH = isOnlyOneColumn ?
        1 +
        Math.max(
            a.toString().length,
            b.toString().length,
            c.toString().length,

            middleResult.toString().length,
            result.toString().length,
        ) :
        0;

    // 连加合一竖式
    if (operator1 === '+' && operator2 === '+') {
        return getVertialQuestionStepColumnHtmlOfPlusAndPlus(
            // ONE_COLUMN_MAX_LENGTH,
            // STEP_ROW_COUNT,
            a,
            b,
            c,
            result,
        );
    }

    return `${getVertialQuestionStepColumnHtml(
        isOnlyOneColumn,
        ONE_COLUMN_MAX_LENGTH,
        STEP_ROW_COUNT,
        0,
        operator1,
        operand_1_1,
        operand_1_2,
        middleResult,
        IS_DIVISION_1 ? middleResult : 0, // quotient,
        0, // remainder,
        // IS_MULTIPLY_2 && APPEND_ROW_COUNT_2 > 0,
        APPEND_ROW_COUNT_2 > 0,
    )}, ${getVertialQuestionStepColumnHtml(
        isOnlyOneColumn,
        ONE_COLUMN_MAX_LENGTH,
        isOnlyOneColumn ? STEP_ROW_COUNT: STEP_ROW_COUNT - APPEND_ROW_COUNT_1,
        1,
        operator2,
        operand_2_1,
        operand_2_2,
        result,
        quotient,
        remainder,
        // IS_MULTIPLY_1 && APPEND_ROW_COUNT_1 > 0,
        APPEND_ROW_COUNT_1 > 0,
    )}`;
}

function getTspanCharByChar(content, CHAR_WIDTH) {
    // return content.toString().split('').map(c => `<tspan style="display:inline-block;width:${CHAR_WIDTH * 10}mm;">${c}</tspan>`).join('');
    return content.toString().split('').map((c, i) => `<tspan dx="${CHAR_WIDTH}mm">${c}</tspan>`).join('');
}
// console.log(getTspanCharByChar(11937, 3.5));


function getTransparentTspanCharByChar(RIGHT_ZERO_COUNT, content, CHAR_WIDTH) {
    content = content.toString();
    return content.split('').map(c => `<tspan dx="${CHAR_WIDTH}mm">${c}</tspan>`).join('').concat(
        RIGHT_ZERO_COUNT > 0 ? '0'.repeat(RIGHT_ZERO_COUNT).split('').map(c => `<tspan dx="${CHAR_WIDTH}mm" style="fill:transparent;">${c}</tspan>`).join('') : ''
    );
}
// console.log(getTspanCharByChar(11937, 3.5));


function getVertialQuestionStepColumnHtmlOfPlusAndPlus(
    // ONE_COLUMN_MAX_LENGTH,
    // STEP_ROW_COUNT,
    operand1,
    operand2,
    operand3,
    result,
) {
    const STRING_OPERAND1 = operand1.toString();
    const STRING_OPERAND2 = operand2.toString();
    const STRING_OPERAND3 = operand3.toString();

    const LENGTH_OF_OPERAND1 = STRING_OPERAND1.length;
    const LENGTH_OF_OPERAND2 = STRING_OPERAND2.length;
    const LENGTH_OF_OPERAND3 = STRING_OPERAND3.length;

    // 横向依于中线进行布局（最终折算成右线），纵向依于底线进行布局
    const LENGTH_OF_RESULT = result.toString().length;
    const MAX_LENGTH = LENGTH_OF_RESULT + 2;

    const {
        VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN,
        // VERTIAL_QUESTION_STEP_CENTER_POSITION1,
        // VERTIAL_QUESTION_STEP_CENTER_POSITION2,
        VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN,
        // VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN,
        STEP_ROW_SPACE,
        CONTENT_PAGE_CONTENT_FONT_SIZE,
        CHAR_WIDTH,

        VERTIAL_LINE_STROKE_COLOR,
        VERTIAL_LINE_STROKE_WIDTH,
        VERTIAL_LINE_Y_MARGIN_TOP,

        // DIVISION_PATH_HTML,
        // MM_TO_PX_SCALE,
    } = DATA;

    const LINE_WIDTH = CHAR_WIDTH * 1.75 * MAX_LENGTH;
    const LINE_WIDTH_HALF = LINE_WIDTH * 0.5;
    const RIGHT_X = LINE_WIDTH_HALF + VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN;
    const VERTIAL_QUESTION_STEP_BOTTOM = VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN - STEP_ROW_SPACE * 1.6;

    const Y4 = VERTIAL_QUESTION_STEP_BOTTOM;
    const Y3 = Y4 - STEP_ROW_SPACE + CONTENT_PAGE_CONTENT_FONT_SIZE * 0.5 - STEP_ROW_SPACE * 0.2;
    const Y2 = Y3 - STEP_ROW_SPACE;
    const Y1 = Y2 - STEP_ROW_SPACE;
    // const Y0 = Y1 - STEP_ROW_SPACE;

    const X2 = RIGHT_X + CHAR_WIDTH * 2;
    const X1 = X2 - LINE_WIDTH;

    const TEXT_HTML_ARRAY = [];
    const {
        // 辅助数字颜色
        SECONDARY_NUMBER_COLOR,

        // 进位加辅助数字字号
        SECONDARY_NUMBER_FONT_SIZE,
    } = DATA;
    // 最后一行都有一条上横线和一个数字
    // 加法可能有进位符
    TEXT_HTML_ARRAY.push(
        // `<text class="right bottom" x="${RIGHT_X}mm" y="${Y1}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${`${operand1}`}</text>`,
        `<text class="right bottom" x="${RIGHT_X}mm" y="${Y1}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${`${getTspanCharByChar(operand1, CHAR_WIDTH)}`}</text>`,
    );
    TEXT_HTML_ARRAY.push(
        `<text class="right bottom" x="${RIGHT_X}mm" y="${Y2}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${getTspanCharByChar(operand2, CHAR_WIDTH)}</text>`,
    );
    TEXT_HTML_ARRAY.push(
        `<text class="right bottom" x="${RIGHT_X}mm" y="${Y3}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${getTspanCharByChar('＋'.concat(
      '　'.repeat(LENGTH_OF_RESULT - LENGTH_OF_OPERAND3), operand3), CHAR_WIDTH)}</text>`,
    );

    // 计算进位加辅助数字
    for (let digitCount = 1; digitCount < LENGTH_OF_RESULT; ++digitCount) {
        const a =
            LENGTH_OF_OPERAND1 < digitCount ?
            operand1 :
            parseInt(STRING_OPERAND1.substr(-1 * digitCount), 0);
        const b =
            LENGTH_OF_OPERAND2 < digitCount ?
            operand2 :
            parseInt(STRING_OPERAND2.substr(-1 * digitCount), 0);
        const c =
            LENGTH_OF_OPERAND3 < digitCount ?
            operand3 :
            parseInt(STRING_OPERAND3.substr(-1 * digitCount), 0);
        // console.log({ a, b, digitCount, sum: a + b, sumLength: (a + b).length });
        if ((a + b + c).toString().length > digitCount) {
            // const X = RIGHT_X - CHAR_WIDTH * 1.75 * (digitCount - 1);
            const X = RIGHT_X - CHAR_WIDTH * 1.75 * digitCount + CHAR_WIDTH * 0.5;
            // console.log('ok');
            TEXT_HTML_ARRAY.push(
                //  - CHAR_WIDTH * 0.7
                `<text class="left bottom" x="${X}mm" y="${Y3 + SECONDARY_NUMBER_FONT_SIZE}mm"
        style="fill:${SECONDARY_NUMBER_COLOR};font-size:${SECONDARY_NUMBER_FONT_SIZE}mm">${(a + b + c).toString().substring(0, 1)}</text>`,
            );
        }
    }
    TEXT_HTML_ARRAY.push(
        `<text class="right bottom" x="${RIGHT_X}mm" y="${Y4}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${getTspanCharByChar(result, CHAR_WIDTH)}</text>`,
    );

    const LINE_Y3 = Y3 + VERTIAL_LINE_Y_MARGIN_TOP;
    return TEXT_HTML_ARRAY.join('').concat(
        `<line
        x1="${X1}mm"
        y1="${LINE_Y3}mm"
        x2="${X2}mm"
        y2="${LINE_Y3}mm"
        stroke="${VERTIAL_LINE_STROKE_COLOR}"
        stroke-width="${VERTIAL_LINE_STROKE_WIDTH}mm"
      />`,
    );
}


function trimRightZero(original) {
    original = original.toString();
    let length = original.length;
    while (length && original.substring(length - 1) === '0') {
        original = original.substring(0, length - 1);
        --length;
    }
    return original;
}

function getVertialQuestionStepColumnHtml(
    isOnlyOneColumn,
    ONE_COLUMN_MAX_LENGTH,
    STEP_ROW_COUNT,
    columnIndex,
    operator,
    operand1,
    operand2,
    result,
    quotient,
    remainder,
    anotherOperatorIsMultiply,
) {
    // 最后一行都有一条上横线和一个数字
    // 除法：至少4行文字、2条横线、1条弧线
    // 加减乘：除操作符及三个数字外，乘法没有其它内容，加法可能有进位符，减法可能有借位符及相关辅助数字

    const {
        // VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN,
        // VERTIAL_QUESTION_STEP_CENTER_POSITION1,
        // VERTIAL_QUESTION_STEP_CENTER_POSITION2,
        // VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN,
        // VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN,
        STEP_ROW_SPACE,
        CONTENT_PAGE_CONTENT_FONT_SIZE,
        CHAR_WIDTH,

        VERTIAL_LINE_STROKE_COLOR,
        VERTIAL_LINE_STROKE_WIDTH,
        VERTIAL_LINE_Y_MARGIN_TOP,

        DIVISION_PATH_HTML,
        MM_TO_PX_SCALE,

        BLUE_VERTIAL_LINE_STROKE_COLOR,
    } = DATA;

    const {
        IS_SUBTRACTION,
        IS_DIVISION,
        IS_MULTIPLY,
        VERTIAL_QUESTION_STEP_BOTTOM,
        RIGHT_X,
        // LINE_WIDTH_DIVISION,
        // LINE_WIDTH,
        LENGTH_OF_RESULT,
        LENGTH_OF_OPERAND2,
        LENGTH_OF_OPERAND1,
        STRING_OPERAND1,
        STRING_OPERAND2,
        STRING_RESULT,
        X1,
        X2,
    } = prepairGetVertialQuestionStepColumnHtml(operand1, operand2, result, quotient, operator, isOnlyOneColumn, ONE_COLUMN_MAX_LENGTH, CHAR_WIDTH, columnIndex, STEP_ROW_SPACE, STEP_ROW_COUNT, anotherOperatorIsMultiply);

    const TEXT_HTML_ARRAY = [];

    if (IS_DIVISION) {
        return getDivisionVertialQuestionStepColumnHtml(STEP_ROW_SPACE, quotient, operand1, VERTIAL_QUESTION_STEP_BOTTOM, VERTIAL_LINE_Y_MARGIN_TOP, RIGHT_X, CHAR_WIDTH, TEXT_HTML_ARRAY, CONTENT_PAGE_CONTENT_FONT_SIZE, operand2, remainder, X1, X2, VERTIAL_LINE_STROKE_COLOR, VERTIAL_LINE_STROKE_WIDTH, MM_TO_PX_SCALE, DIVISION_PATH_HTML);
    }

    const {
        // 辅助数字颜色
        SECONDARY_NUMBER_COLOR,

        // 进位加辅助数字字号
        SECONDARY_NUMBER_FONT_SIZE,
    } = DATA;

    if (IS_MULTIPLY) {
        // && trimRightZero(operand2).length > 1
        return getMultiplyVertialQuestionStepColumnHtml(isOnlyOneColumn, columnIndex, operand1, operand2, result, STRING_OPERAND1, STRING_OPERAND2, STRING_RESULT, LENGTH_OF_OPERAND1, LENGTH_OF_OPERAND2, LENGTH_OF_RESULT, VERTIAL_QUESTION_STEP_BOTTOM, STEP_ROW_SPACE, CONTENT_PAGE_CONTENT_FONT_SIZE, RIGHT_X, X1, X2, CHAR_WIDTH, SECONDARY_NUMBER_FONT_SIZE, SECONDARY_NUMBER_COLOR, VERTIAL_LINE_Y_MARGIN_TOP, VERTIAL_LINE_STROKE_COLOR, VERTIAL_LINE_STROKE_WIDTH, BLUE_VERTIAL_LINE_STROKE_COLOR, anotherOperatorIsMultiply);
    }

    const Y3 = VERTIAL_QUESTION_STEP_BOTTOM;
    const Y2 = Y3 - STEP_ROW_SPACE;
    const Y1 = Y2 - STEP_ROW_SPACE + (isOnlyOneColumn ? CONTENT_PAGE_CONTENT_FONT_SIZE * (IS_SUBTRACTION ? 1 : 0.5) : 0);
    const Y0 = Y1 - STEP_ROW_SPACE;

    const LINE_Y2 = Y2 + VERTIAL_LINE_Y_MARGIN_TOP;
    const LINE_HTML_ARRAY = [];
    LINE_HTML_ARRAY.push(`<line
        x1="${X1}mm"
        y1="${LINE_Y2}mm"
        x2="${X2}mm"
        y2="${LINE_Y2}mm"
        stroke="${VERTIAL_LINE_STROKE_COLOR}"
        stroke-width="${VERTIAL_LINE_STROKE_WIDTH}mm"
      />`);

    TEXT_HTML_ARRAY.push(
        `<text class="right bottom" x="${RIGHT_X}mm" y="${Y1}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${`${getTspanCharByChar(operand1, CHAR_WIDTH)}`}</text>`,
    );
    TEXT_HTML_ARRAY.push(
        `<text class="right bottom" x="${RIGHT_X}mm" y="${Y2}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${getTransparentTspanCharByChar(1 + Math.max(LENGTH_OF_RESULT, LENGTH_OF_OPERAND2, LENGTH_OF_OPERAND1) - LENGTH_OF_OPERAND2 - (IS_SUBTRACTION ? 1 : 0), getMathFormula(operator).replace(/ /gi, ''), CHAR_WIDTH)}${getTspanCharByChar(operand2, CHAR_WIDTH)}</text>`,
    );

    if (IS_SUBTRACTION) {
        const DIGIT_INFO_ARRAY = [];
        const OPERAND1_MAX_DIGIT_INDEX = LENGTH_OF_OPERAND1 - 1;

        // 计算退位减辅助数字及圆点
        for (let digitCount = 1; digitCount <= LENGTH_OF_OPERAND1; ++digitCount) {
            // const a =
            //   LENGTH_OF_OPERAND1 < digitCount
            //     ? operand1
            //     : parseInt(STRING_OPERAND1.substr(-1 * digitCount), 10);
            const b =
                LENGTH_OF_OPERAND2 <= digitCount ?
                operand2 :
                parseInt(STRING_OPERAND2.substr(-1 * digitCount), 10);
            const c =
                LENGTH_OF_RESULT <= digitCount ?
                parseInt(result, 10) :
                parseInt(STRING_RESULT.substr(-1 * digitCount), 10);

            const BORROWING = (b + c).toString().length > digitCount;
            // if (BORROWING) {
            //   console.log('has borrowing');
            // }
            DIGIT_INFO_ARRAY.push(BORROWING);
        }

        for (let digitIndex = 0; digitIndex <= OPERAND1_MAX_DIGIT_INDEX; ++digitIndex) {
            const BORROWING = DIGIT_INFO_ARRAY[digitIndex];
            // ${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">·
            if (BORROWING && digitIndex !== OPERAND1_MAX_DIGIT_INDEX) {
                // 当前位有借入，则前一位需标记红点
                // TEXT_HTML_ARRAY.push(
                //   `<text class="center bottom" x="${RIGHT_X - CHAR_WIDTH * (digitIndex + 1.1)
                //   }mm" y="${Y1 - SECONDARY_NUMBER_FONT_SIZE * 1.75
                //   }mm" style="fill:${SECONDARY_NUMBER_COLOR};font-size:${SECONDARY_NUMBER_FONT_SIZE * 0.5
                //   }mm">●</text>`,
                // );
                const X = RIGHT_X - CHAR_WIDTH * 1.75 * (digitIndex + 1) + CHAR_WIDTH * 0.5;
                TEXT_HTML_ARRAY.push(
                    `<text class="center bottom" x="${X}mm" y="${Y1 - SECONDARY_NUMBER_FONT_SIZE * 1.75}mm" style="fill:${SECONDARY_NUMBER_COLOR};font-size:${SECONDARY_NUMBER_FONT_SIZE * 0.5}mm">●</text>`,
                );
            }

            const RIGHT_DIGIT_HAS_BORROWING =
                digitIndex > 0 && DIGIT_INFO_ARRAY[digitIndex - 1];
            const HAS_FLAG = BORROWING || RIGHT_DIGIT_HAS_BORROWING;
            if (HAS_FLAG) {
                const digit =
                    parseInt(STRING_OPERAND1.substr(OPERAND1_MAX_DIGIT_INDEX - digitIndex, 1), 10) +
                    (BORROWING ? 10 : 0) -
                    (RIGHT_DIGIT_HAS_BORROWING ? 1 : 0);
                const X = RIGHT_X - CHAR_WIDTH * 1.75 * digitIndex + CHAR_WIDTH * 0.5;
                TEXT_HTML_ARRAY.push(
                    `<text class="center top" x="${X}mm" y="${Y0 + SECONDARY_NUMBER_FONT_SIZE * 0.5}mm"
                    style="fill:${SECONDARY_NUMBER_COLOR};font-size:${SECONDARY_NUMBER_FONT_SIZE}mm">${digit}</text>`,
                );
            }
        }

    } else {
        // 计算进位加辅助数字
        for (let digitCount = 1; digitCount < LENGTH_OF_RESULT; ++digitCount) {
            const a =
                LENGTH_OF_OPERAND1 < digitCount ?
                operand1 :
                parseInt(STRING_OPERAND1.substr(-1 * digitCount), 0);
            const b =
                LENGTH_OF_OPERAND2 < digitCount ?
                operand2 :
                parseInt(STRING_OPERAND2.substr(-1 * digitCount), 0);
            // console.log({ a, b, digitCount, sum: a + b, sumLength: (a + b).length });
            if ((a + b).toString().length > digitCount) {
                // console.log('ok');
                const X = RIGHT_X - CHAR_WIDTH * 1.75 * digitCount + CHAR_WIDTH * 0.5;
                // TEXT_HTML_ARRAY.push(
                //   `<text class="left bottom" x="${RIGHT_X - CHAR_WIDTH * digitCount + SECONDARY_NUMBER_FONT_SIZE * 0.1
                //   }mm" y="${Y2 + SECONDARY_NUMBER_FONT_SIZE
                //   }mm" style="fill:${SECONDARY_NUMBER_COLOR};font-size:${SECONDARY_NUMBER_FONT_SIZE}mm">1</text>`,
                // );
                TEXT_HTML_ARRAY.push(
                    `<text class="left bottom" x="${X}mm" y="${Y2 + SECONDARY_NUMBER_FONT_SIZE}mm" style="fill:${SECONDARY_NUMBER_COLOR};font-size:${SECONDARY_NUMBER_FONT_SIZE}mm">1</text>`,
                );
            }
        }
    }

    // 仅一列时，第一个式子不写入结果
    if (!(isOnlyOneColumn && columnIndex === 0)) {
        TEXT_HTML_ARRAY.push(
            `<text class="right bottom" x="${RIGHT_X}mm" y="${Y3}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">
        ${getTspanCharByChar(result, CHAR_WIDTH)}</text>`,
        );
    }

    return `${TEXT_HTML_ARRAY.join('')}${LINE_HTML_ARRAY.join('')}`;
}

function getMultiplyVertialQuestionStepColumnHtml(isOnlyOneColumn, columnIndex, operand1, operand2, result, STRING_OPERAND1, STRING_OPERAND2, STRING_RESULT, LENGTH_OF_OPERAND1, LENGTH_OF_OPERAND2, LENGTH_OF_RESULT, VERTIAL_QUESTION_STEP_BOTTOM, STEP_ROW_SPACE, CONTENT_PAGE_CONTENT_FONT_SIZE, RIGHT_X, X1, X2, CHAR_WIDTH, SECONDARY_NUMBER_FONT_SIZE, SECONDARY_NUMBER_COLOR, VERTIAL_LINE_Y_MARGIN_TOP, VERTIAL_LINE_STROKE_COLOR, VERTIAL_LINE_STROKE_WIDTH, BLUE_VERTIAL_LINE_STROKE_COLOR, anotherOperatorIsMultiply) {
    const TEXT_HTML_ARRAY = [];
    const LINE_HTML_ARRAY = [];

    const TRIMED_RIGHT_ZERO_1 = trimRightZero(STRING_OPERAND1);
    const TRIMED_RIGHT_ZERO_LENGTH_1 = TRIMED_RIGHT_ZERO_1.length;
    const RIGHT_ZERO_COUNT_1 = LENGTH_OF_OPERAND1 - TRIMED_RIGHT_ZERO_LENGTH_1;

    const TRIMED_RIGHT_ZERO_2 = trimRightZero(STRING_OPERAND2);
    const TRIMED_RIGHT_ZERO_LENGTH_2 = TRIMED_RIGHT_ZERO_2.length;
    const RIGHT_ZERO_COUNT_2 = LENGTH_OF_OPERAND2 - TRIMED_RIGHT_ZERO_LENGTH_2;

    const MORE_THAN_3_ROWS = TRIMED_RIGHT_ZERO_LENGTH_2 > 1;
    const RESULT_ROW_COUNT = 3 + (MORE_THAN_3_ROWS ? TRIMED_RIGHT_ZERO_LENGTH_2 : 0);
    const FIXED_STEP_ROW_SPACE = STEP_ROW_SPACE * (MORE_THAN_3_ROWS ? (isOnlyOneColumn ? 4 : 5) / RESULT_ROW_COUNT : 1);

    // const Y3 = VERTIAL_QUESTION_STEP_BOTTOM - FIXED_STEP_ROW_SPACE * ((isOnlyOneColumn || !MORE_THAN_3_ROWS) ? 0 : (RESULT_ROW_COUNT === 4 ? 1 : (RESULT_ROW_COUNT - 3) * 0.75));
    // const Y3 = VERTIAL_QUESTION_STEP_BOTTOM - FIXED_STEP_ROW_SPACE * ((isOnlyOneColumn || !MORE_THAN_3_ROWS) ? 0 : RESULT_ROW_COUNT - 3);

    // const Y3 = VERTIAL_QUESTION_STEP_BOTTOM - FIXED_STEP_ROW_SPACE * ((isOnlyOneColumn && columnIndex === 0) ? 0 : RESULT_ROW_COUNT - 3);
    // const Y3 = VERTIAL_QUESTION_STEP_BOTTOM - FIXED_STEP_ROW_SPACE * (!MORE_THAN_3_ROWS ? 0 : (isOnlyOneColumn ? (columnIndex === 0 ? 0 : RESULT_ROW_COUNT - 4) : RESULT_ROW_COUNT - 3));
    // const Y3 = VERTIAL_QUESTION_STEP_BOTTOM - FIXED_STEP_ROW_SPACE * (!MORE_THAN_3_ROWS ? 0 : (isOnlyOneColumn ? (columnIndex === 0 ? (TRIMED_RIGHT_ZERO_LENGTH_2 > 1 ? TRIMED_RIGHT_ZERO_LENGTH_2 * 1 : 0) : RESULT_ROW_COUNT - 4) : RESULT_ROW_COUNT - 3));

    // const Y3 = VERTIAL_QUESTION_STEP_BOTTOM - FIXED_STEP_ROW_SPACE * (!MORE_THAN_3_ROWS ? 0 : (isOnlyOneColumn ? (columnIndex === 0 ? (TRIMED_RIGHT_ZERO_LENGTH_2 > 1 ? TRIMED_RIGHT_ZERO_LENGTH_2 : 0) : RESULT_ROW_COUNT - 4) : (columnIndex === 0 ? RESULT_ROW_COUNT - (TRIMED_RIGHT_ZERO_LENGTH_2 > 1 ? TRIMED_RIGHT_ZERO_LENGTH_2 : 0) - 3 : RESULT_ROW_COUNT - 3)));
    const Y3 = VERTIAL_QUESTION_STEP_BOTTOM - FIXED_STEP_ROW_SPACE * (!MORE_THAN_3_ROWS ? 0 : (isOnlyOneColumn ? (columnIndex === 0 ? (TRIMED_RIGHT_ZERO_LENGTH_2 > 1 ? TRIMED_RIGHT_ZERO_LENGTH_2 : 0) : RESULT_ROW_COUNT - 0.5) : (columnIndex === 0 ? RESULT_ROW_COUNT - (TRIMED_RIGHT_ZERO_LENGTH_2 > 1 ? TRIMED_RIGHT_ZERO_LENGTH_2 : 0) - 3 : RESULT_ROW_COUNT - 3)));

    const Y2 = Y3 - FIXED_STEP_ROW_SPACE;
    const Y1 = Y2 - FIXED_STEP_ROW_SPACE + (isOnlyOneColumn ? CONTENT_PAGE_CONTENT_FONT_SIZE * 0.5 : 0);

    // const APPEND_Y = STEP_ROW_SPACE * (TRIMED_RIGHT_ZERO_LENGTH_2 > 1 ? TRIMED_RIGHT_ZERO_LENGTH_2 : 0) / 2;
    const APPEND_Y = FIXED_STEP_ROW_SPACE * (TRIMED_RIGHT_ZERO_LENGTH_2 > 1 ? TRIMED_RIGHT_ZERO_LENGTH_2 : 0);
    const Y0 = Y1 - FIXED_STEP_ROW_SPACE; // - APPEND_Y;

    const RIGHT_ZERO_COUNT_SUMMARY = RIGHT_ZERO_COUNT_1 + RIGHT_ZERO_COUNT_2;
    const IS_MOVE_BY_FIRST = isOnlyOneColumn && columnIndex === 1;

    if (RIGHT_ZERO_COUNT_SUMMARY) {
        // 下一句的0.25已验证有效（当两式合并到同一列时，乘法的竖线必定在X2左侧半字符处），目前两式合并时第二式如果是乘法则第一个数必定只有一位，所以无法验证RIGHT_ZERO_COUNT_1
        // 未两式合并到同一列时，RIGHT_ZERO_COUNT_SUMMARY已验证有效！ TODO(@anqisoft) 扩展到“两式合并到同一列后第二式是乘法，且第一个数为整十数”的情况
        // const LINE_X = X2 - CHAR_WIDTH * 2 * (IS_MOVE_BY_FIRST ? (RIGHT_ZERO_COUNT_1 ? RIGHT_ZERO_COUNT_1 : 0.25) : RIGHT_ZERO_COUNT_SUMMARY - 0.25);
        const LINE_X = X2 - CHAR_WIDTH * 2 * (IS_MOVE_BY_FIRST ? (RIGHT_ZERO_COUNT_1 ? RIGHT_ZERO_COUNT_1 : 0.25) : RIGHT_ZERO_COUNT_SUMMARY);
        const LINE_Y_OFFSET = FIXED_STEP_ROW_SPACE * 0.45;
        // LINE_HTML_ARRAY.push(`<line
        //     x1="${LINE_X}mm"
        //     y1="${Y0 + LINE_Y_OFFSET}mm"
        //     x2="${LINE_X}mm"
        //     y2="${Y3 + LINE_Y_OFFSET}mm"
        //     stroke="${BLUE_VERTIAL_LINE_STROKE_COLOR}"
        //     stroke-width="${VERTIAL_LINE_STROKE_WIDTH}mm"
        //     stroke-dasharray="6,3,2,2,2,3"
        //   />`);
        LINE_HTML_ARRAY.push(`<line
              x1="${LINE_X}mm"
              y1="${Y0 + LINE_Y_OFFSET}mm"
              x2="${LINE_X}mm"
              y2="${Y3 + LINE_Y_OFFSET + APPEND_Y}mm"
              stroke="${BLUE_VERTIAL_LINE_STROKE_COLOR}"
              stroke-width="${VERTIAL_LINE_STROKE_WIDTH}mm"
              stroke-dasharray="6,3,2,2,2,3"
            />`);

    }

    const REMOVE_RIGHT_ZERO_COUNT = (IS_MOVE_BY_FIRST && RIGHT_ZERO_COUNT_2 > RIGHT_ZERO_COUNT_1) ? RIGHT_ZERO_COUNT_2 - RIGHT_ZERO_COUNT_1 : 0;
    const HORIZONTAL_LINE_X_OFFSET = CHAR_WIDTH * 2 * REMOVE_RIGHT_ZERO_COUNT;
    const LINE_Y2 = Y2 + VERTIAL_LINE_Y_MARGIN_TOP * 0.6;
    LINE_HTML_ARRAY.push(`<line
        x1="${X1 + HORIZONTAL_LINE_X_OFFSET}mm"
        y1="${LINE_Y2}mm"
        x2="${X2 + HORIZONTAL_LINE_X_OFFSET}mm"
        y2="${LINE_Y2}mm"
        stroke="${VERTIAL_LINE_STROKE_COLOR}"
        stroke-width="${VERTIAL_LINE_STROKE_WIDTH}mm"
      />`);


    const HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR = REMOVE_RIGHT_ZERO_COUNT ? getTransparentTspanCharByChar(REMOVE_RIGHT_ZERO_COUNT, '', CHAR_WIDTH) : '';
    // if (REMOVE_RIGHT_ZERO_COUNT) {
    //     console.log('HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR', HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR, REMOVE_RIGHT_ZERO_COUNT, );
    // }

    // const RIGHT_X_OF_RESULT = RIGHT_X + CHAR_WIDTH * 2 * REMOVE_RIGHT_ZERO_COUNT;
    const RIGHT_X_OF_RESULT = RIGHT_X + CHAR_WIDTH * 2 * REMOVE_RIGHT_ZERO_COUNT - (REMOVE_RIGHT_ZERO_COUNT ? CHAR_WIDTH * 0.55 : 0);
    // if (REMOVE_RIGHT_ZERO_COUNT) {
    //     console.log(CHAR_WIDTH, REMOVE_RIGHT_ZERO_COUNT, REMOVE_RIGHT_ZERO_COUNT ? CHAR_WIDTH * 0.25 : 0, RIGHT_X + CHAR_WIDTH * 2 * REMOVE_RIGHT_ZERO_COUNT, RIGHT_X_OF_RESULT);
    // }
    TEXT_HTML_ARRAY.push(
        `<text class="right bottom" x="${RIGHT_X}mm" y="${Y1}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR}${`${getTspanCharByChar(operand1, CHAR_WIDTH)}`}${getTransparentTspanCharByChar(RIGHT_ZERO_COUNT_SUMMARY - RIGHT_ZERO_COUNT_1 - REMOVE_RIGHT_ZERO_COUNT, '',CHAR_WIDTH)}</text>`
    );
    TEXT_HTML_ARRAY.push(
        `<text class="right bottom" x="${RIGHT_X_OF_RESULT}mm" y="${Y2}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${getTransparentTspanCharByChar(Math.max(LENGTH_OF_RESULT, LENGTH_OF_OPERAND2, LENGTH_OF_OPERAND1) - LENGTH_OF_OPERAND2 + REMOVE_RIGHT_ZERO_COUNT - ((!isOnlyOneColumn && columnIndex === 1 && RIGHT_ZERO_COUNT_SUMMARY > 0) ? 1: 0), '×', CHAR_WIDTH)}${getTspanCharByChar(operand2, CHAR_WIDTH)}${getTransparentTspanCharByChar(RIGHT_ZERO_COUNT_SUMMARY - RIGHT_ZERO_COUNT_2 - REMOVE_RIGHT_ZERO_COUNT, '',CHAR_WIDTH)}</text>`
    );

    const MIDDLE_PRODUCT_ARRAY = [];
    if (TRIMED_RIGHT_ZERO_LENGTH_2 > 1) {
        const PRODUCT_FIX_SCALE = Math.pow(10, RIGHT_ZERO_COUNT_1);
        for (let i = 0; i < TRIMED_RIGHT_ZERO_LENGTH_2; ++i) {
            const Y = Y2 + FIXED_STEP_ROW_SPACE * (i + 1 - (i === TRIMED_RIGHT_ZERO_LENGTH_2 - 1 ? 0.15 : 0));
            const POSITION = TRIMED_RIGHT_ZERO_LENGTH_2 - i - 1;
            const CURRENT_NUMBER = parseInt(TRIMED_RIGHT_ZERO_2.substring(POSITION, POSITION + 1));
            MIDDLE_PRODUCT_ARRAY.push((operand1 * CURRENT_NUMBER * Math.pow(10, i + RIGHT_ZERO_COUNT_2)).toString());
            // TEXT_HTML_ARRAY.push(
            //     `<text class="right bottom" x="${RIGHT_X}mm" y="${Y}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR}${`${getTspanCharByChar(operand1 / PRODUCT_FIX_SCALE * CURRENT_NUMBER, CHAR_WIDTH)}`}${getTransparentTspanCharByChar(RIGHT_ZERO_COUNT_SUMMARY - RIGHT_ZERO_COUNT_1 - REMOVE_RIGHT_ZERO_COUNT + i, '',CHAR_WIDTH)}</text>`
            // );
            TEXT_HTML_ARRAY.push(
                `<text class="right bottom" x="${RIGHT_X}mm" y="${Y}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR}${`${getTspanCharByChar(operand1 / PRODUCT_FIX_SCALE * CURRENT_NUMBER, CHAR_WIDTH)}`}${getTransparentTspanCharByChar(RIGHT_ZERO_COUNT_SUMMARY - REMOVE_RIGHT_ZERO_COUNT + i, '',CHAR_WIDTH)}</text>`
            );
        }

        const LINE_Y = Y2 + FIXED_STEP_ROW_SPACE * TRIMED_RIGHT_ZERO_LENGTH_2 + VERTIAL_LINE_Y_MARGIN_TOP * 0.6;
        LINE_HTML_ARRAY.push(`<line
            x1="${X1 + HORIZONTAL_LINE_X_OFFSET}mm"
            y1="${LINE_Y}mm"
            x2="${X2 + HORIZONTAL_LINE_X_OFFSET}mm"
            y2="${LINE_Y}mm"
            stroke="${VERTIAL_LINE_STROKE_COLOR}"
            stroke-width="${VERTIAL_LINE_STROKE_WIDTH}mm"
        />`);
    }


    // 计算进位辅助数字，须修正乘数带0的情况
    // 九九乘法口诀表对应的不需要标记进位辅助数字
    if (TRIMED_RIGHT_ZERO_LENGTH_1 + TRIMED_RIGHT_ZERO_LENGTH_2 > 2) {
        if (TRIMED_RIGHT_ZERO_LENGTH_2 === 1) {
            // if (operand1 === 58 && operand2 === 900) {
            //     console.log(TRIMED_RIGHT_ZERO_LENGTH_1, TRIMED_RIGHT_ZERO_LENGTH_2);
            // }
            const Y = Y2 + SECONDARY_NUMBER_FONT_SIZE - 0.75;
            // for (let digitCount = 1; digitCount < LENGTH_OF_RESULT; ++digitCount) {
            //     const a = LENGTH_OF_OPERAND1 < digitCount ?
            //         operand1 :
            //         parseInt(STRING_OPERAND1.substr(-1 * digitCount), 0);
            //     const b = LENGTH_OF_OPERAND2 < digitCount ?
            //         operand2 :
            //         parseInt(STRING_OPERAND2.substr(-1 * digitCount), 0);
            //     // console.log({ a, b, digitCount, sum: a + b, sumLength: (a + b).length });
            //     const A_MULTIPLY_B_STRING = (a * b).toString();
            //     if (operand1 === 58 && operand2 === 900) {
            //         console.log({
            //             a,
            //             b,
            //             digitCount,
            //             sum: a + b,
            //             // sumLength: (a + b).toString().length,
            //             A_MULTIPLY_B_STRING
            //         });
            //     }
            //     if (A_MULTIPLY_B_STRING.toString().length > digitCount) {
            //         const X = RIGHT_X - CHAR_WIDTH * 1.75 * digitCount + CHAR_WIDTH * 0.5;
            //         TEXT_HTML_ARRAY.push(
            //             `<text class="left bottom" x="${X}mm" y="${Y}mm" style="fill:${SECONDARY_NUMBER_COLOR};font-size:${SECONDARY_NUMBER_FONT_SIZE}mm">${A_MULTIPLY_B_STRING.substring(0, 1)}</text>`
            //         );
            //     }
            // }
            const LENGTH_OF_TRIMED_RIGHT_ZERO_RESULT = (operand1 * parseInt(TRIMED_RIGHT_ZERO_2)).toString().length;
            const b = parseInt(TRIMED_RIGHT_ZERO_2);
            // if (operand1 === 58 && operand2 === 900) {
            //     console.log({
            //         b,
            //         trimResult: operand1 * parseInt(TRIMED_RIGHT_ZERO_2),
            //         LENGTH_OF_TRIMED_RIGHT_ZERO_RESULT,
            //     });
            // }

            for (let digitCount = 1; digitCount < LENGTH_OF_TRIMED_RIGHT_ZERO_RESULT; ++digitCount) {
                const a = LENGTH_OF_OPERAND1 < digitCount ?
                    operand1 :
                    parseInt(STRING_OPERAND1.substr(-1 * digitCount), 0);
                const A_MULTIPLY_B_STRING = (a * b).toString();

                if (A_MULTIPLY_B_STRING.toString().length > digitCount) {
                    const X = RIGHT_X - CHAR_WIDTH * 1.75 * (digitCount + RIGHT_ZERO_COUNT_2) + CHAR_WIDTH * 0.5;
                    TEXT_HTML_ARRAY.push(
                        `<text class="left bottom" x="${X}mm" y="${Y}mm" style="fill:${SECONDARY_NUMBER_COLOR};font-size:${SECONDARY_NUMBER_FONT_SIZE}mm">${A_MULTIPLY_B_STRING.substring(0, 1)}</text>`
                    );
                }
            }
        } else {
            const Y = Y3 + APPEND_Y - FIXED_STEP_ROW_SPACE * 0.9;
            const MAX_INDEX = LENGTH_OF_RESULT - RIGHT_ZERO_COUNT_SUMMARY - 1;
            // console.log('MIDDLE_PRODUCT_ARRAY', MIDDLE_PRODUCT_ARRAY, 'MAX_INDEX', MAX_INDEX);
            STRING_RESULT.split('').forEach((_c, index) => {
                if (index > MAX_INDEX) {
                    return;
                }

                const MAX_LENGTH = LENGTH_OF_RESULT - index - 1;

                let sum = 0;
                // MIDDLE_PRODUCT_ARRAY.map(str => parseInt(str.substring(index + 1, LENGTH_OF_RESULT))).forEach(n => sum += isNaN(n) ? 0 : n);
                MIDDLE_PRODUCT_ARRAY.map(str => parseInt(str.substring(str.length <= MAX_LENGTH ? 0 : str.length - MAX_LENGTH, LENGTH_OF_RESULT))).forEach(n => sum += (isNaN(n) ? 0 : n));

                sum = Math.floor(sum / Math.pow(10, MAX_LENGTH));
                if (sum > 0) {
                    const X = RIGHT_X - CHAR_WIDTH * 1.75 * (MAX_LENGTH) + CHAR_WIDTH * 0.5;

                    // console.log('MIDDLE_PRODUCT_ARRAY', MIDDLE_PRODUCT_ARRAY, 'MAX_INDEX', MAX_INDEX, 'sum', sum);
                    // MIDDLE_PRODUCT_ARRAY.forEach((str, index) => {
                    //     // console.log(index, `${str}.substring(${index + 1}, ${LENGTH_OF_RESULT})=>`, parseInt(str.substring(index + 1, LENGTH_OF_RESULT)));
                    //     console.log(index, `'${str}'.substring('${str}'.length <= ${MAX_LENGTH} ? 0 : '${str}'.length - ${MAX_LENGTH}, ${LENGTH_OF_RESULT})=>`, parseInt(str.substring(str.length <= MAX_LENGTH ? 0 : str.length - MAX_LENGTH, LENGTH_OF_RESULT)));
                    // });

                    TEXT_HTML_ARRAY.push(
                        `<text class="left bottom" x="${X}mm" y="${Y}mm" style="fill:${SECONDARY_NUMBER_COLOR};font-size:${SECONDARY_NUMBER_FONT_SIZE}mm">${sum}</text>`
                    );
                }
            });
        }
    }

    // 仅一列时，第一个式子不写入结果
    if (!(isOnlyOneColumn && columnIndex === 0)) {
        // TEXT_HTML_ARRAY.push(
        //     `<text class="right bottom" x="${RIGHT_X_OF_RESULT}mm" y="${Y3}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">
        //     ${HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR}${getTspanCharByChar(result, CHAR_WIDTH)}</text>`
        // );
        TEXT_HTML_ARRAY.push(
            `<text class="right bottom" x="${RIGHT_X_OF_RESULT}mm" y="${Y3 + APPEND_Y}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">
            ${HTML_OF_LEFT_TRANSPARENT_TSPAN_CHAR}${getTspanCharByChar(result, CHAR_WIDTH)}</text>`
        );
    }

    return TEXT_HTML_ARRAY.join('').concat(LINE_HTML_ARRAY.join(''));
}

function prepairGetVertialQuestionStepColumnHtml(operand1, operand2, result, quotient, operator, isOnlyOneColumn, ONE_COLUMN_MAX_LENGTH, CHAR_WIDTH, columnIndex, STEP_ROW_SPACE, STEP_ROW_COUNT, anotherOperatorIsMultiply) {
    const {
        VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN,
        VERTIAL_QUESTION_STEP_CENTER_POSITION1,
        VERTIAL_QUESTION_STEP_CENTER_POSITION2,
        VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN,
        VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN,
        // STEP_ROW_SPACE,
        // CONTENT_PAGE_CONTENT_FONT_SIZE,
        // CHAR_WIDTH,

        // VERTIAL_LINE_STROKE_COLOR,
        // VERTIAL_LINE_STROKE_WIDTH,
        // VERTIAL_LINE_Y_MARGIN_TOP,

        // DIVISION_PATH_HTML,
        // MM_TO_PX_SCALE,
    } = DATA;

    const IS_SUBTRACTION = operator === '-';
    const IS_DIVISION = operator === '/';
    const IS_MULTIPLY = operator === '*';

    const STRING_OPERAND1 = operand1.toString();
    const STRING_OPERAND2 = operand2.toString();
    const STRING_RESULT = result.toString();

    // 横向依于中线进行布局（最终折算成右线），纵向依于底线进行布局——除法布局与加减乘不同
    const LENGTH_OF_OPERAND1 = STRING_OPERAND1.length;
    const LENGTH_OF_OPERAND2 = STRING_OPERAND2.length;
    const LENGTH_OF_RESULT = STRING_RESULT.length;
    const MAX_LENGTH = IS_DIVISION ?
        LENGTH_OF_OPERAND1 + LENGTH_OF_OPERAND2 + 3 :
        1 +
        (isOnlyOneColumn ?
            ONE_COLUMN_MAX_LENGTH
            // : Math.max(Math.max(LENGTH_OF_OPERAND1, LENGTH_OF_OPERAND2) + 2, LENGTH_OF_RESULT));
            :
            Math.max(Math.max(LENGTH_OF_OPERAND1, LENGTH_OF_OPERAND2), LENGTH_OF_RESULT));


    const LINE_WIDTH = CHAR_WIDTH * 1.75 * MAX_LENGTH;
    const LINE_WIDTH_HALF = LINE_WIDTH * 0.5;
    const LINE_WIDTH_DIVISION = CHAR_WIDTH * 1.75 * (LENGTH_OF_OPERAND1 + 1.25);

    const RIGHT_X = LINE_WIDTH_HALF +
        (isOnlyOneColumn ?
            VERTIAL_QUESTION_STEP_CENTER_POSITION_ONE_COLUMN :
            columnIndex === 0 ?
            VERTIAL_QUESTION_STEP_CENTER_POSITION1 - CHAR_WIDTH * 1.75 - (IS_DIVISION ? (MAX_LENGTH <= 7 ? (MAX_LENGTH - 3.75) : 3.25 - (MAX_LENGTH - 7)) : 0) :
            VERTIAL_QUESTION_STEP_CENTER_POSITION2 - CHAR_WIDTH * 1.75 - (IS_DIVISION ? (MAX_LENGTH > 6 ? (MAX_LENGTH - 3.75) : 0) : 0));
    // const VERTIAL_QUESTION_STEP_BOTTOM = isOnlyOneColumn ?
    //     VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN - (columnIndex === 0 ? STEP_ROW_SPACE * 2 : 0) :
    //     VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN;

    const QUOTIENT_TRIM_RIGHT_ZERO_LENGTH = IS_DIVISION ? trimRightZero(quotient).length : 0;
    const FIX_ROW_COUNT_BY_DIVISION = (IS_DIVISION && QUOTIENT_TRIM_RIGHT_ZERO_LENGTH > 1) ? 1 + (QUOTIENT_TRIM_RIGHT_ZERO_LENGTH === 2 ? 0 : (QUOTIENT_TRIM_RIGHT_ZERO_LENGTH === 3 ? -0.5 : 0.75 * (3 - QUOTIENT_TRIM_RIGHT_ZERO_LENGTH))) : 0;
    // const FIX_ROW_COUNT_BY_DIVISION = (IS_DIVISION && QUOTIENT_TRIM_RIGHT_ZERO_LENGTH > 1) ? 1 + (QUOTIENT_TRIM_RIGHT_ZERO_LENGTH === 2 ? 0 : (QUOTIENT_TRIM_RIGHT_ZERO_LENGTH === 3 ? -2.5 : 0.75 * (3 - QUOTIENT_TRIM_RIGHT_ZERO_LENGTH))) : 0;

    // if (quotient === 547) {
    //     console.log(QUOTIENT_TRIM_RIGHT_ZERO_LENGTH, FIX_ROW_COUNT_BY_DIVISION);
    // }

    // const VERTIAL_QUESTION_STEP_BOTTOM = isOnlyOneColumn ?
    //     VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN - STEP_ROW_SPACE * (columnIndex === 0 ? STEP_ROW_COUNT - 2 : STEP_ROW_COUNT - 4) :
    //     VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN - STEP_ROW_SPACE * (STEP_ROW_COUNT - 3 - FIX_ROW_COUNT_BY_DIVISION);
    // if (IS_DIVISION && QUOTIENT_TRIM_RIGHT_ZERO_LENGTH >= 3) {
    //     console.log(`${operand1} / ${operand2} = ${result}`);
    // }
    // if (IS_DIVISION && QUOTIENT_TRIM_RIGHT_ZERO_LENGTH >= 4) {
    //     console.log(`${operand1} / ${operand2} = ${result}`);
    // }

    // 当只有一列时，如果第一项是乘法，位置不对
    // const VERTIAL_QUESTION_STEP_BOTTOM = isOnlyOneColumn ?
    //     VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN - STEP_ROW_SPACE * (columnIndex === 0 ? STEP_ROW_COUNT - 2 : STEP_ROW_COUNT - 4) :
    //     VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN - STEP_ROW_SPACE * (STEP_ROW_COUNT - 3 - FIX_ROW_COUNT_BY_DIVISION);
    // const VERTIAL_QUESTION_STEP_BOTTOM = isOnlyOneColumn ?
    //     VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN - STEP_ROW_SPACE * (columnIndex === 0 ? STEP_ROW_COUNT + 2 - LENGTH_OF_OPERAND2 * 2 : STEP_ROW_COUNT - 0 - LENGTH_OF_OPERAND2 * 2) :
    //     VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN - STEP_ROW_SPACE * (STEP_ROW_COUNT - 3 - FIX_ROW_COUNT_BY_DIVISION);
    // const VERTIAL_QUESTION_STEP_BOTTOM = isOnlyOneColumn ?
    //     VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN - STEP_ROW_SPACE * (columnIndex === 0 ? STEP_ROW_COUNT - 2 - (IS_MULTIPLY ? LENGTH_OF_OPERAND2 + 1 : 0) : STEP_ROW_COUNT - 4 - (IS_MULTIPLY ? LENGTH_OF_OPERAND2 + 2 : 0)) :
    //     VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN - STEP_ROW_SPACE * (STEP_ROW_COUNT - 3 - FIX_ROW_COUNT_BY_DIVISION);

    // const VERTIAL_QUESTION_STEP_BOTTOM_OF_ONE_COLUMN_FIRST_ITEM_FIX_SCALE = (STEP_ROW_COUNT - 2 - (IS_MULTIPLY ? LENGTH_OF_OPERAND2 + 1 + (anotherOperatorIsMultiply ? -0 : 0) : (anotherOperatorIsMultiply ? 2 : 0)));
    // const VERTIAL_QUESTION_STEP_BOTTOM_OF_ONE_COLUMN_SECOND_ITEM_FIX_SCALE = STEP_ROW_COUNT - 4 - (IS_MULTIPLY ? LENGTH_OF_OPERAND2 : (anotherOperatorIsMultiply ? 3 : 0));

    // 240228 0627修改前
    // const OPERAND2_TRIMED_RIGHT_ZERO_LENGTH = trimRightZero(STRING_OPERAND2).length;
    // const VERTIAL_QUESTION_STEP_BOTTOM_OF_ONE_COLUMN_FIRST_ITEM_FIX_SCALE = (STEP_ROW_COUNT - 2 - (IS_MULTIPLY ? (OPERAND2_TRIMED_RIGHT_ZERO_LENGTH - 1 + (OPERAND2_TRIMED_RIGHT_ZERO_LENGTH > 1 ? 0.5 : 0)) * 2 : (anotherOperatorIsMultiply ? 2 : 0)));
    // const VERTIAL_QUESTION_STEP_BOTTOM_OF_ONE_COLUMN_SECOND_ITEM_FIX_SCALE = STEP_ROW_COUNT - 4 - (IS_MULTIPLY ? (OPERAND2_TRIMED_RIGHT_ZERO_LENGTH - 1 + 1.5) * 2 : (anotherOperatorIsMultiply ? 3 : 0));

    // 240228 0627修改后
    const OPERAND2_TRIMED_RIGHT_ZERO_LENGTH = trimRightZero(STRING_OPERAND2).length;
    const VERTIAL_QUESTION_STEP_BOTTOM_OF_ONE_COLUMN_FIRST_ITEM_FIX_SCALE = (STEP_ROW_COUNT - 2 - (IS_MULTIPLY ? (OPERAND2_TRIMED_RIGHT_ZERO_LENGTH - 1 + (OPERAND2_TRIMED_RIGHT_ZERO_LENGTH > 1 ? 0.5 : 0)) * 2 : (anotherOperatorIsMultiply ? 2 : 0)));
    // anotherOperatorIsMultiply ? 3(ok，A*B-C可以) : 0(不确定，0或负数可保证上面的内容位置正确，若负数则上面的内容位置不对)
    const VERTIAL_QUESTION_STEP_BOTTOM_OF_ONE_COLUMN_SECOND_ITEM_FIX_SCALE = STEP_ROW_COUNT - 4 - (IS_MULTIPLY ? (OPERAND2_TRIMED_RIGHT_ZERO_LENGTH - 1 + 1.5) * 2 : (anotherOperatorIsMultiply ? 3 : 0));

    const VERTIAL_QUESTION_STEP_BOTTOM_OF_ONE_COLUMN = VERTIAL_QUESTION_STEP_BOTTOM_ONE_COLUMN - STEP_ROW_SPACE * (columnIndex === 0 ? VERTIAL_QUESTION_STEP_BOTTOM_OF_ONE_COLUMN_FIRST_ITEM_FIX_SCALE : VERTIAL_QUESTION_STEP_BOTTOM_OF_ONE_COLUMN_SECOND_ITEM_FIX_SCALE);
    const VERTIAL_QUESTION_STEP_BOTTOM_OF_TWO_COLUMNS = VERTIAL_QUESTION_STEP_BOTTOM_TWO_COLUMN - STEP_ROW_SPACE * (STEP_ROW_COUNT - 3 - FIX_ROW_COUNT_BY_DIVISION);
    const VERTIAL_QUESTION_STEP_BOTTOM = isOnlyOneColumn ?
        VERTIAL_QUESTION_STEP_BOTTOM_OF_ONE_COLUMN :
        VERTIAL_QUESTION_STEP_BOTTOM_OF_TWO_COLUMNS;

    const X2 = RIGHT_X + CHAR_WIDTH * 2;
    const X1 = X2 - (IS_DIVISION ? LINE_WIDTH_DIVISION : LINE_WIDTH);

    return {
        IS_SUBTRACTION,
        IS_DIVISION,
        IS_MULTIPLY,
        VERTIAL_QUESTION_STEP_BOTTOM,
        RIGHT_X,
        // LINE_WIDTH_DIVISION,
        // LINE_WIDTH,
        LENGTH_OF_RESULT,
        LENGTH_OF_OPERAND2,
        LENGTH_OF_OPERAND1,
        STRING_OPERAND1,
        STRING_OPERAND2,
        STRING_RESULT,
        X1,
        X2,
    };
}

function getDivisionVertialQuestionStepColumnHtml(STEP_ROW_SPACE, quotient, operand1, VERTIAL_QUESTION_STEP_BOTTOM, VERTIAL_LINE_Y_MARGIN_TOP, RIGHT_X, CHAR_WIDTH, TEXT_HTML_ARRAY, CONTENT_PAGE_CONTENT_FONT_SIZE, operand2, remainder, X1, X2, VERTIAL_LINE_STROKE_COLOR, VERTIAL_LINE_STROKE_WIDTH, MM_TO_PX_SCALE, DIVISION_PATH_HTML) {
    const QUOTIENT_STRING = quotient.toString();
    const OPERAND1_STRING = operand1.toString();

    // TODO(@anqi) 今后除以整十数时，可能还会出现Bug，到时再进行调整吧
    const QUOTIENT_LENGTH = QUOTIENT_STRING.length;
    // const QUOTIENT_TRIMED_RIGHT_ZERO = trimRightZero(QUOTIENT_STRING);
    // const QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH = QUOTIENT_TRIMED_RIGHT_ZERO.length;
    // const QUOTIENT_RIGHT_ZERO_COUNT = QUOTIENT_LENGTH - QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH;

    const OPERAND1_TRIMED_RIGHT_ZERO_LENGTH = OPERAND1_STRING.length - trimRightZero(OPERAND1_STRING).length;
    const ORIGINAL_QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH = QUOTIENT_LENGTH - trimRightZero(QUOTIENT_STRING).length;
    const QUOTIENT_RIGHT_ZERO_COUNT = Math.min(ORIGINAL_QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH, OPERAND1_TRIMED_RIGHT_ZERO_LENGTH);
    const QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH = QUOTIENT_LENGTH - QUOTIENT_RIGHT_ZERO_COUNT;
    const QUOTIENT_TRIMED_RIGHT_ZERO = QUOTIENT_STRING.substring(0, QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH);

    // const STEP_ROW_SPACE_SMALL = STEP_ROW_SPACE * (QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH === 1 ? 1 : 6.2 / (2 * (QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH + 1)));
    // const STEP_ROW_SPACE_SMALL = STEP_ROW_SPACE * ((QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH === 1 && QUOTIENT_LENGTH - trimRightZero(QUOTIENT_STRING).length === 0) ? 1 : 6.2 / (2 * (QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH + 1)));
    const STEP_ROW_SPACE_SMALL = STEP_ROW_SPACE * (QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH === 1 ? 1 : 6.2 / (2 * (QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH + 1 + Math.max(ORIGINAL_QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH - OPERAND1_TRIMED_RIGHT_ZERO_LENGTH, 0))));

    // const Y3 = VERTIAL_QUESTION_STEP_BOTTOM - (QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH === 1 ? 0 : STEP_ROW_SPACE_SMALL * QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH);
    const Y3 = VERTIAL_QUESTION_STEP_BOTTOM - (QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH === 1 ? 0 : STEP_ROW_SPACE_SMALL * QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH);
    const Y2 = Y3 - STEP_ROW_SPACE_SMALL;
    const Y1 = Y2 - STEP_ROW_SPACE_SMALL;
    const Y0 = Y1 - STEP_ROW_SPACE_SMALL;

    const LINE_Y2 = Y2 + VERTIAL_LINE_Y_MARGIN_TOP * 0.6;
    const LINE_Y0 = Y0 + VERTIAL_LINE_Y_MARGIN_TOP * 0.6;

    const LINE_HTML_ARRAY = [];

    const X = RIGHT_X - CHAR_WIDTH * 0.75;
    TEXT_HTML_ARRAY.push(
        `<text class="right bottom" x="${X}mm" y="${Y0}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${getTspanCharByChar(quotient, CHAR_WIDTH)}</text>`
    );
    TEXT_HTML_ARRAY.push(
        `<text class="right bottom" x="${X}mm" y="${Y1}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${`${getTspanCharByChar(operand2.toString().concat('　'.repeat(1), operand1), CHAR_WIDTH)}`}</text>`
    );

    if (QUOTIENT_LENGTH === 1) {
        TEXT_HTML_ARRAY.push(
            `<text class="right bottom" x="${X}mm" y="${Y2}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">${getTspanCharByChar(operand2 * quotient, CHAR_WIDTH)}</text>`
        );

        TEXT_HTML_ARRAY.push(
            `<text class="right bottom" x="${X}mm" y="${Y3}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">
        ${getTspanCharByChar(remainder, CHAR_WIDTH)}</text>`
        );
    } else {
        let oldQuotient = 0;
        // let lastQuotient = 0;
        const FIXED_OPERAND1_STRING = (operand1 / Math.pow(10, QUOTIENT_RIGHT_ZERO_COUNT)).toString();
        const FIXED_OPERAND1_LENGTH = OPERAND1_STRING.length;

        let zeroCount = 0;
        QUOTIENT_TRIMED_RIGHT_ZERO.split('').forEach((c, index) => {
            const CURRENT_QUOTIENT = parseInt(c);
            const DIGIT = QUOTIENT_RIGHT_ZERO_COUNT + (QUOTIENT_TRIMED_RIGHT_ZERO_LENGTH - index);

            const Y_OFFSET = STEP_ROW_SPACE_SMALL * (index - zeroCount + 1) * 2;
            const LINE_Y = LINE_Y0 + Y_OFFSET;
            const Y = Y0 + Y_OFFSET;

            // TEXT_HTML_ARRAY.push(
            //     `<text class="right bottom" x="${X}mm" y="${Y}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">厶
            //     ${getTransparentTspanCharByChar(DIGIT -1, operand2 * CURRENT_QUOTIENT, CHAR_WIDTH)}</text>`
            // );

            const used = FIXED_OPERAND1_STRING.substring(0, FIXED_OPERAND1_LENGTH - DIGIT + 1);
            const next = FIXED_OPERAND1_STRING.substring(FIXED_OPERAND1_LENGTH - DIGIT + 1, FIXED_OPERAND1_LENGTH - DIGIT + 2);
            const REMAINING = parseInt(used) - operand2 * (oldQuotient * 10 + CURRENT_QUOTIENT);

            // 607 ÷ (1 ＋ 1) = 303......1
            // if (operand1 === 607 && operand2 === 2 && quotient === 303 && remainder === 1 && CURRENT_QUOTIENT === 0) {
            //     // 3 1 0 false
            //     // 0 1 7 false
            //     // 3 0 1 false
            //     // console.log(CURRENT_QUOTIENT, next.length, next.length ? (REMAINING * 10 + parseInt(next)) : REMAINING, CURRENT_QUOTIENT === 0 && (next.length ? (REMAINING * 10 + parseInt(next)) : REMAINING) === 0);

            //     console.log(CURRENT_QUOTIENT, next.length, REMAINING, next, next.length ? (REMAINING * 10 + parseInt(next)) : REMAINING, operand2 * CURRENT_QUOTIENT);
            // }

            // if (CURRENT_QUOTIENT === 0 && (next.length ? (REMAINING * 10 + parseInt(next)) : REMAINING) === 0) {

            // 进一步简化写法，当商的中间出现0时，不用写下面的式子
            // const NEED_SKIP_THIS = CURRENT_QUOTIENT === 0 && REMAINING === 0;
            const NEED_SKIP_THIS = CURRENT_QUOTIENT === 0 && (REMAINING === 0 || next.length);

            if (NEED_SKIP_THIS) {
                ++zeroCount;

                oldQuotient *= 10;
                oldQuotient += CURRENT_QUOTIENT;
                // lastQuotient = CURRENT_QUOTIENT;

                TEXT_HTML_ARRAY.push(
                    `<text class="right bottom" x="${X}mm" y="${Y - STEP_ROW_SPACE_SMALL}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">
                    ${next.length ? getTransparentTspanCharByChar(DIGIT - 2, REMAINING * 10 + parseInt(next), CHAR_WIDTH): getTransparentTspanCharByChar(DIGIT - 1, REMAINING, CHAR_WIDTH)}</text>`
                );

                return;
            }

            TEXT_HTML_ARRAY.push(
                `<text class="right bottom" x="${X}mm" y="${Y}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">
                ${getTransparentTspanCharByChar(DIGIT -1, operand2 * CURRENT_QUOTIENT, CHAR_WIDTH)}</text>`
            );
            if (next.length) {
                if (REMAINING * 10 + parseInt(next)) {
                    TEXT_HTML_ARRAY.push(
                        `<text class="right bottom" x="${X}mm" y="${Y + STEP_ROW_SPACE_SMALL}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">
                        ${getTransparentTspanCharByChar(DIGIT - 2, REMAINING * 10 + parseInt(next), CHAR_WIDTH)}</text>`
                    );
                }
            } else {
                TEXT_HTML_ARRAY.push(
                    `<text class="right bottom" x="${X}mm" y="${Y + STEP_ROW_SPACE_SMALL}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm">
                    ${getTransparentTspanCharByChar(DIGIT - 1, REMAINING, CHAR_WIDTH)}</text>`
                );
            }

            LINE_HTML_ARRAY.push(`<line
          x1="${X1}mm"
          y1="${LINE_Y}mm"
          x2="${X2}mm"
          y2="${LINE_Y}mm"
          stroke="${VERTIAL_LINE_STROKE_COLOR}"
          stroke-width="${VERTIAL_LINE_STROKE_WIDTH}mm"
        />`);

            oldQuotient *= 10;
            oldQuotient += CURRENT_QUOTIENT;
        });
    }

    const RESULT = TEXT_HTML_ARRAY.join('').concat(
        `<line
        x1="${X1}mm"
        y1="${LINE_Y2}mm"
        x2="${X2}mm"
        y2="${LINE_Y2}mm"
        stroke="${VERTIAL_LINE_STROKE_COLOR}"
        stroke-width="${VERTIAL_LINE_STROKE_WIDTH}mm"
      />`,
        `<line
            x1="${X1}mm"
            y1="${LINE_Y0}mm"
            x2="${X2}mm"
            y2="${LINE_Y0}mm"
            stroke="${VERTIAL_LINE_STROKE_COLOR}"
            stroke-width="${VERTIAL_LINE_STROKE_WIDTH}mm"
          /><path fill="none" stroke="#000000" d="M ${MM_TO_PX_SCALE * X1 //  - MM_TO_PX_SCALE * DATA.CHAR_WIDTH
    }, ${MM_TO_PX_SCALE * LINE_Y0} ${DIVISION_PATH_HTML}" />`,
        LINE_HTML_ARRAY.join('')
    );
    return RESULT;
}

function getMmToPxScale() {
    // https://blog.csdn.net/baidu_25343343/article/details/84950269
    const screen = window.screen; // (window.screen as unknown as { deviceXDPI?: number; deviceYDPI: number });

    const dpiArray = []; // : Array<number>
    if (screen.deviceXDPI) {
        dpiArray.push(screen.deviceXDPI);
        dpiArray.push(screen.deviceYDPI);
    } else {
        const div = document.createElement('div');
        div.style.cssText =
            'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
        document.body.appendChild(div);
        dpiArray.push(parseInt(div.offsetWidth.toString()));
        dpiArray.push(parseInt(div.offsetHeight.toString()));
        document.body.removeChild(div);
    }

    const dpiX = dpiArray[0];
    const mmToPxScale = dpiX / 25.4;
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
    const SECOND_ROW_CONTENT = getMathFormula(secondRowFormula);

    const {
        QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH,
        CONTENT_PAGE_CONTENT_FONT_SIZE,
        OFF_THE_SHELF_LINE_Y,
        OFF_THE_SHELF_SECOND_ROW_Y,
        OFF_THE_SHELF_THIRD_ROW_Y,
        OFF_THE_SHELF_LINE_STROKE_COLOR,
        OFF_THE_SHELF_LINE_STROKE_WIDTH,
        CONTENT_PAGE_CONTENT_CHAR_WIDTH,
        OFF_THE_SHELF_QUESTION_X,
        CHAR_WIDTH,
    } = DATA;

    // // const CHAR_WIDTH = CONTENT_PAGE_CONTENT_FONT_SIZE * 0.7;
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
    const OFF_THE_SHELF_SECOND_ROW_HTML = `<text
              class="left middle"
              x="${CONTENT_PAGE_CONTENT_FONT_SIZE}mm"
              y="${OFF_THE_SHELF_SECOND_ROW_Y}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm;"
            > = ${SECOND_ROW_CONTENT}</text>`;
    const OFF_THE_SHELF_THIRD_ROW_HTML = `<text
              class="left middle"
              x="${CONTENT_PAGE_CONTENT_FONT_SIZE}mm"
              y="${OFF_THE_SHELF_THIRD_ROW_Y}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm;"
            > = ${result}</text>`;
    // return `${LINE_HTML}${OFF_THE_SHELF_SECOND_ROW_HTML}${OFF_THE_SHELF_THIRD_ROW_HTML}`;
    return `${OFF_THE_SHELF_SECOND_ROW_HTML}${OFF_THE_SHELF_THIRD_ROW_HTML}`;
}

function getMathFormula(computerFormula) {
    return computerFormula
        .replace(/\*/g, ' × ')
        .replace(/\//g, ' ÷ ')
        .replace(/\+/g, ' ＋ ')
        .replace(/\-/g, ' － ');
}

function getOffTheShelfMathFormula(computerFormula, a, c, lineCountMethod) {
    const FORMULA = computerFormula
        .replace(/\*/g, ' × ')
        .replace(/\//g, ' ÷ ')
        .replace(/\+/g, ' ＋ ')
        .replace(/\-/g, ' － ');

    const LEFT_BRACKET_POSITION = FORMULA.indexOf('(');
    const RIGHT_BRACKET_POSITION = FORMULA.indexOf(')');
    if (LEFT_BRACKET_POSITION === 0) {
        return `<tspan style="text-decoration:underline;">${FORMULA.substring(0, RIGHT_BRACKET_POSITION + 1)}</tspan><tspan>${FORMULA.substring(RIGHT_BRACKET_POSITION + 1)}</tspan>`;
    } else if (LEFT_BRACKET_POSITION > -1) {
        return `<tspan>${FORMULA.substring(0, LEFT_BRACKET_POSITION)}</tspan><tspan style="text-decoration:underline;">${FORMULA.substring(LEFT_BRACKET_POSITION)}</tspan>`;
    }

    const FORMULA_LENGTH = FORMULA.length;
    let seperatorPosition = 0;
    switch (lineCountMethod) {
        case LineCountMethodType.LeftToRight:
            // case LineCountMethodType.LeftToRightByBrackets:
            seperatorPosition = FORMULA_LENGTH - c.toString().length - 4;
            return `<tspan style="text-decoration:underline;">${FORMULA.substring(0, seperatorPosition + 1)}</tspan><tspan>${FORMULA.substring(seperatorPosition + 1)}</tspan>`;
        case LineCountMethodType.RightToLeft:
            // case LineCountMethodType.RightToLeftByBrackets:
            seperatorPosition = a.toString().length + 3;
            return `<tspan>${FORMULA.substring(0, seperatorPosition)}</tspan><tspan style="text-decoration:underline;">${FORMULA.substring(seperatorPosition)}</tspan>`;
        default:
            return FORMULA;
    }
}
// console.log(getOffTheShelfMathFormula('(10+5)*5', 10, 5, LineCountMethodType.LeftToRight));
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
    const {
        CONTENT_PAGE_CONTENT_CHAR_WIDTH
    } = DATA;

    // return content
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
    return content
        .split('')
        .map((char, char_index) => `<tspan>${char}</tspan>`)
        .join('');

    // return content
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
    const MAX_VALUE =
        questionKind === QuestionCategoryType.Oral ?
        DATA.ORAL_MAX :
        questionKind === QuestionCategoryType.Vertical ?
        DATA.VERTICAL_MAX :
        DATA.OFF_THE_SHELF_MAX;
    const RANDOM_SEED_OF_SUBTRAHEND = MAX_VALUE + 1 - MIN_OF_SUBTRAHEND;
    return {
        MAX_VALUE,
        RANDOM_SEED_OF_SUBTRAHEND
    };
}

// 加减乘除: addition, subtraction, multiplication and division
// 加数, 加法之和: addend, sum,
// 被减数, 减数, 差: minuend, subtrahend, difference,
// 乘数, 积: multiplier, product
// 被除数, 除数, 商, 余数: dividend, divisor, quotient, remainder

// 获取结果限定于1-9的加法（各加数范围0-9）
function getAdditionTupleByResultLimited9() {
    const addend1 = Math.floor(Math.random() * 10);
    const addend2 = addend1 === 9 ? 0 : Math.ceil(Math.random() * (9 - addend1));
    const sum = addend1 + addend2;
    return {
        addend1,
        addend2,
        sum
    };
}

// 获取结果限定于1-9的减法（被减数、减数范围0-MAX）
function getSubtractionTupleByResultLimited9(questionKind, min) {
    min = min || 1;
    const {
        MAX_VALUE,
        RANDOM_SEED_OF_SUBTRAHEND
    } = getMaxAndRandSeed(questionKind);
    const subtrahend =
        MIN_OF_SUBTRAHEND + Math.floor(Math.random() * RANDOM_SEED_OF_SUBTRAHEND);
    const difference = Math.min(
        MAX_VALUE - subtrahend,
        min + Math.floor(Math.random() * (9 - min)),
    );
    const minuend = subtrahend + difference;
    return {
        minuend,
        subtrahend,
        difference
    };
}
// 获取结果限定于1-9的乘法
function getMultiplicationTupleByResultLimited9() {
    const tuple = A_TIMES_B_VALUE_ARRAY[Math.floor(Math.random() * A_TIMES_B_VALUE_COUNT)];
    const multiplier1 = tuple.One; // Math.ceil(Math.random() * 9);
    const multiplier2 = tuple.Two;
    const product = tuple.Value;
    return {
        multiplier1,
        multiplier2,
        product
    };
}

function getMultiplicationTupleByResultLimited9Advance() {
    const multiplier1 = Math.ceil(Math.random() * 100) * Math.pow(10, Math.floor(Math.random() * 2));
    const multiplier2 = Math.ceil(Math.random() * 9);

    const product = multiplier1 * multiplier2;
    // console.log({ multiplier1, multiplier2, product });
    return {
        multiplier1,
        multiplier2,
        product
    };
}

// 获取结果限定于1-9的无余数除法（限定于九九乘法口诀表表内除法）
function getDivisionTupleWithoutRemainderByResultLimited9() {
    // dividend, divisor, quotient, remainder
    const divisor = Math.ceil(Math.random() * 9);
    const quotient = Math.ceil(Math.random() * 9);
    const dividend = divisor * quotient;
    return {
        dividend,
        divisor,
        quotient
    };
}
// 获取结果限定于1-9的无余数除法（限定于九九乘法口诀表表内除法）升级版
function getDivisionTupleWithoutRemainderByResultLimited9Advance() {
    // dividend, divisor, quotient, remainder
    const divisor = Math.ceil(Math.random() * 9); // * Math.pow(10, Math.floor(Math.random() * 2));
    const quotient = Math.ceil(Math.random() * 9) * Math.pow(10, Math.floor(Math.random() * 2));
    const dividend = divisor * quotient;
    return {
        dividend,
        divisor,
        quotient
    };
}

// 获取结果限定于1-9的可能有余数的除法（限定于九九乘法口诀表表内除法）
function getDivisionTupleMayContainRemainderByResultLimited9() {
    // dividend, divisor, quotient, remainder
    const divisor = Math.ceil(Math.random() * 9);
    const quotient = Math.ceil(Math.random() * 9);
    const remainder = Math.floor(Math.random() * divisor);
    const dividend = divisor * quotient + remainder;
    return {
        dividend,
        divisor,
        quotient,
        remainder
    };
}
// 获取结果限定于1-9的可能有余数的除法（限定于九九乘法口诀表表内除法）升级版
function getDivisionTupleMayContainRemainderByResultLimited9Advance() {
    // dividend, divisor, quotient, remainder
    const divisor = Math.ceil(Math.random() * 9);
    const quotient = Math.ceil(Math.random() * 9) * Math.pow(10, Math.floor(Math.random() * 2));
    const remainder = Math.floor(Math.random() * divisor);
    const dividend = divisor * quotient + remainder;
    return {
        dividend,
        divisor,
        quotient,
        remainder
    };
}

// 获取结果限定于1-MAX的加法（各加数范围0-MAX）
function getAdditionTupleByResultLimited(questionKind) {
    const {
        MAX_VALUE
    } = getMaxAndRandSeed(questionKind);
    const addend1 = Math.floor(Math.random() * MAX_VALUE);
    const addend2 =
        addend1 === MAX_VALUE ? 0 : Math.ceil(Math.random() * (MAX_VALUE - addend1));
    const sum = addend1 + addend2;
    return {
        addend1,
        addend2,
        sum
    };
}
// 获取结果限定于1-MAX的减法（被减数、减数范围0-MAX）
function getSubtractionTupleByResultLimited(questionKind) {
    const {
        MAX_VALUE,
        RANDOM_SEED_OF_SUBTRAHEND
    } = getMaxAndRandSeed(questionKind);
    const subtrahend =
        MIN_OF_SUBTRAHEND + Math.floor(Math.random() * RANDOM_SEED_OF_SUBTRAHEND);
    const difference =
        subtrahend === MAX_VALUE ? 0 : Math.ceil(Math.random() * (MAX_VALUE - subtrahend));
    const minuend = subtrahend + difference;
    return {
        minuend,
        subtrahend,
        difference
    };
}

// 获取乘数限定于1-9的乘法
function getMultiplicationTupleByMultiplierLimited9() {
    const multiplier1 = Math.ceil(Math.random() * 9);
    const multiplier2 = Math.ceil(Math.random() * 9);
    const product = multiplier1 * multiplier2;
    return {
        multiplier1,
        multiplier2,
        product
    };
}
// 获取乘数限定于1-9的整十、整百、整千倍的乘法
function getMultiplicationTupleByMultiplierLimited9Advance() {
    const POWER1 = Math.pow(10, Math.floor(Math.random() * 2));
    const multiplier1 = Math.ceil(Math.random() * 9) * POWER1;
    const multiplier2 = Math.ceil(Math.random() * 9) * (10 * Math.pow(10, Math.floor(Math.random() * 2)) / POWER1);
    const product = multiplier1 * multiplier2;
    return {
        multiplier1,
        multiplier2,
        product
    };
}
// 获取第一个乘数限定于1-9的整十、整百、整千倍的乘法，第二个乘数限定于1-9的乘法
function getMultiplicationTupleByMultiplierLimited9Advance2() {
    const POWER1 = Math.pow(10, Math.floor(Math.random() * 2));
    const multiplier1 = Math.ceil(Math.random() * 9) * 10 * POWER1;
    const multiplier2 = Math.ceil(Math.random() * 9); // * (10 * Math.pow(10, Math.floor(Math.random() * 2)) / POWER1);
    const product = multiplier1 * multiplier2;
    return {
        multiplier1,
        multiplier2,
        product
    };
}

// 获取已知一个乘数的乘数限定于1-9的乘法
function getMultiplicationTupleWithMultiplieByMultiplierLimited9(multiplier1) {
    const multiplier = Math.ceil(Math.random() * 9);
    const product = multiplier1 * multiplier;
    return {
        multiplier,
        product
    };
}

function getMultiplicationTupleWithMultiplieByMultiplierLimited9Advance(multiplier1) {
    // const multiplier = Math.ceil(Math.random() * 9);
    const multiplier = Math.ceil(Math.random() * 100) * Math.pow(10, Math.floor(Math.random() * 2));
    const product = multiplier1 * multiplier;
    return {
        multiplier,
        product
    };
}

// 获取已知其中一个加数的结果限定于1-MAX的第二步加法（各加数范围0-MAX）
function getAdditionTupleWithAddendByResultLimited(questionKind, addend1) {
    const {
        MAX_VALUE
    } = getMaxAndRandSeed(questionKind);

    const addend = addend1 === MAX_VALUE ? 0 : Math.ceil(Math.random() * (MAX_VALUE - addend1));

    // let MAX = MAX_VALUE;
    // while (MAX < addend1) {
    //     MAX *= 10;
    // }
    // const addend = addend1 === MAX ? 0 : Math.ceil(Math.random() * (MAX - addend1));

    const result = addend1 + addend;
    return {
        addend,
        result
    };
}

// 获取已知减数的结果限定于1-MAX的第二步减法（被减数、减数范围0-MAX）
function getSubtractionTupleWithSubtrahendByResultLimited(questionKind, subtrahend) {
    const {
        MAX_VALUE
    } = getMaxAndRandSeed(questionKind);
    const result =
        subtrahend === MAX_VALUE ? 0 : Math.ceil(Math.random() * (MAX_VALUE - subtrahend));
    const minuend = subtrahend + result;
    return {
        minuend,
        result
    };
}
// 获取已知被减数的结果限定于1-MAX的第二步减法（被减数、减数范围0-MAX）
function getSubtractionTupleWithMinuendByResultLimited(questionKind, minuend) {
    // const { MAX_VALUE, RANDOM_SEED_OF_SUBTRAHEND } = getMaxAndRandSeed(questionKind);
    const subtrahend = Math.ceil(Math.random() * minuend);
    const result = minuend - subtrahend;
    return {
        subtrahend,
        result
    };
}

// 根据被除数与除数，获取可能有余数的除法的商与余数
function getDivisionTupleMayContainRemainder(dividend, divisor) {
    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
    return {
        quotient,
        remainder
    };
}

// 获取结果限定于1-9的可能有余数的除法的被除数、商与余数（限定于九九乘法口诀表表内除法）
function getDivisionTupleMayContainRemainderWithDivisorByResultLimited9(divisor) {
    const quotient = Math.ceil(Math.random() * 9);
    const remainder = Math.floor(Math.random() * divisor);
    const dividend = divisor * quotient + remainder;
    return {
        dividend,
        quotient,
        remainder
    };
}
// 获取结果限定于1-9的可能有余数的除法的被除数、商与余数（限定于九九乘法口诀表表内除法）升级版
function getDivisionTupleMayContainRemainderWithDivisorByResultLimited9Advance(divisor) {
    const quotient = Math.ceil(Math.random() * 9);
    const remainder = Math.floor(Math.random() * divisor);
    const dividend = divisor * quotient + remainder;
    return {
        dividend,
        quotient,
        remainder
    };
}

function fillOralQuestions() {
    const {
        COUNT_ORAL_QUESTION_COUNT_PER_PAGE,
        ORAL_QUESTION_ARRAY,
        DAY_COUNT,
        QUESTION_TYPE_COUNT,
    } = DATA;
    const COUNT = COUNT_ORAL_QUESTION_COUNT_PER_PAGE * DAY_COUNT;
    for (let i = 0; i < COUNT; ++i) {
        ORAL_QUESTION_ARRAY.push(getQuestionByKind(i % QUESTION_TYPE_COUNT, 0));
    }
}

function fillVerticalQuestions() {
    const {
        COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE,
        VERTICAL_QUESTION_ARRAY,
        DAY_COUNT,
        QUESTION_TYPE_COUNT,
    } = DATA;

    const COUNT = COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE * DAY_COUNT;
    for (let i = 0; i < COUNT; ++i) {
        VERTICAL_QUESTION_ARRAY.push(getQuestionByKind(i % QUESTION_TYPE_COUNT, 1));
    }
}

function fillOffTheShelfQuestions() {
    const {
        COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE,
        OFF_THE_SHELF_QUESTION_ARRAY,
        DAY_COUNT,
        // QUESTION_TYPE_COUNT,
        OFF_THE_SHELF_QUESTION_TYPE_ARRAY,
        OFF_THE_SHELF_QUESTION_TYPE_COUNT,
    } = DATA;
    const COUNT = COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE * DAY_COUNT;
    for (let i = 0; i < COUNT; ++i) {
        // OFF_THE_SHELF_QUESTION_ARRAY.push(getQuestionByKind(i % QUESTION_TYPE_COUNT, 2));
        OFF_THE_SHELF_QUESTION_ARRAY.push(
            getQuestionByKind(
                OFF_THE_SHELF_QUESTION_TYPE_ARRAY[i % OFF_THE_SHELF_QUESTION_TYPE_COUNT],
                2,
            ),
        );
    }
}

function fillContentPageContents() {
    const {
        QUESTION_TEXT_PAGE_CONTENT_ARRAY,
        ANSWER_TEXT_PAGE_CONTENT_ARRAY,
        START_DATE,
        DAY_COUNT,
        A5_PAGE_WIDTH,
        A5_PAGE_WIDTH_HALF,
        A5_PAGE_HEIGHT,
        EMPTY_A5_PAGE_COUNT,
        LEFT_A5_PAGE_SVG_START,
        RIGHT_A5_PAGE_SVG_START,
        A5_PAGE_SVG_END,
        ORAL_QUESTION_ARRAY,
        VERTICAL_QUESTION_ARRAY,
        OFF_THE_SHELF_QUESTION_ARRAY,
        COUNT_ORAL_QUESTION_COUNT_PER_PAGE,
        COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE,
        COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE,
        CONTENT_PAGE_SUBJECT_Y,
        CONTENT_PAGE_SUBJECT_HEIGHT,
        CONTENT_PAGE_SUBJECT_FONT_SIZE,
        CONTENT_PAGE_FOOTER_HEIGHT,
        CONTENT_PAGE_FOOTER_FONT_SIZE,
        QUESTION_PAGE_FOOTER_TEXT,
        ANSWER_PAGE_FOOTER_TEXT,
        Y_POSITIONS_OF_QUESTION_ARRAY,

        BORDER_LINE_HTML,
        SEPERATOR_LINE_HTML,

        REMOVE_COVER,
    } = DATA;

    // 正文第一页是否从奇数页开始（A4页右半页）——奇偶odd-even
    const IS_ODD_PAGE_OF_FIRST_CONTENT_PAGE =
        REMOVE_COVER || EMPTY_A5_PAGE_COUNT === 2 || EMPTY_A5_PAGE_COUNT % 2 === 1;

    const YEAR_OF_START_DATE = START_DATE.getFullYear();
    const MONTH_OF_START_DATE = START_DATE.getMonth(); // + 1;
    const DATE_OF_START_DATE = START_DATE.getDate();

    // 正文页标题行y坐标
    const CONTENT_PAGE_SUBJECT_X = A5_PAGE_WIDTH_HALF;

    // // 几个常量：口算题目总数、竖式题目总数、脱式题目总数
    // const COUNT_ORAL_QUESTION_COUNT = COUNT_ORAL_QUESTION_COUNT_PER_PAGE * DAY_COUNT;
    // const COUNT_VERTICAL_QUESTION_COUNT = COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE * DAY_COUNT;
    // const COUNT_OFF_THE_SHELF_QUESTION_COUNT =
    //   COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE * DAY_COUNT;

    const options = {};

    fillOralQuestions();
    fillVerticalQuestions();
    fillOffTheShelfQuestions();
    // console.log({
    //   ORAL_QUESTION_ARRAY,
    //   VERTICAL_QUESTION_ARRAY,
    //   OFF_THE_SHELF_QUESTION_ARRAY,
    // });

    const FOOTER_TOP = A5_PAGE_HEIGHT - CONTENT_PAGE_FOOTER_HEIGHT;

    const Y0 = Y_POSITIONS_OF_QUESTION_ARRAY[0];
    const Y1 = Y_POSITIONS_OF_QUESTION_ARRAY[1];
    const Y2 = Y_POSITIONS_OF_QUESTION_ARRAY[2];
    const Y3 = Y_POSITIONS_OF_QUESTION_ARRAY[3];
    const Y4 = Y_POSITIONS_OF_QUESTION_ARRAY[4];

    // 计算正文每页内容
    for (let loop_of_day = 0; loop_of_day < DAY_COUNT; ++loop_of_day) {
        const CURRENT_DATE = new Date(
            YEAR_OF_START_DATE,
            MONTH_OF_START_DATE,
            DATE_OF_START_DATE + loop_of_day,
        );
        // const CURRENT_DATE_FLAG = `${CURRENT_DATE.getFullYear()}年${
        //   CURRENT_DATE.getMonth() + 1
        // }月${CURRENT_DATE.getDate()}日`;
        const CURRENT_DATE_FLAG = `${CURRENT_DATE.getMonth() + 1}月${CURRENT_DATE.getDate()}日`;

        const CURRENT_DATE_ORAL_QUESTIONS = ORAL_QUESTION_ARRAY.slice(
            loop_of_day * COUNT_ORAL_QUESTION_COUNT_PER_PAGE,
            (loop_of_day + 1) * COUNT_ORAL_QUESTION_COUNT_PER_PAGE,
        );
        const CURRENT_DATE_VERTICAL_QUESTIONS = VERTICAL_QUESTION_ARRAY.slice(
            loop_of_day * COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE,
            (loop_of_day + 1) * COUNT_VERTICAL_QUESTION_COUNT_PER_PAGE,
        );
        const CURRENT_DATE_OFF_THE_SHELF_QUESTIONS = OFF_THE_SHELF_QUESTION_ARRAY.slice(
            loop_of_day * COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE,
            (loop_of_day + 1) * COUNT_OFF_THE_SHELF_QUESTION_COUNT_PER_PAGE,
        );
        // console.log({ CURRENT_DATE_ORAL_QUESTIONS });

        // 如使用这句，将生成从后向前翻页的小册子
        // const IS_LEFT_PAGE =
        //   REMOVE_COVER ^
        //   (IS_ODD_PAGE_OF_FIRST_CONTENT_PAGE ? loop_of_day % 2 === 1 : loop_of_day % 2 === 0);
        const IS_LEFT_PAGE = IS_ODD_PAGE_OF_FIRST_CONTENT_PAGE ?
            loop_of_day % 2 === 1 :
            loop_of_day % 2 === 0;
        const CURRENT_PAGE_SVG_G_START = IS_LEFT_PAGE ?
            LEFT_A5_PAGE_SVG_START :
            RIGHT_A5_PAGE_SVG_START;

        // const CURRENT_PAGE_CONTENT_SUBJECT = `<text class="center middle" x="${CONTENT_PAGE_SUBJECT_X}mm" y="${CONTENT_PAGE_SUBJECT_Y}mm" style="width:${A5_PAGE_WIDTH}mm;height:${CONTENT_PAGE_SUBJECT_HEIGHT}mm;font-size:${CONTENT_PAGE_SUBJECT_FONT_SIZE}mm;">${CURRENT_DATE_FLAG}</text>`;

        const CURRENT_PAGE_CONTENT_SUBJECT = IS_LEFT_PAGE ?
            `<text class="left top" x="0mm" y="${CONTENT_PAGE_SUBJECT_Y}mm" style="width:${A5_PAGE_WIDTH}mm;height:${CONTENT_PAGE_SUBJECT_HEIGHT}mm;font-size:${CONTENT_PAGE_SUBJECT_FONT_SIZE}mm;">${CURRENT_DATE_FLAG}</text>` :
            `<text class="right top" x="${A5_PAGE_WIDTH}mm" y="${CONTENT_PAGE_SUBJECT_Y}mm" style="width:${A5_PAGE_WIDTH}mm;height:${CONTENT_PAGE_SUBJECT_HEIGHT}mm;font-size:${CONTENT_PAGE_SUBJECT_FONT_SIZE}mm;">${CURRENT_DATE_FLAG}</text>`;

        const PAGE_NO = loop_of_day + 1;
        const CURRENT_PAGE_CONTENT_PAGE_NO = IS_LEFT_PAGE ?
            `<text class="left top" x="0mm" y="${FOOTER_TOP}mm" style="font-size:${CONTENT_PAGE_FOOTER_FONT_SIZE}mm;">${PAGE_NO}</text>` :
            `<text class="right top" x="${A5_PAGE_WIDTH}mm" y="${FOOTER_TOP}mm" style="font-size:${CONTENT_PAGE_FOOTER_FONT_SIZE}mm;">${PAGE_NO}</text>`;

        QUESTION_TEXT_PAGE_CONTENT_ARRAY.push(
            `${CURRENT_PAGE_SVG_G_START}
              ${CURRENT_PAGE_CONTENT_SUBJECT}
              ${CURRENT_PAGE_CONTENT_PAGE_NO}
              ${IS_LEFT_PAGE
        ? `<text class="right top" x="${A5_PAGE_WIDTH}mm" y="${FOOTER_TOP}mm" style="font-size:${CONTENT_PAGE_FOOTER_FONT_SIZE}mm;">${QUESTION_PAGE_FOOTER_TEXT}</text>`
        : `<text class="left top" x="0mm" y="${FOOTER_TOP}mm" style="font-size:${CONTENT_PAGE_FOOTER_FONT_SIZE}mm;">${QUESTION_PAGE_FOOTER_TEXT}</text>`
      }

              // 口算4题 Y0左右，Y1左右
              <g style="transform:translate(0mm, ${Y0}mm);">${CURRENT_DATE_ORAL_QUESTIONS[0].questionHtml
      }</g>
                    <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y0}mm);">${CURRENT_DATE_ORAL_QUESTIONS[1].questionHtml
      }</g>
                    <g style="transform:translate(0mm, ${Y1}mm);">${CURRENT_DATE_ORAL_QUESTIONS[2].questionHtml
      }</g>
                    <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y1}mm);">${CURRENT_DATE_ORAL_QUESTIONS[3].questionHtml
      }</g>


              // 竖式 Y2左右, Y3左
              <g style="transform:translate(0mm, ${Y2}mm);">${CURRENT_DATE_VERTICAL_QUESTIONS[0].questionHtml
      }</g>
                    <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y2}mm);">${CURRENT_DATE_VERTICAL_QUESTIONS[1].questionHtml
      }</g>
                    <g style="transform:translate(0mm, ${Y3}mm);">${CURRENT_DATE_VERTICAL_QUESTIONS[2].questionHtml
      }</g>

              // 脱式 Y3右, Y4左右
              <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y3}mm);">${CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[0].questionHtml
      }</g>
                    <g style="transform:translate(0mm, ${Y4}mm);">${CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[1].questionHtml
      }</g>
                    <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y4}mm);">${CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[2].questionHtml
      }</g>

              ${BORDER_LINE_HTML}
              ${SEPERATOR_LINE_HTML}

              ${A5_PAGE_SVG_END}`,
        );
        ANSWER_TEXT_PAGE_CONTENT_ARRAY.push(
            `${CURRENT_PAGE_SVG_G_START}
              ${CURRENT_PAGE_CONTENT_SUBJECT}
              ${CURRENT_PAGE_CONTENT_PAGE_NO}
              ${IS_LEFT_PAGE
        ? `<text class="right top" x="${A5_PAGE_WIDTH}mm" y="${FOOTER_TOP}mm" style="font-size:${CONTENT_PAGE_FOOTER_FONT_SIZE}mm;">${ANSWER_PAGE_FOOTER_TEXT}</text>`
        : `<text class="left top" x="0mm" y="${FOOTER_TOP}mm" style="font-size:${CONTENT_PAGE_FOOTER_FONT_SIZE}mm;">${ANSWER_PAGE_FOOTER_TEXT}</text>`
      }

              // 口算4题 Y0左右，Y1左右
              <g style="transform:translate(0mm, ${Y0}mm);">${CURRENT_DATE_ORAL_QUESTIONS[0].answerHtml
      }</g>
              <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y0}mm);">${CURRENT_DATE_ORAL_QUESTIONS[1].answerHtml
      }</g>
              <g style="transform:translate(0mm, ${Y1}mm);">${CURRENT_DATE_ORAL_QUESTIONS[2].answerHtml
      }</g>
              <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y1}mm);">${CURRENT_DATE_ORAL_QUESTIONS[3].answerHtml
      }</g>

              // 竖式 Y2左右, Y3左
              <g style="transform:translate(0mm, ${Y2}mm);">${CURRENT_DATE_VERTICAL_QUESTIONS[0].answerHtml
      }</g>
              <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y2}mm);">${CURRENT_DATE_VERTICAL_QUESTIONS[1].answerHtml
      }</g>
              <g style="transform:translate(0mm, ${Y3}mm);">${CURRENT_DATE_VERTICAL_QUESTIONS[2].answerHtml
      }</g>

              // 脱式 Y3右, Y4左右
              <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y3}mm);">${CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[0].answerHtml
      }</g>
              <g style="transform:translate(0mm, ${Y4}mm);">${CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[1].answerHtml
      }</g>
              <g style="transform:translate(${A5_PAGE_WIDTH_HALF}mm, ${Y4}mm);">${CURRENT_DATE_OFF_THE_SHELF_QUESTIONS[2].answerHtml
      }</g>

              ${BORDER_LINE_HTML}
              ${SEPERATOR_LINE_HTML}

              ${A5_PAGE_SVG_END}`,
        );
    }

    return window;
}

function fillPageContents() {
    const {
        QUESTION_PAGE_CONTENT_ARRAY,
        ANSWER_PAGE_CONTENT_ARRAY,
        QUESTION_COVER_PAGE_CONTENT,
        ANSWER_COVER_PAGE_CONTENT,
        QUESTION_TEXT_PAGE_CONTENT_ARRAY,
        ANSWER_TEXT_PAGE_CONTENT_ARRAY,
        COVER_CONTENT_X,
        COVER_CONTENT_Y,
        A5_PAGE_WIDTH,
        A5_PAGE_HEIGHT,
        COVER_PAGE_SUBJECT_FONT_SIZE,
        A5_PAGE_SVG_END,
        LEFT_A5_PAGE_SVG_START,
        RIGHT_A5_PAGE_SVG_START,
        EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK,
        COVER_CONTENT_VERTICAL_ALIGN,

        DAY_COUNT,
        REMOVE_COVER,
        IS_NO_TRIM,
    } = DATA;

    if (!REMOVE_COVER) {
        QUESTION_PAGE_CONTENT_ARRAY.push(QUESTION_COVER_PAGE_CONTENT);
        ANSWER_PAGE_CONTENT_ARRAY.push(ANSWER_COVER_PAGE_CONTENT);
    }
    QUESTION_TEXT_PAGE_CONTENT_ARRAY.forEach(page_content => {
        QUESTION_PAGE_CONTENT_ARRAY.push(page_content);
    });
    ANSWER_TEXT_PAGE_CONTENT_ARRAY.forEach(page_content => {
        ANSWER_PAGE_CONTENT_ARRAY.push(page_content);
    });

    // 算法简化版
    const QUESTION_PAGE_CONTENT = '';
    const ANSWER_PAGE_CONTENT = '';
    if (REMOVE_COVER) {
        if (DAY_COUNT < 4 || IS_NO_TRIM) {
            // 不足4天或不裁切时，必定追加空白页
            EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.forEach(empty_page_index => {
                QUESTION_PAGE_CONTENT_ARRAY.push(QUESTION_PAGE_CONTENT);
                ANSWER_PAGE_CONTENT_ARRAY.push(ANSWER_PAGE_CONTENT);
            });
        } else {
            EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.forEach((empty_page_index, index) => {
                QUESTION_PAGE_CONTENT_ARRAY.splice(empty_page_index, 0, QUESTION_PAGE_CONTENT);
                ANSWER_PAGE_CONTENT_ARRAY.splice(empty_page_index, 0, ANSWER_PAGE_CONTENT);
            });
        }
    } else {
        EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK.forEach((empty_page_index, index) => {
            // const IS_BACK_COVER = index === 2;
            const IS_PUSH = DAY_COUNT > 1 && index > 0;
            // const CURRENT_A5_PAGE_SVG_START =
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
    const {
        PAPER_COUNT,
        IS_NO_TRIM,
        A5_PAGE_MAX_INDEX,
        QUESTION_PAGE_CONTENT_ARRAY,
        ANSWER_PAGE_CONTENT_ARRAY,
    } = DATA;

    let html_question = '';
    let html_answer = '';

    // 计算每张A4纸的内容，合并为两个A5小册子——每页正反面各一个svg，于svg内自动补充页眉页脚
    // EMPTY_PAGE_INDEXS_IN_MANUAL_BOOK
    for (let loop_of_paper = 0; loop_of_paper < PAPER_COUNT; ++loop_of_paper) {
        const PAGE_INDEX_START = IS_NO_TRIM ? loop_of_paper * 4 : loop_of_paper * 2;
        const PAGE_INDEX_END = IS_NO_TRIM ?
            PAGE_INDEX_START + 3 :
            A5_PAGE_MAX_INDEX - PAGE_INDEX_START;
        const PAGE_INDEX_1 = PAGE_INDEX_START + 0;
        const PAGE_INDEX_2 = PAGE_INDEX_START + 1;
        const PAGE_INDEX_3 = PAGE_INDEX_END - 1;
        const PAGE_INDEX_4 = PAGE_INDEX_END;

        const QUESTION_PAGE_CONTENT_1 = QUESTION_PAGE_CONTENT_ARRAY[PAGE_INDEX_1];
        const QUESTION_PAGE_CONTENT_2 = QUESTION_PAGE_CONTENT_ARRAY[PAGE_INDEX_2];
        const QUESTION_PAGE_CONTENT_3 = QUESTION_PAGE_CONTENT_ARRAY[PAGE_INDEX_3];
        const QUESTION_PAGE_CONTENT_4 = QUESTION_PAGE_CONTENT_ARRAY[PAGE_INDEX_4];

        const ANSWER_PAGE_CONTENT_1 = ANSWER_PAGE_CONTENT_ARRAY[PAGE_INDEX_1];
        const ANSWER_PAGE_CONTENT_2 = ANSWER_PAGE_CONTENT_ARRAY[PAGE_INDEX_2];
        const ANSWER_PAGE_CONTENT_3 = ANSWER_PAGE_CONTENT_ARRAY[PAGE_INDEX_3];
        const ANSWER_PAGE_CONTENT_4 = ANSWER_PAGE_CONTENT_ARRAY[PAGE_INDEX_4];

        const PAGE_CONTENT_HTML_START = '<page><svg xmlns="http://www.w3.org/2000/svg">';
        const PAGE_CONTENT_HTML_END = '</svg></page>';
        const QUESTION_PAGE_CONTENT = `
              ${PAGE_CONTENT_HTML_START}
                ${QUESTION_PAGE_CONTENT_4}
                ${QUESTION_PAGE_CONTENT_1}
              ${PAGE_CONTENT_HTML_END}

              ${PAGE_CONTENT_HTML_START}
                ${QUESTION_PAGE_CONTENT_2}
                ${QUESTION_PAGE_CONTENT_3}
              ${PAGE_CONTENT_HTML_END}
            `;
        const ANSWER_PAGE_CONTENT = `
              ${PAGE_CONTENT_HTML_START}
                ${ANSWER_PAGE_CONTENT_4}
                ${ANSWER_PAGE_CONTENT_1}
              ${PAGE_CONTENT_HTML_END}

              ${PAGE_CONTENT_HTML_START}
                ${ANSWER_PAGE_CONTENT_2}
                ${ANSWER_PAGE_CONTENT_3}
              ${PAGE_CONTENT_HTML_END}
            `;

        html_question = html_question.concat(QUESTION_PAGE_CONTENT);
        html_answer = html_answer.concat(ANSWER_PAGE_CONTENT);
    }

    return html_question.concat(html_answer);
}

function main() {
    // 8 A+B+C, A+B-C, A-B-C, A-B+C, A×B×C, A÷B÷C, A×B÷C, A÷B×C,
    // 8 A×B+C, A×B-C, A÷B+C, A÷B-C, A+B×C, A-B×C, A+B÷C, A-B÷C,
    // 4 A+(B+C), A-(B+C), A+(B-C), A-(B-C),
    // 4 A×(B+C), A÷(B+C), A×(B-C), A÷(B-C)
    const OFF_THE_SHELF_QUESTION_TYPE_ARRAY = [];
    // 跳过了以下项：A+B+C, A-B+C, A×B×C, A÷B÷C, A×B+C, A×B-C, A÷B+C, A÷B-C, A+B×C
    OFF_THE_SHELF_QUESTION_TYPE_ARRAY.push(1);
    OFF_THE_SHELF_QUESTION_TYPE_ARRAY.push(3);
    OFF_THE_SHELF_QUESTION_TYPE_ARRAY.push(6);
    OFF_THE_SHELF_QUESTION_TYPE_ARRAY.push(7);
    for (let i = 12; i < 24; ++i) {
        OFF_THE_SHELF_QUESTION_TYPE_ARRAY.push(i);
    }
    const OFF_THE_SHELF_QUESTION_TYPE_COUNT = OFF_THE_SHELF_QUESTION_TYPE_ARRAY.length;
    DATA.OFF_THE_SHELF_QUESTION_TYPE_ARRAY = OFF_THE_SHELF_QUESTION_TYPE_ARRAY;
    DATA.OFF_THE_SHELF_QUESTION_TYPE_COUNT = OFF_THE_SHELF_QUESTION_TYPE_COUNT;

    parseUrl()
        .countPageCount()
        .countPositionAndSize()
        .countCoverPageContent()
        .fillContentPageContents()
        .fillPageContents();

    document.getElementsByTagName('body')[0].innerHTML = getBodyHtml();

    // // window.print();
}

window.onload = main;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getQuestionByKindArray = [
    getQuestionByKind00,
    getQuestionByKind01,
    getQuestionByKind02,
    getQuestionByKind03,
    getQuestionByKind04,
    getQuestionByKind05,
    getQuestionByKind06,
    getQuestionByKind07,
    getQuestionByKind08,
    getQuestionByKind09,
    getQuestionByKind10,
    getQuestionByKind11,
    getQuestionByKind12,
    getQuestionByKind13,
    getQuestionByKind14,
    getQuestionByKind15,
    getQuestionByKind16,
    getQuestionByKind17,
    getQuestionByKind18,
    getQuestionByKind19,
    getQuestionByKind20,
    getQuestionByKind21,
    getQuestionByKind22,
    getQuestionByKind23,
];

// 限定脱式题型（商 quotient, 余数 remainder）
function getQuestionByKind(questionType, questionKind) {
    const IS_ORAL = questionKind === QuestionCategoryType.Oral;
    // const IS_VERTICAL = questionKind === QuestionCategoryType.Vertical;
    const IS_OFF_THE_SHELF = questionKind === QuestionCategoryType.OffTheShelf;

    const {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result: resultValue,
        formula,
        secondRowFormula,
        last_step_is_divide,
        quotient,
        remainder,
    } = getQuestionByKindArray[questionType](questionKind);

    // 用于跟踪负数情况！
    if (a < 0 || b < 0 || c < 0) {
        console.log('a', a, 'b', b, 'c', c);
    }

    const FORMULA_STRING = getMathFormula(formula);

    const {
        QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH,
        QUESTION_ROW_HEIGHT,
        // CONTENT_PAGE_CONTENT_CHAR_WIDTH,
        CONTENT_PAGE_CONTENT_FONT_SIZE,
        OFF_THE_SHELF_QUESTION_X,
    } = DATA;

    // https://fex-team.github.io/blog/2014/06/svg-whitespace/
    const QUESTION_ROW_HEIGHT_HALF = QUESTION_ROW_HEIGHT * 0.5;
    // const QUESTION_ROW_HTML = `<text class="right middle" x="${QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH}mm" y="${QUESTION_ROW_HEIGHT_HALF}mm" style="height:${QUESTION_ROW_HEIGHT}mm">${FORMULA_STRING}${
    //   IS_OFF_THE_SHELF ? '&nbsp;&nbsp;&nbsp;' : ' =&nbsp;'
    // }</text>`;
    const QUESTION_ROW_HTML = IS_OFF_THE_SHELF ?
        `<text class="left middle" x="${OFF_THE_SHELF_QUESTION_X}mm" y="${QUESTION_ROW_HEIGHT_HALF}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm;">${FORMULA_STRING.concat(
          IS_OFF_THE_SHELF ? '   ' : ' = ',
        )}</text>` :
        `<text class="right middle" x="${QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH}mm" y="${QUESTION_ROW_HEIGHT_HALF}mm" style="height:${QUESTION_ROW_HEIGHT}mm;font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm;">${getContentPageContentTextByChars(
          FORMULA_STRING.concat(IS_OFF_THE_SHELF ? '   ' : ' = '),
        )}</text>`;

    const OFF_THE_SHELF_ANSWER_START_ROW_HTML = !IS_OFF_THE_SHELF ? '' : `<text class="left middle" x="${OFF_THE_SHELF_QUESTION_X}mm" y="${QUESTION_ROW_HEIGHT_HALF}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm;">${getOffTheShelfMathFormula(formula, a, c, lineCountMethod)}</text>`;

    // if (last_step_is_divide) {
    //     result = `${quotient}${remainder > 0 ? `......${remainder}` : ''}`;
    // } else {
    //     result = result.toString();
    // }
    const result = last_step_is_divide ? `${quotient}${remainder > 0 ? `......${remainder}` : ''}` : resultValue.toString();

    const ANSWER_HTML = IS_OFF_THE_SHELF ?
        '' :
        `<text class="left middle" x="${QUESTION_ROW_BEFORE_EQUAL_SIGN_WIDTH}mm" y="${QUESTION_ROW_HEIGHT_HALF}mm" style="font-size:${CONTENT_PAGE_CONTENT_FONT_SIZE}mm;">&nbsp;${result}</text>`;

    const STEP_HTML = IS_ORAL ?
        '' :
        IS_OFF_THE_SHELF ?
        getOffTheShelfQuestionStepHtml(lineCountMethod, a, b, c, secondRowFormula, result) :
        getVertialQuestionStepHtml(
            lineCountMethod,
            isOnlyOneColumn,
            operator1,
            operator2,
            a,
            b,
            c,
            middleResult,
            result,
            quotient,
            remainder,
        );

    return {
        // 问题页，仅题目
        questionHtml: QUESTION_ROW_HTML,
        // 答案页：题目与答案、步骤
        // answerHtml: `${QUESTION_ROW_HTML}${ANSWER_HTML}${STEP_HTML}`,
        answerHtml: `${IS_OFF_THE_SHELF ? OFF_THE_SHELF_ANSWER_START_ROW_HTML : QUESTION_ROW_HTML}${ANSWER_HTML}${STEP_HTML}`,
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** A+B+C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind00(questionKind) {
    const {
        addend1: a,
        addend2: b,
        sum: middleResult,
    } = getAdditionTupleByResultLimited(questionKind);

    const {
        addend: c,
        result
    } = getAdditionTupleWithAddendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}+${b}+${c}`;

    const lineCountMethod = LineCountMethodType.LeftToRight;
    const isOnlyOneColumn = true;
    const operator1 = '+';
    const operator2 = '+';
    const secondRowFormula = `${middleResult}+${c}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A+B-C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
 */
function getQuestionByKind01(questionKind) {
    const {
        addend1: a,
        addend2: b,
        sum: middleResult,
    } = getAdditionTupleByResultLimited(questionKind);

    const {
        subtrahend: c,
        result
    } = getSubtractionTupleWithMinuendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}+${b}-${c}`;

    const lineCountMethod = LineCountMethodType.LeftToRight;
    const isOnlyOneColumn = true;
    const operator1 = '+';
    const operator2 = '-';
    const secondRowFormula = `${middleResult}-${c}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A-B-C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
 */
function getQuestionByKind02(questionKind) {
    const {
        addend1: b,
        addend2: c,
        sum: middleResult1,
    } = getAdditionTupleByResultLimited(questionKind);

    const {
        minuend: a,
        result
    } = getSubtractionTupleWithSubtrahendByResultLimited(
        questionKind,
        middleResult1
    );

    const middleResult = a - b;
    const formula = `${a}-${b}-${c}`;

    const lineCountMethod = LineCountMethodType.LeftToRight;
    const isOnlyOneColumn = true;
    const operator1 = '-';
    const operator2 = '-';
    const secondRowFormula = `${middleResult}-${c}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A-B+C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
 */
function getQuestionByKind03(questionKind) {
    const {
        minuend: a,
        subtrahend: b,
        difference: middleResult,
    } = getSubtractionTupleByResultLimited(questionKind);

    const {
        addend: c,
        result
    } = getAdditionTupleWithAddendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}-${b}+${c}`;

    const lineCountMethod = LineCountMethodType.LeftToRight;
    const isOnlyOneColumn = true;
    const operator1 = '-';
    const operator2 = '+';
    const secondRowFormula = `${middleResult}+${c}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A×B×C
 * @param {number} _questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
 */
function getQuestionByKind04(_questionKind) {
    // const {
    //     multiplier1: a,
    //     multiplier2: b,
    //     product: middleResult,
    // } = MAP_OF_GET_QUESTION_BY_KIND_04[FUNCTION_KEY]();

    // 54 × 32 × 2 = 3456
    const DATA1 = {
        multiplier1: 54,
        multiplier2: 32,
        product: 54 * 32,
    };
    const {
        multiplier1: a,
        multiplier2: b,
        product: middleResult,
    } = DEBUGGGING ? DATA1 : MAP_OF_GET_QUESTION_BY_KIND_04[FUNCTION_KEY]();

    const c = Math.ceil(Math.random() * 9);
    const result = middleResult * c;

    const formula = `${a}*${b}*${c}`;

    const lineCountMethod = LineCountMethodType.LeftToRight;
    const isOnlyOneColumn = true;
    const operator1 = '*';
    const operator2 = '*';
    const secondRowFormula = `${middleResult}*${c}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A÷B÷C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
        last_step_is_divide: boolean,
        quotient: number,
        remainder: number,
    }
*/
function getQuestionByKind05(_questionKind) {
    const {
        multiplier1: b,
        multiplier2: middleResult,
        product: a,
    } = MAP_OF_GET_QUESTION_BY_KIND_05[FUNCTION_KEY]();

    const c = Math.ceil(Math.random() * middleResult);
    const {
        quotient,
        remainder
    } = getDivisionTupleMayContainRemainder(middleResult, c);

    const formula = `${a}/${b}/${c}`;

    const lineCountMethod = LineCountMethodType.LeftToRight;
    const isOnlyOneColumn = false;
    const operator1 = '/';
    const operator2 = '/';
    const secondRowFormula = `${middleResult}/${c}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result: 0,
        formula,
        secondRowFormula,
        last_step_is_divide: true,
        quotient,
        remainder
    };
}

/** A*B÷C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
        last_step_is_divide: boolean,
        quotient: number,
        remainder: number,
    }
*/
function getQuestionByKind06(_questionKind) {
    // const {
    //     multiplier1: a,
    //     multiplier2: b,
    //     product: middleResult,
    // } = MAP_OF_GET_QUESTION_BY_KIND_06[FUNCTION_KEY]();
    // const c = Math.ceil(Math.random() * Math.min(9, middleResult));

    // 以这个测试发现，A*B÷C中除法竖式位置不对来源于乘法的位置不对。
    // 3258 × 1 ÷ 6 = 547......3
    // const DATA1 = {
    //     multiplier1: 3258,
    //     multiplier2: 1,
    //     product: 3258,
    // };

    // 73 × 45 ÷ 6 = 547......3
    const DATA1 = {
        multiplier1: 73,
        multiplier2: 45,
        product: 73 * 45,
    };
    const {
        multiplier1: a,
        multiplier2: b,
        product: middleResult,
    } = DEBUGGGING ? DATA1 : MAP_OF_GET_QUESTION_BY_KIND_06[FUNCTION_KEY]();
    const c = DEBUGGGING ? 6 : Math.ceil(Math.random() * Math.min(9, middleResult));

    const {
        quotient,
        remainder
    } = getDivisionTupleMayContainRemainder(middleResult, c);

    const formula = `${a}*${b}/${c}`;

    const lineCountMethod = LineCountMethodType.LeftToRight;
    const isOnlyOneColumn = false;
    const operator1 = '*';
    const operator2 = '/';
    const secondRowFormula = `${middleResult}/${c}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result: 0,
        formula,
        secondRowFormula,
        last_step_is_divide: true,
        quotient,
        remainder
    };
}

/** A÷B×C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind07(_questionKind) {
    const {
        dividend: a,
        divisor: b,
        quotient: middleResult,
    } = MAP_OF_GET_QUESTION_BY_KIND_07A[FUNCTION_KEY]();
    const {
        multiplier: c,
        product: result
    } = MAP_OF_GET_QUESTION_BY_KIND_07B[FUNCTION_KEY](middleResult);

    // const DATA1 = {
    //     dividend: 232,
    //     divisor: 4,
    //     quotient: 58
    // };
    // const DATA2 = {
    //     multiplier: 900,
    //     product: 52200
    // };
    // const {
    //     dividend: a,
    //     divisor: b,
    //     quotient: middleResult,
    // } = DEBUGGGING ? DATA1 : MAP_OF_GET_QUESTION_BY_KIND_07A[FUNCTION_KEY]();
    // const {
    //     multiplier: c,
    //     product: result
    // } = DEBUGGGING ? DATA2 : MAP_OF_GET_QUESTION_BY_KIND_07B[FUNCTION_KEY](middleResult);

    const formula = `${a}/${b}*${c}`;

    const lineCountMethod = LineCountMethodType.LeftToRight;
    const isOnlyOneColumn = false;
    const operator1 = '/';
    const operator2 = '*';
    const secondRowFormula = `${middleResult}*${c}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A×B+C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind08(questionKind) {
    const {
        multiplier1: a,
        multiplier2: b,
        product: middleResult,
    } = MAP_OF_GET_QUESTION_BY_KIND_08[FUNCTION_KEY]();

    // // 60 × 2 ＋ c
    // const DATA1 = {
    //     multiplier1: 60,
    //     multiplier2: 2,
    //     product: 120,
    // };
    // const {
    //     multiplier1: a,
    //     multiplier2: b,
    //     product: middleResult,
    // } = DEBUGGGING ? DATA1 : MAP_OF_GET_QUESTION_BY_KIND_08[FUNCTION_KEY]();

    const {
        addend: c,
        result
    } = getAdditionTupleWithAddendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}*${b}+${c}`;

    const lineCountMethod = LineCountMethodType.LeftToRight;
    const isOnlyOneColumn = true;
    const operator1 = '*';
    const operator2 = '+';
    const secondRowFormula = `${middleResult}+${c}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A×B-C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind09(questionKind) {
    // const {
    //     multiplier1: a,
    //     multiplier2: b,
    //     product: middleResult,
    // } = MAP_OF_GET_QUESTION_BY_KIND_09[FUNCTION_KEY]();
    // const {
    //     subtrahend: c,
    //     result
    // } = getSubtractionTupleWithMinuendByResultLimited(
    //     questionKind,
    //     middleResult
    // );

    // 61 × 23 － 897 = 506
    const DATA1 = {
        multiplier1: 61,
        multiplier2: 23,
        product: 61 * 23,
    };
    const DATA2 = {
        subtrahend: 897,
        result: 506
    };
    const {
        multiplier1: a,
        multiplier2: b,
        product: middleResult,
    } = DEBUGGGING ? DATA1 : MAP_OF_GET_QUESTION_BY_KIND_09[FUNCTION_KEY]();
    const {
        subtrahend: c,
        result
    } = DEBUGGGING ? DATA2 : getSubtractionTupleWithMinuendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}*${b}-${c}`;

    const lineCountMethod = LineCountMethodType.LeftToRight;
    const isOnlyOneColumn = true;
    const operator1 = '*';
    const operator2 = '-';
    const secondRowFormula = `${middleResult}-${c}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A÷B+C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind10(questionKind) {
    const {
        dividend: a,
        divisor: b,
        quotient: middleResult,
    } = MAP_OF_GET_QUESTION_BY_KIND_10[FUNCTION_KEY]();

    const {
        addend: c,
        result
    } = getAdditionTupleWithAddendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}/${b}+${c}`;

    const lineCountMethod = LineCountMethodType.LeftToRight;
    const isOnlyOneColumn = false;
    const operator1 = '/';
    const operator2 = '+';
    const secondRowFormula = `${middleResult}+${c}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A÷B-C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind11(questionKind) {
    const {
        dividend: a,
        divisor: b,
        quotient: middleResult,
    } = MAP_OF_GET_QUESTION_BY_KIND_11[FUNCTION_KEY]();
    const {
        subtrahend: c,
        result
    } = getSubtractionTupleWithMinuendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}/${b}-${c}`;

    const lineCountMethod = LineCountMethodType.LeftToRight;
    const isOnlyOneColumn = false;
    const operator1 = '/';
    const operator2 = '-';
    const secondRowFormula = `${middleResult}-${c}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A+B*C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind12(questionKind) {
    const {
        multiplier1: b,
        multiplier2: c,
        product: middleResult,
    } = MAP_OF_GET_QUESTION_BY_KIND_12[FUNCTION_KEY]();

    const {
        addend: a,
        result
    } = getAdditionTupleWithAddendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}+${b}*${c}`;

    const lineCountMethod = LineCountMethodType.RightToLeft;
    const isOnlyOneColumn = true;
    const operator1 = '*';
    const operator2 = '+';
    const secondRowFormula = `${a}+${middleResult}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A-B*C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind13(questionKind) {
    const {
        multiplier1: b,
        multiplier2: c,
        product: middleResult,
    } = MAP_OF_GET_QUESTION_BY_KIND_13[FUNCTION_KEY]();

    const {
        minuend: a,
        result
    } = getSubtractionTupleWithSubtrahendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}-${b}*${c}`;

    const lineCountMethod = LineCountMethodType.RightToLeft;
    const isOnlyOneColumn = false;
    const operator1 = '*';
    const operator2 = '-';
    const secondRowFormula = `${a}-${middleResult}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A+B÷C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind14(questionKind) {
    const {
        dividend: b,
        divisor: c,
        quotient: middleResult,
    } = MAP_OF_GET_QUESTION_BY_KIND_14[FUNCTION_KEY]();

    const {
        addend: a,
        result
    } = getAdditionTupleWithAddendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}+${b}/${c}`;

    const lineCountMethod = LineCountMethodType.RightToLeft;
    const isOnlyOneColumn = false;
    const operator1 = '/';
    const operator2 = '+';
    const secondRowFormula = `${a}+${middleResult}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A-B÷C
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind15(questionKind) {

    // c = Math.ceil(Math.random() * 9);
    // b = c * Math.ceil(Math.random() * 9);

    const {
        dividend: b,
        divisor: c,
        quotient: middleResult,
    } = MAP_OF_GET_QUESTION_BY_KIND_15[FUNCTION_KEY]();

    const {
        minuend: a,
        result
    } = getSubtractionTupleWithSubtrahendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}-${b}/${c}`;

    const lineCountMethod = LineCountMethodType.RightToLeft;
    const isOnlyOneColumn = false;
    const operator1 = '/';
    const operator2 = '-';
    const secondRowFormula = `${a}-${middleResult}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}


/** A+(B+C)
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind16(questionKind) {
    const {
        addend1: b,
        addend2: c,
        sum: middleResult,
    } = getAdditionTupleByResultLimited(questionKind);

    const {
        addend: a,
        result
    } = getAdditionTupleWithAddendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}+(${b}+${c})`;

    const lineCountMethod = LineCountMethodType.RightToLeftByBrackets;
    const isOnlyOneColumn = true;
    const operator1 = '+';
    const operator2 = '+';
    const secondRowFormula = `${a}+${middleResult}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}


/** A-(B+C)
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind17(questionKind) {
    const {
        addend1: b,
        addend2: c,
        sum: middleResult,
    } = getAdditionTupleByResultLimited(questionKind);

    const {
        minuend: a,
        result
    } = getSubtractionTupleWithSubtrahendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}-(${b}+${c})`;

    const lineCountMethod = LineCountMethodType.RightToLeftByBrackets;
    const isOnlyOneColumn = false;
    const operator1 = '+';
    const operator2 = '-';
    const secondRowFormula = `${a}-${middleResult}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A+(B-C)
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind18(questionKind) {
    const {
        minuend: b,
        subtrahend: c,
        difference: middleResult,
    } = getSubtractionTupleByResultLimited(questionKind);

    const {
        addend: a,
        result
    } = getAdditionTupleWithAddendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}+(${b}-${c})`;

    const lineCountMethod = LineCountMethodType.RightToLeftByBrackets;
    const isOnlyOneColumn = true;
    const operator1 = '-';
    const operator2 = '+';
    const secondRowFormula = `${a}+${middleResult}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A-(B-C)
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind19(questionKind) {
    const {
        minuend: b,
        subtrahend: c,
        difference: middleResult,
    } = getSubtractionTupleByResultLimited(questionKind);

    const {
        minuend: a,
        result
    } = getSubtractionTupleWithSubtrahendByResultLimited(
        questionKind,
        middleResult
    );
    const formula = `${a}-(${b}-${c})`;

    const lineCountMethod = LineCountMethodType.RightToLeftByBrackets;
    const isOnlyOneColumn = false;
    const operator1 = '-';
    const operator2 = '-';
    const secondRowFormula = `${a}-${middleResult}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A×(B+C)
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind20(_questionKind) {
    const {
        addend1: b,
        addend2: c,
        sum: middleResult
    } = getAdditionTupleByResultLimited9();

    const {
        multiplier: a,
        product: result
    } = MAP_OF_GET_QUESTION_BY_KIND_20[FUNCTION_KEY](middleResult);
    const formula = `${a}*(${b}+${c})`;

    const lineCountMethod = LineCountMethodType.RightToLeftByBrackets;
    const isOnlyOneColumn = true;
    const operator1 = '+';
    const operator2 = '*';
    const secondRowFormula = `${a}*${middleResult}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A÷(B+C)
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
        last_step_is_divide: boolean,
        quotient: number,
        remainder: number,
    }
*/
function getQuestionByKind21(_questionKind) {
    // 94 ÷ (9 ＋ 0) = 10......4
    // const DATA1 = {
    //     addend1: 9,
    //     addend2: 0,
    //     sum: 9
    // };
    // const DATA2 = {
    //     dividend: 94,
    //     quotient: 10,
    //     remainder: 4
    // };

    // 607 ÷ (8066 － 8064) = 303......1
    // 607 ÷ (1 + 1) = 303......1
    // const DATA1 = {
    //     addend1: 1,
    //     addend2: 1,
    //     sum: 2
    // };
    // const DATA2 = {
    //     dividend: 607,
    //     quotient: 303,
    //     remainder: 1
    // };

    // 4073 ÷ (3274 － 3266) = 509......1
    // 4073 ÷ (2 + 6) = 509......1
    // const DATA1 = {
    //     addend1: 2,
    //     addend2: 6,
    //     sum: 8
    // };
    // const DATA2 = {
    //     dividend: 4073,
    //     quotient: 509,
    //     remainder: 1
    // };

    // const {
    //     addend1: b,
    //     addend2: c,
    //     sum: middleResult
    // } = DEBUGGGING ? DATA1 : getAdditionTupleByResultLimited9();
    // const {
    //     dividend: a,
    //     quotient,
    //     remainder,
    // } = DEBUGGGING ? DATA2 : MAP_OF_GET_QUESTION_BY_KIND_21[FUNCTION_KEY](middleResult);

    const {
        addend1: b,
        addend2: c,
        sum: middleResult
    } = getAdditionTupleByResultLimited9();
    const {
        dividend: a,
        quotient,
        remainder,
    } = MAP_OF_GET_QUESTION_BY_KIND_21[FUNCTION_KEY](middleResult);

    const formula = `${a}/(${b}+${c})`;

    const lineCountMethod = LineCountMethodType.RightToLeftByBrackets;
    const isOnlyOneColumn = false;
    const operator1 = '+';
    const operator2 = '/';
    const secondRowFormula = `${a}/${middleResult}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result: 0,
        formula,
        secondRowFormula,
        last_step_is_divide: true,
        quotient,
        remainder,
    };
}

/** A×(B-C)
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
    }
*/
function getQuestionByKind22(questionKind) {
    const {
        minuend: b,
        subtrahend: c,
        difference: middleResult,
    } = getSubtractionTupleByResultLimited9(questionKind, 2);

    const {
        multiplier: a,
        product: result
    } = MAP_OF_GET_QUESTION_BY_KIND_22[FUNCTION_KEY](middleResult);

    const formula = `${a}*(${b}-${c})`;

    const lineCountMethod = LineCountMethodType.RightToLeftByBrackets;
    const isOnlyOneColumn = true;
    const operator1 = '-';
    const operator2 = '*';
    const secondRowFormula = `${a}*${middleResult}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result,
        formula,
        secondRowFormula,
    };
}

/** A÷(B-C)
 * @param {number} questionKind
 * @returns {
        isOnlyOneColumn: boolean,
        lineCountMethod: LineCountMethodType,
        operator1: string,
        operator2: string,
        a: number,
        b: number,
        c: number,
        middleResult: number,
        result: number,
        formula: string,
        secondRowFormula: string,
        last_step_is_divide: boolean,
        quotient: number,
        remainder: number,
    }
*/
function getQuestionByKind23(questionKind) {
    const {
        minuend: b,
        subtrahend: c,
        difference: middleResult,
    } = getSubtractionTupleByResultLimited9(questionKind, 2);

    const {
        dividend: a,
        quotient,
        remainder,
    } = MAP_OF_GET_QUESTION_BY_KIND_23[FUNCTION_KEY](middleResult);

    const formula = `${a}/(${b}-${c})`;

    const lineCountMethod = LineCountMethodType.RightToLeftByBrackets;
    const isOnlyOneColumn = false;
    const operator1 = '-';
    const operator2 = '/';
    const secondRowFormula = `${a}/${middleResult}`;

    return {
        isOnlyOneColumn,
        lineCountMethod,
        operator1,
        operator2,
        a,
        b,
        c,
        middleResult,
        result: 0,
        formula,
        secondRowFormula,
        last_step_is_divide: true,
        quotient,
        remainder,
    };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// grade3_term2_phase2: 80%概率(100a + b) * c，20%概率a * b或a * 10b
function getDivisionTupleWithoutRemainder_grade3_term2_phase2() {
    // dividend, divisor, quotient, remainder
    const divisor = Math.ceil(Math.random() * 9); // * Math.pow(10, Math.floor(Math.random() * 2));
    // const quotient = Math.ceil(Math.random() * 9) * Math.pow(10, Math.floor(Math.random() * 2));
    // const quotient = (Math.random() < 0.8 ? Math.ceil(Math.random() * 9) * Math.pow(10, 2) : 0) + Math.ceil(Math.random() * 9);
    const quotient = Math.random() < 0.8 ? (Math.ceil(Math.random() * 9) * Math.pow(10, 2) + Math.ceil(Math.random() * 9)) : (Math.ceil(Math.random() * 9) * Math.pow(10, Math.floor(Math.random() * 2)));
    const dividend = divisor * quotient;
    return {
        dividend,
        divisor,
        quotient
    };
}

// 80%概率(100a + b) * c + d，20%概率a * b + c或a * 10b + c
function getDivisionTupleMayContainRemainderWithDivisor_grade3_term2_phase2(divisor) {
    // const quotient = Math.ceil(Math.random() * 9);
    // const quotient = (Math.random() < 0.8 ? Math.ceil(Math.random() * 9) * Math.pow(10, 2) : 0) + Math.ceil(Math.random() * 9);

    const quotient = Math.random() < 0.8 ? (Math.ceil(Math.random() * 9) * Math.pow(10, 2) + Math.ceil(Math.random() * 9)) : (Math.ceil(Math.random() * 9) * Math.pow(10, Math.floor(Math.random() * 2)));
    const remainder = Math.floor(Math.random() * (divisor - 1)) + 1;
    const dividend = divisor * quotient + remainder;
    // console.log('getDivisionTupleMayContainRemainderWithDivisor_grade3_term2_phase2',
    //     dividend,
    //     quotient,
    //     remainder);
    return {
        dividend,
        quotient,
        remainder
    };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// grade3_term2_phase3:
function getIntBetween10And100() {
    return Math.ceil(Math.random() * 90) + 10;
}

function getMultiplicationTuple_grade3_term2_phase3_a() {
    const IS_COMPLEX = Math.random() < 0.9;
    const multiplier1 = IS_COMPLEX ? getIntBetween10And100() : (Math.ceil(Math.random() * 100) * Math.pow(10, Math.floor(Math.random() * 2)));
    const multiplier2 = IS_COMPLEX ? getIntBetween10And100() : Math.ceil(Math.random() * 9);

    const product = multiplier1 * multiplier2;
    // console.log({ multiplier1, multiplier2, product });
    return {
        multiplier1,
        multiplier2,
        product
    };
}

function getMultiplicationTuple_grade3_term2_phase3_b() {
    const IS_COMPLEX = Math.random() < 0.9;
    const POWER1 = Math.pow(10, Math.floor(Math.random() * 2));
    const multiplier1 = IS_COMPLEX ? getIntBetween10And100() : Math.ceil(Math.random() * 9) * 10 * POWER1;
    const multiplier2 = IS_COMPLEX ? getIntBetween10And100() : Math.ceil(Math.random() * 9); // * (10 * Math.pow(10, Math.floor(Math.random() * 2)) / POWER1);
    const product = multiplier1 * multiplier2;
    return {
        multiplier1,
        multiplier2,
        product
    };
}


// 获取乘数限定于1-9的整十、整百、整千倍的乘法
function getMultiplicationTuple_grade3_term2_phase3_c() {
    const IS_COMPLEX = Math.random() < 0.5;
    const POWER1 = Math.pow(10, Math.floor(Math.random() * 2));
    const multiplier1 = IS_COMPLEX ? getIntBetween10And100() : Math.ceil(Math.random() * 9) * POWER1;
    const multiplier2 = IS_COMPLEX ? getIntBetween10And100() : Math.ceil(Math.random() * 9) * (10 * Math.pow(10, Math.floor(Math.random() * 2)) / POWER1);
    const product = multiplier1 * multiplier2;
    return {
        multiplier1,
        multiplier2,
        product
    };
}

function getMultiplicationTuple_grade3_term2_phase3_d(multiplier1) {
    const IS_COMPLEX = Math.random() < 0.9;
    // const multiplier = Math.ceil(Math.random() * 9);
    const multiplier = IS_COMPLEX ? getIntBetween10And100() : Math.ceil(Math.random() * 100) * Math.pow(10, Math.floor(Math.random() * 2));
    const product = multiplier1 * multiplier;
    return {
        multiplier,
        product
    };
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MAP_OF_GET_QUESTION_BY_KIND_04 = {
    'grade3_term1': getMultiplicationTupleByResultLimited9,
    'grade3_term2': getMultiplicationTupleByResultLimited9Advance,
    'grade3_term2_phase2': getMultiplicationTupleByResultLimited9Advance,
    'grade3_term2_phase3': getMultiplicationTuple_grade3_term2_phase3_a,
    'grade3_term2_phase4': getMultiplicationTuple_grade3_term2_phase3_a,
};
// MAP_OF_GET_QUESTION_BY_KIND_14[FUNCTION_KEY]
const MAP_OF_GET_QUESTION_BY_KIND_05 = {
    'grade3_term1': getMultiplicationTupleByMultiplierLimited9,
    'grade3_term2': getMultiplicationTupleByMultiplierLimited9Advance2,
    'grade3_term2_phase2': getMultiplicationTupleByMultiplierLimited9Advance2,
    'grade3_term2_phase3': getMultiplicationTuple_grade3_term2_phase3_b,
    'grade3_term2_phase4': getMultiplicationTuple_grade3_term2_phase3_b,
};
const MAP_OF_GET_QUESTION_BY_KIND_06 = {
    'grade3_term1': getMultiplicationTupleByMultiplierLimited9,
    'grade3_term2': getMultiplicationTupleByMultiplierLimited9Advance,
    'grade3_term2_phase2': getMultiplicationTupleByMultiplierLimited9Advance,
    'grade3_term2_phase3': getMultiplicationTuple_grade3_term2_phase3_c,
    'grade3_term2_phase4': getMultiplicationTuple_grade3_term2_phase3_c,
};
const MAP_OF_GET_QUESTION_BY_KIND_07A = {
    'grade3_term1': getDivisionTupleWithoutRemainderByResultLimited9,
    'grade3_term2': getDivisionTupleWithoutRemainderByResultLimited9Advance,
    'grade3_term2_phase2': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
    'grade3_term2_phase3': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
    'grade3_term2_phase4': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
};
const MAP_OF_GET_QUESTION_BY_KIND_07B = {
    'grade3_term1': getMultiplicationTupleWithMultiplieByMultiplierLimited9,
    'grade3_term2': getMultiplicationTupleWithMultiplieByMultiplierLimited9Advance,
    'grade3_term2_phase2': getMultiplicationTupleWithMultiplieByMultiplierLimited9Advance,
    'grade3_term2_phase3': getMultiplicationTuple_grade3_term2_phase3_d,
    'grade3_term2_phase4': getMultiplicationTuple_grade3_term2_phase3_d,
};
const MAP_OF_GET_QUESTION_BY_KIND_08 = {
    'grade3_term1': getMultiplicationTupleByMultiplierLimited9,
    'grade3_term2': getMultiplicationTupleByMultiplierLimited9Advance,
    'grade3_term2_phase2': getMultiplicationTupleByMultiplierLimited9Advance,
    'grade3_term2_phase3': getMultiplicationTuple_grade3_term2_phase3_c,
    'grade3_term2_phase4': getMultiplicationTuple_grade3_term2_phase3_c,
};
const MAP_OF_GET_QUESTION_BY_KIND_09 = {
    'grade3_term1': getMultiplicationTupleByMultiplierLimited9,
    'grade3_term2': getMultiplicationTupleByMultiplierLimited9Advance,
    'grade3_term2_phase2': getMultiplicationTupleByMultiplierLimited9Advance,
    'grade3_term2_phase3': getMultiplicationTuple_grade3_term2_phase3_c,
    'grade3_term2_phase4': getMultiplicationTuple_grade3_term2_phase3_c,
};
const MAP_OF_GET_QUESTION_BY_KIND_10 = {
    'grade3_term1': getDivisionTupleWithoutRemainderByResultLimited9,
    'grade3_term2': getDivisionTupleWithoutRemainderByResultLimited9Advance,
    'grade3_term2_phase2': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
    'grade3_term2_phase3': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
    'grade3_term2_phase4': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
};
const MAP_OF_GET_QUESTION_BY_KIND_11 = {
    'grade3_term1': getDivisionTupleWithoutRemainderByResultLimited9,
    'grade3_term2': getDivisionTupleWithoutRemainderByResultLimited9Advance,
    'grade3_term2_phase2': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
    'grade3_term2_phase3': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
    'grade3_term2_phase4': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
};
const MAP_OF_GET_QUESTION_BY_KIND_12 = {
    'grade3_term1': getMultiplicationTupleByMultiplierLimited9,
    'grade3_term2': getMultiplicationTupleByMultiplierLimited9Advance,
    'grade3_term2_phase2': getMultiplicationTupleByMultiplierLimited9Advance,
    'grade3_term2_phase3': getMultiplicationTuple_grade3_term2_phase3_c,
    'grade3_term2_phase4': getMultiplicationTuple_grade3_term2_phase3_c,
};
const MAP_OF_GET_QUESTION_BY_KIND_13 = {
    'grade3_term1': getMultiplicationTupleByMultiplierLimited9,
    'grade3_term2': getMultiplicationTupleByMultiplierLimited9Advance,
    'grade3_term2_phase2': getMultiplicationTupleByMultiplierLimited9Advance,
    'grade3_term2_phase3': getMultiplicationTuple_grade3_term2_phase3_c,
    'grade3_term2_phase4': getMultiplicationTuple_grade3_term2_phase3_c,
};
const MAP_OF_GET_QUESTION_BY_KIND_14 = {
    'grade3_term1': getDivisionTupleWithoutRemainderByResultLimited9,
    'grade3_term2': getDivisionTupleWithoutRemainderByResultLimited9Advance,
    'grade3_term2_phase2': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
    'grade3_term2_phase3': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
    'grade3_term2_phase4': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
};
const MAP_OF_GET_QUESTION_BY_KIND_15 = {
    'grade3_term1': getDivisionTupleWithoutRemainderByResultLimited9,
    'grade3_term2': getDivisionTupleWithoutRemainderByResultLimited9Advance,
    'grade3_term2_phase2': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
    'grade3_term2_phase3': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
    'grade3_term2_phase4': getDivisionTupleWithoutRemainder_grade3_term2_phase2,
};
const MAP_OF_GET_QUESTION_BY_KIND_20 = {
    'grade3_term1': getMultiplicationTupleWithMultiplieByMultiplierLimited9,
    'grade3_term2': getMultiplicationTupleWithMultiplieByMultiplierLimited9Advance,
    'grade3_term2_phase2': getMultiplicationTupleWithMultiplieByMultiplierLimited9Advance,
    'grade3_term2_phase3': getMultiplicationTuple_grade3_term2_phase3_d,
    'grade3_term2_phase4': getMultiplicationTuple_grade3_term2_phase3_d,
};
const MAP_OF_GET_QUESTION_BY_KIND_21 = {
    'grade3_term1': getDivisionTupleMayContainRemainderWithDivisorByResultLimited9,
    'grade3_term2': getDivisionTupleMayContainRemainderWithDivisor_grade3_term2_phase2,
    'grade3_term2_phase2': getDivisionTupleMayContainRemainderWithDivisor_grade3_term2_phase2,
    'grade3_term2_phase3': getDivisionTupleMayContainRemainderWithDivisor_grade3_term2_phase2,
    'grade3_term2_phase4': getDivisionTupleMayContainRemainderWithDivisor_grade3_term2_phase2,
};
const MAP_OF_GET_QUESTION_BY_KIND_22 = {
    'grade3_term1': getMultiplicationTupleWithMultiplieByMultiplierLimited9,
    'grade3_term2': getMultiplicationTupleWithMultiplieByMultiplierLimited9Advance,
    'grade3_term2_phase2': getMultiplicationTupleWithMultiplieByMultiplierLimited9Advance,
    'grade3_term2_phase3': getMultiplicationTuple_grade3_term2_phase3_d,
    'grade3_term2_phase4': getMultiplicationTuple_grade3_term2_phase3_d,
};
const MAP_OF_GET_QUESTION_BY_KIND_23 = {
    'grade3_term1': getDivisionTupleMayContainRemainderWithDivisorByResultLimited9,
    'grade3_term2': getDivisionTupleMayContainRemainderWithDivisor_grade3_term2_phase2,
    'grade3_term2_phase2': getDivisionTupleMayContainRemainderWithDivisor_grade3_term2_phase2,
    'grade3_term2_phase3': getDivisionTupleMayContainRemainderWithDivisor_grade3_term2_phase2,
    'grade3_term2_phase4': getDivisionTupleMayContainRemainderWithDivisor_grade3_term2_phase2,
};