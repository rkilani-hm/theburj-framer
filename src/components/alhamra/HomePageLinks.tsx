import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { useState, useRef, MouseEvent } from "react";

import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerEntranceFountain from "@/assets/tower-entrance-fountain.jpg";
import skylineReflection from "@/assets/skyline-reflection.png";
import towerAerialSunset from "@/assets/tower-aerial-sunset.png";

interface PageLinkItem {
  number: string;
  location: string;
  title: string;
  image: string;
  link: string;
}

const HomePageLinks = () => {
  const { language } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollReveal();

  const pages: PageLinkItem[] = [
    {
      number: "/01",
      location: language === "en" ? "Architecture & Engineering" : "العمارة والهندسة",
      title: language === "en" ? "The Tower" : "البرج",
      image: somTowerSkyline,
      link: "/tower",
    },
    {
      number: "/02",
      location: language === "en" ? "Workspace & Enterprise" : "بيئة العمل والأعمال",
      title: language === "en" ? "Business Experience" : "تجربة الأعمال",
      image: interiorLobby,
      link: "/business/workplace-experience",
    },
    {
      number: "/03",
      location: language === "en" ? "Services & Sustainability" : "الخدمات والاستدامة",
      title: language === "en" ? "Facilities & Services" : "المرافق والخدمات",
      image: towerEntranceFountain,
      link: "/services",
    },
    {
      number: "/04",
      location: language === "en" ? "Opportunities & Inquiry" : "الفرص والاستفسار",
      title: language === "en" ? "Leasing" : "التأجير",
      image: skylineReflection,
      link: "/leasing/opportunities",
    },
    {
      number: "/05",
      location: language === "en" ? "Location & Connectivity" : "الموقع والاتصال",
      title: language === "en" ? "Location & Access" : "الموقع والوصول",
      image: towerAerialSunset,
      link: "/location",
    },
  ];

  return (
    <section className="py-24 lg:py-36 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.span
            initial={{ width: 0 }}
            animate={isInView ? { width: "3rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="block h-px bg-primary mb-6"
          />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {language === "en" ? "EXPLORE" : "استكشف"}
          </span>
        </motion.div>

        {/* Project List with hover image preview */}
        <div className="divide-y divide-border">
          {pages.map((page, index) => (
            <ProjectRow key={page.number} page={page} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   ProjectRow with cursor-following image preview
   ============================================================ */
const ProjectRow = ({ page, index }: { page: PageLinkItem; index: number }) => {
  const { ref, isInView } = useScrollReveal({ margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLAnchorElement>(null);

  // Mouse position tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 140);
    mouseY.set(e.clientY - rect.top - 100);
  };

  return (
    <Link
      ref={containerRef}
      to={page.link}
      className="block group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="grid grid-cols-12 gap-4 items-center py-8 lg:py-10 group-hover:bg-secondary/30 transition-colors duration-300 -mx-6 px-6 lg:-mx-12 lg:px-12"
      >
        {/* Number */}
        <div className="col-span-2 lg:col-span-1">
          <span className="text-sm font-sans text-muted-foreground group-hover:text-primary transition-colors duration-300">
            {page.number}
          </span>
        </div>

        {/* Location/Category */}
        <div className="col-span-10 lg:col-span-3">
          <span className="text-sm text-muted-foreground">{page.location}</span>
        </div>

        {/* Title */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-5">
          <h3 className="text-xl lg:text-2xl font-serif font-medium text-foreground group-hover:translate-x-3 transition-transform duration-500 ease-out">
            {page.title}
          </h3>
        </div>

        {/* Arrow */}
        <div className="hidden lg:flex col-span-1 col-start-12 justify-end">
          <ArrowRight
            size={18}
            className="text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300"
          />
        </div>
      </motion.div>

      {/* Floating Image Preview */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute z-20 pointer-events-none w-[280px] h-[200px] overflow-hidden shadow-2xl"
            style={{ x: springX, y: springY }}
          >
            <img
              src={page.image}
              alt={page.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default HomePageLinks;
