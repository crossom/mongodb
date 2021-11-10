import type { BeforeFindOneParams } from "@techmmunity/symbiosis/lib/repository/methods/before-find-one";
import { Document } from "bson";
import type { Context } from "../../types/context";
import { getWhere } from "../find/helpers/get-where";

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

	const where = getWhere(conditions.where || {});

	const result = (await context.table.findOne(where)) as Document;

	return context.afterFindOne({
		conditions: rawConditions,
		dataToReturn: result,
		options: rawOptions,
	});
};
