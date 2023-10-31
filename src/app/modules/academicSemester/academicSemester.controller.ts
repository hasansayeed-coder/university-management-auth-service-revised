import {  NextFunction, Request, Response } from "express";
import { AcademicSemesterService } from "./academicSemester.service";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import httpStatus from "http-status";

const createSemester  = catchAsync(async(req : Request , res : Response , next : NextFunction) => {

    const {...academicSemesterData} = req.body ;

    const result = AcademicSemesterService.createSemester(academicSemesterData) ; 

    next();

    // res.status(200).json({
    //     success  : true , 
    //     message : 'Academic Semester created successfully' , 
    //     data : result,
    // })



    sendResponse(res , {
        statusCode : httpStatus.OK ,
        success :true , 
        message : "Academic Semester created Successfully" , data : result})
})

export const AcademicSemesterController = {
createSemester ,
}