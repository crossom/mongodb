import type { FindConditions } from "@thothom/core";

import { formatFindData } from "../format-find-data";

export const getArrayWhere = (where?: FindConditions<any>) => {
	if (!where) return [{}];

	return (Array.isArray(where) ? where : [where]).map(formatFindData);
};
