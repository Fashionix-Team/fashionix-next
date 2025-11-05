"use client";

import { Button } from "@heroui/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/popover";
import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { BagistoCollectionMenus } from "@/lib/bagisto/types";

type CategoryMegaMenuProps = {
  categories?: BagistoCollectionMenus[];
};

const filterValidCategories = (
  items?: BagistoCollectionMenus[]
): BagistoCollectionMenus[] =>
  (items || []).filter(
    (item): item is BagistoCollectionMenus =>
      Boolean(item?.id && item?.name && item?.slug)
  );

const CategoryMegaMenu = ({ categories = [] }: CategoryMegaMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const categoryList = useMemo(
    () => filterValidCategories(categories),
    [categories]
  );

  const defaultCategoryId = useMemo(() => {
    const withChildren = categoryList.find(
      (category) => filterValidCategories(category.children).length > 0
    );
    return withChildren?.id ?? categoryList[0]?.id ?? null;
  }, [categoryList]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setActiveCategoryId(null);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveCategoryId((current) => {
      if (current && categoryList.some((category) => category.id === current)) {
        return current;
      }
      return defaultCategoryId;
    });
  }, [categoryList, defaultCategoryId, isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setActiveCategoryId(null);
  }, []);

  const activeCategory = useMemo(() => {
    if (!activeCategoryId) {
      return undefined;
    }

    return categoryList.find((category) => category.id === activeCategoryId);
  }, [activeCategoryId, categoryList]);

  const activeChildren = useMemo(
    () => filterValidCategories(activeCategory?.children),
    [activeCategory]
  );

  return (
    <Popover
      isOpen={isOpen}
      placement="bottom-start"
      offset={14}
      onOpenChange={handleOpenChange}
    >
      <PopoverTrigger>
        <Button
          variant="bordered"
          radius="md"
          className="border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#191C1F]"
          endContent={
            <ChevronDownIcon className="h-4 w-4 stroke-[2px] text-[#191C1F]" />
          }
        >
          All Category
        </Button>
      </PopoverTrigger>

      <PopoverContent className="max-h-[520px] w-[780px] overflow-hidden rounded-xl border border-black/10 p-0 shadow-2xl">
        <div className="flex h-full">
          <aside className="w-[260px] border-r border-black/5 bg-white">
            <ul className="max-h-[520px] overflow-y-auto py-2">
              {categoryList.length === 0 ? (
                <li className="px-4 py-2 text-sm text-gray-500">
                  No categories available
                </li>
              ) : (
                categoryList.map((category) => {
                  const childCategories = filterValidCategories(
                    category.children
                  );
                  const hasChildren = childCategories.length > 0;
                  const isActive = activeCategoryId === category.id;

                  return (
                    <li key={category.id}>
                      {hasChildren ? (
                        <Button
                          variant="light"
                          radius="none"
                          className={clsx(
                            "flex w-full items-center justify-between rounded-none px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100",
                            isActive && "bg-orange-500/10 text-orange-500"
                          )}
                          onPress={() => setActiveCategoryId(category.id)}
                        >
                          <span className="truncate">{category.name}</span>
                          <ChevronRightIcon className="h-4 w-4 stroke-[2px]" />
                        </Button>
                      ) : (
                        <Link
                          href={`/search/${category.slug}`}
                          className="block px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                          onClick={closeMenu}
                        >
                          {category.name}
                        </Link>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </aside>

          <section className="flex flex-1 flex-col bg-white">
            {activeCategory ? (
              <div className="flex flex-1 flex-col">
                <header className="flex items-center justify-between border-b border-black/5 px-6 py-4">
                  <div>
                    <p className="text-base font-semibold text-gray-900">
                      {activeCategory.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Explore sub-categories and products
                    </p>
                  </div>
                  <Link
                    href={`/search/${activeCategory.slug}`}
                    className="inline-flex items-center gap-2 rounded-md border border-orange-500 px-3 py-1.5 text-sm font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white"
                    onClick={closeMenu}
                  >
                    View all
                    <ChevronRightIcon className="h-4 w-4 stroke-[2.5px]" />
                  </Link>
                </header>

                {activeChildren.length > 0 ? (
                  <div className="flex-1 overflow-y-auto px-6 py-5">
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {activeChildren.map((child) => {
                        const grandChildren = filterValidCategories(
                          child.children
                        ).slice(0, 8);

                        return (
                          <div key={child.id} className="space-y-3">
                            <Link
                              href={`/search/${child.slug}`}
                              className="text-sm font-semibold text-gray-900 transition hover:text-orange-500"
                              onClick={closeMenu}
                            >
                              {child.name}
                            </Link>

                            {grandChildren.length > 0 && (
                              <ul className="space-y-1.5 text-sm text-gray-600">
                                {grandChildren.map((subChild) => (
                                  <li key={subChild.id}>
                                    <Link
                                      href={`/search/${subChild.slug}`}
                                      className="block rounded px-2 py-1 transition hover:bg-gray-100 hover:text-gray-900"
                                      onClick={closeMenu}
                                    >
                                      {subChild.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-1 items-center justify-center px-6 py-10 text-sm text-gray-500">
                    No sub-categories found for this category.
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center px-6 py-10 text-sm text-gray-500">
                Select a category to explore.
              </div>
            )}
          </section>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryMegaMenu;
