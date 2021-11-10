import { BaseConnection } from "@techmmunity/symbiosis";
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
		const {
			url,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			databaseName: _databaseName,
			...options
		} = this.options.databaseConfig || {};

		this._connectionInstance = new MongoClient(url as string, options);

		// Test the connection
		await this.connectionInstance.connect();
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
