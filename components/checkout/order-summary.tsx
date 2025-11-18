import Image from 'next/image';
import { OrderSummaryProps, OrderItem } from './types';
import { type CartItem } from '@/lib/bagisto/types';

// Helper function untuk cek apakah item adalah CartItem dari Bagisto
function isCartItem(item: OrderItem | CartItem): item is CartItem {
  return 'product' in item && 'formattedPrice' in item;
}

export function OrderSummary({ items, subtotal, shipping, total, isSubmitting = false }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h2 className="text-xl font-semibold mb-6">Ringkasan Pesanan</h2>

      <div className="space-y-4 mb-6">
        {items.map(item => {
          // Handle CartItem dari Bagisto
          if (isCartItem(item)) {
            const imageUrl = item.product.cacheBaseImage?.[0]?.smallImageUrl || '';
            const itemPrice = item.formattedPrice.price;

            return (
              <div key={item.id} className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex-shrink-0 relative overflow-hidden">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                      sizes="64px"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="font-medium">
                  Rp. {itemPrice}
                </div>
              </div>
            );
          }

          // Handle OrderItem sederhana
          const orderItem = item as OrderItem;
          return (
            <div key={orderItem.id} className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex-shrink-0 relative overflow-hidden">
                {orderItem.image && (
                  <Image
                    src={orderItem.image}
                    alt={orderItem.name}
                    fill
                    className="object-cover rounded-md"
                    sizes="64px"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{orderItem.name}</h3>
                <p className="text-gray-600 text-sm">Qty: {orderItem.quantity}</p>
              </div>
              <div className="font-medium">
                Rp. {orderItem.price.toLocaleString('id-ID')}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rp. {subtotal.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between">
          <span>Ongkos Kirim</span>
          <span>Rp. {shipping.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
          <span>Total</span>
          <span>Rp. {total.toLocaleString('id-ID')}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition duration-300"
      >
        {isSubmitting ? 'Memproses...' : 'BUAT PESANAN'}
      </button>
    </div>
  );
}
