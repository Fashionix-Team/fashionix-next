import BottomNav from "./bottom-nav";
import DeskNav from "./desk-nav";
import TopNav from "./top-nav";
import { getCollectionMenus } from "@/lib/bagisto";
import type { BagistoCollectionMenus, InputData } from "@/lib/bagisto/types";

const NAVBAR_CATEGORY_FILTERS: InputData[] = [
  { key: "parent_id", value: "1" },
  { key: "status", value: "1" },
  { key: "locale", value: "en" },
];

export default async function Navbar() {
  let categories: BagistoCollectionMenus[] = [];

  try {
    categories = await getCollectionMenus({
      inputs: NAVBAR_CATEGORY_FILTERS,
      getCategoryTree: true,
      tag: "navbar-categories",
    });
  } catch (error) {
    console.error("Failed to load navbar categories", error);
  }

  return (
    <div>
      <TopNav />
      <DeskNav />
      <BottomNav categories={categories} />
    </div>
  );
}
