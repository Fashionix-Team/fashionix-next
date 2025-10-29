import type { Product, TabId } from "@/types";

export const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "All Product" },
  { id: "key-mouse", label: "Keyboard & Mouse" },
  { id: "headphon", label: "Headphone" },
  { id: "webcam", label: "Webcam" },
  { id: "printer", label: "Printer" },
];

export const BADGE_STYLES: Record<NonNullable<Product["badge"]>["variant"], string> = {
  secondary: "bg-gray-900 text-white",
  danger: "bg-red-500 text-white",
  success: "bg-green-500 text-white",
  warning: "bg-amber-400 text-gray-900",
};

export const PRODUCTS: Product[] = [
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
