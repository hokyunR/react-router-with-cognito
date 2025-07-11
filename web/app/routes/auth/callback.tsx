import { redirect } from "react-router";
import { sessionStorage } from "~/.server/session.server";
import { requireAnonymous } from "~/.server/utils.server";

import type { Route } from "./+types/callback";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  await requireAnonymous(request);

  const { tenant } = params;

  const strategy = context.authenticator.get(tenant);

  if (!strategy) {
    return redirect("/");
  }

  const tokens = await strategy.authenticate(request);

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
