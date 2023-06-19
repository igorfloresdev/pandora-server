import express from 'express'
import CategoryController from '../controller/CategoryController'
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/category', authMiddleware, CategoryController.createCategory)
router.get('/categories', authMiddleware, CategoryController.getAllCategories)
router.get('/category/:id', authMiddleware, CategoryController.getCategoryById)
router.put('/category/:id', authMiddleware, CategoryController.updateCategory)
router.delete(
  '/category/:id',
  authMiddleware,
  CategoryController.deleteCategory
)

export default router
