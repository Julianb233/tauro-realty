import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bath,
  Bed,
  Calendar,
  Car,
  CheckCircle2,
  Download,
  Home,
  MapPin,
  Ruler,
  ShieldCheck,
  Trees,
} from "lucide-react";
import { siteBrand, siteUrl } from "@/lib/site-config";

const address = "1001 West Allen's Lane";
const cityLine = "Philadelphia, PA 19119";
const propertyImage = "/showings/1001-west-allens-lane/A.jpg";
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=1001%20W%20Allens%20Ln%2C%20Philadelphia%2C%20PA%2019119";

const facts = [
  { label: "Bedrooms", value: "4", icon: Bed },
  { label: "Bathrooms", value: "3.5", icon: Bath },
  { label: "Interior", value: "2,576 sq ft", icon: Ruler },
  { label: "Lot", value: "0.49 acres", icon: Trees },
  { label: "Garage", value: "2-car", icon: Car },
  { label: "Built", value: "1975", icon: Home },
];

const checklist = [
  "Confirm showing time, access instructions, and parking approach before arrival.",
  "Walk the exterior first: driveway, garage, grading, roofline, masonry, and tree coverage.",
  "Check natural light, room flow, storage, mechanical spaces, and signs of deferred maintenance.",
  "Review comparable West Mount Airy sales and any disclosure package before making decisions.",
];

export const metadata: Metadata = {
  title: `${address} Showing Page`,
  description:
    "Private LYL Realty Group showing page for 1001 W Allens Ln, Philadelphia, PA 19119.",
  alternates: {
    canonical: `${siteUrl}/showings/1001-west-allens-lane`,
  },
};

export default function ShowingPage() {
  return (
    <div className="bg-midnight text-white">
      <section className="relative min-h-[88svh] overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(209,174,103,0.22),transparent_32%),radial-gradient(circle_at_82%_28%,rgba(111,42,42,0.38),transparent_30%),linear-gradient(135deg,#1A1A2E_0%,#111123_52%,#07070F_100%)] pt-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gold/40" />
        <div className="absolute -right-24 top-32 h-72 w-72 rounded-full border border-gold/15" />
        <div className="absolute -left-20 bottom-10 h-60 w-60 rounded-full border border-white/10" />
        <div className="relative z-10 mx-auto grid min-h-[72svh] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="font-label text-xs font-bold uppercase tracking-[0.28em] text-gold sm:text-sm">
              Private Showing Hub
            </p>
            <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              {address}
              <span className="block text-gold">{cityLine}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/86 sm:text-lg">
              A focused showing page for touring this West Mount Airy detached
              home with LYL Realty Group. Public-record basics are summarized
              below; final buyer decisions should be confirmed against
              disclosures, inspections, and current MLS status.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-bold text-midnight transition-colors hover:bg-gold-light"
              >
                Open Directions <MapPin className="ml-2 size-4" />
              </a>
              <a
                href="/api/showings/1001-west-allens-lane/brochure"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-gold/55 bg-white/[0.04] px-6 text-sm font-bold text-white transition-colors hover:bg-gold hover:text-midnight"
              >
                Download PDF Brochure <Download className="ml-2 size-4" />
              </a>
              <Link
                href="/book-tour"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/25 px-6 text-sm font-bold text-white transition-colors hover:border-gold hover:text-gold"
              >
                Schedule Follow-Up <Calendar className="ml-2 size-4" />
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-gold/25 bg-white/[0.04] p-2 shadow-2xl shadow-black/30">
            <img
              src={propertyImage}
              alt={`${address} exterior`}
              className="aspect-[4/5] w-full rounded-md object-cover sm:aspect-[16/11] lg:aspect-[4/5]"
            />
            <div className="absolute left-5 top-5 rounded-md bg-midnight/85 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-gold backdrop-blur">
              Showing Ready
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-midnight py-10">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-6 lg:px-8">
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-lg border border-white/12 bg-white/[0.05] p-4">
              <fact.icon className="size-5 text-gold" />
              <p className="mt-3 font-heading text-2xl font-bold text-white">{fact.value}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111123] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="font-label text-xs font-bold uppercase tracking-[0.24em] text-gold">
              Showing Notes
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-5xl">
              Tour it with a buyer&apos;s eye.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/78 sm:text-base">
              The goal of this page is to make the showing useful on-site: pull
              up the address, confirm the baseline facts, walk the property
              consistently, and capture next questions immediately after the
              visit.
            </p>
            <div className="mt-8 grid gap-3">
              {checklist.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" />
                  <p className="text-sm leading-relaxed text-white/84">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-gold/25 bg-midnight p-6 shadow-2xl shadow-black/20">
            <ShieldCheck className="size-8 text-gold" />
            <h3 className="mt-4 font-heading text-2xl font-bold text-white">
              Public Record Snapshot
            </h3>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-white/62">Property type</dt>
                <dd className="font-semibold text-white">Detached single-family</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-white/62">Neighborhood</dt>
                <dd className="font-semibold text-white">West Mount Airy</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-white/62">Lot size</dt>
                <dd className="font-semibold text-white">21,537 sq ft</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-white/62">HOA</dt>
                <dd className="font-semibold text-white">No association listed</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/62">Status note</dt>
                <dd className="max-w-[13rem] text-right font-semibold text-white">
                  Confirm current MLS status before client-facing claims
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="bg-cream py-16 text-midnight sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <p className="font-label text-xs font-bold uppercase tracking-[0.24em] text-gold-dark">
              Location Context
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-5xl">
              West Mount Airy access with a residential feel.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-midnight/78 sm:text-base">
              Use the showing to evaluate the practical tradeoffs buyers care
              about: privacy, parking, commute pattern, outdoor maintenance,
              and proximity to neighborhood amenities. Capture any follow-up
              items before leaving the block.
            </p>
          </div>
          <div className="rounded-lg border border-midnight/10 bg-white p-5 shadow-sm">
            <MapPin className="size-6 text-gold-dark" />
            <h3 className="mt-3 font-heading text-xl font-bold">On-site actions</h3>
            <ul className="mt-4 space-y-2 text-sm text-midnight/76">
              <li>Save exterior notes and first impressions.</li>
              <li>Photograph buyer questions room-by-room.</li>
              <li>Confirm desired next step before the tour ends.</li>
            </ul>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center text-sm font-bold text-gold-dark hover:text-midnight"
            >
              View on Google Maps <ArrowRight className="ml-2 size-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-midnight py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-label text-xs font-bold uppercase tracking-[0.24em] text-gold">
            LYL Realty Group
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-5xl">
            Ready to tour or review comps?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/78 sm:text-base">
            Call {siteBrand.displayPhone} or use the tour request form to
            coordinate the next showing step.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${siteBrand.phone}`}
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-6 text-sm font-bold text-midnight hover:bg-gold-light"
            >
              Call {siteBrand.displayPhone}
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/25 px-6 text-sm font-bold text-white hover:border-gold hover:text-gold"
            >
              Contact the Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
