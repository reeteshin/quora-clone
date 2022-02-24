const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    profile_pic:{type: String, required: false},
    first_name:{type: String, required: false},
    last_name: {type: String, required: false},
    address:{type: String, required: false}
},{
    versionKey:false, 
    timestamps:true
})

const User = mongoose.model("user", userSchema);

module.exports = User;