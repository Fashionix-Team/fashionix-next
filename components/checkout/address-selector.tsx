'use client';

import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { RadioGroup, Radio } from '@heroui/radio';
import { type CustomerAddressDetailTypes } from '@/lib/bagisto/types';

interface AddressSelectorProps {
  addresses: CustomerAddressDetailTypes[];
  selectedAddressId?: string;
  onAddressSelect: (_addressId: string) => void;
}

export function AddressSelector({
  addresses,
  selectedAddressId,
  onAddressSelect
}: AddressSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Alamat Pengiriman</h2>
        <Link
          href="/customer/account/address"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          Tambah Alamat
        </Link>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Anda belum memiliki alamat tersimpan</p>
          <Link
            href="/customer/account/addresses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
          >
            <PlusIcon className="w-5 h-5" />
            Tambah Alamat Baru
          </Link>
        </div>
      ) : (
        <RadioGroup
          value={selectedAddressId}
          onValueChange={onAddressSelect}
          className="gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <Radio
                key={address.id}
                value={address.id || ''}
                classNames={{
                  base: "inline-flex m-0 min-w-full bg-white hover:bg-gray-50 items-start cursor-pointer rounded-lg gap-2 p-4 border-2 border-gray-200 data-[selected=true]:border-blue-500 transition-colors",
                  control: "mt-1 flex-shrink-0",
                }}
              >
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      {address.firstName} {address.lastName}
                    </span>
                    {address.defaultAddress && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{address.address}</p>
                    <p>
                      {address.city}, {address.stateName || address.state} {address.postcode}
                    </p>
                    <p>{address.countryName || address.country}</p>
                    {address.phone && (
                      <p className="font-medium text-gray-900">
                        Telp: {address.phone}
                      </p>
                    )}
                  </div>
                </div>
              </Radio>
            ))}
          </div>
        </RadioGroup>
      )}
    </div>
  );
}
