const experiences = [
  {
    role: "Software Engineering Intern",
    company: "VOXA — AI-Powered Speech Coaching Platform",
    dates: "2025 – 2026",
    bullets: [
      "Developed production features using React, TypeScript, and Tailwind CSS for a live customer-facing web app",
      "Designed and implemented onboarding flows and UI screens, improving first-time user experience",
      "Integrated analytics and quality tooling, improving application performance and maintainability",
      "Participated in code reviews and CI/CD workflows, gaining practical startup-level engineering experience",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-sm text-[var(--text-muted)] font-medium tracking-wider uppercase">Experience</span>
          <div className="flex-1 h-px bg-[var(--text-primary)]/10"></div>
          <span className="text-xs text-[var(--text-muted)]">04</span>
        </div>

        <div className="space-y-10">
          {experiences.map((exp) => (
            <div key={exp.role} className="grid md:grid-cols-4 gap-6 border-b border-[var(--text-primary)]/10 pb-10">
              <div className="md:col-span-1">
                <p className="text-sm text-[var(--text-muted)]">{exp.dates}</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl md:text-2xl font-medium">{exp.role}</h3>
                <p className="text-[var(--accent)] mb-4">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="text-[var(--text-muted)] leading-relaxed flex gap-3">
                      <span className="text-[var(--accent)]">→</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}