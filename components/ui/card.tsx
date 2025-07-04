'use client';
import React from "react";
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl shadow-md bg-white dark:bg-gray-950 transition-colors duration-300 ${className || ""}`}>{children}</div>;
}
export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
