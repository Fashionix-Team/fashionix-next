import { ReactNode, cloneElement, isValidElement } from "react";

function IconButton({ 
  ariaLabel, 
  children, 
  onClick 
}: { 
  ariaLabel: string; 
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 transition hover:bg-orange-400 hover:text-white"
    >
      {children}
    </button>
  );
}

export default function ProductActions({
  children,
  onQuickViewClick,
}: {
  children: ReactNode;
  onQuickViewClick?: () => void;
}) {
  // Clone children and pass onClick to the third child (Quick View button)
  let enhancedChildren = children;
  
  if (onQuickViewClick && Array.isArray(children)) {
    enhancedChildren = children.map((child, index) => {
      // Quick View is the third button (index 2)
      if (index === 2 && isValidElement(child)) {
        return cloneElement(child, { onClick: onQuickViewClick } as any);
      }
      return child;
    });
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-gray-900/60 opacity-0 transition duration-300 group-hover:opacity-100">
      {enhancedChildren}
    </div>
  );
}

// You can pass your SVG icons from the section to keep this component dumb.
export { IconButton };
