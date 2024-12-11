# Stripe Integration with NestJS

This guide describes how to integrate Stripe with a NestJS application, covering key functionalities such as creating, updating, and deleting products, managing prices, and handling payment sessions and webhooks.

## Setting Up Stripe in a NestJS Application

To use Stripe in a NestJS resource, import and configure the `StripeModule`:

```typescript
imports: [
  StripeModule.forRoot(StripeModule, {
    apiKey: config.get('stripe.secret_key')
  }),
]
```

Ensure you have the Stripe secret key (`stripe.secret_key`) configured in your environment variables or configuration files.

---

## Stripe Product Management

### Create a Product

To create a product in Stripe, use the following code:

```typescript
const createProductInStripe = await this.stripeClient.products.create({
  name: createProductDto.productName,
  description: createProductDto.description,
  images: [resOfCloudinary.secure_url]
});
```

### Update a Product

To update a product, first check if the `stripeProductId` exists. If not, use this code:

```typescript
if (!updateProductDto.stripeProductId) {
  await this.stripeClient.products.update(
    findProduct.stripeProductId,
    {
      name: updateProduct.productName,
      description: updateProduct.description,
      images: [resOfCloudinary.secure_url]
    }
  );
}
```

### Remove a Product

To delete a product from Stripe, use:

```typescript
this.stripeClient.products.del(findProduct.stripeProductId);
```

---

## Stripe Price Management

### Create Price Details

To create price details and obtain a `stripePriceId` for SKU details, use:

```typescript
const stripePriceDetails = await this.stripeClient.prices.create({
  unit_amount: data.skuDetails[i].price * 100,
  currency: 'usd',
  product: product.stripeProductId,
  metadata: {
    skuCode: skuCode,
    lifetime: data.skuDetails[i].lifetime + '',
    productId: productId,
    price: data.skuDetails[i].price,
    productName: product.productName,
    productImage: product.image,
  },
});
```

> **Note:** When updating an SKU price, create a new `stripePriceId` using the same process.

---

## Stripe Checkout Session Management

### Create a Stripe Session

To create a Stripe checkout session and obtain a `session.url` for the payment process, use:

```typescript
const session = await this.stripeClient.checkout.sessions.create({
  line_items: lineItems,
  metadata: {
    userId: user._id.toString(),
  },
  mode: 'payment',
  billing_address_collection: 'required',
  phone_number_collection: {
    enabled: true,
  },
  customer_email: user.email,
  success_url: config.get('stripe.successUrl'),
  cancel_url: config.get('stripe.cancelUrl'),
});
```

### Get Checkout Session Line Items

To retrieve line items from a checkout session:

```typescript
const lineItems = await this.stripeClient.checkout.sessions.listLineItems(
  session.id,
);
```

---

## Stripe Webhook Handling

### Verify Event Signature

To verify the signature of an event from Stripe:

```typescript
event = this.stripeClient.webhooks.constructEventAsync(
  rawBody,
  sig,
  config.get('stripe.webhookSecret')
);
```

> **Important:** Ensure you configure `stripe.webhookSecret` in your environment variables for secure webhook verification.

---

## Using the Stripe CLI for Local Development

The Stripe CLI is a powerful tool for local development and testing. Below are the commands to set up and test webhooks on your local server:

### Log in to Stripe CLI

Run the following command to authenticate your Stripe CLI with your Stripe account:

```bash
stripe login
```

### Forward Webhook Events to Local Server

Use the following command to listen for webhook events and forward them to your local server:

```bash
stripe listen --forward-to localhost:3100/api/v1/orders/webhook
```

This command listens for events from Stripe and forwards them to the specified local endpoint (`localhost:3100/api/v1/orders/webhook`).

> **Note:** Ensure your server is running locally and the specified endpoint is correctly set up to handle incoming webhook events.

By using the Stripe CLI, you can test your integration efficiently without needing an external tunneling tool.

---

By following this guide, you can efficiently manage products, prices, and payment sessions in your NestJS application using Stripe.