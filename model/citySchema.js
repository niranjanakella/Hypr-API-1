const mongoose = require('mongoose');

const CityNewModel = new mongoose.Schema({

    _id: String,
    name: String,
    state_id: String

}, { collection: "CityMaster" });

module.exports = CitySchema = mongoose.model("CityMaster", CityNewModel);