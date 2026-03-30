import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";

// Images
import kuwaitPanoramaSunset from "@/assets/kuwait-panorama-sunset.png";
import kuwaitCinemaHistoric from "@/assets/kuwait-cinema-historic.jpg";
import kuwaitSouqHistoric from "@/assets/kuwait-souq-historic.jpg";
import kuwaitCity1970s from "@/assets/kuwait-city-1970s.jpg";
import constructionFoundation from "@/assets/construction-foundation.jpg";
import constructionSteel from "@/assets/construction-steel.jpg";
import constructionFacade from "@/assets/construction-facade.jpg";
import towerSunset from "@/assets/tower-sunset.png";
import towerNightIlluminated from "@/assets/tower-night-illuminated.jpg";
import towerAerialSunset from "@/assets/tower-aerial-sunset.png";
import towerCloudsAerial from "@/assets/tower-clouds-aerial.png";
import towerTopClouds from "@/assets/tower-top-clouds.png";
import towerFogNight from "@/assets/tower-fog-night.png";
import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import towerBw1 from "@/assets/tower-bw-1.png";

interface RisingSection {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
}

const sections: RisingSection[] = [
  {
    id: "origins",
    title: { en: "ORIGINS &\nHERITAGE", ar: "الأصول\nوالتراث" },
    description: {
      en: "The site where Al Hamra Tower now stands was once the heart of Kuwait's entertainment district — home to the nation's first cinemas. This cultural memory is woven into the tower's identity, transforming a place of gathering into a monument of ambition.",
      ar: "كان الموقع الذي يقف فيه برج الحمراء الآن قلب حي الترفيه في الكويت — موطن أولى دور السينما في البلاد. هذه الذاكرة الثقافية منسوجة في هوية البرج، محولةً مكان التجمع إلى نصب للطموح."
    },
    image: kuwaitCinemaHistoric,
  },
  {
    id: "foundation",
    title: { en: "FOUNDATION\n2005–2006", ar: "الأساس\n٢٠٠٥–٢٠٠٦" },
    description: {
      en: "The journey began with excavating 30 meters into Kuwait's bedrock. A massive foundation system of 638 piles was driven deep to support what would become the tallest sculpted tower in the world.",
      ar: "بدأت الرحلة بالحفر ٣٠ متراً في صخر الكويت. تم دفع نظام أساسات ضخم من ٦٣٨ ركيزة في الأعماق لدعم ما سيصبح أطول برج منحوت في العالم."
    },
    image: constructionFoundation,
  },
  {
    id: "structure",
    title: { en: "STRUCTURAL\nRISE 2007–2009", ar: "الصعود\nالهيكلي ٢٠٠٧–٢٠٠٩" },
    description: {
      en: "The reinforced concrete core rose steadily while the distinctive asymmetric form took shape. Samsung Engineering executed the complex geometry with precision — each floor plate slightly rotated, creating the tower's signature 60° twist from base to crown.",
      ar: "ارتفع القلب الخرساني المسلح بثبات بينما اتخذ الشكل غير المتماثل المميز هيئته. نفذت سامسونغ للهندسة الهندسة المعقدة بدقة — كل طابق مائل قليلاً، مما خلق لفة البرج المميزة بـ ٦٠ درجة."
    },
    image: constructionSteel,
  },
  {
    id: "cladding",
    title: { en: "FAÇADE &\nCLADDING 2009–2010", ar: "الواجهة\nوالتكسية ٢٠٠٩–٢٠١٠" },
    description: {
      en: "24,000 square meters of Jura limestone were carefully installed, giving the tower its distinctive warm exterior. The high-performance curtain wall system integrates solar control glazing — the carved form itself acting as a massive sun-shading device.",
      ar: "تم تركيب ٢٤,٠٠٠ متر مربع من حجر الجورا الجيري بعناية، مما أعطى البرج مظهره الخارجي الدافئ المميز. يدمج نظام الجدار الستائري عالي الأداء زجاج التحكم الشمسي."
    },
    image: constructionFacade,
  },
  {
    id: "completion",
    title: { en: "COMPLETION\n2011", ar: "الإنجاز\n٢٠١١" },
    description: {
      en: "After six years of construction, Al Hamra Business Tower was officially completed — rising 412 meters to become Kuwait's tallest building and one of the world's most distinctive skyscrapers. A sculpted landmark that redefined the skyline.",
      ar: "بعد ست سنوات من البناء، اكتمل برج الحمراء رسمياً — بارتفاع ٤١٢ متراً ليصبح أطول مبنى في الكويت وأحد أكثر ناطحات السحاب تميزاً في العالم."
    },
    image: towerSunset,
  },
  {
    id: "impact",
    title: { en: "CULTURAL\nIMPACT", ar: "الأثر\nالثقافي" },
    description: {
      en: "Al Hamra Tower transcended architecture to become a national symbol. Recognized by CTBUH as Best Tall Building in the Middle East & Africa, it pioneered parametric 3D modeling in skyscraper design and inspired a new generation of architects worldwide.",
      ar: "تجاوز برج الحمراء العمارة ليصبح رمزاً وطنياً. حاز على جائزة أفضل مبنى شاهق في الشرق الأوسط وأفريقيا من CTBUH، وكان رائداً في النمذجة ثلاثية الأبعاد البارامترية."
    },
    image: towerNightIlluminated,
  },
  {
    id: "perspective",
    title: { en: "PERSPECTIVE\n& VIEWS", ar: "المنظور\nوالإطلالات" },
    description: {
      en: "From its commanding height, the tower offers unparalleled views of the Arabian Gulf, Kuwait City's urban tapestry, and horizons stretching to infinity. It is not merely an observation point — it is a vantage of dominion over landscape and time.",
      ar: "من ارتفاعه المهيمن، يوفر البرج إطلالات لا مثيل لها على الخليج العربي والنسيج الحضري لمدينة الكويت وآفاق تمتد إلى اللانهاية."
    },
    image: towerCloudsAerial,
  },
];

