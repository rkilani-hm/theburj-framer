import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import towerVertical from "@/assets/som-tower-vertical.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import constructionFoundation from "@/assets/construction-foundation.jpg";
import { Mountain, Layers, Building2 } from "lucide-react";

interface TabData {
  id: string;
  icon: React.ElementType;
  label: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  description: { en: string; ar: string };
  stats: {
    value: string;
    label: { en: string; ar: string };
  }[];
  image: string;
  imageAlt: string;
  imagePosition: { top: string; height: string };
}

const tabsData: TabData[] = [
  {
    id: "apex",
    icon: Mountain,
    label: { en: "The Apex", ar: "القمة" },
    title: { en: "The Apex", ar: "القمة" },
    subtitle: { en: "Approx. 412–413 meters", ar: "حوالي ٤١٢-٤١٣ متر" },
    description: {
      en: "One of the tallest towers in the region. The crown features the distinctive carved geometry that defines Al Hamra's silhouette against the Arabian Gulf skyline.",
      ar: "أحد أطول الأبراج في المنطقة. يتميز التاج بالهندسة المنحوتة المميزة التي تحدد صورة الحمراء على أفق الخليج العربي."
    },
    stats: [
      { value: "~413m", label: { en: "Total Height", ar: "الارتفاع الكلي" } },
      { value: "#1", label: { en: "Tallest in Kuwait", ar: "الأطول في الكويت" } },
      { value: "24m", label: { en: "Lobby Height", ar: "ارتفاع الردهة" } },
    ],
    image: towerVertical,
    imageAlt: "Al Hamra Tower vertical view",
    imagePosition: { top: "0%", height: "35%" },
  },
  {
    id: "core",
    icon: Layers,
    label: { en: "The Core", ar: "القلب" },
    title: { en: "The Core", ar: "القلب" },
    subtitle: { en: "Structural Intelligence & Engineering Precision", ar: "ذكاء هيكلي ودقة هندسية" },
    description: {
      en: "Al Hamra Business Tower is anchored by structural intelligence and engineering precision — a system conceived not only for height, but for endurance.\n\nAt its center, a reinforced concrete shear wall core serves as the primary lateral force-resisting system. This is complemented by a perimeter moment-resisting frame engineered to withstand both wind and gravity loads.\n\nThe flared structural walls contribute to torsional resistance and vertical load transfer, while the 24-meter-high lamella lobby structure braces the primary columns and creates one of the region's most dramatic entrance volumes.\n\nCast-in-place slabs act integrally as diaphragms within the gravity system, ensuring structural continuity across all floors. Operationally, the tower is equipped with advanced smart-building systems — including uninterrupted power infrastructure, high-capacity data networks, and integrated people and vehicle movement management.",
      ar: "يرتكز برج الحمراء للأعمال على ذكاء هيكلي ودقة هندسية — نظام صُمم ليس فقط من أجل الارتفاع، بل من أجل الصمود.\n\nفي مركزه، يعمل جدار القص الخرساني المسلح كنظام رئيسي لمقاومة القوى الجانبية. يُكمَّل هذا بإطار محيطي مقاوم للعزوم مصمم لتحمل أحمال الرياح والجاذبية.\n\nتساهم الجدران الهيكلية المتوهجة في مقاومة الالتواء ونقل الأحمال الرأسية، بينما يدعم هيكل الردهة اللاميلي بارتفاع ٢٤ متراً الأعمدة الرئيسية ويخلق أحد أكثر أحجام المداخل إثارة في المنطقة.\n\nتعمل البلاطات المصبوبة في الموقع بشكل متكامل كحجاب حاجز ضمن نظام الجاذبية، مما يضمن الاستمرارية الهيكلية عبر جميع الطوابق. تشغيلياً، البرج مجهز بأنظمة بناء ذكية متقدمة — بما في ذلك بنية تحتية للطاقة غير المنقطعة وشبكات بيانات عالية السعة وإدارة متكاملة لحركة الأشخاص والمركبات."
    },
    stats: [
      { value: "Shear Wall Core", label: { en: "Primary Lateral System", ar: "نظام جانبي رئيسي" } },
      { value: "Moment Frame", label: { en: "Wind + Gravity Resistance", ar: "مقاومة الرياح والجاذبية" } },
      { value: "24m Lobby", label: { en: "Lamella Structure Height", ar: "ارتفاع هيكل اللاميلا" } },
    ],
    image: lobbyArches,
    imageAlt: "Al Hamra Tower lamella lobby interior",
    imagePosition: { top: "25%", height: "45%" },
  },
  {
    id: "foundation",
    icon: Building2,
    label: { en: "The Foundation", ar: "الأساس" },
    title: { en: "The Foundation", ar: "الأساس" },
    subtitle: { en: "Engineered for Long-Term Resilience", ar: "مصمم للمرونة طويلة الأمد" },
    description: {
      en: "Beneath its sculpted form lies a foundation system engineered for long-term resilience and performance.\n\nA 4.2-meter-deep raft foundation, supported by 289 bored piles, anchors the structure securely. Pile depths range between 22 and 27 meters, calibrated to site-specific geotechnical conditions.\n\nAn active cathodic protection system safeguards against corrosion, ensuring durability over decades of operation.\n\nThe phased construction of the piling system was strategically sequenced to respond to the tower's spiraling gravity load concentration, while structural performance was validated through comprehensive wind tunnel testing based on a 50-year return period wind event.",
      ar: "تحت شكله المنحوت يكمن نظام أساسات مصمم للمرونة والأداء طويل الأمد.\n\nقاعدة حصيرية بعمق ٤.٢ متر، مدعومة بـ ٢٨٩ خازوقاً محفوراً، ترسي الهيكل بأمان. تتراوح أعماق الخوازيق بين ٢٢ و٢٧ متراً، معايرة وفقاً للظروف الجيوتقنية الخاصة بالموقع.\n\nيحمي نظام الحماية الكاثودية النشط من التآكل، مما يضمن المتانة على مدى عقود من التشغيل.\n\nتم تسلسل بناء نظام الخوازيق بشكل استراتيجي للاستجابة لتركيز أحمال الجاذبية الحلزونية للبرج، بينما تم التحقق من الأداء الهيكلي من خلال اختبارات نفق الرياح الشاملة بناءً على فترة عودة رياح مدتها ٥٠ عاماً."
    },
    stats: [
      { value: "4.2m Deep", label: { en: "Raft Foundation", ar: "قاعدة حصيرية" } },
      { value: "289 Piles", label: { en: "Bored Pile System", ar: "نظام خوازيق محفورة" } },
      { value: "50-Year", label: { en: "Wind Tunnel Return Period", ar: "فترة عودة نفق الرياح" } },
    ],
    image: constructionFoundation,
    imageAlt: "Al Hamra Tower construction foundation",
    imagePosition: { top: "65%", height: "35%" },
  },
];

