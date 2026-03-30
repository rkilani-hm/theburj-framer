import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import PremiumStickyScroll, { type StickyScrollSection } from "@/components/alhamra/PremiumStickyScroll";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";

import cityViewInterior from "@/assets/city-view-interior.jpg";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import cityLandscape from "@/assets/city-landscape.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import officeCorridor from "@/assets/office-corridor.jpg";

const sections: StickyScrollSection[] = [
  {
    id: "executive-positioning",
    titleEn: "Executive Lobby Experience",
    titleAr: "تجربة اللوبي التنفيذي",
    subtitleEn: "Arrival",
    subtitleAr: "الوصول",
    descEn: "Al Hamra Tower is where Kuwait's most influential enterprises establish their command centers. The address signals authority, stability, and forward-thinking vision — a statement before a single word is spoken.",
    descAr: "برج الحمراء هو المكان الذي تؤسس فيه أكثر المؤسسات الكويتية تأثيرًا مراكز قيادتها. العنوان يعبر عن السلطة والاستقرار والرؤية المستقبلية.",
    image: cityViewInterior,
  },
  {
    id: "curated-environment",
    titleEn: "Premium Office Environment",
    titleAr: "بيئة مكتبية متميزة",
    subtitleEn: "Workspace",
    subtitleAr: "مساحة العمل",
    descEn: "Every interaction within the tower is designed with intention. From the marble-clad arrival experience to the climate-controlled corridors, the environment reflects the caliber of its tenants.",
    descAr: "كل تفاعل داخل البرج مصمم بعناية. من تجربة الوصول المكسوة بالرخام إلى الممرات المكيفة، تعكس البيئة مستوى المستأجرين.",
    image: interiorLobby,
  },
  {
    id: "panoramic-views",
    titleEn: "Panoramic Business Views",
    titleAr: "إطلالات بانورامية",
    subtitleEn: "Perspective",
    subtitleAr: "المنظور",
    descEn: "The tower's distinctive sculptural rotation ensures every floor captures expansive views of the Arabian Gulf and Kuwait City skyline — an ever-present reminder of strategic positioning.",
    descAr: "الدوران النحتي المميز للبرج يضمن لكل طابق إطلالات واسعة على الخليج العربي وأفق مدينة الكويت — تذكير دائم بالتموضع الاستراتيجي.",
    image: cityLandscape,
  },
  {
    id: "workplace-amenities",
    titleEn: "Workplace Amenities",
    titleAr: "مرافق مكان العمل",
    subtitleEn: "Amenities",
    subtitleAr: "المرافق",
    descEn: "A dedicated concierge team operates around the clock, managing visitor protocols, courier logistics, and executive support services. Every detail handled with discretion and precision.",
    descAr: "فريق كونسيرج مخصص يعمل على مدار الساعة، يدير بروتوكولات الزوار ولوجستيات البريد السريع وخدمات الدعم التنفيذي.",
    image: lobbyArches,
  },
  {
    id: "business-connectivity",
    titleEn: "Business Connectivity",
    titleAr: "الاتصال التجاري",
    subtitleEn: "Infrastructure",
    subtitleAr: "البنية التحتية",
    descEn: "Multi-layered security infrastructure including biometric access control, 24/7 CCTV surveillance, and dedicated security personnel at every access point. Enterprise-grade protection as standard.",
    descAr: "بنية تحتية أمنية متعددة الطبقات تشمل التحكم البيومتري والمراقبة على مدار الساعة وأفراد أمن مخصصين عند كل نقطة وصول.",
    image: officeCorridor,
  },
  {
    id: "five-star-services",
    titleEn: "Five-Star Services",
    titleAr: "خدمات خمس نجوم",
    subtitleEn: "Service",
    subtitleAr: "الخدمة",
    descEn: "Host to 50+ leading corporations spanning financial services, energy, technology, and consulting. The tenant roster itself creates a network of strategic proximity that amplifies each occupant's reach.",
    descAr: "يستضيف أكثر من 50 شركة رائدة تشمل الخدمات المالية والطاقة والتكنولوجيا والاستشارات. قائمة المستأجرين نفسها تخلق شبكة قرب استراتيجي.",
    image: towerAerialDay,
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
  const { ref: galleryRef, isInView: galleryInView } = useScrollReveal();

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

        {/* Premium Sticky Scroll Section */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <PremiumStickyScroll sections={sections} isAr={isAr} />
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 bg-secondary">
          <div ref={galleryRef} className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-6">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
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
