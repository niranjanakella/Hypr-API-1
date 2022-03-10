// /*
//   Author name : ATTI
//   Description : user model after business model updation
//   Date : 25 march 2020
// */
 require('../shared/variables');

// let categoryNewSchema = new schema({
//   f_catname: { type: String },
//   f_pcat: { type: String, required: "Please enter type name" },
//   f_pcatName: { type: String, required: "Please enter category name" },
//   f_img: { type: String },
//   f_userid: { type: String },
//   f_leval: { type: String },
//   f_featurecat: { type: String },
//   f_description: { type: String },
//   f_status: { type: String },
//   f_alt: { type: String },
//   f_Commissionamount: { type: String },
//   createdAt: { type: Date },
//   updatedAt: { type: Date }

// });

// let categorySchema = mongoose.model('t_category', categoryNewSchema);

// module.exports = {
//   categorySchema: categorySchema
// };


//const mongoose = require('mongoose');

const categoryNewSchema = new mongoose.Schema({

  f_catname: { type: String },
  f_pcat: { type: String, required: "Please enter type name" },
  f_pcatName: { type: String, required: "Please enter category name" },
  f_img: { type: String },
  f_userid: { type: String },
  f_leval: { type: String },
  f_featurecat: { type: String },
  f_description: { type: String },
  f_status: { type: String },
  f_alt: { type: String },
  f_Commissionamount: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date }

}, { collection: "t_category" });

module.exports = categorySchema = mongoose.model("t_category", categoryNewSchema);