import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Careers in Philadelphia",
  description:
    "Discover why top Philadelphia real estate agents choose LYL Realty Group. Competitive splits, premium branding, cutting-edge tools, and a collaborative culture.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
