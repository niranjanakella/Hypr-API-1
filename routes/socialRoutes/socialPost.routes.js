var express = require('express');
var router = express.Router();
// var fs = require(fs)
const userFunctions = require('../../shared/functions');
var { filePathSocail } = require('../../config/dir');

/* GET home page. */


/// USER LOGIN FOR SOCIAL MEDIA
router.route("/userLoginForSocialMedia")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    f_password: 0,
                    updatedAt: 0,
                    f_phone: 0,
                    f_country: 0,
                    f_address: 0,
                    f_area: 0,
                    f_city: 0,
                    f_shipping_Address: 0,
                    userCurrency: 0,
                    f_wallet: 0,
                    otp: 0,
                    f_pincode: 0,
                    f_landmark: 0,
                    f_state: 0,
                    RefCode: 0,
                    date: 0,
                    loginAt: 0

                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        // console.log(req.body.username);
                        res.json({
                            status: true,
                            msg: "User info fetched successfull!",
                            data: result[0]
                        })

                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


///GET USERS FOR TAGS
router.route("/getUsernameForTag")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        console.log(req.body.username);

                        if (req.body.username != undefined) {
                            var UserExists = await UsersSchema.find({ f_name: { '$regex': req.body.username, '$options': 'i' } }).sort({ _id: -1 }).select({ f_name: 1, l_name: 1, f_email: 1, f_username: 1, f_picture: 1 });
                            // var UserExists = await UsersSchema.find({
                            //     "$or": [
                            //         { "f_name": { "$regex": username } },
                            //         { "l_name": { "$regex": username } }
                            //     ]
                            // }).select({ f_name: 1, l_name: 1, f_email: 1, f_username: 1, f_picture: 1 })
                            console.log(UserExists.length);
                            if (UserExists.length == 0) {
                                res.json({
                                    status: false,
                                    data: UserExists,
                                    msg: "No users found!"
                                })
                            } else {
                                res.json({
                                    status: true,
                                    data: UserExists,
                                    msg: "All users fetched successfully.."
                                })
                            }
                        } else {
                            res.json({
                                status: false,
                                msg: "Username should not be blank!"
                            })
                        }

                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


///GET FEELINGS AND ACTIVITIES  FOR POSTS
router.route("/getFeelingActivity")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var feelingsActivities = await feelingsActivitiesSchema.find({});

                        if (feelingsActivities.length == 0) {
                            res.json({
                                status: true,
                                data: feelingsActivities,
                                msg: "No Acticvity found!"
                            })
                        } else {
                            res.json({
                                status: false,
                                data: feelingsActivities,
                                msg: "All feelings Activities fetched successfully.."
                            })
                        }
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


// /SUBMIT POST
router.route("/createNewPost")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        try {
            //console.log(req.body);

            let _id = userFunctions.santizeInput(req.body.userId);

            // let f_postFeeling = (req.body.f_postFeeling);
            // let f_postFeeling = (req.body.f_postFeeling);
            //  console.log(req.body);
            // let userId = userFunctions.santizeInput(req.body.userId);
            //let password = userFunctions.santizeInput(req.body.password);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {

                        let options = {
                            f_post: req.body.f_post,
                            f_userId: _id,
                            f_username: result[0].f_email,
                            f_name: result[0].f_name + ' ' + result[0].l_name,
                            f_user_picture: result[0].f_picture,
                            f_postImages: req.body.f_postImages,
                            f_postLocation: req.body.f_postLocation,
                            f_postTag: req.body.f_postTag,
                            f_postLike: [],
                            f_postComment: [],
                            f_postShare: [],
                            f_postPrivacy: req.body.f_postPrivacy,
                            f_postFeeling: req.body.f_postFeeling,
                            f_postGalleryName: req.body.f_postGalleryName,
                            f_userIP: req.body.f_userIP,
                            f_status: true,
                            f_videoLink: req.body.f_videoLink,
                            f_postCreatedDate: Date.now(),
                            f_postUpdatedDate: Date.now(),

                        }
                        console.log(options);
                        SocialPost.create(options, (err, insertRes) => {
                            if (err) {
                                console.log("Err in creating post " + err);
                                res.json({
                                    status: false,
                                    code: "E111",
                                    msg: userFunctions.mongooseErrorHandle(err)
                                })
                            } else if (insertRes != null && insertRes != '') {
                                //send email otp
                                // if (result == true) {
                                res.json({
                                    status: true,
                                    msg: "Successfully post created!",
                                    id: insertRes._id,
                                })
                            }

                        })




                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


// /UPDATE YOUR POST
router.route("/UpdateYourPost")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        try {
            //console.log(req.body);

            let _id = userFunctions.santizeInput(req.body.userId);

            // let f_postFeeling = (req.body.f_postFeeling);
            // let f_postFeeling = (req.body.f_postFeeling);
            //  console.log(req.body);
            // let userId = userFunctions.santizeInput(req.body.userId);
            //let password = userFunctions.santizeInput(req.body.password);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {

                        let options = {
                            f_post: req.body.f_post,
                            f_postLocation: req.body.f_postLocation,
                            f_postPrivacy: req.body.f_postPrivacy,
                            f_postFeeling: req.body.f_postFeeling,
                            f_postGalleryName: req.body.f_postGalleryName,
                            f_videoLink: req.body.f_videoLink,
                            f_postUpdatedDate: Date.now(),

                        }
                        console.log(options);
                        // SocialPost.create(options, (err, insertRes) => {
                        SocialPost.findByIdAndUpdate(req.body.postId, {
                            $set: options
                        }, {
                            new: true
                        }, (err, updatedDocs) => {
                            if (err) {
                                console.log("Err in creating post " + err);
                                res.json({
                                    status: false,
                                    code: "E111",
                                    msg: userFunctions.mongooseErrorHandle(err)
                                })
                            } else if (updatedDocs != null && updatedDocs != '') {
                                //send email otp
                                // if (result == true) {
                                res.json({
                                    status: true,
                                    msg: "Successfully post created!",
                                    id: req.body.postId,
                                })
                            }

                        })




                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })



