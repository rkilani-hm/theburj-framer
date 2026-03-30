import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Phone, Mail, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import towerEntranceNight from "@/assets/tower-entrance-night.jpg";

const LeasingContact = () => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const { ref: heroRef, isInView: heroInView } = useScrollReveal();

  const contactDetails = [
    {
      icon: MapPin,
      label: isEn ? "Address" : "العنوان",
      lines: ["Al Hamra Tower", "Sharq, Kuwait City", "Kuwait"]
    },
    {
      icon: Phone,
      label: isEn ? "Phone" : "الهاتف",
      lines: ["+965 2227 0000"]
    },
    {
      icon: Mail,
      label: isEn ? "Email" : "البريد الإلكتروني",
      lines: ["leasing@alhamratower.com"]
    },
    {
      icon: Clock,
      label: isEn ? "Business Hours" : "ساعات العمل",
      lines: [isEn ? "Sunday – Thursday" : "الأحد – الخميس", isEn ? "8:00 AM – 6:00 PM" : "٨:٠٠ ص – ٦:٠٠ م"]
    }
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
                {isEn ? "CONTACT" : "تواصل"}
              </span>
              <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-medium uppercase leading-[1.05] tracking-[-0.02em] text-foreground max-w-4xl">
                {isEn
                  ? "Connect With Our Leasing Team."
                  : "تواصل مع فريق التأجير لدينا."}
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
              <img src={towerEntranceNight} alt="Al Hamra Tower entrance" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </section>

        {/* Contact details + Form */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-20">
              {/* Left: Contact details */}
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-lg text-foreground leading-relaxed mb-16"
                >
                  {isEn
                    ? "Our leasing team is available to discuss space requirements, arrange viewings, and provide detailed specifications for available suites."
                    : "فريق التأجير لدينا متاح لمناقشة متطلبات المساحات وترتيب المعاينات وتقديم المواصفات التفصيلية للأجنحة المتاحة."}
                </motion.p>

                <div className="space-y-0 divide-y divide-border">
                  {contactDetails.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="py-8 flex gap-6 items-start group"
                    >
                      <div className="w-12 h-12 shrink-0 border border-border flex items-center justify-center transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                        <detail.icon size={18} className="text-muted-foreground transition-colors duration-300 group-hover:text-background" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{detail.label}</p>
                        {detail.lines.map((line, j) => (
                          <p key={j} className="text-foreground">{line}</p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: Form */}
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-10"
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

                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">
                    {isEn ? "Subject" : "الموضوع"}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b-2 border-border py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
                    placeholder={isEn ? "Subject of inquiry" : "موضوع الاستفسار"}
                  />
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
                  <span>{isEn ? "Send Message" : "إرسال الرسالة"}</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="bg-secondary/30 border-t border-border">
          <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
            <div className="aspect-[21/9] bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  {isEn ? "Al Hamra Tower, Sharq, Kuwait City" : "برج الحمراء، الشرق، مدينة الكويت"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LeasingContact;
