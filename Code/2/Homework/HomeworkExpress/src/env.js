module.exports.env = getEnv();

function getEnv() {
	// use process.env, process.argv
	return {
		PORT: 8080,

		NODE_ENV: "development",

		HOME_ROUTE: "/",

		GET_ROUTE: "/get",
		POST_ROUTE: "/post",
		PUT_ROUTE: "/put",
		DELETE_ROUTE: "/delete"

	};
}