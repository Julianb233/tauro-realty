export default function StatsBar() {
  return (
    <section className="border-y border-gold/20 bg-gradient-to-b from-midnight via-[#211829] to-midnight">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-14 sm:grid-cols-3 md:grid-cols-5 lg:px-8">
        {[
          { value: "20+", label: "Years in Business" },
          { value: "500+", label: "Properties Sold" },
          { value: "15", label: "Neighborhoods" },
          { value: "$2.1B", label: "Total Volume" },
          { value: "98%", label: "Client Satisfaction" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gold/25 bg-white/[0.045] px-4 py-6 text-center shadow-lg shadow-black/20 backdrop-blur-sm transition-colors hover:border-gold/60"
          >
            <p className="font-heading text-2xl font-bold text-gold sm:text-3xl md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium text-off-white/90 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
