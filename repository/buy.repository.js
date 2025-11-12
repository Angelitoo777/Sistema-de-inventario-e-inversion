import { Buys } from '../models/associations.js'

export class BuysRepository {
  static async getAllBuys (userId) {
    return await Buys.findAll({ where: { userId } })
  }

  static async getBuyById (id, userId) {
    return await Buys.findOne({ where: { id, userId } })
  }

  static async createBuy (buyData) {
    return await Buys.create(buyData)
  }

  static async updateBuy (id, userId, updatedData) {
    const [rowsAffected] = await Buys.update(updatedData, {
      where: { id, userId }
    })
    return rowsAffected > 0
  }

  static async deleteBuy (id, userId) {
    const rowsDeleted = await Buys.destroy({
      where: { id, userId }
    })
    return rowsDeleted > 0
  }
}
