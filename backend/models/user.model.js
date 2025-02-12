import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true// createdAt & updatedAt
})

export const User = model('User',userSchema);