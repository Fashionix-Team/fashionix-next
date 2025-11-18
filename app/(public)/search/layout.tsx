import { ReactNode } from "react";

export default function SearchLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-screen-2xl px-[15px] xss:px-7.5">
        {children}
      </div>
    </div>
  );
}
