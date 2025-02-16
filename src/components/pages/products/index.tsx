"use client";

import { useProducts } from "@/query/products";
import ProductsQuery from "@/components/parts/ProductsQuery";
import ProductCard from "@/components/ui/custom/product-card";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import ResponsivePagination from "react-responsive-pagination";
import Loading from "@/components/ui/custom/loading";

import "react-responsive-pagination/themes/classic.css";
import Sidebar from "@/components/ui/custom/sidebar";
import { slugify } from "@/lib/utils";

const Products = () => {
  const productsQuery = useProducts();
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") ?? "old-to-new";
  const models = searchParams.get("models")?.split(",") ?? [];
  const brands = searchParams.get("brands")?.split(",") ?? [];

  const filteredProducts = useMemo(() => {
    if (!productsQuery.data) return [];

    let result = [...productsQuery.data];

    // Search filter
    if (search) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Model filter
    if (models.length > 0 && models[0] !== "") {
      result = result.filter((product) =>
        models.includes(slugify(product.model))
      );
    }

    // Brand filter
    if (brands.length > 0 && brands[0] !== "") {
      result = result.filter((product) =>
        brands.includes(slugify(product.brand))
      );
    }

    // Sorting logic
    switch (sort) {
      case "new-to-old":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "old-to-new":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "price-high-to-low":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "price-low-to-high":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      default:
        break;
    }

    return result;
  }, [search, sort, models, brands, productsQuery.data]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [page, filteredProducts]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    if (search) params.set("q", search);
    if (sort) params.set("sort", sort);
    if (models.length > 0) params.set("models", models.join(","));
    if (brands.length > 0) params.set("brands", brands.join(","));

    router.replace(`?${decodeURIComponent(params.toString())}`);
  };

  useEffect(() => {
    if (totalPages < 2) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }
  }, [models, brands]);

  return (
    <div className="grid grid-cols-10 gap-6">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="grid grid-cols-12 gap-6 col-span-8">
        <ProductsQuery
          queryResult={productsQuery}
          renderLoading={<Loading message="Getting products data..." />}
          render={() => (
            <>
              {paginatedProducts?.length > 0 ? (
                paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="col-span-12 text-center">
                  <p>No products found</p>
                </div>
              )}
            </>
          )}
        />
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center col-span-full">
            <ResponsivePagination
              current={page}
              total={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
