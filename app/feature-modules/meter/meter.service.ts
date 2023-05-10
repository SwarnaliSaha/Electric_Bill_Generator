import { FilterQuery, UpdateQuery } from "mongoose";
import { MeterResponse } from "./meter-response";
import meterRepo from "./meter.repo";
import { IMeter } from "./meter.type";
import userService from "../users/user.service";
import clientService from "../client/client.service";

const create = (meter:IMeter)=>meterRepo.create(meter);

const findOne = async (filters:Partial<IMeter>) => {
    const user = await meterRepo.findOne(filters);
    if(!user) throw MeterResponse.METER_NOT_FOUND
    
    return user;
}

const findByIdAndUpdate = (filter:FilterQuery<IMeter>,update:UpdateQuery<IMeter>) =>{
    return meterRepo.findByIdAndUpdate(filter,update)
}

const find = (filter:FilterQuery<IMeter> = {})=>meterRepo.find({...filter, isDeleted: false});

const register = async (meter:IMeter)=>{

    let record = await create(meter);
    return record;
}

const findMeterDetails = async(id:string)=>{
    return await clientService.find({meterType:id});
}


export default {register,findOne,findByIdAndUpdate,findMeterDetails,find}