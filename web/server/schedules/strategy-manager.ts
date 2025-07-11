import { CronJob } from "cron";
import { QueryCommand } from "dynamodb-toolbox";
import { CodeChallengeMethod, OAuth2Strategy } from "remix-auth-oauth2";
import { authenticator } from "~/.server/authenticator.server";
import { appClientEntity, userTable } from "~/.server/dynamodb";
import { env } from "~/env";

interface AppClient {
  name: string;
  clientId: string;
  redirectUri: string;
}

const globalThisForJob = globalThis as any;

const strategyManager =
  globalThisForJob.strategyManager ??
  new CronJob("*/10 * * * * *", onTick, null, false, null, null, true);

if (!globalThisForJob.strategyManager) {
  globalThisForJob.strategyManager = strategyManager;
  strategyManager.start();
}

async function onTick() {
  console.log("[StrategyManager] Starting strategy synchronization check...");

  const appClients = await queryAppClients();

  const { tenantsToAdd, tenantsToRemove } = identifyChanges(appClients);

  if (tenantsToAdd.length > 0 || tenantsToRemove.length > 0) {
    console.log(
      `[StrategyManager] Changes detected - Adding: ${tenantsToAdd.length}, Removing: ${tenantsToRemove.length}`
    );
  } else {
    console.log("[StrategyManager] No strategy changes needed");
  }

  removeObsoleteStrategies(tenantsToRemove);

  await addNewStrategies(tenantsToAdd, appClients);

  console.log("[StrategyManager] Strategy synchronization completed");
}

async function queryAppClients() {
  const queryCommand = userTable.build(QueryCommand);

  const { Items } = await queryCommand
    .entities(appClientEntity)
    .query({
      partition: "APP_CLIENT",
    })
    .send();

  const items = Items || [];

  return items.map(({ tenantName, clientId }) => ({
    name: tenantName,
    clientId,
    redirectUri: `http://localhost:5173/${tenantName}/callback`,
  }));
}

function identifyChanges(appClients: AppClient[]) {
  const tenantsToAdd = appClients
    .filter(({ name }) => !authenticator.strategies.has(name))
    .map(({ name }) => name);

  const tenantsToRemove = Array.from(authenticator.strategies.keys()).filter(
    (tenantName) => !appClients.find(({ name }) => name === tenantName)
  );

  return { tenantsToAdd, tenantsToRemove };
}

function removeObsoleteStrategies(tenantsToRemove: string[]) {
  for (const tenantName of tenantsToRemove) {
    authenticator.unuse(tenantName);
    console.log(
      `[StrategyManager] Successfully removed strategy for tenant: ${tenantName}`
    );
  }
}

async function addNewStrategies(
  tenantsToAdd: string[],
  appClients: AppClient[]
) {
  for (const tenant of tenantsToAdd) {
    const client = appClients.find(({ name }) => name === tenant);

    if (!client) continue;

    const strategy = createOAuth2Strategy(client);

    authenticator.use(strategy, client.name);

    console.log(
      `[StrategyManager] Successfully added strategy for tenant: ${tenant} (clientId: ${client.clientId})`
    );
  }
}

function createOAuth2Strategy({ clientId, redirectUri }: AppClient) {
  return new OAuth2Strategy(
    {
      clientId,
      clientSecret: null,
      authorizationEndpoint: `${env.DOMAIN}/oauth2/authorize`,
      tokenEndpoint: `${env.DOMAIN}/oauth2/token`,
      tokenRevocationEndpoint: `${env.DOMAIN}/oauth2/revoke`,
      redirectURI: redirectUri,
      scopes: ["openid", "email", "profile"],
      codeChallengeMethod: CodeChallengeMethod.S256,
    },
    async ({ tokens }) => tokens
  );
}
