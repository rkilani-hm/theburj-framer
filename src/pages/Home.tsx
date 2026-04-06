import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Header   from "@/components/alhamra/Header";
import Footer   from "@/components/alhamra/Footer";
import HeroSection from "@/components/alhamra/HeroSection";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── assets ── */
import towerBw1           from "@/assets/tower-bw-1.png";
import towerBw2           from "@/assets/tower-bw-2.png";
import towerBwAngle       from "@/assets/tower-bw-angle.png";
import lobbyArches        from "@/assets/lobby-arches.jpg";
import somTowerVertical   from "@/assets/som-tower-vertical.jpg";
import entranceDusk       from "@/assets/entrance-dusk.jpg";
import towerAerialGulf    from "@/assets/tower-aerial-gulf.jpg";
import panoramaCity       from "@/assets/panorama-city.jpg";
import somObservation     from "@/assets/som-observation.jpg";
import somTowerDetail     from "@/assets/som-tower-detail.jpg";
import kuwaitSkylineNight from "@/assets/kuwait-skyline-night.png";
import towerAerialSunset  from "@/assets/tower-aerial-sunset.png";
import interiorLobby      from "@/assets/interior-lobby.jpg";
import towerDetail        from "@/assets/tower-detail.jpg";
import officeCorridor     from "@/assets/office-corridor.jpg";
import waterfront         from "@/assets/waterfront-promenade.jpg";
import towerNight         from "@/assets/tower-night-illuminated.jpg";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Scroll-reveal hook
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const useReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  return { ref, inView };
};

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Animated counter
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const useCountUp = (end: number, active: boolean) => {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const t0 = Date.now();
    const dur = 2200;
    const id = setInterval(() => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [end, active]);
  return val;
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HOME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const Home = () => {
  const { language } = useLanguage();
  const t = (en: string, ar: string) => language === "en" ? en : ar;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        {/* 1 ── HERO */}
        <HeroSection />

        {/* 2 ── MARQUEE */}
        <Marquee language={language} />

        {/* 3 ── ABOUT */}
        <About t={t} />

        {/* 4 ── SERVICES accordion + sticky image */}
        <Services t={t} language={language} />

        {/* 5 ── STATS bar */}
        <Stats t={t} />

        {/* 6 ── PROJECTS numbered list */}
        <Projects t={t} language={language} />

        {/* 7 ── IMAGE STRIP */}
        <ImageStrip />

        {/* 8 ── AWARDS */}
        <Awards t={t} language={language} />

        {/* 9 ── TESTIMONIALS */}
        <Testimonials t={t} />

        {/* 10 ── CONTACT CTA */}
        <ContactCTA t={t} language={language} />
      </main>
      <Footer />
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MARQUEE — infinite ticker strip
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const Marquee = ({ language }: { language: string }) => {
  const copy = language === "en"
    ? "Al Hamra creates iconic, purposeful spaces that endure."
    : "الحمرا تبني فضاءات أيقونية وهادفة تدوم عبر الزمن.";
  const items = Array(8).fill(copy);
  return (
    <div className="border-t border-b border-border py-5 overflow-hidden bg-background">
      <div className="marquee-track">
        <div className="marquee-content">
          {[...items, ...items].map((txt, i) => (
            <span key={i} className="inline-flex items-center gap-0 whitespace-nowrap">
              <span className="text-sm font-serif italic font-light tracking-[0.1em] text-muted-foreground px-8">
                {txt}
              </span>
              <span className="text-primary text-xs px-2">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ABOUT — 2-col: text + staggered image pair
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const About = ({ t }: { t: (en: string, ar: string) => string }) => {
  const { ref, inView } = useReveal();
  return (
    <section id="about" className="px-6 lg:px-16 py-28 lg:py-40 bg-background">
      <motion.p
        initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }} className="overline mb-12">
        {t("About", "نبذة")}
      </motion.p>

      <div ref={ref} className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">
        {/* Text col */}
        <div>
          <motion.h2
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}
            className="text-[clamp(2rem,4.5vw,3.8rem)] font-serif font-light leading-[1.08] text-foreground mb-8">
            {t(
              "Kuwait's most iconic architectural achievement.",
              "أبرز إنجاز معماري في الكويت."
            )}
          </motion.h2>
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}
            className="space-y-5 text-muted-foreground font-light text-base leading-relaxed">
            <p>
              {t(
                "Al Hamra Business Tower stands as a structure of absolute presence — designed by Skidmore, Owings & Merrill to endure beyond trends and cycles. Its sculptural form rotates 60° from base to crown, reducing solar heat gain by 40% while framing panoramic views of the Arabian Gulf.",
                "يقف برج الحمراء للأعمال كهيكل ذو حضور مطلق، صممه مكتب سكيدمور أوينغز وميريل ليستمر بعيداً عن الصيحات والدورات. يدور شكله النحتي ٦٠ درجة من القاعدة إلى التاج، مما يقلل اكتساب الحرارة الشمسية بنسبة ٤٠٪."
              )}
            </p>
            <p>
              {t(
                "Rising 412 metres above Kuwait City, the tower houses grade-A offices, sky lobbies, and world-class amenities — all conceived for organisations that demand nothing less than exceptional.",
                "يرتفع ٤١٢ متراً فوق مدينة الكويت، ويضم مكاتب من الفئة الأولى وبهوات سماوية ومرافق عالمية المستوى."
              )}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={2}
            className="mt-10">
            <Link
              to="/tower"
              className="inline-flex items-center gap-3 text-sm font-light tracking-[0.15em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-primary hover:text-primary transition-colors duration-300 group">
              {t("Discover the Tower", "اكتشف البرج")}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Images col — Crestline staggered pair */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={3}
            className="img-zoom overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <img src={towerBw1} alt="Al Hamra Tower" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={4}
            className="img-zoom overflow-hidden mt-12" style={{ aspectRatio: "3/4" }}>
            <img src={towerBw2} alt="Tower detail" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SERVICES — accordion list + sticky image panel
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const servicesList = (t: (en: string, ar: string) => string) => [
  {
    title: t("ARCHITECTURAL EXCELLENCE", "التميز المعماري"),
    desc: t(
      "A sculpted form by SOM that rotates 60° from base to crown, reducing solar heat gain by 40% while maximising panoramic Gulf views.",
      "تصميم نحتي من SOM يدور ٦٠ درجة من القاعدة إلى التاج، يقلل اكتساب الحرارة الشمسية بنسبة ٤٠٪."
    ),
    img: somTowerVertical,
  },
  {
    title: t("PREMIUM WORKSPACES", "مساحات عمل متميزة"),
    desc: t(
      "Column-free floor plates from 900–2,300 sqm with floor-to-ceiling glazing, designed for HQ tenants and multi-tenant configurations.",
      "طوابق مرنة تتراوح من ٩٠٠ إلى ٢,٣٠٠ متر مربع مع زجاج من الأرض للسقف."
    ),
    img: lobbyArches,
  },
  {
    title: t("INTEGRATED SERVICES", "خدمات متكاملة"),
    desc: t(
      "24/7 operations centre, building management systems, security protocols and maintenance — all calibrated for seamless corporate performance.",
      "مركز عمليات ٢٤/٧ وأنظمة إدارة المبنى وبروتوكولات الأمان والصيانة."
    ),
    img: entranceDusk,
  },
  {
    title: t("LANDSCAPE ARCHITECTURE", "العمارة المناظر الطبيعية"),
    desc: t(
      "Positioned at the heart of Kuwait City's financial district with direct connectivity to major transportation networks and urban amenities.",
      "يقع في قلب الحي المالي بمدينة الكويت مع اتصال مباشر بشبكات النقل الرئيسية."
    ),
    img: towerAerialGulf,
  },
];

const Services = ({ t, language }: { t: (en: string, ar: string) => string; language: string }) => {
  const [open, setOpen] = useState<number>(0);
  const { ref, inView } = useReveal();
  const svcs = servicesList(t);

  return (
    <section id="services" className="px-6 lg:px-16 py-24 lg:py-36 bg-secondary">
      <motion.p
        initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }} className="overline mb-6">
        {t("Services", "الخدمات")}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-base text-muted-foreground max-w-xl mb-16 font-light leading-relaxed">
        {t(
          "Every element calibrated for corporate success — architecture, workspaces, services, and positioning.",
          "كل عنصر مُعاير لنجاح الأعمال — العمارة والمساحات والخدمات والموقع."
        )}
      </motion.p>

      <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Accordion */}
        <div className="divide-y divide-border">
          {svcs.map((svc, i) => (
            <motion.div key={i}
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i}>
              <button
                className="w-full flex items-center justify-between py-6 text-left group"
                onClick={() => setOpen(i)}>
                <span className={`text-[0.72rem] font-light tracking-[0.18em] uppercase transition-colors duration-300 ${open === i ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                  {svc.title}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.28 }}
                  className="text-2xl font-light text-muted-foreground flex-shrink-0 ml-4">
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden">
                    <p className="pb-6 text-sm text-muted-foreground font-light leading-relaxed">
                      {svc.desc}
                    </p>
                    {/* Mobile: inline image */}
                    <div className="lg:hidden img-zoom overflow-hidden mb-6" style={{ aspectRatio: "16/9" }}>
                      <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Sticky image panel — desktop */}
        <div className="hidden lg:block sticky top-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="img-zoom overflow-hidden"
              style={{ aspectRatio: "3/4", maxHeight: "70vh" }}>
              <img src={svcs[open].img} alt={svcs[open].title} className="w-full h-full object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STATS bar — dark background, counting numbers
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const StatItem = ({ end, suffix, label, inView, idx }: { end: number; suffix: string; label: string; inView: boolean; idx: number }) => {
  const n = useCountUp(end, inView);
  return (
    <motion.div
      variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={idx}
      className="text-center lg:text-left lg:px-12 first:lg:pl-0">
      <p className="font-serif font-light text-background tabular-nums"
        style={{ fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: 1 }}>
        {n}<span className="text-primary">{suffix}</span>
      </p>
      <p className="overline text-background/40 mt-3">{label}</p>
    </motion.div>
  );
};

const Stats = ({ t }: { t: (en: string, ar: string) => string }) => {
  const { ref, inView } = useReveal();
  const stats = [
    { end: 412,  suffix: "m", label: t("Tower Height",   "ارتفاع البرج") },
    { end: 77,   suffix: "",  label: t("Floors",          "طابق") },
    { end: 2011, suffix: "",  label: t("Completed",       "الإنجاز") },
    { end: 195,  suffix: "k", label: t("GFA sqm",         "م.م.إ") },
  ];
  return (
    <section className="bg-foreground" ref={ref}>
      <div className="px-6 lg:px-16 py-20 lg:py-28 grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 divide-x-0 lg:divide-x divide-background/10">
        {stats.map((s, i) => (
          <StatItem key={i} end={s.end} suffix={s.suffix} label={s.label} inView={inView} idx={i} />
        ))}
      </div>
    </section>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROJECTS — numbered list + floating hover image
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const projectsList = (t: (en: string, ar: string) => string) => [
  { n: "01", loc: t("Kuwait City, KW", "مدينة الكويت"),  title: t("Grade-A Office Suites",        "مكاتب الفئة الأولى"),     href: "/business/office-spaces",         img: lobbyArches },
  { n: "02", loc: t("Kuwait City, KW", "مدينة الكويت"),  title: t("Sky Lobby & Business Lounge",  "البهو السماوي"),           href: "/business/workplace-experience",  img: somObservation },
  { n: "03", loc: t("Kuwait City, KW", "مدينة الكويت"),  title: t("Premium Retail Podium",        "رواق التجزئة المتميز"),    href: "/services",                       img: entranceDusk },
  { n: "04", loc: t("Kuwait City, KW", "مدينة الكويت"),  title: t("Tower Exterior & Façade",      "واجهة البرج الخارجية"),    href: "/tower/design",                   img: somTowerDetail },
  { n: "05", loc: t("Kuwait City, KW", "مدينة الكويت"),  title: t("Panoramic Gulf Views",         "إطلالات خليجية بانورامية"), href: "/tower",                          img: towerAerialGulf },
];

const Projects = ({ t, language }: { t: (en: string, ar: string) => string; language: string }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { ref, inView } = useReveal();
  const projects = projectsList(t);

  return (
    <section id="projects" className="px-6 lg:px-16 py-24 lg:py-40 bg-background relative"
      onMouseMove={e => setMouse({ x: e.clientX, y: e.clientY })}>
      <motion.p
        initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }} className="overline mb-14">
        {t("Projects", "المشاريع")}
      </motion.p>

      {/* Floating hover image */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed pointer-events-none z-50 overflow-hidden shadow-2xl"
            style={{
              left: mouse.x + 24,
              top: mouse.y - 100,
              width: "clamp(200px,22vw,320px)",
              aspectRatio: "3/4",
            }}>
            <img src={projects[hovered].img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={ref} className="max-w-3xl">
        {projects.map((p, i) => (
          <motion.div key={i}
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i}>
            <Link
              to={p.href}
              className="flex items-baseline justify-between gap-6 py-7 border-t border-border last:border-b group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}>
              <div className="flex items-baseline gap-6">
                <span className="overline text-border group-hover:text-primary transition-colors min-w-[2.5rem]">
                  /{p.n}
                </span>
                <div>
                  <p className="overline text-primary mb-1">{p.loc}</p>
                  <h3 className="font-serif font-light text-foreground group-hover:text-primary transition-colors"
                    style={{ fontSize: "clamp(1.1rem,2.2vw,1.7rem)" }}>
                    {p.title}
                  </h3>
                </div>
              </div>
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 text-xl flex-shrink-0">
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   IMAGE STRIP — horizontal scroll gallery
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const stripImages = [
  towerBwAngle, panoramaCity, lobbyArches, somObservation,
  towerAerialSunset, entranceDusk, towerDetail, waterfront, towerNight,
];

const ImageStrip = () => {
  const { ref, inView } = useReveal();
  return (
    <section className="py-4 bg-background overflow-hidden">
      <div ref={ref}
        className="flex gap-3 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        {stripImages.map((src, i) => (
          <motion.div key={i}
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={inView ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
            className="flex-shrink-0 img-zoom overflow-hidden"
            style={{
              width: i % 3 === 0 ? "clamp(160px,22vw,300px)" : "clamp(130px,16vw,220px)",
              aspectRatio: "3/4",
            }}>
            <img src={src} alt="Al Hamra" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   AWARDS — Crestline-style list with year column
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const awardsList = [
  { award: "CTBUH Best Tall Building — Middle East & Africa", year: "2012" },
  { award: "Emirates Glass LEAF Award — Best Structural Design",   year: "2011" },
  { award: "MIPIM Architectural Review — Future Project Award",     year: "2007" },
  { award: "World Architecture Festival — Commercial Shortlist",    year: "2012" },
  { award: "International Property Awards — Best Commercial High-Rise", year: "2013" },
  { award: "Gulf Real Estate Award — Best Commercial Tower",        year: "2015" },
  { award: "Cityscape Global — Best Architecture Award",            year: "2016" },
  { award: "Architizer A+ Award — Mixed-Use Category",             year: "2020" },
  { award: "Forbes Middle East — Top Real Estate Development",      year: "2022" },
];

const Awards = ({ t, language }: { t: (en: string, ar: string) => string; language: string }) => {
  const { ref, inView } = useReveal();
  return (
    <section id="awards" className="px-6 lg:px-16 py-24 lg:py-40 bg-secondary">
      <motion.p
        initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }} className="overline mb-14">
        {t("Awards & Recognition", "الجوائز والتقدير")}
      </motion.p>
      <div ref={ref}>
        {awardsList.map((a, i) => (
          <motion.div key={i}
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i}
            className="flex items-baseline justify-between gap-6 py-5 border-t border-border last:border-b group hover:text-primary transition-colors duration-300">
            <span className="font-serif font-light text-foreground group-hover:text-primary transition-colors"
              style={{ fontSize: "clamp(1rem,1.8vw,1.4rem)" }}>
              {a.award}
            </span>
            <span className="overline text-muted-foreground flex-shrink-0">{a.year}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TESTIMONIALS — Crestline-style carousel
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const testimonials = [
  {
    name: "Faris Al-Mutawa",
    role: "CEO, Gulf Holdings",
    quote: "Al Hamra's presence elevates everything around it. Our team's performance changed the day we moved in — the tower sets the standard.",
    img: officeCorridor,
  },
  {
    name: "Sarah Mitchell",
    role: "Partner, International Law Firm",
    quote: "The floor plates, the light, the views — no other address in Kuwait compares. Our clients are always impressed before the meeting even starts.",
    img: lobbyArches,
  },
  {
    name: "Khaled Al-Sabah",
    role: "Director, Investment Authority",
    quote: "A building that commands respect. The SOM design is as relevant today as it was at completion — timeless, precise, and unmistakably Kuwait.",
    img: somObservation,
  },
  {
    name: "Nora Jensen",
    role: "Head of MENA, Tech Corporation",
    quote: "From the lobby to the boardroom, every detail signals excellence. Al Hamra is where Kuwait's future gets decided.",
    img: interiorLobby,
  },
];

const Testimonials = ({ t }: { t: (en: string, ar: string) => string }) => {
  const [idx, setIdx] = useState(0);
  const { ref, inView } = useReveal();
  const len = testimonials.length;

  return (
    <section className="px-6 lg:px-16 py-24 lg:py-40 bg-background">
      <motion.p
        initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }} className="overline mb-14">
        {t("Testimonials", "شهادات")}
      </motion.p>

      <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Quote */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
              <blockquote className="font-serif font-light text-foreground mb-8 leading-snug"
                style={{ fontSize: "clamp(1.3rem,2.4vw,2rem)" }}>
                "{testimonials[idx].quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden flex-shrink-0">
                  <img src={testimonials[idx].img} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-light text-foreground">{testimonials[idx].name}</p>
                  <p className="overline mt-0.5">{testimonials[idx].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-12">
            <button
              onClick={() => setIdx((idx - 1 + len) % len)}
              className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              ←
            </button>
            <span className="overline">{String(idx + 1).padStart(2,"0")} / {String(len).padStart(2,"0")}</span>
            <button
              onClick={() => setIdx((idx + 1) % len)}
              className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              →
            </button>
          </div>
        </div>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:block img-zoom overflow-hidden"
            style={{ aspectRatio: "4/5", maxHeight: "60vh" }}>
            <img src={testimonials[idx].img} alt={testimonials[idx].name} className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONTACT CTA — parallax background
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ContactCTA = ({ t, language }: { t: (en: string, ar: string) => string; language: string }) => {
  const secRef = useRef<HTMLElement>(null);
  const { ref, inView } = useReveal();
  const { scrollYProgress } = useScroll({ target: secRef, offset: ["start end","end start"] });
  const bgY = useTransform(scrollYProgress, [0,1], ["0%","28%"]);

  return (
    <section ref={secRef} className="relative overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={kuwaitSkylineNight} alt="Kuwait skyline"
          className="w-full h-[130%] object-cover" />
        <div className="absolute inset-0 bg-foreground/75" />
      </motion.div>

      <div ref={ref} className="relative z-10 px-6 lg:px-16 py-32 lg:py-48">
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}
          className="overline text-background/40 mb-8">
          {t("Inquire", "استفسر")}
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}
          className="font-serif font-light text-background max-w-2xl mb-8 leading-[1.08]"
          style={{ fontSize: "clamp(2rem,4.5vw,3.8rem)" }}>
          {t(
            "Share your idea with our experts.",
            "شارك فكرتك مع خبرائنا."
          )}
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={2}
          className="text-background/60 max-w-lg mb-12 font-light leading-relaxed">
          {t(
            "Connect with our team for expert advice and a seamless leasing process to achieve your business goals at Kuwait's most iconic address.",
            "تواصل مع فريقنا للحصول على مشورة متخصصة وعملية تأجير سلسة."
          )}
        </motion.p>
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={3}
          className="flex flex-col sm:flex-row gap-4">
          <Link to="/leasing/inquiry"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-background hover:bg-primary/80 transition-colors group text-sm font-light tracking-[0.12em] uppercase">
            {t("Get in Touch", "تواصل معنا")}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="mailto:leasing@alhamra.com.kw"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-background/30 text-background hover:bg-background/10 transition-colors text-sm font-light tracking-[0.12em] uppercase">
            leasing@alhamra.com.kw
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
