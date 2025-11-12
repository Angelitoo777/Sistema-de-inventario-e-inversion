import { ClientService } from '../services/clients.services.js'
import { validateClient } from '../validations/clients.validation.js'

export class ClientController {
  static async createClient (req, res) {
    const validation = validateClient(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues })
    }

    const userId = req.user.id
    const clientData = validation.data

    try {
      const newClient = await ClientService.createClient({
        ...clientData,
        userId
      })
      return res.status(201).json(newClient)
    } catch (error) {
      console.error(error.message)

      if (error.message === 'Ya existe un cliente con este número de teléfono para el usuario dado.') {
        return res.status(409).json({ message: error.message })
      }

      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
}
