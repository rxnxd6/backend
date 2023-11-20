import express from 'express'
const router = express.Router()
import Order from '../models/order'
import { getOrders, postHandler } from '../controllers/orderController'
// get orders
router.get('/', getOrders)
// create new order
router.post('/', postHandler)

export default router
