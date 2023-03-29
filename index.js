import express from 'express'
const app= express()
import cors from 'cors'
import mongoose from 'mongoose'
import {userRouter} from './routes/users.js'
import {adminRouter} from './routes/admins.js'


app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.use("/admin",adminRouter)


mongoose.connect("mongodb+srv://yonas:yonas2015@propractice.uklszfi.mongodb.net/propractice?retryWrites=true&w=majority")

app.listen(5000,()=> console.log("SERVER STARTED"))