/*
  Author name : ATTI
  Description : user model after business model updation
  Date : 25 march 2020
*/
require('../shared/variables');

// let addToCartNewSchema = new schema({

  const addToCartNewSchema = new mongoose.Schema({
  f_sellerId: String,
  f_ProductId: String,
  f_ProductPrice: String,
  f_OfferPrice: String,
  f_productCode: String,
  f_ServiceName: String,
  f_sellerName: String,
  f_ProductImg1: String,
  f_categoryTypeName: String,
  f_categoryTypeId: String,
  f_categoryName: String,
  f_categoryId: String,
  f_itemQuantity: Number,
  f_buyerId: String,
  f_buyerName: String,
  f_totalAmount: String,
  f_createdDate: String,
  f_coupon: String,
  f_couponPrice: String,
  f_couponType: String,
  f_couponUse: String,
  f_discount: String,
  f_variantName : String,
  status: Boolean,
  createdAt: Date,
  updatedAt: Date,
  //  { collection: "t_product" });
  },{collection:"t_CartSummary"});

module.exports = CartSchema = mongoose.model("t_CartSummary", addToCartNewSchema);