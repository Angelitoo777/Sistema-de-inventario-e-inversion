import { Router } from 'express'
import { ProductsController } from '../controllers/products.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

export const routesOfProducts = Router()

routesOfProducts.get('/productos', authMiddleware, ProductsController.getAllProducts)
routesOfProducts.get('/productos/:id', authMiddleware, ProductsController.getProductById)
routesOfProducts.post('/productos', authMiddleware, ProductsController.createProduct)
routesOfProducts.put('/productos/:id', authMiddleware, ProductsController.updateProduct)
routesOfProducts.delete('/productos/:id', authMiddleware, ProductsController.deleteProduct)
