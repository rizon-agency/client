import type { ContentfulStatusCode } from "hono/utils/http-status";

interface AppErrorConstructorParams {
  statusCode: ContentfulStatusCode;
  message: string;
}

export class AppError extends Error {
  public statusCode: ContentfulStatusCode;

  public constructor(input: AppErrorConstructorParams) {
    super(input.message);
    this.statusCode = input.statusCode;
  }
}

export class UnauthorizedError extends AppError {
  public constructor(input: Omit<AppErrorConstructorParams, "statusCode">) {
    super({
      statusCode: 401,
      message: input.message,
    });
  }
}

export class ForbiddenError extends AppError {
  public constructor() {
    super({
      statusCode: 403,
      message: "Permission denied.",
    });
  }
}

export class ConflictError extends AppError {
  public constructor(input: { message: string }) {
    super({
      statusCode: 409,
      message: input.message,
    });
  }
}

export class NotFoundError extends AppError {
  public constructor(input: Omit<AppErrorConstructorParams, "statusCode">) {
    super({
      statusCode: 404,
      message: input.message,
    });
  }
}

export class BadRequestError extends AppError {
  public constructor(input: Omit<AppErrorConstructorParams, "statusCode">) {
    super({
      statusCode: 400,
      message: input.message,
    });
  }
}
