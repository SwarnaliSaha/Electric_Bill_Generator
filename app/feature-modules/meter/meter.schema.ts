import { IMeter} from "./meter.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const MeterSchema = new BaseSchema({
    name:{
        type:String,
        required:true
    },
    Rs_perUnit:{
        type:String,
        required:true
    },
    totalClients:{
        type:String
    },
    revenue:{
        type:String
    },
    clientDetails:{
        type:[Schema.Types.ObjectId],
    }
})
type MeterDocument = Document & IMeter;
export const MeterModel = model<MeterDocument>("Meters",MeterSchema);