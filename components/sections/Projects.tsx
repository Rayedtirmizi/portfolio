"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects } from "@/lib/firestoreProjects";
import { Project } from "@/lib/data/projects";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="projects" className="min-h-screen flex items-center px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-sm text-[var(--text-muted)] font-medium tracking-wider uppercase">Projects</span>
          <div className="flex-1 h-px bg-[var(--text-primary)]/10"></div>
          <span className="text-xs text-[var(--text-muted)]">03</span>
        </div>

        {loading && <p className="text-[var(--text-muted)]">Loading...</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group relative border border-[var(--text-primary)]/10 rounded-2xl p-6 md:p-8 hover:border-[var(--text-primary)]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[var(--text-primary)]/5 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl opacity-30 group-hover:opacity-60 transition-opacity">{project.icon}</span>
                <span className="text-xs text-[var(--text-muted)] font-mono">{project.year}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3 group-hover:text-[var(--text-primary)] transition-colors">{project.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[var(--text-primary)]/5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 border border-[var(--text-primary)]/10 rounded-full text-[var(--text-muted)]">{tag}</span>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--text-primary)]/0 via-[var(--text-primary)]/20 to-[var(--text-primary)]/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}