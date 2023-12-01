import Product from "../models/product";

export const servicesGetProduct = async (productId: string) => {
    return await Product.findById(productId).exec()
}
export const servicesUpdateProductQuantity = async (productId: string, newQuantity: number) => {
    await Product.findByIdAndUpdate(
        productId,
        {quantity: newQuantity},
        {new: true})
    console.log(newQuantity + " from newQuantity")
}