import { useEffect, useState } from "react";

export default function HeroSection({ subtitle, title, cta }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      setScrollY(window.scrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxProgress = Math.min(scrollY / 700, 1);
  const backgroundOffset = parallaxProgress * 140;
  const contentOffset = parallaxProgress * 52;
  const indicatorOffset = Math.min(parallaxProgress * 22, 22);
  const contentOpacity = Math.max(1 - parallaxProgress * 0.9, 0.1);
  const indicatorOpacity = Math.max(0.82 - parallaxProgress * 0.55, 0.2);

  return (
    <header className="relative flex min-h-[100svh] items-center overflow-hidden bg-stone-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.png')",
          transform: `translateY(${backgroundOffset}px) scale(1.16)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,15,16,0.2),rgba(15,15,16,0.12)_38%,rgba(0,0,0,0.84))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,155,43,0.2),transparent_42%)]" />

      <div
        className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-28 pt-28 text-center sm:px-6 lg:px-8"
        style={{
          transform: `translateY(${contentOffset}px)`,
          opacity: contentOpacity,
        }}
      >
        <p className="mb-5 inline-flex rounded-full border border-[color:var(--accent-soft)]/30 bg-[color:var(--accent)]/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-light)] backdrop-blur">
          {subtitle}
        </p>
        <h1 className="font-display max-w-5xl text-5xl leading-[0.92] tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-[7.5rem]">
          {title}
        </h1>
        <a
          href="#arches"
          className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--surface-dark-soft)] px-8 text-base font-bold text-white shadow-[0_18px_44px_rgba(4,63,54,0.34)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-dark)]"
        >
          {cta}
        </a>
      </div>

      <div
        className="scroll-indicator pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-white/70 sm:bottom-8"
        style={{
          transform: `translateY(${indicatorOffset}px)`,
          opacity: indicatorOpacity,
        }}
      >
        <span className="h-12 w-px bg-gradient-to-b from-transparent via-white/70 to-transparent" />
        <span>Прокрутите, чтобы узнать больше</span>
      </div>
    </header>
  );
}
