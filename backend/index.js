import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import connectDB from "./Controllers/db.js";

const app = express();
dotenv.config({})

//middleWare 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsDetails={
    origin: '*',
    credentials:true
}

app.use(cors(corsDetails))


const PORT =process.env.port||5002;
app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
  connectDB()
});
