# Strase SDK

Welcome to the Strase SDK, your gateway to seamlessly integrating Strase into your business or store. Strase revolutionizes the checkout experience by allowing customers to earn Strase Bucks (SB) on Base whenever they check out using Stripe, one of the world's most popular financial services. This SDK enables businesses to enhance customer engagement through rewards, supporting multi-currency transactions to ensure fairness and accessibility for users worldwide.

## Getting Started

### Installation
To start using the Strase SDK, follow these steps:

### Install the SDK:

```bash
npm install strase
```

### Integrate Strase:
Use the SDK to integrate Strase with Stripe and expand with a few lines of code

```typescript
import {
    ChainID,
    FunctionConsumer,
    getConsumerAddress
} from "strase";

// Regular Stripe confirmation ...
const { error, paymentIntent } = await stripe.confirmPayment({
    elements,
    redirect: "if_required"
});


const chain = ChainID.BASE_SEPOLIA;       // Test environment
const publishableKey = "pk_";
const consumer = new FunctionConsumer({ 
    chain,
});
const data = consumer.sendRequestEncode(
    publishableKey, paymentIntent.client_secret);
const result = await sendTransaction(config, {
    to: getConsumerAddress(ChainID) as `0x${string}`,
    data: data,
})
```