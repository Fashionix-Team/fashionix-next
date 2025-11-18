"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Breadcrumb({ categoryTitle }: { categoryTitle?: string }) {
  const pathname = usePathname();
  
  const pathSegments = pathname.split("/").filter(Boolean);
  
  return (
    <nav className="flex items-center gap-2 py-4 text-sm text-gray-600">
      <Link href="/" className="hover:text-blue-600 transition-colors">
        Beranda
      </Link>
      {pathSegments.length > 0 && (
        <>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="text-gray-900 font-medium">
            {categoryTitle || "Kemeja"}
          </span>
        </>
      )}
    </nav>
  );
}
