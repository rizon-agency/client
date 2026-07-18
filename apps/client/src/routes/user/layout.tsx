import { UserLayout } from "@/pages/user/layout";
import { createRoute, Outlet } from "@tanstack/react-router";
import { requireAuth } from "../middlewares";
import { rootRoute } from "../root";

export const userLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "user-layout",
  beforeLoad: () => requireAuth("user"),
  component: () => {
    const user = userLayoutRoute.useRouteContext();

    return (
      <UserLayout user={user}>
        <Outlet />
      </UserLayout>
    );
  },
});
