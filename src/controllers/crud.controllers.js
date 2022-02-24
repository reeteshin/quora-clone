const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

const getall = (model) => {
   return  async(req, res) => {
        try{
            const users = await model.find().lean().exec();
        
          return   res.status(200).send(users);
        }catch(err){
        return  res.status(500).send({error: err.message});
        }
        
    }

}

const getOne = (model) => async(req, res) => {
    try{
        const user = await model.findById(req.params.id).lean().exec();
    
      return   res.status(200).send(user);
    }catch(err){
    return  res.status(500).send({error: err.message});
    }
    
}


const create = (model) => async(req, res) => {
    try{
        const user = await model.create(req.body);
       return  res.status(201).send(user);
    }catch(err){
     return res.status(500).send({error: err.message});
    }
    
}

const updateOne = (model) => async(req, res) => {
     try{
        const user = await User.findByIdAndUpdate( req.params.id, req.body , {
            new: true
        }).lean().exec();
        console.log('here')
       return  res.status(201).send(user);
    }catch(err){
    return res.status(500).send({error: err.message});
    }
    
}

const deleteOne = (model) => async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
      return res.status(200).send(user)
    }catch(err){
       return res.status(500).send({error: err.message})
    }
 }
    

module.exports = (model) => ({
    get: getall(model),
    getOne: getOne(model),
    post: create(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model)
})