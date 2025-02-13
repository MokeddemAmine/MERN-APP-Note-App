import { Note } from "../models/note.model.js";

export const addNote = async (req,res) => {
    const {title, content, tags} = req.body;
    const {user} = req.user;

    if(!title){
        return res.status(400).json({error:true,message:"Title is required"});
    }
    if(!content){
        return res.status(400).json({error:true,message:"Content is required"});
    }
    try{
        const note = new Note({
            title,
            content,
            tags:tags || [],
            userId: user._id
        });
        await note.save();
        return res.json({
            error:false,
            note,
            message:"Note added successfully"
        });
    }catch(err){
        return res.status(500).json({
            error:true,
            message:"Internal Server Error",
        });
    }
}

export const editNote = async (req,res) => {
    const {id} = req.params;
    const {title, content, tags, isPinned} = req.body;
    const {user} = req.user;

    if(!title && !content && !tags){
        return res.status(400).json({
            error:true,
            message:"No changes provided"
        })
    };

    try{
        const note = await Note.findOne({_id:id, userId:user._id});
        if(!note){
            return res.status(404).json({
                error:true,
                message:"Note not found"
            });
        }
        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error:false,
            note,
            message:"Note updated successfully"
        });
    }catch(err){
        return res.status(500).json({
            error:true,
            message:"Internal server error",
        })
    }
}

export const getNotes = async (req,res) => {
    const {user} = req.user;

    try{
        const notes = await Note.find({userId:user._id}).sort({isPinned: -1});
        return res.json({
            error:false,
            notes,
            message:"All notes retrived successfully",
        });
    }catch(err){
        return res.status(500).json({
            error:true,
            message:"Internal server error"
        });
    }
}

export const deleteNote = async (req,res) => {
    const {id} = req.params;
    const {user} = req.user;

    try{
        const note = await Note.findOne({_id:id, userId:user._id});
        if(!note){
            return res.status(404).json({
                error:true,
                message:"Note not found"
            });
        }
        await Note.deleteOne({_id:id, userId:user._id});
        return res.json({
            error:false,
            message:"Note deleted successfully"
        })
    }catch(err){
        return res.status(500).json({
            error:true,
            message:"Internal Server Error"
        });
    }
}

export const editPinnedNote = async (req,res) => {
    const {id} = req.params;
    const {isPinned} = req.body;
    const {user} = req.user;

    try{
        const note = await Note.findOne({_id:id, userId:user._id});
        if(!note){
            return res.status(404).json({
                error:true,
                message:"Note not found",
            });
        }
        note.isPinned = isPinned || false;
        await note.save();
        return res.json({
            error:false,
            note,
            message:"Note updated successfully",
        })
    }catch(err){
        return res.status(500).json({
            error:true,
            message:"Internal Server Error",
        })
    }
}