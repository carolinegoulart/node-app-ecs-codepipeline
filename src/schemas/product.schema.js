import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(150),
    description: z.string().optional(),
    price: z.coerce.number().positive(),
  }),
  params: z.object({}),
  query: z.object({})
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(150).optional(),
    description: z.string().optional(),
    price: z.coerce.number().positive().optional(),
  }).refine((data) => Object.keys(data).length > 0, { message: 'Inform a field to update' }),
  params: z.object({ id: z.string().uuid() }),
  query: z.object({})
});

// Schema to validate the ID specified in params
export const idParamSchema = z.object({
  params: z.object({ id: z.string().uuid() })
});

// Schema to validate the list with optional filters
export const listQuerySchema = z.object({
  query: z.object({
    q: z.string().optional(),
  })
});