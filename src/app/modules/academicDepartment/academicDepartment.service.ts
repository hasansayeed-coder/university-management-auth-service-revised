import { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IAcademicFacultyFilters } from "../academicFaculty/academicFaculty.interface";
import { academicDepartmentFilterableFields } from "./academicDepartment.constants";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";


const createDepartment = async (
    payload: IAcademicDepartment
  ): Promise<IAcademicDepartment | null> => {
    const result = (await AcademicDepartment.create(payload)).populate(
      'academicFaculty'
    );
    return result;
  };

const getAllDepartments = async(filters : IAcademicFacultyFilters , paginationOptions : IPaginationOptions) : Promise<IGenericResponse<IAcademicDepartment[]>> => {

  const {limit , page , skip , sortBy , sortOrder} = PaginationHelper.calculatePagination(paginationOptions) ;

  const {searchTerm , ...filtersData} = filters ;

  const andConditions = [] ; 

  if(searchTerm){
    andConditions.push({
      $or : academicDepartmentFilterableFields.map(field => ({
        [field] : {
          $regex : searchTerm ,
          $paginationOptions : 'i'
        }
      }))
    })
  }

  if(Object.keys(filtersData).length){
    andConditions.push({
      $and : Object.entries(filtersData).map(([field , value]) => ({
        [field] : value
      }))
    })
  }

  const sortConditions : {[key : string] : SortOrder} = {} ;

  if(sortBy && sortOrder){
    sortConditions[sortBy] = sortOrder ;
  }

  const whereconditions = andConditions.length > 0 ? {$and : andConditions} : {} ; 

  const result = await AcademicDepartment.find(whereconditions).sort(sortConditions).skip(skip).limit(limit) ;

  const total = await AcademicDepartment.countDocuments() ;

  return{
    meta : {
      page , 
      limit , 
      total
    } , 
    data : result,
  }
}

const getSingleDepartment = async (id : string): Promise<IAcademicDepartment | null>=> {

  const result = await AcademicDepartment.findById(id).populate('academicFaculty') ;

  return result ;

}

const updateAcademicDepartment = async(id : string , payload : Partial<IAcademicDepartment>) : Promise<IAcademicDepartment | null> => {

  const result = AcademicDepartment.findOneAndUpdate({_id : id} , payload , {new : true}).populate('academicFaculty')

  return result ;

}

const deleteDepartment = async(id : string) : Promise<IAcademicDepartment | null> => {

  const result = await AcademicDepartment.findByIdAndDelete(id) ; 

  return result ;

}
  

export const AcademicDepartmentService = {
    createDepartment,
    getAllDepartments ,
    getSingleDepartment ,
    updateAcademicDepartment , 
    deleteDepartment
}