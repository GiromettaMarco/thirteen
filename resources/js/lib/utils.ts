import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Fake network delay.
 *
 * @param ms Delay in milliseconds
 * @returns Promise resolved after ms
 */
export function delay(ms: number = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
