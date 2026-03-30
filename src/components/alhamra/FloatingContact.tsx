import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, dir } = useLanguage();
  const isRTL = dir === "rtl";

  const contactOptions = [
    {
      icon: Phone,
      label: t("contact.phone"),
      value: "+965 2229 5000",
      href: "tel:+96522295000",
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
    {
      icon: Mail,
      label: t("contact.email"),
      value: "info@alhamra.com.kw",
      href: "mailto:info@alhamra.com.kw",
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      icon: MapPin,
      label: t("contact.visit"),
      value: t("location.title"),
      href: "/contact",
      isRoute: true,
      color: "bg-amber-500 hover:bg-amber-600",
    },
  ];

  return (
    <div className={`fixed bottom-24 ${isRTL ? "left-8" : "right-8"} z-50`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 space-y-3"
          >
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                transition={{ delay: index * 0.1, duration: 0.2 }}
              >
                {option.isRoute ? (
                  <Link
                    to={option.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${option.color} text-white shadow-lg transition-all duration-300 hover:shadow-xl group`}
                  >
                    <option.icon className="w-5 h-5 flex-shrink-0" />
                    <div className={`${isRTL ? "text-right" : "text-left"}`}>
                      <p className="text-xs opacity-80">{option.label}</p>
                      <p className="text-sm font-medium">{option.value}</p>
                    </div>
                  </Link>
                ) : (
                  <a
                    href={option.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${option.color} text-white shadow-lg transition-all duration-300 hover:shadow-xl group`}
                  >
                    <option.icon className="w-5 h-5 flex-shrink-0" />
                    <div className={`${isRTL ? "text-right" : "text-left"}`}>
                      <p className="text-xs opacity-80">{option.label}</p>
                      <p className="text-sm font-medium">{option.value}</p>
                    </div>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulse ring animation when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingContact;
