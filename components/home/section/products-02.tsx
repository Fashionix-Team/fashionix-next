"use client";

import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import ProductsTabs from "../products/product-tabs";
import ProductActions, { IconButton } from "../products/product-actions";
import ProductCard from "../products/product-card";

function WishlistIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20.25C12 20.25 2.625 15 2.625 8.62501C2.625 7.49803 3.01546 6.40585 3.72996 5.53431C4.44445 4.66277 5.43884 4.0657 6.54393 3.84468C7.64903 3.62366 8.79657 3.79235 9.79131 4.32204C10.7861 4.85174 11.5665 5.70972 12 6.75001C12.4335 5.70972 13.2139 4.85174 14.2087 4.32204C15.2034 3.79235 16.351 3.62366 17.4561 3.84468C18.5612 4.0657 19.5555 4.66277 20.27 5.53431C20.9845 6.40585 21.375 7.49803 21.375 8.62501C21.375 15 12 20.25 12 20.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.25 20.25C8.25 20.6642 7.91421 21 7.5 21C7.08579 21 6.75 20.6642 6.75 20.25C6.75 19.8358 7.08579 19.5 7.5 19.5C7.91421 19.5 8.25 19.8358 8.25 20.25Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17.25 21.75C18.0784 21.75 18.75 21.0784 18.75 20.25C18.75 19.4216 18.0784 18.75 17.25 18.75C16.4216 18.75 15.75 19.4216 15.75 20.25C15.75 21.0784 16.4216 21.75 17.25 21.75Z" fill="currentColor" />
      <path d="M3.96562 6.75H20.7844L18.3094 15.4125C18.2211 15.7269 18.032 16.0036 17.7711 16.2C17.5103 16.3965 17.1922 16.5019 16.8656 16.5H7.88437C7.55783 16.5019 7.2397 16.3965 6.97886 16.2C6.71803 16.0036 6.52893 15.7269 6.44062 15.4125L3.04688 3.54375C3.00203 3.38696 2.9073 3.24905 2.77704 3.15093C2.64677 3.05282 2.48808 2.99983 2.325 3H0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ViewIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Products02Section() {
  return (
    <section className="py-[72px]">
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="grid gap-8 2xl:grid-cols-12">
          {/* Products */}
          <main className="order-2 2xl:order-1 2xl:col-span-9">
            <ProductsTabs
              products={PRODUCTS}
              renderGrid={(list) => (
                <div className="mt-8">
                  <div className="grid grid-cols-1 gap-4 mx-[30px] sm:mx-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {list.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        actions={
                          <ProductActions>
                            <IconButton ariaLabel="Add to wishlist">
                              <WishlistIcon />
                            </IconButton>
                            <IconButton ariaLabel="Add to cart">
                              <CartIcon />
                            </IconButton>
                            <IconButton ariaLabel="Quick view">
                              <ViewIcon />
                            </IconButton>
                          </ProductActions>
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            />
          </main>
        </div>
      </div>
    </section>
  );
}
