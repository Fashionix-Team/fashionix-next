import clsx from "clsx";

export const ShoppingCartIcon = ({ className = "" }) => {
  return (
    <svg
      className={clsx("size-6", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.841a.75.75 0 0 0-.54-1.022H5.134c-.51 0-.962.343-1.087.835L2.25 3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
