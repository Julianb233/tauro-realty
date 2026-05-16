import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "LYL Realty Group | Website Under Construction",
  description:
    "LYL Realty Group is updating its Philadelphia real estate website. Contact Dayhna Carroll and the LYL Realty Group office for current real estate support.",
};

const contactItems = [
  {
    label: "Call the office",
    value: "267-773-8600",
    href: "tel:+12677738600",
    icon: Phone,
  },
  {
    label: "Send an email",
    value: "info@LYLrealty.com",
    href: "mailto:info@LYLrealty.com",
    icon: Mail,
  },
  {
    label: "Visit the office",
    value: "6329 Germantown Ave, Philadelphia, PA 19144",
    href: "https://maps.google.com/?q=6329%20Germantown%20Ave%20Philadelphia%20PA%2019144",
    icon: MapPin,
  },
];

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f7faf7] text-[#071f32]">
      <section
        className="flex min-h-screen overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.24), transparent 32%), linear-gradient(135deg, #0066ca 0%, #003a74 48%, #009900 100%)",
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-5 border-b border-white/28 pb-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-label text-xs font-bold uppercase tracking-[0.22em] text-white/80">
                Philadelphia Real Estate
              </p>
              <p className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
                LYL Realty Group
              </p>
            </div>
            <a
              href="https://www.LYLrealty.com"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/50 bg-white px-5 py-3 text-sm font-bold text-[#003a74] shadow-lg shadow-black/20 transition hover:bg-[#e9f7e9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              www.LYLrealty.com
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </header>

          <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
            <div className="max-w-3xl text-white">
              <div className="mb-7 inline-flex rounded-full border border-white/35 bg-white/14 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/15">
                Website under construction
              </div>
              <h1 className="font-heading text-5xl font-bold leading-[0.96] text-white drop-shadow-xl sm:text-6xl lg:text-7xl">
                LYL Realty Group is building a cleaner online home.
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-white sm:text-xl">
                The site is being updated. For active real estate, buyer,
                seller, investor, or property support, contact the LYL Realty
                Group office directly.
              </p>
            </div>

            <aside className="rounded-[2rem] border border-white/35 bg-white p-6 shadow-2xl shadow-black/30 sm:p-8">
              <p className="font-label text-xs font-bold uppercase tracking-[0.2em] text-[#007a00]">
                Contact while we update
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-[#071f32]">
                Dayhna Carroll
              </h2>
              <p className="mt-2 text-base font-semibold text-[#24455f]">
                Broker of Record, LYL Realty Group
              </p>

              <div className="mt-7 space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex gap-4 rounded-2xl border border-[#d6e5d6] bg-[#f7faf7] p-4 text-[#071f32] transition hover:border-[#009900] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066ca]"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#0066ca] text-white">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#007a00]">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-base font-bold leading-6">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </aside>
          </div>

          <footer className="border-t border-white/28 pt-6 text-sm font-semibold text-white/82">
            <span>LYL Realty Group</span>
            <span className="mx-3 text-white/45">/</span>
            <span>Blue #0066CA</span>
            <span className="mx-3 text-white/45">/</span>
            <span>Green #009900</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
