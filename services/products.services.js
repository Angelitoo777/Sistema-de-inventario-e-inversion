import { ProductsRepository } from "../repository/products.repository.js";

export class ProductsService {
    static async getAllProducts(userId) {
        return await ProductsRepository.getAllProducts(userId);
    }

    static async getProductById(id, userId) {
        return await ProductsRepository.getProductById(id, userId);
    }

    static async createProduct(userId, productData) {
        const existingProduct = await ProductsRepository.findByNameAndUserId(productData.name, userId);

        if (existingProduct) {
            throw new Error("Ya existe un producto con ese nombre");
        }

        const fullProductData = { ...productData, userId };

        return await ProductsRepository.createProduct(fullProductData);
    }

    static async updateProduct(id, userId, updatedData) {
        return await ProductsRepository.updateProduct(id, userId, updatedData);
    }

    static async deleteProduct(id, userId) {
        return await ProductsRepository.deleteProduct(id, userId);
    }
}
