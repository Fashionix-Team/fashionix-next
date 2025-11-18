"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";

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

    router.push(createUrl("/search", newParams));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full max-w-xl mx-6 hidden xl:block"
    >
      <input
        type="text"
        name="search"
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="w-full rounded-md bg-white/95 text-[#191C1F] placeholder-[#25373F]/70 border border-black/10 pl-11 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Cari apa saja..."
      />
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#191C1F]"
        >
          <path
            d="M9.5625 15.625C13.1869 15.625 16.125 12.6869 16.125 9.0625C16.125 5.43813 13.1869 2.5 9.5625 2.5C5.93813 2.5 3 5.43813
                3 9.0625C3 12.6869 5.93813 15.625 9.5625 15.625Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.2031 13.7031L18 17.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </form>
  );
}
