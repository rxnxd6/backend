
import Product from '../models/product'
import ApiError from '../errors/ApiError'
import { Request, Response, NextFunction } from 'express'
import product from '../models/product'
//Get ALL Products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const products = await Product.find().populate('categories')
  res.status(200).json(
    {
      msg: "products is returned ",
      products: products
    })
}

//Get product by id
export const getProductbyId = async (req: Request, res: Response) => {
  const { productId } = req.params
  const productbyId = await Product.findById({
    _id: productId,
  })
  res.status(200).json({
    msg: "Product by Id",
    productbyId: productbyId
  })
  try {
    const product = await Product.findById(productbyId)

    res.status(200).json(product)
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

//create  a product 
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, quantity, price, image, variants, size, categories } = req.body
  const product = new Product({
    name,
    description,
    quantity,
    price,
    image,
    variants,
    size,
    categories
  })
    // console.log(categories)
  if (!name || !description || !price) {
    next(ApiError.badRequest('Name , Description and price are requried'))
    return
  }


  await product.save()
  res.status(200).json({
    msg: 'product is created',
    product: product,
    category:categories
  })
}
//Update new product 
export const updateProduct = async (req: Request, res: Response,) => {
  const { productId } = req.params;
  const { name, description, quantity, price, image, variants, size, categories } = req.body;
 
  const product= await Product.findByIdAndUpdate(
    productId,
    { 
      name:name, description:description, quantity:quantity, price:price, image:image, variants:variants, size:size, categories:categories 
    },
    {
      new: true,
    }
  )


  res.json({
    product:product
  })
}



//Delete a product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params

  await Product.deleteOne({
    _id: productId,
  })

  try {
    const result = await Product.deleteOne({
      _id: productId,
    });
    if (result.deletedCount > 0) {
      res.status(204).send({ msg: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}