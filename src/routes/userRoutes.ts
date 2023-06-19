import express from 'express'
import UserController from '../controller/UserController'
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router()

router.get('/user', UserController.signIn)
router.get('/user/getUser', authMiddleware, UserController.getUserInfo)
router.post('/user', UserController.signUp)
router.put('/user', authMiddleware, UserController.updateUser)
router.delete('/user', authMiddleware, UserController.deleteUser)

export default router
