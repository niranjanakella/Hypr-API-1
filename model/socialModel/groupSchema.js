const mongoose = require('mongoose');

const t_groupSchema = new mongoose.Schema({
    f_userId: { type: String, default: "" },
    f_name: { type: String, default: "" },
    f_email: { type: String, default: "" },
    f_picture: { type: String, default: "" },
    f_GroupName: { type: String, default: "",unique:true },
    f_GroupPrivacy: { type: Number, default: 0 }, //0-->Public,    1-->Private
    f_GroupCoverPic: { type: String, default: "" },
    f_GroupProfilePic: { type: String, default: "" },
    f_GroupAbout: { type: String, default: "" },
    f_GroupDesciption: { type: String, default: "" },
    f_GroupRole: { type: Array },
    f_MemberCount: { type: Number, default: 0 },
    createdDate: { type: Date, default: new Date() },
    updatedDate: { type: Date, default: new Date() },
    status: { type: Boolean, default: true },

}, { collection: "t_socialGroup" });

module.exports = GroupsSchema = mongoose.model("t_socialGroup", t_groupSchema);