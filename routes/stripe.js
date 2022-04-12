var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require('../modal/dbContext')
const userFunctions = require('../shared/functions');
let   stripeAPI =  { STRIPE_SECRET_KEY: 'sk_test_51KnhTJGAX1ovFy7TMDtGCPVy0UOnaZWO0cdMcS5cytztE0a1sw3S2jSEytJfmWzI6SvWNROc7TGoGze41AbIgFsx00szySNDGm'};

const stripe = require('stripe')(stripeAPI.STRIPE_SECRET_KEY);



router.post('/stripeCheckout', async (req, res) => {

  try{
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
    
    console.warn('checkout session', session);
    res.json({
        status:true,
        checkoutSessionId:session.id
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