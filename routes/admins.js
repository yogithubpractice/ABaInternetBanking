import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {AdminModel} from '../models/Admins.js'

const router = express.Router()

router.post("/register", async(req,res)=>{
    const { admin_ID, password } = req.body
    const admin = await AdminModel.findOne({ admin_ID })
    
    if(admin){ 
        return res.json({message:"Admin already exists!"})
    }

    const hashPassword = await bcrypt.hash(password,10)
    const newAdmin = new AdminModel({admin_ID,password:hashPassword})
    await newAdmin.save()
    
    res.json({message:"Admin registered successfully!"})
})

router.post("/login", async(req,res)=>{
    const { admin_ID, password} = req.body
    const admin = await AdminModel.findOne({admin_ID})

    if(!admin){
        return res.json({message:"Admin doesn't exist!"})
    }

    const isPasswordValid = await bcrypt.compare(password,admin.password)
    if(!isPasswordValid){
        return res.json({message:"admin name or password is Incorrect!"})
    }

    const token = jwt.sign({id:admin._id},"secret")
    res.json({token,adminID:admin_ID})



})

export {router as adminRouter}