import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import ElevatorSystemVisualization from "@/components/alhamra/ElevatorSystemVisualization";
import somObservation from "@/assets/som-observation.jpg";
import somLobby from "@/assets/som-lobby.jpg";
import kuwaitPanoramaSunset from "@/assets/kuwait-panorama-sunset.png";
import interiorLobby from "@/assets/interior-lobby.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import towerAerialDay from "@/assets/tower-aerial-day.png";

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
    id: "movement-logic",
    titleEn: "Movement Logic",
    titleAr: "منطق الحركة",
    descEn: "Al Hamra Tower's vertical transportation system is engineered as an integrated movement network. High-speed destination-dispatch elevators eliminate wait times and optimize traffic flow across 77 office floors, serving 5,000+ daily occupants with precision.",
    descAr: "نظام النقل العمودي في برج الحمراء مصمم كشبكة حركة متكاملة. مصاعد عالية السرعة بنظام الوجهة المسبقة تلغي أوقات الانتظار وتحسّن تدفق الحركة عبر 77 طابقاً مكتبياً.",
    image: interiorLobby,
  },
  {
    id: "sky-lobbies",
    titleEn: "Sky Lobbies",
    titleAr: "ردهات السماء",
    descEn: "Two sky lobbies at floors 30 and 55 serve as transition zones and social gathering points. These elevated lobbies feature panoramic views, lounge areas, and transfer access between low-rise and high-rise elevator banks.",
    descAr: "ردهتان سماويتان في الطابقين 30 و55 تعملان كمناطق انتقالية ونقاط تجمع اجتماعية. تتميز بإطلالات بانورامية ومناطق صالونات ووصول للتحويل بين بنوك المصاعد.",
    image: somObservation,
  },
  {
    id: "elevator-banks",
    titleEn: "Elevator Bank System",
    titleAr: "نظام بنوك المصاعد",
    descEn: "24 passenger elevators organized into dedicated banks serve specific floor zones, reducing cross-traffic and maximizing throughput. Express shuttles connect the ground floor directly to sky lobbies in under 40 seconds.",
    descAr: "24 مصعداً للركاب منظمة في بنوك مخصصة تخدم مناطق طوابق محددة، مما يقلل الحركة المتقاطعة ويزيد من الإنتاجية. مكوكات سريعة تربط الطابق الأرضي بردهات السماء في أقل من 40 ثانية.",
    image: somLobby,
  },
  {
    id: "destination-dispatch",
    titleEn: "Destination Dispatch",
    titleAr: "نظام الإرسال الذكي",
    descEn: "Passengers select their destination floor before entering the elevator. The intelligent system groups passengers traveling to the same zone, reducing stops and delivering average wait times under 25 seconds during peak hours.",
    descAr: "يختار الركاب طابق وجهتهم قبل دخول المصعد. يجمع النظام الذكي الركاب المتجهين إلى نفس المنطقة، مما يقلل التوقفات ويوفر أوقات انتظار متوسطة أقل من 25 ثانية.",
    image: lobbyArches,
  },
  {
    id: "service-elevators",
    titleEn: "Service & Freight",
    titleAr: "المصاعد الخدمية والشحن",
    descEn: "Dedicated service elevators and freight lifts operate on separate cores, ensuring that logistics, maintenance, and tenant move-ins never interfere with passenger circulation. Heavy-load capacity up to 5,000 kg.",
    descAr: "مصاعد خدمية ورافعات شحن مخصصة تعمل على أنوية منفصلة، مما يضمن عدم تداخل الخدمات اللوجستية والصيانة مع حركة الركاب. سعة تحميل ثقيلة تصل إلى 5,000 كجم.",
    image: towerAerialDay,
  },
  {
    id: "observation-deck",
    titleEn: "Observation Experience",
    titleAr: "تجربة المراقبة",
    descEn: "The tower's observation level offers 360° views across Kuwait City and the Arabian Gulf. Accessed via dedicated express elevators, the journey itself becomes part of the experience — rising 412 meters in under 50 seconds.",
    descAr: "يوفر طابق المراقبة في البرج إطلالات 360 درجة على مدينة الكويت والخليج العربي. يتم الوصول إليه عبر مصاعد سريعة مخصصة، حيث تصبح الرحلة نفسها جزءاً من التجربة.",
    image: kuwaitPanoramaSunset,
  },
];

const stats = [
  { vEn: "24", vAr: "٢٤", lEn: "Passenger Elevators", lAr: "مصعد ركاب" },
  { vEn: "<25s", vAr: "أقل من ٢٥ ث", lEn: "Average Wait Time", lAr: "متوسط وقت الانتظار" },
  { vEn: "6 m/s", vAr: "٦ م/ث", lEn: "Maximum Speed", lAr: "السرعة القصوى" },
  { vEn: "2", vAr: "٢", lEn: "Sky Lobbies", lAr: "ردهات سماوية" },
];

const galleryImages = [
  { src: somObservation, alt: "Observation deck view" },
  { src: somLobby, alt: "Tower lobby" },
  { src: kuwaitPanoramaSunset, alt: "Kuwait panorama at sunset" },
];

const VerticalTransportation = () => {
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
              {isAr ? "الأعمال / النقل العمودي" : "Business / Vertical Transportation"}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,6vw,6rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-5xl"
            >
              {isAr ? "هندسة الحركة العمودية" : "Engineering Vertical Movement"}
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
        <section className="hidden lg:block py-16 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-12 gap-16">
              <div className="col-span-5 space-y-6">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    ref={(el) => { sectionRefs.current[index] = el; }}
                    className="min-h-[9vh] flex items-start pt-8 cursor-pointer"
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
                <div className="sticky top-24">
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

        {/* Elevator System Visualization */}
        <ElevatorSystemVisualization />

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

export default VerticalTransportation;
