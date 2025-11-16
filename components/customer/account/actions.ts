"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { bagistoFetch } from "@/lib/bagisto";
import { TAGS } from "@/lib/constants";
import { AccountInfoInputs } from "./account-info-form";
import { PasswordChangeInputs } from "./password-change-form";
import { AddressInputs } from "./address-form";

// Helper function to convert gender to GraphQL enum format
// Bagisto returns: Male/Female/Other but expects: MALE/FEMALE/OTHER
function toGenderEnum(gender?: string): string {
  if (!gender) return "OTHER";

  const normalized = gender.toLowerCase();
  if (normalized === "male") return "MALE";
  if (normalized === "female") return "FEMALE";
  return "OTHER";
}

// GraphQL Mutations
const UpdateAccountMutation = /* GraphQL */ `
  mutation UpdateAccount($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
      success
      message
      customer {
        id
        firstName
        lastName
        name
        email
        phone
        gender
        dateOfBirth
        image
        imageUrl
      }
    }
  }
`;

// Password change uses the same updateAccount mutation
// No separate UpdatePasswordMutation needed

const CreateAddressMutation = /* GraphQL */ `
  mutation CreateAddress($input: AddressInput!) {
    createAddress(input: $input) {
      success
      message
      address {
        id
        firstName
        lastName
        companyName
        address
        city
        state
        country
        postcode
        email
        phone
      }
    }
  }
`;

const UpdateAddressMutation = /* GraphQL */ `
  mutation UpdateAddress($id: ID!, $input: AddressInput!) {
    updateAddress(id: $id, input: $input) {
      success
      message
      address {
        id
        firstName
        lastName
        companyName
        address
        city
        state
        country
        postcode
        email
        phone
      }
    }
  }
`;

const SetDefaultAddressMutation = /* GraphQL */ `
  mutation SetDefaultAddress($id: ID!) {
    setDefaultAddress(id: $id) {
      success
      message
    }
  }
`;

const DeleteAddressMutation = /* GraphQL */ `
  mutation DeleteAddress($id: ID!) {
    deleteAddress(id: $id) {
      success
      message
    }
  }
`;

// Server Actions
export async function updateAccountInfo(data: AccountInfoInputs) {
  try {
    console.log("[updateAccountInfo] Input data:", data);

    const res = await bagistoFetch<any>({
      query: UpdateAccountMutation,
      variables: {
        input: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          gender: toGenderEnum(data.gender), // Convert to MALE/FEMALE/OTHER
          dateOfBirth: data.dateOfBirth,
        },
      },
      cache: "no-store",
    });

    console.log("[updateAccountInfo] Response:", JSON.stringify(res.body, null, 2));

    if (res.body.data?.updateAccount?.success) {
      console.log("[updateAccountInfo] Success!");
      console.log("[updateAccountInfo] Customer data from mutation response:");
      console.log("  - phone:", res.body.data.updateAccount.customer?.phone);
      console.log("  - gender:", res.body.data.updateAccount.customer?.gender);
      console.log("  - dateOfBirth:", res.body.data.updateAccount.customer?.dateOfBirth);

      // Revalidate cache to fetch fresh customer data
      revalidateTag(TAGS.address);
      revalidatePath("/customer/account");

      return {
        success: true,
        message: res.body.data.updateAccount.message,
        data: res.body.data.updateAccount.customer,
      };
    } else {
      const errorMsg = res.body.data?.updateAccount?.message || "Gagal memperbarui akun";
      console.error("[updateAccountInfo] Failed:", errorMsg);
      console.error("[updateAccountInfo] Full response:", res.body);
      return {
        success: false,
        message: errorMsg,
      };
    }
  } catch (error: any) {
    console.error("[updateAccountInfo] Exception caught:", error);
    console.error("[updateAccountInfo] Error details:", {
      message: error?.message,
      cause: error?.cause,
      stack: error?.stack,
      response: error?.response,
      body: error?.body,
    });

    return {
      success: false,
      message: error?.message || "Terjadi kesalahan saat memperbarui akun",
      details: error,
    };
  }
}

export async function updatePassword(
  data: PasswordChangeInputs,
  customerData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender?: string;
  }
) {
  try {
    console.log("[updatePassword] Attempting password change...");

    const res = await bagistoFetch<any>({
      query: UpdateAccountMutation,
      variables: {
        input: {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          email: customerData.email,
          phone: customerData.phone,
          gender: toGenderEnum(customerData.gender), // Convert to MALE/FEMALE/OTHER
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          newPasswordConfirmation: data.confirmPassword,
        },
      },
      cache: "no-store",
    });

    console.log("[updatePassword] Response:", JSON.stringify(res.body, null, 2));

    if (res.body.data?.updateAccount?.success) {
      console.log("[updatePassword] Success!");

      // Revalidate cache to fetch fresh customer data
      revalidateTag(TAGS.address);
      revalidatePath("/customer/account");

      return {
        success: true,
        message: res.body.data.updateAccount.message,
      };
    } else {
      const errorMsg = res.body.data?.updateAccount?.message || "Gagal mengubah kata sandi";
      console.error("[updatePassword] Failed:", errorMsg);
      console.error("[updatePassword] Full response:", res.body);
      return {
        success: false,
        message: errorMsg,
      };
    }
  } catch (error: any) {
    console.error("[updatePassword] Exception caught:", error);
    console.error("[updatePassword] Error details:", {
      message: error?.message,
      cause: error?.cause,
      stack: error?.stack,
    });

    return {
      success: false,
      message: error?.message || "Terjadi kesalahan saat mengubah kata sandi",
      details: error,
    };
  }
}

