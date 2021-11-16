import { BeforePerformativeCountParams } from "@techmmunity/symbiosis/lib/repository/methods/before-performative-count";
import type { Context } from "../../types/context";

export const performativeCount = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{ where, options }: BeforePerformativeCountParams<Entity>,
) => {
	const result = await context.table.estimatedDocumentCount();

	return context.afterPerformativeCount({
		dataToReturn: result,
		where,
		options,
	});
};
