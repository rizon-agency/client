import {
  sessionsTable,
  type Session,
} from "@server/infrastructure/database/schemas";
import { and, eq, ne } from "drizzle-orm";
import { BaseRepository } from "@server/lib/base-repository";

export class SessionRepository extends BaseRepository {
  private static table = sessionsTable;

  public async findBySessionId(where: {
    sessionId: number;
  }): Promise<Session | null> {
    const sessions = await this.db
      .select()
      .from(SessionRepository.table)
      .where(eq(SessionRepository.table.sessionId, where.sessionId))
      .limit(1);

    return sessions.at(0) || null;
  }

  public async findBySession(where: {
    session: string;
  }): Promise<Session | null> {
    const sessions = await this.db
      .select()
      .from(SessionRepository.table)
      .where(eq(SessionRepository.table.session, where.session))
      .limit(1);

    return sessions.at(0) || null;
  }

  public async findManyByUserId(where: { userId: number }): Promise<Session[]> {
    const sessions = await this.db
      .select()
      .from(SessionRepository.table)
      .where(eq(SessionRepository.table.userId, where.userId));

    return sessions;
  }

  public async create(input: {
    session: string;
    userId: number;
    expiresAt: Date;
  }) {
    const Sessions = await this.db
      .insert(SessionRepository.table)
      .values(input)
      .returning();

    return Sessions.at(0)!;
  }

  public async update(
    where: { sessionId: number },
    input: Partial<{ session: string; userId: number }>,
  ) {
    const updatePayload: Partial<{ [K in keyof Session]: Session[K] }> = {};

    if (input.session) {
      updatePayload.session = input.session;
    }

    if (input.userId) {
      updatePayload.userId = input.userId;
    }

    await this.db
      .update(SessionRepository.table)
      .set(updatePayload)
      .where(eq(SessionRepository.table.sessionId, where.sessionId));
  }

  public async removeBySessionId(where: { sessionId: number }) {
    await this.db
      .delete(SessionRepository.table)
      .where(eq(SessionRepository.table.sessionId, where.sessionId));
  }

  public async removeAllButSessionId(where: {
    sessionId: number;
    userId: number;
  }) {
    await this.db
      .delete(SessionRepository.table)
      .where(
        and(
          eq(SessionRepository.table.userId, where.userId),
          ne(SessionRepository.table.sessionId, where.sessionId),
        ),
      );
  }

  public async removeByUserId(where: { userId: number }) {
    await this.db
      .delete(SessionRepository.table)
      .where(eq(SessionRepository.table.userId, where.userId));
  }

  public async removeBySession(where: { session: string }) {
    await this.db
      .delete(SessionRepository.table)
      .where(eq(SessionRepository.table.session, where.session));
  }
}
