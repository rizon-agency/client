import { BaseApi } from "@/lib/base-api";
import { http } from "@/lib/http";

export class AuthApi extends BaseApi {
  public signIn(input: { email: string; password: string }) {
    return this.call(() => {
      return http.api.auth["sign-in"].$post({
        json: {
          email: input.email,
          password: input.password,
        },
      });
    });
  }

  public signUp(input: { email: string; password: string }) {
    return this.call(() => {
      return http.api.auth["sign-up"].$post({
        json: {
          email: input.email,
          password: input.password,
        },
      });
    });
  }

  public forgotPassword(input: { email: string }) {
    return this.call(() => {
      return http.api.auth["forget-password"].$post({
        json: {
          email: input.email,
        },
      });
    });
  }

  public resetPassword(input: { password: string; token: string }) {
    return this.call(() => {
      return http.api.auth["reset-password"].$post({
        json: {
          password: input.password,
          token: input.token,
        },
      });
    });
  }

  public me() {
    return this.call(() => {
      return http.api.auth.me.$get();
    });
  }

  public changePassword(input: {
    currentPassword: string;
    newPassword: string;
    revokeOtherSessions: boolean;
  }) {
    return this.call(() =>
      http.api.auth["change-password"].$post({
        json: {
          currentPassword: input.currentPassword,
          newPassword: input.newPassword,
          revokeOtherSessions: input.revokeOtherSessions,
        },
      }),
    );
  }

  public signOut() {
    return this.call(() => {
      return http.api.auth["sign-out"].$post();
    });
  }
}
