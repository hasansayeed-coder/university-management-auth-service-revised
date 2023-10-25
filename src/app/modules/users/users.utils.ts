import { User } from "./users.model";


export const findLastUserId = async () => {

    const lastUser = await User.findOne({} , {id : 1 , _id : 0}).sort({createdAt : -1}).lean() ;

    return lastUser?.id ;
}

export const generateUserId = async() => {

    const currentId = (await findLastUserId()) || (0).toString().padStart(5 , '0');  // 00000

    // now i am going to increment the currentId for the next user

    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5 , '0') ;

    return incrementedId ;
}