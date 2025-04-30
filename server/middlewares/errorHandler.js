function errorHandler(err, req, res, next) {
    console.log(err , "<<<< yak disini manteman")
    if(err.name === "BadRequest") {
        return res.status(400).json({ message: err.message });
    }

    if(err.name === "Unauthorized") {
        return res.status(401).json({ message: err.message });
    }

    if(err.name === "NotFound") {
        return res.status(404).json({ message: err.message });
    }

    if(err.name === "SequelizeValidationError") {
        return res.status(400).json({ message: err.errors[0].message });
    }

    if(err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
    }

  return res.status(500).json({ message: "Internal Server Error" });
}

module.exports = errorHandler;