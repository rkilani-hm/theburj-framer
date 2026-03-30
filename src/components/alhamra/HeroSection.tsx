import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useRef } from "react";

import towerLowangle from "@/assets/tower-lowangle-clouds.png";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import towerFacadeDetail from "@/assets/tower-facade-detail.jpg";
import cityViewInterior from "@/assets/city-view-interior.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import PremiumStickyScroll, { type StickyScrollSection } from "./PremiumStickyScroll";

const heroSections: StickyScrollSection[] = [
  {
    id: "executive-lobby",
    titleEn: "Executive Lobby Experience",
    titleAr: "تجربة اللوبي التنفيذي",
    subtitleEn: "Arrival",
    subtitleAr: "الوصول",
    descEn: "A marble-clad arrival sequence designed to signal authority from the first step. The triple-height lobby frames Kuwait Bay, creating an experience that matches the caliber of its occupants.",
    descAr: "تجربة وصول مكسوة بالرخام مصممة للتعبير عن السلطة من الخطوة الأولى. اللوبي ثلاثي الارتفاع يؤطر خليج الكويت، مما يخلق تجربة تتناسب مع مستوى شاغليه.",
    image: interiorLobby,
  },
  {
    id: "premium-office",
    titleEn: "Premium Office Environment",
    titleAr: "بيئة مكتبية متميزة",
    subtitleEn: "Workspace",
    subtitleAr: "مساحة العمل",
    descEn: "Flexible floor plates ranging from 900 to 2,300 sqm with floor-to-ceiling glazing and 3.2m ceiling heights. Every detail calibrated for focus, productivity, and corporate presence.",
    descAr: "طوابق مرنة تتراوح من ٩٠٠ إلى ٢,٣٠٠ متر مربع مع زجاج من الأرض للسقف وارتفاع سقف ٣.٢ متر. كل التفاصيل مصممة للتركيز والإنتاجية والحضور المؤسسي.",
    image: somTowerDetail,
  },
  {
    id: "panoramic-views",
    titleEn: "Panoramic Business Views",
    titleAr: "إطلالات بانورامية",
    subtitleEn: "Perspective",
    subtitleAr: "المنظور",
    descEn: "The tower's distinctive 60° rotation ensures every floor captures expansive views of the Arabian Gulf, Kuwait City skyline, and beyond — an ever-present reminder of strategic positioning.",
    descAr: "الدوران المميز للبرج بزاوية ٦٠ درجة يضمن لكل طابق إطلالات واسعة على الخليج العربي وأفق مدينة الكويت وما وراءها.",
    image: towerLowangle,
  },
  {
    id: "workplace-amenities",
    titleEn: "Workplace Amenities",
    titleAr: "مرافق مكان العمل",
    subtitleEn: "Amenities",
    subtitleAr: "المرافق",
    descEn: "An integrated ecosystem of dining, retail, fitness, and prayer facilities within the tower complex. Every amenity positioned to eliminate friction and enhance the daily corporate experience.",
    descAr: "منظومة متكاملة من المطاعم والتجزئة واللياقة ومرافق الصلاة داخل مجمع البرج. كل مرفق موضوع لتقليل الاحتكاك وتحسين التجربة المؤسسية اليومية.",
    image: lobbyArches,
  },
  {
    id: "business-connectivity",
    titleEn: "Business Connectivity",
    titleAr: "الاتصال التجاري",
    subtitleEn: "Infrastructure",
    subtitleAr: "البنية التحتية",
    descEn: "Enterprise-grade fiber optics, redundant power systems, and advanced telecommunications infrastructure. Built for the demands of global financial operations and multi-national headquarters.",
    descAr: "ألياف بصرية بمستوى المؤسسات وأنظمة طاقة احتياطية وبنية تحتية متقدمة للاتصالات. مبنية لمتطلبات العمليات المالية العالمية والمقرات متعددة الجنسيات.",
    image: cityViewInterior,
  },
  {
    id: "five-star-services",
    titleEn: "Five-Star Services",
    titleAr: "خدمات خمس نجوم",
    subtitleEn: "Service",
    subtitleAr: "الخدمة",
    descEn: "24/7 concierge, dedicated security protocols, valet parking, and building management services — all operating at a five-star hospitality standard. Every interaction reflects institutional precision.",
    descAr: "كونسيرج على مدار الساعة وبروتوكولات أمان مخصصة وخدمة صف السيارات وخدمات إدارة المبنى — كلها تعمل بمعيار ضيافة خمس نجوم.",
    image: towerFacadeDetail,
  },
];

const HeroSection = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const headline = isAr
    ? "حيث تلتقي الهيبة المعمارية بالحضور الدائم، تبدأ رحلتك التجارية هنا."
    : "Where Architectural Gravity Meets Enduring Presence, Your Business Journey Starts Here.";

  const words = headline.split(" ");

  return (
    <section className="relative bg-background">
      {/* Hero headline */}
      <div className="container mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-16 lg:pb-20">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2rem,5.5vw,5.5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground text-justify"
          style={{ textAlignLast: "left" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: 40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15 + i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
              style={{ perspective: 600 }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* Premium Sticky Scroll */}
      <div className="container mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <PremiumStickyScroll sections={heroSections} isAr={isAr} />
      </div>
    </section>
  );
};

export default HeroSection;
