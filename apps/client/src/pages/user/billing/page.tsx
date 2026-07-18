import {
  UserPage,
  UserPageContent,
  UserPageDescription,
  UserPageHeader,
  UserPageTitle,
} from "@/components/user-page";
import { Billing } from "./billing";

export const UserBillingPage = () => {
  return (
    <UserPage>
      <UserPageHeader>
        <UserPageTitle>Billing</UserPageTitle>
        <UserPageDescription>
          Choose a plan and manage your subscription.
        </UserPageDescription>
      </UserPageHeader>
      <UserPageContent className="space-y-8">
        <Billing />
      </UserPageContent>
    </UserPage>
  );
};
