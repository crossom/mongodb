import type { BeforeCountInput } from "@techmmunity/symbiosis/lib/repository/methods/count/before";

import { formatFindData } from "../../utils/format-find-data";

import type { Context } from "../../types/context";

export const count = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{ where: rawWhere, options: rawOptions }: BeforeCountInput<Entity>,
) => {
	const { where } = context.beforeCount({
		where: rawWhere,
		options: rawOptions,
	});

	const query = formatFindData(where);

	context.logger.debug(query);

	const result = await context.table.count(query);

	return context.afterCount({
		dataToReturn: result,
		where: rawWhere,
		options: rawOptions,
	});
};
