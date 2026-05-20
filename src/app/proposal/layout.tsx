import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Proposal",
  description:
    "LYL Realty Group website build proposal — scope, deliverables, timeline, and pricing.",
  robots: { index: false, follow: false },
};

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
