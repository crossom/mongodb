import type { BeforeDeleteInput } from "@techmmunity/symbiosis/lib/repository/methods/delete/before";

import { getArrayWhere } from "../../utils/get-array-where";

import type { Context } from "../../types/context";

export const del = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{ where: rawWhere, options: rawOptions }: BeforeDeleteInput<Entity>,
) => {
	const { where } = context.beforeDelete({
		where: rawWhere,
		options: rawOptions,
	});

	const formattedWhere = getArrayWhere(where);

	const query = {
		$or: formattedWhere,
	};

	context.logger.debug(query);

	const result = await context.table.deleteMany(query);

	return {
		data: await context.afterDelete({
			dataToReturn: result.deletedCount,
			where: rawWhere,
			options: rawOptions,
		}),
	};
};
