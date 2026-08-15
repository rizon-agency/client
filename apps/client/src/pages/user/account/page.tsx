import {
  UserPage,
  UserPageContent,
  UserPageDescription,
  UserPageHeader,
  UserPageTitle,
} from "@/components/user-page";
import { Account } from "./account";

export const UserAccountPage = () => {
  return (
    <UserPage>
      <UserPageHeader>
        <UserPageTitle>Settings</UserPageTitle>
        <UserPageDescription>Manage your account settings.</UserPageDescription>
      </UserPageHeader>
      <UserPageContent className="flex flex-col gap-6">
        <Account />
      </UserPageContent>
    </UserPage>
  );
};
