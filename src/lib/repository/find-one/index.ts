import type { BeforeFindOneParams } from "@techmmunity/symbiosis/lib/repository/methods/before-find-one";
import type { Document } from "bson";
import type { Context } from "../../types/context";
import { getArrayWhere } from "../../utils/get-array-where";

export const findOne = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{
		conditions: rawConditions,
		options: rawOptions,
	}: BeforeFindOneParams<Entity>,
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

	return context.afterFindOne({
		conditions: rawConditions,
		dataToReturn: result,
		options: rawOptions,
	});
};
