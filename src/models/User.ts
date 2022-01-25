import { Schema, model } from "mongoose";
import {IUser} from 'User'

const userSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        deleted: {
            type: Boolean,
            default: false,
        }
    },
    {timestamps: true}
)

const User = model<IUser>('User', userSchema);
export default User;

