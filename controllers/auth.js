const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const User = require('../models/User')
const { jwtSecret } = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        // User exist
        const passwordResult = bcryptjs.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Token generation
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, jwtSecret, { expiresIn: 60 * 60 * 36 })
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: "Invalid password. Try again."
            })
        }
    } else {
        // No user
        res.status(404).json({
            message: "User with this email not found"
        })
    }
    try {

    } catch (error) {

    }
}

module.exports.register = async function (req, res) {

    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
        // Same user found, error response
        res.status(409).json({
            message: "This e-mail already has account. Try to login."
        })
    } else {
        // No same user found, let's create new user

        const salt = bcryptjs.genSaltSync(10)

        const password = req.body.password

        const user = new User({
            email: req.body.email,
            password: bcryptjs.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
            console.log("User created")
        } catch (error) {
            errorHandler(res, error)
        }

    }

    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    console.log(user);

    // user.save().then(() => console.log('User created'))
}