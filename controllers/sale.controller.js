import { SalesService } from '../services/sales.services.js';
import { validateSale } from '../validations/sale.validation.js';

export class SaleController {
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
}