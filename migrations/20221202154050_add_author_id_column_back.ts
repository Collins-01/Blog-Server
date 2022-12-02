import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const email: string = 'test1@gmail.com';
  return  await knex.raw(
    `
    ALTER TABLE posts
    ADD COLUMN author_id int REFERENCES users(id)
    `,
    [],
  );
  

}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    ALTER TABLE  posts
        DROP COLUMN author_id
    `);
}


/*



  if (!id) {
    throw new Error('The default user does not exist.');
  }
  await knex.raw(`
    ALTER TABLE posts
     ADD COLUMN author_id int REFERENCES users(id)
  `);
  await knex.raw(
    `
    UPDATE posts SET author_id = $1
  `,
    [id],
  );
  await knex.raw(`
        ALTER TABLE posts 
        ALTER COLUMN author_id SET NOT NULL
  `);
*/