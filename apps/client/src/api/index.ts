import { AuthApi } from "./auth";
import { PlatformSetupApi } from "./setup";
import { StorageApi } from "./storage";
import { UserApi } from "./user";
import { BillingApi } from "./billing";

class Api {
  public auth = new AuthApi();
  public platformSetup = new PlatformSetupApi();
  public storage = new StorageApi();
  public user = new UserApi();
  public billing = new BillingApi();
}

export const api = new Api();
