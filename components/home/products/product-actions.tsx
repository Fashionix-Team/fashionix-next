import { ReactNode } from "react";

function IconButton({ ariaLabel, children }: { ariaLabel: string; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 transition hover:bg-orange-400 hover:text-white"
    >
      {children}
    </button>
  );
}

export default function ProductActions({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-gray-900/60 opacity-0 transition duration-300 group-hover:opacity-100">
      {children}
    </div>
  );
}

// You can pass your SVG icons from the section to keep this component dumb.
export { IconButton };
