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
  1. Page loads: TEXT ONLY. Black text, white bg. No images visible.
  2. User scrolls: Images float up from below into the text zone.
  3. Images go UNDER the text. Where they overlap, text becomes
     transparent outlines (via mix-blend-mode: difference).
  4. Text stays pinned. Never moves.

  Key: Images start at translateY(150%+) — completely off-screen below.
       No clip-path on load — images are simply below the viewport.
*/

const HeroSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Images: start FAR below (150%+), slowly rise to overlap text
  const imgY1 = useTransform(scrollYProgress, [0, 1], ["150%", "-30%"]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], ["160%", "-20%"]);
  const imgY3 = useTransform(scrollYProgress, [0, 1], ["170%", "-35%"]);
  const imgY4 = useTransform(scrollYProgress, [0, 1], ["155%", "-25%"]);

  // Scroll indicator fades out
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

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
      className="relative"
      style={{ height: "200vh" }}
    >
      {/* Sticky frame — white bg for blend math */}
      <div
        className="sticky top-0 h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="container mx-auto px-4 lg:px-12 relative w-full h-full">

          {/* ── IMAGES (DOM first → paint behind text) ──
              All start at translateY 150%+ so completely invisible on load.
              No clip-path animation — purely scroll-driven entrance. */}

          {/* Image 1 — left */}
          <motion.div
            style={{ y: imgY1 }}
            className="absolute top-[5%] left-[2%] lg:left-[5%] w-[38%] lg:w-[24%]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={towerLowangle}
                alt="Al Hamra Tower"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Image 2 — center-left */}
          <motion.div
            style={{ y: imgY2 }}
            className="absolute top-[0%] left-[18%] lg:left-[22%] w-[28%] lg:w-[18%]"
          >
            <div className="aspect-[3/5] overflow-hidden">
              <img
                src={interiorLobby}
                alt="Tower interior"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Image 3 — center-right */}
          <motion.div
            style={{ y: imgY3 }}
            className="absolute top-[10%] right-[12%] lg:right-[20%] w-[35%] lg:w-[22%]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={somTowerDetail}
                alt="Tower facade"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Image 4 — far right */}
          <motion.div
            style={{ y: imgY4 }}
            className="absolute top-[-5%] right-[-3%] lg:right-[0%] w-[30%] lg:w-[20%]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={towerFacadeDetail}
                alt="Architectural detail"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* ── TEXT (DOM second → paints on top with blend) ──
              Pinned center. Never moves. */}
          <div className="absolute inset-0 flex items-center pointer-events-none select-none">
            <div className="w-full px-4 lg:px-0">
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
