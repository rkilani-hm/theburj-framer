import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { Award, Trophy, Star, Medal, Crown } from "lucide-react";

const AwardsSection = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollReveal();
  const { ref: awardsRef, isInView: awardsInView } = useScrollReveal();

  const awards = [
    {
      year: "2012",
      title: t("awards.award1.title"),
      organization: t("awards.award1.org"),
      category: t("awards.award1.category"),
      icon: Trophy,
    },
    {
      year: "2013",
      title: t("awards.award2.title"),
      organization: t("awards.award2.org"),
      category: t("awards.award2.category"),
      icon: Award,
    },
    {
      year: "2014",
      title: t("awards.award3.title"),
      organization: t("awards.award3.org"),
      category: t("awards.award3.category"),
      icon: Star,
    },
    {
      year: "2016",
      title: t("awards.award4.title"),
      organization: t("awards.award4.org"),
      category: t("awards.award4.category"),
      icon: Medal,
    },
    {
      year: "2019",
      title: t("awards.award5.title"),
      organization: t("awards.award5.org"),
      category: t("awards.award5.category"),
      icon: Crown,
    },
  ];

  return (
    <section className="py-section bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={revealVariants.fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("awards.label")}
            </span>
          </div>
          <h2 className="text-headline font-light tracking-wide text-foreground mb-6">
            {t("awards.title")}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            {t("awards.desc")}
          </p>
        </motion.div>

        {/* Awards Timeline */}
        <motion.div
          ref={awardsRef}
          initial="hidden"
          animate={awardsInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-border transform lg:-translate-x-1/2 hidden lg:block" />

          <div className="space-y-8 lg:space-y-0">
            {awards.map((award, index) => {
              const IconComponent = award.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  variants={revealVariants.fadeUp}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                    index !== awards.length - 1 ? "lg:mb-12" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 lg:left-1/2 top-8 w-3 h-3 bg-foreground rounded-full transform lg:-translate-x-1/2 hidden lg:block z-10" />
                  
                  {/* Content */}
                  <div
                    className={`${
                      isEven ? "lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"
                    }`}
                  >
                    <div className="group p-8 bg-background border border-border hover:border-foreground/20 transition-all duration-500 hover:shadow-lg">
                      {/* Year Badge */}
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? "lg:justify-end" : ""}`}>
                        <span className="text-sm font-medium text-foreground bg-secondary px-3 py-1 border border-border">
                          {award.year}
                        </span>
                        <div className="w-10 h-10 flex items-center justify-center bg-secondary border border-border group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>
                      
                      {/* Award Details */}
                      <h3 className="text-xl font-light text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {award.title}
                      </h3>
                      <p className="text-sm text-muted-foreground uppercase tracking-[0.15em] mb-3">
                        {award.organization}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {award.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsSection;
