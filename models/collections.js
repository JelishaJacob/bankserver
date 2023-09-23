// create model 

// use mongoose libraray 
// import mongoose 
const mongoose=require('mongoose')

// define schema - fields and values of model (collection)
const usersSchema=new mongoose.Schema({
    acno:Number,
    uname:String,
    psw: String,
    balance:Number,
    transactions:[]

})

// model 
// modelName = usersName
const users=new mongoose.model("users",usersSchema)

// export model - to import in another file 
module.exports=users