var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require('../modal/dbContext')
const userFunctions = require('../shared/functions');
let   stripeAPI =  { STRIPE_SECRET_KEY: 'sk_test_51KnhTJGAX1ovFy7TMDtGCPVy0UOnaZWO0cdMcS5cytztE0a1sw3S2jSEytJfmWzI6SvWNROc7TGoGze41AbIgFsx00szySNDGm'};

const stripe = require('stripe')(stripeAPI.STRIPE_SECRET_KEY);



router.post('/stripeCheckout', async (req, res) => {
  let lineItemsPayload = req.body.lineItemsPayload;

  let orderId = req.body.lineItemsPayload;
  try{
    const session = await stripe.checkout.sessions.create({
      line_items: lineItemsPayload,
      mode: 'payment',
      success_url: `${process.env.DEV_URL}/success?sc_checkout=success&paymentId=${orderId}&payerId=${orderId}`,
      cancel_url: `${process.env.DEV_URL}/cancel?sc_checkout=cancel`,
    });
    
    
    // res.redirect(`${process.env.DEV_URL}/successPayment?checkout=success`);

    res.json({
        status:true,
        checkoutSessionId:session.id,        
    })

  }catch(error){
    console.warn('error session', error);
    res.json({
      status:false,
      msg:'Something went wrong!'
    })


  }


});




module.exports = router;