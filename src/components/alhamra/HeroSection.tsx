import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import towerLowangle from "@/assets/tower-lowangle-clouds.png";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerFacadeDetail from "@/assets/tower-facade-detail.jpg";

const HeroSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Text: fades/slides in during the first 30% of scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [60, 0]);

  // Word stagger — each word gets a slightly offset opacity range
  const makeWordOpacity = (i: number, total: number) => {
    const start = 0.05 + (i / total) * 0.2;
    const end = Math.min(start + 0.08, 0.35);
    return useTransform(scrollYProgress, [start, end], [0, 1]);
  };
  const makeWordY = (i: number, total: number) => {
    const start = 0.05 + (i / total) * 0.2;
    const end = Math.min(start + 0.08, 0.35);
    return useTransform(scrollYProgress, [start, end], [40, 0]);
  };

  // Images: staggered reveal during 30-70% of scroll
  const img1Opacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const img1Y = useTransform(scrollYProgress, [0.25, 0.45], [120, 0]);

  const img2Opacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const img2Y = useTransform(scrollYProgress, [0.35, 0.55], [140, 0]);

  const img3Opacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const img3Y = useTransform(scrollYProgress, [0.45, 0.65], [100, 0]);

  // Parallax drift after reveal
  const drift1 = useTransform(scrollYProgress, [0.45, 1], [0, -80]);
  const drift2 = useTransform(scrollYProgress, [0.55, 1], [0, -120]);
  const drift3 = useTransform(scrollYProgress, [0.65, 1], [0, -60]);

  const headline =
    language === "en"
      ? "Where Architectural Gravity Meets Enduring Presence, Your Business Journey Starts Here."
      : "حيث تلتقي الهيبة المعمارية بالحضور الدائم، تبدأ رحلتك التجارية هنا.";

  const words = headline.split(" ");

  return (
    <section ref={sectionRef} className="relative bg-background h-[350vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Hero Text */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="container mx-auto px-6 lg:px-12 pt-20 lg:pt-24 pb-10 lg:pb-16"
        >
          <h1
            className="text-[clamp(2rem,5.5vw,5.5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground text-justify"
            style={{ textAlignLast: "left" }}
          >
            {words.map((word, i) => (
              <WordSpan key={i} index={i} total={words.length} scrollYProgress={scrollYProgress}>
                {word}
                {i < words.length - 1 ? "\u00A0" : ""}
              </WordSpan>
            ))}
          </h1>
        </motion.div>

        {/* Staggered Image Grid */}
        <div className="container mx-auto px-6 lg:px-12 pb-12 lg:pb-16">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            {/* Left column */}
            <motion.div
              style={{ opacity: img1Opacity, y: img1Y }}
              className="col-span-6 lg:col-span-3"
            >
              <motion.div style={{ y: drift1 }}>
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={towerLowangle}
                    alt="Al Hamra Tower"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Center */}
            <motion.div
              style={{ opacity: img2Opacity, y: img2Y }}
              className="col-span-6 lg:col-span-4 lg:col-start-5 pt-8 lg:pt-16"
            >
              <motion.div style={{ y: drift2 }}>
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={somTowerDetail}
                    alt="Tower facade detail"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Right column */}
            <motion.div
              style={{ opacity: img3Opacity, y: img3Y }}
              className="hidden lg:block col-span-3 col-start-10 pt-4"
            >
              <motion.div style={{ y: drift3 }}>
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={towerFacadeDetail}
                    alt="Architectural detail"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Extracted word component to use hooks per-word */
const WordSpan = ({
  index,
  total,
  scrollYProgress,
  children,
}: {
  index: number;
  total: number;
  scrollYProgress: any;
  children: React.ReactNode;
}) => {
  const start = 0.05 + (index / total) * 0.2;
  const end = Math.min(start + 0.08, 0.35);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [40, 0]);

  return (
    <motion.span
      style={{ opacity, y, perspective: 600, display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
};

export default HeroSection;
