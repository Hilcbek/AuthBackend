import express from 'express'
import { AddEmployee } from '../controllers/employee.controller.js'
import { VerifyTokenForTheBackend } from '../Token/token.js'
export let employeeRouter = express.Router()
employeeRouter.post('/',VerifyTokenForTheBackend,AddEmployee)