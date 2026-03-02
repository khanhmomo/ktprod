"use client";

import Image from "next/image";
import { useState } from "react";

interface FounderPhotoProps {
  src: string;
  alt: string;
  fallback: string;
}

export function FounderPhoto({ src, alt, fallback }: FounderPhotoProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 mx-auto mb-6 flex items-center justify-center">
        <span className="text-3xl font-bold text-primary">{fallback}</span>
      </div>
    );
  }

  return (
    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 relative">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
