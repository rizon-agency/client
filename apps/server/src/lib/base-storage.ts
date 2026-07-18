export abstract class BaseStorage {
  public abstract getSignedUrl(input: {
    key: string;
    contentType: string;
  }): Promise<{ signedUrl: string; url: string }>;
  public abstract removeFile(input: { key: string }): Promise<void>;
}
