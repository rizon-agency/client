import { BaseApi } from "@/lib/base-api";
import { http } from "@/lib/http";

export class StorageApi extends BaseApi {
  public async getSignedUrl(input: {
    name: string;
    mimeType: string;
    sizeBytes: number;
  }) {
    return this.call(() => {
      return http.api.storage.$post({
        json: {
          name: input.name,
          mimeType: input.mimeType,
          sizeBytes: input.sizeBytes,
        },
      });
    });
  }
}
