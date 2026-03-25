import SectionHeader from "./SectionHeader";

export default function ContextSection({ content }) {
  return (
    <section id="about" className="relative overflow-hidden bg-[var(--page-bg)] py-24 md:py-30">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center opacity-40 grayscale"
        style={{
          backgroundImage:
            "linear-gradient(rgba(237,243,237,0.82), rgba(237,243,237,0.92)), url('/images/context.jpg')",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="rounded-[2rem] border border-black/10 bg-white/85 p-7 shadow-[0_18px_48px_rgba(0,0,0,0.12)] backdrop-blur md:p-10">
          <div className="space-y-8">
            {content.cards.map((item) => (
              <article key={item.title}>
                <h3 className="font-display text-3xl leading-tight tracking-[-0.03em] text-stone-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-8 text-stone-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="max-w-2xl">
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />

          <div className="grid gap-8 sm:grid-cols-2">
            {content.stats.map((item) => (
              <div key={item.label}>
                <strong className="block font-display text-5xl leading-none tracking-[-0.05em] text-stone-950 md:text-6xl">
                  {item.value}
                </strong>
                <span className="mt-3 block text-xs font-bold uppercase tracking-[0.22em] text-stone-500">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
