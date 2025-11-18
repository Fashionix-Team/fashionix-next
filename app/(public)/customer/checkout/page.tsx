import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import CheckoutPage from "@/components/customer/checkout/checkout-page";
import { getCountryList } from "@/lib/bagisto";

export default async function Information({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) { 
  const session = await getServerSession(authOptions);
  const { step = "email" } = (await searchParams) as { [key: string]: string };

  const countryList = await getCountryList();

  return (
    <CheckoutPage 
      countries={countryList} 
      step={step}
      user={session?.user}
    />
  );
}

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout with store items",
};