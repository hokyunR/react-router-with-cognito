import { Authenticator } from "remix-auth";
import { CodeChallengeMethod, OAuth2Strategy } from "remix-auth-oauth2";
import { env } from "~/env";

type Tokens = OAuth2Strategy.VerifyOptions["tokens"];

export const STRATEGY_NAME = "cognito";

export const authenticator = new Authenticator<Tokens>();

export const strategy = new OAuth2Strategy<Tokens>(
  {
    clientId: env.CLIENT_ID,
    clientSecret: null,
    authorizationEndpoint: `${env.DOMAIN}/oauth2/authorize`,
    tokenEndpoint: `${env.DOMAIN}/oauth2/token`,
    tokenRevocationEndpoint: `${env.DOMAIN}/oauth2/revoke`,
    redirectURI: env.REDIRECT_URI,
    scopes: ["openid", "email", "profile"],
    codeChallengeMethod: CodeChallengeMethod.S256,
  },
  async ({ tokens }) => tokens
);

authenticator.use(strategy, STRATEGY_NAME);
