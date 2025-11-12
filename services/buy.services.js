import { BuysRepository } from '../repository/buy.repository.js'

export class BuysService {
  static async getAllBuys (userId) {
    return await BuysRepository.getAllBuys(userId)
  }

  static async getBuyById (id, userId) {
    return await BuysRepository.getBuyById(id, userId)
  }

  static async createBuy (userId, buyData) {
    const fullBuyData = { ...buyData, userId }

    return await BuysRepository.createBuy(fullBuyData)
  }

  static async updateBuy (id, userId, updatedData) {
    return await BuysRepository.updateBuy(id, userId, updatedData)
  }

  static async deleteBuy (id, userId) {
    return await BuysRepository.deleteBuy(id, userId)
  }
}