///GET FEELINGS AND ACTIVITIES  FOR POSTS
router.route("/getPostsByUserId")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            var pageCount = parseInt(req.body.pagecount);
            //let username = userFunctions.santizeInput(req.body.username);
            //  console.log(req.body.pageCount);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        if (req.body.pagecount != null || req.body.pagecount != undefined) {
                            //  console.log('coning');

                            var SocialPostData = await SocialPost.find({ f_userId: _id }).skip(pageCount * 20).limit(20).sort({ _id: -1 });

                            if (SocialPostData.length == 0) {
                                res.json({
                                    status: false,
                                    data: SocialPostData,
                                    msg: "No Post found!"
                                })
                            } else {
                                res.json({
                                    status: true,
                                    data: SocialPostData,
                                    msg: "All SocialPostData  fetched successfully.."
                                })
                            }
                        } else {
                            res.json({
                                status: false,
                                data: "",
                                msg: "Pagecount is mendator.. it will start with 0 and increate on scroll"
                            })
                        }
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


///GET FEELINGS AND ACTIVITIES  FOR POSTS
router.route("/getPostsByEmailId")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var SocialPostData = await SocialPost.find({ f_username: req.body.emailId }).sort({ _id: -1 });

                        if (SocialPostData.length == 0) {
                            res.json({
                                status: false,
                                data: SocialPostData,
                                msg: "No Post found!"
                            })
                        } else {
                            res.json({
                                status: true,
                                data: SocialPostData,
                                msg: "All SocialPostData  fetched successfully.."
                            })
                        }
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })

////// ADDD LIKES ON POSTS
router.route("/AddLikeOnPost")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            let post_id = userFunctions.santizeInput(req.body.postId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var errorArray = []
                        if (post_id != null) {
                            if (!validator.isMongoId(post_id)) {
                                msg = "Invalid Post ID";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {
                                var IsLiked = await SocialPost.findOne({ _id: mongoose.Types.ObjectId(post_id), "f_postLike.userId": _id });
                                console.log(IsLiked);
                                if (IsLiked == null) {
                                    await SocialPost.updateOne({ _id: mongoose.Types.ObjectId(post_id) }, {
                                        $push: {
                                            f_postLike: [{
                                                _id: mongoose.Types.ObjectId(),
                                                userId: _id,
                                                name: result[0].f_name + ' ' + result[0].l_name,
                                                email: result[0].f_email,
                                                userDP: result[0].f_picture,
                                            }]
                                        }
                                    })

                                    res.json({
                                        status: true,
                                        msg: "Liked added!",
                                    })
                                } else {
                                    res.json({
                                        status: false,
                                        msg: "Already liked!",
                                    })
                                }


                            }
                            else {
                                res.json({
                                    status: false,
                                    code: "E130",
                                    msg: errorArray
                                })
                            }

                        } else {
                            res.json({
                                status: false,
                                code: "E109",
                                msg: "Please request all mendatory feild..!"
                            })
                        }
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })



////// ADDD DISLIKES ON POSTS
router.route("/DisklikeOnPost")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            let post_id = userFunctions.santizeInput(req.body.postId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var errorArray = []
                        if (post_id != null) {
                            if (!validator.isMongoId(post_id)) {
                                msg = "Invalid Post ID";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {
                                var IsLiked = await SocialPost.findOne({ _id: mongoose.Types.ObjectId(post_id), "f_postLike.userId": _id });
                                console.log(IsLiked);
                                if (IsLiked != null) {
                                    await SocialPost.updateOne({ _id: mongoose.Types.ObjectId(post_id) }, {
                                        $pull: {
                                            f_postLike: { userId: _id }
                                        }
                                    }, { new: true, multi: true }, function (err, dta) {
                                        res.json({
                                            status: true,
                                            msg: "Disliked post!",
                                        })
                                    });
                                } else {
                                    res.json({
                                        status: false,
                                        msg: "Not liked yet, Like First !",
                                    })
                                }


                            }
                            else {
                                res.json({
                                    status: false,
                                    code: "E130",
                                    msg: errorArray
                                })
                            }

                        } else {
                            res.json({
                                status: false,
                                code: "E109",
                                msg: "Please request all mendatory feild..!"
                            })
                        }
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


////// ADDD Comment ON POSTS
router.route("/AddCommentOnPost")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            let post_id = userFunctions.santizeInput(req.body.postId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var errorArray = []
                        if (post_id != null && req.body.Comment != null) {

                            if (!validator.isMongoId(post_id)) {
                                msg = "Invalid Post ID";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {
                                await SocialPost.updateOne({ _id: mongoose.Types.ObjectId(post_id) }, {
                                    $push: {
                                        f_postComment: [{
                                            _id: mongoose.Types.ObjectId(),
                                            userId: _id,
                                            name: result[0].f_name + ' ' + result[0].l_name,
                                            email: result[0].f_email,
                                            userDP: result[0].f_picture,
                                            comment: req.body.Comment,
                                            postAt: new Date()
                                        }]
                                    }
                                })

                                res.json({
                                    status: true,
                                    msg: "Comment added!",
                                })
                            }
                            else {
                                res.json({
                                    status: false,
                                    code: "E130",
                                    msg: errorArray
                                })
                            }

                        } else {
                            res.json({
                                status: false,
                                code: "E130",
                                msg: "Please request all mendatory feild..!"
                            })
                        }



                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }
    })

////// ADDD Comment ON POSTS
router.route("/postComment")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            let post_id = userFunctions.santizeInput(req.body.postId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var errorArray = []
                        if (post_id != null && req.body.Comment != null) {

                            if (!validator.isMongoId(post_id)) {
                                msg = "Invalid Post ID";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {
                                await SocialPost.updateOne({ _id: mongoose.Types.ObjectId(post_id) }, {
                                    $push: {
                                        f_postComment: [{
                                            _id: mongoose.Types.ObjectId(),
                                            userId: _id,
                                            name: result[0].f_name + ' ' + result[0].l_name,
                                            email: result[0].f_email,
                                            userDP: result[0].f_picture,
                                            comment: req.body.Comment,
                                            postAt: new Date()
                                        }]
                                    }
                                })

                                res.json({
                                    status: true,
                                    msg: "Comment added!",
                                })
                            }
                            else {
                                res.json({
                                    status: false,
                                    code: "E130",
                                    msg: errorArray
                                })
                            }

                        } else {
                            res.json({
                                status: false,
                                code: "E130",
                                msg: "Please request all mendatory feild..!"
                            })
                        }



                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }
    })

