import { unnest } from "@techmmunity/utils";
import { handleNormalData } from "./handle-normal-data";
import { handleSaveOperators } from "./handle-save-operators";

export interface RootObject {
	$set: any;
	$unset: any;
	$inc: any;
	$min: any;
	$max: any;
	$push: any;
	$pop: any;
}

export const formatSaveData = (data: Record<string, any>) => {
	const rootObject: RootObject = {
		$set: {},
		$unset: {},
		$inc: {},
		$min: {},
		$max: {},
		$push: {},
		$pop: {},
	};

	const unnestedObj = unnest(data);

	handleSaveOperators({
		unnestedObj,
		rootObject,
	});

	handleNormalData({
		unnestedObj,
		rootObject,
	});

	return rootObject;
};
