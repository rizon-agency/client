import {
  AdminPage,
  AdminPageContent,
  AdminPageDescription,
  AdminPageHeader,
  AdminPageTitle,
} from "@/components/admin-page";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Link } from "@tanstack/react-router";

interface AdminDashboardPageProps {
  user: {
    email: string;
  };
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  user,
}) => {
  return (
    <AdminPage className="flex-1">
      <AdminPageHeader>
        <AdminPageTitle>Start with your product.</AdminPageTitle>
        <AdminPageDescription>
          Your SaaS foundation is ready. Add a focused domain module when you
          know what your customers need.
        </AdminPageDescription>
      </AdminPageHeader>
      <AdminPageContent className="grid flex-1 place-items-center py-14">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>Welcome, {user.email}</CardTitle>
            <CardDescription>
              This is a clean starter dashboard with no product-specific data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/admin/account">Manage account</Link>
            </Button>
          </CardContent>
        </Card>
      </AdminPageContent>
    </AdminPage>
  );
};
