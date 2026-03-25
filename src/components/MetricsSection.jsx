import SectionHeader from "./SectionHeader";

export default function MetricsSection({ intro, metrics }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--surface-dark)_0%,var(--surface-dark-strong)_100%)] py-24 text-white md:py-30">
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:98px_98px]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.15fr] lg:px-8">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <SectionHeader {...intro} light />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-[color:var(--accent)]/45 hover:bg-white/[0.08] md:p-8"
            >
              <span className="block text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-soft)]">
                {metric.label}
              </span>
              <strong className="mt-5 block font-display text-3xl leading-tight tracking-[-0.03em] md:text-4xl">
                {metric.value}
              </strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
