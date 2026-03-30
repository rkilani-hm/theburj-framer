import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import somTowerVertical from "@/assets/som-tower-vertical.jpg";
import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import towerSunset from "@/assets/tower-sunset.png";
import towerNightIlluminated from "@/assets/tower-night-illuminated.jpg";
import towerCloudsAerial from "@/assets/tower-clouds-aerial.png";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import towerTopClouds from "@/assets/tower-top-clouds.png";
import towerBw1 from "@/assets/tower-bw-1.png";
import towerFogNight from "@/assets/tower-fog-night.png";
import towerAerialSunset from "@/assets/tower-aerial-sunset.png";

interface TowerScrollSection {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
}

const scrollSections: TowerScrollSection[] = [
  {
    id: "apex",
    title: { en: "THE APEX\n412 METERS", ar: "القمة\n٤١٢ متر" },
    description: {
      en: "Kuwait's tallest structure rises 412 meters above the Sharq district. The crown features the distinctive carved geometry that defines Al Hamra's silhouette against the Arabian Gulf skyline — a beacon visible from every direction.",
      ar: "أطول مبنى في الكويت يرتفع ٤١٢ متراً فوق حي الشرق. يتميز التاج بالهندسة المنحوتة المميزة التي تحدد صورة الحمراء على أفق الخليج العربي."
    },
    image: somTowerVertical,
  },
  {
    id: "form",
    title: { en: "SCULPTED\nFORM", ar: "الشكل\nالمنحوت" },
    description: {
      en: "The tower's asymmetrical, carved profile responds directly to solar exposure. A quarter of each floor plate is strategically removed, creating a 60° twist from base to crown — the world's tallest sculpted tower.",
      ar: "يستجيب الشكل المنحوت غير المتماثل للبرج مباشرة للتعرض الشمسي. تتم إزالة ربع كل طابق بشكل استراتيجي، مما يخلق لفة بـ ٦٠ درجة من القاعدة إلى القمة."
    },
    image: towerSunset,
  },
  {
    id: "lobby",
    title: { en: "GRAND\nLOBBY", ar: "الردهة\nالكبرى" },
    description: {
      en: "A 24-meter-high column-free lobby establishes immediate presence. The grand space extends from the core to the perimeter frame, its dramatic scale and carefully orchestrated light creating an arrival experience befitting Kuwait's tallest building.",
      ar: "ردهة خالية من الأعمدة بارتفاع ٢٤ متراً تحقق حضوراً فورياً. يمتد الفراغ الكبير من القلب إلى الإطار المحيطي، بمقياسه الدرامي وإضاءته المنسقة بعناية."
    },
    image: lobbyArches,
  },
  {
    id: "engineering",
    title: { en: "STRUCTURAL\nINNOVATION", ar: "الابتكار\nالهيكلي" },
    description: {
      en: "Two reinforced-concrete hyperbolic paraboloid walls extend the full 412m height. SOM pioneered parametric 3D modeling to resolve the complex torsional gravity response — a breakthrough in super high-rise engineering.",
      ar: "جداران من الخرسانة المسلحة بشكل قطع مكافئ زائد يمتدان بالارتفاع الكامل ٤١٢ متر. كانت SOM رائدة في النمذجة البارامترية ثلاثية الأبعاد لحل استجابة الجاذبية الالتوائية المعقدة."
    },
    image: somTowerSkyline,
  },
  {
    id: "facade",
    title: { en: "LIMESTONE\n& GLASS", ar: "الحجر الجيري\nوالزجاج" },
    description: {
      en: "24,000 square meters of Jura limestone clad the solar-exposed south facade as a passive performance measure. Glass curtain walls on three sides frame sweeping Gulf vistas while solar control glazing maintains interior comfort.",
      ar: "٢٤,٠٠٠ متر مربع من حجر الجورا الجيري يكسو الواجهة الجنوبية المعرضة للشمس كإجراء أداء سلبي. جدران ستائرية زجاجية على ثلاثة جوانب تؤطر إطلالات الخليج الواسعة."
    },
    image: towerCloudsAerial,
  },
  {
    id: "recognition",
    title: { en: "GLOBAL\nRECOGNITION", ar: "الاعتراف\nالعالمي" },
    description: {
      en: "CTBUH Best Tall Building in the Middle East & Africa (2012). IABSE Outstanding Structure Award (2014). The tower pioneered parametric modeling in skyscraper design and inspired architects worldwide.",
      ar: "جائزة أفضل مبنى شاهق في الشرق الأوسط وأفريقيا من CTBUH (٢٠١٢). جائزة الهيكل المتميز من IABSE (٢٠١٤). كان البرج رائداً في النمذجة البارامترية في تصميم ناطحات السحاب."
    },
    image: towerNightIlluminated,
  },
];

