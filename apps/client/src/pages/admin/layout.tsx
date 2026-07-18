import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { AdminSidebar } from "./sidebar";

interface AdminLayoutProps {
  user: {
    userId: number;
    email: string;
    role: string;
  };
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ user, children }) => {
  return (
    <SidebarProvider>
      <AdminSidebar user={user} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6">
          <SidebarTrigger />
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
