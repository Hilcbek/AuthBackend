import { ErrorHandle } from '../Error/error.js';
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
export let Register = asyncHandler(async (req,res,next) => {
    try {
        let genSalt = await bcrypt.genSalt(10)
        let {username,password} = req.body;
        if(!username || !password) return next(ErrorHandle(500, 'All fields are required!'))
        let Username = await User.findOne({ username : username })
        if(Username) return next(ErrorHandle(500, 'username exist!'))
        let NewUser = await User.create({
            ...req.body,
            password : await bcrypt.hash(password,genSalt)
        })
        res.status(200).json({ data : NewUser })
    } catch (error) {
        next(error)
    }
})
export let Login = asyncHandler(async (req,res,next) => {
    let {username,password} = req.body;
    if(!username || !password) return next(ErrorHandle(500, 'please fill all the fields'))
        let Username = await User.findOne({ username : username});
        if (!Username) return next(ErrorHandle(500, 'wrong username!'))
        let Password = await bcrypt.compare(password,Username.password);
        if(!Password) return next(ErrorHandle(500, 'wrong username or password!'))
        jwt.sign({ id : Username._id, username : Username.username }, process.env.JWT, { expiresIn : '1m'}, (err,payload) => 
                { 
                    if(err) 
                        return(next(ErrorHandle(500, 'error while generating token!')))
                    res.cookie('token',payload,{ httpOnly : true, sameSite : 'none',}).status(200).json({ data : Username})
            })
})
export let Logout = (req,res,next) => {
    try {
        res.clearCookie('token').status(200).json({ data : 'Logout Successfully!'})
    } catch (error) {
        next(error)
    }
}