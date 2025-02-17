import { Schema, model } from "mongoose";

const noteSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    tags:{
        type:[String],
        default:[],
    },
    isPinned:{
        type:Boolean,
        default:false,
    },
    userId:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
});

export const Note = model('Note',noteSchema);