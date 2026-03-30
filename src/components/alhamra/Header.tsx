import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import alHamraLogo from "@/assets/al-hamra-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileAccordion(null);
  }, [location.pathname]);

  const navGroups = [
    {
      id: "tower",
      label: { en: "The Tower", ar: "البرج" },
      items: [
        { href: "/tower", label: { en: "Overview", ar: "نظرة عامة" } },
        { href: "/tower/rising", label: { en: "Rising", ar: "الصعود" } },
        { href: "/tower/design", label: { en: "Design & Engineering", ar: "التصميم والهندسة" } },
        { href: "/tower/recognition", label: { en: "Awards & Recognition", ar: "الجوائز والتقدير" } },
      ],
    },
    {
      id: "business",
      label: { en: "Business", ar: "الأعمال" },
      items: [
        { href: "/business/workplace-experience", label: { en: "Workplace Experience", ar: "تجربة مكان العمل" } },
        { href: "/business/office-spaces", label: { en: "Office Spaces", ar: "المساحات المكتبية" } },
        { href: "/business/vertical-transportation", label: { en: "Vertical Transportation", ar: "النقل العمودي" } },
        { href: "/business/connectivity", label: { en: "Connectivity", ar: "الاتصال" } },
      ],
    },
    {
      id: "experience",
      label: { en: "Experience", ar: "التجربة" },
      items: [
        { href: "/services", label: { en: "Services & Facilities", ar: "الخدمات والمرافق" } },
        { href: "/tower/sustainability", label: { en: "Sustainability", ar: "الاستدامة" } },
        { href: "/location", label: { en: "Location & Access", ar: "الموقع والوصول" } },
      ],
    },
    {
      id: "leasing",
      label: { en: "Leasing", ar: "التأجير" },
      items: [
        { href: "/leasing/opportunities", label: { en: "Opportunities", ar: "فرص التأجير" } },
        { href: "/leasing/inquiry", label: { en: "Inquiry", ar: "استفسار" } },
        { href: "/leasing/downloads", label: { en: "Downloads", ar: "التنزيلات" } },
        { href: "/leasing/contact", label: { en: "Contact", ar: "التواصل" } },
      ],
    },
  ];

  const isGroupActive = (group: typeof navGroups[0]) => {
    return group.items.some(item => location.pathname === item.href || location.pathname.startsWith(item.href + "/"));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border/30" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Text only, Crestline-inspired */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={alHamraLogo} 
              alt="Al Hamra Tower" 
              className="h-10 lg:h-12 w-auto object-contain"
            />
            <span className="text-lg font-sans font-medium tracking-[0.15em] uppercase text-foreground">
              Al Hamra
            </span>
          </Link>

          {/* Center - Location */}
          <span className="hidden lg:block text-sm text-muted-foreground tracking-wide">
            {language === "en" ? "Kuwait City, KW" : "مدينة الكويت"}
          </span>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navGroups.map((group) => (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(group.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`text-sm tracking-wide transition-colors duration-300 ${
                    isGroupActive(group) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {group.label[language]}
                </button>

                <AnimatePresence>
                  {activeDropdown === group.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-3"
                    >
                      <div className="bg-background border border-border/50 shadow-lg min-w-[200px] py-2">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={`block px-5 py-2.5 text-sm transition-colors duration-200 ${
                              location.pathname === item.href
                                ? "text-foreground bg-secondary/50"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                            }`}
                          >
                            {item.label[language]}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {language === "en" ? "عربي" : "EN"}
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="text-sm text-muted-foreground"
            >
              {language === "en" ? "عربي" : "EN"}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-border/30"
            >
              <nav className="py-6 space-y-1">
                {navGroups.map((group) => (
                  <div key={group.id}>
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === group.id ? null : group.id)}
                      className="w-full flex items-center justify-between py-3 text-base text-foreground"
                    >
                      <span>{group.label[language]}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          mobileAccordion === group.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === group.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-3 space-y-1">
                            {group.items.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setMenuOpen(false)}
                                className={`block py-2 text-sm ${
                                  location.pathname === item.href
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {item.label[language]}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
