export default function SectionHeader({ eyebrow, title, description, light = false }) {
  return (
    <div className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
      <p
        className={[
          "mb-6 inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]",
          light
            ? "border-[color:var(--accent)]/35 bg-[color:var(--accent)]/10 text-[var(--accent-soft)]"
            : "border-black/10 bg-black/[0.03] text-[var(--accent-strong)]",
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
