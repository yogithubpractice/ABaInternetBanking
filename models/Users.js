import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    IB_ID :{type:String,required:true,unique:true},
    password :{type:String,required:true},
    full_name :{type:String,required:true},
    acc_no :{type:String,required:true},
    phone :{type:String,required:true},
    balance :{type:Number,required:true}, 
})

export const UserModel =mongoose.model("users",UserSchema)

