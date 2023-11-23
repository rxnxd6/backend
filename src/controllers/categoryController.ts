import { NextFunction, Request, Response } from 'express'
import Category from '../models/category'
import ApiError from '../errors/ApiError'

export const getCategories= async (req:Request, res:Response)=>{
  const categories= await Category.find().exec()
  res.status(200).json({
    msg:"categories is returned",
    categories:categories
  })
}
export const getCategory= async (req:Request, res:Response ,next:NextFunction)=>{
  const {categoryId}=req.params
  // console.log(categoryId)
  const category= await Category.findById(categoryId).exec()
  if (category!=null) {
    res.status(200).json({
      msg: "category is returned",
      category: category
    })
  }else {
    res.status(404).json({
      msg: " not found categoryId in db"
    })
  }
}
export const createCategory= async  (req:Request, res:Response)=>{
  // you should work on validation in future  remember  name is unique
  const {name}=req.body
  const category=new Category({
    name
  })
  res.status(201).json({
    msg: "created category",
    category: category
  })
}
export const deleteCategory= async (req:Request, res:Response,next:NextFunction) => {
  const  { categoryId } = req.params
  // isDelete['deletedCount']  if  1 => order is deleted
  const isDelete=await Category.deleteOne({_id:categoryId}).exec()
  // console.log(isDelete)
  if (isDelete['deletedCount'] === 1){
    res.status(204).json({
      msg: 'category is deleted'
    })
  }else {
    res.status(404).json('error')
    next(ApiError.badRequest('not found categoryId in db '))
    return
  }
}
export const updateCategory= async (req:Request, res:Response,next:NextFunction) => {
  const {categoryId}=req.params
  const {name}=req.body

  // console.log(categoryId)
  const category= await Category.findById(categoryId).exec()
  if (category!=null) {
    category.name=name
    await category.save()
    res.status(200).json({
      msg: "category is returned",
      category: category
    })
  }else {
    res.status(404).json({
      msg: " not found categoryId in db"
    })
  }
}
