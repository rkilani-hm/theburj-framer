import Header from "@/components/alhamra/Header";
import HeroSection from "@/components/alhamra/HeroSection";
import Footer from "@/components/alhamra/Footer";
import HomePageLinks from "@/components/alhamra/HomePageLinks";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import towerAerialSunset from "@/assets/tower-aerial-sunset.png";
import kuwaitSkylineNight from "@/assets/kuwait-skyline-night.png";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import entranceDusk from "@/assets/entrance-dusk.jpg";
import towerBw1 from "@/assets/tower-bw-1.png";
import towerBw2 from "@/assets/tower-bw-2.png";
import panoramaCity from "@/assets/panorama-city.jpg";
import somTowerVertical from "@/assets/som-tower-vertical.jpg";
import towerAerialGulf from "@/assets/tower-aerial-gulf.jpg";
import somObservation from "@/assets/som-observation.jpg";

const Home = () => {
  const { language, t } = useLanguage();
  const { ref: aboutRef, isInView: aboutInView } = useScrollReveal();
  const { ref: servicesRef, isInView: servicesInView } = useScrollReveal();
  const { ref: statsRef, isInView: statsInView } = useScrollReveal();
  const { ref: galleryRef, isInView: galleryInView } = useScrollReveal();
  const { ref: awardsRef, isInView: awardsInView } = useScrollReveal();
  const { ref: ctaRef, isInView: ctaInView } = useScrollReveal();

  const services = [
    {
      title: language === "en" ? "ARCHITECTURAL EXCELLENCE" : "التميز المعماري",
      description: language === "en"
        ? "A sculpted form by SOM that rotates 60° from base to crown, reducing solar heat gain by 40% while maximizing panoramic Gulf views."
        : "تصميم نحتي من SOM يدور ٦٠ درجة من القاعدة إلى التاج، يقلل اكتساب الحرارة الشمسية بنسبة ٤٠٪ مع تعظيم الإطلالات البانورامية.",
      image: somTowerVertical,
    },
    {
      title: language === "en" ? "PREMIUM WORKSPACES" : "مساحات عمل متميزة",
      description: language === "en"
        ? "Flexible floor plates ranging from 900 to 2,300 sqm with floor-to-ceiling glazing, designed for headquarters and multi-tenant configurations."
        : "طوابق مرنة تتراوح من ٩٠٠ إلى ٢,٣٠٠ متر مربع مع زجاج من الأرض للسقف، مصممة للمقرات والتكوينات متعددة المستأجرين.",
      image: lobbyArches,
    },
    {
      title: language === "en" ? "INTEGRATED SERVICES" : "خدمات متكاملة",
      description: language === "en"
        ? "24/7 operations center, building management systems, security protocols, and maintenance — all calibrated for seamless corporate performance."
        : "مركز عمليات ٢٤/٧، أنظمة إدارة المبنى، بروتوكولات الأمان، والصيانة — كلها مصممة للأداء المؤسسي السلس.",
      image: entranceDusk,
    },
    {
      title: language === "en" ? "STRATEGIC LOCATION" : "موقع استراتيجي",
      description: language === "en"
        ? "Positioned at the heart of Kuwait City's financial district with direct connectivity to major transportation networks and urban amenities."
        : "يقع في قلب الحي المالي بمدينة الكويت مع اتصال مباشر بشبكات النقل الرئيسية والمرافق الحضرية.",
      image: towerAerialGulf,
    },
  ];

  const stats = [
    { value: "412m", label: language === "en" ? "Height" : "الارتفاع" },
    { value: "77", label: language === "en" ? "Floors" : "طابق" },
    { value: "2011", label: language === "en" ? "Completed" : "الإنجاز" },
    { value: "SOM", label: language === "en" ? "Architect" : "المهندس" },
  ];

  const awards = [
    { name: "CTBUH Best Tall Building", project: "Middle East & Africa", year: "2012" },
    { name: "Emirates Glass LEAF Award", project: "Best Structural Design", year: "2011" },
    { name: "MIPIM Architectural Review", project: "Future Project Award", year: "2007" },
    { name: "World Architecture Festival", project: "Shortlisted", year: "2012" },
    { name: "International Property Awards", project: "Best Commercial High-Rise", year: "2012" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />

        {/* ABOUT Section */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div ref={aboutRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Text */}
              <motion.div
                initial="hidden"
                animate={aboutInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">
                  {language === "en" ? "ABOUT" : "نبذة"}
                </span>
                <p className="text-lg lg:text-xl text-foreground leading-relaxed mb-8">
                  {language === "en"
                    ? "Al Hamra Business Tower stands as Kuwait's most significant architectural achievement — a structure of absolute presence, designed to endure beyond trends and cycles. Rising from the heart of Kuwait City, the tower commands attention through restraint."
                    : "يقف برج الحمراء للأعمال كأهم إنجاز معماري في الكويت — هيكل ذو حضور مطلق، صُمم ليستمر بعيداً عن الصيحات والدورات. يرتفع من قلب مدينة الكويت، يستحوذ البرج على الانتباه من خلال ضبط النفس."}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {language === "en"
                    ? "Designed by Skidmore, Owings & Merrill, the tower's distinctive sculptural form emerged from a synthesis of engineering innovation and environmental response — creating a structure that is both functionally superior and aesthetically striking."
                    : "صممه مكتب سكيدمور أوينغز وميريل، نشأ الشكل النحتي المميز للبرج من تركيب الابتكار الهندسي والاستجابة البيئية — مما خلق هيكلاً متفوقاً وظيفياً ومذهلاً جمالياً."}
                </p>
              </motion.div>

              {/* Images - Staggered pair */}
              <motion.div
                initial="hidden"
                animate={aboutInView ? "visible" : "hidden"}
                variants={revealVariants.fadeUp}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={towerBw1} alt="Al Hamra Tower" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] overflow-hidden mt-12">
                  <img src={towerBw2} alt="Tower detail" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES Section */}
        <section className="py-24 lg:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={servicesRef}
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
                {language === "en" ? "SERVICES" : "الخدمات"}
              </span>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                {language === "en"
                  ? "Al Hamra Tower offers a complete ecosystem of architectural excellence, premium workspaces, integrated services, and strategic positioning — every element calibrated for corporate success."
                  : "يقدم برج الحمراء منظومة متكاملة من التميز المعماري والمساحات المتميزة والخدمات المتكاملة والموقع الاستراتيجي."}
              </p>
            </motion.div>

            {/* Service Cards - Horizontal list with hover reveal */}
            <div className="space-y-0 border-t border-border">
              {services.map((service, index) => (
                <ServiceRow key={index} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-foreground">
          <div ref={statsRef} className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="text-3xl lg:text-4xl font-sans font-light text-background mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-background/50 tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid - Masonry-style */}
        <section className="py-4 bg-background">
          <div ref={galleryRef} className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[towerAerialSunset, somObservation, panoramaCity, lobbyArches, entranceDusk, towerBw1, somTowerDetail, towerAerialGulf].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`overflow-hidden ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"} ${i === 2 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                >
                  <img
                    src={img}
                    alt="Al Hamra Tower"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS / Page Links */}
        <HomePageLinks />

        {/* AWARDS Section */}
        <section className="py-24 lg:py-32 bg-background border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={awardsRef}
              initial="hidden"
              animate={awardsInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {language === "en" ? "AWARDS" : "الجوائز"}
              </span>
            </motion.div>

            {/* Awards Table */}
            <div className="divide-y divide-border">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={awardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="grid grid-cols-12 gap-4 py-6 lg:py-8 items-center"
                >
                  <div className="col-span-12 lg:col-span-5">
                    <p className="text-base lg:text-lg font-serif text-foreground">{award.name}</p>
                  </div>
                  <div className="col-span-8 lg:col-span-5">
                    <p className="text-sm text-muted-foreground">{award.project}</p>
                  </div>
                  <div className="col-span-4 lg:col-span-2 text-right">
                    <p className="text-sm text-muted-foreground">{award.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={kuwaitSkylineNight} alt="Kuwait skyline" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/80" />
          </div>

          <div ref={ctaRef} className="container mx-auto px-6 lg:px-12 relative z-10 py-24 lg:py-32">
            <motion.div
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-background/40 mb-8 block">
                {language === "en" ? "INQUIRE" : "استفسر"}
              </span>
              <h2 className="text-3xl lg:text-4xl font-serif font-medium text-background mb-6 leading-tight">
                {language === "en"
                  ? "Your address at Kuwait's most iconic landmark."
                  : "عنوانك في أبرز معلم في الكويت."}
              </h2>
              <p className="text-base text-background/60 mb-10 leading-relaxed">
                {language === "en"
                  ? "A limited collection of premium office spaces. Request availability and schedule a private viewing."
                  : "مجموعة محدودة من المساحات المكتبية المتميزة. اطلب التوفر وجدولة معاينة خاصة."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/leasing/opportunities"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-background text-foreground hover:bg-background/90 transition-colors group"
                >
                  <span className="text-sm uppercase tracking-wider">
                    {language === "en" ? "View Opportunities" : "عرض الفرص"}
                  </span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-background/30 text-background hover:bg-background/10 transition-colors"
                >
                  <span className="text-sm uppercase tracking-wider">
                    {language === "en" ? "Contact Us" : "اتصل بنا"}
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

/* Service Row with hover image reveal */
const ServiceRow = ({ service, index }: { service: { title: string; description: string; image: string }; index: number }) => {
  const { ref, isInView } = useScrollReveal({ margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group grid grid-cols-12 gap-4 items-start py-8 lg:py-10 border-b border-border cursor-default"
    >
      <div className="col-span-12 lg:col-span-4">
        <h3 className="text-sm font-sans font-medium uppercase tracking-wider text-foreground">
          {service.title}
        </h3>
      </div>
      <div className="col-span-12 lg:col-span-5">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>
      <div className="hidden lg:block col-span-3">
        <div className="aspect-[16/10] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
