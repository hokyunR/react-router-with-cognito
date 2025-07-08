import { authenticator, STRATEGY_NAME } from "~/.server/auth.server";
import { requireAnonymous } from "~/.server/utils.server";

import type { Route } from "./+types/login";

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);

  await authenticator.authenticate(STRATEGY_NAME, request);
}
