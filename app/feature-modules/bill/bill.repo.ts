import { FilterQuery, UpdateQuery } from "mongoose";
import { BillModel } from "./bill.schema";
import { IBill } from "./bill.type";

const create = (bill:IBill)=>BillModel.create(bill);

const find = (filter:FilterQuery<IBill>={})=>BillModel.find({...filter, isDeleted: false});

const findByIdAndUpdate = (filter:FilterQuery<IBill>,update:UpdateQuery<IBill>) =>{
    return BillModel.findByIdAndUpdate(filter,update)
}

const findOne = async (filters:Partial<IBill>) => {
    try {
        return await BillModel.findOne({
            ...filters,
            isDeleted:false
        })
    } catch (err) {
        throw { message: 'something went wrong', e: err } 
    } 
}

export default {create,find,findByIdAndUpdate,findOne};