const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy

const Login = require("./models/login")

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value
        const name = profile.displayName
        const googleId = profile.id

        let user = await Login.findOne({ email })

        if (!user) {
            user = await Login.create({
                email,
                name,
                password: null,
                googleId: googleId,
                provider: "google",
            })
        } else {
          user.googleId = googleId
          user.provider = "google"

          await user.save()
        }

        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Login.findById(id)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

module.exports = passport
