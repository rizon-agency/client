import {
  AdminPage,
  AdminPageDescription,
  AdminPageHeader,
  AdminPageTitle,
} from "@/components/admin-page";
import { Users } from "./users";

export const AdminUsersPage = () => {
  return (
    <AdminPage>
      <AdminPageHeader>
        <AdminPageTitle>Users</AdminPageTitle>
        <AdminPageDescription>
          Search accounts, review billing status, and send account recovery
          emails.
        </AdminPageDescription>
      </AdminPageHeader>
      <Users />
    </AdminPage>
  );
};
