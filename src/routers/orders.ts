import express from 'express'
import {getOrders, createOrder, deleteOrder, getOrder, updateOrder} from '../controllers/orderController'
import {validateCreateOrder, validateOrderId, validateOrderStatus} from '../middlewares/vaildateOrder'
//TODO:: add validate role before show order ==> admin to show all order , visitor to show his order
const router = express.Router()

// get orders
router.get('/', getOrders)
// get order by id
router.get('/:orderId',validateOrderId, getOrder)
// create new order
router.post('/', validateCreateOrder,createOrder)
// delete order by id
router.delete('/:orderId',validateOrderId,deleteOrder)
// update order status
router.put('/:orderId',validateOrderId,validateOrderStatus, updateOrder)

export default router