////// GET Comment ON POSTS
router.route("/getCommentByPostID")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            let post_id = userFunctions.santizeInput(req.body.postId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var errorArray = []
                        if (post_id != null) {

                            if (!validator.isMongoId(post_id)) {
                                msg = "Invalid Post ID";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {
                                var postComment = await SocialPost.findOne({ _id: mongoose.Types.ObjectId(post_id) }).select({ f_postComment: 1 })

                                res.json({
                                    status: true,
                                    msg: "Comment Fetched on your post!",
                                    data: postComment
                                })
                            }
                            else {
                                res.json({
                                    status: false,
                                    code: "E130",
                                    msg: errorArray
                                })
                            }

                        } else {
                            res.json({
                                status: false,
                                code: "E130",
                                msg: "Please request all mendatory feild..!"
                            })
                        }



                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }
    })



////// ADDD SHARE ON POSTS
router.route("/ShareAnyPost")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            let post_id = userFunctions.santizeInput(req.body.postId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var errorArray = []
                        if (post_id != null) {

                            if (!validator.isMongoId(post_id)) {
                                msg = "Invalid Post ID";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {
                                await SocialPost.updateOne({ _id: mongoose.Types.ObjectId(post_id) }, {
                                    $push: {
                                        f_postShare: [{
                                            _id: mongoose.Types.ObjectId(),
                                            userId: _id,
                                            name: result[0].f_name + ' ' + result[0].l_name,
                                            email: result[0].f_email,
                                            userDP: result[0].f_picture,
                                        }]
                                    }
                                })

                                res.json({
                                    status: true,
                                    msg: "Post shared!",
                                })
                            }
                            else {
                                res.json({
                                    status: false,
                                    code: "E130",
                                    msg: errorArray
                                })
                            }

                        } else {
                            res.json({
                                status: false,
                                code: "E109",
                                msg: "Please request all mendatory feild..!"
                            })
                        }
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })




/////GET YOUR POST 
router.route("/EditPost")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var SocialPostData = await SocialPost.findOne({ _id: mongoose.Types.ObjectId(req.body.postId) });

                        if (SocialPostData == null) {
                            res.json({
                                status: false,
                                data: SocialPostData,
                                msg: "No Post found!"
                            })
                        } else {
                            res.json({
                                status: true,
                                data: SocialPostData,
                                msg: "Your Post Fetched successfully.."
                            })
                        }
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })

/////DELETE YOUR POST 
router.route("/DeletePost")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var SocialPostData = await SocialPost.deleteOne({ _id: mongoose.Types.ObjectId(req.body.postId) });

                        if (SocialPostData == null) {
                            res.json({
                                status: false,
                                data: SocialPostData,
                                msg: "No Post found!"
                            })
                        } else {
                            res.json({
                                status: true,
                                data: SocialPostData,
                                msg: "Your Post Deleted successfully.."
                            })
                        }
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })

////////////////////////   FOLLOWERS AND FOLLOWING SECTION///////////////////////////////////


