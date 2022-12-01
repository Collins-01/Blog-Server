import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
        ALTER TABLE users
        ADD COLUMN is_social_auth BOOLEAN NOT NULL,
        ADD COLUMN is_email_verified BOOLEAN NOT NULL
    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`DROP TABLE users`)
}

