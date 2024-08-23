// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// import jsPDF from "jspdf";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const exportToPng = () => {
  const canvas = document.querySelector("canvas");

  if (!canvas) return;

  const data = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "whiteboard.png";

  link.href = data;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
