import { unnest } from "@techmmunity/utils";

import { handleFindOperators } from "./handle-find-operators";
import { handleNormalData } from "./handle-normal-data";

export const formatFindData = (data: Record<string, any>) => {
	const rootObject = {};

	const unnestedObj = unnest(data);

	handleFindOperators({
		unnestedObj,
		rootObject,
	});

	const formattedData = handleNormalData({
		unnestedObj,
		rootObject,
	});

	return formattedData;
};
