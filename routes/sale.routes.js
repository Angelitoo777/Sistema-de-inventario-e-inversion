import { Router } from "express";
import { SaleController } from "../controllers/sale.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const routesOfSale = Router();

routesOfSale.post('/ventas', authMiddleware, SaleController.createSale);