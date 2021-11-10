import { SymbiosisError } from "@techmmunity/symbiosis";
import type { BeforeDeleteParams } from "@techmmunity/symbiosis/lib/repository/methods/before-delete";
import type { Context } from "../../types/context";

export const del = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{ where: rawWhere, options: rawOptions }: BeforeDeleteParams<Entity>,
) => {
	const { where } = context.beforeDelete({
		where: rawWhere,
		options: rawOptions,
	});

	if (Array.isArray(where)) {
		throw new SymbiosisError({
			code: "NOT_IMPLEMENTED",
			origin: "SYMBIOSIS",
			message: "This operation is not supported with arrays yet.",
			details: [],
		});
	}

	const result = await context.table.deleteMany(where);

	return context.afterDelete({
		dataToReturn: result.deletedCount,
		where: rawWhere,
		options: rawOptions,
	});
};