const TowerTabbedDashboard = () => {
  const { language, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState("apex");

  const activeData = tabsData.find(t => t.id === activeTab) || tabsData[0];
  const ActiveIcon = activeData.icon;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden py-16 lg:py-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 architectural-grid" />
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="w-12 h-px bg-border" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {language === "en" ? "Overview" : "نظرة عامة"}
          </span>
          <div className="w-12 h-px bg-border" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-foreground text-center mb-8"
        >
          {language === "en" ? "Al Hamra Business Tower" : "برج الحمراء للأعمال"}
        </motion.h1>

        {/* Tab Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-card border border-border p-1 h-auto overflow-x-auto">
            {tabsData.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 flex items-center gap-2 text-sm transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label[language]}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[3/4] max-w-sm mx-auto rounded-sm overflow-hidden shadow-2xl"
              >
                <img
                  src={activeData.image}
                  alt={activeData.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/30" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute left-0 right-0 pointer-events-none"
                  style={{
                    top: activeData.imagePosition.top,
                    height: activeData.imagePosition.height,
                  }}
                >
                  <div className="absolute inset-0 border-2 border-primary/60 bg-primary/10" />
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Data Card */}
          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative bg-card border border-border p-8 lg:p-10"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-light text-foreground">
                      {activeData.title[language]}
                    </h2>
                  </div>
                  <p className="text-lg text-primary font-light">
                    {activeData.subtitle[language]}
                  </p>
                </div>

                <div className="text-muted-foreground leading-relaxed mb-8 space-y-4 text-sm lg:text-base">
                  {activeData.description[language].split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {activeData.stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                      className="text-center p-4 bg-secondary/50 border border-border/50"
                    >
                      <p className="text-lg lg:text-xl font-light text-foreground leading-tight">
                        {stat.value}
                      </p>
                      <p className="text-[10px] lg:text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                        {stat.label[language]}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className={`absolute top-0 ${dir === "rtl" ? "right-0" : "left-0"} w-1 h-full bg-primary`} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TowerTabbedDashboard;
