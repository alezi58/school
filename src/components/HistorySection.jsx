import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";

export default function HistorySection({ content }) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isZoomed) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsZoomed(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isZoomed]);

  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eee5d6_0%,#f6f3ee_18%,#efe7d9_100%)] py-24 md:py-30">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgba(80,56,27,0.09)_1px,transparent_0)] [background-size:24px_24px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />

          <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-[2.25rem] border border-[#a98658]/20 bg-[linear-gradient(180deg,rgba(73,48,28,0.96),rgba(32,23,17,0.98))] p-7 text-white shadow-[0_24px_60px_rgba(28,18,8,0.24)] md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e6cda1]">
                Кураторская заметка
              </p>
              <div className="mt-6 space-y-5 text-base leading-8 text-white/78 md:text-lg">
                {content.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <blockquote className="mt-8 border-l border-[#e6cda1]/35 pl-5 font-display text-3xl leading-tight tracking-[-0.04em] text-[#f5e7ce] md:text-[2.6rem]">
                {content.quote}
              </blockquote>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-white/45">
                {content.quoteAuthor}
              </p>
            </article>

            <article className="overflow-hidden rounded-[2.5rem] border border-black/8 bg-white/85 shadow-[0_22px_60px_rgba(0,0,0,0.14)] backdrop-blur">
              <div className="border-b border-black/8 px-6 py-4 md:px-8">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b6d46]">
                  {content.currentVisual.eyebrow}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                className="group relative block w-full cursor-zoom-in overflow-hidden bg-stone-100 text-left"
                aria-label={`Увеличить изображение: ${content.currentVisual.title}`}
              >
                <img
                  src={content.currentVisual.image}
                  alt={content.currentVisual.title}
                  loading="lazy"
                  className="h-[22rem] w-full object-cover object-center transition duration-500 group-hover:scale-[1.02] md:h-[28rem]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,16,12,0.3),transparent_45%)] opacity-70 transition duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-5 right-5 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white backdrop-blur">
                  Нажмите для увеличения
                </div>
              </button>
              <div className="space-y-5 p-6 md:p-8">
                <h3 className="font-display text-4xl leading-none tracking-[-0.04em] text-stone-950 md:text-5xl">
                  {content.currentVisual.title}
                </h3>
                <p className="text-base leading-8 text-stone-600">{content.currentVisual.description}</p>
                <div className="grid gap-4 border-t border-black/8 pt-5 sm:grid-cols-2">
                  {content.currentVisual.facts.map((item) => (
                    <div key={item.label}>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-stone-400">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-stone-700">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {content.timeline.map((item, index) => (
              <article
                key={item.year}
                className="rounded-[1.75rem] border border-[#b88d58]/15 bg-white/70 p-6 shadow-[0_12px_34px_rgba(0,0,0,0.08)] backdrop-blur"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.32em] text-[#9c7b52]">
                  Экспонат {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 font-display text-4xl leading-none tracking-[-0.05em] text-stone-950">
                  {item.year}
                </p>
                <h3 className="mt-4 font-display text-2xl leading-tight tracking-[-0.03em] text-stone-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b6d46]">
                Архивные материалы
              </p>
              <h3 className="mt-4 font-display text-4xl leading-none tracking-[-0.04em] text-stone-950 md:text-5xl">
                Фрагменты памяти участка
              </h3>
              <p className="mt-5 text-base leading-8 text-stone-600">{content.archiveIntro}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {content.archivePhotos.map((item, index) => (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(246,239,227,0.96))] shadow-[0_18px_48px_rgba(0,0,0,0.1)]"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-80 w-full object-cover sepia-[0.18] saturate-[0.82]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(34,21,12,0.35),transparent_45%)]" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/25 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-white">
                      Фонд {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="space-y-4 p-6 md:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8c6f49]">
                        {item.year}
                      </p>
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500 transition hover:text-stone-950"
                      >
                        Источник
                      </a>
                    </div>
                    <h3 className="font-display text-3xl leading-tight tracking-[-0.03em] text-stone-950">
                      {item.title}
                    </h3>
                    <p className="text-base leading-8 text-stone-600">{item.description}</p>
                    <p className="border-t border-black/8 pt-4 text-xs font-bold uppercase tracking-[0.22em] text-stone-400">
                      {item.caption}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isZoomed ? (
        <div
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsZoomed(false)}
          role="presentation"
        >
          <button
            type="button"
            onClick={() => setIsZoomed(false)}
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white transition hover:bg-white/18"
          >
            Закрыть
          </button>
          <img
            src={content.currentVisual.image}
            alt={content.currentVisual.title}
            className="max-h-[92vh] max-w-[96vw] rounded-[1.5rem] object-contain shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
