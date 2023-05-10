import { FilterQuery, UpdateQuery } from "mongoose";
import meterService from "../meter/meter.service";
import { Meters } from "../meter/meter.type";
import billRepo from "./bill.repo";
import { IBill } from "./bill.type";
import clientService from "../client/client.service";
import { BillResponse } from "./bill-response";

const create = (bill: IBill) => billRepo.create(bill);

const find = (filter: FilterQuery<IBill> = {}) => billRepo.find({ ...filter, isDeleted: false });

const findByIdAndUpdate = (filter: FilterQuery<IBill>, update: UpdateQuery<IBill>) => {
    return billRepo.findByIdAndUpdate(filter, update)
}

const findOne = async (filters:Partial<IBill>) => {
    const user = await billRepo.findOne(filters);
    if(!user) throw BillResponse.BILL_NOT_FOUND
    
    return user;
}


const generateBill = async (bill: IBill) => {

    const current = (bill.totalCurrent);
    const client = await clientService.find({ _id: bill.clientId });
    
    const meter = await meterService.find({ _id: client[0].meterType });
    const rate = Number(meter[0].Rs_perUnit);

    bill.total = (current * rate);

    const billData = await findOne({clientId:bill.clientId});
    billData.paymentStatus===false?bill.total +=billData.total||0 : bill.total +=0;
    await findByIdAndUpdate({_id:billData._id},{isDeleted:true});

    let record = await create(bill);
    return record
}

//TAKES THE BILL ID,FINDS OUT THAT BILL,CHANGES THE STATUS
const paymentStatus = async (id: string, status: boolean) => {
    return await findByIdAndUpdate({ _id: id }, { $set: { paymentStatus: status, total:0} })
}

const revenueOrOutstanding = async (status:boolean) => {

    const list = await find({ paymentStatus: status , isDeleted:false});
    let sum = 0;
    for (let obj of list) sum += +(obj.total || 0)
    return sum;
}


export default { create, generateBill, paymentStatus,revenueOrOutstanding }
