import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { getAccountInfo, getCheckoutAddress } from "@/lib/bagisto";
import AccountSettingsClient from "@/components/customer/account/account-settings-client";

export const metadata = {
  title: "Pengaturan Akun",
  description: "Kelola informasi akun dan alamat pengiriman Anda di Fashionix.",
};

// Force dynamic rendering - disable caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AccountSettingPage() {
  // Get session - middleware will handle redirect if not logged in
  const session = await getServerSession(authOptions);

  // Double check if user is logged in
  if (!session || !session.user) {
    redirect("/customer/login");
  }

  // Fetch customer data from Bagisto
  let customerData: {
    id?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    phone?: string;
    gender?: string;
    dateOfBirth?: string;
    imageUrl?: string;
    defaultAddress?: any;
    addresses?: any[];
  } = {
    id: "",
    firstName: "",
    lastName: "",
    name: "",
    email: session.user.email || "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    imageUrl: "",
    defaultAddress: undefined,
    addresses: [],
  };

  try {
    // Get customer account info from Bagisto
    let accountInfo = await getAccountInfo();

    // If accountInfo fails or returns null, fallback to checkoutAddresses
    if (!accountInfo) {
      const checkoutAddresses = await getCheckoutAddress();
      if (checkoutAddresses?.customer) {
        accountInfo = checkoutAddresses.customer;
      }
    }

    if (accountInfo) {
      customerData = {
        id: accountInfo.id || "",
        firstName: accountInfo.firstName || "",
        lastName: accountInfo.lastName || "",
        name: accountInfo.name || "",
        email: accountInfo.email || session.user.email || "",
        phone: accountInfo.phone || "",
        gender: accountInfo.gender || "",
        dateOfBirth: accountInfo.dateOfBirth || "",
        imageUrl: accountInfo.imageUrl || accountInfo.image || "",
        defaultAddress: accountInfo.defaultAddress,
        addresses: accountInfo.addresses || [],
      };
    }
  } catch (error) {
    console.error("[AccountPage] Error fetching customer data:", error);
    // Continue with default data from session
  }

  return <AccountSettingsClient customer={customerData} />;
}
