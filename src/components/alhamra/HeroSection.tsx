import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

import towerLowangle from "@/assets/tower-lowangle-clouds.png";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerFacadeDetail from "@/assets/tower-facade-detail.jpg";

const HeroSection = () => {
  const { language } = useLanguage();

  const headline = language === "en" 
    ? "Where Architectural Gravity Meets Enduring Presence, Your Business Journey Starts Here."
    : "حيث تلتقي الهيبة المعمارية بالحضور الدائم، تبدأ رحلتك التجارية هنا.";

  // Split headline into words for justified layout
  const words = headline.split(" ");

  return (
    <section className="relative bg-background">
      {/* Hero Text */}
      <div className="container mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-16 lg:pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2rem,5.5vw,5.5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground text-justify"
          style={{ textAlignLast: "left" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {word}{i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* Staggered Image Grid */}
      <div className="container mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* Left column - two stacked images */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-6 lg:col-span-3 space-y-4 lg:space-y-6"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={towerLowangle}
                alt="Al Hamra Tower"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden mt-8 lg:mt-16">
              <img
                src={interiorLobby}
                alt="Tower interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Center-right - larger offset image */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-6 lg:col-span-4 lg:col-start-5 pt-12 lg:pt-24"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={somTowerDetail}
                alt="Tower facade detail"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Right column - offset image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block col-span-3 col-start-10 pt-6"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={towerFacadeDetail}
                alt="Architectural detail"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
