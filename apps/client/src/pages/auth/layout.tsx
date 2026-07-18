import { Outlet } from "@tanstack/react-router";

export const AuthLayout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Outlet />
    </main>
  );
};
