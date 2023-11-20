import ApiError from '../errors/ApiError'
import {Request,Response,NextFunction} from 'express'
import Order from '../models/order'
import User from '../models/user'
export const postHandler= async (req:Request, res:Response, next:NextFunction) => {
  const { userId, products ,date } = req.body
  const order = new Order({
    products,
    date
  })
  const user= await User.findOne({ _id: userId } ).exec()
  // console.log(user)
  if (user!=null){
     user.order.push(order)
    await order.save()
    await user.save()
    res.status(201).json({
      msg: 'done',
      order: order,
    })
  }else{
    res.status(404).json('error')
    next(ApiError.badRequest('not found userID '))
    return
  }
}
export const getOrders= async (req:Request, res:Response) => {
  const orders = await Order.find().populate(['products','userId'])
  res.json(orders)
}