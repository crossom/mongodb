import type { BeforeUpsertParams } from "@techmmunity/symbiosis/lib/repository/methods/before-upsert";
import type { Document } from "bson";
import type { Context } from "../../types/context";

export const upsert = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{
		conditions: rawConditions,
		data: rawData,
		options: rawOptions,
	}: BeforeUpsertParams<Entity>,
) => {
	const { conditions, data } = context.beforeUpsert({
		conditions: rawConditions,
		data: rawData,
		options: rawOptions,
	});

	const primaryColumns = context.entityManager.getEntityPrimaryColumns(
		context.entity,
	);

	/**
	 * Removes primary columns because they cannot be updated
	 */
	for (const primaryColumn of primaryColumns) {
		delete data[primaryColumn.databaseName];
	}

	await context.table.updateOne(
		conditions,
		{
			$set: data,
		},
		{
			upsert: true,
		},
	);

	const updatedRecord = await context.table.findOne(conditions);

	return context.afterUpsert({
		conditions: rawConditions,
		data: updatedRecord as Document,
		options: rawOptions,
	});
};
