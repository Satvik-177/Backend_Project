import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"

/**
 * @name userRegisterController
 * @description regsiter a new user, expects username, email and password in the request body
 * @access Public
 */

export const userRegisterController = async(req,res)=>{

    const{username,email,password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message: "Please provide username,email and password"
        })
    }

    const isUserExists = await userModel.findOne({
        $or:[{email},{username}]
    })

    if(isUserExists){
        res.status(400).json({
            message:"user already exists with this email or username"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign(

        {id:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token",token)

    return res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */

export const loginUserController = async(req,res)=>{

    const{email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Incorrect email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign(

        {id:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token",token)

    return res.status(200).json({
        message:"User loggedIn successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

