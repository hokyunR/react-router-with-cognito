import { Entity } from "dynamodb-toolbox";

import { appClientPutSchema, appClientSchema } from "./app-client.schema";
import { userTable } from "./table";

export const appClientPutEntity = new Entity({
  name: "AppClient",
  table: userTable,
  schema: appClientPutSchema,
  timestamps: false,
  computeKey: ({ tenantName }) => ({
    PK: `APP_CLIENT#${tenantName}`,
    SK: `APP_CLIENT#${tenantName}`,
  }),
});

export const appClientEntity = new Entity({
  name: "AppClient",
  table: userTable,
  schema: appClientSchema,
  timestamps: false,
  computeKey: ({ tenantName }) => ({
    PK: `APP_CLIENT#${tenantName}`,
    SK: `APP_CLIENT#${tenantName}`,
  }),
});
