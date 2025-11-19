import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import CheckoutPage from "@/components/checkout/checkout-page";
import { getCountryList, getCart, getAccountInfo, getPaymentMethod } from "@/lib/bagisto";
import { redirect } from "next/navigation";

export default async function Information({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  const { step = "email" } = (await searchParams) as { [key: string]: string };

  // Get cart data from Bagisto
  const cart = await getCart();

  // Redirect to cart if cart is empty
  if (!cart || !cart.items || cart.items.length === 0) {
    redirect("/cart");
  }

  // Get user account info with addresses
  const accountInfo = await getAccountInfo();
  const addresses = accountInfo?.addresses || [];

  const countryList = await getCountryList();

  // Get payment methods from backend
  // Default shipping method bisa disesuaikan berdasarkan yang dipilih user
  const shippingMethod = cart?.selectedShippingRate?.method || "flatrate_flatrate";
  const paymentMethods = await getPaymentMethod({ shippingMethod });

  return (
    <CheckoutPage
      countries={countryList}
      step={step}
      user={session?.user}
      cart={cart}
      addresses={addresses}
      paymentMethods={paymentMethods}
    />
  );
}

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout with store items",
};
