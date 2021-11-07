import { BaseConnectionOptions } from "@techmmunity/symbiosis";

/**
 * Example type:
 * DynamoDBClientOptions
 *
 * Obs: Remove this comment and this type
 */
export type DatabaseConfigType = any;

export type ExampleConnectionOptions = Omit<
	BaseConnectionOptions<DatabaseConfigType>,
	"plugin"
>;
