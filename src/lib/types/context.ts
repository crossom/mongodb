import type { EntityManager, Logger } from "@thothom/core";
import type { AfterCountParams } from "@thothom/core/lib/repository/methods/count/after";
import type {
	BeforeCountInput,
	BeforeCountOutput,
} from "@thothom/core/lib/repository/methods/count/before";
import type { AfterDeleteParams } from "@thothom/core/lib/repository/methods/delete/after";
import type {
	BeforeDeleteInput,
	BeforeDeleteOutput,
} from "@thothom/core/lib/repository/methods/delete/before";
import type { AfterFindOneParams } from "@thothom/core/lib/repository/methods/find-one/after";
import type {
	BeforeFindOneInput,
	BeforeFindOneOutput,
} from "@thothom/core/lib/repository/methods/find-one/before";
import type { AfterFindParams } from "@thothom/core/lib/repository/methods/find/after";
import type {
	BeforeFindInput,
	BeforeFindOutput,
} from "@thothom/core/lib/repository/methods/find/before";
import type { AfterPerformativeCountParams } from "@thothom/core/lib/repository/methods/performative-count/after";
import type {
	BeforePerformativeCountInput,
	BeforePerformativeCountOutput,
} from "@thothom/core/lib/repository/methods/performative-count/before";
import type { AfterSaveParams } from "@thothom/core/lib/repository/methods/save/after";
import type {
	BeforeSaveInput,
	BeforeSaveOutput,
} from "@thothom/core/lib/repository/methods/save/before";
import type { AfterUpsertParams } from "@thothom/core/lib/repository/methods/upsert/after";
import type {
	BeforeUpsertInput,
	BeforeUpsertOutput,
} from "@thothom/core/lib/repository/methods/upsert/before";
import type { Collection, MongoClient } from "mongodb";

import type { ExtraMetadata } from "./extra-metadata";

// Used because of problems with `this` in extended classes
export interface Context<Entity> {
	beforeFind: (params: BeforeFindInput<Entity>) => BeforeFindOutput;
	afterFind: (params: AfterFindParams<Entity>) => Array<Entity>;
	beforeFindOne: (params: BeforeFindOneInput<Entity>) => BeforeFindOneOutput;
	afterFindOne: (params: AfterFindOneParams<Entity>) => Entity;
	beforeSave: (params: BeforeSaveInput<Entity>) => BeforeSaveOutput;
	afterSave: (params: AfterSaveParams) => any;
	beforeUpsert: (params: BeforeUpsertInput<Entity>) => BeforeUpsertOutput;
	afterUpsert: (params: AfterUpsertParams<Entity>) => any;
	beforeDelete: (params: BeforeDeleteInput<Entity>) => BeforeDeleteOutput;
	afterDelete: (params: AfterDeleteParams<Entity>) => Promise<number>;
	beforeCount: (params: BeforeCountInput<Entity>) => BeforeCountOutput;
	afterCount: (params: AfterCountParams<Entity>) => Promise<number>;
	beforePerformativeCount: (
		params: BeforePerformativeCountInput<Entity>,
	) => BeforePerformativeCountOutput;
	afterPerformativeCount: (
		params: AfterPerformativeCountParams<Entity>,
	) => Promise<number>;
	entityManager: EntityManager<ExtraMetadata>;
	entity: Entity;
	logger: Logger;
	tableName: string;
	table: Collection;
	connectionInstance: MongoClient;
}
