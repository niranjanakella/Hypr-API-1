/*
  Author name : ATTI
  Description : order model after business model updation
  Date : 29 march 2020
*/
require('../shared/variables');

let orderNewSchema = new mongoose.Schema({
    f_orderDate:  Date ,
    f_displayOrderId:  Number ,
    f_paymentMode:  String ,
    f_orderStatus:  String ,
    f_paymentmethod:  String ,
    f_paymentStatus:  String ,
    f_buyerId:  mongoose.Schema.Types.ObjectId ,
    f_buyerEmail:  String ,
    f_billingName:  String ,
    f_sellerId:  String ,
    f_billingAddress:  String ,
    f_billingState:  String ,
    f_billingCity:  String ,
    f_billingCountry:  String ,
    f_billingContactNo:  String ,
    f_billingPinCode:  String ,
    f_orderTotalAmount:  String ,
    f_description:  String ,
    f_currencyFormat:  String ,
    f_currency:  String ,
    status:  Boolean ,
    createdAt:  Date ,
    updatedAt:  Date 
  }, { collection: "t_orders" });

  module.exports = orderSchema = mongoose.model("t_orders", orderNewSchema);
// });

// let orderSchema = mongoose.model('order', orderNewSchema);

// module.exports = {
//     orderSchema: orderSchema
// };
