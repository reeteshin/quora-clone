const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    answer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "answer",
        required: true 
    },
    comment_dec: {type: String, required: true},
    votes: {type: Number, required:false, default: 0},
    
},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("comment", commentSchema);