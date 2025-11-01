import PinyinDict from './dict';

export class Pinyin {
	/** 将中文转换为拼音 */
	static Convert(str: string) {
		var sPinyin = "";
		for (const val of str) {
			let p = PinyinDict[val];
			if (p != undefined) {
				sPinyin += p;
			} else {
				sPinyin += val;
			}
		}
		return sPinyin;
	}

	/** 获得中文的拼音首字母 */
	static ConvertFirstChar(str: string) {
		var sFirst = "";
		for (const val of str) {
			let p = PinyinDict[val];
			if (p != undefined) {
				sFirst += p[0];
			} else {
				sFirst += val;
			}
		}
		return sFirst;
	}

	static test(reg: RegExp, ...strs: string[]) {
		return strs.some(str => {
			return reg.test(str) || reg.test(this.Convert(str)) || reg.test(this.ConvertFirstChar(str));
		});
	}
}