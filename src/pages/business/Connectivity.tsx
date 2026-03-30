import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import cityLandscape from "@/assets/city-landscape.jpg";
import waterfrontPromenade from "@/assets/waterfront-promenade.jpg";
import skylineParkPanorama from "@/assets/skyline-park-panorama.jpg";
import towerCityContext from "@/assets/tower-city-context.jpg";
import entranceDusk from "@/assets/entrance-dusk.jpg";

interface Section {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image: string;
}

const sections: Section[] = [
  {
    id: "shopping-center",
    titleEn: "Al Hamra Shopping Center",
    titleAr: "مركز الحمراء التجاري",
    descEn: "Direct internal access to a premier retail destination featuring 90+ international brands, gourmet dining, and lifestyle services — all within the Al Hamra complex. Tenants and visitors move seamlessly between office and retail environments.",
    descAr: "وصول داخلي مباشر إلى وجهة تسوق متميزة تضم أكثر من 90 علامة تجارية دولية ومطاعم راقية وخدمات أسلوب حياة — جميعها داخل مجمع الحمراء.",
    image: entranceDusk,
  },
  {
    id: "on-site-amenities",
    titleEn: "On-Site Amenities",
    titleAr: "المرافق الداخلية",
    descEn: "Ground-floor cafés, restaurants, banking services, and business support facilities ensure daily convenience without leaving the complex. A self-contained ecosystem designed for professional productivity.",
    descAr: "مقاهي ومطاعم وخدمات مصرفية ومرافق دعم أعمال في الطابق الأرضي تضمن الراحة اليومية دون مغادرة المجمع.",
    image: waterfrontPromenade,
  },
  {
    id: "transport-links",
    titleEn: "Transport Links",
    titleAr: "روابط النقل",
    descEn: "Proximity to major arterial roads and Kuwait's developing public transit infrastructure. An 11-level car park with 2,000+ spaces and dedicated VIP drop-off zones ensure frictionless access for tenants and visitors.",
    descAr: "قرب من الطرق الشريانية الرئيسية والبنية التحتية للنقل العام. موقف سيارات من 11 طابقاً بأكثر من 2,000 مكان ومناطق إنزال كبار الشخصيات.",
    image: towerAerialDay,
  },
  {
    id: "sharq-district",
    titleEn: "The Sharq District",
    titleAr: "منطقة شرق",
    descEn: "Positioned in Sharq, Kuwait City's central business district, within walking distance of government ministries, embassies, and the financial corridor. Where governance, commerce, and culture converge.",
    descAr: "يقع في منطقة شرق، حي الأعمال المركزي في مدينة الكويت، على مسافة قريبة من الوزارات والسفارات والممر المالي.",
    image: cityLandscape,
  },
  {
    id: "parking-infrastructure",
    titleEn: "Parking Infrastructure",
    titleAr: "بنية المواقف التحتية",
    descEn: "2,000+ spaces across 11 dedicated parking levels with automated guidance systems. VIP parking with direct elevator access to office floors. Electric vehicle charging stations at select levels.",
    descAr: "أكثر من 2,000 موقف عبر 11 طابقاً مخصصاً مع أنظمة توجيه آلية. مواقف VIP مع وصول مباشر بالمصعد. محطات شحن مركبات كهربائية.",
    image: towerCityContext,
  },
  {
    id: "urban-integration",
    titleEn: "Urban Integration",
    titleAr: "التكامل الحضري",
    descEn: "Al Hamra Tower is not merely situated in a city — it defines the district. The complex's pedestrian connections, landscaped approaches, and waterfront proximity create an urban experience that extends beyond the building envelope.",
    descAr: "برج الحمراء لا يقع فقط في المدينة — بل يحدد هوية المنطقة. ممرات المشاة والمناظر الطبيعية والقرب من الواجهة البحرية تخلق تجربة حضرية.",
    image: skylineParkPanorama,
  },
];

const stats = [
  { vEn: "2,000+", vAr: "٢٬٠٠٠+", lEn: "Parking Spaces", lAr: "مواقف سيارات" },
  { vEn: "11", vAr: "١١", lEn: "Parking Levels", lAr: "طوابق مواقف" },
  { vEn: "90+", vAr: "٩٠+", lEn: "Retail Outlets", lAr: "محل تجاري" },
  { vEn: "5 min", vAr: "٥ دقائق", lEn: "To Government District", lAr: "إلى الحي الحكومي" },
];

const galleryImages = [
  { src: waterfrontPromenade, alt: "Kuwait waterfront" },
  { src: skylineParkPanorama, alt: "City panorama" },
  { src: towerCityContext, alt: "Tower in city context" },
];

const Connectivity = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(index); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

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
              {isAr ? "الأعمال / الاتصال والتكامل" : "Business / Connectivity & Integration"}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,6vw,6rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-5xl"
            >
              {isAr ? "مركز منطقة حضرية متكاملة" : "The Center of an Integrated Urban District"}
            </motion.h1>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-foreground py-12">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl lg:text-4xl font-light text-background mb-1">{isAr ? s.vAr : s.vEn}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-background/60">{isAr ? s.lAr : s.lEn}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Scroll-driven sections — Desktop */}
        <section className="hidden lg:block py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-12 gap-16">
              <div className="col-span-5 space-y-6">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    ref={(el) => { sectionRefs.current[index] = el; }}
                    className="min-h-[30vh] flex items-start pt-8 cursor-pointer"
                    onClick={() => setActiveSection(index)}
                  >
                    <div>
                      <span className="text-xs text-muted-foreground/50 tracking-wider block mb-3">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className={`text-2xl lg:text-3xl font-light tracking-tight transition-colors duration-500 ${
                        activeSection === index ? "text-foreground" : "text-muted-foreground/30"
                      }`}>
                        {isAr ? section.titleAr : section.titleEn}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-span-7">
                <div className="sticky top-32">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="aspect-[4/3] overflow-hidden mb-8">
                        <img src={sections[activeSection].image} alt={sections[activeSection].titleEn} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed max-w-lg">
                        {isAr ? sections[activeSection].descAr : sections[activeSection].descEn}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile accordion */}
        <section className="lg:hidden py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="space-y-0">
              {sections.map((section, index) => (
                <div key={section.id} className="border-t border-border">
                  <button
                    onClick={() => setExpandedMobile(expandedMobile === index ? null : index)}
                    className="w-full py-6 flex items-start justify-between text-left"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-xs text-muted-foreground/50 mt-1">{String(index + 1).padStart(2, "0")}</span>
                      <h3 className={`text-xl font-light transition-colors duration-300 ${
                        expandedMobile === index ? "text-foreground" : "text-muted-foreground/50"
                      }`}>
                        {isAr ? section.titleAr : section.titleEn}
                      </h3>
                    </div>
                    <span className="text-muted-foreground text-lg">{expandedMobile === index ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {expandedMobile === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                        <div className="pb-8 space-y-4">
                          <div className="aspect-[16/9] overflow-hidden">
                            <img src={section.image} alt={section.titleEn} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{isAr ? section.descAr : section.descEn}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-6">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="aspect-[3/4] overflow-hidden group"
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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

export default Connectivity;
