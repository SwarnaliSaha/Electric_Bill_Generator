import { Router,Request,Response,NextFunction } from "express";
import billService from "./bill.service";
import { ResponseHandler } from "../../utility/Response-Handler";
import { excludedPaths } from "../../routes/route.data";
import { authorize, validateRole } from "../../utility/middlewares";
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
    destination: "./upload",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,  uniqueSuffix+file.originalname)
    }
  });
  const upload = multer({storage})

//EMPLOYEE CAN GENERATE THE BILL OF A CLIENT AND CAN UPLOAD THE METER IMAGES
router.post("/generate",validateRole(["6422f6a4c9a90ed7650d3528"]),upload.array('img'),async(req,res,next)=>{
    try{
        const bill = req.body;
        const fileNames=(req.files as any[])?.map(e=>e.filename);
        bill.images=fileNames;
        const result = await billService.generateBill(bill)
        // const data=await result.save();
        res.send(new ResponseHandler(result));
    }
    catch(error){
        next(error)
    }
})

//ADMIN CAN UPDATE THE PAYMENT STATUS OF ANY CLIENT
router.post("/UpdateStatus/:id",validateRole(["6422f695c9a90ed7650d3525"]),async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await billService.paymentStatus(req.params.id,req.body.status);
        res.send(new ResponseHandler(result));
    }
    catch(e){
        next(e);
    }
})

//GET THE REVENUE OR OUTSTANDING AMOUNT
router.get("/revenue",validateRole(["6422f695c9a90ed7650d3525"]),async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await billService.revenueOrOutstanding(req.body.flag);
        res.send(new ResponseHandler(result))
    }
    catch(e){
        next(e)
    }
})

export default router