/////SEND FOLLOWING REQUEST
router.route("/sendFollowRequest")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var errorArray = []
                        if (!validator.isMongoId(req.body.reqUserId)) {
                            msg = "Invalid requested UserId, please try again";
                            errorArray.push(msg);
                        }
                        if (errorArray.length == 0) {
                            var RequestedUserInfo = await UsersSchema.findOne({ _id: mongoose.Types.ObjectId(req.body.reqUserId) });
                            var Req_obj = {
                                f_req_accp_UserId: _id,
                                f_userId: req.body.reqUserId,
                                f_name: result[0].f_name + ' ' + result[0].l_name,
                                f_email: result[0].f_email,
                                f_TypeMsg: "Follower",
                                f_statusMsg: "Pending",
                                f_picture: result[0].f_picture,
                                f_type: 0, //0-Pending, 1-Accepted, 2-Remove, 3-Block
                                updatedDate: Date.now(),
                                createdDate: Date.now(),
                                status: true
                            }

                            var Acc_obj = {
                                f_req_accp_UserId: req.body.reqUserId,
                                f_userId: _id,
                                f_name: RequestedUserInfo.f_name + ' ' + RequestedUserInfo.l_name,
                                f_email: RequestedUserInfo.f_email,
                                f_picture: RequestedUserInfo.f_picture,
                                f_type: 0, //0-Pending, 1-Accepted, 2-Remove, 3-Block
                                f_TypeMsg: "Following",
                                f_statusMsg: "Requested",
                                createdDate: Date.now(),
                                updatedDate: Date.now(),
                                status: true
                            }
                            console.log(Req_obj);
                            console.log(Acc_obj);
                            FollowSchema.create(Acc_obj, (err, insertRes) => {
                                if (err) {
                                    console.log("Err in creating Folloeung " + err);
                                    res.json({
                                        status: false,
                                        code: "E111",
                                        msg: userFunctions.mongooseErrorHandle(err)
                                    })
                                } else if (insertRes != null && insertRes != '') {
                                    //send email otp
                                    // if (result == true) {
                                    FollowSchema.create(Req_obj, (err1, insertRes1) => {

                                        if (err1) {
                                            console.log("Err in creating Folloeung " + err1);
                                            res.json({
                                                status: false,
                                                code: "E111",
                                                msg: userFunctions.mongooseErrorHandle(err)
                                            })
                                        } else {
                                            res.json({
                                                status: true,
                                                msg: "Follow request sent..!",
                                                id: [insertRes._id, insertRes1._id],
                                            })
                                        }
                                    })

                                }
                            })
                        } else {
                            res.json({
                                status: false,
                                code: "E130",
                                msg: errorArray
                            })
                        }

                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })



//////ACCEPT FRIEND REQUEST//////////
router.route("/acceptFollowRequest")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var errorArray = []
                        // if (!validator.isMongoId(req.body.reqUserId)) {
                        //     msg = "Invalid requested UserId, please try again";
                        //     errorArray.push(msg);
                        // }
                        if (!validator.isMongoId(req.body.reqFollowId)) {
                            msg = "Invalid requested FollowId, please try again";
                            errorArray.push(msg);
                        }
                        if (errorArray.length == 0) {
                            //    var RequestedUserInfo = await UsersSchema.findOne({ _id: mongoose.Types.ObjectId(req.body.reqUserId) });
                            var Req_obj = {
                                f_type: 1, //0-Pending, 1-Accepted, 2-Remove, 3-Block
                                f_statusMsg: "Accepted",
                                updatedDate: Date.now(),
                            }

                            FollowSchema.findByIdAndUpdate(req.body.reqFollowId, {
                                $set: Req_obj
                            }, {
                                new: true
                            }, (err, insertRes) => {
                                // FollowSchema.create(Req_obj, (err, insertRes) => {
                                if (err) {
                                    console.log("Err in creating Folloeung " + err);
                                    res.json({
                                        status: false,
                                        code: "E111",
                                        msg: userFunctions.mongooseErrorHandle(err)
                                    })
                                } else if (insertRes != null && insertRes != '') {

                                    res.json({
                                        status: true,
                                        msg: "Follow request accepted!",
                                        data: Req_obj
                                    })
                                }
                            })
                        } else {
                            res.json({
                                status: false,
                                code: "E130",
                                msg: errorArray
                            })
                        }

                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


//////ACCEPT FRIEND REQUEST//////////
router.route("/cancelFollowRequest")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var errorArray = []
                        // if (!validator.isMongoId(req.body.reqUserId)) {
                        //     msg = "Invalid requested UserId, please try again";
                        //     errorArray.push(msg);
                        // }
                        if (!validator.isMongoId(req.body.reqFollowId)) {
                            msg = "Invalid requested FollowId, please try again";
                            errorArray.push(msg);
                        }
                        if (errorArray.length == 0) {
                            var cancelFollowRequest = await FollowSchema.remove({ _id: mongoose.Types.ObjectId(req.body.reqUserId) });
                            // var Req_obj = {
                            //     f_type: 2, //0-Pending, 1-Accepted, 2-Remove, 3-Block
                            //     f_statusMsg: "Accepted",
                            //     updatedDate: Date.now(),
                            // }

                            // FollowSchema.findByIdAndUpdate(req.body.reqFollowId, {
                            //     $set: Req_obj
                            // }, {
                            //     new: true
                            // }, (err, insertRes) => {
                            //     // FollowSchema.create(Req_obj, (err, insertRes) => {
                            //     if (err) {
                            //         console.log("Err in creating Folloeung " + err);
                            //         res.json({
                            //             status: false,
                            //             code: "E111",
                            //             msg: userFunctions.mongooseErrorHandle(err)
                            //         })
                            //     } else if (insertRes != null && insertRes != '') {

                            res.json({
                                status: true,
                                msg: "Follow request cancel!",
                                data: cancelFollowRequest
                            })
                            //     }
                            // })
                        } else {
                            res.json({
                                status: false,
                                code: "E130",
                                msg: errorArray
                            })
                        }

                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


//////GET MY FOLLOWS AND FOLLOWRS FRIEND REQUEST//////////
router.route("/fetchMyFollowsDetails")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {

                        var MyFollowers = await FollowSchema.find({ f_userId: mongoose.Types.ObjectId(_id), "f_TypeMsg": "Follower", "f_statusMsg": "Accepted", "f_type": 1, "status": true });

                        var MyFollowing = await FollowSchema.find({ f_userId: mongoose.Types.ObjectId(_id), "f_TypeMsg": "Following", "f_statusMsg": "Requested", "f_type": 0, "status": true });

                        var MyPendingRequests = await FollowSchema.find({ f_userId: mongoose.Types.ObjectId(_id), "f_TypeMsg": "Follower", "f_statusMsg": "Pending", "f_type": 0, "status": true });

                        res.json({
                            status: true,
                            msg: "Follows details fetched successful...!",
                            data: {
                                "MyFollowers": {
                                    count: MyFollowers.length,
                                    data: MyFollowers,
                                },
                                "MyFollowing": {
                                    count: MyFollowing.length,
                                    data: MyFollowing
                                },
                                "MyPendingRequests": {
                                    count: MyPendingRequests.length,
                                    data: MyPendingRequests
                                }
                            }
                        });
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })




