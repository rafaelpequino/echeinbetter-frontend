"use client";

import Link from "next/link";

export default function InitiateButton() {
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "var(--color-primary-teal)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  return (
    <Link
      href="/estoque"
      style={{
        borderColor: "var(--color-primary-teal)",
      }}
      className="px-16 py-3 border-2 rounded-lg font-semibold text-lg transition-all text-white hover:text-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Iniciar
    </Link>
  );
}

