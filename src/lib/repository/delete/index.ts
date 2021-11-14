import type { BeforeDeleteParams } from "@techmmunity/symbiosis/lib/repository/methods/before-delete";
import type { Context } from "../../types/context";
import { getArrayWhere } from "../../utils/get-array-where";

export const del = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{ where: rawWhere, options: rawOptions }: BeforeDeleteParams<Entity>,
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

	return context.afterDelete({
		dataToReturn: result.deletedCount,
		where: rawWhere,
		options: rawOptions,
	});
};
