import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import HomePageLinks from "@/components/alhamra/HomePageLinks";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

import towerAerialSunset from "@/assets/tower-aerial-sunset.png";
import kuwaitSkylineNight from "@/assets/kuwait-skyline-night.png";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import entranceDusk from "@/assets/entrance-dusk.jpg";
import towerBw1 from "@/assets/tower-bw-1.png";
import towerBw2 from "@/assets/tower-bw-2.png";
import panoramaCity from "@/assets/panorama-city.jpg";
import somTowerVertical from "@/assets/som-tower-vertical.jpg";
import towerAerialGulf from "@/assets/tower-aerial-gulf.jpg";
import somObservation from "@/assets/som-observation.jpg";

/* ============================================================
   Animated Counter Hook (Luxterra-style)
   ============================================================ */
const useCountUp = (end: number, duration = 2000, startOnView = false, isInView = true) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, isInView]);

  return count;
};

/* ============================================================
   Main Home Component
   ============================================================ */
const Home = () => {
  const { language } = useLanguage();
  const { ref: aboutRef, isInView: aboutInView } = useScrollReveal();
  const { ref: servicesRef, isInView: servicesInView } = useScrollReveal();
  const { ref: statsRef, isInView: statsInView } = useScrollReveal();
  const { ref: galleryRef, isInView: galleryInView } = useScrollReveal();
  const { ref: ctaRef, isInView: ctaInView } = useScrollReveal();

  const services = [
    {
      title: language === "en" ? "ARCHITECTURAL EXCELLENCE" : "التميز المعماري",
      description: language === "en"
        ? "A sculpted form by SOM that rotates 60° from base to crown, reducing solar heat gain by 40% while maximizing panoramic Gulf views."
        : "تصميم نحتي من SOM يدور ٦٠ درجة من القاعدة إلى التاج، يقلل اكتساب الحرارة الشمسية بنسبة ٤٠٪ مع تعظيم الإطلالات البانورامية.",
      image: somTowerVertical,
    },
    {
      title: language === "en" ? "PREMIUM WORKSPACES" : "مساحات عمل متميزة",
      description: language === "en"
        ? "Flexible floor plates ranging from 900 to 2,300 sqm with floor-to-ceiling glazing, designed for headquarters and multi-tenant configurations."
        : "طوابق مرنة تتراوح من ٩٠٠ إلى ٢,٣٠٠ متر مربع مع زجاج من الأرض للسقف، مصممة للمقرات والتكوينات متعددة المستأجرين.",
      image: lobbyArches,
    },
    {
      title: language === "en" ? "INTEGRATED SERVICES" : "خدمات متكاملة",
      description: language === "en"
        ? "24/7 operations center, building management systems, security protocols, and maintenance — all calibrated for seamless corporate performance."
        : "مركز عمليات ٢٤/٧، أنظمة إدارة المبنى، بروتوكولات الأمان، والصيانة — كلها مصممة للأداء المؤسسي السلس.",
      image: entranceDusk,
    },
    {
      title: language === "en" ? "STRATEGIC LOCATION" : "موقع استراتيجي",
      description: language === "en"
        ? "Positioned at the heart of Kuwait City's financial district with direct connectivity to major transportation networks and urban amenities."
        : "يقع في قلب الحي المالي بمدينة الكويت مع اتصال مباشر بشبكات النقل الرئيسية والمرافق الحضرية.",
      image: towerAerialGulf,
    },
  ];

  const stats = [
    { value: 412, suffix: "m", label: language === "en" ? "Height" : "الارتفاع" },
    { value: 77, suffix: "", label: language === "en" ? "Floors" : "طابق" },
    { value: 2011, suffix: "", label: language === "en" ? "Completed" : "الإنجاز" },
    { value: 195, suffix: "k", label: language === "en" ? "GFA (sqm)" : "م.م.إ" },
  ];

  const awards = [
    "CTBUH Best Tall Building — Middle East & Africa 2012",
    "Emirates Glass LEAF Award — Best Structural Design 2011",
    "MIPIM Architectural Review — Future Project Award 2007",
    "World Architecture Festival — Shortlisted 2012",
    "International Property Awards — Best Commercial High-Rise 2012",
  ];

  const galleryImages = [towerAerialSunset, somObservation, panoramaCity, lobbyArches, entranceDusk, towerBw1, somTowerDetail, towerAerialGulf];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />

        {/* ─── ABOUT Section ─── */}
        <section className="pt-0 pb-16 lg:pt-0 lg:pb-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div ref={aboutRef} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Text */}
              <motion.div
                initial="hidden"
                animate={aboutInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.8 }}
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={aboutInView ? { width: "3rem" } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="block h-px bg-primary mb-8"
                />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">
                  {language === "en" ? "ABOUT" : "نبذة"}
                </span>
                <p className="text-lg lg:text-xl text-foreground leading-relaxed mb-8">
                  {language === "en"
                    ? "Al Hamra Business Tower stands as Kuwait's most significant architectural achievement — a structure of absolute presence, designed to endure beyond trends and cycles."
                    : "يقف برج الحمراء للأعمال كأهم إنجاز معماري في الكويت — هيكل ذو حضور مطلق، صُمم ليستمر بعيداً عن الصيحات والدورات."}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {language === "en"
                    ? "Designed by Skidmore, Owings & Merrill, the tower's distinctive sculptural form emerged from a synthesis of engineering innovation and environmental response."
                    : "صممه مكتب سكيدمور أوينغز وميريل، نشأ الشكل النحتي المميز للبرج من تركيب الابتكار الهندسي والاستجابة البيئية."}
                </p>
              </motion.div>

              {/* Images — Staggered pair with clip-path reveal */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={aboutInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
                  transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                  className="aspect-[3/4] overflow-hidden"
                >
                  <img src={towerBw1} alt="Al Hamra Tower" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </motion.div>
                <motion.div
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={aboutInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
                  transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="aspect-[3/4] overflow-hidden mt-12"
                >
                  <img src={towerBw2} alt="Tower detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SERVICES Section — Accordion with expanding image ─── */}
        <section className="py-16 lg:py-20 bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={servicesRef}
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
                {language === "en" ? "SERVICES" : "الخدمات"}
              </span>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                {language === "en"
                  ? "Every element calibrated for corporate success — architecture, workspaces, services, and positioning."
                  : "كل عنصر مُعاير لنجاح الأعمال — العمارة والمساحات والخدمات والموقع."}
              </p>
            </motion.div>

            <div className="border-t border-border">
              {services.map((service, index) => (
                <ServiceAccordion key={index} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Stats Bar — Animated counting numbers ─── */}
        <section className="bg-foreground overflow-hidden">
          <div ref={statsRef} className="container mx-auto px-6 lg:px-12 py-14 lg:py-18">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
              {stats.map((stat, index) => (
                <AnimatedStat key={index} stat={stat} index={index} isInView={statsInView} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Gallery Grid — Masonry with staggered clip-path reveals ─── */}
        <section className="py-4 bg-background">
          <div ref={galleryRef} className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                  animate={galleryInView ? { clipPath: "inset(0% 0 0 0)", opacity: 1 } : {}}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.1,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className={`overflow-hidden group cursor-pointer ${
                    i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                  } ${i === 2 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                >
                  <img
                    src={img}
                    alt="Al Hamra Tower"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── EXPLORE / Page Links ─── */}
        <HomePageLinks />

        {/* ─── AWARDS — Infinite Marquee Ticker ─── */}
        <section className="py-16 lg:py-20 bg-background border-t border-border overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {language === "en" ? "AWARDS & RECOGNITION" : "الجوائز والتقدير"}
            </span>
          </div>
          <div className="relative">
            <div className="marquee-track">
              <div className="marquee-content">
                {[...awards, ...awards].map((award, index) => (
                  <span key={index} className="inline-flex items-center gap-6 mx-8">
                    <span className="text-lg lg:text-2xl font-serif text-foreground whitespace-nowrap">{award}</span>
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA Section — Parallax background ─── */}
        <CTASection language={language} ctaRef={ctaRef} ctaInView={ctaInView} />
      </main>
      <Footer />
    </div>
  );
};

/* ============================================================
   Service Accordion Component
   ============================================================ */
const ServiceAccordion = ({
  service,
  index,
}: {
  service: { title: string; description: string; image: string };
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, isInView } = useScrollReveal({ margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-border"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full grid grid-cols-12 gap-4 items-center py-8 lg:py-10 cursor-pointer group text-left"
      >
        <div className="col-span-1">
          <span className="text-sm font-sans text-muted-foreground">/{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="col-span-9 lg:col-span-4">
          <h3 className="text-sm font-sans font-medium uppercase tracking-wider text-foreground group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
        </div>
        <div className="hidden lg:block col-span-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </div>
        <div className="col-span-2 lg:col-span-2 flex justify-end">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl text-muted-foreground font-light leading-none"
          >
            +
          </motion.span>
        </div>
      </button>

      {/* Expanding Image Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-12 gap-4 pb-10">
              <div className="col-span-12 lg:col-span-1" />
              <div className="col-span-12 lg:col-span-5">
                <p className="text-sm text-muted-foreground leading-relaxed lg:hidden mb-6">
                  {service.description}
                </p>
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="aspect-[16/10] overflow-hidden"
                >
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ============================================================
   Animated Stat Component
   ============================================================ */
const AnimatedStat = ({
  stat,
  index,
  isInView,
}: {
  stat: { value: number; suffix: string; label: string };
  index: number;
  isInView: boolean;
}) => {
  const count = useCountUp(stat.value, 2000, true, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="text-center lg:text-left"
    >
      <p className="text-4xl lg:text-5xl font-serif font-medium text-background mb-2 tabular-nums">
        {count}
        <span className="text-primary">{stat.suffix}</span>
      </p>
      <p className="text-sm text-background/50 tracking-wide">{stat.label}</p>
    </motion.div>
  );
};

/* ============================================================
   CTA Section with Parallax
   ============================================================ */
const CTASection = ({
  language,
  ctaRef,
  ctaInView,
}: {
  language: string;
  ctaRef: any;
  ctaInView: boolean;
}) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={parallaxRef} className="relative overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={kuwaitSkylineNight}
          alt="Kuwait skyline"
          className="w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-foreground/80" />
      </motion.div>

      <div ref={ctaRef} className="container mx-auto px-6 lg:px-12 relative z-10 py-28 lg:py-40">
        <motion.div
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ width: 0 }}
            animate={ctaInView ? { width: "3rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="block h-px bg-primary mb-8"
          />
          <span className="text-xs uppercase tracking-[0.3em] text-background/40 mb-8 block">
            {language === "en" ? "INQUIRE" : "استفسر"}
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif font-medium text-background mb-6 leading-tight">
            {language === "en"
              ? "Your address at Kuwait's most iconic landmark."
              : "عنوانك في أبرز معلم في الكويت."}
          </h2>
          <p className="text-base text-background/60 mb-10 leading-relaxed">
            {language === "en"
              ? "A limited collection of premium office spaces. Request availability and schedule a private viewing."
              : "مجموعة محدودة من المساحات المكتبية المتميزة. اطلب التوفر وجدولة معاينة خاصة."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/leasing/opportunities"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-background hover:bg-primary/90 transition-all duration-300 group"
            >
              <span className="text-sm uppercase tracking-wider">
                {language === "en" ? "View Opportunities" : "عرض الفرص"}
              </span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-background/30 text-background hover:bg-background/10 transition-colors"
            >
              <span className="text-sm uppercase tracking-wider">
                {language === "en" ? "Contact Us" : "اتصل بنا"}
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
