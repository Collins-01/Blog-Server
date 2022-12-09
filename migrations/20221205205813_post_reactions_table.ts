import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `CREATE TYPE ReactionType AS ENUM ('like', 'inspiring', 'love', 'dislike')`
  );
  return knex.raw(`
    CREATE TABLE posts_reactions (
        user_id int REFERENCES users(id) NOT NULL,
        post_id int REFERENCES posts(id) NOT NULL,
        reaction ReactionType,
        PRIMARY KEY (user_id, post_id)
    )

  
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
        DROB TABLE posts_reactions
    `);
}
