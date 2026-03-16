import { Hammer } from "lucide-react";
import React from "react";

export default function Logo({ size, className }: any) {
  return (
    <div className={`bg-[#F0A535] p-2 rounded-sm w-fit h-fit ${className}`}>
      <Hammer color="#3D2514" size={size || 24} />
    </div>
  );
}
