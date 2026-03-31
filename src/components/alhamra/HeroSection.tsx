import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import towerLowangle from "@/assets/tower-lowangle-clouds.png";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerFacadeDetail from "@/assets/tower-facade-detail.jpg";

/*
  Crestline Hero Scroll Effect
  ─────────────────────────────
  Frame 1 (top): Full-screen text only. Solid black on white.
  Frame 2 (scrolling): Images glide UP from below into the text area.
  Frame 3 (overlap): Images sit BEHIND text. Where they overlap,
    text becomes transparent outlines showing images through letterforms.

  Technique: Text is color:white + mix-blend-mode:difference.
    - Over white bg: difference(white,white) = black → normal text ✓
    - Over images: difference(white,img) = inverted → transparent outlines ✓

  DOM order: Images FIRST (paint first), Text SECOND (paints on top with blend).
  No z-index on text — blend mode works across the flat stacking context.
*/

const HeroSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Images: start fully below viewport, glide up into text zone
  const imgY1 = useTransform(scrollYProgress, [0, 0.7], ["100%", "-20%"]);
  const imgY2 = useTransform(scrollYProgress, [0, 0.7], ["115%", "-10%"]);
  const imgY3 = useTransform(scrollYProgress, [0, 0.7], ["125%", "-25%"]);
  const imgY4 = useTransform(scrollYProgress, [0, 0.7], ["110%", "-15%"]);

  // Scroll indicator fades out
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const lines =
    language === "en"
      ? [
          "Where      Functionality",
          "Meets   Aesthetic,   Your",
          "Architectural    Journey",
          "Starts Here.",
        ]
      : [
          "حيث   تلتقي   الهيبة",
          "المعمارية   بالحضور",
          "الدائم   رحلتك   التجارية",
          "تبدأ هنا.",
        ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: "180vh" }}
    >
      {/* Sticky frame — pins to viewport while section scrolls */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* 
          CRITICAL: No isolation on this container.
          Images and text are siblings in a flat stacking context
          so mix-blend-mode on text blends with images below.
        */}
        <div className="container mx-auto px-4 lg:px-12 relative w-full">

          {/* ── IMAGES (paint first in DOM → behind text) ── */}

          {/* Image 1 — left side, overlaps lines 3-4 area */}
          <motion.div
            style={{ y: imgY1 }}
            className="absolute top-[10%] left-[2%] lg:left-[5%] w-[38%] lg:w-[24%]"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden"
            >
              <motion.img
                src={towerLowangle}
                alt="Al Hamra Tower"
                className="w-full h-full object-cover"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>

          {/* Image 2 — center-left, taller */}
          <motion.div
            style={{ y: imgY2 }}
            className="absolute top-[5%] left-[18%] lg:left-[22%] w-[28%] lg:w-[18%]"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.85, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/5] overflow-hidden"
            >
              <motion.img
                src={interiorLobby}
                alt="Tower interior"
                className="w-full h-full object-cover"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>

          {/* Image 3 — center-right, larger */}
          <motion.div
            style={{ y: imgY3 }}
            className="absolute top-[15%] right-[12%] lg:right-[20%] w-[35%] lg:w-[22%]"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden"
            >
              <motion.img
                src={somTowerDetail}
                alt="Tower facade"
                className="w-full h-full object-cover"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>

          {/* Image 4 — far right, partially off-screen */}
          <motion.div
            style={{ y: imgY4 }}
            className="absolute top-[0%] right-[-3%] lg:right-[0%] w-[30%] lg:w-[20%]"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.95, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden"
            >
              <motion.img
                src={towerFacadeDetail}
                alt="Architectural detail"
                className="w-full h-full object-cover"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>

          {/* ── TEXT (paints AFTER images in DOM → visually on top) ──
              mix-blend-mode:difference + color:white
              makes text look black on white bg but transparent on images */}
          <div className="relative pointer-events-none select-none">
            <h1
              className="hero-blend-text font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] whitespace-pre-wrap"
              style={{ fontSize: "clamp(2rem, 6.5vw, 6.5rem)" }}
            >
              {lines.map((line, lineIndex) => (
                <span key={lineIndex} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1,
                      delay: 0.15 + lineIndex * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity: indicatorOpacity }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {language === "en" ? "Scroll" : "مرر"}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 bg-foreground/30"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
