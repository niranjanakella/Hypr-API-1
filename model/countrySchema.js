const mongoose = require('mongoose');

const countryNewModel = new mongoose.Schema({

    ID: Number,
    Name: String,
    CountryCode: String,
    image:String

}, { collection: "CountryMaster" });

module.exports = CountrySchema = mongoose.model("CountryMaster", countryNewModel);