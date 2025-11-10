import { Sales, detailsSales } from "../models/associations.js";

export class SaleRepository {
    static async createSale(saleData, transaction) {
        return await Sales.create(saleData, { transaction })
    }

    static async createDetailSale(detailSaleData, transaction) {

        return await detailsSales.bulkCreate(detailSaleData, { transaction })

    }
}