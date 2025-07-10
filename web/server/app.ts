import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";

import { authenticator } from "~/.server/authenticator.server";

import "./schedules/strategy-manager";

declare module "react-router" {
  interface AppLoadContext {
    authenticator: typeof authenticator;
  }
}

export const app = express();

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        authenticator,
      };
    },
  })
);
