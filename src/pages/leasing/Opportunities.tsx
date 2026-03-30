import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import towerAerial from "@/assets/tower-aerial.png";
import skylineParkPanorama from "@/assets/skyline-park-panorama.jpg";
import cityViewInterior from "@/assets/city-view-interior.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerAerialBalcony from "@/assets/tower-aerial-balcony.jpg";
import officeCorridor from "@/assets/office-corridor.jpg";
import towerTopClouds from "@/assets/tower-top-clouds.png";

interface OpportunitySection {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
}

const scrollSections: OpportunitySection[] = [
  {
    id: "executive",
    title: { en: "EXECUTIVE\nSUITE", ar: "الجناح\nالتنفيذي" },
    description: {
      en: "250–500 sqm corner positions with panoramic Gulf views, private reception areas, and direct elevator access. Ideal for C-suite teams, family offices, and boutique financial firms seeking prestige and privacy.",
      ar: "مواقع ركنية من ٢٥٠ إلى ٥٠٠ متر مربع مع إطلالات بانورامية على الخليج ومناطق استقبال خاصة ووصول مباشر للمصاعد."
    },
    image: cityViewInterior,
  },
  {
    id: "full-floor",
    title: { en: "FULL FLOOR\nOCCUPANCY", ar: "إشغال\nالطابق الكامل" },
    description: {
      en: "1,200–1,800 sqm column-free floor plates offering complete operational autonomy. Dedicated elevator lobbies and bespoke reception design create a seamless branded experience from arrival to workspace.",
      ar: "طوابق خالية من الأعمدة من ١,٢٠٠ إلى ١,٨٠٠ متر مربع توفر استقلالية تشغيلية كاملة. ردهات مصاعد مخصصة وتصميم استقبال حسب الطلب."
    },
    image: officeCorridor,
  },
  {
    id: "campus",
    title: { en: "CORPORATE\nCAMPUS", ar: "الحرم\nالمؤسسي" },
    description: {
      en: "3,000+ sqm across multiple contiguous floors. Branded entrances, dedicated engineering support, and the infrastructure to create a vertical campus within Kuwait's tallest building.",
      ar: "أكثر من ٣,٠٠٠ متر مربع عبر طوابق متعددة متجاورة. مداخل تحمل العلامة التجارية ودعم هندسي مخصص والبنية التحتية لإنشاء حرم عمودي."
    },
    image: interiorLobby,
  },
  {
    id: "views",
    title: { en: "PANORAMIC\nWORKSPACES", ar: "مساحات عمل\nبانورامية" },
    description: {
      en: "Floor-to-ceiling glazing on three sides floods every workspace with natural light. 3.2-meter ceiling heights and column-free layouts provide the spatial freedom to design environments that inspire.",
      ar: "زجاج من الأرض للسقف على ثلاثة جوانب يغمر كل مساحة عمل بالضوء الطبيعي. ارتفاعات سقف ٣.٢ متر وتخطيطات خالية من الأعمدة توفر حرية مكانية."
    },
    image: skylineParkPanorama,
  },
  {
    id: "finishes",
    title: { en: "PREMIUM\nFINISHES", ar: "تشطيبات\nمتميزة" },
    description: {
      en: "High-end materials and finishes throughout common areas and tenant spaces. From the Jura limestone lobby to the serviced corridors, every touchpoint reflects the tower's commitment to quality.",
      ar: "مواد وتشطيبات عالية الجودة في جميع المناطق المشتركة ومساحات المستأجرين. من ردهة الحجر الجيري الجوراسي إلى الممرات المخدومة، كل نقطة تماس تعكس الجودة."
    },
    image: towerAerialBalcony,
  },
  {
    id: "infrastructure",
    title: { en: "ENTERPRISE\nINFRASTRUCTURE", ar: "البنية التحتية\nللمؤسسات" },
    description: {
      en: "Fiber-optic connectivity, integrated BMS, multi-carrier access, and 24/7 engineering support. The building operates as a fully managed environment — every system calibrated for enterprise demands.",
      ar: "اتصال بالألياف الضوئية ونظام إدارة مبانٍ متكامل ووصول متعدد للمزودين ودعم هندسي على مدار الساعة. المبنى يعمل كبيئة مُدارة بالكامل."
    },
    image: towerTopClouds,
  },
];

const LeasingOpportunities = () => {
  const { language, t } = useLanguage();
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="pt-8 lg:pt-16 pb-16 lg:pb-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">
                {isEn ? "OPPORTUNITIES" : "الفرص"}
              </span>
              <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-5xl">
                {isEn
                  ? "Flexible Configurations For Every Scale Of Enterprise."
                  : "تكوينات مرنة لكل حجم من المؤسسات."}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Hero image */}
        <section className="pb-8">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[21/9] overflow-hidden"
            >
              <img src={towerAerial} alt="Al Hamra Tower" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg lg:text-xl text-foreground leading-relaxed max-w-3xl"
            >
              {isEn
                ? "From executive suites to multi-floor corporate campuses, Al Hamra Tower offers column-free floor plates, premium finishes, and enterprise-grade infrastructure — all within Kuwait's most recognized business address."
                : "من الأجنحة التنفيذية إلى الحرم المؤسسي متعدد الطوابق، يقدم برج الحمراء طوابق خالية من الأعمدة وتشطيبات متميزة وبنية تحتية بمستوى المؤسسات."}
            </motion.p>
          </div>
        </section>

        {/* Scroll-driven sections */}
        <section className="bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="py-16 lg:py-20">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
                {isEn ? "SPACE TYPES" : "أنواع المساحات"}
              </span>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                {isEn
                  ? "Six categories of workspace — each designed to accommodate a different scale and style of enterprise operation."
                  : "ست فئات من مساحات العمل — كل منها مصمم لاستيعاب حجم ونمط مختلف من العمليات المؤسسية."}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
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
        </section>

        {/* Stats bar */}
        <section className="bg-foreground">
          <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
              {[
                { value: "3.2m", label: isEn ? "Ceiling Height" : "ارتفاع السقف" },
                { value: "1,800m²", label: isEn ? "Max Floor Plate" : "أقصى مساحة طابق" },
                { value: "95%", label: isEn ? "Occupancy Rate" : "نسبة الإشغال" },
                { value: "50+", label: isEn ? "Tenant Companies" : "شركة مستأجرة" },
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
        </section>

        {/* Gallery */}
        <section className="py-4 bg-background">
          <div ref={galleryRef} className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { img: officeCorridor, span: "" },
                { img: cityViewInterior, span: "" },
                { img: interiorLobby, span: "" },
                { img: skylineParkPanorama, span: "lg:col-span-2" },
                { img: towerTopClouds, span: "" },
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
                    alt="Al Hamra workspace"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
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

export default LeasingOpportunities;
