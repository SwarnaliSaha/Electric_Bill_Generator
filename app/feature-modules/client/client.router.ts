import { excludedPaths } from "../../routes/route.data";
import { ResponseHandler } from "../../utility/Response-Handler";
import { authorize, validateRole } from "../../utility/middlewares";
import clientService from "./client.service";
import { Router,Request,Response,NextFunction } from "express";
import { CREATE_CLIENT_VALIDATION, DELETE_CLIENT_VALIDATION } from "./client.validation";

const router = Router();

//ADMIN CAN REGISTER A NEW CLIENT
router.post("/AddClient",validateRole(["6422f695c9a90ed7650d3525"]),CREATE_CLIENT_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const client = req.body;
        const result = await clientService.register(client);
        const data=await result.save();
        res.send(new ResponseHandler(result));
    }
    catch(error){
        next(error)
    }
})

//ADMIN CAN FIND THE LIST OF ALL CLIENTS
router.get("/FindAllClient",validateRole(["6422f695c9a90ed7650d3525"]),async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await clientService.findAllClient();
        res.send(new ResponseHandler(result));
    }
    catch(e){
        next(e);
    }
})

//ADMIN CAN DELETE THE SUBSCRIPTION OF ANY CLINET
router.delete("/DeleteClient",validateRole(["6422f695c9a90ed7650d3525"]),DELETE_CLIENT_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await clientService.deleteSubscription(req.params.id);
        res.send(new ResponseHandler(result))
    }
    catch(e){
        next(e)
    }
})


export default router;