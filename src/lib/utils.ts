import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDifficultyColor(difficulty = "") {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "text-green-500"
    case "medium":
      return "text-yellow-500"
    case "hard":
      return "text-red-500"
    default:
      return "text-[#D1D5DC]"
  }
}

export function getDifficultyBorderColor(difficulty = "") {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "border-green-500"
    case "medium":
      return "border-yellow-500"
    case "hard":
      return "border-red-500"
    default:
      return "border-gray-500"
  }
}
