import Image from 'next/image';

interface ShippingMethodsProps {
  methods?: Array<{
    title: string;
    methods: {
      code: string;
      label: string;
      price: number;
      formattedPrice: string;
    } | {
      code: string;
      label: string;
      price: number;
      formattedPrice: string;
    }[];
  }>;
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
  loading?: boolean;
}

export function ShippingMethods({
  methods = [],
  selectedMethod,
  onMethodSelect,
  loading = false
}: ShippingMethodsProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Metode Pengiriman</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Memuat metode pengiriman...</span>
        </div>
      </div>
    );
  }
  
  if (!methods || methods.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Metode Pengiriman</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            Tidak ada metode pengiriman tersedia untuk alamat yang dipilih.
          </p>
          <p className="text-sm text-yellow-600 mt-2">
            Pastikan alamat pengiriman sudah benar dan shipping method sudah dikonfigurasi di backend.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Pengiriman</h2>
      <div className="space-y-3">
        {methods.map((shippingGroup) => {
          const methodsList = Array.isArray(shippingGroup.methods)
            ? shippingGroup.methods
            : [shippingGroup.methods];

          return methodsList.map((method) => (
            <label
              key={method.code}
              className={`flex items-start justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                selectedMethod === method.code
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <input
                  type="radio"
                  name="shipping-method"
                  value={method.code}
                  checked={selectedMethod === method.code}
                  onChange={(e) => onMethodSelect(e.target.value)}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500 mt-0.5"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{method.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{shippingGroup.title}</p>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="font-semibold text-blue-600">
                  {method.formattedPrice}
                </p>
              </div>
            </label>
          ));
        })}
      </div>
    </div>
  );
}
