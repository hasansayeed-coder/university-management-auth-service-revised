import httpStatus from "http-status";
import catchAsync from "../../../share/catchAsync";
import sendResponse from "../../../share/sendResponse";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentService } from "./academicDepartment.service";
import { Request, Response } from "express";
import pick from "../../../share/pick";
import { paginationFields } from "../../../constants/pagination";
import { academicDepartmentFilterableFields } from "./academicDepartment.constants";


const createDepartment = catchAsync(async(req : Request , res : Response ) => {


    const {...academicDepartmentData} = req.body ;
    
    const result = await AcademicDepartmentService.createDepartment(academicDepartmentData) ;

    sendResponse<IAcademicDepartment>(res , {
        statusCode : httpStatus.OK , 
        success : true , 
        message : 'Academic department created successfully' ,
        data : result
    })
})

const getAllDepartments = catchAsync(async(req  , res ) => {

    const filters = pick(req.query , academicDepartmentFilterableFields) ;

    const paginationOptions = pick(req.query , paginationFields);

    const result = await AcademicDepartmentService.getAllDepartments(filters , paginationOptions) ;

    sendResponse<IAcademicDepartment[]>(res , {
        statusCode : httpStatus.OK , 
        success : true , 
        message : 'Academic department fetched successfully' , 
        meta : result.meta , 
        data : result.data
    })
});

const getSingleDepartment = catchAsync(async(req , res) => {
    const {id} = req.params ; 
    const result = await AcademicDepartmentService.getSingleDepartment(id) ; 

    sendResponse<IAcademicDepartment>(res , {
        statusCode : httpStatus.OK , 
        success : true , 
        message : 'Academic Department fetched successfully' , 
        data : result
    })
})


const updateAcademicDepartment = catchAsync(async(req , res) => {

    const {id} = req.params ; 
    
    const result = await AcademicDepartmentService.updateAcademicDepartment(id , req.body) ;

    sendResponse<IAcademicDepartment>(res , {
        statusCode : httpStatus.OK , 
        success : true , 
        message : 'Academic Department updated successfully' , 
        data : result,
    })
}) ; 

const deleteDepartment = catchAsync(async(req , res) => {
    const {id} = req.params ; 

    const result = await AcademicDepartmentService.deleteDepartment(id) ; 

    sendResponse<IAcademicDepartment>(res , {
        statusCode : httpStatus.OK ,
        success : true , 
        message : "Academic Department deleted successfully" , 
        data : result
    })
})


export const AcademicDepartmentController = {
    createDepartment , 
    getAllDepartments ,
    getSingleDepartment ,
    updateAcademicDepartment , 
    deleteDepartment
}