//////GET Records of users//////////
router.route("/fetchUserProfileData")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {

                        var MyFollowers = await FollowSchema.find({ f_userId: _id, "f_TypeMsg": "Follower", "f_statusMsg": "Accepted", "f_type": 1, "status": true });

                        var MyFollowing = await FollowSchema.find({ f_userId: _id, "f_TypeMsg": "Following", "f_statusMsg": "Requested", "f_type": 0, "status": true });

                        var MyPendingRequests = await FollowSchema.find({ f_userId: _id, "f_TypeMsg": "Follower", "f_statusMsg": "Pending", "f_type": 0, "status": true });

                        var SocialUserImage = await SocialPost.find({ f_userId: _id }).select({ f_postImages: 1 }).sort({ _id: -1 })

                        var UserExists = await SocialPost.findOne({ f_userId: _id, f_req_accp_UserId: reqUserId }).select({ f_postImages: 1 }).sort({ _id: -1 })
                        res.json({
                            status: true,
                            msg: "Follows details fetched successful...!",
                            data: {
                                "MyFollowers": {
                                    count: MyFollowers.length,
                                    data: MyFollowers,
                                },
                                "MyFriends": {
                                    count: MyFollowing.length,
                                    data: MyFollowing
                                },
                                "MyPendingRequests": {
                                    count: MyPendingRequests.length,
                                    data: MyPendingRequests
                                },
                                "MyPhotos": {
                                    count: SocialUserImage.length,
                                    data: SocialUserImage
                                },
                                "userInfo": result[0]
                            }
                        });
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


//////GET PROFILE DATA by email/////////
router.route("/fetchUserProfileDataByEmailId")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {

                        var MyFollowers = await FollowSchema.find({ f_email: req.body.f_email, "f_TypeMsg": "Follower", "f_statusMsg": "Accepted", "f_type": 1, "status": true });

                        var MyFollowing = await FollowSchema.find({ f_email: req.body.f_email, "f_TypeMsg": "Following", "f_statusMsg": "Requested", "f_type": 0, "status": true });

                        var MyPendingRequests = await FollowSchema.find({ f_email: req.body.f_email, "f_TypeMsg": "Follower", "f_statusMsg": "Pending", "f_type": 0, "status": true });

                        var SocialUserImage = await SocialPost.find({ f_username: req.body.f_email }).select({ f_postImages: 1 }).sort({ _id: -1 })
                        var UserInfo = await UsersSchema.find({ f_email: req.body.f_email }).select({ f_shipping_Address: 0 }).sort({ _id: -1 })

                        res.json({
                            status: true,
                            msg: "Follows details fetched successful...!",
                            data: {
                                "MyFollowers": {
                                    count: MyFollowers.length,
                                    data: MyFollowers,
                                },
                                "MyFriends": {
                                    count: MyFollowing.length,
                                    data: MyFollowing
                                },
                                "MyPendingRequests": {
                                    count: MyPendingRequests.length,
                                    data: MyPendingRequests
                                },
                                "MyPhotos": {
                                    count: SocialUserImage.length,
                                    data: SocialUserImage
                                },
                                "userInfo": UserInfo
                            }
                        });
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


//////GET Records of users//////////
router.route("/fetchUserProfileDataByUSerId")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            let reqUserId = userFunctions.santizeInput(req.body.reqUserId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {

                        var MyFollowers = await FollowSchema.find({ f_req_accp_UserId: reqUserId, "f_TypeMsg": "Follower", "f_statusMsg": "Accepted", "f_type": 1, "status": true });

                        var MyFollowing = await FollowSchema.find({ f_req_accp_UserId: reqUserId, "f_TypeMsg": "Following", "f_statusMsg": "Requested", "f_type": 0, "status": true });

                        var MyPendingRequests = await FollowSchema.find({ f_req_accp_UserId: reqUserId, "f_TypeMsg": "Follower", "f_statusMsg": "Pending", "f_type": 0, "status": true });

                        var SocialUserImage = await SocialPost.find({ f_req_accp_UserId: reqUserId }).select({ f_postImages: 1 }).sort({ _id: -1 })

                        var UserExists = await FollowSchema.findOne({ f_userId: _id, f_req_accp_UserId: req.body.reqUserId }).select({ f_statusMsg: 1, _id: 0 });
                        var f_status = ""
                        if (UserExists != null) {
                            f_status = UserExists.f_statusMsg
                        } else {
                            f_status = "notExists"
                        }

                        var UserInfo = await UsersSchema.find({ _id: mongoose.Types.ObjectId(req.body.reqUserId) }).select({ f_shipping_Address: 0 }).sort({ _id: -1 })
                        // if(UserExists==null){
                        //     console.log("coming");
                        // }
                        res.json({
                            status: true,
                            msg: "Follows details fetched successful...!",
                            data: {
                                "MyFollowers": {
                                    count: MyFollowers.length,
                                    data: MyFollowers,
                                },
                                "MyFriends": {
                                    count: MyFollowing.length,
                                    data: MyFollowing
                                },
                                "MyPendingRequests": {
                                    count: MyPendingRequests.length,
                                    data: MyPendingRequests
                                },
                                "MyPhotos": {
                                    count: SocialUserImage.length,
                                    data: SocialUserImage
                                },
                                "UserExists": {
                                    status: f_status
                                },
                                "userInfo": UserInfo

                            }
                        });
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


//////GET MY FOLLOWS AND FOLLOWRS FRIEND REQUEST//////////
router.route("/saveAnyPost")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var errorArray = []
                        if (req.body.postId != null) {
                            if (!validator.isMongoId(req.body.postId)) {
                                msg = "Invalid Post ID";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {
                                var GetPostByPostID = await SocialPost.findOne({ _id: mongoose.Types.ObjectId(req.body.postId) });
                                if (GetPostByPostID) {
                                    var obj = {
                                        f_postID: GetPostByPostID._id,
                                        f_post: GetPostByPostID.f_post,
                                        f_userId: GetPostByPostID.f_userId,
                                        f_groupId: GetPostByPostID.f_groupId,
                                        f_username: GetPostByPostID.f_username,
                                        f_name: GetPostByPostID.f_name,
                                        f_user_picture: GetPostByPostID.f_user_picture,
                                        f_postImages: GetPostByPostID.f_postImages,
                                        f_postLocation: GetPostByPostID.f_postLocation,
                                        f_postTag: GetPostByPostID.f_postTag,
                                        f_postLike: GetPostByPostID.f_postLike,
                                        f_postComment: GetPostByPostID.f_postComment,

                                    }
                                    SavePostSchema.create(obj, (err, insertRes) => {
                                        if (err) {
                                            console.log("Err in creating post " + err);
                                            res.json({
                                                status: false,
                                                code: "E111",
                                                msg: userFunctions.mongooseErrorHandle(err)
                                            })
                                        } else if (insertRes != null && insertRes != '') {
                                            //send email otp
                                            // if (result == true) {
                                            res.json({
                                                status: true,
                                                msg: "Post saved!",
                                                data: insertRes._id
                                            });
                                        }

                                    })

                                } else {
                                    res.json({
                                        status: false,
                                        msg: "No posts found!",
                                        data: GetPostByPostID
                                    });
                                }
                            } else {
                                res.json({
                                    status: false,
                                    msg: "Something went erong, try again!",
                                    data: errorArray
                                });
                            }
                        }
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


router.route("/MySavedPost")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {

                        var GetPostByPostID = await SavePostSchema.find({ f_userId: _id });
                        if (GetPostByPostID) {
                            res.json({
                                status: true,
                                msg: "All saved post fetched successfully",
                                data: GetPostByPostID
                            });
                        } else {
                            res.json({
                                status: false,
                                msg: "No Post found",
                                code: "E123"
                            });
                        }
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })

router.route("/deleteSavedPostByID")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var errorArray = []
                        if (req.body.postId != null) {
                            if (!validator.isMongoId(req.body.postId)) {
                                msg = "Invalid Post ID";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {
                                var PagePostDelete = await SavePostSchema.deleteOne({ _id: mongoose.Types.ObjectId(req.body.postId) });

                                if (PagePostDelete == null) {
                                    res.json({
                                        status: false,
                                        data: PagePostDelete,
                                        msg: "No Post found!"
                                    })
                                } else {
                                    res.json({
                                        status: true,
                                        data: PagePostDelete,
                                        msg: "Your Post Deleted successfully.."
                                    })
                                }
                            } else {
                                res.json({
                                    status: false,
                                    msg: "Something went erong, try again!",
                                    data: errorArray
                                });
                            }
                        }
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })

//////UPLOAD PROFILE PIC//////////
router.route("/UploadProfilePic")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            var url = 'http://docs.hyprweb.com'// req.get('host')
            //let username = userFunctions.santizeInput(req.body.username);
            //    console.log(_id);
            //  console.log(req.files);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {

                        var image_name = "";
                        var finalName = "";
                        if (req.files != null) {
                            if (!fs.existsSync(`${filePathSocail}//${_id}`)) {
                                fs.mkdirSync(`${filePathSocail}//${_id}`);
                            }
                            Object.keys(req.files).forEach(function (item) {
                                //console.log(req.files[item].name)
                                var file = req.files[item];
                                image_name = Date.now() + '-' + req.files[item].name;
                                finalName = `${url}/SocialMediaDocs/${_id}/${image_name}`
                                file.mv(`${filePathSocail}/${_id}/${image_name}`, async (err) => {
                                    if (err) throw err;
                                });
                            })
                        }
                        UsersSchema.findByIdAndUpdate(_id, {
                            $set: {
                                f_picture: finalName
                            }
                        }, {
                            new: true
                        }, (err, updatedDocs) => {
                            res.json({
                                status: true,
                                msg: "Profile Pic Uploaded",
                                data: finalName
                            })
                        })
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


////// UPLOAD COVER PIC//////////
router.route("/UploadCoverPic")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            var url = 'http://docs.hyprweb.com'// req.get('host'))
            //let username = userFunctions.santizeInput(req.body.username);
            //    console.log(_id);
            //  console.log(req.files);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {

                        var image_name = "";
                        var finalName = "";
                        if (req.files != null) {
                            if (!fs.existsSync(`${filePathSocail}//${_id}`)) {
                                fs.mkdirSync(`${filePathSocail}//${_id}`);
                            }
                            Object.keys(req.files).forEach(function (item) {
                                //console.log(req.files[item].name)
                                var file = req.files[item];
                                image_name = Date.now() + '-' + req.files[item].name;
                                finalName = `${url}/SocialMediaDocs/${_id}/${image_name}`
                                file.mv(`${filePathSocail}/${_id}/${image_name}`, async (err) => {
                                    if (err) throw err;
                                });
                            })
                        }
                        UsersSchema.findByIdAndUpdate(_id, {
                            $set: {
                                f_coverPic: finalName
                            }
                        }, {
                            new: true
                        }, (err, updatedDocs) => {
                            res.json({
                                status: true,
                                msg: "Profile Pic Uploaded",
                                data: finalName
                            })
                        })
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


router.route("/UploadSocialMediaPic")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            var url = 'http://docs.hyprweb.com'// req.get('host')
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(url);
            //  console.log(req.files);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        console.log(req.files);
                        var image_name = "";
                        var finalName = []
                        if (req.files != null) {
                            if (!fs.existsSync(`${filePathSocail}//${_id}`)) {
                                fs.mkdirSync(`${filePathSocail}//${_id}`);
                            }
                            console.log(Object.keys(req.files).length);
                            var imgLength = Object.keys(req.files).length
                            if (imgLength <= 5) {
                                Object.keys(req.files).forEach(function (item) {
                                    console.log(req.files[item].name)
                                    var file = req.files[item];
                                    image_name = Date.now() + '-' + req.files[item].name;
                                    finalName.push(`${url}/SocialMediaDocs/${_id}/${image_name}`)
                                    file.mv(`${filePathSocail}/${_id}/${image_name}`, async (err) => {
                                        if (err) throw err;
                                    });
                                })
                                console.log(finalName);
                                res.json({
                                    status: true,
                                    msg: "Social Pic Uploaded",
                                    data: finalName
                                })
                            } else {
                                res.json({
                                    status: false,
                                    msg: "Images lenght should be equal or less than 5",
                                    data: finalName
                                })
                            }


                            // SocialPost.updateOne({ f_userId: "60e482136105ff2fd826e57d" }, {
                            // await SocialPost.updateOne({ f_userId: "60e482136105ff2fd826e57d" }, {
                            //     $set: {
                            //         f_postImages: [`http://${url}/SocialMediaDocs/${_id}/${image_name}`]
                            //     }
                            // }, {
                            //     new: true
                            // }, (err, updatedDocs) => {
                            //     res.json({
                            //         status: true,
                            //         msg: "Social Pic Uploaded",
                            //         data: finalName
                            //     })
                            // })


                        }



                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })


// fetch User Image/////

router.route("/fetchUserImage")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var finalImagesArr = []
                        var SocialUserImage = await SocialPost.find({ f_userId: _id }).select({ f_postImages: 1 }).sort({ _id: -1 })

                        if (SocialUserImage.length == 0) {
                            res.json({
                                status: false,
                                data: SocialPostData,
                                msg: "No Post found!"
                            })
                        } else {
                            // SocialUserImage.forEach(element => {
                            //     element.f_postImages.forEach(item => {
                            //         //console.log(item);
                            //         finalImagesArr.push(item)
                            //     });
                            //     //

                            // });
                            //  console.log(finalImagesArr);
                            // for (let index = 0; index < finalImagesArr.length; index++) {
                            //     const element = finalImagesArr[index];
                            //     console.log(element);

                            // }
                            res.json({
                                status: true,
                                data: SocialUserImage,
                                msg: "All SocialUserImage  fetched successfully.."
                            })
                        }
                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })



