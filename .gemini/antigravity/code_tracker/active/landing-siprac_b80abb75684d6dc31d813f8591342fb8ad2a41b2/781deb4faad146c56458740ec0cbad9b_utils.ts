¦import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
¦"(b80abb75684d6dc31d813f8591342fb8ad2a41b22bfile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/lib/utils.ts:Ffile:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac