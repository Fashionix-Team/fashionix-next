import { getCart } from "@/lib/bagisto";
import { redirect } from "next/navigation";
import CartContent from "@/components/cart/cart-content";

export const metadata = {
  title: "Keranjang Belanja",
  description: "Keranjang belanja Anda",
};

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || !cart.items || cart.items.length === 0) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <CartContent cart={cart} />
    </div>
  );
}
