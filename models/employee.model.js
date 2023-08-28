import mongoose from "mongoose";
var EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});
export default mongoose.model('Employee', EmployeeSchema);