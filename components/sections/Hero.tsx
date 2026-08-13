export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 md:px-12 py-8 flex flex-col justify-between">
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center text-sm">
        <span className="text-[var(--text-muted)]">© Rayed Tirmizi</span>
        <div className="hidden md:flex gap-10">
          <a href="#about" className="hover:text-[var(--text-primary)] transition-colors">About</a>
          <a href="#projects" className="hover:text-[var(--text-primary)] transition-colors">Projects</a>
          <a href="#contact" className="hover:text-[var(--text-primary)] transition-colors">Contact</a>
        </div>
        <button className="px-5 py-2 rounded-full bg-[var(--text-primary)] text-[var(--bg)] text-xs font-medium hover:opacity-80 transition-opacity">
          Get in touch
        </button>
      </nav>

      {/* Background Name - Minimal Black & White */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-[12vw] md:text-[10vw] font-light leading-none tracking-[0.02em] text-[var(--text-primary)]/5 whitespace-nowrap">
          Rayed Tirmizi
        </h1>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 flex justify-between items-end">
        {/* Social Links */}
        <div className="flex flex-col gap-3">
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            className="w-9 h-9 rounded-full border border-[var(--text-primary)]/20 flex items-center justify-center hover:border-[var(--text-primary)] transition-all duration-300 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            GH
          </a>
          <a 
            href="https://linkedin.com/in/yourusername" 
            target="_blank" 
            className="w-9 h-9 rounded-full border border-[var(--text-primary)]/20 flex items-center justify-center hover:border-[var(--text-primary)] transition-all duration-300 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            in
          </a>
        </div>

        {/* Title Section */}
        <div className="text-right">
          <p className="text-3xl md:text-5xl font-light leading-tight text-[var(--text-primary)]">
            Full-Stack Developer
          </p>
          <p className="text-3xl md:text-5xl font-light leading-tight text-[var(--text-muted)]">
            CS Student
          </p>
        </div>
      </div>
    </section>
  );
}