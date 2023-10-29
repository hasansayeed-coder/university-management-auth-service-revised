import { User } from "./user.model";
import { IUser } from "./user.interface";
import Config from "../../../Config";
import { generateUserId } from "./user.utils";
import ApiError from "../../../errors/ApiError"




const createUser = async(user : IUser) : Promise<IUser |null> => {

    // auto generated incremental id
    
    const id = await generateUserId() ;

    user.id = id ;

    // default password
    if(!user.password) {
        user.password = Config.default_user_pass as string ;
    }

    const createdUser = (await User.create(user)) ;

    if(!createdUser){
        throw new ApiError(400 , "Failed to create User!") ;
    }

    return createdUser ;
}

export const UserService =  {
    createUser , 
}