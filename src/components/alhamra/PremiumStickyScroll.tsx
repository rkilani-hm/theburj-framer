import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface StickyScrollSection {
  id: string;
  titleEn: string;
  titleAr: string;
  subtitleEn?: string;
  subtitleAr?: string;
  descEn: string;
  descAr: string;
  image: string;
}

interface PremiumStickyScrollProps {
  sections: StickyScrollSection[];
  isAr: boolean;
}

const PremiumStickyScroll = ({ sections, isAr }: PremiumStickyScrollProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    contentRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Desktop: two-column sticky layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-10 gap-12 xl:gap-20">
          {/* LEFT — Sticky titles (40%) */}
          <div className="col-span-4">
            <div className="sticky top-32 space-y-6 py-8">
              {sections.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => {
                    contentRefs.current[i]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className="block w-full text-left group"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-[11px] tracking-[0.25em] mt-2 transition-all duration-500 ${
                        activeIndex === i
                          ? "text-muted-foreground"
                          : "text-muted-foreground/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`text-lg xl:text-xl font-sans uppercase tracking-[0.15em] leading-snug transition-all duration-500 ${
                        activeIndex === i
                          ? "text-foreground font-medium scale-100 opacity-100"
                          : "text-muted-foreground/25 font-light scale-[0.96] opacity-60"
                      }`}
                      style={{
                        transformOrigin: isAr ? "right center" : "left center",
                      }}
                    >
                      {isAr ? section.titleAr : section.titleEn}
                    </h3>
                  </div>
                </button>
              ))}

              {/* Progress line */}
              <div className="relative mt-10 h-px w-full bg-border overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-foreground"
                  animate={{
                    width: `${((activeIndex + 1) / sections.length) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT — Scrollable content (60%) */}
          <div className="col-span-6 space-y-24 xl:space-y-32 py-8">
            {sections.map((section, i) => (
              <div
                key={section.id}
                ref={(el) => {
                  contentRefs.current[i] = el;
                }}
                className="scroll-mt-32"
              >
                {/* Optional subtitle */}
                {(section.subtitleEn || section.subtitleAr) && (
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/60 mb-4">
                    {isAr ? section.subtitleAr : section.subtitleEn}
                  </p>
                )}

                {/* Description */}
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl mb-8">
                  {isAr ? section.descAr : section.descEn}
                </p>

                {/* Image with parallax fade-in */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-[16/10] overflow-hidden"
                >
                  <motion.img
                    src={section.image}
                    alt={section.titleEn}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.7 }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: stacked accordion */}
      <div className="lg:hidden space-y-0">
        {sections.map((section, i) => (
          <MobileAccordion key={section.id} section={section} index={i} isAr={isAr} />
        ))}
      </div>
    </>
  );
};

/* Mobile accordion item */
const MobileAccordion = ({
  section,
  index,
  isAr,
}: {
  section: StickyScrollSection;
  index: number;
  isAr: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-6 flex items-start justify-between text-left"
      >
        <div className="flex items-start gap-4">
          <span className="text-[11px] text-muted-foreground/40 mt-0.5 tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={`text-base uppercase tracking-[0.12em] transition-colors duration-300 ${
              open ? "text-foreground font-medium" : "text-muted-foreground/40 font-light"
            }`}
          >
            {isAr ? section.titleAr : section.titleEn}
          </h3>
        </div>
        <span className="text-muted-foreground text-lg leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden"
        >
          <div className="pb-8 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isAr ? section.descAr : section.descEn}
            </p>
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={section.image}
                alt={section.titleEn}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PremiumStickyScroll;