// suggestion frind list////

router.route("/donateMoneyForPost")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        console.log(result[0].f_wallet);

                        if (parseInt(req.body.transferAmount) <= result[0].f_wallet) {


                            var UserInfoFrom = await UsersSchema.findOne({ f_email: "hyprweb@gmail.com" });
                            // var result[0] = await UsersSchema.findOne({ f_email: req.user.f_email });
                            var opts = {
                                TransactionAmount: parseInt(req.body.transferAmount),
                                TransactionType: "Credited",
                                Remark: "GET TRANSFER AMOUNT",
                                ByUserId: result[0]._id,
                                // f_orderId: insertRes.f_displayOrderId + '-0' + (sequence + 1),
                                f_userId: UserInfoFrom._id,
                                type : "1",
                                // f_name: UserDetails..f_name,
                                // f_email: UserDetails.f_wallet.f_email,
                                // f_intent: response.body.intent,
                                // f_state: response.body.state,
                                // f_cart: response.body.cart,
                                // f_payerInfo: response.body.payer,
                                // f_transactions: response.body.transactions,
                                createdAt: Date.now()
                            }
                            // console.log(opts);                  
                            await paypalOrderSchema.create(opts, async (err, insertRes) => {
                                if (err) {
                                    console.log("Err in creating order " + err);
                                    res.json({
                                        status: false,
                                        code: "E111",
                                        msg: "Something went wrong"
                                    })
                                } else if (insertRes != null && insertRes != '') {
                                    await UsersSchema.updateOne({ f_email: "hyprweb@gmail.com" }, {
                                        $set: {
                                            f_wallet: parseInt(UserInfoFrom.f_wallet) + parseInt(req.body.transferAmount)
                                        }
                                    })
                                }
                            })




                            var opts = {
                                TransactionAmount: parseInt(req.body.transferAmount),
                                TransactionType: "Debited",
                                Remark: "Transfer Amount",
                                ByUserId: UserInfoFrom._id,
                                //f_orderId: insertRes.f_displayOrderId + '-0' + (sequence + 1),
                                f_userId: result[0]._id,
                                type : "1",
                                // f_name: UserDetails..f_name,
                                // f_email: UserDetails.f_wallet.f_email,
                                // f_intent: response.body.intent,
                                // f_state: response.body.state,
                                // f_cart: response.body.cart,
                                // f_payerInfo: response.body.payer,
                                // f_transactions: response.body.transactions,
                                createdAt: Date.now()
                            }
                            // console.log(opts);                  
                            await paypalOrderSchema.create(opts, async (err, insertRes) => {
                                if (err) {
                                    console.log("Err in creating order " + err);
                                    res.json({
                                        status: false,
                                        code: "E111",
                                        msg: "Something went wrong"
                                    })
                                } else if (insertRes != null && insertRes != '') {
                                    await UsersSchema.updateOne({ f_email: result[0].f_email }, {
                                        $set: {
                                            f_wallet: parseInt(result[0].f_wallet) - parseInt(req.body.transferAmount)
                                        }
                                    })
                                }
                            })

                            setTimeout(() => {
                                res.json({
                                    status: true,
                                    msg: "Donate finished!"
                                })
                            }, 500);
                        }else{
                            res.json({
                                status: false,
                                msg : "You have insufficient balance to donate"
                            })
                        }

                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })



