import { cn } from "@/lib/utils";

interface UserPageProps {
  children?: React.ReactNode;
  className?: string;
}

export const UserPage: React.FC<UserPageProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col px-6 py-8 sm:px-8 lg:px-10 lg:py-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface UserPageHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const UserPageHeader: React.FC<UserPageHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <header className={cn("flex flex-col gap-1", className)}>{children}</header>
  );
};

interface UserPageTitleProps {
  children?: React.ReactNode;
  className?: string;
}

export const UserPageTitle: React.FC<UserPageTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h1 className={cn("text-3xl font-semibold tracking-tight", className)}>
      {children}
    </h1>
  );
};

interface UserPageDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export const UserPageDescription: React.FC<UserPageDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn("mt-2 max-w-2xl text-muted-foreground", className)}>
      {children}
    </p>
  );
};

interface UserPageContentProps {
  children?: React.ReactNode;
  className?: string;
}

export const UserPageContent: React.FC<UserPageContentProps> = ({
  children,
  className,
}) => {
  return <div className={cn("mt-8", className)}>{children}</div>;
};

interface UserPageFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const UserPageFooter: React.FC<UserPageFooterProps> = ({
  children,
  className,
}) => {
  return (
    <footer
      className={cn(
        "mt-10 flex flex-col gap-3 border-t border-border pt-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {children}
    </footer>
  );
};
