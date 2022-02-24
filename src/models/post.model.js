const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
     
    post_dec: {type: String, required: true},
    image: {type:String, required: false}
},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("post", postSchema);