const jwt = require("jsonwebtoken")
const protect = (req, res, next) => {
    console.log(process.env.JWT_SECRET)
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        return res.status(401).json({ message: "No token , unauthorized token" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        console.log(req.user)
        next()
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}

module.exports = protect