import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const { language, t } = useLanguage();

  const navSections = [
    {
      heading: { en: "The Tower", ar: "البرج" },
      links: [
        { label: { en: "Overview", ar: "نظرة عامة" }, href: "/tower" },
        { label: { en: "Rising", ar: "النهوض" }, href: "/tower/rising" },
        { label: { en: "Design & Engineering", ar: "التصميم والهندسة" }, href: "/tower/design" },
        { label: { en: "Awards & Recognition", ar: "الجوائز والتقدير" }, href: "/tower/recognition" },
      ],
    },
    {
      heading: { en: "Business", ar: "الأعمال" },
      links: [
        { label: { en: "Workplace Experience", ar: "تجربة مكان العمل" }, href: "/business/workplace-experience" },
        { label: { en: "Office Spaces & Floor Plans", ar: "المساحات المكتبية" }, href: "/business/office-spaces" },
        { label: { en: "Vertical Transportation", ar: "النقل العمودي" }, href: "/business/vertical-transportation" },
        { label: { en: "Connectivity & Integration", ar: "الاتصال والتكامل" }, href: "/business/connectivity" },
      ],
    },
    {
      heading: { en: "Experience", ar: "التجربة" },
      links: [
        { label: { en: "Services & Facilities", ar: "الخدمات والمرافق" }, href: "/services" },
        { label: { en: "Sustainability & Innovation", ar: "الاستدامة والابتكار" }, href: "/tower/sustainability" },
        { label: { en: "Location & Access", ar: "الموقع والوصول" }, href: "/location" },
      ],
    },
    {
      heading: { en: "Leasing", ar: "التأجير" },
      links: [
        { label: { en: "Leasing Opportunities", ar: "فرص التأجير" }, href: "/leasing/opportunities" },
        { label: { en: "Inquiry", ar: "استفسار" }, href: "/leasing/inquiry" },
        { label: { en: "Downloads", ar: "التحميلات" }, href: "/leasing/downloads" },
        { label: { en: "Contact", ar: "اتصل بنا" }, href: "/leasing/contact" },
      ],
    },
  ];

  const socialLinks = [
    { label: "Instagram", abbr: "Ig", url: "https://www.instagram.com/alhamratower" },
    { label: "Facebook", abbr: "Fb", url: "https://www.facebook.com/AlHamraTowerofficial" },
    { label: "X", abbr: "X", url: "https://x.com/AlHamraTower" },
    { label: "LinkedIn", abbr: "Li", url: "https://www.linkedin.com/company/al-hamra-real-estate-company" },
    { label: "YouTube", abbr: "Yt", url: "https://www.youtube.com/@alhamratower" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-20 bg-primary text-primary-foreground relative">
      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary flex items-center justify-center hover:bg-charcoal-light transition-colors duration-300"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo & Brand */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <span className="text-xl font-light tracking-[0.2em] uppercase">
                Al Hamra
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-primary-foreground/60 mt-0.5">
                Tower
              </span>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              {t("footer.tagline") || "Kuwait's architectural landmark. A place of gravity."}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-5">
            <h3 className="text-xs uppercase tracking-[0.2em] text-primary-foreground/40 mb-6">
              {t("footer.navigation") || "Navigation"}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {navSections.map((section) => (
                <div key={section.heading.en}>
                  <p className="text-sm font-medium text-primary-foreground/80 mb-3">
                    {section.heading[language]}
                  </p>
                  <nav className="space-y-2">
                    {section.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300"
                      >
                        {link.label[language]}
                      </a>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>

          {/* Legal & Social */}
          <div className="md:col-span-4 lg:col-span-4 space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-primary-foreground/40 mb-6">
                {t("footer.legal") || "Legal"}
              </h3>
              <div className="flex gap-6">
                <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300">
                  {t("footer.privacy")}
                </a>
                <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300">
                  {t("footer.terms")}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-primary-foreground/40 mb-6">
                {t("footer.connect") || "Connect"}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-primary-foreground/20 flex items-center justify-center text-xs text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.abbr}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            © 2026 Al Hamra Tower. {t("footer.rights")}
          </p>
          <p className="text-xs text-primary-foreground/40">
            Kuwait City, Kuwait
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
