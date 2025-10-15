function SymbolSpliter(content, symbol1, symbol2) {
	return Object.fromEntries(
		content.split(symbol1).map(str => {
			return str.split(symbol2);
		})
	);
}

!(function () {

})();