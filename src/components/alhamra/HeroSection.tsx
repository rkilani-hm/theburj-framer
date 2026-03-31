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
    offset: ["start start", "end start"],
  });

  // Parallax: images at different scroll speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  // Title parallax (subtle)
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const lines =
    language === "en"
      ? [
          "Where Architectural",
          "Gravity Meets Enduring",
          "Presence — Your",
          "Business Starts Here.",
        ]
      : [
          "حيث تلتقي الهيبة",
          "المعمارية بالحضور",
          "الدائم — تبدأ",
          "رحلتك التجارية هنا.",
        ];

  return (
    <section ref={sectionRef} className="relative bg-background overflow-hidden">
      {/* Hero Text — Line-by-line reveal with clip-path */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="container mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-16 lg:pb-24 relative z-10"
      >
        <h1 className="text-[clamp(2rem,5.5vw,5.5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground overflow-hidden">
          {lines.map((line, lineIndex) => (
            <span key={lineIndex} className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.3 + lineIndex * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtle overline + scroll indicator */}
        <div className="flex items-center justify-between mt-12">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            {language === "en" ? "Kuwait City, Kuwait" : "مدينة الكويت"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {language === "en" ? "Scroll" : "مرر"}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-foreground/20"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Image Grid — Staggered parallax columns with clip-path reveal */}
      <div className="container mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* Left column — two stacked images */}
          <motion.div
            style={{ y: y1 }}
            className="col-span-6 lg:col-span-3 space-y-4 lg:space-y-6"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden"
            >
              <motion.img
                src={towerLowangle}
                alt="Al Hamra Tower"
                className="w-full h-full object-cover"
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[4/5] overflow-hidden mt-8 lg:mt-16"
            >
              <motion.img
                src={interiorLobby}
                alt="Tower interior"
                className="w-full h-full object-cover"
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </motion.div>

          {/* Center — larger offset image */}
          <motion.div
            style={{ y: y2 }}
            className="col-span-6 lg:col-span-4 lg:col-start-5 pt-12 lg:pt-24"
          >
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden"
            >
              <motion.img
                src={somTowerDetail}
                alt="Tower facade detail"
                className="w-full h-full object-cover"
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </motion.div>

          {/* Right column — offset image */}
          <motion.div
            style={{ y: y3 }}
            className="hidden lg:block col-span-3 col-start-10 pt-6"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden"
            >
              <motion.img
                src={towerFacadeDetail}
                alt="Architectural detail"
                className="w-full h-full object-cover"
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
