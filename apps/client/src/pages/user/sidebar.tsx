import { ProfileDropdown } from "@/components/profile-dropdown";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@repo/ui/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import { Logo, LogoWithText } from "@repo/ui/logo-mark";
import {
  LayoutDashboardIcon,
  CreditCardIcon,
  type LucideIcon,
} from "lucide-react";

interface UserSidebarProps {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

interface NavigationItem {
  label: string;
  to: "/user/dashboard" | "/user/billing";
  icon: LucideIcon;
}

const navigation: NavigationItem[] = [
  { label: "Dashboard", to: "/user/dashboard", icon: LayoutDashboardIcon },
  { label: "Billing", to: "/user/billing", icon: CreditCardIcon },
];

export const UserSidebar: React.FC<UserSidebarProps> = ({ user }) => {
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  const closeOnMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              tooltip="Rizon"
              className="[&>svg]:size-8! [&>svg:first-child]:h-8! [&>svg:first-child]:w-auto!"
            >
              <Link to="/user/dashboard">
                <LogoWithText
                  size={64}
                  className="group-data-[collapsible=icon]:hidden"
                />
                <Logo
                  size={28}
                  className="hidden group-data-[collapsible=icon]:block"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.to}
                    tooltip={item.label}
                  >
                    <Link to={item.to} onClick={closeOnMobile}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <ProfileDropdown
          user={user}
          accountPath="/user/account"
          onNavigate={closeOnMobile}
          className="w-full justify-start overflow-hidden group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:justify-center! group-data-[collapsible=icon]:p-0!"
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
