import { BaseConnection, ThothError } from "@thothom/core";
import { MongoClient } from "mongodb";

import { Repository } from "../repository";

import type {
	DatabaseConfigType,
	MongodbConnectionOptions,
} from "../types/connection-options";
import type { ExtraMetadata } from "../types/extra-metadata";
import type { CustomClass } from "@thothom/core/lib/entity-manager/types/metadata-type";

export class Connection extends BaseConnection<
	DatabaseConfigType,
	ExtraMetadata
> {
	private _connectionInstance: MongoClient;

	public get connectionInstance() {
		return this._connectionInstance;
	}

	public constructor(options?: MongodbConnectionOptions) {
		super("@thothom/mongodb", options);
	}

	public async connect() {
		const { url, databaseName, ...options } = this.options.databaseConfig || {};

		if (!url) {
			throw new ThothError({
				code: "MISSING_PARAM",
				origin: "THOTHOM",
				message: "Missing param",
				details: ["`url` is a required property"],
			});
		}

		if (!databaseName) {
			throw new ThothError({
				code: "MISSING_PARAM",
				origin: "THOTHOM",
				message: "Missing param",
				details: ["`databaseName` is a required property"],
			});
		}

		// Test the connection
		try {
			this._connectionInstance = new MongoClient(url, options);

			await this.connectionInstance.connect();

			return this;
		} catch (err: any) {
			throw new ThothError({
				code: "UNKNOWN",
				origin: "DATABASE",
				message: "Fail to connect with the database",
				details: [err.message],
			});
		}
	}

	// eslint-disable-next-line require-await
	public async validate() {
		super.basicValidate();
	}

	public async close() {
		await this.connectionInstance.close();
	}

	public getRepository<Entity>(entity: CustomClass) {
		return new Repository<Entity>(
			this.connectionInstance,
			this.entityManager,
			this.logger,
			entity as Entity,
			this.options,
		);
	}
}
