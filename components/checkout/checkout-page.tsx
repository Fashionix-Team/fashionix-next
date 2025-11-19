'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type CountryArrayDataType as Country, type Cart, type CustomerAddressDetailTypes } from "@/lib/bagisto/types";
import { AddressSelector } from './address-selector';
import { PaymentMethods } from './payment-methods';
import { OrderSummary } from './order-summary';
import { type User, type BillingFormData } from './types';

interface CheckoutPageProps {
  countries: Country[];
  step: string;
  user?: User | null;
  cart: Cart;
  addresses: CustomerAddressDetailTypes[];
  paymentMethods?: any[];
}

export default function CheckoutPage({ step, user, cart, addresses, paymentMethods }: CheckoutPageProps) {
  // Setup react-hook-form
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<BillingFormData>({
    mode: 'onBlur'
  });

  // State untuk alamat yang dipilih
  const defaultAddress = addresses.find(addr => addr.defaultAddress);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    defaultAddress?.id || addresses[0]?.id || ''
  );

  // State untuk metode pembayaran
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  // Calculate totals from cart
  const subtotal = parseFloat(cart.subTotal);
  const shipping = cart.selectedShippingRate?.price ? parseFloat(cart.selectedShippingRate.price) : 0;
  const total = parseFloat(cart.grandTotal);

  // Handle submit form
  const onSubmit = () => {
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

    // Logika untuk memproses checkout
    console.log('Selected address:', selectedAddress);
    console.log('Payment method:', paymentMethod);

    // TODO: Implement checkout API call
    // - Save billing/shipping address using Bagisto mutation
    // - Save payment method
    // - Place order
  };

  return (
    <div className="container mx-auto px-4 py-10 lg:py-16">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {user && (
        <p className="mb-6 text-gray-600">
          Anda checkout sebagai {user.firstName} {user.lastName} ({user.email})
        </p>
      )}

      {/* Menambahkan penggunaan 'step' untuk menghilangkan error */}
      <p className="mb-6 text-sm text-gray-500">
        Langkah saat ini: {step}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri - Alamat Pengiriman & Metode Pembayaran */}
          <div className="lg:col-span-2">
            <AddressSelector
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onAddressSelect={setSelectedAddressId}
            />

            <PaymentMethods
              selectedMethod={paymentMethod}
              onMethodSelect={setPaymentMethod}
              methods={paymentMethods}
            />
          </div>

          {/* Kolom Kanan - Ringkasan Pesanan */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={cart.items}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </form>
    </div>
  );
}