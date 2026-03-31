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

  // Images start below text and parallax upward to overlap
  const imgY1 = useTransform(scrollYProgress, [0, 1], ["15%", "-40%"]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], ["25%", "-35%"]);
  const imgY3 = useTransform(scrollYProgress, [0, 1], ["20%", "-45%"]);
  const imgY4 = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  // Text stays relatively still, fades slightly
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
  // Scroll indicator fades out quickly
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const words =
    language === "en"
      ? [
          "Where", "Functionality",
          "Meets", "Aesthetic,",
          "Your", "Architectural",
          "Journey", "Starts Here.",
        ]
      : [
          "حيث", "تلتقي",
          "الهيبة", "المعمارية",
          "بالحضور", "الدائم",
          "رحلتك", "التجارية هنا.",
        ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
      style={{ minHeight: "140vh" }}
    >
      {/* ═══════════════════════════════════════════
          HERO CONTAINER — Text + Images overlap
          ═══════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative">

          {/* ── TEXT LAYER ──
              Huge uppercase, centered, acts as the background layer.
              mix-blend-mode makes it transparent over images. */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="relative z-10 pointer-events-none select-none"
          >
            <h1 className="hero-blend-text text-[clamp(2.2rem,7vw,7rem)] font-sans font-semibold uppercase leading-[1.0] tracking-[-0.03em] text-foreground text-center lg:text-left">
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mx-[0.15em]">
                  <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </motion.div>

          {/* ── IMAGE LAYER ──
              Images positioned absolutely over the text grid,
              parallax upward on scroll to overlap the text.
              They sit above the text layer so blend-mode takes effect. */}

          {/* Image 1 — Left, overlapping first two text lines */}
          <motion.div
            style={{ y: imgY1 }}
            className="absolute top-[5%] left-[3%] lg:left-[5%] w-[35%] lg:w-[22%] z-20"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden shadow-2xl"
            >
              <motion.img
                src={towerLowangle}
                alt="Al Hamra Tower"
                className="w-full h-full object-cover"
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>

          {/* Image 2 — Center-left, slightly lower */}
          <motion.div
            style={{ y: imgY2 }}
            className="absolute top-[15%] left-[15%] lg:left-[20%] w-[30%] lg:w-[18%] z-20"
          >
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[4/5] overflow-hidden shadow-2xl"
            >
              <motion.img
                src={interiorLobby}
                alt="Tower interior"
                className="w-full h-full object-cover"
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>

          {/* Image 3 — Center-right, larger */}
          <motion.div
            style={{ y: imgY3 }}
            className="absolute top-[25%] right-[8%] lg:right-[18%] w-[38%] lg:w-[24%] z-20"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden shadow-2xl"
            >
              <motion.img
                src={somTowerDetail}
                alt="Tower facade"
                className="w-full h-full object-cover"
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>

          {/* Image 4 — Far right, offset */}
          <motion.div
            style={{ y: imgY4 }}
            className="hidden lg:block absolute top-[0%] right-[0%] w-[20%] z-20"
          >
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[3/4] overflow-hidden shadow-2xl"
            >
              <motion.img
                src={towerFacadeDetail}
                alt="Architectural detail"
                className="w-full h-full object-cover"
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — fixed at bottom of sticky frame */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: indicatorOpacity }}
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
