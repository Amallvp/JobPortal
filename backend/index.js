import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import userRoute from "./Routes/userRoute.js"
import connectDB from "./Connection/db.js";
import companyRoute from './Routes/companyRoute.js'
import jobRoute from './Routes/jobRoute.js'

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


// apis

app.use("/api/jobs/user",userRoute) 

app.use("/api/company",companyRoute) 
app.use("/api/job_details",jobRoute) 

const PORT =process.env.port||5002;
app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
connectDB()
});
