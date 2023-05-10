import { IBill} from "./bill.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const BillSchema = new BaseSchema({
    clientId:{
        type:Schema.Types.ObjectId,
        ref:"Clients"
    },
    totalCurrent:{
        type:Number,
        required:true
    },
    meterType:{
        type:Schema.Types.ObjectId,
        ref:"Meters"
    },
    total:{
        type:Number
    },
    due:{
        type:Number
    },
    paymentStatus:{
        type:Boolean,
        default:false
    },
    images:{
        type:[String],
        required:true
    }
})
type BillDocument = Document & IBill;
export const BillModel = model<BillDocument>("Bill",BillSchema);