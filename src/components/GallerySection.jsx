import SectionHeader from "./SectionHeader";

export default function GallerySection({ intro, items }) {
  return (
    <section className="bg-[linear-gradient(180deg,#101011_0%,#18181a_100%)] pb-24 text-white md:pb-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader {...intro} light />

        <div className="grid auto-rows-[18rem] gap-5 md:grid-cols-3 md:auto-rows-[18rem] lg:auto-rows-[22rem]">
          {items.map((item) => (
            <figure
              key={item.id}
              className={[
                "group relative overflow-hidden rounded-[1.75rem] shadow-[0_18px_48px_rgba(0,0,0,0.22)]",
                item.className ?? "",
              ].join(" ")}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82),rgba(0,0,0,0.2),transparent)]" />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
                <span className="mb-3 block text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#e5c797] md:text-xs">
                  {item.subtitle}
                </span>
                <strong className="font-display text-3xl leading-none tracking-[-0.03em] md:text-4xl">
                  {item.title}
                </strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
