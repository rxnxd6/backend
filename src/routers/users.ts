import express from 'express'

import ApiError from '../errors/ApiError'
import User from '../models/user'
import {
  DeleteOneUser,
  activation,
  addOneUser,
  getAllUsers,
  getOneUser,
  login,
  register,
  updateUser,
} from '../controllers/userController'
import { validateLoginUser, validateUpdateUser, validateUser } from '../middlewares/userValdiation'
import { checkAuth } from '../middlewares/checkAuth'
const router = express.Router()

//List all Users : work
router.get('/', getAllUsers)
// router.get('/',checkAuth("admin"), getAllUsers)

//List one user : work
router.get('/:userId', getOneUser)

//Delete User : work
router.delete('/:userId', DeleteOneUser)

router.put(
  '/role',
  /*checkAuth(‘ADMIN’),*/ async (req, res, next) => {
    const userId = req.body.userId
    const role = req.body.role
    const user = await User.findOneAndUpdate({ _id: userId }, { role }, { new: true }).select([
      '-password',
      '-activationToken',
    ])
    res.json({
      user,
    })
  }
)
//Update user : Work
router.put('/:userId', updateUser)

//Add User : work
router.post('/', addOneUser)

router.post('/register', validateUser, register)
router.post('/login', validateLoginUser, login)

router.get('/activateUser/:activationToken', activation)

// router.get('/:userId/page/:page', (req, res) => {
//   res.json({
//     msg: 'done',
//     user: req.users,
//   })
// })

router.get('/', async (_, res) => {
  const users = await User.find().populate('order')
  res.json({
    users,
  })
})

export default router
