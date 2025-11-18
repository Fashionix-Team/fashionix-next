import { PaymentMethodsProps, PaymentMethod } from './types';

// Default payment methods jika tidak disediakan dari props
const DEFAULT_PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'seabank', name: 'SeaBank' },
  { id: 'linkaja', name: 'Link Aja!' },
  { id: 'ovo', name: 'OVO' },
  { id: 'dana', name: 'DANA' },
  { id: 'gopay', name: 'gopay' },
];

export function PaymentMethods({
  selectedMethod,
  onMethodSelect,
  methods = DEFAULT_PAYMENT_METHODS
}: PaymentMethodsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Metode Pembayaran</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {methods.map(method => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => onMethodSelect(method.id)}
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                <span className="text-xs font-medium">{method.name.substring(0, 2)}</span>
              </div>
              <span className="text-sm font-medium">{method.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
