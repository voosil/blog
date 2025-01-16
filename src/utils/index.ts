import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const getRandomHue = (option?: { min?: number; max?: number }) => {
  const { min = 0, max = 360 } = option ?? {};
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function url(path: string) {
  return import.meta.env.BASE_URL + path;
}
