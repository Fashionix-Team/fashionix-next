"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { useCartDetail } from "@/components/hooks/use-cart-detail";
import { useAppSelector } from "@/store/hooks";
import type { CartItem } from "@/lib/bagisto/types";

export default function CartPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading } = useCartDetail();
  const cartDetail = useAppSelector((state) => state.cartDetail);
  const cart = cartDetail?.cart;

  // Calculate total items quantity
  const totalItemsQty = useMemo(() => {
    if (!cart?.items || cart.items.length === 0) return 0;
    return cart.items.reduce((total, item) => total + (parseInt(item.quantity?.toString() || "0", 10)), 0);
  }, [cart?.items]);

  // Calculate subtotal
  const subTotal = useMemo(() => {
    if (!cart?.subTotal) return 0;
    return parseFloat(cart.subTotal);
  }, [cart?.subTotal]);

  // Handle remove item from cart
  const handleRemoveItem = async (itemId: string) => {
    try {
      // Call API to remove item
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItemId: itemId }),
      });

      if (response.ok) {
        // Refresh cart data
        window.location.reload();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-end"
      offset={12}
    >
      <PopoverTrigger>
        <div className="relative">
          <button
            className="inline-flex rounded-md p-1.5 text-white/90 hover:text-white transition cursor-pointer"
            disabled={isLoading}
            aria-label="Shopping cart"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M10 29C11.1046 29 12 28.1046 12 27C12 25.8954 11.1046 25 10 25C8.89543 25 8 25.8954 8 27C8 28.1046 8.89543 29 10 29Z"
                fill="currentColor"
              />
              <path
                d="M23 29C24.1046 29 25 28.1046 25 27C25 25.8954 24.1046 25 23 25C21.8954 25 21 25.8954 21 27C21 28.1046 21.8954 29 23 29Z"
                fill="currentColor"
              />
              <path
                d="M5.2875 9H27.7125L24.4125 20.55C24.2948 20.9692 24.0426 21.3381 23.6948 21.6001C23.3471 21.862 22.9229 22.0025 22.4875 22H10.5125C10.0771 22.0025 9.65293 21.862 9.30515 21.6001C8.95738 21.3381 8.70524 20.9692 8.5875 20.55L4.0625 4.725C4.0027 4.51594 3.8764 4.33207 3.70271 4.20125C3.52903 4.07042 3.31744 3.99977 3.1 4H1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* badge */}
          {totalItemsQty > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1.5 text-[10px] font-semibold text-white">
              {totalItemsQty}
            </span>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[360px] overflow-hidden rounded-xl border border-black/10 bg-white p-0 shadow-2xl">
        <div className="border-b border-black/10 px-4 py-3">
          <h6 className="text-sm font-semibold text-gray-900">
            Keranjang Belanja{" "}
            <span className="text-gray-500">
              ({String(totalItemsQty).padStart(2, "0")})
            </span>
          </h6>
        </div>

        <div className="max-h-80 overflow-y-auto px-4 py-3">
          {!cart || !cart.items || cart.items.length === 0 ? (
            <p className="text-sm text-gray-600">Keranjang belanja Anda kosong.</p>
          ) : (
            cart.items.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex items-start gap-3 py-3 border-b last:border-b-0 border-gray-100"
              >
                <div className="relative h-14 w-14 rounded-md bg-gray-50 overflow-hidden">
                  <Image
                    src={item.product?.images?.[0]?.url || "/image/product/placeholder.png"}
                    alt={item.name || "Product"}
                    fill
                    className="object-contain"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm text-gray-800">
                    {item.name}
                  </p>
                  <div className="mt-1 text-sm">
                    <span className="text-gray-700">{item.quantity} x</span>{" "}
                    <span className="font-semibold text-gray-900">
                      Rp.{parseFloat(item.price?.toString() || "0").toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  className="shrink-0 rounded-md p-1 hover:bg-gray-100"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 3.5L3.5 12.5"
                      stroke="#929FA5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5 12.5L3.5 3.5"
                      stroke="#929FA5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
          <p className="text-xs text-gray-600">Sub-Total</p>
          <p className="text-sm font-semibold text-gray-900">
            Rp.{subTotal.toLocaleString()} {cart?.cartCurrencyCode || "IDR"}
          </p>
        </div>

        <div className="space-y-2 px-4 py-3">
          <Link
            href="/checkout"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-[#191C1F] hover:bg-orange-400"
            onClick={() => setIsOpen(false)}
          >
            Checkout Sekarang
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.625 10H17.375"
                stroke="#191C1F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M11.75 4.375L17.375 10L11.75 15.625"
                stroke="#191C1F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </Link>
          <Link
            href="/cart"
            className="inline-flex w-full items-center justify-center rounded-md border border-orange-500 px-4 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-50"
            onClick={() => setIsOpen(false)}
          >
            Lihat Keranjang
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
