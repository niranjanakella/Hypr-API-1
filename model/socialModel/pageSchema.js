const mongoose = require('mongoose');

const t_PageSchema = new mongoose.Schema({
    f_userId: { type: String, default: "" },
    f_name: { type: String, default: "" },
    f_email: { type: String, default: "" },
    f_picture: { type: String, default: "" },
    f_PageName: { type: String, default: "",unique:true },
    f_PagePrivacy: { type: Number, default: 0 }, //0-->Public,    1-->Private
    f_PageCoverPic: { type: Array, default: "" },
    f_PageProfilePic: { type: Array, default: "" },
    f_PageAbout: { type: String, default: "" },
    f_PageDesciption: { type: String, default: "" },
    f_PageRole: { type: Array },
    f_MemberCount: { type: Number, default: 0 },
    createdDate: { type: Date, default: new Date() },
    updatedDate: { type: Date, default: new Date() },
    status: { type: Boolean, default: true },

}, { collection: "t_socialPage" });

module.exports = PageSchema = mongoose.model("t_socialPage", t_PageSchema);