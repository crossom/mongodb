import type { BeforeFindOneInput } from "@techmmunity/symbiosis/lib/repository/methods/find-one/before";
import type { Document } from "bson";

import { getArrayWhere } from "../../utils/get-array-where";

import type { Context } from "../../types/context";

export const findOne = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{
		conditions: rawConditions,
		options: rawOptions,
	}: BeforeFindOneInput<Entity>,
) => {
	const { conditions } = context.beforeFindOne({
		conditions: rawConditions,
		options: rawOptions,
	});

	const where = getArrayWhere(conditions.where);

	const query = {
		$or: where,
	};

	context.logger.debug(query);

	const result = (await context.table.findOne(query)) as Document | undefined;

	return {
		data: context.afterFindOne({
			conditions: rawConditions,
			dataToReturn: result,
			options: rawOptions,
		}),
	};
};
