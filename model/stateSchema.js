const mongoose = require('mongoose');

const stateNewModel = new mongoose.Schema({

    ID: Number,
    Name: String,
    CountryID: Number

}, { collection: "StateMaster" });

module.exports = StateSchema = mongoose.model("StateMaster", stateNewModel);