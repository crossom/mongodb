import type { BeforeSaveParams } from "@techmmunity/symbiosis/lib/repository/methods/before-save";
import { UpdateOneModel } from "mongodb";
import type { Context } from "../../types/context";
import { formatSaveData } from "../../utils/format-save-data";

export const save = async <Entity>(
	context: Context<Entity>, // Cannot destruct this!!!
	{ data: rawData, options: rawOptions }: BeforeSaveParams<Entity>,
) => {
	const { data } = context.beforeSave({
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