// suggestion frind list////



router.route("/fetchAllDonation")
.get((req, res, next) => {
    res.json({
        status: false,
        code: "E131",
        msg: "Invalid API"
    })
}).post(async (req, res) => {
    try {
        let _id = userFunctions.santizeInput(req.body.userId);
        if (_id != null) {
            //fetch the username and password from db and check if they match

            UsersSchema.find({
                _id: mongoose.Types.ObjectId(_id),
            }, {
                __v: 0,
                createdAt: 0,
                password: 0,
                updatedAt: 0
            }, async (err, result) => {
                // console.log(result);
                if (err) {
                    console.log("Error in user.find login " + err);
                    res.json({
                        status: false,
                        msg: userFunctions.mongooseErrorHandle(err),
                        code: "E130"
                    });
                } else if (result == null || result == undefined || result == '') {
                    res.json({
                        status: false,
                        msg: "There is no account associated with this Userid, Pls login first!",
                        code: "E123"
                    });
                } else {

                    var paypalOrder = await paypalOrderSchema.find({f_userId: _id,type:"1"}).sort({ _id: -1 })

                    res.json({
                        status: true,
                        msg: "Group List fetched by User",
                        data: paypalOrder
                    })

                }


            })
        }

    } catch (e) {
        console.log("Catch in usersignup api " + e);
        res.json({
            status: false,
            code: "E109",
            msg: genericErrorMessage
        })
    }

})




