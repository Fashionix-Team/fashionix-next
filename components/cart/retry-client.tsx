"use client";
import { useRouter } from "next/navigation";

export default function RetryClient() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.refresh()}
      className="inline-flex items-center rounded-full bg-blue-600 px-8 py-3 text-white font-medium hover:opacity-95"
    >
      Try Again
    </button>
  );
}
