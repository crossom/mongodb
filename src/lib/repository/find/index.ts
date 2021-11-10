import type { BeforeFindParams } from "@techmmunity/symbiosis/lib/repository/methods/before-find";
import type { Context } from "../../types/context";
import { getWhere } from "./helpers/get-where";

export const find = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{ conditions: rawConditions, options: rawOptions }: BeforeFindParams<Entity>,
) => {
	const { conditions } = context.beforeFind({
		conditions: rawConditions,
		options: rawOptions,
	});

	const where = getWhere(conditions.where || {});

	const result = await context.table.find(where).toArray();

	return context.afterFind({
		conditions: rawConditions,
		dataToReturn: result,
		options: rawOptions,
	});
};
