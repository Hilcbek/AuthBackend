import mongoose from "mongoose";
import express from 'express'
import dotenv from 'dotenv'
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { userRouter } from "./routers/user.router.js";
import { employeeRouter } from "./routers/employee.router.js";
let app = express()
dotenv.config()
app.use(cors({
    origin : ['http://localhost:5173','https://auth-frontend-amber.vercel.app'],
    credentials : true
}))
app.use(morgan('common'))
app.use(cookieParser())
app.use(express.json())
mongoose.connect(process.env.MONGODB).then(() => app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))).catch((err) => console.log(err))
mongoose.connection.on('connected',() => console.log('connected again!'))
mongoose.connection.on('disconnected',() => console.log('connected stopped!'))
app.use('/api/auth',userRouter)
app.use('/api/employee',employeeRouter)
app.use((err,req,res,next) => {
    let errorMessage = err.message || 'Something went wrong!';
    let errorStatusCode = err.status || 500;
    res.status(errorStatusCode).json({ error : errorMessage})
})