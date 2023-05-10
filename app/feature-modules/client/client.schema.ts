import { IClient} from "./client.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const ClientSchema = new BaseSchema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    role:{
        type:Schema.Types.ObjectId,
        ref:'Roles',
        required:true
    },
    meterType:{
        type:Schema.Types.ObjectId,
        ref:"Meters",
        required:true
    }
})
type ClientDocument = Document & IClient;
export const ClientModel = model<ClientDocument>("Clients",ClientSchema);