const users = require("../models/collections")
const jwt = require('jsonwebtoken')

// register - account creation 
register = (req, res) => {

    // // acno=req.body.acno
    // const {acno}=req.body
    // // psw=req.body.psw
    // const {psw}=req.body
    // // uname=req.body.uname
    // const {uname}=req.body

    // destructuring
    const { acno, psw, uname } = req.body

    // check user data in collection
    users.findOne({ acno }).then(user => {

        // send response
        if (user) {
            res.status(400).json(  //using json() instead of send() bcz, json() convert data to json and send response
                {
                    message: "User already exist",
                    status: false,
                    statusCode: 400
                }
            )
        }
        else {
            // create object for user
            let newUser = new users({
                acno,
                uname,
                psw,
                balance: 0,
                transactions: []
            })
            // save in db
            newUser.save()
            res.status(201).json({
                message: "account created successfully",
                status: true,
                statusCode: 201
            })
        }
    })
}


// login
login = (req, res) => {
    // access data from request body
    const { acno, psw } = req.body

    users.findOne({ acno, psw }).then(user => {
        if (user) {

            // token generation
            const token = jwt.sign({ acno }, "secretkey123")

            res.status(200).json({
                message: "login success",
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                token
            })
        }
        else {
            res.status(404).json({
                message: "incorrect account number or password",
                status: false,
                statusCode: 404
            })
        }
    })
}

// balance check
getBalance = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.balance,
                status: true,
                statusCode: 200
            })
        }
        else {
            res.status(404).json({
                message: "User doesn't exist",
                status: false,
                statusCode: 404
            })
        }
    })
}

// money transfer
moneyTransfer = (req, res) => {
    const { sAcno, rAcno, amount, spsw, date } = req.body

    // convert amount into number
    var amnt = parseInt(amount)

    // checking sender's details
    users.findOne({ acno: sAcno, psw: spsw }).then(suser => {
        if (suser) {
            // check recipient details in db

            users.findOne({ acno: rAcno }).then(ruser => {
                if (ruser) {
                    // check amount in sender's balance
                    if (amnt <= suser.balance) {

                        // update sender object
                        suser.balance = suser.balance - amnt
                        // adding transaction details into db
                        suser.transactions.push({ tacno: rAcno, amount: amnt, type: "DEBIT", date })
                        // save sender transaction details in db
                        suser.save()

                        // update reciever object
                        ruser.balance = ruser.balance + amnt
                        ruser.transactions.push({ tacno: sAcno, amount: amnt, type: "CREDIT", date })
                        ruser.save()

                        res.status(200).json({
                            message: "Transation success!!",
                            status: true,
                            statusCode: 200
                        })


                    }
                    else {
                        res.status(404).json({
                            message: "Insufficient balanace",
                            status: false,
                            statusCode: 404
                        })
                    }
                }
                else {
                    res.status(406).json({
                        message: "Invalid credit credentials",
                        status: false,
                        statusCode: 406
                    })
                }
            })
        }
        else {
            res.status(404).json({
                message: "Invalid debit credentials",
                status: false,
                statusCode: 404
            })
        }
    })
}


// account statements
accountStatement = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.transactions,
                status: true,
                statusCode: 200
            })
        }
        else {
            res.status(404).json({
                message: "user not found",
                status: false,
                statusCode: 404
            })
        }
    })
}

// delete account
accountDelete = (req, res) => {
    const { acno } = req.params
    users.deleteOne({ acno }).then(data => {
        if (data) {
            res.status(200).json({
                message: "Account Deleted Successfully",
                status: true,
                statusCode: 200
            })
        }
    })
}


// export logics
module.exports = { register, login, getBalance, moneyTransfer, accountStatement, accountDelete }