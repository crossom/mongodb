import { unnest } from "@techmmunity/utils";
import { handleNormalData } from "./handle-normal-data";
import { handleFindOperators } from "./handle-find-operators";

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
