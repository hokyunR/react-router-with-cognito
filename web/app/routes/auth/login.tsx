import { requireAnonymous } from "~/.server/utils.server";

import type { Route } from "./+types/login";
import { redirect } from "react-router";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  await requireAnonymous(request);

  const { tenant } = params;

  const strategy = context.authenticator.get(tenant);

  if (!strategy) {
    return redirect("/");
  }

  await strategy.authenticate(request);
}
