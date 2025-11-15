import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getAccountInfo, getCheckoutAddress } from "@/lib/bagisto";
import AddressesPageClient from "@/components/customer/addresses/addresses-page-client";

export const metadata = {
  title: "Daftar Alamat - Fashionix",
  description: "Kelola alamat pengiriman Anda",
};

// Force dynamic rendering - disable caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AddressesPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const searchParams = await props.searchParams;
  const currentPage = parseInt(searchParams.page || "1", 10);
  const itemsPerPage = 10;

  // Fetch addresses using the same approach as account page
  let addresses: any[] = [];

  try {
    let accountInfo = await getAccountInfo();

    if (!accountInfo) {
      const checkoutAddresses = await getCheckoutAddress();
      if (checkoutAddresses?.customer) {
        accountInfo = checkoutAddresses.customer;
      }
    }

    if (accountInfo?.addresses) {
      addresses = accountInfo.addresses;
    }
  } catch (error) {
    console.error("[AddressesPage] Error fetching addresses:", error);
  }

  // Manual pagination
  const total = addresses.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAddresses = addresses.slice(startIndex, endIndex);

  const addressesData = {
    paginatorInfo: {
      count: paginatedAddresses.length,
      currentPage: currentPage,
      lastPage: Math.ceil(total / itemsPerPage),
      total: total,
    },
    data: paginatedAddresses,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AddressesPageClient
        addressesData={addressesData}
        currentPage={currentPage}
      />
    </div>
  );
}
