'use client';

import Image from "next/image";
import { useMemo, useState } from "react";

type TabId = "all" | "key-mouse" | "headphon" | "webcam" | "printer";

type Product = {
  id: string;
  image: string;
  title: string;
  price: string;
  priceOriginal?: string;
  reviews: string;
  badge?: {
    label: string;
    variant: "secondary" | "danger" | "success" | "warning";
  };
  categories: TabId[];
};

type ActionIcon = {
  name: string;
  label: string;
  render: () => JSX.Element;
};

const tabs: { id: TabId; label: string }[] = [
  { id: "all", label: "All Product" },
  { id: "key-mouse", label: "Keyboard & Mouse" },
  { id: "headphon", label: "Headphone" },
  { id: "webcam", label: "Webcam" },
  { id: "printer", label: "Printer" },
];

const badgeStyles: Record<
  NonNullable<Product["badge"]>["variant"],
  string
> = {
  secondary: "bg-gray-900 text-white",
  danger: "bg-red-500 text-white",
  success: "bg-green-500 text-white",
  warning: "bg-amber-400 text-gray-900",
};

const actionIcons: ActionIcon[] = [
  {
    name: "wishlist",
    label: "Add to wishlist",
    render: () => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 20.25C12 20.25 2.625 15 2.625 8.62501C2.625 7.49803 3.01546 6.40585 3.72996 5.53431C4.44445 4.66277 5.43884 4.0657 6.54393 3.84468C7.64903 3.62366 8.79657 3.79235 9.79131 4.32204C10.7861 4.85174 11.5665 5.70972 12 6.75001C12.4335 5.70972 13.2139 4.85174 14.2087 4.32204C15.2034 3.79235 16.351 3.62366 17.4561 3.84468C18.5612 4.0657 19.5555 4.66277 20.27 5.53431C20.9845 6.40585 21.375 7.49803 21.375 8.62501C21.375 15 12 20.25 12 20.25Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "cart",
    label: "Add to cart",
    render: () => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.25 20.25C8.25 20.6642 7.91421 21 7.5 21C7.08579 21 6.75 20.6642 6.75 20.25C6.75 19.8358 7.08579 19.5 7.5 19.5C7.91421 19.5 8.25 19.8358 8.25 20.25Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M17.25 21.75C18.0784 21.75 18.75 21.0784 18.75 20.25C18.75 19.4216 18.0784 18.75 17.25 18.75C16.4216 18.75 15.75 19.4216 15.75 20.25C15.75 21.0784 16.4216 21.75 17.25 21.75Z"
          fill="currentColor"
        />
        <path
          d="M3.96562 6.75H20.7844L18.3094 15.4125C18.2211 15.7269 18.032 16.0036 17.7711 16.2C17.5103 16.3965 17.1922 16.5019 16.8656 16.5H7.88437C7.55783 16.5019 7.2397 16.3965 6.97886 16.2C6.71803 16.0036 6.52893 15.7269 6.44062 15.4125L3.04688 3.54375C3.00203 3.38696 2.9073 3.24905 2.77704 3.15093C2.64677 3.05282 2.48808 2.99983 2.325 3H0.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "view",
    label: "Quick view",
    render: () => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const FilledStar = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.275 10.9188L10.425 12.9188C10.8312 13.175 11.3312 12.7938 11.2125 12.325L10.3 8.73752C10.2753 8.63807 10.2792 8.53369 10.3113 8.43638C10.3434 8.33907 10.4023 8.2528 10.4812 8.18752L13.3062 5.83127C13.675 5.52502 13.4875 4.90627 13.0062 4.87502L9.31875 4.63752C9.21813 4.63166 9.1214 4.59663 9.04038 4.53669C8.95935 4.47675 8.89754 4.39451 8.8625 4.30002L7.4875 0.837515C7.4511 0.737455 7.38479 0.651018 7.29758 0.589938C7.21037 0.528858 7.10647 0.496094 7 0.496094C6.89353 0.496094 6.78963 0.528858 6.70242 0.589938C6.61521 0.651018 6.5489 0.737455 6.5125 0.837515L5.1375 4.30002C5.10245 4.39451 5.04064 4.47675 4.95962 4.53669C4.8786 4.59663 4.78186 4.63166 4.68125 4.63752L0.993748 4.87502C0.512498 4.90627 0.324998 5.52502 0.693748 5.83127L3.51875 8.18752C3.59771 8.2528 3.65661 8.33907 3.68868 8.43638C3.72075 8.53369 3.72467 8.63807 3.7 8.73752L2.85625 12.0625C2.7125 12.625 3.3125 13.0813 3.79375 12.775L6.725 10.9188C6.8072 10.8665 6.90259 10.8387 7 10.8387C7.09741 10.8387 7.1928 10.8665 7.275 10.9188Z"
      fill="#FA8232"
    />
  </svg>
);

const OutlineStar = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.275 11.9188L11.425 13.9188C11.8312 14.175 12.3312 13.7938 12.2125 13.325L11.3 9.73752C11.2753 9.63807 11.2792 9.53369 11.3113 9.43638C11.3434 9.33907 11.4023 9.2528 11.4812 9.18752L14.3062 6.83127C14.675 6.52502 14.4875 5.90627 14.0062 5.87502L10.3187 5.63752C10.2181 5.63166 10.1214 5.59663 10.0404 5.53669C9.95935 5.47675 9.89754 5.39451 9.8625 5.30002L8.4875 1.83752C8.4511 1.73745 8.38479 1.65102 8.29758 1.58994C8.21037 1.52886 8.10647 1.49609 8 1.49609C7.89353 1.49609 7.78963 1.52886 7.70242 1.58994C7.61521 1.65102 7.5489 1.73745 7.5125 1.83752L6.1375 5.30002C6.10245 5.39451 6.04064 5.47675 5.95962 5.53669C5.8786 5.59663 5.78186 5.63166 5.68125 5.63752L1.99375 5.87502C1.5125 5.90627 1.325 6.52502 1.69375 6.83127L4.51875 9.18752C4.59771 9.2528 4.65661 9.33907 4.68868 9.43638C4.72075 9.53369 4.72467 9.63807 4.7 9.73752L3.85625 13.0625C3.7125 13.625 4.3125 14.0813 4.79375 13.775L7.725 11.9188C7.8072 11.8665 7.90259 11.8387 8 11.8387C8.09741 11.8387 8.1928 11.8665 8.275 11.9188Z"
      fill="white"
      stroke="#ADB7BC"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const products: Product[] = [
  {
    id: "product-23",
    image: "/image/product/product-23.png",
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    price: "$36",
    reviews: "(994)",
    badge: { label: "BEST DEALS", variant: "secondary" },
    categories: ["all", "headphon", "key-mouse", "webcam", "printer"],
  },
  {
    id: "product-24",
    image: "/image/product/product-24.png",
    title: "Samsung Electronics Samsung Galexy S21 5G",
    price: "$80",
    reviews: "(798)",
    categories: ["all", "key-mouse", "webcam", "printer", "headphon"],
  },
  {
    id: "product-25",
    image: "/image/product/product-25.png",
    title: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
    price: "$70",
    reviews: "(600)",
    badge: { label: "hot", variant: "danger" },
    categories: ["all", "printer", "key-mouse", "webcam", "headphon"],
  },
  {
    id: "product-26",
    image: "/image/product/product-26.png",
    title: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
    price: "$250",
    reviews: "(492)",
    categories: ["all", "printer", "webcam", "headphon", "key-mouse"],
  },
  {
    id: "product-27",
    image: "/image/product/product-27.png",
    title: "Wired Over-Ear Gaming Headphones with USB",
    price: "$2300",
    reviews: "(740)",
    categories: ["all", "headphon", "key-mouse", "webcam", "printer"],
  },
  {
    id: "product-28",
    image: "/image/product/product-28.png",
    title: "Polaroid 57-Inch Photo/Video Tripod Deluxe Tripod Ca...",
    price: "$220",
    reviews: "(556)",
    badge: { label: "SALE", variant: "success" },
    categories: ["all", "key-mouse", "printer", "webcam", "headphon"],
  },
  {
    id: "product-29",
    image: "/image/product/product-29.png",
    title: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    price: "$1,50",
    reviews: "(426)",
    categories: ["all", "printer", "headphon", "key-mouse", "webcam"],
  },
  {
    id: "product-30",
    image: "/image/product/product-30.png",
    title: "4K UHD LED Smart TV with Chromecast Built-in",
    price: "$250",
    priceOriginal: "$360",
    reviews: "(583)",
    badge: { label: "25% OFF", variant: "warning" },
    categories: ["all", "webcam", "headphon", "key-mouse", "printer"],
  },
];

const Products02 = () => {
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const filteredProducts = useMemo(() => {
    const next = products.filter((product) =>
      product.categories.includes(activeTab)
    );
    return next.length ? next : products;
  }, [activeTab]);

  return (
    <section className="py-[72px]">
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="grid gap-8 2xl:grid-cols-12">
          <aside className="order-1 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-between lg:gap-6 2xl:order-2 2xl:col-span-3 2xl:flex-col">
            <div className="flex w-full flex-col gap-6 rounded-[32px] bg-white p-7 shadow-lg">
              <div className="flex items-center justify-center rounded-3xl bg-gray-100 p-6">
                <img
                  src="/image/add/airpod-02.png"
                  alt="airpod"
                  className="max-w-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold leading-snug text-gray-900">
                  Xiaomi True <br /> Wireless Earbuds
                </h2>
                <p className="text-sm text-gray-600">
                  Escape the noise, Itâ€™s time to hear the magic with Xiaomi
                  Earbuds.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-500">Only for:</span>
                  <span className="text-lg font-semibold text-gray-900">
                    $299 USD
                  </span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 self-start rounded-full bg-orange-400 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
                >
                  Shop now
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.625 10H17.375"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.75 4.375L17.375 10L11.75 15.625"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 rounded-[32px] bg-gray-900 p-7 text-white shadow-lg">
              <span className="text-sm font-semibold tracking-[0.2em] text-orange-400">
                SUMMER SALES
              </span>
              <h2 className="text-3xl font-bold leading-tight">
                37% DISCOUNT
              </h2>
              <p className="text-sm text-gray-300">
                only for{" "}
                <span className="font-semibold text-orange-400">
                  SmartPhone
                </span>{" "}
                product.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                Shop now
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-900"
                >
                  <path
                    d="M3.625 10H17.375"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.75 4.375L17.375 10L11.75 15.625"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </aside>

          <main className="order-2 2xl:order-1 2xl:col-span-9">
            <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="text-2xl font-semibold leading-8 text-gray-900">
                Featured Products
              </h2>

              <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-end">
                <nav className="flex flex-wrap items-center justify-center gap-1 md:justify-end">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={[
                          "relative rounded-lg px-3 py-2 text-sm font-semibold transition",
                          "after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:bg-orange-400 after:content-[''] after:transition-all after:duration-300",
                          isActive
                            ? "text-gray-900 after:w-full after:opacity-100"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 after:w-0 after:opacity-0",
                        ].join(" ")}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>

                <div className="md:ml-3">
                  <a
                    href="#"
                    className="relative inline-flex items-center gap-2 text-sm font-semibold text-orange-400 transition after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-orange-400 after:content-[''] after:transition-all after:duration-300 hover:text-orange-500 hover:after:w-full"
                  >
                    Browse All Product
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.125 10H16.875"
                        stroke="#FA8232"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.25 4.375L16.875 10L11.25 15.625"
                        stroke="#FA8232"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </header>

            <div className="mt-8">
              <div className="grid grid-cols-1 gap-4 mx-[30px] sm:mx-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {product.badge && (
                      <span
                        className={[
                          "absolute left-5 top-5 inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
                          badgeStyles[product.badge.variant],
                        ].join(" ")}
                      >
                        {product.badge.label}
                      </span>
                    )}

                    <div className="relative flex items-center justify-center bg-gray-50 p-6">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={256}
                        height={256}
                        className="h-auto max-w-full object-contain"
                        sizes="(min-width: 1280px) 256px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-gray-900/60 opacity-0 transition duration-300 group-hover:opacity-100">
                        {actionIcons.map((icon) => (
                          <a
                            key={icon.name}
                            href="#"
                            aria-label={icon.label}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 transition hover:bg-orange-400 hover:text-white"
                          >
                            {icon.render()}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 p-6">
                      <ul className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <li key={`${product.id}-star-${index}`}>
                            <FilledStar />
                          </li>
                        ))}
                        <li>
                          <OutlineStar />
                        </li>
                        <li className="ml-2 text-xs font-medium text-gray-500">
                          {product.reviews}
                        </li>
                      </ul>

                      <h6 className="text-sm font-semibold leading-6 text-gray-900">
                        {product.title}
                      </h6>

                      <p className="text-lg font-semibold text-gray-900">
                        {product.priceOriginal && (
                          <del className="mr-2 text-sm font-normal text-gray-500">
                            {product.priceOriginal}
                          </del>
                        )}
                        {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Products02;

