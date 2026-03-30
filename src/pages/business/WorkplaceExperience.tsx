import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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

/* Per-section sticky scroll card */
const StickySection = ({
  section,
  index,
  isAr,
}: {
  section: Section;
  index: number;
  isAr: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Fade in as section enters, fade out as it leaves
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.65, 0.9], [0, 1, 1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 0.25, 0.65, 0.9], [80, 0, 0, -40]);
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.65, 0.9], [50, 0, 0, -30]);
  const imgScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [1.1, 1, 1, 0.98]);

  return (
    <div ref={ref} className="h-[120vh] relative">
      <div className="sticky top-0 h-screen flex items-center">
        <motion.div
          style={{ opacity }}
          className="container mx-auto px-6 lg:px-12"
        >
          <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Text side */}
            <motion.div
              style={{ y: textY }}
              className="col-span-12 lg:col-span-5 order-2 lg:order-1"
            >
              <span className="text-xs text-muted-foreground/50 tracking-[0.3em] uppercase block mb-4">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight text-foreground mb-6 leading-[1.1]">
                {isAr ? section.titleAr : section.titleEn}
              </h3>
              <div className="w-12 h-px bg-muted-foreground/20 mb-6" />
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg max-w-md">
                {isAr ? section.descAr : section.descEn}
              </p>
            </motion.div>

            {/* Image side */}
            <motion.div
              style={{ y: imgY, scale: imgScale }}
              className="col-span-12 lg:col-span-7 order-1 lg:order-2"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={section.image}
                  alt={section.titleEn}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const WorkplaceExperience = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);

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

        {/* Sticky scroll-driven sections — Desktop */}
        <div className="hidden lg:block">
          {sections.map((section, index) => (
            <StickySection
              key={section.id}
              section={section}
              index={index}
              isAr={isAr}
            />
          ))}
        </div>

        {/* Mobile accordion fallback */}
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
