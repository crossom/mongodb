import { isFindOperator, isSaveOperator } from "@thothom/core";
import { nest } from "@techmmunity/utils";

interface HandleNormalDataParams {
	unnestedObj: Record<string, any>;
	rootObject: Record<string, any>;
}

export const handleNormalData = ({
	unnestedObj,
	rootObject,
}: HandleNormalDataParams) => {
	const dataEntries = Object.entries(unnestedObj).filter(
		([_, value]) => !isSaveOperator(value) && !isFindOperator(value),
	) as Array<[string, any]>;

	const nestedData = nest(Object.fromEntries(dataEntries));

	return {
		...rootObject,
		...nestedData,
	};
};
