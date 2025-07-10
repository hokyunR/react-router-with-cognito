import { Authenticator } from "remix-auth";
import { OAuth2Strategy } from "remix-auth-oauth2";

export type Tokens = OAuth2Strategy.VerifyOptions["tokens"];

export type Strategy = OAuth2Strategy<Tokens>;

export const authenticator: Authenticator<Tokens, Strategy> = new Authenticator<
  Tokens,
  Strategy
>();
