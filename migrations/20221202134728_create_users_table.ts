import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE users (
        id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        email text UNIQUE NOT NULL,
        hash text,
        first_name text NOT NULL,
        last_name text NOT NULL,
        is_social_auth BOOLEAN NOT NULL,
        is_email_verified BOOLEAN NOT NULL
        
    )
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
        DROP TABLE users
    `);
}