import { UserService } from '../services/user.services.js'
import { validateUser } from '../validations/user.validation.js'

export class UserController {
    static async registerUser(req, res) {
        const validation = validateUser(req.body)

        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.issues })
        }

        const { username, password } = validation.data

        try {
            const newUser = await UserService.registerUser({ username, password })
            return res.status(201).json({ message: "Usuario creado exitosamente", user: newUser.username })
        } catch (error) {

            if (error.message === "Error al registrar el usuario: El nombre de usuario ya está en uso.") {
                return res.status(409).json({ message: error.message });
            }


            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    static async loginUser(req, res) {
        const validation = validateUser(req.body)

        if (!validation.success) {
            return res.status(400).json({ error: validation.error.message })
        }

        const { username, password } = validation.data

        try {
            const token = await UserService.loginUser({ username, password })

            return res
                .cookie('access_token', token.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 3600000 // 1 hour
                })
                .status(200)
                .json({ message: 'Inicio de sesión exitoso' })
        } catch (error) {
            if (error.message === "Credenciales invalidas.") {
                return res.status(401).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}
