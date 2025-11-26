"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { useAddProduct } from "../hooks/use-add-to-cart";

import {
  ConfigurableProductData,
  ConfigurableProductIndexData,
} from "@/lib/bagisto/types";
import LoadingDots from "@/components/loading-dots";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  pending,
}: {
  availableForSale: boolean;
  selectedVariantId: boolean;
  pending: boolean;
}) {
  const buttonClasses =
    "relative flex flex-1 cursor-pointer h-12 items-center justify-center rounded-lg bg-orange-500 px-6 font-semibold tracking-wide text-white hover:bg-orange-600 transition-colors";
  const disabledClasses = "cursor-wait opacity-60";

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses, "bg-gray-400")}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-disabled
        aria-label="Please select an option"
        disabled={!selectedVariantId}
        className={clsx(buttonClasses, " opacity-60 !cursor-not-allowed")}
      >
        🛒 TAMBAH KE KERANJANG
      </button>
    );
  }

  return (
    <button
      aria-disabled={pending}
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        "hover:bg-orange-600": true,
        [disabledClasses]: pending,
      })}
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
    >
      <div className="absolute left-0 ml-4">
        {pending ? <LoadingDots className="mb-3 bg-white" /> : ""}
      </div>
      🛒 TAMBAH KE KERANJANG
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale,
  index,
  productId,
}: {
  variants: ConfigurableProductData[];
  availableForSale: boolean;
  productId: string;
  index: ConfigurableProductIndexData[];
}) {
  const { onAddToCart, isCartLoading } = useAddProduct();

  // ✅ useForm controls quantity now
  const { handleSubmit, setValue, watch, register } = useForm({
    defaultValues: {
      quantity: 1,
      isBuyNow: false,
    },
  });

  // Watch quantity so UI updates
  const quantity = watch("quantity");

  const increment = () => setValue("quantity", quantity + 1);
  const decrement = () => setValue("quantity", Math.max(1, quantity - 1));

  const searchParams = useSearchParams();
  // Function to convert URLSearchParams to object
  const searchParamsToObject = (searchParams: any) => {
    const paramsObject: any = {};

    for (const [key, value] of searchParams.entries()) {
      paramsObject[key] = value;
    }

    return paramsObject;
  };

  // Convert searchParams to object
  const searchParamsObject = searchParamsToObject(searchParams);

  const findMatchingObject = (
    searchParamsObject: any,
    index: ConfigurableProductIndexData[]
  ) => {
    for (const data of index) {
      let match = true;
      const attributeOptionIds = [];

      for (const attributeOption of data.attributeOptionIds) {
        const attributeCode = attributeOption.attributeCode;
        const attributeOptionId = attributeOption.attributeOptionId;

        if (searchParamsObject[attributeCode] !== attributeOptionId) {
          match = false;
          break;
        }
        attributeOptionIds.push({
          attributeId: Number(attributeOption.attributeId),
          attributeOptionId: Number(attributeOption.attributeOptionId),
        });
      }
      if (match) {
        return { ...data, attributeOptionIds };
      }
    }

    return null;
  };

  const matchingObject = findMatchingObject(searchParamsObject, index);

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : productId;
  const buttonStatus =
    variants.length >= 1 ? (matchingObject?.id ? true : false) : true;

  const variant = variants.find((variant) => {
    const selectedOptionId = searchParams.get(variant.code.toLowerCase());

    return variant.options.find((option) => option.id === selectedOptionId);
  });

  const selectedVariantId = matchingObject?.id || defaultVariantId;
  const selectedConfigurableOption = Number(
    Object.keys(searchParamsObject).length
      ? matchingObject
        ? matchingObject?.id
        : ""
      : variant?.id || defaultVariantId
  );
  const superAttribute = matchingObject?.attributeOptionIds || [];

  const actionWithVariant = async (data: {
    quantity: number;
    isBuyNow: boolean;
  }) => {
    onAddToCart({
      input: {
        quantity: data?.quantity,
        isBuyNow: data?.isBuyNow,
        productId: selectedVariantId || "",
        selectedConfigurableOption,
        superAttribute,
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(actionWithVariant)}>
      {/* Quantity and Action Buttons */}
      <div className="flex gap-3">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            aria-label="Decrease quantity"
            className="flex h-12 w-12 cursor-pointer items-center justify-center text-gray-600 transition-colors hover:bg-gray-100"
            type="button"
            onClick={decrement}
          >
            <MinusIcon className="h-4 w-4" />
          </button>

          {/* ✅ hidden input so RHF controls quantity */}
          <input
            type="hidden"
            {...register("quantity", { valueAsNumber: true })}
          />

          <div className="flex h-12 min-w-[3rem] items-center justify-center px-4 font-medium text-gray-800 border-x border-gray-300">
            {quantity}
          </div>

          <button
            aria-label="Increase quantity"
            className="flex h-12 w-12 cursor-pointer items-center justify-center text-gray-600 transition-colors hover:bg-gray-100"
            type="button"
            onClick={increment}
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <SubmitButton
          availableForSale={availableForSale}
          pending={isCartLoading}
          selectedVariantId={buttonStatus}
        />

        {/* Buy Now Button */}
        <button
          type="button"
          className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors whitespace-nowrap"
          onClick={() => {
            setValue("isBuyNow", true);
            handleSubmit(actionWithVariant)();
          }}
        >
          BELI SEKARANG
        </button>
      </div>
    </form>
  );
}
