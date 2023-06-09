import { ResponseHandler } from "../utility/Response-Handler";
import { authorize } from "../utility/middlewares";
import { excludedPaths, routes } from "./route.data";
import { Application, NextFunction, json, Request,Response } from "express";

export const registerRoutes = (app:Application)=>{
    app.use(json());
    app.use(authorize(excludedPaths));
    
    for(let route of routes){
        app.use(route.path,route.router)
    }
    app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
        res.status(err.statusCode||500).send(new ResponseHandler(null,err))
    })
}