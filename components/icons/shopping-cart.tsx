function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 2.25h1.5l1.5 9h13.5l1.5-9h1.5m-3 13.5a1.5 1.5 0 11-3 0m-9 0a1.5 1.5 0 11-3 0"
      />
    </svg>
  );
};

export default ShoppingCartIcon;