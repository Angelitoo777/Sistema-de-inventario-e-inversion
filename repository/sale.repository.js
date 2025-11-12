import { Sales, detailsSales, Clients } from "../models/associations.js";

export class SaleRepository {

    static async getAll(userId) {
        return await Sales.findAll({
            where: { userId },
            include: [{ model: Clients, as: 'client' }]
        })
    }

    static async getById(id, userId) {
        return await Sales.findOne({
            where: {
                id,
                userId
            },
            include: [{
                model: Clients,
                as: 'client'
            },
            {
                model: detailsSales,
                as: 'details'
            }]
        })
    }

    static async findByIdAndUser(id, userId) {
        return await Sales.findOne({
            where: {
                id,
                userId
            }
        });
    }

    static async updatedStatus(id, userId, status) {
        const [rowsAffected] = await Sales.update(
            { status },
            {
                where: {
                    id,
                    userId
                }
            }
        );

        return rowsAffected > 0;
    }

    static async createSale(saleData, transaction) {
        return await Sales.create(saleData, { transaction })
    }

    static async createDetailSale(detailSaleData, transaction) {

        return await detailsSales.bulkCreate(detailSaleData, { transaction })

    }
}