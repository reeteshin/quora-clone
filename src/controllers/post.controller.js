const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");

const crudController = require("./crud.controllers");


router.get("", async(req, res) => {
    try{
        const post = await Post.find()
        .populate({path: "user_id", select: { first_name: 1}})
        .populate({path: "answer_id"})
        
        .lean().exec();
      return   res.status(200).send(post);
    }catch(err){
    return  res.status(500).send({error: err.message});
    }
})

//router.get("", crudController(Post).get);
router.get("/:id", crudController(Post).getOne);
router.post("", crudController(Post).post);
router.patch("/:id", crudController(Post).updateOne);
router.delete("/:id", crudController(Post).deleteOne);

module.exports = router;
