import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Size } from "@/types";

interface AddToCartPayload {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: Size;
  color: string;
  customization?: string;
  quantity?: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (payload: AddToCartPayload) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (payload) => {
        const quantity = payload.quantity ?? 1;
        const cartId = `${payload.productId}-${payload.size}-${payload.color}-${payload.customization ?? ""}`;

        set((state) => {
          const existing = state.items.find((item) => item.cartId === cartId);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.cartId === cartId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                cartId,
                productId: payload.productId,
                slug: payload.slug,
                name: payload.name,
                image: payload.image,
                price: payload.price,
                size: payload.size,
                color: payload.color,
                customization: payload.customization ?? "",
                quantity,
              },
            ],
          };
        });
      },

      removeItem: (cartId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartId !== cartId),
        }));
      },

      updateQuantity: (cartId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.cartId === cartId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "aarna-cart" }
  )
);
