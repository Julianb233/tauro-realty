/**
 * Centralized site configuration.
 * Uses NEXT_PUBLIC_SITE_URL env var for the production domain,
 * falling back to the default domain if not set.
 */

const DEFAULT_SITE_URL = "https://www.lylrealty.com";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || DEFAULT_SITE_URL;

export const siteBrand = {
  name: "LYL Realty Group",
  shortName: "LYL",
  tagline: "Loving Your Living",
  category: "Premium Philadelphia Real Estate",
  description:
    "LYL Realty Group is a premium Philadelphia real estate brokerage helping buyers, sellers, and investors move with confidence across the city's most sought-after neighborhoods.",
  phone: "+12677738600",
  displayPhone: "(267) 773-8600",
  email: "info@lylrealty.com",
  logoPath: "/brand/lyl-realty-group-logo-cropped.png",
  address: {
    street: "6329 Germantown Ave, first floor rear",
    city: "Philadelphia",
    region: "PA",
    postalCode: "19144",
    country: "US",
  },
  socials: {
    youtube: "https://www.youtube.com/@lylrealtygroup",
  },
} as const;
