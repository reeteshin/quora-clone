const express = require("express");
const router = express.Router();
const Comment = require("../models/comments.model");

const crudController = require("./crud.controllers");

router.get("", async(req, res) => {
    try{
        const comments = await Comment.find()
        .populate({path: "user_id", select: {email:1, first_name: 1}})
        .populate({path: "answer_id", select:{ ans_dec : 1}})
        .lean().exec();
    
      return   res.status(200).send(comments);
    }catch(err){
    return  res.status(500).send({error: err.message});
    }
})

// router.get("", crudController(Answer).get);
router.get("/:id", crudController(Comment).getOne);
router.post("", crudController(Comment).post);
router.patch("/:id", crudController(Comment).updateOne);
router.delete("/:id", crudController(Comment).deleteOne);

module.exports = router;