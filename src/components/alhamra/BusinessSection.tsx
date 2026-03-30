import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";

import cityViewInterior from "@/assets/city-view-interior.jpg";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import cityLandscape from "@/assets/city-landscape.jpg";
import skylineParkPanorama from "@/assets/skyline-park-panorama.jpg";
import towerKuwaitTowers from "@/assets/tower-kuwait-towers.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import officeCorridor from "@/assets/office-corridor.jpg";
import interiorOffice from "@/assets/interior-office.jpg";
import towerAerialSunset from "@/assets/tower-aerial-sunset.png";

interface BusinessScrollSection {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
}

const scrollSections: BusinessScrollSection[] = [
  {
    id: "premium-offices",
    title: { en: "PREMIUM\nOFFICE SPACES", ar: "مساحات\nمكتبية متميزة" },
    description: {
      en: "Column-free floor plates spanning up to 1,000 sqm with 3.2-meter ceiling heights. Floor-to-ceiling glazing delivers panoramic Gulf views while high-performance solar control maintains comfort and efficiency.",
      ar: "طوابق خالية من الأعمدة تمتد حتى ١,٠٠٠ متر مربع مع ارتفاعات سقف ٣.٢ متر. زجاج من الأرض للسقف يوفر إطلالات بانورامية على الخليج مع تحكم شمسي عالي الأداء."
    },
    image: cityViewInterior,
  },
  {
    id: "business-environment",
    title: { en: "ENTERPRISE\nENVIRONMENT", ar: "بيئة\nالأعمال" },
    description: {
      en: "A curated tenant roster of regional headquarters and multinational corporations. The building's prestige attracts companies that value proximity to decision-makers, creating a self-reinforcing ecosystem of influence.",
      ar: "قائمة مستأجرين منتقاة من المقرات الإقليمية والشركات متعددة الجنسيات. يجذب البرج الشركات التي تقدر القرب من صناع القرار، مما يخلق منظومة تأثير ذاتية التعزيز."
    },
    image: interiorOffice,
  },
  {
    id: "infrastructure",
    title: { en: "DIGITAL\nINFRASTRUCTURE", ar: "البنية التحتية\nالرقمية" },
    description: {
      en: "Fiber-optic backbone with structured cabling to every floor. Multiple carrier access, dedicated server rooms, and a centralized Building Management System ensure enterprise-grade connectivity at every level.",
      ar: "بنية تحتية من الألياف الضوئية مع كابلات منظمة لكل طابق. وصول متعدد لمزودي الخدمة وغرف خوادم مخصصة ونظام إدارة مبانٍ مركزي يضمن اتصالاً بمستوى المؤسسات."
    },
    image: lobbyArches,
  },
  {
    id: "support",
    title: { en: "DEDICATED\nSUPPORT", ar: "دعم\nمخصص" },
    description: {
      en: "Resident engineering and facilities teams deliver round-the-clock building services. From concierge and reception to help desk dispatch, every operational need is anticipated and addressed with precision.",
      ar: "فرق هندسية ومرافق مقيمة تقدم خدمات المبنى على مدار الساعة. من الكونسيرج والاستقبال إلى إرسال مكتب المساعدة، كل حاجة تشغيلية يتم توقعها ومعالجتها بدقة."
    },
    image: officeCorridor,
  },
  {
    id: "connectivity",
    title: { en: "GLOBAL\nCONNECTIVITY", ar: "اتصال\nعالمي" },
    description: {
      en: "Direct access to major transportation networks and proximity to government institutions. The Al Hamra Shopping Center at the base creates a complete lifestyle ecosystem for tenants and their teams.",
      ar: "وصول مباشر لشبكات النقل الرئيسية والقرب من المؤسسات الحكومية. يخلق مركز الحمراء التجاري في القاعدة منظومة نمط حياة متكاملة للمستأجرين وفرقهم."
    },
    image: skylineParkPanorama,
  },
  {
    id: "security",
    title: { en: "ENTERPRISE\nSECURITY", ar: "أمن\nالمؤسسات" },
    description: {
      en: "Multi-layer security systems with 24/7 monitoring. Smart card access control, CCTV surveillance across all floors, visitor management protocols, and direct coordination with civil defense authorities.",
      ar: "أنظمة أمنية متعددة الطبقات مع مراقبة على مدار الساعة. تحكم بالدخول ببطاقات ذكية ومراقبة بالكاميرات في جميع الطوابق وبروتوكولات إدارة الزوار."
    },
    image: towerKuwaitTowers,
  },
];

