"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileImageUpload from "./profile-image-upload";
import AccountInfoForm from "./account-info-form";
import PasswordChangeForm from "./password-change-form";
import AddressList from "./address-list";
import AddressModal from "./address-modal";
import {
  updateAccountInfo,
  updatePassword,
  createAddress,
  updateAddress,
  setDefaultAddress,
  deleteAddress,
  uploadProfileImage,
} from "./actions";
import { AccountInfoInputs } from "./account-info-form";
import { PasswordChangeInputs } from "./password-change-form";
import { AddressInputs } from "./address-form";
import { useCustomToast } from "@/components/hooks/use-toast";

interface AddressDetailType {
  id?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  address?: string | string[];
  city?: string;
  state?: string;
  stateName?: string;
  country?: string;
  countryName?: string;
  postcode?: string;
  email?: string;
  phone?: string;
}

interface CustomerData {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  imageUrl?: string;
  defaultAddress?: AddressDetailType;
  addresses?: AddressDetailType[];
}

interface AccountSettingsClientProps {
  customer: CustomerData;
}

export default function AccountSettingsClient({
  customer,
}: AccountSettingsClientProps) {
  const router = useRouter();
  const { showToast } = useCustomToast();
  const [_profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressDetailType | null>(null);

  // Debug: Log customer data
  console.log("[AccountSettingsClient] Customer data:", customer);
  console.log("[AccountSettingsClient] Addresses:", customer.addresses);

  // Prepare customer data for form
  const customerData = {
    firstName: customer.firstName || "",
    lastName: customer.lastName || "",
    email: customer.email || "",
    phone: customer.phone || "",
    gender: customer.gender || "Other", // Default to Other if not set
    dateOfBirth: customer.dateOfBirth || "",
    imageUrl: customer.imageUrl || "",
  };

  const handleProfileImageChange = async (file: File | null) => {
    setProfileImageFile(file);

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const result = await uploadProfileImage(formData);
        if (!result.success) {
          console.error("Failed to upload image:", result.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleAccountInfoSubmit = async (data: AccountInfoInputs) => {
    const result = await updateAccountInfo(data);
    if (!result.success) {
      throw new Error(result.message);
    }
    // Refresh the page to get updated data from server
    router.refresh();
  };

  const handlePasswordChangeSubmit = async (data: PasswordChangeInputs) => {
    const result = await updatePassword(data, {
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      email: customer.email || "",
      phone: customer.phone || "",
      gender: customer.gender,
    });
    if (!result.success) {
      throw new Error(result.message);
    }
    // Refresh the page to get updated data from server
    router.refresh();
  };

  const handleAddressSubmit = async (data: AddressInputs) => {
    try {
      let result;
      if (editingAddress?.id) {
        // Update existing address
        result = await updateAddress(editingAddress.id, data);
      } else {
        // Create new address
        result = await createAddress(data);
      }

      if (!result.success) {
        throw new Error(result.message);
      }

      showToast(result.message || "Alamat berhasil disimpan", "success");
      setIsAddressModalOpen(false);
      setEditingAddress(null);
      router.refresh();
    } catch (error: any) {
      showToast(error?.message || "Gagal menyimpan alamat", "danger");
      throw error;
    }
  };

  const handleEditAddress = (address: AddressDetailType) => {
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsAddressModalOpen(true);
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      const result = await setDefaultAddress(addressId);
      if (!result.success) {
        throw new Error(result.message);
      }
      showToast(result.message || "Alamat utama berhasil diatur", "success");
      router.refresh();
    } catch (error: any) {
      showToast(error?.message || "Gagal mengatur alamat utama", "danger");
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus alamat ini?")) {
      return;
    }

    try {
      const result = await deleteAddress(addressId);
      if (!result.success) {
        throw new Error(result.message);
      }
      showToast(result.message || "Alamat berhasil dihapus", "success");
      router.refresh();
    } catch (error: any) {
      showToast(error?.message || "Gagal menghapus alamat", "danger");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-semibold mb-8">Pengaturan Akun</h1>

      {/* Profile Image and Account Info Section */}
      <div className="mb-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-5 border-b pb-2">
            Informasi Profil
          </h2>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <ProfileImageUpload
              currentImage={customerData.imageUrl}
              onImageChange={handleProfileImageChange}
            />

            <div className="w-full md:w-2/3">
              <AccountInfoForm
                defaultValues={customerData}
                onSubmit={handleAccountInfoSubmit}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="mb-6">
        <PasswordChangeForm onSubmit={handlePasswordChangeSubmit} />
      </div>

      {/* Address Management Section */}
      <div className="mb-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <AddressList
            addresses={customer.addresses || []}
            onEdit={handleEditAddress}
            onDelete={handleDeleteAddress}
            onSetDefault={handleSetDefaultAddress}
            onAddNew={handleAddNewAddress}
          />
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          setEditingAddress(null);
        }}
        onSubmit={handleAddressSubmit}
        address={editingAddress}
        title={editingAddress ? "Edit Alamat" : "Tambah Alamat Baru"}
      />
    </div>
  );
}
