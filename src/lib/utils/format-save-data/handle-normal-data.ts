import { isFindOperator, isSaveOperator } from "@techmmunity/symbiosis";
import { nest } from "@techmmunity/utils";

import type { RootObject } from ".";

interface HandleNormalDataParams {
	unnestedObj: Record<string, any>;
	rootObject: RootObject;
}

export const handleNormalData = ({
	unnestedObj,
	rootObject,
}: HandleNormalDataParams) => {
	const dataEntries = Object.entries(unnestedObj).filter(
		([_, value]) => !isSaveOperator(value) && !isFindOperator(value),
	) as Array<[string, any]>;

	const nestedData = nest(Object.fromEntries(dataEntries));

	rootObject.$set = nestedData;
};
