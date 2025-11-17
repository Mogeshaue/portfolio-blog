/** @jsxImportSource react */
"use client";
import React, { useEffect, useState } from "react";
import { CanvasRevealEffect } from "./canvas-reveal-effect";
import { Boxes } from "./background-boxes";
import VantaBackground from "./vanta-background";

type BackgroundType = "canvas" | "boxes" | "vanta";

interface DynamicBackgroundProps {
  type?: BackgroundType;
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ type }) => {
  const [backgroundType, setBackgroundType] = useState<BackgroundType>("canvas");

  useEffect(() => {
    // If type is provided, use it. Otherwise, randomly select
    if (type) {
      setBackgroundType(type);
    } else {
      const backgrounds: BackgroundType[] = ["canvas", "boxes", "vanta"];
      const randomIndex = Math.floor(Math.random() * backgrounds.length);
      setBackgroundType(backgrounds[randomIndex]);
      
      console.log(`🎨 Dynamic Background: ${backgrounds[randomIndex]}`);
    }
  }, [type]);

  // Canvas Reveal Effect
  if (backgroundType === "canvas") {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
        <CanvasRevealEffect
          animationSpeed={0.4}
          containerClassName="bg-black h-full w-full"
          colors={[
            [59, 130, 246],   // Blue
            [139, 92, 246],   // Purple
            [236, 72, 153],   // Pink
          ]}
          dotSize={3}
          showGradient={true}
        />
      </div>
    );
  }

  // Background Boxes
  if (backgroundType === "boxes") {
    return (
      <div className="fixed inset-0 z-0 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
      </div>
    );
  }

  // Vanta Topology
  if (backgroundType === "vanta") {
    return (
      <div className="fixed inset-0 z-0">
        <VantaBackground effect="TOPOLOGY" />
      </div>
    );
  }

  return null;
};

export default DynamicBackground;
