function errorHandler(err, req, res, next) {
    let status = 500;
    let message = "Internal Server Error";

    if(err.name === "BadRequest") {
        return res.status(400).json({ message: err.message });
    }

    if

}