import mongoose from "mongoose"

export interface IMeter{
    _id:string,
    name:string,
    Rs_perUnit:string,
    totalClients :string,
    revenue ?:string,
    clientDetails :any[]
}
export const Meters = {
    normal:new mongoose.mongo.ObjectId("6426a451d0fd6bda0ed7b5d2"),
    commercial:new mongoose.mongo.ObjectId("6426a462d0fd6bda0ed7b5d5"),
    solar:new mongoose.mongo.ObjectId("6426a46cd0fd6bda0ed7b5d8")
}