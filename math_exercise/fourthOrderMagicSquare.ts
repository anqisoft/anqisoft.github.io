// TODO(@anqi)
/*
	<en_us>Changed code to reduce run time from 6 minutes to less than a minute.</en_us>
	<zh_cn>更改代码，让运行时间从6分钟减少到不到1分钟。</zh_cn>
	<zh_tw>更改程式碼，讓運行時間從6分鐘減少到不到1分鐘。</zh_tw>
 */
const PHANTOM_SUM = 34;
const LAST_EIGHT_NUMBERS_COUNT = 8;
let tryTimes = 0;

class CountResult {
	constructor(
		public a1: number,
		public a2: number,
		public a3: number,
		public b1: number,
		public b2: number,
		public b3: number,
		public c1: number,
		public c3: number,
	) {}
}

function main() {
	const NUMBER_POOL: number[] = [];
	for (let i = 1; i < 17; ++i) {
		NUMBER_POOL.push(i);
	}

	const results: CountResult[] = [];

	const data = new CountResult(0, 0, 0, 0, 0, 0, 0, 0);
	countNext(data, NUMBER_POOL, results, 8);

	results.forEach(({
		a1,
		a2,
		a3,

		b1,
		b2,
		b3,

		c1,
		c3,
	}) => {
		const d1 = PHANTOM_SUM - a1 - b1 - c1;
		const d3 = PHANTOM_SUM - a3 - b3 - c3;
		const d4 = PHANTOM_SUM - a1 - b2 - c3;

		const a4 = PHANTOM_SUM - a1 - a2 - a3;
		const b4 = PHANTOM_SUM - b1 - b2 - b3;

		const c4 = PHANTOM_SUM - a4 - b4 - d4;
		const d2 = PHANTOM_SUM - d1 - d3 - d4;

		const c2 = PHANTOM_SUM - c1 - c3 - c4;

		console.log(
			`${a1}\t${b1}\t${c1}\t${d1}\n${a2}\t${b2}\t${c2}\t${d2}\n${a3}\t${b3}\t${c3}\t${d3}\n${a4}\t${b4}\t${c4}\t${d4}\n`,
		);
	});

	console.log('\n\nresults.length:', results.length);
}

const BEGIN_DATE = new Date();
console.log(BEGIN_DATE);
main();
const END_DATE = new Date();
console.log(
	`From ${BEGIN_DATE} to ${END_DATE}, used ${
		END_DATE.getTime() - BEGIN_DATE.getTime()
	} milliseconds.`,
);
console.log(`We tried ${tryTimes} times.`);

function countNext(
	dataFrom: CountResult,
	NUMBER_POOL: number[],
	results: CountResult[],
	unknownItemCount: number,
): void {
	++tryTimes;
	const data = JSON.parse(JSON.stringify(dataFrom));

	if (unknownItemCount === 0) {
		// <en_us>verify</en_us>
		// <zh_cn>验证</zh_cn>
		// <zh_tw>驗證</zh_tw>
		const {
			a1,
			a2,
			a3,

			b1,
			b2,
			b3,

			c1,
			c3,
		} = data;

		const d1 = PHANTOM_SUM - a1 - b1 - c1;

		const d3 = PHANTOM_SUM - a3 - b3 - c3;
		const d4 = PHANTOM_SUM - a1 - b2 - c3;

		const a4 = PHANTOM_SUM - a1 - a2 - a3;
		const b4 = PHANTOM_SUM - b1 - b2 - b3;

		const c4 = PHANTOM_SUM - a4 - b4 - d4;
		const d2 = PHANTOM_SUM - d1 - d3 - d4;

		const c2 = PHANTOM_SUM - c1 - c3 - c4;

		const LAST_EIGHT_NUMBERS_ARRAY = [d1, d3, d4, a4, b4, c4, d2, c2].toSorted();
		for (let i = 0; i < LAST_EIGHT_NUMBERS_COUNT; ++i) {
			const ITEM = LAST_EIGHT_NUMBERS_ARRAY[i];
			const POSITION = NUMBER_POOL.indexOf(ITEM);
			if (POSITION === -1) {
				return;
			}

			NUMBER_POOL.splice(POSITION, 1);
		}
		if (a1 + b1 + c1 + d1 != PHANTOM_SUM) return;
		if (a2 + b2 + c2 + d2 != PHANTOM_SUM) return;
		if (a3 + b3 + c3 + d3 != PHANTOM_SUM) return;
		if (a4 + b4 + c4 + d4 != PHANTOM_SUM) return;

		if (a1 + a2 + a3 + a4 != PHANTOM_SUM) return;
		if (b1 + b2 + b3 + b4 != PHANTOM_SUM) return;
		if (b1 + b2 + b3 + b4 != PHANTOM_SUM) return;
		if (d1 + d2 + d3 + d4 != PHANTOM_SUM) return;

		if (a1 + b2 + c3 + d4 != PHANTOM_SUM) return;
		if (a4 + b3 + c2 + d1 != PHANTOM_SUM) return;

		results.push(
			new CountResult(
				a1,
				a2,
				a3,
				b1,
				b2,
				b3,
				c1,
				c3,
			),
		);
		return;
	}

	let min = PHANTOM_SUM;
	let max = 0;
	NUMBER_POOL.forEach((n) => {
		min = Math.min(min, n);
		max = Math.max(max, n);
	});
	const MIN_SUM_OF_THREE_NUMBER = PHANTOM_SUM - max;
	const MAX_SUM_OF_THREE_NUMBER = PHANTOM_SUM - min;

	let sumOfThreeNumber = 0;
	NUMBER_POOL.forEach((n) => {
		switch (unknownItemCount) {
			case 8:
				data.a1 = n;
				break;
			case 7:
				data.a2 = n;
				break;
			case 6:
				sumOfThreeNumber = data.a1 + data.a2 + n;
				if (
					sumOfThreeNumber < MIN_SUM_OF_THREE_NUMBER || sumOfThreeNumber > MAX_SUM_OF_THREE_NUMBER
				) {
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

				if (
					sumOfThreeNumber < MIN_SUM_OF_THREE_NUMBER || sumOfThreeNumber > MAX_SUM_OF_THREE_NUMBER
				) {
					return;
				}

				data.b3 = n;
				break;
			case 2:
				sumOfThreeNumber = data.a1 + data.b1 + n;

				if (
					sumOfThreeNumber < MIN_SUM_OF_THREE_NUMBER || sumOfThreeNumber > MAX_SUM_OF_THREE_NUMBER
				) {
					return;
				}
				data.c1 = n;
				break;
			case 1:
				sumOfThreeNumber = data.a3 + data.b3 + n;

				if (
					sumOfThreeNumber < MIN_SUM_OF_THREE_NUMBER || sumOfThreeNumber > MAX_SUM_OF_THREE_NUMBER
				) {
					return;
				}
				data.c3 = n;
				break;
			default:
				break;
		}

		const NUMBER_POOL_CLONED: number[] = NUMBER_POOL.toSorted();
		NUMBER_POOL_CLONED.splice(NUMBER_POOL_CLONED.indexOf(n), 1);

		return countNext(data, NUMBER_POOL_CLONED, results, unknownItemCount - 1);
	});
}
