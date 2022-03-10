var express = require('express');
var router = express.Router();
// var fs = require(fs)
const userFunctions = require('../../shared/functions');
var { filePathSocail } = require('../../config/dir');
// const pageSchema = require('../../model/socialModel/pageSchema');


/// USER LOGIN FOR SOCIAL MEDIA
router.route("/createGroup")
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
                    //   console.log(result);
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
                        let options = {
                            f_userId: _id,
                            f_name: result[0].f_name + ' ' + result[0].l_name,
                            f_email: result[0].f_email,
                            f_picture: result[0].f_picture,
                            f_GroupName: req.body.f_GroupName,
                            f_GroupPrivacy: 0,  //0-->public, 1-->Private
                            f_GroupCoverPic: req.body.f_GroupCoverPic,
                            f_GroupProfilePic: req.body.f_GroupProfilePic,
                            f_GroupAbout: req.body.f_GroupAbout,
                            f_GroupDesciption: req.body.f_GroupDesciption,
                            f_MemberCount: 1,
                            f_GroupRole: [],
                            f_status: true

                        }
                        console.log(options);
                        if (req.body.f_GroupName != null && req.body.f_GroupName != null && req.body.f_GroupPrivacy != null && req.body.f_GroupPrivacy != null) {
                            GroupsSchema.create(options, (err, insertRes) => {
                                if (err) {
                                    console.log("Err in creating group " + err);
                                    res.json({
                                        status: false,
                                        code: "E111",
                                        msg: userFunctions.mongooseErrorHandle(err)
                                    })
                                } else if (insertRes != null && insertRes != '') {
                                    res.json({
                                        status: true,
                                        msg: "New group created successfull!",
                                        data: insertRes
                                    })
                                }

                            })
                        } else {
                            res.json({
                                status: false,
                                code: "E101",
                                msg: "Please fill mandatory field(s)"
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

//////UPLOAD Groups PIC//////////
router.route("/UploadGroupMedia")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131",
            msg: "Invalid API"
        })
    }).post(async (req, res) => {
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            var url = 'http://docs.hyprweb.com'
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
                        var finalName = ""
                        if (req.files != null) {
                            if (!fs.existsSync(`${filePathSocail}//${_id}`)) {
                                fs.mkdirSync(`${filePathSocail}//${_id}`);
                            }
                            Object.keys(req.files).forEach(function (item) {
                                console.log(req.files[item].name)
                                var file = req.files[item];
                                image_name = Date.now() + '-' + req.files[item].name;
                                finalName = `${url}/SocialMediaDocs/${_id}/${image_name}`
                                file.mv(`${filePathSocail}/${_id}/${image_name}`, async (err) => {
                                    if (err) throw err;
                                });
                            })

                            res.json({
                                status: true,
                                msg: "Group Media Uploaded",
                                data: finalName
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


//////UPLOAD Groups PIC//////////
router.route("/fetchUserAllGroups")
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

                        var groupList = await GroupsSchema.find({ f_userId: _id }).sort({ _id: -1 })

                        res.json({
                            status: true,
                            msg: "Group List fetched by User",
                            data: groupList
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






////// GET Comment ON POSTS
router.route("/getGroupPostComment")
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
                                var postComment = await GroupPost.findOne({ _id: mongoose.Types.ObjectId(post_id) }).select({ f_postComment: 1 })

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



/// Create Page///



router.route("/createPage")
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
                    //   console.log(result);
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
                        let options = {
                            f_userId: _id,
                            f_name: result[0].f_name + ' ' + result[0].l_name,
                            f_email: result[0].f_email,
                            f_picture: result[0].f_picture,
                            f_PageName: req.body.f_PageName,
                            f_PagePrivacy: 0,  //0-->public, 1-->Private
                            f_PageCoverPic: req.body.f_PageCoverPic,
                            f_PageProfilePic: req.body.f_PageProfilePic,
                            f_PageAbout: req.body.f_PageAbout,
                            f_PageDesciption: req.body.f_PageDesciption,
                            f_MemberCount: 1,
                            f_PageRole: [],
                            f_status: true

                        }
                        console.log(options);
                        if (req.body.f_PageName != null && req.body.f_PageName != null && req.body.f_PagePrivacy != null && req.body.f_PagePrivacy != null) {
                            PageSchema.create(options, (err, insertRes) => {
                                if (err) {
                                    console.log("Err in creating group " + err);
                                    res.json({
                                        status: false,
                                        code: "E111",
                                        msg: userFunctions.mongooseErrorHandle(err)
                                    })
                                } else if (insertRes != null && insertRes != '') {
                                    res.json({
                                        status: true,
                                        msg: "New group created successfull!",
                                        data: insertRes
                                    })
                                }

                            })
                        } else {
                            res.json({
                                status: false,
                                code: "E101",
                                msg: "Please fill mandatory field(s)"
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




router.route("/fetchAllPages")
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

                        var pageList = await PageSchema.find({ f_userId: _id }).sort({ _id: -1 })

                        res.json({
                            status: true,
                            msg: "Page List fetched by User",
                            data: pageList
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



router.route("/fetchgrouppostByUserId")
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
                        var GroupPostData = await GroupPost.find({ f_userId: _id }).sort({ _id: -1 });

                        if (GroupPostData.length == 0) {
                            res.json({
                                status: false,
                                data: GroupPostData,
                                msg: "No Post found!"
                            })
                        } else {
                            res.json({
                                status: true,
                                data: GroupPostData,
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


// /SUBMIT POST
router.route("/groupNewPost")
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
                            f_groupId: req.body.groupId,
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
                        GroupPost.create(options, (err, insertRes) => {
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





////// ADDD SHARE ON POSTS
router.route("/SharegroupPost")
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
                                await GroupPost.updateOne({ _id: mongoose.Types.ObjectId(post_id) }, {
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




router.route("/pageNewPost")
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
                            f_pageId: req.body.f_pageId,
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
                        PagePost.create(options, (err, insertRes) => {
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



router.route("/fetchpagepostByUserId")
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
                        var PagePostData = await PagePost.find({ f_userId: _id }).sort({ _id: -1 });

                        if (PagePostData.length == 0) {
                            res.json({
                                status: false,
                                data: PagePostData,
                                msg: "No Post found!"
                            })
                        } else {
                            res.json({
                                status: true,
                                data: PagePostData,
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


////  addlikeGroupOnpost Api ////

router.route("/AddLikeGroupOnPost")
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
                                var IsLiked = await GroupPost.findOne({ _id: mongoose.Types.ObjectId(post_id), "f_postLike.userId": _id });
                                console.log(IsLiked);
                                if (IsLiked == null) {
                                    await GroupPost.updateOne({ _id: mongoose.Types.ObjectId(post_id) }, {
                                        $push: {
                                            f_postLike: [{
                                                _id: mongoose.Types.ObjectId(),
                                                userId: _id,
                                                name: result[0].f_name + ' ' + result[0].l_name,
                                                email: result[0].f_email,
                                                userDP: result[0].f_picture,
                                                likeAt: new Date()
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




////// ADDD Comment Group ON POSTS
router.route("/AddCommentGroupOnPost")
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
                                await GroupPost.updateOne({ _id: mongoose.Types.ObjectId(post_id) }, {
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



////  addlikePageOnpost Api ////

router.route("/AddLikePageOnPost")
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
                                var IsLiked = await PagePost.findOne({ _id: mongoose.Types.ObjectId(post_id), "f_postLike.userId": _id });
                                console.log(IsLiked);
                                if (IsLiked == null) {
                                    await PagePost.updateOne({ _id: mongoose.Types.ObjectId(post_id) }, {
                                        $push: {
                                            f_postLike: [{
                                                _id: mongoose.Types.ObjectId(),
                                                userId: _id,
                                                name: result[0].f_name + ' ' + result[0].l_name,
                                                email: result[0].f_email,
                                                userDP: result[0].f_picture,
                                                likeAt: new Date()
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


////// ADD Comment Pages ON POSTS
router.route("/AddCommentPageOnPost")
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
                                await PagePost.updateOne({ _id: mongoose.Types.ObjectId(post_id) }, {
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


////// ADDD SHARE ON POSTS
router.route("/SharePagePost")
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
                                await PagePost.updateOne({ _id: mongoose.Types.ObjectId(post_id) }, {
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






/////DELETE Group YOUR POST 
router.route("/DeleteGroupPost")
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
                        var GroupPostDelete = await GroupPost.deleteOne({ _id: mongoose.Types.ObjectId(req.body.postId) });

                        if (GroupPostDelete == null) {
                            res.json({
                                status: false,
                                data: GroupPostDelete,
                                msg: "No Post found!"
                            })
                        } else {
                            res.json({
                                status: true,
                                data: GroupPostDelete,
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




/////DELETE Page YOUR POST 
router.route("/DeletePagePost")
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
                        var PagePostDelete = await PagePost.deleteOne({ _id: mongoose.Types.ObjectId(req.body.postId) });

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





/// saveGroupPost///

router.route("/saveGroupPost")
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
                        if (req.body.postId != null) {
                            if (!validator.isMongoId(req.body.postId)) {
                                msg = "Invalid Post ID";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {
                                var SaveGroupPost = await GroupPost.findOne({ _id: mongoose.Types.ObjectId(req.body.postId) });
                                console.log(SaveGroupPost);
                                if (SaveGroupPost) {
                                    var obj = {
                                        f_post: SaveGroupPost.f_post,
                                        f_userId: SaveGroupPost.f_userId,
                                        f_groupId: SaveGroupPost.f_groupId,
                                        f_username: SaveGroupPost.f_username,
                                        f_name: SaveGroupPost.f_name,
                                        f_user_picture: SaveGroupPost.f_user_picture,
                                        f_postImages: SaveGroupPost.f_postImages,
                                        f_postLocation: SaveGroupPost.f_postLocation,
                                        f_postTag: SaveGroupPost.f_postTag,
                                        f_postLike: SaveGroupPost.f_postLike,
                                        f_postComment: SaveGroupPost.f_postComment,

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
                                        data: obj
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








/// savePagePost///

router.route("/savePagePost")
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
                        if (req.body.postId != null) {
                            if (!validator.isMongoId(req.body.postId)) {
                                msg = "Invalid Post ID";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {
                                var SavePagePost = await PagePost.findOne({ _id: mongoose.Types.ObjectId(req.body.postId) });
                                console.log(SavePagePost);
                                if (SavePagePost) {
                                    var obj = {
                                        f_post: SavePagePost.f_post,
                                        f_userId: SavePagePost.f_userId,
                                        f_groupId: SavePagePost.f_groupId,
                                        f_username: SavePagePost.f_username,
                                        f_name: SavePagePost.f_name,
                                        f_user_picture: SavePagePost.f_user_picture,
                                        f_postImages: SavePagePost.f_postImages,
                                        f_postLocation: SavePagePost.f_postLocation,
                                        f_postTag: SavePagePost.f_postTag,
                                        f_postLike: SavePagePost.f_postLike,
                                        f_postComment: SavePagePost.f_postComment,

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
                                        data: obj
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




/////SEND FOLLOWING REQUEST
router.route("/joinedAGroup")
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
                        if (req.body.groupId != null) {


                            var errorArray = []
                            if (!validator.isMongoId(req.body.groupId)) {
                                msg = "Invalid groupId, please try again";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {
                                var groupInfo = await GroupsSchema.findOne({ _id: mongoose.Types.ObjectId(req.body.groupId) });
                                var isExistsRecord = await GroupJoinedSchema.findOne({ f_userId: _id, f_groupId: req.body.groupId })
                                console.log(isExistsRecord);
                                // return
                                if (isExistsRecord == null) {


                                    var Req_obj = {
                                        f_userId: _id,
                                        f_groupId: req.body.groupId,
                                        f_groupName: groupInfo.f_GroupName,
                                        f_name: result[0].f_name + ' ' + result[0].l_name,
                                        f_email: result[0].f_email,
                                        f_TypeMsg: "Accepted",
                                        f_statusMsg: "Accepted",
                                        f_picture: result[0].f_picture,
                                        f_type: 1, //0-Pending, 1-Accepted, 2-Remove, 3-Block
                                        updatedDate: Date.now(),
                                        createdDate: Date.now(),
                                        status: true
                                    }



                                    //send email otp
                                    // if (result == true) {
                                    GroupJoinedSchema.create(Req_obj, (err1, insertRes1) => {

                                        if (err1) {
                                            console.log("Err in creating join " + err1);
                                            res.json({
                                                status: false,
                                                code: "E111",
                                                msg: userFunctions.mongooseErrorHandle(err)
                                            })
                                        } else {
                                            res.json({
                                                status: true,
                                                msg: "You have joined group!",
                                                id: insertRes1._id,
                                            })
                                        }
                                    })
                                } else {
                                    res.json({
                                        status: false,
                                        code: "E130",
                                        msg: "You already joined in this group!!"
                                    })
                                }

                            } else {
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
                                msg: "Group Id can't be blank or null"
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



/////INVITE A GROUp
router.route("/inviteForJoinGroup")
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
                        if (req.body.groupId != null && req.body.requserId != null) {


                            var errorArray = []
                            if (!validator.isMongoId(req.body.groupId)) {
                                msg = "Invalid groupId, please try again";
                                errorArray.push(msg);
                            }
                            if (!validator.isMongoId(req.body.requserId)) {
                                msg = "Invalid requserId, please try again";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {

                                var isExistsRecord = await GroupJoinedSchema.findOne({ f_userId: _id, f_groupId: req.body.groupId })
                                console.log(isExistsRecord);
                                // return
                                if (isExistsRecord == null) {

                                    var groupInfo = await GroupsSchema.findOne({ _id: mongoose.Types.ObjectId(req.body.groupId) });
                                    var reqUserInfo = await UsersSchema.findOne({ _id: mongoose.Types.ObjectId(req.body.requserId) });
                                    var Req_obj = {
                                        f_userId: req.body.requserId,
                                        f_groupId: req.body.groupId,
                                        f_groupName: groupInfo.f_GroupName,
                                        f_name: reqUserInfo.f_name + ' ' + reqUserInfo.l_name,
                                        f_email: reqUserInfo.f_email,
                                        f_TypeMsg: "Invited",
                                        f_statusMsg: "Pending",
                                        f_picture: reqUserInfo.f_picture,
                                        f_type: 0, //0-Pending, 1-Accepted, 2-Remove, 3-Block
                                        updatedDate: Date.now(),
                                        createdDate: Date.now(),
                                        status: true
                                    }



                                    //send email otp
                                    // if (result == true) {
                                    GroupJoinedSchema.create(Req_obj, (err1, insertRes1) => {

                                        if (err1) {
                                            console.log("Err in creating join " + err1);
                                            res.json({
                                                status: false,
                                                code: "E111",
                                                msg: userFunctions.mongooseErrorHandle(err)
                                            })
                                        } else {
                                            res.json({
                                                status: true,
                                                msg: "You have joined group!",
                                                id: insertRes1._id,
                                            })
                                        }
                                    })
                                } else {
                                    res.json({
                                        status: false,
                                        code: "E130",
                                        msg: "You already joined in this group!!"
                                    })
                                }


                            } else {
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
                                msg: "Group Id or requserId can't be blank or null"
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





////ACCEPT INVITATION


router.route("/acceptInvitationGroup")
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
                        if (req.body.groupId != null) {


                            var errorArray = []
                            if (!validator.isMongoId(req.body.groupId)) {
                                msg = "Invalid groupId, please try again";
                                errorArray.push(msg);
                            }
                            // if (!validator.isMongoId(req.body.requserId)) {
                            //     msg = "Invalid requserId, please try again";
                            //     errorArray.push(msg);
                            // }
                            if (errorArray.length == 0) {
                                var Req_obj = {
                                    f_TypeMsg: "Accepted",
                                    f_statusMsg: "Accepted",
                                    f_type: 1, //0-Pending, 1-Accepted, 2-Remove, 3-Block
                                    updatedDate: Date.now()
                                }



                                //send email otp
                                // if (result == true) {
                                GroupJoinedSchema.findByIdAndUpdate(req.body.groupId, {
                                    $set: Req_obj
                                }, {
                                    new: true
                                }, (err1, insertRes) => {

                                    if (err1) {
                                        console.log("Err in creating join " + err1);
                                        res.json({
                                            status: false,
                                            code: "E111",
                                            msg: userFunctions.mongooseErrorHandle(err1)
                                        })
                                    } else {
                                        res.json({
                                            status: true,
                                            msg: "You have accepted invitation group!",
                                            id: insertRes,
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
                        } else {
                            res.json({
                                status: false,
                                code: "E130",
                                msg: "Group Id or requserId can't be blank or null"
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

////fetched group details

router.route("/fetchMyGroupDetails")
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

                        var joinedGroup = await GroupJoinedSchema.find({ f_userId: _id, f_statusMsg: 'Accepted', f_TypeMsg: "Accepted" });
                        var pendingInvitation = await GroupJoinedSchema.find({ f_userId: _id, f_TypeMsg: 'Invited', "f_statusMsg": "Pending" });


                        res.json({
                            status: true,
                            msg: "Group Detailed Fetched Here",
                            data: {
                                PendingGroupInvitation: pendingInvitation,
                                joinedGroup: joinedGroup
                            },
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




///LEKED A Page

router.route("/likedAPage")
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
                        if (req.body.pageId != null) {


                            var errorArray = []
                            if (!validator.isMongoId(req.body.pageId)) {
                                msg = "Invalid pageId, please try again";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {
                                var pageInfo = await PageSchema.findOne({ _id: mongoose.Types.ObjectId(req.body.pageId) });
                                var isExistsRecord = await PageLikedSchema.findOne({ f_userId: _id, f_groupId: req.body.groupId })
                                console.log(pageInfo);
                                // return
                                if (isExistsRecord == null) {


                                    var Req_obj = {
                                        f_userId: _id,
                                        f_pageId: req.body.pageId,
                                        f_pageName: pageInfo.f_PageName,
                                        f_name: result[0].f_name + ' ' + result[0].l_name,
                                        f_email: result[0].f_email,
                                        f_TypeMsg: "Accepted",
                                        f_statusMsg: "Accepted",
                                        f_picture: result[0].f_picture,
                                        f_type: 1, //0-Pending, 1-Accepted, 2-Remove, 3-Block
                                        updatedDate: Date.now(),
                                        createdDate: Date.now(),
                                        status: true
                                    }



                                    //send email otp
                                    // if (result == true) {
                                    PageLikedSchema.create(Req_obj, (err1, insertRes1) => {

                                        if (err1) {
                                            console.log("Err in creating join " + err1);
                                            res.json({
                                                status: false,
                                                code: "E111",
                                                msg: userFunctions.mongooseErrorHandle(err)
                                            })
                                        } else {
                                            res.json({
                                                status: true,
                                                msg: "You have liked page!",
                                                id: insertRes1._id,
                                            })
                                        }
                                    })
                                } else {
                                    res.json({
                                        status: false,
                                        code: "E130",
                                        msg: "You already liked in this page!!"
                                    })
                                }

                            } else {
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
                                msg: "Group Id can't be blank or null"
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




/////INVITE A PAGE
router.route("/inviteForLikePage")
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
                        if (req.body.pageId != null && req.body.requserId != null) {


                            var errorArray = []
                            if (!validator.isMongoId(req.body.pageId)) {
                                msg = "Invalid pageId, please try again";
                                errorArray.push(msg);
                            }
                            if (!validator.isMongoId(req.body.requserId)) {
                                msg = "Invalid requserId, please try again";
                                errorArray.push(msg);
                            }
                            if (errorArray.length == 0) {

                                var isExistsRecord = await PageLikedSchema.findOne({ f_userId: _id, f_pageId: req.body.pageId })
                                console.log(isExistsRecord);
                                // return
                                if (isExistsRecord == null) {

                                    var pageInfo = await PageSchema.findOne({ _id: mongoose.Types.ObjectId(req.body.pageId) });
                                    var reqUserInfo = await UsersSchema.findOne({ _id: mongoose.Types.ObjectId(req.body.requserId) });
                                    var Req_obj = {
                                        f_userId: req.body.requserId,
                                        f_pageId: req.body.pageId,
                                        f_pageName: pageInfo.f_PageName,
                                        f_name: reqUserInfo.f_name + ' ' + reqUserInfo.l_name,
                                        f_email: reqUserInfo.f_email,
                                        f_TypeMsg: "Invited",
                                        f_statusMsg: "Pending",
                                        f_picture: reqUserInfo.f_picture,
                                        f_type: 0, //0-Pending, 1-Accepted, 2-Remove, 3-Block
                                        updatedDate: Date.now(),
                                        createdDate: Date.now(),
                                        status: true
                                    }



                                    //send email otp
                                    // if (result == true) {
                                    PageLikedSchema.create(Req_obj, (err1, insertRes1) => {

                                        if (err1) {
                                            console.log("Err in creating join " + err1);
                                            res.json({
                                                status: false,
                                                code: "E111",
                                                msg: userFunctions.mongooseErrorHandle(err)
                                            })
                                        } else {
                                            res.json({
                                                status: true,
                                                msg: "You sent invitation like request!",
                                                id: insertRes1._id,
                                            })
                                        }
                                    })
                                } else {
                                    res.json({
                                        status: false,
                                        code: "E130",
                                        msg: "You already sent or liked this page!!"
                                    })
                                }


                            } else {
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
                                msg: "Group Id or requserId can't be blank or null"
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




////ACCEPT INVITATION


router.route("/acceptInvitationLike")
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
                        if (req.body.pageId != null) {


                            var errorArray = []
                            if (!validator.isMongoId(req.body.pageId)) {
                                msg = "Invalid pageId, please try again";
                                errorArray.push(msg);
                            }
                            // if (!validator.isMongoId(req.body.requserId)) {
                            //     msg = "Invalid requserId, please try again";
                            //     errorArray.push(msg);
                            // }
                            if (errorArray.length == 0) {
                                var Req_obj = {
                                    f_TypeMsg: "Accepted",
                                    f_statusMsg: "Accepted",
                                    f_type: 1, //0-Pending, 1-Accepted, 2-Remove, 3-Block
                                    updatedDate: Date.now()
                                }



                                //send email otp
                                // if (result == true) {
                                PageLikedSchema.findByIdAndUpdate(req.body.pageId, {
                                    $set: Req_obj
                                }, {
                                    new: true
                                }, (err1, insertRes) => {

                                    if (err1) {
                                        console.log("Err in creating join " + err1);
                                        res.json({
                                            status: false,
                                            code: "E111",
                                            msg: userFunctions.mongooseErrorHandle(err1)
                                        })
                                    } else {
                                        res.json({
                                            status: true,
                                            msg: "You have accepted invitation page!",
                                            id: insertRes,
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
                        } else {
                            res.json({
                                status: false,
                                code: "E130",
                                msg: "Group Id or requserId can't be blank or null"
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

////fetched group details

router.route("/fetchMyPageDetails")
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

                        var LikePage = await PageLikedSchema.find({ f_userId: _id, f_statusMsg: 'Accepted', f_TypeMsg: "Accepted" });
                        var PendingPageInvitation = await PageLikedSchema.find({ f_userId: _id, f_TypeMsg: 'Invited', "f_statusMsg": "Pending" });


                        res.json({
                            status: true,
                            msg: "Page Detailed Fetched Here",
                            data: {
                                PendingPageInvitation: PendingPageInvitation,
                                LikePage: LikePage
                            },
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



////GET YOUR POST 
router.route("/EditGroupPost")
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
                        var GroupPostData = await GroupPost.findOne({ _id: mongoose.Types.ObjectId(req.body.postId) });

                        if (GroupPostData == null) {
                            res.json({
                                status: false,
                                data: GroupPostData,
                                msg: "No Post found!"
                            })
                        } else {
                            res.json({
                                status: true,
                                data: GroupPostData,
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


///GET YOUR POST 
router.route("/EditPagePost")
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
                        var PagePostData = await PagePost.findOne({ _id: mongoose.Types.ObjectId(req.body.postId) });
                        console.log(PagePostData)
                        if (PagePostData == null) {
                            res.json({
                                status: false,
                                data: PagePostData,
                                msg: "No Post found!"
                            })
                        } else {
                            res.json({
                                status: true,
                                data: PagePostData,
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

    // /UPDATE Group POST
router.route("/UpdateGroupPost")
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
                        GroupPost.findByIdAndUpdate(req.body.postId, {
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





 // /UPDATE Page POST
 router.route("/UpdatePagePost")
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
                        PagePost.findByIdAndUpdate(req.body.postId, {
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


module.exports = router;