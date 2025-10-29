// components/home/section/products-01.tsx
'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

type BadgeStyle = 'ring' | 'solid';

interface Product {
  id: string;
  title: string;
  price: string;
  priceAlt?: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: {
    label: string;
    color: string;
    text: string;
    style?: BadgeStyle;
  };
  category: 'all' | 'smart-phone' | 'laptop' | 'headphone' | 'tv';
}

const PRODUCTS: Product[] = [
  {
    id: 'p-15',
    title: 'TOZO T6 True Wireless Earbuds Bluetooth Headphon...',
    price: '$2,300',
    rating: 5,
    reviews: 738,
    image: '/image/product/product-15.png',
    badge: { label: 'hot', color: '#F1416C', text: '#FFFFFF' },
    category: 'all',
  },
  {
    id: 'p-16',
    title: 'Samsung Electronics Samsung Galexy S21 5G',
    price: '$220',
    rating: 5,
    reviews: 536,
    image: '/image/product/product-16.png',
    category: 'smart-phone',
  },
  {
    id: 'p-17',
    title: 'Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...',
    price: '$1,50',
    priceAlt: '$865',
    rating: 5,
    reviews: 423,
    image: '/image/product/product-17.png',
    badge: { label: 'BEST DEALS', color: '#4B566B', text: '#FFFFFF' },
    category: 'laptop',
  },
  {
    id: 'p-18',
    title: 'Portable Washing Machine, 11lbs capacity Model 18NMF...',
    price: '$1,200',
    rating: 4,
    reviews: 816,
    image: '/image/product/product-18.png',
    category: 'headphone',
  },
  {
    id: 'p-19',
    title: 'Wired Over-Ear Gaming Headphones with USB',
    price: '$299',
    rating: 5,
    reviews: 647,
    image: '/image/product/product-19.png',
    category: 'all',
  },
  {
    id: 'p-20',
    title: 'Polaroid 57-Inch Photo/Video Tripod Deluxe Tripod Ca...',
    price: '$70',
    priceAlt: '$865.99',
    rating: 5,
    reviews: 877,
    image: '/image/product/product-20.png',
    badge: { label: '25% OFF', color: '#FDBF00', text: '#1E293B', style: 'ring' },
    category: 'tv',
  },
  {
    id: 'p-21',
    title: 'Dell Optiplex 7000x7480 All-in-One Computer Monitor',
    price: '$1,50',
    rating: 5,
    reviews: 426,
    image: '/image/product/product-21.png',
    category: 'laptop',
  },
  {
    id: 'p-22',
    title: '4K UHD LED Smart TV with Chromecast Built-in',
    price: '$250',
    priceAlt: '$360',
    rating: 5,
    reviews: 583,
    image: '/image/product/product-22.png',
    badge: { label: 'SALE', color: '#22C55E', text: '#FFFFFF' },
    category: 'tv',
  },
];

const CATEGORIES: { id: Product['category']; label: string }[] = [
  { id: 'all', label: 'All Product' },
  { id: 'smart-phone', label: 'Smart Phone' },
  { id: 'laptop', label: 'Laptop' },
  { id: 'headphone', label: 'Headphone' },
  { id: 'tv', label: 'TV' },
];

