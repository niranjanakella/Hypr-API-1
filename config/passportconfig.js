
module.exports = function(){
    const passport  = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const userFunctions = require('../shared/functions');
    let userHashedPassword = null;
    passport.use(new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password'
        },(email,password,next) => {
            userFunctions.findAdminUser(email,(err,user) => {
                if (err) {
                    return next(err);
                }    
                if (!user) {
                    return next(null, null);
                }
                else{
                    userHashedPassword = sha1(password)
                    if(userHashedPassword == user.password){
                        return next(null,user);
                    } 
                    else{
                        return next(null,null);
                    }     	 
                } 
            });
        }
    )); 
    passport.serializeUser(function(user, done) {
        done(null, user);
    }); 
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}      