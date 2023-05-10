import { ObjectId } from "bson";

export interface IClient{
    _id ?:string,
    name:string,
    email:string,
    contactNo:string,
    role ?:ObjectId,
    meterType : ObjectId,
}
