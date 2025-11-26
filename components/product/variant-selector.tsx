"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  ConfigurableProductData,
  ConfigurableProductIndexData,
} from "@/lib/bagisto/types";
import { createUrl } from "@/lib/utils";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export function VariantSelector({
  variants,
  index,
}: {
  variants: ConfigurableProductData[];
  index: ConfigurableProductIndexData[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !variants?.length ||
    (variants.length === 1 && variants[0]?.options.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = index?.map((variant) => ({
    id: variant.id,
    availableForSale: true,
    // Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
    ...variant?.attributeOptionIds.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.attributeCode.toLowerCase()]: option.attributeOptionId,
      }),
      {}
    ),
  }));

  return (
    <div className="space-y-4 mb-6">
      {variants.map((option) => (
        <div key={option.id}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {option.label}
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchParams.get(option.code.toLowerCase()) || ""}
            onChange={(e) => {
              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );
              optionSearchParams.set(option.code.toLowerCase(), e.target.value);
              const optionUrl = createUrl(pathname, optionSearchParams);
              router.replace(optionUrl, { scroll: false });
            }}
          >
            <option value="">Pilih {option.label}</option>
            {option.options.map((value) => {
              const optionNameLowerCase = option.code.toLowerCase();
              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );
              optionSearchParams.set(optionNameLowerCase, value?.id);

              const filtered = Array.from(optionSearchParams.entries()).filter(
                ([key, value]) =>
                  variants.find(
                    (option) =>
                      option.code.toLowerCase() === key &&
                      option.options.some((option) => option.id === value)
                  )
              );

              const isAvailableForSale = combinations.find((combination) =>
                filtered.every(
                  ([key, value]) =>
                    combination[key] === value && combination.availableForSale
                )
              );

              return (
                <option
                  key={value?.label}
                  value={value?.id}
                  disabled={!isAvailableForSale}
                >
                  {value?.label}
                  {!isAvailableForSale ? " (Stok Habis)" : ""}
                </option>
              );
            })}
          </select>
        </div>
      ))}
    </div>
  );
}
