import { useEffect, useState } from "react";

export default function HeroSection({ subtitle, title, cta }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="relative flex min-h-[100svh] items-center overflow-hidden bg-stone-950 text-white md:min-h-[110svh]">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-150"
        style={{
          backgroundImage: "url('/images/hero.png')",
          transform: `translateY(${offset}px) scale(1.08)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,15,16,0.26),rgba(15,15,16,0.08)_40%,rgba(0,0,0,0.8))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,141,88,0.32),transparent_42%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-28 pt-28 text-center sm:px-6 lg:px-8">
        <p className="mb-5 inline-flex rounded-full border border-[#f4ddbb]/20 bg-[#b88d58]/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#f4ddbb] backdrop-blur">
          {subtitle}
        </p>
        <h1 className="font-display max-w-5xl text-5xl leading-[0.92] tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-[7.5rem]">
          {title}
        </h1>
        <a
          href="#arches"
          className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full bg-[#b88d58] px-8 text-base font-bold text-white shadow-[0_18px_44px_rgba(184,141,88,0.34)] transition hover:-translate-y-0.5 hover:bg-[#c79c67]"
        >
          {cta}
        </a>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-white/60">
          <span className="h-14 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent" />
          <span>Прокрутите, чтобы узнать больше</span>
        </div>
      </div>
    </header>
  );
}
