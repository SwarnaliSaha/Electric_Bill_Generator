import { FilterQuery, UpdateQuery } from "mongoose";
import { UserModel } from "./user.schema";
import { IUser } from "./user.type";

const create = (user:IUser)=>UserModel.create(user);

const findOne = async (filters:Partial<IUser>) => {
    try {
        return await UserModel.findOne({
            ...filters,
            isDeleted:false
        })
    } catch (err) {
        throw { message: 'something went wrong', e: err } 
    } 
}

const findByIdAndUpdate = (filter:FilterQuery<IUser>,update:UpdateQuery<IUser>) =>{
    return UserModel.findByIdAndUpdate(filter,update)
}

const find = ()=>UserModel.find();

export default {create,findOne,findByIdAndUpdate,find}