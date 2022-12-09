import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
    ALTER TABLE  posts
        ALTER COLUMN author_id SET NOT NULL
        
    `);
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`
    ALTER TABLE  posts
        DROP COLUMN author_id
    `);
}

