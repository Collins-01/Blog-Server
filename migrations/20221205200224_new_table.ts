import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
    
    CREATE TABLE subscribers (
        subscriber_id int REFERENCES  users(id) NOT NULL,
        user_id int REFERENCES  users(id) NOT NULL,
        UNIQUE (user_id, subscriber_id),
        PRIMARY KEY (user_id, subscriber_id)
    )

    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`
    
    DROP TABLE subscribers
    `)
}

