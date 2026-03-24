import SectionHeader from "./SectionHeader";

export default function MetricsSection({ intro, metrics }) {
  return (
    <section className="bg-[linear-gradient(180deg,#101011_0%,#18181a_100%)] py-24 text-white md:py-30">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.15fr] lg:px-8">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <SectionHeader {...intro} light />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-[#b88d58]/40 hover:bg-white/[0.08] md:p-8"
            >
              <span className="block text-xs font-bold uppercase tracking-[0.22em] text-[#e5c797]">
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
