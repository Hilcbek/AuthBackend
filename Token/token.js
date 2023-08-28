import jwt from 'jsonwebtoken'
import { ErrorHandle } from '../Error/error.js';
export let VerifyTokenForTheBackend = (req,res,next) => {
    try {
        let { token } = req.cookies;
        if(token){
            jwt.verify(token,process.env.JWT,(err,payload) => {
                if(err) return next(ErrorHandle(500, 'Session has expired!'))
                req.user = payload
                next()
            })
        }else{
            return next(ErrorHandle(500, 'Unauthorized!'))
        }
    } catch (error) {
        next(error)
    }
}
export let VerifyTokenForFrontEnd = (req,res,next) => {
    try {
        let { token } = req.cookies;
        if(token){
            jwt.verify(token,process.env.JWT,(err,payload) => {
               if(err) res.send(false)
                if(payload) res.send(true) 
                next()
            })
        }else{
            res.send(false)
        }
    } catch (error) {
        next(error)
    }
}