
import { clsx } from "clsx" // Removed type import
import { twMerge } from "tailwind-merge"

export function cn(...inputs) { // Removed type
  return twMerge(clsx(inputs))
}
