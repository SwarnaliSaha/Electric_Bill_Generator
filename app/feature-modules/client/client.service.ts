import { FilterQuery, UpdateQuery } from "mongoose";
import { ClientResponse } from "./client-response";
import clientRepo from "./client.repo";
import { IClient } from "./client.type";
import { Roles } from "../roles/role.type";
import { Meters } from "../meter/meter.type";
import meterService from "../meter/meter.service";

const create = (client:IClient)=>clientRepo.create(client);

const findOne = async (filters:Partial<IClient>) => {
    const user = await clientRepo.findOne(filters);
    if(!user) throw ClientResponse.CLIENT_NOT_FOUND
    
    return user;
}

const findByIdAndUpdate = (filter:FilterQuery<IClient>,update:UpdateQuery<IClient>) =>{
    return clientRepo.findByIdAndUpdate(filter,update)
}

const find = (filter:FilterQuery<IClient> = {})=>clientRepo.find(filter);

const register = async (client:IClient)=>{
    client.role=Roles.client;

    let record = await create(client);
    return record;
}

const findAllClient = async () =>{
    return await find();
}

const deleteSubscription = async(id:string)=>{
    return await findByIdAndUpdate({_id:id},{$set: {isDeleted:false}});
}


export default {register,findAllClient,find,deleteSubscription,findOne};