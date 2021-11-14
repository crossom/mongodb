import {
	isSaveOperator,
	SaveOperator,
	SymbiosisError,
} from "@techmmunity/symbiosis";
import { RootObject } from ".";

interface HandleSaveOperatorsParams {
	unnestedObj: Record<string, any>;
	rootObject: RootObject;
}

/**
 * CONTAINS MUTABILITY
 */
export const handleSaveOperators = ({
	unnestedObj,
	rootObject,
}: HandleSaveOperatorsParams) => {
	const saveOperatorsEntries = Object.entries(unnestedObj).filter(
		([_, value]) => isSaveOperator(value),
	) as Array<[string, SaveOperator]>;

	saveOperatorsEntries.forEach(([key, { type, values }]) => {
		const formattedKey = key.replace(/\[\]/g, "$[]").replace(/[[\]]/g, "");

		switch (type) {
			case "plus":
				rootObject.$inc[formattedKey] = values.shift()!;

				return;
			case "minus":
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				rootObject.$inc[formattedKey] = values.shift()! * -1;

				return;
			case "min":
				rootObject.$min[formattedKey] = values.shift()!;

				return;
			case "max":
				rootObject.$max[formattedKey] = values.shift()!;

				return;
			case "remove":
				rootObject.$unset[formattedKey] = "";

				return;
			case "append":
				rootObject.$push[formattedKey] = {
					$each: values,
				};

				return;
			case "pop": {
				const [popVal] = values;

				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				if (![1, -1].includes(popVal)) {
					throw new SymbiosisError({
						code: "INVALID_PARAM",
						origin: "SYMBIOSIS",
						message: "Invalid param",
						details: [
							'"Pop" operator only supports ONE parameter with the value `1` (last item) OR `-1` (first item).',
						],
					});
				}

				rootObject.$pop[formattedKey] = popVal;

				return;
			}
			default:
				throw new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: "SaveOperator not supported",
					details: [`MongoDB doesn't support "${type}" operator`],
				});
		}
	});
};
