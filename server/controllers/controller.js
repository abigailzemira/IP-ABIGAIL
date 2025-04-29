const axios = require("axios")

class Controller {
    static async getBook(req, res, next) {
        try {
            const response = await axios ({
                method: "GET",
                url: "http://openlibrary.org/subjects/love.json?published_in=1500-1600"
            })
            res.status(200).json(response.data)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Controller