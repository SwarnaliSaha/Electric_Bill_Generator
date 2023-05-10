import roleRepo from "./role.repo";
import { IRole } from "./role.type";

const create = (role:IRole)=>roleRepo.create(role);

export default {create}