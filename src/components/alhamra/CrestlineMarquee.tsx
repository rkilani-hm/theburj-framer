import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

/*
  Crestline Marquee — infinite scrolling strip.
  "Al Hamra creates iconic, purposeful spaces that endure."
  Appears between sections as a visual rhythm break.
*/

const CrestlineMarquee = () => {
  const { language } = useLanguage();

  const text =
    language === "en"
      ? "Al Hamra creates iconic, purposeful spaces that endure."
      : "الحمرا تبني فضاءات أيقونية وهادفة تدوم عبر الزمن.";

  const items = Array(8).fill(text);

  return (
    <div className="border-t border-b border-border py-5 bg-background overflow-hidden">
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((item, i) => (
            <span
              key={i}
              className="text-sm font-serif font-light tracking-[0.12em] text-muted-foreground px-10 whitespace-nowrap italic"
            >
              {item}
              <span className="mx-8 text-primary not-italic">✦</span>
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {items.map((item, i) => (
            <span
              key={`dup-${i}`}
              className="text-sm font-serif font-light tracking-[0.12em] text-muted-foreground px-10 whitespace-nowrap italic"
            >
              {item}
              <span className="mx-8 text-primary not-italic">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrestlineMarquee;
