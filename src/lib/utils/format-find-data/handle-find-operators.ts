import {
	FindOperator,
	isFindOperator,
	SymbiosisError,
} from "@techmmunity/symbiosis";

interface HandleFindOperatorsParams {
	unnestedObj: Record<string, any>;
	rootObject: Record<string, any>;
}

/**
 * CONTAINS MUTABILITY
 */
export const handleFindOperators = ({
	unnestedObj,
	rootObject,
}: HandleFindOperatorsParams) => {
	const findOperatorsEntries = Object.entries(unnestedObj).filter(
		([_, value]) => isFindOperator(value),
	) as Array<[string, FindOperator]>;

	findOperatorsEntries.forEach(([key, { type, values, not }]) => {
		switch (type) {
			case "moreThan":
				rootObject[key] = {
					$gt: values.shift()!,
				};

				return;
			case "moreThanOrEqual":
				rootObject[key] = {
					$gte: values.shift()!,
				};

				return;
			case "in":
				if (not) {
					rootObject[key] = {
						$nin: values,
					};
				} else {
					rootObject[key] = {
						$in: values,
					};
				}

				return;
			case "lessThan":
				rootObject[key] = {
					$lt: values.shift()!,
				};

				return;
			case "lessThanOrEqual":
				rootObject[key] = {
					$lte: values.shift()!,
				};

				return;
			case "not":
				rootObject[key] = {
					$ne: values.shift()!,
				};

				return;
			case "exist":
				if (not) {
					rootObject[key] = {
						$not: {
							$exists: true,
						},
					};
				} else {
					rootObject[key] = {
						$exists: true,
					};
				}

				return;
			default:
				throw new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: "FindOperator not supported",
					details: [`MongoDB doesn't support "${type}" operator`],
				});
		}
	});
};
