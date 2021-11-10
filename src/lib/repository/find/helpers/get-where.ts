import { SingleFindConditions, SymbiosisError } from "@techmmunity/symbiosis";

export const getWhere = (where: SingleFindConditions<any>) => {
	if (Array.isArray(where)) {
		throw new SymbiosisError({
			code: "NOT_IMPLEMENTED",
			origin: "SYMBIOSIS",
			message: "This operation is not supported with arrays yet.",
			details: [],
		});
	}

	return where;
};
