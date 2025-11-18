import { Metadata } from "next";

import CheckOut from "@/components/checkout/information/checkout";
import { getCountryList } from "@/lib/bagisto";

export default async function Information({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { step = "email" } = (await searchParams) as { [key: string]: string };

  let countryList: any = [];
  try {
    countryList = await getCountryList();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Checkout page: failed to load country list:", error);
    countryList = [];
  }

  return <CheckOut countries={countryList} step={step} />;
}

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout with store items",
};
