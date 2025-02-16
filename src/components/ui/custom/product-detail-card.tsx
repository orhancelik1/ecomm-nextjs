import { Button } from "@/components/ui/button";
import { Product } from "@/repositories/products/types";
import { useCartStore } from "@/store";
import Image from "next/image";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="rounded shadow-md bg-white p-4">
      <div>
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            title={product.name}
            fill
            className="object-cover rounded-sm"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <p className="text-blue-700 text-xs mt-2">{product.price} ₺</p>
        <div className="font-medium text-sm h-10">{product.name}</div>
        <div className="text-xs mb-2">
          <p className="text-gray-500">
            {"Brand: "}
            <span className="font-semibold text-black">{product.brand}</span>
          </p>
          <p className="text-gray-500">
            {"Model: "}
            <span className="font-semibold text-black">{product.model}</span>
          </p>
          <p className="mt-2">{product.description}</p>
        </div>
      </div>
      <div className="mt-4 w-fit">
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
