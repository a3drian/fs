// module.exports.env = getEnv();
// pentru ca exportam constanta 'env' mai jos

// function getEnv() {
// 	// use process.env, process.argv
// 	return {
// 		PORT: 8080,

// 		NODE_ENV: "development",

// 		DISCOVERY_CLIENT_ROUTE: "/discovery/client",
// 		A_JSON_ROUTE: "/api/json"
// 	};
// }

// are dezavantajul ca poate fi schimbat pe parcursul lifetime-ului aplicatiei, chiar daca am pus const
// daca punem Object.freeze() devine read-only
export const env = Object.freeze({
	PORT: 8080,

	NODE_ENV: "development",

	DISCOVERY_CLIENT_ROUTE: "/discovery/client",
	A_JSON_ROUTE: "/api/json"
});
