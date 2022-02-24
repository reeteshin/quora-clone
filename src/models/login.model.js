const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    email:{type:String,required:true},
    password:{type:String,required:true}
},{
    versionkey:false,
    timeStamps:true
})
module.exports =mongoose.model("UserLogin",userSchema)
