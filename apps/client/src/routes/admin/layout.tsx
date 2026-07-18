import { AdminLayout } from "@/pages/admin/layout";
import { createRoute, Outlet } from "@tanstack/react-router";
import { requireAuth } from "../middlewares";
import { rootRoute } from "../root";

export const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-layout",
  beforeLoad: () => requireAuth("admin"),
  component: () => {
    const user = adminLayoutRoute.useRouteContext();

    return (
      <AdminLayout user={user}>
        <Outlet />
      </AdminLayout>
    );
  },
});
