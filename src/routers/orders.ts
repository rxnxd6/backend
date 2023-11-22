import express from 'express'
const router = express.Router()
import { getOrders, createOrder, deleteOrder ,getOrder} from '../controllers/orderController'
// get orders
router.get('/', getOrders)
// get order by id
router.get('/:orderId', getOrder)
// create new order
router.post('/', createOrder)
// delete order by id
router.delete('/:orderId',deleteOrder)
export default router
