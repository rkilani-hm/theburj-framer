import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import alHamraLogo from "@/assets/al-hamra-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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

  const isGroupActive = (group: typeof navGroups[0]) =>
    group.items.some(item => location.pathname === item.href || location.pathname.startsWith(item.href + "/"));

  // Stagger variants for fullscreen menu
  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 40, skewY: 2 },
    visible: {
      opacity: 1, y: 0, skewY: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0, y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          menuOpen
            ? "bg-transparent"
            : scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/30"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group relative z-[70]">
              <img
                src={alHamraLogo}
                alt="Al Hamra Tower"
                className={`h-10 lg:h-12 w-auto object-contain transition-all duration-500 ${
                  menuOpen ? "brightness-0 invert" : ""
                }`}
              />
              <span className={`text-lg font-sans font-medium tracking-[0.15em] uppercase transition-colors duration-500 ${
                menuOpen ? "text-background" : "text-foreground"
              }`}>
                Al Hamra
              </span>
            </Link>

            {/* Center - Location */}
            <span className={`hidden lg:block text-sm tracking-wide transition-colors duration-500 ${
              menuOpen ? "text-background/50" : "text-muted-foreground"
            }`}>
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
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 pt-3"
                      >
                        <div className="bg-background border border-border/50 shadow-xl min-w-[220px] py-2 backdrop-blur-sm">
                          {group.items.map((item, i) => (
                            <motion.div
                              key={item.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04, duration: 0.3 }}
                            >
                              <Link
                                to={item.href}
                                className={`block px-5 py-2.5 text-sm transition-all duration-200 ${
                                  location.pathname === item.href
                                    ? "text-foreground bg-secondary/50 border-l-2 border-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/30 hover:pl-6"
                                }`}
                              >
                                {item.label[language]}
                              </Link>
                            </motion.div>
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
            <div className="flex items-center gap-4 lg:hidden relative z-[70]">
              <button
                onClick={toggleLanguage}
                className={`text-sm transition-colors duration-500 ${
                  menuOpen ? "text-background/60" : "text-muted-foreground"
                }`}
              >
                {language === "en" ? "عربي" : "EN"}
              </button>

              {/* Hamburger → X animated */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative w-8 h-8 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <span className={`block absolute w-6 h-[1.5px] transition-all duration-500 ease-out ${
                  menuOpen
                    ? "bg-background rotate-45 translate-y-0"
                    : "bg-foreground -translate-y-1.5"
                }`} />
                <span className={`block absolute w-6 h-[1.5px] transition-all duration-500 ease-out ${
                  menuOpen
                    ? "bg-background -rotate-45 translate-y-0"
                    : "bg-foreground translate-y-1.5"
                }`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 32px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 32px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] bg-foreground"
          >
            <div className="container mx-auto px-6 pt-24 pb-12 h-full overflow-y-auto">
              <motion.nav
                variants={menuContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {navGroups.map((group) => (
                  <motion.div key={group.id} variants={menuItemVariants}>
                    <h3 className="text-xs uppercase tracking-[0.3em] text-background/30 mb-3">
                      {group.label[language]}
                    </h3>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`block py-2 text-2xl font-serif font-medium transition-all duration-300 ${
                            location.pathname === item.href
                              ? "text-primary"
                              : "text-background/70 hover:text-background hover:translate-x-3"
                          }`}
                        >
                          {item.label[language]}
                        </Link>
                      ))}
                    </div>
                    <div className="h-px bg-background/10 mt-4" />
                  </motion.div>
                ))}

                {/* Footer info in menu */}
                <motion.div variants={menuItemVariants} className="pt-8">
                  <p className="text-sm text-background/30 tracking-wide">
                    {language === "en" ? "Kuwait City, State of Kuwait" : "مدينة الكويت، دولة الكويت"}
                  </p>
                  <a
                    href="mailto:leasing@alhamra.com.kw"
                    className="text-sm text-background/50 hover:text-background transition-colors mt-1 block"
                  >
                    leasing@alhamra.com.kw
                  </a>
                </motion.div>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
