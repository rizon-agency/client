import crypto from "crypto";
import { BaseService } from "@server/lib/base-service";
import type { Repositories } from "@server/repositories";
import type { BaseStorage } from "@server/lib/base-storage";

export class StorageService extends BaseService {
  public async getSignedUrl(input: {
    name: string;
    sizeBytes: number;
    mimeType: string;
  }) {
    const key = crypto.randomUUID() + input.name;

    const { signedUrl, url } = await this.context.storage.getSignedUrl({
      contentType: input.mimeType,
      key,
    });

    const file = await this.context.repositories.file.create({
      name: input.name,
      key: key,
      sizeBytes: input.sizeBytes,
      mimeType: input.mimeType,
      url: url,
    });

    return { signedUrl, fileId: file.fileId, url };
  }

  public static async removeFile(
    where: { key: string },
    tx: Repositories,
    storage: BaseStorage,
  ) {
    return tx.transaction(async ({ tx }) => {
      await tx.file.removeByKey({
        key: where.key,
      });

      await storage.removeFile({
        key: where.key,
      });
    });
  }
}
