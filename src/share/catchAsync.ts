import { RequestHandler } from "express";

const catchAsync = (fn : RequestHandler) => {

    return async(req , res , next) => {

        try{

            fn(req , res , next) ;

        }catch(error){
            next(error) ;
        }
    }
}

export default catchAsync ;