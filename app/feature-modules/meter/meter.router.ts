import { ResponseHandler } from "../../utility/Response-Handler";
import meterService from "./meter.service";
import { Router } from "express";

const router = Router();

router.post("/RegisterMeter",async(req,res,next)=>{
    try{
        const result = await meterService.register(req.body);
        const data = await result.save();
        res.send(new ResponseHandler(result))
    }
    catch(e){
        next(e)
    }
})

router.get("/GetDetails/:id",async(req,res,next)=>{
    try{
        const result = await meterService.findMeterDetails(req.params.id)
        res.send(new ResponseHandler(result))
    }
    catch(e){
        next(e)
    }
})

export default router;