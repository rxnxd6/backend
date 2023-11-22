import express from 'express'

import ApiError from '../errors/ApiError'
import User from '../models/user'
import { DeleteOneUser, addOneUser, getAllUsers, getOneUser, updateUser } from '../controllers/userController'
const router = express.Router()

//List all Users : work 
router.get('/', getAllUsers)

//List one user : work 
router.get('/:userId', getOneUser)


//Delete User : work
router.delete('/:userId', DeleteOneUser)


//Update user : Work
router.put('/:userId', updateUser)

//Add User : work
router.post('/', addOneUser)



// router.get('/:userId/page/:page', (req, res) => {
//   res.json({
//     msg: 'done',
//     user: req.user,
//   })
// })

// router.get('/', async (_, res) => {
//   const users = await User.find().populate('order')
//   res.json({
//     users,
//   })
// })

export default router


