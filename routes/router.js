// import express
const express=require('express')
const { register, login, getBalance } = require('../controllers/logic')
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')

// router object
const router=new express.Router()

// create account 
router.post('/bankuser/create_acc',register)


// login
router.post('/bankuser/login',login)

// balance check
router.get('/bankuser/balance/:acno',jwtMiddleware,getBalance)

// money transfer
router.post('/bankuser/money-transfer',jwtMiddleware,moneyTransfer)

// account statement
router.get('/bankuser/account-statement/:acno',jwtMiddleware,accountStatement)

// profile view

// delete account
router.delete('/bankuser/delete-account/:acno',jwtMiddleware,accountDelete)

// export router
module.exports=router