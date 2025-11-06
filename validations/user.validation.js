import { z } from 'zod'

const userSchema = z.object({
    username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export const validateUser = (userData) => {
    const result = userSchema.safeParse(userData)
    if (!result.success) {
        const errors = result.error.errors.map(err => err.message)
        throw new Error("Validación fallida: " + errors.join(", "))
    }
    return result.data
}

export const validateLogin = (loginData) => {
    const result = userSchema.partial().safeParse(loginData)

    if (!result.success) {
        const errors = result.error.errors.map(err => err.message)
        throw new Error("Validación de inicio de sesión fallida: " + errors.join(", "))
    }
    return result.data
}