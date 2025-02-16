"use client";

import { useCartStore } from "@/store";
import { CartItem } from "./cart-item";
import { Button } from "@/components/ui/button";
import useStore from "@/store/use-store";
import { useCartTotal } from "@/lib/use-cart-total";

export const Cart = () => {
  const cart = useStore(useCartStore, (state) => state.cart);

  const total = useCartTotal();

  if (!cart) return null;

  return (
    <div>
      <div>
        <h2 className="text-xs text-gray-400 font-light mb-1">Cart</h2>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <div className="space-y-4">
            {cart?.length ? (
              cart.map((product, index) => (
                <CartItem
                  key={product.id + index + product.name}
                  product={product}
                />
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xs text-gray-400 font-light mb-1 mt-4">Checkout</h2>
        <div className="pt-4 p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between font-bold">
            <span>Total Price: </span>
            <span className="text-blue-700">{total.toFixed(2)} ₺</span>
          </div>
          <Button disabled={cart.length === 0} className="w-full mt-4">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};
