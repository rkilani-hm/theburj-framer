import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const { language, t } = useLanguage();

  const navColumns = [
    {
      heading: { en: "The Tower", ar: "البرج" },
      links: [
        { label: { en: "Overview", ar: "نظرة عامة" }, href: "/tower" },
        { label: { en: "Rising", ar: "النهوض" }, href: "/tower/rising" },
        { label: { en: "Design & Engineering", ar: "التصميم والهندسة" }, href: "/tower/design" },
        { label: { en: "Recognition", ar: "التقدير" }, href: "/tower/recognition" },
      ],
    },
    {
      heading: { en: "Business", ar: "الأعمال" },
      links: [
        { label: { en: "Workplace", ar: "بيئة العمل" }, href: "/business/workplace-experience" },
        { label: { en: "Office Spaces", ar: "المساحات المكتبية" }, href: "/business/office-spaces" },
        { label: { en: "Transportation", ar: "النقل" }, href: "/business/vertical-transportation" },
        { label: { en: "Connectivity", ar: "الاتصال" }, href: "/business/connectivity" },
      ],
    },
    {
      heading: { en: "Experience", ar: "التجربة" },
      links: [
        { label: { en: "Services", ar: "الخدمات" }, href: "/services" },
        { label: { en: "Sustainability", ar: "الاستدامة" }, href: "/tower/sustainability" },
        { label: { en: "Location", ar: "الموقع" }, href: "/location" },
      ],
    },
    {
      heading: { en: "Leasing", ar: "التأجير" },
      links: [
        { label: { en: "Opportunities", ar: "الفرص" }, href: "/leasing/opportunities" },
        { label: { en: "Inquiry", ar: "استفسار" }, href: "/leasing/inquiry" },
        { label: { en: "Downloads", ar: "التنزيلات" }, href: "/leasing/downloads" },
        { label: { en: "Contact", ar: "التواصل" }, href: "/leasing/contact" },
      ],
    },
  ];

  const socialLinks = [
    { label: "Instagram", url: "https://www.instagram.com/alhamratower" },
    { label: "Facebook", url: "https://www.facebook.com/AlHamraTowerofficial" },
    { label: "X", url: "https://x.com/AlHamraTower" },
    { label: "LinkedIn", url: "https://www.linkedin.com/company/al-hamra-real-estate-company" },
    { label: "YouTube", url: "https://www.youtube.com/@alhamratower" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-28">
        {/* Top: Brand + Back to top */}
        <div className="flex items-start justify-between mb-20">
          <div>
            <h2 className="text-3xl lg:text-4xl font-sans font-medium uppercase tracking-[0.1em]">
              Al Hamra
            </h2>
            <p className="text-sm text-background/40 mt-2 tracking-wide">
              {language === "en" ? "Kuwait's Architectural Landmark" : "المعلم المعماري للكويت"}
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-sm text-background/50 hover:text-background transition-colors duration-300 group"
          >
            <span className="hidden lg:inline tracking-wider uppercase">
              {language === "en" ? "Back to top" : "العودة للأعلى"}
            </span>
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20">
          {navColumns.map((col) => (
            <div key={col.heading.en}>
              <h3 className="text-xs uppercase tracking-[0.2em] text-background/30 mb-6">
                {col.heading[language]}
              </h3>
              <nav className="space-y-3">
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block text-sm text-background/60 hover:text-background transition-colors duration-300"
                  >
                    {link.label[language]}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-6 mb-20">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-background/40 hover:text-background transition-colors duration-300"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/30">
            © 2026 Al Hamra Real Estate Co. {language === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-background/30 hover:text-background/60 transition-colors">
              {language === "en" ? "Privacy" : "الخصوصية"}
            </a>
            <a href="#" className="text-xs text-background/30 hover:text-background/60 transition-colors">
              {language === "en" ? "Terms" : "الشروط"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
