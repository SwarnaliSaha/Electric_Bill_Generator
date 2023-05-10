import { startServer } from "./app/app";
import { config } from "dotenv";
import authService from "./app/feature-modules/auth/auth.service";
import { Roles } from "./app/feature-modules/roles/role.type";

config();

const populateDb = async ()=>{
    const admin = {
        //_id :"",
        name:"Admin",
        email:"admin@gmail.com",
        contactNo:"123456789",
        password:"admin",
        role:Roles.admin,
        //restaurant_name:" "
    }
    
    await authService.register(admin)
}

populateDb();
startServer();