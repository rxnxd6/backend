import express from 'express'
const router = express.Router()
import { getOrders, createOrder, deleteOrder ,getOrder} from '../controllers/orderController'
import { validateCreateOrder, validateOrderId } from '../middlewares/vaildateOrder'
// get orders
router.get('/', getOrders)
// get order by id
router.get('/:orderId',validateOrderId, getOrder)
// create new order
router.post('/', validateCreateOrder,createOrder)
// delete order by id
router.delete('/:orderId',validateOrderId,deleteOrder)
export default router
