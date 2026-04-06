import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import towerLowangle from "@/assets/tower-lowangle-clouds.png";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerFacadeDetail from "@/assets/tower-facade-detail.jpg";

/*
  Crestline Hero — exact replica:
  ─────────────────────────────────────────────
  1. Text stays PERFECTLY STILL (no Y transform, no opacity fade).
  2. Images glide UP through the text on scroll.
  3. mix-blend-mode: difference on cream bg creates the inverse overlay.
  4. Background: Crestline cream #F5F0EB.
*/

const HeroSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Images glide from below viewport upward */
  const imgY1 = useTransform(scrollYProgress, [0, 1], ["100%", "-50%"]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], ["100%", "-40%"]);
  const imgY3 = useTransform(scrollYProgress, [0, 1], ["95%",  "-55%"]);
  const imgY4 = useTransform(scrollYProgress, [0, 1], ["90%",  "-45%"]);

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

  /* Crestline cream — #F5F0EB */
  const creamBg = "#F5F0EB";

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "101vh", backgroundColor: creamBg }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: creamBg }}
      >
        <div className="relative w-full h-full">

          {/* ── Images (behind text via z-index) ── */}
          <motion.div
            style={{ y: imgY1 }}
            className="absolute top-[5%] left-[3%] lg:left-[8%] w-[30%] lg:w-[20%]"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden"
            >
              <motion.img
                src={towerLowangle}
                alt="Al Hamra Tower"
                className="w-full h-full object-cover"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: imgY2 }}
            className="absolute top-[20%] left-[16%] lg:left-[18%] w-[24%] lg:w-[16%]"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden"
            >
              <motion.img
                src={interiorLobby}
                alt="Tower interior"
                className="w-full h-full object-cover"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: imgY3 }}
            className="absolute top-[10%] right-[15%] lg:right-[22%] w-[28%] lg:w-[18%]"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden"
            >
              <motion.img
                src={somTowerDetail}
                alt="Tower facade"
                className="w-full h-full object-cover"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: imgY4 }}
            className="absolute top-[0%] right-[-2%] lg:right-[2%] w-[26%] lg:w-[18%]"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.85, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden"
            >
              <motion.img
                src={towerFacadeDetail}
                alt="Architectural detail"
                className="w-full h-full object-cover"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>

          {/* ── Text (on top — DOES NOT MOVE) ── */}
          <div className="absolute inset-0 flex items-center pointer-events-none select-none px-4 lg:px-12">
            <h1
              className="hero-blend-text font-serif font-light uppercase leading-[1.05] tracking-[-0.02em] whitespace-pre-wrap w-full"
              style={{ fontSize: "clamp(2.2rem, 6.5vw, 6.5rem)" }}
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
        <span className="overline text-muted-foreground">
          {language === "en" ? "Scroll" : "مرر"}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 bg-primary/50"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
