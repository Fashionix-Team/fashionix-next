import { PaymentMethodsProps } from './types';

export function PaymentMethods({
  selectedMethod,
  onMethodSelect,
  methods = []
}: PaymentMethodsProps) {
  // Jika tidak ada methods dari backend, tampilkan pesan
  if (!methods || methods.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Metode Pembayaran</h2>
        <p className="text-gray-500 text-center py-8">
          Tidak ada metode pembayaran yang tersedia. Silakan pilih metode pengiriman terlebih dahulu.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Metode Pembayaran</h2>

      <div className="space-y-3">
        {methods.map((method: any) => (
          <div
            key={method.method}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === method.method
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onClick={() => onMethodSelect(method.method)}
          >
            <div className="flex items-center gap-4">
              {/* Radio button */}
              <div className="flex-shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === method.method
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedMethod === method.method && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>

              {/* Payment method info */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  {method.image && (
                    <img 
                      src={method.image} 
                      alt={method.methodTitle} 
                      className="h-8 w-auto object-contain"
                    />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{method.methodTitle}</h3>
                    {method.description && (
                      <p className="text-sm text-gray-500 mt-1">{method.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
