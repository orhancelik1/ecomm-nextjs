import { Product } from "@/repositories/products/types";
import { useCartStore } from "@/store";

export const CartItem = ({
  product,
}: {
  product: Product & { quantity: number };
}) => {
  const { addToCart, removeFromCart } = useCartStore();
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div className="flex-1">
        <h3 className="font-medium text-sm">{product.name}</h3>
        <p className="text-blue-700 text-xs mt-1">{product.price} ₺</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => removeFromCart(product.id)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        <span>{product.quantity}</span>
        <button
          onClick={() => addToCart(product)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
};
