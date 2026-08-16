"use client";

import { useEffect, useState } from "react";
import { getAbout, AboutInfo } from "@/lib/firestoreSite";

export default function About() {
  const [about, setAbout] = useState<AboutInfo | null>(null);

  useEffect(() => {
    getAbout().then(setAbout);
  }, []);

  if (!about) return null;

  return (
    <section id="about" className="min-h-screen flex items-center px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-sm text-[var(--text-muted)] font-medium tracking-wider uppercase">About</span>
          <div className="flex-1 h-px bg-[var(--text-primary)]/10"></div>
          <span className="text-xs text-[var(--text-muted)]">01</span>
        </div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          <div className="md:col-span-3 space-y-8">
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.4]">
              {about.introLine}
            </p>

            <div className="space-y-4 text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
              <p>{about.paragraph1}</p>
              <p>{about.paragraph2}</p>
            </div>

            <div className="flex flex-wrap gap-10 pt-4">
              {[
                { value: "3.8", label: "CGPA" },
                { value: about.projectsShipped, label: "Projects Shipped" },
                { value: "1", label: "MIT Award" },
                { value: about.internships, label: "Internship" },
              ].map((stat) => (
                <div key={stat.label} className="group">
                  <div className="text-3xl font-light text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Currently</h3>
              <ul className="space-y-3 text-sm">
                {about.currently.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[var(--accent)] mt-1">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-[var(--text-muted)] italic border-l-2 border-[var(--accent)] pl-4">
              &quot;{about.quote}&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}