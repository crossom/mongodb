import { BaseConnectionOptions } from "@techmmunity/symbiosis";
import { MongoClientOptions } from "mongodb";

export interface DatabaseConfigType extends MongoClientOptions {
	url: string;
	databaseName: string;
}

export type MongodbConnectionOptions = Omit<
	BaseConnectionOptions<DatabaseConfigType>,
	"plugin"
>;
