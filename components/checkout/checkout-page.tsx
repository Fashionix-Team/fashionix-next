'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type CountryArrayDataType as Country, type Cart } from "@/lib/bagisto/types";
import { BillingForm } from './billing-form';
import { PaymentMethods } from './payment-methods';
import { OrderSummary } from './order-summary';
import { type User, type BillingFormData } from './types';

interface CheckoutPageProps {
  countries: Country[];
  step: string;
  user?: User | null;
  cart: Cart;
}

export default function CheckoutPage({ countries, step, user, cart }: CheckoutPageProps) {
  // Setup react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<BillingFormData>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: countries.length > 0 ? countries[0].id : '',
    },
    mode: 'onBlur'
  });

  // State untuk metode pembayaran
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  // Calculate totals from cart
  const subtotal = parseFloat(cart.subTotal);
  const shipping = cart.selectedShippingRate?.price ? parseFloat(cart.selectedShippingRate.price) : 0;
  const total = parseFloat(cart.grandTotal);

  // Handle submit form
  const onSubmit = (data: BillingFormData) => {
    // Logika untuk memproses checkout
    console.log('Form submitted:', data);
    console.log('Payment method:', paymentMethod);

    // TODO: Implement checkout API call
    // - Save billing address using Bagisto mutation
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
          {/* Kolom Kiri - Form Informasi Penagihan & Metode Pembayaran */}
          <div className="lg:col-span-2">
            <BillingForm
              register={register}
              errors={errors}
              countries={countries}
            />

            <PaymentMethods
              selectedMethod={paymentMethod}
              onMethodSelect={setPaymentMethod}
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