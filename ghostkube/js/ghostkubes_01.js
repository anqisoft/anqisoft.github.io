"use strict";
// v0.0.5
exports.__esModule = true;
var log_ts_1 = require("./log.ts");
var ghostkubes_ts_1 = require("./ghostkubes.ts");
log_ts_1.Globals.LOG_FILE_NAME = './ghostkubes_01.log.txt';
var GOAL_FILE = './js/data_ghostkubes_01.js';
var DATAS = [
    {
        // keystone
        setName: "KS",
        cubes: [
            [[], []],
        ]
    },
    // small
    {
        setName: 'MA-2',
        cubes: [
            // 1-4
            [[8], [7, 9]],
            [[8], [7, 9]],
            [[8], [7, 9]],
            [[8], [7, 9]],
            // 5-8
            [[3], [11]],
            [[3], [11]],
            [[3], [11]],
            [[3], [11]],
            // 9-12, not same to 1-4
            [[8, 9], [7]],
            [[8, 9], [7]],
            [[8, 9], [7]],
            [[8, 9], [7]],
        ]
    },
    {
        setName: "NI-2",
        cubes: [
            // 1-6
            [[], [5, 8, 10]],
            [[4, 6, 7], []],
            [[], [6, 8]],
            [[6], [8]],
            [[8], [6]],
            [[6, 8], []],
            // 7-12, same to 1-6
            [[], [5, 8, 10]],
            [[4, 6, 7], []],
            [[], [6, 8]],
            [[6], [8]],
            [[8], [6]],
            [[6, 8], []],
        ]
    },
    {
        setName: "TF-2",
        cubes: [
            // 1-6
            [[8], [5, 10]],
            [[6, 12], [7]],
            [[8], [5, 10]],
            [[6, 12], [7]],
            [[8], [5, 10]],
            [[6, 12], [7]],
            // 7-12
            [[8], [7]],
            [[8], [7]],
            [[8], [7]],
            [[8], [7]],
            [[8], [7]],
            [[8], [7]],
        ]
    },
    {
        setName: 'PI-2',
        cubes: [
            // 1-3
            [[8], [7]],
            [[8], [7]],
            [[3, 8, 11], [7]],
            // 4-6
            [[8], [7]],
            [[8], [7]],
            [[3, 8, 11], [7]],
            // 7-10
            [[], [10, 12]],
            [[12], [10]],
            [[], [10, 12]],
            [[12], [10]],
        ]
    },
    // big
    {
        setName: "TF-6",
        cubes: [
            //  1-8
            [[8], [5, 10]],
            [[12], [7]],
            [[5, 8], [10]],
            [[12], [6, 7]],
            [[8], [10]],
            [[12], [6, 7]],
            [[8], [7]],
            [[8], [7]],
            //  9-16, same to 1-8
            [[8], [5, 10]],
            [[12], [7]],
            [[5, 8], [10]],
            [[12], [6, 7]],
            [[8], [10]],
            [[12], [6, 7]],
            [[8], [7]],
            [[8], [7]],
            //  17-24, same to 1-8
            [[8], [5, 10]],
            [[12], [7]],
            [[5, 8], [10]],
            [[12], [6, 7]],
            [[8], [10]],
            [[12], [6, 7]],
            [[8], [7]],
            [[8], [7]],
        ]
    },
    {
        setName: 'VH-2',
        cubes: [
            // 1-8
            [[3], [11]],
            [[], [9, 11, 12]],
            [[2], [10]],
            [[2, 12], [10]],
            [[11], [10, 12]],
            [[3], [9, 11]],
            [[9, 12], [10]],
            [[12], [10]],
            [[11], [9]],
            // 9-16, same to 1-8
            [[3], [11]],
            [[], [9, 11, 12]],
            [[2], [10]],
            [[2, 12], [10]],
            [[11], [10, 12]],
            [[3], [9, 11]],
            [[9, 12], [10]],
            [[12], [10]],
            [[11], [9]],
        ]
    },
    {
        setName: "NI-3",
        cubes: [
            // 1-4
            [[8], [10]],
            [[7, 12], []],
            [[], [5, 7, 8]],
            [[2, 5, 8], [10]],
            // 5-8
            [[], [5, 7, 8]],
            [[8], [10]],
            [[7, 12], []],
            [[], [5, 7, 8]],
            // 9-12
            [[1, 7, 8, 9], []],
            [[], [5, 7, 8]],
            [[5, 8], [10]],
            [[6, 7, 12], []],
            // 13-24, same to 1-12
            // 13-16, same to 1-4
            [[8], [10]],
            [[7, 12], []],
            [[], [5, 7, 8]],
            [[2, 5, 8], [10]],
            // 17-20, same 5-8
            [[], [5, 7, 8]],
            [[8], [10]],
            [[7, 12], []],
            [[], [5, 7, 8]],
            // 21-24, same 9-12
            [[1, 7, 8, 9], []],
            [[], [5, 7, 8]],
            [[5, 8], [10]],
            [[6, 7, 12], []],
        ]
    },
    {
        setName: 'MA-3',
        cubes: [
            //  1-4
            [[8], [2, 10]],
            [[4, 7, 12], []],
            [[5, 7, 8], []],
            [[], [5, 8, 10]],
            // 5-8
            [[], [5, 7, 8]],
            [[8], [2, 10]],
            [[4, 7, 12], []],
            [[], [5, 7, 8]],
            // 9-12
            [[7, 8, 9], []],
            [[], [5, 7, 8]],
            [[5, 8], [2, 10]],
            [[4, 6, 7, 12], []],
            // 13-24, same to 1-12
            // 13-16, same to 1-4
            [[8], [2, 10]],
            [[4, 7, 12], []],
            [[5, 7, 8], []],
            [[], [5, 8, 10]],
            // 17-20, same 5-8
            [[], [5, 7, 8]],
            [[8], [2, 10]],
            [[4, 7, 12], []],
            [[], [5, 7, 8]],
            // 21-24, same 9-12
            [[7, 8, 9], []],
            [[], [5, 7, 8]],
            [[5, 8], [2, 10]],
            [[4, 6, 7, 12], []],
        ]
    },
    // 10 cubes
    {
        setName: '10-A',
        cubes: [
            // 1-5
            [[], [9, 10, 11, 12]],
            [[4], [12]],
            [[4], [12]],
            [[4], [12]],
            [[4], [12]],
            // 6-10, same to 1-5.
            [[], [9, 10, 11, 12]],
            [[4], [12]],
            [[4], [12]],
            [[4], [12]],
            [[4], [12]],
        ]
    },
];
log_ts_1.log("begin: " + (new Date()).toLocaleString());
var DATE_BEGIN = performance.now();
log_ts_1.showUsedTime('init');
try {
    await ghostkubes_ts_1.main(DATAS, GOAL_FILE);
}
catch (error) {
    log_ts_1.log('[error]', error);
}
log_ts_1.showUsedTime('done');
log_ts_1.log("end: " + (new Date()).toLocaleString());
log_ts_1.logUsedTime('Total', performance.now() - DATE_BEGIN);
log_ts_1.log('');
/*
cd /d p:\anqi\Desktop\tech\ts\projects\203_ts_ghostkube\test
cls && deno lint ghostkubes_01.ts && deno fmt ghostkubes_01.ts
cls && deno run --v8-flags=--max-old-space-size=20480 -A ghostkubes_01.ts

deno run --v8-flags=--max-old-space-size=20480 -A p:\anqi\Desktop\tech\ts\projects\203_ts_ghostkube\test\ghostkubes_01.ts
*/
