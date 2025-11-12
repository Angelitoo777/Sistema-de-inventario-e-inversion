import { SaleRepository } from '../repository/sale.repository.js'
import { ClientRepository } from '../repository/client.repository.js'
import { sequelize } from '../utils/mysql.database.js'

export class SalesService {
  static async getAllSales (userId) {
    return await SaleRepository.getAll(userId)
  }

  static async getSaleById (id, userId) {
    const sale = await SaleRepository.getById(id, userId)

    if (!sale) {
      throw new Error('Venta no encontrada o no autorizada')
    }

    return sale
  }

  static async createSale (userId, saleData) {
    if (saleData.clientId) {
      const client = await ClientRepository.findClientById(saleData.clientId)

      if (!client) {
        throw new Error('El cliente especificado no existe')
      }

      if (client.userId !== userId) {
        throw new Error('Acción no autorizada sobre el cliente"')
      }
    }

    const t = await sequelize.transaction()

    try {
      const dataOfTicket = {
        userId,
        clientId: saleData.clientId,
        status: saleData.status,
        date: new Date()
      }

      const newSale = await SaleRepository.createSale(dataOfTicket, t)

      const detailsId = newSale.id

      const detailsSaleData = saleData.details.map((detail) => ({
        ...detail,
        saleId: detailsId
      }))

      await SaleRepository.createDetailSale(detailsSaleData, t)

      await t.commit()

      return newSale
    } catch (error) {
      await t.rollback()
      throw error
    }
  }

  static async updateSaleStatus (saleId, userId, newStatus) {
    const sale = await SaleRepository.findByIdAndUser(saleId, userId)

    if (!sale) {
      throw new Error('Venta no encontrada o no autorizada')
    }

    return await SaleRepository.updatedStatus(saleId, userId, newStatus)
  }
}
