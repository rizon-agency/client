import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { CustomInput } from "@/components/custom-input";
import { PasswordInput } from "@/components/password-input";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { onError } from "@/lib/base-api";
import { Spinner } from "@/components/ui/spinner";
import { Link, useNavigate } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";

const signInSchema = z.object({
  email: z.email().max(255),
  password: z.string().min(8).max(60),
});

type Output = z.output<typeof signInSchema>;

export const SignIn = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signIn = useMutation({
    mutationFn: async (output: Output) => {
      return await api.auth.signIn({
        email: output.email,
        password: output.password,
      });
    },
    onSuccess: () => navigate({ to: "/dashboard" }),
    onError,
  });

  const onSubmit = (output: Output) => {
    signIn.mutate(output);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
              <CustomInput
                {...field}
                id={field.name}
                type="email"
                placeholder="example@example.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                Password
                <Link to="/forgot-password" className="text-primary ml-auto">
                  Forgot password ?
                </Link>
              </FieldLabel>
              <PasswordInput
                {...field}
                id={field.name}
                placeholder="********"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button size="lg" type="submit" disabled={signIn.isPending}>
          {signIn.isPending && <Spinner />} Sign In
        </Button>

        <div className="flex items-center gap-4 text-muted-foreground">
          <Separator className="shrink flex-1" />
          <span className="text-sm">OR</span>
          <Separator className="shrink flex-1" />
        </div>

        <Button size="lg" variant="outline" disabled={signIn.isPending} asChild>
          <Link to="/sign-up">Create an account</Link>
        </Button>
      </FieldGroup>
    </form>
  );
};
