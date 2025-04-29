//create token after login

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { User } = require("../models/index.js")
const { JWT_SECRET } = process.env

const signToken = async (email, password) => {
    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) throw { message: "Invalid email" }
        const isValid = bcrypt.compareSync(password, user.password)
        if (!isValid) throw { message: "Invalid password" }
        const access_token = jwt.sign({ id: user.id }, JWT_SECRET)


            return access_token
        
    } catch (error) {
        console.log(error)
    }
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signToken,
    verifyToken
}