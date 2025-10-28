"use client";

import { useMemo, useState } from "react";

export default function DeskNav() {
  // demo state just to make the cart & user dropdowns work
  const [cartOpen, setCartOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [items, setItems] = useState([
    {
      id: "cam",
      img: "/image/product/product-43.png",
      name: "Canon EOS 1500D DSLR Camera Body+ 18-55 mm",
      qty: 1,
      price: 1500,
    },
    {
      id: "phn",
      img: "/image/product/product-44.png",
      name: "Simple Mobile 5G LTE Galexy 12 Mini 512GB Gaming Phone",
      qty: 2,
      price: 269,
    },
  ]);

  const subTotal = useMemo(
    () => items.reduce((s, i) => s +  i.qty * i.price, 0),
    [items]
  );

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="hidden lg:block">
      {/* Shell */}
      <div className="bg-[#1B6392]">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a href="index.html" className="inline-flex items-center">
              <img
                src="/image/logo/logo-white.png"
                alt="logo"
                className="h-8 w-auto"
              />
            </a>

            {/* Search */}
            <form
              action="#"
              className="relative w-full max-w-xl mx-6 hidden xl:block"
            >
              <input
                type="text"
                className="w-full rounded-md bg-white/95 text-[#191C1F] placeholder-[#25373F]/70 border border-black/10 pl-11 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Cari apa saja..."
              />
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#191C1F]"
                >
                  <path
                    d="M9.5625 15.625C13.1869 15.625 16.125 12.6869 16.125 9.0625C16.125 5.43813 13.1869 2.5 9.5625 2.5C5.93813 2.5 3 5.43813
                        3 9.0625C3 12.6869 5.93813 15.625 9.5625 15.625Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.2031 13.7031L18 17.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </form>

            {/* Widgets */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <div className="relative">
                <button
                  id="showHiddenMenuOne"
                  className="inline-flex rounded-md p-1.5 text-white/90 hover:text-white transition"
                  onClick={() => {
                    setCartOpen((v) => !v);
                    setUserOpen(false);
                  }}
                  aria-haspopup="dialog"
                  aria-expanded={cartOpen}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M10 29C11.1046 29 12 28.1046 12 27C12 25.8954 11.1046 25 10 25C8.89543 25 8 25.8954 8 27C8 28.1046 8.89543 29 10 29Z"
                      fill="currentColor"
                    />
                    <path
                      d="M23 29C24.1046 29 25 28.1046 25 27C25 25.8954 24.1046 25 23 25C21.8954 25 21 25.8954 21 27C21 28.1046 21.8954 29 23
                                        29Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.2875 9H27.7125L24.4125 20.55C24.2948 20.9692 24.0426 21.3381 23.6948 21.6001C23.3471 21.862 22.9229 22.0025 22.4875
                                        22H10.5125C10.0771 22.0025 9.65293 21.862 9.30515 21.6001C8.95738 21.3381 8.70524 20.9692 8.5875 20.55L4.0625
                                        4.725C4.0027 4.51594 3.8764 4.33207 3.70271 4.20125C3.52903 4.07042 3.31744 3.99977 3.1 4H1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* badge */}
                {items.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1.5 text-[10px] font-semibold text-white">
                    {items.reduce((n, i) => n + i.qty, 0)}
                  </span>
                )}

                {/* Cart popup */}
                {cartOpen && (
                  <div
                    className="absolute right-0 z-50 mt-3 w-[360px] overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl"
                    role="dialog"
                  >
                    <div className="border-b border-black/10 px-4 py-3">
                      <h6 className="text-sm font-semibold text-gray-900">
                        Shopping Cart{" "}
                        <span className="text-gray-500">
                          ({String(items.reduce((n, i) => n + i.qty, 0)).padStart(2, "0")})
                        </span>
                      </h6>
                    </div>

                    <div className="max-h-80 overflow-y-auto px-4 py-3">
                      {items.length === 0 ? (
                        <p className="text-sm text-gray-600">Your cart is empty.</p>
                      ) : (
                        items.map((it) => (
                          <div
                            key={it.id}
                            className="flex items-start gap-3 py-3 border-b last:border-b-0 border-gray-100"
                          >
                            <img
                              src={it.img}
                              alt="product"
                              className="h-14 w-14 rounded-md object-contain bg-gray-50"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-2 text-sm text-gray-800">
                                {it.name}
                              </p>
                              <div className="mt-1 text-sm">
                                <span className="text-gray-700">{it.qty} x</span>{" "}
                                <span className="font-semibold text-gray-900">
                                  ${it.price.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <button
                              className="shrink-0 rounded-md p-1 hover:bg-gray-100"
                              onClick={() => removeItem(it.id)}
                              aria-label="Remove item"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.5 3.5L3.5 12.5"
                                  stroke="#929FA5"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12.5 12.5L3.5 3.5"
                                  stroke="#929FA5"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                      <p className="text-xs text-gray-600">Sub-Total</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${subTotal.toLocaleString()} USD
                      </p>
                    </div>

                    <div className="space-y-2 px-4 py-3">
                      <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-[#191C1F] hover:bg-orange-400">
                        Checkout now
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.625 10H17.375"
                            stroke="#191C1F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M11.75 4.375L17.375 10L11.75 15.625"
                            stroke="#191C1F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button className="inline-flex w-full items-center justify-center rounded-md border border-orange-500 px-4 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-50">
                        View Cart
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <button
                className="rounded-md p-1.5 text-white/90 hover:text-white transition"
                aria-label="Wishlist"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M16 27C16 27 3.5 20 3.5 11.5C3.5 9.99737 4.02062 8.54114 4.97328 7.37908C5.92593 6.21703 7.25178 5.42093 8.72525
                                        5.12624C10.1987 4.83154 11.7288 5.05646 13.0551 5.76272C14.3814 6.46898 15.4221 7.61296 16 9.00001C16.5779 7.61296
                                        17.6186 6.46898 18.9449 5.76272C20.2712 5.05646 21.8013 4.83154 23.2748 5.12624C24.7482 5.42093 26.0741 6.21703 27.0267
                                        7.37908C27.9794 8.54114 28.5 9.99737 28.5 11.5C28.5 20 16 27 16 27Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* User */}
              <div className="relative">
                <button
                  id="showHiddenMenuTwo"
                  className="rounded-md p-1.5 text-white/90 hover:text-white transition"
                  onClick={() => {
                    setUserOpen((v) => !v);
                    setCartOpen(false);
                  }}
                  aria-haspopup="dialog"
                  aria-expanded={userOpen}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M3.875 27.0001C5.10367 24.8716 6.87104 23.104 8.99944 21.875C11.1278 20.646 13.5423 19.999 16 19.999C18.4577 19.999 20.8722 20.646 23.0006 21.875C25.129 23.104 26.8963 24.8716 28.125 27.0001"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {userOpen && (
                  <div
                    id="hiddenWidgetTwo"
                    className="absolute right-0 z-50 mt-3 w-[360px] rounded-xl border border-black/10 bg-white p-5 shadow-2xl"
                    role="dialog"
                  >
                    <h2 className="mb-3 text-lg font-semibold text-gray-900">
                      Sign in to your account
                    </h2>

                    <form action="#" className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full rounded-md border border-black/10 bg-white px-3 py-2.5 text-gray-700 placeholder-[#25373F]/70 outline-none focus:ring-2 focus:ring-orange-400"
                        />
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <a
                            href="#"
                            className="text-sm font-medium text-[#1B6392] hover:underline"
                          >
                            Forget Password
                          </a>
                        </div>

                        <div className="relative">
                          <input
                            id="password"
                            type="password"
                            placeholder="password"
                            className="w-full rounded-md border border-black/10 bg-white px-3 py-2.5 pr-10 text-gray-700 outline-none placeholder-[#25373F]/70 focus:ring-2 focus:ring-orange-400"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                            <i className="far fa-eye" />
                          </div>
                        </div>
                      </div>

                      <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-[#191C1F] hover:bg-orange-400">
                        Login
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.625 10H17.375"
                            stroke="#191C1F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M11.75 4.375L17.375 10L11.75 15.625"
                            stroke="#191C1F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Don’t have account</p>
                        <a
                          href="#"
                          className="inline-flex w-full items-center justify-center rounded-md border border-orange-500 px-4 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-50"
                        >
                          Create account
                        </a>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
            {/* /widgets */}
          </div>
        </div>
      </div>
    </div>
  );
}