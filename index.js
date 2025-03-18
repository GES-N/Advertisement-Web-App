import express from 'express'
import mongoose from 'mongoose';

const app = express();

const port = process.env.PORT || 3501;

//creating Database
const db = await mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(`Database is connected sucessfully`)
})

//global middleware
//app.use(express.json())

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}.`)
})
