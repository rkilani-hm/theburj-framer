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
  CRITICAL: Hero bg must be pure #FFFFFF (not brand #EDEDED)
  because difference(white_text, white_bg) = black text.
  On #EDEDED it produces faint grey = invisible.

  Section is 250vh → gives long scroll runway.
  Images use full [0, 1] scroll range → slow smooth glide.
  Text is sticky and stays until images have fully passed through.
*/

const HeroSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Images: slow parallax over the FULL scroll range
  // Start well below (90-110%), end above text (-30 to -50%)
  const imgY1 = useTransform(scrollYProgress, [0, 1], ["90%",  "-35%"]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], ["105%", "-25%"]);
  const imgY3 = useTransform(scrollYProgress, [0, 1], ["110%", "-40%"]);
  const imgY4 = useTransform(scrollYProgress, [0, 1], ["95%",  "-30%"]);

  // Scroll indicator fades out early
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
      style={{
        height: "250vh",
        /* MUST be pure white for difference blend to produce black text */
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Sticky frame — pins for the entire 250vh scroll */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/*
          Flat stacking context — no z-index anywhere.
          DOM order: images first (behind), text second (on top with blend).
        */}
        <div className="container mx-auto px-4 lg:px-12 relative w-full h-full">

          {/* ── IMAGES (paint first in DOM → behind text) ── */}

          {/* Image 1 — left side */}
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

          {/* Image 3 — center-right */}
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

          {/* Image 4 — far right edge */}
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

          {/* ── TEXT (paints AFTER images → on top with blend) ──
              Pinned to center of viewport.
              color:white + difference on white bg = black text.
              Over images = transparent outlines. */}
          <div className="absolute inset-0 flex items-center pointer-events-none select-none">
            <div className="w-full px-4 lg:px-0">
              <h1
                className="font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] whitespace-pre-wrap"
                style={{ fontSize: "clamp(2rem, 6.5vw, 6.5rem)", color: "black", mixBlendMode: "difference" }}
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

      {/* Scroll indicator — bottom center */}
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
