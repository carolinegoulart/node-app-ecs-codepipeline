import db from '../db/knex.js';

export const ProductRepo = {
  async list({ page = 1, limit = 10, q }) {
    const base = db('products as p')
      .select('p.*')
      .modify((qb) => {
        if (q) qb.whereILike('p.name', `%${q}%`);
      });

    const [{ count }] = await base.clone().clearSelect().count('* as count');
    
    const items = await base
      .clone()
      .orderBy('p.created_at', 'desc')
      .limit(limit)
      .offset((page - 1) * limit);

    return { items, total: Number(count) };
  },

  async create(data) {
    const [p] = await db('products').insert(data).returning('*');
    return p;
  },

  getById(id) {
    return db('products')
      .select('*')
      .where({ id })
      .first();
  },

  async update(id, data) {
    const [p] = await db('products')
      .where({ id })
      .update({ ...data, updated_at: db.fn.now() })
      .returning('*');
    return p;
  },

  remove(id) {
    return db('products')
      .where({ id })
      .del();
  }
};