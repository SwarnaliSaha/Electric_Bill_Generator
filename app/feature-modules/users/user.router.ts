import { NextFunction, Router,Request,Response } from "express";
import { excludedPaths } from "../../routes/route.data";
import { ResponseHandler } from "../../utility/Response-Handler";
import { authorize, validateRole } from "../../utility/middlewares";
import authService from "../auth/auth.service";
import userService from "./user.service";
import { CREATE_USER_VALIDATION } from "./user.validation";

const router = Router();

router.post('/AddEmployee',validateRole(["6422f695c9a90ed7650d3525"]),CREATE_USER_VALIDATION,async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const user = req.body;
        const result = await userService.register(user);
        const data=await result.save();
        res.send(new ResponseHandler(result));
    }
    catch(error){
        next(error)
    }
})

export default router;