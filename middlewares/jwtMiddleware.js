const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    try {
        // access token value from headers
        const token = req.headers['access_token']

        // varify token - true/false
        jwt.verify(token, "secretkey123")

        // to exit from middleware
        next()
    }
    catch {
        res.status(401).json({
            status: false,
            message: "please login",
            statusCode: 401
        })
    }
}

module.exports = { jwtMiddleware }