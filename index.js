// import .env file 
require('dotenv').config()

// server creation
// express

// 1 - import express
const express=require('express')
const router = require('./routes/router')
const cors = require('cors')
// 2 - Create server using express
const server=express() 

// Integrate Font-End
server.use(cors())

// to convert json to .js
server.use(express.json())

// router set
server.use(router)


// import connection.js file
require('./db/connection')

// 3 - server run

// port  -(we can choose - 8000/7000/5000/4000/3000)
const port=5000 || process.env.port

server.listen(port,()=>{
    console.log(`_______server started at port number ${port}_______`);
})

// api call resolve - post

// server.post('/register',(req,res)=>{
//     res.send("post method working")
// })

// server.post('/login',(req,res)=>{
//     console.log(req.body.acno);
//     console.log(req.body.psw);
//     res.send("login worked")
// })

// server.get('/getex',(req,res)=>{
//     res.send("get worked")
// })

