import mongoose from "mongoose"

export interface IRole{
    _id:string,
    name:string
}
export const Roles = {
    admin:new mongoose.mongo.ObjectId("6422f695c9a90ed7650d3525"),
    employee:new mongoose.mongo.ObjectId("6422f6a4c9a90ed7650d3528"),
    client:new mongoose.mongo.ObjectId("6422f6aec9a90ed7650d352b")
}