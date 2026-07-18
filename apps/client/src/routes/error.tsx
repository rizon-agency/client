import { ErrorPage } from "@/pages/error/page";
import { createRoute } from "@tanstack/react-router";
import z from "zod";
import { rootRoute } from "./root";

export const errorRoute = createRoute({
  component: () => <ErrorPage />,
  path: "/error",
  getParentRoute: () => rootRoute,
  validateSearch: z.object({
    error: z.string().nonempty(),
    description: z.string().optional(),
  }),
});
