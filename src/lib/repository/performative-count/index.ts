import type { BeforePerformativeCountInput } from "@thothom/core/lib/repository/methods/performative-count/before";

import type { Context } from "../../types/context";

export const performativeCount = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{ where, options }: BeforePerformativeCountInput<Entity>,
) => {
	const result = await context.table.estimatedDocumentCount();

	return {
		data: await context.afterPerformativeCount({
			dataToReturn: result,
			where,
			options,
		}),
	};
};
