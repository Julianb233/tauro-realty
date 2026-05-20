"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSearchBar from "@/components/HeroSearchBar";
import HeroSlideshow from "@/components/HeroSlideshow";
import { siteBrand } from "@/lib/site-config";

const PHRASES = ["Find Your Place", "Discover Luxury", "Live Extraordinary"];
const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let delay: number;

    if (!isDeleting) {
      if (text.length < current.length) {
        delay = TYPE_SPEED;
      } else {
        delay = PAUSE_AFTER_TYPE;
      }
    } else {
      if (text.length > 0) {
        delay = DELETE_SPEED;
      } else {
        delay = PAUSE_AFTER_DELETE;
      }
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, phraseIndex, isDeleting, phrases]);

  return text;
}

export default function Hero() {
  const typedText = useTypewriter(PHRASES);

  return (
    <section aria-label="Hero" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* Auto-rotating slideshow background */}
      <HeroSlideshow />

      {/* Brand overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-midnight/88 via-midnight/66 to-midnight/50" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,169,110,0.18),transparent_34%),linear-gradient(115deg,rgba(26,26,46,0.76),rgba(139,0,0,0.18)_48%,rgba(26,26,46,0.72))]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <p className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
          {siteBrand.category}
        </p>
        <h1 className="font-heading text-3xl font-bold leading-tight text-off-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="inline-flex items-baseline">
            <span>{typedText}</span>
            <span
              aria-hidden="true"
              className="typewriter-cursor ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.05em] bg-gold"
            />
          </span>
          <br />
          <em className="text-gold">in Philadelphia</em>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-off-white/90 drop-shadow sm:mt-6 sm:text-lg">
          Discover luxury homes and condos across Philadelphia&apos;s most
          coveted neighborhoods with {siteBrand.name}&apos;s expert agents.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-10 py-4 font-label text-base font-bold uppercase tracking-wider text-near-black shadow-lg shadow-gold/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/40 active:scale-[0.98]"
          >
            Search All Properties
            <ArrowRight className="size-5" strokeWidth={2} />
          </Link>
          <Link
            href="/home-value"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-midnight/55 px-6 py-4 font-label text-sm font-medium uppercase tracking-wider text-off-white backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold"
          >
            Get Your Home Value
          </Link>
        </div>

        {/* Search overlay */}
        <HeroSearchBar />

        {/* Scroll hint */}
        <div className="mt-16 animate-bounce" aria-hidden="true">
          <div className="mx-auto h-8 w-5 rounded-full border-2 border-white/30">
            <div className="mx-auto mt-1.5 h-2 w-1 rounded-full bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