const Products01 = () => {
  const [activeTab, setActiveTab] = useState<Product['category']>('all');

  const productsToShow = useMemo(() => {
    if (activeTab === 'all') return PRODUCTS;
    return PRODUCTS.filter((product) => product.category === activeTab || product.category === 'all');
  }, [activeTab]);

  return (
    <section className="w-full bg-white py-18 md:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_3fr] xl:gap-8">
          <aside className="h-full rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(3,7,18,0.10)]">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#F0F2F5] md:flex-row xl:flex-col">
              <div className="flex flex-1 flex-col justify-center gap-4 px-10 py-10 text-center md:px-12 md:text-left xl:text-center">
                <h6 className="text-sm font-semibold tracking-[0.22em] text-[#8A94A6]">
                  COMPUTER & ACCESSORIES
                </h6>
                <h2 className="text-3xl font-bold text-[#1F2937]">32% Discount</h2>
                <p className="text-sm text-[#4B5563]">For all electronics products</p>

                <div className="mt-2 rounded-xl bg-white/80 px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#4B566B]">
                    Offers ends in:
                  </p>
                  <p className="mt-1 text-sm font-semibold tracking-[0.24em] text-[#111]">
                    ENDS OF CHRISTMAS
                  </p>
                </div>

                <a
                  className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1E40AF] md:self-start xl:self-center"
                  href="#"
                >
                  Shop now
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M3.75 12H20.25"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.5 5.25L20.25 12L13.5 18.75"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              <div className="relative hidden h-full w-full md:flex xl:hidden">
                <Image
                  src="/image/add/apple-accessories.png"
                  alt="accessories"
                  fill
                  className="object-cover object-bottom"
                  priority
                />
              </div>

              <div className="relative hidden h-[260px] w-full xl:flex">
                <Image
                  src="/image/add/apple-accessories.png"
                  alt="accessories"
                  fill
                  className="object-cover object-bottom"
                  priority
                />
              </div>
            </div>
          </aside>

          <div className="flex flex-col">
            <header className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-[0_14px_44px_rgba(15,23,42,0.10)] sm:flex-row sm:items-center sm:gap-6">
              <h2 className="text-2xl font-semibold text-[#101828]">Featured Products</h2>

              <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
                <nav className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  {CATEGORIES.map(({ id, label }) => {
                    const isActive = activeTab === id;

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActiveTab(id)}
                        className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                          isActive
                            ? 'bg-white text-[#111]'
                            : 'bg-transparent text-[#6B7280] hover:bg-slate-100 hover:text-[#111]'
                        }`}
                      >
                        {label}
                        <span
                          className={`absolute inset-x-3 bottom-1 h-[2px] transition ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{ backgroundColor: '#FA8232' }}
                        />
                      </button>
                    );
                  })}
                </nav>

                <a
                  href="#"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-[#FA8232] transition hover:text-[#C96C16]"
                >
                  Browse All Product
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M3.125 10H16.875"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.25 4.375L16.875 10L11.25 15.625"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </header>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:mt-8 xl:grid-cols-4 2xl:gap-6">
              {productsToShow.map((product) => (
                <div
                  key={`${activeTab}-${product.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 p-5">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#0F172A]/60 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                      <IconButton icon="wishlist" />
                      <IconButton icon="cart" />
                      <IconButton icon="view" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                    <ul className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <li key={index}>
                          <StarIcon filled={index < product.rating} />
                        </li>
                      ))}
                      <li className="ml-2 text-xs font-semibold text-[#6B7280]">
                        ({product.reviews.toLocaleString()})
                      </li>
                    </ul>

                    <h6 className="mt-3 line-clamp-2 text-sm font-semibold text-[#101828]">
                      {product.title}
                    </h6>

                    <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#111]">
                      {product.priceAlt ? (
                        <>
                          <span className="text-[#6B7280] line-through">{product.priceAlt}</span>
                          <span>{product.price}</span>
                        </>
                      ) : (
                        <span>{product.price}</span>
                      )}
                    </div>
                  </div>

                  {product.badge ? (
                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        product.badge.style === 'ring'
                          ? 'border border-slate-400'
                          : 'shadow-[0_8px_24px_rgba(15,23,42,0.12)]'
                      }`}
                      style={{
                        backgroundColor: product.badge.style === 'ring' ? 'transparent' : product.badge.color,
                        color: product.badge.text,
                      }}
                    >
                      {product.badge.label}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const IconButton = ({ icon }: { icon: 'wishlist' | 'cart' | 'view' }) => {
  const iconMap: Record<typeof icon, JSX.Element> = {
    wishlist: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 20.25C12 20.25 2.625 15 2.625 8.62501C2.625 7.49803 3.01546 6.40585 3.72996 5.53431C4.44445 4.66277 5.43884 4.0657 6.54393 3.84468C7.64903 3.62366 8.79657 3.79235 9.79131 4.32204C10.7861 4.85174 11.5665 5.70972 12 6.75001C12.4335 5.70972 13.2139 4.85174 14.2087 4.32204C15.2034 3.79235 16.351 3.62366 17.4561 3.84468C18.5612 4.0657 19.5555 4.66277 20.27 5.53431C20.9845 6.40585 21.375 7.49803 21.375 8.62501C21.375 15 12 20.25 12 20.25Z"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    cart: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          d="M8.25 20.25C8.25 20.6642 7.91421 21 7.5 21C7.08579 21 6.75 20.6642 6.75 20.25C6.75 19.8358 7.08579 19.5 7.5 19.5C7.91421 19.5 8.25 19.8358 8.25 20.25Z"
          fill="#0F172A"
          stroke="#FFFFFF"
          strokeWidth={1.5}
        />
        <path
          d="M17.25 21.75C18.0784 21.75 18.75 21.0784 18.75 20.25C18.75 19.4216 18.0784 18.75 17.25 18.75C16.4216 18.75 15.75 19.4216 15.75 20.25C15.75 21.0784 16.4216 21.75 17.25 21.75Z"
          fill="#0F172A"
        />
        <path
          d="M3.96562 6.75H20.7844L18.3094 15.4125C18.2211 15.7269 18.032 16.0036 17.7711 16.2C17.5103 16.3965 17.1922 16.5019 16.8656 16.5H7.88437C7.55783 16.5019 7.2397 16.3965 6.97886 16.2C6.71803 16.0036 6.52893 15.7269 6.44062 15.4125L3.04688 3.54375C3.00203 3.38696 2.9073 3.24905 2.77704 3.15093C2.64677 3.05282 2.48808 2.99983 2.325 3H0.75"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    view: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 4.25C4.5 4.25 1.5 12 1.5 12C1.5 12 4.5 19.75 12 19.75C19.5 19.75 22.5 12 22.5 12C22.5 12 19.5 4.25 12 4.25Z"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  return (
    <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20">
      {iconMap[icon]}
    </button>
  );
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
    <path
      d="M7.275 10.9188L10.425 12.9188C10.8312 13.175 11.3312 12.7938 11.2125 12.325L10.3 8.73752C10.2753 8.63807 10.2792 8.53369 10.3113 8.43638C10.3434 8.33907 10.4023 8.2528 10.4812 8.18752L13.3062 5.83127C13.675 5.52502 13.4875 4.90627 13.0062 4.87502L9.31875 4.63752C9.21986 4.63161 9.12473 4.59624 9.04452 4.5361C8.96431 4.47597 8.90234 4.39329 8.86875 4.29877L7.4875 0.837515C7.45114 0.737455 7.38482 0.651018 7.29758 0.589938C7.21034 0.528858 7.10643 0.496094 7 0.496094C6.89357 0.496094 6.78966 0.528858 6.70242 0.589938C6.61518 0.651018 6.54886 0.737455 6.5125 0.837515L5.1375 4.30002C5.1025 4.39451 5.0407 4.47675 4.95967 4.53669C4.87864 4.59663 4.78188 4.63166 4.68125 4.63752L0.993748 4.87502C0.512498 4.90627 0.324998 5.52502 0.693748 5.83127L3.51875 8.18752C3.59771 8.2528 3.65661 8.33907 3.68868 8.43638C3.72075 8.53369 3.72467 8.63807 3.7 8.73752L2.85625 12.0625C2.7125 12.625 3.3125 13.0813 3.79375 12.775L6.725 10.9188C6.8072 10.8665 6.90255 10.8387 7 10.8387C7.09745 10.8387 7.1928 10.8665 7.275 10.9188Z"
      fill={filled ? '#FA8232' : '#E2E8F0'}
    />
  </svg>
);

export default Products01;
