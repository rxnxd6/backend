import express, {Request,Response} from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import usersRouter from './routers/users'
import productsRouter from './routers/products'
import categoriesRouter from './routers/category'
import ordersRouter from './routers/orders'
import apiErrorHandler from './middlewares/errorHandler'
import myLogger from './middlewares/logger'

config()
const app = express()
const PORT = 5050
const URL = process.env.ATLAS_URL as string

app.use(morgan('dev'))
if (process.env.NODE_ENV === 'development') {
  app.use(myLogger)
}
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (req, res) => {
  res.json({
    msg: 'welcome!!!!',
  })
})

app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)
app.use('/api/categories', categoriesRouter)

app.use(apiErrorHandler)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'route not found',
  })
})

mongoose
  .connect(URL)
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.log('MongoDB connection error, ', err)
  })

app.listen(PORT, () => {
  console.log('Server running http://localhost:' + PORT)
})
export default app
