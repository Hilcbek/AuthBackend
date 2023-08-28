import { ErrorHandle } from '../Error/error.js';
import Employee from '../models/employee.model.js'
import asyncHandler from 'express-async-handler'
export let AddEmployee = asyncHandler(async (req,res,next) => {
    try {
        let {name} = req.body;
        if(!name) return next(ErrorHandle(500, 'Fill all fields!'))
        let NewEmployee = await Employee.create(req.body);
        res.status(200).json({ data : NewEmployee })
    } catch (error) {
        next(error)
    }
})