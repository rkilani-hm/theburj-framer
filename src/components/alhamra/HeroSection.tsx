import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import towerLowangle from "@/assets/tower-lowangle-clouds.png";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerFacadeDetail from "@/assets/tower-facade-detail.jpg";

/*
  Crestline Hero — exact replica from video:
  ───────────────────────────────────────────
  1. Text stays PERFECTLY STILL. No Y transform. No opacity fade. Ever.
  2. Images start below viewport and glide UP through the text on scroll.
  3. Where images overlap text → text becomes light/transparent outlines
     (white text + mix-blend-mode:difference on white bg).
  4. When the section ends (250vh), sticky releases, everything scrolls away.
  
  The white bg MUST be on the sticky container (same stacking context as text)
  for blend mode to work. Brand bg is #EDEDED so hero forces #FFFFFF.
*/

const HeroSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Only images move. Full [0,1] range = slow smooth glide over 250vh of scroll.
  // Start: images fully below viewport (85-110%)
  // End: images have passed up above the text (-40 to -60%)
  const imgY1 = useTransform(scrollYProgress, [0, 1], ["85%",  "-50%"]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], ["100%", "-40%"]);
  const imgY3 = useTransform(scrollYProgress, [0, 1], ["95%",  "-55%"]);
  const imgY4 = useTransform(scrollYProgress, [0, 1], ["90%",  "-45%"]);

  // Scroll indicator only
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
      style={{ height: "160vh", backgroundColor: "#FFFFFF" }}
    >
      {/* Sticky frame — pins to viewport for the full 250vh.
          White bg here (not on section) so blend works in same stacking context. */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="relative w-full h-full">

          {/* ── IMAGES (DOM first → paint behind text) ──
              Absolutely positioned with scroll-driven Y.
              They glide from below viewport upward through the text. */}

          {/* Image 1 — left group, upper */}
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

          {/* Image 2 — left group, lower & offset right */}
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

          {/* Image 3 — right group, main */}
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

          {/* Image 4 — far right */}
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

          {/* ── TEXT (DOM second → paints ON TOP of images with blend) ──
              *** DOES NOT MOVE. NO Y TRANSFORM. NO OPACITY CHANGE. ***
              Stays perfectly centered in viewport the entire time.
              Blend mode creates the transparent outline effect over images. */}
          <div className="absolute inset-0 flex items-center pointer-events-none select-none px-4 lg:px-12">
            <h1
              className="hero-blend-text font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] whitespace-pre-wrap w-full"
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
