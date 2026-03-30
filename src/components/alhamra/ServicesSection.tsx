import { useLanguage } from "@/contexts/LanguageContext";
import {
  Zap, Droplets, Wind, Wifi, ShieldCheck, HeartPulse,
  Clock, Wrench, Flame, Building2, Phone, Camera,
  Sparkles, Users, Car, Coffee
} from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import lobbyInterior from "@/assets/interior-lobby.jpg";
import towerBwDetail from "@/assets/tower-bw-detail.png";
import kuwaitHorizon from "@/assets/kuwait-horizon.png";
import towerEntranceFountain from "@/assets/tower-entrance-fountain.jpg";
import towerEntranceNight from "@/assets/tower-entrance-night.jpg";

const ServicesSection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const { ref: headerRef, isInView: headerInView } = useScrollReveal();
  const { ref: coreRef, isInView: coreInView } = useScrollReveal();
  const { ref: facilitiesRef, isInView: facilitiesInView } = useScrollReveal();
  const { ref: addtlRef, isInView: addtlInView } = useScrollReveal();
  const { ref: closingRef, isInView: closingInView } = useScrollReveal();

  const coreServices = [
    {
      icon: Zap,
      title: isEn ? "Electrical Systems" : "الأنظمة الكهربائية",
      desc: isEn
        ? "Five dedicated substations distributed across basement, lower, mid, and upper tower levels deliver uninterrupted power. Full generator redundancy ensures zero-downtime continuity for every tenanted floor."
        : "خمس محطات فرعية مخصصة موزعة عبر الطوابق السفلية والوسطى والعلوية توفر طاقة متواصلة مع نسخ احتياطي كامل بالمولدات.",
    },
    {
      icon: Droplets,
      title: isEn ? "Water Supply & Plumbing" : "إمدادات المياه والسباكة",
      desc: isEn
        ? "Centralized water distribution with booster pump stations serving all 77 floors. Routine testing, backflow prevention, and 24-hour leak response maintain consistent pressure and quality throughout the tower."
        : "توزيع مياه مركزي مع محطات ضخ معززة تخدم جميع الطوابق الـ77 مع اختبارات دورية واستجابة على مدار الساعة.",
    },
    {
      icon: Wind,
      title: isEn ? "Air Conditioning & HVAC" : "التكييف والتهوية",
      desc: isEn
        ? "District-cooled chilled water system paired with variable air volume units on every floor. Individual zone control allows tenants to regulate temperature independently while the central plant maintains peak efficiency."
        : "نظام تبريد مركزي بالمياه المبردة مع وحدات حجم هواء متغيرة في كل طابق. تحكم مستقل بالمناطق لكل مستأجر.",
    },
    {
      icon: Wifi,
      title: isEn ? "ICT & Telecommunications" : "تكنولوجيا المعلومات والاتصالات",
      desc: isEn
        ? "Fiber-optic backbone with structured cabling to every floor. Multiple carrier access, dedicated server rooms, and a centralized Building Management System connected via high-speed data networks."
        : "بنية تحتية من الألياف الضوئية مع كابلات منظمة لكل طابق. وصول متعدد لمزودي الخدمة وغرف خوادم مخصصة ونظام إدارة مبانٍ مركزي.",
    },
    {
      icon: ShieldCheck,
      title: isEn ? "Security & Access Control" : "الأمن والتحكم بالدخول",
      desc: isEn
        ? "Round-the-clock manned security complemented by CCTV surveillance across all floors, lobbies, and parking levels. Smart card access, visitor management protocols, and direct coordination with civil defense authorities."
        : "أمن على مدار الساعة مع كاميرات مراقبة في جميع الطوابق والردهات والمواقف. بطاقات دخول ذكية وبروتوكولات إدارة الزوار.",
    },
    {
      icon: HeartPulse,
      title: isEn ? "On-Site Medical Room" : "غرفة طبية داخلية",
      desc: isEn
        ? "A fully equipped medical room staffed during business hours, with first-aid capabilities and emergency response coordination. Defibrillators stationed at key points across the tower."
        : "غرفة طبية مجهزة بالكامل مع طاقم خلال ساعات العمل وقدرات إسعافات أولية وتنسيق استجابة طوارئ.",
    },
  ];

  const facilityServices = [
    {
      icon: Flame,
      title: isEn ? "Fire & Life Safety" : "السلامة من الحرائق",
      desc: isEn
        ? "Siemens FireFinder XLSV system with dedicated refuge floors at Levels 29 and 54. Pressurized stairwells, sprinkler coverage on every floor, and annual civil defense drills."
        : "نظام سيمنز للكشف عن الحرائق مع طوابق إيواء مخصصة وسلالم مضغوطة ورشاشات في كل طابق.",
    },
    {
      icon: Wrench,
      title: isEn ? "Preventive Maintenance" : "الصيانة الوقائية",
      desc: isEn
        ? "Scheduled maintenance programs for all mechanical, electrical, and plumbing systems. Dedicated engineering teams ensure equipment longevity and minimize unplanned downtime."
        : "برامج صيانة مجدولة لجميع الأنظمة الميكانيكية والكهربائية والسباكة مع فرق هندسية مخصصة.",
    },
    {
      icon: Building2,
      title: isEn ? "Common Area Management" : "إدارة المناطق المشتركة",
      desc: isEn
        ? "Lobby presentation, corridor upkeep, restroom servicing, and elevator cabin maintenance — all maintained to five-star hospitality standards by a resident facilities team."
        : "صيانة الردهات والممرات ودورات المياه وكبائن المصاعد وفق معايير ضيافة من فئة خمس نجوم.",
    },
    {
      icon: Camera,
      title: isEn ? "CCTV & Monitoring" : "المراقبة بالكاميرات",
      desc: isEn
        ? "Comprehensive closed-circuit coverage with 24/7 monitoring from a centralized control room. Recorded footage retained per regulatory requirements with secure archival protocols."
        : "تغطية شاملة بالكاميرات مع مراقبة على مدار الساعة من غرفة تحكم مركزية وأرشفة آمنة.",
    },
  ];

  const additionalServices = [
    { icon: Car, title: isEn ? "Valet & Parking" : "خدمة صف السيارات", desc: isEn ? "2,000+ spaces across 11 levels with VIP drop-off and valet service." : "أكثر من 2,000 مكان عبر 11 طابقاً مع خدمة صف سيارات." },
    { icon: Sparkles, title: isEn ? "Cleaning & Housekeeping" : "التنظيف والتدبير", desc: isEn ? "Professional daily cleaning of tenanted floors and common areas." : "تنظيف يومي احترافي للطوابق المستأجرة والمناطق المشتركة." },
    { icon: Phone, title: isEn ? "Help Desk & Dispatch" : "مكتب المساعدة", desc: isEn ? "Centralized service desk for all maintenance requests with tracked response times." : "مكتب خدمة مركزي لجميع طلبات الصيانة مع تتبع أوقات الاستجابة." },
    { icon: Users, title: isEn ? "Reception & Concierge" : "الاستقبال والكونسيرج", desc: isEn ? "Dedicated lobby reception with tenant coordination and visitor escort services." : "استقبال مخصص في الردهة مع تنسيق المستأجرين وخدمات مرافقة الزوار." },
    { icon: Coffee, title: isEn ? "Pantry & Break Areas" : "مناطق الاستراحة", desc: isEn ? "Serviced pantry spaces on designated floors with filtered water and refreshment stations." : "مناطق استراحة مخدومة في طوابق مخصصة مع محطات مياه مفلترة." },
    { icon: Clock, title: isEn ? "After-Hours Support" : "الدعم بعد الدوام", desc: isEn ? "Engineering and security teams remain on-site around the clock — every day of the year." : "فرق هندسية وأمنية متواجدة على مدار الساعة طوال أيام السنة." },
  ];

  return (
    <section id="services" className="bg-background relative">
      {/* Hero Section */}
      <div className="py-section bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {isEn ? "24/7 Operations" : "عمليات على مدار الساعة"}
              </span>
            </div>
            <h1 className="text-headline font-light tracking-wide text-foreground mb-8">
              {isEn ? "Services & Facilities" : "الخدمات والمرافق"}
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl mb-6">
              {isEn
                ? "Al Hamra Tower operates as a fully managed environment. A resident engineering and facilities team delivers round-the-clock support across every building system — from power distribution and climate control to security, telecommunications, and emergency response."
                : "يعمل برج الحمراء كبيئة مُدارة بالكامل. يقدم فريق هندسي ومرافق مقيم دعماً على مدار الساعة عبر جميع أنظمة المبنى — من توزيع الطاقة والتحكم المناخي إلى الأمن والاتصالات والاستجابة للطوارئ."}
            </p>
            <p className="text-body text-muted-foreground max-w-2xl">
              {isEn
                ? "Every service is designed to anticipate needs, remove friction, and allow occupants to focus on what matters most."
                : "كل خدمة مصممة لتوقع الاحتياجات وإزالة العقبات والسماح للشاغلين بالتركيز على ما يهم."}
            </p>
          </motion.div>

          {/* Hero images */}
          <div className="grid lg:grid-cols-2 gap-6 mt-16">
            <motion.div
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="aspect-[16/9] overflow-hidden group relative"
            >
              <img src={towerEntranceFountain} alt="Tower entrance" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{isEn ? "Grand Arrival" : "الوصول الكبير"}</p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="aspect-[16/9] overflow-hidden group relative"
            >
              <img src={towerEntranceNight} alt="Tower entrance at night" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-light">{isEn ? "Evening Operations" : "العمليات المسائية"}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Core Building Systems — 24/7 */}
      <div className="py-section bg-background texture-noise">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={coreRef}
            initial="hidden"
            animate={coreInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {isEn ? "Core Systems" : "الأنظمة الأساسية"}
              </span>
            </div>
            <h2 className="text-subheadline font-light text-foreground mb-4">
              {isEn ? "Building Systems — Continuous Operation" : "أنظمة المبنى — تشغيل متواصل"}
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl">
              {isEn
                ? "Six principal systems form the operational backbone of the tower, each monitored and maintained around the clock by dedicated engineering personnel."
                : "ستة أنظمة رئيسية تشكل العمود الفقري التشغيلي للبرج، كل منها يُراقب ويُصان على مدار الساعة."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={coreInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="p-8 border border-border hover:border-foreground bg-secondary/20 hover:bg-secondary/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 border border-border flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                  <service.icon size={24} className="text-muted-foreground transition-colors duration-300 group-hover:text-background" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Facility Management */}
      <div className="py-section bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              ref={facilitiesRef}
              initial="hidden"
              animate={facilitiesInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {isEn ? "Facility Management" : "إدارة المرافق"}
                </span>
              </div>
              <h2 className="text-subheadline font-light text-foreground mb-6">
                {isEn ? "Maintained to the Highest Standard" : "صيانة وفق أعلى المعايير"}
              </h2>
              <div className="space-y-8">
                {facilityServices.map((item, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    animate={facilitiesInView ? "visible" : "hidden"}
                    variants={revealVariants.fadeUp}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                    className="flex gap-5 group"
                  >
                    <div className="w-12 h-12 shrink-0 border border-border flex items-center justify-center transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                      <item.icon size={20} className="text-muted-foreground transition-colors duration-300 group-hover:text-background" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={facilitiesInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img src={lobbyInterior} alt="Tower lobby" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-border -z-10" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Additional Services Grid */}
      <div className="py-section bg-background texture-noise">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={addtlRef}
            initial="hidden"
            animate={addtlInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {isEn ? "Tenant Support" : "دعم المستأجرين"}
              </span>
            </div>
            <h2 className="text-subheadline font-light text-foreground mb-4">
              {isEn ? "Comprehensive Daily Support" : "دعم يومي شامل"}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={addtlInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="p-6 border border-border hover:border-foreground bg-secondary/30 hover:bg-secondary transition-all duration-300 group"
              >
                <div className="w-12 h-12 border border-border flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                  <service.icon size={20} className="text-muted-foreground transition-colors duration-300 group-hover:text-background" />
                </div>
                <h4 className="font-medium text-foreground mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing Statement */}
      <div className="py-section bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              ref={closingRef}
              initial="hidden"
              animate={closingInView ? "visible" : "hidden"}
              variants={revealVariants.slideLeft}
              transition={{ duration: 0.8 }}
              className="aspect-[3/4] overflow-hidden group"
            >
              <img src={towerBwDetail} alt="Architectural detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>

            <motion.div
              initial="hidden"
              animate={closingInView ? "visible" : "hidden"}
              variants={revealVariants.slideRight}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-subheadline font-light text-foreground">
                {isEn ? "Operational Excellence, Delivered with Discretion" : "تميز تشغيلي، يُقدَّم بلباقة"}
              </h3>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {isEn
                  ? "Behind every seamless day at Al Hamra Tower stands an infrastructure of precision — engineering teams, monitoring systems, and service protocols working in concert so that the building's occupants experience only quiet, uninterrupted productivity."
                  : "وراء كل يوم سلس في برج الحمراء تقف بنية تحتية من الدقة — فرق هندسية وأنظمة مراقبة وبروتوكولات خدمة تعمل بتناغم."}
              </p>
              <p className="text-body text-muted-foreground leading-relaxed">
                {isEn
                  ? "From the substations beneath the tower to the crown-level systems above, every component is maintained, monitored, and managed to ensure the building performs at its highest standard — every hour of every day."
                  : "من المحطات الفرعية تحت البرج إلى أنظمة القمة، كل مكوّن يُصان ويُراقب ويُدار لضمان أداء المبنى بأعلى معاييره — كل ساعة من كل يوم."}
              </p>
              <div className="pt-6 border-t border-border">
                <div className="flex items-center gap-4">
                  <Clock size={20} className="text-muted-foreground" />
                  <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    {isEn ? "24 / 7 / 365 — Continuous Operation" : "24 / 7 / 365 — تشغيل متواصل"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Panorama */}
          <motion.div
            initial="hidden"
            animate={closingInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20"
          >
            <div className="aspect-[21/9] overflow-hidden group">
              <img src={kuwaitHorizon} alt="Kuwait horizon panorama" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;