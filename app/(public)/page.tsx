import Home from "@/components/home";

// Disable cache completely for homepage
export const dynamic = "force-dynamic";
export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Bagisto.",
  openGraph: {
    type: "website",
    title: "Bagisto Commerce",
    url: process.env.NEXTAUTH_URL,
  },
};

export default async function HomePage() {
  return <Home />
}
