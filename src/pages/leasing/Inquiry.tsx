import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import towerAerial from "@/assets/tower-aerial.png";

const Inquiry = () => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const { ref: heroRef, isInView: heroInView } = useScrollReveal();

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
                {isEn ? "LEASING INQUIRY" : "استفسار التأجير"}
              </span>
              <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-4xl">
                {isEn
                  ? "Begin Your Conversation With Our Leasing Team."
                  : "ابدأ محادثتك مع فريق التأجير لدينا."}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Hero image */}
        <section className="pb-8">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[21/9] overflow-hidden"
            >
              <img src={towerAerial} alt="Al Hamra Tower" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </section>

        {/* Intro + Form */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg lg:text-xl text-foreground leading-relaxed max-w-3xl mb-20"
            >
              {isEn
                ? "Our leasing team is available to discuss space requirements, provide floor plans, and arrange private viewings of available suites."
                : "فريق التأجير لدينا متاح لمناقشة متطلبات المساحات وتقديم مخططات الطوابق وترتيب معاينات خاصة للأجنحة المتاحة."}
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl space-y-10"
            >
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                    {isEn ? "Full Name" : "الاسم الكامل"}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
                    placeholder={isEn ? "Your name" : "اسمك"}
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                    {isEn ? "Email" : "البريد الإلكتروني"}
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
                    placeholder={isEn ? "your@email.com" : "بريدك@الإلكتروني.com"}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                    {isEn ? "Company" : "الشركة"}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
                    placeholder={isEn ? "Company name" : "اسم الشركة"}
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                    {isEn ? "Space Requirement" : "متطلبات المساحة"}
                  </label>
                  <select className="w-full bg-transparent border-b-2 border-border py-4 text-foreground focus:outline-none focus:border-foreground transition-colors duration-300">
                    <option value="">{isEn ? "Select type" : "اختر النوع"}</option>
                    <option value="executive">{isEn ? "Executive Suite (250-500 sqm)" : "جناح تنفيذي"}</option>
                    <option value="full">{isEn ? "Full Floor (1,200-1,800 sqm)" : "طابق كامل"}</option>
                    <option value="campus">{isEn ? "Multi-Floor Campus (3,000+ sqm)" : "حرم متعدد الطوابق"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                  {isEn ? "Message" : "الرسالة"}
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
                  placeholder={isEn ? "Tell us about your requirements" : "أخبرنا عن متطلباتك"}
                />
              </div>

              <button
                type="button"
                className="group flex items-center gap-4 px-10 py-5 bg-foreground text-background text-sm uppercase tracking-[0.15em] hover:bg-foreground/90 transition-all duration-300"
              >
                <span>{isEn ? "Submit Inquiry" : "إرسال الاستفسار"}</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Inquiry;
