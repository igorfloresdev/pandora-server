import express from 'express'
import RecoveryController from '../controller/RecoveryController'

const router = express.Router()

router.post('/recovery', RecoveryController.sendRecoveryCode)
router.post('/resetPassword', RecoveryController.resetPassword)
router.post('/checkRecoveryCode', RecoveryController.checkRecoveryCode)

export default router
