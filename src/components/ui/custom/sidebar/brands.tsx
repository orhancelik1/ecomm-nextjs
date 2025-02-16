"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MultiCheckbox from "@/components/ui/multicheckbox";
import { useProducts } from "@/query/products";
import { slugify } from "@/lib/utils";

const Brands = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productsQuery = useProducts();

  const selectedBrands = searchParams.get("brands")?.split(",") || [];

  const brands =
    productsQuery.data?.map((product) => ({
      label: product.brand,
      value: slugify(product.brand),
    })) || [];

  const uniqueBrands = Array.from(
    new Map(brands.map((item) => [item.value, item])).values()
  );

  const handleChange = (newSelectedBrands: string[]) => {
    const params = new URLSearchParams(searchParams);
    if (newSelectedBrands.length > 0) {
      params.set("brands", newSelectedBrands.join(","));
    } else {
      params.delete("brands");
    }

    router.replace(`?${decodeURIComponent(params.toString())}`);
  };

  return (
    <div>
      <h2 className="text-xs text-gray-400 font-light mb-1 mt-4">Brands</h2>
      <div className="pt-4 p-4 bg-white rounded-lg shadow-md">
        <MultiCheckbox
          options={uniqueBrands}
          selectedValues={selectedBrands}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Brands;
