import ApiError from '../errors/ApiError'
import {Request,Response,NextFunction} from 'express'
import Order from '../models/order'
import User from '../models/user'

export const createOrder= async (req:Request, res:Response, next:NextFunction) => {
  const { userId, products ,date } = req.body
  const order = new Order({
    userId,
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
    res.status(404).json(' error ')
    next(ApiError.badRequest(' not found userID in db '))
    return
  }
}
export const getOrders = async (req:Request, res:Response) => {
  //.populate('products') in populate write your key not name of models
  const orders = await Order.find().populate('userId')
  res.status(200).json({
    msg:"order is returned ",
    orders:orders
  })
}
export const deleteOrder = async (req:Request, res:Response,next:NextFunction) => {
  const  { orderId } = req.params
  // isDelete['deletedCount']  if  1 => order is deleted
  const isDelete= await Order.deleteOne({_id:orderId}).exec()
  // console.log(isDelete)
  if (isDelete['deletedCount'] === 1){
    res.status(204).json({
      msg: 'order is deleted'
    })
  }else {
    res.status(404).json('error')
    next(ApiError.badRequest('not found orderId in db '))
    return
  }
}
export const getOrder= async (req:Request, res:Response) => {
  const  { orderId } = req.params

  const order= await Order.findById(orderId).populate('products').populate('userId').exec()

  if (order!=null){
    res.status(200).json({
      msg:"order is returned ",
      order:order
    })
  }else {
    res.status(404).json({
      msg:"order not found ",
    })
  }
  // res.json(order)
}
