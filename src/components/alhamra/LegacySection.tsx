import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { useRef } from "react";
import { Quote } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import ParallaxHistoryTimeline from "./ParallaxHistoryTimeline";

// Import images
import towerBw1 from "@/assets/tower-bw-1.png";
import towerBw2 from "@/assets/tower-bw-2.png";
import towerAerialSunset from "@/assets/tower-aerial-sunset.png";
import towerCityContext from "@/assets/tower-city-context.jpg";
import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import kuwaitPanoramaSunset from "@/assets/kuwait-panorama-sunset.png";
import towerNightIlluminated from "@/assets/tower-night-illuminated.jpg";
import towerCityscape from "@/assets/tower-cityscape.png";
import kuwaitMarina from "@/assets/kuwait-marina-dusk.png";
import kuwaitHorizon from "@/assets/kuwait-horizon.png";

// Archival images
import kuwaitCinemaHistoric from "@/assets/kuwait-cinema-historic.jpg";
import kuwaitSouqHistoric from "@/assets/kuwait-souq-historic.jpg";
import kuwaitCity1970s from "@/assets/kuwait-city-1970s.jpg";

const LegacySection = () => {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";
  
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: originsRef, isInView: originsInView } = useScrollReveal();
  const { ref: archivalRef, isInView: archivalInView } = useScrollReveal();
  const { ref: comparisonRef, isInView: comparisonInView } = useScrollReveal();
  const { ref: foundersRef, isInView: foundersInView } = useScrollReveal();
  const { ref: evolutionRef, isInView: evolutionInView } = useScrollReveal();
  
  const { ref: impactRef, isInView: impactInView } = useScrollReveal();
  const { ref: heartRef, isInView: heartInView } = useScrollReveal();
  const { ref: lightRef, isInView: lightInView } = useScrollReveal();

  const archivalImages = [
    { 
      src: kuwaitCinemaHistoric, 
      alt: t("legacy.archival.cinema.alt"),
      caption: t("legacy.archival.cinema.caption"),
      year: "1960s"
    },
    { 
      src: kuwaitSouqHistoric, 
      alt: t("legacy.archival.souq.alt"),
      caption: t("legacy.archival.souq.caption"),
      year: "1950s"
    },
    { 
      src: kuwaitCity1970s, 
      alt: t("legacy.archival.city.alt"),
      caption: t("legacy.archival.city.caption"),
      year: "1970s"
    }
  ];

  const foundersQuotes = [
    {
      quote: t("legacy.founders.quote1"),
      author: t("legacy.founders.author1"),
      role: t("legacy.founders.role1")
    },
    {
      quote: t("legacy.founders.quote2"),
      author: t("legacy.founders.author2"),
      role: t("legacy.founders.role2")
    },
    {
      quote: t("legacy.founders.quote3"),
      author: t("legacy.founders.author3"),
      role: t("legacy.founders.role3")
    }
  ];
  
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="legacy" className="bg-background relative overflow-hidden">
      {/* Hero Section with Parallax */}
      <div ref={parallaxRef} className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.div 
          style={{ y: parallaxY }}
          className="absolute inset-0 scale-110"
        >
          <img
            src={kuwaitPanoramaSunset}
            alt={t("legacy.hero.alt")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        </motion.div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
            <motion.div 
              ref={headerRef}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-foreground/60" />
                <span className="text-xs uppercase tracking-[0.3em] text-foreground/80">
                  {t("legacy.label")}
                </span>
              </div>
              <h1 className="text-headline lg:text-display font-light tracking-wide text-foreground mb-6">
                {t("legacy.title")}
              </h1>
              <p className="text-body-lg text-foreground/80 max-w-xl">
                {t("legacy.subtitle")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Origins Section - Cinema to Tower */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            ref={originsRef}
            initial="hidden"
            animate={originsInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-title font-light text-foreground mb-4">
              {t("legacy.origins.heading")}
            </h2>
            <div className="w-16 h-px bg-foreground/30" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Then/Now Image Comparison */}
            <motion.div
              initial="hidden"
              animate={originsInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`relative ${isArabic ? 'lg:order-2' : ''}`}
            >
              <div className="relative">
                {/* Historical image (sepia/vintage treatment) */}
                <div className="aspect-[4/3] overflow-hidden bg-muted/20">
                  <img
                    src={towerBw1}
                    alt={t("legacy.origins.historic.alt")}
                    className="w-full h-full object-cover sepia-[0.3] opacity-90"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {t("legacy.origins.historic.label")}
                    </p>
                  </div>
                </div>
                
                {/* Modern overlay image */}
                <div className="absolute -bottom-8 -right-8 w-2/3 aspect-[3/4] overflow-hidden shadow-2xl border-4 border-background">
                  <img
                    src={towerAerialSunset}
                    alt={t("legacy.origins.modern.alt")}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {t("legacy.origins.modern.label")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Origins Content */}
            <motion.div
              initial="hidden"
              animate={originsInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`space-y-8 ${isArabic ? 'lg:order-1' : ''}`}
            >
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("legacy.origins.p1")}
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                {t("legacy.origins.p2")}
              </p>
              
              <blockquote className="relative py-6 my-8">
                <div className={`absolute ${isArabic ? 'right-0' : 'left-0'} top-0 bottom-0 w-px bg-foreground`} />
                <p className={`text-title font-light text-foreground ${isArabic ? 'pr-8' : 'pl-8'}`}>
                  {t("legacy.origins.quote")}
                </p>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Chronicles of the Past — Echoing Kuwait's Heritage (merged with Historical Journey) */}
      <ParallaxHistoryTimeline />

      {/* Before/After Comparison Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            ref={comparisonRef}
            initial="hidden"
            animate={comparisonInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={isArabic ? 'lg:order-2' : ''}>
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                  {t("legacy.comparison.label")}
                </span>
                <h2 className="text-title font-light text-foreground mb-4">
                  {t("legacy.comparison.heading")}
                </h2>
                <p className="text-body text-muted-foreground mb-6">
                  {t("legacy.comparison.desc")}
                </p>
              </div>
              
              <motion.div
                initial="hidden"
                animate={comparisonInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={isArabic ? 'lg:order-1' : ''}
              >
                <BeforeAfterSlider
                  beforeImage={kuwaitCinemaHistoric}
                  afterImage={somTowerSkyline}
                  beforeLabel={t("legacy.comparison.before.label")}
                  afterLabel={t("legacy.comparison.after.label")}
                  beforeYear="1960s"
                  afterYear="2011"
                />
                {/* Instruction text moved below slider (#09) */}
                <p className="text-sm text-muted-foreground/60 italic mt-4 text-center">
                  {t("legacy.comparison.instruction")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Founders' Vision Section — moved after Before & Beyond (#06) */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            ref={foundersRef}
            initial="hidden"
            animate={foundersInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              {t("legacy.founders.label")}
            </span>
            <h2 className="text-title font-light text-foreground mb-4">
              {t("legacy.founders.heading")}
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              {t("legacy.founders.desc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {foundersQuotes.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={foundersInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative p-8 bg-muted/30 border border-border group hover:border-foreground/20 transition-colors duration-300"
              >
                <Quote className="w-8 h-8 text-foreground/20 mb-6 group-hover:text-foreground/40 transition-colors duration-300" />
                <blockquote className="mb-8">
                  <p className="text-body leading-relaxed text-foreground font-light italic">
                    "{item.quote}"
                  </p>
                </blockquote>
                <footer className="mt-auto">
                  <p className="text-sm font-medium text-foreground">{item.author}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mt-1">{item.role}</p>
                </footer>
              </motion.div>
            ))}
          </div>

          {/* Vision Statement */}
          <motion.div
            initial="hidden"
            animate={foundersInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <blockquote className="max-w-3xl mx-auto relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-px bg-foreground/30" />
              <p className="text-title font-light text-foreground leading-relaxed pt-8">
                {t("legacy.founders.vision")}
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>

      {/* Urban & Cultural Impact */}
      <div className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              ref={impactRef}
              initial="hidden"
              animate={impactInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8 }}
              className={`${isArabic ? 'lg:order-2' : ''}`}
            >
              <div className="aspect-[16/10] overflow-hidden group">
                <img
                  src={towerNightIlluminated}
                  alt={t("legacy.impact.image.alt")}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={impactInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`space-y-8 ${isArabic ? 'lg:order-1' : ''}`}
            >
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-background/70 mb-4 block">
                  {t("legacy.impact.label")}
                </span>
                <h2 className="text-title font-light text-background mb-4">
                  {t("legacy.impact.heading")}
                </h2>
              </div>
              
              <p className="text-body-lg text-background/80 leading-relaxed">
                {t("legacy.impact.p1")}
              </p>
              <p className="text-body text-background/70 leading-relaxed">
                {t("legacy.impact.p2")}
              </p>

              <div className="pt-6">
                <p className="text-sm uppercase tracking-[0.2em] text-background/60">
                  {t("legacy.impact.recognition")}
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <span className="px-4 py-2 border border-background/30 text-sm text-background/80">
                    CTBUH Award
                  </span>
                  <span className="px-4 py-2 border border-background/30 text-sm text-background/80">
                    MIPIM Finalist
                  </span>
                  <span className="px-4 py-2 border border-background/30 text-sm text-background/80">
                    LEAF Award
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Light Meets Horizon — merged from "Light Throughout the Day" + "Where Sky Meets Sea" (#07) */}
      <div className="py-16 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            ref={lightRef}
            initial="hidden"
            animate={lightInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-subheadline font-light text-foreground mb-4">
              Light Meets Horizon
            </h3>
            <p className="text-body text-muted-foreground max-w-3xl">
              From its height, the tower commands both sun and sea. As dawn breaks over the Arabian Gulf and dusk descends upon the city, light traverses its sculpted form, casting measured brilliance across glass and stone. Here, land and water converge in solemn panorama — a vantage not merely of elevation, but of dominion over horizon and time.
            </p>
          </motion.div>

          {/* Time-lapse display from "Light Throughout the Day" */}
          <motion.div 
            initial="hidden"
            animate={lightInView ? "visible" : "hidden"}
            className="grid grid-cols-3 gap-4 lg:gap-6 mb-12"
          >
            {[
              { label: t("perspective.view1") || "Dawn", time: "06:00", image: kuwaitPanoramaSunset },
              { label: t("perspective.view2") || "Noon", time: "12:00", image: towerCityscape },
              { label: t("perspective.view3") || "Dusk", time: "18:00", image: kuwaitMarina },
            ].map((view, i) => (
              <motion.div 
                key={i} 
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative cursor-pointer"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted relative">
                  <img 
                    src={view.image}
                    alt={view.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{
                      filter: i === 0 ? "brightness(0.7) saturate(0.8)" : i === 2 ? "brightness(0.9) saturate(1.2) sepia(0.1)" : "none"
                    }}
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{view.label}</span>
                  <span className="text-xs text-muted-foreground/60 font-mono">{view.time}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Visibility stat from "Where Sky Meets Sea" */}
          <motion.div
            initial="hidden"
            animate={lightInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="relative group">
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={kuwaitHorizon}
                  alt="Kuwait horizon view"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {t("perspective.horizon.p1") || "From the upper observation levels, the tower offers commanding views that stretch across the entire city and far out over the Gulf waters."}
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {t("perspective.horizon.stat.label") || "Visibility Range"}
                </p>
                <p className="text-4xl font-light text-foreground mt-2">
                  {t("perspective.horizon.stat.value") || "80+ km"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Legacy in the Heart of the City */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            ref={heartRef}
            initial="hidden"
            animate={heartInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-title font-light text-foreground mb-4">
              {t("legacy.heart.heading")}
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              {t("legacy.heart.p1")}
            </p>
          </motion.div>

          {/* City Context Gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial="hidden"
              animate={heartInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 aspect-[16/9] overflow-hidden group"
            >
              <img
                src={towerCityContext}
                alt={t("legacy.heart.gallery1.alt")}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate={heartInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="aspect-square lg:aspect-auto overflow-hidden group"
            >
              <img
                src={towerBw2}
                alt={t("legacy.heart.gallery2.alt")}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Closing Statement */}
          <motion.div
            initial="hidden"
            animate={heartInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <blockquote className="max-w-2xl mx-auto">
              <p className="text-title font-light text-foreground leading-relaxed">
                {t("legacy.closing.quote")}
              </p>
              <footer className="mt-6 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {t("legacy.closing.attribution")}
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