router.route("/fetchAllDonationOne")
.get((req, res, next) => {
    res.json({
        status: false,
        code: "E131",
        msg: "Invalid API"
    })
}).post(async (req, res) => {
    try {
        let _id = userFunctions.santizeInput(req.body.userId);
        if (_id != null) {
            //fetch the username and password from db and check if they match

            UsersSchema.find({
                _id: mongoose.Types.ObjectId(_id),
            }, {
                __v: 0,
                createdAt: 0,
                password: 0,
                updatedAt: 0
            }, async (err, result) => {
                // console.log(result);
                if (err) {
                    console.log("Error in user.find login " + err);
                    res.json({
                        status: false,
                        msg: userFunctions.mongooseErrorHandle(err),
                        code: "E130"
                    });
                } else if (result == null || result == undefined || result == '') {
                    res.json({
                        status: false,
                        msg: "There is no account associated with this Userid, Pls login first!",
                        code: "E123"
                    });
                } else {

                    var paypalOrder = await paypalOrderSchema.findOne({ _id: mongoose.Types.ObjectId(req.body.donationId) }).sort({ _id: -1 })

                    res.json({
                        status: true,
                        msg: "Group List fetched by User",
                        data: paypalOrder
                    })

                }


            })
        }

    } catch (e) {
        console.log("Catch in usersignup api " + e);
        res.json({
            status: false,
            code: "E109",
            msg: genericErrorMessage
        })
    }

})
router.route("/suggestionFriends")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            //let username = userFunctions.santizeInput(req.body.username);
            console.log(req.body);
            if (_id != null) {
                //fetch the username and password from db and check if they match

                UsersSchema.find({
                    _id: mongoose.Types.ObjectId(_id),
                }, {
                    __v: 0,
                    createdAt: 0,
                    password: 0,
                    updatedAt: 0
                }, async (err, result) => {
                    // console.log(result);
                    if (err) {
                        console.log("Error in user.find login " + err);
                        res.json({
                            status: false,
                            msg: userFunctions.mongooseErrorHandle(err),
                            code: "E130"
                        });
                    } else if (result == null || result == undefined || result == '') {
                        res.json({
                            status: false,
                            msg: "There is no account associated with this Userid, Pls login first!",
                            code: "E123"
                        });
                    } else {
                        var suggestionList = []
                        var allUserList = await UsersSchema.find({}).select({ f_name: 1, l_name: 1, f_email: 1, f_username: 1, f_picture: 1 }).sort({ _id: -1 })
                        allUserList.forEach(async element => {
                            var isExistsReq = await FollowSchema.find({ "f_statusMsg": { $ne: "Requested" }, "f_statusMsg": { $ne: "Pending" }, "f_statusMsg": { $ne: "Accepted" }, f_userId: _id, f_req_accp_UserId: element._id });
                            console.log(isExistsReq);

                        });
                        setTimeout(() => {
                            console.log(suggestionList);
                            res.json({
                                status: true,
                                data: suggestionList,
                                userList: allUserList,
                                msg: "All Suggestion Friend List  fetched successfully.."
                            })
                        }, 1500);

                    }
                })
            }

        } catch (e) {
            console.log("Catch in usersignup api " + e);
            res.json({
                status: false,
                code: "E109",
                msg: genericErrorMessage
            })
        }

    })




module.exports = router;