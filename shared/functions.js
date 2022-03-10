const { UserSchema } = require('../model/userModel');

require('../shared/variables');
require('../shared/schema');
/*
	Author       : ATTI
	Description  : ALL CUSTOMS FUNCTIONS 
	Created      : 05 March 2021
*/
exports.santizeInput = (userInput) => {
	if (userInput != "") {
		var santizedData = validator.trim(mongoSanitize(xss(striptags(userInput))));
		return santizedData;
	}
	else {
		return null;
	}
}

exports.mongooseErrorHandle = (err) => {
	let errorMsg = null;
	if (err) {
		if (err.name && err.name == "ValidationError") {
			let errMessage = err.message;
			let errorMsgSplit = errMessage.split(':');
			errorMsg = errorMsgSplit[2];
		}
		else if (err.code && err.code == 11000) {
			errorMsg = "Entered data already exist in database"
		}
		else {
			errorMsg = err;
		}
	}
	else {
		errorMsg = null;
	}
	return errorMsg;
}

exports.checkPasswordFormat = (password) => {
	if (validator.matches(password, /^.*(?=.{6,10})(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z])\S*$/)) {
		return true;
	} else {
		return false;
	}
}

//Function for finding users using email
exports.findUserByEmail = (email, callback) => {
	if (email != null && email != '') {
		UserSchema.findOne({
			email: email
		}, (err, result) => {
			callback(err, result);
		});;
	}
	else {
		err = "No email found";
		callback(err, null)
	}
}