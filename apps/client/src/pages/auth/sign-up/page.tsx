import {
  AuthLogo,
  AuthPage,
  AuthPageContent,
  AuthPageDescription,
  AuthPageHeader,
  AuthPageTitle,
} from "@/components/auth-page";
import { SignUp } from "./sign-up";

export const SignUpPage = () => {
  return (
    <AuthPage>
      <AuthPageHeader>
        <AuthLogo />
        <AuthPageTitle>Create an account</AuthPageTitle>
        <AuthPageDescription>
          Enter your details to get started
        </AuthPageDescription>
      </AuthPageHeader>
      <AuthPageContent>
        <SignUp />
      </AuthPageContent>
    </AuthPage>
  );
};
