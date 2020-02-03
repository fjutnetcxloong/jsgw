// passport.js
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy


// 序列化ctx.login()触发
passport.serializeUser(async (user, done) => {
    await done(null, user.id)
})
// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async (user, done) => {
    await done(null, user)
})

passport.use(new LocalStrategy({
        // usernameField: "sdsadsa",
        // passwordField: "dsahgdsjahdg",
        // passReqToCallback: true
    },
    async (username, password, done) => {
        done(null, user, {
            msg: 'this is a test'
        })
    }))
module.exports = passport
