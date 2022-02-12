import type { FindConditions } from "@techmmunity/symbiosis";

import { formatFindData } from "../format-find-data";

export const getArrayWhere = (where?: FindConditions<any>) => {
	if (!where) return [{}];

	return (Array.isArray(where) ? where : [where]).map(formatFindData);
};
