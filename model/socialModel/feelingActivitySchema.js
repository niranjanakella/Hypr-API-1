const mongoose = require('mongoose');

const t_feelingsActivities = new mongoose.Schema({

    name: String,
    createdDate: Date,
    type: Number,
    statues: Boolean

}, { collection: "t_feelingsActivities" });

module.exports = feelingsActivitiesSchema = mongoose.model("t_feelingsActivities", t_feelingsActivities);