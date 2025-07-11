import { item, s } from "dynamodb-toolbox";

import { nowInISOFormat } from "./utils";

const baseSchema = item({
  tenantName: s.string().key().savedAs("TenantName"),
  clientId: s.string().savedAs("ClientId"),
  managedLoginBrandingId: s.string().savedAs("ManagedLoginBrandingId"),
  createdAt: s.string().default(nowInISOFormat).savedAs("CreatedAt"),
  updatedAt: s
    .string()
    .default(nowInISOFormat)
    .updateDefault(nowInISOFormat)
    .savedAs("UpdatedAt"),
});

export const appClientPutSchema = baseSchema;

export const appClientSchema = baseSchema;
