import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import towerLowangleClouds from "@/assets/tower-lowangle-clouds.png";
import interiorLobby       from "@/assets/interior-lobby.jpg";
import somTowerDetail      from "@/assets/som-tower-detail.jpg";
import towerFacadeDetail   from "@/assets/tower-facade-detail.jpg";

/*
  ═══════════════════════════════════════════════════════════
  CRESTLINE HERO — final correct implementation

  Verified by live DOM inspection of crestline.framer.website:

  ┌─ TEXT LAYER ─────────────────────────────────────────────┐
  │  • Fills 100% viewport — each line wall-to-wall          │
  │  • Words spread edge-to-edge via flex space-between      │
  │    (NOT text-align:justify which fails on block spans)   │
  │  • ALL-CAPS geometric sans-serif, weight 500             │
  │  • color: white + mix-blend-mode: difference             │
  │    → on cream #F5F0EB  → appears near-black              │
  │    → over images        → inverts to light glass effect  │
  │  • Line-reveal: each line slides up from y:105%→0%       │
  │    The outer span clips overflow; inner span animates    │
  └──────────────────────────────────────────────────────────┘

  ┌─ IMAGE LAYER ────────────────────────────────────────────┐
  │  • 4 portrait images (≈3:4), each ≈18-22vw wide         │
  │  • Positioned absolutely in the word-gap slots:          │
  │    Img 1  left 4%    — behind "AESTHETIC," slot          │
  │    Img 2  left 17%   — staggered, slightly right         │
  │    Img 3  right 20%  — behind "JOURNEY" slot             │
  │    Img 4  right 2%   — far right anchor                  │
  │  • All start BELOW the viewport (y: 95vh–110vh)          │
  │  • Scroll upward at different rates → parallax depth     │
  └──────────────────────────────────────────────────────────┘

  ┌─ SCROLL ARCHITECTURE ────────────────────────────────────┐
  │  Section height: 250vh  — long travel for image rise     │
  │  Sticky inner:  100vh  — locks text to viewport          │
  └──────────────────────────────────────────────────────────┘
*/

const CREAM = "#F5F0EB";
const EASE  = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const { language } = useLanguage();
  const sectionRef   = useRef<HTMLElement>(null);
  const isRTL        = language !== "en";

  /* ── Scroll driver ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* ── Image parallax — staggered start/end for depth ── */
  const y1 = useTransform(scrollYProgress, [0, 1], ["95vh",  "-75vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["115vh", "-55vh"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["105vh", "-80vh"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["80vh",  "-60vh"]);

  /* ── Scroll indicator ── */
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  /*
    Lines: 2–3 words each so flex space-between creates wide gaps.
    Those gaps are exactly where the images slide through.
  */
  const lines = isRTL
    ? ["حيث تلتقي الهيبة", "المعمارية بحضور", "لا يُضاهى في", "مدينة الكويت."]
    : ["Where Functionality", "Meets Aesthetic,", "Your Architectural", "Journey Starts Here."];

  /* ── Shared image props ── */
  const imgStyle: React.CSSProperties = {
    position: "absolute", top: 0,
    aspectRatio: "3/4", overflow: "hidden", zIndex: 2,
  };
  const imgInner: React.CSSProperties = {
    width: "100%", height: "100%", objectFit: "cover",
  };

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", height: "250vh", backgroundColor: CREAM }}
    >
      {/* ══ Sticky frame — locks to viewport for full 250vh ══ */}
      <div style={{
        position: "sticky", top: 0,
        height: "100vh", width: "100%",
        overflow: "hidden", backgroundColor: CREAM,
      }}>

        {/* ─── IMAGE LAYER (z 2, behind text) ─── */}

        {/* Img 1 — lower-left */}
        <motion.div style={{ ...imgStyle, left: "4%", width: "clamp(130px,19vw,270px)", y: y1 }}>
          <motion.img src={towerLowangleClouds} alt="Al Hamra Tower"
            style={imgInner}
            initial={{ scale: 1.14 }} animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: EASE }} />
        </motion.div>

        {/* Img 2 — upper-left, staggered */}
        <motion.div style={{ ...imgStyle, left: "17%", width: "clamp(110px,15vw,210px)", y: y2 }}>
          <motion.img src={interiorLobby} alt="Tower lobby"
            style={imgInner}
            initial={{ scale: 1.14 }} animate={{ scale: 1 }}
            transition={{ duration: 2.2, delay: 0.1, ease: EASE }} />
        </motion.div>

        {/* Img 3 — upper-right */}
        <motion.div style={{ ...imgStyle, right: "20%", width: "clamp(120px,17vw,240px)", y: y3 }}>
          <motion.img src={somTowerDetail} alt="Tower facade"
            style={imgInner}
            initial={{ scale: 1.14 }} animate={{ scale: 1 }}
            transition={{ duration: 2.2, delay: 0.05, ease: EASE }} />
        </motion.div>

        {/* Img 4 — far-right */}
        <motion.div style={{ ...imgStyle, right: "2%", width: "clamp(110px,16vw,230px)", y: y4 }}>
          <motion.img src={towerFacadeDetail} alt="Architectural detail"
            style={imgInner}
            initial={{ scale: 1.14 }} animate={{ scale: 1 }}
            transition={{ duration: 2.2, delay: 0.15, ease: EASE }} />
        </motion.div>

        {/* ─── TEXT LAYER (z 10, in front) ─── */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center",
          padding: "0 3.5vw",
          zIndex: 10, pointerEvents: "none", userSelect: "none",
        }}>
          <div style={{ width: "100%" }}>
            {lines.map((line, i) => (
              /*
                Outer span: overflow:hidden clips the reveal animation.
                Inner motion.span: display:flex + space-between spreads
                words wall-to-wall. This is the correct way to replicate
                Crestline's justified text — NOT text-align:justify which
                has no effect on block-level single-line text.
              */
              <span
                key={i}
                style={{ display: "block", overflow: "hidden" }}
              >
                <motion.span
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    /*
                      WHITE text + mix-blend-mode:difference:
                      - On cream background: white diff cream ≈ near-black → readable
                      - Over images: white diff photo = inverted glass effect
                    */
                    color: "white",
                    mixBlendMode: "difference",
                    fontFamily: "'Outfit', 'Century Gothic', sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(2.8rem, 8.8vw, 8.8rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                  }}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.06 + i * 0.1, ease: EASE }}
                >
                  {/*
                    Split each line into words. flex+space-between distributes
                    them from left edge to right edge with equal gaps.
                    2-word lines → very wide gap (where images emerge).
                    3-word lines → more even distribution.
                  */}
                  {line.split(" ").map((word, wi) => (
                    <span key={wi}>{word}</span>
                  ))}
                </motion.span>
              </span>
            ))}
          </div>
        </div>

        {/* ─── Bottom bar: location + scroll cue ─── */}
        <motion.div
          style={{
            opacity: indicatorOpacity,
            position: "absolute", bottom: "2rem",
            left: 0, right: 0, zIndex: 10,
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0 3.5vw",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.68rem", fontWeight: 500,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "hsl(40 8% 38%)",
          }}>
            {language === "en" ? "Kuwait City, KW" : "مدينة الكويت"}
          </p>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.68rem", fontWeight: 500,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "hsl(40 8% 38%)",
            }}>
              {language === "en" ? "Scroll" : "مرر"}
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 1, height: 28, background: "hsl(34 19% 54% / 0.6)" }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
