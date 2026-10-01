import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { validate } from '../middlewares/validate.js';
import { createProductSchema, updateProductSchema, idParamSchema, listQuerySchema } from '../schemas/product.schema.js';

const router = Router();

router.get('/', validate(listQuerySchema), ProductController.list);
router.post('/', validate(createProductSchema),ProductController.create);
router.get('/:id', validate(idParamSchema), ProductController.get);
router.put('/:id', validate(updateProductSchema), ProductController.update);

router.delete('/:id', validate(idParamSchema), ProductController.remove);

export default router;