import type { Context } from "@server/context";
import { AuthService } from "./auth";
import { PlatformSetupService } from "./platform-setup";
import { StorageService } from "./storage";
import { UserService } from "./user";
import { BillingService } from "./billing";
import { BillingAccessService } from "./billing-access";

interface ServicesConstructorParams {
  context: Context;
}

export class Services {
  public auth;
  public platformSetup;
  public storage;
  public user;
  public billing;
  public billingAccess;

  public constructor({ context }: ServicesConstructorParams) {
    this.auth = new AuthService({
      context,
    });

    this.platformSetup = new PlatformSetupService({
      context,
    });

    this.storage = new StorageService({
      context,
    });

    this.user = new UserService({
      context,
    });

    this.billing = new BillingService({
      context,
    });

    this.billingAccess = new BillingAccessService({ context });
  }
}
