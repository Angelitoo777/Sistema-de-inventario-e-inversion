import { z } from 'zod'

const buySchema = z.object({

  description: z.string({
    required_error: 'La descripción es requerida'
  }).min(3, 'La descripción debe tener al menos 3 caracteres'),

  amount: z.number({
    required_error: 'El monto es requerido',
    invalid_type_error: 'El monto debe ser un número'
  }).positive('El monto debe ser un número positivo (mayor a 0)'),

  date: z.coerce.date({
    required_error: 'La fecha de la compra es requerida',
    invalid_type_error: 'El formato de la fecha no es válido'
  })
})

export const validateBuy = (buyData) => {
  return buySchema.safeParse(buyData)
}
