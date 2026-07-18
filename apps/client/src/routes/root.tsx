import { api } from "@/api";
import { ApiError } from "@/lib/base-api";
import { RouteLoadingBar } from "@/components/route-loading-bar";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import { ErrorScreen } from "@/pages/error/page";
import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <TooltipProvider>
      <RouteLoadingBar />
      <Outlet />
    </TooltipProvider>
  ),
  errorComponent: ({ error }) => {
    if (error instanceof ApiError) {
      return (
        <ErrorScreen
          error={`${error.statusCode} ${error.message}`}
          description="Something went wrong while loading this page."
        />
      );
    }

    return (
      <ErrorScreen error="Something went wrong" description={error.message} />
    );
  },
  notFoundComponent: () => (
    <ErrorScreen
      error="Page not found"
      description="The page you are looking for does not exist."
    />
  ),
  beforeLoad: async ({ location }) => {
    const { setupDone } = await api.platformSetup.check();
    const isSetupRoute = location.pathname === "/setup";

    if (setupDone) {
      if (isSetupRoute) {
        throw redirect({ to: "/sign-in" });
      }
      return;
    }

    if (isSetupRoute) {
      return;
    }

    throw redirect({
      to: "/setup",
    });
  },
});
