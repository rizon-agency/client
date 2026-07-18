import { UserBillingPage } from "@/pages/user/billing/page";
import { createRoute } from "@tanstack/react-router";
import { userLayoutRoute } from "./layout";

export const userBillingRoute = createRoute({
  getParentRoute: () => userLayoutRoute,
  path: "/user/billing",
  component: UserBillingPage,
});
