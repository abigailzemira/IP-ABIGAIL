// make authentication to see if user has logged in
const { verifyToken } = require("../helpers/createToken.js");

async function authentication(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
        throw { name: "Unauthorized", message: "Please login first" };
        }

        const rawToken = authorization.split(" ")
        const tokenType = rawToken[0]
        const tokenValue = rawToken[1]

        if(tokenType !== "Bearer") throw {name: "Unauthorized", message: "Invalid token"}

        const validToken = verifyToken(tokenValue);
        if (!validToken) {
            throw { name: "Unauthorized", message: "Invalid token" };   
        }
        req.user = {
            id: validToken.id,
        }
        next()
    } catch (error) {
        next(error);
    }
}

module.exports = authentication;