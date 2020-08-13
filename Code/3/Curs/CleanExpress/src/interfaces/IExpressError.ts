export interface IExpressError extends Error {
	// '?' inseamna ca poate lipsi din instanta de IExpressError
	status?: number;
}
