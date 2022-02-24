const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    ques_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        required: true
    },
    ans_dec:{type: String, required:true},
    image: {type: String, required: false},
    votes:{type:Number, required:false, default: 0},
    share:{type: Number, required: false, default: 0}

},{
    versionKey: false, 
    timestamps: true
});

module.exports = mongoose.model("answer", answerSchema);