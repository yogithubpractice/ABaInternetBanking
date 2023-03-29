import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {UserModel} from '../models/Users.js'

const router = express.Router()

router.post("/register", async(req,res)=>{
    const { IB_ID, password,full_name,acc_no,phone,balance } = req.body
    const user = await UserModel.findOne({ IB_ID })
    
    if(user){ 
        return res.json({message:"User already exists!"})
    }

    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new UserModel({IB_ID,password:hashPassword,full_name,acc_no,phone,balance})
    await newUser.save()
    
    res.json({message:"User registered successfully!"})
})

router.post("/login", async(req,res)=>{
    const { IB_ID, password} = req.body
    const user = await UserModel.findOne({IB_ID})

    if(!user){
        return res.json({message:"User doesn't exist!"})
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.json({message:"User name or password is Incorrect!"})
    }

    const token = jwt.sign({id:user._id},"secret")
    res.json({token,userID:user._id})



})

export {router as userRouter}