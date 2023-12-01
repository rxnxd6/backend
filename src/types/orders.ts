import {SortValues} from "mongoose"
// SortValues
export type Filter = {
    status?:string
}
export type SortOptions = {
    sort?: 'asc' | 'desc' | { purchasedAt: SortValues }
}

export type ProductInsideOrder={
    product:string,
    quantity: number,
}
export type OrderStatus={
   status: "under process" | "shopped" | "finished" | "canceled"
}