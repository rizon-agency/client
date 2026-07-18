import { hc } from "hono/client";
import type { App } from "@server/app";
import { env } from "@/config/env";

export const http = hc<App>(env.VITE_API_URL, {
  init: {
    credentials: "include",
  },
});
