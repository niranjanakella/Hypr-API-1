const mongoose = require('mongoose');

const t_groupJoined = new mongoose.Schema({
    f_userId: String,
    f_groupId:String,
    f_groupName:String, 
    f_name: String,
    f_email: String,
    f_picture: String,
    f_type: Number,
    f_TypeMsg: String,
    f_statusMsg: String,
    createdDate: Date,
    updatedDate: Date,
    status: Boolean

}, { collection: "t_groupJoined" });

module.exports = GroupJoinedSchema = mongoose.model("t_groupJoined", t_groupJoined);