import {  NextFunction, Request, Response } from "express";
import { AcademicSemesterService } from "./academicSemester.service";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import httpStatus from "http-status";
import pick from "../../../share/pick";
import { paginationFields } from "../../../constants/pagination";
import { IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterFilterableFields } from "./academicSemester.Constant";

const createSemester  = catchAsync(async(req : Request , res : Response) => {

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

     
})

const getAllSemester = catchAsync(
    async(req : Request , res : Response ) => {

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
    

    }
)

const getSingleSemester = catchAsync(async(req : Request , res : Response , next : NextFunction) => {
    const id = req.params.id ;

    const result = await AcademicSemesterService.getSingleSemester(id) ;

    sendResponse<IAcademicSemester>(res , {
        statusCode : httpStatus.OK ,
        success :true , 
        message : "Single Semester retrieved Successfully" , 
        data : result      
    }) ;

    next();
})

const updateSemester = catchAsync(async(req , res ) => {

    const id = req.params.id ;
    const updatedData = req.body ;

    const result = await AcademicSemesterService.updateSemester(id , updatedData) ;

    sendResponse<IAcademicSemester>(res , {
        statusCode : httpStatus.OK ,
        success :true , 
        message : "Semester updated Successfully" , 
        data : result      
    }) ;

})

const deleteSemester = catchAsync(async(req , res ) => {

    const id = req.params.id ;

    const result = await AcademicSemesterService.deleteSemester(id) ;

    sendResponse<IAcademicSemester>(res , {
        statusCode : httpStatus.OK ,
        success :true , 
        message : "Semester deleted Successfully" , 
        data : result      
    }) ;

})

export const AcademicSemesterController = {
    createSemester ,
    getAllSemester , 
    getSingleSemester ,
    updateSemester , 
    deleteSemester
    
}