import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
   
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
    categories:{
      type: String,
    },
    variants:{
      type: String,
      
    },
    sizes:{
      type: String,
    },
    image: {
      type: String,
    
    },
  }
)

export default mongoose.model('Product', productSchema)
