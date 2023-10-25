import { User } from "./users.model";
import { IUser } from "./users.interface";
import Config from "../../../Config";
import { generateUserId } from "./users.utils";


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
        throw new Error("Failed to create User!") ;
    }

    return createdUser ;
}

export default {
    createUser , 
}