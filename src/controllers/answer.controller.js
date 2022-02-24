const express = require("express");
const router = express.Router();
const Answer = require("../models/answer.model");

const crudController = require("./crud.controllers");

router.get("", async(req, res) => {
    try{
        const answers = await Answer.find()
        .populate({path: "user_id", select: {email:1, first_name: 1}})
        .populate({path: "ques_id", select:{ ques_dec : 1}})
        .lean().exec();
    
      return   res.status(200).send(answers);
    }catch(err){
    return  res.status(500).send({error: err.message});
    }
})

// router.get("", crudController(Answer).get);
router.get("/:id", crudController(Answer).getOne);
router.post("", crudController(Answer).post);
router.patch("/:id", crudController(Answer).updateOne);
router.delete("/:id", crudController(Answer).deleteOne);

module.exports = router;