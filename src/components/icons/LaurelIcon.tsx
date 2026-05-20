import React from 'react';

type LaurelIconProps = {
  className?: string;
};

export default function LaurelIcon({ className = 'w-16 h-16 text-accent' }: LaurelIconProps) {
  return (
    <svg
      viewBox="0 0 100 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Branch */}
      <path d="M 45 70 C 25 70 15 50 15 25" />
      {/* Left leaves */}
      <path d="M 15 25 C 10 20 5 25 15 25" fill="currentColor" />
      <path d="M 17 35 C 10 32 8 40 17 37" fill="currentColor" />
      <path d="M 21 45 C 12 43 12 52 21 47" fill="currentColor" />
      <path d="M 28 55 C 18 55 20 63 28 57" fill="currentColor" />
      <path d="M 36 63 C 28 65 32 72 36 65" fill="currentColor" />
      
      {/* Left leaves pointing upwards */}
      <path d="M 15 25 C 18 15 25 18 17 28" fill="currentColor" />
      <path d="M 18 35 C 22 25 28 28 20 38" fill="currentColor" />
      <path d="M 22 45 C 27 36 32 40 24 48" fill="currentColor" />
      <path d="M 28 55 C 34 47 38 52 30 58" fill="currentColor" />

      {/* Right Branch */}
      <path d="M 55 70 C 75 70 85 50 85 25" />
      {/* Right leaves */}
      <path d="M 85 25 C 90 20 95 25 85 25" fill="currentColor" />
      <path d="M 83 35 C 90 32 92 40 83 37" fill="currentColor" />
      <path d="M 79 45 C 88 43 88 52 79 47" fill="currentColor" />
      <path d="M 72 55 C 82 55 80 63 72 57" fill="currentColor" />
      <path d="M 64 63 C 72 65 68 72 64 65" fill="currentColor" />
      
      {/* Right leaves pointing upwards */}
      <path d="M 85 25 C 82 15 75 18 83 28" fill="currentColor" />
      <path d="M 82 35 C 78 25 72 28 80 38" fill="currentColor" />
      <path d="M 78 45 C 73 36 68 40 76 48" fill="currentColor" />
      <path d="M 72 55 C 66 47 62 52 70 58" fill="currentColor" />
    </svg>
  );
}
