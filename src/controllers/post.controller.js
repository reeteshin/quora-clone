const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");

const crudController = require("./crud.controllers");

router.get("", crudController(Post).get);
router.get("/:id", crudController(Post).getOne);
router.post("", crudController(Post).post);
router.patch("/:id", crudController(Post).updateOne);
router.delete("/:id", crudController(Post).deleteOne);

module.exports = router;