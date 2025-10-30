export type TabId = "all" | "women" | "men" | "accessories" | "footwear";

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
