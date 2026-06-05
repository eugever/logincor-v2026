"use client";

import { useState } from "react";
import RetiroModal from "./RetiroModal";

const BRAND = "#E94E1B";

interface Props {
  variant?: "nav" | "hero";
}

export default function RetiroButton({ variant = "hero" }: Props) {
  const [open, setOpen] = useState(false);

  const navStyle = {
    background: BRAND,
    border: "1px solid rgba(255,255,255,0.1)",
  };

  const heroStyle = {
    background: BRAND,
    border: "1px solid rgba(255,255,255,0.1)",
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          variant === "nav"
            ? "hidden md:flex items-center gap-1.5 px-3 py-2 text-white rounded-sm text-sm font-semibold transition-all hover:opacity-90"
            : "inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
        }
        style={variant === "nav" ? navStyle : heroStyle}
        aria-label="Solicitar retiro de mercadería"
      >
        <svg
          className={variant === "nav" ? "w-3.5 h-3.5" : "w-4 h-4"}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
          />
        </svg>
        Pedí tu retiro
      </button>

      <RetiroModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
