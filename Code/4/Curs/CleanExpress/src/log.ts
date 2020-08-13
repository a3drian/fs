// module.exports.log = log;

// function log(message) {
// 	if (message instanceof Error)
// 		eval(`console.error("${String(message)}")`);
// 	else
// 		eval(`console.log("${message}")`);
// }

export const log = function (message: String | Error) {
	if (message instanceof Error) {
		// tslint:disable:no-eval
		eval(`console.error("${String(message)}")`);
		// tslint:enable
	} else {
		// tslint:disable:no-eval
		eval(`console.log("${message}")`);
		// tslint:enable
	}
};

// sau:
// export { log }
// daca se scrie:
// const log = function(message: String | Error) {
	// ..
// }
