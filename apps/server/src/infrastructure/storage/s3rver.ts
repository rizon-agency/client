import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { BaseStorage } from "@server/lib/base-storage";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const S3RVER_BUCKET = "local-bucket";
const S3RVER_ENDPOINT = "http://localhost:4566";

export class S3rverStorage extends BaseStorage {
  private client: S3Client;

  public constructor() {
    super();

    this.client = new S3Client({
      region: "local",
      endpoint: S3RVER_ENDPOINT,
      forcePathStyle: true,
      credentials: {
        accessKeyId: "S3RVER",
        secretAccessKey: "S3RVER",
      },
    });
  }

  public override async getSignedUrl(input: {
    key: string;
    contentType: string;
  }): Promise<{ signedUrl: string; url: string }> {
    const command = new PutObjectCommand({
      Key: input.key,
      Bucket: S3RVER_BUCKET,
      ContentType: input.contentType,
    });

    const signedUrl = await getSignedUrl(this.client, command, {
      expiresIn: 3600,
    });

    return {
      signedUrl,
      url: signedUrl.split("?")[0]!,
    };
  }

  public override async removeFile(input: { key: string }): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: S3RVER_BUCKET,
      Key: input.key,
    });

    await this.client.send(command);
  }
}
