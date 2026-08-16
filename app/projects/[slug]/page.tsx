"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { getProject } from "@/lib/firestoreProjects";
import { Project } from "@/lib/data/projects";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProject(slug).then((data) => {
      setProject(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <main className="px-6 py-16 max-w-4xl mx-auto">Loading...</main>;
  if (!project) return notFound();

  return (
    <main className="px-6 md:px-12 py-16 max-w-4xl mx-auto">
      <Link href="/#projects" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
        ← Back to projects
      </Link>
      <h1 className="text-4xl md:text-6xl font-medium mt-8 mb-4">{project.title}</h1>
      <p className="text-sm text-[var(--text-muted)] font-mono mb-4">{project.icon} {project.year}</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs px-3 py-1 border border-[var(--text-primary)]/10 rounded-full text-[var(--text-muted)]">{tag}</span>
        ))}
      </div>
      {project.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {project.images.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={img} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-64 md:h-80 object-cover rounded-2xl border border-[var(--text-primary)]/10" />
          ))}
        </div>
      )}
      <div className="text-lg text-[var(--text-muted)] leading-relaxed space-y-4">
        {project.longDescription.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      {project.link && (
        <a href={project.link} target="_blank" className="inline-block mt-8 text-[var(--accent)] border-b border-[var(--accent)] pb-1">
          View Project →
        </a>
      )}
    </main>
  );
}