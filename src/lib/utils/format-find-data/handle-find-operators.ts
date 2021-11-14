import {
	FindOperator,
	isFindOperator,
	SymbiosisError,
} from "@techmmunity/symbiosis";

interface HandleFindOperatorsParams {
	unnestedObj: Record<string, any>;
	rootObject: Record<string, any>;
}

interface OperatorParam extends FindOperator {
	key: string;
	rootObject: Record<string, any>;
}

const moreThan = ({ rootObject, key, values }: OperatorParam) => {
	const [val1] = values;

	rootObject[key] = {
		$gt: val1,
	};
};

const moreThanOrEqual = ({ rootObject, key, values }: OperatorParam) => {
	const [val1] = values;

	rootObject[key] = {
		$gte: val1,
	};
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const in_ = ({ rootObject, key, values, not }: OperatorParam) => {
	if (not) {
		rootObject[key] = {
			$nin: values,
		};
	} else {
		rootObject[key] = {
			$in: values,
		};
	}
};

const lessThan = ({ rootObject, key, values }: OperatorParam) => {
	const [val1] = values;

	rootObject[key] = {
		$lt: val1,
	};
};

const lessThanOrEqual = ({ rootObject, key, values }: OperatorParam) => {
	const [val1] = values;

	rootObject[key] = {
		$lte: val1,
	};
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const not_ = ({ rootObject, key, values }: OperatorParam) => {
	const [val1] = values;

	rootObject[key] = {
		$ne: val1,
	};
};

const exist = ({ rootObject, key, not }: OperatorParam) => {
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
};

const between = ({ rootObject, key, values, not }: OperatorParam) => {
	const [val1, val2] = values;

	if (not) {
		rootObject[key] = {
			$not: {
				$gte: val1,
				$lte: val2,
			},
		};
	} else {
		rootObject[key] = {
			$gte: val1,
			$lte: val2,
		};
	}
};

const endsWith = ({ rootObject, key, values, not }: OperatorParam) => {
	const [val1] = values;

	const regex = new RegExp(`${val1}$`);

	if (not) {
		rootObject[key] = {
			$not: {
				$regex: regex,
			},
		};
	} else {
		rootObject[key] = {
			$regex: regex,
		};
	}
};

const startsWith = ({ rootObject, key, values, not }: OperatorParam) => {
	const [val1] = values;

	const regex = new RegExp(`^${val1}`);

	if (not) {
		rootObject[key] = {
			$not: {
				$regex: regex,
			},
		};
	} else {
		rootObject[key] = {
			$regex: regex,
		};
	}
};

const includes = ({ rootObject, key, values, not }: OperatorParam) => {
	if (not) {
		rootObject[key] = {
			$not: {
				$all: values,
			},
		};
	} else {
		rootObject[key] = {
			$all: values,
		};
	}
};
const isNull = ({ rootObject, key, not }: OperatorParam) => {
	if (not) {
		rootObject[key] = {
			$not: {
				$type: 10,
			},
		};
	} else {
		rootObject[key] = {
			$type: 10,
		};
	}
};

const like = ({ rootObject, key, values, not }: OperatorParam) => {
	const [val1] = values;

	const regex = new RegExp(val1, "g");

	if (not) {
		rootObject[key] = {
			$not: {
				$regex: regex,
			},
		};
	} else {
		rootObject[key] = {
			$regex: regex,
		};
	}
};

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

	findOperatorsEntries.forEach(([key, data]) => {
		const params = {
			...data,
			rootObject,
			key,
		};

		switch (data.type) {
			case "moreThan":
				moreThan(params);

				return;

			case "moreThanOrEqual":
				moreThanOrEqual(params);

				return;

			case "in":
				in_(params);

				return;

			case "lessThan":
				lessThan(params);

				return;

			case "lessThanOrEqual":
				lessThanOrEqual(params);

				return;

			case "not":
				not_(params);

				return;

			case "exist":
				exist(params);

				return;

			case "between":
				between(params);

				return;

			case "endsWith":
				endsWith(params);

				return;

			case "startsWith":
				startsWith(params);

				return;

			case "includes":
				includes(params);

				return;

			case "isNull":
				isNull(params);

				return;

			case "like":
				like(params);

				return;

			default:
				throw new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: "FindOperator not supported",
					details: [`MongoDB doesn't support "${data.type}" operator`],
				});
		}
	});
};
