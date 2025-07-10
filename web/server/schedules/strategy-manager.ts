import { CronJob } from "cron";
import { CodeChallengeMethod, OAuth2Strategy } from "remix-auth-oauth2";
import { authenticator } from "~/.server/authenticator.server";
import type { Tokens } from "~/.server/authenticator.server";
import { env } from "~/env";

const TENANTS: { name: string; clientId: string; redirectUri: string }[] = [];

const onTick = () => {
  for (const { name, clientId, redirectUri } of TENANTS) {
    const strategy = new OAuth2Strategy<Tokens>(
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

    authenticator.use(strategy, name);
  }
};

const job = new CronJob("*/5 * * * * *", onTick, null, false, null, null, true);

job.start();
