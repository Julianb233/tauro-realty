const videos = [
  {
    id: "K9TZZrtwvkA",
    title: "Touring a $2.5M Estate in Philadelphia",
    thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80",
  },
  {
    id: "WRL27u6B5p4",
    title: "Inside a Massive $7M Luxury Home — Philadelphia",
    thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80",
  },
  {
    id: "S3WzfJnoRcU",
    title: "Inside a $15M Luxury Condo — The Dilworth, Center City",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
  },
  {
    id: "8CwaFvzklbE",
    title: "Luxury Home Tour — Fishtown, Philadelphia",
    thumbnail: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&q=80",
  },
  {
    id: "ev7nhD-EE6M",
    title: "New Construction Showcase — Germantown, Philadelphia",
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80",
  },
  {
    id: "qLcBAyVOElw",
    title: "Former Bank Revamped Into Stunning Paris-Inspired Apartment",
    thumbnail: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80",
  },
];

export default function VideoShowcase() {
  return (
    <section className="bg-midnight py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Property Tours
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
            Explore Philadelphia Homes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Step inside some of Philadelphia&apos;s finest properties with our
            exclusive video tours. See the craftsmanship, the neighborhoods, and
            the lifestyle before you visit in person.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg border border-white/10 bg-white/[0.04] p-2 transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <div
                className="relative aspect-video overflow-hidden rounded-md bg-near-black bg-cover bg-center"
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover opacity-85 transition-transform duration-300 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/10 to-transparent" />
                <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 bg-midnight/85 text-gold shadow-lg">
                  ▶
                </span>
              </div>
              <p className="mt-3 px-1 pb-1 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-gold">
                {video.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
