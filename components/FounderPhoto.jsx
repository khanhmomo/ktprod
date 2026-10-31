"use client";

import { useState } from "react";

export default function FounderPhoto({ src, initials, name }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-20 w-20 items-center justify-center border border-crimson-500/40 bg-crimson-900/30 font-mono text-2xl font-bold text-crimson-400">
        {initials}
      </div>
    );
  }

  return (
    <div className="relative h-20 w-20 overflow-hidden border border-crimson-500/40">
      {/* Fallback initials visible while image loads */}
      <div className="absolute inset-0 flex items-center justify-center bg-crimson-900/30 font-mono text-2xl font-bold text-crimson-400">
        {initials}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} — KTProd Technology`}
        onError={() => setError(true)}
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />
    </div>
  );
}
