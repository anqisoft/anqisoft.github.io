// TODO(@anqi)
/*
    <en_us>Changed code to reduce run time from 6 minutes to less than a minute.</en_us>
    <zh_cn>更改代码，让运行时间从6分钟减少到不到1分钟。</zh_cn>
    <zh_tw>更改程式碼，讓運行時間從6分鐘減少到不到1分鐘。</zh_tw>
 */
var PHANTOM_SUM = 34;
var LAST_EIGHT_NUMBERS_COUNT = 8;
var tryTimes = 0;
var CountResult = /** @class */ (function () {
    function CountResult(a1, a2, a3, b1, b2, b3, c1, c3) {
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.c1 = c1;
        this.c3 = c3;
    }
    return CountResult;
}());
function main() {
    var NUMBER_POOL = [];
    for (var i = 1; i < 17; ++i) {
        NUMBER_POOL.push(i);
    }
    var results = [];
    var data = new CountResult(0, 0, 0, 0, 0, 0, 0, 0);
    countNext(data, NUMBER_POOL, results, 8);
    results.forEach(function (_a) {
        var a1 = _a.a1, a2 = _a.a2, a3 = _a.a3, b1 = _a.b1, b2 = _a.b2, b3 = _a.b3, c1 = _a.c1, c3 = _a.c3;
        var d1 = PHANTOM_SUM - a1 - b1 - c1;
        var d3 = PHANTOM_SUM - a3 - b3 - c3;
        var d4 = PHANTOM_SUM - a1 - b2 - c3;
        var a4 = PHANTOM_SUM - a1 - a2 - a3;
        var b4 = PHANTOM_SUM - b1 - b2 - b3;
        var c4 = PHANTOM_SUM - a4 - b4 - d4;
        var d2 = PHANTOM_SUM - d1 - d3 - d4;
        var c2 = PHANTOM_SUM - c1 - c3 - c4;
        console.log(a1 + "\t" + b1 + "\t" + c1 + "\t" + d1 + "\n" + a2 + "\t" + b2 + "\t" + c2 + "\t" + d2 + "\n" + a3 + "\t" + b3 + "\t" + c3 + "\t" + d3 + "\n" + a4 + "\t" + b4 + "\t" + c4 + "\t" + d4 + "\n");
    });
    console.log('\n\nresults.length:', results.length);
}
var BEGIN_DATE = new Date();
console.log(BEGIN_DATE);
main();
var END_DATE = new Date();
console.log("From " + BEGIN_DATE + " to " + END_DATE + ", used " + (END_DATE.getTime() - BEGIN_DATE.getTime()) + " milliseconds.");
console.log("We tried " + tryTimes + " times.");
function countNext(dataFrom, NUMBER_POOL, results, unknownItemCount) {
    ++tryTimes;
    var data = JSON.parse(JSON.stringify(dataFrom));
    if (unknownItemCount === 0) {
        // <en_us>verify</en_us>
        // <zh_cn>验证</zh_cn>
        // <zh_tw>驗證</zh_tw>
        var a1 = data.a1, a2 = data.a2, a3 = data.a3, b1 = data.b1, b2 = data.b2, b3 = data.b3, c1 = data.c1, c3 = data.c3;
        var d1 = PHANTOM_SUM - a1 - b1 - c1;
        var d3 = PHANTOM_SUM - a3 - b3 - c3;
        var d4 = PHANTOM_SUM - a1 - b2 - c3;
        var a4 = PHANTOM_SUM - a1 - a2 - a3;
        var b4 = PHANTOM_SUM - b1 - b2 - b3;
        var c4 = PHANTOM_SUM - a4 - b4 - d4;
        var d2 = PHANTOM_SUM - d1 - d3 - d4;
        var c2 = PHANTOM_SUM - c1 - c3 - c4;
        var LAST_EIGHT_NUMBERS_ARRAY = [d1, d3, d4, a4, b4, c4, d2, c2].toSorted();
        for (var i = 0; i < LAST_EIGHT_NUMBERS_COUNT; ++i) {
            var ITEM = LAST_EIGHT_NUMBERS_ARRAY[i];
            var POSITION = NUMBER_POOL.indexOf(ITEM);
            if (POSITION === -1) {
                return;
            }
            NUMBER_POOL.splice(POSITION, 1);
        }
        if (a1 + b1 + c1 + d1 != PHANTOM_SUM)
            return;
        if (a2 + b2 + c2 + d2 != PHANTOM_SUM)
            return;
        if (a3 + b3 + c3 + d3 != PHANTOM_SUM)
            return;
        if (a4 + b4 + c4 + d4 != PHANTOM_SUM)
            return;
        if (a1 + a2 + a3 + a4 != PHANTOM_SUM)
            return;
        if (b1 + b2 + b3 + b4 != PHANTOM_SUM)
            return;
        if (b1 + b2 + b3 + b4 != PHANTOM_SUM)
            return;
        if (d1 + d2 + d3 + d4 != PHANTOM_SUM)
            return;
        if (a1 + b2 + c3 + d4 != PHANTOM_SUM)
            return;
        if (a4 + b3 + c2 + d1 != PHANTOM_SUM)
            return;
        results.push(new CountResult(a1, a2, a3, b1, b2, b3, c1, c3));
        return;
    }
    var min = PHANTOM_SUM;
    var max = 0;
    NUMBER_POOL.forEach(function (n) {
        min = Math.min(min, n);
        max = Math.max(max, n);
    });
    var MIN_SUM_OF_THREE_NUMBER = PHANTOM_SUM - max;
    var MAX_SUM_OF_THREE_NUMBER = PHANTOM_SUM - min;
    var sumOfThreeNumber = 0;
    NUMBER_POOL.forEach(function (n) {
        switch (unknownItemCount) {
            case 8:
                data.a1 = n;
                break;
            case 7:
                data.a2 = n;
                break;
            case 6:
                sumOfThreeNumber = data.a1 + data.a2 + n;
                if (sumOfThreeNumber < MIN_SUM_OF_THREE_NUMBER || sumOfThreeNumber > MAX_SUM_OF_THREE_NUMBER) {
                    return;
                }
                data.a3 = n;
                break;
            case 5:
                data.b1 = n;
                break;
            case 4:
                data.b2 = n;
                break;
            case 3:
                sumOfThreeNumber = data.b1 + data.b2 + n;
                if (sumOfThreeNumber < MIN_SUM_OF_THREE_NUMBER || sumOfThreeNumber > MAX_SUM_OF_THREE_NUMBER) {
                    return;
                }
                data.b3 = n;
                break;
            case 2:
                sumOfThreeNumber = data.a1 + data.b1 + n;
                if (sumOfThreeNumber < MIN_SUM_OF_THREE_NUMBER || sumOfThreeNumber > MAX_SUM_OF_THREE_NUMBER) {
                    return;
                }
                data.c1 = n;
                break;
            case 1:
                sumOfThreeNumber = data.a3 + data.b3 + n;
                if (sumOfThreeNumber < MIN_SUM_OF_THREE_NUMBER || sumOfThreeNumber > MAX_SUM_OF_THREE_NUMBER) {
                    return;
                }
                data.c3 = n;
                break;
            default:
                break;
        }
        var NUMBER_POOL_CLONED = NUMBER_POOL.toSorted();
        NUMBER_POOL_CLONED.splice(NUMBER_POOL_CLONED.indexOf(n), 1);
        return countNext(data, NUMBER_POOL_CLONED, results, unknownItemCount - 1);
    });
}
