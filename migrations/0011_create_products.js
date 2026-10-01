export const up = async (knex) => {
  await knex.schema.createTable('products', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).notNullable();
    t.string('name', 150).notNullable().unique();
    t.text('description');
    t.decimal('price', 12, 2).notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());

  });
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('products');
};