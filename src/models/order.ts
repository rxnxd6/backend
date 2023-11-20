import mongoose, { Document } from 'mongoose'
// types
// user: User
// products: { product: Product; quantity: number }[]
// date: string
export type OrderDocument = Document & {
    userId:mongoose.Schema.Types.ObjectId,
    products:{product: mongoose.Schema.Types.ObjectId, quantity: number}[],
    quantity: string,
    date: string
}

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products:[
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity:{
        type: String,
        required: true,
      }
  }
  ],
  date: String

})

export default mongoose.model<OrderDocument>('Order', orderSchema)
