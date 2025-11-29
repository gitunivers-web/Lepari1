import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getApiUrl } from "./queryClient"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFileUrl(fileUrl?: string | null): string | undefined {
  if (!fileUrl) return undefined;
  
  if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
    return fileUrl;
  }
  
  // Backend returns full path: "/uploads/chat/[UUID]_[filename]"
  // Use getApiUrl() to build correct URL for both dev and production
  if (fileUrl.startsWith('/uploads/chat/')) {
    return getApiUrl(fileUrl);
  }
  
  // Fallback for legacy messages with just filename
  return getApiUrl(`/api/chat/file/${fileUrl}`);
}
