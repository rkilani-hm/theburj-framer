import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import towerNight from "@/assets/tower-night-illuminated.jpg";
import towerTopClouds from "@/assets/tower-top-clouds.png";
import skylineHero from "@/assets/skyline-hero.jpg";
import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import towerBw1 from "@/assets/tower-bw-1.png";
import towerFogNight from "@/assets/tower-fog-night.png";
import towerAerialSunset from "@/assets/tower-aerial-sunset.png";
import towerCloudsAerial from "@/assets/tower-clouds-aerial.png";

interface RecognitionSection {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
}

const scrollSections: RecognitionSection[] = [
  {
    id: "ctbuh",
    title: { en: "CTBUH BEST\nTALL BUILDING", ar: "أفضل مبنى شاهق\nCTBUH" },
    description: {
      en: "In 2012, the Council on Tall Buildings and Urban Habitat recognized Al Hamra Tower as the Best Tall Building in the Middle East & Africa — acknowledging its pioneering approach to sculpted high-rise design and climate-responsive architecture.",
      ar: "في ٢٠١٢، اعترف مجلس المباني الشاهقة والموئل الحضري ببرج الحمراء كأفضل مبنى شاهق في الشرق الأوسط وأفريقيا — تقديراً لنهجه الرائد في تصميم ناطحات السحاب المنحوتة."
    },
    image: towerNight,
  },
  {
    id: "iabse",
    title: { en: "IABSE OUTSTANDING\nSTRUCTURE", ar: "الهيكل المتميز\nIABSE" },
    description: {
      en: "The International Association for Bridge and Structural Engineering honored the tower in 2014 with its Outstanding Structure Award — recognizing the unprecedented engineering solutions required for the hyperbolic paraboloid walls and torsional gravity response.",
      ar: "كرّمت الرابطة الدولية لهندسة الجسور والهياكل البرج في ٢٠١٤ بجائزة الهيكل المتميز — تقديراً للحلول الهندسية غير المسبوقة."
    },
    image: towerTopClouds,
  },
  {
    id: "asce",
    title: { en: "ASCE EXCELLENCE\nIN ENGINEERING", ar: "تميز ASCE\nفي الهندسة" },
    description: {
      en: "The American Society of Civil Engineers recognized the tower's structural innovation in 2015 — particularly the development of four parallel 3D finite element analysis models and the creep compatibility analysis that resolved the tower's unique torsional behavior.",
      ar: "اعترفت الجمعية الأمريكية للمهندسين المدنيين بالابتكار الهيكلي للبرج في ٢٠١٥ — خاصة تطوير أربعة نماذج تحليل عناصر محدودة ثلاثية الأبعاد متوازية."
    },
    image: somTowerSkyline,
  },
  {
    id: "research",
    title: { en: "CTBUH\nRESEARCH PAPER", ar: "ورقة بحثية\nCTBUH" },
    description: {
      en: "\"Sculpted High Rise: The Al Hamra Tower\" — presented at the Structural Engineers World Congress 2007 by Mark Sarkisian, Neville Mathias, and Aaron Mazeika of SOM. The paper demonstrated how parametric 3D modeling could resolve free-form design at super high-rise scale.",
      ar: "\"ناطحة سحاب منحوتة: برج الحمراء\" — قُدمت في المؤتمر العالمي للمهندسين الإنشائيين ٢٠٠٧. أوضحت الورقة كيف يمكن للنمذجة البارامترية ثلاثية الأبعاد حل التصميم الحر."
    },
    image: towerCloudsAerial,
  },
  {
    id: "sustainable",
    title: { en: "SUSTAINABLE\nDESIGN", ar: "التصميم\nالمستدام" },
    description: {
      en: "The Middle East Architecture Awards recognized the tower's climate-responsive design in 2016 — the carved form acting as a passive solar shading device, reducing energy consumption while creating one of the most distinctive silhouettes in modern architecture.",
      ar: "كرّمت جوائز العمارة في الشرق الأوسط تصميم البرج المستجيب للمناخ في ٢٠١٦ — الشكل المنحوت يعمل كجهاز تظليل شمسي سلبي يقلل استهلاك الطاقة."
    },
    image: skylineHero,
  },
  {
    id: "decade",
    title: { en: "DECADE OF\nEXCELLENCE", ar: "عقد من\nالتميز" },
    description: {
      en: "The 2019 Gulf Construction Awards honored a decade of operational excellence — the tower's ongoing performance as a fully managed environment demonstrating that architectural ambition and engineering rigor can sustain greatness over time.",
      ar: "كرّمت جوائز البناء الخليجي ٢٠١٩ عقداً من التميز التشغيلي — أداء البرج المستمر كبيئة مُدارة بالكامل يثبت أن الطموح المعماري والصرامة الهندسية يمكن أن يحافظا على العظمة."
    },
    image: towerFogNight,
  },
];

