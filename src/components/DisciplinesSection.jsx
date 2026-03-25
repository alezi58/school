import SectionHeader from "./SectionHeader";

export default function DisciplinesSection({ intro, disciplines }) {
  return (
    <section
      id="arches"
      className="overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(95,127,102,0.12),transparent_25%),var(--page-bg)] py-24 md:py-30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader {...intro} />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {disciplines.map((item) => (
            <article
              key={item.id}
              className="group flex min-h-[28rem] flex-col rounded-t-[4rem] rounded-b-[1.75rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(95,127,102,0.1))] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.12)] transition duration-500 hover:-translate-y-2 hover:border-[color:var(--accent)]/45 md:min-h-[34rem] md:p-8"
            >
              <div className="mb-8 flex flex-1 items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-60 w-full object-contain transition duration-700 group-hover:scale-105 md:h-80"
                />
              </div>
              <h3 className="font-display text-3xl leading-tight tracking-[-0.03em] text-stone-950">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-stone-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
