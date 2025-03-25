import express from 'express';
import mongoose from 'mongoose';
import adsRouter from './routes/adsWebApp.js';
import userRouter from './routes/userAdsWebApp.js';
import "dotenv/config";
import cors from "cors"



const app = express();

const port = process.env.PORT || 3501;

//creating Database
const db = await mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(`Database is connected sucessfully`)
})

//global middleware

app.use(express.json());

app.use(cors());

//routes for ads 
app.use(adsRouter);

//routes for user
app.use(userRouter);


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}.`)
})
