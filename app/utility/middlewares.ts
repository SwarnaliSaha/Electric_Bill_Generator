import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authorize = (excludedPaths:ExcludedPaths) =>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try{
            if(excludedPaths.find(e=>e.methods===req.method && e.path==req.url)){
                return next();
            }
            const token = req.headers.authorization?.split(" ")[1];

            if(!token) return next({message:"UNAUTHORIZED",statusCode:401});
            const {JWT_TOKEN} = process.env;
            const result = verify(token,JWT_TOKEN||"");
            console.log(result)
            res.locals.tokenInfo = result;
            next();
        }
        catch(e){
            next({message:"UNAUTHORIZED",statusCode:401})
        }
    }
}
export const validateRole = (roles:string[]) =>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try{
            const {id,role} = res.locals.tokenInfo;
            console.log(id,role)
            console.log(role.toString())
            for(let ele of roles){
                if(ele===role.toString()) return next()
            }
            next({message:"UNAUTHORIZED",statusCode:401})
        }
        catch(e){
            next({message:"Only admin is allowed to approve",statusCode:401})
        }
    }
}
type methods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export class ExcludedPath{
    constructor(
        public path : string,
        public methods :methods
    ){}
}
export type ExcludedPaths = ExcludedPath[];