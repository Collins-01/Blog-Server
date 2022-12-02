import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
            ALTER TABLE posts
            DROP COLUMN author_id
    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`
    ALTER TABLE posts
    ADD COLUMN author_id text NOT NULL
`)
}

