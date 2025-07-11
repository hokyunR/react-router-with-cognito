import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Table } from "dynamodb-toolbox";

const dynamoDBClient = new DynamoDBClient();

export const userTable = new Table({
  name: process.env.USER_TABLE_NAME,
  partitionKey: { name: "PK", type: "string" },
  sortKey: { name: "SK", type: "string" },
  indexes: {
    GSI1: {
      type: "global",
      partitionKey: { name: "GSI1PK", type: "string" },
      sortKey: { name: "GSI1SK", type: "string" },
    },
  },
  documentClient: DynamoDBDocumentClient.from(dynamoDBClient),
});
