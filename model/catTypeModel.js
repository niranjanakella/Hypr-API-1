/*
  Author name : ATTI
  Description : user model after business model updation
  Date : 25 march 2020
*/
require('../shared/variables');

let catTypeNewSchema = new schema({

    typeName: { type: String, required: "Please enter type name" },
    status: { type: Number, default: 1 },
    createdAt: { type: Date },
    updatedAt: { type: Date }

});

let catTypeSchema = mongoose.model('categoryType', catTypeNewSchema);

module.exports = {
    catTypeSchema: catTypeSchema
};
