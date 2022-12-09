import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
        ALTER TABLE comments 
        DROP COLUMN created_at
    `);
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`
        ALTER TABLE comments
        ADD COLUMN created_at imestamptz NOT NULL
    `)
}

