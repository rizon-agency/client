import { AdminAccountPage } from "@/pages/admin/account/page";
import { createRoute } from "@tanstack/react-router";
import { adminLayoutRoute } from "./layout";

export const adminAccountRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/account",
  component: () => {
    const user = adminLayoutRoute.useRouteContext();
    return <AdminAccountPage user={user} />;
  },
});
