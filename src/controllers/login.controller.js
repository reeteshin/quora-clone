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

router.post("/refreshtoken",async (req,res)=>{
    try {
        const rf_token = req.cookies.refreshtoken
        if(!rf_token) return res.status(400).json({error: "Please login now!"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({error: "Please login now!"})

            const access_token = createAccessToken({id: user.id})
            res.json({access_token})
        })
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})
router.get("/userInfo",auth,async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')

        res.json(user)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})


router.get("/logout",(req,res)=>{
    try {
        res.clearCookie('refreshtoken', {path: '/users/refresh_token'})
        return res.json({message: "Logged out."})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})


router.post("/googlelogin",async (req,res)=>{
    try {
        const {tokenId} = req.body

        
        
        const { email, name} = verify.payload

        const password = email + process.env.GOOGLE_SECRET

        const passwordHash = await bcrypt.hash(password, 12)

       

        const user = await User.findOne({email:email})

        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        }else{
            const newUser = new User({
                firstname:name, email, password: passwordHash
            })

            await newUser.save()
            
            const refresh_token = createRefreshToken({id: newUser._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        }


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})


const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '15m'})
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '45m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = Router;