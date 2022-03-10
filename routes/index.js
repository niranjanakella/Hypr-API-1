var express = require('express');
var router = express.Router();
const userFunctions = require('../shared/functions');
var { filePath } = require('../config/dir')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route("/fetchCountry")
  .get(async (req, res, next) => {
    var countryList = await CountrySchema.find({});
    res.json({
      status: true,
      code: "E131",
      data: countryList
    })
  })

router.route("/fetchStateByCountryId/:countryId")
  .get(async (req, res, next) => {
    var stateList = await StateSchema.find({ CountryID: parseInt(req.params.countryId) });
    res.json({
      status: true,
      code: "E131",
      data: stateList
    })
  })

router.route("/fetchCityByStateId/:stateId")
  .get(async (req, res, next) => {
    console.log(req.params);
    var cityList = await CitySchema.find({ state_id: req.params.stateId });
    res.json({
      status: true,
      code: "E131",
      data: cityList
    })
  })

router.route("/IsPincodeExists")
  .get((req, res, next) => {
    res.json({
      status: false,
      code: "E131"
    })
  }).post(async (req, res) => {
    //var categoryType = await catTypeSchema.find();
    console.log(req.body);
    try {
      let _id = userFunctions.santizeInput(req.body.userId);
      let pincode = userFunctions.santizeInput(req.body.pincode);
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
            console.log(req.body.pincode);
            var pincodeRecord = await PincodeSchema.findOne({ "pincode": parseInt(req.body.pincode) });
            console.log(pincodeRecord)
            if (pincodeRecord != null) {
              res.json({
                status: true,
                msg: "Pincode Exists!",
                data: pincodeRecord
              })
            }
            else {
              res.json({
                status: false,
                msg: "Pincode not Exists!",
                data: pincodeRecord
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

router.route("/getYourRaisedTicket")
  .get((req, res, next) => {
    res.json({
      status: false,
      code: "E131"
    })
  }).post(async (req, res) => {
    //var categoryType = await catTypeSchema.find();
    // console.log(req.body);
    try {
      let _id = userFunctions.santizeInput(req.body.userId);
      // let f_buyerId = userFunctions.santizeInput(req.body.f_buyerId);
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
            // console.log(req.body._Id);
            var helpsupportdata = await helpNsupportSchema.find({ userId: mongoose.Types.ObjectId(_id) });
            console.log(helpsupportdata)
            if (helpsupportdata.length > 0) {
              res.json({
                status: true,
                msg: "Your all Ticket fetched Succefully!",
                data: helpsupportdata
              })
            }
            else {
              res.json({
                status: false,
                msg: "No Ticket found by you!",
                data: helpsupportdata
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

router.route("/submitYourTicket")
  .get((req, res, next) => {
    res.json({
      status: false,
      code: "E131"
    })
  }).post(async (req, res) => {
    //var categoryType = await catTypeSchema.find();
    // console.log(req.body);
    console.log(req.body);

    try {
      let _id = userFunctions.santizeInput(req.body.userId);
      // let f_buyerId = userFunctions.santizeInput(req.body.f_buyerId);
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
            // console.log(req.body._Id);
            var usr = result[0];
            console.log(usr);
            console.log(req.body);
            var img = ''
            var imgName = ''
            if (req.files != null) {
              img = req.files.photo
              imgName = img.name
              imgName = Date.now() + '-' + imgName
              // console.log(img)
              // console.log(imgName)
              // if (!fs.existsSync(`${filePath}\\${usr._id}`)) {
              //     fs.mkdirSync(`${filePath}\\${usr._id}`)
              // }
              img.mv(`${filePath}\\helpsupport\\${imgName}`, function (err, succ) {
                if (err) throw err;
                // res.send('File Uploaded')
              })
            }

            var elps = new helpNsupportSchema({
              f_name: usr.f_name,
              f_email: usr.f_email,
              f_phone: usr.f_phone,
              // helpsupport: req.body.helpsupport,
              issue: req.body.issue,
              Subject: req.body.Subject,
              issue_picture: 'http://docs.hyprweb.com/MyDocs/helpsupport/' + imgName,
              userId: usr._id,
              ticketStatus: 'Pending',
              Message: [{
                ReplyBy: 'user',
                replyMsg: req.body.ticketMsg,
                replyDate: Date.now()
              }],
              status: true
            })
            var sshelpsupport = await elps.save();
            // console.log(sshelpsupport)
            db.collection('t_mailtemplet').find({ f_sno: '4411' }).toArray(function (EmailErr, Emailresult) {
              if (EmailErr) throw EmailErr;

              var transporter = nodemailer.createTransport({
                service: 'gmail.com',
                host: 'smtp.gmail.com',
                auth: {
                  user: 'alamarbaj1920@gmail.com',
                  pass: 'arbajalam7379012070'
                }
              });
              // const email_payment_logo = await db.collection('t_seller_images').find({ f_type: "EL", f_show_image: true, f_published: true }).sort({ f_sort_no: 1 }).limit(1).toArray();
              // const email_social_media = await db.collection('t_seller_images').find({ f_type: "SME", f_show_image: true, f_published: true }).sort({ f_sort_no: 1 }).toArray();
              // var i;
              let text = ``;
              // for (i = 0; i < email_social_media.length; i++) {
              //     text += `<a href="${email_social_media[i].f_url}"><img alt="${email_social_media[i].f_alt_text}" src="http://eskillsellerdocs.cstechns.com/SellerDocuments/sellerDocsImg/${email_social_media[i].f_image_name}"/></a>`
              // }
              var mailOptions = {
                from: 'alamarbaj1920@gmail.com',//mailfrom,
                to: usr.f_email,
                cc: 'atti7466@gmail.com',
                subject: 'A Ticket Raised by You',
                html: "Hey : " + "<br>"
                  + "Name=" + usr.f_name + " </br>"
                  + "Email=" + usr.f_email + " </br>"
                  + "helpsupport=" + req.body.ticketMsg + "'"

                // .replace('{email-payment-logo}', `<a href=" "><img src="http://eskillsellerdocs.cstechns.com/SellerDocuments/sellerDocsImg/${email_payment_logo[0].f_image_name}" width="560" alt=""></a>`)
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
              // res.send()s
              res.json({
                status: true,
                msg: "Ticket raised and mail sent",
                data: sshelpsupport
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



router.route("/getTicketByTicketID")
  .get((req, res, next) => {
    res.json({
      status: false,
      code: "E131"
    })
  }).post(async (req, res) => {
    //var categoryType = await catTypeSchema.find();
    // console.log(req.body);
    try {
      let _id = userFunctions.santizeInput(req.body.userId);
      let ticketId = userFunctions.santizeInput(req.body.ticketId);
      // let f_buyerId = userFunctions.santizeInput(req.body.f_buyerId);
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
            // console.log(req.body._Id);
            var helpsupportdata = await helpNsupportSchema.findOne({ _id: mongoose.Types.ObjectId(ticketId) });
            console.log(helpsupportdata)
            if (helpsupportdata != null) {
              res.json({
                status: true,
                msg: " Ticket fetched Succefully!",
                data: helpsupportdata
              })
            }
            else {
              res.json({
                status: false,
                msg: "No Ticket found by you!",
                data: helpsupportdata
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

router.route("/replyOnTicket")
  .get((req, res, next) => {
    res.json({
      status: false,
      code: "E131"
    })
  }).post(async (req, res) => {
    //var categoryType = await catTypeSchema.find();
    // console.log(req.body);
    try {
      let _id = userFunctions.santizeInput(req.body.userId);
      let ticketId = userFunctions.santizeInput(req.body.ticketId);
      // let f_buyerId = userFunctions.santizeInput(req.body.f_buyerId);
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
            // console.log(req.body._Id);
            var ReplyUpdate = await helpNsupportSchema.updateOne({ _id: mongoose.Types.ObjectId(ticketId) }, {
              $push: {
                Message: {
                  ReplyBy: 'user',
                  replyMsg: req.body.replyMsg,
                  replyDate: Date.now()
                }
              }
            })
            if (ReplyUpdate != null) {
              res.json({
                status: true,
                msg: "You replied on your issue!",
                data: ReplyUpdate
              })
            }
            else {
              res.json({
                status: false,
                msg: "No Ticket found by you!",
                data: ''
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


router.route("/checkEmailAvability")
  .get((req, res, next) => {
    res.json({
      status: false,
      code: "E131"
    })
  }).post(async (req, res) => {
    //var categoryType = await catTypeSchema.find();
    // console.log(req.body);
    try {
      let _id = userFunctions.santizeInput(req.body.userId);
      let emailId = userFunctions.santizeInput(req.body.emailId);
      // let f_buyerId = userFunctions.santizeInput(req.body.f_buyerId);
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
            // console.log(req.body._Id);
            var UserExists = await UsersSchema.find({ f_email: req.body.emailId }).select({ f_email: 1, f_name: 1, f_name: 1, l_name: 1, f_picture: 1, RefCode: 1 }).limit(1).sort({ _id: -1 });
            if (UserExists.length > 0) {
              res.json({
                status: true,
                msg: "Email Availibility fetched!",
                data: UserExists
              })
            }
            else {
              res.json({
                status: false,
                msg: "No Email found by you!",
                data: ''
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

module.exports = router;
