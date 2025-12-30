// Navigation utilities for cross-subdomain support

export type Section = 'main' | 'core' | 'interface';

// Get URLs from environment or use defaults for development
export const URLS = {
  main: process.env.NEXT_PUBLIC_MAIN_URL || 'http://localhost:3000',
  core: process.env.NEXT_PUBLIC_CORE_URL || 'http://localhost:3000/core',
  interface: process.env.NEXT_PUBLIC_INTERFACE_URL || 'http://localhost:3000/interface'
};

// Detect current section based on hostname and pathname
export function detectSection(hostname: string, pathname: string): Section {
  // Check hostname for subdomains
  if (hostname.startsWith('core.')) {
    return 'core';
  }
  if (hostname.startsWith('interface.')) {
    return 'interface';
  }

  // For localhost or main domain, check pathname
  if (pathname.startsWith('/core')) {
    return 'core';
  }
  if (pathname.startsWith('/interface')) {
    return 'interface';
  }

  return 'main';
}

// Get the base URL for a section
export function getSectionUrl(section: Section): string {
  return URLS[section];
}

// Build a full URL for navigation
export function buildUrl(section: Section, path: string = ''): string {
  const baseUrl = getSectionUrl(section);

  // For development (localhost), handle paths differently
  if (baseUrl.includes('localhost')) {
    // Remove the /core or /interface prefix if present
    const cleanPath = path.replace(/^\/(core|interface)/, '');

    if (section === 'main') {
      return cleanPath || '/';
    }
    return `/${section}${cleanPath}`;
  }

  // For production (subdomains), use absolute URLs
  return `${baseUrl}${path}`;
}

// Check if we're in development mode
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development' ||
         (typeof window !== 'undefined' && window.location.hostname === 'localhost');
}