import bcrypt from 'bcrypt'
import { UserRepository } from '../repository/user.repository.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export class UserService {
  static async registerUser (userData) {
    try {
      const userExists = await UserRepository.findByUsername(userData.username)
      if (userExists) {
        throw new Error('El nombre de usuario ya está en uso.')
      }

      const hasshPassword = await bcrypt.hash(userData.password, 10)

      const newUser = await UserRepository.createUser({
        username: userData.username,
        password: hasshPassword
      })

      return newUser
    } catch (error) {
      throw new Error('Error al registrar el usuario: ' + error.message)
    }
  }

  static async loginUser (loginData) {
    try {
      const user = await UserRepository.findByUsername(loginData.username)
      if (!user) {
        throw new Error('Credenciales invalidas.')
      }

      const isPasswordValid = await bcrypt.compare(loginData.password, user.password)
      if (!isPasswordValid) {
        throw new Error('Credenciales invalidas.')
      }

      const token = jwt.sign({
        id: user.id,
        username: user.username
      }, JWT_SECRET, {
        expiresIn: '1h'
      })

      return { user, token }
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + error.message)
    }
  }
}
