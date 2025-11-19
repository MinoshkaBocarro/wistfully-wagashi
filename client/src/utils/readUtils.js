function priceFormatter(number) {
	let decNum = number.toFixed(2);
	let string = decNum.toString().split(".");
	string[0] = string[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return "$" + string.join(".");
}

function capitaliseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export { priceFormatter, capitaliseFirstLetter };
