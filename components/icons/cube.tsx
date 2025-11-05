import clsx from "clsx";

export const CubeIcon = ({ className = "" }) => {
  return (
    <svg
      className={clsx("size-6", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sisi depan kubus */}
      <path
        d="M12 3L3 7.5v9L12 21l9-4.5v-9L12 3z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Garis diagonal untuk menunjukkan sisi atas kubus */}
      <path
        d="M3 7.5l9 4.5m0 0l9-4.5m-9 4.5V21"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Garis diagonal untuk menunjukkan sisi samping kubus */}
      <path
        d="M12 12l9-4.5M12 12l-9-4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};