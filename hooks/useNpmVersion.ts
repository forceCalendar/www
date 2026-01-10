"use client";

import { useState, useEffect } from "react";

interface NpmVersionData {
  version: string;
  publishedAt: string | null;
  isLoading: boolean;
  error: string | null;
  isNewRelease: boolean;
}

/**
 * Hook to fetch the latest version of an npm package
 * @param packageName - The npm package name (e.g., "@forcecalendar/core")
 * @param newReleaseDays - Number of days to consider a release as "new" (default: 7)
 */
export function useNpmVersion(
  packageName: string,
  newReleaseDays: number = 7
): NpmVersionData {
  const [data, setData] = useState<NpmVersionData>({
    version: "",
    publishedAt: null,
    isLoading: true,
    error: null,
    isNewRelease: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchVersion() {
      try {
        // Use the npm registry API - fetch full package info to get time data
        const response = await fetch(
          `https://registry.npmjs.org/${encodeURIComponent(packageName)}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch package info: ${response.status}`);
        }

        const packageData = await response.json();

        if (cancelled) return;

        // Get the latest version from dist-tags
        const version = packageData["dist-tags"]?.latest || "";

        // Get the publish date from the time object
        const publishedAt = version && packageData.time?.[version]
          ? packageData.time[version]
          : null;

        // Check if this is a "new" release (within newReleaseDays)
        let isNewRelease = false;
        if (publishedAt) {
          const publishDate = new Date(publishedAt);
          const now = new Date();
          const diffDays = Math.floor(
            (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          isNewRelease = diffDays <= newReleaseDays;
        }

        setData({
          version,
          publishedAt,
          isLoading: false,
          error: null,
          isNewRelease,
        });
      } catch (err) {
        if (cancelled) return;
        setData({
          version: "",
          publishedAt: null,
          isLoading: false,
          error: err instanceof Error ? err.message : "Unknown error",
          isNewRelease: false,
        });
      }
    }

    fetchVersion();

    return () => {
      cancelled = true;
    };
  }, [packageName, newReleaseDays]);

  return data;
}

/**
 * Fetch version at build time for SSR
 */
export async function fetchNpmVersion(packageName: string): Promise<{
  version: string;
  publishedAt: string | null;
}> {
  try {
    const response = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(packageName)}`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      return { version: "", publishedAt: null };
    }

    const packageData = await response.json();
    const version = packageData["dist-tags"]?.latest || "";
    const publishedAt = version && packageData.time?.[version]
      ? packageData.time[version]
      : null;

    return { version, publishedAt };
  } catch {
    return { version: "", publishedAt: null };
  }
}
