import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import cityViewInterior from "@/assets/city-view-interior.jpg";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import cityLandscape from "@/assets/city-landscape.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import officeCorridor from "@/assets/office-corridor.jpg";

interface Section {
  id: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  image: string;
}

const sections: Section[] = [
  {
    id: "executive-lobby",
    titleEn: "Executive Lobby Experience",
    titleAr: "تجربة اللوبي التنفيذي",
    subtitleEn: "First Impressions, Lasting Authority",
    subtitleAr: "انطباعات أولى، سلطة دائمة",
    descEn: "Al Hamra Tower is where Kuwait's most influential enterprises establish their command centers. The marble-clad arrival hall sets a tone of quiet authority — a statement before a single word is spoken.",
    descAr: "برج الحمراء هو المكان الذي تؤسس فيه أكثر المؤسسات الكويتية تأثيرًا مراكز قيادتها. قاعة الوصول المكسوة بالرخام تضع نغمة من السلطة الهادئة.",
    image: lobbyArches,
  },
  {
    id: "premium-office",
    titleEn: "Premium Office Environment",
    titleAr: "بيئة مكتبية متميزة",
    subtitleEn: "Designed for Excellence",
    subtitleAr: "مصممة للتميز",
    descEn: "Every interaction within the tower is designed with intention. From the climate-controlled corridors to the 3.2m ceiling heights and column-free floor plates, the environment reflects the caliber of its tenants.",
    descAr: "كل تفاعل داخل البرج مصمم بعناية. من الممرات المكيفة إلى ارتفاعات الأسقف 3.2 متر والأرضيات الخالية من الأعمدة، تعكس البيئة مستوى المستأجرين.",
    image: officeCorridor,
  },
  {
    id: "panoramic-views",
    titleEn: "Panoramic Business Views",
    titleAr: "إطلالات بانورامية للأعمال",
    subtitleEn: "The Entire City at Your Feet",
    subtitleAr: "المدينة بأكملها عند قدميك",
    descEn: "Floor-to-ceiling glazing delivers unobstructed views across Kuwait City, the Arabian Gulf, and beyond. Natural light floods every workspace, creating an environment that inspires clarity and ambition.",
    descAr: "الزجاج من الأرض إلى السقف يوفر إطلالات غير مسدودة عبر مدينة الكويت والخليج العربي وما وراءه. الضوء الطبيعي يغمر كل مساحة عمل.",
    image: cityViewInterior,
  },
  {
    id: "amenities",
    titleEn: "Workplace Amenities",
    titleAr: "مرافق مكان العمل",
    subtitleEn: "Everything Within Reach",
    subtitleAr: "كل شيء في متناول اليد",
    descEn: "A dedicated concierge team operates around the clock, managing visitor protocols, courier logistics, and executive support services. Premium dining, retail, and wellness facilities complement the work experience.",
    descAr: "فريق كونسيرج مخصص يعمل على مدار الساعة، يدير بروتوكولات الزوار ولوجستيات البريد السريع وخدمات الدعم التنفيذي. مرافق طعام وتجزئة وعافية متميزة.",
    image: interiorLobby,
  },
  {
    id: "connectivity",
    titleEn: "Business Connectivity",
    titleAr: "اتصال الأعمال",
    subtitleEn: "Strategically Positioned",
    subtitleAr: "موقع استراتيجي",
    descEn: "Host to 50+ leading corporations spanning financial services, energy, technology, and consulting. Direct access to major transportation networks and proximity to government institutions creates unmatched connectivity.",
    descAr: "يستضيف أكثر من 50 شركة رائدة تشمل الخدمات المالية والطاقة والتكنولوجيا والاستشارات. الوصول المباشر إلى شبكات النقل الرئيسية والقرب من المؤسسات الحكومية.",
    image: towerAerialDay,
  },
  {
    id: "five-star-services",
    titleEn: "Five-Star Services",
    titleAr: "خدمات خمس نجوم",
    subtitleEn: "Hospitality Meets Enterprise",
    subtitleAr: "الضيافة تلتقي بالمؤسسات",
    descEn: "Multi-layered security infrastructure, biometric access control, 24/7 CCTV surveillance, and dedicated personnel at every access point. Enterprise-grade protection delivered with five-star hospitality.",
    descAr: "بنية تحتية أمنية متعددة الطبقات، تحكم بيومتري، مراقبة على مدار الساعة، وأفراد مخصصين عند كل نقطة وصول. حماية بمستوى المؤسسات بضيافة خمس نجوم.",
    image: cityLandscape,
  },
];

const stats = [
  { valueEn: "50+", valueAr: "٥٠+", labelEn: "Leading Companies", labelAr: "شركة رائدة" },
  { valueEn: "95%", valueAr: "٩٥٪", labelEn: "Occupancy Rate", labelAr: "نسبة الإشغال" },
  { valueEn: "24/7", valueAr: "٢٤/٧", labelEn: "Operations", labelAr: "العمليات" },
  { valueEn: "5-Star", valueAr: "٥ نجوم", labelEn: "Service Standard", labelAr: "معيار الخدمة" },
];

