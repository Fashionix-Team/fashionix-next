import clsx from "clsx";
import { Suspense } from "react";

import FilterList from "./filter";

import { getMenu } from "@/lib/bagisto";
async function CollectionList() {
  let collections = [];
  try {
    // getMenu is defensive but guard callers too
    // eslint-disable-next-line no-await-in-loop
    // eslint-disable-next-line @typescript-eslint/await-thenable
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    collections = await getMenu("navbar-meus");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("CollectionList failed to load collections:", err);
    collections = [];
  }

  const menuData = [{ path: "/search", title: "All" }, ...collections];

  return <FilterList filterAttributes={menuData} />;
}

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={clsx(skeleton, activeAndTitles)} />
            ))}
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={clsx(skeleton, items)} />
            ))}
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}
