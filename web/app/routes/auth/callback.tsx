import { redirect } from "react-router";
import { authenticator, STRATEGY_NAME } from "~/.server/auth.server";
import { sessionStorage } from "~/.server/session.server";
import { requireAnonymous } from "~/.server/utils.server";

import type { Route } from "./+types/callback";

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);

  const tokens = await authenticator.authenticate(STRATEGY_NAME, request);

  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  session.set("accessToken", tokens.accessToken());

  if (tokens.hasRefreshToken()) {
    session.set("refreshToken", tokens.refreshToken());
  }

  const headers = new Headers();
  headers.append("set-cookie", await sessionStorage.commitSession(session));

  return redirect("/", { headers });
}
