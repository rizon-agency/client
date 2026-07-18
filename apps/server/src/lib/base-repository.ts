import { type DB } from "@server/infrastructure/database/client";

interface BaseRepositoryConstructorParams {
  db: DB;
}

export abstract class BaseRepository {
  protected db;

  public constructor({ db }: BaseRepositoryConstructorParams) {
    this.db = db;
  }
}
