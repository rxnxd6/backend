import express from 'express'
const router = express.Router()
import Product from '../models/product'
import ApiError from '../errors/ApiError'
import product from '../models/product'

router.get('/', async (_, res) => {
  const products = await Product.find()
  console.log('products:', products)
  res.json(products)
})

router.post('/', async (req, res, next) => {
  const { name, description, quantity,price,image,variants,size,categories} = req.body

  if (!name || !description||!price) {
    next(ApiError.badRequest('Name , Description and price are requried'))
    return
  }
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

  await product.save()
  res.json(product)
})

router.get('/:productId', async (req, res) => {
  const productId = req.params.productId
  console.log(productId)
  try {
  const product = await Product.findById(productId)
  res.status(200).json(product)
  // ... rest of the code
} catch (error) {
  console.error(error)
  res.status(500).json({ error: 'Internal Server Error' })
}
  // const product = await Product.findById(productId)

})

router.delete('/:productId', async (req, res) => {
  const { productId } = req.params
  console.log(productId)

  await Product.deleteOne({
    _id: productId,
  })

  res.status(204).send()
})


router.delete('/:productId', async (req, res) => {
  const { productId } = req.params
  console.log(productId)

  // await Product.deleteOne({
  //   _id: productId,
  // })

  // // res.status(204).send()
  // res.status(204).send({
  //   msg: 'Products is deleted'
  // })
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
})

router.put('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { name, description, quantity, price, image, variants, size, categories } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product properties
    product.name = name || product.name;
    product.description = description || product.description;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;
    product.image = image || product.image;
    product.variants = variants || product.variants;
    product.size = size || product.size;
    product.categories = categories || product.categories;

    // Save the updated product
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router
