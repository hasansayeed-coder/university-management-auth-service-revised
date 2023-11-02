
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";



export const ValidateRequest = (schema : AnyZodObject) =>  async(req : Request , res : Response, next : NextFunction):Promise<void> =>{


    try{

        await schema.parseAsync({
            body :req.body , 
            query: req.query , 
            params: req.params , 
            cookies : req.cookies
        })

        return next() ;

    }catch(error){

            // res.status(400).json({
            // // success : false , 
            // // message : "Failed to create user"
            // error : err
            // })
    
            next(error) ;
        }

}

export default ValidateRequest;


/*

middleware --> validateRequest(userZodSchema) =>async(req , res , next)


*/


/*

: RequestHandler = async(req  ,res , next ) => {


    try{

    const {user} = req.body ;


    const result = await UserService.createUser(user) ;

    res.status(200).json({
        success: true,
        message : "User created Successfully",
        data : result
    })

 
    }catch(err){

        // res.status(400).json({
        // // success : false , 
        // // message : "Failed to create user"
        // error : err
        // })

        next(err) ;
    }
}

*/