export async function createAddress(data: AddressInputs) {
  try {
    const res = await bagistoFetch<any>({
      query: CreateAddressMutation,
      variables: {
        input: {
          firstName: data.firstName,
          lastName: data.lastName,
          companyName: data.companyName || "",
          address: Array.isArray(data.address) ? data.address : [data.address],
          city: data.city,
          state: data.state,
          country: data.country,
          postcode: data.postcode,
          email: data.email,
          phone: data.phone,
          vatId: data.vatId || "",
          defaultAddress: true, // Set as default address
        },
      },
      cache: "no-store",
    });

    if (res.body.data?.createAddress?.success) {
      // Revalidate cache to fetch fresh customer data
      revalidateTag(TAGS.address);
      revalidatePath("/customer/account", "page");
      revalidatePath("/customer/account/addresses", "page");

      return {
        success: true,
        message: res.body.data.createAddress.message,
        data: res.body.data.createAddress.address,
      };
    } else {
      return {
        success: false,
        message:
          res.body.data?.createAddress?.message || "Gagal menambahkan alamat",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Terjadi kesalahan saat menambahkan alamat",
    };
  }
}

export async function updateAddress(id: string, data: AddressInputs) {
  try {
    console.log("[updateAddress] Address ID:", id);
    console.log("[updateAddress] Input data:", data);

    const res = await bagistoFetch<any>({
      query: UpdateAddressMutation,
      variables: {
        id,
        input: {
          firstName: data.firstName,
          lastName: data.lastName,
          companyName: data.companyName || "",
          address: Array.isArray(data.address) ? data.address : [data.address],
          city: data.city,
          state: data.state,
          country: data.country,
          postcode: data.postcode,
          email: data.email,
          phone: data.phone,
          vatId: data.vatId || "",
          defaultAddress: true, // Keep as default
        },
      },
      cache: "no-store",
    });

    console.log("[updateAddress] Response:", JSON.stringify(res.body, null, 2));

    if (res.body.data?.updateAddress?.success) {
      console.log("[updateAddress] Success!");

      // Revalidate cache to fetch fresh customer data
      revalidateTag(TAGS.address);
      revalidatePath("/customer/account", "page");
      revalidatePath("/customer/account/addresses", "page");

      return {
        success: true,
        message: res.body.data.updateAddress.message,
        data: res.body.data.updateAddress.address,
      };
    } else {
      const errorMsg = res.body.data?.updateAddress?.message || "Gagal memperbarui alamat";
      console.error("[updateAddress] Failed:", errorMsg);
      console.error("[updateAddress] Full response:", res.body);
      return {
        success: false,
        message: errorMsg,
      };
    }
  } catch (error: any) {
    console.error("[updateAddress] Exception caught:", error);
    console.error("[updateAddress] Error details:", {
      message: error?.message,
      cause: error?.cause,
      stack: error?.stack,
    });

    return {
      success: false,
      message: error?.message || "Terjadi kesalahan saat memperbarui alamat",
      details: error,
    };
  }
}

export async function setDefaultAddress(id: string) {
  try {
    const res = await bagistoFetch<any>({
      query: SetDefaultAddressMutation,
      variables: { id },
      cache: "no-store",
    });

    if (res.body.data?.setDefaultAddress?.success) {
      // Revalidate cache to fetch fresh customer data
      revalidateTag(TAGS.address);
      revalidatePath("/customer/account", "page");
      revalidatePath("/customer/account/addresses", "page");

      return {
        success: true,
        message: res.body.data.setDefaultAddress.message,
      };
    } else {
      return {
        success: false,
        message: res.body.data?.setDefaultAddress?.message || "Gagal mengatur alamat utama",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Terjadi kesalahan saat mengatur alamat utama",
    };
  }
}

export async function deleteAddress(id: string) {
  try {
    const res = await bagistoFetch<any>({
      query: DeleteAddressMutation,
      variables: { id },
      cache: "no-store",
    });

    if (res.body.data?.deleteAddress?.success) {
      // Revalidate cache to fetch fresh customer data
      revalidateTag(TAGS.address);
      revalidatePath("/customer/account", "page");
      revalidatePath("/customer/account/addresses", "page");

      return {
        success: true,
        message: res.body.data.deleteAddress.message,
      };
    } else {
      return {
        success: false,
        message: res.body.data?.deleteAddress?.message || "Gagal menghapus alamat",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Terjadi kesalahan saat menghapus alamat",
    };
  }
}

export async function uploadProfileImage(formData: FormData) {
  try {
    // In a real implementation, this would upload the image to your backend
    // For now, this is a placeholder
    const file = formData.get("image") as File;

    if (!file) {
      return {
        success: false,
        message: "Tidak ada file yang diunggah",
      };
    }

    // TODO: Implement actual image upload to Bagisto backend
    // This might involve:
    // 1. Uploading to cloud storage (AWS S3, Cloudinary, etc.)
    // 2. Calling Bagisto API to update customer image URL
    // 3. Returning the new image URL

    return {
      success: true,
      message: "Gambar profil berhasil diunggah",
      imageUrl: "/placeholder-image-url", // Replace with actual URL
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Gagal mengunggah gambar profil",
    };
  }
}
