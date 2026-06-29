# AARNA CREATIONS

Ethnic wear boutique website for **AARNA CREATIONS by Abha Maheshwari**.

## Features

- Multi-page e-commerce site: Home, Shop, Product, Cart, Checkout, About, Owner Admin
- Owner-managed live catalog through `/owner`
- Cloudinary-backed product catalog, sold log, and product photos
- Browser-side image compression before owner uploads
- Cart with size, color, and customization options
- WhatsApp-based order placement, no on-site payment
- YouTube new arrivals carousel
- Traditional Indian boutique theme

## Local Setup

1. Install Node.js 22, or Node.js 18+ if you are only testing locally.
2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
copy .env.example .env.local
```

4. Edit `.env.local` with your owner PIN, Cloudinary details, and WhatsApp number.

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Owner Dashboard

Visit `/owner` to manage live products without editing code.

- `OWNER_PIN` protects product upload and sold-item removal.
- Add products with 1-5 photos, name, prices, color text, sizes, fabric/material, category, optional subcategory, and description.
- Photos are compressed in the browser to WebP/JPEG at about 75-80% quality before upload.
- Sold items can be selected and removed from the live catalog; uploaded product photos are deleted from Cloudinary.

Cloudinary storage layout:

- Product catalog: raw asset at `aarna-creations/catalog/products.json`
- Sold log: raw asset at `aarna-creations/catalog/sold-log.json`
- Product photos: image assets under `aarna-creations/products/{productId}/`

## Render Deployment

This project is intended to run on Render as a Node web service.

Render settings:

- Service type: Web Service
- Runtime: Node
- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Instance type: Free is fine for v1, but it may sleep when inactive.

Required Render environment variables:

- `OWNER_PIN`: owner/admin PIN for `/owner`
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret. Keep this server-side only.
- `CLOUDINARY_FOLDER`: optional storage folder, defaults to `aarna-creations`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: WhatsApp number used by checkout links
- `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID`: optional YouTube channel ID for faster video loading

## WhatsApp Orders

When a customer clicks **Place Order via WhatsApp**, a pre-filled message opens in WhatsApp with:

- Customer details: name, phone, address
- Each cart item with size, color, customization, price, and product link
- Order total

The customer sends this message to your business WhatsApp number. You can then share payment/UPI details directly on WhatsApp.

## Customization

- Logo: replace `public/logo.png`
- Fallback sample product: edit `src/data/products.ts`
- WhatsApp number: update `NEXT_PUBLIC_WHATSAPP_NUMBER`
- YouTube channel: set `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` or use the RSS fallback for `@aarnacreations1921`
