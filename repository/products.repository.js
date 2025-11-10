import { Products } from '../models/associations.js'

export class ProductsRepository {
    static async getAllProducts(userId) {
        return await Products.findAll({ where: { userId: userId } });
    }

    static async getProductById(id, userId) {
        return await Products.findOne({ where: { id: id, userId: userId } });
    }

    static async createProduct(productData) {
        return await Products.create(productData);
    }

    static async updateProduct(id, userId, updatedData) {
        const [rowsAffected] = await Products.update(updatedData, {
            where: { id: id, userId: userId }
        });
        return rowsAffected > 0;
    }

    static async deleteProduct(id, userId) {
        const rowsDeleted = await Products.destroy({
            where: { id: id, userId: userId }
        });
        return rowsDeleted > 0;
    }

    static async findByNameAndUserId(name, userId) {
        return await Products.findOne({ where: { name: name, userId: userId } });
    }
}