const mongoose = require("mongoose");
 
module.exports = () => {
    return mongoose.connect("mongodb+srv://murali:murali@web-test.6swdq.mongodb.net/Quora?retryWrites=true&w=majority")
}