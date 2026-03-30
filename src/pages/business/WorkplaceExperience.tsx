import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
  descEn: string;
  descAr: string;
  image: string;
}

const sections: Section[] = [
  {
    id: "executive-positioning",
    titleEn: "Executive Positioning",
    titleAr: "التموضع التنفيذي",
    descEn: "Al Hamra Tower is where Kuwait's most influential enterprises establish their command centers. The address signals authority, stability, and forward-thinking vision — a statement before a single word is spoken.",
    descAr: "برج الحمراء هو المكان الذي تؤسس فيه أكثر المؤسسات الكويتية تأثيرًا مراكز قيادتها. العنوان يعبر عن السلطة والاستقرار والرؤية المستقبلية.",
    image: cityViewInterior,
  },
  {
    id: "curated-environment",
    titleEn: "Curated Environment",
    titleAr: "بيئة منسقة",
    descEn: "Every interaction within the tower is designed with intention. From the marble-clad arrival experience to the climate-controlled corridors, the environment reflects the caliber of its tenants.",
    descAr: "كل تفاعل داخل البرج مصمم بعناية. من تجربة الوصول المكسوة بالرخام إلى الممرات المكيفة، تعكس البيئة مستوى المستأجرين.",
    image: interiorLobby,
  },
  {
    id: "concierge-services",
    titleEn: "Concierge Services",
    titleAr: "خدمات الكونسيرج",
    descEn: "A dedicated concierge team operates around the clock, managing visitor protocols, courier logistics, and executive support services. Every detail handled with discretion and precision.",
    descAr: "فريق كونسيرج مخصص يعمل على مدار الساعة، يدير بروتوكولات الزوار ولوجستيات البريد السريع وخدمات الدعم التنفيذي.",
    image: lobbyArches,
  },
  {
    id: "security-protocols",
    titleEn: "Security Protocols",
    titleAr: "بروتوكولات الأمان",
    descEn: "Multi-layered security infrastructure including biometric access control, 24/7 CCTV surveillance, and dedicated security personnel at every access point. Enterprise-grade protection as standard.",
    descAr: "بنية تحتية أمنية متعددة الطبقات تشمل التحكم البيومتري والمراقبة على مدار الساعة وأفراد أمن مخصصين عند كل نقطة وصول.",
    image: officeCorridor,
  },
  {
    id: "tenant-community",
    titleEn: "Tenant Community",
    titleAr: "مجتمع المستأجرين",
    descEn: "Host to 50+ leading corporations spanning financial services, energy, technology, and consulting. The tenant roster itself creates a network of strategic proximity that amplifies each occupant's reach.",
    descAr: "يستضيف أكثر من 50 شركة رائدة تشمل الخدمات المالية والطاقة والتكنولوجيا والاستشارات. قائمة المستأجرين نفسها تخلق شبكة قرب استراتيجي.",
    image: towerAerialDay,
  },
  {
    id: "global-address",
    titleEn: "A Global Business Address",
    titleAr: "عنوان أعمال عالمي",
    descEn: "With direct access to major transportation networks and proximity to government institutions, the tower offers unmatched connectivity for businesses operating at the highest echelons of commerce.",
    descAr: "مع الوصول المباشر إلى شبكات النقل الرئيسية والقرب من المؤسسات الحكومية، يوفر البرج اتصالًا لا مثيل له للشركات.",
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

const WorkplaceExperience = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(index); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
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

        {/* Scroll-driven editorial sections — Desktop */}
        <section className="hidden lg:block py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-12 gap-16">
              {/* Left: Titles */}
              <div className="col-span-5 space-y-6">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    ref={(el) => { sectionRefs.current[index] = el; }}
                    className="min-h-[30vh] flex items-start pt-8 cursor-pointer"
                    onClick={() => setActiveSection(index)}
                  >
                    <div>
                      <span className="text-xs text-muted-foreground/50 tracking-wider block mb-3">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={`text-2xl lg:text-3xl font-light tracking-tight transition-colors duration-500 ${
                          activeSection === index ? "text-foreground" : "text-muted-foreground/30"
                        }`}
                      >
                        {isAr ? section.titleAr : section.titleEn}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Sticky panel */}
              <div className="col-span-7">
                <div className="sticky top-32">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="aspect-[4/3] overflow-hidden mb-8">
                        <img
                          src={sections[activeSection].image}
                          alt={sections[activeSection].titleEn}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-muted-foreground leading-relaxed max-w-lg">
                        {isAr ? sections[activeSection].descAr : sections[activeSection].descEn}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll-driven editorial sections — Mobile */}
        <section className="lg:hidden py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="space-y-0">
              {sections.map((section, index) => (
                <div key={section.id} className="border-t border-border">
                  <button
                    onClick={() => setExpandedMobile(expandedMobile === index ? null : index)}
                    className="w-full py-6 flex items-start justify-between text-left"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-xs text-muted-foreground/50 mt-1">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className={`text-xl font-light transition-colors duration-300 ${
                        expandedMobile === index ? "text-foreground" : "text-muted-foreground/50"
                      }`}>
                        {isAr ? section.titleAr : section.titleEn}
                      </h3>
                    </div>
                    <span className="text-muted-foreground text-lg">
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
