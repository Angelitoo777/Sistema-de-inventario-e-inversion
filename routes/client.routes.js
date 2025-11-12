import { ClientController } from '../controllers/clients.controller.js'
import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'

export const routesOfClient = Router()

routesOfClient.post('/clientes', authMiddleware, ClientController.createClient)
