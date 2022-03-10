const mongoose = require('mongoose');

const t_request_accept = new mongoose.Schema({
    f_userId: String,
    f_req_accp_UserId:String,
    f_name: String,
    f_email: String,
    f_picture: String,
    f_type: Number,
    f_TypeMsg: String,
    f_statusMsg: String,
    createdDate: Date,
    updatedDate: Date,
    status: Boolean

}, { collection: "t_request_accept" });

module.exports = FollowSchema = mongoose.model("t_request_accept", t_request_accept);