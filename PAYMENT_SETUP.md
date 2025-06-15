# Multi-Currency Payment Setup Guide

This guide will help you set up the multi-currency payment system with Stripe integration for your WooCommerce store.

## Features

✅ **Multi-Currency Support**: GBP, USD, EUR  
✅ **Real-time Exchange Rates**: Automatic currency conversion  
✅ **Stripe Payment Processing**: Secure payment handling  
✅ **WooCommerce Integration**: Seamless product sync  
✅ **Responsive Design**: Works on all devices

## Prerequisites

1. **Stripe Account**: Sign up at [stripe.com](https://stripe.com)
2. **WooCommerce Store**: With API access enabled
3. **Node.js**: Version 18 or higher

## Environment Variables

Add these variables to your `.env.local` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# WooCommerce Configuration
WOOCOMMERCE_STORE_URL=your-store-url.com
WOOCOMMERCE_CONSUMER_KEY=your-consumer-key
WOOCOMMERCE_CONSUMER_SECRET=your-consumer-secret

# Site Configuration
SITE_NAME=K&F
COMPANY_NAME=Modest Wear Co.
NEXT_PUBLIC_VERCEL_URL=localhost:3000
```

## Stripe Setup

### 1. Get API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers** → **API keys**
3. Copy your **Publishable key** and **Secret key**
4. Add them to your environment variables

### 2. Enable Payment Methods

1. Go to **Settings** → **Payment methods**
2. Enable the payment methods you want to accept:
   - Cards (Visa, Mastercard, etc.)
   - Digital wallets (Apple Pay, Google Pay)
   - Bank transfers (if needed)

### 3. Configure Webhooks (Optional)

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Set URL to: `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the webhook secret to your environment variables

## Currency Configuration

The system supports three currencies:

- **GBP (British Pound)** - Default currency
- **USD (US Dollar)**
- **EUR (Euro)**

Exchange rates are fetched automatically from a free API service. For production, consider using a paid service for more reliable rates.

## Testing

### Test Cards

Use these test card numbers in development:

```
Visa: 4242 4242 4242 4242
Mastercard: 5555 5555 5555 4444
Declined: 4000 0000 0000 0002
```

**Expiry**: Any future date  
**CVC**: Any 3 digits  
**ZIP**: Any 5 digits

### Test Flow

1. Add products to cart
2. Fill in delivery address
3. Select currency (GBP/USD/EUR)
4. Proceed to checkout
5. Enter test card details
6. Complete payment

## Production Deployment

### 1. Switch to Live Keys

1. In Stripe Dashboard, toggle to **Live mode**
2. Get your live API keys
3. Update environment variables with live keys

### 2. Configure Webhooks

1. Update webhook URL to your production domain
2. Test webhook delivery

### 3. Security Checklist

- [ ] Use HTTPS in production
- [ ] Validate webhook signatures
- [ ] Log payment events
- [ ] Set up monitoring
- [ ] Configure error handling

## API Endpoints

### Create Payment Intent

```
POST /api/create-payment-intent
Content-Type: application/json

{
  "amount": 39.00,
  "currency": "GBP",
  "metadata": {
    "orderId": "12345"
  }
}
```

### Response

```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

## Troubleshooting

### Common Issues

1. **"Invalid API key"**

   - Check your Stripe keys are correct
   - Ensure you're using the right mode (test/live)

2. **"Currency not supported"**

   - Verify currency code is uppercase (GBP, USD, EUR)
   - Check Stripe supports the currency in your country

3. **Exchange rate errors**

   - Check internet connection
   - API might be rate-limited (fallback rates will be used)

4. **Payment fails**
   - Check test card numbers
   - Verify amount is above minimum (usually $0.50)

### Debug Mode

Enable debug logging by adding to your environment:

```env
DEBUG=stripe:*
```

## Support

For issues with:

- **Stripe**: [Stripe Support](https://support.stripe.com)
- **WooCommerce**: [WooCommerce Documentation](https://woocommerce.com/documentation/)
- **Exchange Rates**: [ExchangeRate-API](https://exchangerate-api.com)

## Security Notes

⚠️ **Important Security Practices**:

1. Never expose secret keys in client-side code
2. Always validate payments on the server
3. Use HTTPS in production
4. Implement proper error handling
5. Log all payment events for auditing

## Next Steps

1. Test the payment flow thoroughly
2. Set up order fulfillment
3. Configure email notifications
4. Add analytics tracking
5. Implement refund handling

---

**Need help?** Check the Stripe documentation or contact support.
