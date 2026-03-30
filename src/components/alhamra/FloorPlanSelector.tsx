import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloorLevel {
  level: number;
  label: string;
  rotation: number;
  description: string;
  cutAngle: number; // The angle where the quadrant cut begins
}

const floorLevels: FloorLevel[] = [
  {
    level: 0,
    label: "Ground",
    rotation: 0,
    cutAngle: 180, // Cut starts from west
    description: "Base floor plate — the cut begins on the west side of the south facade"
  },
  {
    level: 20,
    label: "Level 20",
    rotation: 16,
    cutAngle: 196,
    description: "The carved quadrant has rotated 16° counter-clockwise"
  },
  {
    level: 40,
    label: "Level 40",
    rotation: 32,
    cutAngle: 212,
    description: "Mid-tower — the spiral geometry is clearly visible in the shifting cut"
  },
  {
    level: 55,
    label: "Level 55",
    rotation: 44,
    cutAngle: 224,
    description: "Upper sky lobby zone — the cut now faces southwest"
  },
  {
    level: 74,
    label: "Level 74",
    rotation: 60,
    cutAngle: 240, // Cut ends facing east
    description: "Crown — the full 60° rotation complete, cut now on the east side"
  }
];

const FloorPlanSelector = () => {
  const [activeLevel, setActiveLevel] = useState(0);
  const currentFloor = floorLevels[activeLevel];

  return (
    <div className="bg-background border border-border p-8 lg:p-12">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Interactive Visualization</p>
        <h3 className="text-2xl lg:text-3xl font-light tracking-wide">
          Spiraling Floor Geometry
        </h3>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
          Explore how the carved quadrant rotates 60° from base to crown
        </p>
      </div>

      {/* Main Visualization Area */}
      <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8 lg:gap-12 items-center">
        
        {/* Level Selector */}
        <div className="space-y-2 order-2 lg:order-1">
          {floorLevels.map((floor, index) => (
            <motion.button
              key={floor.level}
              onClick={() => setActiveLevel(index)}
              className={cn(
                "w-full text-left p-4 border transition-all duration-300 group",
                activeLevel === index 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-muted-foreground/50"
              )}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className={cn(
                    "text-lg font-light transition-colors",
                    activeLevel === index ? "text-primary" : "text-foreground"
                  )}>
                    {floor.label}
                  </span>
                  <span className="text-xs text-muted-foreground ml-3">
                    {floor.rotation}° rotation
                  </span>
                </div>
                <motion.div
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    activeLevel === index ? "bg-primary" : "bg-border group-hover:bg-muted-foreground/50"
                  )}
                  animate={activeLevel === index ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.button>
          ))}
          
          {/* Legend */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary/20 border border-primary" />
                <span>Floor plate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-background border-2 border-dashed border-muted-foreground/40" />
                <span>Removed quadrant</span>
              </div>
            </div>
          </div>
        </div>

        {/* SVG Floor Plan */}
        <div className="order-1 lg:order-2 flex flex-col items-center">
          <div className="relative w-full max-w-[320px] aspect-square">
            {/* Compass Rose */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[95%] h-[95%] rounded-full border border-dashed border-border/50" />
              <span className="absolute top-2 text-[10px] text-muted-foreground tracking-wider">N</span>
              <span className="absolute bottom-2 text-[10px] text-muted-foreground tracking-wider">S</span>
              <span className="absolute left-2 text-[10px] text-muted-foreground tracking-wider">W</span>
              <span className="absolute right-2 text-[10px] text-muted-foreground tracking-wider">E</span>
            </div>

            {/* Animated Floor Plan SVG */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
            >
              <defs>
                {/* Gradient for floor plate */}
                <linearGradient id="floorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                </linearGradient>
                
                {/* Pattern for removed area */}
                <pattern id="removedPattern" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M0 8L8 0" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeOpacity="0.3" />
                </pattern>
              </defs>

              {/* Center core */}
              <motion.rect
                x="85"
                y="85"
                width="30"
                height="30"
                fill="hsl(var(--foreground))"
                fillOpacity="0.8"
                rx="2"
              />

              {/* Full floor plate reference (ghost) */}
              <motion.rect
                x="35"
                y="35"
                width="130"
                height="130"
                rx="12"
                fill="url(#removedPattern)"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="1"
                strokeDasharray="4 4"
                strokeOpacity="0.3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
              />

              {/* Animated floor plate with carved quadrant */}
              <AnimatePresence mode="wait">
                <motion.g
                  key={activeLevel}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Main floor shape - filleted square with quadrant removed */}
                  <motion.path
                    d={generateFloorPath(currentFloor.cutAngle)}
                    fill="url(#floorGradient)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  
                  {/* Rotation indicator line */}
                  <motion.line
                    x1="100"
                    y1="100"
                    x2={100 + 55 * Math.cos((currentFloor.cutAngle + 45) * Math.PI / 180)}
                    y2={100 + 55 * Math.sin((currentFloor.cutAngle + 45) * Math.PI / 180)}
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 0.3 }}
                  />

                  {/* Cut indicator marker */}
                  <motion.circle
                    cx={100 + 55 * Math.cos((currentFloor.cutAngle + 45) * Math.PI / 180)}
                    cy={100 + 55 * Math.sin((currentFloor.cutAngle + 45) * Math.PI / 180)}
                    r="4"
                    fill="hsl(var(--primary))"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                  />
                </motion.g>
              </AnimatePresence>

              {/* Core label */}
              <text x="100" y="103" textAnchor="middle" fontSize="8" fill="hsl(var(--background))" fontWeight="500">
                CORE
              </text>
            </svg>
          </div>

          {/* Floor Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLevel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center mt-6 space-y-2"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-light text-primary">{currentFloor.rotation}°</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Rotation</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-3xl font-light">{currentFloor.level}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Floor</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto pt-2">
                {currentFloor.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Total Rotation Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 pt-8 border-t border-border text-center"
      >
        <p className="text-muted-foreground">
          The carved south wall shifts from{" "}
          <span className="text-foreground font-medium">west</span> at ground level to{" "}
          <span className="text-foreground font-medium">east</span> at the crown — 
          a total <span className="text-primary font-medium">60° counter-clockwise</span> rotation 
          over 74 stories.
        </p>
      </motion.div>
    </div>
  );
};

// Generate SVG path for floor plate with carved quadrant
function generateFloorPath(cutAngle: number): string {
  const cx = 100, cy = 100;
  const size = 65; // Half-size of the square
  const radius = 12; // Corner radius
  const cutSize = 40; // Size of the quadrant cut

  // Convert cut angle to radians
  const angleRad = (cutAngle * Math.PI) / 180;
  
  // Calculate the cut notch position based on angle
  const cutCenterX = cx + cutSize * Math.cos(angleRad + Math.PI / 4);
  const cutCenterY = cy + cutSize * Math.sin(angleRad + Math.PI / 4);
  
  // Create a filleted square with a curved notch
  // This is simplified - in production you'd want more precise geometry
  const path = `
    M ${cx - size + radius} ${cy - size}
    L ${cx + size - radius} ${cy - size}
    Q ${cx + size} ${cy - size} ${cx + size} ${cy - size + radius}
    L ${cx + size} ${cy + size - radius}
    Q ${cx + size} ${cy + size} ${cx + size - radius} ${cy + size}
    L ${cx - size + radius} ${cy + size}
    Q ${cx - size} ${cy + size} ${cx - size} ${cy + size - radius}
    L ${cx - size} ${cy - size + radius}
    Q ${cx - size} ${cy - size} ${cx - size + radius} ${cy - size}
    Z
    M ${cutCenterX - 20} ${cutCenterY - 20}
    A 28 28 0 0 0 ${cutCenterX + 20} ${cutCenterY + 20}
    L ${cx} ${cy}
    Z
  `;
  
  return path;
}

export default FloorPlanSelector;
