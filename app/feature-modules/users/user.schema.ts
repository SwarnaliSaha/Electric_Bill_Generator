import { IUser} from "./user.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const UserSchema = new BaseSchema({
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
    password:{
        type:String
    },
    role:{
        type:Schema.Types.ObjectId,
        ref:'Roles',
        required:true
    },
    clientDetails:{
        type:[Schema.Types.ObjectId]
    }
})
type UserDocument = Document & IUser;
export const UserModel = model<UserDocument>("Users",UserSchema);