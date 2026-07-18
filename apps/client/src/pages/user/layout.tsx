import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { UserSidebar } from "./sidebar";

interface UserLayoutProps {
  user: {
    userId: number;
    email: string;
    role: string;
  };
  children: React.ReactNode;
}

export const UserLayout: React.FC<UserLayoutProps> = ({ user, children }) => {
  return (
    <SidebarProvider>
      <UserSidebar user={user} />
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
