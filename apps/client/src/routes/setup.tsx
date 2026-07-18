import { rootRoute } from "./root";
import { SetupPage } from "@/pages/setup/page";
import { createRoute } from "@tanstack/react-router";

export const setupRoute = createRoute({
  path: "/setup",
  component: () => <SetupPage />,
  getParentRoute: () => rootRoute,
});
