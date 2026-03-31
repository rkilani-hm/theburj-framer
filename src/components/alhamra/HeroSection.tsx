import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import towerLowangle from "@/assets/tower-lowangle-clouds.png";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerFacadeDetail from "@/assets/tower-facade-detail.jpg";

/*
  Crestline Hero — Fixed & Final
  ───────────────────────────────
  Section: 200vh — sticky pins for exactly 100vh of scroll.
  Sticky frame: 100vh — full viewport, text centered.
  Images: positioned with TOP values in the lower half.
    Start: translateY = +1 full viewport height (hidden below frame)
    End:   translateY = -0.3 viewport height (floated up into text zone)
  All transforms in PIXELS based on window.innerHeight = 100% predictable.
  Text: pinned center, never moves, blend effect on overlap.
*/

const HeroSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // All values in pixels based on viewport height — fully predictable.
  // Images start 1vh below frame (hidden), end ~0.3vh above center (visible).
  // Staggered start times so they don't all enter at once.
  const imgY1 = useTransform(scrollYProgress, [0.05, 0.75], [vh,       -vh * 0.25]);
  const imgY2 = useTransform(scrollYProgress, [0.1,  0.8 ], [vh * 1.1, -vh * 0.15]);
  const imgY3 = useTransform(scrollYProgress, [0.08, 0.78], [vh * 1.2, -vh * 0.3 ]);
  const imgY4 = useTransform(scrollYProgress, [0.12, 0.82], [vh * 1.05,-vh * 0.2 ]);

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

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
      {/* Sticky frame — 100vh, white bg for blend math, pins for 100vh of scroll */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="relative w-full h-full">

          {/* ── IMAGES (DOM first → behind text) ──
              Absolute positioned in lower portion of frame.
              translateY starts at +1vh (below frame edge, clipped).
              On scroll translateY goes negative → images rise up. */}

          <motion.div
            style={{ y: imgY1 }}
            className="absolute top-[30%] left-[2%] lg:left-[5%] w-[38%] lg:w-[24%]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img src={towerLowangle} alt="Al Hamra Tower" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            style={{ y: imgY2 }}
            className="absolute top-[25%] left-[20%] lg:left-[24%] w-[28%] lg:w-[18%]"
          >
            <div className="aspect-[3/5] overflow-hidden">
              <img src={interiorLobby} alt="Tower interior" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            style={{ y: imgY3 }}
            className="absolute top-[35%] right-[10%] lg:right-[18%] w-[35%] lg:w-[22%]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img src={somTowerDetail} alt="Tower facade" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            style={{ y: imgY4 }}
            className="absolute top-[20%] right-[-2%] lg:right-[0%] w-[30%] lg:w-[20%]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img src={towerFacadeDetail} alt="Architectural detail" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* ── TEXT — absolute center, never moves ── */}
          <div className="absolute inset-0 flex items-center pointer-events-none select-none">
            <div className="container mx-auto px-6 lg:px-12">
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
