import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import somTowerSkyline from "@/assets/som-tower-skyline.jpg";
import somTowerDetail from "@/assets/som-tower-detail.jpg";
import somLobby from "@/assets/som-lobby.jpg";
import somObservation from "@/assets/som-observation.jpg";
import somTowerVertical from "@/assets/som-tower-vertical.jpg";
import lobbyArches from "@/assets/lobby-arches.jpg";
import entranceDusk from "@/assets/entrance-dusk.jpg";
import entranceNightFacade from "@/assets/entrance-night-facade.jpg";
import towerStreetContext from "@/assets/tower-street-context.jpg";
import somTowerNight from "@/assets/som-tower-night.jpg";
import towerCityContext from "@/assets/tower-city-context.jpg";
import towerFacadeTwisted from "@/assets/tower-facade-twisted.png";
import towerLowangleClouds from "@/assets/tower-lowangle-clouds.png";
import LamellaVisualization from "@/components/alhamra/LamellaVisualization";
import FloorPlanSelector from "@/components/alhamra/FloorPlanSelector";

const DesignEngineering = () => {
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const floorPlanReveal = useScrollReveal();
  const lobbyReveal = useScrollReveal();
  const lamellaReveal = useScrollReveal();

  const features = [
    {
      title: "Architectural Concept",
      description: "The tower's asymmetrical, carved form is a purposeful response to solar exposure and environment. A quarter of each floor plate is strategically removed to reduce heat gain while enhancing views."
    },
    {
      title: "Solar Response",
      description: "The south facade's limestone cladding acts as a passive performance measure against the desert sun, reducing interior thermal stress."
    },
    {
      title: "Façade and Structure",
      description: "Glass facades on three sides frame sweeping vistas, while engineered concrete structure supports the sculpted mass."
    },
    {
      title: "Lobby and Arrival",
      description: "A dramatic column-free lobby of approximately 24 metres height defines the arrival experience."
    }
  ];

  const specs = [
    { label: "Building Height", value: "412m", detail: "Kuwait's tallest structure" },
    { label: "Number of Stories", value: "74", detail: "Plus mechanical floors" },
    { label: "Foundation Mat", value: "5,800m²", detail: "Spanning full footprint" },
    { label: "Gross Area", value: "195,000m²", detail: "Office & retail space" },
    { label: "Concrete Volume", value: "85,000m³", detail: "High-performance mix" },
    { label: "Concrete Strength", value: "50–80 MPa", detail: "Cube strength range" },
    { label: "Shear Wall", value: "1,200mm", detail: "Maximum thickness" },
    { label: "Perimeter Columns", value: "700–1,200mm", detail: "Square sections" },
    { label: "Floor Slab", value: "160mm", detail: "× 6.0m span" },
  ];

  const innovations = [
    {
      title: "Hyperbolic Paraboloid Walls",
      description: "Two reinforced-concrete flared walls extend the full 412m height. The southeast wall leans INTO the building (lightly loaded), while the southwest wall leans AWAY, carrying enormous concentrated loads—a unique structural behavior unprecedented at this scale."
    },
    {
      title: "Torsional Gravity Response",
      description: "The tower twists elastically under gravity loads alone. Counter-clockwise circumferential forces at each slab-to-flared-wall intersection create cumulative torsional moment from zero at top to maximum at base. SOM developed creep compatibility analysis using ACI 209R-92 guidelines."
    },
    {
      title: "Cantilevered Truss System",
      description: "The observation deck's curtain wall is supported by an innovative cantilevered truss system that eliminates the need for columns, providing unobstructed 360-degree views from the 130-foot-high space."
    },
    {
      title: "Sloped Perimeter Columns",
      description: "Columns along the exterior slope inwards at the base, defining the street-level appearance while efficiently transferring the tower's loads to the foundation system."
    },
    {
      title: "Composite Column System",
      description: "From the foundation mat to Level 29, perimeter columns incorporate embedded W360 steel sections within reinforced concrete, creating a hybrid system that optimizes both strength and constructability."
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <img 
            src={somTowerSkyline} 
            alt="Al Hamra Tower Architecture" 
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
              Design That Performs
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Form, climate, and engineering in service of architecture
            </p>
          </motion.div>
        </section>

        {/* Design Philosophy */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <p className="text-sm uppercase tracking-widest text-primary">By Skidmore, Owings & Merrill</p>
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                  A Timeless, Elegant Marker
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The tower's asymmetrical carved profile responds directly to solar exposure, 
                  optimizing comfort while shaping a distinctive skyline identity. The massing 
                  reduces heat gain and enhances shading, transforming environmental constraints 
                  into architectural advantage.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Glass curtain wall systems combined with stone cladding on solar-exposed surfaces 
                  ensure durability and performance across Kuwait's demanding climate.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
                  <div>
                    <p className="text-3xl font-light">412<span className="text-lg">m</span></p>
                    <p className="text-sm text-muted-foreground">Building Height</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">74</p>
                    <p className="text-sm text-muted-foreground">Stories</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">195,000<span className="text-lg">m²</span></p>
                    <p className="text-sm text-muted-foreground">Gross Area</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">10,000<span className="text-lg">m²</span></p>
                    <p className="text-sm text-muted-foreground">Site Area</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={somTowerVertical} 
                  alt="Al Hamra Tower Vertical View" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Architectural Features — "Defining Elements" */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={featuresReveal.ref}
              initial="hidden"
              animate={featuresReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl font-light tracking-wide text-center mb-16">
                Defining Elements
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-8 bg-background border border-border"
                  >
                    <h3 className="text-xl font-light mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technical Specifications — moved here per #11 */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl font-light tracking-wide text-center mb-16">
                Technical Specifications
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 border border-border bg-background text-center"
                  >
                    <p className="text-3xl font-light mb-2">{spec.value}</p>
                    <p className="text-sm text-foreground mb-1">{spec.label}</p>
                    <p className="text-xs text-muted-foreground">{spec.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Floor Plan Selector */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              ref={floorPlanReveal.ref}
              initial="hidden"
              animate={floorPlanReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <FloorPlanSelector />
            </motion.div>
          </div>
        </section>

        {/* Arrival Experience — moved BEFORE Lobby per #10 */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-light tracking-wide text-center mb-16">
              Arrival Experience
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 md:row-span-2"
              >
                <img 
                  src={entranceDusk} 
                  alt="Tower Entrance at Dusk" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <img 
                  src={entranceNightFacade} 
                  alt="Entrance Night Facade" 
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <img 
                  src={towerStreetContext} 
                  alt="Tower Street Context" 
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Grand Lobby Section */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={lobbyReveal.ref}
              initial="hidden"
              animate={lobbyReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="order-2 lg:order-1">
                <img 
                  src={lobbyArches} 
                  alt="Al Hamra Tower Lobby" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-muted-foreground mt-3">Lobby interior with lamella bracing structure</p>
              </div>
              <div className="space-y-8 order-1 lg:order-2">
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                  Lobby Experience
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  A 24-meter-high column-free lobby establishes immediate presence and spatial 
                  clarity. The grand lobby on the north side of the tower extends from the core 
                  to its perimeter frame.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The lobby's dramatic scale and carefully orchestrated light create an arrival 
                  experience befitting Kuwait's tallest building.
                </p>
                <div className="flex gap-8 pt-4">
                  <div>
                    <p className="text-3xl font-light">24<span className="text-lg">m</span></p>
                    <p className="text-sm text-muted-foreground">Lobby Height</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">7.6<span className="text-lg">m</span></p>
                    <p className="text-sm text-muted-foreground">Column Offset</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lamella Structure */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              ref={lamellaReveal.ref}
              initial="hidden"
              animate={lamellaReveal.isInView ? "visible" : "hidden"}
              variants={revealVariants.fadeUp}
              transition={{ duration: 0.8 }}
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-3xl lg:text-4xl font-light tracking-wide">
                    Structural Innovation
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    High-performance concrete systems engineered to support the tower's sculpted 
                    form and vertical demands. The lobby's innovative lamella bracing scheme 
                    features 5 distinct element types, each contributing to overall stability.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Mechanical and service floors are integrated throughout the tower, ensuring 
                    operational efficiency across all levels. Life safety design includes 
                    engineered safety and circulation systems designed for long-term resilience.
                  </p>
                  <LamellaVisualization />
                </div>
                <div>
                  <img 
                    src={somLobby} 
                    alt="Lamella Structure Detail" 
                    className="w-full h-auto"
                  />
                  <p className="text-xs text-muted-foreground mt-3">Photo: Nick Merrick © Hedrich Blessing</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Observation Deck */}
        <section className="py-24 px-6 lg:px-12 bg-charcoal-900">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-primary">
                  Sky Deck & Restaurant
                </h2>
                <p className="text-grey-400 leading-relaxed">
                  A restaurant and observation deck sit at the top of the tower in a 130-foot-high 
                  space. Visitors are treated to tremendous, unobstructed views of the city thanks 
                  to a cantilevered truss system that supports the curtain wall and reduces the 
                  amount of columns needed.
                </p>
                <div className="flex gap-8 pt-4">
                  <div>
                    <p className="text-3xl font-light text-white">130<span className="text-lg">ft</span></p>
                    <p className="text-sm text-grey-400">Observation Height</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-white">360°</p>
                    <p className="text-sm text-grey-400">Panoramic Views</p>
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
                  src={somObservation} 
                  alt="Observation Deck" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-grey-400 mt-3">Photo: Nick Merrick © Hedrich Blessing</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Facade Detail */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={somTowerDetail} 
                alt="Architectural Detail" 
                className="w-full h-auto"
              />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Façade detail showing the interplay of stone cladding and glass curtain wall systems
              </p>
            </motion.div>
          </div>
        </section>

        {/* Structural Innovations */}
        <section className="py-24 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-light tracking-wide mb-12">
                  Structural Innovations
                </h2>
                <div className="space-y-8">
                  {innovations.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="pb-8 border-b border-border last:border-0"
                    >
                      <h3 className="text-xl font-light mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:sticky lg:top-32"
              >
                <img 
                  src={towerFacadeTwisted} 
                  alt="Tower Twisted Facade Detail" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-muted-foreground mt-3">The hyperbolic paraboloid walls create the tower's distinctive twist</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Load Path Visualization */}
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
                  src={towerCityContext} 
                  alt="Tower Structural Detail" 
                  className="w-full h-auto"
                />
                <p className="text-xs text-muted-foreground mt-3">Photo: Nick Merrick © Hedrich Blessing</p>
              </motion.div>
              <div className="space-y-8">
                <h2 className="text-3xl font-light tracking-wide">
                  Gravity Load Path
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The tower's center of mass is offset 7.0 meters north of its geometric center—a 
                  consequence of the spiraling geometry that creates the iconic sculptural form.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The southwest flared wall, leaning away from the building, carries enormous concentrated 
                  loads. This required careful functional planning to locate heavy equipment away from this 
                  quadrant, demonstrating how architectural vision and engineering constraints informed 
                  each other throughout the design process.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-border">
                  <div>
                    <p className="text-3xl font-light">7.0<span className="text-lg">m</span></p>
                    <p className="text-sm text-muted-foreground">Center of Mass Offset</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">700<span className="text-lg">mm</span></p>
                    <p className="text-sm text-muted-foreground">Gravity Beam Depth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DesignEngineering;
