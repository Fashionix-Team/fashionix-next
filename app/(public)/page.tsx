import Home from "@/components/home";

// Remove time-based revalidation, use tag-based instead via webhook
export const dynamic = "auto";
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
