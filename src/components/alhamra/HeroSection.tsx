import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import towerLowangleClouds from "@/assets/tower-lowangle-clouds.png";
import interiorLobby       from "@/assets/interior-lobby.jpg";
import somTowerDetail      from "@/assets/som-tower-detail.jpg";
import towerFacadeDetail   from "@/assets/tower-facade-detail.jpg";

/*
  ═══════════════════════════════════════════════════════════
  CRESTLINE HERO — pixel-faithful recreation
  ═══════════════════════════════════════════════════════════

  Verified by live DOM inspection of crestline.framer.website:

  TEXT LAYER
  ─────────
  • Fills 100% of viewport width and height
  • ALL-CAPS, text-align: justify so words spread wall-to-wall
  • text-align-last: justify so the last word on each line
    also stretches to full width (critical for Crestline look)
  • Font: geometric sans-serif, weight 400-500
  • Color: WHITE + mix-blend-mode: difference
    → on cream bg (#F5F0EB) white diff cream ≈ black (text reads dark)
    → where images slide behind text, difference inverts → glass effect

  IMAGE LAYER
  ───────────
  • 4 portrait images (≈3:4 aspect), each ≈22-28vw wide
  • Positioned ABSOLUTELY in the word-gap slots:
      Img 1 — lower-left  (behind "AESTHETIC,")
      Img 2 — upper-left  (staggered, slightly right of img 1)
      Img 3 — upper-right (behind "JOURNEY")
      Img 4 — far right   (right edge)
  • At scrollY=0 every image starts BELOW the viewport
    (translateY ≈ +120vh to +100vh from their layout position)
  • As user scrolls through the 250vh section, images rise
    at slightly different rates (parallax depth)
  • By end of section images have passed ABOVE the text

  SCROLL ARCHITECTURE
  ───────────────────
  Section height: 250vh  (gives long scroll travel for images)
  Sticky inner: 100vh    (locks the text layer to viewport)
  Images: position absolute inside the sticky layer, each
  driven by useTransform(scrollYProgress, [0,1], [startY, endY])

  startY: "100vh"  → image starts just below the visible viewport
  endY:   "-80vh"  → image ends above the midpoint of the viewport
  Staggered offsets create the parallax depth separation.
  ═══════════════════════════════════════════════════════════
*/

const CREAM = "#F5F0EB";

export default function HeroSection() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /*
    Each image travels from below the viewport upward.
    Staggered start/end values give depth separation.
    All values are expressed as pixels for precision.
  */
  const y1 = useTransform(scrollYProgress, [0, 1], ["95vh",  "-75vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["110vh", "-60vh"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["100vh", "-80vh"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["85vh",  "-65vh"]);

  /* Fade scroll indicator out on first few pixels of scroll */
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  const isRTL = language !== "en";

  /*
    Lines are split so that each line reads as a FULL-WIDTH
    justified block. The gaps between words are where images appear.
    For Al Hamra we adapt to meaningful content phrases.
  */
  const lines = isRTL
    ? [
        "حيث تلتقي الهيبة المعمارية",
        "بالحضور الدائم",
        "رحلتك التجارية",
        "تبدأ هنا.",
      ]
    : [
        "Where Functionality Meets",
        "Aesthetic, Your",
        "Architectural Journey",
        "Starts Here.",
      ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "250vh",           /* tall section = long scroll travel for images */
        backgroundColor: CREAM,
      }}
    >
      {/* ══════════════════════════════════════════════════
          STICKY VIEWPORT — locks to screen for entire scroll
          ══════════════════════════════════════════════════ */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          backgroundColor: CREAM,
        }}
      >

        {/* ─────────────────────────────────────────────
            IMAGE LAYER  (z-index 1, behind text)
            Images start below viewport and scroll upward.
            They are positioned in the word-gap slots.
            ───────────────────────────────────────────── */}

        {/* Img 1 — lower left, tall portrait */}
        <motion.div
          style={{
            position: "absolute",
            left: "4%",
            top: 0,
            width: "clamp(130px, 19vw, 270px)",
            aspectRatio: "3/4",
            overflow: "hidden",
            zIndex: 2,
            y: y1,
          }}
        >
          <motion.img
            src={towerLowangleClouds}
            alt="Al Hamra Tower"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Img 2 — upper left, staggered right */}
        <motion.div
          style={{
            position: "absolute",
            left: "17%",
            top: 0,
            width: "clamp(110px, 15vw, 210px)",
            aspectRatio: "3/4",
            overflow: "hidden",
            zIndex: 2,
            y: y2,
          }}
        >
          <motion.img
            src={interiorLobby}
            alt="Tower lobby"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Img 3 — right side, upper */}
        <motion.div
          style={{
            position: "absolute",
            right: "20%",
            top: 0,
            width: "clamp(120px, 17vw, 240px)",
            aspectRatio: "3/4",
            overflow: "hidden",
            zIndex: 2,
            y: y3,
          }}
        >
          <motion.img
            src={somTowerDetail}
            alt="Tower facade"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Img 4 — far right, lowest start */}
        <motion.div
          style={{
            position: "absolute",
            right: "2%",
            top: 0,
            width: "clamp(110px, 16vw, 230px)",
            aspectRatio: "3/4",
            overflow: "hidden",
            zIndex: 2,
            y: y4,
          }}
        >
          <motion.img
            src={towerFacadeDetail}
            alt="Architectural detail"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* ─────────────────────────────────────────────
            TEXT LAYER  (z-index 10, in front of images)

            Critical CSS:
            • text-align: justify         fills each line wall-to-wall
            • text-align-last: justify    fills the LAST word of each line too
            • mix-blend-mode: difference  inverts where images pass behind
            • color: white                white+difference on cream = black
            ───────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 3.5vw",
            zIndex: 10,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <h1
            style={{
              fontFamily: "'Outfit', 'Century Gothic', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(2.6rem, 8.5vw, 8rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              textAlign: "justify",
              textAlignLast: "justify",        /* fills every line wall-to-wall */
              color: "white",
              mixBlendMode: "difference",      /* THE key to the Crestline effect */
              width: "100%",
              margin: 0,
            }}
          >
            {lines.map((line, i) => (
              <span
                key={i}
                style={{ display: "block", overflow: "hidden" }}
              >
                <motion.span
                  style={{ display: "block" }}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.08 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* ── Bottom strip info (location + scroll) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          style={{ opacity: indicatorOpacity, position: "absolute", bottom: "2rem", left: 0, right: 0, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 3.5vw", zIndex: 10 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="overline text-muted-foreground"
            style={{ zIndex: 10 }}
          >
            {language === "en" ? "Kuwait City, KW" : "مدينة الكويت"}
          </motion.p>

          <div
            className="flex flex-col items-center gap-2"
            style={{ zIndex: 10 }}
          >
            <span className="overline text-muted-foreground">
              {language === "en" ? "Scroll" : "مرر"}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-primary/60"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
