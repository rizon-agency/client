import { BaseLogger } from "@server/lib/base-logger";

export class PinoLogger extends BaseLogger {
  public async info(message: string | object) {
    console.log(JSON.stringify(message));
  }
}
