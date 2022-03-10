module.exports = function(req,res,next){
	if(req.isAuthenticated()){
		// if(req.user.userType == "agency"){
		// 	if(req.user.emailVerifiedFlag.flag == 1 && req.user.phoneVerifiedFlag.flag == 1){
		// 		return next();
		// 	} else {
		// 		//verification not done
		// 		res.redirect('/login');
		// 	}
		// } else {
		// 	return next();
		// }
		return next();
	}
	res.redirect('/login');
}