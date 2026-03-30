import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import LamellaVisualization from "@/components/alhamra/LamellaVisualization";
import FloorPlanSelector from "@/components/alhamra/FloorPlanSelector";

import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import somLobby from "@/assets/som-lobby.jpg";
import somObservation from "@/assets/som-observation.jpg";
import somTowerVertical from "@/assets/som-tower-vertical.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import entranceDusk from "@/assets/entrance-dusk.jpg";
import entranceNightFacade from "@/assets/entrance-night-facade.jpg";
import towerStreetContext from "@/assets/tower-street-context.jpg";
import towerFacadeTwisted from "@/assets/tower-facade-twisted.png";
import towerLowangleClouds from "@/assets/tower-lowangle-clouds.png";
import towerCityContext from "@/assets/tower-city-context.jpg";
import somTowerNight from "@/assets/som-tower-night.jpg";
import towerBw1 from "@/assets/tower-bw-1.png";
import towerTopClouds from "@/assets/tower-top-clouds.png";

interface DesignSection {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
}

const scrollSections: DesignSection[] = [
  {
    id: "arrival",
    title: { en: "ARRIVAL\nEXPERIENCE", ar: "تجربة\nالوصول" },
    description: {
      en: "The approach to Al Hamra Tower is choreographed through scale and perspective. Sloped perimeter columns define the street-level appearance while the carved massing reveals itself progressively — an architectural sequence designed to build anticipation.",
      ar: "يتم تنظيم الاقتراب من برج الحمراء من خلال المقياس والمنظور. تحدد الأعمدة المحيطية المائلة المظهر على مستوى الشارع بينما يكشف الحجم المنحوت عن نفسه تدريجياً."
    },
    image: entranceDusk,
  },
  {
    id: "lobby",
    title: { en: "LOBBY\nEXPERIENCE", ar: "تجربة\nالردهة" },
    description: {
      en: "A 24-meter-high column-free lobby establishes immediate presence. The grand space on the north side extends from the core to the perimeter frame, its innovative lamella bracing scheme featuring 5 distinct element types that contribute to both structural stability and visual drama.",
      ar: "ردهة خالية من الأعمدة بارتفاع ٢٤ متراً تحقق حضوراً فورياً. يمتد الفراغ الكبير في الجانب الشمالي من القلب إلى الإطار المحيطي مع نظام تقوية لاميلا مبتكر."
    },
    image: lobbyArches,
  },
  {
    id: "concept",
    title: { en: "ARCHITECTURAL\nCONCEPT", ar: "المفهوم\nالمعماري" },
    description: {
      en: "The asymmetrical, carved form is a purposeful response to solar exposure and environment. A quarter of each floor plate is strategically removed to reduce heat gain while enhancing views — the south facade's limestone cladding acts as a passive performance measure against the desert sun.",
      ar: "الشكل المنحوت غير المتماثل هو استجابة هادفة للتعرض الشمسي والبيئة. تتم إزالة ربع كل طابق بشكل استراتيجي لتقليل الحرارة مع تعزيز المشاهد."
    },
    image: somTowerVertical,
  },
  {
    id: "facade",
    title: { en: "FAÇADE &\nCLADDING", ar: "الواجهة\nوالتكسية" },
    description: {
      en: "Glass curtain wall systems on three sides frame sweeping vistas, while 24,000m² of Jura limestone wraps the solar-exposed surfaces. The carved form itself acts as a massive sun-shading device — architecture and climate response as one.",
      ar: "أنظمة جدران ستائرية زجاجية على ثلاثة جوانب تؤطر مشاهد واسعة، بينما يغلف ٢٤,٠٠٠ متر مربع من حجر الجورا الجيري الأسطح المعرضة للشمس."
    },
    image: somTowerDetail,
  },
  {
    id: "paraboloid",
    title: { en: "HYPERBOLIC\nPARABOLOID WALLS", ar: "جدران القطع\nالمكافئ الزائد" },
    description: {
      en: "Two reinforced-concrete flared walls extend the full 412m height. The southeast wall leans INTO the building (lightly loaded), while the southwest wall leans AWAY, carrying enormous concentrated loads — a unique structural behavior unprecedented at this scale.",
      ar: "جداران خرسانيان مسلحان متسعان يمتدان بالارتفاع الكامل ٤١٢ متر. يميل الجدار الجنوبي الشرقي نحو المبنى بينما يميل الجدار الجنوبي الغربي بعيداً عنه حاملاً أحمالاً هائلة مركزة."
    },
    image: towerFacadeTwisted,
  },
  {
    id: "torsion",
    title: { en: "TORSIONAL\nGRAVITY RESPONSE", ar: "استجابة الجاذبية\nالالتوائية" },
    description: {
      en: "The tower twists elastically under gravity loads alone. Counter-clockwise circumferential forces at each slab-to-wall intersection create cumulative torsional moment from zero at top to maximum at base. SOM developed creep compatibility analysis using ACI 209R-92 guidelines.",
      ar: "يلتوي البرج مرنياً تحت أحمال الجاذبية وحدها. قوى محيطية عكس عقارب الساعة عند كل تقاطع بلاطة-جدار تخلق عزم التواء تراكمي من الصفر في الأعلى إلى الحد الأقصى في القاعدة."
    },
    image: towerCityContext,
  },
  {
    id: "cantilever",
    title: { en: "CANTILEVERED\nTRUSS SYSTEM", ar: "نظام الجمالون\nالناتئ" },
    description: {
      en: "The observation deck's curtain wall is supported by an innovative cantilevered truss system that eliminates columns, providing unobstructed 360° views from the 130-foot-high space. A restaurant and sky deck crown the tower.",
      ar: "يدعم نظام جمالون ناتئ مبتكر الجدار الستائري لسطح المراقبة مما يلغي الأعمدة ويوفر مشاهد ٣٦٠ درجة بدون عوائق من الفراغ بارتفاع ١٣٠ قدماً."
    },
    image: somObservation,
  },
  {
    id: "composite",
    title: { en: "COMPOSITE\nCOLUMN SYSTEM", ar: "نظام الأعمدة\nالمركبة" },
    description: {
      en: "From the foundation mat to Level 29, perimeter columns incorporate embedded W360 steel sections within reinforced concrete — a hybrid system optimizing both strength and constructability. The foundation spans 5,800m² with 638 piles driven into bedrock.",
      ar: "من حصيرة الأساس إلى الطابق ٢٩، تدمج الأعمدة المحيطية مقاطع فولاذية W360 داخل الخرسانة المسلحة — نظام هجين يحسن القوة وقابلية البناء."
    },
    image: towerLowangleClouds,
  },
];

