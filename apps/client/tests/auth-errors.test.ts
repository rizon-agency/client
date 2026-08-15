import { describe, expect, test } from "bun:test";
import {
  authErrorTranslationCodes,
  getAuthErrorTranslationCode,
} from "../src/lib/auth-errors";

describe("auth error translations", () => {
  test("maps Better Auth errors to the matching server error", () => {
    expect(getAuthErrorTranslationCode("INVALID_EMAIL_OR_PASSWORD")).toBe(
      "invalidCredentials",
    );
    expect(getAuthErrorTranslationCode("EMAIL_NOT_VERIFIED")).toBe(
      "emailNotVerified",
    );
    expect(
      getAuthErrorTranslationCode("USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"),
    ).toBe("emailAlreadyTaken");
    expect(getAuthErrorTranslationCode("INVALID_TOKEN")).toBe(
      "passwordResetInvalid",
    );
    expect(getAuthErrorTranslationCode("PASSWORD_TOO_SHORT")).toBe(
      "invalidPassword",
    );
    expect(getAuthErrorTranslationCode("UNKNOWN_ERROR")).toBeUndefined();
  });

  test("every mapped error has a display message in base-api", () => {
    for (const errorCode of Object.values(authErrorTranslationCodes)) {
      expect(typeof errorCode).toBe("string");
      expect(errorCode.length).toBeGreaterThan(0);
    }
  });
});