const BusinessSection = () => {
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
              {isEn ? "BUSINESS" : "الأعمال"}
            </span>
            <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-4xl">
              {isEn
                ? "Infrastructure Designed For Enterprise Excellence."
                : "بنية تحتية مصممة للتميز المؤسسي."}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Panoramic image */}
      <div className="pb-8">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[21/9] overflow-hidden"
          >
            <img src={towerAerialDay} alt="Al Hamra Tower aerial" className="w-full h-full object-cover" />
          </motion.div>
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
              ? "Every system engineered with purpose, every service calibrated for the demands of modern business. Al Hamra Tower hosts the headquarters of Kuwait's leading corporations and international enterprises."
              : "كل نظام مصمم بهدف، كل خدمة معايرة لمتطلبات الأعمال الحديثة. يستضيف برج الحمراء مقرات الشركات الرائدة في الكويت والمؤسسات الدولية."}
          </motion.p>
        </div>
      </div>

      {/* Scroll-driven sections */}
      <div className="bg-background border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="py-16 lg:py-20">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
              {isEn ? "THE ECOSYSTEM" : "المنظومة"}
            </span>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
              {isEn
                ? "Six pillars define the Al Hamra business experience — from premium workspaces and digital infrastructure to enterprise-grade security and dedicated support."
                : "ستة ركائز تحدد تجربة أعمال الحمراء — من المساحات المكتبية المتميزة والبنية التحتية الرقمية إلى الأمن على مستوى المؤسسات والدعم المخصص."}
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
              { value: "50+", label: isEn ? "Leading Companies" : "شركة رائدة" },
              { value: "95%", label: isEn ? "Occupancy Rate" : "نسبة الإشغال" },
              { value: "24/7", label: isEn ? "Operations" : "العمليات" },
              { value: "77", label: isEn ? "Office Floors" : "طابق مكتبي" },
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
              { img: lobbyArches, span: "" },
              { img: cityViewInterior, span: "" },
              { img: towerKuwaitTowers, span: "" },
              { img: officeCorridor, span: "lg:col-span-2" },
              { img: towerAerialSunset, span: "" },
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
                  alt="Al Hamra Business"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Address closing */}
      <div className="py-24 lg:py-32 bg-background border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-16 block">
            {isEn ? "A GLOBAL ADDRESS" : "عنوان عالمي"}
          </span>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg text-foreground leading-relaxed"
              >
                {isEn
                  ? "Al Hamra Tower hosts the headquarters of Kuwait's leading corporations and international enterprises. The address signals prestige, stability, and forward-thinking vision."
                  : "يستضيف برج الحمراء مقرات الشركات الرائدة في الكويت والمؤسسات الدولية. العنوان يشير إلى المكانة والاستقرار والرؤية المستقبلية."}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-base text-muted-foreground leading-relaxed"
              >
                {isEn
                  ? "From financial services to technology companies, energy giants to consulting firms—Al Hamra Tower serves as the command center for enterprises that shape the region's economy."
                  : "من الخدمات المالية إلى شركات التكنولوجيا، عمالقة الطاقة إلى شركات الاستشارات—يعمل برج الحمراء كمركز قيادة للمؤسسات التي تشكل اقتصاد المنطقة."}
              </motion.p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="aspect-[3/4] overflow-hidden"
              >
                <img src={cityLandscape} alt="Kuwait city" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="aspect-[3/4] overflow-hidden mt-8"
              >
                <img src={skylineParkPanorama} alt="Skyline panorama" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
