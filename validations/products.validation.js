import { z } from 'zod'

const productSchema = z.object({
  name: z.string({
    required_error: 'El nombre del producto es requerido'
  }).min(3, 'El nombre debe tener al menos 3 caracteres'),

  selling_price: z.number({
    required_error: 'El precio de venta es requerido',
    invalid_type_error: 'El precio de venta debe ser un número'
  }).nonnegative('El precio de venta no puede ser negativo'),

  cost_price: z.number({
    required_error: 'El precio de costo es requerido',
    invalid_type_error: 'El precio de costo debe ser un número'
  }).nonnegative('El precio de costo no puede ser negativo')
})

export const validateProduct = (productData) => {
  return productSchema.safeParse(productData)
}
