/**
 * ---------------------------------------------
 * // TODO Remove this after implement the methods!
 * ---------------------------------------------
 */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
	BaseQueryOptions,
	ClassType,
	EntityManager,
	FindConditions,
	FindOneOptions,
	FindOptions,
	BaseRepository,
	SymbiosisError,
	Logger,
	SaveData,
} from "@techmmunity/symbiosis";
import type { Collection, MongoClient } from "mongodb";
import type { MongodbConnectionOptions } from "../..";
import type { ColumnExtraMetadata } from "../types/column-extra-metadata";
import type { EntityExtraMetadata } from "../types/entity-extra-metadata";
import type { IndexExtraMetadata } from "../types/index-extra-metadata";
import { handleDatabaseError } from "../utils/handle-database-error";
import { del } from "./delete";
import { find } from "./find";
import { findOne } from "./find-one";
import { save } from "./save";

export class Repository<Entity> extends BaseRepository<Entity> {
	// Is used in all methods, passed as `this as any`
	private readonly table: Collection;

	public constructor(
		private readonly connectionInstance: MongoClient,
		entityManager: EntityManager<
			EntityExtraMetadata,
			ColumnExtraMetadata,
			IndexExtraMetadata
		>,
		logger: Logger,
		entity: Entity,
		options: MongodbConnectionOptions,
	) {
		super(entityManager, logger, entity);

		this.table = this.connectionInstance
			.db(options.databaseConfig?.databaseName || "")
			.collection(this.tableName);
	}

