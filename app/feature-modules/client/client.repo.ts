import { FilterQuery, UpdateQuery } from "mongoose";
import { ClientModel } from "./client.schema";
import { IClient } from "./client.type";

const create = (client:IClient)=>ClientModel.create(client);

const find = (filter:FilterQuery<IClient>={})=>ClientModel.find({...filter, isDeleted: false});

const findByIdAndUpdate = (filter:FilterQuery<IClient>,update:UpdateQuery<IClient>) =>{
    return ClientModel.findByIdAndUpdate(filter,update)
}

const findOne = async (filters:Partial<IClient>) => {
    try {
        return await ClientModel.findOne({
            ...filters,
            isDeleted:false
        })
    } catch (err) {
        throw { message: 'something went wrong', e: err } 
    } 
}

export default {create,find,findOne,findByIdAndUpdate}
