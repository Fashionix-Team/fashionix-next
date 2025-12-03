import { getMenuQuery } from "@/lib/bagisto/queries/menu";
import { getPagesQuery } from "@/lib/bagisto/queries/page";
import { getCollectionProductsQuery } from "@/lib/bagisto/queries/collection";
import { bagistoFetchNoSession, removeEdgesAndNodes, reshapeCollections, reshapeProducts } from "@/lib/bagisto";
import { BagistoCollectionProductsOperation, BagistoPagesOperation, Page, PaginatedProducts } from "@/lib/bagisto/types";
import { isArray } from "@/lib/type-guards";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXTAUTH_URL;

async function getHomeCategories(): Promise<any[]> {
  const res = await bagistoFetchNoSession<any>({
    query: getMenuQuery,
    cache: "no-store",
  });
  const bagistoCollections = removeEdgesAndNodes(
    res.body?.data?.homeCategories
  );
  const collections = [
    {
      handle: "",
      title: "All",
      description: "All products",
      seo: {
        title: "All",
        description: "All products",
      },
      path: "/search",
      updatedAt: new Date().toISOString(),
    },
    ...reshapeCollections(bagistoCollections).filter(
      (collection) => !collection.slug?.startsWith("hidden")
    ),
  ];

  return collections;
}

async function getProducts(): Promise<PaginatedProducts> {
  const input = [{ key: "limit", value: "48", }, {key:"page" , value: "1"}];

  const res = await bagistoFetchNoSession<BagistoCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    cache: "no-store",
    variables: {
      input,
    },
  });

  if (!isArray(res.body.data.allProducts.data)) {
    return {
      paginatorInfo: {
        count: 0,
        currentPage: 1,
        lastPage: 1,
        total: 12,
      },
      products: [],
    };
  }

  return {
    paginatorInfo: res.body.data.allProducts?.paginatorInfo,
    products: reshapeProducts(res.body.data.allProducts.data),
  };
}

async function getPages(): Promise<Page> {
  const res = await bagistoFetchNoSession<BagistoPagesOperation>({
    query: getPagesQuery,
    cache: "no-store",
  });

  return res.body.data?.cmsPages;
}

function generateSitemapXML(urls: Array<{ url: string; lastModified: string }>) {
  const urlEntries = urls
    .map(
      ({ url, lastModified }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlEntries}
</urlset>`;
}

export async function GET() {
  try {
    const routesMap = ["", "/customer/account", "/customer/account/addresses"].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
    }));

    const collectionsPromise = getHomeCategories().then((collections) =>
      collections.map((collection) => ({
        url: `${baseUrl}${collection.path}`,
        lastModified: collection.updatedAt,
      }))
    );

    const productsPromise = getProducts().then(({ products }) =>
      products.map((product) => ({
        url: `${baseUrl}/product/${product.urlKey}?type=${product.type}`,
        lastModified: product?.updatedAt || new Date().toISOString(),
      }))
    );

    const pagesPromise = getPages().then((pages) =>
      pages?.data?.map((page) => ({
        url: `${baseUrl}/${page?.translations?.[0]?.urlKey || ''}`,
        lastModified: page?.updatedAt || new Date().toISOString(),
      })) || []
    );

    const [collections, products, pages] = await Promise.all([
      collectionsPromise,
      productsPromise,
      pagesPromise,
    ]);

    const allUrls = [...routesMap, ...collections, ...products, ...pages];
    const sitemap = generateSitemapXML(allUrls);

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
