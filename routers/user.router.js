import express from 'express'
import { Login, Logout, Register } from '../controllers/user.controller.js'
import { VerifyTokenForFrontEnd } from '../Token/token.js'
export let userRouter = express.Router()
userRouter.post('/register',Register)
userRouter.post('/login',Login)
userRouter.post('/logout',Logout)
userRouter.get('/profile',VerifyTokenForFrontEnd)