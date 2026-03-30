import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import cityViewInterior from "@/assets/city-view-interior.jpg";
import officeCorridor from "@/assets/office-corridor.jpg";
import interiorLobby from "@/assets/interior-lobby.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import towerAerialDay from "@/assets/tower-aerial-day.png";
import panoramaCity from "@/assets/panorama-city.jpg";

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
    id: "executive-suite",
    titleEn: "Executive Suite",
    titleAr: "جناح تنفيذي",
    descEn: "Corner positions with panoramic Gulf views across 250–500 sqm. Private reception halls, executive amenities, and dedicated elevator access create an environment befitting C-suite operations.",
    descAr: "مواقع ركنية مع إطلالات بانورامية على الخليج بمساحة 250-500 متر مربع. صالات استقبال خاصة ومرافق تنفيذية ووصول مخصص بالمصاعد.",
    image: cityViewInterior,
  },
  {
    id: "full-floor",
    titleEn: "Full Floor Headquarters",
    titleAr: "مقر طابق كامل",
    descEn: "Entire floor plates spanning 1,200–1,800 sqm with dedicated elevator lobbies and 360° views. Full branding integration from lobby signage to elevator interiors.",
    descAr: "طوابق كاملة تمتد بين 1,200-1,800 متر مربع مع ردهات مصاعد مخصصة وإطلالات 360 درجة. تكامل كامل للعلامة التجارية.",
    image: officeCorridor,
  },
  {
    id: "multi-floor",
    titleEn: "Multi-Floor Corporate Campus",
    titleAr: "حرم مؤسسي متعدد الطوابق",
    descEn: "Contiguous multi-floor configurations exceeding 3,000 sqm with internal staircases, dedicated reception areas, and exterior signage rights. Built for enterprises that require vertical integration.",
    descAr: "تكوينات متعددة الطوابق متصلة تتجاوز 3,000 متر مربع مع سلالم داخلية ومناطق استقبال مخصصة وحقوق لافتات خارجية.",
    image: towerAerialDay,
  },
  {
    id: "column-free",
    titleEn: "Column-Free Layouts",
    titleAr: "تخطيطات بدون أعمدة",
    descEn: "Open floor plates with minimal structural columns allow maximum flexibility in space planning and furniture layouts. The unique twisted form creates varied floor geometries that inspire creative workspace design.",
    descAr: "طوابق مفتوحة بأعمدة هيكلية قليلة تتيح أقصى مرونة في تخطيط المساحات وترتيب الأثاث. الشكل الملتوي الفريد يخلق أشكالاً هندسية متنوعة.",
    image: interiorLobby,
  },
  {
    id: "ceiling-heights",
    titleEn: "3.2m Ceiling Heights",
    titleAr: "ارتفاع سقف 3.2 متر",
    descEn: "Generous floor-to-ceiling heights create a sense of openness and grandeur. Raised flooring systems accommodate power, data, and HVAC distribution with full accessibility for future modifications.",
    descAr: "ارتفاعات سخية من الأرض إلى السقف تخلق إحساسًا بالانفتاح والفخامة. أنظمة أرضيات مرتفعة تستوعب توزيع الطاقة والبيانات والتكييف.",
    image: lobbyArches,
  },
  {
    id: "fit-out",
    titleEn: "Fit-Out Support",
    titleAr: "دعم التجهيز",
    descEn: "Dedicated project management for tenant fit-outs with shell-and-core or fully finished options. Pre-engineered partition grids allow rapid reconfiguration as teams grow or organizational needs evolve.",
    descAr: "إدارة مشاريع مخصصة لتجهيزات المستأجرين مع خيارات هيكل أساسي أو تشطيب كامل. شبكات أقسام مهندسة مسبقًا تتيح إعادة التكوين السريع.",
    image: panoramaCity,
  },
];

const specs = [
  { labelEn: "Typical Floor Plate", labelAr: "مساحة الطابق النموذجي", valueEn: "1,200–1,800 sqm", valueAr: "١٬٢٠٠–١٬٨٠٠ م²" },
  { labelEn: "Ceiling Height", labelAr: "ارتفاع السقف", valueEn: "3.2 m", valueAr: "٣.٢ م" },
  { labelEn: "Window Module", labelAr: "وحدة النوافذ", valueEn: "1.5 m", valueAr: "١.٥ م" },
  { labelEn: "Floor Loading", labelAr: "تحمل الأرضية", valueEn: "4.0 kPa + 1.0 kPa", valueAr: "٤.٠ + ١.٠ كيلو باسكال" },
  { labelEn: "Raised Floor Depth", labelAr: "عمق الأرضية المرتفعة", valueEn: "150 mm", valueAr: "١٥٠ مم" },
  { labelEn: "Cooling Capacity", labelAr: "سعة التبريد", valueEn: "130 W/sqm", valueAr: "١٣٠ واط/م²" },
];

const galleryImages = [
  { src: cityViewInterior, alt: "Executive office" },
  { src: officeCorridor, alt: "Office corridor" },
  { src: lobbyArches, alt: "Lobby arches" },
];

const OfficeSpaces = () => {
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
              {isAr ? "الأعمال / المساحات المكتبية" : "Business / Office Spaces"}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,6vw,6rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-5xl"
            >
              {isAr ? "مساحات مصممة للقيادة" : "Spaces Designed for Leadership"}
            </motion.h1>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-foreground py-12">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { vEn: "77", vAr: "٧٧", lEn: "Office Floors", lAr: "طابق مكتبي" },
                { vEn: "3.2m", vAr: "٣.٢م", lEn: "Ceiling Height", lAr: "ارتفاع السقف" },
                { vEn: "1,800", vAr: "١٬٨٠٠", lEn: "Max Floor Plate (sqm)", lAr: "أقصى مساحة طابق (م²)" },
                { vEn: "360°", vAr: "٣٦٠°", lEn: "Panoramic Views", lAr: "إطلالات بانورامية" },
              ].map((s, i) => (
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

        {/* Technical Specifications */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12"
            >
              {isAr ? "المواصفات الفنية" : "Technical Specifications"}
            </motion.h2>
            <div className="space-y-0">
              {specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="grid grid-cols-2 py-4 border-t border-border"
                >
                  <span className="text-sm text-muted-foreground">{isAr ? spec.labelAr : spec.labelEn}</span>
                  <span className="text-sm text-foreground text-right">{isAr ? spec.valueAr : spec.valueEn}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 bg-background">
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

export default OfficeSpaces;
