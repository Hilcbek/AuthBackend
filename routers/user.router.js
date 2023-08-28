import express from 'express'
import { AllUsers, Login, Logout, Register } from '../controllers/user.controller.js'
import { VerifyTokenForFrontEnd, VerifyTokenForTheBackend } from '../Token/token.js'
export let userRouter = express.Router()
userRouter.post('/register',Register)
userRouter.post('/login',Login)
userRouter.post('/logout',Logout)
userRouter.get('/profile',VerifyTokenForFrontEnd)
userRouter.get('/',VerifyTokenForTheBackend,AllUsers)