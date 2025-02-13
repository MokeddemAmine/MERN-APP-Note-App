import express from 'express';
import cors  from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './Routes/auth.route.js';
import noteRouter from './Routes/note.route.js';

dotenv.config();

// connect with database
mongoose.connect(process.env.MONGO_URI)

const app = express();
app.use(express.json());
// connect cors
app.use(
    cors({
        origin:"*"
    })
)
// routes
app.use("/api/auth",authRouter);
app.use("/api/notes",noteRouter);

// app.get('/',(req,res) => {
//     res.json({data:"hello"});
// })

app.listen(8000);

//  module.exports = app;