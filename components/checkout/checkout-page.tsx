'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { type CountryArrayDataType as Country, type Cart, type CustomerAddressDetailTypes, type ShippingArrayDataType } from "@/lib/bagisto/types";
import { AddressSelector } from './address-selector';
import { PaymentMethods } from './payment-methods';
import { ShippingMethods } from './shipping-methods';
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

  // State untuk metode pengiriman
  const [shippingMethods, setShippingMethods] = useState<ShippingArrayDataType[]>([]);
  const [shippingMethod, setShippingMethod] = useState<string>('');
  const [loadingShipping, setLoadingShipping] = useState<boolean>(false);

  // State untuk metode pembayaran
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [orderError, setOrderError] = useState<string>('');
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  // Fetch shipping methods when address is selected
  useEffect(() => {
    const fetchShippingMethods = async () => {
      if (!selectedAddressId) return;

      setLoadingShipping(true);
      try {
        // Save the selected address to the cart and get shipping methods in response
        const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
        if (selectedAddress) {
          const response = await fetch('/api/checkout/save-address', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              billing: selectedAddress,
              shipping: selectedAddress,
            }),
          });

          const result = await response.json();
          
          if (result.success && result.shippingMethods && result.shippingMethods.length > 0) {
            setShippingMethods(result.shippingMethods);
          } else {
            console.warn('No shipping methods in save-address response, trying direct query...');
            
            // Fallback: try to fetch shipping methods directly
            const shippingResponse = await fetch('/api/shipping-methods');
            const shippingResult = await shippingResponse.json();
            
            console.log('Direct shipping methods response:', shippingResult);
            
            if (shippingResult.success && shippingResult.data) {
              setShippingMethods(shippingResult.data);
            } else {
              setShippingMethods([]);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch shipping methods:', error);
      } finally {
        setLoadingShipping(false);
      }
    };

    fetchShippingMethods();
  }, [selectedAddressId, addresses]);

  // Calculate totals from cart
  const subtotal = parseFloat(cart.subTotal);
  const shipping = cart.selectedShippingRate?.price ? parseFloat(cart.selectedShippingRate.price) : 0;
  const total = parseFloat(cart.grandTotal);

  // Handle submit form
  const onSubmit = async () => {
    setOrderError('');
    
    // Validasi
    if (!selectedAddressId) {
      setOrderError('Silakan pilih alamat pengiriman');
      return;
    }
    
    if (!shippingMethod) {
      setOrderError('Silakan pilih metode pengiriman');
      return;
    }
    
    if (!paymentMethod) {
      setOrderError('Silakan pilih metode pembayaran');
      return;
    }

    try {
      // 1. Save shipping method
      console.log('Saving shipping method:', shippingMethod);
      const shippingResponse = await fetch('/api/checkout/save-shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: shippingMethod }),
      });
      
      const shippingResult = await shippingResponse.json();
      
      if (!shippingResponse.ok) {
        throw new Error(shippingResult.message || 'Failed to save shipping method');
      }

      // 2. Save payment method
      console.log('Saving payment method:', paymentMethod);
      const paymentResponse = await fetch('/api/checkout/save-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: paymentMethod }),
      });
      
      const paymentResult = await paymentResponse.json();
      
      if (!paymentResponse.ok) {
        throw new Error(paymentResult.message || 'Failed to save payment method');
      }

      // 3. Place order
      console.log('Placing order...');
      const orderResponse = await fetch('/api/checkout/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const orderResult = await orderResponse.json();
      
      if (!orderResponse.ok || !orderResult.success) {
        throw new Error(orderResult.message || 'Failed to place order');
      }

      console.log('Order placed successfully:', orderResult);
      setOrderSuccess(true);
      
      // Redirect to dashboard after 1 second
      setTimeout(() => {
        window.location.href = '/customer/dashboard';
      }, 1000);
      
    } catch (error: any) {
      console.error('Order error:', error);
      setOrderError(error.message || 'Gagal memproses pesanan. Silakan coba lagi.');
    }
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
        {/* Error Message */}
        {orderError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">{orderError}</p>
          </div>
        )}

        {/* Success Message */}
        {orderSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">
              ✓ Pesanan berhasil dibuat! Mengalihkan ke dashboard...
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri - Alamat Pengiriman & Metode Pembayaran */}
          <div className="lg:col-span-2">
            <AddressSelector
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onAddressSelect={setSelectedAddressId}
            />

            <ShippingMethods
              methods={shippingMethods}
              selectedMethod={shippingMethod}
              onMethodSelect={setShippingMethod}
              loading={loadingShipping}
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