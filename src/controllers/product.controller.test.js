import { afterEach, describe, expect, it, vi } from 'vitest';
import { ProductController } from './product.controller.js';
import { ProductService } from '../services/product.service.js';

vi.mock('../services/product.service.js', () => ({
  ProductService: {
    list: vi.fn(),
    create: vi.fn(),
    getById: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}));

const createResponse = () => ({
  json: vi.fn(),
  send: vi.fn(),
  status: vi.fn().mockReturnThis()
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ProductController', () => {
  describe('list', () => {
    it('lists products using the query filters', async () => {
      const req = { query: { page: '2', limit: '5', q: 'keyboard' } };
      const res = createResponse();
      const next = vi.fn();
      const result = { items: [{ id: 1, name: 'Keyboard' }], total: 1 };
      vi.spyOn(ProductService, 'list').mockResolvedValue(result);

      await ProductController.list(req, res, next);

      expect(ProductService.list).toHaveBeenCalledWith(req.query);
      expect(res.json).toHaveBeenCalledWith(result);
      expect(next).not.toHaveBeenCalled();
    });

    it('forwards errors to the middleware', async () => {
      const error = new Error('Failed to list products');
      const req = { query: {} };
      const res = createResponse();
      const next = vi.fn();
      vi.spyOn(ProductService, 'list').mockRejectedValue(error);

      await ProductController.list(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('creates a product and responds with status 201', async () => {
      const req = { body: { name: 'Mouse', price: 99.9 } };
      const res = createResponse();
      const next = vi.fn();
      const created = { id: 1, ...req.body };
      vi.spyOn(ProductService, 'create').mockResolvedValue(created);

      await ProductController.create(req, res, next);

      expect(ProductService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
      expect(next).not.toHaveBeenCalled();
    });

    it('forwards errors to the middleware', async () => {
      const error = new Error('Failed to create product');
      const req = { body: { name: 'Mouse' } };
      const res = createResponse();
      const next = vi.fn();
      vi.spyOn(ProductService, 'create').mockRejectedValue(error);

      await ProductController.create(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('returns the requested product', async () => {
      const req = { params: { id: '1' } };
      const res = createResponse();
      const next = vi.fn();
      const product = { id: 1, name: 'Monitor' };
      vi.spyOn(ProductService, 'getById').mockResolvedValue(product);

      await ProductController.get(req, res, next);

      expect(ProductService.getById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(product);
      expect(next).not.toHaveBeenCalled();
    });

    it('forwards a 404 error when the product does not exist', async () => {
      const req = { params: { id: '999' } };
      const res = createResponse();
      const next = vi.fn();
      vi.spyOn(ProductService, 'getById').mockResolvedValue(undefined);

      await ProductController.get(req, res, next);

      expect(next).toHaveBeenCalledWith({
        status: 404,
        message: 'Produto não encontrado'
      });
      expect(res.json).not.toHaveBeenCalled();
    });

    it('forwards errors to the middleware', async () => {
      const error = new Error('Failed to get product');
      const req = { params: { id: '1' } };
      const res = createResponse();
      const next = vi.fn();
      vi.spyOn(ProductService, 'getById').mockRejectedValue(error);

      await ProductController.get(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('updates and returns the product', async () => {
      const req = { params: { id: '1' }, body: { name: 'Monitor 4K' } };
      const res = createResponse();
      const next = vi.fn();
      const updated = { id: 1, ...req.body };
      vi.spyOn(ProductService, 'update').mockResolvedValue(updated);

      await ProductController.update(req, res, next);

      expect(ProductService.update).toHaveBeenCalledWith('1', req.body);
      expect(res.json).toHaveBeenCalledWith(updated);
      expect(next).not.toHaveBeenCalled();
    });

    it('forwards a 404 error when the product does not exist', async () => {
      const req = { params: { id: '999' }, body: { name: 'Monitor 4K' } };
      const res = createResponse();
      const next = vi.fn();
      vi.spyOn(ProductService, 'update').mockResolvedValue(undefined);

      await ProductController.update(req, res, next);

      expect(next).toHaveBeenCalledWith({
        status: 404,
        message: 'Produto não encontrado'
      });
      expect(res.json).not.toHaveBeenCalled();
    });

    it('forwards errors to the middleware', async () => {
      const error = new Error('Failed to update product');
      const req = { params: { id: '1' }, body: {} };
      const res = createResponse();
      const next = vi.fn();
      vi.spyOn(ProductService, 'update').mockRejectedValue(error);

      await ProductController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('removes the product and responds with status 204', async () => {
      const req = { params: { id: '1' } };
      const res = createResponse();
      const next = vi.fn();
      vi.spyOn(ProductService, 'remove').mockResolvedValue(1);

      await ProductController.remove(req, res, next);

      expect(ProductService.remove).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });

    it('forwards a 404 error when the product does not exist', async () => {
      const req = { params: { id: '999' } };
      const res = createResponse();
      const next = vi.fn();
      vi.spyOn(ProductService, 'remove').mockResolvedValue(0);

      await ProductController.remove(req, res, next);

      expect(next).toHaveBeenCalledWith({
        status: 404,
        message: 'Produto não encontrado'
      });
      expect(res.status).not.toHaveBeenCalled();
    });

    it('forwards errors to the middleware', async () => {
      const error = new Error('Failed to remove product');
      const req = { params: { id: '1' } };
      const res = createResponse();
      const next = vi.fn();
      vi.spyOn(ProductService, 'remove').mockRejectedValue(error);

      await ProductController.remove(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
    });
  });
});
