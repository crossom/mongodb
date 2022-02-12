import type { BeforeSaveInput } from "@techmmunity/symbiosis/lib/repository/methods/save/before";
import type { UpdateOneModel } from "mongodb";

import { formatSaveData } from "../../utils/format-save-data";

import type { Context } from "../../types/context";

export const save = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{ data: rawData, options: rawOptions }: BeforeSaveInput<Entity>,
) => {
	const { data, returnArray } = context.beforeSave({
		data: rawData,
		options: rawOptions,
	});

	const arrayData = Array.isArray(data) ? data : [data];

	const ids = arrayData.map(d => d._id);

	const query = arrayData.map(
		({
			_id,
			...d
		}): {
			updateOne: UpdateOneModel;
		} => ({
			updateOne: {
				filter: {
					_id,
				},
				update: formatSaveData(d),
				upsert: true,
			},
		}),
	);

	context.logger.debug(query);

	await context.table.bulkWrite(query, {
		ordered: false,
	});

	const insertedRecords = await context.table
		.find({
			_id: {
				$in: ids as any,
			},
		})
		.toArray();

	return context.afterSave({
		// Mongo doesn't return the new values, so we have to return the same data that we receive
		data: insertedRecords,
		returnArray,
		options: rawOptions,
	});
};
