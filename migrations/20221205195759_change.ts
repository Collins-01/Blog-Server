import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {   
    return knex.raw(`
        ALTER TABLE subscribers 
        DROP COLUMN user_id
    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`
        DROP TABLE  subscribers
        `)
}

