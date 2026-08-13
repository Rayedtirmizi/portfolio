export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header with line */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-sm text-[var(--text-muted)] font-medium tracking-wider uppercase">About</span>
          <div className="flex-1 h-px bg-[var(--text-primary)]/10"></div>
          <span className="text-xs text-[var(--text-muted)]">01</span>
        </div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          {/* Left: Main content */}
          <div className="md:col-span-3 space-y-8">
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.4]">
              I&apos;m a Computer Science student in Bahrain who likes building things
              that actually get used.
            </p>

            <div className="space-y-4 text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
              <p>
                From a <span className="text-[var(--accent)] font-medium">production React app</span> during my internship at VOXA,
                to a <span className="text-[var(--accent)] font-medium">full-stack safety app</span> with real-time location sharing,
                to a toy that won an <span className="text-[var(--accent)] font-medium">MIT award</span> for helping people express emotions.
              </p>
              <p>
                I care about software that solves real problems — not just checks a box —
                and I enjoy the mix of frontend polish and backend logic that full-stack
                work demands.
              </p>
            </div>

            {/* Stats / Highlights */}
            <div className="flex flex-wrap gap-10 pt-4">
              {[
                { value: "3.8", label: "CGPA" },
                { value: "4+", label: "Projects Shipped" },
                { value: "1", label: "MIT Award" },
                { value: "1", label: "Internship" },
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

          {/* Right: Currently + quote */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                Currently
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] mt-1">→</span>
                  <span>Computer Science @ UTB</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] mt-1">→</span>
                  <span>Building the <span className="font-medium">Polaris</span> safety app</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] mt-1">→</span>
                  <span>Exploring <span className="font-medium">Flutter</span> &amp; <span className="font-medium">Firebase</span></span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-[var(--text-muted)] italic border-l-2 border-[var(--accent)] pl-4">
              "Building things that people actually use."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}