import { ObjectId } from "bson";

export interface IBill{
    _id ?:string,
    clientId :string,
    totalCurrent:number,
    total ?:number,
    paymentStatus?: boolean,
    images:string[];
}