const Recognition = () => {
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
                {isEn ? "RECOGNITION" : "التقدير"}
              </span>
              <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-5xl">
                {isEn
                  ? "Global Acknowledgement. Engineering And Design Excellence."
                  : "اعتراف عالمي. تميز في الهندسة والتصميم."}
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
              <img src={towerNight} alt="Al Hamra Tower at night" className="w-full h-full object-cover" />
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
                ? "Al Hamra Business Tower has been recognized by the world's leading architectural, structural, and sustainability institutions — affirming its engineering legacy and long-term presence on the global skyline."
                : "حظي برج الحمراء باعتراف من أبرز المؤسسات المعمارية والهيكلية والاستدامة في العالم — مؤكداً إرثه الهندسي وحضوره الدائم على الأفق العالمي."}
            </motion.p>
          </div>
        </section>

        {/* Scroll-driven sections */}
        <section className="bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="py-16 lg:py-20">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
                {isEn ? "AWARDS & HONORS" : "الجوائز والتكريمات"}
              </span>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                {isEn
                  ? "Six milestones of global recognition — from the CTBUH Best Tall Building award to a decade of operational excellence."
                  : "ست محطات من الاعتراف العالمي — من جائزة أفضل مبنى شاهق من CTBUH إلى عقد من التميز التشغيلي."}
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
                { value: "23rd", label: isEn ? "Tallest at Completion" : "الأطول عند الإنجاز" },
                { value: "#1", label: isEn ? "Tallest Sculpted Tower" : "أطول برج منحوت" },
                { value: "6+", label: isEn ? "International Awards" : "جوائز دولية" },
                { value: "4", label: isEn ? "Analysis Models" : "نماذج تحليل" },
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

        {/* Pull quote */}
        <section className="py-24 lg:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-xl lg:text-2xl font-light leading-relaxed text-foreground italic mb-8"
            >
              {isEn
                ? "\"The design and construction of the Al Hamra Tower is a significant step forward both in terms of architectural design form and process. By blending conventional engineering tools with parametric modeling software, SOM has brought together the realms of free-form design and the super high-rise skyscraper.\""
                : "\"يمثل تصميم وبناء برج الحمراء خطوة كبيرة إلى الأمام من حيث شكل التصميم المعماري والعملية. من خلال مزج أدوات الهندسة التقليدية مع برامج النمذجة البارامترية، جمعت SOM بين عوالم التصميم الحر وناطحة السحاب فائقة الارتفاع.\""}
            </motion.blockquote>
            <p className="text-sm text-muted-foreground">
              — CTBUH Research Paper, Structural Engineers World Congress 2007
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-4 bg-background">
          <div ref={galleryRef} className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { img: towerBw1, span: "" },
                { img: skylineHero, span: "" },
                { img: towerTopClouds, span: "" },
                { img: towerAerialSunset, span: "lg:col-span-2" },
                { img: towerCloudsAerial, span: "" },
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
                    alt="Al Hamra Tower"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaborators */}
        <section className="py-24 lg:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-16 block">
              {isEn ? "PROJECT COLLABORATORS" : "المتعاونون في المشروع"}
            </span>
            <div className="divide-y divide-border">
              {[
                { name: "Skidmore, Owings & Merrill (SOM)", role: isEn ? "Lead Architect & Structural Engineer" : "المهندس المعماري الرئيسي" },
                { name: "VDA", role: isEn ? "Associate Architect" : "المهندس المعماري المشارك" },
                { name: "Gehry Technologies", role: isEn ? "Digital Project Software" : "برنامج المشروع الرقمي" },
                { name: "Ahmadiah Contracting & Trading Co. KCSC", role: isEn ? "General Contractor" : "المقاول العام" },
              ].map((collab, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <span className="text-foreground">{collab.name}</span>
                  <span className="text-sm text-muted-foreground">{collab.role}</span>
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

export default Recognition;
