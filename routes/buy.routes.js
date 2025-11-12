import { Router } from 'express'
import { BuysController } from '../controllers/buy.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

export const routesOfBuy = Router()

routesOfBuy.get('/compras', authMiddleware, BuysController.getAllBuys)
routesOfBuy.get('/compras/:id', authMiddleware, BuysController.getBuyById)

routesOfBuy.post('/compras', authMiddleware, BuysController.createBuy)
routesOfBuy.patch('/compras/:id', authMiddleware, BuysController.updateBuy)
routesOfBuy.delete('/compras/:id', authMiddleware, BuysController.deleteBuy)
