const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
  async generatePaymentLink(order) {
    try {
      // console.log(order,'aaaaaaaaa');
      let pay_amount=order.totalAmount+33;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `http://localhost:3000/payment/success/${order._id}`,
        cancel_url: 'http://localhost:3000/cancel',
        line_items: [
          {
            price_data: {
              currency: 'inr',
              unit_amount: pay_amount*100,
              product_data: {
                name: 'Order',
              },
            },
            quantity: 1,
          },
        ],
      });

      // console.log('Session:', session);

      return { payment_url: session.url };
    } catch (error) {
      throw new Error(`Failed to generate payment link: ${error.message}`);
    }
  }
};
