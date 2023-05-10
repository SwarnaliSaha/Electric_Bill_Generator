import userRepo from "./user.repo";
import { IUser } from "./user.type";
import { UserResponse } from "./user-response";
import { FilterQuery, UpdateQuery } from "mongoose";
import { Roles } from "../roles/role.type";
import { genSalt, hash } from "bcryptjs";

const create = (user:IUser) => userRepo.create(user);

const findOne = async (filters:Partial<IUser>) => {
    const user = await userRepo.findOne(filters);
    if(!user) throw UserResponse.USER_NOT_FOUND
    
    return user;
}

const findByIdAndUpdate = (filter:FilterQuery<IUser>,update:UpdateQuery<IUser>) =>{
    return userRepo.findByIdAndUpdate(filter,update)
}

const find = ()=>userRepo.find();

const encryptedPassword = async (user:IUser)=>{
    const salt = await genSalt(10);
    
    const hashedPassword = await hash(user.password,salt);
    user.password = hashedPassword;
    return user;
}

const register = async (user:IUser)=>{
     user = await encryptedPassword(user);

     user.role=Roles.employee;

    let record = await create(user);
    return record;
}

export default {create,findOne,findByIdAndUpdate,find,register}