"use client";

import { ShoppingCart, User } from "lucide-react";
import SearchBar from "./search";
import { useCartTotal } from "@/lib/use-cart-total";

const Header = () => {
  const total = useCartTotal();
  return (
    <header className="bg-blue-500 text-white">
      <div className="flex items-center justify-between container py-4">
        <div className="flex items-center">
          <div className="text-3xl font-bold w-[250px]">Vardabit</div>
          <div className="w-[350px]">
            <SearchBar />
          </div>
        </div>
        <div className="flex gap-x-4">
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} />
            <span>{total.toFixed(2)} ₺</span>
          </div>

          <div className="flex items-center gap-2">
            <User size={24} />
            <div className="font-semibold">Kerem</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
