"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MultiCheckboxProps {
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

const MultiCheckbox = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Search...",
}: MultiCheckboxProps) => {
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div>
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredOptions.length > 0 ? (
        <div className="max-h-[200px] overflow-y-scroll my-3">
          {filteredOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2 mt-2">
              <Checkbox
                id={option.value}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={() => handleToggle(option.value)}
              />
              <Label htmlFor={option.value} className="cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No results found</p>
      )}
    </div>
  );
};

export default MultiCheckbox;
