/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler,  } from "express"
import { IGenericErrorMessage } from "../../interfaces/error";
import Config from "../../Config";
import handleValidationError from "../../errors/handleValidationError";
import ApiError from "../../errors/ApiError";
import { errorlogger } from "../../share/logger";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";

// ErrorTransportPattern
const globalErrorHandler : ErrorRequestHandler = (error , req , res  , next  ) =>{

    // console.log(err) ;
  
    // if(err instanceof Error){
    //   res.status(400).json({
    //     error: err
    //   })
    // }
  
    // else{
    //   res.status(500).json({
    //     error:'Something went wrong'
    //   })
    // }

    // res.status(400).json({
    //   wrong : err
    // })

    Config.env === "development" ? console.log('Rocket Global Error ', error) : errorlogger.error('bkash error logger ' , error) ;


    let statusCode : number  = 500 ; 
    let message = 'Something Went Wrong' ; 
    let errorMessages : IGenericErrorMessage[] = [] ;


    if(error.name === 'ValidationError'){
      const simplifiedError = handleValidationError(error) ;
      statusCode = simplifiedError.statusCode ;
      message = simplifiedError.message ;
      errorMessages = simplifiedError.errorMessages ;
    }

    else if(error instanceof ZodError){
      const simplifiedError = handleZodError(error) ;
      statusCode = simplifiedError.statusCode ;
      message = simplifiedError.message ;
      errorMessages = simplifiedError.errorMessages ;
    }

    else if(error instanceof ApiError){
      statusCode = error?.statusCode ; 
      message = error?.message  ;
      errorMessages = error?.message?[
        {
          path : '' , 
          message : error?.message
        }
      ] : []
    }

    else if(error instanceof Error){

      message = error?.message ; 
      errorMessages = error?.message?
      [
        {
          path: '' , 
          message : error ?.message
        }
      ] : []
    }

    res.status(statusCode).json({
      success : false , 
      message , 
      errorMessages , 
      stack: Config.env !== 'production' ? error?.stack : undefined 

    })


    

    

    next() ; 
}

export default globalErrorHandler ;