const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('users')


var options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.jwt;

module.exports = passport=>{
    passport.use(new JwtStrategy(options, async (payload, done)=> {
        try{
            //Ищем в таблице User по id, из токена берём userId. Нас интересует только email и id
            const user = await User.findById(payload.userId).select('email id')
            if (user) {
                done(null, user)
            } else {
                done(null, false)            
            }
        }catch(e){
            console.log(e)
        }

    }));
}
// options.issuer = 'accounts.examplesoft.com';
// options.audience = 'yoursite.net';
