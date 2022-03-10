const mongoose = require('mongoose');

const pincodeNewModel = new mongoose.Schema({
    officeName: String,
    pincode: Number,
    taluk:String,
    districtName:String,
    stateName:String

}, { collection: "pincodes" });

module.exports = PincodeSchema = mongoose.model("pincodes", pincodeNewModel);