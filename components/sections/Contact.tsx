"use client";

import { useEffect, useState } from "react";
import { getContact, ContactInfo } from "@/lib/firestoreContact";

export default function Contact() {
  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    getContact().then(setContact);
  }, []);

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-sm text-[var(--text-muted)] font-medium tracking-wider uppercase">Contact</span>
          <div className="flex-1 h-px bg-[var(--text-primary)]/10"></div>
          <span className="text-xs text-[var(--text-muted)]">05</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-medium leading-tight max-w-3xl mb-12">
          Got something worth building? <span className="text-[var(--accent)]">Let&apos;s talk.</span>
        </h2>

        {contact && (
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <a href={`mailto:${contact.email}`} className="text-lg md:text-xl border-b border-[var(--text-primary)]/20 pb-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors w-fit">
              {contact.email}
            </a>
            <a href={contact.linkedin} target="_blank" className="text-lg md:text-xl border-b border-[var(--text-primary)]/20 pb-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors w-fit">
              LinkedIn
            </a>
            <a href={contact.github} target="_blank" className="text-lg md:text-xl border-b border-[var(--text-primary)]/20 pb-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors w-fit">
              GitHub
            </a>
          </div>
        )}

        <p className="text-sm text-[var(--text-muted)] mt-20">
          © {new Date().getFullYear()} Rayed Tirmizi. Built from scratch.
        </p>
      </div>
    </section>
  );
}