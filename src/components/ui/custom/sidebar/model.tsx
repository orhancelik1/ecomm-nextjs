"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MultiCheckbox from "@/components/ui/multicheckbox";
import { useProducts } from "@/query/products";
import { slugify } from "@/lib/utils";

const Model = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productsQuery = useProducts();

  const selectedModels = searchParams.get("models")?.split(",") || [];

  const models =
    productsQuery.data?.map((product) => ({
      label: product.model,
      value: slugify(product.model),
    })) || [];

  const uniqueModels = Array.from(
    new Map(models.map((item) => [item.value, item])).values()
  );

  const handleChange = (newSelectedModels: string[]) => {
    const params = new URLSearchParams(searchParams);
    if (newSelectedModels.length > 0) {
      params.set("models", newSelectedModels.join(","));
    } else {
      params.delete("models");
    }
    router.replace(`?${decodeURIComponent(params.toString())}`);
  };

  return (
    <div>
      <h2 className="text-xs text-gray-400 font-light mb-1 mt-4">Models</h2>
      <div className="pt-4 p-4 bg-white rounded-lg shadow-md">
        <MultiCheckbox
          options={uniqueModels}
          selectedValues={selectedModels}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Model;
