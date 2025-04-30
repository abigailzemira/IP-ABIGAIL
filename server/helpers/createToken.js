//create token after login

const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env

const signToken = (data) => {
    return jwt.sign(data, JWT_SECRET)
}

const verifyToken = (data) => {
    return jwt.verify(data, JWT_SECRET)
}

module.exports = {
    signToken,
    verifyToken
}