import express from 'express'
const router = express.Router()
import {
  updateSubscriptionAddress,
  updateMySubscriptionPreferences,
  deleteBundleSubscription,
} from '../controllers/subscriptionController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/:id/address').put(protect, updateSubscriptionAddress)
router
  .route('/:id/:orderitemid/bundle')
  .put(protect, updateMySubscriptionPreferences)
router.route('/:id/:orderitemid').delete(protect, deleteBundleSubscription)

export default router
