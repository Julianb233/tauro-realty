import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact LYL Realty Group for buying, selling, or real estate inquiries in Philadelphia. Reach our agents for property showings, home valuations, and expert market guidance.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
