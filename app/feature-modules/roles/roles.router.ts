import { Router } from "express";
import roleService from "./role.service";
import { ResponseHandler } from "../../utility/Response-Handler";

const router = Router();

router.post('/RegisterRole',async(req,res,next)=>{
    try{
        const result = await roleService.create(req.body);
        const data = await result.save();
        res.send(new ResponseHandler(result))
    }
    catch(e){
        next(e)
    }
})
export default router;