import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { ChangePassword } from "@/components/change-password";
import { getRouteApi } from "@tanstack/react-router";
import { ChangeEmail } from "./change-email";
import { SessionManagement } from "./session-management";
import { DeleteAccount } from "./delete-account";

const route = getRouteApi("/user-layout");

export const Account = () => {
  const { user } = route.useRouteContext();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangeEmail email={user.email} />
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

      <Card>
        <CardHeader>
          <CardTitle>Sessions and devices</CardTitle>
          <CardDescription>
            Review where you are signed in and end access you no longer need.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SessionManagement />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delete account</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteAccount />
        </CardContent>
      </Card>
    </>
  );
};
