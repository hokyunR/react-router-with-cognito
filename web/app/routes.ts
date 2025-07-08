import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("logout", "routes/auth/logout.tsx"),
  route("callback", "routes/auth/callback.tsx"),
  ...prefix("projects", [
    route(":projectId", "routes/projects/show.tsx"),
  ]),
] satisfies RouteConfig;
