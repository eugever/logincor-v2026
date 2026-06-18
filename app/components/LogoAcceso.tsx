'use client';
import { useRef } from 'react';
import Image from 'next/image';

const DASHBOARD_URL = 'http://3.138.85.92:5173';
const CLICKS_NEEDED = 3;
const RESET_MS = 1500;

export default function LogoAcceso() {
  const clicks  = useRef(0);
  const timer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    clicks.current += 1;

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { clicks.current = 0; }, RESET_MS);

    if (clicks.current >= CLICKS_NEEDED) {
      clicks.current = 0;
      window.open(DASHBOARD_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'default', userSelect: 'none' }}>
      <Image
        src="/logo.svg"
        alt="Logincor - Transporte y Logística Industrial"
        width={220}
        height={50}
        priority
      />
    </div>
  );
}
