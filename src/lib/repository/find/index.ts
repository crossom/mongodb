import type { BeforeFindParams } from "@techmmunity/symbiosis/lib/repository/methods/before-find";
import type { Context } from "../../types/context";
import { getArrayWhere } from "../../utils/get-array-where";

export const find = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{ conditions: rawConditions, options: rawOptions }: BeforeFindParams<Entity>,
) => {
	const { conditions } = context.beforeFind({
		conditions: rawConditions,
		options: rawOptions,
	});

	const where = getArrayWhere(conditions.where);

	const query = {
		$or: where,
	};

	context.logger.debug(query);

	const result = await context.table.find(query).toArray();

	return context.afterFind({
		conditions: rawConditions,
		dataToReturn: result,
		options: rawOptions,
	});
};
