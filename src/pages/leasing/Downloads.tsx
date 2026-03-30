import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, FileText, Image, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import officeCorridor from "@/assets/office-corridor.jpg";
import cityViewInterior from "@/assets/city-view-interior.jpg";
import towerTopClouds from "@/assets/tower-top-clouds.png";
import cityLandscape from "@/assets/city-landscape.jpg";

const Downloads = () => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const { ref: heroRef, isInView: heroInView } = useScrollReveal();
  const { ref: galleryRef, isInView: galleryInView } = useScrollReveal();

  const downloadItems = [
    {
      icon: FileText,
      title: isEn ? "Corporate Brochure" : "كتيب الشركة",
      desc: isEn ? "Complete overview of Al Hamra Tower — architecture, services, and leasing information." : "نظرة شاملة على برج الحمراء — الهندسة المعمارية والخدمات ومعلومات التأجير.",
      format: "PDF • 12 MB",
    },
    {
      icon: Image,
      title: isEn ? "Floor Plans" : "مخططات الطوابق",
      desc: isEn ? "Detailed floor plan layouts for executive, full-floor, and corporate headquarters configurations." : "مخططات تفصيلية للطوابق للتكوينات التنفيذية والطابق الكامل ومقار الشركات.",
      format: "PDF • 8 MB",
    },
    {
      icon: BookOpen,
      title: isEn ? "Media Kit" : "الملف الإعلامي",
      desc: isEn ? "High-resolution images, logos, and press materials for media use." : "صور عالية الدقة وشعارات ومواد صحفية للاستخدام الإعلامي.",
      format: "ZIP • 45 MB",
    },
  ];

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
                {isEn ? "DOWNLOADS" : "التنزيلات"}
              </span>
              <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-4xl">
                {isEn
                  ? "Brochures, Floor Plans, And Media Materials."
                  : "كتيبات ومخططات طوابق ومواد إعلامية."}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="pb-16 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg lg:text-xl text-foreground leading-relaxed max-w-3xl"
            >
              {isEn
                ? "Access comprehensive documentation for Al Hamra Tower — from corporate brochures and detailed floor plans to high-resolution media materials."
                : "الوصول إلى الوثائق الشاملة لبرج الحمراء — من الكتيبات المؤسسية ومخططات الطوابق التفصيلية إلى المواد الإعلامية عالية الدقة."}
            </motion.p>
          </div>
        </section>

        {/* Download items */}
        <section className="bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="divide-y divide-border">
              {downloadItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="py-12 group"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-1">
                      <div className="w-12 h-12 border border-border flex items-center justify-center transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                        <item.icon size={20} className="text-muted-foreground transition-colors duration-300 group-hover:text-background" />
                      </div>
                    </div>
                    <div className="lg:col-span-4">
                      <h3 className="text-xl font-medium text-foreground mb-1">{item.title}</h3>
                      <span className="text-xs text-muted-foreground/70 tracking-wider">{item.format}</span>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="lg:col-span-2 flex lg:justify-end">
                      <button className="group/btn flex items-center gap-3 px-6 py-3 bg-foreground text-background text-sm uppercase tracking-[0.15em] hover:bg-foreground/90 transition-all duration-300">
                        <span>{isEn ? "Download" : "تحميل"}</span>
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-4 bg-background mt-16">
          <div ref={galleryRef} className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { img: officeCorridor, span: "" },
                { img: cityViewInterior, span: "" },
                { img: towerTopClouds, span: "" },
                { img: cityLandscape, span: "lg:col-span-2" },
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

export default Downloads;
