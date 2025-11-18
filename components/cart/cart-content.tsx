"use client";

import { Cart } from "@/lib/bagisto/types";
import CartItemsList from "./cart-items-list";
import CartSummary from "./cart-summary";

export default function CartContent({ cart }: { cart: Cart }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Cart Items Section - Takes 2/3 of space on large screens */}
      <div className="lg:col-span-2">
        <CartItemsList cart={cart} />
      </div>

      {/* Cart Summary Section - Takes 1/3 of space on large screens */}
      <div className="lg:col-span-1">
        <CartSummary cart={cart} />
      </div>
    </div>
  );
}
