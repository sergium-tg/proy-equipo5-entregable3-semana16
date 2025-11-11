"use client";
import React from "react";

export const Boxes = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-slate-900 transform scale-[1.1]">
      <div className="absolute inset-0 flex flex-wrap justify-center items-center">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 border border-slate-700 relative animate-pulse"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};