const Rising = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Observe which section is in view
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

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const { ref: heroRef, isInView: heroInView } = useScrollReveal();
  const { ref: galleryRef, isInView: galleryInView } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        {/* Hero - Massive text */}
        <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">
                {language === "en" ? "THE RISING" : "الصعود"}
              </span>
              <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-4xl">
                {language === "en"
                  ? "From Cinema District To Kuwait's Tallest Landmark."
                  : "من حي السينما إلى أطول معلم في الكويت."}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Panoramic hero image */}
        <section className="pb-8">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[21/9] overflow-hidden"
            >
              <img
                src={kuwaitPanoramaSunset}
                alt="Kuwait panorama"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Intro text */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg lg:text-xl text-foreground leading-relaxed max-w-3xl"
            >
              {language === "en"
                ? "Al Hamra Tower's story begins decades before its first stone was laid. From the cultural heart of old Kuwait to a symbol of national ambition, every chapter of this journey shaped a landmark that endures."
                : "تبدأ قصة برج الحمراء قبل عقود من وضع حجره الأول. من القلب الثقافي للكويت القديمة إلى رمز للطموح الوطني، كل فصل من هذه الرحلة شكّل معلماً يدوم."}
            </motion.p>
          </div>
        </section>

        {/* ===== CRESTLINE-STYLE SCROLL SERVICES SECTION ===== */}
        <section className="bg-background border-t border-border" ref={containerRef}>
          <div className="container mx-auto px-6 lg:px-12">
            {/* Section header */}
            <div className="py-16 lg:py-20">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
                {language === "en" ? "THE JOURNEY" : "الرحلة"}
              </span>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                {language === "en"
                  ? "Seven chapters define the rise of Kuwait's most significant architectural achievement — from heritage roots through construction to global recognition."
                  : "سبعة فصول تحدد صعود أهم إنجاز معماري في الكويت — من الجذور التراثية عبر البناء إلى الاعتراف العالمي."}
              </p>
            </div>

            {/* Scroll-driven content: Left titles + Right image/description */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* LEFT: Large text labels */}
              <div className="space-y-0">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    ref={(el) => { sectionRefs.current[index] = el; }}
                    className="py-12 lg:py-20 border-t border-border first:border-t-0 cursor-pointer"
                    onClick={() => {
                      setActiveIndex(index);
                      sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                  >
                    <motion.h3
                      className={`text-[clamp(1.8rem,3.5vw,3.5rem)] font-sans font-medium uppercase leading-[1.1] tracking-[-0.01em] whitespace-pre-line transition-colors duration-500 ${
                        activeIndex === index
                          ? "text-foreground"
                          : "text-muted-foreground/30"
                      }`}
                    >
                      {section.title[language]}
                    </motion.h3>

                    {/* Mobile: show description inline when active */}
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
                            <img
                              src={section.image}
                              alt={section.title.en}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* RIGHT: Sticky image + description (desktop only) */}
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
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
                        {sections[activeIndex].description[language]}
                      </p>

                      {/* Image */}
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={sections[activeIndex].image}
                          alt={sections[activeIndex].title.en}
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
                { value: "412m", label: language === "en" ? "Height" : "الارتفاع" },
                { value: "6", label: language === "en" ? "Years to Build" : "سنوات البناء" },
                { value: "60°", label: language === "en" ? "Rotation" : "الدوران" },
                { value: "2011", label: language === "en" ? "Completed" : "الإنجاز" },
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

        {/* Gallery Grid */}
        <section className="py-4 bg-background">
          <div ref={galleryRef} className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { img: towerBw1, span: "" },
                { img: somTowerSkyline, span: "" },
                { img: towerTopClouds, span: "" },
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

        {/* Awards recognition */}
        <section className="py-24 lg:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-16 block">
              {language === "en" ? "RECOGNITION" : "التقدير"}
            </span>
            <div className="divide-y divide-border">
              {[
                { name: "CTBUH Best Tall Building", cat: "Middle East & Africa", year: "2012" },
                { name: "Emirates Glass LEAF Award", cat: "Best Structural Design", year: "2011" },
                { name: "MIPIM Architectural Review", cat: "Future Project Award", year: "2007" },
                { name: "World Architecture Festival", cat: "Shortlisted", year: "2012" },
              ].map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="grid grid-cols-12 gap-4 py-6 lg:py-8 items-center"
                >
                  <div className="col-span-12 lg:col-span-5">
                    <p className="text-base lg:text-lg font-serif text-foreground">{award.name}</p>
                  </div>
                  <div className="col-span-8 lg:col-span-5">
                    <p className="text-sm text-muted-foreground">{award.cat}</p>
                  </div>
                  <div className="col-span-4 lg:col-span-2 text-right">
                    <p className="text-sm text-muted-foreground">{award.year}</p>
                  </div>
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

export default Rising;
