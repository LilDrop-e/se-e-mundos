import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Tone = "magenta" | "blue" | "yellow" | "ink";

const fill: Record<Tone, string> = {
  magenta: "var(--brand-magenta)",
  blue: "var(--brand-blue)",
  yellow: "var(--brand-yellow)",
  ink: "var(--foreground)",
};

type Base = {
  size?: number;
  color?: Tone;
  className?: string;
  style?: CSSProperties;
  rotate?: number;
};

export function Diamond({ size = 120, color = "magenta", className, style, rotate = 45 }: Base) {
  return (
    <div
      aria-hidden
      className={cn("shrink-0", className)}
      style={{
        width: size,
        height: size,
        background: fill[color],
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    />
  );
}

export function Circle({ size = 120, color = "blue", className, style }: Base) {
  return (
    <div
      aria-hidden
      className={cn("shrink-0 rounded-full", className)}
      style={{ width: size, height: size, background: fill[color], ...style }}
    />
  );
}

export function Ring({
  size = 120,
  color = "yellow",
  thickness = 12,
  className,
  style,
}: Base & { thickness?: number }) {
  return (
    <div
      aria-hidden
      className={cn("shrink-0 rounded-full", className)}
      style={{
        width: size,
        height: size,
        border: `${thickness}px solid ${fill[color]}`,
        ...style,
      }}
    />
  );
}

export function ThickLine({
  length = 240,
  thickness = 10,
  color = "ink",
  vertical = false,
  className,
  style,
  rotate = 0,
}: Base & { length?: number; thickness?: number; vertical?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn("shrink-0", className)}
      style={{
        width: vertical ? thickness : length,
        height: vertical ? length : thickness,
        background: fill[color],
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    />
  );
}

export function Triangle({
  size = 40,
  color = "ink",
  className,
  style,
  rotate = 0,
}: Base) {
  return (
    <div
      aria-hidden
      className={cn("shrink-0", className)}
      style={{
        width: 0,
        height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderTop: `${size * 0.85}px solid ${fill[color]}`,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    />
  );
}
