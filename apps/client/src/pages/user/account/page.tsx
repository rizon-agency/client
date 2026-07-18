import { CustomInput } from "@/components/custom-input";
import {
  UserPage,
  UserPageContent,
  UserPageDescription,
  UserPageHeader,
  UserPageTitle,
} from "@/components/user-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { ChangePassword } from "@/components/change-password";

interface UserAccountPageProps {
  user: {
    email: string;
  };
}

export const UserAccountPage: React.FC<UserAccountPageProps> = ({ user }) => {
  return (
    <UserPage>
      <UserPageHeader>
        <UserPageTitle>Account</UserPageTitle>
        <UserPageDescription>Manage your account settings.</UserPageDescription>
      </UserPageHeader>

      <UserPageContent className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <CustomInput value={user.email} disabled />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePassword />
          </CardContent>
        </Card>
      </UserPageContent>
    </UserPage>
  );
};
