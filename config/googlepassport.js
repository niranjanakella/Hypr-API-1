module.exports = () => {
    const passport  = require('passport');
    const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
    var gcal = require('google-calendar');
    require('dotenv').config();


    //console.log("process.env:"+ JSON.stringify(process.env,null,2));

    passport.use(new GoogleStrategy({
        clientID:   process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/v2/googleauth",
        passReqToCallback   : true
      },
      (request, accessToken, refreshToken, profile, next) => {
          console.log("acessToken:"+accessToken);
          console.log("profile:"+ JSON.stringify(profile,null,2));
          // console.log("refreshToken:"+refreshToken);
        
          options = {
            accessToken : accessToken,
            email  : profile.email
          }
        //   console.log("profile:"+ JSON.stringify(profile,null,2));
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
        return next(null,options);
      }
    ));
    passport.serializeUser(function(user, done) {
        
        done(null, user);
    }); 
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}