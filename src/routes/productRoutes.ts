import express from 'express'
import ProductController from '../controller/ProductController'
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/product', authMiddleware, ProductController.createProduct)
router.get('/products', authMiddleware, ProductController.getAllProducts)
router.get('/product/:id', authMiddleware, ProductController.getProductById)
router.put('/product/:id', authMiddleware, ProductController.updateProduct)
router.delete('/product/:id', authMiddleware, ProductController.deleteProduct)

export default router
