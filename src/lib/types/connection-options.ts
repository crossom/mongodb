import type { BaseConnectionOptions } from "@thothom/core";
import type { MongoClientOptions } from "mongodb";

export interface DatabaseConfigType extends MongoClientOptions {
	url: string;
	databaseName: string;
}

export type MongodbConnectionOptions = Omit<
	BaseConnectionOptions<DatabaseConfigType>,
	"plugin"
>;
