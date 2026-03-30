import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import lobbyInterior from "@/assets/interior-lobby.jpg";
import towerEntranceFountain from "@/assets/tower-entrance-fountain.jpg";
import towerEntranceNight from "@/assets/tower-entrance-night.jpg";
import towerBwDetail from "@/assets/tower-bw-detail.png";
import kuwaitHorizon from "@/assets/kuwait-horizon.png";
import somLobby from "@/assets/som-lobby.jpg";
import entranceDusk from "@/assets/entrance-dusk.jpg";
import towerAerialDay from "@/assets/tower-aerial-day.png";

interface ServiceScrollSection {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
}

const scrollSections: ServiceScrollSection[] = [
  {
    id: "electrical",
    title: { en: "ELECTRICAL\nSYSTEMS", ar: "الأنظمة\nالكهربائية" },
    description: {
      en: "Five dedicated substations distributed across basement, lower, mid, and upper tower levels deliver uninterrupted power. Full generator redundancy ensures zero-downtime continuity for every tenanted floor.",
      ar: "خمس محطات فرعية مخصصة موزعة عبر الطوابق السفلية والوسطى والعلوية توفر طاقة متواصلة مع نسخ احتياطي كامل بالمولدات."
    },
    image: towerBwDetail,
  },
  {
    id: "hvac",
    title: { en: "AIR CONDITIONING\n& HVAC", ar: "التكييف\nوالتهوية" },
    description: {
      en: "District-cooled chilled water system paired with variable air volume units on every floor. Individual zone control allows tenants to regulate temperature independently while the central plant maintains peak efficiency.",
      ar: "نظام تبريد مركزي بالمياه المبردة مع وحدات حجم هواء متغيرة في كل طابق. تحكم مستقل بالمناطق لكل مستأجر."
    },
    image: lobbyInterior,
  },
  {
    id: "ict",
    title: { en: "ICT &\nTELECOMMUNICATIONS", ar: "تكنولوجيا المعلومات\nوالاتصالات" },
    description: {
      en: "Fiber-optic backbone with structured cabling to every floor. Multiple carrier access, dedicated server rooms, and a centralized Building Management System connected via high-speed data networks.",
      ar: "بنية تحتية من الألياف الضوئية مع كابلات منظمة لكل طابق. وصول متعدد لمزودي الخدمة وغرف خوادم مخصصة ونظام إدارة مبانٍ مركزي."
    },
    image: somLobby,
  },
  {
    id: "security",
    title: { en: "SECURITY &\nACCESS CONTROL", ar: "الأمن والتحكم\nبالدخول" },
    description: {
      en: "Round-the-clock manned security complemented by CCTV surveillance across all floors, lobbies, and parking levels. Smart card access, visitor management protocols, and direct coordination with civil defense authorities.",
      ar: "أمن على مدار الساعة مع كاميرات مراقبة في جميع الطوابق والردهات والمواقف. بطاقات دخول ذكية وبروتوكولات إدارة الزوار."
    },
    image: towerEntranceNight,
  },
  {
    id: "fire-safety",
    title: { en: "FIRE &\nLIFE SAFETY", ar: "السلامة\nمن الحرائق" },
    description: {
      en: "Siemens FireFinder XLSV system with dedicated refuge floors at Levels 29 and 54. Pressurized stairwells, sprinkler coverage on every floor, and annual civil defense drills.",
      ar: "نظام سيمنز للكشف عن الحرائق مع طوابق إيواء مخصصة وسلالم مضغوطة ورشاشات في كل طابق وتدريبات دفاع مدني سنوية."
    },
    image: entranceDusk,
  },
  {
    id: "medical",
    title: { en: "ON-SITE\nMEDICAL ROOM", ar: "غرفة طبية\nداخلية" },
    description: {
      en: "A fully equipped medical room staffed during business hours, with first-aid capabilities and emergency response coordination. Defibrillators stationed at key points across the tower.",
      ar: "غرفة طبية مجهزة بالكامل مع طاقم خلال ساعات العمل وقدرات إسعافات أولية وتنسيق استجابة طوارئ."
    },
    image: kuwaitHorizon,
  },
  {
    id: "maintenance",
    title: { en: "PREVENTIVE\nMAINTENANCE", ar: "الصيانة\nالوقائية" },
    description: {
      en: "Scheduled maintenance programs for all mechanical, electrical, and plumbing systems. Dedicated engineering teams ensure equipment longevity and minimize unplanned downtime across all 77 floors.",
      ar: "برامج صيانة مجدولة لجميع الأنظمة الميكانيكية والكهربائية والسباكة مع فرق هندسية مخصصة لضمان عمر المعدات."
    },
    image: towerEntranceFountain,
  },
  {
    id: "parking",
    title: { en: "VALET &\nPARKING", ar: "خدمة صف\nالسيارات" },
    description: {
      en: "2,000+ spaces across 11 levels with VIP drop-off and valet service. Professional daily cleaning of tenanted floors and common areas. Centralized service desk for all maintenance requests with tracked response times.",
      ar: "أكثر من ٢,٠٠٠ مكان عبر ١١ طابقاً مع خدمة صف سيارات VIP. تنظيف يومي احترافي للطوابق المستأجرة والمناطق المشتركة."
    },
    image: towerAerialDay,
  },
];

