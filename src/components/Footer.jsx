export default function Footer({ content }) {
  return (
    <footer
      id="contacts"
      className="border-t border-white/5 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%),linear-gradient(180deg,#101011_0%,#18181a_100%)] py-20 text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-[1.1fr_0.7fr_0.9fr_0.8fr] lg:px-8">
        <div>
          <div className="font-display text-3xl font-bold tracking-[-0.04em]">ШКОЛА ИСКУССТВ</div>
          <p className="mt-6 max-w-xs text-sm leading-7 text-white/50">{content.notice}</p>
        </div>

        <nav className="flex flex-col gap-4">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/45">
            Разделы
          </h3>
          <a href="#about" className="font-semibold transition hover:text-white/70">
            О проекте
          </a>
          <a href="#arches" className="font-semibold transition hover:text-white/70">
            Концептуальные основы
          </a>
        </nav>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/45">
            Контакты
          </h3>
          <a href="tel:+74212508028" className="font-semibold transition hover:text-white/70">
            {content.phone}
          </a>
          <a
            href={`mailto:${content.email}`}
            className="font-semibold transition hover:text-white/70"
          >
            {content.email}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/45">
            Адрес
          </h3>
          <p className="font-semibold">{content.city}</p>
          <p className="text-white/60">{content.address}</p>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-4 border-t border-white/10 px-4 pt-6 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/35 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <span>{content.legal}</span>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
          <a href="#" className="transition hover:text-white/60">
            {content.privacy}
          </a>
          <span>{content.author}</span>
        </div>
      </div>
    </footer>
  );
}
