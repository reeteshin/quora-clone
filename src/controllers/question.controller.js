const express = require("express");
const router = express.Router();
const Question = require("../models/question.model");

const crudController = require("./crud.controllers");

router.get("", async(req, res) => {
    try{
        const questions = await Question.find()
        .populate({path: "user_id", select: {email:1, first_name: 1}})
        .lean().exec();
    
      return   res.status(200).send(questions);
    }catch(err){
    return  res.status(500).send({error: err.message});
    }
})

// router.get("", crudController(Question).get);
router.get("/:id", crudController(Question).getOne);
router.post("", crudController(Question).post);
router.patch("/:id", crudController(Question).updateOne);
router.delete("/:id", crudController(Question).deleteOne);

module.exports = router;