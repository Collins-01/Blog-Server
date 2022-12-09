import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
     CREATE TABLE posts  (
      id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      title text NOT NULL,
      post_content text NOT NULL,
      author_id int NOT NULL,
      background_image text NOT NULL,
      description text NOT NULL
     )
     
      
    `);
  }
  
  export async function down(knex: Knex): Promise<void> {
    return knex.raw(`
      DROP TABLE posts
    `);
  }