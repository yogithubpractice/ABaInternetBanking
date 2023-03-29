import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
    admin_ID :{type:String,required:true,unique:true},
    password :{type:String,required:true},  
})

export const AdminModel =mongoose.model("admins",AdminSchema)



