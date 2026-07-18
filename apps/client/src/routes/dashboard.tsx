import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { redirectToRoleDashboard } from "./middlewares";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: redirectToRoleDashboard,
});
