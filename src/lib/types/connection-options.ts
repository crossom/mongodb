import type { BaseConnectionOptions } from "@techmmunity/symbiosis";
import type { MongoClientOptions } from "mongodb";

export interface DatabaseConfigType extends MongoClientOptions {
	url: string;
	databaseName: string;
}

export type MongodbConnectionOptions = Omit<
	BaseConnectionOptions<DatabaseConfigType>,
	"plugin"
>;
