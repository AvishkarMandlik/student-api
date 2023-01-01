import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

import Student from "./models/Student.js";

const app = express();
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL, ()=>{
    console.log('connected to mongodb')
})

app.get("/health",(req,res)=>{
    res.json({
        status : 'Ok',
        message : 'All good'
    })
})

app.post('/create-student', async(req,res)=>{
    const {roll,fullName,mobile}= req.body

    const newStudent = new Student({
        roll : roll,
        fullName : fullName,
        mobile : mobile
    })

    const savedStudent = await newStudent.save()

    res.json({
        success : true,
        data : savedStudent
    })
})

app.get('/all-students', async(req,res)=>{
    const students = await Student.find()
    res.send({
        success : true,
        data : students
    })
})

app.post('/find-by-roll', async(req, res)=>{
    const {roll} =req.body;
    const students = await Student.findOne({
        roll : roll
    });

    res.json({
        success : true,
        data : students
    })

})

app.listen(5000, ()=>{
    console.log('Server started running on port 5000')
})