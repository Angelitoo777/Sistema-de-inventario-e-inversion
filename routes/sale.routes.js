import { Router } from "express";
import { SaleController } from "../controllers/sale.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const routesOfSale = Router();

routesOfSale.get('/ventas', authMiddleware, SaleController.getAllSales);
routesOfSale.get('/ventas/:id', authMiddleware, SaleController.getSaleById);

routesOfSale.post('/ventas', authMiddleware, SaleController.createSale);
routesOfSale.patch('/ventas/:id', authMiddleware, SaleController.updateSaleStatus);