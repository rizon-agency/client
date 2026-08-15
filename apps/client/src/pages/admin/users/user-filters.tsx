import { Search } from "@/components/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";

interface UserFiltersProps {
  onRoleChange: (role: "admin" | "user" | undefined) => void;
  onSearch: (search: string | undefined) => void;
  onVerificationChange: (
    verification: "verified" | "unverified" | undefined,
  ) => void;
  role?: "admin" | "user";
  search?: string;
  verification?: "verified" | "unverified";
}

export const UserFilters = ({
  onRoleChange,
  onSearch,
  onVerificationChange,
  role,
  search,
  verification,
}: UserFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Search
        key={search ?? "default"}
        onSearch={onSearch}
        placeholder="Search by email"
        value={search}
      />
      <Select
        onValueChange={(value) =>
          onRoleChange(
            value === "admin" || value === "user" ? value : undefined,
          )
        }
        value={role ?? "all"}
      >
        <SelectTrigger>
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All roles</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          onVerificationChange(
            value === "verified" || value === "unverified" ? value : undefined,
          )
        }
        value={verification ?? "all"}
      >
        <SelectTrigger>
          <SelectValue placeholder="Verification" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All verification states</SelectItem>
          <SelectItem value="verified">Verified</SelectItem>
          <SelectItem value="unverified">Unverified</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
