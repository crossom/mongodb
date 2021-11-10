import type { BeforeSaveParams } from "@techmmunity/symbiosis/lib/repository/methods/before-save";
import type { Context } from "../../types/context";

export const save = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{ data: rawData, options: rawOptions }: BeforeSaveParams<Entity>,
) => {
	const { data } = context.beforeSave({
		data: rawData,
		options: rawOptions,
	});

	const arrayData = Array.isArray(data) ? data : [data];

	const result = await context.table.insertMany(arrayData);

	const ids = Object.values(result.insertedIds);

	const insertedRecords = await context.table
		.find({
			_id: {
				$in: ids,
			},
		})
		.toArray();

	return context.afterSave({
		// Mongo doesn't return the new values, so we have to return the same data that we receive
		data: insertedRecords,
		options: rawOptions,
	});
};
