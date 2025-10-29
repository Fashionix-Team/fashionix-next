import { BADGE_STYLES } from "@/data/products";
import type { Product } from "@/types/product";

export default function ProductBadge({ badge }: { badge: Product["badge"] }) {
  if (!badge) return null;
  return (
    <span
      className={
        "absolute left-5 top-5 inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide " +
        BADGE_STYLES[badge.variant]
      }
    >
      {badge.label}
    </span>
  );
}