	/**
	 * - This function **CREATE** or **UPDATE** one or more records based on the `_id` column
	 *
	 * @param data The entity data that you want to save to the database
	 * @param options Options for this operation
	 * @returns The entity as it's saved on the database
	 */
	public save<Result = Array<Entity> | Entity>(
		data: SaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<Result> {
		return save(this as any, {
			data,
			options,
		}).catch(err => {
			throw handleDatabaseError(err);
		});
	}

	/**
	 * ## NOT IMPLEMENTED!
	 */
	public insert<Result = Array<Entity> | Entity>(
		data: SaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<Result> {
		// Delete this after the method is implemented
		throw new SymbiosisError({
			code: "NOT_IMPLEMENTED",
			origin: "SYMBIOSIS",
			details: ["Method `insert` is not implemented yet by this plugin"],
			message: "Method not implemented",
		});

		/*
		 * // TODO Uncomment this when method implemented
		 *
		 * const dataInDatabaseFormat = this.beforeInsert({
		 * 	data: data,
		 * 	options: options,
		 * });
		 *
		 * // ...
		 *
		 * // Do Plugin Stuff Here
		 *
		 * // ...
		 *
		 *
		 * // Just an example, do not do this.
		 * const dataFromDatabase = dataInDatabaseFormat;
		 *
		 * return this.afterInsert({
		 * 	data: dataFromDatabase,
		 * 	options: options,
		 * });
		 */
	}

	/**
	 * ## NOT IMPLEMENTED!
	 */
	public update<Result = Array<Entity> | Entity>(
		conditions: FindConditions<Entity>,
		data: ClassType<Entity>,
		options?: BaseQueryOptions,
	): Promise<Result> {
		// Delete this after the method is implemented
		throw new SymbiosisError({
			code: "NOT_IMPLEMENTED",
			origin: "SYMBIOSIS",
			details: ["Method `update` is not implemented yet by this plugin"],
			message: "Method not implemented",
		});

		/*
		 * // TODO Uncomment this when method implemented
		 *
		 * const dataInDatabaseFormat = this.beforeUpdate({
		 * 	conditions: conditions,
		 * 	data: data,
		 * 	options: options,
		 * });
		 *
		 * // ...
		 *
		 * // Do Plugin Stuff Here
		 *
		 * // ...
		 *
		 *
		 * // Just an example, do not do this.
		 * const dataFromDatabase = dataInDatabaseFormat;
		 *
		 * return this.afterUpdate({
		 * 	data: dataFromDatabase,
		 * 	conditions: conditions,
		 * 	options: options,
		 * });
		 */
	}

	/**
	 * ## NOT IMPLEMENTED!
	 */
	public upsert<Result = Array<Entity> | Entity>(
		conditions: FindConditions<Entity>,
		data: ClassType<Entity>,
		options?: BaseQueryOptions,
	): Promise<Result> {
		// Delete this after the method is implemented
		throw new SymbiosisError({
			code: "NOT_IMPLEMENTED",
			origin: "SYMBIOSIS",
			details: ["Method `upsert` is not implemented yet by this plugin"],
			message: "Method not implemented",
		});

		/*
		 * // TODO Uncomment this when method implemented
		 *
		 * const dataInDatabaseFormat = this.beforeUpsert({
		 * 	conditions: conditions,
		 * 	data: data,
		 * 	options: options,
		 * });
		 *
		 * // ...
		 *
		 * // Do Plugin Stuff Here
		 *
		 * // ...
		 *
		 *
		 * // Just an example, do not do this.
		 * const dataFromDatabase = dataInDatabaseFormat;
		 *
		 * return this.afterUpsert({
		 * 	data: dataFromDatabase,
		 * 	conditions: conditions,
		 * 	options: options,
		 * });
		 */
	}

	/**
	 * - This function **FINDS** multiple records
	 *
	 * - This function **DOES NOT** accept _FindOperators_ **yet**
	 *
	 * @param conditions The conditions to find the entities
	 * @param options Options for this operation
	 * @returns The entities found
	 */
	public find(
		conditions: FindOptions<Entity>,
		options?: BaseQueryOptions,
	): Promise<Array<Entity>> {
		return find(this as any, {
			conditions,
			options,
		}).catch(err => {
			throw handleDatabaseError(err);
		});
	}

	/**
	 * - This function **FINDS** one record
	 *
	 * - This function **DOES NOT** accept _FindOperators_ **yet**
	 *
	 * @param conditions The conditions to find the entity
	 * @param options Options for this operation
	 * @returns The entity found
	 */
	public findOne(
		conditions: FindOneOptions<Entity>,
		options?: BaseQueryOptions,
	): Promise<Entity> {
		return findOne(this as any, {
			conditions,
			options,
		}).catch(err => {
			throw handleDatabaseError(err);
		});
	}

	/**
	 * Deletes one or more records
	 *
	 * @param where Find conditions
	 * @param options Options for this operation
	 * @returns Count of deleted records
	 */
	public delete(
		where: FindConditions<Entity>,
		options?: BaseQueryOptions,
	): Promise<number> {
		return del(this as any, {
			where,
			options,
		}).catch(err => {
			throw handleDatabaseError(err);
		});
	}

	/**
	 * ## NOT IMPLEMENTED!
	 */
	public softDelete(
		where: FindConditions<Entity>,
		options?: BaseQueryOptions,
	): Promise<number> {
		// Delete this after the method is implemented
		throw new SymbiosisError({
			code: "NOT_IMPLEMENTED",
			origin: "SYMBIOSIS",
			details: ["Method `softDelete` is not implemented yet by this plugin"],
			message: "Method not implemented",
		});

		/*
		 * // TODO Uncomment this when method implemented
		 *
		 * const dataInDatabaseFormat = this.beforeSoftDelete({
		 * 	where: where,
		 * 	options: options,
		 * });
		 *
		 * // ...
		 *
		 * // Do Plugin Stuff Here
		 *
		 * // ...
		 *
		 *
		 * // Just an example, do not do this.
		 * const dataFromDatabase = dataInDatabaseFormat;
		 *
		 * return this.afterSoftDelete({
		 * 	data: dataFromDatabase,
		 * 	where: where,
		 * 	options: options,
		 * });
		 */
	}

	/**
	 * ## NOT IMPLEMENTED!
	 */
	public recover(
		where: FindConditions<Entity>,
		options?: BaseQueryOptions,
	): Promise<number> {
		// Delete this after the method is implemented
		throw new SymbiosisError({
			code: "NOT_IMPLEMENTED",
			origin: "SYMBIOSIS",
			details: ["Method `recover` is not implemented yet by this plugin"],
			message: "Method not implemented",
		});

		/*
		 * // TODO Uncomment this when method implemented
		 *
		 * const dataInDatabaseFormat = this.beforeRecover({
		 * 	where: where,
		 * 	options: options,
		 * });
		 *
		 * // ...
		 *
		 * // Do Plugin Stuff Here
		 *
		 * // ...
		 *
		 *
		 * // Just an example, do not do this.
		 * const dataFromDatabase = dataInDatabaseFormat;
		 *
		 * return this.afterRecover({
		 * 	data: dataFromDatabase,
		 * 	where: where,
		 * 	options: options,
		 * });
		 */
	}

	/**
	 * ## NOT IMPLEMENTED!
	 */
	public count(
		where: FindConditions<Entity>,
		options?: BaseQueryOptions,
	): Promise<number> {
		// Delete this after the method is implemented
		throw new SymbiosisError({
			code: "NOT_IMPLEMENTED",
			origin: "SYMBIOSIS",
			details: ["Method `count` is not implemented yet by this plugin"],
			message: "Method not implemented",
		});

		/*
		 * // TODO Uncomment this when method implemented
		 *
		 * const dataInDatabaseFormat = this.beforeCount({
		 * 	where: where,
		 * 	options: options,
		 * });
		 *
		 * // ...
		 *
		 * // Do Plugin Stuff Here
		 *
		 * // ...
		 *
		 *
		 * // Just an example, do not do this.
		 * const dataFromDatabase = dataInDatabaseFormat;
		 *
		 * return this.afterCount({
		 * 	data: dataFromDatabase,
		 * 	where: where,
		 * 	options: options,
		 * });
		 */
	}

	/**
	 * ## NOT IMPLEMENTED!
	 */
	public performativeCount(
		where: FindConditions<Entity>,
		options?: BaseQueryOptions,
	): Promise<number> {
		// Delete this after the method is implemented
		throw new SymbiosisError({
			code: "NOT_IMPLEMENTED",
			origin: "SYMBIOSIS",
			details: [
				"Method `performativeCount` is not implemented yet by this plugin",
			],
			message: "Method not implemented",
		});

		/*
		 * // TODO Uncomment this when method implemented
		 *
		 * const dataInDatabaseFormat = this.beforePerformativeCount({
		 * 	where: where,
		 * 	options: options,
		 * });
		 *
		 * // ...
		 *
		 * // Do Plugin Stuff Here
		 *
		 * // ...
		 *
		 *
		 * // Just an example, do not do this.
		 * const dataFromDatabase = dataInDatabaseFormat;
		 *
		 * return this.afterPerformativeCount({
		 * 	data: dataFromDatabase,
		 * 	where: where,
		 * 	options: options,
		 * });
		 */
	}
}