const galleryImages = [
  { src: cityViewInterior, alt: "Executive office with city views" },
  { src: lobbyArches, alt: "Grand lobby arches" },
  { src: towerAerialDay, alt: "Tower aerial perspective" },
];

const SECTION_COUNT = sections.length;

const WorkplaceExperience = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [activeSection, setActiveSection] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(0);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  const { scrollYProgress } = useScroll({
    target: stickyWrapperRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active section index
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (isClickScrolling.current) return;
      const index = Math.min(Math.floor(v * SECTION_COUNT), SECTION_COUNT - 1);
      setActiveSection(Math.max(0, index));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const handleTitleClick = useCallback((index: number) => {
    if (!stickyWrapperRef.current) return;
    isClickScrolling.current = true;
    setActiveSection(index);

    const wrapperTop = stickyWrapperRef.current.offsetTop;
    const wrapperHeight = stickyWrapperRef.current.offsetHeight - window.innerHeight;
    const targetScroll = wrapperTop + (index / SECTION_COUNT) * wrapperHeight;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8"
            >
              {isAr ? "الأعمال / تجربة مكان العمل" : "Business / Workplace Experience"}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,6vw,6rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-5xl"
            >
              {isAr ? "حيث تبدأ المكانة" : "Where Prestige Begins"}
            </motion.h1>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-foreground py-12">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl lg:text-4xl font-light text-background mb-1">
                    {isAr ? stat.valueAr : stat.valueEn}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-background/60">
                    {isAr ? stat.labelAr : stat.labelEn}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Sticky Scroll — Desktop */}
        <div ref={stickyWrapperRef} className="hidden lg:block relative" style={{ height: `${SECTION_COUNT * 100}vh` }}>
          <div className="sticky top-0 h-screen flex items-stretch bg-background">
            <div className="container mx-auto px-6 lg:px-12 flex items-center">
              <div className="grid grid-cols-12 gap-12 w-full">
                {/* Left Column — 40% — Compact Nav */}
                <div className="col-span-5 flex flex-col justify-center" style={{ maxHeight: "60vh" }}>
                  <div className="flex flex-col gap-2">
                    {sections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => handleTitleClick(index)}
                        className="text-left group flex items-center gap-4 py-1.5 transition-all duration-300"
                      >
                        <span
                          className={`text-[11px] font-mono tracking-wider transition-colors duration-400 ${
                            activeSection === index ? "text-muted-foreground" : "text-muted-foreground/30"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-[18px] uppercase tracking-[0.08em] leading-[1.2] transition-all duration-400 ${
                            activeSection === index
                              ? "text-foreground font-medium"
                              : "text-muted-foreground/25 font-light group-hover:text-muted-foreground/50"
                          }`}
                        >
                          {isAr ? section.titleAr : section.titleEn}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-8 flex items-center gap-3">
                    {sections.map((_, i) => (
                      <div
                        key={i}
                        className={`h-[2px] transition-all duration-500 ${
                          i === activeSection ? "w-8 bg-foreground" : "w-3 bg-muted-foreground/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Column — 60% — Content Panel */}
                <div className="col-span-7 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="space-y-6"
                    >
                      {/* Subtitle */}
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-xs uppercase tracking-[0.25em] text-muted-foreground"
                      >
                        {isAr ? sections[activeSection].subtitleAr : sections[activeSection].subtitleEn}
                      </motion.p>

                      {/* Image */}
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <motion.img
                          key={`img-${activeSection}`}
                          src={sections[activeSection].image}
                          alt={sections[activeSection].titleEn}
                          initial={{ scale: 1.08, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 1.05, opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-muted-foreground leading-relaxed max-w-xl text-[15px]"
                      >
                        {isAr ? sections[activeSection].descAr : sections[activeSection].descEn}
                      </motion.p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — Accordion */}
        <section className="lg:hidden py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="space-y-0">
              {sections.map((section, index) => (
                <div key={section.id} className="border-t border-border">
                  <button
                    onClick={() => setExpandedMobile(expandedMobile === index ? null : index)}
                    className="w-full py-5 flex items-start justify-between text-left"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-[11px] text-muted-foreground/40 mt-1 font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className={`text-base uppercase tracking-[0.06em] leading-[1.2] transition-colors duration-300 ${
                        expandedMobile === index ? "text-foreground font-medium" : "text-muted-foreground/40 font-light"
                      }`}>
                        {isAr ? section.titleAr : section.titleEn}
                      </h3>
                    </div>
                    <span className="text-muted-foreground/40 text-sm">
                      {expandedMobile === index ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {expandedMobile === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 space-y-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
                            {isAr ? section.subtitleAr : section.subtitleEn}
                          </p>
                          <div className="aspect-[16/9] overflow-hidden">
                            <img
                              src={section.image}
                              alt={section.titleEn}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {isAr ? section.descAr : section.descEn}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-6">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="aspect-[3/4] overflow-hidden group"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WorkplaceExperience;
