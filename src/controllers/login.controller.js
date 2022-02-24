require("dotenv").config();
const express=require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require("../models/login.model")
const requiredLogin = require('../configs/middleware/loginMiddleware')

const Router=express.Router();
Router.use(cors())


Router.get("/protected",requiredLogin,(req,res)=>{
    res.send("hello user")

})
Router.get("/loggedinuser",async (req,res)=>{
    const data = await User.find().lean().exec()
    res.send(data)

})
Router.post("/signup",(req,res)=>{
    const {email,password}=req.body
    if( !email || !password){
        return res.status(412).json({error:"please fill all the fields"})
    }
    User.findOne({email:email}).then(userData=>{
        if(userData){
            return res.status(402).json({error:"user already exists"})
        }
        bcrypt.hash(password,12).then(hashedPassword=>{
            const user = new User({
              
                email,
                password:hashedPassword
            })
            user.save().then(user=>{
                res.json({message:"user saved successfully"})
    
            }).catch(err=>{
                console.log(error)
                res.json({error:"error occured"})

        })
        

        })

    }).catch(err=>{
        console.log(err)
        res.json({error:"error occured"})
    })
})


Router.post("/signin",(req,res)=>{
    const {email,password}=req.body
    if( !email || !password){
        return res.status(412).json({error:"please fill all the fields"})
    }
    User.findOne({email:email}).then(userData=>{
        if(!userData){
            return res.status(402).json({error:"Invalid username/password"})
        }
        bcrypt.compare(password,userData.password).then(doMatch=>{
            if(!doMatch){

                res.json({error:"Invalid Email/password"})
            }else{
                const token = jwt.sign({_id:userData._id},process.env.JWT_SECRET)
               const {_id,email} = userData
               res.json({token,user:{_id,email}})
                
                //return res.json({message:"user Login successfully"})
            }
        })


    }).catch(err=>{
        console.log(err)
        res.json({error:"error occured"})
    })
})

module.exports = Router;