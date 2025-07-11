import { href, redirect, redirectDocument } from "react-router";
import { requireAuthenticated } from "~/.server/utils.server";
import { sessionStorage } from "~/.server/session.server";

import type { Route } from "./+types/logout";

export async function action({ request, params, context }: Route.LoaderArgs) {
  await requireAuthenticated(request);

  const { tenant } = params;

  const strategy = context.authenticator.get(tenant);

  try {
    const session = await sessionStorage.getSession(
      request.headers.get("cookie")
    );
    const refreshToken = session.get("refreshToken");

    if (refreshToken) {
      await strategy?.revokeToken(refreshToken);
    }
  } catch (error) {
    console.error("Failed to revoke token:", error);
    // 토큰 취소에 실패해도 로그아웃은 계속 진행
  }

  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  const headers = new Headers();
  headers.append("set-cookie", await sessionStorage.destroySession(session));
  headers.append("Clear-Site-Data", "*");

  return redirectDocument(href("/"), { headers });
}

export async function loader() {
  return redirect(href("/"));
}
