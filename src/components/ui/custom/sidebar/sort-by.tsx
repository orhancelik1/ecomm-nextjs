"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const sortOptions = [
  { value: "old-to-new", label: "Old to New" },
  { value: "new-to-old", label: "New to Old" },
  { value: "price-high-to-low", label: "Price High to Low" },
  { value: "price-low-to-high", label: "Price Low to High" },
];

const SortRadioGroup = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedSort = searchParams.get("sort") ?? "old-to-new";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div>
      <h2 className="text-xs text-gray-400 font-light mb-1 mt-4">Sort By</h2>
      <div className="pt-4 p-4 bg-white rounded-lg shadow-md">
        <RadioGroup
          value={selectedSort}
          onValueChange={handleSortChange}
          className="space-y-2"
        >
          {sortOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default SortRadioGroup;
