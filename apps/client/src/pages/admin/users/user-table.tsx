import { api } from "@/api";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Spinner } from "@repo/ui/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";

type User = Awaited<ReturnType<typeof api.user.list>>["users"][number];

interface UserTableProps {
  isPasswordResetPending: boolean;
  isVerificationPending: boolean;
  onResendPasswordReset: (userId: string) => void;
  onResendVerification: (userId: string) => void;
  passwordResetUserId?: string;
  users: User[];
  verificationUserId?: string;
}

const roleLabel = (role: string) =>
  role === "admin" ? "Admin" : role === "user" ? "User" : role;

export const UserTable = ({
  isPasswordResetPending,
  isVerificationPending,
  onResendPasswordReset,
  onResendVerification,
  passwordResetUserId,
  users,
  verificationUserId,
}: UserTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Account</TableHead>
          <TableHead>Account status</TableHead>
          <TableHead>Subscription</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4}>No accounts match your search.</TableCell>
          </TableRow>
        ) : (
          users.map((user) => {
            const isPending =
              (isVerificationPending && verificationUserId === user.id) ||
              (isPasswordResetPending && passwordResetUserId === user.id);

            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div>{user.name}</div>
                  <div>{user.email}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.emailVerified ? "secondary" : "outline"}>
                    {user.emailVerified ? "Verified" : "Unverified"}
                  </Badge>{" "}
                  {user.banned && <Badge variant="destructive">Banned</Badge>}{" "}
                  <Badge variant="outline">{roleLabel(user.role)}</Badge>
                </TableCell>
                <TableCell>
                  {user.subscription
                    ? `${user.subscription.planKey} · ${user.subscription.status}`
                    : "No active subscription"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-label="Actions"
                        disabled={
                          isVerificationPending || isPasswordResetPending
                        }
                        size="icon"
                        variant="ghost"
                      >
                        {isPending ? <Spinner /> : <MoreHorizontalIcon />}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!user.emailVerified && (
                        <DropdownMenuItem
                          onClick={() => onResendVerification(user.id)}
                        >
                          Resend verification
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => onResendPasswordReset(user.id)}
                      >
                        Send password reset
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};
