import express from 'express'

import ApiError from '../errors/ApiError'
import User from '../models/user'
const router = express.Router()

//List all Users : work 
router.get('/', async (req, res) => {
  const users = await User.find()

  res.status(200).json(users)
})

//List one user : work 
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId
  const user = await User.findById(userId)

  res.status(200).json(user)
})


//Delete User : work
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params

  const deleteUser =await User.deleteOne({
    _id: userId,
  })
  if(deleteUser['deletedCount'] === 1){
    res.json({
      msg: 'User delete it Successfully done',
    })
  }else{
    res.json({
      msg: 'User not found',
    })
  }

 





})

//Update user : Work
router.put('/:userId', async (req, res) => {
  const new_first_name = req.body.new_first_name
  const new_last_name = req.body.new_last_name
  const new_email = req.body.new_email
  const new_password = req.body.new_password 
  const new_avatar = req.body.new_avatar
  const userId = req.params.userId

  const newUser= await User.findByIdAndUpdate(
    userId,
    { first_name: new_first_name, last_name: new_last_name ,
       email: new_email, password: new_password , avatar: new_avatar},
    {
      new: true,
    }
  )

  res.json({
    User: newUser,
  })
})

//Add User : work
router.post('/', async (req, res, next) => {

  const { first_name, last_name, email, password, role } = req.body;

  if ( !first_name || !last_name || !email || !password || !role) {
    next(ApiError.badRequest('All user details are required'));
    return;
  }

  const newUser = new User({first_name, last_name, email, password,role});
  await newUser.save();
    
    

  res.json({
    msg: 'done',
    users: newUser,
  })
})



router.get('/:userId/page/:page', (req, res) => {
  res.json({
    msg: 'done',
    user: req.user,
  })
})

router.get('/', async (_, res) => {
  const users = await User.find().populate('order')
  res.json({
    users,
  })
})

export default router


