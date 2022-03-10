
var express = require('express');
var router = express.Router();
const userFunctions = require('../shared/functions');


router.route("/getCategoryType")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        //var categoryType = await catTypeSchema.find();


        try {

            let _id = userFunctions.santizeInput(req.body.userId);
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
                }, (err, result) => {
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

                        catTypeSchema.find({}, (err, result1) => {
                            console.log(err);
                            // console.log(result);
                            // res.send(result)
                            res.json({
                                status: true,
                                msg: "category Type data fetched successfully",
                                data: result1
                            });
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
router.route("/getCategory")
    .get((req, res, next) => {

        console.warn(req);
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        //var categoryType = await catTypeSchema.find();

        try {

            let _id = userFunctions.santizeInput(req.body.userId);
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
                }, (err, result) => {
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

                        categorySchema.find({}, (err, result1) => {
                            console.log(err);
                            // console.log(result);
                            // res.send(result)
                            res.json({
                                status: true,
                                msg: "category data fetched successfully",
                                data: result1
                            });
                        }).sort({ _id: -1 })

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

router.route("/getProducts")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        //var categoryType = await catTypeSchema.find();
        try {

            let _id = userFunctions.santizeInput(req.body.userId);
            var pageCount = parseInt(req.body.pagecount);
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
                }, (err, result) => {
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
                        productSchema.find({}, (err, result1) => {
                            console.log(err);
                            // console.log(result);
                            // res.send(result)
                            res.json({
                                status: true,
                                msg: "product data fetched successfully",
                                data: result1
                            });
                        }).skip(pageCount * 20).limit(20).sort({ _id: -1 })

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

router.route("/getFlashSaleProduct")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        //var categoryType = await catTypeSchema.find();
        // await productSchema.find({ "flashSale": "1" }, (err, result) => {
        //     console.log(err);
        //     // console.log(result);
        //     res.send(result)
        // })
        try {

            let _id = userFunctions.santizeInput(req.body.userId);
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


                        // var flash_sale = await productSchema.find({ "flash_sale": true })
                        // var top_pick = await productSchema.find({ "top_pick": true })
                        // var best_selling = await productSchema.find({ "best_selling": true })
                        // var season_top_pic = await productSchema.find({ "season_top_pic": true })
                        // var trending_offer = await productSchema.find({ "trending_offer": true })
                        // res.json({
                        //     flash_sale,
                        //     top_pick,
                        //     best_selling,
                        //     season_top_pic,
                        //     trending_offer
                        // })
                        productSchema.find({ "flash_sale": true }, (err, result1) => {
                            console.log(err);
                            // console.log(result);
                            // res.send(result)
                            res.json({
                                status: true,
                                msg: "flashSale product data fetched successfully",
                                data: result1
                            });
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


router.route("/gettopPickOnProduct")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        //var categoryType = await catTypeSchema.find();


        // await productSchema.find({ "topPicks": "1" }, (err, result) => {
        //     console.log(err);
        //     // console.log(result);
        //     res.send(result)
        // })
        try {

            let _id = userFunctions.santizeInput(req.body.userId);
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
                }, (err, result) => {
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
                        productSchema.find({ "top_pick": true }, (err, result1) => {
                            console.log(err);
                            // console.log(result);
                            // res.send(result)
                            res.json({
                                status: true,
                                msg: "topPicks product data fetched successfully",
                                data: result1
                            });
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


router.route("/getBestSellingProduct")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        //var categoryType = await catTypeSchema.find();
        // await productSchema.find({ "topSelling": "1" }, (err, result) => {
        //     console.log(err);
        //     // console.log(result);
        //     res.send(result)
        // })
        try {

            let _id = userFunctions.santizeInput(req.body.userId);
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
                }, (err, result) => {
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
                        productSchema.find({ "best_selling": true }, (err, result1) => {
                            console.log(err);
                            // console.log(result);
                            // res.send(result)
                            res.json({
                                status: true,
                                msg: "topSelling product data fetched successfully",
                                data: result1
                            });
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


router.route("/getSeasonTopProduct")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        //var categoryType = await catTypeSchema.find();
        // await productSchema.find({ "seasonsTopPicks": "1" }, (err, result) => {
        //     console.log(err);
        //     // console.log(result);
        //     res.send(result)
        // })

        try {

            let _id = userFunctions.santizeInput(req.body.userId);
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
                }, (err, result) => {
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
                        productSchema.find({ "season_top_pic": true }, (err, result1) => {
                            console.log(err);
                            // console.log(result);
                            // res.send(result)
                            res.json({
                                status: true,
                                msg: "seasonsTopPicks product data fetched successfully",
                                data: result1
                            });
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


router.route("/getTrendingProduct")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        //var categoryType = await catTypeSchema.find();
        // await productSchema.find({ "TrendingOffer": "1" }, (err, result) => {
        //     console.log(err);
        //     // console.log(result);
        //     res.send(result)
        // })
        try {

            let _id = userFunctions.santizeInput(req.body.userId);
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
                }, (err, result) => {
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
                        productSchema.find({ "trending_offer": true }, (err, result1) => {
                            console.log(err);
                            // console.log(result);
                            // res.send(result)
                            res.json({
                                status: true,
                                msg: "TrendingOffer product data fetched successfully",
                                data: result1
                            });
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


router.route("/getProductByKeyword/:pagecount")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        //var categoryType = await catTypeSchema.find();
        // await productSchema.find({ "TrendingOffer": "1" }, (err, result) => {
        //     console.log(err);
        //     // console.log(result);
        //     res.send(result)
        // })
        try {

            let _id = userFunctions.santizeInput(req.body.userId);
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
                        // productSchema.find({  "trending_offer": true }, (err, result1) => {
                        //     console.log(err);
                        //     // console.log(result);
                        //     // res.send(result)
                        //     res.json({
                        //         status: true,
                        //         msg: "TrendingOffer product data fetched successfully",
                        //         data: result1
                        //     });
                        // })
                        var qry = {};
                        var search_text = req.body.keyword;
                        if (search_text != '') {
                            qry.$text = { $search: search_text }
                            const search_keyword = await db.collection('t_search_keyword').findOne({ f_keyword: search_text.trim() });
                            if (search_keyword == null) {
                                await db.collection('t_search_keyword').insertOne({
                                    f_keyword: search_text.trim(),
                                    f_count: 1,
                                    f_searchDate: Date.now()
                                }).then().catch(err => {
                                    if (err) throw err;
                                })
                            } else {
                                await db.collection('t_search_keyword').updateOne({ _id: mongoose.Types.ObjectId(search_keyword._id) }, {
                                    $inc: {
                                        f_count: 1
                                    }, $set: {
                                        f_searchDate: Date.now()
                                    }
                                }).then().catch(err => {
                                    if (err) throw err;
                                })
                            }
                        }
                        var skipvalue = parseInt(req.params.pagecount) * 10
                        var catProductRecord = await db.collection('t_product').find(qry).skip(skipvalue).limit(10).sort({ _id: -1 }).toArray();
                        console.log(catProductRecord.length)
                        res.json({
                            status: true,
                            code: "Product fetched by search keyword",
                            msg: catProductRecord
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


router.route("/getCategoryList")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        //var categoryType = await catTypeSchema.find();
        // await productSchema.find({ "TrendingOffer": "1" }, (err, result) => {
        //     console.log(err);
        //     // console.log(result);
        //     res.send(result)
        // })
        try {

            let _id = userFunctions.santizeInput(req.body.userId);
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
                        var categoryData = await db.collection('t_category').find({ f_pcat: { $ne: "0" }, f_status: true }).sort({ _id: -1 }).toArray();
                        res.json({
                            status: true,
                            msg: "categoryData fetched successfully",
                            data: categoryData
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

router.route("/getProductByCategory/:pagecount")
    .get((req, res, next) => {
        res.json({
            status: false,
            code: "E131"
        })
    }).post(async (req, res) => {
        //var categoryType = await catTypeSchema.find();
        // await productSchema.find({ "TrendingOffer": "1" }, (err, result) => {
        //     console.log(err);
        //     // console.log(result);
        //     res.send(result)
        // })
        try {
            let _id = userFunctions.santizeInput(req.body.userId);
            let catId = userFunctions.santizeInput(req.body.catId);
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
                        var skipvalue = parseInt(req.params.pagecount) * 10
                        var CategoryProducts = await db.collection('t_product').find({ f_catLevel1: catId }).skip(skipvalue).limit(10).sort({ _id: -1 }).toArray();
                        res.json({
                            status: true,
                            msg: "Product By Category fetched successfully",
                            data: CategoryProducts
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

router.route("/productDetailByID")
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
            let ProductId = userFunctions.santizeInput(req.body.ProductId);
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
                },async (err, result) => {
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
                        // var ProductDetails = await productSchema.findOne({ _id: mongoose.Types.ObjectId(ProductId) });
                        var ProductDetails = await productSchema.findOne({ _id: ProductId });
                        res.json({
                            status: true,
                            msg: "Producr fetched by product Id!",
                            data: ProductDetails
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

router.route("/getProductListForCategory")
    .get(async (req, res, next) => {
        // categorySchema.find({}, (err, result1) => {
        //     console.log(result1);
        // })
        return
        var Products = await productSchema.find({});
        Products.forEach(async element => {
            console.log(element.f_catLevel2);
            if (element.f_catLevel2 != undefined) {
                categorySchema.findOne({ "f_catname": element.f_catLevel2 }, async (err, result1) => {
                    if (result1) {
                        await productSchema.updateOne({ f_catLevel2: element.f_catLevel2 }, {
                            $set: {
                                f_catLevel2: result1._id,
                                f_catLevel2Name: result1.f_pcatName
                            }
                        })
                    }

                })
            }
        });
        res.json({
            status: true,
            code: ''
        })


    })
module.exports = router;