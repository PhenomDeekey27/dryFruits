/**
 * Get the site URL based on the current environment.
 * Vercel automatically sets VERCEL_URL for deployment URLs.
 * Falls back to NEXT_PUBLIC_SITE_URL (for local dev) or localhost.
 */
export function getSiteUrl(): string {
  // On Vercel, use the deployment URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Use the explicitly configured site URL (for local development)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Fallback for local development
  return 'http://localhost:3000';
}
