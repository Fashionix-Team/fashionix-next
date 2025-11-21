"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Pagination } from "@heroui/react";
import AddressModal from "../account/address-modal";
import { createAddress, updateAddress, deleteAddress, setDefaultAddress } from "../account/actions";
import { CustomerAddressDetailTypes } from "@/lib/bagisto/types";
import { useCustomToast } from "@/components/hooks/use-toast";

type AddressesPageClientProps = {
  addressesData: {
    paginatorInfo: {
      count: number;
      currentPage: number;
      lastPage: number;
      total: number;
    };
    data: CustomerAddressDetailTypes[];
  };
  currentPage: number;
};

export default function AddressesPageClient({
  addressesData,
  currentPage,
}: AddressesPageClientProps) {
  const { showToast } = useCustomToast()
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<CustomerAddressDetailTypes | null>(null);

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address: CustomerAddressDetailTypes) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: any) => {
    const result = editingAddress?.id
      ? await updateAddress(editingAddress.id, data)
      : await createAddress(data);

    showToast(result.message, result.success ? "success" : "danger");

    if (result.success) {
      setIsModalOpen(false);
      setEditingAddress(null);
      router.refresh();
    }
  };

  const handleDelete = async (addressId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus alamat ini?")) return;

    const result = await deleteAddress(addressId);
    showToast(result.message, result.success ? "success" : "danger");

    if (result.success) {
      router.refresh();
    }
  };

  const handleSetDefault = async (addressId: string) => {
    const result = await setDefaultAddress(addressId);
    showToast(result.message, result.success ? "success" : "danger");

    if (result.success) {
      router.refresh();
    }
  };

  const handlePageChange = (page: number) => {
    router.push(`/customer/account/addresses?page=${page}`);
  };

  return (
    <>
      <div className="mb-6">
        <Button
          variant="flat"
          color="default"
          onPress={() => router.push("/customer/account")}
          className="mb-4"
          startContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          }
        >
          Kembali ke Pengaturan Akun
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Daftar Alamat</h1>
            <p className="text-sm text-gray-600 mt-1">
              Total {addressesData.paginatorInfo.total} alamat
            </p>
          </div>
          <Button color="warning" onPress={handleAddNew}>
            + Tambah Alamat Baru
          </Button>
        </div>
      </div>

      {addressesData.data.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-gray-500">Belum ada alamat tersimpan.</p>
            <Button color="warning" onPress={handleAddNew} className="mt-4">
              Tambah Alamat Pertama
            </Button>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 mb-6">
            {addressesData.data.map((address) => (
              <Card
                key={address.id}
                className={address.defaultAddress ? "border-2 border-warning" : ""}
              >
                <CardBody>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">
                          {address.firstName} {address.lastName}
                        </h3>
                        {address.defaultAddress && (
                          <Chip color="warning" size="sm" variant="flat">
                            Alamat Utama
                          </Chip>
                        )}
                      </div>

                      {address.companyName && (
                        <p className="text-sm text-gray-600">{address.companyName}</p>
                      )}

                      <p className="text-sm mt-2">
                        {Array.isArray(address.address)
                          ? address.address.join(", ")
                          : address.address}
                      </p>

                      <p className="text-sm">
                        {address.city}, {address.stateName || address.state} {address.postcode}
                      </p>

                      <p className="text-sm">{address.countryName || address.country}</p>

                      <div className="mt-2 text-sm text-gray-600">
                        <p>Telepon: {address.phone}</p>
                        {address.email && <p>Email: {address.email}</p>}
                        {address.vatId && <p>VAT ID: {address.vatId}</p>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                        onPress={() => handleEdit(address)}
                      >
                        Edit
                      </Button>

                      {!address.defaultAddress && address.id && (
                        <Button
                          size="sm"
                          variant="flat"
                          color="warning"
                          onPress={() => handleSetDefault(address.id!)}
                        >
                          Jadikan Utama
                        </Button>
                      )}

                      {address.id && (
                        <Button
                          size="sm"
                          variant="flat"
                          color="danger"
                          onPress={() => handleDelete(address.id!)}
                        >
                          Hapus
                        </Button>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {addressesData.paginatorInfo.lastPage > 1 && (
            <div className="flex justify-center">
              <Pagination
                total={addressesData.paginatorInfo.lastPage}
                page={currentPage}
                onChange={handlePageChange}
                showControls
                color="warning"
              />
            </div>
          )}
        </>
      )}

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAddress(null);
        }}
        onSubmit={handleSubmit}
        address={editingAddress}
        title={editingAddress ? "Edit Alamat" : "Tambah Alamat Baru"}
      />
    </>
  );
}
