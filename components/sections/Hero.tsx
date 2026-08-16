"use client";

import { useEffect, useState } from "react";
import { getHero, HeroInfo } from "@/lib/firestoreSite";

export default function Hero() {
  const [hero, setHero] = useState<HeroInfo | null>(null);

  useEffect(() => {
    getHero().then(setHero);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden px-6 md:px-12 py-8 flex flex-col justify-between">
      <nav className="relative z-10 flex justify-between items-center text-sm">
        <span className="text-[var(--text-muted)]">© {hero?.name ?? "Rayed Tirmizi"}</span>
        <div className="hidden md:flex gap-10">
          <a href="#about" className="hover:text-[var(--text-primary)] transition-colors">About</a>
          <a href="#projects" className="hover:text-[var(--text-primary)] transition-colors">Projects</a>
          <a href="#contact" className="hover:text-[var(--text-primary)] transition-colors">Contact</a>
        </div>
        <button className="px-5 py-2 rounded-full border border-white text-white text-xs font-medium hover:bg-white hover:text-black transition-colors">
  Get in touch
</button>
      </nav>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
       <h1
  className="text-[12vw] md:text-[10vw] font-light leading-none tracking-[0.02em] text-[var(--text-primary)]/20 tespace-nowrap"
  style={{ fontFamily: "var(--font-playfair)" }}
>
  {hero?.name ?? "Rayed Tirmizi"}
</h1>
      </div>

      <div className="relative z-10 flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <a href="https://github.com/yourusername" target="_blank" className="w-9 h-9 rounded-full border border-[var(--text-primary)]/20 flex items-center justify-center hover:border-[var(--text-primary)] transition-all duration-300 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            GH
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" className="w-9 h-9 rounded-full border border-[var(--text-primary)]/20 flex items-center justify-center hover:border-[var(--text-primary)] transition-all duration-300 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            in
          </a>
        </div>

        <div className="text-right">
          <p className="text-3xl md:text-5xl font-light leading-tight text-[var(--text-primary)]">
            {hero?.roleLine1 ?? "Full-Stack Developer"}
          </p>
          <p className="text-3xl md:text-5xl font-light leading-tight text-[var(--text-muted)]">
            {hero?.roleLine2 ?? "CS Student"}
          </p>
        </div>
      </div>
    </section>
  );
}