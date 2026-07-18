import { emailVerifiedRoute } from "@/routes/auth";
import { Link } from "@tanstack/react-router";
import { MoveRight } from "lucide-react";

export const EmailVerifiedPage = () => {
  const search = emailVerifiedRoute.useSearch();

  return (
    <div className="w-full max-w-sm flex flex-col">
      <h1 className="text-3xl"> Email Verified</h1>
      <p className="text-muted-foreground mt-2">
        Your email {search.email} has been successfully verified. You're all set
        to sign in and get started.
      </p>
      <Link to="/sign-in" className="mt-6 flex items-center gap-2 text-primary">
        Sign In <MoveRight size={16} />
      </Link>
    </div>
  );
};
