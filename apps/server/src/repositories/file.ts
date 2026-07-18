import {
  filesTable,
  type FileInsert,
} from "@server/infrastructure/database/schemas";
import { BaseRepository } from "@server/lib/base-repository";
import { eq } from "drizzle-orm";

export class FileRepository extends BaseRepository {
  public static table = filesTable;

  public async findByFileId(where: { fileId: number }) {
    const [file] = await this.db
      .select()
      .from(FileRepository.table)
      .where(eq(FileRepository.table.fileId, where.fileId))
      .limit(1);

    return file || null;
  }

  public async create(
    input: Omit<FileInsert, "fileId" | "createdAt" | "updatedAt">,
  ) {
    const [file] = await this.db
      .insert(FileRepository.table)
      .values(input)
      .returning();

    return file!;
  }

  public async removeByFileId(where: { fileId: number }) {
    await this.db
      .delete(FileRepository.table)
      .where(eq(FileRepository.table.fileId, where.fileId));
  }

  public async removeByKey(where: { key: string }) {
    await this.db
      .delete(FileRepository.table)
      .where(eq(FileRepository.table.key, where.key));
  }
}
