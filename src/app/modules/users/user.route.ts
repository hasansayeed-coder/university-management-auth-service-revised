import express from "express" ; 
import { UserController } from "./user.controller";
import { ValidateRequest } from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router() ;

router.post('/create-user' , ValidateRequest(UserValidation.createZodSchema) ,  UserController.createUser) ;

export const UserRoutes = { 
    router 
} ;

/*

We have to place our zod validation on the route level

*/
