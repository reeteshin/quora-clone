const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    ques_dec: {type:String, required: true},

},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("question", questionSchema);