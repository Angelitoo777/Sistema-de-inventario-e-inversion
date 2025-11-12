import { z } from 'zod'

const clientSchema = z.object({
  name: z.string({
    required_error: 'El nombre es requerido'
  }).min(3, 'El nombre debe tener al menos 3 caracteres'),

  phone: z.string({
    required_error: 'El teléfono es requerido'
  }).min(7, 'El teléfono debe tener al menos 7 caracteres')
})

export const validateClient = (clientData) => {
  return clientSchema.safeParse(clientData)
}