const Tower = () => {
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
                {isEn ? "THE TOWER" : "البرج"}
              </span>
              <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-5xl">
                {isEn
                  ? "Kuwait's Tallest Sculpted Landmark. A Monument Of Ambition."
                  : "أطول معلم منحوت في الكويت. نصب الطموح."}
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
              <img src={towerAerialDay} alt="Al Hamra Tower aerial" className="w-full h-full object-cover" />
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
                ? "Al Hamra Tower rises 412 meters above Kuwait City — a sculpted form that responds to sun, wind, and environment. Designed by Skidmore, Owings & Merrill, every element serves both architectural vision and engineering purpose."
                : "يرتفع برج الحمراء ٤١٢ متراً فوق مدينة الكويت — شكل منحوت يستجيب للشمس والرياح والبيئة. صممته شركة سكيدمور، أوينغز وميريل، كل عنصر يخدم الرؤية المعمارية والغرض الهندسي."}
            </motion.p>
          </div>
        </section>

        {/* Scroll-driven sections */}
        <section className="bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="py-16 lg:py-20">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
                {isEn ? "EXPLORE" : "استكشف"}
              </span>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                {isEn
                  ? "Six defining aspects of Al Hamra Tower — from its commanding height and sculpted form to the engineering innovations that made it possible."
                  : "ستة جوانب محددة لبرج الحمراء — من ارتفاعه المهيمن وشكله المنحوت إلى الابتكارات الهندسية التي جعلته ممكناً."}
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
                { value: "412m", label: isEn ? "Height" : "الارتفاع" },
                { value: "74", label: isEn ? "Stories" : "طابق" },
                { value: "60°", label: isEn ? "Rotation" : "الدوران" },
                { value: "195,000m²", label: isEn ? "Gross Area" : "المساحة الإجمالية" },
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
                { img: towerBw1, span: "" },
                { img: towerTopClouds, span: "" },
                { img: somTowerSkyline, span: "" },
                { img: towerFogNight, span: "lg:col-span-2" },
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
                    alt="Al Hamra Tower"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards table */}
        <section className="py-24 lg:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-16 block">
              {isEn ? "RECOGNITION" : "التقدير"}
            </span>
            <div className="divide-y divide-border">
              {[
                { name: "CTBUH Best Tall Building", cat: isEn ? "Middle East & Africa" : "الشرق الأوسط وأفريقيا", year: "2012" },
                { name: "IABSE Outstanding Structure", cat: isEn ? "International" : "دولي", year: "2014" },
                { name: isEn ? "ASCE Excellence in Engineering" : "تميز ASCE في الهندسة", cat: isEn ? "Structural" : "هيكلي", year: "2015" },
                { name: isEn ? "Sustainable Design Recognition" : "تقدير التصميم المستدام", cat: isEn ? "Architecture" : "العمارة", year: "2016" },
                { name: isEn ? "Decade of Excellence" : "عقد من التميز", cat: isEn ? "Gulf Construction" : "البناء الخليجي", year: "2019" },
              ].map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-muted-foreground font-mono w-12">{award.year}</span>
                    <span className="text-foreground">{award.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground md:text-right">{award.cat}</span>
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

export default Tower;
