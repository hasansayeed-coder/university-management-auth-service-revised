import { UserService } from "./user.service";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import httpStatus from "http-status";



 const createUser = catchAsync(async(req ,res , next) => {

    const {user} = req.body ;


    const result = await UserService.createUser(user) ;

    next() ;

    // res.status(200).json({
    //     success: true,
    //     message : "User created Successfully",
    //     data : result
    // })  

    sendResponse(res , {
        statusCode : httpStatus.OK ,
        success :true , 
        message : "User created Successfully" , data : result})
})

export const  UserController = {
    createUser
} ;