"use client";

import { createUrl } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/", newParams));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
    >
      <input
        key={searchParams?.get("q")}
        type="text"
        name="search"
        placeholder="Search"
        autoComplete="off"
        defaultValue={searchParams?.get("q") ?? ""}
        className="w-full border border-white bg-white pb-[0.688rem] pl-[0.87rem] pr-[2.56rem] pt-[0.813rem] text-black outline-none placeholder:text-black"
      />
      <button type="submit">
        <div className="absolute right-0 top-0 mr-[0.56rem] flex h-full items-center text-black">
          <SearchIcon size={24} />
        </div>
      </button>
    </form>
  );
}
