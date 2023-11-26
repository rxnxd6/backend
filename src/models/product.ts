import mongoose from 'mongoose'

export type ProductDocument = Document & {
  name:mongoose.Schema.Types.ObjectId,
  products:{product: mongoose.Schema.Types.ObjectId, quantity: number}[],
  description: string,
  quantity:number,
  price:number,
  image:string,
  variants:string,
  size:number,
  category: string

}
const productSchema = new mongoose.Schema(
  {
    //    products:[
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'products',
    //       unique: true,
    //     },
    //   {
    //     order:{
    //       type: [mongoose.Schema.Types.ObjectId],
    //       ref:'order'
    //     },
    //     user:{
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref:'user'
    //     },
    //     category:{
    //       type: [mongoose.Schema.Types.ObjectId],
    //       ref:'categories'
    //     },
    // }
    // ],

    name: {
      type: String,
      index: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type:Number,
      required: true,
    },
    variants:{
      type: String,
      
    },
    sizes:{
      type: Number,
    },
    image: {
      type: String,
    
    },
    categories: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
      required: true,
    },

  


  }


)

export default mongoose.model<ProductDocument>('Product', productSchema)
