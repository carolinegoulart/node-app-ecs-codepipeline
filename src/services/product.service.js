import { ProductRepo } from '../repositories/product.repo.js';

export const ProductService = {
  list: (q) => ProductRepo.list(q),
  create: (data) => ProductRepo.create(data),
  getById: (id) => ProductRepo.getById(id),
  update: (id, data) => ProductRepo.update(id, data),
  remove: (id) => ProductRepo.remove(id)
};