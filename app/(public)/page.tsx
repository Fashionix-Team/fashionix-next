import Home from "@/components/home";

export const revalidate = 3600; // Revalidate every hour (ISR)

// Force static generation to enable cache revalidation on Vercel
export const dynamic = "force-static";
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
