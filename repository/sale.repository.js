import { Sales, detailsSales } from "../models/associations.js";

export class SaleRepository {
    //TODO Implement update status

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