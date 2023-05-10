import { ObjectId } from "bson";

export interface IUser{
    _id ?:string,
    name:string,
    email:string,
    contactNo:string,
    password :string,
    role ?:ObjectId,
    clientDetails ?: any[];
}

interface IClient{
    name:string,
    email:string
}