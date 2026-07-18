import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { onError } from "@/lib/base-api";
import { api } from "@/api";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface ProfileDropdownProps {
  user: {
    userId: number;
    email: string;
    role: string;
  };
  accountPath: "/admin/account" | "/user/account";
  onNavigate?: () => void;
  className?: string;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  accountPath,
  onNavigate,
  className,
}) => {
  const navigate = useNavigate();

  const signOut = useMutation({
    mutationFn: () => {
      return api.auth.signOut();
    },
    onSuccess: () => {
      navigate({ to: "/sign-in" });
    },
    onError,
  });

  const onSignOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    signOut.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("h-auto py-2 bg-muted/50", className)}
        >
          <span className="hidden font-normal text-lg leading-none group-data-[collapsible=icon]:inline">
            {user.email.charAt(0).toUpperCase()}
          </span>
          <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
            <span>
              {user.role.charAt(0)?.toUpperCase() + user.role.slice(1)}
            </span>
            <span className="text-muted-foreground">{user.email}</span>
          </div>
          <ChevronsUpDown
            className="ml-auto text-muted-foreground group-data-[collapsible=icon]:hidden"
            size={16}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link to={accountPath} onClick={() => onNavigate?.()}>
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={signOut.isPending} onClick={onSignOut}>
            Sign out {signOut.isPending && <Spinner />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
