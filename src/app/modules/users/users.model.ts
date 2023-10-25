import { Model, Schema, model} from 'mongoose';
import { IUser } from './users.interface';


type UserModel = Model<IUser, object>;


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
