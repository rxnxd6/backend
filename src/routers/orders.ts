import express from 'express'
const router = express.Router()

import Order from '../models/order'
import User from '../models/user'
import ApiError from '../errors/ApiError'

router.get('/', async (req, res) => {
  const orders = await Order.find().populate(['products','users'])
  res.json(orders)
})

router.post('/', async (req, res, next) => {
  const { userId, products ,date } = req.body
  console.log(req.body)
  const order = new Order({
    products,
    date
  })
  // console.log('orderId:', order._id)

  // const userOb = new User({
  //   name: 'Walter',
  //   order: order._id,
  // })
const userOb= await User.findOne( { _id: userId } )
  // console.log(userOb)
  // look for this
  // const userOb= await User.updateOne( { _id: userId },{} ) findby id and update

  if (userOb!==undefined){
    await userOb.order.push(order)
    await order.save()
    await userOb.save()
    res.json({
      msg: 'done',
      order: order,
    })
  }else {
    res.json('error')
    next(ApiError.badRequest('not found userID '))
    return
  }

})

export default router
