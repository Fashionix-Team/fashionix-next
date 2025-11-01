"use client"

import { useState } from "react";

function BottomNav() {
  const [catOpen, setCatOpen] = useState(false);
  const [phoneSubOpen, setPhoneSubOpen] = useState(false);

  return (
    <div className="hidden lg:block">
      <div className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="flex items-stretch justify-between">
            {/* Left: Categories + main nav */}
            <div className="flex items-center gap-6 py-3">
              {/* All Category (dropdown) */}
              <div className="relative">
                <button
                  className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#191C1F] hover:bg-gray-50"
                  onClick={() => setCatOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={catOpen}
                >
                  All Category
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M13 6L8 11L3 6" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Root dropdown */}
                {catOpen && (
                  <div
                    className="absolute z-40 mt-2 w-[280px] overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl"
                    role="menu"
                  >
                    <ul className="py-1 text-sm text-gray-800">
                      {[
                        "Computer & Laptop",
                        "Computer Accessories",
                      ].map((t) => (
                        <li key={t}>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-50">
                            {t}
                          </a>
                        </li>
                      ))}

                      {/* Smartphone with sub menu */}
                      <li
                        className="relative"
                        onMouseEnter={() => setPhoneSubOpen(true)}
                        onMouseLeave={() => setPhoneSubOpen(false)}
                      >
                        <a
                          href="#"
                          className="flex items-center justify-between px-4 py-2 hover:bg-gray-50"
                        >
                          <span>SmartPhone</span>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path
                              d="M4.5 2.25L8.25 6L4.5 9.75"
                              stroke="#191C1F"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>

                        {/* Mega submenu */}
                        {phoneSubOpen && (
                          <div className="absolute left-full top-0 z-50 ml-2 w-[720px] rounded-xl border border-black/10 bg-white p-4 shadow-2xl">
                            <div className="flex gap-6">
                              {/* Brands column */}
                              <ul className="min-w-[180px] space-y-2 text-sm">
                                {[
                                  "All",
                                  "iPhone",
                                  "Sansung",
                                  "Realme",
                                  "Xiaomi",
                                  "Oppo",
                                  "Vivo",
                                  "OnePlus",
                                  "Huawei",
                                  "Infinix",
                                  "Tecno",
                                ].map((b) => (
                                  <li key={b}>
                                    <a href="#" className="block rounded px-2 py-1 hover:bg-gray-50">
                                      {b}
                                    </a>
                                  </li>
                                ))}
                              </ul>

                              {/* Featured phones */}
                              <div className="grid flex-1 grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <h6 className="text-xs font-semibold tracking-wide text-gray-500">
                                    FEATURED PHONES
                                  </h6>

                                  {/* Card 1 */}
                                  <a href="#" className="block rounded-lg border border-gray-100 p-3 hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src="/image/featured-itme/f-i-1.png"
                                        alt="accessories"
                                        className="h-14 w-14 rounded bg-gray-50 object-contain"
                                      />
                                      <div className="min-w-0">
                                        <p className="text-sm text-gray-800">
                                          Samsung Electronics <br /> Samsung Galexy S21 5G
                                        </p>
                                        <span className="text-sm font-semibold">$160</span>
                                      </div>
                                    </div>
                                  </a>

                                  {/* Card 2 */}
                                  <a href="#" className="block rounded-lg border border-gray-100 p-3 hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src="/image/featured-itme/f-i-2.png"
                                        alt="accessories"
                                        className="h-14 w-14 rounded bg-gray-50 object-contain"
                                      />
                                      <div className="min-w-0">
                                        <p className="text-sm text-gray-800">
                                          Simple Mobile 5G LTE Galexy <br /> 12 Mini 512GB Gaming Phone
                                        </p>
                                        <span className="text-sm font-semibold">$1,500</span>
                                      </div>
                                    </div>
                                  </a>

                                  {/* Card 3 */}
                                  <a href="#" className="block rounded-lg border border-gray-100 p-3 hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src="/image/featured-itme/f-i-3.png"
                                        alt="accessories"
                                        className="h-14 w-14 rounded bg-gray-50 object-contain"
                                      />
                                      <div className="min-w-0">
                                        <p className="text-sm text-gray-800">
                                          Sony DSCHX8 High Zoom <br /> Point & Shoot Camera
                                        </p>
                                        <span className="text-sm">
                                          <del className="text-gray-400">$3200</del> <span className="font-semibold">$2,300</span>
                                        </span>
                                      </div>
                                    </div>
                                  </a>
                                </div>

                                {/* Discount ad */}
                                <div className="flex items-stretch rounded-xl border border-gray-100">
                                  <div className="flex items-center justify-center bg-gray-50 p-3">
                                    <img
                                      src="/image/featured-itme/d-mobile.png"
                                      alt="accessories"
                                      className="h-28 w-28 object-contain"
                                    />
                                  </div>
                                  <div className="flex-1 p-4">
                                    <h4 className="text-lg font-semibold">21% Discount</h4>
                                    <p className="mt-1 text-sm text-gray-600">
                                      Escape the noise, It’s time to hear the magic with Xiaomi Earbuds.
                                    </p>
                                    <div className="mt-2 text-sm">
                                      <span className="text-gray-600">Starting price:</span>{" "}
                                      <span className="font-semibold">$99 USD</span>
                                    </div>
                                    <a
                                      href="#"
                                      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-[#191C1F] hover:bg-orange-400"
                                    >
                                      Shop now
                                      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" aria-hidden="true">
                                        <path d="M3.625 10H17.375" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path
                                          d="M11.75 4.375L17.375 10L11.75 15.625"
                                          stroke="#191C1F"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>

                      {[
                        "Headphone",
                        "Mobile Accessories",
                        "Gaming Console",
                        "Camera & Photo",
                        "TV & Homes Appliances",
                        "Watchs & Accessories",
                        "GPS & Navigation",
                        "Warable Technology",
                      ].map((t) => (
                        <li key={t}>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-50">
                            {t}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Main nav */}
              <nav aria-label="secondary" className="text-[#5F6C72]">
                <ul className="flex items-center gap-6">
                  <li>
                    <a href="track-order.html" className="group inline-flex items-center gap-2">
                      <span className="inline-block">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5.25 21.75H18.75" stroke="#5F6C72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path
                            d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z"
                            stroke="#5F6C72"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z"
                            stroke="#5F6C72"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-sm">Track Order</span>
                    </a>
                  </li>

                  <li>
                    <a href="compare.html" className="group inline-flex items-center gap-2">
                      <span className="inline-block">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7.48125 9.34668H2.98125V4.84668" stroke="#5F6C72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path
                            d="M17.8312 6.16885C17.0659 5.40236 16.1569 4.79429 15.1563 4.37941C14.1557 3.96453 13.0832 3.75098 12 3.75098C10.9168 3.75098 9.84425 3.96453 8.84367 4.37941C7.84309 4.79429 6.93412 5.40236 6.16875 6.16885L2.98125 9.34698"
                            stroke="#5F6C72"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path d="M16.5188 14.6533H21.0188V19.1533" stroke="#5F6C72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path
                            d="M6.16875 17.8314C6.93412 18.5979 7.84309 19.206 8.84367 19.6209C9.84425 20.0358 10.9168 20.2493 12 20.2493C13.0832 20.2493 14.1557 20.0358 15.1563 19.6209C16.1569 19.206 17.0659 18.5979 17.8312 17.8314L21.0187 14.6533"
                            stroke="#5F6C72"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-sm">Compare</span>
                    </a>
                  </li>

                  <li>
                    <a href="support.html" className="group inline-flex items-center gap-2">
                      <span className="inline-block">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M21.1406 12.7503H18.1406C17.7428 12.7503 17.3613 12.9083 17.08 13.1897C16.7987 13.471 16.6406 13.8525 16.6406 14.2503V18.0003C16.6406 18.3981 16.7987 18.7797 17.08 19.061C17.3613 19.3423 17.7428 19.5003 18.1406 19.5003H19.6406C20.0384 19.5003 20.42 19.3423 20.7013 19.061C20.9826 18.7797 21.1406 18.3981 21.1406 18.0003V12.7503ZM21.1406 12.7503C21.1407 11.5621 20.9054 10.3856 20.4484 9.28875C19.9915 8.1919 19.3218 7.1964 18.4781 6.35969C17.6344 5.52297 16.6334 4.86161 15.5328 4.41375C14.4322 3.96589 13.2538 3.74041 12.0656 3.75031C10.8782 3.74165 9.70083 3.96805 8.60132 4.41647C7.5018 4.86488 6.50189 5.52645 5.6592 6.36304C4.81651 7.19963 4.1477 8.19471 3.69131 9.29094C3.23492 10.3872 2.99997 11.5629 3 12.7503V18.0003C3 18.3981 3.15804 18.7797 3.43934 19.061C3.72064 19.3423 4.10218 19.5003 4.5 19.5003H6C6.39782 19.5003 6.77936 19.3423 7.06066 19.061C7.34196 18.7797 7.5 18.3981 7.5 18.0003V14.2503C7.5 13.8525 7.34196 13.471 7.06066 13.1897C6.77936 12.9083 6.39782 12.7503 6 12.7503H3"
                            stroke="#5F6C72"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-sm">Customer Support</span>
                    </a>
                  </li>

                  <li>
                    <a href="#" className="group inline-flex items-center gap-2">
                      <span className="inline-block">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                            stroke="#5F6C72"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path d="M11.25 11.25H12V16.5H12.75" stroke="#5F6C72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path
                            d="M12.1875 7.875C12.1875 8.08211 12.0196 8.25 11.8125 8.25C11.6054 8.25 11.4375 8.08211 11.4375 7.875C11.4375 7.66789 11.6054 7.5 11.8125 7.5C12.0196 7.5 12.1875 7.66789 12.1875 7.875Z"
                            fill="#191C1F"
                            stroke="#5F6C72"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </span>
                      <span className="text-sm">Need Help</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Right: Tell */}
            <div className="flex items-center gap-3 text-[#191C1F]">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <path
                    d="M17.4343 4.375C18.9185 4.77332 20.2718 5.55499 21.3584 6.64159C22.445 7.72818 23.2266 9.08147 23.625 10.5656"
                    stroke="#191C1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5266 7.75488C17.4192 7.99195 18.2333 8.46077 18.8864 9.11384C19.5395 9.7669 20.0083 10.581 20.2454 11.4736"
                    stroke="#191C1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.1172 13.6504C11.0176 15.5098 12.5211 17.0095 14.3828 17.9051C14.5201 17.9701 14.672 17.9983 14.8235 17.9868C14.975 17.9752 15.1209 17.9245 15.2469 17.8395L17.9812 16.0129C18.1021 15.931 18.2417 15.881 18.387 15.8676C18.5324 15.8542 18.6788 15.8778 18.8125 15.9363L23.9312 18.1348C24.1062 18.2076 24.2524 18.3359 24.3472 18.4999C24.4421 18.664 24.4804 18.8546 24.4562 19.0426C24.294 20.3089 23.6759 21.4726 22.7177 22.3162C21.7594 23.1597 20.5266 23.6251 19.25 23.6254C15.3049 23.6254 11.5214 22.0582 8.73179 19.2686C5.94218 16.479 4.375 12.6955 4.375 8.7504C4.37529 7.47377 4.84073 6.24099 5.68425 5.28273C6.52776 4.32447 7.69153 3.70639 8.95781 3.54415C9.14576 3.52001 9.33643 3.55832 9.50047 3.65319C9.66451 3.74805 9.79281 3.89421 9.86562 4.06915L12.0641 9.19884C12.1212 9.33047 12.1451 9.47414 12.1337 9.61719C12.1223 9.76024 12.0758 9.89829 11.9984 10.0192L10.1719 12.7973C10.0906 12.9229 10.0428 13.0673 10.0333 13.2167C10.0237 13.3661 10.0526 13.5154 10.1172 13.6504V13.6504Z"
                    stroke="#191C1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="text-sm font-semibold">+1-202-555-0104</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomNav;
