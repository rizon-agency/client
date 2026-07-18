export abstract class BaseLogger {
  public abstract info(message: string | object): Promise<void>;
}
