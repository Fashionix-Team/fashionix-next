import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

interface Address {
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
  vatId?: string;
  defaultAddress?: boolean;
}

interface AddressListProps {
  addresses: Address[];
  onEdit: (_address: Address) => void;
  onDelete: (_addressId: string) => void;
  onSetDefault: (_addressId: string) => void;
  onAddNew: () => void;
  maxDisplay?: number; // Limit how many addresses to display
  showViewAll?: boolean; // Show "Lihat Semua" button
}

export default function AddressList({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
  onAddNew,
  maxDisplay = 3,
  showViewAll = true,
}: AddressListProps) {
  const formatAddress = (address: Address) => {
    const addressStr = Array.isArray(address.address)
      ? address.address.join(", ")
      : address.address || "";

    return `${addressStr}, ${address.city || ""}, ${address.state || address.stateName || ""}, ${address.country || address.countryName || ""} ${address.postcode || ""}`;
  };

  const displayedAddresses = showViewAll && addresses.length > maxDisplay
    ? addresses.slice(0, maxDisplay)
    : addresses;
  const hasMore = addresses.length > maxDisplay;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Alamat Pengiriman</h2>
          {showViewAll && hasMore && (
            <p className="text-sm text-gray-500">
              Menampilkan {maxDisplay} dari {addresses.length} alamat
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            color="warning"
            onPress={onAddNew}
            size="sm"
          >
            + Tambah Alamat
          </Button>
          {showViewAll && hasMore && (
            <Button
              as={Link}
              href="/customer/account/addresses"
              color="primary"
              variant="flat"
              size="sm"
            >
              Lihat Semua
            </Button>
          )}
        </div>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-default-500 mb-4">Belum ada alamat tersimpan</p>
            <Button
              color="warning"
              onPress={onAddNew}
            >
              Tambah Alamat Pertama
            </Button>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="grid gap-4">
            {displayedAddresses.map((address) => (
              <Card
                key={address.id}
                className={address.defaultAddress ? "border-2 border-primary" : ""}
              >
                <CardBody>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {address.defaultAddress && (
                        <Chip
                          color="primary"
                          size="sm"
                          className="mb-2"
                        >
                          Alamat Utama
                        </Chip>
                      )}
                      <h3 className="font-semibold text-foreground text-lg">
                        {address.firstName} {address.lastName}
                      </h3>
                      {address.companyName && (
                        <p className="text-sm text-default-600">{address.companyName}</p>
                      )}
                      <p className="text-sm text-default-700 mt-2">
                        {formatAddress(address)}
                      </p>
                      <p className="text-sm text-default-600 mt-1">
                        Email: {address.email}
                      </p>
                      <p className="text-sm text-default-600">
                        Telepon: {address.phone}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                        onPress={() => onEdit(address)}
                      >
                        Edit
                      </Button>
                      {!address.defaultAddress && (
                        <>
                          <Button
                            size="sm"
                            variant="flat"
                            color="success"
                            onPress={() => address.id && onSetDefault(address.id)}
                          >
                            Jadikan Utama
                          </Button>
                          <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                            onPress={() => address.id && onDelete(address.id)}
                          >
                            Hapus
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
