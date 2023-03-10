const keys = require('../config/keys')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const mongoose = require('mongoose')
const User = require('../models/User')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwtSecret
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {

            try {
                const user = await User.findById(payload.userId).select('email id')
                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (error) {
                console.log(error);
            }
        })
    )
}