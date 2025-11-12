import { SalesService } from '../services/sales.services.js';
import { validateSale, validateUpdateSaleStatus } from '../validations/sale.validation.js';

export class SaleController {

    static async getAllSales(req, res) {
        const userId = req.user.id;

        try {
            const sales = await SalesService.getAllSales(userId);
            return res.status(200).json(sales);
        } catch (error) {
            console.error(error.message)
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    static async getSaleById(req, res) {
        const { id } = req.params;
        const userId = req.user.id;

        try {
            const sale = await SalesService.getSaleById(id, userId);
            return res.status(200).json(sale);
        } catch (error) {
            if (error.message === 'Venta no encontrada o no autorizada') {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    static async createSale(req, res) {
        const validation = validateSale(req.body);

        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.issues });
        }

        const userId = req.user.id;
        const saleData = validation.data;

        try {
            const newSale = await SalesService.createSale(userId, saleData);
            return res.status(201).json(newSale);
        } catch (error) {
            console.error(error.message)

            if (error.message === "El cliente especificado no existe") {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === "Acción no autorizada sobre el cliente") {
                return res.status(403).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    static async updateSaleStatus(req, res) {
        const { id } = req.params
        const userId = req.user.id;
        const validation = validateUpdateSaleStatus(req.body);

        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.issues });
        }

        const newStatus = validation.data.status;

        try {
            const updated = await SalesService.updateSaleStatus(id, userId, newStatus);

            if (!updated) {
                return res.status(404).json({ message: 'Venta no encontrada o acción no autorizada' });
            }

            return res.status(200).json({ message: 'Estado de la venta actualizado correctamente' });
        } catch (error) {

            if (error.message.includes("Venta no encontrada")) {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}