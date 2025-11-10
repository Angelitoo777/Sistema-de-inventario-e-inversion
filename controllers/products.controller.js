import { ProductsService } from "../services/products.services.js";
import { validateProduct } from "../validations/products.validation.js";

export class ProductsController {
    static async getAllProducts(req, res) {
        const userId = req.user.id;
        try {
            const products = await ProductsService.getAllProducts(userId);
            res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    static async getProductById(req, res) {
        const { id } = req.params;
        const userId = req.user.id;
        try {
            const product = await ProductsService.getProductById(id, userId);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: "Producto no encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    static async createProduct(req, res) {
        const validation = validateProduct(req.body);

        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.issues })
        }

        const userId = req.user.id;
        const productData = validation.data;

        try {
            const newProduct = await ProductsService.createProduct(userId, productData);
            res.status(201).json(newProduct);
        } catch (error) {

            if (error.message.includes("Ya existe un producto")) {
                return res.status(409).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    static async updateProduct(req, res) {
        const { id } = req.params;
        const userId = req.user.id;
        const validation = validateProduct(req.body);

        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.issues })
        }

        const updatedData = validation.data;

        try {
            const updated = await ProductsService.updateProduct(id, userId, updatedData);

            if (!updated) {
                return res.status(404).json({ message: "Producto no encontrado o no autorizado" });
            }


            return res.status(200).json({ message: "Producto actualizado exitosamente" });
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    static async deleteProduct(req, res) {
        const { id } = req.params;
        const userId = req.user.id;

        try {
            const deleted = await ProductsService.deleteProduct(id, userId);

            if (!deleted) {
                return res.status(404).json({ message: "Producto no encontrado o no autorizado" });
            }

            return res.status(200).json({ message: "Producto eliminado exitosamente" });
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }
}