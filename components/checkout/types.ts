import { type CountryArrayDataType, type CartItem } from "@/lib/bagisto/types";
import { UseFormRegister, FieldErrors } from "react-hook-form";

// User types - dapat di-export untuk digunakan di komponen lain
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  firstName: string;
  lastName: string;
  accessToken?: string;
  role?: string;
  phone?: string;
}

// Form data untuk billing address
export interface BillingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Order item untuk ringkasan pesanan
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Props untuk komponen-komponen dengan react-hook-form
export interface BillingFormProps {
  register: UseFormRegister<BillingFormData>;
  errors: FieldErrors<BillingFormData>;
  countries: CountryArrayDataType[];
}

export interface PaymentMethodsProps {
  selectedMethod: string;
  onMethodSelect: (_methodId: string) => void;
  methods?: any[]; // Array dari backend dengan struktur: method, methodTitle, description, sort, image
}

export interface OrderSummaryProps {
  items: OrderItem[] | CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  isSubmitting?: boolean;
}
