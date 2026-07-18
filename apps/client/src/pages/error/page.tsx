import { errorRoute } from "@/routes/error";
import { Link } from "@tanstack/react-router";
import { MoveRightIcon } from "lucide-react";

interface ErrorScreenProps {
  error: string;
  description?: string;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  error,
  description,
}) => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col">
        <h1 className="text-3xl">{error}</h1>
        {description && (
          <span className="text-muted-foreground mt-2">{description}</span>
        )}
        <Link to="/" className="mt-6 flex items-center gap-2 text-primary">
          Go Home <MoveRightIcon size={16} />
        </Link>
      </div>
    </main>
  );
};

export const ErrorPage = () => {
  const search = errorRoute.useSearch();
  return <ErrorScreen error={search.error} description={search.description} />;
};
