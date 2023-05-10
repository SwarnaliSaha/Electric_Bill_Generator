import { Route,Routes } from "./route.type"
import Routers from "../feature-modules/index"
import { ExcludedPath, ExcludedPaths } from "../utility/middlewares";

export const routes : Routes =[
    new Route("/users",Routers.UserRouter),
    new Route("/auth",Routers.AuthRouter),
    new Route("/role",Routers.RoleRouter),
    new Route("/meter",Routers.MeterRouter),
    new Route("/client",Routers.ClientRouter),
    new Route("/bill",Routers.BillRouter)
];

export const excludedPaths: ExcludedPaths = [
    new ExcludedPath("/auth/Login", "POST")
];
