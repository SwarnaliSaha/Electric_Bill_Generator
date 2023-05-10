import { RoleModel } from "./role.schema";
import { IRole } from "./role.type";

const create = (role:IRole)=>RoleModel.create(role);

export default {create};