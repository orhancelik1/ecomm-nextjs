import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/repositories/products/types";

interface CartState {
  cart: (Product & { quantity: number })[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  checkoutTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id
          );
          const updatedCart = existingItem
            ? state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [...state.cart, { ...product, quantity: 1 }];
          return { cart: updatedCart };
        }),

      removeFromCart: (id) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === id);
          if (!existingItem) return state;

          const updatedCart =
            existingItem.quantity === 1
              ? state.cart.filter((item) => item.id !== id)
              : state.cart.map((item) =>
                  item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                );
          return { cart: updatedCart };
        }),

      checkoutTotal: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + parseFloat(item.price) * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
