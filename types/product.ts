export type TabId = "all" | "key-mouse" | "headphon" | "webcam" | "printer";

export type ProductBadgeVariant = "secondary" | "danger" | "success" | "warning";

export type Product = {
    id: string;
    image: string;
    title: string;
    price: string;
    priceOriginal?: string;
    reviews: string; // e.g. "(994)"
    badge?: {
    label: string;
    variant: ProductBadgeVariant;
    };
    categories: TabId[];
};
