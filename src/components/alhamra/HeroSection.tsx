import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import towerLowangle from "@/assets/tower-lowangle-clouds.png";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerFacadeDetail from "@/assets/tower-facade-detail.jpg";

/*
  Crestline Hero Scroll Effect — FINAL
  ─────────────────────────────────────
  - Text pinned center, solid black, always visible
  - Images start BELOW viewport (bottom:0 + translateY:100% = hidden)
  - On scroll, images float upward under the text
  - Blend makes text transparent where images overlap
  - NO images visible on first load
*/

const HeroSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /*
    Images use bottom:0 positioning = bottom edge of container.
    translateY(100%) = pushed entirely below container (clipped by overflow:hidden).
    On scroll → translateY moves negative = rises upward into view.
    
    End values: negative enough to reach the text area (center of viewport).
    An image ~400px tall needs about -250% to go from bottom edge to center.
  */
  const imgY1 = useTransform(scrollYProgress, [0, 1], ["100%",  "-220%"]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], ["100%",  "-250%"]);
  const imgY3 = useTransform(scrollYProgress, [0, 1], ["100%",  "-200%"]);
  const imgY4 = useTransform(scrollYProgress, [0, 1], ["100%",  "-240%"]);

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
      className="relative"
      style={{ height: "200vh", backgroundColor: "#FFFFFF" }}
    >
      <div
        className="sticky top-0 h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="container mx-auto px-4 lg:px-12 relative w-full h-full">

          {/* ── IMAGES ──
              All use bottom:0 = anchored to container bottom edge.
              translateY(100%) on load = pushed entirely below = INVISIBLE.
              Scroll drives them upward into the text zone. */}

          <motion.div
            style={{ y: imgY1 }}
            className="absolute bottom-0 left-[2%] lg:left-[5%] w-[38%] lg:w-[24%]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img src={towerLowangle} alt="Al Hamra Tower" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            style={{ y: imgY2 }}
            className="absolute bottom-0 left-[20%] lg:left-[24%] w-[28%] lg:w-[18%]"
          >
            <div className="aspect-[3/5] overflow-hidden">
              <img src={interiorLobby} alt="Tower interior" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            style={{ y: imgY3 }}
            className="absolute bottom-0 right-[10%] lg:right-[18%] w-[35%] lg:w-[22%]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img src={somTowerDetail} alt="Tower facade" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            style={{ y: imgY4 }}
            className="absolute bottom-0 right-[-2%] lg:right-[0%] w-[30%] lg:w-[20%]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img src={towerFacadeDetail} alt="Architectural detail" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* ── TEXT — pinned center, never moves ── */}
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
