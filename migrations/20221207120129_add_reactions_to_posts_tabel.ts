import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
        ALTER TABLE posts
        ADD COLUMN likes int NOT NULL DEFAULT 0,
        ADD COLUMN loves int NOT NULL DEFAULT 0,
        ADD COLUMN wows int NOT NULL DEFAULT 0,
        ADD COLUMN insightfuls int NOT NULL DEFAULT 0
    `)

}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    ALTER TABLE posts
    DROP  COLUMN likes,
    DROP  COLUMN loves,
    DROP  COLUMN wows,
    DROP  COLUMN insightfuls
    `);
}
