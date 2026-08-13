const toolCategories = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Mobile",
    items: ["Flutter", "Dart"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Firebase"],
  },
  {
    category: "AI & Integrations",
    items: ["OpenAI API", "Firestore", "Google Maps SDK"],
  },
  {
    category: "Design",
    items: ["Figma"],
  },
  {
    category: "Tools",
    items: ["Git", "CI/CD", "VS Code"],
  },
];

export default function Tools() {
  return (
    <section id="tools" className="min-h-screen flex items-center px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-sm text-[var(--text-muted)] font-medium tracking-wider uppercase">
            Tools & Tech
          </span>
          <div className="flex-1 h-px bg-[var(--text-primary)]/10"></div>
          <span className="text-xs text-[var(--text-muted)]">02</span>
        </div>

        {/* Grid Layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {toolCategories.map((group) => (
            <div
              key={group.category}
              className="group relative border border-[var(--text-primary)]/10 rounded-2xl p-6 md:p-8 hover:border-[var(--text-primary)]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--text-primary)]/5"
            >
              {/* Category Header with subtle accent line */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs text-[var(--text-muted)] font-mono opacity-30">
                  {(toolCategories.indexOf(group) + 1).toString().padStart(2, '0')}
                </span>
                <div className="flex-1 h-px bg-[var(--text-primary)]/5"></div>
              </div>
              
              <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
                {group.category}
              </h3>
              
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base md:text-lg font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]/20 group-hover:bg-[var(--text-primary)]/40 transition-colors"></span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Subtle hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--text-primary)]/0 via-[var(--text-primary)]/20 to-[var(--text-primary)]/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Optional: Summary/Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            <span className="font-mono text-[var(--text-primary)]/30">✦</span>{" "}
            Always learning, always building{" "}
            <span className="font-mono text-[var(--text-primary)]/30">✦</span>
          </p>
        </div>
      </div>
    </section>
  );
}