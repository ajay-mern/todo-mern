const User = require("../models/User.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const registeruser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.staus(400).json({
                message: "please provide all fields"
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "user already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "please provide all the fields"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "uesr not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "invaiid credentails"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: "1d" })
        res.status(200).json({
            message: "login successfully",
            token: token
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { registeruser, loginUser }