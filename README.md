# AARNA CREATIONS

Ethnic wear boutique website for **AARNA CREATIONS by Abha Maheshwari**.

## Features

- Multi-page e-commerce site (Home, Shop, Product, Cart, Checkout, About)
- Myntra-style filters and sorting
- Cart with size, color, and customization options
- WhatsApp-based order placement (no on-site payment)
- YouTube new arrivals carousel
- Traditional Indian boutique theme

## Setup

1. Install [Node.js](https://nodejs.org/) (v18+)
2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
copy .env.local.example .env.local
```

4. Edit `.env.local` and set your WhatsApp business number:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=919039922175
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## WhatsApp Orders

When a customer clicks **Place Order via WhatsApp**, a pre-filled message opens in WhatsApp with:
- Customer details (name, phone, address)
- Each cart item with size, color, customization, price, and product link
- Order total

The customer sends this message to your business WhatsApp number. You can then share payment/UPI details directly on WhatsApp.

## Customization

- **Logo:** Replace `public/logo.png`
- **Products:** Edit `src/data/products.ts`
- **WhatsApp number:** Update `.env.local`
- **YouTube channel:** Videos auto-fetch from `@aarnacreations1921` via RSS

## Deploy

Deploy on Netlify:

```bash
npm run build
```

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` and `OWNER_PIN` in Netlify environment variables.


## Owner Dashboard

Visit `/owner` to manage live products without editing code.

- Set `OWNER_PIN=xxxx` in Netlify environment variables. This is server-only; do not use `NEXT_PUBLIC_OWNER_PIN`.
- Add products with 1-5 photos, name, prices, color text, sizes, fabric/material, category, optional subcategory, and description.
- Photos are compressed in the browser to WebP/JPEG at about 75-80% quality before upload.
- Sold items can be selected and removed from the live catalog; uploaded product photos are deleted from Netlify Blobs.

Live product data is stored in Netlify Blobs using the `aarna-products` store and product images are stored in the `aarna-images` store.
