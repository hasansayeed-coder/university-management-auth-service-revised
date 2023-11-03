import {  NextFunction, Request, Response } from "express";
import { AcademicSemesterService } from "./academicSemester.service";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import httpStatus from "http-status";
import pick from "../../../share/pick";
import { paginationFields } from "../../../constants/pagination";
import { IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterFilterableFields } from "./academicSemester.Constant";

const createSemester  = catchAsync(async(req : Request , res : Response , next : NextFunction) => {

    const {...academicSemesterData} = req.body ;

    const result = AcademicSemesterService.createSemester(academicSemesterData) ; 

    

    // res.status(200).json({
    //     success  : true , 
    //     message : 'Academic Semester created successfully' , 
    //     data : result,
    // })
    sendResponse(res , {
        statusCode : httpStatus.OK ,
        success :true , 
        message : "Academic Semester created Successfully" , data : result})

        next();
})

const getAllSemester = catchAsync(
    async(req : Request , res : Response , next : NextFunction) => {

        const filters = pick(req.query , academicSemesterFilterableFields) ;


        

        const paginationOptions = pick(req.query , paginationFields) ;

        // console.log(paginationOptions)

        // console.log(filters)

        const result = await AcademicSemesterService.getAllSemester(filters , paginationOptions) ;

        sendResponse<IAcademicSemester[]>(res , {
            statusCode : httpStatus.OK ,
            success :true , 
            message : "Semester retrieved Successfully" ,
            meta : result.meta , 
            data : result.data
        })
    
        next();

    }
)

export const AcademicSemesterController = {
    createSemester ,
    getAllSemester
}