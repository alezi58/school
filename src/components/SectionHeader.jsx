export default function SectionHeader({ eyebrow, title, description, light = false }) {
  return (
    <div className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
      <p
        className={[
          "mb-6 inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]",
          light
            ? "border-white/15 bg-white/5 text-[#e8ca95]"
            : "border-black/10 bg-black/[0.03] text-[#7c6649]",
        ].join(" ")}
      >
        {eyebrow}
      </p>
      <h2
        className={[
          "font-display text-4xl leading-none tracking-[-0.04em] md:text-6xl lg:text-7xl",
          light ? "text-white" : "text-stone-950",
        ].join(" ")}
      >
        {title}
      </h2>
      <p
        className={[
          "mx-auto mt-6 max-w-3xl text-base leading-8 md:text-lg",
          light ? "text-white/65" : "text-stone-600",
        ].join(" ")}
      >
        {description}
      </p>
    </div>
  );
}
