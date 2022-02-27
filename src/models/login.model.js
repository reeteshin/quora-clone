const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    username:{type :String, required :true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true}

},{
    versionKey:false,
    timestamps:true
})
module.exports=mongoose.model("UserLogin",userSchema)