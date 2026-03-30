import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import { Award, Trophy, Star, FileText } from "lucide-react";
import towerNight from "@/assets/tower-night-illuminated.jpg";
import towerTopClouds from "@/assets/tower-top-clouds.png";
import skylineHero from "@/assets/skyline-hero.jpg";

const Recognition = () => {
  const heroReveal = useScrollReveal();

  const awards = [
    {
      year: "2007",
      title: "Structural Engineers World Congress Paper",
      organization: "CTBUH — Presented research on sculpted high-rise design",
      icon: FileText,
      highlight: true
    },
    {
      year: "2012",
      title: "Best Tall Building Middle East & Africa",
      organization: "Council on Tall Buildings and Urban Habitat (CTBUH)",
      icon: Trophy
    },
    {
      year: "2014",
      title: "Outstanding Structure Award",
      organization: "International Association for Bridge and Structural Engineering",
      icon: Award
    },
    {
      year: "2015",
      title: "Excellence in Engineering",
      organization: "American Society of Civil Engineers",
      icon: Star
    },
    {
      year: "2016",
      title: "Sustainable Design Recognition",
      organization: "Middle East Architecture Awards",
      icon: Award
    },
    {
      year: "2019",
      title: "Decade of Excellence",
      organization: "Gulf Construction Awards",
      icon: Trophy
    },
  ];

  const keywords = ["Free Form Design", "Sculpted Tower", "Twisted Tower", "Hyperbolic Paraboloid"];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <img 
            src={towerNight} 
            alt="Al Hamra Tower Recognition" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <motion.div 
            ref={heroReveal.ref}
            initial="hidden"
            animate={heroReveal.isInView ? "visible" : "hidden"}
            variants={revealVariants.fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 p-8 lg:p-16"
          >
            <h1 className="text-4xl lg:text-6xl font-light tracking-wide text-foreground mb-4">
              Global Acknowledgement
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Al Hamra Business Tower has been recognized by leading architectural and development institutions for its design excellence and long-term presence on the global skyline. Awards include the Council on Tall Buildings and Urban Habitat's Best Tall Building – 10 Year Award and multiple international architectural accolades affirming its engineering and aesthetic legacy.
            </p>
          </motion.div>
        </section>

        {/* CTBUH Research Paper — Single Card Layout (#23) */}
        <section className="py-24 px-6 lg:px-12 bg-primary/5">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <p className="text-sm uppercase tracking-widest text-primary mb-4">Published Research</p>
            </motion.div>
            
            {/* Single Research Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 lg:p-12 border border-border bg-background"
            >
              <h2 className="text-2xl lg:text-3xl font-semibold tracking-wide mb-3">
                "Sculpted High Rise: The Al Hamra Tower"
              </h2>
              <p className="text-muted-foreground mb-6">
                CTBUH Research Paper — Structural Engineers World Congress 2007
              </p>
              
              {/* Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-muted-foreground mb-8">
                <p><span className="font-medium text-foreground">Authors:</span> Mark Sarkisian, Neville Mathias, Aaron Mazeika (SOM)</p>
                <span className="hidden sm:inline text-border">|</span>
                <p><span className="font-medium text-foreground">Publisher:</span> Council on Tall Buildings and Urban Habitat</p>
              </div>
              
              {/* Keywords */}
              <div className="flex flex-wrap gap-3">
                {keywords.map((keyword) => (
                  <span 
                    key={keyword}
                    className="px-4 py-2 text-sm border border-border bg-muted/30 text-foreground"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Pull Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 p-8 lg:p-12 bg-muted/30"
            >
              <blockquote className="text-xl lg:text-2xl font-light leading-relaxed mb-6 italic">
                "The design and construction of the Al Hamra Tower is a significant step forward 
                both in terms of architectural design form and process. By blending conventional 
                engineering tools with parametric modeling software, SOM has brought together the 
                realms of free-form design and the super high-rise skyscraper."
              </blockquote>
              <cite className="text-muted-foreground not-italic">
                — CTBUH Research Paper, Structural Engineers World Congress 2007
              </cite>
            </motion.div>
          </div>
        </section>

        {/* Awards Timeline */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl font-light tracking-wide text-center mb-16">
                Awards & Honors
              </h2>
              <div className="space-y-8">
                {awards.map((award, index) => (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex gap-6 items-start p-6 border bg-background hover:bg-muted/30 transition-colors ${
                      award.highlight ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-16 h-16 flex items-center justify-center ${
                      award.highlight ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <award.icon className={`w-6 h-6 ${award.highlight ? 'text-primary' : 'text-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm text-muted-foreground">{award.year}</span>
                        {award.highlight && (
                          <span className="text-xs text-primary bg-primary/10 px-2 py-1">Foundational</span>
                        )}
                      </div>
                      <h3 className="text-lg font-light mb-1">{award.title}</h3>
                      <p className="text-sm text-muted-foreground">{award.organization}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Global Standing */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src={towerTopClouds} 
                  alt="Tower Among Clouds" 
                  className="w-full h-auto"
                />
              </motion.div>
              <div className="space-y-8">
                <h2 className="text-3xl font-light tracking-wide">
                  Global Standing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al Hamra Tower stands among the world's most distinguished skyscrapers, 
                  recognized not only for its height but for its innovative approach to 
                  sustainable design in extreme climates.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The tower's unique form—a spiraling geometry developed by subtracting a 
                  quadrant of a typical floor plan—represents a paradigm shift in how 
                  super high-rise buildings can be conceived and constructed.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <p className="text-4xl font-light">23rd</p>
                    <p className="text-sm text-muted-foreground">Tallest in the World (at completion)</p>
                  </div>
                  <div>
                    <p className="text-4xl font-light">#1</p>
                    <p className="text-sm text-muted-foreground">Tallest Sculpted Tower</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Contribution */}
        <section className="py-24 px-6 lg:px-12 bg-charcoal-900">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl font-light tracking-wide text-white">
                  Engineering Contribution
                </h2>
                <p className="text-grey-400 leading-relaxed">
                  Beyond architectural accolades, Al Hamra Tower advanced the field of structural 
                  engineering. The development of four parallel 3D finite element analysis models, 
                  innovative creep compatibility analysis, and non-linear buckling studies for the 
                  lobby lamella structure have informed subsequent super high-rise projects worldwide.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <p className="text-3xl font-light text-white">4</p>
                    <p className="text-sm text-grey-500">Parallel Analysis Models</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-white">189,000<span className="text-lg">kN</span></p>
                    <p className="text-sm text-grey-500">Lamella Buckling Capacity</p>
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src={skylineHero} 
                  alt="Kuwait City Skyline" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-grey-500 mt-3">Al Hamra Tower defining the Kuwait City skyline</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Collaborators */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-light tracking-wide mb-12">Project Collaborators</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { name: "SOM", role: "Lead Architect & Engineer" },
                { name: "VDA", role: "Associate Architect" },
                { name: "Gehry Technologies", role: "Digital Project Software" },
                { name: "Ahmadiah Contracting & Trading Co. KCSC", role: "General Contractor" },
              ].map((collaborator) => (
                <div key={collaborator.name} className="text-center">
                  <p className="font-light">{collaborator.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{collaborator.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Recognition;
