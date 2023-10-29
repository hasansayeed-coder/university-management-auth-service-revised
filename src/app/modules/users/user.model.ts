import { Schema, model} from 'mongoose';
import { IUser, UserModel } from './user.interface';





const userSchema = new Schema<IUser>({
    id: { 
        type: String, 
        unique : true ,
        required: true
    },
    role: { 
        type: String, 
        required: true 
    },
    password: {
        type: String ,
        required : true
    }
} , {
    timestamps : true
});


// const User = model<IUser>('User', userSchema);

export const User = model<IUser, UserModel>('User', userSchema);



// we will made our custom made id
