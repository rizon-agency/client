import z from "zod";

export const passwordSchema = z.string().min(8).max(60);

export const signInSchema = z.object({
  email: z.email().max(255),
  password: passwordSchema,
});

export const signUpSchema = z.object({
  email: z.email().max(255),
  password: passwordSchema,
});

export const confirmEmailAddressSchema = z.object({
  token: z.string().nonempty(),
});

export const forgetPasswordSchema = z.object({
  email: z.email(),
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  token: z.string().nonempty(),
});

export const changePasswordSchema = z.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  revokeOtherSessions: z.boolean().default(false),
});

export const changeEmailSchema = z.object({
  email: z.email().max(255),
});
