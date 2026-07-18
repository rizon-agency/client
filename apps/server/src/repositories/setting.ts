import {
  settingsTable,
  type Setting,
} from "@server/infrastructure/database/schemas";
import { BaseRepository } from "@server/lib/base-repository";
import { eq } from "drizzle-orm";

export class SettingRepository extends BaseRepository {
  private static table = settingsTable;

  public async findById(where: { settingId: number }) {
    const settings = await this.db
      .select()
      .from(SettingRepository.table)
      .where(eq(SettingRepository.table.settingId, where.settingId))
      .limit(1);

    return settings.at(0) || null;
  }

  public async findByKey(where: { key: string }) {
    const settings = await this.db
      .select()
      .from(SettingRepository.table)
      .where(eq(SettingRepository.table.key, where.key))
      .limit(1);

    return settings.at(0) || null;
  }

  public async create(input: { key: string; value: string }) {
    const settings = await this.db
      .insert(SettingRepository.table)
      .values(input)
      .returning();

    return settings.at(0)!;
  }

  public async update(
    where: { settingId: number },
    input: Partial<{ key: string; value: string }>,
  ) {
    const updateObject: Partial<{ [K in keyof Setting]: Setting[K] }> = {};

    if (input.key !== undefined) {
      updateObject.key = input.key;
    }

    if (input.value !== undefined) {
      updateObject.value = input.value;
    }

    await this.db
      .update(SettingRepository.table)
      .set(updateObject)
      .where(eq(settingsTable.settingId, where.settingId));
  }

  public async removeBySettingId(where: { settingId: number }) {
    await this.db
      .delete(SettingRepository.table)
      .where(eq(settingsTable.settingId, where.settingId));
  }

  public async removeByKey(where: { key: string }) {
    await this.db
      .delete(SettingRepository.table)
      .where(eq(settingsTable.key, where.key));
  }
}
