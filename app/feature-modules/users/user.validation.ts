import { body, param } from "express-validator";
import { validate } from "../../utility/validate";

export const CREATE_USER_VALIDATION =[
    body("name").isString().notEmpty().withMessage("Must not be empty"),
    body("email").isEmail().notEmpty().withMessage("invalid email"),
    body("contactNo").isString().notEmpty().isLength({min:10,max:10}).withMessage("Must contain 10 characters"),
    body("password").isString().notEmpty().isLength({min:3}).withMessage("Must contain atleat 3 characters"),
    body("clientDetails").isArray().isLength({min:1}),
    validate
]