const DesignEngineering = () => {
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
  const { ref: vizRef, isInView: vizInView } = useScrollReveal();

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
                {isEn ? "BY SKIDMORE, OWINGS & MERRILL" : "تصميم سكيدمور، أوينغز وميريل"}
              </span>
              <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-5xl">
                {isEn
                  ? "Design That Performs. Form, Climate, And Engineering As One."
                  : "تصميم يؤدي. الشكل والمناخ والهندسة كواحد."}
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
              <img src={somTowerSkyline} alt="Al Hamra Tower architecture" className="w-full h-full object-cover" />
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
                ? "The tower's asymmetrical carved profile responds directly to solar exposure, optimizing comfort while shaping a distinctive skyline identity. The massing reduces heat gain and enhances shading — transforming environmental constraints into architectural advantage."
                : "يستجيب الشكل المنحوت غير المتماثل للبرج مباشرة للتعرض الشمسي، محسناً الراحة مع تشكيل هوية أفق مميزة. يقلل الحجم من الحرارة ويعزز التظليل — محولاً القيود البيئية إلى ميزة معمارية."}
            </motion.p>
          </div>
        </section>

        {/* Scroll-driven sections */}
        <section className="bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="py-16 lg:py-20">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
                {isEn ? "DESIGN & ENGINEERING" : "التصميم والهندسة"}
              </span>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                {isEn
                  ? "Eight defining elements — from the choreographed arrival to the composite column system — each demonstrating how architectural vision and engineering constraints informed each other throughout the design process."
                  : "ثمانية عناصر محددة — من الوصول المنظم إلى نظام الأعمدة المركبة — كل منها يوضح كيف أثرت الرؤية المعمارية والقيود الهندسية على بعضها البعض."}
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
                { value: "412m", label: isEn ? "Building Height" : "ارتفاع المبنى" },
                { value: "85,000m³", label: isEn ? "Concrete Volume" : "حجم الخرسانة" },
                { value: "5,800m²", label: isEn ? "Foundation Mat" : "حصيرة الأساس" },
                { value: "189,000kN", label: isEn ? "Lamella Capacity" : "سعة اللاميلا" },
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

        {/* Interactive Visualizations */}
        <section className="py-24 lg:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={vizRef}
              initial={{ opacity: 0, y: 30 }}
              animate={vizInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
                {isEn ? "INTERACTIVE" : "تفاعلي"}
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-sans font-medium uppercase leading-[1.1] text-foreground mb-16 max-w-2xl">
                {isEn ? "Technical Visualizations" : "التصورات التقنية"}
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-6">
                  {isEn ? "Lamella Bracing Structure" : "هيكل تقوية اللاميلا"}
                </h3>
                <LamellaVisualization />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-6">
                  {isEn ? "Floor Plan Geometry" : "هندسة مخطط الطابق"}
                </h3>
                <FloorPlanSelector />
              </div>
            </div>
          </div>
        </section>

        {/* Technical specs table */}
        <section className="py-24 lg:py-32 bg-secondary/30 border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-16 block">
              {isEn ? "SPECIFICATIONS" : "المواصفات"}
            </span>
            <div className="divide-y divide-border">
              {[
                { label: isEn ? "Building Height" : "ارتفاع المبنى", value: "412m" },
                { label: isEn ? "Number of Stories" : "عدد الطوابق", value: "74 + mechanical" },
                { label: isEn ? "Foundation Mat" : "حصيرة الأساس", value: "5,800m²" },
                { label: isEn ? "Gross Area" : "المساحة الإجمالية", value: "195,000m²" },
                { label: isEn ? "Concrete Volume" : "حجم الخرسانة", value: "85,000m³" },
                { label: isEn ? "Concrete Strength" : "قوة الخرسانة", value: "50–80 MPa" },
                { label: isEn ? "Shear Wall Thickness" : "سماكة جدار القص", value: "1,200mm max" },
                { label: isEn ? "Perimeter Columns" : "الأعمدة المحيطية", value: "700–1,200mm" },
                { label: isEn ? "Floor Slab" : "بلاطة الأرضية", value: "160mm × 6.0m span" },
              ].map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="py-5 flex justify-between items-center"
                >
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="text-foreground font-light text-lg">{spec.value}</span>
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
                { img: entranceNightFacade, span: "" },
                { img: somLobby, span: "" },
                { img: towerStreetContext, span: "" },
                { img: towerBw1, span: "lg:col-span-2" },
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
                    alt="Al Hamra Tower design"
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
                { name: "Skidmore, Owings & Merrill (SOM)", role: isEn ? "Lead Architect & Structural Engineer" : "المهندس المعماري الرئيسي والمهندس الإنشائي" },
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

export default DesignEngineering;
