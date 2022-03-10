const mongoose = require('mongoose');

const t_pageLike= new mongoose.Schema({
    f_userId: String,
    f_pageId:String,
    f_pageName:String, 
    f_name: String,
    f_email: String,
    f_picture: String,
    f_type: Number,
    f_TypeMsg: String,
    f_statusMsg: String,
    createdDate: Date,
    updatedDate: Date,
    status: Boolean

}, { collection: "t_PageLiked" });

module.exports = PageLikedSchema = mongoose.model("t_PageLiked", t_pageLike);