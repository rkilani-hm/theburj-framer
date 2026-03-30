import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import towerAerial from "@/assets/tower-aerial.png";
import skylineParkPanorama from "@/assets/skyline-park-panorama.jpg";
import cityViewInterior from "@/assets/city-view-interior.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerAerialBalcony from "@/assets/tower-aerial-balcony.jpg";
import officeCorridor from "@/assets/office-corridor.jpg";
import cityLandscape from "@/assets/city-landscape.jpg";
import towerTopClouds from "@/assets/tower-top-clouds.png";

interface LeasingSection {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
}

const scrollSections: LeasingSection[] = [
  {
    id: "executive",
    title: { en: "EXECUTIVE\nSUITES", ar: "الأجنحة\nالتنفيذية" },
    description: {
      en: "250–500 sqm corner offices with panoramic Gulf views and private reception areas. Designed for leadership teams seeking prestige, privacy, and proximity to Kuwait's most influential decision-makers.",
      ar: "أجنحة ركنية من ٢٥٠ إلى ٥٠٠ متر مربع مع إطلالات بانورامية على الخليج ومناطق استقبال خاصة. مصممة لفرق القيادة التي تسعى للمكانة والخصوصية."
    },
    image: cityViewInterior,
  },
  {
    id: "full-floor",
    title: { en: "FULL FLOOR\nHEADQUARTERS", ar: "مقرات\nالطابق الكامل" },
    description: {
      en: "1,200–1,800 sqm column-free floor plates with dedicated elevator access and bespoke reception lobbies. Complete operational autonomy within Kuwait's most prestigious address.",
      ar: "طوابق خالية من الأعمدة من ١,٢٠٠ إلى ١,٨٠٠ متر مربع مع وصول مخصص للمصاعد وردهات استقبال مخصصة. استقلالية تشغيلية كاملة في أرقى عنوان في الكويت."
    },
    image: officeCorridor,
  },
  {
    id: "corporate",
    title: { en: "MULTI-FLOOR\nCAMPUS", ar: "حرم متعدد\nالطوابق" },
    description: {
      en: "3,000+ sqm across multiple contiguous floors with branded entrances, dedicated services, and the flexibility to create a vertical corporate campus within the tower.",
      ar: "أكثر من ٣,٠٠٠ متر مربع عبر طوابق متعددة متجاورة مع مداخل تحمل العلامة التجارية وخدمات مخصصة ومرونة لإنشاء حرم مؤسسي عمودي."
    },
    image: interiorLobby,
  },
  {
    id: "views",
    title: { en: "PANORAMIC\nVIEWS", ar: "إطلالات\nبانورامية" },
    description: {
      en: "360-degree views of Kuwait City and the Arabian Gulf from upper floors. Floor-to-ceiling glazing floods every workspace with natural light while 3.2-meter ceiling heights create an atmosphere of openness.",
      ar: "إطلالات ٣٦٠ درجة على مدينة الكويت والخليج العربي من الطوابق العلوية. زجاج من الأرض للسقف يغمر كل مساحة عمل بالضوء الطبيعي مع ارتفاعات سقف ٣.٢ متر."
    },
    image: skylineParkPanorama,
  },
  {
    id: "smart",
    title: { en: "SMART\nBUILDING", ar: "مبنى\nذكي" },
    description: {
      en: "Integrated building management systems for maximum efficiency. Fiber-optic backbone, multi-carrier access, 24/7 engineering support, and premium finishes throughout — infrastructure calibrated for enterprise demands.",
      ar: "أنظمة إدارة مبانٍ متكاملة لأقصى كفاءة. بنية تحتية من الألياف الضوئية ووصول متعدد للمزودين ودعم هندسي على مدار الساعة وتشطيبات متميزة."
    },
    image: towerAerialBalcony,
  },
  {
    id: "address",
    title: { en: "KUWAIT'S PREMIER\nBUSINESS ADDRESS", ar: "أرقى عنوان\nأعمال في الكويت" },
    description: {
      en: "An address that signals prestige, stability, and forward-thinking vision. Direct access to transportation networks, proximity to government institutions, and the Al Hamra Shopping Center at the base.",
      ar: "عنوان يشير إلى المكانة والاستقرار والرؤية المستقبلية. وصول مباشر لشبكات النقل والقرب من المؤسسات الحكومية ومركز الحمراء التجاري في القاعدة."
    },
    image: towerTopClouds,
  },
];

const Leasing = () => {
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
                {isEn ? "LEASING" : "التأجير"}
              </span>
              <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-5xl">
                {isEn
                  ? "Workspace Configurations Designed To Match Your Ambition."
                  : "تكوينات مساحات عمل مصممة لتتناسب مع طموحك."}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Panoramic hero */}
        <section className="pb-8">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[21/9] overflow-hidden"
            >
              <img src={towerAerial} alt="Al Hamra Tower aerial" className="w-full h-full object-cover" />
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
                ? "Whether you're seeking an executive suite for a growing team or full-floor headquarters for an established enterprise, Al Hamra Tower offers configurations to match every scale of ambition — from boutique operations to multinational headquarters."
                : "سواء كنت تبحث عن جناح تنفيذي لفريق متنامٍ أو مقر طابق كامل لمؤسسة راسخة، يقدم برج الحمراء تكوينات تتناسب مع كل مستوى من الطموح."}
            </motion.p>
          </div>
        </section>

        {/* Scroll-driven sections */}
        <section className="bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="py-16 lg:py-20">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
                {isEn ? "CONFIGURATIONS" : "التكوينات"}
              </span>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                {isEn
                  ? "Six dimensions of the Al Hamra leasing experience — from flexible floor plans and panoramic workspaces to smart building infrastructure and Kuwait's most prestigious business address."
                  : "ستة أبعاد لتجربة تأجير الحمراء — من المخططات المرنة ومساحات العمل البانورامية إلى البنية التحتية الذكية وأرقى عنوان أعمال في الكويت."}
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
                { value: "360°", label: isEn ? "Panoramic Views" : "إطلالات بانورامية" },
                { value: "77", label: isEn ? "Office Floors" : "طابق مكتبي" },
                { value: "24/7", label: isEn ? "Building Services" : "خدمات المبنى" },
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
                { img: towerTopClouds, span: "" },
                { img: cityLandscape, span: "lg:col-span-2" },
                { img: towerAerialBalcony, span: "" },
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
                    alt="Al Hamra leasing"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-sans font-medium uppercase text-foreground mb-6">
                {t("leasing.cta.title") || (isEn ? "Ready to Elevate Your Business?" : "مستعد للارتقاء بأعمالك؟")}
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                {t("leasing.cta.desc") || (isEn ? "Contact our leasing team for detailed floor plans and specifications." : "تواصل مع فريق التأجير لدينا للحصول على مخططات وتفاصيل تفصيلية.")}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300 text-sm uppercase tracking-[0.15em]"
              >
                {t("leasing.cta.button") || (isEn ? "Contact Us" : "تواصل معنا")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Leasing;
