"use client";
import { useState } from "react";
import StarIcon from "@/components/icons/star-icon"; // pastikan path-nya sesuai

export default function RatingStars({ criteria }: { criteria: string }) {
  const [rating, setRating] = useState(0);

  return (
    <div className="my-4">
      <p className="font-medium">{criteria}</p>
      <div className="flex space-x-2 mt-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <StarIcon
              className={`w-6 h-6 ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
