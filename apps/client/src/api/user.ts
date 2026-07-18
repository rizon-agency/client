import { BaseApi } from "@/lib/base-api";
import { http } from "@/lib/http";

export class UserApi extends BaseApi {
  public list(query?: {
    page?: number;
    search?: string;
    role?: "admin" | "user";
  }) {
    return this.call(() =>
      http.api.users.$get({
        query: {
          page: query?.page?.toString(),
          search: query?.search,
          role: query?.role,
        },
      }),
    );
  }

  public show(where: { userId: number }) {
    return this.call(() =>
      http.api.users[":userId"].$get({
        param: {
          userId: where.userId.toString(),
        },
      }),
    );
  }

  public create(input: {
    email: string;
    password: string;
    role: "admin" | "user";
  }) {
    return this.call(() =>
      http.api.users.$post({
        json: {
          email: input.email,
          password: input.password,
          role: input.role,
        },
      }),
    );
  }

  public remove(where: { userId: number }) {
    return this.call(() =>
      http.api.users[":userId"].$delete({
        param: {
          userId: where.userId.toString(),
        },
      }),
    );
  }
}