const ServicesSection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  const { ref: heroRef, isInView: heroInView } = useScrollReveal();
  const { ref: galleryRef, isInView: galleryInView } = useScrollReveal();

  return (
    <section className="bg-background relative">
      {/* Hero */}
      <div className="pt-8 lg:pt-16 pb-16 lg:pb-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">
              {isEn ? "24/7 OPERATIONS" : "عمليات على مدار الساعة"}
            </span>
            <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-4xl">
              {isEn
                ? "Services & Facilities Built For Continuous Excellence."
                : "خدمات ومرافق مبنية للتميز المستمر."}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Dual hero images */}
      <div className="pb-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[16/9] overflow-hidden group relative"
            >
              <img src={towerEntranceFountain} alt="Tower entrance" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{isEn ? "Grand Arrival" : "الوصول الكبير"}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="aspect-[16/9] overflow-hidden group relative"
            >
              <img src={towerEntranceNight} alt="Tower at night" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{isEn ? "Evening Operations" : "العمليات المسائية"}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg lg:text-xl text-foreground leading-relaxed max-w-3xl"
          >
            {isEn
              ? "Al Hamra Tower operates as a fully managed environment. A resident engineering and facilities team delivers round-the-clock support across every building system — from power distribution and climate control to security, telecommunications, and emergency response."
              : "يعمل برج الحمراء كبيئة مُدارة بالكامل. يقدم فريق هندسي ومرافق مقيم دعماً على مدار الساعة عبر جميع أنظمة المبنى."}
          </motion.p>
        </div>
      </div>

      {/* Scroll-driven sections */}
      <div className="bg-background border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="py-16 lg:py-20">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
              {isEn ? "CORE SYSTEMS" : "الأنظمة الأساسية"}
            </span>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
              {isEn
                ? "Eight principal systems form the operational backbone of the tower, each monitored and maintained around the clock by dedicated engineering personnel."
                : "ثمانية أنظمة رئيسية تشكل العمود الفقري التشغيلي للبرج، كل منها يُراقب ويُصان على مدار الساعة."}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: scroll titles */}
            <div className="space-y-0">
              {scrollSections.map((section, index) => (
                <div
                  key={section.id}
                  ref={(el) => { sectionRefs.current[index] = el; }}
                  className="py-12 lg:py-20 border-t border-border first:border-t-0 cursor-pointer"
                  onClick={() => {
                    setActiveIndex(index);
                    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                >
                  <h3
                    className={`text-[clamp(1.8rem,3.5vw,3.5rem)] font-sans font-medium uppercase leading-[1.1] tracking-[-0.01em] whitespace-pre-line transition-colors duration-500 ${
                      activeIndex === index ? "text-foreground" : "text-muted-foreground/30"
                    }`}
                  >
                    {section.title[language]}
                  </h3>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="lg:hidden overflow-hidden"
                      >
                        <p className="text-sm text-muted-foreground leading-relaxed mt-6 max-w-md">
                          {section.description[language]}
                        </p>
                        <div className="aspect-[16/10] overflow-hidden mt-6">
                          <img src={section.image} alt={section.title.en} className="w-full h-full object-cover" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right: sticky panel */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
                      {scrollSections[activeIndex].description[language]}
                    </p>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={scrollSections[activeIndex].image}
                        alt={scrollSections[activeIndex].title.en}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-foreground">
        <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
            {[
              { value: "5", label: isEn ? "Substations" : "محطات فرعية" },
              { value: "2,000+", label: isEn ? "Parking Spaces" : "مكان وقوف" },
              { value: "24/7", label: isEn ? "Operations" : "العمليات" },
              { value: "365", label: isEn ? "Days / Year" : "يوم / سنة" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-3xl lg:text-4xl font-sans font-light text-background mb-1">{stat.value}</p>
                <p className="text-sm text-background/50 tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Staggered Gallery */}
      <div className="py-4 bg-background">
        <div ref={galleryRef} className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { img: lobbyInterior, span: "" },
              { img: towerEntranceFountain, span: "" },
              { img: towerBwDetail, span: "" },
              { img: entranceDusk, span: "lg:col-span-2" },
              { img: kuwaitHorizon, span: "" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`overflow-hidden aspect-[4/3] ${item.span}`}
              >
                <img
                  src={item.img}
                  alt="Al Hamra Services"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
