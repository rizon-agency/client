import { eq } from "drizzle-orm";
import { BaseRepository } from "@server/lib/base-repository";
import {
  passwordsTable,
  type Password,
} from "@server/infrastructure/database/schemas";

export class PasswordRepository extends BaseRepository {
  private static table = passwordsTable;

  public async findByPasswordId(where: {
    passwordId: number;
  }): Promise<Password | null> {
    const passwords = await this.db
      .select()
      .from(PasswordRepository.table)
      .where(eq(PasswordRepository.table.passwordId, where.passwordId))
      .limit(1);

    return passwords.at(0) || null;
  }

  public async findFirstByUserId(where: {
    userId: number;
  }): Promise<Password | null> {
    const passwords = await this.db
      .select()
      .from(PasswordRepository.table)
      .where(eq(PasswordRepository.table.userId, where.userId))
      .limit(1);

    return passwords.at(0) || null;
  }

  public async create(input: { hashedPassword: string; userId: number }) {
    const Passwords = await this.db
      .insert(PasswordRepository.table)
      .values(input)
      .returning();

    return Passwords.at(0)!;
  }

  public async update(
    where: { passwordId: number },
    input: Partial<{ hashedPassword: string; userId: number }>,
  ) {
    const updatePayload: Partial<{ [K in keyof Password]: Password[K] }> = {};

    if (input.hashedPassword) {
      updatePayload.hashedPassword = input.hashedPassword;
    }

    if (input.userId) {
      updatePayload.userId = input.userId;
    }

    await this.db
      .update(PasswordRepository.table)
      .set(updatePayload)
      .where(eq(PasswordRepository.table.passwordId, where.passwordId));
  }

  public async updateByUserId(
    where: { userId: number },
    input: Partial<{ hashedPassword: string }>,
  ) {
    const updatePayload: Partial<{ [K in keyof Password]: Password[K] }> = {};

    if (input.hashedPassword) {
      updatePayload.hashedPassword = input.hashedPassword;
    }

    await this.db
      .update(PasswordRepository.table)
      .set(updatePayload)
      .where(eq(PasswordRepository.table.userId, where.userId));
  }

  public async remove(where: { passwordId: number }) {
    await this.db
      .delete(PasswordRepository.table)
      .where(eq(PasswordRepository.table.passwordId, where.passwordId));
  }
}
