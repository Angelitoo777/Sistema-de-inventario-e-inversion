import { BuysService } from '../services/buy.services.js'
import { validateBuy } from '../validations/buy.validation.js'

export class BuysController {
  static async getAllBuys (req, res) {
    const userId = req.user.id
    try {
      const buys = await BuysService.getAllBuys(userId)
      res.status(200).json(buys)
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async getBuyById (req, res) {
    const { id } = req.params
    const userId = req.user.id
    try {
      const buy = await BuysService.getBuyById(id, userId)
      if (!buy) {
        return res.status(404).json({ message: 'Compra no encontrada' })
      }

      return res.status(200).json(buy)
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async createBuy (req, res) {
    const validation = validateBuy(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues })
    }

    const userId = req.user.id
    const buyData = validation.data

    try {
      const newBuy = await BuysService.createBuy(userId, buyData)
      res.status(201).json(newBuy)
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async updateBuy (req, res) {
    const { id } = req.params
    const userId = req.user.id
    const validation = validateBuy(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues })
    }

    const updatedData = validation.data

    try {
      const updated = await BuysService.updateBuy(id, userId, updatedData)

      if (!updated) {
        return res.status(404).json({ message: 'Compra no encontrada o no autorizada' })
      }

      return res.status(200).json({ message: 'Compra actualizada exitosamente' })
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async deleteBuy (req, res) {
    const { id } = req.params
    const userId = req.user.id

    try {
      const deleted = await BuysService.deleteBuy(id, userId)

      if (!deleted) {
        return res.status(404).json({ message: 'Compra no encontrada o no autorizada' })
      }

      return res.status(200).json({ message: 'Compra eliminada exitosamente' })
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
}
