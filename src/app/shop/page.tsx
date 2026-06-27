import { ShopPageClient } from "@/components/shop/ShopPageClient";
import { getLiveProducts } from "@/lib/product-storage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop | AARNA CREATIONS",
  description: "Browse our collection of ethnic wear for ladies and girls.",
};

export default async function ShopPage() {
  const products = await getLiveProducts();
  return <ShopPageClient products={products} />;
}
