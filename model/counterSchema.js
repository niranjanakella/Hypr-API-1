/*
  Author name : ATTI
  Description : order model after business model updation
  Date : 29 march 2020
*/
require('../shared/variables');

let counterNewSchema = new schema({
    _id: { type: String },
    sequence: { type: Number },
}, { collection: "counter" });

let counterSchema = mongoose.model('counter', counterNewSchema);

module.exports = {
    counterSchema: counterSchema
};
