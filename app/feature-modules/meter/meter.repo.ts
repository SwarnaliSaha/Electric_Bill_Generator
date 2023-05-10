import { FilterQuery, UpdateQuery } from "mongoose";
import { MeterModel } from "./meter.schema";
import { IMeter } from "./meter.type";

const create = (meter:IMeter)=>MeterModel.create(meter);

const findOne = async (filters:Partial<IMeter>) => {
    try {
        return await MeterModel.findOne({
            ...filters,
            isDeleted:false
        })
    } catch (err) {
        throw { message: 'something went wrong', e: err } 
    } 
}

const findByIdAndUpdate = (filter:FilterQuery<IMeter>,update:UpdateQuery<IMeter>) =>{
    return MeterModel.findByIdAndUpdate(filter,update)
}

const find = (filter:FilterQuery<IMeter>={})=>MeterModel.find({...filter, isDeleted: false});

export default {create,findOne,findByIdAndUpdate,find};