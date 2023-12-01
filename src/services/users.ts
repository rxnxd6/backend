import User from "../models/user";
import {OrderDocument} from "../models/order";

export const  addOrderToUser=async (userId:string,order:OrderDocument)=>{
    return  await User.findByIdAndUpdate(userId, { $push: { order: order } },{new: true}).exec()
}
export const  servicesGetUser=async (userId:string)=>{
    return  await User.findById(userId).exec()
}