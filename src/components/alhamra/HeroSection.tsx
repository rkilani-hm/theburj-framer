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

  // Parallax: images translate up at different speeds as user scrolls
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const headline =
    language === "en"
      ? "Where Architectural Gravity Meets Enduring Presence, Your Business Journey Starts Here."
      : "حيث تلتقي الهيبة المعمارية بالحضور الدائم، تبدأ رحلتك التجارية هنا.";

  const words = headline.split(" ");

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Hero Text */}
      <div className="container mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-16 lg:pb-24">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2rem,5.5vw,5.5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground text-justify"
          style={{ textAlignLast: "left" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: 40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15 + i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
              style={{ perspective: 600 }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* Staggered Image Grid with scroll-driven roll-up */}
      <div className="container mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* Left column - two stacked images */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: y1 }}
            className="col-span-6 lg:col-span-3 space-y-4 lg:space-y-6"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <motion.img
                src={towerLowangle}
                alt="Al Hamra Tower"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden mt-8 lg:mt-16">
              <motion.img
                src={interiorLobby}
                alt="Tower interior"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
            </div>
          </motion.div>

          {/* Center-right - larger offset image */}
          <motion.div
            initial={{ opacity: 0, y: 140 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: y2 }}
            className="col-span-6 lg:col-span-4 lg:col-start-5 pt-12 lg:pt-24"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <motion.img
                src={somTowerDetail}
                alt="Tower facade detail"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
            </div>
          </motion.div>

          {/* Right column - offset image */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: y3 }}
            className="hidden lg:block col-span-3 col-start-10 pt-6"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <motion.img
                src={towerFacadeDetail}
                alt="Architectural detail"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
