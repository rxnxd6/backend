import mongoose, { Schema } from 'mongoose'

export type OrderDocument = Document & {
    userId:string,
    products:{product: string, quantity: number}[],
    date: Date,
    status:"under process" | "shopped" | "finished" | "canceled"
}

const orderSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Client'
  } ,
  products:[
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity:{
        type: Number,
        required: true,
      }
  }
  ],
  status:{
    type:String,
    enum: ["under process", "shopped", "finished", "canceled"],
    required: true,
    default:"under process"
  },
  purchasedAt:{
    type:Date,
    required:true,
    default:Date.now()
  }

})

export default mongoose.model<OrderDocument>('Order', orderSchema)
