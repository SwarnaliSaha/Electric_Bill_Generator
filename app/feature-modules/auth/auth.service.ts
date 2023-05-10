import { ICredential } from "./auth.type";
import userService from "../users/user.service";
import { compare, genSalt, hash } from "bcryptjs";
import { IUser } from "../users/user.type";
import { Roles } from "../roles/role.type";
import { AUTH_RESPONSES } from "./auth-response";
import { sign, verify } from "jsonwebtoken";

const encryptedPassword = async (user:IUser)=>{
    const salt = await genSalt(10);
    
    const hashedPassword = await hash(user.password,salt);
    user.password = hashedPassword;
    return user;
}

const register = async (user:IUser)=>{
    user = await encryptedPassword(user);
    user.role=Roles.admin;

   let record = await userService.create(user);
   return record;
}


const login = async(credential:ICredential)=>{
    console.log("first");
    const user = await userService.findOne({email:credential.email});
    console.log("second");
    console.log(user)
    if(!user) throw AUTH_RESPONSES.INVALID_USER_CREDENTIALS;

    const isPasswordValid = await compare(credential.password,user.password)
    if(!isPasswordValid) throw AUTH_RESPONSES.INVALID_USER_CREDENTIALS;

    console.log("third");
    const {JWT_TOKEN} = process.env;
    const {_id,role} = user;
    const token = sign({id:_id,role:role},JWT_TOKEN||"");
    return {token};
}

export default {login}