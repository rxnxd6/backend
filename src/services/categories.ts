import Category from "../models/category";
import {Document} from "mongoose";

export const servicesGetCategories = async () => {
    return await Category.find().exec()
}
export const servicesGetCategory = async (categoryId: string) => {
    return await Category.findById(categoryId).exec()
}
export const servicesCreateCategory = async (name: string) => {
    const category= new Category({name})
  return await  category.save()
}
export const servicesDeleteCategory = async (categoryId: string) => {
  return await Category.deleteOne({_id:categoryId}).exec()
}
export const servicesUpdateCategory = async (categoryId: string,name:string) => {
  return await Category.findByIdAndUpdate(categoryId, { name:name},{new: true}).exec()
}


