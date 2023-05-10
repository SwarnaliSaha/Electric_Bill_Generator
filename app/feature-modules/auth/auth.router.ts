import { Router,Request,Response,NextFunction } from "express";
import authService from "./auth.service";
import { ResponseHandler } from "../../utility/Response-Handler";
import { authorize, validateRole } from "../../utility/middlewares";
import { excludedPaths } from "../../routes/route.data";

const router = Router();

router.post('/Login',async(req,res,next)=>{
    try{
        const cred = req.body;
        const result = await authService.login(cred);
        res.send(new ResponseHandler(result));
    }
    catch(e){
        next(e)
    }
})
export default router;