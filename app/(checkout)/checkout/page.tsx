import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import CheckoutPage from "@/components/checkout/checkout-page";
import { getCountryList, getCart } from "@/lib/bagisto";
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

  const countryList = await getCountryList();

  return (
    <CheckoutPage
      countries={countryList}
      step={step}
      user={session?.user}
      cart={cart}
    />
  );
}

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout with store items",
};
