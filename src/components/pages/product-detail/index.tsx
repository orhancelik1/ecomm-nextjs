"use client";

import { useProducts } from "@/query/products";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/ui/custom/loading";
import ProductDetailCard from "@/components/ui/custom/product-detail-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const productsQuery = useProducts();

  // no loop every render
  const product = useMemo(() => {
    return productsQuery.data?.find((p) => p.id === id);
  }, [productsQuery.data, id]);

  if (productsQuery.isLoading) {
    return <Loading message="Loading product details..." />;
  }

  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Link href="/">
        <div className="flex items-center mb-4 gap-2 hover:underline">
          <ArrowLeft size={16} />
          <p className="text-sm">Back to Home</p>
        </div>
      </Link>
      <ProductDetailCard product={product} />
    </div>
  );
};

export default ProductDetails;
