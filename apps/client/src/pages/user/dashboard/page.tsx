import {
  UserPage,
  UserPageContent,
  UserPageDescription,
  UserPageHeader,
  UserPageTitle,
} from "@/components/user-page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

interface UserDashboardPageProps {
  user: {
    email: string;
  };
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  user,
}) => {
  return (
    <UserPage className="flex-1">
      <UserPageHeader>
        <UserPageTitle>Start with your product.</UserPageTitle>
        <UserPageDescription>
          Your SaaS foundation is ready. Add a focused domain module when you
          know what your customers need.
        </UserPageDescription>
      </UserPageHeader>
      <UserPageContent className="grid flex-1 place-items-center py-14">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>Welcome, {user.email}</CardTitle>
            <CardDescription>
              This is a clean starter dashboard with no product-specific data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/user/account">Manage account</Link>
            </Button>
          </CardContent>
        </Card>
      </UserPageContent>
    </UserPage>
  );
};
