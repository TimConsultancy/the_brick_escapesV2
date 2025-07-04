'use client';
import React from "react";
export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={`w-full h-3 bg-gray-200 dark:bg-gray-800 rounded ${className || ""}`}>
      <div className="h-3 bg-green-500 rounded transition-all duration-500" style={{ width: `${value}%` }} />
    </div>
  );
}
