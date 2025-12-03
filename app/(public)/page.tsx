import Home from "@/components/home";

// Make homepage fully dynamic without cache, like search page
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = {
  description:
    "Website E-Commerce Fashionix menggunakan Bagisto, platform open-source berbasis Laravel dan Vue.js yang kuat untuk membangun toko online yang menarik dan fungsional.",
  openGraph: {
    type: "website",
    title: "Fashionix",
    url: process.env.NEXTAUTH_URL,
  },
};

export default async function HomePage() {
  return <Home />
}
