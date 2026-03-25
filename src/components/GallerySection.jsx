import { useEffect, useMemo, useState } from "react";
import SectionHeader from "./SectionHeader";

function GalleryLightbox({ item, onClose, onPrev, onNext, hasMultiple }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (hasMultiple && event.key === "ArrowLeft") {
        onPrev();
      }

      if (hasMultiple && event.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [hasMultiple, onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white transition hover:bg-white/18"
      >
        Закрыть
      </button>

      {hasMultiple ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full border border-white/14 bg-white/10 text-2xl text-white transition hover:bg-white/18 md:flex md:items-center md:justify-center"
          aria-label="Предыдущее изображение"
        >
          ‹
        </button>
      ) : null}

      <figure
        className="relative w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#081f1b] shadow-[0_28px_90px_rgba(0,0,0,0.4)]"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.title}
          className="max-h-[82vh] w-full object-contain bg-[#081f1b]"
        />
        <figcaption className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(7,56,49,0.96),rgba(5,43,38,0.98))] px-6 py-5 text-white md:px-8">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[var(--accent-soft)]">
            {item.subtitle}
          </p>
          <h3 className="mt-3 font-display text-3xl leading-none tracking-[-0.03em] md:text-4xl">
            {item.title}
          </h3>
        </figcaption>
      </figure>

      {hasMultiple ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full border border-white/14 bg-white/10 text-2xl text-white transition hover:bg-white/18 md:flex md:items-center md:justify-center"
          aria-label="Следующее изображение"
        >
          ›
        </button>
      ) : null}
    </div>
  );
}

export default function GallerySection({ intro, items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const activeItem = items[activeIndex] ?? items[0];
  const hasMultiple = items.length > 1;
  const visibleCount = 3;

  const visibleItems = useMemo(() => {
    if (items.length <= visibleCount) {
      return items.map((item, index) => ({ item, index }));
    }

    let start = activeIndex - 1;
    if (start < 0) {
      start = 0;
    }

    if (start + visibleCount > items.length) {
      start = items.length - visibleCount;
    }

    return items
      .slice(start, start + visibleCount)
      .map((item, offset) => ({ item, index: start + offset }));
  }, [activeIndex, items]);

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  return (
    <>
      <section className="overflow-hidden bg-[linear-gradient(180deg,var(--surface-dark)_0%,var(--surface-dark-strong)_100%)] py-24 text-white md:py-30">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <SectionHeader {...intro} light />

          <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
            <article className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="group relative block w-full cursor-zoom-in text-left"
                aria-label={`Открыть изображение: ${activeItem.title}`}
              >
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  loading="lazy"
                  className="h-[24rem] w-full object-cover transition duration-700 group-hover:scale-[1.02] md:h-[34rem]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,18,16,0.88),rgba(3,18,16,0.26),transparent)]" />
                <div className="absolute right-5 top-5 rounded-full border border-white/16 bg-black/22 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
                  Открыть
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-10">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.26em] text-[var(--accent-soft)] md:text-xs">
                    {activeItem.subtitle}
                  </p>
                  <h3 className="mt-4 max-w-3xl font-display text-4xl leading-[0.94] tracking-[-0.04em] md:text-6xl">
                    {activeItem.title}
                  </h3>
                </div>
              </button>
            </article>

            <div className="flex flex-col gap-4">
              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.14)] backdrop-blur">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--accent-soft)]">
                    Галерея
                  </p>
                  {hasMultiple ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={goPrev}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-xl text-white transition hover:bg-white/[0.1]"
                        aria-label="Предыдущее изображение"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-xl text-white transition hover:bg-white/[0.1]"
                        aria-label="Следующее изображение"
                      >
                        ›
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="grid gap-3">
                  {visibleItems.map(({ item, index }) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={[
                          "group overflow-hidden rounded-[1.35rem] border text-left transition duration-300",
                          isActive
                            ? "border-[var(--accent)] bg-white/[0.08] shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
                            : "border-white/8 bg-white/[0.03] hover:border-white/16 hover:bg-white/[0.06]",
                        ].join(" ")}
                      >
                        <div className="grid min-h-[8rem] grid-cols-[7rem_1fr] gap-4 p-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="h-full w-full rounded-[1rem] object-cover"
                          />
                          <div className="flex min-w-0 flex-col justify-center">
                            <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[var(--accent-soft)]">
                              Кадр {String(index + 1).padStart(2, "0")}
                            </p>
                            <h4 className="mt-2 font-display text-2xl leading-none tracking-[-0.03em] text-white">
                              {item.title}
                            </h4>
                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/62">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen ? (
        <GalleryLightbox
          item={activeItem}
          onClose={() => setLightboxOpen(false)}
          onPrev={goPrev}
          onNext={goNext}
          hasMultiple={hasMultiple}
        />
      ) : null}
    </>
  );
}
