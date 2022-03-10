const mongoose = require('mongoose');

const savepost = new mongoose.Schema({
    f_postID: {
        type: String,
        default: '',
        unique:true
    },
    f_post: {
        type: String,
        default: ''
    },
    f_userId: {
        type: String,
        default: ''
    },
    f_username: {
        type: String,
        default: ''
    },
    f_name: {
        type: String,
        default: ''
    },
    f_user_picture: {
        type: String,
        default: ''
    },
    f_postImages: { type: Array },
    f_postLocation: {
        type: String,
        default: ''
    },
    f_postTag: { type: Array },
    f_postLike: { type: Array },
    f_postComment: { type: Array },
    f_postShare: { type: Array },
    f_postPrivacy: { type: Number },//0-OnlyMe, 1- MyPals, 2-Everyone
    f_postFeeling: {
        type: String,
        default: ''
    },
    f_postGalleryName: {
        type: String,
        default: ''
    },//Cover,Profile,Timeline,Profile etc
    f_postCreatedDate: { type: Date },
    f_postUpdatedDate: { type: Date },
    f_videoLink: {
        type: String,
        default: ''
    },
    f_userIP: {
        type: String,
        default: ''
    },
    f_status: { type: Boolean }
    // f_post: {type: String,
    // default: '' },
    //// f_post: {type: String,
    // default: '' },
    // f_post: {type: String,
    //  default: '' },
    // f_post: {type: String,
    ///default: '' },


}, { collection: "t_savePosts" });

module.exports = SavePostSchema = mongoose.model("t_savePosts", savepost);