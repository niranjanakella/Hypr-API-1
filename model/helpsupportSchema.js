
const mongoose = require('mongoose');

const helpsupportModel = new mongoose.Schema({

    // _id: String,
    f_name: String,
    f_email : String,
    f_phone:String,
    helpsupport: String,
    issue : String,
    Subject : String,
    issue_picture: String,
    userId:String,
    ticketStatus:String,
    Message:Array,
    status:Boolean

}, { collection: "t_helpsupport" });

module.exports = helpNsupportSchema = mongoose.model("t_helpsupport", helpsupportModel);