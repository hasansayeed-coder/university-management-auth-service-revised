
import { Request, Response } from "express";
import { AcademicFacultyService } from "./academicFaculty.service"

import httpStatus from "http-status";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import { IAcademicFaculty } from "./academicFaculty.interface";
import pick from "../../../share/pick";
import { academicSemesterFilterableFields } from "../academicSemester/academicSemester.Constant";
import { paginationFields } from "../../../constants/pagination";



const createFaculty = catchAsync(async(req : Request , res : Response ) => {

    const {...academicFacultyData} = req.body ; 


    const result = await AcademicFacultyService.createFaculty(academicFacultyData) ; 

    sendResponse<IAcademicFaculty>(res , {
        
        statusCode : httpStatus.OK , 
        success : true ,
        message : "Academic Faculty Created Successfully" , 
        data : result
        
    })

    
}) ;

const getSingleFaculty = catchAsync(async(req : Request, res : Response ) => {

    const {id} = req.params ;
    const result = await AcademicFacultyService.getSingleFaculty(id); 

    sendResponse<IAcademicFaculty>(res , {
        statusCode : httpStatus.OK , 
        success : true , 
        message : 'Academic Faculty fetched successfully' , 
        data : result 

    })

})

const getAllFaculties = catchAsync(async(req ,res ) => {

    const filters = pick(req.query , academicSemesterFilterableFields) ; 

    const paginationOptions = pick(req.query , paginationFields) ;

    const result = await AcademicFacultyService.getAllFaculties(filters , paginationOptions) ;

    sendResponse<IAcademicFaculty[]>(res , {
        statusCode : httpStatus.OK , 
        success : true ,
        message : 'Academic faculties retrieved successfully' ,
        meta : result.meta , 
        data : result.data ,
    })
})

const deleteFaculty = catchAsync(async(req : Request , res : Response ) => {

    const {id} = req.params ;

    const result = await AcademicFacultyService.deleteIDFromDB(id) ;

    sendResponse<IAcademicFaculty | null>(res , {
        statusCode : httpStatus.OK , 
        success : true , 
        message : 'Academic Faculty deleted successfully' , 
        data : result
        
    })

})

const updateFaculty = catchAsync(async(req : Request, res : Response) => {
    const {id} = req.params ; 
    const updatedData = req.body ; 
    const result = await AcademicFacultyService.updateFaculty(id , updatedData) ;

    sendResponse<IAcademicFaculty>(res , {
        statusCode : httpStatus.OK , 
        success : true , 
        message : 'Academic Faculty Updated Successfully' , 
        data : result 
    })
})

export const AcademicFacultyController = {
    createFaculty,
    getSingleFaculty , 
    getAllFaculties ,
    deleteFaculty , 
    updateFaculty
}