const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

const crudController = require("./crud.controllers");

router.get("", crudController(User).get);
router.get("/:id", crudController(User).getOne);
router.post("", crudController(User).post);
router.patch("/:id", crudController(User).updateOne);
router.delete("/:id", crudController(User).deleteOne);

module.exports = router;