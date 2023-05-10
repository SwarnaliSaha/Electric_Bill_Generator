import { body, param } from "express-validator";
import { validate } from "../../utility/validate";

export const CREATE_CLIENT_VALIDATION =[
    body("name").isString().notEmpty().withMessage("Must not be empty"),
    body("email").isEmail().notEmpty().withMessage("invalid email"),
    body("contactNo").isString().notEmpty().isLength({min:10,max:10}).withMessage("Must contain 10 characters"),
    validate
]

export const DELETE_CLIENT_VALIDATION = [
    param("id").isString().withMessage("Invalid client id format"),
    validate
]