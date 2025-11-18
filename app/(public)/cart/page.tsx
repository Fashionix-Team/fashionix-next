import { Metadata } from "next";
import { isObject } from "@/lib/type-guards";
import { getCart } from "@/lib/bagisto";
import Cart from "@/components/checkout/cart/cart";
import Price from "@/components/price";
import { isCheckout } from "@/lib/utils";
import { redirectToCheckout } from "@/components/cart/actions";
import RetryClient from "@/components/cart/retry-client";
import type { BagistoCart } from "@/lib/bagisto/types";

export const metadata: Metadata = {
  title: "Keranjang Belanja",
  description: "Lihat item di keranjang dan lanjutkan ke pembayaran",
};

export default async function ShoppingCartPage() {
  let cart: BagistoCart | undefined = undefined;
  try {
    cart = await getCart();
  } catch (err) {
    // Jika ada error saat memanggil Bagisto, tampilkan fallback yang ramah
    return (
      <div className="container mx-auto py-24">
        <div className="mx-auto max-w-3xl rounded-md border border-neutral-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold">Oh no!</h1>
          <p className="mt-4 text-neutral-600 text-sm">
            There was an issue with our storefront. This could be a temporary issue,
            please try your action again.
          </p>
          <div className="mt-8">
            <RetryClient />
          </div>
        </div>
      </div>
    );
  }

  if (!isObject(cart)) {
    return (
      <div className="container mx-auto py-24">
        <div className="rounded-md border border-neutral-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold">Keranjang Belanja</h1>
          <p className="mt-4 text-neutral-600">Keranjang Anda kosong.</p>
        </div>
      </div>
    );
  }

  const checkoutUrl = isCheckout(
    (cart.items as any) ?? [],
    (cart.isGuest as boolean) ?? true,
    (cart.customerEmail as string) ?? "",
    Boolean(cart?.billingAddress),
    Boolean(cart?.selectedShippingRate),
    Boolean(cart?.payment)
  );

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="rounded-md border bg-white">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Keranjang Belanja</h2>
              <Cart cart={cart} />
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="rounded-md border bg-white p-6">
            <h3 className="mb-4 text-lg font-medium">Total Keranjang</h3>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-neutral-600">Subtotal</span>
              <Price amount={String((cart.subTotal as any) || "0")} className="text-base font-medium" currencyCode={String(cart.cartCurrencyCode ?? "USD")} />
            </div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-neutral-600">Pengiriman</span>
              {isObject(cart.selectedShippingRate) ? (
                <Price amount={String((cart.selectedShippingRate as any)?.price || "0")} className="text-base font-medium" currencyCode={String(cart.cartCurrencyCode ?? "USD")} />
              ) : (
                <span className="text-sm">Gratis</span>
              )}
            </div>
            <div className="mb-6 flex items-center justify-between border-t pt-4">
              <span className="text-lg font-semibold">Total</span>
              <Price amount={String((cart.grandTotal as any) || "0")} className="text-lg font-semibold" currencyCode={String(cart.cartCurrencyCode ?? "USD")} />
            </div>

            <form action={redirectToCheckout} className=""> 
              <input name="url" type="hidden" value={checkoutUrl} />
              <button
                type="submit"
                className="w-full rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:opacity-95"
              >
                LANJUT KE PEMBAYARAN
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
