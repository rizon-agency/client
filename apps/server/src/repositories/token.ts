import { and, eq } from "drizzle-orm";
import { BaseRepository } from "@server/lib/base-repository";
import {
  tokensTable,
  type Token,
} from "@server/infrastructure/database/schemas";
import type { TokenType } from "@server/config/constants";

export class TokenRepository extends BaseRepository {
  private static table = tokensTable;

  public async findByTokenId(where: {
    tokenId: number;
  }): Promise<Token | null> {
    const tokens = await this.db
      .select()
      .from(TokenRepository.table)
      .where(eq(TokenRepository.table.tokenId, where.tokenId))
      .limit(1);

    return tokens.at(0) || null;
  }

  public async findByToken(where: { token: string }): Promise<Token | null> {
    const tokens = await this.db
      .select()
      .from(TokenRepository.table)
      .where(eq(TokenRepository.table.token, where.token))
      .limit(1);

    return tokens.at(0) || null;
  }

  public async create(input: {
    token: string;
    userId: number;
    type: TokenType;
    expiresAt: Date;
  }) {
    const tokens = await this.db
      .insert(TokenRepository.table)
      .values(input)
      .returning();

    return tokens.at(0)!;
  }

  public async update(
    where: { tokenId: number },
    input: Partial<{ token: string; userId: number }>,
  ) {
    const updatePayload: Partial<{ [K in keyof Token]: Token[K] }> = {};

    if (input.token) {
      updatePayload.token = input.token;
    }

    if (input.userId) {
      updatePayload.userId = input.userId;
    }

    await this.db
      .update(TokenRepository.table)
      .set(updatePayload)
      .where(eq(TokenRepository.table.tokenId, where.tokenId));
  }

  public async removeByTokenId(where: { tokenId: number }) {
    await this.db
      .delete(TokenRepository.table)
      .where(eq(TokenRepository.table.tokenId, where.tokenId));
  }

  public async removeByUserIdAndType(where: {
    userId: number;
    type: TokenType;
  }) {
    await this.db
      .delete(TokenRepository.table)
      .where(
        and(
          eq(TokenRepository.table.type, where.type),
          eq(TokenRepository.table.userId, where.userId),
        ),
      );
  }
}
