import { BaseConnection, SymbiosisError } from "@techmmunity/symbiosis";
import type { CustomClass } from "@techmmunity/symbiosis/lib/entity-manager/types/metadata-type";
import { MongoClient } from "mongodb";
import { Repository } from "../repository";
import type { ColumnExtraMetadata } from "../types/column-extra-metadata";
import type {
	DatabaseConfigType,
	MongodbConnectionOptions,
} from "../types/connection-options";
import type { EntityExtraMetadata } from "../types/entity-extra-metadata";
import type { IndexExtraMetadata } from "../types/index-extra-metadata";

export class Connection extends BaseConnection<
	DatabaseConfigType,
	EntityExtraMetadata,
	ColumnExtraMetadata,
	IndexExtraMetadata
> {
	private _connectionInstance: MongoClient;

	public get connectionInstance() {
		return this._connectionInstance;
	}

	public constructor(options?: MongodbConnectionOptions) {
		super("@techmmunity/symbiosis-mongodb", options);
	}

	public async connect() {
		const { url, databaseName, ...options } = this.options.databaseConfig || {};

		if (!url) {
			throw new SymbiosisError({
				code: "MISSING_PARAM",
				origin: "SYMBIOSIS",
				message: "Missing param",
				details: ["`url` is a required property"],
			});
		}

		if (!databaseName) {
			throw new SymbiosisError({
				code: "MISSING_PARAM",
				origin: "SYMBIOSIS",
				message: "Missing param",
				details: ["`databaseName` is a required property"],
			});
		}

		this._connectionInstance = new MongoClient(url, options);

		// Test the connection
		try {
			await this.connectionInstance.connect();
		} catch (err: any) {
			throw new SymbiosisError({
				code: "UNKNOWN",
				origin: "DATABASE",
				message: "Fail to connect with the database",
				details: [err.message],
			});
		}
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
