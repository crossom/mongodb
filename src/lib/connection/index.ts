import { BaseConnection } from "@techmmunity/symbiosis";
import type { CustomClass } from "@techmmunity/symbiosis/lib/entity-manager/types/metadata-type";
import { Repository } from "../repository";
import type { ColumnExtraMetadata } from "../types/column-extra-metadata";
import type { ExampleConnectionOptions } from "../types/connection-options";
import type { EntityExtraMetadata } from "../types/entity-extra-metadata";
import type { IndexExtraMetadata } from "../types/index-extra-metadata";

/**
 * Example type:
 * DynamoDBClient
 *
 * Obs: Remove this comment and this type
 */
export type LibClientType = any;

/**
 * Example type:
 * DynamoDBClientConfig
 *
 * Obs: Remove this comment and this type
 */
export type LibClientConfigType = any;

export class Connection extends BaseConnection<
	LibClientConfigType,
	EntityExtraMetadata,
	ColumnExtraMetadata,
	IndexExtraMetadata
> {
	private _connectionInstance: LibClientType;

	public get connectionInstance() {
		return this._connectionInstance;
	}

	public constructor(options?: ExampleConnectionOptions) {
		super("base-project-symbiosis-plugin", options);
	}

	// eslint-disable-next-line require-await
	public async connect() {
		this._connectionInstance = {};
		/*
		 * Example:
		 * this.connectionInstance = new DynamoDBClient(
		 * 	options.databaseConnectionConfig || {},
		 * );
		 */
	}

	public getRepository<Entity>(entity: CustomClass) {
		return new Repository<Entity>(
			this.connectionInstance,
			this.entityManager,
			this.logger,
			entity as Entity,
		);
	}
}
