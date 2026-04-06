import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import towerLowangleClouds   from "@/assets/tower-lowangle-clouds.png";
import interiorLobby         from "@/assets/interior-lobby.jpg";
import somTowerDetail        from "@/assets/som-tower-detail.jpg";
import towerFacadeDetail     from "@/assets/tower-facade-detail.jpg";

/*
  ─────────────────────────────────────────────────────────────
  CRESTLINE HERO — pixel-faithful animation

  HOW IT WORKS:
  1.  Section is 250 vh tall. The sticky container locks to the
      viewport for the entire scroll distance, giving us a large
      scroll range to drive the parallax.

  2.  On page-load each image reveals itself with a clip-path
      wipe (bottom → top) AND a subtle scale-down (1.12 → 1).
      The images start at their final layout positions (y = 0%),
      so they are VISIBLE immediately after the wipe.

  3.  As the user scrolls the section, each image is translated
      upward at a slightly different rate (parallax). By the time
      the section exits the viewport the images have drifted 50-65%
      upward — passing through the text and creating the
      mix-blend-mode:difference inversion effect.

  4.  The headline text never moves. It sits in the exact centre
      of the sticky viewport on z-index above the images.
      Its white colour + mix-blend-mode:difference on the cream
      (#F5F0EB) background makes it appear near-black normally,
      then inverts to a pale outline where images pass behind it.

  KEY BUG FIXED vs. previous version:
  - Was:  height 101vh  → scroll range near-zero, no parallax
  - Now:  height 250vh  → full parallax travel
  - Was:  imgY starts at "100%"  → images start *below* viewport
  - Now:  imgY starts at "0%"    → images are in-frame on load,
          then scroll drives them upward through the text
  ─────────────────────────────────────────────────────────────
*/

const CREAM = "#F5F0EB";

const HeroSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll progress over the full 250 vh section */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /*
    Each image starts at its layout position (0%) and drifts
    upward at a unique rate so they separate as the user scrolls.
    Negative values = moved upward (out the top of the viewport).
  */
  const imgY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const imgY3 = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const imgY4 = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  /* Fade out the scroll indicator once the user starts scrolling */
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const isRTL = language !== "en";

  const lines = isRTL
    ? [
        "حيث   تلتقي   الهيبة",
        "المعمارية   بالحضور",
        "الدائم   رحلتك   التجارية",
        "تبدأ هنا.",
      ]
    : [
        "Where      Functionality",
        "Meets   Aesthetic,   Your",
        "Architectural    Journey",
        "Starts Here.",
      ];

  /* Shared clip-path wipe transition */
  const wipe = (delay: number) => ({
    initial: { clipPath: "inset(100% 0 0 0)" },
    animate: { clipPath: "inset(0% 0 0 0)" },
    transition: { duration: 1.3, delay, ease: [0.76, 0, 0.24, 1] as const },
  });

  /* Scale-out for inner img */
  const scaleIn = (delay: number) => ({
    initial: { scale: 1.14 },
    animate: { scale: 1 },
    transition: { duration: 2.0, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      ref={sectionRef}
      className="relative"
      /* 250 vh gives plenty of scroll travel for the parallax */
      style={{ height: "250vh", backgroundColor: CREAM }}
    >
      {/* ── Sticky viewport ────────────────────────────────── */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: CREAM }}
      >
        <div className="relative w-full h-full">

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              IMAGES — rendered BEFORE text in the DOM so
              they sit behind the text (z-index lower).
              Each is wrapped in a motion.div driven by scrollY
              so it drifts upward as the user scrolls.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

          {/* Image 1 — upper-left, tallest */}
          <motion.div
            style={{ y: imgY1, position: "absolute", top: "4%", left: "4%",
                     width: "clamp(140px, 20vw, 280px)", zIndex: 2 }}
          >
            <motion.div {...wipe(0.5)} className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <motion.img {...scaleIn(0.5)}
                src={towerLowangleClouds} alt="Al Hamra Tower"
                className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          {/* Image 2 — left group, offset lower */}
          <motion.div
            style={{ y: imgY2, position: "absolute", top: "22%", left: "18%",
                     width: "clamp(110px, 15vw, 210px)", zIndex: 2 }}
          >
            <motion.div {...wipe(0.68)} className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <motion.img {...scaleIn(0.68)}
                src={interiorLobby} alt="Lobby interior"
                className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          {/* Image 3 — centre-right */}
          <motion.div
            style={{ y: imgY3, position: "absolute", top: "8%", right: "22%",
                     width: "clamp(120px, 17vw, 240px)", zIndex: 2 }}
          >
            <motion.div {...wipe(0.6)} className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <motion.img {...scaleIn(0.6)}
                src={somTowerDetail} alt="Tower facade"
                className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          {/* Image 4 — far right */}
          <motion.div
            style={{ y: imgY4, position: "absolute", top: "0%", right: "2%",
                     width: "clamp(110px, 17vw, 240px)", zIndex: 2 }}
          >
            <motion.div {...wipe(0.78)} className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <motion.img {...scaleIn(0.78)}
                src={towerFacadeDetail} alt="Architectural detail"
                className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              TEXT — rendered AFTER images so it sits on top.
              NEVER moves. mix-blend-mode:difference gives the
              Crestline inversion effect where images overlap.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div
            className="absolute inset-0 flex items-center pointer-events-none select-none px-4 lg:px-12"
            style={{ zIndex: 10 }}
          >
            <h1
              className="hero-blend-text font-serif font-light uppercase whitespace-pre-wrap w-full"
              style={{
                fontSize: "clamp(2rem, 6.8vw, 7rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.015em",
              }}
            >
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "102%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* ── Location tag — top left, Crestline style ── */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-8 left-6 lg:left-12 overline text-muted-foreground"
            style={{ zIndex: 10 }}
          >
            Kuwait City, KW
          </motion.p>

        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: indicatorOpacity, zIndex: 20 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="overline">{language === "en" ? "Scroll" : "مرر"}</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7 bg-primary/60"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
